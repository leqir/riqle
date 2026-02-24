'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/trpc/react';

interface TutoringBookingActionsProps {
  bookingId: string;
}

export function TutoringBookingActions({ bookingId }: TutoringBookingActionsProps) {
  const router = useRouter();
  const [meetingLink, setMeetingLink] = React.useState('');
  const [showConfirmForm, setShowConfirmForm] = React.useState(false);
  const [cancelReason, setCancelReason] = React.useState('');
  const [showCancelForm, setShowCancelForm] = React.useState(false);

  const confirm = api.tutoring.adminConfirmBooking.useMutation({
    onSuccess: () => router.refresh(),
  });

  const cancel = api.tutoring.adminCancelBooking.useMutation({
    onSuccess: () => router.refresh(),
  });

  if (showConfirmForm) {
    return (
      <div className="min-w-[220px] space-y-2">
        <input
          type="url"
          placeholder="Zoom link (optional)"
          value={meetingLink}
          onChange={(e) => setMeetingLink(e.target.value)}
          className="w-full rounded border border-slate-200 px-2 py-1 text-xs focus:border-slate-400 focus:outline-none"
        />
        <div className="flex gap-2">
          <button
            onClick={() => confirm.mutate({ id: bookingId, meetingLink: meetingLink || undefined })}
            disabled={confirm.isPending}
            className="rounded bg-green-600 px-3 py-1 text-xs font-semibold text-white hover:bg-green-700 disabled:opacity-50"
          >
            {confirm.isPending ? '...' : 'Confirm'}
          </button>
          <button
            onClick={() => setShowConfirmForm(false)}
            className="rounded border border-slate-200 px-3 py-1 text-xs text-slate-600 hover:border-slate-400"
          >
            Cancel
          </button>
        </div>
        {confirm.error && <p className="text-xs text-red-600">{confirm.error.message}</p>}
      </div>
    );
  }

  if (showCancelForm) {
    return (
      <div className="min-w-[220px] space-y-2">
        <input
          type="text"
          placeholder="Reason (optional)"
          value={cancelReason}
          onChange={(e) => setCancelReason(e.target.value)}
          className="w-full rounded border border-slate-200 px-2 py-1 text-xs focus:border-slate-400 focus:outline-none"
        />
        <div className="flex gap-2">
          <button
            onClick={() => cancel.mutate({ id: bookingId, reason: cancelReason || undefined })}
            disabled={cancel.isPending}
            className="rounded bg-red-600 px-3 py-1 text-xs font-semibold text-white hover:bg-red-700 disabled:opacity-50"
          >
            {cancel.isPending ? '...' : 'Cancel booking'}
          </button>
          <button
            onClick={() => setShowCancelForm(false)}
            className="rounded border border-slate-200 px-3 py-1 text-xs text-slate-600 hover:border-slate-400"
          >
            Back
          </button>
        </div>
        {cancel.error && <p className="text-xs text-red-600">{cancel.error.message}</p>}
      </div>
    );
  }

  return (
    <div className="flex gap-2">
      <button
        onClick={() => setShowConfirmForm(true)}
        className="rounded bg-green-600 px-3 py-1 text-xs font-semibold text-white hover:bg-green-700"
      >
        Confirm
      </button>
      <button
        onClick={() => setShowCancelForm(true)}
        className="rounded border border-red-200 px-3 py-1 text-xs font-semibold text-red-600 hover:border-red-400"
      >
        Cancel
      </button>
    </div>
  );
}
