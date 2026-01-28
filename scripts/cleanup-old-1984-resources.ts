import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function cleanupOld1984Resources() {
  console.log('Checking for old 1984 resources...\n');

  // Find all 1984-related products
  const products = await prisma.product.findMany({
    where: {
      OR: [
        { title: { contains: '1984', mode: 'insensitive' } },
        { title: { contains: 'Nineteen', mode: 'insensitive' } },
        { slug: { contains: '1984', mode: 'insensitive' } },
        { slug: { contains: 'common-module', mode: 'insensitive' } },
      ],
    },
    select: {
      id: true,
      slug: true,
      title: true,
      createdAt: true,
    },
  });

  console.log(`Found ${products.length} 1984-related product(s):\n`);
  products.forEach((p) => {
    console.log(`- ${p.title} (${p.slug}) - Created: ${p.createdAt}`);
  });

  if (products.length === 0) {
    console.log('\nNo old 1984 products to remove.');
    return;
  }

  // Remove products that are NOT the new annotated essay
  const toDelete = products.filter((p) => p.slug !== '1984-annotated-exemplar-common-module');

  if (toDelete.length === 0) {
    console.log('\nNo old products to delete. Only the new annotated essay exists.');
    return;
  }

  console.log(`\nDeleting ${toDelete.length} old product(s)...`);

  for (const product of toDelete) {
    // Delete related entitlements first
    const entitlementsDeleted = await prisma.entitlement.deleteMany({
      where: { productId: product.id },
    });
    console.log(`  - Deleted ${entitlementsDeleted.count} entitlements for "${product.title}"`);

    // Delete the product
    await prisma.product.delete({
      where: { id: product.id },
    });
    console.log(`  ✓ Deleted product: "${product.title}"`);
  }

  console.log('\n✓ Cleanup complete!');
}

cleanupOld1984Resources()
  .catch((e) => {
    console.error('Error during cleanup:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
