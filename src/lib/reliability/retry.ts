/**
 * Retry Logic with Exponential Backoff
 *
 * Automatically retries failed operations with increasing delays,
 * useful for transient failures like network issues or rate limits.
 */

export interface RetryOptions {
  maxAttempts: number; // Maximum number of retry attempts
  initialDelayMs: number; // Initial delay before first retry
  maxDelayMs: number; // Maximum delay between retries
  backoffMultiplier: number; // Multiplier for exponential backoff (default: 2)
  shouldRetry?: (error: unknown) => boolean; // Custom retry condition
  onRetry?: (attempt: number, error: unknown, delayMs: number) => void;
}

export class MaxRetriesExceededError extends Error {
  constructor(
    public attempts: number,
    public lastError: unknown
  ) {
    super(`Max retries (${attempts}) exceeded. Last error: ${lastError}`);
    this.name = 'MaxRetriesExceededError';
  }
}

/**
 * Default retry condition - retry on network errors and 5xx responses
 */
function defaultShouldRetry(error: unknown): boolean {
  // Network errors
  if (error instanceof TypeError && error.message.includes('fetch')) {
    return true;
  }

  // HTTP 5xx errors (server errors)
  if (
    error &&
    typeof error === 'object' &&
    'status' in error &&
    typeof error.status === 'number'
  ) {
    return error.status >= 500 && error.status < 600;
  }

  // Rate limit errors (429)
  if (
    error &&
    typeof error === 'object' &&
    'status' in error &&
    error.status === 429
  ) {
    return true;
  }

  return false;
}

/**
 * Calculate delay with exponential backoff and jitter
 */
function calculateDelay(
  attempt: number,
  initialDelayMs: number,
  maxDelayMs: number,
  backoffMultiplier: number
): number {
  // Exponential backoff: initialDelay * (multiplier ^ attempt)
  const exponentialDelay =
    initialDelayMs * Math.pow(backoffMultiplier, attempt - 1);

  // Cap at maxDelay
  const cappedDelay = Math.min(exponentialDelay, maxDelayMs);

  // Add jitter (random ±25%) to prevent thundering herd
  const jitter = cappedDelay * 0.25 * (Math.random() * 2 - 1);
  const delayWithJitter = cappedDelay + jitter;

  return Math.max(0, delayWithJitter);
}

/**
 * Sleep utility
 */
function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Retry a function with exponential backoff
 */
export async function retry<T>(
  fn: () => Promise<T>,
  options: Partial<RetryOptions> = {}
): Promise<T> {
  const {
    maxAttempts = 3,
    initialDelayMs = 1000,
    maxDelayMs = 30000,
    backoffMultiplier = 2,
    shouldRetry = defaultShouldRetry,
    onRetry,
  } = options;

  let lastError: unknown;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;

      // Check if we should retry this error
      if (!shouldRetry(error)) {
        throw error;
      }

      // Check if we've exhausted retries
      if (attempt >= maxAttempts) {
        throw new MaxRetriesExceededError(attempt, error);
      }

      // Calculate delay
      const delayMs = calculateDelay(
        attempt,
        initialDelayMs,
        maxDelayMs,
        backoffMultiplier
      );

      // Log retry attempt
      if (onRetry) {
        onRetry(attempt, error, delayMs);
      } else {
        console.warn(`[Retry] Attempt ${attempt} failed, retrying in ${Math.round(delayMs)}ms:`, error);
      }

      // Wait before retrying
      await sleep(delayMs);
    }
  }

  // Should never reach here, but TypeScript needs it
  throw new MaxRetriesExceededError(maxAttempts, lastError);
}

/**
 * Retry specifically for fetch requests
 */
export async function retryFetch(
  url: string,
  options: RequestInit = {},
  retryOptions: Partial<RetryOptions> = {}
): Promise<Response> {
  return retry(async () => {
    const response = await fetch(url, options);

    // Throw for 5xx errors to trigger retry
    if (response.status >= 500) {
      throw Object.assign(new Error(`HTTP ${response.status}: ${response.statusText}`), {
        status: response.status,
        response,
      });
    }

    // Throw for 429 (rate limit) to trigger retry
    if (response.status === 429) {
      throw Object.assign(new Error('Rate limited'), {
        status: 429,
        response,
      });
    }

    return response;
  }, retryOptions);
}

/**
 * Usage examples:
 *
 * // Basic retry with defaults (3 attempts, 1s initial delay)
 * const result = await retry(() => fetchSomeData());
 *
 * // Custom retry configuration
 * const result = await retry(
 *   () => fetchSomeData(),
 *   {
 *     maxAttempts: 5,
 *     initialDelayMs: 500,
 *     maxDelayMs: 10000,
 *     backoffMultiplier: 2,
 *     shouldRetry: (error) => {
 *       // Custom retry logic
 *       return error instanceof NetworkError;
 *     },
 *     onRetry: (attempt, error, delayMs) => {
 *       console.log(`Retry attempt ${attempt} after ${delayMs}ms`);
 *     },
 *   }
 * );
 *
 * // Fetch with retry
 * const response = await retryFetch(
 *   'https://api.example.com/data',
 *   { method: 'GET' },
 *   { maxAttempts: 3 }
 * );
 */
