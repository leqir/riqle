/**
 * Test Category Counts
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function countProductsInCategory(categoryPath: string): Promise<number> {
  const count = await prisma.product.count({
    where: {
      published: true,
      categories: {
        some: {
          category: {
            OR: [{ path: categoryPath }, { path: { startsWith: `${categoryPath}/` } }],
          },
        },
      },
    },
  });

  return count;
}

async function testCounts() {
  console.log('🔍 Testing category product counts...\n');

  const testCategories = [
    'hsc',
    'hsc/year-12',
    'hsc/year-12/english-advanced',
    'hsc/year-12/english-advanced/common-module',
    'hsc/year-12/english-advanced/module-a',
  ];

  for (const path of testCategories) {
    const category = await prisma.resourceCategory.findUnique({
      where: { path },
      select: { name: true, path: true },
    });

    if (category) {
      const count = await countProductsInCategory(path);
      console.log(`${category.name.padEnd(30)} → ${count} product(s)`);
    }
  }
}

async function main() {
  try {
    await testCounts();
  } catch (error) {
    console.error('❌ Test failed:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
