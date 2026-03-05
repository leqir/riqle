'use client';

import { useState, useTransition } from 'react';
import Link from 'next/link';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!email || !password) {
      setErrorMessage('email and password are required');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('passwords do not match');
      return;
    }

    if (password.length < 8) {
      setErrorMessage('password must be at least 8 characters');
      return;
    }

    startTransition(async () => {
      try {
        const response = await fetch('/api/auth/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password, name }),
        });

        const data = await response.json();

        if (!response.ok) {
          setErrorMessage(data.error || 'failed to create account');
          return;
        }

        setIsSubmitted(true);
      } catch (err) {
        console.error('Signup error:', err);
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
              almost there
            </p>
            <h1 className="mb-1 text-2xl font-semibold tracking-tight text-stone-900">
              check your email
            </h1>
            <p className="mb-8 text-sm text-stone-500">
              we&apos;ve sent a verification link to{' '}
              <span className="font-medium text-stone-900">{email}</span>
            </p>

            <div className="mb-6 space-y-1.5 text-sm text-stone-500">
              <p>1 — check your inbox (and spam folder)</p>
              <p>2 — click the verification link</p>
              <p>3 — sign in with your new account</p>
            </div>

            <Link
              href="/login"
              className="block w-full rounded-lg bg-stone-900 px-6 py-3 text-center text-sm font-medium text-white transition-colors hover:bg-stone-700"
            >
              go to sign in
            </Link>

            <p className="mt-6 text-sm text-stone-500">
              didn&apos;t receive the email?{' '}
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
            create account
          </h1>
          <p className="mb-8 text-sm text-stone-500">join riqle</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-stone-900">
                name <span className="font-normal text-stone-400">(optional)</span>
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="your name"
                className="w-full rounded-lg border border-stone-200 px-4 py-2.5 text-sm text-stone-900 placeholder-stone-300 transition-colors focus:border-stone-900 focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-stone-900">
                email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full rounded-lg border border-stone-200 px-4 py-2.5 text-sm text-stone-900 placeholder-stone-300 transition-colors focus:border-stone-900 focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-stone-900">
                password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full rounded-lg border border-stone-200 px-4 py-2.5 text-sm text-stone-900 placeholder-stone-300 transition-colors focus:border-stone-900 focus:outline-none"
              />
              <p className="mt-1 text-xs text-stone-400">min 8 characters</p>
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="mb-1.5 block text-sm font-medium text-stone-900"
              >
                confirm password
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
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
                  creating account...
                </span>
              ) : (
                'create account'
              )}
            </button>
          </form>

          <p className="mt-6 text-sm text-stone-500">
            already have an account?{' '}
            <Link
              href="/login"
              className="font-medium text-stone-900 underline underline-offset-2 hover:text-stone-600"
            >
              sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
