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
  searchParams: Promise<{
    session_id?: string;
  }>;
}

export default async function SuccessPage({ searchParams }: SuccessPageProps) {
  const params = await searchParams;
  const sessionId = params.session_id;

  // Retrieve Stripe session if session_id provided
  const session = sessionId ? await stripe.checkout.sessions.retrieve(sessionId) : null;

  // Get order from database
  const order = session
    ? await db.order.findUnique({
        where: { stripeSessionId: session.id },
        include: {
          OrderItem: {
            include: {
              Product: true,
            },
          },
        },
      })
    : null;

  const product = order?.OrderItem[0]?.Product;
  const customerEmail = session?.customer_details?.email || order?.customerEmail;

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="mx-auto max-w-4xl px-6 py-16 lg:px-8 lg:py-24">
        {/* Success Icon */}
        <div className="mb-8 flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-purple-500 shadow-lg">
            <svg
              className="h-8 w-8 text-white"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2.5"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </div>
        </div>

        {/* Header */}
        <header className="mb-12 text-center">
          <h1 className="mb-4 bg-gradient-to-r from-stone-900 via-stone-700 to-stone-900 bg-clip-text text-4xl font-bold lowercase tracking-tight text-transparent md:text-5xl">
            purchase complete
          </h1>
          {product && (
            <p className="text-lg text-stone-600">
              thank you for purchasing{' '}
              <span className="font-semibold text-stone-900">{product.title}</span>
            </p>
          )}
        </header>

        {/* What happens next */}
        <section className="mb-8 rounded-2xl border border-stone-200 bg-white p-8 shadow-sm">
          <h2 className="mb-6 text-xl font-semibold lowercase text-stone-900">what happens next</h2>
          <ol className="space-y-4">
            <li className="flex gap-4">
              <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-purple-500 text-sm font-semibold text-white">
                1
              </span>
              <div>
                <p className="text-stone-700">
                  you&apos;ll receive an email with access instructions within 1 minute
                </p>
                {customerEmail && (
                  <p className="mt-1 text-sm text-stone-500">
                    sent to: <span className="font-medium text-stone-700">{customerEmail}</span>
                  </p>
                )}
              </div>
            </li>
            <li className="flex gap-4">
              <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-purple-500 text-sm font-semibold text-white">
                2
              </span>
              <p className="text-stone-700">
                click the access link in the email to view and download your files
              </p>
            </li>
            <li className="flex gap-4">
              <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-purple-500 text-sm font-semibold text-white">
                3
              </span>
              <p className="text-stone-700">
                save the email — you can use it to access your purchase anytime
              </p>
            </li>
          </ol>
        </section>

        {/* Didn't receive email? */}
        <section className="mb-8 rounded-2xl border border-stone-200 bg-white p-8 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold lowercase text-stone-900">
            didn&apos;t receive the email?
          </h2>
          <ul className="space-y-3 text-stone-700">
            <li className="flex items-start gap-2">
              <svg
                className="mt-0.5 h-5 w-5 flex-shrink-0 text-cyan-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                  clipRule="evenodd"
                />
              </svg>
              <span>
                <strong className="font-semibold text-stone-900">check your spam folder</strong> —
                sometimes emails end up there
              </span>
            </li>
            <li className="flex items-start gap-2">
              <svg
                className="mt-0.5 h-5 w-5 flex-shrink-0 text-cyan-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-13a.75.75 0 00-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 000-1.5h-3.25V5z"
                  clipRule="evenodd"
                />
              </svg>
              <span>
                <strong className="font-semibold text-stone-900">wait a few minutes</strong> —
                emails usually arrive within 60 seconds
              </span>
            </li>
            <li className="flex items-start gap-2">
              <svg
                className="mt-0.5 h-5 w-5 flex-shrink-0 text-cyan-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M3 4a2 2 0 00-2 2v1.161l8.441 4.221a1.25 1.25 0 001.118 0L19 7.162V6a2 2 0 00-2-2H3z" />
                <path d="M19 8.839l-7.77 3.885a2.75 2.75 0 01-2.46 0L1 8.839V14a2 2 0 002 2h14a2 2 0 002-2V8.839z" />
              </svg>
              <span>
                <strong className="font-semibold text-stone-900">still nothing?</strong> email{' '}
                <a
                  href="mailto:nathanael.thie@gmail.com"
                  className="font-medium text-cyan-600 transition-colors duration-200 hover:text-cyan-700 hover:underline"
                >
                  nathanael.thie@gmail.com
                </a>{' '}
                and we&apos;ll send you access immediately
              </span>
            </li>
          </ul>
        </section>

        {/* Return to resources */}
        <div className="text-center">
          <Link
            href="/resources"
            className="inline-flex items-center gap-2 text-sm font-medium lowercase text-stone-600 transition-colors duration-200 hover:text-cyan-600"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            browse more resources
          </Link>
        </div>

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
