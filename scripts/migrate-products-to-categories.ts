/**
 * Migrate Existing Products to Categories
 *
 * This script helps you assign your existing products to the new category system.
 * Run this AFTER you've run the migration and seed scripts.
 *
 * Usage:
 *   npx tsx scripts/migrate-products-to-categories.ts
 */

import { PrismaClient } from '@prisma/client';
import { createId } from '@paralleldrive/cuid2';

const prisma = new PrismaClient();

async function migrateProducts() {
  console.log('🔄 Starting product migration to categories...\n');

  // Get all published products
  const products = await prisma.product.findMany({
    where: { published: true },
    select: {
      id: true,
      slug: true,
      title: true,
    },
  });

  console.log(`Found ${products.length} published products\n`);

  // Get the default category (you can change this to match your needs)
  // Default: HSC > Year 12 > English Advanced > Module A
  const defaultCategory = await prisma.resourceCategory.findUnique({
    where: { path: 'hsc/year-12/english-advanced/module-a' },
  });

  if (!defaultCategory) {
    console.error('❌ Default category not found. Make sure you ran the seed script first.');
    console.error('   Expected path: hsc/year-12/english-advanced/module-a');
    process.exit(1);
  }

  console.log(`Using default category: ${defaultCategory.name} (${defaultCategory.path})\n`);

  // Migrate each product
  let migrated = 0;
  let skipped = 0;

  for (const product of products) {
    try {
      // Check if product already has categories
      const existingCategories = await prisma.productCategory.findMany({
        where: { productId: product.id },
      });

      if (existingCategories.length > 0) {
        console.log(`⏭️  Skipping "${product.title}" - already has categories`);
        skipped++;
        continue;
      }

      // Assign to default category
      await prisma.productCategory.create({
        data: {
          id: createId(),
          productId: product.id,
          categoryId: defaultCategory.id,
          isPrimary: true,
          displayOrder: 0,
        },
      });

      // Add some default tags (you can customize this)
      await prisma.product.update({
        where: { id: product.id },
        data: {
          tags: ['hsc', 'english-advanced'], // Default tags - customize as needed
        },
      });

      console.log(`✅ Migrated "${product.title}"`);
      migrated++;
    } catch (error) {
      console.error(`❌ Failed to migrate "${product.title}":`, error);
    }
  }

  console.log('\n📊 Migration Summary:');
  console.log(`   ✅ Migrated: ${migrated}`);
  console.log(`   ⏭️  Skipped: ${skipped}`);
  console.log(`   ❌ Failed: ${products.length - migrated - skipped}`);

  console.log('\n💡 Next Steps:');
  console.log('   1. Review the categorization of your products');
  console.log('   2. Update categories and tags as needed using Prisma Studio:');
  console.log('      npx prisma studio');
  console.log('   3. Add more specific tags to each product for better filtering');
}

async function main() {
  try {
    await migrateProducts();
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
