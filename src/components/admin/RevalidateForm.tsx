'use client';

import { useState, useTransition } from 'react';

/**
 * Cache Revalidation Form
 *
 * Manual cache control for content updates
 * Epic 11 Principle: "Update reality without anxiety" - Explicit control
 */

export function RevalidateForm() {
  const [type, setType] = useState<'path' | 'tag'>('path');
  const [value, setValue] = useState('');
  const [message, setMessage] = useState('');
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!value.trim()) {
      setMessage('Please enter a path or tag');
      return;
    }

    startTransition(async () => {
      try {
        const response = await fetch('/api/admin/revalidate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ [type]: value }),
        });

        if (response.ok) {
          setMessage(`Successfully revalidated ${type}: ${value}`);
          setValue('');
        } else {
          setMessage('Failed to revalidate');
        }
      } catch {
        setMessage('Error revalidating');
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex gap-4">
        <label className="flex items-center gap-2">
          <input
            type="radio"
            value="path"
            checked={type === 'path'}
            onChange={(e) => setType(e.target.value as 'path' | 'tag')}
            className="text-indigo-600"
          />
          <span className="text-sm text-stone-700">Path</span>
        </label>
        <label className="flex items-center gap-2">
          <input
            type="radio"
            value="tag"
            checked={type === 'tag'}
            onChange={(e) => setType(e.target.value as 'path' | 'tag')}
            className="text-indigo-600"
          />
          <span className="text-sm text-stone-700">Tag</span>
        </label>
      </div>

      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={type === 'path' ? '/writing/my-post' : 'posts'}
        className="w-full rounded-md border border-stone-300 px-4 py-2 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
      />

      <button
        type="submit"
        disabled={isPending}
        className="rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 disabled:opacity-50"
      >
        {isPending ? 'Revalidating...' : 'Revalidate'}
      </button>

      {message && <p className="text-sm text-stone-600">{message}</p>}
    </form>
  );
}
