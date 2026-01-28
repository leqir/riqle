/**
 * Re-export Prisma client for compatibility
 * The main Prisma client is exported as 'db' from '@/lib/db'
 * This file provides an alias as 'prisma' for code that expects that naming
 */

import { db } from '@/lib/db';

export const prisma = db;
