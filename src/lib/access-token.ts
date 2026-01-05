/**
 * Access Token Generation & Validation
 *
 * Epic 10 - Story 10.4: Post-Purchase Confirmation
 *
 * Generates JWT tokens for email-based magic link access to purchased products.
 */

import jwt from 'jsonwebtoken';
import 'server-only';

const JWT_SECRET = process.env.JWT_SECRET || process.env.AUTH_SECRET;

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET or AUTH_SECRET must be set in environment variables');
}

export interface AccessTokenPayload {
  email: string;
  productId: string;
  entitlementId: string;
  type: 'access';
}

/**
 * Generate access token for email-based product access
 */
export function generateAccessToken(
  email: string,
  productId: string,
  entitlementId: string,
  expiresIn: string = '7d'
): string {
  const payload: AccessTokenPayload = {
    email,
    productId,
    entitlementId,
    type: 'access',
  };

  return jwt.sign(payload, JWT_SECRET, {
    expiresIn,
    issuer: 'riqle',
    audience: 'product-access',
  });
}

/**
 * Validate and decode access token
 */
export function validateAccessToken(token: string): AccessTokenPayload | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET, {
      issuer: 'riqle',
      audience: 'product-access',
    }) as AccessTokenPayload;

    // Verify token type
    if (decoded.type !== 'access') {
      return null;
    }

    return decoded;
  } catch {
    // Token invalid, expired, or malformed
    return null;
  }
}

/**
 * Generate magic link for product access
 */
export function generateAccessLink(
  email: string,
  productId: string,
  productSlug: string,
  entitlementId: string
): string {
  const token = generateAccessToken(email, productId, entitlementId);
  const baseUrl = process.env.NEXT_PUBLIC_URL || 'http://localhost:3000';
  return `${baseUrl}/access/${productSlug}?token=${token}`;
}
