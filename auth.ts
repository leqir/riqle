import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { authConfig } from './auth.config';
import { db } from '@/lib/db';

/**
 * NextAuth.js v5 Instance
 *
 * This file exports the main auth handlers and utilities:
 * - handlers: For API routes
 * - auth: For server-side session checking
 * - signIn, signOut: For authentication actions
 */
export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(db),
  ...authConfig,
});
