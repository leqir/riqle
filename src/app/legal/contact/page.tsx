import Link from 'next/link';
import { BUSINESS_IDENTITY } from '@/lib/config/business-identity';

export const metadata = {
  title: 'Contact & Operator Information - Riqle',
  description: 'Contact information and operator details for Riqle',
};

const LAST_UPDATED = 'January 27, 2026';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-white to-stone-50">
      <div className="mx-auto max-w-4xl px-6 py-16 md:px-8 md:py-24">
        {/* Header */}
        <header className="mb-16">
          <p className="mb-3 text-sm font-medium uppercase tracking-wider text-stone-500">legal</p>
          <h1 className="mb-4 text-[clamp(2.5rem,5vw,3.5rem)] font-semibold leading-[1.1] tracking-tight text-stone-900">
            Contact & Operator Information
          </h1>
          <p className="text-lg text-stone-600">
            Last updated: <time dateTime="2026-01-27">{LAST_UPDATED}</time>
          </p>
        </header>

        <div className="space-y-12">
          {/* Operator Information */}
          <section>
            <div className="rounded-xl border-2 border-stone-200 bg-white p-8">
              <h2 className="mb-6 text-2xl font-semibold text-stone-900">Operator</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-stone-100">
                    <svg className="h-5 w-5 text-stone-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-stone-600">Name</p>
                    <p className="text-lg font-semibold text-stone-900">
                      {BUSINESS_IDENTITY.operator.name}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-stone-100">
                    <svg className="h-5 w-5 text-stone-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-stone-600">Business Type</p>
                    <p className="text-lg font-semibold text-stone-900">
                      {BUSINESS_IDENTITY.operator.type === 'individual'
                        ? 'Individual'
                        : BUSINESS_IDENTITY.operator.type === 'sole-trader'
                          ? 'Sole Trader'
                          : 'Company'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-stone-100">
                    <svg className="h-5 w-5 text-stone-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-stone-600">Jurisdiction</p>
                    <p className="text-lg font-semibold text-stone-900">
                      {BUSINESS_IDENTITY.operator.jurisdiction}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-stone-100">
                    <svg className="h-5 w-5 text-stone-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-stone-600">Website</p>
                    <a
                      href={BUSINESS_IDENTITY.domain.primary}
                      className="text-lg font-semibold text-blue-600 hover:text-blue-700"
                    >
                      {BUSINESS_IDENTITY.domain.primary}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Contact Information */}
          <section>
            <div className="rounded-xl border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-white p-8">
              <h2 className="mb-6 text-2xl font-semibold text-blue-900">Contact</h2>
              <p className="mb-6 text-blue-800">
                For questions, support, or refund requests, email us:
              </p>

              <div className="space-y-4">
                <div className="rounded-lg border border-blue-200 bg-white p-6">
                  <div className="mb-2 flex items-center gap-2">
                    <svg className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span className="text-sm font-medium text-stone-600">General Contact</span>
                  </div>
                  <a
                    href={`mailto:${BUSINESS_IDENTITY.contact.email}`}
                    className="text-2xl font-semibold text-blue-600 hover:text-blue-700"
                  >
                    {BUSINESS_IDENTITY.contact.email}
                  </a>
                </div>

                <div className="rounded-lg border border-blue-200 bg-white p-6">
                  <div className="mb-2 flex items-center gap-2">
                    <svg className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <span className="text-sm font-medium text-stone-600">Support & Security</span>
                  </div>
                  <a
                    href={`mailto:${BUSINESS_IDENTITY.contact.supportEmail}`}
                    className="text-2xl font-semibold text-blue-600 hover:text-blue-700"
                  >
                    {BUSINESS_IDENTITY.contact.supportEmail}
                  </a>
                </div>
              </div>

              <div className="mt-6 rounded-lg bg-blue-100 p-4">
                <p className="flex items-center gap-2 text-sm text-blue-900">
                  <svg className="h-5 w-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>
                    <strong>Response time:</strong> We aim to respond within 2 business days (48 hours)
                  </span>
                </p>
              </div>
            </div>
          </section>

          {/* What to Contact Us About */}
          <section>
            <h2 className="mb-6 text-2xl font-semibold text-stone-900">What to Contact Us About</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-lg border border-stone-200 bg-white p-6">
                <h3 className="mb-3 font-semibold text-stone-900">Product Support</h3>
                <ul className="space-y-2 text-sm text-stone-700">
                  <li className="flex items-start gap-2">
                    <span className="text-stone-400">•</span>
                    <span>Access issues or lost download links</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-stone-400">•</span>
                    <span>Technical problems with products</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-stone-400">•</span>
                    <span>Questions about product content</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-stone-400">•</span>
                    <span>Product updates or changes</span>
                  </li>
                </ul>
              </div>

              <div className="rounded-lg border border-stone-200 bg-white p-6">
                <h3 className="mb-3 font-semibold text-stone-900">Account & Orders</h3>
                <ul className="space-y-2 text-sm text-stone-700">
                  <li className="flex items-start gap-2">
                    <span className="text-stone-400">•</span>
                    <span>Refund requests</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-stone-400">•</span>
                    <span>Order confirmation issues</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-stone-400">•</span>
                    <span>Account deletion requests</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-stone-400">•</span>
                    <span>Data export requests (GDPR)</span>
                  </li>
                </ul>
              </div>

              <div className="rounded-lg border border-stone-200 bg-white p-6">
                <h3 className="mb-3 font-semibold text-stone-900">Privacy & Security</h3>
                <ul className="space-y-2 text-sm text-stone-700">
                  <li className="flex items-start gap-2">
                    <span className="text-stone-400">•</span>
                    <span>Privacy policy questions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-stone-400">•</span>
                    <span>Security concerns or disclosures</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-stone-400">•</span>
                    <span>Data access requests</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-stone-400">•</span>
                    <span>GDPR/CCPA compliance</span>
                  </li>
                </ul>
              </div>

              <div className="rounded-lg border border-stone-200 bg-white p-6">
                <h3 className="mb-3 font-semibold text-stone-900">Business Inquiries</h3>
                <ul className="space-y-2 text-sm text-stone-700">
                  <li className="flex items-start gap-2">
                    <span className="text-stone-400">•</span>
                    <span>Team/business licensing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-stone-400">•</span>
                    <span>Partnership opportunities</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-stone-400">•</span>
                    <span>Custom product requests</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-stone-400">•</span>
                    <span>General questions</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Commitment */}
          <section>
            <div className="rounded-lg border border-green-200 bg-green-50 p-6">
              <h3 className="mb-3 text-lg font-semibold text-green-900">Our Commitment</h3>
              <p className="text-green-800">
                We're real people building this platform. We respond to every email personally, and
                we're committed to making things right if something goes wrong.
              </p>
            </div>
          </section>

          {/* Footer Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 border-t border-stone-200 pt-8 text-sm text-stone-600">
            <Link href="/legal/terms" className="hover:text-stone-900">
              Terms of Service
            </Link>
            <span className="text-stone-300">•</span>
            <Link href="/legal/privacy" className="hover:text-stone-900">
              Privacy Policy
            </Link>
            <span className="text-stone-300">•</span>
            <span>Last updated: {LAST_UPDATED}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
