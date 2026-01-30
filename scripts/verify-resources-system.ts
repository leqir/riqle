/**
 * Verify Resources System Setup
 *
 * This script verifies that the hierarchical resources system is working correctly
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function verify() {
  console.log('🔍 Verifying Resources System Setup...\n');

  let allGood = true;

  // 1. Check categories
  console.log('1️⃣ Checking categories...');
  const categories = await prisma.resourceCategory.findMany({
    orderBy: { level: 'asc' },
  });

  console.log(`   ✅ Found ${categories.length} categories`);

  const rootCategories = categories.filter((c) => c.level === 0);
  console.log(`   ✅ Root categories: ${rootCategories.map((c) => c.name).join(', ')}`);

  const hscCategories = categories.filter((c) => c.path.startsWith('hsc'));
  console.log(`   ✅ HSC categories: ${hscCategories.length}`);

  // 2. Check products
  console.log('\n2️⃣ Checking products...');
  const products = await prisma.product.findMany({
    where: { published: true },
    include: {
      categories: {
        include: {
          category: true,
        },
      },
    },
  });

  console.log(`   ✅ Found ${products.length} published products`);

  for (const product of products) {
    if (product.categories.length === 0) {
      console.log(`   ❌ Product "${product.title}" has no categories!`);
      allGood = false;
    } else {
      const primaryCat = product.categories.find((c) => c.isPrimary);
      if (!primaryCat) {
        console.log(`   ⚠️  Product "${product.title}" has no primary category`);
      } else {
        console.log(
          `   ✅ "${product.title}" → ${primaryCat.category.path} (${product.tags.length} tags)`
        );
      }
    }
  }

  // 3. Check category-product relationships
  console.log('\n3️⃣ Checking category-product relationships...');
  const commonModule = await prisma.resourceCategory.findUnique({
    where: { path: 'hsc/year-12/english-advanced/common-module' },
    include: {
      _count: {
        select: {
          products: true,
        },
      },
    },
  });

  if (commonModule) {
    console.log(`   ✅ Common Module category has ${commonModule._count.products} product(s)`);
  } else {
    console.log('   ❌ Common Module category not found!');
    allGood = false;
  }

  // 4. Check breadcrumb paths
  console.log('\n4️⃣ Checking breadcrumb paths...');
  const testPath = 'hsc/year-12/english-advanced/common-module';
  const segments = testPath.split('/');
  const breadcrumbs = [];
  let currentPath = '';

  for (const segment of segments) {
    currentPath = currentPath ? `${currentPath}/${segment}` : segment;
    const cat = await prisma.resourceCategory.findUnique({
      where: { path: currentPath },
      select: { name: true, path: true },
    });

    if (cat) {
      breadcrumbs.push(cat.name);
    }
  }

  console.log(`   ✅ Breadcrumb: ${breadcrumbs.join(' > ')}`);

  // 5. Test hierarchical queries
  console.log('\n5️⃣ Testing hierarchical queries...');
  const year12Products = await prisma.product.findMany({
    where: {
      published: true,
      categories: {
        some: {
          category: {
            OR: [{ path: 'hsc/year-12' }, { path: { startsWith: 'hsc/year-12/' } }],
          },
        },
      },
    },
  });

  console.log(
    `   ✅ Found ${year12Products.length} product(s) in Year 12 (including subcategories)`
  );

  // Summary
  console.log('\n📊 Summary:');
  console.log(`   Categories: ${categories.length}`);
  console.log(`   Products: ${products.length}`);
  console.log(`   All products categorized: ${products.every((p) => p.categories.length > 0)}`);

  if (allGood) {
    console.log('\n✅ All checks passed! The resources system is working correctly.');
  } else {
    console.log('\n⚠️  Some issues found. Please review the output above.');
  }

  // Suggested URLs to test
  console.log('\n🔗 Test these URLs in your browser:');
  console.log('   /resources - Main resources page');
  console.log('   /resources/browse - Browse all categories');
  console.log('   /resources/browse/hsc - HSC resources');
  console.log('   /resources/browse/hsc/year-12 - Year 12 resources');
  console.log('   /resources/browse/hsc/year-12/english-advanced - English Advanced');
  console.log('   /resources/browse/hsc/year-12/english-advanced/common-module - Common Module');
}

async function main() {
  try {
    await verify();
  } catch (error) {
    console.error('❌ Verification failed:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
