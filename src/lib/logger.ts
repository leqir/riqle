import * as Sentry from '@sentry/nextjs';
import 'server-only';

export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

export type LogEventData = {
  type: string;
  userId?: string;
  stripeEventId?: string;
  requestId?: string;
  data?: Record<string, unknown>;
  error?: Error;
  metadata?: Record<string, unknown>;
};

/**
 * Format and log an event with structured logging
 * Includes timestamp, request ID, user ID, and other context
 */
export function logEvent(event: LogEventData, level: LogLevel = 'info'): void {
  const timestamp = new Date().toISOString();

  const logPayload = {
    timestamp,
    level,
    type: event.type,
    userId: event.userId,
    stripeEventId: event.stripeEventId,
    requestId: event.requestId,
    data: event.data,
    metadata: event.metadata,
  };

  // Log to console with structured JSON
  const logMessage = JSON.stringify(logPayload);

  switch (level) {
    case 'debug':
      if (process.env.NODE_ENV === 'development') {
        console.debug(logMessage);
      }
      break;
    case 'info':
      console.info(logMessage);
      break;
    case 'warn':
      console.warn(logMessage);
      // Also send to Sentry as breadcrumb
      Sentry.captureMessage(event.type, 'warning');
      break;
    case 'error':
      console.error(logMessage);
      // Send to Sentry
      if (event.error) {
        Sentry.captureException(event.error, {
          contexts: {
            event: {
              type: event.type,
              userId: event.userId,
              stripeEventId: event.stripeEventId,
              requestId: event.requestId,
            },
          },
          tags: {
            eventType: event.type,
          },
        });
      }
      break;
  }
}

/**
 * Log a business event (checkout, payment, entitlement, etc.)
 */
export function logBusinessEvent(
  eventType:
    | 'checkout_created'
    | 'payment_succeeded'
    | 'entitlement_granted'
    | 'download_link_issued'
    | string,
  data: {
    userId?: string;
    stripeEventId?: string;
    requestId?: string;
    metadata?: Record<string, unknown>;
  }
): void {
  logEvent(
    {
      type: `business_event:${eventType}`,
      userId: data.userId,
      stripeEventId: data.stripeEventId,
      requestId: data.requestId,
      metadata: data.metadata,
    },
    'info'
  );

  // Also add as Sentry breadcrumb for context
  Sentry.addBreadcrumb({
    category: 'business_event',
    message: eventType,
    level: 'info',
    data: {
      userId: data.userId,
      stripeEventId: data.stripeEventId,
      requestId: data.requestId,
      ...data.metadata,
    },
  });
}

/**
 * Log an error with full context
 */
export function logErrorEvent(
  error: Error,
  context: {
    userId?: string;
    requestId?: string;
    action?: string;
    metadata?: Record<string, unknown>;
  }
): void {
  logEvent(
    {
      type: 'error',
      userId: context.userId,
      requestId: context.requestId,
      error,
      metadata: {
        action: context.action,
        ...context.metadata,
      },
    },
    'error'
  );
}

/**
 * Log a warning event
 */
export function logWarningEvent(
  message: string,
  context: {
    userId?: string;
    requestId?: string;
    metadata?: Record<string, unknown>;
  }
): void {
  logEvent(
    {
      type: 'warning',
      userId: context.userId,
      requestId: context.requestId,
      metadata: context.metadata,
    },
    'warn'
  );
}

/**
 * Create a request-scoped logger with automatic request ID
 */
export function createRequestLogger(requestId: string, userId?: string) {
  return {
    info: (type: string, data?: Record<string, unknown>) => {
      logEvent({ type, userId, requestId, data }, 'info');
    },
    warn: (type: string, data?: Record<string, unknown>) => {
      logEvent({ type, userId, requestId, data }, 'warn');
    },
    error: (type: string, error: Error, data?: Record<string, unknown>) => {
      logEvent({ type, userId, requestId, error, data }, 'error');
    },
    businessEvent: (eventType: string, metadata?: Record<string, unknown>) => {
      logBusinessEvent(eventType, {
        userId,
        requestId,
        metadata,
      });
    },
  };
}

/**
 * Set user context for all subsequent events
 */
export function setUserContext(userId: string, context?: Record<string, unknown>): void {
  Sentry.setUser({
    id: userId,
    ...context,
  });
}

/**
 * Clear user context
 */
export function clearUserContext(): void {
  Sentry.setUser(null);
}

/**
 * Add custom context to Sentry
 */
export function addSentryContext(key: string, value: Record<string, unknown>): void {
  Sentry.setContext(key, value);
}

/**
 * Add a breadcrumb for debugging
 */
export function addBreadcrumb(
  message: string,
  category: string,
  level: 'debug' | 'info' | 'warning' | 'error' = 'info',
  data?: Record<string, unknown>
): void {
  Sentry.addBreadcrumb({
    message,
    category,
    level,
    data,
    timestamp: Date.now() / 1000,
  });
}
