/**
 * Check Module A Plath/Hughes Resource
 * Verifies the resource was added successfully to the database
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function checkProduct() {
  console.log('🔍 Checking Module A Plath/Hughes resource...\n');

  const product = await prisma.product.findUnique({
    where: { slug: 'module-a-plath-hughes-annotated-essay' },
    select: {
      id: true,
      slug: true,
      title: true,
      published: true,
      featured: true,
      priceInCents: true,
      currency: true,
      stripeProductId: true,
      stripePriceId: true,
      downloadUrls: true,
      pageCount: true,
      categories: {
        select: {
          category: {
            select: {
              name: true,
              path: true,
            },
          },
          isPrimary: true,
        },
      },
    },
  });

  if (!product) {
    console.log('❌ Product NOT found in database');
    await prisma.$disconnect();
    process.exit(1);
  }

  console.log('✅ Product found in database:\n');
  console.log(`ID: ${product.id}`);
  console.log(`Slug: ${product.slug}`);
  console.log(`Title: ${product.title}`);
  console.log(`Published: ${product.published ? '✓' : '✗'}`);
  console.log(`Featured: ${product.featured ? '✓' : '✗'}`);
  console.log(`Price: ${product.currency} ${product.priceInCents / 100}`);
  console.log(`Page Count: ${product.pageCount}`);
  console.log(`Download URLs: ${product.downloadUrls.join(', ')}`);
  console.log(
    `Stripe Product ID: ${product.stripeProductId || 'Not yet created (will be created on first purchase)'}`
  );
  console.log(
    `Stripe Price ID: ${product.stripePriceId || 'Not yet created (will be created on first purchase)'}`
  );

  if (product.categories && product.categories.length > 0) {
    console.log('\nCategories:');
    product.categories.forEach((cat) => {
      console.log(`  ${cat.isPrimary ? '✓' : ' '} ${cat.category.name} (${cat.category.path})`);
    });
  }

  console.log('\n✅ Resource verified successfully!');

  await prisma.$disconnect();
}

checkProduct().catch((error) => {
  console.error('❌ Error checking resource:', error);
  process.exit(1);
});
