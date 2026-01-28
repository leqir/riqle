# Authentication Implementation Guide (Story 14.3)

## Overview

This document describes the authentication system requirements for the Riqle platform based on Epic 14, Story 14.3.

**Status**: 📋 NOT YET IMPLEMENTED
**Priority**: High (Required for admin access)
**Complexity**: High (8-10 hours estimated)

---

## Requirements Summary

From Epic 14, Story 14.3:

**Goal**: Secure authentication without friction

**Acceptance Criteria**:
- ✅ Use proven providers (NextAuth.js)
- ✅ Email-based login preferred (magic links)
- ✅ Sessions are short-lived (1 hour)
- ✅ Cookies are HttpOnly, Secure, SameSite=lax
- ✅ CSRF protection enforced
- ✅ No password storage (unless absolutely required)
- ✅ Admin actions require re-authentication
- ✅ Sessions expire predictably
- ✅ Token leakage doesn't grant long-term access

---

## Architecture

### Authentication Provider: NextAuth.js

**Why NextAuth.js**:
- Industry-standard, proven security
- Built-in session management
- Email provider (magic links) support
- CSRF protection built-in
- Easy integration with Next.js
- Active maintenance and security updates

### Authentication Flow

```
1. User clicks "Sign In"
2. User enters email
3. System sends magic link email
4. User clicks link
5. System verifies token
6. Session created (1 hour)
7. User redirected to destination
```

### Database Schema (Already Exists)

The Prisma schema already has NextAuth.js models:

```prisma
model Account {
  id                String  @id
  userId            String
  type              String
  provider          String
  providerAccountId String
  // ... OAuth fields
}

model Session {
  id           String   @id
  sessionToken String   @unique
  userId       String
  expires      DateTime
  User         User     @relation(fields: [userId], references: [id])
}

model VerificationToken {
  identifier String
  token      String   @unique
  expires    DateTime
}
```

---

## Implementation Steps

### Step 1: Install NextAuth.js

```bash
npm install next-auth
```

**Already installed**: Check `package.json` to confirm.

### Step 2: Configure NextAuth.js

Create `lib/auth/auth-options.ts`:

```typescript
import { NextAuthOptions } from 'next-auth';
import EmailProvider from 'next-auth/providers/email';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { prisma } from '@/lib/db/prisma';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),

  providers: [
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: parseInt(process.env.EMAIL_SERVER_PORT || '587'),
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
      maxAge: 15 * 60, // Magic links expire in 15 minutes
    }),
  ],

  session: {
    strategy: 'jwt', // Use JWT for sessions (stateless)
    maxAge: 60 * 60, // 1 hour (short-lived)
    updateAge: 60 * 15, // Update session every 15 minutes
  },

  cookies: {
    sessionToken: {
      name: '__Secure-next-auth.session-token',
      options: {
        httpOnly: true, // Cannot be accessed by JavaScript
        sameSite: 'lax', // CSRF protection
        path: '/',
        secure: true, // HTTPS only (production)
      },
    },
  },

  pages: {
    signIn: '/auth/signin',
    verifyRequest: '/auth/verify',
    error: '/auth/error',
  },

  callbacks: {
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub!;
        session.user.role = token.role as Role;

        // Admin sessions expire after 1 hour
        if (token.role === 'ADMIN') {
          const tokenAge = Date.now() - (token.iat || 0) * 1000;
          if (tokenAge > 60 * 60 * 1000) {
            throw new Error('Session expired');
          }
        }
      }

      return session;
    },

    async jwt({ token, user }) {
      if (user) {
        // Get user role from database
        const dbUser = await prisma.user.findUnique({
          where: { id: user.id },
          include: { UserRole: { include: { Role: true } } },
        });

        token.role = dbUser?.UserRole[0]?.Role.name || 'PUBLIC';
      }

      return token;
    },

    async redirect({ url, baseUrl }) {
      // Prevent open redirect vulnerability
      if (url.startsWith('/')) return `${baseUrl}${url}`;
      if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },

  events: {
    async signIn({ user, isNewUser }) {
      console.log('User signed in:', user.email, isNewUser ? '(new)' : '(existing)');

      // Optional: Send to analytics or audit log
      if (isNewUser) {
        // Track new user registration
      }
    },

    async signOut({ token }) {
      console.log('User signed out:', token.sub);
    },
  },
};
```

