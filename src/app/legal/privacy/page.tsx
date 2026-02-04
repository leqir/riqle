import Link from 'next/link';

export const metadata = {
  title: 'Privacy Policy - riqle',
  description: 'Privacy policy governing data collection, processing, and protection practices',
};

const LAST_UPDATED = 'February 4, 2026';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-4xl px-6 py-16 md:px-8 md:py-24">
        {/* Header */}
        <header className="mb-16 border-b border-stone-300 pb-8">
          <p className="mb-3 text-xs font-medium uppercase tracking-widest text-stone-600">
            legal document
          </p>
          <h1 className="mb-4 text-4xl font-bold text-stone-900">Privacy Policy</h1>
          <p className="text-sm text-stone-600">
            Effective Date: <time dateTime="2026-02-04">{LAST_UPDATED}</time>
          </p>
        </header>

        <div className="space-y-12 text-stone-900">
          {/* Introduction */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-stone-900">1. Introduction and Scope</h2>
            <p className="mb-4 leading-relaxed text-stone-700">
              This Privacy Policy ("Policy") governs the collection, use, storage, and disclosure
              of personal information by the operator of riqle.com.au ("Platform," "we," "us," or
              "our"). This Policy applies to all users ("User," "you," or "your") who access or use
              the Platform and its services.
            </p>
            <p className="leading-relaxed text-stone-700">
              By accessing or using the Platform, you acknowledge that you have read, understood,
              and consent to the data practices described in this Policy. If you do not agree with
              this Policy, you must immediately cease all use of the Platform.
            </p>
          </section>

          {/* Information We Collect */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-stone-900">
              2. Personal Information Collection
            </h2>
            <p className="mb-4 leading-relaxed text-stone-700">
              We collect and process the following categories of personal information in accordance
              with applicable data protection laws, including the Australian Privacy Principles
              (APPs) under the Privacy Act 1988 (Cth).
            </p>

            <p className="mb-4 font-semibold text-stone-900">2.1 Information You Provide Directly</p>
            <p className="mb-4 leading-relaxed text-stone-700">
              <strong>Email Address:</strong> Collected during account registration and required for
              authentication, order fulfillment, product delivery, and essential communications.
              This constitutes personal information as defined under the Privacy Act 1988 (Cth).
            </p>

            <p className="mb-4 font-semibold text-stone-900">2.2 Information Collected Automatically</p>
            <ul className="mb-4 ml-6 list-disc space-y-2 text-stone-700">
              <li>
                <strong>Technical Information:</strong> IP addresses, browser type, device
                identifiers, operating system, and access timestamps, collected for security
                monitoring, fraud prevention, and system administration purposes
              </li>
              <li>
                <strong>Usage Data:</strong> Page views, session duration, and interaction patterns,
                collected for analytics and service improvement
              </li>
              <li>
                <strong>Transaction Data:</strong> Purchase history, order identifiers, and payment
                metadata (excluding payment card information), collected for order processing and
                record-keeping
              </li>
            </ul>

            <p className="mb-4 font-semibold text-stone-900">2.3 Information We Do Not Collect</p>
            <p className="leading-relaxed text-stone-700">
              In adherence to data minimization principles, we explicitly do not collect: full
              names, postal addresses, telephone numbers, date of birth, gender, demographic
              information, biometric data, precise geolocation data, social media profiles, or
              browsing history outside the Platform.
            </p>
          </section>

          {/* Payment Information */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-stone-900">
              3. Payment Information and Third-Party Processing
            </h2>
            <p className="mb-4 leading-relaxed text-stone-700">
              Payment processing services are provided by Stripe, Inc. ("Stripe"), a third-party
              payment processor maintaining PCI DSS Level 1 certification. The Platform does not
              collect, store, process, or have access to payment card information, including card
              numbers, CVV codes, or expiration dates.
            </p>
            <p className="mb-4 leading-relaxed text-stone-700">
              We store only: (a) the Stripe customer identifier for refund processing purposes; and
              (b) transaction metadata including purchase amount, currency, and timestamp. All
              payment card data is subject to Stripe's Privacy Policy, available at
              stripe.com/privacy.
            </p>
            <p className="leading-relaxed text-stone-700">
              By making a purchase, you consent to the transfer of your payment information to
              Stripe in accordance with Stripe's terms of service and privacy practices.
            </p>
          </section>

          {/* Purpose and Legal Basis */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-stone-900">
              4. Purpose of Processing and Legal Basis
            </h2>
            <p className="mb-4 leading-relaxed text-stone-700">
              We process personal information for the following purposes, each with a corresponding
              legal basis under applicable privacy legislation:
            </p>

            <p className="mb-4 font-semibold text-stone-900">4.1 Contractual Necessity</p>
            <ul className="mb-4 ml-6 list-disc space-y-2 text-stone-700">
              <li>Account authentication and identity verification</li>
              <li>Order processing and transaction fulfillment</li>
              <li>Digital product delivery and access provisioning</li>
              <li>Customer support and technical assistance</li>
              <li>Refund processing and financial reconciliation</li>
            </ul>

            <p className="mb-4 font-semibold text-stone-900">4.2 Legitimate Interests</p>
            <ul className="mb-4 ml-6 list-disc space-y-2 text-stone-700">
              <li>Fraud detection and prevention</li>
              <li>Security monitoring and incident response</li>
              <li>System administration and performance optimization</li>
              <li>Analytics and service improvement</li>
            </ul>

            <p className="mb-4 font-semibold text-stone-900">4.3 Legal Obligations</p>
            <ul className="mb-4 ml-6 list-disc space-y-2 text-stone-700">
              <li>Tax record retention (7 years as required under Australian tax law)</li>
              <li>Financial transaction records for audit purposes</li>
              <li>Compliance with lawful requests from government authorities</li>
            </ul>

            <p className="mb-4 font-semibold text-stone-900">4.4 Prohibited Uses</p>
            <p className="leading-relaxed text-stone-700">
              We do not and will not: (a) sell, rent, or trade personal information to third
              parties; (b) use personal information for direct marketing purposes without explicit
              opt-in consent; (c) process personal information for purposes incompatible with those
              disclosed herein; or (d) use personal information to train artificial intelligence or
              machine learning systems.
            </p>
          </section>

          {/* Third-Party Disclosure */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-stone-900">
              5. Third-Party Service Providers and Data Sharing
            </h2>
            <p className="mb-4 leading-relaxed text-stone-700">
              We engage the following third-party service providers, each processing personal
              information as a data processor under written agreements containing appropriate data
              protection obligations:
            </p>

            <p className="mb-4 font-semibold text-stone-900">5.1 Payment Processing</p>
            <p className="mb-4 leading-relaxed text-stone-700">
              <strong>Provider:</strong> Stripe, Inc.
              <br />
              <strong>Data Shared:</strong> Email address, transaction amount, currency
              <br />
              <strong>Purpose:</strong> Payment processing and fraud prevention
              <br />
              <strong>Privacy Policy:</strong> stripe.com/privacy
            </p>

            <p className="mb-4 font-semibold text-stone-900">5.2 Email Delivery Infrastructure</p>
            <p className="mb-4 leading-relaxed text-stone-700">
              <strong>Provider:</strong> Resend, Inc.
              <br />
              <strong>Data Shared:</strong> Email address, message content
              <br />
              <strong>Purpose:</strong> Transactional email delivery (order confirmations, product
              access links)
              <br />
              <strong>Privacy Policy:</strong> resend.com/legal/privacy-policy
            </p>

            <p className="mb-4 font-semibold text-stone-900">5.3 Error Monitoring and Diagnostics</p>
            <p className="mb-4 leading-relaxed text-stone-700">
              <strong>Provider:</strong> Sentry, Inc.
              <br />
              <strong>Data Shared:</strong> Error logs, stack traces (with personally identifiable
              information redacted)
              <br />
              <strong>Purpose:</strong> Application stability monitoring and bug resolution
              <br />
              <strong>Privacy Policy:</strong> sentry.io/privacy/
            </p>

            <p className="mb-4 font-semibold text-stone-900">5.4 Cross-Border Data Transfers</p>
            <p className="leading-relaxed text-stone-700">
              The above service providers may process data in jurisdictions outside Australia,
              including the United States and European Economic Area. Such transfers are conducted
              in compliance with Chapter 8 of the Privacy Act 1988 (Cth) and, where applicable,
              Standard Contractual Clauses approved by the European Commission.
            </p>
          </section>

          {/* Data Retention */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-stone-900">6. Data Retention Periods</h2>
            <p className="mb-4 leading-relaxed text-stone-700">
              Personal information is retained only for as long as necessary to fulfill the purposes
              for which it was collected, subject to the following retention schedules:
            </p>

            <div className="mb-4 overflow-hidden border border-stone-300">
              <table className="w-full">
                <thead className="border-b border-stone-300 bg-stone-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-bold text-stone-900">
                      Data Category
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-bold text-stone-900">
                      Retention Period
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-bold text-stone-900">
                      Legal Basis
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200">
                  <tr>
                    <td className="px-4 py-3 text-sm text-stone-900">User Account Data</td>
                    <td className="px-4 py-3 text-sm text-stone-700">
                      Until account deletion request
                    </td>
                    <td className="px-4 py-3 text-sm text-stone-700">Contractual necessity</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm text-stone-900">
                      Transaction and Order Records
                    </td>
                    <td className="px-4 py-3 text-sm text-stone-700">7 years</td>
                    <td className="px-4 py-3 text-sm text-stone-700">
                      Tax and accounting obligations
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm text-stone-900">IP Address Logs</td>
                    <td className="px-4 py-3 text-sm text-stone-700">30 days (maximum)</td>
                    <td className="px-4 py-3 text-sm text-stone-700">
                      Security and fraud prevention
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm text-stone-900">Error Logs and Diagnostics</td>
                    <td className="px-4 py-3 text-sm text-stone-700">90 days</td>
                    <td className="px-4 py-3 text-sm text-stone-700">System maintenance</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm text-stone-900">Email Delivery Logs</td>
                    <td className="px-4 py-3 text-sm text-stone-700">90 days</td>
                    <td className="px-4 py-3 text-sm text-stone-700">
                      Deliverability monitoring
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="leading-relaxed text-stone-700">
              Upon expiration of the applicable retention period, personal information is securely
              deleted or anonymized in accordance with industry best practices.
            </p>
          </section>

          {/* Data Subject Rights */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-stone-900">7. Your Privacy Rights</h2>
            <p className="mb-4 leading-relaxed text-stone-700">
              Under the Australian Privacy Principles and, where applicable, the General Data
              Protection Regulation (GDPR) and California Consumer Privacy Act (CCPA), you possess
              the following rights regarding your personal information:
            </p>

            <p className="mb-4 font-semibold text-stone-900">7.1 Right of Access (APP 12, GDPR Art. 15)</p>
            <p className="mb-4 leading-relaxed text-stone-700">
              You may request a copy of all personal information we hold about you, provided in a
              structured, commonly used, and machine-readable format (JSON).
            </p>

            <p className="mb-4 font-semibold text-stone-900">7.2 Right to Rectification (APP 13, GDPR Art. 16)</p>
            <p className="mb-4 leading-relaxed text-stone-700">
              You may request correction of inaccurate or incomplete personal information. Email
              address updates must be verified through a confirmation process to prevent
              unauthorized access.
            </p>

            <p className="mb-4 font-semibold text-stone-900">7.3 Right to Erasure (APP 12.3, GDPR Art. 17)</p>
            <p className="mb-4 leading-relaxed text-stone-700">
              You may request deletion of your personal information, subject to legal retention
              obligations (e.g., 7-year retention of financial records under Australian tax law).
              Account deletion requests will be processed within 30 days.
            </p>

            <p className="mb-4 font-semibold text-stone-900">7.4 Right to Data Portability (GDPR Art. 20)</p>
            <p className="mb-4 leading-relaxed text-stone-700">
              You may request export of your personal information in JSON format for transfer to
              another service provider.
            </p>

            <p className="mb-4 font-semibold text-stone-900">7.5 Right to Object (GDPR Art. 21)</p>
            <p className="mb-4 leading-relaxed text-stone-700">
              You may object to processing of personal information based on legitimate interests.
              Such requests will be assessed on a case-by-case basis.
            </p>

            <p className="mb-4 font-semibold text-stone-900">7.6 Right to Lodge a Complaint</p>
            <p className="mb-4 leading-relaxed text-stone-700">
              You have the right to lodge a complaint with the Office of the Australian Information
              Commissioner (OAIC) at oaic.gov.au or, if you are located in the European Economic
              Area, with your local data protection authority.
            </p>

            <p className="mb-4 font-semibold text-stone-900">7.7 Exercising Your Rights</p>
            <p className="leading-relaxed text-stone-700">
              To exercise any of the above rights, submit a written request to
              nathanael.thie@gmail.com. We will respond within thirty (30) days of receipt. Identity
              verification may be required to prevent unauthorized disclosure of personal
              information.
            </p>
          </section>

          {/* Security Measures */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-stone-900">8. Data Security Measures</h2>
            <p className="mb-4 leading-relaxed text-stone-700">
              We implement appropriate technical and organizational measures to protect personal
              information against unauthorized access, alteration, disclosure, or destruction, in
              accordance with APP 11 and industry standards.
            </p>

            <p className="mb-4 font-semibold text-stone-900">8.1 Technical Safeguards</p>
            <ul className="mb-4 ml-6 list-disc space-y-2 text-stone-700">
              <li>
                Transport Layer Security (TLS 1.3) encryption for all data in transit
              </li>
              <li>AES-256 encryption for data at rest in production databases</li>
              <li>Secure token-based authentication system (no password storage)</li>
              <li>Automated IP address deletion after 30-day retention period</li>
              <li>Rate limiting and DDoS protection at the infrastructure layer</li>
            </ul>

            <p className="mb-4 font-semibold text-stone-900">8.2 Organizational Safeguards</p>
            <ul className="mb-4 ml-6 list-disc space-y-2 text-stone-700">
              <li>Access controls limiting personnel access to personal information</li>
              <li>Data processing agreements with all third-party service providers</li>
              <li>Regular security audits and vulnerability assessments</li>
              <li>Incident response procedures for data breach notification</li>
            </ul>

            <p className="mb-4 font-semibold text-stone-900">8.3 Data Breach Notification</p>
            <p className="leading-relaxed text-stone-700">
              In the event of a data breach likely to result in serious harm to affected
              individuals, we will notify affected users and the Office of the Australian
              Information Commissioner within seventy-two (72) hours of becoming aware of the
              breach, in accordance with the Notifiable Data Breaches (NDB) scheme under Part IIIC
              of the Privacy Act 1988 (Cth).
            </p>
          </section>

          {/* Children's Privacy */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-stone-900">9. Children's Privacy</h2>
            <p className="leading-relaxed text-stone-700">
              The Platform is not directed to individuals under the age of eighteen (18) years. We
              do not knowingly collect personal information from minors. If we become aware that
              personal information has been collected from an individual under 18 without verifiable
              parental consent, we will take steps to delete such information within a reasonable
              timeframe.
            </p>
          </section>

          {/* Cookies and Tracking */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-stone-900">
              10. Cookies and Tracking Technologies
            </h2>
            <p className="mb-4 leading-relaxed text-stone-700">
              The Platform uses strictly necessary cookies for authentication and session management
              only. We do not employ advertising cookies, tracking pixels, or cross-site tracking
              technologies.
            </p>
            <p className="leading-relaxed text-stone-700">
              Session cookies are automatically deleted upon browser closure or session expiration
              (24 hours). You may disable cookies through your browser settings; however, this may
              impair Platform functionality, including the inability to authenticate or access
              purchased products.
            </p>
          </section>

          {/* Policy Updates */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-stone-900">11. Policy Modifications</h2>
            <p className="mb-4 leading-relaxed text-stone-700">
              We reserve the right to modify this Policy at any time to reflect changes in legal
              requirements, business practices, or data processing activities. Material changes will
              be effective immediately upon posting to the Platform.
            </p>
            <p className="leading-relaxed text-stone-700">
              Continued use of the Platform following any modifications constitutes acceptance of
              the revised Policy. Users are encouraged to review this Policy periodically.
            </p>
          </section>

          {/* Contact Information */}
          <section className="border-t border-stone-300 pt-12">
            <h2 className="mb-4 text-2xl font-bold text-stone-900">12. Contact Information</h2>
            <p className="mb-4 leading-relaxed text-stone-700">
              For inquiries regarding this Privacy Policy, to exercise data subject rights, or to
              report privacy concerns, please contact:
            </p>
            <p className="mb-2 leading-relaxed text-stone-900">
              Email: <a href="mailto:nathanael.thie@gmail.com" className="underline">nathanael.thie@gmail.com</a>
            </p>
            <p className="mb-4 leading-relaxed text-stone-700">
              Expected response time: Within seven (7) calendar days
            </p>
            <p className="leading-relaxed text-stone-700">
              For complaints regarding privacy practices, you may also contact the Office of the
              Australian Information Commissioner:
              <br />
              Website: <a href="https://www.oaic.gov.au" target="_blank" rel="noopener noreferrer" className="underline">oaic.gov.au</a>
              <br />
              Phone: 1300 363 992
            </p>
          </section>

          {/* Footer Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 border-t border-stone-200 pt-8 text-sm text-stone-600">
            <Link href="/legal/terms" className="hover:underline">
              Terms of Service
            </Link>
            <span>•</span>
            <Link href="/legal/contact" className="hover:underline">
              Contact
            </Link>
            <span>•</span>
            <span>Last Updated: {LAST_UPDATED}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
