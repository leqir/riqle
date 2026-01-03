/**
 * Writing Page - Thinking Made Inspectable
 *
 * Epic 7 - Story 7.1 & 7.3: Writing Page Structure
 *
 * Features:
 * - Library feel, not blog
 * - Curated essays on thinking and judgment
 * - No infinite feeds or pagination pressure
 * - Calm, selective exploration
 */

import { type Metadata } from 'next';
import { db } from '@/lib/db';
import { EssayCard } from '@/components/writing/essay-card';
import { HandDrawnPencil } from '@/components/icons/hand-drawn-pencil';

export const metadata: Metadata = {
  title: 'Writing | Nathanael',
  description:
    'Essays on education, systems, learning, product, and decision-making—thinking made inspectable.',
};

export default async function WritingPage() {
  // Fetch published posts, ordered by publication date
  const posts = await db.post.findMany({
    where: { published: true },
    orderBy: { publishedAt: 'desc' },
    select: {
      slug: true,
      title: true,
      description: true,
      publishedAt: true,
      readingTime: true,
      theme: true,
    },
  });

  return (
    <div className="relative min-h-screen">
      <div className="mx-auto max-w-5xl px-6 py-24 md:px-8 md:py-32">
        {/* Header */}
        <header className="mb-16">
          <div className="mb-6 inline-flex items-center gap-3">
            <HandDrawnPencil className="h-7 w-7 text-indigo-600" />
            <h1 className="text-[clamp(2.5rem,5vw,4rem)] font-bold tracking-tight text-stone-900">
              Writing
            </h1>
          </div>
          <p className="max-w-2xl text-xl leading-relaxed text-stone-600">
            Essays on education, systems, learning, product, and decision-making—thinking made
            inspectable.
          </p>
        </header>

        {/* Essay List */}
        {posts.length === 0 ? (
          <div className="rounded-2xl border border-stone-200 bg-white p-12 text-center">
            <p className="text-lg text-stone-600">No published essays yet. Check back soon!</p>
          </div>
        ) : (
          <div className="space-y-6">
            {posts.map((post) => (
              <EssayCard
                key={post.slug}
                slug={post.slug}
                title={post.title}
                description={post.description}
                publishedAt={post.publishedAt}
                readingTime={post.readingTime}
                theme={post.theme}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
