import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms & Conditions | Riqle',
  description: 'Terms and conditions for using riqle services and products.',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="mx-auto max-w-4xl px-6 py-16 lg:px-8 lg:py-24">
        {/* Header */}
        <div className="mb-12">
          <h1 className="bg-gradient-to-r from-stone-900 via-stone-700 to-stone-900 bg-clip-text text-4xl font-bold tracking-tight text-transparent md:text-5xl">
            terms & conditions
          </h1>
          <p className="mt-4 text-lg text-stone-600">last updated: January 21, 2026</p>
        </div>

        {/* Content */}
        <div className="prose prose-stone max-w-none">
          <div className="rounded-2xl border border-stone-200 bg-white p-8 shadow-sm">
            {/* Introduction */}
            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-bold lowercase text-stone-900">1. introduction</h2>
              <p className="leading-relaxed text-stone-600">
                welcome to riqle. these terms and conditions outline the rules and regulations for
                the use of our website and services. by accessing this website and using our
                services, you accept these terms and conditions in full. do not continue to use
                riqle if you do not agree to all of the terms and conditions stated on this page.
              </p>
            </section>

            {/* Use of Services */}
            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-bold lowercase text-stone-900">
                2. use of services
              </h2>
              <p className="mb-4 leading-relaxed text-stone-600">
                by using our services, you agree to:
              </p>
              <ul className="ml-6 list-disc space-y-2 text-stone-600">
                <li>provide accurate and complete information when creating an account</li>
                <li>maintain the security of your account credentials</li>
                <li>use our services in compliance with all applicable laws and regulations</li>
                <li>not engage in any activity that disrupts or interferes with our services</li>
                <li>not use our services for any unlawful or fraudulent purpose</li>
                <li>respect intellectual property rights of content on our platform</li>
              </ul>
            </section>

            {/* Account Responsibilities */}
            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-bold lowercase text-stone-900">
                3. account responsibilities
              </h2>
              <p className="leading-relaxed text-stone-600">
                you are responsible for maintaining the confidentiality of your account and
                password. you agree to accept responsibility for all activities that occur under
                your account. you must notify us immediately upon becoming aware of any breach of
                security or unauthorized use of your account.
              </p>
            </section>

            {/* Purchases and Payments */}
            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-bold lowercase text-stone-900">
                4. purchases and payments
              </h2>
              <p className="mb-4 leading-relaxed text-stone-600">
                when purchasing digital products or services from riqle:
              </p>
              <ul className="ml-6 list-disc space-y-2 text-stone-600">
                <li>all payments are processed securely through Stripe</li>
                <li>prices are displayed in the currency specified at checkout</li>
                <li>digital products are delivered immediately upon successful payment</li>
                <li>refunds are subject to our refund policy outlined below</li>
                <li>we reserve the right to refuse or cancel orders at our discretion</li>
              </ul>
            </section>

            {/* Refund Policy */}
            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-bold lowercase text-stone-900">5. refund policy</h2>
              <p className="leading-relaxed text-stone-600">
                due to the nature of digital products, refunds are generally not provided once
                access has been granted. however, we may offer refunds on a case-by-case basis if
                the product is defective or does not match its description. refund requests must be
                submitted within 14 days of purchase.
              </p>
            </section>

            {/* Intellectual Property */}
            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-bold lowercase text-stone-900">
                6. intellectual property
              </h2>
              <p className="leading-relaxed text-stone-600">
                all content, features, and functionality on riqle, including but not limited to
                text, graphics, logos, images, and software, are the exclusive property of riqle or
                its content suppliers and are protected by international copyright, trademark,
                patent, trade secret, and other intellectual property laws. purchased digital
                products are licensed to you for personal use only and may not be redistributed,
                resold, or shared.
              </p>
            </section>

            {/* User Content */}
            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-bold lowercase text-stone-900">7. user content</h2>
              <p className="leading-relaxed text-stone-600">
                by submitting content to riqle (such as comments, feedback, or contributions), you
                grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, modify,
                adapt, publish, and display such content. you represent that you own or have the
                necessary rights to all content you submit.
              </p>
            </section>

            {/* Prohibited Activities */}
            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-bold lowercase text-stone-900">
                8. prohibited activities
              </h2>
              <p className="mb-4 leading-relaxed text-stone-600">you may not:</p>
              <ul className="ml-6 list-disc space-y-2 text-stone-600">
                <li>attempt to gain unauthorized access to our systems or networks</li>
                <li>use our services to transmit viruses or malicious code</li>
                <li>engage in any form of automated data collection (scraping, bots)</li>
                <li>impersonate any person or entity or misrepresent your affiliation</li>
                <li>share purchased content with unauthorized users</li>
                <li>reverse engineer or attempt to extract source code from our services</li>
              </ul>
            </section>

            {/* Limitation of Liability */}
            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-bold lowercase text-stone-900">
                9. limitation of liability
              </h2>
              <p className="leading-relaxed text-stone-600">
                riqle and its affiliates will not be liable for any indirect, incidental, special,
                consequential, or punitive damages resulting from your use of or inability to use
                our services. our total liability for any claims under these terms shall not exceed
                the amount you paid to us in the twelve months prior to the claim.
              </p>
            </section>

            {/* Disclaimer of Warranties */}
            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-bold lowercase text-stone-900">
                10. disclaimer of warranties
              </h2>
              <p className="leading-relaxed text-stone-600">
                our services are provided &quot;as is&quot; and &quot;as available&quot; without any
                warranties of any kind, either express or implied. we do not warrant that our
                services will be uninterrupted, secure, or error-free. we make no warranties about
                the accuracy or completeness of content available through our services.
              </p>
            </section>

            {/* Indemnification */}
            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-bold lowercase text-stone-900">
                11. indemnification
              </h2>
              <p className="leading-relaxed text-stone-600">
                you agree to indemnify and hold harmless riqle, its officers, directors, employees,
                and agents from any claims, damages, losses, liabilities, and expenses (including
                legal fees) arising from your use of our services, your violation of these terms, or
                your violation of any rights of another party.
              </p>
            </section>

            {/* Termination */}
            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-bold lowercase text-stone-900">12. termination</h2>
              <p className="leading-relaxed text-stone-600">
                we reserve the right to suspend or terminate your account and access to our services
                at any time, without notice, for conduct that we believe violates these terms or is
                harmful to other users, us, or third parties, or for any other reason at our sole
                discretion.
              </p>
            </section>

            {/* Changes to Terms */}
            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-bold lowercase text-stone-900">
                13. changes to terms
              </h2>
              <p className="leading-relaxed text-stone-600">
                we reserve the right to modify these terms at any time. we will notify users of any
                material changes by posting the updated terms on this page and updating the
                &quot;last updated&quot; date. your continued use of our services after such changes
                constitutes your acceptance of the new terms.
              </p>
            </section>

            {/* Governing Law */}
            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-bold lowercase text-stone-900">
                14. governing law
              </h2>
              <p className="leading-relaxed text-stone-600">
                these terms shall be governed by and construed in accordance with the laws of
                Australia, without regard to its conflict of law provisions. you agree to submit to
                the exclusive jurisdiction of the courts located in Australia for the resolution of
                any disputes.
              </p>
            </section>

            {/* Contact Information */}
            <section className="mb-0">
              <h2 className="mb-4 text-2xl font-bold lowercase text-stone-900">
                15. contact information
              </h2>
              <p className="leading-relaxed text-stone-600">
                if you have any questions about these terms and conditions, please contact us at{' '}
                <a
                  href="mailto:nathanael.thie@gmail.com"
                  className="font-medium text-cyan-600 transition-colors hover:text-cyan-700"
                >
                  nathanael.thie@gmail.com
                </a>
              </p>
            </section>
          </div>
        </div>

        {/* Back to home */}
        <div className="mt-12 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium lowercase text-stone-600 transition-colors hover:text-cyan-600"
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
            back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
