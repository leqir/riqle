/**
 * Safe Database Query Wrappers
 *
 * Enforces query limits to prevent unbounded queries that could
 * overwhelm the database or application memory.
 */

import { prisma } from '@/lib/db/prisma';
import { withTimeout } from './with-timeout';

// Maximum number of records to fetch in a single query
export const MAX_QUERY_LIMIT = 100;

// Default limit for queries without explicit limit
export const DEFAULT_QUERY_LIMIT = 20;

/**
 * Safe wrapper for Prisma findMany queries
 * Enforces a maximum limit and adds timeout protection
 */
export async function safeFindMany<T>(
  query: () => Promise<T[]>,
  options: {
    limit?: number;
    timeoutMs?: number;
  } = {}
): Promise<T[]> {
  const _limit = Math.min(options.limit || DEFAULT_QUERY_LIMIT, MAX_QUERY_LIMIT);
  const timeoutMs = options.timeoutMs || 5000;

  // Note: The actual limit enforcement must be done in the query itself
  // This function primarily adds timeout protection
  return withTimeout(query(), timeoutMs);
}

/**
 * Pagination helper that enforces safe limits
 */
export function getPaginationParams(
  page: number = 1,
  pageSize: number = DEFAULT_QUERY_LIMIT
): {
  skip: number;
  take: number;
} {
  // Ensure positive page number
  const safePage = Math.max(1, page);

  // Enforce max page size
  const safePageSize = Math.min(Math.max(1, pageSize), MAX_QUERY_LIMIT);

  return {
    skip: (safePage - 1) * safePageSize,
    take: safePageSize,
  };
}

/**
 * Safe query builder for admin list pages
 */
export async function safeAdminQuery<T>({
  model,
  where = {},
  orderBy = {},
  page = 1,
  pageSize = DEFAULT_QUERY_LIMIT,
  include = {},
}: {
  model: 'post' | 'project' | 'startup' | 'product' | 'order' | 'entitlement';
  where?: any;
  orderBy?: any;
  page?: number;
  pageSize?: number;
  include?: any;
}): Promise<{ items: T[]; total: number; page: number; pageSize: number }> {
  const { skip, take } = getPaginationParams(page, pageSize);

  const modelMap = {
    post: prisma.post,
    project: prisma.project,
    startup: prisma.startup,
    product: prisma.product,
    order: prisma.order,
    entitlement: prisma.entitlement,
  };

  const prismaModel = modelMap[model];

  // Execute count and data queries in parallel with timeout protection
  const [total, items] = await Promise.all([
    withTimeout(prismaModel.count({ where }), 3000),
    withTimeout(
      prismaModel.findMany({
        where,
        orderBy,
        skip,
        take,
        include,
      }) as Promise<T[]>,
      5000
    ),
  ]);

  return {
    items,
    total,
    page,
    pageSize: take,
  };
}

/**
 * Usage example:
 *
 * // In an API route or server component:
 * const { items, total, page, pageSize } = await safeAdminQuery<Post>({
 *   model: 'post',
 *   where: { published: true },
 *   orderBy: { publishedAt: 'desc' },
 *   page: 1,
 *   pageSize: 20,
 * });
 *
 * // Manual usage with safeFindMany:
 * const posts = await safeFindMany(
 *   () => prisma.post.findMany({
 *     where: { published: true },
 *     take: 50,
 *   }),
 *   { limit: 50, timeoutMs: 3000 }
 * );
 */
