import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create roles
  const adminRole = await prisma.role.upsert({
    where: { name: 'admin' },
    update: {},
    create: {
      name: 'admin',
      description: 'Administrator with full access',
    },
  });

  const customerRole = await prisma.role.upsert({
    where: { name: 'customer' },
    update: {},
    create: {
      name: 'customer',
      description: 'Customer with access to purchased resources',
    },
  });

  console.log('✅ Roles created:', { adminRole: adminRole.name, customerRole: customerRole.name });

  // Create admin user
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@riqle.com' },
    update: {},
    create: {
      email: 'admin@riqle.com',
      name: 'Nathanael',
      emailVerified: new Date(),
    },
  });

  console.log('✅ Admin user created:', adminUser.email);

  // Assign admin role
  await prisma.userRole.upsert({
    where: {
      userId_roleId: {
        userId: adminUser.id,
        roleId: adminRole.id,
      },
    },
    update: {},
    create: {
      userId: adminUser.id,
      roleId: adminRole.id,
    },
  });

  console.log('✅ Admin role assigned to', adminUser.email);

  // Create sample product
  const resourceProduct = await prisma.product.upsert({
    where: { slug: 'hsc-english-essay-guide' },
    update: {},
    create: {
      name: 'HSC English Essay Writing Guide',
      slug: 'hsc-english-essay-guide',
      description:
        'Comprehensive guide to writing high-scoring HSC English essays, based on real tutoring experience with students achieving Band 6 results.',
      status: 'published',
      type: 'resource',
    },
  });

  console.log('✅ Sample product created:', resourceProduct.name);

  // Create price for resource
  await prisma.price.upsert({
    where: { stripePriceId: 'price_seed_hsc_guide' },
    update: {},
    create: {
      productId: resourceProduct.id,
      amount: 2900, // $29.00
      currency: 'USD',
      stripePriceId: 'price_seed_hsc_guide',
      active: true,
    },
  });

  console.log('✅ Price created for', resourceProduct.name);

  // Create sample post
  await prisma.post.upsert({
    where: { slug: 'building-in-public' },
    update: {},
    create: {
      title: 'Building in Public: Lessons from Building Riqle',
      slug: 'building-in-public',
      content: 'Sample content about building this platform...',
      excerpt:
        'Reflections on building a personal platform that unifies identity, proof of work, and commerce.',
      status: 'published',
      publishedAt: new Date(),
      authorId: adminUser.id,
    },
  });

  console.log('✅ Sample post created');

  // Create sample project
  await prisma.project.upsert({
    where: { slug: 'markpoint' },
    update: {},
    create: {
      title: 'MarkPoint',
      slug: 'markpoint',
      description: 'A startup focused on solving real problems with elegant solutions.',
      outcomes: '500+ users, Featured on Product Hunt',
      technologies: ['Next.js', 'TypeScript', 'Prisma', 'Stripe'],
      featured: true,
      status: 'published',
      order: 1,
      authorId: adminUser.id,
    },
  });

  console.log('✅ Sample project created');

  // Create sample startup
  await prisma.startup.upsert({
    where: { slug: 'markpoint-startup' },
    update: {},
    create: {
      title: 'MarkPoint',
      slug: 'markpoint-startup',
      description: 'Detailed startup showcase...',
      problem: "The problem we're solving...",
      solution: 'Our approach...',
      traction: 'Current metrics and growth...',
      status: 'published',
      authorId: adminUser.id,
    },
  });

  console.log('✅ Sample startup created');
  console.log('✅ Seed completed successfully');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
