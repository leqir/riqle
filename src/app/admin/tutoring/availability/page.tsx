'use client';

import * as React from 'react';
import Link from 'next/link';
import { api } from '@/trpc/react';

const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function formatDateAest(date: Date): string {
  return new Date(date).toLocaleDateString('en-AU', {
    timeZone: 'Australia/Sydney',
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export default function AvailabilityPage() {
  const { data: rules, refetch: refetchRules } = api.tutoring.adminGetRules.useQuery();
  const { data: blocks, refetch: refetchBlocks } = api.tutoring.adminGetBlocks.useQuery();

  // Rule form state
  const [ruleForm, setRuleForm] = React.useState({
    dayOfWeek: 1,
    startTime: '16:00',
    endTime: '20:00',
    active: true,
  });

  // Block form state
  const [blockDate, setBlockDate] = React.useState('');
  const [blockReason, setBlockReason] = React.useState('');

  const upsertRule = api.tutoring.adminUpsertRule.useMutation({
    onSuccess: () => {
      void refetchRules();
      setRuleForm({ dayOfWeek: 1, startTime: '16:00', endTime: '20:00', active: true });
    },
  });

  const deleteRule = api.tutoring.adminDeleteRule.useMutation({
    onSuccess: () => void refetchRules(),
  });

  const createBlock = api.tutoring.adminCreateBlock.useMutation({
    onSuccess: () => {
      void refetchBlocks();
      setBlockDate('');
      setBlockReason('');
    },
  });

  const deleteBlock = api.tutoring.adminDeleteBlock.useMutation({
    onSuccess: () => void refetchBlocks(),
  });

  function handleAddRule(e: React.FormEvent) {
    e.preventDefault();
    upsertRule.mutate(ruleForm);
  }

  function handleAddBlock(e: React.FormEvent) {
    e.preventDefault();
    if (!blockDate) return;
    // Parse date as AEST midnight
    const date = new Date(`${blockDate}T00:00:00+10:00`);
    createBlock.mutate({ date, reason: blockReason || undefined });
  }

  return (
    <div className="space-y-10">
      <div>
        <Link
          href="/admin/tutoring"
          className="mb-4 inline-block text-sm text-slate-500 hover:text-slate-900"
        >
          ← Tutoring
        </Link>
        <h1 className="text-3xl font-bold text-slate-900">Availability</h1>
        <p className="mt-2 text-slate-600">Set your weekly schedule and block specific dates</p>
      </div>

      {/* Weekly Schedule */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-slate-900">Weekly Schedule</h2>

        {/* Current rules */}
        {rules && rules.length > 0 ? (
          <div className="overflow-hidden rounded-xl bg-white shadow-card">
            <table className="w-full text-sm">
              <thead className="border-b border-slate-100 bg-slate-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Day
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Time (AEST)
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Status
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {rules.map((rule) => (
                  <tr key={rule.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4 font-medium text-slate-900">
                      {DAY_NAMES[rule.dayOfWeek]}
                    </td>
                    <td className="px-6 py-4 text-slate-700">
                      {rule.startTime} – {rule.endTime}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex rounded-full px-2 py-0.5 text-xs font-semibold ${
                          rule.active
                            ? 'bg-green-100 text-green-800'
                            : 'bg-slate-100 text-slate-500'
                        }`}
                      >
                        {rule.active ? 'active' : 'inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-3">
                        <button
                          onClick={() => upsertRule.mutate({ ...rule, active: !rule.active })}
                          disabled={upsertRule.isPending}
                          className="text-xs text-slate-500 hover:text-slate-900"
                        >
                          {rule.active ? 'Deactivate' : 'Activate'}
                        </button>
                        <button
                          onClick={() => {
                            if (
                              confirm(
                                `Delete ${DAY_NAMES[rule.dayOfWeek]} ${rule.startTime}–${rule.endTime}?`
                              )
                            ) {
                              deleteRule.mutate({ id: rule.id });
                            }
                          }}
                          disabled={deleteRule.isPending}
                          className="text-xs text-red-500 hover:text-red-700"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="rounded-xl bg-white p-8 text-center text-slate-500 shadow-card">
            No availability rules yet. Add one below.
          </div>
        )}

        {/* Add rule form */}
        <div className="rounded-xl bg-white p-6 shadow-card">
          <h3 className="mb-4 text-sm font-semibold text-slate-900">Add Rule</h3>
          <form onSubmit={handleAddRule} className="flex flex-wrap items-end gap-4">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-slate-600">Day</label>
              <select
                value={ruleForm.dayOfWeek}
                onChange={(e) => setRuleForm({ ...ruleForm, dayOfWeek: parseInt(e.target.value) })}
                className="rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-slate-400 focus:outline-none"
              >
                {DAY_NAMES.map((day, i) => (
                  <option key={i} value={i}>
                    {day}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium text-slate-600">
                Start (AEST)
              </label>
              <input
                type="time"
                value={ruleForm.startTime}
                onChange={(e) => setRuleForm({ ...ruleForm, startTime: e.target.value })}
                required
                className="rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-slate-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium text-slate-600">End (AEST)</label>
              <input
                type="time"
                value={ruleForm.endTime}
                onChange={(e) => setRuleForm({ ...ruleForm, endTime: e.target.value })}
                required
                className="rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-slate-400 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={upsertRule.isPending}
              className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700 disabled:opacity-50"
            >
              {upsertRule.isPending ? 'Saving...' : 'Add Rule'}
            </button>
          </form>
          {upsertRule.error && (
            <p className="mt-2 text-sm text-red-600">{upsertRule.error.message}</p>
          )}
        </div>
      </section>

      {/* Blocked Dates */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-slate-900">Blocked Dates</h2>

        {blocks && blocks.length > 0 ? (
          <div className="overflow-hidden rounded-xl bg-white shadow-card">
            <table className="w-full text-sm">
              <thead className="border-b border-slate-100 bg-slate-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Reason
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {blocks.map((block) => (
                  <tr key={block.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4 font-medium text-slate-900">
                      {formatDateAest(block.date)}
                    </td>
                    <td className="px-6 py-4 text-slate-500">{block.reason ?? '—'}</td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => deleteBlock.mutate({ id: block.id })}
                        disabled={deleteBlock.isPending}
                        className="text-xs text-red-500 hover:text-red-700"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="rounded-xl bg-white p-8 text-center text-slate-500 shadow-card">
            No blocked dates.
          </div>
        )}

        {/* Add block form */}
        <div className="rounded-xl bg-white p-6 shadow-card">
          <h3 className="mb-4 text-sm font-semibold text-slate-900">Block a Date</h3>
          <form onSubmit={handleAddBlock} className="flex flex-wrap items-end gap-4">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-slate-600">Date</label>
              <input
                type="date"
                value={blockDate}
                onChange={(e) => setBlockDate(e.target.value)}
                required
                min={new Date().toISOString().slice(0, 10)}
                className="rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-slate-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium text-slate-600">
                Reason (optional)
              </label>
              <input
                type="text"
                value={blockReason}
                onChange={(e) => setBlockReason(e.target.value)}
                placeholder="e.g. HSC exam period"
                className="rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-slate-400 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={createBlock.isPending || !blockDate}
              className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700 disabled:opacity-50"
            >
              {createBlock.isPending ? 'Blocking...' : 'Block Date'}
            </button>
          </form>
          {createBlock.error && (
            <p className="mt-2 text-sm text-red-600">{createBlock.error.message}</p>
          )}
        </div>
      </section>
    </div>
  );
}
