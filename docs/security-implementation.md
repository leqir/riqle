# Security Implementation Guide

## Overview

This document describes the security measures implemented in the Riqle platform to protect users, data, and the application infrastructure.

## Security Headers

All security headers are configured in `next.config.ts` and applied globally to all routes.

### 1. Strict-Transport-Security (HSTS)

**Purpose**: Force HTTPS connections, prevent SSL stripping attacks

**Configuration**:
```
Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
```

**What it does**:
- Forces HTTPS for 1 year (31536000 seconds)
- Applies to all subdomains (`includeSubDomains`)
- Eligible for browser preload list (`preload`)

**Browser behavior**:
- After first HTTPS visit, browser will automatically upgrade all HTTP requests to HTTPS
- Applies to current domain and all subdomains
- Prevents man-in-the-middle attacks during SSL negotiation

**To submit for HSTS preload list**:
1. Visit: https://hstspreload.org/
2. Enter your domain
3. Submit for inclusion in Chrome's HSTS preload list (used by all major browsers)

### 2. Content-Security-Policy (CSP)

**Purpose**: Prevent XSS, code injection, and unauthorized resource loading

**Configuration**:
```
Content-Security-Policy:
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline' https://js.stripe.com;
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: https: blob:;
  font-src 'self' data:;
  connect-src 'self' https://api.stripe.com;
  frame-src 'self' https://js.stripe.com https://hooks.stripe.com;
  object-src 'self';
  frame-ancestors 'none';
  base-uri 'self';
  form-action 'self';
```

**Policy breakdown**:

- **default-src 'self'**: Only load resources from same origin by default
- **script-src**: Allow scripts from same origin + Stripe + inline scripts (required for Next.js)
  - `'unsafe-eval'`: Required for Next.js development (can be removed in production)
  - `'unsafe-inline'`: Required for inline event handlers and styled-jsx
  - `https://js.stripe.com`: Stripe checkout scripts
- **style-src**: Allow styles from same origin + inline styles (styled-jsx, Tailwind)
- **img-src**: Allow images from same origin + data URIs + HTTPS URLs + blobs
  - Permissive to support user-uploaded images and external CDNs
- **font-src**: Allow fonts from same origin + data URIs
- **connect-src**: Allow fetch/XHR to same origin + Stripe API
- **frame-src**: Allow iframes from same origin + Stripe (payment forms)
- **object-src**: Only allow objects from same origin
- **frame-ancestors**: Prevent page from being embedded in iframes (clickjacking protection)
- **base-uri**: Restrict base tag to same origin
- **form-action**: Forms can only submit to same origin

**Violations**: CSP violations are logged to browser console. In production, configure CSP reporting:

```typescript
// Add to CSP header in production:
report-uri https://your-domain.com/api/csp-report;
```

### 3. X-Frame-Options

**Purpose**: Prevent clickjacking attacks

**Configuration**:
```
X-Frame-Options: SAMEORIGIN
```

**What it does**:
- Allows page to be embedded in iframes only from same origin
- Prevents malicious sites from embedding your pages in hidden iframes

**Note**: `frame-ancestors` in CSP provides same protection and is more flexible.

### 4. X-Content-Type-Options

**Purpose**: Prevent MIME-type sniffing attacks

**Configuration**:
```
X-Content-Type-Options: nosniff
```

**What it does**:
- Forces browser to respect declared Content-Type
- Prevents browser from "sniffing" content and executing it as JavaScript
- Mitigates XSS via uploaded files

### 5. Referrer-Policy

**Purpose**: Control what information is sent in Referer header

**Configuration**:
```
Referrer-Policy: strict-origin-when-cross-origin
```

**What it does**:
- Same-origin requests: Send full URL in Referer
- Cross-origin requests (HTTPS → HTTPS): Send origin only
- Cross-origin requests (HTTPS → HTTP): No Referer
- Protects user privacy while allowing analytics

### 6. Permissions-Policy

**Purpose**: Disable potentially dangerous browser features

**Configuration**:
```
Permissions-Policy: camera=(), microphone=(), geolocation=()
```

**What it does**:
- Disables camera access (not needed for Riqle)
- Disables microphone access (not needed for Riqle)
- Disables geolocation access (not needed for Riqle)
- Reduces attack surface by disabling unused features

## HTTPS Enforcement

### Vercel Deployment

Vercel automatically enforces HTTPS:
- All HTTP requests are automatically redirected to HTTPS
- Free SSL/TLS certificates via Let's Encrypt
- Automatic certificate renewal
- TLS 1.3 support

**No additional configuration needed** - Vercel handles it automatically.

