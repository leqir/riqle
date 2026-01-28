import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function removeExtensionResource() {
  console.log('Checking for Extension 1 Literary Worlds resource...\n');

  // Find all Extension 1 related products
  const products = await prisma.product.findMany({
    where: {
      OR: [
        { title: { contains: 'Extension', mode: 'insensitive' } },
        { title: { contains: 'Literary Worlds', mode: 'insensitive' } },
        { slug: { contains: 'extension', mode: 'insensitive' } },
        { slug: { contains: 'literary-worlds', mode: 'insensitive' } },
      ],
    },
    select: {
      id: true,
      slug: true,
      title: true,
      createdAt: true,
    },
  });

  console.log(`Found ${products.length} Extension 1 related product(s):\n`);
  products.forEach((p) => {
    console.log(`- ${p.title} (${p.slug}) - Created: ${p.createdAt}`);
  });

  if (products.length === 0) {
    console.log('\nNo Extension 1 products found.');
    return;
  }

  console.log(`\nDeleting ${products.length} product(s)...`);

  for (const product of products) {
    // Delete related order items first
    const orderItemsDeleted = await prisma.orderItem.deleteMany({
      where: { productId: product.id },
    });
    console.log(`  - Deleted ${orderItemsDeleted.count} order items for "${product.title}"`);

    // Delete related entitlements
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

removeExtensionResource()
  .catch((e) => {
    console.error('Error during cleanup:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
