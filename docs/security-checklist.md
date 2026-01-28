# Security Checklist

## Pre-Deployment Security Verification

Use this checklist before deploying to production to verify all security measures are in place.

### ✅ HTTPS & Transport Security

- [x] HTTPS enforced automatically by Vercel
- [x] HSTS header configured with max-age=31536000
- [x] includeSubDomains enabled in HSTS
- [x] preload directive enabled in HSTS
- [ ] Domain submitted to HSTS preload list (https://hstspreload.org/)

### ✅ Security Headers

- [x] Content-Security-Policy (CSP) configured
- [x] X-Frame-Options: SAMEORIGIN
- [x] X-Content-Type-Options: nosniff
- [x] Referrer-Policy: strict-origin-when-cross-origin
- [x] Permissions-Policy configured (camera, microphone, geolocation disabled)
- [x] All headers verified in production

**Verify**: Check headers with:
```bash
curl -I https://riqle.com
```

### ✅ Content Security Policy

- [x] default-src restricted to 'self'
- [x] script-src allows Stripe only
- [x] style-src allows inline styles (required for styled-jsx)
- [x] img-src allows HTTPS and data URIs
- [x] connect-src allows Stripe API
- [x] frame-src allows Stripe only
- [x] frame-ancestors set to 'none' (clickjacking protection)
- [ ] CSP violations monitored (optional: add report-uri)

**Verify**: Test CSP doesn't block legitimate resources

### ✅ Authentication & Authorization

- [x] Passwordless authentication (email-based)
- [x] Access tokens are cryptographically random
- [x] Access tokens expire after 24 hours
- [x] Stripe sessions are short-lived (1 hour)
- [x] Admin routes require authentication
- [ ] Rate limiting implemented on login/auth endpoints

### ✅ API Security

- [x] Input validation on all API routes
- [x] Stripe webhook signature verification
- [x] SQL injection prevention via Prisma ORM
- [x] Error messages don't leak sensitive data
- [x] API errors handled gracefully
- [ ] Rate limiting on public endpoints (checkout, download)
- [ ] CORS configured appropriately

**Verify**: Test API endpoints with invalid inputs

### ✅ Data Protection

- [x] Environment variables not committed to git
- [x] .env.local in .gitignore
- [x] Database connection uses SSL/TLS
- [x] Sensitive data not logged
- [x] PII scrubbed before sending to Sentry
- [x] Payment data handled by Stripe (PCI compliant)

**Verify**: Check logs don't contain sensitive data

### ✅ Third-Party Services

**Stripe (Payments)**:
- [x] Secret key stored in environment variable
- [x] Publishable key used in client
- [x] Webhook signatures verified
- [x] Test mode vs production mode configured correctly

**Resend (Email)**:
- [x] API key stored in environment variable
- [x] Used only on server side
- [x] SPF/DKIM/DMARC configured

**Sentry (Error Tracking)**:
- [x] PII scrubbing enabled
- [x] beforeSend configured to sanitize data
- [x] Only server-side errors include full context

### ✅ Security Disclosure

- [x] security.txt file created
- [x] security.txt accessible at /.well-known/security.txt
- [x] Contact email configured: security@riqle.com
- [x] Expiration date set (update annually)
- [x] Security link in footer

**Verify**: Visit https://riqle.com/.well-known/security.txt

### ✅ Dependency Security

- [ ] Run `npm audit` and fix critical/high vulnerabilities
- [ ] Review `npm outdated` for security updates
- [ ] Dependabot enabled on GitHub
- [ ] Dependencies updated regularly (monthly)

**Run**:
```bash
npm audit
npm audit fix
npm outdated
```

### ✅ Database Security

- [x] Database indexes optimize queries
- [x] Query timeouts prevent hanging requests
- [x] Connection pooling configured
- [x] Prepared statements prevent SQL injection
- [x] Database backups automated
- [ ] Database access restricted to application only

### ✅ Monitoring & Logging

- [x] Sentry configured for error tracking
- [x] Failed jobs logged and monitored
- [x] Stripe events logged
- [x] Database health check endpoint: /api/health/db
- [x] Reliability monitoring: /api/admin/reliability
- [ ] Security alerts configured (unauthorized access, unusual patterns)

**Verify**: Check monitoring dashboards

### ✅ Privacy & Compliance

- [ ] Privacy policy published
- [ ] Terms & conditions published
- [ ] Cookie policy published (if using analytics cookies)
- [ ] Data retention policy documented
- [ ] User data export capability implemented
- [ ] User data deletion capability implemented
- [ ] GDPR compliance verified (if serving EU users)

### ✅ Code Security

- [x] No secrets hardcoded in source code
- [x] No API keys in client-side code
- [x] Authentication required for admin routes
- [x] User input validated and sanitized
- [x] File uploads restricted and validated
- [x] Dangerous functions avoided (eval, innerHTML with user input)

**Verify**: Code review for security issues

### ✅ Infrastructure

- [x] Vercel environment variables configured
- [x] Production environment variables different from development
- [x] Database credentials rotated from defaults
- [ ] Backup and recovery tested
- [ ] Incident response plan documented

## Production Deployment Checklist

Before deploying to production:

1. **Environment Variables**
   - [ ] All environment variables set in Vercel
   - [ ] DATABASE_URL uses production database
   - [ ] STRIPE_SECRET_KEY uses live key (not test)
   - [ ] NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY uses live key
   - [ ] RESEND_API_KEY configured
   - [ ] SENTRY_DSN configured

2. **Security Headers**
   - [ ] Verify headers work in production
   - [ ] Test CSP doesn't block legitimate content
   - [ ] Check security score: https://securityheaders.com/

3. **SSL/TLS**
   - [ ] Custom domain SSL certificate active
   - [ ] HSTS header working
   - [ ] All redirects use HTTPS

4. **Testing**
   - [ ] Security scan completed: https://observatory.mozilla.org/
   - [ ] Penetration testing completed (if required)
   - [ ] Vulnerability scan completed

5. **Monitoring**
   - [ ] Sentry alerts configured
   - [ ] Uptime monitoring configured
   - [ ] Database health monitoring active

6. **Documentation**
   - [ ] Security documentation up to date
   - [ ] Incident response plan ready
   - [ ] Team trained on security procedures

## Monthly Security Maintenance

Perform these checks monthly:

- [ ] Review Sentry error logs for security issues
- [ ] Check Stripe dashboard for suspicious activity
- [ ] Run `npm audit` and update dependencies
- [ ] Review failed job logs for patterns
- [ ] Check uptime and performance metrics
- [ ] Verify backups are working
- [ ] Review access logs for anomalies

## Quarterly Security Review

Perform these tasks quarterly:

- [ ] Review and update security policies
- [ ] Rotate API keys and secrets
- [ ] Review user access permissions
- [ ] Test incident response procedures
- [ ] Security training for team
- [ ] Review third-party service security updates
- [ ] Penetration testing or security audit

## Annual Security Tasks

Perform these tasks annually:

- [ ] Third-party security audit
- [ ] Update security.txt expiration date
- [ ] Review and update incident response plan
- [ ] Comprehensive security training
- [ ] Review compliance requirements (GDPR, PCI, etc.)
- [ ] Update security documentation

## Security Incident Response

If security incident detected:

1. **Assess** (0-15 min)
   - Identify affected systems
   - Determine severity
   - Gather initial logs

2. **Contain** (15-60 min)
   - Isolate affected systems
   - Disable compromised accounts
   - Block malicious IPs
   - Rotate compromised credentials

3. **Notify** (1-2 hours)
   - Inform affected users (if PII exposed)
   - Update status page
   - Report to authorities (if required)

4. **Investigate** (2-24 hours)
   - Root cause analysis
   - Review logs
   - Identify attack vector
   - Document timeline

5. **Remediate** (24-72 hours)
   - Patch vulnerabilities
   - Update security controls
   - Deploy fixes
   - Verify effectiveness

6. **Post-Mortem** (1 week)
   - Document incident
   - Update security procedures
   - Train team
   - Improve monitoring

## Tools & Resources

**Security Testing**:
- [Security Headers](https://securityheaders.com/) - Check security headers
- [Mozilla Observatory](https://observatory.mozilla.org/) - Security scan
- [SSL Labs](https://www.ssllabs.com/ssltest/) - SSL/TLS configuration test
- [HSTS Preload](https://hstspreload.org/) - Submit domain for HSTS preloading

**Dependency Security**:
- `npm audit` - Check for known vulnerabilities
- [Snyk](https://snyk.io/) - Continuous dependency monitoring
- [Dependabot](https://github.com/dependabot) - Automated dependency updates

**Monitoring**:
- [Sentry](https://sentry.io/) - Error tracking
- [UptimeRobot](https://uptimerobot.com/) - Uptime monitoring
- [Vercel Analytics](https://vercel.com/analytics) - Performance monitoring

**Learning Resources**:
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Next.js Security](https://nextjs.org/docs/app/building-your-application/configuring/headers)
- [Stripe Security Guide](https://stripe.com/docs/security/guide)
- [Web Security Academy](https://portswigger.net/web-security)

## Contact

**Security Issues**: security@riqle.com
**Response Time**: 48 hours
**Responsible Disclosure**: We appreciate good-faith security research

---

Last Updated: 2024-01-27
Next Review: 2024-02-27
