/**
 * Essay Detail Page - Dynamic Route
 *
 * Epic 7 - Story 7.4: Individual Essay Page Structure
 *
 * Features:
 * - Reads essay from database by slug
 * - Renders Essay component
 * - Returns 404 if essay not found or not published
 * - Generates metadata for SEO
 * - Cross-links to related Work and Startups
 */

import { type Metadata } from 'next';
import { notFound } from 'next/navigation';
import { db } from '@/lib/db';
import { Essay } from '@/components/content/writing/essay';

type Props = {
  params: Promise<{ slug: string }>;
};

// Generate metadata for SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  const post = await db.post.findUnique({
    where: { slug },
    select: {
      title: true,
      description: true,
      metaTitle: true,
      metaDescription: true,
      ogImage: true,
    },
  });

  if (!post) {
    return {
      title: 'Essay Not Found',
    };
  }

  return {
    title: post.metaTitle || `${post.title} | Nathanael`,
    description: post.metaDescription || post.description,
    openGraph: {
      title: post.metaTitle || post.title,
      description: post.metaDescription || post.description,
      images: post.ogImage ? [{ url: post.ogImage }] : [],
    },
  };
}

export default async function EssayPage({ params }: Props) {
  const { slug } = await params;

  // Fetch essay from database
  const post = await db.post.findUnique({
    where: { slug },
    select: {
      title: true,
      description: true,
      content: true,
      contextLine: true,
      publishedAt: true,
      readingTime: true,
      diagramUrl: true,
      theme: true,
      published: true,
      relatedProjectSlugs: true,
      relatedStartupSlugs: true,
    },
  });

  // Return 404 if essay not found or not published
  if (!post || !post.published) {
    notFound();
  }

  // Fetch related projects (max 3)
  const relatedProjects =
    post.relatedProjectSlugs.length > 0
      ? await db.project.findMany({
          where: {
            slug: { in: post.relatedProjectSlugs.slice(0, 3) },
            published: true,
          },
          select: {
            slug: true,
            title: true,
          },
        })
      : [];

  // Fetch related startups (max 3)
  const relatedStartups =
    post.relatedStartupSlugs.length > 0
      ? await db.startup.findMany({
          where: {
            slug: { in: post.relatedStartupSlugs.slice(0, 3) },
            published: true,
          },
          select: {
            slug: true,
            name: true,
          },
        })
      : [];

  return (
    <Essay
      title={post.title}
      description={post.description}
      content={post.content}
      contextLine={post.contextLine}
      publishedAt={post.publishedAt}
      readingTime={post.readingTime}
      diagramUrl={post.diagramUrl}
      theme={post.theme}
      relatedProjects={relatedProjects}
      relatedStartups={relatedStartups.map((s) => ({ slug: s.slug, title: s.name }))}
    />
  );
}
