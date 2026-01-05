/**
 * Resend Access Link Page
 *
 * Epic 10 - Story 10.7: Recovery Flows
 *
 * Self-serve access link regeneration for customers who lost their original email.
 */

'use client';

import * as React from 'react';
import Link from 'next/link';

export default function ResendAccessPage() {
  const [email, setEmail] = React.useState('');
  const [productSlug, setProductSlug] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch('/api/access/resend', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          productSlug,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to resend access link');
      }

      setSuccess(true);
      setEmail('');
      setProductSlug('');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to resend access link';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen">
      <div className="mx-auto max-w-2xl px-6 py-24 md:px-8 md:py-32">
        {/* Header */}
        <header className="mb-12">
          <Link
            href="/resources"
            className="mb-6 inline-block text-base text-indigo-600 transition-colors duration-200 hover:text-indigo-700 hover:underline"
          >
            ← Back to resources
          </Link>
          <h1 className="mb-4 text-[clamp(2.5rem,5vw,4rem)] font-bold tracking-tight text-stone-900">
            Resend access link
          </h1>
          <p className="text-xl leading-relaxed text-stone-700">
            Lost your purchase email? We&apos;ll send you a new access link.
          </p>
        </header>

        {/* Success message */}
        {success && (
          <div className="mb-8 rounded-2xl border border-green-200 bg-green-50 p-6">
            <div className="flex items-start gap-3">
              <svg
                className="h-6 w-6 flex-shrink-0 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <div>
                <h2 className="mb-2 text-lg font-semibold text-green-900">
                  Access link sent!
                </h2>
                <p className="text-base text-green-800">
                  Check your email for a new access link. It should arrive within a few minutes.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Error message */}
        {error && (
          <div className="mb-8 rounded-2xl border border-red-200 bg-red-50 p-6">
            <div className="flex items-start gap-3">
              <svg
                className="h-6 w-6 flex-shrink-0 text-red-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <div>
                <h2 className="mb-2 text-lg font-semibold text-red-900">Error</h2>
                <p className="text-base text-red-800">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Form */}
        <section className="rounded-2xl border border-stone-300 bg-white p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="mb-2 block text-base font-semibold text-stone-900">
                Purchase email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="you@example.com"
                className="w-full rounded-lg border border-stone-300 px-4 py-3 text-base text-stone-900 placeholder-stone-400 focus:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-600/20"
              />
              <p className="mt-2 text-sm text-stone-600">
                The email address you used when purchasing
              </p>
            </div>

            <div>
              <label
                htmlFor="productSlug"
                className="mb-2 block text-base font-semibold text-stone-900"
              >
                Product name (optional)
              </label>
              <input
                type="text"
                id="productSlug"
                name="productSlug"
                value={productSlug}
                onChange={(e) => setProductSlug(e.target.value)}
                placeholder="common-module-1984-exemplar-essay"
                className="w-full rounded-lg border border-stone-300 px-4 py-3 text-base text-stone-900 placeholder-stone-400 focus:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-600/20"
              />
              <p className="mt-2 text-sm text-stone-600">
                If you remember the product name, add it here. Otherwise, we&apos;ll send links for all
                your purchases.
              </p>
            </div>

            <button
              type="submit"
              disabled={loading || !email}
              className="w-full rounded-full bg-indigo-600 px-8 py-4 text-lg font-semibold text-white shadow-md transition-colors duration-200 hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? 'Sending...' : 'Send access link'}
            </button>
          </form>
        </section>

        {/* Help */}
        <section className="mt-12">
          <h2 className="mb-4 text-2xl font-semibold text-stone-900">Still can&apos;t access?</h2>
          <p className="text-base leading-relaxed text-stone-700">
            If you&apos;re still having trouble, email{' '}
            <a
              href="mailto:support@riqle.com"
              className="text-indigo-600 transition-colors duration-200 hover:text-indigo-700 hover:underline"
            >
              support@riqle.com
            </a>{' '}
            with your purchase details and we&apos;ll help you out.
          </p>
        </section>
      </div>
    </div>
  );
}
