/**
 * Analytics Provider Selection
 *
 * Options (in order of preference):
 * 1. Vercel Analytics (cookieless, built-in, fast)
 * 2. Plausible (privacy-focused, self-hostable)
 * 3. Fathom (privacy-focused, simple)
 * 4. Custom (minimal implementation)
 */

export const ANALYTICS_PROVIDER = {
  name: 'vercel' as const,
  features: {
    cookieless: true,
    lightweight: true,
    privacyFirst: true,
    realTimeDashboard: false, // Intentionally not used
  },
  scriptSize: '< 1KB',
  performance: {
    loadAsync: true,
    deferLoad: true,
  },
} as const;

// Alternative: Plausible (if self-hosting)
// export const ANALYTICS_PROVIDER = {
//   name: 'plausible',
//   domain: 'plausible.io',
//   scriptUrl: 'https://plausible.io/js/script.js',
//   features: {
//     cookieless: true,
//     openSource: true,
//     privacyCompliant: true,
//   },
// };
