'use client';

import { useState, useTransition } from 'react';
import { Input } from './ui/Input';
import { Button } from './ui/Button';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle } from 'lucide-react';

/**
 * Cache Revalidation Form - Stripe-Inspired Design
 *
 * Manual cache control for content updates
 * Epic 11 Principle: "Update reality without anxiety" - Explicit control
 */

export function RevalidateForm() {
  const [type, setType] = useState<'path' | 'tag'>('path');
  const [value, setValue] = useState('');
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!value.trim()) {
      setMessage({ text: 'Please enter a path or tag', type: 'error' });
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
          setMessage({ text: `Successfully revalidated ${type}: ${value}`, type: 'success' });
          setValue('');
        } else {
          setMessage({ text: 'Failed to revalidate', type: 'error' });
        }
      } catch {
        setMessage({ text: 'Error revalidating', type: 'error' });
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex gap-6">
        <label className="flex items-center gap-2 cursor-pointer group">
          <input
            type="radio"
            value="path"
            checked={type === 'path'}
            onChange={(e) => setType(e.target.value as 'path' | 'tag')}
            className="w-4 h-4 text-brand-600 focus:ring-brand-500 focus:ring-2"
          />
          <span className="text-sm font-medium text-slate-700 group-hover:text-slate-900 transition-colors">
            Path
          </span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer group">
          <input
            type="radio"
            value="tag"
            checked={type === 'tag'}
            onChange={(e) => setType(e.target.value as 'path' | 'tag')}
            className="w-4 h-4 text-brand-600 focus:ring-brand-500 focus:ring-2"
          />
          <span className="text-sm font-medium text-slate-700 group-hover:text-slate-900 transition-colors">
            Tag
          </span>
        </label>
      </div>

      <Input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={type === 'path' ? '/writing/my-post' : 'posts'}
      />

      <Button type="submit" loading={isPending} variant="primary">
        Revalidate
      </Button>

      <AnimatePresence>
        {message && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className={`
              flex items-center gap-2 p-3 rounded-lg text-sm
              ${message.type === 'success' ? 'bg-success-50 text-success-700' : 'bg-error-50 text-error-700'}
            `}
          >
            {message.type === 'success' ? (
              <CheckCircle className="h-4 w-4" />
            ) : (
              <XCircle className="h-4 w-4" />
            )}
            {message.text}
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
}
