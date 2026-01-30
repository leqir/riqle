import { PrismaClient } from '@prisma/client';

const db = new PrismaClient();

async function checkRecentOrders() {
  try {
    const orders = await db.order.findMany({
      orderBy: { createdAt: 'desc' },
      take: 5,
      include: {
        OrderItem: true,
        Entitlement: true,
      },
    });

    console.log(`Found ${orders.length} recent orders:\n`);

    orders.forEach((order) => {
      console.log('─────────────────────────────────');
      console.log(`Order ID: ${order.id}`);
      console.log(`Customer: ${order.customerEmail}`);
      console.log(`Amount: $${(order.amountInCents / 100).toFixed(2)} ${order.currency}`);
      console.log(`Status: ${order.status}`);
      console.log(`Created: ${order.createdAt}`);
      console.log(`Items: ${order.OrderItem.length}`);
      console.log(`Entitlements: ${order.Entitlement.length}`);
      console.log('');
    });
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await db.$disconnect();
  }
}

checkRecentOrders();
