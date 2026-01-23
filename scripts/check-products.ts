import { PrismaClient } from '@prisma/client';

const db = new PrismaClient();

async function main() {
  const products = await db.product.findMany({
    where: { published: true },
    select: { slug: true, title: true, downloadUrls: true },
    orderBy: { displayOrder: 'asc' },
  });

  console.log(JSON.stringify(products, null, 2));
}

main()
  .catch(console.error)
  .finally(() => db.$disconnect());
