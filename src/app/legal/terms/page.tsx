import Link from 'next/link';

export const metadata = {
  title: 'Terms of Service - Riqle',
  description: 'Terms of service for using Riqle platform and purchasing digital products',
};

const LAST_UPDATED = 'January 27, 2026';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-white to-stone-50">
      <div className="mx-auto max-w-4xl px-6 py-16 md:px-8 md:py-24">
        {/* Header */}
        <header className="mb-16">
          <p className="mb-3 text-sm font-medium uppercase tracking-wider text-stone-500">legal</p>
          <h1 className="mb-4 text-[clamp(2.5rem,5vw,3.5rem)] font-semibold leading-[1.1] tracking-tight text-stone-900">
            Terms of Service
          </h1>
          <p className="text-lg text-stone-600">
            Last updated: <time dateTime="2026-01-27">{LAST_UPDATED}</time>
          </p>
        </header>

        <div className="prose prose-stone prose-lg max-w-none">
          {/* Agreement to Terms */}
          <section className="mb-16">
            <h2 className="mb-4 text-2xl font-semibold tracking-tight text-stone-900">
              Agreement to Terms
            </h2>
            <div className="rounded-lg border border-stone-200 bg-white p-6">
              <p className="mb-4 leading-relaxed text-stone-700">
                By accessing or using Riqle ("the Platform"), you agree to these Terms of Service.
                If you don't agree, please don't use the Platform.
              </p>
              <p className="text-sm text-stone-600">
                <strong>Simple version:</strong> These are the rules. By using the site, you agree
                to follow them.
              </p>
            </div>
          </section>

          {/* What We Provide */}
          <section className="mb-16">
            <h2 className="mb-6 text-2xl font-semibold tracking-tight text-stone-900">
              What We Provide
            </h2>
            <p className="mb-6 text-stone-700">
              Riqle provides digital products including ebooks, video courses, templates, and other
              educational resources ("Products").
            </p>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-lg border border-green-200 bg-green-50 p-6">
                <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-green-900">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  What You Get
                </h3>
                <ul className="space-y-2 text-sm text-green-800">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">•</span>
                    <span>Digital Products: Downloadable files (PDFs, videos, code, etc.)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">•</span>
                    <span>Lifetime Access: For products you purchase</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">•</span>
                    <span>Updates: Product updates at our discretion</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">•</span>
                    <span>Support: Reasonable email support for technical issues</span>
                  </li>
                </ul>
              </div>

              <div className="rounded-lg border border-red-200 bg-red-50 p-6">
                <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-red-900">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                  What You Don't Get
                </h3>
                <ul className="space-y-2 text-sm text-red-800">
                  <li className="flex items-start gap-2">
                    <span className="text-red-600">•</span>
                    <span>Physical products: Everything is digital</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600">•</span>
                    <span>Refunds after download: See refund policy below</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600">•</span>
                    <span>Guaranteed support response times</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600">•</span>
                    <span>Product updates forever: We may discontinue products</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Purchases & Payments */}
          <section className="mb-16">
            <h2 className="mb-6 text-2xl font-semibold tracking-tight text-stone-900">
              Purchases & Payments
            </h2>

            <div className="space-y-6">
              <div className="rounded-lg border border-stone-200 bg-white p-6">
                <h3 className="mb-3 text-lg font-semibold text-stone-900">Pricing</h3>
                <ul className="space-y-2 text-stone-700">
                  <li className="flex items-start gap-2">
                    <span className="text-stone-400">•</span>
                    <span>All prices are in USD</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-stone-400">•</span>
                    <span>Prices are subject to change at any time</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-stone-400">•</span>
                    <span>Price changes don't affect existing purchases</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-stone-400">•</span>
                    <span>Sales and discounts are at our discretion</span>
                  </li>
                </ul>
              </div>

              <div className="rounded-lg border border-blue-200 bg-blue-50 p-6">
                <h3 className="mb-3 text-lg font-semibold text-blue-900">Payment Processing</h3>
                <ul className="space-y-2 text-sm text-blue-800">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600">•</span>
                    <span>Payments processed securely by Stripe</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600">•</span>
                    <span>We never see your credit card numbers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600">•</span>
                    <span>Stripe handles all payment data (PCI DSS Level 1 certified)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600">•</span>
                    <span>
                      You agree to{' '}
                      <a
                        href="https://stripe.com/legal"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline"
                      >
                        Stripe's Terms of Service
                      </a>
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Refund Policy - Highlight Box */}
          <section className="mb-16">
            <div className="rounded-xl border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-white p-8">
              <h2 className="mb-4 text-2xl font-semibold tracking-tight text-purple-900">
                30-Day Money-Back Guarantee
              </h2>
              <p className="mb-6 text-lg text-purple-800">
                If you're not satisfied with a product, request a full refund within 30 days of
                purchase.
              </p>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h4 className="mb-3 flex items-center gap-2 font-semibold text-green-900">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    You CAN get a refund if:
                  </h4>
                  <ul className="space-y-2 text-sm text-stone-700">
                    <li className="flex items-start gap-2">
                      <span className="text-green-600">✓</span>
                      <span>Product doesn't match description</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600">✓</span>
                      <span>Technical issues prevent access</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600">✓</span>
                      <span>You're genuinely unsatisfied (no questions asked)</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="mb-3 flex items-center gap-2 font-semibold text-red-900">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                    You CANNOT get a refund if:
                  </h4>
                  <ul className="space-y-2 text-sm text-stone-700">
                    <li className="flex items-start gap-2">
                      <span className="text-red-600">✗</span>
                      <span>You've already downloaded the entire product</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-600">✗</span>
                      <span>More than 30 days have passed</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-600">✗</span>
                      <span>You've requested excessive refunds (abuse)</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-6 rounded-lg bg-purple-100 p-4">
                <p className="text-sm text-purple-900">
                  <strong>How to request:</strong> Email{' '}
                  <a href="mailto:security@riqle.com" className="underline">
                    security@riqle.com
                  </a>{' '}
                  with your order number.
                </p>
                <p className="mt-1 text-sm text-purple-800">
                  <strong>Processing time:</strong> 5-7 business days back to your original payment
                  method.
                </p>
              </div>
            </div>
          </section>

          {/* Product Access & License */}
          <section className="mb-16">
            <h2 className="mb-6 text-2xl font-semibold tracking-tight text-stone-900">
              Product Access & License
            </h2>

            <div className="space-y-6">
              <div className="rounded-lg border border-stone-200 bg-white p-6">
                <h3 className="mb-4 text-lg font-semibold text-stone-900">
                  How Access Works
                </h3>
                <ol className="space-y-3 text-stone-700">
                  <li className="flex gap-3">
                    <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-stone-100 text-sm font-semibold text-stone-900">
                      1
                    </span>
                    <span>You receive an email with access instructions</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-stone-100 text-sm font-semibold text-stone-900">
                      2
                    </span>
                    <span>Click the access link to view/download your product</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-stone-100 text-sm font-semibold text-stone-900">
                      3
                    </span>
                    <span>Access links are valid for 24 hours</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-stone-100 text-sm font-semibold text-stone-900">
                      4
                    </span>
                    <span>Request a new link anytime via email</span>
                  </li>
                </ol>
              </div>

              <div className="rounded-lg border border-stone-200 bg-stone-50 p-6">
                <h3 className="mb-4 text-lg font-semibold text-stone-900">
                  Personal License - What You Can & Can't Do
                </h3>
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <h4 className="mb-3 font-semibold text-green-900">✓ You CAN:</h4>
                    <ul className="space-y-2 text-sm text-stone-700">
                      <li>• Download and use the product personally</li>
                      <li>• Use for learning and education</li>
                      <li>• Keep backups for personal use</li>
                      <li>• Print for personal use (if applicable)</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="mb-3 font-semibold text-red-900">✗ You CANNOT:</h4>
                    <ul className="space-y-2 text-sm text-stone-700">
                      <li>• Share with others (friends, colleagues, teams)</li>
                      <li>• Resell or redistribute</li>
                      <li>• Post on file-sharing sites</li>
                      <li>• Use for commercial training without permission</li>
                      <li>• Remove copyright notices</li>
                    </ul>
                  </div>
                </div>
                <p className="mt-4 text-sm text-stone-600">
                  <strong>Team/Business License:</strong> Contact us for multi-user licensing.
                </p>
              </div>
            </div>
          </section>

          {/* Disclaimers */}
          <section className="mb-16">
            <h2 className="mb-6 text-2xl font-semibold tracking-tight text-stone-900">
              Important Disclaimers
            </h2>
            <div className="rounded-lg border border-amber-200 bg-amber-50 p-6">
              <h3 className="mb-4 text-lg font-semibold text-amber-900">Educational Products</h3>
              <p className="mb-4 text-stone-700">
                Products are for <strong>educational purposes only</strong>:
              </p>
              <ul className="space-y-2 text-sm text-stone-700">
                <li>• Not professional advice (legal, financial, medical, etc.)</li>
                <li>• Results may vary based on your circumstances</li>
                <li>• We make no guarantees of outcomes or success</li>
                <li>• You're responsible for how you use the information</li>
              </ul>
            </div>
          </section>

          {/* Contact */}
          <section className="mb-16">
            <div className="rounded-lg border-2 border-stone-200 bg-white p-8 text-center">
              <h2 className="mb-4 text-2xl font-semibold text-stone-900">Questions?</h2>
              <p className="mb-6 text-stone-600">
                Contact us if you have any questions about these terms.
              </p>
              <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <a
                  href="mailto:security@riqle.com"
                  className="rounded-lg bg-stone-900 px-6 py-3 font-medium text-white transition-colors hover:bg-stone-800"
                >
                  Email Support
                </a>
                <Link
                  href="/legal/contact"
                  className="rounded-lg border-2 border-stone-200 px-6 py-3 font-medium text-stone-900 transition-colors hover:border-stone-300"
                >
                  View Contact Info
                </Link>
              </div>
              <p className="mt-4 text-sm text-stone-500">Response time: 48 hours</p>
            </div>
          </section>

          {/* Footer Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 border-t border-stone-200 pt-8 text-sm text-stone-600">
            <Link href="/legal/privacy" className="hover:text-stone-900">
              Privacy Policy
            </Link>
            <span className="text-stone-300">•</span>
            <Link href="/legal/contact" className="hover:text-stone-900">
              Contact
            </Link>
            <span className="text-stone-300">•</span>
            <span>Last updated: {LAST_UPDATED}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
