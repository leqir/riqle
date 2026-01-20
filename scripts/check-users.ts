import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function checkUsers() {
  try {
    console.log('Fetching all users from database...\n');

    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        emailVerified: true,
        password: true,
        createdAt: true,
        UserRole: {
          include: {
            Role: true,
          },
        },
      },
    });

    console.log(`Found ${users.length} user(s):\n`);

    users.forEach((user, index) => {
      console.log(`User ${index + 1}:`);
      console.log(`  ID: ${user.id}`);
      console.log(`  Email: ${user.email}`);
      console.log(`  Name: ${user.name || 'Not set'}`);
      console.log(`  Has Password: ${!!user.password}`);
      console.log(`  Email Verified: ${user.emailVerified ? 'Yes' : 'No'}`);
      console.log(`  Roles: ${user.UserRole.map((ur) => ur.Role.name).join(', ') || 'None'}`);
      console.log(`  Created: ${user.createdAt}`);
      console.log('');
    });

    // Check verification tokens
    const verificationTokens = await prisma.verificationToken.findMany();
    console.log(`\nVerification Tokens: ${verificationTokens.length}`);

    // Check password reset tokens
    const resetTokens = await prisma.passwordResetToken.findMany({
      where: {
        used: false,
        expires: {
          gt: new Date(),
        },
      },
    });
    console.log(`Active Password Reset Tokens: ${resetTokens.length}`);
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkUsers();
