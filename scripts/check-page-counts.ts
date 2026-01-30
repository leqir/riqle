import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function checkPageCounts() {
  console.log('Checking page counts in database...\n');

  const products = await prisma.product.findMany({
    where: { published: true },
    select: {
      title: true,
      slug: true,
      pageCount: true,
    },
    orderBy: { createdAt: 'desc' },
  });

  products.forEach((product) => {
    console.log(`${product.title}`);
    console.log(`  Slug: ${product.slug}`);
    console.log(`  Page count: ${product.pageCount ?? 'NULL'}\n`);
  });
}

checkPageCounts()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
