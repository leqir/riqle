/**
 * Work Page - Portfolio Listing
 *
 * Epic 5 - Story 5.3: Portfolio Structure (Macro Layout)
 *
 * Features:
 * - Apple-inspired typography
 * - Curated list (5-7 items max, no pagination)
 * - Best work first (not chronological)
 * - Clear role and outcome for each project
 * - Scannable in <60 seconds
 */

import { type Metadata } from 'next';
import { db } from '@/lib/db';
import { WorkCard } from '@/components/work/work-card';
import { HandDrawnSparkles } from '@/components/icons/hand-drawn-sparkles';

export const metadata: Metadata = {
  title: 'Work | Nathanael',
  description: "Projects, products, and systems I've built and shipped.",
};

export default async function WorkPage() {
  // Fetch published projects, ordered by displayOrder (best work first)
  const projects = await db.project.findMany({
    where: { published: true },
    orderBy: { displayOrder: 'asc' },
    take: 7, // Max 7 projects per Epic 5 specifications
    select: {
      slug: true,
      title: true,
      description: true,
      role: true,
      outcome: true,
      projectStatus: true,
    },
  });

  return (
    <div className="relative min-h-screen">
      <div className="mx-auto max-w-5xl px-6 py-24 md:px-8 md:py-32">
        {/* Header */}
        <header className="mb-16">
          <div className="mb-6 inline-flex items-center gap-3">
            <HandDrawnSparkles className="h-7 w-7 text-purple-600" />
            <h1 className="text-[clamp(2.5rem,5vw,4rem)] font-bold tracking-tight text-stone-900">
              Work
            </h1>
          </div>
          <p className="max-w-2xl text-xl leading-relaxed text-stone-600">
            Projects, products, and systems I&apos;ve built and shipped.
          </p>
        </header>

        {/* Project List */}
        {projects.length === 0 ? (
          <div className="rounded-2xl border border-stone-200 bg-white p-12 text-center">
            <p className="text-lg text-stone-600">No published projects yet. Check back soon!</p>
          </div>
        ) : (
          <div className="space-y-6">
            {projects.map((project) => (
              <WorkCard
                key={project.slug}
                slug={project.slug}
                title={project.title}
                description={project.description}
                role={project.role}
                outcome={project.outcome}
                projectStatus={project.projectStatus}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
