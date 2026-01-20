import type { NextAuthConfig } from 'next-auth';
import Resend from 'next-auth/providers/resend';
import { env } from '@/env';

/**
 * NextAuth.js v5 Configuration
 *
 * This configuration uses:
 * - Resend email provider for passwordless magic link authentication
 * - JWT session strategy for stateless authentication
 * - HttpOnly cookies for security
 * - Custom callbacks for role-based access control
 */
export const authConfig = {
  providers: [
    Resend({
      from: env.EMAIL_FROM,
      // Magic link customization
      sendVerificationRequest: async ({ identifier: email, url, provider }) => {
        const { host } = new URL(url);
        const { Resend } = await import('resend');
        const resend = new Resend(env.RESEND_API_KEY);

        const result = await resend.emails.send({
          from: provider.from,
          to: email,
          subject: `Sign in to ${host}`,
          html: `
            <!DOCTYPE html>
            <html>
              <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
              </head>
              <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
                <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
                  <h1 style="color: white; margin: 0; font-size: 24px;">Sign in to Riqle</h1>
                </div>
                <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #e5e7eb; border-top: none;">
                  <p style="margin-top: 0; font-size: 16px;">Hello,</p>
                  <p style="font-size: 16px;">Click the button below to sign in to your account:</p>
                  <div style="text-align: center; margin: 30px 0;">
                    <a href="${url}" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 14px 28px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: 600; font-size: 16px;">Sign In</a>
                  </div>
                  <p style="font-size: 14px; color: #6b7280;">If you didn't request this email, you can safely ignore it.</p>
                  <p style="font-size: 14px; color: #6b7280; margin-bottom: 0;">This link will expire in 24 hours.</p>
                </div>
                <div style="text-align: center; margin-top: 20px; color: #9ca3af; font-size: 12px;">
                  <p>Riqle Platform - Secure Authentication</p>
                </div>
              </body>
            </html>
          `,
        });

        if (result.error) {
          throw new Error(`Failed to send verification email: ${result.error.message}`);
        }
      },
    }),
  ],
  pages: {
    signIn: '/login',
    verifyRequest: '/verify-email',
    error: '/auth/error',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours - refresh session token
  },
  cookies: {
    sessionToken: {
      name: '__Secure-next-auth.session-token',
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
      },
    },
  },
  callbacks: {
    /**
     * Controls whether a user is allowed to access a route
     * Used by middleware.ts to protect routes
     */
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnAdminPage = nextUrl.pathname.startsWith('/admin');
      const isOnLoginPage = nextUrl.pathname.startsWith('/login');
      const isOnVerifyPage = nextUrl.pathname.startsWith('/verify-email');

      // Allow access to login and verify pages without authentication
      if (isOnLoginPage || isOnVerifyPage) {
        return true;
      }

      // Protect admin pages - require authentication
      if (isOnAdminPage) {
        if (isLoggedIn) return true;
        return false; // Redirect to login page
      }

      // All other pages are public
      return true;
    },

    /**
     * JWT callback - runs when JWT is created or updated
     * Add custom fields to the token
     */
    async jwt({ token, user, trigger }) {
      // Initial sign in
      if (user) {
        token.id = user.id;
      }

      // Add role to token - fetch from database
      if (token.id && (trigger === 'signIn' || trigger === 'signUp' || !token.role)) {
        try {
          const { db } = await import('@/lib/db');
          const userWithRoles = await db.user.findUnique({
            where: { id: token.id as string },
            include: {
              UserRole: {
                include: {
                  Role: true,
                },
              },
            },
          });

          // Get all role names
          const roles = userWithRoles?.UserRole.map((ur) => ur.Role.name) ?? [];
          token.role = roles.includes('admin') ? 'admin' : (roles[0] ?? 'customer');
        } catch (error) {
          console.error('Error fetching user role:', error);
          token.role = 'customer';
        }
      }

      return token;
    },

    /**
     * Session callback - runs when session is checked
     * Add custom fields from token to session
     */
    async session({ session, token }) {
      if (session.user && token.id) {
        session.user.id = token.id as string;
        session.user.role = (token.role as string) ?? 'customer';
      }
      return session;
    },
  },
  events: {
    async signIn({ user, isNewUser }) {
      console.log(`User signed in: ${user.email} (new: ${isNewUser})`);
    },
    async signOut({ token }) {
      console.log(`User signed out: ${token.email}`);
    },
  },
  debug: process.env.NODE_ENV === 'development',
} satisfies NextAuthConfig;
