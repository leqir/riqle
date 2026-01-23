/**
 * Idempotent Webhook Processing
 *
 * Epic 9 - Story 9.5: Idempotency & Replay Safety
 *
 * Critical Requirements:
 * - Store every processed Stripe event.id
 * - Reject already-processed events
 * - Fulfillment steps must be idempotent
 * - Handle duplicate delivery, late delivery, out-of-order delivery
 * - Handle temporary DB failures gracefully
 *
 * Architecture:
 * - StripeEvent table serves as idempotency key
 * - Each event processed exactly once
 * - Errors logged for debugging, not silent failures
 */

import { db } from '@/lib/db';
import type Stripe from 'stripe';
import { OrderStatus } from '@prisma/client';
import { fulfillCheckoutSession } from './fulfillment';

/**
 * Process webhook event with idempotency guarantees
 *
 * Flow:
 * 1. Check if event already processed (idempotency check)
 * 2. Store event record (atomic write, idempotency key)
 * 3. Process event based on type
 * 4. Mark as processed or store error
 *
 * @param event - Stripe Event object
 * @returns Processing result with status
 */
export async function processWebhookIdempotently(event: Stripe.Event): Promise<{
  status: 'processed' | 'already_processed' | 'error';
  message?: string;
}> {
  try {
    // Step 1: Idempotency check - has this event been processed?
    const existingEvent = await db.stripeEvent.findUnique({
      where: { eventId: event.id },
    });

    if (existingEvent?.processed) {
      console.log(`[Webhook] Event already processed: ${event.id} (type: ${event.type})`);
      return { status: 'already_processed', message: 'Event already processed' };
    }

    // Step 2: Store event record (idempotency key)
    // This ensures we only process each event once, even if webhook fires multiple times
    await db.stripeEvent.upsert({
      where: { eventId: event.id },
      update: {
        // If event exists but wasn't processed, update it
        type: event.type,
        data: event.data,
      },
      create: {
        id: `stripe_evt_${event.id}_${Date.now()}`,
        eventId: event.id,
        type: event.type,
        data: event.data,
        processed: false,
      },
    });

    console.log(`[Webhook] Processing event: ${event.id} (type: ${event.type})`);

    try {
      // Step 3: Process event based on type
      await processEventByType(event);

      // Step 4: Mark as processed
      await db.stripeEvent.update({
        where: { eventId: event.id },
        data: {
          processed: true,
          processedAt: new Date(),
        },
      });

      console.log(`[Webhook] Successfully processed: ${event.id}`);

      return { status: 'processed', message: 'Event processed successfully' };
    } catch (processingError) {
      // Store error for debugging
      const errorMessage =
        processingError instanceof Error ? processingError.message : 'Unknown error';

      await db.stripeEvent.update({
        where: { eventId: event.id },
        data: {
          processingError: errorMessage,
          // Don't mark as processed if it failed - allow retry
        },
      });

      console.error(`[Webhook] Processing failed for ${event.id}:`, processingError);

      // Re-throw to trigger webhook retry from Stripe
      throw processingError;
    }
  } catch (error) {
    console.error(`[Webhook] Fatal error processing ${event.id}:`, error);

    return {
      status: 'error',
      message: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Route event to appropriate handler based on type
 *
 * @param event - Stripe Event object
 */
async function processEventByType(event: Stripe.Event): Promise<void> {
  switch (event.type) {
    case 'checkout.session.completed':
      await handleCheckoutCompleted(event.data.object as Stripe.Checkout.Session);
      break;

    case 'charge.refunded':
    case 'payment_intent.refunded':
      await handleRefund(event.data.object as Stripe.Charge | Stripe.PaymentIntent);
      break;

    // Add more event types as needed
    default:
      console.log(`[Webhook] Unhandled event type: ${event.type}`);
  }
}

/**
 * Handle checkout.session.completed event
 *
 * Creates order, grants entitlement, sends email
 *
 * @param session - Stripe Checkout Session object
 */
async function handleCheckoutCompleted(session: Stripe.Checkout.Session): Promise<void> {
  console.log(`[Webhook] Processing checkout.session.completed: ${session.id}`);

  // Delegate to existing fulfillment logic
  // fulfillment.ts already has idempotency checks (stripeSessionId unique constraint)
  await fulfillCheckoutSession(session);
}

/**
 * Handle refund events
 *
 * Updates order status, revokes entitlement
 *
 * @param chargeOrIntent - Stripe Charge or PaymentIntent object
 */
async function handleRefund(chargeOrIntent: Stripe.Charge | Stripe.PaymentIntent): Promise<void> {
  console.log(`[Webhook] Processing refund: ${chargeOrIntent.id}`);

  // Get payment intent ID
  const paymentIntentId =
    'payment_intent' in chargeOrIntent
      ? (chargeOrIntent.payment_intent as string)
      : chargeOrIntent.id;

  // Find order by payment intent
  const order = await db.order.findFirst({
    where: { stripePaymentIntentId: paymentIntentId },
    include: {
      OrderItem: {
        include: {
          Product: true,
        },
      },
      Entitlement: true,
    },
  });

  if (!order) {
    console.warn(`[Webhook] Order not found for refund: ${paymentIntentId}`);
    return;
  }

  // Update order status
  await db.order.update({
    where: { id: order.id },
    data: {
      status: OrderStatus.refunded,
      refundedAt: new Date(),
    },
  });

  // Revoke all entitlements for this order
  await db.entitlement.updateMany({
    where: { orderId: order.id },
    data: {
      active: false,
      revokedAt: new Date(),
      revokeReason: 'Order refunded',
    },
  });

  console.log(`[Webhook] Refund processed for order: ${order.id}`);

  // TODO Story 9.11: Send refund confirmation email
}

/**
 * Get failed events for debugging
 *
 * @param limit - Maximum number of events to return
 * @returns Array of failed events
 */
export async function getFailedEvents(limit = 50) {
  return db.stripeEvent.findMany({
    where: {
      processed: false,
      processingError: { not: null },
    },
    orderBy: { createdAt: 'desc' },
    take: limit,
  });
}

/**
 * Retry failed event processing
 *
 * Use with caution - only for manual intervention
 *
 * @param eventId - Stripe event ID to retry
 */
export async function retryFailedEvent(eventId: string): Promise<void> {
  const stripeEvent = await db.stripeEvent.findUnique({
    where: { eventId },
  });

  if (!stripeEvent) {
    throw new Error(`Event not found: ${eventId}`);
  }

  if (stripeEvent.processed) {
    throw new Error(`Event already processed: ${eventId}`);
  }

  // Clear error and retry
  await db.stripeEvent.update({
    where: { eventId },
    data: {
      processingError: null,
    },
  });

  // Reconstruct Stripe event and process
  const event = {
    id: eventId,
    type: stripeEvent.type,
    data: stripeEvent.data,
  } as Stripe.Event;

  await processWebhookIdempotently(event);
}
