import { PrismaClient } from '@prisma/client';

const db = new PrismaClient();

async function clearAllStripeIds() {
  try {
    console.log('Clearing all test Stripe IDs from products...\n');

    const result = await db.product.updateMany({
      where: {
        OR: [{ stripePriceId: { not: null } }, { stripeProductId: { not: null } }],
      },
      data: {
        stripePriceId: null,
        stripeProductId: null,
      },
    });

    console.log(`✅ Cleared Stripe IDs from ${result.count} products`);
    console.log(
      '\nAll products will now create fresh LIVE Stripe products/prices on first purchase.'
    );

    // Show which products were affected
    const products = await db.product.findMany({
      select: { id: true, title: true, published: true },
    });

    console.log('\nProducts:');
    products.forEach((p) => {
      const status = p.published ? 'Published' : 'Draft';
      console.log(`  - ${p.title} (${status})`);
    });
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await db.$disconnect();
  }
}

clearAllStripeIds();
