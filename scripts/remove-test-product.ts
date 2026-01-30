/**
 * Remove Test Product
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function removeTestProduct() {
  console.log('🗑️  Removing test product...\n');

  const testProduct = await prisma.product.findUnique({
    where: { slug: 'test-product-payment-verification' },
  });

  if (!testProduct) {
    console.log('✅ Test product not found (already removed)');
    return;
  }

  // Unpublish the product (safer than deleting, preserves purchase history)
  await prisma.product.update({
    where: { id: testProduct.id },
    data: { published: false },
  });

  console.log('✅ Unpublished "Test Product - $1 Payment Test" (hidden from site)');
}

async function main() {
  try {
    await removeTestProduct();
  } catch (error) {
    console.error('❌ Failed:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
