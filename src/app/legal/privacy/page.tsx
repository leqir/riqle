import Link from 'next/link';

export const metadata = {
  title: 'Privacy Policy - Riqle',
  description: 'How we collect, use, and protect your personal information',
};

const LAST_UPDATED = 'January 27, 2026';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-white to-stone-50">
      <div className="mx-auto max-w-4xl px-6 py-16 md:px-8 md:py-24">
        {/* Header */}
        <header className="mb-16">
          <p className="mb-3 text-sm font-medium uppercase tracking-wider text-stone-500">legal</p>
          <h1 className="mb-4 text-[clamp(2.5rem,5vw,3.5rem)] font-semibold leading-[1.1] tracking-tight text-stone-900">
            Privacy Policy
          </h1>
          <p className="text-lg text-stone-600">
            Last updated: <time dateTime="2026-01-27">{LAST_UPDATED}</time>
          </p>
        </header>

        {/* Philosophy Highlight */}
        <div className="mb-16 rounded-xl border-2 border-stone-900 bg-stone-50 p-8">
          <h2 className="mb-4 text-2xl font-semibold text-stone-900">Our Philosophy</h2>
          <p className="mb-4 text-lg leading-relaxed text-stone-700">
            We believe privacy is a right, not a privilege. We collect only what we need to deliver
            our products and nothing more.
          </p>
          <p className="text-xl font-semibold text-stone-900">
            "If we don't collect it, we can't leak it."
          </p>
          <p className="mt-4 text-sm text-stone-600">
            This privacy policy explains what we collect, why we collect it, and what we do with
            it. No legal theater, no hidden surprises — just the truth.
          </p>
        </div>

        <div className="prose prose-stone prose-lg max-w-none">
          {/* What We Collect */}
          <section className="mb-16">
            <h2 className="mb-6 text-2xl font-semibold tracking-tight text-stone-900">
              What We Collect
            </h2>

            <div className="space-y-6">
              {/* Email Address */}
              <div className="rounded-lg border border-blue-200 bg-blue-50 p-6">
                <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold text-blue-900">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  Email Address (Required)
                </h3>
                <div className="space-y-2 text-sm text-blue-900">
                  <p>
                    <strong>Why:</strong> To send you purchased products, access links, and order
                    confirmations
                  </p>
                  <p>
                    <strong>How we use it:</strong> Authentication (passwordless login), order
                    fulfillment, product delivery
                  </p>
                  <p>
                    <strong>Can you delete it:</strong> Yes, by deleting your account
                  </p>
                </div>
              </div>

              {/* Payment Info */}
              <div className="rounded-lg border border-green-200 bg-green-50 p-6">
                <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold text-green-900">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                    />
                  </svg>
                  Payment Information (Handled by Stripe)
                </h3>
                <div className="space-y-2 text-sm text-green-900">
                  <p>
                    <strong>Why:</strong> To process purchases
                  </p>
                  <p>
                    <strong>What we see:</strong> We NEVER see your credit card numbers
                  </p>
                  <p>
                    <strong>Who handles it:</strong> Stripe (PCI DSS Level 1 certified)
                  </p>
                  <p>
                    <strong>What we store:</strong> Stripe customer ID (for refund processing)
                  </p>
                </div>
              </div>

              {/* What We DON'T Collect */}
              <div className="rounded-lg border border-red-200 bg-red-50 p-6">
                <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-red-900">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
                    />
                  </svg>
                  What We DO NOT Collect
                </h3>
                <div className="grid gap-2 text-sm text-red-900 sm:grid-cols-2">
                  <div className="flex items-center gap-2">
                    <span className="text-red-600">✗</span>
                    <span>Names (email is enough)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-red-600">✗</span>
                    <span>Phone numbers</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-red-600">✗</span>
                    <span>Addresses</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-red-600">✗</span>
                    <span>Date of birth</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-red-600">✗</span>
                    <span>Gender or demographics</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-red-600">✗</span>
                    <span>Browsing behavior</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-red-600">✗</span>
                    <span>Location data</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-red-600">✗</span>
                    <span>Social media profiles</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* How We Use Your Information */}
          <section className="mb-16">
            <h2 className="mb-6 text-2xl font-semibold tracking-tight text-stone-900">
              How We Use Your Information
            </h2>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-lg border border-stone-200 bg-white p-6">
                <h3 className="mb-4 flex items-center gap-2 font-semibold text-stone-900">
                  <svg className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  We Use Your Email To:
                </h3>
                <ul className="space-y-2 text-sm text-stone-700">
                  <li className="flex items-start gap-2">
                    <span className="text-stone-400">1.</span>
                    <span>Send you purchased products - Digital downloads, access links</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-stone-400">2.</span>
                    <span>Confirm orders - Purchase receipts</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-stone-400">3.</span>
                    <span>Recover access - If you lose your download link</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-stone-400">4.</span>
                    <span>Notify you - Refund confirmations, important account updates</span>
                  </li>
                </ul>
              </div>

              <div className="rounded-lg border border-red-200 bg-red-50 p-6">
                <h3 className="mb-4 flex items-center gap-2 font-semibold text-red-900">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  We DO NOT:
                </h3>
                <ul className="space-y-2 text-sm text-red-900">
                  <li className="flex items-start gap-2">
                    <span className="text-red-600">✗</span>
                    <span>Sell your email to anyone (ever)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600">✗</span>
                    <span>Send marketing emails (unless you opt in)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600">✗</span>
                    <span>Track you across websites</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600">✗</span>
                    <span>Build profiles or behavioral data</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600">✗</span>
                    <span>Use your data for AI training</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Who We Share With */}
          <section className="mb-16">
            <h2 className="mb-6 text-2xl font-semibold tracking-tight text-stone-900">
              Who We Share With
            </h2>
            <p className="mb-6 text-stone-700">
              We share your information with exactly <strong>3 companies</strong>, and only for
              essential services:
            </p>

            <div className="space-y-4">
              <div className="rounded-lg border border-stone-200 bg-white p-6">
                <h3 className="mb-2 font-semibold text-stone-900">Stripe (Payment Processing)</h3>
                <div className="space-y-1 text-sm text-stone-600">
                  <p>
                    <strong>What they get:</strong> Email, purchase amount
                  </p>
                  <p>
                    <strong>Why:</strong> Process payments securely
                  </p>
                  <p>
                    <strong>Privacy policy:</strong>{' '}
                    <a
                      href="https://stripe.com/privacy"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline"
                    >
                      stripe.com/privacy
                    </a>
                  </p>
                </div>
              </div>

              <div className="rounded-lg border border-stone-200 bg-white p-6">
                <h3 className="mb-2 font-semibold text-stone-900">Resend (Email Delivery)</h3>
                <div className="space-y-1 text-sm text-stone-600">
                  <p>
                    <strong>What they get:</strong> Email address, email content
                  </p>
                  <p>
                    <strong>Why:</strong> Deliver order confirmations and access links
                  </p>
                  <p>
                    <strong>Privacy policy:</strong>{' '}
                    <a
                      href="https://resend.com/legal/privacy-policy"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline"
                    >
                      resend.com/legal/privacy-policy
                    </a>
                  </p>
                </div>
              </div>

              <div className="rounded-lg border border-stone-200 bg-white p-6">
                <h3 className="mb-2 font-semibold text-stone-900">Sentry (Error Tracking)</h3>
                <div className="space-y-1 text-sm text-stone-600">
                  <p>
                    <strong>What they get:</strong> Technical errors (PII scrubbed)
                  </p>
                  <p>
                    <strong>Why:</strong> Fix bugs, improve reliability
                  </p>
                  <p>
                    <strong>Privacy policy:</strong>{' '}
                    <a
                      href="https://sentry.io/privacy/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline"
                    >
                      sentry.io/privacy
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Your Rights */}
          <section className="mb-16">
            <h2 className="mb-6 text-2xl font-semibold tracking-tight text-stone-900">
              Your Rights
            </h2>

            <div className="rounded-lg border-2 border-purple-200 bg-purple-50 p-6">
              <h3 className="mb-4 text-lg font-semibold text-purple-900">
                You Have the Right To:
              </h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex items-start gap-3">
                  <svg className="mt-1 h-5 w-5 flex-shrink-0 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  <div>
                    <p className="font-semibold text-purple-900">Access Your Data</p>
                    <p className="text-sm text-purple-800">
                      See all personal data we have about you
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <svg className="mt-1 h-5 w-5 flex-shrink-0 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  <div>
                    <p className="font-semibold text-purple-900">Update Your Data</p>
                    <p className="text-sm text-purple-800">Change your email address</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <svg className="mt-1 h-5 w-5 flex-shrink-0 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  <div>
                    <p className="font-semibold text-purple-900">Delete Your Data</p>
                    <p className="text-sm text-purple-800">
                      Delete your account and all personal data
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <svg className="mt-1 h-5 w-5 flex-shrink-0 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  <div>
                    <p className="font-semibold text-purple-900">Export Your Data</p>
                    <p className="text-sm text-purple-800">Get a copy in JSON format (GDPR)</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 rounded-lg bg-purple-100 p-4">
                <p className="text-sm text-purple-900">
                  <strong>Contact:</strong>{' '}
                  <a href="mailto:security@riqle.com" className="underline">
                    security@riqle.com
                  </a>
                </p>
                <p className="text-sm text-purple-800">
                  <strong>Response time:</strong> Within 7 days
                </p>
              </div>
            </div>
          </section>

          {/* Data Security */}
          <section className="mb-16">
            <h2 className="mb-6 text-2xl font-semibold tracking-tight text-stone-900">
              Data Security
            </h2>

            <div className="rounded-lg border border-stone-200 bg-stone-50 p-6">
              <h3 className="mb-4 text-lg font-semibold text-stone-900">
                How We Protect Your Data
              </h3>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="flex items-start gap-2">
                  <svg className="mt-1 h-5 w-5 flex-shrink-0 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <span className="text-sm text-stone-700">HTTPS Everywhere (TLS 1.3)</span>
                </div>
                <div className="flex items-start gap-2">
                  <svg className="mt-1 h-5 w-5 flex-shrink-0 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <span className="text-sm text-stone-700">Database Encryption at Rest</span>
                </div>
                <div className="flex items-start gap-2">
                  <svg className="mt-1 h-5 w-5 flex-shrink-0 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                  </svg>
                  <span className="text-sm text-stone-700">No Passwords (Magic Links)</span>
                </div>
                <div className="flex items-start gap-2">
                  <svg className="mt-1 h-5 w-5 flex-shrink-0 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  <span className="text-sm text-stone-700">Automatic IP Deletion (30 days)</span>
                </div>
              </div>
            </div>
          </section>

          {/* Data Retention Table */}
          <section className="mb-16">
            <h2 className="mb-6 text-2xl font-semibold tracking-tight text-stone-900">
              Data Retention
            </h2>
            <div className="overflow-hidden rounded-lg border border-stone-200">
              <table className="w-full">
                <thead className="bg-stone-100">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-stone-900">
                      Data Type
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-stone-900">
                      How Long
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-stone-900">Why</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200 bg-white">
                  <tr>
                    <td className="px-6 py-4 text-sm text-stone-900">User Accounts</td>
                    <td className="px-6 py-4 text-sm text-stone-600">Until you delete</td>
                    <td className="px-6 py-4 text-sm text-stone-600">Core business data</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm text-stone-900">Orders</td>
                    <td className="px-6 py-4 text-sm text-stone-600">7 years</td>
                    <td className="px-6 py-4 text-sm text-stone-600">Tax/legal requirement</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm text-stone-900">IP Addresses</td>
                    <td className="px-6 py-4 text-sm text-stone-600">30 days max</td>
                    <td className="px-6 py-4 text-sm text-stone-600">Fraud prevention</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm text-stone-900">Error Logs</td>
                    <td className="px-6 py-4 text-sm text-stone-600">90 days</td>
                    <td className="px-6 py-4 text-sm text-stone-600">Security monitoring</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Contact */}
          <section className="mb-16">
            <div className="rounded-lg border-2 border-stone-200 bg-white p-8 text-center">
              <h2 className="mb-4 text-2xl font-semibold text-stone-900">Privacy Questions?</h2>
              <p className="mb-6 text-stone-600">
                Contact us if you have any questions about how we handle your data.
              </p>
              <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <a
                  href="mailto:security@riqle.com"
                  className="rounded-lg bg-stone-900 px-6 py-3 font-medium text-white transition-colors hover:bg-stone-800"
                >
                  Email Security Team
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
            <Link href="/legal/terms" className="hover:text-stone-900">
              Terms of Service
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
