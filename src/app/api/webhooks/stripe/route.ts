import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import type Stripe from 'stripe';
import { stripe } from '@/lib/stripe';
import { processWebhookIdempotently } from '@/lib/stripe/webhook-processor';
import { trackWebhookProcessing } from '@/lib/monitoring';

/**
 * Stripe Webhook Handler
 *
 * Epic 9 - Story 9.5: Idempotency & Replay Safety
 *
 * This endpoint processes Stripe webhook events with:
 * - Signature verification for security
 * - Idempotent processing via webhook-processor.ts
 * - Transaction-based fulfillment for data consistency
 * - Comprehensive error logging
 *
 * Architecture:
 * - This route handles security boundary (signature verification)
 * - webhook-processor.ts handles idempotency and business logic
 * - Separation allows for easier testing and maintenance
 *
 * Supported events:
 * - checkout.session.completed: Fulfill orders and grant entitlements
 * - charge.refunded/payment_intent.refunded: Revoke entitlements
 *
 * Performance Target: < 1 second response time
 */
export async function POST(req: Request) {
  const body = await req.text();
  const headersList = await headers();
  const signature = headersList.get('stripe-signature');

  if (!signature) {
    console.error('[Webhook] Missing stripe-signature header');
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 });
  }

  if (!process.env.STRIPE_WEBHOOK_SECRET) {
    console.error('[Webhook] STRIPE_WEBHOOK_SECRET not configured');
    return NextResponse.json({ error: 'Webhook not configured' }, { status: 500 });
  }

  let event: Stripe.Event;

  // Step 1: Verify webhook signature (security boundary)
  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    console.error('[Webhook] Signature verification failed:', errorMessage);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  console.log(`[Webhook] Received event: ${event.type} (${event.id})`);

  // Step 2: Process webhook with idempotency guarantees
  // All business logic delegated to webhook-processor.ts
  const timer = trackWebhookProcessing(event.type, event.id);
  const result = await processWebhookIdempotently(event);
  timer.end({ status: result.status });

  // Step 3: Return appropriate response based on processing result
  switch (result.status) {
    case 'processed':
      return NextResponse.json({ received: true, status: 'processed' });

    case 'already_processed':
      // Return 200 for idempotent requests (Stripe expects this)
      return NextResponse.json({ received: true, status: 'already_processed' });

    case 'error':
      // Return 500 to trigger Stripe retry
      return NextResponse.json(
        {
          error: 'Processing failed',
          message: result.message,
        },
        { status: 500 }
      );

    default:
      console.error('[Webhook] Unknown processing status:', result.status);
      return NextResponse.json({ error: 'Unknown error' }, { status: 500 });
  }
}

/**
 * Disable body parsing for webhook routes
 * Stripe requires the raw body for signature verification
 */
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
