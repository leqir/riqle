/**
 * Contact Page
 *
 * Features:
 * - Minimalist Apple HIG typography
 * - Clean, direct communication
 * - Instagram social link
 */

import { type Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'contact | riqle',
  description: 'get in touch via email or instagram.',
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-4xl px-6 py-24 md:px-8 md:py-32">
        {/* Header */}
        <header className="mb-20">
          <p className="mb-3 text-sm font-medium uppercase tracking-wider text-stone-500">
            contact
          </p>
          <h1 className="mb-4 text-[clamp(2.5rem,6vw,4rem)] font-semibold leading-[1.1] tracking-tight text-stone-900">
            get in touch
          </h1>
          <p className="text-xl leading-relaxed text-stone-600">
            open to interesting conversations and collaboration.
          </p>
        </header>

        {/* Contact Methods */}
        <div className="space-y-16">
          {/* Email */}
          <section>
            <p className="mb-4 font-mono text-sm font-medium text-stone-400">01</p>
            <h2 className="mb-3 text-[clamp(1.75rem,4vw,2.5rem)] font-semibold leading-tight tracking-tight text-stone-900">
              email
            </h2>
            <p className="mb-6 text-lg leading-relaxed text-stone-600">
              for enquiries, collaboration, or feedback about resources.
            </p>
            <Link
              href="mailto:nathanael.thie@gmail.com"
              className="inline-block text-lg font-medium text-blue-600 transition-colors hover:text-blue-700"
            >
              nathanael.thie@gmail.com
            </Link>
          </section>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-stone-200 via-stone-300 to-stone-200" />

          {/* Instagram */}
          <section>
            <p className="mb-4 font-mono text-sm font-medium text-stone-400">02</p>
            <h2 className="mb-3 text-[clamp(1.75rem,4vw,2.5rem)] font-semibold leading-tight tracking-tight text-stone-900">
              instagram
            </h2>
            <p className="mb-6 text-lg leading-relaxed text-stone-600">
              thoughts on education, systems, and building things that matter.
            </p>
            <Link
              href="https://instagram.com/riqle"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-lg font-medium text-blue-600 transition-colors hover:text-blue-700"
            >
              @riqle
            </Link>
          </section>
        </div>

        {/* Philosophy Note */}
        <section className="mt-20 border-l-2 border-stone-900 pl-8">
          <div className="space-y-6 text-lg leading-relaxed text-stone-700">
            <p>
              i respond to all genuine messages. if you&apos;re reaching out about resources, expect
              a reply within 24 hours. for everything else, within a few days.
            </p>
            <p>
              if you&apos;re a student who bought a resource and it didn&apos;t help, email me
              directly. no questions asked refunds, and i&apos;d genuinely like to know what
              didn&apos;t work.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
