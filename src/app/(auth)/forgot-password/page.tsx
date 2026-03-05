'use client';

import { useState, useTransition } from 'react';
import Link from 'next/link';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!email || !email.includes('@')) {
      setErrorMessage('please enter a valid email address');
      return;
    }

    startTransition(async () => {
      try {
        const response = await fetch('/api/auth/forgot-password', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        });

        const data = await response.json();

        if (!response.ok) {
          setErrorMessage(data.error || 'failed to send reset link');
          return;
        }

        setIsSubmitted(true);
      } catch (err) {
        console.error('Forgot password error:', err);
        setErrorMessage('an unexpected error occurred. please try again.');
      }
    });
  };

  if (isSubmitted) {
    return (
      <div className="flex min-h-screen flex-col bg-white">
        <div className="px-8 py-6">
          <Link
            href="/"
            className="text-sm font-medium text-stone-900 transition-colors hover:text-stone-500"
          >
            riqle
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-center px-6 pb-20">
          <div className="w-full max-w-sm">
            <p className="mb-2 text-xs font-medium uppercase tracking-wider text-stone-400">
              check your inbox
            </p>
            <h1 className="mb-1 text-2xl font-semibold tracking-tight text-stone-900">
              reset link sent
            </h1>
            <p className="mb-8 text-sm text-stone-500">
              if an account exists for <span className="font-medium text-stone-900">{email}</span>,
              you&apos;ll receive a password reset link shortly.
            </p>

            <div className="mb-6 space-y-1.5 text-sm text-stone-500">
              <p>1 — check your inbox (and spam folder)</p>
              <p>2 — click the reset password link</p>
              <p>3 — create a new password</p>
            </div>

            <Link
              href="/login"
              className="block w-full rounded-lg bg-stone-900 px-6 py-3 text-center text-sm font-medium text-white transition-colors hover:bg-stone-700"
            >
              back to sign in
            </Link>

            <p className="mt-6 text-sm text-stone-500">
              didn&apos;t receive it?{' '}
              <button
                onClick={() => setIsSubmitted(false)}
                className="font-medium text-stone-900 underline underline-offset-2 hover:text-stone-600"
              >
                try again
              </button>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <div className="px-8 py-6">
        <Link
          href="/"
          className="text-sm font-medium text-stone-900 transition-colors hover:text-stone-500"
        >
          riqle
        </Link>
      </div>

      <div className="flex flex-1 items-center justify-center px-6 pb-20">
        <div className="w-full max-w-sm">
          <p className="mb-2 text-xs font-medium uppercase tracking-wider text-stone-400">
            account
          </p>
          <h1 className="mb-1 text-2xl font-semibold tracking-tight text-stone-900">
            forgot password?
          </h1>
          <p className="mb-8 text-sm text-stone-500">
            enter your email and we&apos;ll send a reset link
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-stone-900">
                email address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                autoComplete="email"
                required
                className="w-full rounded-lg border border-stone-200 px-4 py-2.5 text-sm text-stone-900 placeholder-stone-300 transition-colors focus:border-stone-900 focus:outline-none"
              />
            </div>

            {errorMessage && <p className="text-sm text-red-600">{errorMessage}</p>}

            <button
              type="submit"
              disabled={isPending}
              className="w-full rounded-lg bg-stone-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-stone-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isPending ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  sending...
                </span>
              ) : (
                'send reset link'
              )}
            </button>
          </form>

          <p className="mt-6 text-sm text-stone-500">
            <Link
              href="/login"
              className="font-medium text-stone-900 underline underline-offset-2 hover:text-stone-600"
            >
              ← back to sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