### Custom Domains

When adding custom domains:
1. Add domain in Vercel dashboard
2. Configure DNS (A/CNAME records)
3. SSL certificate provisioned automatically (1-2 minutes)
4. HSTS header ensures future requests are HTTPS

### Development (localhost)

Development server runs on HTTP (http://localhost:3000) which is fine for local development. Test HTTPS features in staging/production.

## Authentication & Authorization

### Session Security

**Stripe Customer Portal Sessions**:
- Short-lived session tokens (1 hour)
- Tokens expire after use
- Cannot be reused or shared
- Tied to customer email

**Access Tokens** (Digital Downloads):
- Unique, cryptographically random tokens
- One-time use for sensitive operations
- Expiration after 24 hours
- Cannot be guessed or brute-forced

### Password Handling

**Current implementation**: Passwordless (email-based access)
- No passwords to store or hash
- No password resets needed
- Reduced risk of credential stuffing

**If passwords are added in future**:
- Use `bcrypt` with cost factor ≥ 12
- Never store passwords in plain text
- Implement rate limiting on login attempts
- Require strong passwords (8+ characters, mixed case, numbers)

## API Security

### Rate Limiting

**Recommendation**: Implement rate limiting for public APIs

```typescript
// Example with upstash/ratelimit
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, '10 s'), // 10 requests per 10 seconds
});

// In API route:
const { success } = await ratelimit.limit(ipAddress);
if (!success) {
  return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429 });
}
```

**Endpoints to rate limit**:
- `/api/checkout` - Prevent payment abuse
- `/api/products/*/download` - Prevent download abuse
- `/api/email/*` - Prevent email spam

### Input Validation

All user inputs are validated:

```typescript
// Example: Zod validation
import { z } from 'zod';

const CheckoutSchema = z.object({
  productId: z.string().cuid(),
  email: z.string().email(),
  quantity: z.number().int().min(1).max(10),
});

// In API route:
const result = CheckoutSchema.safeParse(req.body);
if (!result.success) {
  return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
}
```

**Validation rules**:
- Email addresses: Valid format, not disposable domains
- IDs: Valid CUID format
- Quantities: Integers, reasonable limits
- File uploads: Type checking, size limits

### SQL Injection Prevention

**Prisma ORM**: Automatically prevents SQL injection via parameterized queries

```typescript
// ✅ Safe - Prisma uses parameterized queries
const user = await prisma.user.findUnique({
  where: { email: userInput } // Automatically escaped
});

// ❌ Dangerous - Raw SQL without parameterization
const user = await prisma.$queryRawUnsafe(
  `SELECT * FROM User WHERE email = '${userInput}'` // SQL injection risk!
);

// ✅ Safe - Raw SQL with parameterization
const user = await prisma.$queryRaw`
  SELECT * FROM User WHERE email = ${userInput}
`; // Automatically parameterized
```

**Rule**: Never use `$queryRawUnsafe` unless absolutely necessary, and never with user input.

## Data Protection

### Sensitive Data Handling

**Environment variables** (`.env.local`):
```bash
# ✅ Correct: Never commit to git
DATABASE_URL=
STRIPE_SECRET_KEY=
EMAIL_API_KEY=

# ❌ Wrong: Never expose in client-side code
NEXT_PUBLIC_SECRET_KEY= # Exposed to browser!
```

**Storage**:
- Database: Encrypted at rest (PostgreSQL on Supabase/Vercel)
- Backups: Automated, encrypted backups
- Logs: Sanitize before logging (remove emails, tokens)

**Transmission**:
- All data transmitted over HTTPS (TLS 1.3)
- Stripe handles payment data (PCI compliant)
- Never log sensitive data in plain text

### Personal Data (GDPR/Privacy)

**Data collected**:
- Customer email (for order fulfillment)
- Purchase history (for download access)
- IP addresses (temporary, for fraud prevention)

**Data retention**:
- Order data: 7 years (tax compliance)
- Email logs: 30 days
- Failed job logs: 7 days
- Analytics: Aggregated, anonymized

**User rights**:
- Data export: Provide all user data in JSON format
- Data deletion: Delete user account and related data
- Contact: security@riqle.com for data requests

## Third-Party Services

### Stripe (Payment Processing)

**Security**:
- PCI DSS Level 1 compliant (highest level)
- Stripe.js prevents card data from touching your server
- Webhook signatures verify authenticity
- API keys never exposed to client

**Best practices**:
```typescript
// ✅ Use publishable key in client
const stripe = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

// ✅ Use secret key only on server
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// ✅ Verify webhook signatures
const sig = request.headers.get('stripe-signature');
const event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
```

### Resend (Email Service)

**Security**:
- API key stored in environment variable
- Used only on server side
- Rate limited to prevent abuse
- SPF/DKIM/DMARC configured for email authentication

### Sentry (Error Tracking)

**Security**:
- Scrubs sensitive data before sending
- Sanitizes PII (emails, IPs)
- Access restricted to development team
- 90-day data retention

**Configuration** (`sentry.client.config.ts`):
```typescript
Sentry.init({
  beforeSend(event) {
    // Sanitize sensitive data
    if (event.user) {
      delete event.user.email;
      delete event.user.ip_address;
    }
    return event;
  },
});
```

## Security.txt

**Location**: `/.well-known/security.txt` (RFC 9116)

**Purpose**: Provides security researchers with contact information

**Contents**:
- Contact email: security@riqle.com
- Response time: 48 hours
- Scope: What's in/out of scope for security reports
- Preferred language: English

**View**: https://riqle.com/.well-known/security.txt

## Monitoring & Incident Response

### Security Monitoring

**Sentry**: Tracks errors and exceptions
- Failed authentication attempts
- Unusual API activity
- Database errors
- Payment failures

**Stripe Dashboard**: Monitor for suspicious payment activity
- Unusual purchase patterns
- Failed payments
- Disputed charges

**Database**: Monitor for anomalies
- Unusual query patterns
- Slow queries (potential DoS)
- Failed queries (potential SQL injection attempts)

### Incident Response Plan

**If security incident is detected**:

1. **Assess** (0-15 minutes):
   - Identify affected systems
   - Determine severity
   - Gather initial logs

2. **Contain** (15-60 minutes):
   - Isolate affected systems
   - Disable compromised accounts
   - Block malicious IPs
   - Rotate compromised credentials

3. **Notify** (1-2 hours):
   - Inform affected users (if PII exposed)
   - Update status page
   - Report to authorities (if required by law)

4. **Investigate** (2-24 hours):
   - Root cause analysis
   - Review logs
   - Identify attack vector
   - Document timeline

5. **Remediate** (24-72 hours):
   - Patch vulnerabilities
   - Update security controls
   - Deploy fixes
   - Verify patch effectiveness

6. **Post-Mortem** (1 week):
   - Document incident
   - Update security procedures
   - Train team on prevention
   - Improve monitoring

**Contacts**:
- Security lead: security@riqle.com
- Stripe support: https://support.stripe.com/
- Vercel support: https://vercel.com/support

## Security Checklist

### Deployment Checklist

Before deploying to production:

- [ ] All environment variables set correctly
- [ ] HTTPS enforced (automatic on Vercel)
- [ ] Security headers configured (check headers())
- [ ] CSP policy tested and violations reviewed
- [ ] Stripe webhook signature verification implemented
- [ ] Rate limiting configured for public endpoints
- [ ] Error messages don't leak sensitive information
- [ ] Sentry configured to scrub PII
- [ ] Database backups automated
- [ ] Security.txt file deployed
- [ ] Admin routes require authentication
- [ ] API keys rotated from development

### Regular Security Maintenance

**Monthly**:
- [ ] Review Sentry error logs for security issues
- [ ] Check Stripe dashboard for suspicious activity
- [ ] Review failed job logs for patterns
- [ ] Update dependencies (`npm audit`, `npm outdated`)

**Quarterly**:
- [ ] Penetration testing or security audit
- [ ] Review and update security policies
- [ ] Rotate API keys and secrets
- [ ] Review user access permissions

**Annually**:
- [ ] Third-party security audit
- [ ] Update security.txt expiration date
- [ ] Review and update incident response plan
- [ ] Security training for team

## Vulnerability Disclosure

Found a security issue? We appreciate responsible disclosure.

**Report to**: security@riqle.com

**Please include**:
- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Proof-of-concept (if applicable)

**What to expect**:
- Acknowledgment within 48 hours
- Regular updates on investigation
- Credit in acknowledgments (if desired)
- No legal action for good-faith research

**Out of scope**:
- Social engineering attacks
- Physical attacks
- Denial of Service (DoS)
- Spam or brute-force attacks
- Third-party services (Stripe, Vercel, etc.)

## Additional Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Next.js Security Headers](https://nextjs.org/docs/app/building-your-application/configuring/headers)
- [Content Security Policy Reference](https://content-security-policy.com/)
- [RFC 9116: security.txt](https://www.rfc-editor.org/rfc/rfc9116.html)
- [Stripe Security Best Practices](https://stripe.com/docs/security/guide)
