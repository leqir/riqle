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
import { Card, PageHero, MetaInfo } from '@/components/ui';
import { HandDrawnPencil } from '@/components/design-system/icons/hand-drawn-pencil';

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
        <PageHero
          icon={<HandDrawnPencil className="h-7 w-7 text-indigo-600" />}
          title="Writing"
          description="Essays on education, systems, learning, product, and decision-making—thinking made inspectable."
        />

        {/* Essay List */}
        {posts.length === 0 ? (
          <div className="rounded-2xl border border-stone-200 bg-white p-12 text-center">
            <p className="text-lg text-stone-600">No published essays yet. Check back soon!</p>
          </div>
        ) : (
          <div className="space-y-6">
            {posts.map((post) => {
              const formattedDate = post.publishedAt
                ? new Intl.DateTimeFormat('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  }).format(new Date(post.publishedAt))
                : null;

              return (
                <Card
                  key={post.slug}
                  href={`/writing/${post.slug}`}
                  title={post.title}
                  description={post.description}
                  accentColor="indigo"
                  badge={
                    post.theme ? (
                      <span className="text-sm font-medium text-stone-500">{post.theme}</span>
                    ) : undefined
                  }
                  metaItems={[
                    formattedDate ? <MetaInfo key="date">{formattedDate}</MetaInfo> : null,
                    post.readingTime ? (
                      <MetaInfo key="reading-time">{post.readingTime} min read</MetaInfo>
                    ) : null,
                  ].filter(Boolean)}
                  ctaText="Read essay"
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
