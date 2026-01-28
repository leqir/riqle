/**
 * Circuit Breaker Pattern
 *
 * Prevents cascading failures by "opening the circuit" when a service
 * fails repeatedly. After a cooldown period, attempts to "half-open"
 * to test if the service has recovered.
 *
 * States:
 * - CLOSED: Normal operation, requests pass through
 * - OPEN: Service is failing, requests fail immediately
 * - HALF_OPEN: Testing if service has recovered
 */

export enum CircuitState {
  CLOSED = 'CLOSED',
  OPEN = 'OPEN',
  HALF_OPEN = 'HALF_OPEN',
}

export interface CircuitBreakerOptions {
  failureThreshold: number; // Number of failures before opening circuit
  successThreshold: number; // Number of successes needed to close from half-open
  timeout: number; // How long to wait before trying half-open (ms)
  onStateChange?: (oldState: CircuitState, newState: CircuitState) => void;
}

export class CircuitBreakerError extends Error {
  constructor(serviceName: string) {
    super(`Circuit breaker is OPEN for service: ${serviceName}`);
    this.name = 'CircuitBreakerError';
  }
}

export class CircuitBreaker {
  private state: CircuitState = CircuitState.CLOSED;
  private failureCount: number = 0;
  private successCount: number = 0;
  private nextAttemptTime: number = 0;

  constructor(
    private serviceName: string,
    private options: CircuitBreakerOptions
  ) {}

  async execute<T>(fn: () => Promise<T>): Promise<T> {
    if (this.state === CircuitState.OPEN) {
      // Check if it's time to try half-open
      if (Date.now() >= this.nextAttemptTime) {
        this.setState(CircuitState.HALF_OPEN);
      } else {
        throw new CircuitBreakerError(this.serviceName);
      }
    }

    try {
      const result = await fn();
      this.onSuccess();
      return result;
    } catch (error) {
      this.onFailure();
      throw error;
    }
  }

  private onSuccess() {
    this.failureCount = 0;

    if (this.state === CircuitState.HALF_OPEN) {
      this.successCount++;

      if (this.successCount >= this.options.successThreshold) {
        this.setState(CircuitState.CLOSED);
        this.successCount = 0;
      }
    }
  }

  private onFailure() {
    this.failureCount++;
    this.successCount = 0;

    if (this.failureCount >= this.options.failureThreshold) {
      this.setState(CircuitState.OPEN);
      this.nextAttemptTime = Date.now() + this.options.timeout;
    }
  }

  private setState(newState: CircuitState) {
    const oldState = this.state;
    this.state = newState;

    console.log(
      `[Circuit Breaker] ${this.serviceName}: ${oldState} → ${newState}`
    );

    if (this.options.onStateChange) {
      this.options.onStateChange(oldState, newState);
    }
  }

  getState(): CircuitState {
    return this.state;
  }

  reset() {
    this.state = CircuitState.CLOSED;
    this.failureCount = 0;
    this.successCount = 0;
    this.nextAttemptTime = 0;
  }
}

/**
 * Circuit breaker registry for managing multiple service breakers
 */
class CircuitBreakerRegistry {
  private breakers: Map<string, CircuitBreaker> = new Map();

  getOrCreate(
    serviceName: string,
    options: Partial<CircuitBreakerOptions> = {}
  ): CircuitBreaker {
    if (!this.breakers.has(serviceName)) {
      const defaultOptions: CircuitBreakerOptions = {
        failureThreshold: 5, // Open after 5 failures
        successThreshold: 2, // Close after 2 successes in half-open
        timeout: 60000, // Wait 1 minute before half-open
        ...options,
      };

      this.breakers.set(
        serviceName,
        new CircuitBreaker(serviceName, defaultOptions)
      );
    }

    return this.breakers.get(serviceName)!;
  }

  get(serviceName: string): CircuitBreaker | undefined {
    return this.breakers.get(serviceName);
  }

  getAll(): Map<string, CircuitBreaker> {
    return new Map(this.breakers);
  }

  reset(serviceName: string) {
    this.breakers.get(serviceName)?.reset();
  }

  resetAll() {
    this.breakers.forEach((breaker) => breaker.reset());
  }
}

// Global registry
export const circuitBreakers = new CircuitBreakerRegistry();

/**
 * Usage example:
 *
 * import { circuitBreakers } from '@/lib/reliability/circuit-breaker';
 *
 * // Wrap external API call with circuit breaker
 * const breaker = circuitBreakers.getOrCreate('stripe-api', {
 *   failureThreshold: 3,
 *   timeout: 30000, // 30 seconds
 * });
 *
 * try {
 *   const result = await breaker.execute(async () => {
 *     return await fetch('https://api.stripe.com/v1/charges');
 *   });
 * } catch (error) {
 *   if (error instanceof CircuitBreakerError) {
 *     // Circuit is open, use fallback
 *     return fallbackResponse;
 *   }
 *   throw error;
 * }
 */
