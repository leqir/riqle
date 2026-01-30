import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function updatePageCount() {
  console.log('Looking for 1984 product...');

  // Find the product
  const product = await prisma.product.findFirst({
    where: {
      OR: [
        { slug: { contains: '1984' } },
        { slug: { contains: 'nineteen' } },
        { title: { contains: '1984' } },
        { title: { contains: 'Nineteen Eighty-Four' } },
      ],
    },
  });

  if (!product) {
    console.log('❌ 1984 product not found');
    return;
  }

  console.log('✅ Found product:', product.title);
  console.log('Current previewDescription:', product.previewDescription);

  // Update the preview description to show 11 pages
  const newPreviewDescription =
    'first page (partial) • full 11-page document unlocked after purchase';

  await prisma.product.update({
    where: { id: product.id },
    data: {
      previewDescription: newPreviewDescription,
    },
  });

  console.log('✅ Updated to:', newPreviewDescription);
}

updatePageCount()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
