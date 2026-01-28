/**
 * Database Query Timeout Wrapper
 *
 * Prevents slow queries from blocking requests indefinitely.
 * Default timeout: 5 seconds (adjust based on your needs)
 */

export class QueryTimeoutError extends Error {
  constructor(timeoutMs: number) {
    super(`Database query exceeded timeout of ${timeoutMs}ms`);
    this.name = 'QueryTimeoutError';
  }
}

/**
 * Wraps a database query with a timeout
 * @param promise - The database query promise
 * @param timeoutMs - Timeout in milliseconds (default: 5000)
 * @returns The query result or throws QueryTimeoutError
 */
export async function withTimeout<T>(
  promise: Promise<T>,
  timeoutMs: number = 5000
): Promise<T> {
  const timeoutPromise = new Promise<never>((_, reject) => {
    setTimeout(() => {
      reject(new QueryTimeoutError(timeoutMs));
    }, timeoutMs);
  });

  return Promise.race([promise, timeoutPromise]);
}

/**
 * Usage example:
 *
 * import { prisma } from '@/lib/db/prisma';
 * import { withTimeout } from '@/lib/db/with-timeout';
 *
 * const users = await withTimeout(
 *   prisma.user.findMany({ where: { active: true } }),
 *   3000 // 3 second timeout
 * );
 */
