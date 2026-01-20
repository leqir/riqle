/**
 * Work Page - Portfolio Listing
 *
 * Features:
 * - Minimalist Apple HIG typography
 * - Clean, scannable layout
 * - Best work first (not chronological)
 * - Clear role and outcome for each project
 */

import { type Metadata } from 'next';
import { db } from '@/lib/db';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'work | riqle',
  description: 'projects, products, and systems i&apos;ve built and shipped.',
};

export default async function WorkPage() {
  // Fetch published projects, ordered by displayOrder (best work first)
  const projects = await db.project.findMany({
    where: { published: true },
    orderBy: { displayOrder: 'asc' },
    take: 7,
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
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-4xl px-6 py-24 md:px-8 md:py-32">
        {/* Header */}
        <header className="mb-20">
          <p className="mb-3 text-sm font-medium uppercase tracking-wider text-stone-500">work</p>
          <h1 className="mb-4 text-[clamp(2.5rem,6vw,4rem)] font-semibold leading-[1.1] tracking-tight text-stone-900">
            projects, products, and systems
          </h1>
          <p className="text-xl leading-relaxed text-stone-600">
            things i&apos;ve built and shipped.
          </p>
        </header>

        {/* Career Philosophy */}
        <section className="mb-20 border-l-2 border-stone-900 pl-8">
          <div className="space-y-6 text-lg leading-relaxed text-stone-700">
            <p>
              a lot of great work happens inside established organisations. internships at places
              like atlassian or jpmorgan are rightly competitive, and learning within a well-run
              system is valuable.
            </p>
            <p>i&apos;ve chosen a different path for now.</p>
            <p>
              i prefer having direct responsibility over what i&apos;m building. that usually means
              smaller teams, less structure, and more exposure, but it also means the work is mine
              end-to-end.
            </p>
            <p>
              the projects here reflect that preference. they&apos;re not exercises or case studies.
              they&apos;re things that exist, are used, and are still being improved.
            </p>
          </div>
        </section>

        {/* Project List */}
        {projects.length === 0 ? (
          <div className="border-l-2 border-stone-300 py-12 pl-8">
            <p className="text-lg text-stone-600">no published projects yet. check back soon.</p>
          </div>
        ) : (
          <div className="space-y-16">
            {projects.map((project, index) => (
              <article key={project.slug} className="group">
                <Link href={`/work/${project.slug}`} className="block">
                  {/* Project Number */}
                  <p className="mb-4 font-mono text-sm font-medium text-stone-400">
                    {String(index + 1).padStart(2, '0')}
                  </p>

                  {/* Title */}
                  <h2 className="mb-3 text-[clamp(1.75rem,4vw,2.5rem)] font-semibold leading-tight tracking-tight text-stone-900 transition-colors group-hover:text-stone-600">
                    {project.title}
                  </h2>

                  {/* Description */}
                  <p className="mb-6 text-lg leading-relaxed text-stone-600">
                    {project.description}
                  </p>

                  {/* Meta */}
                  <div className="flex flex-wrap gap-x-8 gap-y-3 text-sm">
                    <div>
                      <span className="font-medium text-stone-400">role</span>
                      <span className="ml-3 text-stone-700">{project.role}</span>
                    </div>
                    <div>
                      <span className="font-medium text-stone-400">outcome</span>
                      <span className="ml-3 text-stone-700">{project.outcome}</span>
                    </div>
                    <div>
                      <span className="ml-auto inline-block rounded-full bg-stone-100 px-3 py-1 text-xs font-medium text-stone-600">
                        {project.projectStatus}
                      </span>
                    </div>
                  </div>

                  {/* Divider */}
                  {index < projects.length - 1 && (
                    <div className="mt-16 h-px bg-gradient-to-r from-stone-200 via-stone-300 to-stone-200" />
                  )}
                </Link>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
