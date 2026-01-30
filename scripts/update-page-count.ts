/**
 * Update page count for Extension 1 resource
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function updatePageCount() {
  console.log('📝 Updating page count for Extension 1 resource...\n');

  const updated = await prisma.product.update({
    where: { slug: 'extension-1-literary-worlds-translators-paradox' },
    data: { pageCount: 18 },
  });

  console.log('✅ Updated successfully!');
  console.log(`   Title: ${updated.title}`);
  console.log(`   Page Count: ${updated.pageCount}`);
}

async function main() {
  try {
    await updatePageCount();
  } catch (error) {
    console.error('❌ Error:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main();
