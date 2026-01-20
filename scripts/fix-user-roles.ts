import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function fixUserRoles() {
  try {
    console.log('Fixing user roles and authentication...\n');

    // 1. Assign customer role to nathanael.thie@gmail.com
    const customerRole = await prisma.role.findUnique({
      where: { name: 'customer' },
    });

    if (!customerRole) {
      console.error('Customer role not found in database!');
      return;
    }

    const nathanaelUser = await prisma.user.findUnique({
      where: { email: 'nathanael.thie@gmail.com' },
      include: { UserRole: true },
    });

    if (nathanaelUser && nathanaelUser.UserRole.length === 0) {
      await prisma.userRole.create({
        data: {
          userId: nathanaelUser.id,
          roleId: customerRole.id,
        },
      });
      console.log('✅ Assigned customer role to nathanael.thie@gmail.com');
    } else {
      console.log('ℹ️  nathanael.thie@gmail.com already has roles assigned');
    }

    // 2. Add password to admin@riqle.com
    const adminUser = await prisma.user.findUnique({
      where: { email: 'admin@riqle.com' },
    });

    if (adminUser && !adminUser.password) {
      const hashedPassword = await bcrypt.hash('AdminPassword123', 10);
      await prisma.user.update({
        where: { email: 'admin@riqle.com' },
        data: {
          password: hashedPassword,
          emailVerified: new Date(), // Verify admin email
        },
      });
      console.log('✅ Added password to admin@riqle.com');
      console.log('   Email: admin@riqle.com');
      console.log('   Password: AdminPassword123');
    } else {
      console.log('ℹ️  admin@riqle.com already has a password');
    }

    console.log('\n✅ All fixes applied successfully!');
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

fixUserRoles();
