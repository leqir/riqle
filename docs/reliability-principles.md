# Reliability Principles

## For Employers

The site should feel:

- Professional and solid
- Never broken or slow
- Trustworthy at first glance

## For Customers

The purchasing experience should be:

- Fast and confident
- Never risky or uncertain
- Boringly reliable

## For Operator (You)

The system should:

- Alert you before users complain
- Fail gracefully when issues occur
- Remain stable under unexpected load
- Never embarrass you

## Core Principles

### 1. Fast by Default

Every page should feel instant. Static generation for all public content, minimal JavaScript on critical pages, lazy load non-critical resources.

### 2. Simple Beats Clever

Prefer boring, proven solutions over cutting-edge tech. Server-side rendering > client hydration, CSS > JavaScript for UI, HTML forms > React forms (where possible).

### 3. Less JavaScript

Ship minimal JavaScript to the browser. Homepage < 50KB total JS, Content pages < 30KB total JS, Admin pages acceptable to be heavier.

### 4. Graceful Degradation

Non-critical services should fail silently without blocking core functionality. Content browsing works even if Stripe is down, checkout completes even if email fails.

### 5. Fault Isolation

One broken service doesn't take down the entire site. Content APIs separate from commerce APIs, commerce APIs separate from admin APIs.

### 6. Proactive Monitoring

Know about issues before users complain. Error tracking, performance monitoring, uptime checks, alert thresholds for critical flows.

### 7. User-Friendly Errors

Errors should be calm and helpful, never panic-inducing. Clear next steps, no stack traces or technical jargon, acknowledge issues without blaming users.

### 8. Reliability > Features

Reliability issues are prioritized over new features. No "quick hacks" in production, impact assessment for new features, quarterly performance reviews.
