import { PrismaClient } from '@prisma/client';

const db = new PrismaClient();

async function main() {
  const emailLogs = await db.emailLog.findMany({
    orderBy: { createdAt: 'desc' },
    take: 10,
  });

  console.log('Recent Email Logs:');
  console.log('==================\n');

  if (emailLogs.length === 0) {
    console.log('No email logs found');
  } else {
    emailLogs.forEach((log) => {
      console.log(`[${log.status.toUpperCase()}] ${log.to}`);
      console.log(`  Subject: ${log.subject}`);
      console.log(`  Provider: ${log.provider}`);
      if (log.messageId) console.log(`  Message ID: ${log.messageId}`);
      if (log.error) console.log(`  Error: ${log.error}`);
      if (log.sentAt) console.log(`  Sent At: ${log.sentAt}`);
      if (log.failedAt) console.log(`  Failed At: ${log.failedAt}`);
      console.log('');
    });
  }
}

main()
  .catch(console.error)
  .finally(() => db.$disconnect());
