/**
 * ProjectDetail Component - Apple-inspired Design
 *
 * Epic 5 - Story 5.4: Individual Project Page Structure
 *
 * Features:
 * - Clean Apple HIG typography
 * - Required sections: Overview, Your Role, Execution, Outcome, Reflection (optional)
 * - Text-first layout (visuals support, don't distract)
 * - Reads like a post-mortem, not a pitch
 */

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

type ProjectDetailProps = {
  title: string;
  overview: string;
  roleDetail: string;
  teamSize?: number | null;
  execution: string;
  outcomeDetail: string;
  reflection?: string | null;
  screenshots: string[];
  diagrams: string[];
};

export function ProjectDetail({
  title,
  overview,
  roleDetail,
  teamSize,
  execution,
  outcomeDetail,
  reflection,
  screenshots,
  diagrams,
}: ProjectDetailProps) {
  return (
    <div className="mx-auto max-w-3xl px-6 py-24 md:px-8 md:py-32">
      {/* Back Button */}
      <Link
        href="/work"
        className="group mb-12 inline-flex items-center gap-2 rounded-full border border-stone-200/60 bg-white/80 px-4 py-2 text-sm font-medium text-stone-700 backdrop-blur-sm transition-all hover:border-purple-300 hover:bg-purple-50/80 hover:text-purple-700"
      >
        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
        Back to Work
      </Link>

      {/* Title */}
      <h1 className="mb-16 text-[clamp(2.5rem,5vw,4rem)] font-bold leading-tight tracking-tight text-stone-900">
        {title}
      </h1>

      {/* Overview */}
      <section className="mb-16">
        <h2 className="mb-6 text-3xl font-bold text-stone-900">Overview</h2>
        <div className="prose prose-stone prose-lg max-w-none">
          <p className="text-lg leading-relaxed text-stone-700">{overview}</p>
        </div>
      </section>

      {/* Your Role */}
      <section className="mb-16">
        <h2 className="mb-6 text-3xl font-bold text-stone-900">Your Role</h2>
        <div className="prose prose-stone prose-lg max-w-none">
          <p className="text-lg leading-relaxed text-stone-700">{roleDetail}</p>
        </div>
        {teamSize !== null && teamSize !== undefined && (
          <p className="mt-4 text-base font-medium text-stone-600">
            Team size:{' '}
            {teamSize === 0
              ? 'Solo project'
              : `${teamSize} ${teamSize === 1 ? 'person' : 'people'}`}
          </p>
        )}
      </section>

      {/* Execution */}
      <section className="mb-16">
        <h2 className="mb-6 text-3xl font-bold text-stone-900">Execution</h2>
        <div className="prose prose-stone prose-lg max-w-none">
          <p className="text-lg leading-relaxed text-stone-700">{execution}</p>
        </div>
      </section>

      {/* Outcome */}
      <section className="mb-16">
        <h2 className="mb-6 text-3xl font-bold text-stone-900">Outcome</h2>
        <div className="prose prose-stone prose-lg max-w-none">
          <p className="text-lg leading-relaxed text-stone-700">{outcomeDetail}</p>
        </div>
      </section>

      {/* Reflection (optional) */}
      {reflection && (
        <section className="mb-16">
          <h2 className="mb-6 text-3xl font-bold text-stone-900">Reflection</h2>
          <div className="prose prose-stone prose-lg max-w-none">
            <p className="text-lg leading-relaxed text-stone-700">{reflection}</p>
          </div>
        </section>
      )}

      {/* Diagrams (if any) - shown before screenshots */}
      {diagrams.length > 0 && (
        <section className="mb-16">
          <h3 className="mb-6 text-2xl font-semibold text-stone-900">Architecture</h3>
          <div className="space-y-6">
            {diagrams.map((url, index) => (
              <div key={index} className="overflow-hidden rounded-xl border border-stone-200">
                <Image
                  src={url}
                  alt={`${title} architecture diagram ${index + 1}`}
                  width={800}
                  height={600}
                  className="h-auto w-full"
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Screenshots (sparingly - max 3 per Epic 5 spec) */}
      {screenshots.length > 0 && (
        <section>
          <h3 className="mb-6 text-2xl font-semibold text-stone-900">Screenshots</h3>
          <div className="space-y-6">
            {screenshots.slice(0, 3).map((url, index) => (
              <div key={index} className="overflow-hidden rounded-xl border border-stone-200">
                <Image
                  src={url}
                  alt={`${title} screenshot ${index + 1}`}
                  width={800}
                  height={600}
                  className="h-auto w-full"
                />
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
