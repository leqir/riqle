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
              {/* Hero heading */}
              <h1 className="mb-8 text-[clamp(2.5rem,6vw,4.5rem)] font-bold leading-[1.05] tracking-tight text-stone-900">
                hi, i&apos;m nathanael.
              </h1>

              {/* Body content */}
              <div className="mb-10 space-y-4 text-[1.125rem] leading-relaxed text-stone-600">
                <p>
                  i dropped out of compsci at unsw, co-founded markpoint, and now i&apos;m studying
                  exercise science.
                </p>
                <p>still figuring it out. building things along the way.</p>
              </div>

              {/* Links */}
              <div className="flex flex-wrap gap-6 text-[1rem] text-stone-500">
                <Link
                  href="/work/markpoint"
                  className="inline-flex items-center gap-1 transition-colors hover:text-stone-900"
                >
                  markpoint
                  <span aria-hidden="true">→</span>
                </Link>
                <Link
                  href="/resources"
                  className="inline-flex items-center gap-1 transition-colors hover:text-stone-900"
                >
                  resources
                  <span aria-hidden="true">→</span>
                </Link>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-1 transition-colors hover:text-stone-900"
                >
                  about
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
