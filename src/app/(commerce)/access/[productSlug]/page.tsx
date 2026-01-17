/**
 * Product Access Page
 *
 * Epic 10 - Story 10.5: Access Landing Pages
 *
 * Validates JWT access token and displays download links for purchased products.
 * Implements email-based magic link access model.
 */

import { db } from '@/lib/db';
import { validateAccessToken } from '@/lib/access-token';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface AccessPageProps {
  params: {
    productSlug: string;
  };
  searchParams: {
    token?: string;
  };
}

export default async function AccessPage({ params, searchParams }: AccessPageProps) {
  const { productSlug } = params;
  const { token } = searchParams;

  // Validate token
  if (!token) {
    return <AccessError message="No access token provided" />;
  }

  const tokenData = validateAccessToken(token);

  if (!tokenData) {
    return <AccessError message="Invalid or expired access link" />;
  }

  // Get product
  const product = await db.product.findUnique({
    where: { slug: productSlug },
    select: {
      id: true,
      slug: true,
      title: true,
      description: true,
      format: true,
      whatYouGet: true,
      downloadUrl: true,
      published: true,
    },
  });

  if (!product || !product.published) {
    notFound();
  }

  // Verify product matches token
  if (product.id !== tokenData.productId) {
    return <AccessError message="Access token does not match this product" />;
  }

  // Check entitlement is still active
  const entitlement = await db.entitlement.findUnique({
    where: { id: tokenData.entitlementId },
    select: {
      id: true,
      active: true,
      userId: true,
      revokedAt: true,
      revokeReason: true,
    },
  });

  if (!entitlement) {
    return <AccessError message="Entitlement not found" />;
  }

  if (!entitlement.active) {
    return <AccessRevoked reason={entitlement.revokeReason || 'Access has been revoked'} />;
  }

  // All checks passed - show download page
  return (
    <div className="relative min-h-screen">
      <div className="mx-auto max-w-3xl px-6 py-24 md:px-8 md:py-32">
        {/* Header */}
        <header className="mb-12">
          <h1 className="mb-4 text-[clamp(2.5rem,5vw,4rem)] font-bold tracking-tight text-stone-900">
            {product.title}
          </h1>
          <p className="text-xl leading-relaxed text-stone-700">{product.description}</p>
        </header>

        {/* Access granted message */}
        <section className="mb-12 rounded-2xl border border-green-200 bg-green-50 p-8">
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
              <h2 className="mb-2 text-xl font-semibold text-green-900">Access granted</h2>
              <p className="text-base leading-relaxed text-green-800">
                You have active access to this product. Download your files below.
              </p>
            </div>
          </div>
        </section>

        {/* What you get */}
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-semibold text-stone-900">What you get</h2>
          <div className="mb-4">
            <p className="text-base font-semibold text-stone-900">Format: {product.format}</p>
          </div>
          <div
            className="prose prose-lg prose-stone max-w-none"
            dangerouslySetInnerHTML={{ __html: product.whatYouGet }}
          />
        </section>

        {/* Downloads */}
        <section className="mb-12 rounded-2xl border border-stone-300 bg-white p-8">
          <h2 className="mb-6 text-2xl font-semibold text-stone-900">Downloads</h2>

          {product.downloadUrl ? (
            <div className="space-y-4">
              <a
                href={product.downloadUrl}
                download
                className="flex items-center justify-between rounded-lg border border-stone-200 bg-stone-50 p-4 transition-colors duration-200 hover:bg-stone-100"
              >
                <div className="flex items-center gap-3">
                  <svg
                    className="h-8 w-8 text-indigo-600"
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
                  <div>
                    <p className="font-semibold text-stone-900">{product.title}</p>
                    <p className="text-sm text-stone-600">{product.format}</p>
                  </div>
                </div>
                <svg
                  className="h-6 w-6 text-stone-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
              </a>
              <p className="text-sm text-stone-600">
                You can download this file as many times as you need.
              </p>
            </div>
          ) : (
            <p className="text-base text-stone-600">
              Download links are being prepared. Please check back shortly or contact support.
            </p>
          )}
        </section>

        {/* Help & support */}
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-semibold text-stone-900">Need help?</h2>
          <p className="mb-4 text-base leading-relaxed text-stone-700">
            Having trouble downloading or accessing your purchase?
          </p>
          <p className="text-base leading-relaxed text-stone-700">
            Email{' '}
            <a
              href="mailto:support@riqle.com"
              className="text-indigo-600 transition-colors duration-200 hover:text-indigo-700 hover:underline"
            >
              support@riqle.com
            </a>{' '}
            and we&apos;ll help you out.
          </p>
        </section>

        {/* Refund policy */}
        <section className="rounded-2xl bg-stone-50 p-8">
          <h2 className="mb-4 text-2xl font-semibold text-stone-900">Refund policy</h2>
          <p className="text-base leading-relaxed text-stone-700">
            14-day refund window, no questions asked. Just reply to your purchase confirmation
            email or contact support.
          </p>
        </section>
      </div>
    </div>
  );
}

/**
 * Access Error Component
 */
function AccessError({ message }: { message: string }) {
  return (
    <div className="relative min-h-screen">
      <div className="mx-auto max-w-3xl px-6 py-24 md:px-8 md:py-32">
        <div className="rounded-2xl border border-red-200 bg-red-50 p-8">
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
              <h1 className="mb-2 text-2xl font-semibold text-red-900">Access denied</h1>
              <p className="mb-4 text-base leading-relaxed text-red-800">{message}</p>
              <div className="space-y-2 text-base text-red-800">
                <p className="font-semibold">What you can do:</p>
                <ul className="list-inside list-disc space-y-1">
                  <li>Check your purchase confirmation email for the correct access link</li>
                  <li>Request a new access link from the product page</li>
                  <li>
                    Contact{' '}
                    <a href="mailto:support@riqle.com" className="underline">
                      support@riqle.com
                    </a>{' '}
                    for help
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <Link
            href="/resources"
            className="text-lg text-indigo-600 transition-colors duration-200 hover:text-indigo-700 hover:underline"
          >
            ← Browse resources
          </Link>
        </div>
      </div>
    </div>
  );
}

/**
 * Access Revoked Component
 */
function AccessRevoked({ reason }: { reason: string }) {
  return (
    <div className="relative min-h-screen">
      <div className="mx-auto max-w-3xl px-6 py-24 md:px-8 md:py-32">
        <div className="rounded-2xl border border-yellow-200 bg-yellow-50 p-8">
          <div className="flex items-start gap-3">
            <svg
              className="h-6 w-6 flex-shrink-0 text-yellow-600"
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
              <h1 className="mb-2 text-2xl font-semibold text-yellow-900">Access revoked</h1>
              <p className="mb-4 text-base leading-relaxed text-yellow-800">
                Your access to this product has been revoked.
              </p>
              <p className="mb-4 text-base text-yellow-800">
                <strong>Reason:</strong> {reason}
              </p>
              <p className="text-base text-yellow-800">
                If you believe this is an error, please contact{' '}
                <a href="mailto:support@riqle.com" className="underline">
                  support@riqle.com
                </a>
                .
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <Link
            href="/resources"
            className="text-lg text-indigo-600 transition-colors duration-200 hover:text-indigo-700 hover:underline"
          >
            ← Browse resources
          </Link>
        </div>
      </div>
    </div>
  );
}
