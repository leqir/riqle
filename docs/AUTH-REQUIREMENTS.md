# Complete Authentication System Requirements

## Overview
A comprehensive authentication system with separate signup and login flows, password management, email verification, and user session management.

---

## 1. User Flows

### 1.1 Sign Up Flow (New Users)
**Entry Point:** "Get Started" button in header → `/signup`

**Steps:**
1. User clicks "Get Started" button
2. Redirected to `/signup` page
3. User enters:
   - Email address
   - Password (min 8 characters, 1 uppercase, 1 lowercase, 1 number)
   - Confirm password
   - Optional: Name
4. Submit form
5. Account created in database (emailVerified = false)
6. Verification email sent to user
7. Success screen: "Check your email to verify your account"
8. User clicks verification link in email
9. Email verified (emailVerified = true)
10. Redirected to login page with success message
11. User logs in with credentials

**Validation:**
- Email must be valid format
- Email must not already exist
- Password must meet requirements
- Passwords must match

**Error Handling:**
- Display inline errors for validation
- Show error if email already exists
- Handle network errors gracefully

---

### 1.2 Login Flow (Existing Users)
**Entry Point:** "Sign In" button in header → `/login`

**Steps:**
1. User clicks "Sign In" button
2. Redirected to `/login` page
3. User enters:
   - Email address
   - Password
4. Submit form
5. Credentials validated against database
6. Check if email is verified
7. If verified: Create session and redirect to callback URL or home
8. If not verified: Show message "Please verify your email first" with resend option

**Validation:**
- Email must be valid format
- Both fields required

