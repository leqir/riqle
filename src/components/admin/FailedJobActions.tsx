'use client';

import { useRouter } from 'next/navigation';
import { useTransition, useState } from 'react';
import { Button } from './ui/Button';

/**
 * Failed Job Actions Component - Stripe-Inspired Design
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
  const [showConfirm, setShowConfirm] = useState(false);

  const handleRetry = () => {
    if (!showConfirm) {
      setShowConfirm(true);
      return;
    }

    startTransition(async () => {
      try {
        const response = await fetch(`/api/admin/failed-jobs/${jobId}/retry`, {
          method: 'POST',
        });

        if (response.ok) {
          router.refresh();
        }
      } catch (error) {
        console.error('Error retrying job:', error);
      }
      setShowConfirm(false);
    });
  };

  if (showConfirm) {
    return (
      <div className="flex gap-2">
        <Button variant="primary" onClick={handleRetry} loading={isPending} className="text-xs">
          Confirm Retry
        </Button>
        <Button variant="secondary" onClick={() => setShowConfirm(false)} className="text-xs">
          Cancel
        </Button>
      </div>
    );
  }

  return (
    <Button variant="primary" onClick={handleRetry} disabled={isPending} className="text-xs">
      Retry
    </Button>
  );
}

export function AbandonJobButton({ jobId }: JobActionProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [showConfirm, setShowConfirm] = useState(false);

  const handleAbandon = () => {
    if (!showConfirm) {
      setShowConfirm(true);
      return;
    }

    startTransition(async () => {
      try {
        const response = await fetch(`/api/admin/failed-jobs/${jobId}/abandon`, {
          method: 'POST',
        });

        if (response.ok) {
          router.refresh();
        }
      } catch (error) {
        console.error('Error abandoning job:', error);
      }
      setShowConfirm(false);
    });
  };

  if (showConfirm) {
    return (
      <div className="flex gap-2">
        <Button variant="danger" onClick={handleAbandon} loading={isPending} className="text-xs">
          Confirm Abandon
        </Button>
        <Button variant="secondary" onClick={() => setShowConfirm(false)} className="text-xs">
          Cancel
        </Button>
      </div>
    );
  }

  return (
    <Button variant="secondary" onClick={handleAbandon} disabled={isPending} className="text-xs">
      Abandon
    </Button>
  );
}
