import { PrismaClient } from '@prisma/client';
import { seedProducts } from '../prisma/seeds/products';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding products only...');
  await seedProducts();
  console.log('✓ Products seeded successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
