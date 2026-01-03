/**
 * Performance Monitoring & Logging
 *
 * Epic 9 - Story 9.13: Performance Monitoring
 *
 * Features:
 * - Timing metrics for critical operations
 * - Structured logging for debugging
 * - Performance threshold alerts
 * - Request/response tracking
 *
 * Usage:
 * const timer = startTimer('operation_name');
 * // ... do work ...
 * timer.end({ metadata });
 *
 * Performance Targets (from Epic 9):
 * - Checkout creation: < 500ms
 * - Webhook acknowledgment: < 1s
 * - Database queries: < 100ms (most)
 */

import 'server-only';

/**
 * Performance thresholds (in milliseconds)
 */
export const PERFORMANCE_THRESHOLDS = {
  checkout_creation: 500,
  webhook_processing: 1000,
  database_query: 100,
  email_send: 2000,
  entitlement_check: 50,
} as const;

type PerformanceMetric = keyof typeof PERFORMANCE_THRESHOLDS;

/**
 * Timer for measuring operation duration
 */
export interface Timer {
  end: (metadata?: Record<string, unknown>) => void;
  duration: () => number;
}

/**
 * Start a performance timer
 *
 * @param operation - Name of the operation being timed
 * @param metric - Performance metric type (for threshold checking)
 * @returns Timer object with end() method
 */
export function startTimer(operation: string, metric?: PerformanceMetric): Timer {
  const startTime = performance.now();
  let ended = false;

  return {
    end: (metadata?: Record<string, unknown>) => {
      if (ended) {
        console.warn(`[Monitor] Timer for "${operation}" already ended`);
        return;
      }

      const duration = performance.now() - startTime;
      ended = true;

      // Check against performance threshold if metric provided
      if (metric) {
        const threshold = PERFORMANCE_THRESHOLDS[metric];
        const status = duration > threshold ? 'SLOW' : 'OK';

        console.log(
          `[Monitor] ${status} ${operation}: ${duration.toFixed(2)}ms` +
            (duration > threshold ? ` (threshold: ${threshold}ms)` : ''),
          metadata ? JSON.stringify(metadata) : ''
        );

        // Log slow operations prominently
        if (duration > threshold) {
          console.warn(`[Monitor] PERFORMANCE WARNING: ${operation} exceeded threshold`, {
            duration: `${duration.toFixed(2)}ms`,
            threshold: `${threshold}ms`,
            overhead: `${(duration - threshold).toFixed(2)}ms`,
            metadata,
          });
        }
      } else {
        // Simple timing log without threshold check
        console.log(
          `[Monitor] ${operation}: ${duration.toFixed(2)}ms`,
          metadata ? JSON.stringify(metadata) : ''
        );
      }
    },

    duration: () => {
      return performance.now() - startTime;
    },
  };
}

/**
 * Log structured event for debugging and analysis
 *
 * @param event - Event name
 * @param data - Event data
 * @param level - Log level (info, warn, error)
 */
export function logEvent(
  event: string,
  data?: Record<string, unknown>,
  level: 'info' | 'warn' | 'error' = 'info'
) {
  const timestamp = new Date().toISOString();
  const logData = {
    timestamp,
    event,
    ...data,
  };

  switch (level) {
    case 'error':
      console.error(`[Event] ${event}`, logData);
      break;
    case 'warn':
      console.warn(`[Event] ${event}`, logData);
      break;
    default:
      console.log(`[Event] ${event}`, logData);
  }
}

/**
 * Track webhook processing performance
 *
 * @param eventType - Stripe event type
 * @param eventId - Stripe event ID
 * @returns Timer for webhook processing
 */
export function trackWebhookProcessing(eventType: string, eventId: string): Timer {
  logEvent('webhook_received', { eventType, eventId });
  return startTimer(`webhook_${eventType}`, 'webhook_processing');
}

/**
 * Track checkout session creation performance
 *
 * @param productId - Product being purchased
 * @param userId - User making purchase
 * @returns Timer for checkout creation
 */
export function trackCheckoutCreation(productId: string, userId: string): Timer {
  logEvent('checkout_started', { productId, userId });
  return startTimer('checkout_creation', 'checkout_creation');
}

/**
 * Track entitlement check performance
 *
 * @param userId - User ID being checked
 * @param productId - Product ID being checked
 * @returns Timer for entitlement check
 */
export function trackEntitlementCheck(userId: string, productId: string): Timer {
  return startTimer(`entitlement_check_${productId}`, 'entitlement_check');
}

/**
 * Track database query performance
 *
 * @param queryName - Name/description of the query
 * @returns Timer for database query
 */
export function trackDatabaseQuery(queryName: string): Timer {
  return startTimer(`db_${queryName}`, 'database_query');
}

/**
 * Track email sending performance
 *
 * @param emailType - Type of email being sent
 * @param recipient - Email recipient
 * @returns Timer for email sending
 */
export function trackEmailSend(emailType: string, recipient: string): Timer {
  logEvent('email_queued', { emailType, recipient });
  return startTimer(`email_${emailType}`, 'email_send');
}

/**
 * Log error with context
 *
 * @param error - Error object or message
 * @param context - Additional context about the error
 */
export function logError(error: unknown, context?: Record<string, unknown>) {
  const errorData = {
    message: error instanceof Error ? error.message : String(error),
    stack: error instanceof Error ? error.stack : undefined,
    ...context,
  };

  logEvent('error_occurred', errorData, 'error');
}

/**
 * Create performance summary for a set of operations
 *
 * Useful for tracking multi-step processes like fulfillment.
 *
 * @param name - Name of the summary
 * @returns Summary object with timing methods
 */
export function createPerformanceSummary(name: string) {
  const steps: Array<{ name: string; duration: number }> = [];
  const startTime = performance.now();

  return {
    addStep: (stepName: string, duration: number) => {
      steps.push({ name: stepName, duration });
    },

    end: () => {
      const totalDuration = performance.now() - startTime;

      console.log(`[Monitor] Performance Summary: ${name}`, {
        totalDuration: `${totalDuration.toFixed(2)}ms`,
        steps: steps.map((s) => ({
          name: s.name,
          duration: `${s.duration.toFixed(2)}ms`,
          percentage: `${((s.duration / totalDuration) * 100).toFixed(1)}%`,
        })),
      });

      return {
        totalDuration,
        steps,
      };
    },
  };
}
