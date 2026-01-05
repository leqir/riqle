/**
 * Post-Purchase Success Page
 *
 * Epic 10 - Story 10.4: Post-Purchase Confirmation Experience
 *
 * Shows confirmation after successful purchase, with clear next steps
 * and email notification status.
 */

import { stripe } from '@/lib/stripe';
import { db } from '@/lib/db';
import Link from 'next/link';

export const metadata = {
  title: 'Purchase Complete | Riqle',
  description: 'Your purchase was successful',
};

interface SuccessPageProps {
  searchParams: {
    session_id?: string;
  };
}

export default async function SuccessPage({ searchParams }: SuccessPageProps) {
  const sessionId = searchParams.session_id;

  // Retrieve Stripe session if session_id provided
  const session = sessionId ? await stripe.checkout.sessions.retrieve(sessionId) : null;

  // Get order from database
  const order = session
    ? await db.order.findUnique({
        where: { stripeSessionId: session.id },
        include: {
          items: {
            include: {
              product: true,
            },
          },
        },
      })
    : null;

  const product = order?.items[0]?.product;
  const customerEmail = session?.customer_details?.email || order?.customerEmail;

  return (
    <div className="relative min-h-screen">
      <div className="mx-auto max-w-3xl px-6 py-24 md:px-8 md:py-32">
        {/* Header */}
        <header className="mb-12">
          <h1 className="mb-4 text-[clamp(2.5rem,5vw,4rem)] font-bold tracking-tight text-stone-900">
            Purchase complete
          </h1>
          {product && (
            <p className="text-xl leading-relaxed text-stone-700">
              Thank you for purchasing <strong>{product.title}</strong>.
            </p>
          )}
        </header>

        {/* What happens next */}
        <section className="mb-12 rounded-2xl bg-stone-50 p-8">
          <h2 className="mb-4 text-2xl font-semibold text-stone-900">What happens next</h2>
          <ol className="space-y-3 text-lg leading-relaxed text-stone-700">
            <li className="flex gap-3">
              <span className="font-semibold text-stone-900">1.</span>
              <span>
                You&apos;ll receive an email with access instructions within 1 minute
                {customerEmail && (
                  <span className="block text-base text-stone-600 mt-1">
                    Sent to: {customerEmail}
                  </span>
                )}
              </span>
            </li>
            <li className="flex gap-3">
              <span className="font-semibold text-stone-900">2.</span>
              <span>Click the access link in the email to view and download your files</span>
            </li>
            <li className="flex gap-3">
              <span className="font-semibold text-stone-900">3.</span>
              <span>Save the email — you can use it to access your purchase anytime</span>
            </li>
          </ol>
        </section>

        {/* Didn't receive email? */}
        <section className="mb-12 rounded-2xl border border-stone-200 bg-white p-8">
          <h2 className="mb-4 text-2xl font-semibold text-stone-900">
            Didn&apos;t receive the email?
          </h2>
          <ul className="space-y-3 text-lg leading-relaxed text-stone-700">
            <li>
              <span className="font-semibold text-stone-900">Check your spam folder</span> —
              sometimes emails end up there
            </li>
            <li>
              <span className="font-semibold text-stone-900">Wait a few minutes</span> —
              emails usually arrive within 60 seconds
            </li>
            <li>
              <span className="font-semibold text-stone-900">Still nothing?</span> Email{' '}
              <a
                href="mailto:support@riqle.com"
                className="text-indigo-600 transition-colors duration-200 hover:text-indigo-700 hover:underline"
              >
                support@riqle.com
              </a>{' '}
              and we&apos;ll send you access immediately
            </li>
          </ul>
        </section>

        {/* Return to resources */}
        <section>
          <Link
            href="/resources"
            className="inline-block text-lg text-indigo-600 transition-colors duration-200 hover:text-indigo-700 hover:underline"
          >
            ← Browse more resources
          </Link>
        </section>

        {/* Hidden order details for debugging */}
        {process.env.NODE_ENV === 'development' && order && (
          <section className="mt-12 rounded-md border border-yellow-300 bg-yellow-50 p-4">
            <details>
              <summary className="cursor-pointer text-sm font-semibold text-yellow-900">
                Debug: Order Details
              </summary>
              <pre className="mt-2 text-xs text-yellow-800">
                {JSON.stringify(
                  {
                    orderId: order.id,
                    sessionId: session?.id,
                    customerEmail,
                    product: product?.slug,
                    status: order.status,
                  },
                  null,
                  2
                )}
              </pre>
            </details>
          </section>
        )}
      </div>
    </div>
  );
}
