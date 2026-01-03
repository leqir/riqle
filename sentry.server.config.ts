import * as Sentry from '@sentry/nextjs';
import { env } from './src/env';

Sentry.init({
  dsn: env.SENTRY_DSN,
  environment: env.NODE_ENV,
  tracesSampleRate: env.NODE_ENV === 'production' ? 0.1 : 1.0,
  debug: env.NODE_ENV === 'development',
  integrations: [
    new Sentry.Integrations.Http({ tracing: true }),
    new Sentry.Integrations.OnUncaughtException(),
    new Sentry.Integrations.OnUnhandledRejection(),
  ],
  beforeSend(event, hint) {
    // Filter out errors we don't want to send
    if (event.exception) {
      const error = hint.originalException;
      if (error instanceof Error) {
        // Skip certain error types that are not critical
        if (error.message.includes('NEXT_REDIRECT') || error.message.includes('NEXT_NOT_FOUND')) {
          return null;
        }
      }
    }
    return event;
  },
  attachStacktrace: true,
});
