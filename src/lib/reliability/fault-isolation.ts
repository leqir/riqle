/**
 * Fault Isolation Utilities
 *
 * Contains errors to specific boundaries to prevent cascading failures.
 * Isolates failures so they don't impact unrelated parts of the system.
 */

/**
 * Isolate errors within a boundary
 * Catches all errors and logs them, but doesn't let them propagate
 */
export async function isolate<T>(
  fn: () => Promise<T>,
  options: {
    boundaryName: string;
    fallback?: T;
    onError?: (error: unknown) => void;
    criticalError?: (error: unknown) => boolean;
  }
): Promise<T | undefined> {
  const { boundaryName, fallback, onError, criticalError } = options;

  try {
    return await fn();
  } catch (error) {
    console.error(`[Fault Isolation] Error in ${boundaryName}:`, error);

    // Check if this is a critical error that should propagate
    if (criticalError && criticalError(error)) {
      console.error(
        `[Fault Isolation] Critical error in ${boundaryName}, propagating...`
      );
      throw error;
    }

    // Call error handler if provided
    if (onError) {
      try {
        onError(error);
      } catch (handlerError) {
        console.error(
          `[Fault Isolation] Error handler failed for ${boundaryName}:`,
          handlerError
        );
      }
    }

    // Log to monitoring service in production
    // Example: Sentry.captureException(error, { tags: { boundary: boundaryName } });

    return fallback;
  }
}

/**
 * Bulkhead pattern - limit concurrent operations to prevent resource exhaustion
 */
export class Bulkhead {
  private activeCount: number = 0;
  private queue: Array<() => void> = [];

  constructor(
    private name: string,
    private maxConcurrent: number
  ) {}

  async execute<T>(fn: () => Promise<T>): Promise<T> {
    // Wait if at capacity
    if (this.activeCount >= this.maxConcurrent) {
      await new Promise<void>((resolve) => {
        this.queue.push(resolve);
      });
    }

    this.activeCount++;

    try {
      return await fn();
    } finally {
      this.activeCount--;

      // Process next in queue
      const next = this.queue.shift();
      if (next) {
        next();
      }
    }
  }

  getActiveCount(): number {
    return this.activeCount;
  }

  getQueueSize(): number {
    return this.queue.length;
  }

  getStats() {
    return {
      name: this.name,
      maxConcurrent: this.maxConcurrent,
      activeCount: this.activeCount,
      queueSize: this.queue.length,
      utilizationPercent: (this.activeCount / this.maxConcurrent) * 100,
    };
  }
}

/**
 * Bulkhead registry for managing resource pools
 */
class BulkheadRegistry {
  private bulkheads: Map<string, Bulkhead> = new Map();

  getOrCreate(name: string, maxConcurrent: number = 10): Bulkhead {
    if (!this.bulkheads.has(name)) {
      this.bulkheads.set(name, new Bulkhead(name, maxConcurrent));
    }
    return this.bulkheads.get(name)!;
  }

  get(name: string): Bulkhead | undefined {
    return this.bulkheads.get(name);
  }

  getAllStats() {
    return Array.from(this.bulkheads.values()).map((bulkhead) =>
      bulkhead.getStats()
    );
  }
}

export const bulkheads = new BulkheadRegistry();

/**
 * Error boundary for React Server Components
 * Isolates component errors to prevent full page failures
 */
export async function componentBoundary<T>(
  componentName: string,
  fn: () => Promise<T>,
  fallback: T
): Promise<T> {
  return isolate(fn, {
    boundaryName: `Component:${componentName}`,
    fallback,
    onError: (error) => {
      // In production, log to error tracking
      console.error(`Component ${componentName} failed to render:`, error);
    },
  }) as Promise<T>;
}

/**
 * Service boundary - isolate external service calls
 */
export async function serviceBoundary<T>(
  serviceName: string,
  fn: () => Promise<T>,
  fallback: T
): Promise<T> {
  return isolate(fn, {
    boundaryName: `Service:${serviceName}`,
    fallback,
    criticalError: (error) => {
      // Don't propagate network or timeout errors - use fallback
      if (error instanceof Error) {
        return (
          !error.message.includes('fetch') &&
          !error.message.includes('timeout')
        );
      }
      return false;
    },
  }) as Promise<T>;
}

