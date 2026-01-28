import { PrismaClient } from '@prisma/client';

const db = new PrismaClient();

async function checkProducts() {
  try {
    const products = await db.product.findMany({
      select: {
        id: true,
        slug: true,
        title: true,
        published: true,
      },
    });

    console.log('Total products:', products.length);
    console.log('\nProducts:');
    products.forEach((p) => {
      console.log(`- ${p.title}`);
      console.log(`  Slug: ${p.slug}`);
      console.log(`  Published: ${p.published}`);
      console.log(`  URL: https://riqle.vercel.app/products/${p.slug}`);
      console.log('');
    });
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await db.$disconnect();
  }
}

checkProducts();
