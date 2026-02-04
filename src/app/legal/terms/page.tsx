import Link from 'next/link';

export const metadata = {
  title: 'Terms of Service - riqle',
  description: 'Terms of service governing the use of riqle platform and the purchase of digital products',
};

const LAST_UPDATED = 'February 4, 2026';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-4xl px-6 py-16 md:px-8 md:py-24">
        {/* Header */}
        <header className="mb-16 border-b border-stone-300 pb-8">
          <p className="mb-3 text-xs font-medium uppercase tracking-widest text-stone-600">
            legal document
          </p>
          <h1 className="mb-4 text-4xl font-bold text-stone-900">Terms of Service</h1>
          <p className="text-sm text-stone-600">
            Effective Date: <time dateTime="2026-02-04">{LAST_UPDATED}</time>
          </p>
        </header>

        <div className="space-y-12 text-stone-900">
          {/* Agreement to Terms */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-stone-900">1. Acceptance of Terms</h2>
            <p className="mb-4 leading-relaxed text-stone-700">
              These Terms of Service ("Terms") constitute a legally binding agreement between you
              (the "User," "you," or "your") and the operator of riqle.com.au ("Platform," "we,"
              "us," or "our"). By accessing, browsing, or utilizing any services provided through
              this Platform, you acknowledge that you have read, understood, and agree to be bound
              by these Terms in their entirety.
            </p>
            <p className="leading-relaxed text-stone-700">
              If you do not accept these Terms, you must immediately cease all use of the Platform
              and its services. Continued use following any modifications to these Terms
              constitutes acceptance of such modifications.
            </p>
          </section>

          {/* Services Provided */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-stone-900">2. Services and Products</h2>
            <p className="mb-4 leading-relaxed text-stone-700">
              The Platform provides digital educational products ("Products") including, but not
              limited to, electronic documents, video content, templates, and other educational
              materials in digital format. All Products are provided on an "as-is" basis for
              educational and informational purposes only.
            </p>
            <p className="mb-4 font-semibold text-stone-900">2.1 Nature of Products</p>
            <ul className="mb-4 ml-6 list-disc space-y-2 text-stone-700">
              <li>Products are delivered in digital format only; no physical goods are provided</li>
              <li>
                Lifetime access is granted to purchased Products, subject to these Terms and
                applicable law
              </li>
              <li>
                Product updates and modifications are provided at the sole discretion of the
                operator
              </li>
              <li>
                Technical support is provided on a reasonable efforts basis with no guaranteed
                response timeframes
              </li>
            </ul>
            <p className="mb-4 font-semibold text-stone-900">2.2 Exclusions</p>
            <p className="leading-relaxed text-stone-700">
              The Products do not constitute professional advice of any kind, including but not
              limited to legal, financial, medical, or therapeutic advice. Users are solely
              responsible for their use and application of Product content.
            </p>
          </section>

          {/* Pricing and Payment */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-stone-900">
              3. Pricing, Payment, and Third-Party Services
            </h2>
            <p className="mb-4 font-semibold text-stone-900">3.1 Pricing</p>
            <p className="mb-4 leading-relaxed text-stone-700">
              All prices are denominated in Australian Dollars (AUD) unless otherwise specified.
              Pricing is subject to change without prior notice. Price modifications do not affect
              previously completed transactions.
            </p>
            <p className="mb-4 font-semibold text-stone-900">3.2 Payment Processing</p>
            <p className="mb-4 leading-relaxed text-stone-700">
              Payment processing services are provided by Stripe, Inc. ("Stripe"), a third-party
              payment processor. By making a purchase, you agree to Stripe's Terms of Service and
              Privacy Policy. The Platform does not collect, store, or process payment card
              information. Stripe maintains PCI DSS Level 1 certification for secure payment
              handling.
            </p>
            <p className="leading-relaxed text-stone-700">
              All payment transactions are final upon completion, subject only to the refund policy
              set forth in Section 4 below.
            </p>
          </section>

          {/* Refund Policy */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-stone-900">4. Refund Policy</h2>
            <p className="mb-4 font-semibold text-stone-900">4.1 Eligibility Period</p>
            <p className="mb-4 leading-relaxed text-stone-700">
              Users may request a full refund within thirty (30) calendar days of the purchase date
              ("Refund Period"). Refund requests must be submitted in writing to
              nathanael.thie@gmail.com and must include the order reference number.
            </p>
            <p className="mb-4 font-semibold text-stone-900">4.2 Refund Conditions</p>
            <p className="mb-4 leading-relaxed text-stone-700">
              Refunds are granted at the sole discretion of the operator. The following conditions
              may disqualify a refund request:
            </p>
            <ul className="mb-4 ml-6 list-disc space-y-2 text-stone-700">
              <li>Complete download or consumption of the Product content</li>
              <li>Expiration of the Refund Period</li>
              <li>
                Pattern of excessive refund requests indicating abuse of the refund policy
              </li>
              <li>Violation of these Terms or applicable law</li>
            </ul>
            <p className="mb-4 font-semibold text-stone-900">4.3 Processing Time</p>
            <p className="leading-relaxed text-stone-700">
              Approved refunds will be processed within five to seven (5-7) business days and
              credited to the original payment method used for the transaction.
            </p>
          </section>

          {/* License and Usage Rights */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-stone-900">
              5. License Grant and Usage Restrictions
            </h2>
            <p className="mb-4 font-semibold text-stone-900">5.1 Personal License Grant</p>
            <p className="mb-4 leading-relaxed text-stone-700">
              Subject to your compliance with these Terms, we grant you a limited, non-exclusive,
              non-transferable, revocable license to download, access, and use the Products solely
              for your personal, non-commercial use.
            </p>
            <p className="mb-4 font-semibold text-stone-900">5.2 Prohibited Uses</p>
            <p className="mb-4 leading-relaxed text-stone-700">
              You expressly agree not to:
            </p>
            <ul className="mb-4 ml-6 list-disc space-y-2 text-stone-700">
              <li>
                Share, distribute, sublicense, or transfer Products to any third party, whether for
                consideration or otherwise
              </li>
              <li>Upload, publish, or make Products available on file-sharing platforms or services</li>
              <li>
                Use Products for commercial training, education, or other commercial purposes
                without express written authorization
              </li>
              <li>Remove, alter, or obscure copyright notices or proprietary markings</li>
              <li>Create derivative works or modifications based on the Products</li>
              <li>Reverse engineer, decompile, or disassemble any Product components</li>
            </ul>
            <p className="mb-4 font-semibold text-stone-900">5.3 Commercial and Team Licenses</p>
            <p className="leading-relaxed text-stone-700">
              For commercial use or multi-user access rights, contact nathanael.thie@gmail.com to
              inquire about commercial licensing arrangements.
            </p>
          </section>

          {/* Intellectual Property */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-stone-900">6. Intellectual Property Rights</h2>
            <p className="mb-4 leading-relaxed text-stone-700">
              All intellectual property rights in and to the Platform and Products, including but
              not limited to copyrights, trademarks, trade secrets, patents, and other proprietary
              rights, are and shall remain the exclusive property of the operator or its licensors.
            </p>
            <p className="leading-relaxed text-stone-700">
              No rights are granted to you other than the limited license explicitly set forth in
              Section 5. All rights not expressly granted herein are reserved.
            </p>
          </section>

          {/* Disclaimers */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-stone-900">
              7. Disclaimers and Limitations of Liability
            </h2>
            <p className="mb-4 font-semibold text-stone-900">7.1 No Warranties</p>
            <p className="mb-4 leading-relaxed text-stone-700">
              THE PLATFORM AND PRODUCTS ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES
              OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED
              WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE,
              NON-INFRINGEMENT, OR ANY WARRANTIES ARISING FROM COURSE OF DEALING OR USAGE OF TRADE.
            </p>
            <p className="mb-4 font-semibold text-stone-900">7.2 Limitation of Liability</p>
            <p className="mb-4 leading-relaxed text-stone-700">
              TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL THE OPERATOR BE
              LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR
              ANY LOSS OF PROFITS, REVENUE, DATA, OR USE, WHETHER IN AN ACTION IN CONTRACT, TORT
              (INCLUDING NEGLIGENCE), OR OTHERWISE, ARISING OUT OF OR RELATED TO YOUR USE OF OR
              INABILITY TO USE THE PLATFORM OR PRODUCTS, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH
              DAMAGES.
            </p>
            <p className="leading-relaxed text-stone-700">
              IN ANY EVENT, THE OPERATOR'S TOTAL LIABILITY SHALL NOT EXCEED THE AMOUNT PAID BY YOU
              FOR THE PRODUCT GIVING RISE TO THE CLAIM.
            </p>
          </section>

          {/* Indemnification */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-stone-900">8. Indemnification</h2>
            <p className="leading-relaxed text-stone-700">
              You agree to indemnify, defend, and hold harmless the operator and its affiliates,
              officers, directors, employees, agents, and licensors from and against any and all
              claims, liabilities, damages, losses, costs, expenses, or fees (including reasonable
              attorneys' fees) arising from: (a) your use of the Platform or Products; (b) your
              violation of these Terms; (c) your violation of any third-party rights, including
              intellectual property rights; or (d) any willful misconduct by you.
            </p>
          </section>

          {/* Termination */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-stone-900">9. Termination</h2>
            <p className="mb-4 leading-relaxed text-stone-700">
              We reserve the right to terminate or suspend your access to the Platform and Products
              immediately, without prior notice or liability, for any reason, including breach of
              these Terms. Upon termination, your right to use the Products ceases immediately, and
              you must destroy all copies of Products in your possession.
            </p>
            <p className="leading-relaxed text-stone-700">
              Sections 6, 7, 8, 10, and 11 shall survive any termination of these Terms.
            </p>
          </section>

          {/* Governing Law */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-stone-900">
              10. Governing Law and Dispute Resolution
            </h2>
            <p className="mb-4 leading-relaxed text-stone-700">
              These Terms shall be governed by and construed in accordance with the laws of New
              South Wales, Australia, without regard to its conflict of law provisions. Any dispute
              arising out of or relating to these Terms or the Platform shall be subject to the
              exclusive jurisdiction of the courts located in Sydney, New South Wales, Australia.
            </p>
          </section>

          {/* General Provisions */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-stone-900">11. General Provisions</h2>
            <p className="mb-4 font-semibold text-stone-900">11.1 Modifications</p>
            <p className="mb-4 leading-relaxed text-stone-700">
              We reserve the right to modify these Terms at any time. Material changes will be
              effective immediately upon posting. Your continued use of the Platform following any
              such modifications constitutes acceptance of the revised Terms.
            </p>
            <p className="mb-4 font-semibold text-stone-900">11.2 Severability</p>
            <p className="mb-4 leading-relaxed text-stone-700">
              If any provision of these Terms is found to be invalid or unenforceable, the
              remaining provisions shall continue in full force and effect.
            </p>
            <p className="mb-4 font-semibold text-stone-900">11.3 Entire Agreement</p>
            <p className="mb-4 leading-relaxed text-stone-700">
              These Terms constitute the entire agreement between you and the operator regarding
              the use of the Platform and supersede all prior agreements and understandings.
            </p>
            <p className="mb-4 font-semibold text-stone-900">11.4 Assignment</p>
            <p className="leading-relaxed text-stone-700">
              You may not assign or transfer these Terms or any rights granted hereunder without
              our prior written consent. We may assign these Terms without restriction.
            </p>
          </section>

          {/* Contact */}
          <section className="border-t border-stone-300 pt-12">
            <h2 className="mb-4 text-2xl font-bold text-stone-900">12. Contact Information</h2>
            <p className="mb-4 leading-relaxed text-stone-700">
              For questions regarding these Terms or to exercise any rights hereunder, please
              contact:
            </p>
            <p className="mb-2 leading-relaxed text-stone-900">
              Email: <a href="mailto:nathanael.thie@gmail.com" className="underline">nathanael.thie@gmail.com</a>
            </p>
            <p className="leading-relaxed text-stone-700">
              Expected response time: Within two (2) business days
            </p>
          </section>

          {/* Footer Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 border-t border-stone-200 pt-8 text-sm text-stone-600">
            <Link href="/legal/privacy" className="hover:underline">
              Privacy Policy
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
