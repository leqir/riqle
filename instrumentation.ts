/**
 * Next.js Instrumentation File
 * This file is executed once per server restart
 * Reference: https://nextjs.org/docs/app/building-your-application/optimizing/instrumentation
 */

export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    // Load server-side Sentry configuration
    await import('./sentry.server.config');
  }

  if (process.env.NEXT_RUNTIME === 'edge') {
    // Load edge runtime Sentry configuration
    await import('./sentry.edge.config');
  }
}
