# Security Principles

## Core Philosophy

Security should be:

- **Deliberate:** Every security decision is intentional
- **Boring:** Proven patterns, not clever hacks
- **Invisible:** Users never think about it

## Guiding Principles

### 1. Minimize Attack Surface

- Fewer features = fewer vulnerabilities
- Remove unused code and dependencies
- Disable unnecessary services
- No public API (admin only)
- No user registration (email-only auth)
- No webhooks except Stripe

### 2. Least Privilege Everywhere

- Users get minimum permissions needed
- Default deny, explicit allow
- Time-limited access grants
- Short-lived sessions (1 hour)
- Re-authentication for sensitive actions

### 3. Explicit Trust Boundaries

**Public (Untrusted)**
- Internet → Application
- Strictest validation
- Aggressive sanitization
- Rate limiting enforced
- All inputs are hostile until proven otherwise

**Authenticated (Semi-Trusted)**
- Customer → Application
- Strict validation
- Standard sanitization
- Rate limiting enforced
- Verify entitlements before access

**Admin (Trusted but Verified)**
- Admin → Application
- Strict validation (no exceptions)
- Standard sanitization
- Rate limiting enforced
- Re-authentication for destructive actions
- All actions logged

**Internal (Trusted)**
- Application → Application
- Minimal validation (data already validated)
- No sanitization
- No rate limiting
- Assumes clean data

### 4. Secure-by-Default

- HTTPS everywhere (enforced)
- Secure cookies by default (HttpOnly, Secure, SameSite=lax)
- Strict CSP headers
- Input validation always on
- Server-side validation (never trust client)
- Database encryption at rest

## Banned Patterns

### Never Do This

- ❌ Roll your own authentication
- ❌ Store sensitive data unnecessarily
- ❌ "We'll secure it later" decisions
- ❌ Trust client-side validation
- ❌ Store plaintext secrets
- ❌ Long-lived tokens without rotation
- ❌ Client-only security checks
- ❌ String concatenation for SQL queries
- ❌ Store passwords in plain text
- ❌ Expose admin routes without authentication

### Always Do This

- ✅ Use proven auth providers (NextAuth.js)
- ✅ Minimize data collection
- ✅ Secure from day one
- ✅ Server-side validation always
- ✅ Environment variables for secrets
- ✅ Short-lived sessions with re-auth
- ✅ Server-side authorization
- ✅ Parameterized queries (Prisma ORM)
- ✅ Hash passwords with bcrypt (if needed)
- ✅ Protect admin routes with middleware

## Security Posture Statement

"We protect what matters using proven, boring security practices. We collect minimal data, secure it properly, and are transparent about our approach. We're not paranoid, but we're not careless."

## Data Philosophy

**If you don't collect it, you can't leak it.**

- Only collect email (required for delivery)
- No names (not needed for digital products)
- No phone numbers (not needed)
- No addresses (digital delivery)
- No demographics (not needed)
- No tracking data (respect privacy)
- No behavioral analytics (not needed)

## Threat Model

### What We Protect Against

**High Priority (Must Prevent)**
- SQL injection
- XSS (Cross-Site Scripting)
- CSRF (Cross-Site Request Forgery)
- Authentication bypass
- Authorization bypass
- Privilege escalation
- Data exfiltration
- Payment fraud

**Medium Priority (Should Prevent)**
- Rate limit abuse
- Email enumeration
- Session hijacking
- Clickjacking
- Open redirects

**Low Priority (Monitor)**
- Brute force attacks (mitigated by magic links)
- DoS attacks (mitigated by infrastructure)
- Social engineering (education)

### What We Explicitly Don't Protect Against

- Physical attacks (not in scope)
- Targeted APT (advanced persistent threats)
- Zero-day exploits in dependencies (monitor updates)
- Social engineering (user responsibility)

## Security Checklist (New Features)

Before shipping any feature, verify:

### Authentication & Authorization

- [ ] Authentication required where needed?
- [ ] Authorization checks server-side?
- [ ] Least privilege principle applied?
- [ ] Re-authentication for sensitive actions?
- [ ] No client-only security checks?

### Input Validation

- [ ] All inputs validated server-side?
- [ ] Schema validation in place (Zod)?
- [ ] Sanitization for user content?
- [ ] File upload validation (type, size)?
- [ ] URL validation for redirects?

### Data Protection

- [ ] Minimal data collection?
- [ ] No unnecessary PII stored?
- [ ] Secrets in environment variables?
- [ ] HTTPS for all connections?
- [ ] Sensitive data not logged?

### Access Control

- [ ] No client-only security?
- [ ] Entitlement checks server-side?
- [ ] No privilege escalation possible?
- [ ] Default deny enforced?
- [ ] Admin routes protected?

### Privacy

- [ ] Privacy policy updated?
- [ ] User can delete their data?
- [ ] No hidden data practices?
- [ ] Analytics privacy-compliant?
- [ ] Data retention documented?

### Error Handling

- [ ] No sensitive data in errors?
- [ ] No stack traces to users?
- [ ] Errors logged securely?
- [ ] Graceful failure modes?
- [ ] User-friendly error messages?

### Testing

- [ ] Security tests written?
- [ ] Privilege escalation tests?
- [ ] Input validation tests?
- [ ] XSS/injection attempts tested?
- [ ] Rate limiting tested?

## Incident Response Philosophy

**When (not if) incidents occur:**

1. **Remain Calm**: Panic makes things worse
2. **Act Quickly**: Contain the issue immediately
3. **Be Transparent**: Inform affected users promptly
4. **Learn**: Document and improve
5. **No Blame**: Focus on systems, not people

## Review Schedule

- **Daily**: Monitor error logs and security alerts
- **Weekly**: Review failed authentication attempts
- **Monthly**: Dependency security audit (`npm audit`)
- **Quarterly**: Review third-party integrations, rotate credentials
- **Annually**: Penetration testing, security audit

## Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [OWASP Cheat Sheets](https://cheatsheetseries.owasp.org/)
- [Next.js Security](https://nextjs.org/docs/app/building-your-application/configuring/headers)
- [Stripe Security Guide](https://stripe.com/docs/security/guide)
- [Web Security Academy](https://portswigger.net/web-security)

---

Last Updated: 2024-01-27
Next Review: 2024-02-27
