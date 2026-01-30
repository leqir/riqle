import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function updatePageCounts() {
  console.log('Updating page counts for products...\n');

  // Update 1984 essay - 11 pages
  const essay1984 = await prisma.product.findFirst({
    where: {
      OR: [{ slug: { contains: '1984' } }, { title: { contains: 'Nineteen Eighty-Four' } }],
    },
  });

  if (essay1984) {
    await prisma.product.update({
      where: { id: essay1984.id },
      data: { pageCount: 11 },
    });
    console.log(`✅ Updated "${essay1984.title}" to 11 pages`);
  } else {
    console.log('❌ 1984 essay not found');
  }

  // Update Translator's Paradox - 18 pages
  const translatorParadox = await prisma.product.findFirst({
    where: {
      OR: [{ slug: { contains: 'translator' } }, { title: { contains: 'Translator' } }],
    },
  });

  if (translatorParadox) {
    await prisma.product.update({
      where: { id: translatorParadox.id },
      data: { pageCount: 18 },
    });
    console.log(`✅ Updated "${translatorParadox.title}" to 18 pages`);
  } else {
    console.log("❌ Translator's Paradox not found");
  }

  console.log('\n✅ Page counts updated successfully!');
}

updatePageCounts()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
