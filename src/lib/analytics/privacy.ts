/**
 * Privacy Configuration
 *
 * Commitments:
 * - No cookies (cookieless tracking)
 * - No personal data
 * - Respect Do Not Track
 * - Anonymize IPs
 * - No cross-site tracking
 */

export const PRIVACY_CONFIG = {
  // Respect browser preferences
  respectDoNotTrack: true,

  // No cookies
  cookieless: true,

  // Anonymize IPs
  anonymizeIp: true,

  // No cross-site tracking
  crossSiteTracking: false,

  // No session recording
  sessionRecording: false,

  // Data retention
  retentionPeriod: 365, // days

  // User controls
  optOut: {
    enabled: true,
    method: 'localStorage' as const, // User can opt out via localStorage
  },
} as const;

export function checkDoNotTrack(): boolean {
  if (typeof navigator === 'undefined') return false;

  // Check Do Not Track header
  const dnt = navigator.doNotTrack || (window as any).doNotTrack || (navigator as any).msDoNotTrack;

  return dnt === '1' || dnt === 'yes';
}

export function checkOptOut(): boolean {
  if (typeof localStorage === 'undefined') return false;

  return localStorage.getItem('analytics_opt_out') === 'true';
}

export function setOptOut(optOut: boolean) {
  if (typeof localStorage === 'undefined') return;

  if (optOut) {
    localStorage.setItem('analytics_opt_out', 'true');
  } else {
    localStorage.removeItem('analytics_opt_out');
  }
}

export function shouldTrack(): boolean {
  // Don't track if:
  // 1. User has Do Not Track enabled
  // 2. User has opted out
  // 3. Development environment (optional)

  if (checkDoNotTrack()) return false;
  if (checkOptOut()) return false;
  if (process.env.NODE_ENV === 'development') return false;

  return true;
}