### Step 3: Create API Route

Create `src/app/api/auth/[...nextauth]/route.ts`:

```typescript
import NextAuth from 'next-auth';
import { authOptions } from '@/lib/auth/auth-options';

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
```

### Step 4: Create Sign In Page

Create `src/app/auth/signin/page.tsx`:

```typescript
'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await signIn('email', {
        email,
        redirect: false,
        callbackUrl: '/admin',
      });

      setSent(true);
    } catch (error) {
      console.error('Sign in error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="w-full max-w-md space-y-4 text-center">
          <h1 className="text-2xl font-semibold">Check your email</h1>
          <p className="text-slate-600">
            We sent a magic link to <strong>{email}</strong>.
            Click the link to sign in.
          </p>
          <p className="text-sm text-slate-500">
            The link expires in 15 minutes.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-semibold">Sign in to Riqle</h1>
          <p className="text-slate-600">
            Enter your email to receive a magic link
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-brand-600 px-4 py-2 font-medium text-white hover:bg-brand-700 disabled:opacity-50"
          >
            {loading ? 'Sending...' : 'Send magic link'}
          </button>
        </form>

        <p className="text-center text-sm text-slate-500">
          No password required. Just click the link in your email.
        </p>
      </div>
    </div>
  );
}
```

### Step 5: Create Verify Request Page

Create `src/app/auth/verify/page.tsx`:

```typescript
export default function VerifyRequestPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md space-y-4 text-center">
        <h1 className="text-2xl font-semibold">Check your email</h1>
        <p className="text-slate-600">
          A sign-in link has been sent to your email address.
        </p>
        <p className="text-sm text-slate-500">
          The link expires in 15 minutes.
        </p>
      </div>
    </div>
  );
}
```

### Step 6: Create Error Page

Create `src/app/auth/error/page.tsx`:

```typescript
'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function AuthErrorPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  const errorMessages: Record<string, string> = {
    Configuration: 'There is a problem with the server configuration.',
    AccessDenied: 'You do not have permission to sign in.',
    Verification: 'The verification link is invalid or has expired.',
    Default: 'An error occurred during authentication.',
  };

  const message = errorMessages[error || 'Default'] || errorMessages.Default;

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md space-y-4 text-center">
        <h1 className="text-2xl font-semibold text-red-600">
          Authentication Error
        </h1>
        <p className="text-slate-600">{message}</p>
        <Link
          href="/auth/signin"
          className="inline-block text-brand-600 hover:text-brand-700"
        >
          ← Try again
        </Link>
      </div>
    </div>
  );
}
```

### Step 7: Add Session Provider

Update `src/app/layout.tsx`:

```typescript
import { SessionProvider } from 'next-auth/react';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
```

### Step 8: Configure Environment Variables

```bash
# .env.local

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=<generate-with-openssl-rand-base64-32>

# Email (using Resend)
EMAIL_SERVER_HOST=smtp.resend.com
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER=resend
EMAIL_SERVER_PASSWORD=<your-resend-api-key>
EMAIL_FROM=noreply@riqle.com
```

Generate secret:
```bash
openssl rand -base64 32
```

---

## CSRF Protection

### Built-in CSRF Protection

NextAuth.js automatically handles CSRF protection:

1. **CSRF Token**: Automatically generated and validated
2. **Double Submit Cookie**: CSRF token in cookie + POST body
3. **SameSite Cookies**: Set to 'lax' by default

### Additional CSRF Protection (Optional)

If you need CSRF protection for non-NextAuth routes, create `lib/security/csrf.ts`:

```typescript
import { createHash, randomBytes } from 'crypto';

export function generateCsrfToken(): string {
  return randomBytes(32).toString('hex');
}

export function validateCsrfToken(token: string, sessionId: string): boolean {
  // Implement token validation logic
  return /^[a-f0-9]{64}$/.test(token);
}
```

