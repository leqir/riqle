/**
 * Manual Payment Flow Testing Script
 *
 * Epic 9 - Story 9.14: Testing & Validation
 *
 * This script tests the complete payment flow in development:
 * 1. Create checkout session
 * 2. Simulate webhook events
 * 3. Verify order creation
 * 4. Verify entitlement grant
 * 5. Test download access
 *
 * Usage:
 * npx tsx scripts/test-payment-flow.ts
 */

import { db } from '../src/lib/db';
import { stripe } from '../src/lib/stripe';
import { processWebhookIdempotently } from '../src/lib/stripe/webhook-processor';
import { checkAccess } from '../src/lib/entitlements';
import type Stripe from 'stripe';

async function testPaymentFlow() {
  console.log('🧪 Testing Payment Flow\n');

  // Step 1: Find or create test product
  console.log('Step 1: Finding test product...');
  const product = await db.product.findFirst({
    where: { published: true },
  });

  if (!product) {
    console.log('❌ No published products found. Please seed the database first.');
    process.exit(1);
  }

  console.log(`✅ Found product: ${product.title} (${product.id})`);

  // Step 2: Find or create test user
  console.log('\nStep 2: Finding test user...');
  let user = await db.user.findFirst({
    where: { email: { contains: 'test' } },
  });

  if (!user) {
    console.log('Creating test user...');
    user = await db.user.create({
      data: {
        email: 'test@example.com',
        name: 'Test User',
      },
    });
  }

  console.log(`✅ Found user: ${user.email} (${user.id})`);

  // Step 3: Create Stripe checkout session
  console.log('\nStep 3: Creating Stripe checkout session...');

  // Ensure Stripe product/price exists
  if (!product.stripePriceId) {
    console.log('Creating Stripe product and price...');

    const stripeProduct = await stripe.products.create({
      name: product.title,
      description: product.description,
      metadata: { productId: product.id },
    });

    const stripePrice = await stripe.prices.create({
      product: stripeProduct.id,
      currency: product.currency.toLowerCase(),
      unit_amount: product.priceInCents,
      metadata: { productId: product.id },
    });

    await db.product.update({
      where: { id: product.id },
      data: {
        stripeProductId: stripeProduct.id,
        stripePriceId: stripePrice.id,
      },
    });

    product.stripePriceId = stripePrice.id;
    console.log('✅ Created Stripe product and price');
  }

  const session = await stripe.checkout.sessions.create({
    customer_email: user.email,
    line_items: [{ price: product.stripePriceId, quantity: 1 }],
    mode: 'payment',
    success_url: 'http://localhost:3000/success',
    cancel_url: 'http://localhost:3000/cancel',
    metadata: {
      userId: user.id,
      productId: product.id,
    },
  });

  console.log(`✅ Created checkout session: ${session.id}`);
  console.log(`   URL: ${session.url}`);

  // Step 4: Simulate successful payment webhook
  console.log('\nStep 4: Simulating checkout.session.completed webhook...');

  const mockWebhook: Stripe.Event = {
    id: `evt_test_${Date.now()}`,
    object: 'event',
    api_version: '2023-10-16',
    created: Math.floor(Date.now() / 1000),
    type: 'checkout.session.completed',
    data: {
      object: {
        ...session,
        payment_status: 'paid',
      } as Stripe.Checkout.Session,
    },
    livemode: false,
    pending_webhooks: 0,
    request: null,
  } as unknown as Stripe.Event;

  const result = await processWebhookIdempotently(mockWebhook);
  console.log(`✅ Webhook processed: ${result.status}`);

  // Step 5: Verify order creation
  console.log('\nStep 5: Verifying order creation...');

  const order = await db.order.findUnique({
    where: { stripeSessionId: session.id },
    include: {
      items: true,
      entitlements: true,
    },
  });

  if (!order) {
    console.log('❌ Order not found!');
    process.exit(1);
  }

  console.log(`✅ Order created: ${order.id}`);
  console.log(`   Status: ${order.status}`);
  console.log(`   Total: ${order.currency} ${order.total / 100}`);
  console.log(`   Items: ${order.items.length}`);
  console.log(`   Entitlements: ${order.entitlements.length}`);

  // Step 6: Verify entitlement grant
  console.log('\nStep 6: Verifying entitlement grant...');

  const hasAccess = await checkAccess(user.id, product.id);

  if (!hasAccess) {
    console.log('❌ User does not have access!');
    process.exit(1);
  }

  console.log('✅ User has access to product');

  // Step 7: Test idempotency (duplicate webhook)
  console.log('\nStep 7: Testing idempotency (duplicate webhook)...');

  const duplicateResult = await processWebhookIdempotently(mockWebhook);
  console.log(`✅ Duplicate handled correctly: ${duplicateResult.status}`);

  if (duplicateResult.status !== 'already_processed') {
    console.log('❌ Duplicate webhook was processed again!');
    process.exit(1);
  }

  // Step 8: Verify no duplicate orders
  console.log('\nStep 8: Verifying no duplicate orders...');

  const orderCount = await db.order.count({
    where: { stripeSessionId: session.id },
  });

  if (orderCount !== 1) {
    console.log(`❌ Found ${orderCount} orders for same session!`);
    process.exit(1);
  }

  console.log('✅ No duplicate orders created');

  // Step 9: Test refund flow
  console.log('\nStep 9: Testing refund flow...');

  const refundWebhook: Stripe.Event = {
    id: `evt_test_refund_${Date.now()}`,
    object: 'event',
    api_version: '2023-10-16',
    created: Math.floor(Date.now() / 1000),
    type: 'charge.refunded',
    data: {
      object: {
        id: 'ch_test_123',
        object: 'charge',
        amount: order.total,
        amount_refunded: order.total,
        payment_intent: order.stripePaymentIntentId,
        currency: order.currency.toLowerCase(),
      } as Stripe.Charge,
    },
    livemode: false,
    pending_webhooks: 0,
    request: null,
  } as unknown as Stripe.Event;

  const refundResult = await processWebhookIdempotently(refundWebhook);
  console.log(`✅ Refund webhook processed: ${refundResult.status}`);

  // Verify order status updated
  const refundedOrder = await db.order.findUnique({
    where: { id: order.id },
  });

  if (refundedOrder?.status !== 'refunded') {
    console.log(`❌ Order status not updated! Status: ${refundedOrder?.status}`);
    process.exit(1);
  }

  console.log('✅ Order status updated to refunded');

  // Verify entitlement revoked
  const accessAfterRefund = await checkAccess(user.id, product.id);

  if (accessAfterRefund) {
    console.log('❌ User still has access after refund!');
    process.exit(1);
  }

  console.log('✅ Entitlement revoked');

  // Summary
  console.log('\n' + '='.repeat(50));
  console.log('✅ ALL TESTS PASSED');
  console.log('='.repeat(50));
  console.log('\nPayment flow is working correctly:');
  console.log('  ✓ Checkout session creation');
  console.log('  ✓ Webhook processing (idempotent)');
  console.log('  ✓ Order creation');
  console.log('  ✓ Entitlement grant');
  console.log('  ✓ Access control');
  console.log('  ✓ Refund handling');
  console.log('  ✓ Entitlement revocation');

  // Cleanup note
  console.log('\n⚠️  Note: Test data not cleaned up automatically.');
  console.log('   Order ID: ' + order.id);
  console.log('   User ID: ' + user.id);
}

// Run the test
testPaymentFlow()
  .then(() => {
    console.log('\n✅ Test completed successfully');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Test failed:', error);
    process.exit(1);
  });
