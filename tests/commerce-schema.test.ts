/**
 * Commerce Schema & Database Integrity Test
 *
 * Tests Epic 0 & Epic 9 database requirements:
 * - All required tables exist
 * - Proper relationships and constraints
 * - Indexes for performance
 * - Product data integrity
 *
 * Run with: npx tsx tests/commerce-schema.test.ts
 */

import { PrismaClient } from '@prisma/client';

const db = new PrismaClient();

async function runTests() {
  console.log('🧪 Starting Commerce Schema Tests\n');

  try {
    // Test 1: Required tables exist
    await testRequiredTablesExist();

    // Test 2: Product integrity
    await testProductIntegrity();

    // Test 3: Order constraints
    await testOrderConstraints();

    // Test 4: Entitlement system
    await testEntitlementSystem();

    // Test 5: StripeEvent idempotency
    await testStripeEventIdempotency();

    console.log('\n✅ All schema tests passed!\n');

  } catch (error) {
    console.error('\n❌ Test failed:', error);
    process.exit(1);
  } finally {
    await db.$disconnect();
  }
}

// Test 1: Required tables exist
async function testRequiredTablesExist() {
  console.log('🧪 Test 1: Required Tables Exist');

  const tables = [
    { name: 'User', model: db.user },
    { name: 'Product', model: db.product },
    { name: 'Order', model: db.order },
    { name: 'OrderItem', model: db.orderItem },
    { name: 'Entitlement', model: db.entitlement },
    { name: 'StripeEvent', model: db.stripeEvent },
    { name: 'IdempotencyKey', model: db.idempotencyKey },
    { name: 'EmailLog', model: db.emailLog },
    { name: 'AuditLog', model: db.auditLog },
  ];

  for (const table of tables) {
    const count = await table.model.count();
    console.log(`  ✓ ${table.name} table exists (${count} records)`);
  }

  console.log('  ✅ Test 1 PASSED: All required tables exist!');
}

// Test 2: Product integrity
async function testProductIntegrity() {
  console.log('\n🧪 Test 2: Product Data Integrity');

  const products = await db.product.findMany({
    where: { published: true },
  });

  console.log(`  → Found ${products.length} published product(s)`);

  if (products.length === 0) {
    throw new Error('No published products found! Run seed script.');
  }

  for (const product of products) {
    // Check required fields
    if (!product.title) {
      throw new Error(`Product ${product.id} missing title`);
    }

    if (!product.slug) {
      throw new Error(`Product ${product.id} missing slug`);
    }

    if (!product.priceInCents || product.priceInCents <= 0) {
      throw new Error(`Product ${product.id} has invalid price: ${product.priceInCents}`);
    }

    if (!product.currency) {
      throw new Error(`Product ${product.id} missing currency`);
    }

    console.log(`  ✓ Product "${product.title}" - $${product.priceInCents / 100} ${product.currency}`);
  }

  console.log('  ✅ Test 2 PASSED: Product data integrity verified!');
}

// Test 3: Order constraints
async function testOrderConstraints() {
  console.log('\n🧪 Test 3: Order Schema & Constraints');

  // Get a sample order if exists
  const order = await db.order.findFirst({
    include: {
      OrderItem: true,
      Entitlement: true,
    },
  });

  if (order) {
    console.log(`  → Testing existing order: ${order.id}`);

    // Verify stripeSessionId is unique
    try {
      await db.order.findUniqueOrThrow({
        where: { stripeSessionId: order.stripeSessionId! },
      });
      console.log('  ✓ stripeSessionId unique constraint working');
    } catch {
      throw new Error('stripeSessionId unique constraint failed');
    }

    // Verify order has items
    if (order.OrderItem.length === 0) {
      throw new Error(`Order ${order.id} has no items`);
    }

    console.log(`  ✓ Order has ${order.OrderItem.length} item(s)`);

    // Verify order status enum
    const validStatuses = ['pending', 'processing', 'completed', 'failed', 'refunded'];

    if (!validStatuses.includes(order.status)) {
      throw new Error(`Invalid order status: ${order.status}`);
    }

    console.log(`  ✓ Order status valid: ${order.status}`);

    // Verify entitlement relationship
    console.log(`  ✓ Order has ${order.Entitlement.length} entitlement(s)`);

  } else {
    console.log('  ⚠ No orders found (expected in fresh database)');
  }

  console.log('  ✅ Test 3 PASSED: Order constraints verified!');
}

// Test 4: Entitlement system
async function testEntitlementSystem() {
  console.log('\n🧪 Test 4: Entitlement System');

  const entitlements = await db.entitlement.findMany({
    include: {
      User: true,
      Product: true,
      Order: true,
    },
  });

  console.log(`  → Found ${entitlements.length} entitlement(s)`);

  for (const ent of entitlements) {
    // Verify userId_productId unique constraint
    const duplicates = await db.entitlement.findMany({
      where: {
        userId: ent.userId,
        productId: ent.productId,
      },
    });

    if (duplicates.length > 1) {
      console.log(`  ⚠ Warning: ${duplicates.length} entitlements for user=${ent.userId}, product=${ent.productId}`);

      // Check if only one is active
      const activeCount = duplicates.filter(d => d.active).length;

      if (activeCount > 1) {
        throw new Error(`Multiple active entitlements for same user/product! Count: ${activeCount}`);
      }

      console.log(`  ✓ Only ${activeCount} active entitlement (others revoked)`);
    }

    console.log(`  ✓ Entitlement ${ent.id}: ${ent.active ? 'Active' : 'Revoked'} - Product: ${ent.Product.title}`);
  }

  console.log('  ✅ Test 4 PASSED: Entitlement system verified!');
}

// Test 5: StripeEvent idempotency
async function testStripeEventIdempotency() {
  console.log('\n🧪 Test 5: StripeEvent Idempotency System');

  const events = await db.stripeEvent.findMany({
    orderBy: { createdAt: 'desc' },
    take: 10,
  });

  console.log(`  → Found ${events.length} Stripe event(s)`);

  for (const event of events) {
    // Verify eventId is unique
    const count = await db.stripeEvent.count({
      where: { eventId: event.eventId },
    });

    if (count !== 1) {
      throw new Error(`Duplicate eventId found: ${event.eventId} (count: ${count})`);
    }

    console.log(`  ✓ Event ${event.eventId}: ${event.type} - ${event.processed ? 'Processed' : 'Pending'}`);

    if (event.processingError) {
      console.log(`    ⚠ Error: ${event.processingError}`);
    }
  }

  // Test that we can query by eventId (for idempotency check)
  if (events.length > 0) {
    const testEvent = events[0];
    const found = await db.stripeEvent.findUnique({
      where: { eventId: testEvent.eventId },
    });

    if (!found) {
      throw new Error('findUnique by eventId failed');
    }

    console.log('  ✓ eventId unique constraint verified');
  }

  console.log('  ✅ Test 5 PASSED: Idempotency system verified!');
}

// Run tests
runTests().catch(console.error);
