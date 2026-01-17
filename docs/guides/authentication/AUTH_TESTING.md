# Authentication Testing Guide

This guide covers testing the NextAuth.js v5 magic link authentication implementation for Story 0.8.

## Prerequisites

1. **Database Setup**: Ensure the database is running and migrations are applied

   ```bash
   npm run db:push
   ```

2. **Environment Variables**: Ensure these are set in `.env`:

   ```
   NEXTAUTH_SECRET=your-secret-here-min-32-chars-required
   NEXTAUTH_URL=http://localhost:3000
   RESEND_API_KEY=re_your_api_key_here
   EMAIL_FROM=noreply@riqle.com
   ```

3. **Seed Initial Admin User** (if needed):
   ```bash
   npm run db:seed
   ```

## Test Scenarios

### 1. Magic Link Flow (End-to-End)

**Objective**: Verify the complete passwordless authentication flow.

**Steps**:

1. Start the development server: `npm run dev`
2. Navigate to http://localhost:3000
3. Click "Sign In" button
4. Enter your email address (use a real email you have access to)
5. Click "Continue with Email"
6. Check your email inbox (and spam folder)
7. Click the magic link in the email
8. Verify you're redirected to the homepage and see "Signed in as [email]"

**Expected Results**:

- ✅ Email is sent within a few seconds
- ✅ Magic link redirects to the application
- ✅ Session is created successfully
- ✅ User sees authenticated state on homepage
- ✅ User can access /admin page
- ✅ Magic link can only be used once (reusing shows error)

### 2. Session Persistence

**Objective**: Verify sessions persist across page reloads and tabs.

**Steps**:

1. Sign in using magic link
2. Refresh the page (Cmd+R / Ctrl+R)
3. Verify you're still signed in
4. Open a new tab to http://localhost:3000
5. Verify you're signed in in the new tab
6. Close all tabs and reopen http://localhost:3000
7. Verify you're still signed in (session should last 30 days)

**Expected Results**:

- ✅ Session persists across page refreshes
- ✅ Session is shared across browser tabs
- ✅ Session persists after closing and reopening browser
- ✅ HttpOnly cookies are set (check DevTools > Application > Cookies)

### 3. Protected Routes

**Objective**: Verify middleware protects authenticated routes.

**Steps**:

1. Sign out if signed in
2. Navigate to http://localhost:3000/admin
3. Verify you're redirected to /login
4. Sign in using magic link
5. Verify you're redirected back to /admin after authentication
6. Verify you can see the admin dashboard with your session info

**Expected Results**:

- ✅ Unauthenticated users cannot access /admin
- ✅ Redirect to /login preserves callback URL
- ✅ After authentication, user is redirected to original destination
- ✅ Authenticated users can access /admin

### 4. Sign Out Flow

**Objective**: Verify sign out clears session completely.

**Steps**:

1. Sign in using magic link
2. Navigate to http://localhost:3000/admin
3. Click "Sign Out" button
4. Verify you're redirected to the homepage
5. Verify you see "Not signed in" state
6. Try to access /admin again
7. Verify you're redirected to /login

**Expected Results**:

- ✅ Sign out clears session
- ✅ User is redirected to homepage
- ✅ Session cookies are removed
- ✅ Protected routes are no longer accessible
- ✅ User must sign in again to access protected content

### 5. Email Validation

**Objective**: Verify invalid email addresses are rejected.

**Steps**:

1. Navigate to /login
2. Try to submit without entering an email
3. Try to submit with invalid email formats:
   - `notanemail`
   - `test@`
   - `@example.com`
   - `test @example.com`
4. Verify error messages are shown
5. Enter a valid email and verify it's accepted

**Expected Results**:

- ✅ Empty email shows validation error
- ✅ Invalid email formats show validation error
- ✅ Valid email is accepted and magic link is sent

### 6. Expired/Invalid Magic Link

**Objective**: Verify expired or already-used magic links are rejected.

**Steps**:

1. Sign in using a magic link
2. Try to use the same magic link again
3. Verify you see an error page with "Verification Failed"
4. Verify error message explains the link is no longer valid

**Expected Results**:

- ✅ Reused magic link shows error
- ✅ User is directed to /auth/error
- ✅ Clear error message is displayed
- ✅ User can request a new magic link

### 7. Concurrent Sessions

**Objective**: Verify multiple devices/browsers can have separate sessions.

**Steps**:

1. Sign in on Chrome
2. Sign in on Firefox (or incognito mode) with the same email
3. Verify both sessions are active
4. Sign out from Chrome
5. Verify Firefox session is still active

**Expected Results**:

- ✅ Multiple sessions can exist for the same user
- ✅ Signing out from one device doesn't affect others
- ✅ Each browser/device has its own session token

### 8. Role-Based Access (Preparation)

**Objective**: Verify role data is correctly attached to session.

**Steps**:

1. Sign in as a user
2. Navigate to /admin
3. Check the "Session Information" section
4. Verify the "Role" field shows a role (e.g., "customer", "admin")
5. Check the browser console for any errors

**Expected Results**:

- ✅ Role is fetched from database
- ✅ Role is included in session object
- ✅ Role is displayed on admin page
- ✅ No errors in console

## Database Verification

You can verify the authentication tables are working correctly using Prisma Studio:

```bash
npm run db:studio
```

Check the following tables:

- **User**: Should have entries for signed-in users
- **Account**: Should have Resend provider entries
- **Session**: May be empty if using JWT strategy
- **VerificationToken**: Should have entries for magic links (cleaned up after use)

## Troubleshooting

### Magic Link Not Received

1. Check spam/junk folder
2. Verify `RESEND_API_KEY` is valid
3. Check Resend dashboard for delivery logs
4. Verify `EMAIL_FROM` domain is verified in Resend
5. Check server logs for email sending errors

### Session Not Persisting

1. Check browser DevTools > Application > Cookies
2. Verify `__Secure-next-auth.session-token` cookie exists
3. Check cookie expiration date
4. Verify `NEXTAUTH_SECRET` is set and consistent
5. Clear cookies and try again

### Redirects Not Working

1. Verify `NEXTAUTH_URL` matches your development URL
2. Check middleware.ts is not blocking auth routes
3. Check browser console for JavaScript errors
4. Verify middleware matcher excludes `/api/auth/*`

### TypeScript Errors

1. Run `npm run typecheck` to verify
2. Check `types/next-auth.d.ts` is being picked up
3. Verify `@auth/prisma-adapter` is installed
4. Restart TypeScript server in your IDE

## Security Checklist

- ✅ `NEXTAUTH_SECRET` is at least 32 characters
- ✅ `NEXTAUTH_SECRET` is different in each environment
- ✅ Session cookies are HttpOnly
- ✅ Session cookies use Secure flag in production
- ✅ Magic links expire after 24 hours
- ✅ Magic links can only be used once
- ✅ Rate limiting is planned (Story 0.16)

## Performance Checklist

- ✅ Database queries are indexed (User.email, Session.sessionToken)
- ✅ JWT strategy used (no database lookup on every request)
- ✅ Role is cached in JWT token
- ✅ Middleware excludes static files and images

## Next Steps

After authentication is verified:

1. Implement Story 0.9: Authorization (RBAC)
2. Add rate limiting to login endpoint (Story 0.16)
3. Set up email templates with React Email
4. Add Sentry error tracking for auth failures
5. Implement forgot password flow (if needed)
