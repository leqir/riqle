import { PrismaClient } from '@prisma/client';

const db = new PrismaClient();

async function main() {
  const product = await db.product.update({
    where: { slug: 'common-module-1984-exemplar-essay' },
    data: {
      downloadUrls: ['/products/1984-common-module-essay.pdf'],
      updatedAt: new Date(),
    },
  });

  console.log('✅ Updated product:', product.slug);
  console.log('Download URLs:', product.downloadUrls);
}

main()
  .catch(console.error)
  .finally(() => db.$disconnect());
