/**
 * ResourceDetail Component - Clean, Organized Product Display
 *
 * Features:
 * - Studocu-style preview with thumbnails
 * - Clear information architecture
 * - Watermarked PDF downloads
 * - Professional, trust-building design
 */

'use client';

import * as React from 'react';
import Link from 'next/link';
import { PDFPreview } from './pdf-preview';

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
      <div className="mx-auto max-w-6xl px-6 py-12 md:px-8 md:py-16">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <Link
            href="/resources"
            className="inline-flex items-center gap-2 text-sm font-medium text-stone-600 transition-colors hover:text-stone-900"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Resources
          </Link>
        </nav>

        {/* Hero Section */}
        <div className="mb-12">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-purple-100 px-4 py-1.5">
            <svg className="h-4 w-4 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
              />
            </svg>
            <span className="text-sm font-semibold text-purple-700">{format}</span>
          </div>

          <h1 className="mb-4 text-[clamp(2rem,5vw,3rem)] font-bold leading-tight tracking-tight text-stone-900">
            {title}
          </h1>
          <p className="max-w-3xl text-lg leading-relaxed text-stone-700">{description}</p>
        </div>

        {/* Main Layout - Two Columns */}
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Left Column - Content (2/3) */}
          <div className="space-y-12 lg:col-span-2">
            {/* Preview Section - Most Important */}
            <section>
              <div className="mb-6 flex items-center gap-3">
                <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
                <h2 className="text-2xl font-bold text-stone-900">Preview</h2>
              </div>
              <PDFPreview
                pdfUrl="/products/1984-common-module-essay.pdf"
                maxPreviewPages={3}
                totalPages={3}
              />
            </section>

            {/* Who it's for */}
            <section>
              <h2 className="mb-6 flex items-center gap-2 text-2xl font-bold text-stone-900">
                <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
                Who this is for
              </h2>
              <div className="space-y-4">
                <div className="rounded-xl border border-green-200 bg-green-50 p-6">
                  <p className="mb-2 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-green-900">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Perfect for:
                  </p>
                  <p className="text-base leading-relaxed text-green-900">{targetAudience}</p>
                </div>
                <div className="rounded-xl border border-red-200 bg-red-50 p-6">
                  <p className="mb-2 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-red-900">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Not for:
                  </p>
                  <p className="text-base leading-relaxed text-red-900">{nonAudience}</p>
                </div>
              </div>
            </section>

            {/* What it is */}
            <section className="rounded-xl border border-stone-200 bg-white p-8 shadow-sm">
              <h2 className="mb-4 text-xl font-bold text-stone-900">What it is</h2>
              <div
                className="prose prose-stone max-w-none"
                dangerouslySetInnerHTML={{ __html: whatItIs }}
              />
            </section>

            {/* What it covers */}
            <section className="rounded-xl border border-stone-200 bg-white p-8 shadow-sm">
              <h2 className="mb-4 text-xl font-bold text-stone-900">What it covers</h2>
              <div
                className="prose prose-stone max-w-none"
                dangerouslySetInnerHTML={{ __html: whatItCovers }}
              />
            </section>

            {/* How it was created */}
            <section className="rounded-xl bg-blue-50 p-8">
              <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-stone-900">
                <svg className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                How it was created
              </h2>
              <div
                className="prose prose-stone max-w-none"
                dangerouslySetInnerHTML={{ __html: howItWasCreated }}
              />
            </section>

            {/* What you get */}
            <section className="rounded-xl border border-stone-200 bg-white p-8 shadow-sm">
              <h2 className="mb-4 text-xl font-bold text-stone-900">What you get</h2>
              <div
                className="prose prose-stone max-w-none"
                dangerouslySetInnerHTML={{ __html: whatYouGet }}
              />
            </section>
          </div>

          {/* Right Column - Purchase Sidebar (1/3) */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* Purchase Card */}
              <div className="rounded-xl border-2 border-blue-200 bg-white p-6 shadow-lg">
                <div className="mb-6">
                  <p className="mb-2 text-sm font-bold uppercase tracking-wider text-stone-600">Price</p>
                  <p className="text-4xl font-bold text-stone-900">
                    {currencySymbol}
                    {price}
                  </p>
                  <p className="mt-1 text-sm font-medium text-stone-600">One-time payment</p>
                </div>

                {error && (
                  <div className="mb-4 rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-red-900">
                    {error}
                  </div>
                )}

                <button
                  onClick={handlePurchase}
                  disabled={purchasing}
                  className="mb-4 w-full rounded-lg bg-blue-600 px-6 py-4 text-base font-semibold text-white shadow-sm transition-all hover:bg-blue-700 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {purchasing ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    'Purchase Now'
                  )}
                </button>

                {/* Benefits */}
                <div className="space-y-3 border-t border-stone-200 pt-4">
                  <div className="flex items-start gap-3">
                    <svg className="h-5 w-5 mt-0.5 flex-shrink-0 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <p className="text-sm text-stone-700">
                      <span className="font-semibold">Watermarked PDF</span> - Forensically protected with your email
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <svg className="h-5 w-5 mt-0.5 flex-shrink-0 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <p className="text-sm text-stone-700">
                      <span className="font-semibold">Instant download</span> after purchase
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <svg className="h-5 w-5 mt-0.5 flex-shrink-0 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <p className="text-sm text-stone-700">
                      <span className="font-semibold">14-day refund</span>, no questions asked
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <svg className="h-5 w-5 mt-0.5 flex-shrink-0 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <p className="text-sm text-stone-700">
                      <span className="font-semibold">Secure payment</span> via Stripe
                    </p>
                  </div>
                </div>
              </div>

              {/* Watermark Info */}
              <div className="rounded-xl border border-amber-200 bg-amber-50 p-5">
                <div className="mb-2 flex items-center gap-2">
                  <svg className="h-5 w-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                  <h3 className="text-sm font-bold text-amber-900">Protected Content</h3>
                </div>
                <p className="text-xs leading-relaxed text-amber-800">
                  Each PDF is watermarked with your email and purchase details. Sharing is traceable.
                </p>
              </div>

              {/* Related Content */}
              {(relatedPosts.length > 0 || relatedProjects.length > 0) && (
                <div className="rounded-xl border border-stone-200 bg-white p-6 shadow-sm">
                  <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-stone-900">Related</h3>

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
                      <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-stone-600">Work</h4>
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
