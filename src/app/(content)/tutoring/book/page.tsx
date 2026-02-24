'use client';

import * as React from 'react';
import Link from 'next/link';
import { api } from '@/trpc/react';

type MeetingFormat = 'in_person' | 'online';

const YEAR_LEVELS = ['Year 7', 'Year 8', 'Year 9', 'Year 10', 'Year 11', 'Year 12'];
const SUBJECTS = [
  'English',
  'English Standard',
  'English Advanced',
  'Extension 1',
  'Extension 2',
  'EALD',
];

const DAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

type Slot = { start: Date; end: Date; available: boolean };

function toAestDateKey(date: Date): string {
  return date.toLocaleDateString('en-AU', {
    timeZone: 'Australia/Sydney',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
}

function formatTime(date: Date): string {
  return date.toLocaleTimeString('en-AU', {
    timeZone: 'Australia/Sydney',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
}

function formatFullDate(date: Date): string {
  return date.toLocaleDateString('en-AU', {
    timeZone: 'Australia/Sydney',
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

/** Returns a Date at UTC midnight for a given AEST calendar date key "DD/MM/YYYY" */
function parseAestDateKey(key: string): { year: number; month: number; day: number } {
  const [d, m, y] = key.split('/').map(Number);
  return { year: y!, month: m! - 1, day: d! };
}

export default function BookingPage() {
  const { data: rawSlots, isLoading: slotsLoading } = api.tutoring.getAvailableSlots.useQuery({
    weeksAhead: 8,
  });

  const slots: Slot[] = React.useMemo(
    () =>
      (rawSlots ?? []).map((s) => ({
        start: new Date(s.start),
        end: new Date(s.end),
        available: s.available,
      })),
    [rawSlots]
  );

  const createBooking = api.tutoring.createBooking.useMutation();

  // Calendar state
  const today = new Date();
  const [calYear, setCalYear] = React.useState(today.getFullYear());
  const [calMonth, setCalMonth] = React.useState(today.getMonth());

  // Selection state
  const [selectedDateKey, setSelectedDateKey] = React.useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = React.useState<Slot | null>(null);

  // Step: 'pick' = calendar+time, 'details' = form, 'done' = confirmation
  const [step, setStep] = React.useState<'pick' | 'details' | 'done'>('pick');

  // Form
  const [form, setForm] = React.useState({
    studentName: '',
    studentEmail: '',
    studentPhone: '',
    yearLevel: '',
    subject: '',
    goals: '',
    meetingFormat: 'online' as MeetingFormat,
    preferredLocation: '',
  });
  const [submitError, setSubmitError] = React.useState<string | null>(null);

  // Group slots by AEST date key → set of available dates
  const slotsByDate = React.useMemo(() => {
    const map = new Map<string, Slot[]>();
    for (const slot of slots) {
      const key = toAestDateKey(slot.start);
      const arr = map.get(key) ?? [];
      arr.push(slot);
      map.set(key, arr);
    }
    return map;
  }, [slots]);

  const availableDateKeys = React.useMemo(() => {
    const keys = new Set<string>();
    for (const [key, daySlots] of slotsByDate.entries()) {
      if (daySlots.some((s) => s.available)) keys.add(key);
    }
    return keys;
  }, [slotsByDate]);

  // Calendar grid helpers
  const daysInMonth = new Date(calYear, calMonth + 1, 0).getDate();
  const firstDow = new Date(calYear, calMonth, 1).getDay(); // 0=Sun

  function prevMonth() {
    if (calMonth === 0) {
      setCalYear(calYear - 1);
      setCalMonth(11);
    } else setCalMonth(calMonth - 1);
  }
  function nextMonth() {
    if (calMonth === 11) {
      setCalYear(calYear + 1);
      setCalMonth(0);
    } else setCalMonth(calMonth + 1);
  }

  // Is this calendar cell in the past?
  function isPast(day: number): boolean {
    const d = new Date(calYear, calMonth, day);
    const todayMidnight = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    return d < todayMidnight;
  }

  // Calendar cell date key (AEST, using local midnight approximation for display)
  function cellDateKey(day: number): string {
    // Construct a date string that matches the AEST grouping from slot data
    const dd = String(day).padStart(2, '0');
    const mm = String(calMonth + 1).padStart(2, '0');
    return `${dd}/${mm}/${calYear}`;
  }

  function handleDayClick(day: number) {
    const key = cellDateKey(day);
    if (!availableDateKeys.has(key)) return;
    setSelectedDateKey(key);
    setSelectedSlot(null);
  }

  function handleSlotClick(slot: Slot) {
    if (!slot.available) return;
    setSelectedSlot(slot);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedSlot) return;
    setSubmitError(null);
    try {
      await createBooking.mutateAsync({
        studentName: form.studentName,
        studentEmail: form.studentEmail,
        studentPhone: form.studentPhone || undefined,
        yearLevel: form.yearLevel || undefined,
        subject: form.subject || undefined,
        goals: form.goals || undefined,
        scheduledAt: selectedSlot.start,
        meetingFormat: form.meetingFormat,
        preferredLocation:
          form.meetingFormat === 'in_person' ? form.preferredLocation || undefined : undefined,
      });
      setStep('done');
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : 'Something went wrong. Please try again.'
      );
    }
  }

  // ── Confirmation screen ──────────────────────────────────────────────────────
  if (step === 'done' && selectedSlot) {
    return (
      <div className="min-h-screen bg-white">
        <div className="mx-auto max-w-2xl px-6 py-24 md:px-8 md:py-32">
          <div className="rounded-xl border border-stone-200 bg-stone-50 p-8">
            <p className="mb-1 text-sm font-medium uppercase tracking-wider text-stone-400">
              request received
            </p>
            <h1 className="mb-4 text-3xl font-semibold text-stone-900">booking request sent</h1>
            <p className="mb-6 text-lg text-stone-600">
              i&apos;ll review your request and send a confirmation email within a few hours.
            </p>
            <div className="space-y-2 border-t border-stone-200 pt-6 text-sm text-stone-600">
              <p>
                <span className="font-medium text-stone-900">date:</span>{' '}
                {formatFullDate(selectedSlot.start)}
              </p>
              <p>
                <span className="font-medium text-stone-900">time:</span>{' '}
                {formatTime(selectedSlot.start)} – {formatTime(selectedSlot.end)} AEST
              </p>
              <p>
                <span className="font-medium text-stone-900">format:</span>{' '}
                {form.meetingFormat === 'in_person'
                  ? `in person${form.preferredLocation ? ` · ${form.preferredLocation}` : ''}`
                  : 'online · zoom'}
              </p>
              {form.meetingFormat === 'in_person' && (
                <p className="text-stone-400">
                  i&apos;ll be in touch to confirm the location before your session.
                </p>
              )}
            </div>
          </div>
          <Link
            href="/tutoring"
            className="mt-6 inline-block text-sm text-stone-400 underline underline-offset-2 hover:text-stone-900"
          >
            ← back to tutoring
          </Link>
        </div>
      </div>
    );
  }

  // ── Details form ─────────────────────────────────────────────────────────────
  if (step === 'details' && selectedSlot) {
    return (
      <div className="min-h-screen bg-white">
        <div className="mx-auto max-w-2xl px-6 py-24 md:px-8 md:py-32">
          <Link
            href="/tutoring"
            className="mb-6 inline-block text-sm text-stone-400 hover:text-stone-700"
          >
            ← tutoring
          </Link>

          <div className="mb-8 flex items-center gap-3">
            <button
              onClick={() => setStep('pick')}
              className="text-sm text-stone-400 hover:text-stone-700"
            >
              ←
            </button>
            <div className="rounded-lg border border-stone-200 bg-stone-50 px-5 py-3 text-sm text-stone-700">
              <span className="font-semibold text-stone-900">
                {formatFullDate(selectedSlot.start)}
              </span>
              {' · '}
              {formatTime(selectedSlot.start)} – {formatTime(selectedSlot.end)} AEST
            </div>
          </div>

          <h1 className="mb-8 text-2xl font-semibold text-stone-900">your details</h1>

          {submitError && (
            <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">
              {submitError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-stone-900">
                  name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={form.studentName}
                  onChange={(e) => setForm({ ...form, studentName: e.target.value })}
                  placeholder="your name"
                  className="w-full rounded-lg border border-stone-200 px-4 py-3 text-sm text-stone-900 placeholder-stone-300 focus:border-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-900"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-stone-900">
                  email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={form.studentEmail}
                  onChange={(e) => setForm({ ...form, studentEmail: e.target.value })}
                  placeholder="you@example.com"
                  className="w-full rounded-lg border border-stone-200 px-4 py-3 text-sm text-stone-900 placeholder-stone-300 focus:border-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-900"
                />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-stone-900">
                phone <span className="font-normal text-stone-400">(optional)</span>
              </label>
              <input
                type="tel"
                value={form.studentPhone}
                onChange={(e) => setForm({ ...form, studentPhone: e.target.value })}
                placeholder="04xx xxx xxx"
                className="w-full rounded-lg border border-stone-200 px-4 py-3 text-sm text-stone-900 placeholder-stone-300 focus:border-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-900"
              />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-stone-900">
                  year level
                </label>
                <select
                  value={form.yearLevel}
                  onChange={(e) => setForm({ ...form, yearLevel: e.target.value })}
                  className="w-full rounded-lg border border-stone-200 px-4 py-3 text-sm text-stone-900 focus:border-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-900"
                >
                  <option value="">select year</option>
                  {YEAR_LEVELS.map((y) => (
                    <option key={y} value={y}>
                      {y}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-stone-900">subject</label>
                <select
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  className="w-full rounded-lg border border-stone-200 px-4 py-3 text-sm text-stone-900 focus:border-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-900"
                >
                  <option value="">select subject</option>
                  {SUBJECTS.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-stone-900">
                what do you want to work on?{' '}
                <span className="font-normal text-stone-400">(optional)</span>
              </label>
              <textarea
                value={form.goals}
                onChange={(e) => setForm({ ...form, goals: e.target.value })}
                rows={3}
                placeholder="e.g. essay structure, unseen texts, a specific module..."
                className="w-full rounded-lg border border-stone-200 px-4 py-3 text-sm text-stone-900 placeholder-stone-300 focus:border-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-900"
              />
            </div>

            <div>
              <label className="mb-3 block text-sm font-medium text-stone-900">
                session format <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 gap-3">
                {(
                  [
                    { value: 'online', label: 'online · zoom' },
                    { value: 'in_person', label: 'in person' },
                  ] as const
                ).map(({ value, label }) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setForm({ ...form, meetingFormat: value })}
                    className={`rounded-lg border px-5 py-3 text-sm font-medium transition-colors ${form.meetingFormat === value ? 'border-stone-900 bg-stone-900 text-white' : 'border-stone-200 text-stone-700 hover:border-stone-400'}`}
                  >
                    {label}
                  </button>
                ))}
              </div>
              {form.meetingFormat === 'in_person' && (
                <div className="mt-3">
                  <label className="mb-1.5 block text-sm font-medium text-stone-900">
                    preferred location{' '}
                    <span className="font-normal text-stone-400">(suburb or area)</span>
                  </label>
                  <input
                    type="text"
                    value={form.preferredLocation}
                    onChange={(e) => setForm({ ...form, preferredLocation: e.target.value })}
                    placeholder="e.g. Hurstville Library, home address, UNSW campus..."
                    className="w-full rounded-lg border border-stone-200 px-4 py-3 text-sm text-stone-900 placeholder-stone-300 focus:border-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-900"
                  />
                  <p className="mt-1.5 text-xs text-stone-400">
                    be specific — i&apos;ll confirm whether it works before the session.
                  </p>
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={createBooking.isPending || !form.studentName || !form.studentEmail}
              className="w-full rounded-full border-2 border-stone-900 bg-stone-900 px-8 py-4 text-base font-semibold text-white transition-all hover:bg-white hover:text-stone-900 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {createBooking.isPending ? 'sending request...' : 'request booking →'}
            </button>
            <p className="text-center text-xs text-stone-400">
              your booking is not confirmed until you receive a confirmation email.
            </p>
          </form>
        </div>
      </div>
    );
  }

  // ── Calendar + time picker ───────────────────────────────────────────────────
  const selectedDateSlots = selectedDateKey ? (slotsByDate.get(selectedDateKey) ?? []) : [];
  const canGoBack = calYear > today.getFullYear() || calMonth > today.getMonth();

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-4xl px-6 py-24 md:px-8 md:py-32">
        <header className="mb-10">
          <Link
            href="/tutoring"
            className="mb-4 inline-block text-sm text-stone-400 hover:text-stone-700"
          >
            ← tutoring
          </Link>
          <p className="mb-2 text-sm font-medium uppercase tracking-wider text-stone-500">
            book a session
          </p>
          <h1 className="text-[clamp(2rem,5vw,3rem)] font-semibold leading-tight tracking-tight text-stone-900">
            1:1 hsc english
          </h1>
          <p className="mt-2 text-stone-500">
            a$80 · 60 min · years 7–12 · english · advanced · ext 1 &amp; 2 · eald
          </p>
        </header>

        <div className="grid gap-8 lg:grid-cols-[1fr_280px]">
          {/* ── Calendar ── */}
          <div>
            {/* Month navigation */}
            <div className="mb-6 flex items-center justify-between">
              <button
                onClick={prevMonth}
                disabled={!canGoBack}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-stone-200 text-stone-600 transition-colors hover:border-stone-400 hover:text-stone-900 disabled:cursor-not-allowed disabled:opacity-30"
              >
                ←
              </button>
              <h2 className="text-base font-semibold text-stone-900">
                {MONTH_NAMES[calMonth]} {calYear}
              </h2>
              <button
                onClick={nextMonth}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-stone-200 text-stone-600 transition-colors hover:border-stone-400 hover:text-stone-900"
              >
                →
              </button>
            </div>

            {/* Day-of-week headers */}
            <div className="mb-2 grid grid-cols-7 text-center">
              {DAY_LABELS.map((d) => (
                <div
                  key={d}
                  className="py-1 text-xs font-medium uppercase tracking-wider text-stone-400"
                >
                  {d}
                </div>
              ))}
            </div>

            {/* Day grid */}
            {slotsLoading ? (
              <div className="grid grid-cols-7 gap-1">
                {Array.from({ length: 35 }).map((_, i) => (
                  <div key={i} className="aspect-square animate-pulse rounded-lg bg-stone-100" />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-7 gap-1">
                {/* Empty cells before month start */}
                {Array.from({ length: firstDow }).map((_, i) => (
                  <div key={`empty-${i}`} />
                ))}

                {/* Day cells */}
                {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => {
                  const key = cellDateKey(day);
                  const past = isPast(day);
                  const hasSlots = availableDateKeys.has(key);
                  const isSelected = selectedDateKey === key;

                  const isToday =
                    day === today.getDate() &&
                    calMonth === today.getMonth() &&
                    calYear === today.getFullYear();

                  let cellClass =
                    'relative flex aspect-square items-center justify-center rounded-lg text-sm font-medium transition-colors ';

                  if (isSelected) {
                    cellClass += 'bg-stone-900 text-white';
                  } else if (!past && hasSlots) {
                    cellClass +=
                      'cursor-pointer border border-stone-200 text-stone-900 hover:border-stone-900 hover:bg-stone-50';
                  } else {
                    cellClass += 'cursor-default text-stone-300';
                  }

                  return (
                    <button
                      key={day}
                      onClick={() => handleDayClick(day)}
                      disabled={past || !hasSlots}
                      className={cellClass}
                    >
                      {day}
                      {isToday && !isSelected && (
                        <span className="absolute bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-stone-400" />
                      )}
                    </button>
                  );
                })}
              </div>
            )}

            {/* Legend */}
            <div className="mt-4 flex items-center gap-5 text-xs text-stone-400">
              <span className="flex items-center gap-1.5">
                <span className="inline-block h-3 w-3 rounded border border-stone-200" />
                available
              </span>
              <span className="flex items-center gap-1.5">
                <span className="inline-block h-3 w-3 rounded bg-stone-900" />
                selected
              </span>
            </div>
          </div>

          {/* ── Time slots panel ── */}
          <div>
            {!selectedDateKey ? (
              <div className="flex h-full items-start pt-2">
                <p className="text-sm text-stone-400">select a date to see available times</p>
              </div>
            ) : (
              <div>
                <h3 className="mb-4 text-sm font-semibold text-stone-700">
                  {(() => {
                    const { year, month, day } = parseAestDateKey(selectedDateKey);
                    return new Date(year, month, day).toLocaleDateString('en-AU', {
                      weekday: 'long',
                      day: 'numeric',
                      month: 'long',
                    });
                  })()}
                </h3>

                <div className="space-y-2">
                  {selectedDateSlots.map((slot, i) => {
                    const isChosen = selectedSlot?.start.getTime() === slot.start.getTime();
                    return slot.available ? (
                      <button
                        key={i}
                        onClick={() => handleSlotClick(slot)}
                        className={`w-full rounded-lg border px-4 py-3 text-left text-sm font-medium transition-colors ${
                          isChosen
                            ? 'border-stone-900 bg-stone-900 text-white'
                            : 'border-stone-200 text-stone-900 hover:border-stone-900 hover:bg-stone-50'
                        }`}
                      >
                        {formatTime(slot.start)} – {formatTime(slot.end)}
                      </button>
                    ) : (
                      <div
                        key={i}
                        className="flex items-center justify-between rounded-lg border border-stone-100 px-4 py-3 text-sm text-stone-300"
                      >
                        <span>
                          {formatTime(slot.start)} – {formatTime(slot.end)}
                        </span>
                        <span className="text-xs">booked</span>
                      </div>
                    );
                  })}
                </div>

                {selectedSlot && (
                  <button
                    onClick={() => setStep('details')}
                    className="mt-6 w-full rounded-full border-2 border-stone-900 bg-stone-900 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-white hover:text-stone-900"
                  >
                    next: your details →
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {availableDateKeys.size === 0 && !slotsLoading && (
          <p className="mt-10 text-center text-sm text-stone-400">
            no available dates in the next 8 weeks. check back soon or{' '}
            <a href="mailto:nathanael.thie@gmail.com" className="underline underline-offset-2">
              email me
            </a>
            .
          </p>
        )}
      </div>
    </div>
  );
}
