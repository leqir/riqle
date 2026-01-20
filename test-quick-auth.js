// Quick auth config test
require('dotenv').config({ path: '.env' });

console.log('\n🔍 Authentication Configuration Check\n');
console.log('=======================================\n');

console.log('1. Resend Email Service:');
console.log(`   API Key: ${process.env.RESEND_API_KEY ? '✅ Configured' : '❌ NOT SET'}`);
console.log(`   Email From: ${process.env.EMAIL_FROM || '❌ NOT SET'}\n`);

console.log('2. NextAuth:');
console.log(`   Secret: ${process.env.NEXTAUTH_SECRET || process.env.AUTH_SECRET ? '✅ Configured' : '❌ NOT SET'}`);
console.log(`   URL: ${process.env.NEXTAUTH_URL || 'http://localhost:3000'}\n`);

console.log('3. Database:');
console.log(`   PostgreSQL: ${process.env.DATABASE_URL ? '✅ Configured' : '❌ NOT SET'}\n`);

if (process.env.RESEND_API_KEY && process.env.EMAIL_FROM && (process.env.NEXTAUTH_SECRET || process.env.AUTH_SECRET)) {
  console.log('✅ All critical authentication variables are configured!\n');
  console.log('📧 Try signing in now - the magic link should send successfully.\n');
} else {
  console.log('⚠️  Some configuration is missing. Please check above.\n');
}
