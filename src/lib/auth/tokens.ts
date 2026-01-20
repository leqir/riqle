import crypto from 'crypto';
import { db } from '@/lib/db';
import 'server-only';

/**
 * Token Utilities
 *
 * Server-side utilities for generating and validating authentication tokens.
 * IMPORTANT: These functions should ONLY be used in Server Components, Server Actions, or API Routes.
 */

/**
 * Generate a cryptographically secure random token
 *
 * @returns string - 64-character hex token
 */
function generateSecureToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

/**
 * Create an email verification token
 *
 * @param email - User's email address
 * @returns Promise<string> - Verification token
 */
export async function createVerificationToken(email: string): Promise<string> {
  const token = generateSecureToken();
  const expires = new Date();
  expires.setHours(expires.getHours() + 24); // 24 hour expiry

  // Delete any existing verification tokens for this email
  await db.verificationToken.deleteMany({
    where: { identifier: email },
  });

  // Create new verification token
  await db.verificationToken.create({
    data: {
      identifier: email,
      token,
      expires,
    },
  });

  return token;
}

/**
 * Verify an email verification token
 *
 * @param email - User's email address
 * @param token - Verification token
 * @returns Promise<boolean> - True if token is valid and not expired
 */
export async function verifyEmailToken(email: string, token: string): Promise<boolean> {
  const verificationToken = await db.verificationToken.findUnique({
    where: {
      identifier_token: {
        identifier: email,
        token,
      },
    },
  });

  if (!verificationToken) {
    return false;
  }

  // Check if token is expired
  if (verificationToken.expires < new Date()) {
    // Delete expired token
    await db.verificationToken.delete({
      where: {
        identifier_token: {
          identifier: email,
          token,
        },
      },
    });
    return false;
  }

  // Delete token after successful verification (one-time use)
  await db.verificationToken.delete({
    where: {
      identifier_token: {
        identifier: email,
        token,
      },
    },
  });

  return true;
}

/**
 * Create a password reset token
 *
 * @param userId - User's ID
 * @returns Promise<string> - Reset token
 */
export async function createPasswordResetToken(userId: string): Promise<string> {
  const token = generateSecureToken();
  const expires = new Date();
  expires.setHours(expires.getHours() + 1); // 1 hour expiry

  // Invalidate any existing unused reset tokens for this user
  await db.passwordResetToken.updateMany({
    where: {
      userId,
      used: false,
      expires: { gt: new Date() }, // Only active tokens
    },
    data: {
      used: true, // Mark as used to prevent reuse
    },
  });

  // Create new reset token
  const resetToken = await db.passwordResetToken.create({
    data: {
      userId,
      token,
      expires,
      used: false,
    },
  });

  return resetToken.token;
}

/**
 * Verify a password reset token
 *
 * @param token - Reset token
 * @returns Promise<string | null> - User ID if valid, null otherwise
 */
export async function verifyPasswordResetToken(token: string): Promise<string | null> {
  const resetToken = await db.passwordResetToken.findUnique({
    where: { token },
    include: { User: true },
  });

  if (!resetToken) {
    return null;
  }

  // Check if token is expired
  if (resetToken.expires < new Date()) {
    return null;
  }

  // Check if token has been used
  if (resetToken.used) {
    return null;
  }

  return resetToken.userId;
}

/**
 * Mark a password reset token as used
 *
 * @param token - Reset token
 * @returns Promise<void>
 */
export async function markPasswordResetTokenAsUsed(token: string): Promise<void> {
  await db.passwordResetToken.update({
    where: { token },
    data: { used: true },
  });
}

/**
 * Delete expired tokens (cleanup function)
 *
 * @returns Promise<void>
 */
export async function cleanupExpiredTokens(): Promise<void> {
  const now = new Date();

  // Delete expired verification tokens
  await db.verificationToken.deleteMany({
    where: {
      expires: { lt: now },
    },
  });

  // Delete expired password reset tokens
  await db.passwordResetToken.deleteMany({
    where: {
      expires: { lt: now },
    },
  });
}
