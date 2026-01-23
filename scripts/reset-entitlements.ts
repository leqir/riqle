import { PrismaClient } from '@prisma/client';

const db = new PrismaClient();

/**
 * Reset entitlements for a user (for testing purposes)
 * WARNING: This will delete all entitlements, orders, and order items for the user
 */
async function resetEntitlements(userEmail: string) {
  console.log(`Resetting entitlements for ${userEmail}...`);

  // Find user
  const user = await db.user.findUnique({
    where: { email: userEmail },
  });

  if (!user) {
    console.log(`User ${userEmail} not found`);
    return;
  }

  // Delete entitlements
  const deletedEntitlements = await db.entitlement.deleteMany({
    where: { userId: user.id },
  });

  // Delete order items
  const deletedOrderItems = await db.orderItem.deleteMany({
    where: {
      Order: {
        userId: user.id,
      },
    },
  });

  // Delete orders
  const deletedOrders = await db.order.deleteMany({
    where: { userId: user.id },
  });

  console.log(`✅ Deleted ${deletedEntitlements.count} entitlements`);
  console.log(`✅ Deleted ${deletedOrderItems.count} order items`);
  console.log(`✅ Deleted ${deletedOrders.count} orders`);
  console.log(`\n${userEmail} can now purchase products again!`);
}

// Get email from command line or use default
const userEmail = process.argv[2] || 'nathanael.thie@gmail.com';

resetEntitlements(userEmail)
  .catch(console.error)
  .finally(() => db.$disconnect());
