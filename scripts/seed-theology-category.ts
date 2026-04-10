/**
 * Seed script: Enable theology resource category
 *
 * The theology category was created by the resource-categories seed
 * but left unpublished. This script enables it and updates the copy.
 *
 * Run with: npx tsx scripts/seed-theology-category.ts
 * Safe to run multiple times (upsert).
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const result = await prisma.resourceCategory.upsert({
    where: { path: 'theology' },
    update: {
      name: 'Theology',
      slug: 'theology',
      description: 'devotional writing and Anglican liturgical resources',
      published: true,
      displayOrder: 2,
      metaTitle: 'Theology Resources | Riqle',
      metaDescription: 'Devotional writing and Anglican liturgical resources.',
    },
    create: {
      name: 'Theology',
      slug: 'theology',
      path: 'theology',
      level: 0,
      displayOrder: 2,
      published: true,
      description: 'devotional writing and Anglican liturgical resources',
      metaTitle: 'Theology Resources | Riqle',
      metaDescription: 'Devotional writing and Anglican liturgical resources.',
    },
  });

  console.log(`✓ Theology category: ${result.name} (published: ${result.published})`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
