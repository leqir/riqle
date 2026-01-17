/**
 * ResourceDetail Component - Trust-First Product Display
 *
 * Epic 8 - Story 8.5: Resource Detail Page
 *
 * Features:
 * - Shows all 7 required sections (Epic 8 spec)
 * - Calm, neutral presentation (no urgency)
 * - Links to related Writing/Work for credibility
 * - Simple, transparent pricing
 * - Professional purchase CTA
 *
 * Epic 8 Seven Sections:
 * 1. What it is (clear description)
 * 2. Who it's for (and NOT for)
 * 3. What it covers (bullet clarity)
 * 4. How it was created (experience)
 * 5. What you get (deliverables)
 * 6. Price (transparent)
 * 7. Purchase CTA (calm)
 */

'use client';

import * as React from 'react';
import Link from 'next/link';

type ResourceDetailProps = {
  productId: string; // Database product ID
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
  // Format price for display
  const price = (priceInCents / 100).toFixed(2);
  const currencySymbol = currency === 'AUD' ? 'A$' : '$';

  // Handle purchase
  const [purchasing, setPurchasing] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handlePurchase = async () => {
    try {
      setPurchasing(true);
      setError(null);

      // Call checkout API
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId: productId, // Database product ID
        }),
      });

      // Check for authentication error
      if (response.status === 401) {
        // User not logged in - redirect to login with return URL
        const returnUrl = encodeURIComponent(window.location.pathname);
        window.location.href = `/api/auth/signin?callbackUrl=${returnUrl}`;
        return;
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create checkout session');
      }

      const data = await response.json();

      // Redirect to Stripe Checkout
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error('No checkout URL returned');
      }
    } catch (err) {
      console.error('Purchase error:', err);
      const message = err instanceof Error ? err.message : 'Failed to initiate purchase. Please try again.';
      setError(message);
      setPurchasing(false);
    }
  };

  return (
    <div className="relative min-h-screen">
      <div className="mx-auto max-w-4xl px-6 py-24 md:px-8 md:py-32">
        {/* Header */}
        <header className="mb-16">
          <h1 className="mb-4 text-[clamp(2.5rem,5vw,4rem)] font-bold tracking-tight text-stone-900">
            {title}
          </h1>
          <p className="text-xl leading-relaxed text-stone-600">{description}</p>
        </header>

        {/* Main Content */}
        <div className="space-y-12">
          {/* Section 1: Who it's for (and NOT for) */}
          <section className="rounded-2xl border border-stone-200 bg-white p-8">
            <h2 className="mb-4 text-2xl font-semibold text-stone-900">Who this is for</h2>
            <div className="space-y-4">
              <div>
                <p className="mb-2 text-base font-semibold text-stone-900">✓ This is for:</p>
                <p className="text-lg leading-relaxed text-stone-700">{targetAudience}</p>
              </div>
              <div>
                <p className="mb-2 text-base font-semibold text-stone-900">✗ This is NOT for:</p>
                <p className="text-lg leading-relaxed text-stone-700">{nonAudience}</p>
              </div>
            </div>
          </section>

          {/* Section 2: What it is */}
          <section>
            <h2 className="mb-4 text-2xl font-semibold text-stone-900">What it is</h2>
            <div
              className="prose prose-lg prose-stone max-w-none"
              dangerouslySetInnerHTML={{ __html: whatItIs }}
            />
          </section>

          {/* Section 3: What it covers */}
          <section>
            <h2 className="mb-4 text-2xl font-semibold text-stone-900">What it covers</h2>
            <div
              className="prose prose-lg prose-stone max-w-none"
              dangerouslySetInnerHTML={{ __html: whatItCovers }}
            />
          </section>

          {/* Section 4: How it was created */}
          <section className="rounded-2xl bg-stone-50 p-8">
            <h2 className="mb-4 text-2xl font-semibold text-stone-900">How it was created</h2>
            <div
              className="prose prose-lg prose-stone max-w-none"
              dangerouslySetInnerHTML={{ __html: howItWasCreated }}
            />
          </section>

          {/* Section 5: What you get */}
          <section>
            <h2 className="mb-4 text-2xl font-semibold text-stone-900">What you get</h2>
            <div className="mb-4">
              <p className="text-base font-semibold text-stone-900">Format: {format}</p>
            </div>
            <div
              className="prose prose-lg prose-stone max-w-none"
              dangerouslySetInnerHTML={{ __html: whatYouGet }}
            />
          </section>

          {/* Section 6: Price & Purchase */}
          <section className="rounded-2xl border border-stone-300 bg-white p-8">
            <div className="mb-6">
              <h2 className="mb-2 text-2xl font-semibold text-stone-900">Price</h2>
              <p className="text-4xl font-bold text-stone-900">
                {currencySymbol}
                {price}
              </p>
            </div>

            {/* Purchase CTA - Calm, neutral (no urgency) */}
            <div className="space-y-4">
              {error && (
                <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-900">
                  {error}
                </div>
              )}
              <button
                onClick={handlePurchase}
                disabled={purchasing}
                className="w-full rounded-full bg-indigo-600 px-8 py-4 text-lg font-semibold text-white shadow-md transition-colors duration-200 hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {purchasing ? 'Processing...' : 'Purchase'}
              </button>
              <p className="text-center text-sm text-stone-600">
                14-day refund, no questions asked
              </p>
            </div>
          </section>

          {/* Related Content - Credibility Building */}
          {(relatedPosts.length > 0 || relatedProjects.length > 0) && (
            <section className="border-t border-stone-200 pt-12">
              <h2 className="mb-6 text-2xl font-semibold text-stone-900">
                Related work & thinking
              </h2>
              <p className="mb-6 text-base text-stone-600">
                This resource is grounded in real experience. Here&apos;s where you can see the
                thinking behind it:
              </p>

              <div className="space-y-4">
                {/* Related Writing */}
                {relatedPosts.length > 0 && (
                  <div>
                    <h3 className="mb-3 text-lg font-semibold text-stone-900">Writing</h3>
                    <ul className="space-y-2">
                      {relatedPosts.map((post) => (
                        <li key={post.slug}>
                          <Link
                            href={`/writing/${post.slug}`}
                            className="text-base text-indigo-600 transition-colors duration-200 hover:text-indigo-700 hover:underline"
                          >
                            {post.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Related Work */}
                {relatedProjects.length > 0 && (
                  <div>
                    <h3 className="mb-3 text-lg font-semibold text-stone-900">Work</h3>
                    <ul className="space-y-2">
                      {relatedProjects.map((project) => (
                        <li key={project.slug}>
                          <Link
                            href={`/work/${project.slug}`}
                            className="text-base text-indigo-600 transition-colors duration-200 hover:text-indigo-700 hover:underline"
                          >
                            {project.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
