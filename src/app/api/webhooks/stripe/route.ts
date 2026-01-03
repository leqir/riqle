import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import type Stripe from 'stripe';
import { stripe } from '@/lib/stripe';
import { db } from '@/lib/db';
import { fulfillCheckoutSession, handleRefund } from '@/lib/stripe/fulfillment';

/**
 * Stripe Webhook Handler
 *
 * This endpoint processes Stripe webhook events with:
 * - Signature verification for security
 * - Idempotency using StripeEvent table to prevent duplicate processing
 * - Transaction-based fulfillment for data consistency
 * - Comprehensive error logging
 *
 * Supported events:
 * - checkout.session.completed: Fulfill orders and grant entitlements
 * - charge.refunded: Revoke entitlements and update order status
 *
 * Critical: This endpoint must respond quickly (< 500ms) to avoid Stripe retries.
 * Heavy operations should be offloaded to background jobs if needed.
 */
export async function POST(req: Request) {
  const body = await req.text();
  const headersList = await headers();
  const signature = headersList.get('stripe-signature');

  if (!signature) {
    console.error('Missing stripe-signature header');
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 });
  }

  if (!process.env.STRIPE_WEBHOOK_SECRET) {
    console.error('STRIPE_WEBHOOK_SECRET not configured');
    return NextResponse.json({ error: 'Webhook not configured' }, { status: 500 });
  }

  let event: Stripe.Event;

  // Verify webhook signature
  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    console.error('Webhook signature verification failed:', errorMessage);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  console.log(`Received webhook event: ${event.type} (${event.id})`);

  // Check if event has already been processed (idempotency)
  try {
    const existingEvent = await db.stripeEvent.findUnique({
      where: { eventId: event.id },
    });

    if (existingEvent?.processed) {
      console.log(
        `Event ${event.id} already processed at ${existingEvent.processedAt}, returning 200`
      );
      return NextResponse.json({ received: true, status: 'already_processed' });
    }

    // Create or update event record
    if (existingEvent) {
      // Event exists but wasn't processed successfully before, update it
      await db.stripeEvent.update({
        where: { eventId: event.id },
        data: {
          type: event.type,
          data: event as any,
          processed: false,
          processingError: null,
        },
      });
    } else {
      // Create new event record
      await db.stripeEvent.create({
        data: {
          eventId: event.id,
          type: event.type,
          data: event as any,
          processed: false,
        },
      });
    }
  } catch (error) {
    console.error('Failed to create/check event record:', error);
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }

  // Process the webhook event
  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        console.log(`Processing checkout.session.completed for session ${session.id}`);

        // Only fulfill if payment was successful
        if (session.payment_status === 'paid') {
          await fulfillCheckoutSession(session);
        } else {
          console.log(
            `Skipping fulfillment for session ${session.id} - payment status: ${session.payment_status}`
          );
        }
        break;
      }

      case 'checkout.session.async_payment_succeeded': {
        const session = event.data.object as Stripe.Checkout.Session;
        console.log(`Processing async payment success for session ${session.id}`);
        await fulfillCheckoutSession(session);
        break;
      }

      case 'checkout.session.async_payment_failed': {
        const session = event.data.object as Stripe.Checkout.Session;
        console.log(`Async payment failed for session ${session.id}`);
        // Could send notification email here
        break;
      }

      case 'charge.refunded': {
        const charge = event.data.object as Stripe.Charge;
        console.log(`Processing charge.refunded for charge ${charge.id}`);
        await handleRefund(charge);
        break;
      }

      case 'payment_intent.succeeded': {
        // This is logged but fulfillment happens via checkout.session.completed
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log(`Payment intent ${paymentIntent.id} succeeded`);
        break;
      }

      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log(`Payment intent ${paymentIntent.id} failed`);
        // Could log failure or send notification
        break;
      }

      case 'customer.subscription.created':
      case 'customer.subscription.updated':
      case 'customer.subscription.deleted': {
        // Placeholder for subscription handling (future feature)
        console.log(`Subscription event ${event.type} - not yet implemented`);
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    // Mark event as successfully processed
    await db.stripeEvent.update({
      where: { eventId: event.id },
      data: {
        processed: true,
        processedAt: new Date(),
        processingError: null,
      },
    });

    console.log(`Successfully processed event ${event.id}`);
    return NextResponse.json({ received: true, status: 'processed' });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    const errorStack = error instanceof Error ? error.stack : undefined;

    console.error(`Error processing webhook event ${event.id}:`, {
      message: errorMessage,
      stack: errorStack,
      eventType: event.type,
    });

    // Update event record with error
    try {
      await db.stripeEvent.update({
        where: { eventId: event.id },
        data: {
          processingError: errorMessage,
        },
      });
    } catch (updateError) {
      console.error('Failed to update event with error:', updateError);
    }

    // Return 500 to trigger Stripe retry
    return NextResponse.json(
      {
        error: 'Processing failed',
        message: errorMessage,
      },
      { status: 500 }
    );
  }
}

/**
 * Disable body parsing for webhook routes
 * Stripe requires the raw body for signature verification
 */
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
