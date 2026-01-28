import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function updatePrice() {
  console.log('Updating 1984 essay price...\n');

  const product = await prisma.product.findUnique({
    where: { slug: '1984-annotated-exemplar-common-module' },
  });

  if (!product) {
    console.log('Product not found. Run seed script first.');
    return;
  }

  console.log(`Current price: $${product.priceInCents / 100} ${product.currency}`);
  console.log('Updating to: $39 AUD\n');

  const updated = await prisma.product.update({
    where: { slug: '1984-annotated-exemplar-common-module' },
    data: {
      priceInCents: 3900,
      updatedAt: new Date(),
    },
  });

  console.log(`✓ Updated price to: $${updated.priceInCents / 100} ${updated.currency}`);
}

updatePrice()
  .catch((e) => {
    console.error('Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
