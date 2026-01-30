import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy | Riqle',
  description: 'Privacy policy for riqle - how we collect, use, and protect your data.',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="mx-auto max-w-4xl px-6 py-16 lg:px-8 lg:py-24">
        {/* Header */}
        <div className="mb-12">
          <h1 className="bg-gradient-to-r from-stone-900 via-stone-700 to-stone-900 bg-clip-text text-4xl font-bold tracking-tight text-transparent md:text-5xl">
            privacy policy
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
                at riqle, we take your privacy seriously. this privacy policy explains how we
                collect, use, disclose, and safeguard your information when you visit our website
                and use our services. by using riqle, you consent to the data practices described in
                this policy.
              </p>
            </section>

            {/* Information We Collect */}
            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-bold lowercase text-stone-900">
                2. information we collect
              </h2>

              <h3 className="mb-3 mt-6 text-xl font-semibold lowercase text-stone-900">
                2.1 personal information
              </h3>
              <p className="mb-4 leading-relaxed text-stone-600">
                we may collect personal information that you voluntarily provide to us when you:
              </p>
              <ul className="ml-6 list-disc space-y-2 text-stone-600">
                <li>create an account or register for our services</li>
                <li>make a purchase or transaction</li>
                <li>subscribe to our newsletter or marketing communications</li>
                <li>contact us with inquiries or feedback</li>
                <li>participate in surveys or promotions</li>
              </ul>
              <p className="mt-4 leading-relaxed text-stone-600">
                this information may include: name, email address, billing address, payment
                information, and any other information you choose to provide.
              </p>

              <h3 className="mb-3 mt-6 text-xl font-semibold lowercase text-stone-900">
                2.2 automatically collected information
              </h3>
              <p className="mb-4 leading-relaxed text-stone-600">
                when you access our website, we automatically collect certain information about your
                device and browsing activity:
              </p>
              <ul className="ml-6 list-disc space-y-2 text-stone-600">
                <li>IP address and device identifiers</li>
                <li>browser type and version</li>
                <li>operating system</li>
                <li>pages visited and time spent on pages</li>
                <li>referring/exit pages</li>
                <li>date and time stamps</li>
                <li>clickstream data</li>
              </ul>

              <h3 className="mb-3 mt-6 text-xl font-semibold lowercase text-stone-900">
                2.3 cookies and tracking technologies
              </h3>
              <p className="leading-relaxed text-stone-600">
                we use cookies, web beacons, and similar tracking technologies to collect
                information about your browsing activities. you can control cookie preferences
                through your browser settings, but disabling cookies may limit your ability to use
                certain features of our services.
              </p>
            </section>

            {/* How We Use Your Information */}
            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-bold lowercase text-stone-900">
                3. how we use your information
              </h2>
              <p className="mb-4 leading-relaxed text-stone-600">
                we use the collected information for various purposes:
              </p>
              <ul className="ml-6 list-disc space-y-2 text-stone-600">
                <li>to provide, maintain, and improve our services</li>
                <li>to process your transactions and send order confirmations</li>
                <li>to manage your account and provide customer support</li>
                <li>to send you technical notices and security alerts</li>
                <li>to communicate with you about products, services, and promotions</li>
                <li>to personalize your experience and deliver relevant content</li>
                <li>to analyse usage patterns and optimise our website</li>
                <li>to detect, prevent, and address fraud and security issues</li>
                <li>to comply with legal obligations and enforce our terms</li>
              </ul>
            </section>

            {/* Sharing Your Information */}
            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-bold lowercase text-stone-900">
                4. sharing your information
              </h2>
              <p className="mb-4 leading-relaxed text-stone-600">
                we may share your information in the following circumstances:
              </p>

              <h3 className="mb-3 mt-6 text-xl font-semibold lowercase text-stone-900">
                4.1 service providers
              </h3>
              <p className="leading-relaxed text-stone-600">
                we work with third-party service providers who perform services on our behalf, such
                as payment processing (Stripe), email delivery, hosting, analytics, and customer
                support. these providers have access to your information only to perform specific
                tasks and are obligated to protect your data.
              </p>

              <h3 className="mb-3 mt-6 text-xl font-semibold lowercase text-stone-900">
                4.2 legal requirements
              </h3>
              <p className="leading-relaxed text-stone-600">
                we may disclose your information if required by law or in response to valid requests
                by public authorities (e.g., court orders, subpoenas, or government investigations).
              </p>

              <h3 className="mb-3 mt-6 text-xl font-semibold lowercase text-stone-900">
                4.3 business transfers
              </h3>
              <p className="leading-relaxed text-stone-600">
                if riqle is involved in a merger, acquisition, or sale of assets, your information
                may be transferred as part of that transaction. we will notify you of any such
                change and how it affects your data.
              </p>

              <h3 className="mb-3 mt-6 text-xl font-semibold lowercase text-stone-900">
                4.4 with your consent
              </h3>
              <p className="leading-relaxed text-stone-600">
                we may share your information for any other purpose with your explicit consent.
              </p>
            </section>

            {/* Data Security */}
            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-bold lowercase text-stone-900">5. data security</h2>
              <p className="leading-relaxed text-stone-600">
                we implement appropriate technical and organizational security measures to protect
                your personal information from unauthorized access, disclosure, alteration, or
                destruction. however, no internet transmission is completely secure, and we cannot
                guarantee absolute security. you are responsible for maintaining the confidentiality
                of your account credentials.
              </p>
            </section>

            {/* Data Retention */}
            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-bold lowercase text-stone-900">
                6. data retention
              </h2>
              <p className="leading-relaxed text-stone-600">
                we retain your personal information for as long as necessary to fulfill the purposes
                outlined in this privacy policy, unless a longer retention period is required by
                law. when we no longer need your information, we will securely delete or anonymize
                it.
              </p>
            </section>

            {/* Your Rights */}
            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-bold lowercase text-stone-900">
                7. your privacy rights
              </h2>
              <p className="mb-4 leading-relaxed text-stone-600">
                depending on your location, you may have the following rights regarding your
                personal information:
              </p>
              <ul className="ml-6 list-disc space-y-2 text-stone-600">
                <li>
                  <strong>access:</strong> request a copy of the personal information we hold about
                  you
                </li>
                <li>
                  <strong>correction:</strong> request correction of inaccurate or incomplete
                  information
                </li>
                <li>
                  <strong>deletion:</strong> request deletion of your personal information
                </li>
                <li>
                  <strong>objection:</strong> object to processing of your information for certain
                  purposes
                </li>
                <li>
                  <strong>restriction:</strong> request restriction of processing under certain
                  circumstances
                </li>
                <li>
                  <strong>portability:</strong> request transfer of your information to another
                  service
                </li>
                <li>
                  <strong>withdraw consent:</strong> withdraw previously given consent at any time
                </li>
              </ul>
              <p className="mt-4 leading-relaxed text-stone-600">
                to exercise these rights, please contact us at{' '}
                <a
                  href="mailto:nathanael.thie@gmail.com"
                  className="font-medium text-cyan-600 transition-colors hover:text-cyan-700"
                >
                  nathanael.thie@gmail.com
                </a>
              </p>
            </section>

            {/* Third-Party Links */}
            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-bold lowercase text-stone-900">
                8. third-party links
              </h2>
              <p className="leading-relaxed text-stone-600">
                our website may contain links to third-party websites or services that are not
                operated by us. we have no control over and assume no responsibility for the
                content, privacy policies, or practices of any third-party sites. we encourage you
                to review the privacy policy of every site you visit.
              </p>
            </section>

            {/* Children's Privacy */}
            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-bold lowercase text-stone-900">
                9. children&apos;s privacy
              </h2>
              <p className="leading-relaxed text-stone-600">
                our services are not intended for individuals under the age of 18. we do not
                knowingly collect personal information from children. if you believe we have
                collected information from a child, please contact us immediately so we can delete
                it.
              </p>
            </section>

            {/* International Data Transfers */}
            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-bold lowercase text-stone-900">
                10. international data transfers
              </h2>
              <p className="leading-relaxed text-stone-600">
                your information may be transferred to and processed in countries other than your
                country of residence. these countries may have data protection laws different from
                those in your jurisdiction. by using our services, you consent to such transfers. we
                take appropriate safeguards to ensure your data remains protected.
              </p>
            </section>

            {/* California Privacy Rights */}
            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-bold lowercase text-stone-900">
                11. california privacy rights (CCPA)
              </h2>
              <p className="mb-4 leading-relaxed text-stone-600">
                if you are a California resident, you have additional rights under the California
                Consumer Privacy Act (CCPA):
              </p>
              <ul className="ml-6 list-disc space-y-2 text-stone-600">
                <li>right to know what personal information is collected</li>
                <li>right to know if personal information is sold or disclosed</li>
                <li>right to opt-out of the sale of personal information</li>
                <li>right to deletion of personal information</li>
                <li>right to non-discrimination for exercising your rights</li>
              </ul>
              <p className="mt-4 leading-relaxed text-stone-600">
                note: we do not sell your personal information to third parties.
              </p>
            </section>

            {/* GDPR Compliance */}
            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-bold lowercase text-stone-900">
                12. GDPR compliance (EU/EEA residents)
              </h2>
              <p className="mb-4 leading-relaxed text-stone-600">
                if you are located in the European Union or European Economic Area, you have rights
                under the General Data Protection Regulation (GDPR):
              </p>
              <ul className="ml-6 list-disc space-y-2 text-stone-600">
                <li>lawful basis for processing (consent, contract, legitimate interest)</li>
                <li>right to access, rectification, erasure, and restriction</li>
                <li>right to data portability</li>
                <li>right to object to processing</li>
                <li>right to lodge a complaint with a supervisory authority</li>
              </ul>
            </section>

            {/* Changes to Privacy Policy */}
            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-bold lowercase text-stone-900">
                13. changes to this privacy policy
              </h2>
              <p className="leading-relaxed text-stone-600">
                we may update this privacy policy from time to time. we will notify you of any
                material changes by posting the new policy on this page and updating the &quot;last
                updated&quot; date. we encourage you to review this policy periodically. your
                continued use of our services after changes constitutes acceptance of the updated
                policy.
              </p>
            </section>

            {/* Contact Information */}
            <section className="mb-0">
              <h2 className="mb-4 text-2xl font-bold lowercase text-stone-900">14. contact us</h2>
              <p className="leading-relaxed text-stone-600">
                if you have any questions, concerns, or requests regarding this privacy policy or
                our data practices, please contact us at:
              </p>
              <div className="mt-4 rounded-lg border border-stone-200 bg-stone-50 p-4">
                <p className="text-stone-700">
                  <strong>email:</strong>{' '}
                  <a
                    href="mailto:nathanael.thie@gmail.com"
                    className="font-medium text-cyan-600 transition-colors hover:text-cyan-700"
                  >
                    nathanael.thie@gmail.com
                  </a>
                </p>
                <p className="mt-2 text-stone-700">
                  <strong>website:</strong>{' '}
                  <a
                    href="https://riqle.com.au"
                    className="font-medium text-cyan-600 transition-colors hover:text-cyan-700"
                  >
                    riqle.com.au
                  </a>
                </p>
              </div>
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
