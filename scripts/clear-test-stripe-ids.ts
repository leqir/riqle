import { PrismaClient } from '@prisma/client';

const db = new PrismaClient();

async function clearTestStripeIds() {
  try {
    console.log('Clearing test Stripe IDs from test product...');

    const result = await db.product.update({
      where: {
        id: 'prod_test_payment_verification',
      },
      data: {
        stripePriceId: null,
        stripeProductId: null,
      },
    });

    console.log('✅ Cleared Stripe IDs from test product');
    console.log('Product:', result.title);
    console.log('stripePriceId:', result.stripePriceId);
    console.log('stripeProductId:', result.stripeProductId);
    console.log('\nNow the checkout will create new LIVE Stripe products/prices.');
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await db.$disconnect();
  }
}

clearTestStripeIds();
