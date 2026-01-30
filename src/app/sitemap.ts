import { type MetadataRoute } from 'next';
import { db } from '@/lib/db';

/**
 * Sitemap Generation
 * Epic 1 Story 1.6 - Dynamic sitemap requirement
 *
 * Generates XML sitemap with all public pages, posts, projects, startups, products, and resource categories
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_URL || 'http://localhost:3000';

  // Fetch all published content
  const [posts, projects, startups, products, categories] = await Promise.all([
    db.post.findMany({
      where: { published: true },
      select: { slug: true, updatedAt: true },
      orderBy: { publishedAt: 'desc' },
    }),
    db.project.findMany({
      where: { published: true },
      select: { slug: true, updatedAt: true },
      orderBy: { displayOrder: 'asc' },
    }),
    db.startup.findMany({
      where: { published: true },
      select: { slug: true, updatedAt: true },
      orderBy: { displayOrder: 'asc' },
    }),
    db.product.findMany({
      where: { published: true },
      select: { slug: true, updatedAt: true },
      orderBy: { createdAt: 'desc' },
    }),
    db.resourceCategory.findMany({
      where: { published: true },
      select: { path: true, updatedAt: true },
      orderBy: { displayOrder: 'asc' },
    }),
  ]);

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/work`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/startups`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/writing`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/resources`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ];

  // Dynamic content pages
  const postPages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${baseUrl}/writing/${post.slug}`,
    lastModified: post.updatedAt,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  const projectPages: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${baseUrl}/work/${project.slug}`,
    lastModified: project.updatedAt,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  const startupPages: MetadataRoute.Sitemap = startups.map((startup) => ({
    url: `${baseUrl}/startups/${startup.slug}`,
    lastModified: startup.updatedAt,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  const productPages: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${baseUrl}/resources/${product.slug}`,
    lastModified: product.updatedAt,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  const categoryPages: MetadataRoute.Sitemap = categories.map((category) => ({
    url: `${baseUrl}/resources/browse/${category.path}`,
    lastModified: category.updatedAt,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [
    ...staticPages,
    ...postPages,
    ...projectPages,
    ...startupPages,
    ...productPages,
    ...categoryPages,
  ];
}
