/**
 * Changelog Page - Version History
 *
 * Tracks all major updates and features added to riqle.com
 *
 * TO ADD A NEW VERSION:
 * 1. Add a new entry to the `versions` array below (add it at the TOP of the array)
 * 2. Update the version number (e.g., '1.2', '1.3', '2.0')
 * 3. Set the date in YYYY-MM-DD format
 * 4. Add a descriptive title
 * 5. List all changes with appropriate categories:
 *    - 'feature': New functionality
 *    - 'improvement': Enhancements to existing features
 *    - 'fix': Bug fixes
 *    - 'content': New content added (resources, articles, etc.)
 */

import { type Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Changelog | Riqle',
  description:
    'Version history and updates for riqle.com - tracking new features, improvements, and changes.',
  alternates: {
    canonical: 'https://riqle.com/changelog',
  },
};

type Version = {
  version: string;
  date: string;
  title: string;
  changes: {
    category: 'feature' | 'improvement' | 'fix' | 'content';
    description: string;
  }[];
};

const versions: Version[] = [
  {
    version: '1.2',
    date: '2026-01-31',
    title: 'Analytics & User Tracking',
    changes: [
      {
        category: 'feature',
        description:
          'Added comprehensive analytics dashboard at /admin/analytics with real database-driven user signup stats',
      },
      {
        category: 'feature',
        description:
          'Implemented event tracking system - now tracking resource views, checkout events, and user interactions',
      },
      {
        category: 'feature',
        description:
          'Created view-signups.ts CLI script for quick user signup reporting (totals, trends, verification rates)',
      },
      {
        category: 'feature',
        description:
          'Added AnalyticsEvent database model for server-side event tracking with metadata support',
      },
      {
        category: 'improvement',
        description:
          'Admin dashboard now shows live signup metrics: total users, 7-day signups, verification rate, paying customers',
      },
      {
        category: 'improvement',
        description: 'Automatic resource view tracking on every resource page visit',
      },
      {
        category: 'improvement',
        description: 'Added KRAMIG favicon troubleshooting guide for browser cache issues',
      },
    ],
  },
  {
    version: '1.1',
    date: '2026-01-31',
    title: 'Extension 1 Resources & System Improvements',
    changes: [
      {
        category: 'content',
        description:
          'Added "The Translator\'s Paradox" - 18-page annotated exemplar discursive for HSC Extension 1 Literary Worlds',
      },
      {
        category: 'feature',
        description:
          'Implemented hierarchical resources system with category browsing (HSC → Year 12 → English Extension 1)',
      },
      {
        category: 'feature',
        description:
          'Added dynamic PDF page count system - preview text now shows accurate page counts per resource',
      },
      {
        category: 'improvement',
        description:
          'Updated homepage copy to highlight site functionality (auth, ecommerce, content delivery)',
      },
      {
        category: 'improvement',
        description: 'Enhanced homepage to funnel users into resources section',
      },
      {
        category: 'improvement',
        description: 'Standardised Australian English across the site (favourite, colour, etc.)',
      },
    ],
  },
  {
    version: '1.0',
    date: '2026-01-30',
    title: 'Launch',
    changes: [
      {
        category: 'feature',
        description: 'Launched riqle.com - personal website with full authentication and ecommerce',
      },
      {
        category: 'feature',
        description: 'Resources marketplace with Stripe payment integration',
      },
      {
        category: 'feature',
        description: 'PDF preview and secure download system with watermarking',
      },
      {
        category: 'content',
        description: 'Published "Annotated 1984 Essay" - 11-page exemplar for HSC Common Module',
      },
      {
        category: 'feature',
        description: 'Work/projects showcase section',
      },
      {
        category: 'feature',
        description: 'About page with trajectory timeline',
      },
    ],
  },
];

const categoryColors = {
  feature: 'bg-blue-100 text-blue-800 border-blue-300',
  improvement: 'bg-green-100 text-green-800 border-green-300',
  fix: 'bg-red-100 text-red-800 border-red-300',
  content: 'bg-purple-100 text-purple-800 border-purple-300',
};

const categoryLabels = {
  feature: 'new',
  improvement: 'improved',
  fix: 'fixed',
  content: 'content',
};

export default function ChangelogPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-stone-50">
      <div className="mx-auto max-w-4xl px-6 py-24 md:px-8 md:py-32">
        {/* Header */}
        <header className="mb-20">
          <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-stone-500">
            version history
          </p>
          <h1 className="mb-6 text-[clamp(2.5rem,6vw,4rem)] font-bold leading-[1.05] tracking-tight text-stone-900">
            changelog
          </h1>
          <p className="max-w-2xl text-xl leading-relaxed text-stone-600">
            tracking updates, new features, and improvements to riqle.com
          </p>
        </header>

        {/* Versions */}
        <div className="space-y-16">
          {versions.map((version, index) => (
            <article key={version.version} className="border-l-2 border-stone-900 pl-8">
              {/* Version Header */}
              <div className="mb-6">
                <div className="mb-2 flex items-baseline gap-3">
                  <h2 className="text-3xl font-bold tracking-tight text-stone-900">
                    v{version.version}
                  </h2>
                  {index === 0 && (
                    <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-blue-800">
                      latest
                    </span>
                  )}
                </div>
                <p className="mb-2 text-sm font-medium text-stone-500">
                  {new Date(version.date).toLocaleDateString('en-AU', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
                <h3 className="text-xl font-semibold text-stone-900">{version.title}</h3>
              </div>

              {/* Changes List */}
              <ul className="space-y-3">
                {version.changes.map((change, changeIndex) => (
                  <li key={changeIndex} className="flex items-start gap-3">
                    <span
                      className={`mt-0.5 flex-shrink-0 rounded-full border px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider ${categoryColors[change.category]}`}
                    >
                      {categoryLabels[change.category]}
                    </span>
                    <p className="flex-1 leading-relaxed text-stone-700">{change.description}</p>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        {/* Footer Note */}
        <div className="mt-20 border-t border-stone-200 pt-12">
          <p className="text-sm text-stone-500">
            this changelog tracks significant updates. minor tweaks and bug fixes may not be listed.
            <br />
            questions or suggestions?{' '}
            <Link
              href="/about"
              className="font-medium text-stone-900 underline decoration-stone-300 transition-colors hover:text-blue-600 hover:decoration-blue-300"
            >
              get in touch
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
