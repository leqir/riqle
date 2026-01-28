'use client';

import { useEffect } from 'react';
import { ErrorPage } from '@/components/errors/ErrorPage';
import { ERROR_MESSAGES } from '@/lib/errors/messages';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to console in development
    console.error('Global error caught:', error);

    // In production, this would be sent to Sentry
    // Sentry is already configured via next.config.ts
  }, [error]);

  return (
    <ErrorPage
      title={ERROR_MESSAGES.general.title}
      message={ERROR_MESSAGES.general.message}
      action={ERROR_MESSAGES.general.action}
      onAction={reset}
    />
  );
}
