import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { createId } from '@paralleldrive/cuid2';

const prisma = new PrismaClient();

async function setupRoles() {
  try {
    console.log('Setting up roles and fixing users...\n');

    // Check existing roles
    const existingRoles = await prisma.role.findMany();
    console.log(`Found ${existingRoles.length} existing roles:`);
    existingRoles.forEach((role) => {
      console.log(`  - ${role.name} (${role.id})`);
    });

    // Create customer role if it doesn't exist
    let customerRole = await prisma.role.findUnique({
      where: { name: 'customer' },
    });

    if (!customerRole) {
      customerRole = await prisma.role.create({
        data: {
          id: createId(),
          name: 'customer',
          description: 'Regular customer with access to purchases and account management',
          updatedAt: new Date(),
        },
      });
      console.log('\n✅ Created customer role');
    } else {
      console.log('\n✅ Customer role already exists');
    }

    // 1. Assign customer role to nathanael.thie@gmail.com
    const nathanaelUser = await prisma.user.findUnique({
      where: { email: 'nathanael.thie@gmail.com' },
      include: { UserRole: true },
    });

    if (nathanaelUser) {
      if (nathanaelUser.UserRole.length === 0) {
        await prisma.userRole.create({
          data: {
            id: createId(),
            userId: nathanaelUser.id,
            roleId: customerRole.id,
          },
        });
        console.log('✅ Assigned customer role to nathanael.thie@gmail.com');
      } else {
        console.log('ℹ️  nathanael.thie@gmail.com already has roles');
      }
    }

    // 2. Add password to admin@riqle.com and verify email
    const adminUser = await prisma.user.findUnique({
      where: { email: 'admin@riqle.com' },
    });

    if (adminUser) {
      const updates: any = {};

      if (!adminUser.password) {
        updates.password = await bcrypt.hash('AdminPassword123', 10);
      }

      if (!adminUser.emailVerified) {
        updates.emailVerified = new Date();
      }

      if (Object.keys(updates).length > 0) {
        await prisma.user.update({
          where: { email: 'admin@riqle.com' },
          data: updates,
        });
        console.log('\n✅ Updated admin@riqle.com:');
        if (updates.password) {
          console.log('   - Added password: AdminPassword123');
        }
        if (updates.emailVerified) {
          console.log('   - Verified email');
        }
      } else {
        console.log('\nℹ️  admin@riqle.com is already set up');
      }
    }

    console.log('\n✅ Setup complete!');
    console.log('\nTest Credentials:');
    console.log('  1. Admin User:');
    console.log('     Email: admin@riqle.com');
    console.log('     Password: AdminPassword123');
    console.log('\n  2. Regular User:');
    console.log('     Email: nathanael.thie@gmail.com');
    console.log('     Password: TempPassword123');
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

setupRoles();