/**
 * Database operation boundary
 */
export async function dbBoundary<T>(
  operationName: string,
  fn: () => Promise<T>,
  options: {
    fallback?: T;
    critical?: boolean; // If true, always propagate errors
  } = {}
): Promise<T | undefined> {
  const { fallback, critical = false } = options;

  return isolate(fn, {
    boundaryName: `DB:${operationName}`,
    fallback,
    criticalError: () => critical, // Propagate if marked as critical
  });
}

/**
 * Create isolated zones for different parts of the application
 */
export class IsolationZone {
  private errorCount: number = 0;
  private lastErrorTime: number = 0;
  private disabled: boolean = false;

  constructor(
    private name: string,
    private errorThreshold: number = 10,
    private timeWindowMs: number = 60000 // 1 minute
  ) {}

  async execute<T>(
    fn: () => Promise<T>,
    fallback?: T
  ): Promise<T | undefined> {
    // If zone is disabled due to too many errors, return fallback
    if (this.disabled) {
      console.warn(
        `[Isolation Zone] ${this.name} is disabled due to excessive errors`
      );
      return fallback;
    }

    try {
      const result = await fn();
      this.onSuccess();
      return result;
    } catch (error) {
      this.onError(error);
      return fallback;
    }
  }

  private onSuccess() {
    // Reset error count on success
    this.errorCount = 0;
  }

  private onError(error: unknown) {
    const now = Date.now();

    // Reset counter if outside time window
    if (now - this.lastErrorTime > this.timeWindowMs) {
      this.errorCount = 0;
    }

    this.errorCount++;
    this.lastErrorTime = now;

    console.error(`[Isolation Zone] Error in ${this.name}:`, error);

    // Disable zone if error threshold exceeded
    if (this.errorCount >= this.errorThreshold) {
      this.disabled = true;
      console.error(
        `[Isolation Zone] ${this.name} disabled after ${this.errorCount} errors in ${this.timeWindowMs}ms`
      );

      // Re-enable after cooldown
      setTimeout(() => {
        this.disabled = false;
        this.errorCount = 0;
        console.log(`[Isolation Zone] ${this.name} re-enabled after cooldown`);
      }, this.timeWindowMs);
    }
  }

  isDisabled(): boolean {
    return this.disabled;
  }

  getStats() {
    return {
      name: this.name,
      disabled: this.disabled,
      errorCount: this.errorCount,
      lastErrorTime: new Date(this.lastErrorTime).toISOString(),
    };
  }
}

/**
 * Usage examples:
 *
 * // 1. Isolate component rendering
 * export default async function BlogPage() {
 *   const post = await prisma.post.findFirst(); // Critical
 *
 *   const recommendations = await componentBoundary(
 *     'Recommendations',
 *     () => fetchRecommendations(post.id),
 *     [] // Empty array if component fails
 *   );
 *
 *   return (
 *     <div>
 *       <Post data={post} />
 *       <Recommendations items={recommendations} />
 *     </div>
 *   );
 * }
 *
 * // 2. Isolate external service calls
 * const stripeData = await serviceBoundary(
 *   'stripe',
 *   () => stripe.customers.retrieve(customerId),
 *   null // Null if Stripe is down
 * );
 *
 * // 3. Bulkhead for limiting concurrent API calls
 * const apiBulkhead = bulkheads.getOrCreate('external-api', 5); // Max 5 concurrent
 *
 * const result = await apiBulkhead.execute(() =>
 *   fetch('https://api.example.com/data')
 * );
 *
 * // 4. Database boundary
 * const analytics = await dbBoundary(
 *   'fetch-analytics',
 *   () => prisma.analytics.findMany(),
 *   { fallback: [], critical: false } // Non-critical query
 * );
 *
 * // 5. Isolation zone for feature modules
 * const searchZone = new IsolationZone('search', 5, 60000);
 *
 * const searchResults = await searchZone.execute(
 *   () => performSearch(query),
 *   [] // Empty results if search is failing
 * );
 */
