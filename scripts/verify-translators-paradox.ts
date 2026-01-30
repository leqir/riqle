/**
 * Verify Extension 1 Translator's Paradox Resource
 *
 * This script verifies the resource was created correctly and all fields are set properly.
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function verifyResource() {
  console.log('🔍 Verifying Extension 1 resource...\n');

  // Find the product
  const product = await prisma.product.findUnique({
    where: { slug: 'extension-1-literary-worlds-translators-paradox' },
    include: {
      categories: {
        include: {
          category: true,
        },
      },
    },
  });

  if (!product) {
    console.error('❌ Product not found!');
    process.exit(1);
  }

  console.log('✅ Product found!\n');
  console.log('📋 Product Details:');
  console.log(`  ID: ${product.id}`);
  console.log(`  Title: ${product.title}`);
  console.log(`  Slug: ${product.slug}`);
  console.log(`  Published: ${product.published ? '✓ Yes' : '✗ No'}`);
  console.log(`  Featured: ${product.featured ? '✓ Yes' : '✗ No'}`);
  console.log(`  Price: ${product.currency} ${(product.priceInCents / 100).toFixed(2)}`);
  console.log(`  Format: ${product.format}`);
  console.log(`  Download URLs: ${product.downloadUrls.length} file(s)`);
  product.downloadUrls.forEach((url, i) => {
    console.log(`    ${i + 1}. ${url}`);
  });

  console.log(`\n💳 Stripe Integration:`);
  console.log(
    `  Stripe Product ID: ${product.stripeProductId || '(will be created on first checkout)'}`
  );
  console.log(
    `  Stripe Price ID: ${product.stripePriceId || '(will be created on first checkout)'}`
  );

  console.log(`\n🏷️  Tags: ${product.tags.length === 0 ? 'None' : product.tags.join(', ')}`);

  console.log(`\n📁 Categories:`);
  if (product.categories.length === 0) {
    console.log('  ⚠️  No categories assigned!');
  } else {
    product.categories.forEach((pc) => {
      console.log(`  ${pc.isPrimary ? '★' : '☆'} ${pc.category.name} (${pc.category.path})`);
    });
  }

  console.log(`\n📝 Content Sections:`);
  console.log(`  Target Audience: ${product.targetAudience.length} characters`);
  console.log(`  Non Audience: ${product.nonAudience.length} characters`);
  console.log(`  What It Is: ${product.whatItIs.length} characters`);
  console.log(`  What It Covers: ${product.whatItCovers.length} characters`);
  console.log(`  How It Was Created: ${product.howItWasCreated.length} characters`);
  console.log(`  What You Get: ${product.whatYouGet.length} characters`);

  console.log(`\n🔗 Related Content:`);
  console.log(`  Related Posts: ${product.relatedPostSlugs.length}`);
  console.log(`  Related Projects: ${product.relatedProjectSlugs.length}`);

  console.log(`\n🌐 URLs:`);
  console.log(`  Product Page: /resources/${product.slug}`);
  if (product.categories.length > 0) {
    console.log(`  Category Page: /resources/browse/${product.categories[0]?.category.path}`);
  }

  // Check if PDF file exists
  const fs = await import('fs');
  const path = await import('path');

  console.log(`\n📄 PDF File Check:`);
  product.downloadUrls.forEach((url) => {
    const filePath = path.join(process.cwd(), 'public', url);
    const exists = fs.existsSync(filePath);
    const size = exists ? fs.statSync(filePath).size : 0;
    const sizeKB = (size / 1024).toFixed(2);
    console.log(`  ${exists ? '✅' : '❌'} ${url} ${exists ? `(${sizeKB} KB)` : '(NOT FOUND)'}`);
  });

  console.log(`\n✅ Verification complete!`);

  // Check for any issues
  const issues: string[] = [];

  if (!product.published) issues.push('Product is not published');
  if (product.categories.length === 0) issues.push('No categories assigned');
  if (product.downloadUrls.length === 0) issues.push('No download URLs');
  if (!product.targetAudience) issues.push('Missing target audience');
  if (!product.nonAudience) issues.push('Missing non-audience');
  if (!product.whatItIs) issues.push('Missing "What It Is"');
  if (!product.whatItCovers) issues.push('Missing "What It Covers"');
  if (!product.howItWasCreated) issues.push('Missing "How It Was Created"');
  if (!product.whatYouGet) issues.push('Missing "What You Get"');

  if (issues.length > 0) {
    console.log(`\n⚠️  Issues Found:`);
    issues.forEach((issue) => console.log(`  - ${issue}`));
  } else {
    console.log(`\n🎉 No issues found! The resource is ready to go.`);
  }
}

async function main() {
  try {
    await verifyResource();
  } catch (error) {
    console.error('❌ Error verifying resource:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main();
