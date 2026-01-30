/**
 * Fix categorization for 1984 resource - should be Common Module
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function fixCategorization() {
  console.log('🔄 Fixing 1984 resource categorization...\n');

  // Find the 1984 product
  const product = await prisma.product.findUnique({
    where: { slug: '1984-annotated-exemplar-common-module' },
    include: {
      categories: true,
    },
  });

  if (!product) {
    console.log('❌ Product not found');
    return;
  }

  // Find the Common Module category
  const commonModule = await prisma.resourceCategory.findUnique({
    where: { path: 'hsc/year-12/english-advanced/common-module' },
  });

  if (!commonModule) {
    console.log('❌ Common Module category not found');
    return;
  }

  // Remove existing categories
  await prisma.productCategory.deleteMany({
    where: { productId: product.id },
  });

  // Add to Common Module
  await prisma.productCategory.create({
    data: {
      productId: product.id,
      categoryId: commonModule.id,
      isPrimary: true,
      displayOrder: 0,
    },
  });

  // Update tags
  await prisma.product.update({
    where: { id: product.id },
    data: {
      tags: [
        'hsc',
        'english-advanced',
        'common-module',
        'essay-writing',
        'nineteen-eighty-four',
        'exemplar',
        'annotation',
      ],
    },
  });

  console.log('✅ Updated categorization for "Annotated Exemplar Essay: Nineteen Eighty-Four"');
  console.log('   Category: HSC > Year 12 > English Advanced > Common Module');
  console.log(
    '   Tags: hsc, english-advanced, common-module, essay-writing, nineteen-eighty-four, exemplar, annotation'
  );
}

async function main() {
  try {
    await fixCategorization();
  } catch (error) {
    console.error('❌ Failed:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
