/**
 * Homepage - Stripe-inspired Clean Design
 *
 * Features:
 * - Clean, professional typography
 * - Strategic color accents
 * - Modular atomic design components
 * - No illustrations - pure content focus
 */

import Link from 'next/link';
import type { Metadata } from 'next';

// Static generation with revalidation (24 hours)
export const revalidate = 86400;

// Enhanced metadata for homepage
export const metadata: Metadata = {
  title: 'riqle | nathanael - builder, founder & educator',
  description:
    'my future employers want a personal website here it is. co-founder of MarkPoint, building educational products for HSC students.',
  alternates: {
    canonical: 'https://riqle.com',
  },
  openGraph: {
    title: 'riqle | nathanael - builder, founder & educator',
    description:
      'my future employers want a personal website here it is. co-founder of MarkPoint, building educational products for HSC students.',
    url: 'https://riqle.com',
    type: 'profile',
  },
};

export default function HomePage() {
  // Structured data for search engines (JSON-LD)
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'nathanael',
    alternateName: 'riqle',
    url: 'https://riqle.com',
    image: 'https://riqle.com/og-image.png',
    jobTitle: 'co-founder & builder',
    worksFor: {
      '@type': 'Organization',
      name: 'MarkPoint',
    },
    alumniOf: {
      '@type': 'EducationalOrganization',
      name: 'University of New South Wales',
      sameAs: 'https://www.unsw.edu.au/',
    },
    knowsAbout: [
      'Education',
      'Systems Thinking',
      'HSC Resources',
      'Product Development',
      'Software Development',
    ],
    sameAs: [
      // Add your social media profiles here when available
      // 'https://www.instagram.com/riqle',
      // 'https://www.linkedin.com/in/riqle',
      // 'https://twitter.com/riqle',
    ],
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'riqle',
    alternateName: 'nathanael - riqle',
    url: 'https://riqle.com',
    description:
      'personal website of nathanael (riqle) - builder, founder, and educator. home of markpoint and hsc educational resources.',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://riqle.com/resources/browse?search={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <>
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />

      <div className="min-h-screen bg-gradient-to-b from-white to-stone-50">
        <div className="mx-auto max-w-5xl px-6 py-24 md:px-8 md:py-32">
          {/* Hero Section */}
          <section className="mb-32">
            <div className="max-w-3xl">
              {/* Eyebrow */}
              <p className="mb-6 text-sm font-semibold uppercase tracking-wider text-blue-600">
                WELCOME TO RIQLE.COM
              </p>

              {/* Hero heading */}
              <h1 className="mb-8 text-[clamp(2.5rem,6vw,4.5rem)] font-bold leading-[1.05] tracking-tight text-stone-900">
                hi, i&apos;m nathanael
                <br />
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  or better known as riqle
                </span>
              </h1>

              {/* Body content */}
              <div className="mb-12 space-y-6 text-[1.125rem] leading-relaxed text-stone-700">
                <p>
                  my future employers want a personal website
                  <br />
                  here it is.
                </p>

                <p>
                  i dropped out of computer science at unsw when it became clear it wasn&apos;t the
                  work i wanted to do.
                </p>

                <p>i&apos;m now studying exercise science (physio)</p>

                <p>
                  during my gap term i co-founded{' '}
                  <span className="font-semibold text-stone-900">markpoint</span> with three of my
                  mates. i pulled out of internships to work on it.
                </p>

                <p>
                  this site is where i keep my projects, startups, and work in progress.
                  <br />
                  <span className="text-stone-600">
                    unlike most portfolio sites, this one actually works — full auth, payments,
                    content delivery, the whole thing.
                  </span>
                </p>

                <p>
                  most stuff lives in{' '}
                  <Link
                    href="/resources"
                    className="font-semibold text-blue-600 hover:text-blue-700"
                  >
                    resources
                  </Link>
                  . some free, some paid.
                  <br />
                  <span className="text-stone-600">
                    it&apos;s where i put things people actually use.
                  </span>
                </p>

                <p className="text-stone-500">thanks for stopping by.</p>
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/work/markpoint"
                  className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-base font-semibold text-white shadow-sm transition-all hover:bg-blue-700 hover:shadow-md"
                >
                  MarkPoint
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
                <Link
                  href="/resources"
                  className="inline-flex items-center gap-2 rounded-lg border border-stone-300 bg-white px-6 py-3 text-base font-semibold text-stone-900 shadow-sm transition-all hover:border-stone-400 hover:shadow-md"
                >
                  Resources
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
