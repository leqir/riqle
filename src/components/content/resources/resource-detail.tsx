/**
 * ResourceDetail Component - Stripe-inspired Product Display
 *
 * Features:
 * - Clean, modular atomic design
 * - Strategic color accents
 * - Comprehensive product information
 * - Calm, trust-first presentation
 */

'use client';

import * as React from 'react';
import Link from 'next/link';

type ResourceDetailProps = {
  productId: string;
  title: string;
  description: string;
  targetAudience: string;
  nonAudience: string;
  whatItIs: string;
  whatItCovers: string;
  howItWasCreated: string;
  format: string;
  whatYouGet: string;
  priceInCents: number;
  currency: string;
  stripeProductId: string | null;
  stripePriceId: string | null;
  relatedPosts: Array<{ slug: string; title: string }>;
  relatedProjects: Array<{ slug: string; title: string }>;
};

export function ResourceDetail({
  productId,
  title,
  description,
  targetAudience,
  nonAudience,
  whatItIs,
  whatItCovers,
  howItWasCreated,
  format,
  whatYouGet,
  priceInCents,
  currency,
  stripeProductId: _stripeProductId,
  stripePriceId: _stripePriceId,
  relatedPosts,
  relatedProjects,
}: ResourceDetailProps) {
  const price = (priceInCents / 100).toFixed(2);
  const currencySymbol = currency === 'AUD' ? 'A$' : '$';

  const [purchasing, setPurchasing] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handlePurchase = async () => {
    try {
      setPurchasing(true);
      setError(null);

      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId }),
      });

      if (response.status === 401) {
        const returnUrl = encodeURIComponent(window.location.pathname);
        window.location.href = `/api/auth/signin?callbackUrl=${returnUrl}`;
        return;
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create checkout session');
      }

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error('No checkout URL returned');
      }
    } catch (err) {
      console.error('Purchase error:', err);
      const message =
        err instanceof Error ? err.message : 'Failed to initiate purchase. Please try again.';
      setError(message);
      setPurchasing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-stone-50">
      <div className="mx-auto max-w-4xl px-6 py-16 md:px-8 md:py-24">
        {/* Header */}
        <header className="mb-16">
          <nav className="mb-8">
            <Link
              href="/resources"
              className="inline-flex items-center gap-2 text-sm font-medium text-stone-600 transition-colors hover:text-stone-900"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back to Resources
            </Link>
          </nav>

          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-purple-100 px-4 py-1.5">
            <svg
              className="h-4 w-4 text-purple-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
              />
            </svg>
            <span className="text-sm font-semibold text-purple-700">{format}</span>
          </div>

          <h1 className="mb-4 text-[clamp(2rem,5vw,3.5rem)] font-bold leading-tight tracking-tight text-stone-900">
            {title}
          </h1>
          <p className="text-xl leading-relaxed text-stone-700">{description}</p>
        </header>

        {/* Main Content Grid */}
        <div className="mb-16 grid gap-8 lg:grid-cols-3">
          {/* Main Content - 2 columns */}
          <div className="space-y-8 lg:col-span-2">
            {/* Who it's for */}
            <section className="rounded-xl border border-stone-200 bg-white p-8 shadow-sm">
              <h2 className="mb-6 flex items-center gap-2 text-xl font-bold text-stone-900">
                <svg
                  className="h-5 w-5 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
                Who this is for
              </h2>
              <div className="space-y-6">
                <div className="rounded-lg bg-green-50 p-4">
                  <p className="mb-2 flex items-center gap-2 text-sm font-semibold text-green-900">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    This is for:
                  </p>
                  <p className="text-base leading-relaxed text-green-900">{targetAudience}</p>
                </div>
                <div className="rounded-lg bg-red-50 p-4">
                  <p className="mb-2 flex items-center gap-2 text-sm font-semibold text-red-900">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                    This is NOT for:
                  </p>
                  <p className="text-base leading-relaxed text-red-900">{nonAudience}</p>
                </div>
              </div>
            </section>

            {/* What it is */}
            <section>
              <h2 className="mb-4 text-xl font-bold text-stone-900">What it is</h2>
              <div
                className="prose prose-lg prose-stone max-w-none rounded-xl border border-stone-200 bg-white p-8 shadow-sm"
                dangerouslySetInnerHTML={{ __html: whatItIs }}
              />
            </section>

            {/* What it covers */}
            <section>
              <h2 className="mb-4 text-xl font-bold text-stone-900">What it covers</h2>
              <div
                className="prose prose-lg prose-stone max-w-none rounded-xl border border-stone-200 bg-white p-8 shadow-sm"
                dangerouslySetInnerHTML={{ __html: whatItCovers }}
              />
            </section>

            {/* How it was created */}
            <section>
              <h2 className="mb-4 text-xl font-bold text-stone-900">How it was created</h2>
              <div
                className="prose prose-lg prose-stone max-w-none rounded-xl bg-stone-50 p-8"
                dangerouslySetInnerHTML={{ __html: howItWasCreated }}
              />
            </section>

            {/* What you get */}
            <section>
              <h2 className="mb-4 text-xl font-bold text-stone-900">What you get</h2>
              <div
                className="prose prose-lg prose-stone max-w-none rounded-xl border border-stone-200 bg-white p-8 shadow-sm"
                dangerouslySetInnerHTML={{ __html: whatYouGet }}
              />
            </section>
          </div>

          {/* Sidebar - Sticky Purchase Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* Purchase Card */}
              <div className="rounded-xl border border-stone-200 bg-white p-6 shadow-lg">
                <div className="mb-6">
                  <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-stone-600">
                    Price
                  </p>
                  <p className="text-4xl font-bold text-stone-900">
                    {currencySymbol}
                    {price}
                  </p>
                  <p className="mt-1 text-sm text-stone-600">One-time payment</p>
                </div>

                {error && (
                  <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-900">{error}</div>
                )}

                <button
                  onClick={handlePurchase}
                  disabled={purchasing}
                  className="mb-4 w-full rounded-lg bg-blue-600 px-6 py-3 text-base font-semibold text-white shadow-sm transition-all hover:bg-blue-700 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {purchasing ? 'Processing...' : 'Purchase Now'}
                </button>

                <div className="space-y-3 border-t border-stone-200 pt-4">
                  <div className="flex items-start gap-2">
                    <svg
                      className="h-5 w-5 flex-shrink-0 text-green-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <p className="text-sm text-stone-700">Instant download</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <svg
                      className="h-5 w-5 flex-shrink-0 text-green-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <p className="text-sm text-stone-700">14-day refund, no questions asked</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <svg
                      className="h-5 w-5 flex-shrink-0 text-green-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <p className="text-sm text-stone-700">Secure payment via Stripe</p>
                  </div>
                </div>
              </div>

              {/* Related Content */}
              {(relatedPosts.length > 0 || relatedProjects.length > 0) && (
                <div className="rounded-xl border border-stone-200 bg-white p-6 shadow-sm">
                  <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-stone-900">
                    Related
                  </h3>

                  {relatedPosts.length > 0 && (
                    <div className="mb-4">
                      <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-stone-600">
                        Writing
                      </h4>
                      <ul className="space-y-2">
                        {relatedPosts.map((post) => (
                          <li key={post.slug}>
                            <Link
                              href={`/writing/${post.slug}`}
                              className="block text-sm text-blue-600 transition-colors hover:text-blue-700 hover:underline"
                            >
                              {post.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {relatedProjects.length > 0 && (
                    <div>
                      <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-stone-600">
                        Work
                      </h4>
                      <ul className="space-y-2">
                        {relatedProjects.map((project) => (
                          <li key={project.slug}>
                            <Link
                              href={`/work/${project.slug}`}
                              className="block text-sm text-blue-600 transition-colors hover:text-blue-700 hover:underline"
                            >
                              {project.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
