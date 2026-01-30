/**
 * Database Performance Monitoring
 *
 * Tracks query performance and logs slow queries for optimisation.
 */

// Threshold for what constitutes a "slow" query (in milliseconds)
const SLOW_QUERY_THRESHOLD = 1000; // 1 second

export interface QueryMetrics {
  query: string;
  durationMs: number;
  timestamp: Date;
  model?: string;
  operation?: string;
}

/**
 * Monitors a database query and logs if it's slow
 * Returns the query result and timing information
 */
export async function monitorQuery<T>(
  queryName: string,
  queryFn: () => Promise<T>,
  options: {
    slowThreshold?: number;
    logAll?: boolean;
  } = {}
): Promise<{ result: T; metrics: QueryMetrics }> {
  const slowThreshold = options.slowThreshold || SLOW_QUERY_THRESHOLD;
  const startTime = Date.now();

  try {
    const result = await queryFn();
    const durationMs = Date.now() - startTime;

    const metrics: QueryMetrics = {
      query: queryName,
      durationMs,
      timestamp: new Date(),
    };

    // Log slow queries
    if (durationMs >= slowThreshold) {
      console.warn('[DB] Slow query detected:', {
        query: queryName,
        durationMs: `${durationMs}ms`,
        threshold: `${slowThreshold}ms`,
        timestamp: metrics.timestamp.toISOString(),
      });

      // In production, send to monitoring service (e.g., Sentry, DataDog)
      // sentryMonitoring.captureSlowQuery(metrics);
    } else if (options.logAll) {
      console.log('[DB] Query completed:', {
        query: queryName,
        durationMs: `${durationMs}ms`,
      });
    }

    return { result, metrics };
  } catch (error) {
    const durationMs = Date.now() - startTime;

    console.error('[DB] Query failed:', {
      query: queryName,
      durationMs: `${durationMs}ms`,
      error: error instanceof Error ? error.message : 'Unknown error',
    });

    // In production, send to monitoring service
    // sentryMonitoring.captureQueryError(queryName, error);

    throw error;
  }
}

/**
 * Wrapper that combines monitoring with timeout protection
 */
export async function monitoredQuery<T>(
  queryName: string,
  queryFn: () => Promise<T>,
  options: {
    timeoutMs?: number;
    slowThreshold?: number;
    logAll?: boolean;
  } = {}
): Promise<T> {
  const { withTimeout } = await import('./with-timeout');

  const { result } = await monitorQuery(
    queryName,
    async () => {
      if (options.timeoutMs) {
        return withTimeout(queryFn(), options.timeoutMs);
      }
      return queryFn();
    },
    {
      slowThreshold: options.slowThreshold,
      logAll: options.logAll,
    }
  );

  return result;
}

/**
 * Query performance statistics collector
 * Useful for identifying patterns in slow queries
 */
export class QueryStatsCollector {
  private stats: Map<
    string,
    {
      count: number;
      totalDurationMs: number;
      avgDurationMs: number;
      maxDurationMs: number;
      slowQueries: number;
    }
  > = new Map();

  recordQuery(queryName: string, durationMs: number) {
    const existing = this.stats.get(queryName) || {
      count: 0,
      totalDurationMs: 0,
      avgDurationMs: 0,
      maxDurationMs: 0,
      slowQueries: 0,
    };

    const newCount = existing.count + 1;
    const newTotal = existing.totalDurationMs + durationMs;

    this.stats.set(queryName, {
      count: newCount,
      totalDurationMs: newTotal,
      avgDurationMs: newTotal / newCount,
      maxDurationMs: Math.max(existing.maxDurationMs, durationMs),
      slowQueries: existing.slowQueries + (durationMs >= SLOW_QUERY_THRESHOLD ? 1 : 0),
    });
  }

  getStats(queryName?: string) {
    if (queryName) {
      return this.stats.get(queryName);
    }
    return Object.fromEntries(this.stats);
  }

  getSlowestQueries(limit: number = 10) {
    return Array.from(this.stats.entries())
      .sort((a, b) => b[1].avgDurationMs - a[1].avgDurationMs)
      .slice(0, limit)
      .map(([query, stats]) => ({ query, ...stats }));
  }

  reset() {
    this.stats.clear();
  }
}

// Global stats collector (optional, for development/debugging)
export const globalQueryStats =
  process.env.NODE_ENV === 'development' ? new QueryStatsCollector() : null;

/**
 * Usage example:
 *
 * import { monitoredQuery } from '@/lib/db/monitoring';
 * import { prisma } from '@/lib/db/prisma';
 *
 * // With monitoring and timeout:
 * const posts = await monitoredQuery(
 *   'posts.findPublished',
 *   () => prisma.post.findMany({
 *     where: { published: true },
 *     orderBy: { publishedAt: 'desc' },
 *     take: 20,
 *   }),
 *   { timeoutMs: 3000, slowThreshold: 500 }
 * );
 *
 * // In admin endpoint to see stats:
 * import { globalQueryStats } from '@/lib/db/monitoring';
 * const slowest = globalQueryStats?.getSlowestQueries(10);
 */
