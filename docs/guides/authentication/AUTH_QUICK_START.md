# Authentication Quick Start

Get the authentication system running in 5 minutes.

## Step 1: Environment Setup

Create a `.env` file if you don't have one:

```bash
cp .env.example .env
```

Update these critical values in `.env`:

```bash
# Generate a secure secret (32+ characters)
NEXTAUTH_SECRET="your-very-long-random-secret-at-least-32-characters-long"

# Your local development URL
NEXTAUTH_URL="http://localhost:3000"

# Resend API key (get from https://resend.com)
RESEND_API_KEY="re_your_actual_api_key_here"

# Your verified sender email in Resend
EMAIL_FROM="noreply@yourdomain.com"
```

### Generate a Secure Secret

```bash
# On macOS/Linux
openssl rand -base64 32

# Or use Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

## Step 2: Database Setup

Ensure your database is running and apply the schema:

```bash
# Push schema to database
npm run db:push

# Optional: Seed initial data
npm run db:seed
```

## Step 3: Verify Installation

Check that all dependencies are installed:

```bash
npm install
```

The following packages should be present:

- `next-auth@^5.0.0-beta.25`
- `@auth/prisma-adapter@^2.7.4`
- `resend@^4.0.1`

## Step 4: Start Development Server

```bash
npm run dev
```

Navigate to http://localhost:3000

## Step 5: Test Authentication

### Quick Test Flow

1. **Homepage**: You should see "Not signed in" with a "Sign In" button
2. **Click "Sign In"**: Redirects to `/login`
3. **Enter your email**: Use an email you have access to
4. **Check your inbox**: Look for an email from your EMAIL_FROM address
5. **Click the magic link**: Should redirect you back to the app
6. **Verify success**: You should see "Signed in as [email]" on homepage
7. **Test protected route**: Click "Go to Admin" - should show admin dashboard
8. **Test sign out**: Click "Sign Out" - should return to "Not signed in"

### Test URLs

- **Homepage**: http://localhost:3000
- **Login**: http://localhost:3000/login
- **Admin (protected)**: http://localhost:3000/admin
- **API Session**: http://localhost:3000/api/auth/session

## Common Issues

### "Email not sending"

**Check Resend Setup**:

1. Verify your `RESEND_API_KEY` is correct
2. Verify your `EMAIL_FROM` domain is verified in Resend
3. Check Resend dashboard for delivery logs
4. Check server console for error messages

**Development Mode**:
In development, if using Resend's free tier, you can only send to verified email addresses.

### "Magic link doesn't work"

**Possible causes**:

1. Link already used (can only be used once)
2. Link expired (expires after 24 hours)
3. `NEXTAUTH_URL` doesn't match your actual URL
4. `NEXTAUTH_SECRET` changed between link generation and use

**Solution**: Request a new magic link

### "Session not persisting"

**Check cookies**:

1. Open DevTools > Application > Cookies
2. Look for `__Secure-next-auth.session-token` (or without `__Secure-` in development)
3. Verify the cookie has a future expiration date

**Possible causes**:

1. `NEXTAUTH_SECRET` is missing or too short
2. Browser is blocking cookies
3. Using HTTPS in `NEXTAUTH_URL` but running HTTP server

### "Redirected to /admin but see error"

This means authentication worked but the page threw an error. Check:

1. Server console for error messages
2. Browser console for JavaScript errors
3. Database connection is working

## Verify Database

Check that auth tables have data:

```bash
npm run db:studio
```

After signing in, you should see:

- **User** table: Your user record
- **Account** table: Resend provider entry
- **VerificationToken** table: Empty (tokens are deleted after use)

## Environment Variables Checklist

```bash
# Core Auth (Required)
✅ NEXTAUTH_SECRET (32+ characters)
✅ NEXTAUTH_URL (http://localhost:3000)

# Email Provider (Required)
✅ RESEND_API_KEY (re_...)
✅ EMAIL_FROM (noreply@yourdomain.com)

# Database (Required - from Story 0.5)
✅ DATABASE_URL
✅ DIRECT_URL

# Other (Already configured)
✅ All other variables from .env.example
```

## Next Steps

Once authentication is working:

1. **Read the full testing guide**: `/docs/AUTH_TESTING.md`
2. **Review implementation details**: `/docs/STORY_0.8_IMPLEMENTATION.md`
3. **Test edge cases**: Invalid emails, expired links, concurrent sessions
4. **Set up your first admin user**: Use database seed or manually assign role
5. **Move to Story 0.9**: Authorization and RBAC implementation

## Quick Reference

### Sign In (Client Component)

```tsx
import { signIn } from 'next-auth/react';

<button onClick={() => signIn('resend', { email: 'user@example.com' })}>Sign In</button>;
```

### Sign Out (Client Component)

```tsx
import { SignOutButton } from '@/components/auth/sign-out-button';

<SignOutButton>Sign Out</SignOutButton>;
```

### Check Auth (Server Component)

```tsx
import { auth } from '@/auth';

const session = await auth();
if (session) {
  // User is authenticated
}
```

### Require Auth (Server Component)

```tsx
import { requireAuth } from '@/lib/auth';

const session = await requireAuth(); // Throws if not authenticated
```

### Require Admin (Server Component)

```tsx
import { requireAdmin } from '@/lib/auth';

const session = await requireAdmin(); // Throws if not admin
```

## Support Resources

- **NextAuth.js v5 Docs**: https://authjs.dev
- **Resend Docs**: https://resend.com/docs
- **Prisma Docs**: https://www.prisma.io/docs
- **Project Epic**: `/docs/epics/epic-0-infrastructure.md`

## Success Criteria

You've successfully set up authentication when:

- ✅ You can sign in using a magic link
- ✅ You receive the email within a few seconds
- ✅ Session persists across page reloads
- ✅ /admin redirects to /login when not authenticated
- ✅ You can sign out successfully
- ✅ All tests in AUTH_TESTING.md pass

**Ready to move to Story 0.9: Authorization (RBAC)!**
