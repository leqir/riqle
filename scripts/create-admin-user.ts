import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function createAdminUser() {
  const email = process.argv[2];

  if (!email) {
    console.error('❌ Usage: npm run create-admin your-email@example.com');
    process.exit(1);
  }

  try {
    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      console.error(`❌ User with email ${email} not found. Please sign up first.`);
      process.exit(1);
    }

    // Create admin role if it doesn't exist
    const now = new Date();
    let adminRole = await prisma.role.findUnique({
      where: { name: 'admin' },
    });

    if (!adminRole) {
      adminRole = await prisma.role.create({
        data: {
          id: crypto.randomUUID(),
          name: 'admin',
          description: 'Full administrative access to all system functions',
          createdAt: now,
          updatedAt: now,
        },
      });
      console.log('✅ Created admin role');
    } else {
      console.log('ℹ️  Admin role already exists');
    }

    // Check if user already has admin role
    const existingUserRole = await prisma.userRole.findFirst({
      where: {
        userId: user.id,
        roleId: adminRole.id,
      },
    });

    if (existingUserRole) {
      console.log(`ℹ️  ${email} already has admin role`);
      process.exit(0);
    }

    // Grant admin role
    await prisma.userRole.create({
      data: {
        id: crypto.randomUUID(),
        userId: user.id,
        roleId: adminRole.id,
      },
    });

    console.log('');
    console.log('🎉 Success!');
    console.log(`✅ Admin role granted to ${email}`);
    console.log('');
    console.log('Next steps:');
    console.log('1. Sign out of your account (if logged in)');
    console.log('2. Sign back in');
    console.log('3. Navigate to http://localhost:3001/admin');
    console.log('');
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

createAdminUser();
