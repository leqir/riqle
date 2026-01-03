/**
 * Example: How to integrate Inngest with Stripe webhook handling
 * This demonstrates the pattern for enqueueing jobs from webhook handlers
 *
 * Usage: Copy patterns from this file when implementing webhook handlers
 */

import { enqueuePurchaseConfirmation } from './inngest-client';

/**
 * EXAMPLE: Stripe Webhook Handler Pattern
 *
 * In src/app/api/webhooks/stripe/route.ts, you would do:
 *
 * ```typescript
 * import { NextRequest, NextResponse } from 'next/server';
 * import Stripe from 'stripe';
 * import { db } from '@/lib/db';
 * import { enqueuePurchaseConfirmation } from '@/lib/inngest-client';
 * import { env } from '@/env';
 *
 * const stripe = new Stripe(env.STRIPE_SECRET_KEY);
 *
 * export async function POST(req: NextRequest) {
 *   const signature = req.headers.get('stripe-signature');
 *   if (!signature) return NextResponse.json({ error: 'Missing signature' }, { status: 401 });
 *
 *   const body = await req.text();
 *
 *   try {
 *     const event = stripe.webhooks.constructEvent(body, signature, env.STRIPE_WEBHOOK_SECRET);
 *
 *     // Handle checkout session completed
 *     if (event.type === 'checkout.session.completed') {
 *       const session = event.data.object as Stripe.Checkout.Session;
 *       const orderId = session.metadata?.orderId;
 *       const customerEmail = session.customer_email;
 *
 *       if (orderId && customerEmail) {
 *         // Update order status in database (fast)
 *         await db.order.update({
 *           where: { id: orderId },
 *           data: { status: 'processing' },
 *         });
 *
 *         // Enqueue email job (async, non-blocking)
 *         await enqueuePurchaseConfirmation({
 *           orderId,
 *           customerEmail,
 *         });
 *       }
 *     }
 *
 *     // Handle refund
 *     if (event.type === 'charge.refunded') {
 *       const charge = event.data.object as Stripe.Charge;
 *       const order = await db.order.findUnique({
 *         where: { stripePaymentIntentId: charge.payment_intent as string },
 *       });
 *
 *       if (order) {
 *         // Enqueue refund notification
 *         await enqueueRefundNotification({
 *           orderId: order.id,
 *           customerEmail: order.customerEmail,
 *           refundReason: charge.refund_reason || undefined,
 *         });
 *       }
 *     }
 *
 *     return NextResponse.json({ received: true }, { status: 200 });
 *   } catch (error) {
 *     console.error('Stripe webhook error:', error);
 *     return NextResponse.json(
 *       { error: error instanceof Error ? error.message : 'Unknown error' },
 *       { status: 400 }
 *     );
 *   }
 * }
 * ```
 */

/**
 * KEY PATTERNS FOR WEBHOOK HANDLERS:
 *
 * 1. FAST HTTP RESPONSE
 *    - Update database immediately (synchronously)
 *    - Return HTTP 200 within 500ms
 *    - Stripe/webhooks must not timeout
 *
 * 2. ASYNC JOB QUEUEING
 *    - Call enqueuePurchaseConfirmation() without awaiting the response
 *    - Inngest handles retries, backoff, and dead-letter queue automatically
 *    - Job execution is decoupled from HTTP request
 *
 * 3. RETRY STRATEGY
 *    - sendPurchaseConfirmation: 3 retries (exponential backoff: 1s, 2s, 4s, 8s, 16s)
 *    - sendRefundNotification: 2 retries
 *    - sendWelcomeEmail: 1 retry
 *    - Failed jobs after max retries go to dead-letter queue
 *
 * 4. IDEMPOTENCY
 *    - Always check if order/resource already processed
 *    - Inngest ensures at-least-once delivery
 *    - Database should be idempotent (use unique constraints)
 */

// Example: Non-blocking job enqueue
export async function exampleNonBlockingJobEnqueue() {
  // This fires the job and returns immediately
  // Don't await this in webhook handlers
  void enqueuePurchaseConfirmation({
    orderId: 'order_123',
    customerEmail: 'user@example.com',
  });

  // Instead, return HTTP 200 immediately
  // Inngest will handle the rest
}

/**
 * TESTING INNGEST JOBS
 *
 * 1. Trigger test event via Inngest UI:
 *    - Visit: https://app.inngest.com
 *    - Select your app
 *    - Find the function (e.g., "send-purchase-confirmation")
 *    - Click "Run" and provide test data
 *
 * 2. Monitor job execution:
 *    - Check Inngest UI for job status, logs, and errors
 *    - View retry attempts and backoff timing
 *    - Check dead-letter queue for failed jobs
 *
 * 3. Local development:
 *    - Use Inngest's local development server
 *    - Events logged to console
 *    - Full replay capabilities
 */
