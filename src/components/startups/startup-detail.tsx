/**
 * StartupDetail Component - Apple-inspired Design
 *
 * Epic 6 - Story 6.4: Individual Startup Page Structure
 * Epic 6 - Story 6.8: Cross-linking with Work & Writing
 *
 * Features:
 * - Clean Apple HIG typography
 * - Six required sections: Overview, Why it exists, Your role, What was built, Outcomes, What you learned
 * - Optional metrics display
 * - Cross-linking to related Work and Writing
 * - Text-first layout (visuals support, don't distract)
 * - Professional record, not sales page
 */

'use client';

import Image from 'next/image';
import { StartupRelatedContent } from './startup-related-content';

type RelatedItem = {
  slug: string;
  title: string;
};

type StartupDetailProps = {
  name: string;
  overview: string;
  whyItExists: string;
  roleDetail: string;
  role: string;
  systemsBuilt: string;
  outcomes: string;
  statusDetail: string;
  learnings: string;
  metrics?: Record<string, string> | null;
  screenshots: string[];
  diagrams: string[];
  relatedProjects?: RelatedItem[];
  relatedPosts?: RelatedItem[];
};

export function StartupDetail({
  name,
  overview,
  whyItExists,
  roleDetail,
  role,
  systemsBuilt,
  outcomes,
  statusDetail,
  learnings,
  metrics,
  screenshots,
  diagrams,
  relatedProjects,
  relatedPosts,
}: StartupDetailProps) {
  return (
    <div className="mx-auto max-w-3xl px-6 py-24 md:px-8 md:py-32">
      {/* Title */}
      <h1 className="mb-16 text-[clamp(2.5rem,5vw,4rem)] font-bold leading-tight tracking-tight text-stone-900">
        {name}
      </h1>

      {/* Overview */}
      <section className="mb-16">
        <h2 className="mb-6 text-3xl font-bold text-stone-900">Overview</h2>
        <div className="prose prose-stone prose-lg max-w-none">
          <p className="text-lg leading-relaxed text-stone-700">{overview}</p>
        </div>
      </section>

      {/* Why it exists */}
      <section className="mb-16">
        <h2 className="mb-6 text-3xl font-bold text-stone-900">Why it exists</h2>
        <div className="prose prose-stone prose-lg max-w-none">
          <p className="text-lg leading-relaxed text-stone-700">{whyItExists}</p>
        </div>
      </section>

      {/* Your role & responsibility */}
      <section className="mb-16">
        <h2 className="mb-6 text-3xl font-bold text-stone-900">Your role & responsibility</h2>
        <div className="prose prose-stone prose-lg max-w-none">
          <p className="text-lg leading-relaxed text-stone-700">{roleDetail}</p>
        </div>
        <p className="mt-4 text-base font-medium text-stone-600">Role: {role}</p>
      </section>

      {/* What was built */}
      <section className="mb-16">
        <h2 className="mb-6 text-3xl font-bold text-stone-900">What was built</h2>
        <div className="prose prose-stone prose-lg max-w-none">
          <p className="text-lg leading-relaxed text-stone-700">{systemsBuilt}</p>
        </div>
      </section>

      {/* Outcomes & current status */}
      <section className="mb-16">
        <h2 className="mb-6 text-3xl font-bold text-stone-900">Outcomes & current status</h2>
        <div className="prose prose-stone prose-lg max-w-none">
          <p className="mb-6 text-lg leading-relaxed text-stone-700">{outcomes}</p>
          <p className="text-lg leading-relaxed text-stone-700">{statusDetail}</p>
        </div>
      </section>

      {/* Metrics (optional) */}
      {metrics && Object.keys(metrics).length > 0 && (
        <section className="mb-16">
          <h3 className="mb-6 text-2xl font-semibold text-stone-900">Key metrics</h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {Object.entries(metrics).map(([key, value]) => (
              <div
                key={key}
                className="rounded-xl border border-stone-200 bg-stone-50 p-6"
              >
                <div className="text-sm font-medium uppercase tracking-wide text-stone-600">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </div>
                <div className="mt-2 text-2xl font-semibold text-stone-900">{value}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* What you learned */}
      <section className="mb-16">
        <h2 className="mb-6 text-3xl font-bold text-stone-900">What you learned</h2>
        <div className="prose prose-stone prose-lg max-w-none">
          <p className="text-lg leading-relaxed text-stone-700">{learnings}</p>
        </div>
      </section>

      {/* Diagrams (if any) - shown before screenshots */}
      {diagrams.length > 0 && (
        <section className="mb-16">
          <h3 className="mb-6 text-2xl font-semibold text-stone-900">Architecture</h3>
          <div className="space-y-6">
            {diagrams.map((url, index) => (
              <div key={index} className="overflow-hidden rounded-xl border border-stone-200">
                <Image
                  src={url}
                  alt={`${name} architecture diagram ${index + 1}`}
                  width={800}
                  height={600}
                  className="h-auto w-full"
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Screenshots (sparingly - max 3 per Epic 6 spec) */}
      {screenshots.length > 0 && (
        <section className="mb-16">
          <h3 className="mb-6 text-2xl font-semibold text-stone-900">Screenshots</h3>
          <div className="space-y-6">
            {screenshots.slice(0, 3).map((url, index) => (
              <div key={index} className="overflow-hidden rounded-xl border border-stone-200">
                <Image
                  src={url}
                  alt={`${name} screenshot ${index + 1}`}
                  width={800}
                  height={600}
                  className="h-auto w-full"
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Related Content (Work & Writing) */}
      <StartupRelatedContent projects={relatedProjects} posts={relatedPosts} />
    </div>
  );
}