---

## Re-Authentication for Sensitive Actions

For admin operations like refunds, implement re-authentication:

```typescript
// lib/auth/re-auth.ts
import { getServerSession } from 'next-auth';
import { authOptions } from './auth-options';

const SENSITIVE_ACTIONS = ['delete', 'refund', 'revoke_entitlement'];

export async function requireReAuthentication(action: string): Promise<void> {
  if (!SENSITIVE_ACTIONS.includes(action)) {
    return;
  }

  const session = await getServerSession(authOptions);

  if (!session) {
    throw new Error('Not authenticated');
  }

  // Check if session is recent (< 5 minutes old)
  const sessionAge = Date.now() - new Date(session.expires).getTime();
  const FIVE_MINUTES = 5 * 60 * 1000;

  if (sessionAge > FIVE_MINUTES) {
    throw new Error('Re-authentication required');
  }
}

// Usage in API routes
export async function POST(request: Request) {
  await requireReAuthentication('refund');
  // ... proceed with refund
}
```

---

## Session Timeout Warning

Create `components/auth/SessionTimeout.tsx`:

```typescript
'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

export function SessionTimeout() {
  const { data: session } = useSession();
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    if (!session) return;

    const expiresAt = new Date(session.expires).getTime();
    const now = Date.now();
    const timeUntilExpiry = expiresAt - now;

    // Show warning 5 minutes before expiry
    const warningTime = timeUntilExpiry - 5 * 60 * 1000;

    if (warningTime > 0) {
      const timer = setTimeout(() => {
        setShowWarning(true);
      }, warningTime);

      return () => clearTimeout(timer);
    }
  }, [session]);

  if (!showWarning) return null;

  return (
    <div className="fixed bottom-4 right-4 rounded-lg border border-yellow-300 bg-yellow-100 p-4 shadow-lg">
      <p className="text-sm text-yellow-900">
        Your session will expire in 5 minutes. Save your work.
      </p>
    </div>
  );
}
```

---

## Testing

### Manual Testing

1. **Sign In Flow**:
   - Visit `/auth/signin`
   - Enter email
   - Check email inbox
   - Click magic link
   - Verify redirect to `/admin`

2. **Session Expiry**:
   - Sign in
   - Wait 1 hour
   - Try to access admin page
   - Verify redirected to sign-in

3. **CSRF Protection**:
   - Try POST to `/api/auth/signin` without CSRF token
   - Should fail

### Automated Testing

```typescript
// tests/auth.test.ts
describe('Authentication', () => {
  it('should send magic link email', async () => {
    // Test implementation
  });

  it('should create session after magic link click', async () => {
    // Test implementation
  });

  it('should expire session after 1 hour', async () => {
    // Test implementation
  });
});
```

---

## Security Checklist

Before deploying:

- [ ] `NEXTAUTH_SECRET` is set and strong (32+ characters)
- [ ] Cookies are HttpOnly, Secure, SameSite=lax
- [ ] Sessions expire after 1 hour
- [ ] Magic links expire after 15 minutes
- [ ] CSRF protection is enabled
- [ ] Email provider is configured (Resend)
- [ ] Open redirect protection is enabled
- [ ] Session timeout warning is implemented
- [ ] Re-authentication for sensitive actions is enforced
- [ ] Error pages don't leak sensitive information

---

## Migration Notes

If migrating from another auth system:

1. Export existing user emails
2. Create users in Prisma database
3. Assign roles
4. Send password reset emails (if needed)
5. Test authentication flow
6. Decommission old system

---

## Resources

- [NextAuth.js Documentation](https://next-auth.js.org/)
- [Email Provider Guide](https://next-auth.js.org/providers/email)
- [Prisma Adapter](https://next-auth.js.org/adapters/prisma)
- [Security Best Practices](https://next-auth.js.org/configuration/options#security)

---

Last Updated: 2024-01-27
Status: 📋 Ready for Implementation
