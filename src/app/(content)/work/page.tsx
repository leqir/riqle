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
import { Card, PageHero, MetaInfo, Text } from '@/components/ui';
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
        <PageHero
          icon={<HandDrawnSparkles className="h-7 w-7 text-purple-600" />}
          title="Work"
          description="Projects, products, and systems I've built and shipped."
        />

        {/* Career Philosophy Section */}
        <section className="mb-16 rounded-3xl border border-stone-200/60 bg-gradient-to-br from-white/90 to-stone-50/90 p-8 backdrop-blur-xl md:p-12">
          <div className="space-y-6">
            <Text size="lg" color="secondary">
              A lot of great work happens inside established organisations. Internships at places
              like Atlassian or JPMorgan are rightly competitive, and learning within a well-run
              system is valuable.
            </Text>
            <Text size="lg" color="secondary">
              I&apos;ve chosen a different path for now.
            </Text>
            <Text size="lg" color="secondary">
              I prefer having direct responsibility over what I&apos;m building. That usually means
              smaller teams, less structure, and more exposure, but it also means the work is mine
              end-to-end.
            </Text>
            <Text size="lg" color="secondary">
              The projects here reflect that preference. They&apos;re not exercises or case studies.
              They&apos;re things that exist, are used, and are still being improved.
            </Text>
          </div>
        </section>

        {/* Project List */}
        {projects.length === 0 ? (
          <div className="rounded-2xl border border-stone-200 bg-white p-12 text-center">
            <p className="text-lg text-stone-600">No published projects yet. Check back soon!</p>
          </div>
        ) : (
          <div className="space-y-6">
            {projects.map((project) => (
              <Card
                key={project.slug}
                href={`/work/${project.slug}`}
                title={project.title}
                description={project.description}
                accentColor="blue"
                badge={
                  <span className="text-sm font-medium text-stone-500">
                    {project.projectStatus}
                  </span>
                }
                metaItems={[
                  <MetaInfo key="role" label="Role" value={project.role} />,
                  <MetaInfo key="outcome" label="Outcome" value={project.outcome} />,
                ]}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
