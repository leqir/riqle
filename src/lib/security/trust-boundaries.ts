/**
 * Trust Boundaries
 *
 * All data crossing trust boundaries must be validated
 */

export enum TrustBoundary {
  PUBLIC = 'public', // Internet → Application
  AUTHENTICATED = 'authenticated', // Customer → Application
  ADMIN = 'admin', // Admin → Application
  INTERNAL = 'internal', // Application → Application
}

export interface BoundaryPolicy {
  boundary: TrustBoundary;
  validation: 'strict' | 'standard' | 'minimal';
  sanitization: 'aggressive' | 'standard' | 'minimal';
  logging: boolean;
  rateLimiting: boolean;
}

export const BOUNDARY_POLICIES: Record<TrustBoundary, BoundaryPolicy> = {
  [TrustBoundary.PUBLIC]: {
    boundary: TrustBoundary.PUBLIC,
    validation: 'strict',
    sanitization: 'aggressive',
    logging: true,
    rateLimiting: true,
  },

  [TrustBoundary.AUTHENTICATED]: {
    boundary: TrustBoundary.AUTHENTICATED,
    validation: 'strict',
    sanitization: 'standard',
    logging: true,
    rateLimiting: true,
  },

  [TrustBoundary.ADMIN]: {
    boundary: TrustBoundary.ADMIN,
    validation: 'strict',
    sanitization: 'standard',
    logging: true,
    rateLimiting: true,
  },

  [TrustBoundary.INTERNAL]: {
    boundary: TrustBoundary.INTERNAL,
    validation: 'minimal',
    sanitization: 'minimal',
    logging: false,
    rateLimiting: false,
  },
};

export function getBoundaryPolicy(boundary: TrustBoundary): BoundaryPolicy {
  return BOUNDARY_POLICIES[boundary];
}

/**
 * Validate data based on trust boundary
 */
export function validateBoundaryCrossing(boundary: TrustBoundary, _data: unknown): void {
  const policy = getBoundaryPolicy(boundary);

  if (policy.logging) {
    console.log(`[Trust Boundary] ${boundary} crossing`);
  }

  // Additional validation logic based on policy can be added here
  // For now, this is a placeholder for boundary awareness
}

/**
 * Check if rate limiting should be applied
 */
export function shouldRateLimit(boundary: TrustBoundary): boolean {
  const policy = getBoundaryPolicy(boundary);
  return policy.rateLimiting;
}

/**
 * Get validation level for boundary
 */
export function getValidationLevel(boundary: TrustBoundary): 'strict' | 'standard' | 'minimal' {
  const policy = getBoundaryPolicy(boundary);
  return policy.validation;
}

/**
 * Get sanitization level for boundary
 */
export function getSanitizationLevel(
  boundary: TrustBoundary
): 'aggressive' | 'standard' | 'minimal' {
  const policy = getBoundaryPolicy(boundary);
  return policy.sanitization;
}

/**
 * Usage example:
 *
 * import { TrustBoundary, validateBoundaryCrossing } from '@/lib/security/trust-boundaries';
 *
 * // In a public API route:
 * export async function POST(request: Request) {
 *   const data = await request.json();
 *   validateBoundaryCrossing(TrustBoundary.PUBLIC, data);
 *
 *   // Proceed with strict validation...
 * }
 */
