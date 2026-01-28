/**
 * Clean Test Purchases Script
 * Removes all orders and related data for test email addresses
 */

import { PrismaClient } from '@prisma/client';

const db = new PrismaClient();

const TEST_EMAIL = 'nathanael.thie@gmail.com';

async function cleanTestPurchases() {
  console.log(`🔍 Finding orders for ${TEST_EMAIL}...`);

  // Find all orders for this email
  const orders = await db.order.findMany({
    where: {
      customerEmail: TEST_EMAIL,
    },
    include: {
      OrderItem: true,
      Entitlement: true,
    },
  });

  console.log(`📦 Found ${orders.length} orders to delete`);

  if (orders.length === 0) {
    console.log('✅ No orders to delete');
    return;
  }

  // Display order details
  orders.forEach((order, index) => {
    console.log(`\nOrder ${index + 1}:`);
    console.log(`  ID: ${order.id}`);
    console.log(`  Status: ${order.status}`);
    console.log(`  Total: $${(order.total / 100).toFixed(2)} ${order.currency}`);
    console.log(`  Items: ${order.OrderItem.length}`);
    console.log(`  Entitlements: ${order.Entitlement.length}`);
    console.log(`  Created: ${order.createdAt.toISOString()}`);
  });

  // Delete entitlements first
  const entitlementCount = await db.entitlement.deleteMany({
    where: {
      orderId: {
        in: orders.map((o) => o.id),
      },
    },
  });
  console.log(`\n🗑️  Deleted ${entitlementCount.count} entitlements`);

  // Delete orders (OrderItems will cascade delete)
  const orderCount = await db.order.deleteMany({
    where: {
      customerEmail: TEST_EMAIL,
    },
  });
  console.log(`🗑️  Deleted ${orderCount.count} orders (and their items)`);

  console.log('\n✅ Cleanup complete!');
}

cleanTestPurchases()
  .catch((error) => {
    console.error('❌ Error cleaning test purchases:', error);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