**Error Handling:**
- Show "Invalid email or password" (don't reveal which is wrong for security)
- Handle unverified email accounts
- Show forgot password link

---

### 1.3 Forgot Password Flow
**Entry Point:** "Forgot password?" link on login page → `/forgot-password`

**Steps:**
1. User clicks "Forgot password?" link
2. Redirected to `/forgot-password` page
3. User enters email address
4. Submit form
5. Check if user exists in database
6. Generate password reset token (expires in 1 hour)
7. Send reset email with token link
8. Success screen: "Check your email for reset instructions"
9. User clicks reset link in email
10. Redirected to `/reset-password?token=xxx`
11. Token validated (not expired, not used)
12. User enters new password + confirm
13. Password updated in database
14. Token marked as used
15. Success message: "Password updated successfully"
16. Redirect to login page

**Security:**
- Always show success message even if email doesn't exist (prevent email enumeration)
- Token expires after 1 hour
- Token can only be used once
- Token must be cryptographically secure

---

### 1.4 Logged In Experience
**Header Changes:**

**Before Login:**
- "Sign In" button → `/login`
- "Get Started" button → `/signup`

**After Login:**
- User avatar/initial (first letter of name or email)
- User's first name or "Account"
- Dropdown menu with:
  - Email address (display only)
  - "My Account" → `/account`
  - "My Purchases" → `/account/purchases`
  - "Admin Panel" → `/admin` (if role = admin)
  - Divider
  - "Sign Out" button

**Session:**
- 30-day JWT session
- Auto-refresh on activity
- Secure httpOnly cookies
- CSRF protection

---

## 2. Database Schema Requirements

### 2.1 User Model (Already exists - verify fields)
```prisma
model User {
  id               String   @id @default(cuid())
  email            String   @unique
  name             String?
  password         String   // Hashed with bcrypt
  image            String?
  emailVerified    DateTime?
  createdAt        DateTime @default(now())
  updatedAt        DateTime @updatedAt
  // ... existing relations
}
```

### 2.2 VerificationToken Model (Already exists)
```prisma
model VerificationToken {
  identifier String   // email address
  token      String   @unique
  expires    DateTime

  @@unique([identifier, token])
}
```

### 2.3 PasswordResetToken Model (NEW - needs to be created)
```prisma
model PasswordResetToken {
  id        String   @id @default(cuid())
  userId    String
  token     String   @unique
  expires   DateTime
  used      Boolean  @default(false)
  createdAt DateTime @default(now())
  User      User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([token])
  @@index([userId])
}
```

---

## 3. Technical Implementation

### 3.1 Authentication Provider
- **Current:** Resend magic link (passwordless)
- **Change to:** Credentials provider with bcrypt hashing
- **Keep:** NextAuth v5 with Prisma adapter
- **Add:** Email verification requirement before login

### 3.2 Pages to Create/Update

**Create New:**
- `/src/app/(auth)/signup/page.tsx` - Sign up form
- `/src/app/(auth)/forgot-password/page.tsx` - Request reset form
- `/src/app/(auth)/reset-password/page.tsx` - Reset password form
- `/src/app/(auth)/verify-email/page.tsx` - Email verification handler

**Update Existing:**
- `/src/app/(auth)/login/page.tsx` - Convert to password-based login
- `/src/components/infrastructure/navigation/header.tsx` - Already done (shows user dropdown)

### 3.3 API Routes to Create

**Authentication:**
- `POST /api/auth/signup` - Create account + send verification
- `POST /api/auth/verify-email` - Verify email token
- `POST /api/auth/forgot-password` - Send reset email
- `POST /api/auth/reset-password` - Reset password with token
- `POST /api/auth/resend-verification` - Resend verification email

**NextAuth Endpoints (already exist):**
- `/api/auth/signin` - NextAuth credentials login
- `/api/auth/signout` - Logout
- `/api/auth/session` - Get session

### 3.4 Email Templates

**Create:**
- `src/emails/verification-email.tsx` - Email verification template
- `src/emails/password-reset-email.tsx` - Password reset template
- `src/emails/password-changed-email.tsx` - Confirmation after reset

---

## 4. Security Requirements

### 4.1 Password Security
- Minimum 8 characters
- Must contain: uppercase, lowercase, number
- Hashed with bcrypt (10 rounds)
- Never stored in plain text
- Never logged or exposed in errors

### 4.2 Token Security
- Verification tokens: 24-hour expiry
- Reset tokens: 1-hour expiry
- Cryptographically secure (crypto.randomBytes)
- One-time use only
- Invalidated after use

### 4.3 Rate Limiting
- Login: 5 attempts per 15 minutes
- Signup: 3 attempts per hour per IP
- Password reset: 3 requests per hour per email
- Email verification: 5 resend attempts per hour

### 4.4 Session Security
- httpOnly cookies
- secure flag in production
- SameSite=Lax
- 30-day expiry with sliding window
- CSRF protection enabled

---

## 5. User Experience Requirements

### 5.1 Form Validation
- Real-time validation on blur
- Clear error messages
- Inline error display
- Disabled submit during loading
- Loading states with spinners

### 5.2 Success States
- Clear success messages
- Automatic redirects where appropriate
- Email sent confirmations
- Visual feedback for all actions

### 5.3 Accessibility
- Proper form labels
- ARIA attributes
- Keyboard navigation
- Screen reader support
- Error announcements

### 5.4 Mobile Responsive
- Works on all screen sizes
- Touch-friendly buttons
- Proper input types (email, password)
- No horizontal scroll

---

## 6. Testing Requirements

### 6.1 Unit Tests
- Password hashing functions
- Token generation functions
- Email validation
- Password validation

### 6.2 Integration Tests
- **Sign Up Flow:**
  - ✅ Create account with valid data
  - ✅ Reject duplicate email
  - ✅ Reject invalid password
  - ✅ Send verification email
  - ✅ Verify email token

- **Login Flow:**
  - ✅ Login with valid credentials
  - ✅ Reject invalid credentials
  - ✅ Reject unverified email
  - ✅ Create session on success

- **Password Reset Flow:**
  - ✅ Generate reset token
  - ✅ Send reset email
  - ✅ Validate token
  - ✅ Update password
  - ✅ Invalidate token after use
  - ✅ Reject expired token

### 6.3 End-to-End Tests
- Complete signup → verify → login flow
- Forgot password → reset → login flow
- Logout flow
- Session persistence
- Redirect after login

---

## 7. Implementation Phases

### Phase 1: Database & Auth Config (Priority: Critical)
1. Add PasswordResetToken model to schema
2. Run Prisma migration
3. Update auth.config.ts for credentials provider
4. Implement password hashing utilities
5. Implement token generation utilities

### Phase 2: Core Pages (Priority: Critical)
1. Create signup page with form
2. Update login page for password auth
3. Create forgot password page
4. Create reset password page
5. Create email verification page

### Phase 3: API Routes (Priority: Critical)
1. POST /api/auth/signup
2. POST /api/auth/verify-email
3. POST /api/auth/forgot-password
4. POST /api/auth/reset-password
5. POST /api/auth/resend-verification

### Phase 4: Email Templates (Priority: High)
1. Verification email template
2. Password reset email template
3. Password changed confirmation
4. Welcome email (optional)

### Phase 5: Header Updates (Priority: High)
1. Update header to show user dropdown (DONE ✅)
2. Update "Get Started" → `/signup`
3. Update "Sign In" → `/login`

### Phase 6: Testing (Priority: Critical)
1. Manual testing of all flows
2. Backend integration tests
3. Fix any bugs found
4. Load testing (rate limits)

### Phase 7: Polish (Priority: Medium)
1. Error handling improvements
2. Loading states
3. Animations
4. Success messages
5. Accessibility audit

---

## 8. Success Criteria

✅ User can sign up with email + password
✅ User receives verification email
✅ User can verify email via link
✅ User can log in with verified account
✅ User cannot log in without verification
✅ User can request password reset
✅ User can reset password via email link
✅ Header shows user info when logged in
✅ Header shows sign in/sign up when logged out
✅ Session persists across page refreshes
✅ User can log out successfully
✅ All forms have proper validation
✅ All error states handled gracefully
✅ Mobile responsive
✅ Accessible
✅ Secure (no vulnerabilities)

---

## 9. Environment Variables Required

```bash
# NextAuth
NEXTAUTH_SECRET=<secret>
NEXTAUTH_URL=http://localhost:3000

# Database
DATABASE_URL=<postgres-url>

# Email (Resend)
RESEND_API_KEY=<api-key>
EMAIL_FROM=noreply@riqle.com.au

# Optional: Rate Limiting
REDIS_URL=<redis-url>  # If implementing rate limiting
```

---

## 10. Dependencies to Install

```bash
# Already installed (verify):
- next-auth
- @prisma/client
- prisma
- resend
- react-hook-form
- zod

# Need to install:
npm install bcryptjs
npm install @types/bcryptjs --save-dev
```

---

## 11. Migration from Current System

**Current State:**
- Magic link authentication (passwordless)
- Email-only login
- No password field
- Header already shows user dropdown ✅

**Migration Steps:**
1. Add password field to User model (nullable initially)
2. Keep magic link as backup option
3. Implement password-based auth
4. Gradually deprecate magic link
5. Eventually make password required

**OR - Clean Break (Recommended):**
1. No existing users yet (early development)
2. Drop VerificationToken table
3. Implement full password-based system
4. Test thoroughly
5. Launch with complete auth

---

## 12. Documentation Required

1. **User Guide:**
   - How to sign up
   - How to log in
   - How to reset password
   - Troubleshooting

2. **Developer Guide:**
   - Auth architecture overview
   - How to protect routes
   - How to access user session
   - How to test auth flows

3. **API Documentation:**
   - All auth endpoints
   - Request/response formats
   - Error codes
   - Rate limits

---

## Next Steps

1. Review and approve this requirements document
2. Confirm approach (migration vs clean break)
3. Begin Phase 1: Database & Auth Config
4. Systematic implementation with testing
5. QA and bug fixes
6. Production deployment

---

**Document Version:** 1.0
**Created:** 2026-01-21
**Status:** Pending Approval
