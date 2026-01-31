/**
 * View User Signups
 *
 * Shows all user signups with timestamps and verification status
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function viewSignups() {
  console.log('📊 User Signups Report\n');

  // Get all users sorted by creation date
  const users = await prisma.user.findMany({
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      email: true,
      name: true,
      createdAt: true,
      emailVerified: true,
      Order: {
        select: {
          id: true,
          status: true,
          total: true,
        },
      },
    },
  });

  console.log(`Total users: ${users.length}\n`);

  // Group by time period
  const today = new Date();
  const last7Days = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
  const last30Days = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);

  const signupsToday = users.filter((u) => u.createdAt >= new Date(today.setHours(0, 0, 0, 0)));
  const signupsLast7Days = users.filter((u) => u.createdAt >= last7Days);
  const signupsLast30Days = users.filter((u) => u.createdAt >= last30Days);

  console.log('📈 Signup Summary:');
  console.log(`  Today:      ${signupsToday.length}`);
  console.log(`  Last 7d:    ${signupsLast7Days.length}`);
  console.log(`  Last 30d:   ${signupsLast30Days.length}`);
  console.log(`  All time:   ${users.length}\n`);

  // Verification status
  const verified = users.filter((u) => u.emailVerified);
  const unverified = users.filter((u) => !u.emailVerified);
  console.log('✉️  Email Verification:');
  console.log(
    `  Verified:   ${verified.length} (${Math.round((verified.length / users.length) * 100)}%)`
  );
  console.log(`  Unverified: ${unverified.length}\n`);

  // Paying customers
  const payingCustomers = users.filter((u) => u.Order.some((o) => o.status === 'completed'));
  console.log('💰 Revenue:');
  console.log(
    `  Paying customers: ${payingCustomers.length} (${Math.round((payingCustomers.length / users.length) * 100)}%)`
  );
  console.log(`  Free accounts:    ${users.length - payingCustomers.length}\n`);

  // Recent signups (last 10)
  console.log('👥 Recent Signups (last 10):\n');
  users.slice(0, 10).forEach((user, i) => {
    const date = user.createdAt.toLocaleDateString('en-AU', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
    const verified = user.emailVerified ? '✓' : '✗';
    const hasPurchased = user.Order.length > 0 ? '💳' : '  ';
    console.log(
      `${i + 1}.  ${date}  ${verified}  ${hasPurchased}  ${user.email}${user.name ? ` (${user.name})` : ''}`
    );
  });

  console.log('\nLegend: ✓ = verified, ✗ = unverified, 💳 = has purchases');

  await prisma.$disconnect();
}

viewSignups().catch(console.error);
