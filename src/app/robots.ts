import { type MetadataRoute } from 'next';

/**
 * Robots.txt Generation
 * Epic 1 Story 1.6 - Robots.txt requirement
 *
 * Configures search engine crawling rules
 */
export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_URL || 'http://localhost:3000';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin/*',
          '/admin',
          '/access/*',
          '/access',
          '/account/*',
          '/account',
          '/login',
          '/verify-email',
          '/auth/*',
          '/api/*',
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
