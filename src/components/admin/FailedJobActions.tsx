'use client';

import { useRouter } from 'next/navigation';
import { useTransition } from 'react';

/**
 * Failed Job Actions Component
 *
 * Client-side controls for retrying/abandoning failed background jobs
 * Epic 11 Principle: "Explicit actions over automation" - Manual control
 */

interface JobActionProps {
  jobId: string;
}

export function RetryJobButton({ jobId }: JobActionProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleRetry = () => {
    if (!confirm('Retry this job?')) return;

    startTransition(async () => {
      try {
        const response = await fetch(`/api/admin/failed-jobs/${jobId}/retry`, {
          method: 'POST',
        });

        if (response.ok) {
          router.refresh();
        } else {
          alert('Failed to retry job');
        }
      } catch {
        alert('Error retrying job');
      }
    });
  };

  return (
    <button
      onClick={handleRetry}
      disabled={isPending}
      className="rounded-md bg-indigo-600 px-3 py-1 text-sm text-white hover:bg-indigo-700 disabled:opacity-50"
    >
      {isPending ? 'Retrying...' : 'Retry'}
    </button>
  );
}

export function AbandonJobButton({ jobId }: JobActionProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleAbandon = () => {
    if (!confirm('Abandon this job? This cannot be undone.')) return;

    startTransition(async () => {
      try {
        const response = await fetch(`/api/admin/failed-jobs/${jobId}/abandon`, {
          method: 'POST',
        });

        if (response.ok) {
          router.refresh();
        } else {
          alert('Failed to abandon job');
        }
      } catch {
        alert('Error abandoning job');
      }
    });
  };

  return (
    <button
      onClick={handleAbandon}
      disabled={isPending}
      className="rounded-md border border-stone-300 px-3 py-1 text-sm text-stone-700 hover:bg-stone-50 disabled:opacity-50"
    >
      {isPending ? 'Abandoning...' : 'Abandon'}
    </button>
  );
}
