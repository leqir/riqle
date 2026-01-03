import * as Sentry from '@sentry/nextjs';

const SENTRY_DSN = process.env.NEXT_PUBLIC_SENTRY_DSN;

Sentry.init({
  dsn: SENTRY_DSN,
  environment: process.env.NEXT_PUBLIC_VERCEL_ENV || process.env.NODE_ENV,
  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
  debug: process.env.NODE_ENV === 'development',
  integrations: [
    new Sentry.Replay({
      maskAllText: true,
      blockAllMedia: true,
    }),
  ],
  replaySessionSampleRate: 0.1,
  replayOnErrorSampleRate: 1.0,
  beforeSend(event, hint) {
    // Filter out errors we don't want to send
    if (event.exception) {
      const error = hint.originalException;
      if (error instanceof Error) {
        // Skip network errors that are expected
        if (error.message.includes('Network') || error.message.includes('timeout')) {
          // Still send but with lower priority
          event.level = 'warning';
        }
      }
    }
    return event;
  },
  attachStacktrace: true,
});
