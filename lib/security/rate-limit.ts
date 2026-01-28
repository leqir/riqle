/**
 * Rate Limiting
 *
 * Prevents abuse by limiting the number of requests from a single source
 */

import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';
import { NextRequest, NextResponse } from 'next/server';

/**
 * Rate limit configurations for different endpoint types
 */
export const RATE_LIMITS = {
  // Authentication endpoints
  auth: {
    requests: 5,
    window: '1 m', // 5 requests per minute
    description: 'Auth endpoints (signin, callback)',
  },

  // Access recovery
  recovery: {
    requests: 3,
    window: '1 h', // 3 requests per hour
    description: 'Access recovery (forgot access link)',
  },

  // Checkout
  checkout: {
    requests: 10,
    window: '1 m', // 10 requests per minute
    description: 'Checkout session creation',
  },

  // Public API
  api: {
    requests: 100,
    window: '1 m', // 100 requests per minute
    description: 'General API endpoints',
  },

  // Admin API
  admin: {
    requests: 50,
    window: '1 m', // 50 requests per minute
    description: 'Admin API endpoints',
  },

  // Download endpoints
  download: {
    requests: 10,
    window: '1 h', // 10 downloads per hour per entitlement
    description: 'Product downloads',
  },
} as const;

/**
 * Create rate limiter instance
 *
 * Uses Upstash Redis in production, in-memory for development
 */
function createRateLimiter(
  requests: number,
  window: string
): Ratelimit | null {
  // Check if Redis is configured
  const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
  const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!redisUrl || !redisToken) {
    // In development without Redis, log warning and skip rate limiting
    if (process.env.NODE_ENV === 'development') {
      console.warn('[Rate Limit] Redis not configured, rate limiting disabled in development');
      return null;
    }

    // In production, Redis is required
    throw new Error('Rate limiting requires UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN');
  }

  const redis = new Redis({
    url: redisUrl,
    token: redisToken,
  });

  return new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(requests, window),
    analytics: true,
    prefix: 'ratelimit',
  });
}

/**
 * Rate limiter instances (lazy loaded)
 */
const rateLimiters: Partial<Record<keyof typeof RATE_LIMITS, Ratelimit | null>> = {};

/**
 * Get or create rate limiter for a specific type
 */
function getRateLimiter(type: keyof typeof RATE_LIMITS): Ratelimit | null {
  if (!(type in rateLimiters)) {
    const config = RATE_LIMITS[type];
    rateLimiters[type] = createRateLimiter(config.requests, config.window);
  }

  return rateLimiters[type] || null;
}

/**
 * Get identifier for rate limiting (IP address or user ID)
 */
export function getRateLimitIdentifier(request: NextRequest, userId?: string): string {
  // Prefer user ID if available (more accurate than IP)
  if (userId) {
    return `user:${userId}`;
  }

  // Fall back to IP address
  const forwardedFor = request.headers.get('x-forwarded-for');
  const realIp = request.headers.get('x-real-ip');
  const ip = forwardedFor?.split(',')[0] || realIp || 'unknown';

  return `ip:${ip}`;
}

/**
 * Check rate limit for a request
 *
 * Returns { success: true } if allowed, { success: false } if rate limited
 */
export async function checkRateLimit(
  type: keyof typeof RATE_LIMITS,
  identifier: string
): Promise<{ success: boolean; limit?: number; remaining?: number; reset?: number }> {
  const limiter = getRateLimiter(type);

  // If rate limiting is disabled (dev without Redis), allow all requests
  if (!limiter) {
    return { success: true };
  }

  try {
    const result = await limiter.limit(identifier);

    return {
      success: result.success,
      limit: result.limit,
      remaining: result.remaining,
      reset: result.reset,
    };
  } catch (error) {
    console.error('[Rate Limit] Error checking rate limit:', error);

    // On error, allow the request (fail open)
    // In production, you might want to fail closed instead
    return { success: true };
  }
}

/**
 * Rate limit middleware for API routes
 *
 * Usage:
 * export async function POST(request: NextRequest) {
 *   const rateLimitResult = await rateLimit(request, 'auth');
 *   if (!rateLimitResult.success) {
 *     return rateLimitResult.response;
 *   }
 *   // ... rest of handler
 * }
 */
export async function rateLimit(
  request: NextRequest,
  type: keyof typeof RATE_LIMITS,
  userId?: string
): Promise<{ success: true } | { success: false; response: NextResponse }> {
  const identifier = getRateLimitIdentifier(request, userId);
  const result = await checkRateLimit(type, identifier);

  if (!result.success) {
    const retryAfter = result.reset ? Math.ceil((result.reset - Date.now()) / 1000) : 60;

    return {
      success: false,
      response: NextResponse.json(
        {
          error: 'Too many requests',
          message: 'You are making requests too quickly. Please slow down.',
          retryAfter,
        },
        {
          status: 429,
          headers: {
            'Retry-After': retryAfter.toString(),
            'X-RateLimit-Limit': result.limit?.toString() || '0',
            'X-RateLimit-Remaining': result.remaining?.toString() || '0',
            'X-RateLimit-Reset': result.reset?.toString() || '0',
          },
        }
      ),
    };
  }

  return { success: true };
}

/**
 * HOC for rate limiting API routes
 *
 * Usage:
 * export const POST = withRateLimit(
 *   'auth',
 *   async (request: NextRequest) => {
 *     // ... handler code
 *   }
 * );
 */
export function withRateLimit(
  type: keyof typeof RATE_LIMITS,
  handler: (request: NextRequest) => Promise<NextResponse>
) {
  return async (request: NextRequest): Promise<NextResponse> => {
    const rateLimitResult = await rateLimit(request, type);

    if (!rateLimitResult.success) {
      return rateLimitResult.response;
    }

    return handler(request);
  };
}

/**
 * Get rate limit stats (for monitoring)
 */
export async function getRateLimitStats(
  type: keyof typeof RATE_LIMITS,
  identifier: string
): Promise<{ limit: number; remaining: number; reset: number } | null> {
  const limiter = getRateLimiter(type);

  if (!limiter) {
    return null;
  }

  try {
    const result = await limiter.limit(identifier);

    return {
      limit: result.limit,
      remaining: result.remaining,
      reset: result.reset,
    };
  } catch (error) {
    console.error('[Rate Limit] Error getting stats:', error);
    return null;
  }
}

/**
 * Usage examples:
 *
 * // 1. Manual rate limiting in API route
 * export async function POST(request: NextRequest) {
 *   const rateLimitResult = await rateLimit(request, 'auth');
 *   if (!rateLimitResult.success) {
 *     return rateLimitResult.response;
 *   }
 *
 *   // ... rest of handler
 * }
 *
 * // 2. HOC wrapper
 * export const POST = withRateLimit('checkout', async (request: NextRequest) => {
 *   // ... handler code
 * });
 *
 * // 3. With user ID (more accurate than IP)
 * export async function POST(request: NextRequest) {
 *   const session = await getSession();
 *   const rateLimitResult = await rateLimit(request, 'admin', session?.user?.id);
 *
 *   if (!rateLimitResult.success) {
 *     return rateLimitResult.response;
 *   }
 *
 *   // ... rest of handler
 * }
 */
