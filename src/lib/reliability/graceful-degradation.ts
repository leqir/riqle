/**
 * Graceful Degradation Utilities
 *
 * Allows non-critical features to fail without impacting core functionality.
 * Provides fallback values and optional operations that degrade gracefully.
 */

/**
 * Execute a function with a fallback value if it fails
 * Logs errors but doesn't throw
 */
export async function withFallback<T>(
  fn: () => Promise<T>,
  fallback: T,
  options: {
    serviceName?: string;
    logErrors?: boolean;
    onError?: (error: unknown) => void;
  } = {}
): Promise<T> {
  const { serviceName = 'unknown', logErrors = true, onError } = options;

  try {
    return await fn();
  } catch (error) {
    if (logErrors) {
      console.warn(
        `[Graceful Degradation] ${serviceName} failed, using fallback:`,
        error
      );
    }

    if (onError) {
      onError(error);
    }

    return fallback;
  }
}

/**
 * Execute an optional operation that's nice-to-have but not critical
 * Silently catches errors and returns void
 */
export async function optional(
  fn: () => Promise<void>,
  options: {
    serviceName?: string;
    logErrors?: boolean;
    onError?: (error: unknown) => void;
  } = {}
): Promise<void> {
  const { serviceName = 'unknown', logErrors = true, onError } = options;

  try {
    await fn();
  } catch (error) {
    if (logErrors) {
      console.warn(
        `[Optional Operation] ${serviceName} failed (non-critical):`,
        error
      );
    }

    if (onError) {
      onError(error);
    }

    // Silently continue - this operation was optional
  }
}

/**
 * Execute multiple operations in parallel, return successful results
 * Failed operations are logged but don't prevent other operations
 */
export async function allSettledWithFallbacks<T>(
  operations: Array<{
    name: string;
    fn: () => Promise<T>;
    fallback: T;
  }>,
  options: {
    logErrors?: boolean;
  } = {}
): Promise<T[]> {
  const { logErrors = true } = options;

  const promises = operations.map(async ({ name, fn, fallback }) => {
    try {
      return await fn();
    } catch (error) {
      if (logErrors) {
        console.warn(`[Parallel Operation] ${name} failed, using fallback:`, error);
      }
      return fallback;
    }
  });

  return Promise.all(promises);
}

/**
 * Feature flag system for progressive feature degradation
 */
export class FeatureFlags {
  private flags: Map<string, boolean> = new Map();
  private static instance: FeatureFlags;

  private constructor() {
    // Initialize with default flags
    this.flags.set('analytics', true);
    this.flags.set('recommendations', true);
    this.flags.set('socialSharing', true);
    this.flags.set('comments', true);
    this.flags.set('relatedPosts', true);
  }

  static getInstance(): FeatureFlags {
    if (!FeatureFlags.instance) {
      FeatureFlags.instance = new FeatureFlags();
    }
    return FeatureFlags.instance;
  }

  isEnabled(feature: string): boolean {
    return this.flags.get(feature) ?? false;
  }

  enable(feature: string) {
    this.flags.set(feature, true);
    console.log(`[Feature Flags] Enabled: ${feature}`);
  }

  disable(feature: string) {
    this.flags.set(feature, false);
    console.log(`[Feature Flags] Disabled: ${feature}`);
  }

  getAll(): Record<string, boolean> {
    return Object.fromEntries(this.flags);
  }
}

export const featureFlags = FeatureFlags.getInstance();

/**
 * Execute code only if a feature is enabled
 */
export async function whenFeatureEnabled<T>(
  featureName: string,
  fn: () => Promise<T>,
  fallback?: T
): Promise<T | undefined> {
  if (!featureFlags.isEnabled(featureName)) {
    return fallback;
  }

  try {
    return await fn();
  } catch (error) {
    console.warn(
      `[Feature] ${featureName} failed, disabling temporarily:`,
      error
    );

    // Temporarily disable failing feature
    featureFlags.disable(featureName);

    return fallback;
  }
}

/**
 * Timeout with fallback - if operation takes too long, use fallback
 */
export async function withTimeout<T>(
  fn: () => Promise<T>,
  timeoutMs: number,
  fallback: T,
  options: {
    serviceName?: string;
  } = {}
): Promise<T> {
  const { serviceName = 'unknown' } = options;

  const timeoutPromise = new Promise<T>((resolve) => {
    setTimeout(() => {
      console.warn(
        `[Timeout] ${serviceName} exceeded ${timeoutMs}ms, using fallback`
      );
      resolve(fallback);
    }, timeoutMs);
  });

  try {
    return await Promise.race([fn(), timeoutPromise]);
  } catch (error) {
    console.warn(
      `[Timeout] ${serviceName} failed, using fallback:`,
      error
    );
    return fallback;
  }
}

/**
 * Usage examples:
 *
 * // 1. Non-critical feature with fallback
 * const recommendations = await withFallback(
 *   () => fetchRecommendations(userId),
 *   [], // Empty array if fetch fails
 *   { serviceName: 'recommendations' }
 * );
 *
 * // 2. Optional analytics tracking (doesn't block if it fails)
 * await optional(
 *   () => trackPageView(pageId),
 *   { serviceName: 'analytics' }
 * );
 *
 * // 3. Load multiple non-critical features in parallel
 * const [recommendations, relatedPosts, comments] = await allSettledWithFallbacks([
 *   { name: 'recommendations', fn: () => fetchRecommendations(), fallback: [] },
 *   { name: 'relatedPosts', fn: () => fetchRelatedPosts(), fallback: [] },
 *   { name: 'comments', fn: () => fetchComments(), fallback: [] },
 * ]);
 *
 * // 4. Feature flag controlled execution
 * const analytics = await whenFeatureEnabled(
 *   'analytics',
 *   () => trackUserBehavior(userId)
 * );
 *
 * // 5. Timeout with fallback
 * const data = await withTimeout(
 *   () => fetchSlowAPI(),
 *   2000, // 2 second timeout
 *   { cached: true, data: [] }, // Fallback data
 *   { serviceName: 'slow-api' }
 * );
 *
 * // 6. In a React Server Component:
 * export default async function BlogPost({ slug }: { slug: string }) {
 *   // Critical: must succeed
 *   const post = await prisma.post.findUnique({ where: { slug } });
 *
 *   if (!post) notFound();
 *
 *   // Non-critical: degrade gracefully
 *   const [recommendations, comments] = await allSettledWithFallbacks([
 *     {
 *       name: 'recommendations',
 *       fn: () => fetchRecommendations(post.id),
 *       fallback: [],
 *     },
 *     {
 *       name: 'comments',
 *       fn: () => fetchComments(post.id),
 *       fallback: [],
 *     },
 *   ]);
 *
 *   return (
 *     <div>
 *       <Article post={post} />
 *       {recommendations.length > 0 && <Recommendations items={recommendations} />}
 *       {comments.length > 0 && <Comments items={comments} />}
 *     </div>
 *   );
 * }
 */
