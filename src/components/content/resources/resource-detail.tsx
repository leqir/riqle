/**
 * ResourceDetail Component - Minimalist, Stripe-Inspired Design
 *
 * Features:
 * - Clean typography with stone color palette
 * - Hand-drawn icons for personality
 * - Large PDF preview
 * - No boxes/cards for content - clean layout
 * - Matches /work and /writing page aesthetic
 */

'use client';

import * as React from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { HandDrawnCheck } from '@/components/design-system/icons/hand-drawn-check';
import { HandDrawnShield } from '@/components/design-system/icons/hand-drawn-shield';

// Dynamically import PDF preview with SSR disabled (PDF.js is browser-only)
const PDFPreview = dynamic(() => import('./pdf-preview').then((mod) => mod.PDFPreview), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center border-l-2 border-stone-200 bg-white py-32 pl-8">
      <div className="text-center">
        <div className="mb-3 inline-block h-8 w-8 animate-spin rounded-full border-4 border-stone-300 border-t-transparent"></div>
        <p className="text-sm text-stone-600">Loading preview...</p>
      </div>
    </div>
  ),
});

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
  downloadUrls: string[];
  hasAccess: boolean;
  entitlementId?: string;
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
  downloadUrls,
  hasAccess,
  entitlementId,
  relatedPosts,
  relatedProjects,
}: ResourceDetailProps) {
  const price = (priceInCents / 100).toFixed(2);
  const currencySymbol = currency === 'AUD' ? 'A$' : '$';

  const [purchasing, setPurchasing] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [downloading, setDownloading] = React.useState(false);

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

  const handleDownload = async () => {
    if (!entitlementId) return;

    try {
      setDownloading(true);
      setError(null);

      // Call download API with entitlement ID
      const response = await fetch(`/api/products/${productId}/download?eid=${entitlementId}`);

      if (!response.ok) {
        throw new Error('Failed to download file');
      }

      // Get filename from Content-Disposition header or use default
      const contentDisposition = response.headers.get('Content-Disposition');
      const filename = contentDisposition
        ? contentDisposition.split('filename=')[1]?.replace(/"/g, '')
        : `${title}.pdf`;

      // Create blob and download
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      console.error('Download error:', err);
      const message =
        err instanceof Error ? err.message : 'Failed to download file. Please try again.';
      setError(message);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-7xl px-6 py-12 md:px-8 md:py-16">
        {/* Breadcrumb */}
        <nav className="mb-12">
          <Link
            href="/resources"
            className="inline-flex items-center gap-2 text-sm font-medium text-stone-500 transition-colors hover:text-stone-900"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            resources
          </Link>
        </nav>

        {/* Header */}
        <header className="mb-16">
          <p className="mb-3 text-sm font-medium uppercase tracking-wider text-stone-500">
            {format}
          </p>
          <h1 className="mb-4 text-[clamp(2.5rem,6vw,4rem)] font-semibold leading-[1.1] tracking-tight text-stone-900">
            {title}
          </h1>
          <p className="max-w-3xl text-xl leading-relaxed text-stone-600">{description}</p>
        </header>

        {/* Main Layout */}
        <div className="grid gap-16 lg:grid-cols-[1fr,400px]">
          {/* Left Column - Content */}
          <div className="space-y-20">
            {/* Preview Section - Full Width, Most Prominent */}
            <section>
              <div className="mb-8">
                <p className="mb-2 text-sm font-medium uppercase tracking-wider text-stone-500">
                  preview
                </p>
                <h2 className="text-3xl font-semibold tracking-tight text-stone-900">
                  see what&apos;s inside
                </h2>
              </div>
              <PDFPreview pdfUrl={downloadUrls[0]} totalPages={11} />
            </section>

            {/* Who it's for - Clean, No Boxes */}
            <section>
              <div className="mb-8">
                <p className="mb-2 text-sm font-medium uppercase tracking-wider text-stone-500">
                  audience
                </p>
                <h2 className="text-3xl font-semibold tracking-tight text-stone-900">
                  who this is for
                </h2>
              </div>

              <div className="space-y-8">
                {/* Perfect for */}
                <div className="border-l-2 border-stone-900 pl-8">
                  <div className="mb-3 flex items-center gap-2">
                    <HandDrawnCheck className="h-5 w-5 text-stone-900" />
                    <p className="text-sm font-semibold uppercase tracking-wider text-stone-900">
                      perfect for
                    </p>
                  </div>
                  <p className="text-lg leading-relaxed text-stone-700">{targetAudience}</p>
                </div>

                {/* Not for */}
                <div className="border-l-2 border-stone-300 pl-8">
                  <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-stone-500">
                    not for
                  </p>
                  <p className="text-lg leading-relaxed text-stone-600">{nonAudience}</p>
                </div>
              </div>
            </section>

            {/* What it is */}
            <section>
              <div className="mb-6">
                <p className="mb-2 text-sm font-medium uppercase tracking-wider text-stone-500">
                  overview
                </p>
                <h2 className="text-3xl font-semibold tracking-tight text-stone-900">what it is</h2>
              </div>
              <div className="border-l-2 border-stone-900 pl-8">
                <div
                  className="prose prose-stone prose-lg max-w-none leading-relaxed text-stone-700"
                  dangerouslySetInnerHTML={{ __html: whatItIs }}
                />
              </div>
            </section>

            {/* What it covers */}
            <section>
              <div className="mb-6">
                <p className="mb-2 text-sm font-medium uppercase tracking-wider text-stone-500">
                  content
                </p>
                <h2 className="text-3xl font-semibold tracking-tight text-stone-900">
                  what it covers
                </h2>
              </div>
              <div className="border-l-2 border-stone-900 pl-8">
                <div
                  className="prose prose-stone prose-lg max-w-none leading-relaxed text-stone-700"
                  dangerouslySetInnerHTML={{ __html: whatItCovers }}
                />
              </div>
            </section>

            {/* How it was created */}
            <section>
              <div className="mb-6">
                <p className="mb-2 text-sm font-medium uppercase tracking-wider text-stone-500">
                  process
                </p>
                <h2 className="text-3xl font-semibold tracking-tight text-stone-900">
                  how it was created
                </h2>
              </div>
              <div className="border-l-2 border-stone-300 pl-8">
                <div
                  className="prose prose-stone prose-lg max-w-none leading-relaxed text-stone-600"
                  dangerouslySetInnerHTML={{ __html: howItWasCreated }}
                />
              </div>
            </section>

            {/* What you get */}
            <section>
              <div className="mb-6">
                <p className="mb-2 text-sm font-medium uppercase tracking-wider text-stone-500">
                  deliverable
                </p>
                <h2 className="text-3xl font-semibold tracking-tight text-stone-900">
                  what you get
                </h2>
              </div>
              <div className="border-l-2 border-stone-900 pl-8">
                <div
                  className="prose prose-stone prose-lg max-w-none leading-relaxed text-stone-700"
                  dangerouslySetInnerHTML={{ __html: whatYouGet }}
                />
              </div>
            </section>
          </div>

          {/* Right Column - Purchase/Download Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-8">
              {hasAccess ? (
                /* Download Card - You Own This */
                <div className="border-l-2 border-green-600 bg-white pl-8">
                  <div className="mb-8">
                    <p className="mb-2 text-sm font-medium uppercase tracking-wider text-green-600">
                      you own this
                    </p>
                    <p className="text-2xl font-semibold tracking-tight text-stone-900">
                      ready to download
                    </p>
                  </div>

                  {error && (
                    <div className="mb-4 border-l-2 border-red-600 bg-red-50 py-3 pl-4 text-sm text-red-900">
                      {error}
                    </div>
                  )}

                  <button
                    onClick={handleDownload}
                    disabled={downloading}
                    className="mb-6 w-full rounded-full bg-green-600 px-8 py-4 text-base font-semibold text-white transition-all hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {downloading ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        downloading...
                      </span>
                    ) : (
                      <>
                        <svg
                          className="mr-2 inline h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"
                          />
                        </svg>
                        download now
                      </>
                    )}
                  </button>

                  {/* Access Info */}
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <HandDrawnCheck className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
                      <p className="text-sm leading-relaxed text-stone-700">
                        watermarked with your purchase details
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <HandDrawnCheck className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
                      <p className="text-sm leading-relaxed text-stone-700">unlimited downloads</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <HandDrawnCheck className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
                      <p className="text-sm leading-relaxed text-stone-700">
                        access link saved in your email
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                /* Purchase Card - Minimalist */
                <div className="border-l-2 border-stone-900 bg-white pl-8">
                  <div className="mb-8">
                    <p className="mb-2 text-sm font-medium uppercase tracking-wider text-stone-500">
                      price
                    </p>
                    <p className="mb-1 text-5xl font-semibold tracking-tight text-stone-900">
                      {currencySymbol}
                      {price}
                    </p>
                    <p className="text-sm text-stone-600">one-time payment</p>
                  </div>

                  {error && (
                    <div className="mb-4 border-l-2 border-red-600 bg-red-50 py-3 pl-4 text-sm text-red-900">
                      {error}
                    </div>
                  )}

                  <button
                    onClick={handlePurchase}
                    disabled={purchasing}
                    className="mb-6 w-full rounded-full bg-stone-900 px-8 py-4 text-base font-semibold text-white transition-all hover:bg-stone-800 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {purchasing ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        processing...
                      </span>
                    ) : (
                      'purchase now'
                    )}
                  </button>

                  {/* Benefits - Clean List */}
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <HandDrawnCheck className="mt-0.5 h-5 w-5 flex-shrink-0 text-stone-900" />
                      <p className="text-sm leading-relaxed text-stone-700">
                        watermarked pdf with your purchase details
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <HandDrawnCheck className="mt-0.5 h-5 w-5 flex-shrink-0 text-stone-900" />
                      <p className="text-sm leading-relaxed text-stone-700">
                        instant download after purchase
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <HandDrawnCheck className="mt-0.5 h-5 w-5 flex-shrink-0 text-stone-900" />
                      <p className="text-sm leading-relaxed text-stone-700">
                        14-day refund, no questions asked
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <HandDrawnCheck className="mt-0.5 h-5 w-5 flex-shrink-0 text-stone-900" />
                      <p className="text-sm leading-relaxed text-stone-700">
                        secure payment via stripe
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Watermark Info - Subtle */}
              <div className="border-l-2 border-stone-300 pl-8">
                <div className="mb-3 flex items-center gap-2">
                  <HandDrawnShield className="h-6 w-6 text-stone-400" />
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-stone-900">
                    protected content
                  </h3>
                </div>
                <p className="text-sm leading-relaxed text-stone-600">
                  each pdf is forensically watermarked with your email and purchase details. sharing
                  is traceable.
                </p>
              </div>

              {/* Related Content */}
              {(relatedPosts.length > 0 || relatedProjects.length > 0) && (
                <div className="border-t border-stone-200 pt-8">
                  <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-stone-900">
                    related
                  </h3>

                  {relatedPosts.length > 0 && (
                    <div className="mb-6">
                      <h4 className="mb-3 text-xs font-medium uppercase tracking-wider text-stone-500">
                        writing
                      </h4>
                      <ul className="space-y-2">
                        {relatedPosts.map((post) => (
                          <li key={post.slug}>
                            <Link
                              href={`/writing/${post.slug}`}
                              className="block text-sm text-stone-700 transition-colors hover:text-stone-900"
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
                      <h4 className="mb-3 text-xs font-medium uppercase tracking-wider text-stone-500">
                        work
                      </h4>
                      <ul className="space-y-2">
                        {relatedProjects.map((project) => (
                          <li key={project.slug}>
                            <Link
                              href={`/work/${project.slug}`}
                              className="block text-sm text-stone-700 transition-colors hover:text-stone-900"
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
