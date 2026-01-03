---
stepsCompleted: [1, 2]
inputDocuments:
  - "_bmad-output/planning-artifacts/product-brief-riqle-2026-01-03.md"
  - "_bmad-output/planning-artifacts/ux-design-specification.md"
  - "_bmad-output/planning-artifacts/project-vision.md"
---

# riqle - Epic Breakdown

## Overview

This document provides the complete epic and story breakdown for riqle, decomposing the requirements from the Product Brief, UX Design, and Project Vision into implementable stories.

## Requirements Inventory

### Functional Requirements

FR1: Homepage must display identity, positioning, and proof with 30-45 second comprehension target
FR2: About page must present personal story, trajectory, and thinking with contextual narrative
FR3: Work/Portfolio page must showcase projects, startups (e.g., MarkPoint), and quantified outcomes
FR4: Writing page must display essays and reflections with instant load times
FR5: Resources page must catalog educational products with calm framing ("Resources created from real tutoring experience")
FR6: Stripe Checkout integration for one-time payments
FR7: Order creation and fulfillment system with webhook-driven processing
FR8: Entitlement system granting access tied to purchases
FR9: Secure file access via signed URLs with expiration
FR10: Purchase confirmation email system (professional, receipt-focused)
FR11: Admin dashboard with order visibility and management
FR12: Essay publishing workflow (write → preview → publish, no build steps)
FR13: Project management interface (title, description, links, outcomes)
FR14: Product creation and editing (product details, pricing, asset uploads)
FR15: Order viewing and management for admin
FR16: Customer support capability (resend access)
FR17: User authentication system (secure login, password reset)
FR18: Role-based access control (admin vs. customer roles)
FR19: User accounts with purchase history
FR20: User access to purchased resources and courses
FR21: Contact and collaboration inquiry forms
FR22: Navigation system (About, Work, Writing, Resources, Contact)
FR23: Responsive design (desktop-primary, mobile-responsive)
FR24: Search functionality for essays and resources (optional, not in MVP)

### NonFunctional Requirements

NFR1: Homepage initial page load must be fast (< 2 seconds)
NFR2: Site must achieve 99.9% uptime (zero downtime in first 30 days)
NFR3: Zero broken links across all pages
NFR4: Checkout flow must have zero failure rate
NFR5: Admin deployment must be frictionless (push → live, no surprises)
NFR6: Database must use migrations for schema versioning
NFR7: System must include observability (logging, error tracking)
NFR8: Authentication must be secure (password hashing, secure session management)
NFR9: All pages must load within 3 seconds on standard connections
NFR10: Platform must handle concurrent purchases without race conditions
NFR11: File storage must be secure with access controls
NFR12: Emails must be delivered reliably (99%+ delivery rate)
NFR13: Site must be accessible (WCAG AA compliance)
NFR14: Code must be maintainable (clear structure, documented decisions)
NFR15: Infrastructure must support scaling without rewrites
NFR16: Backup and recovery plan must be in place
NFR17: CI/CD pipeline with quality gates

### Additional Requirements

**From UX Design Specification:**

- Design system: Tailwind CSS + Headless UI
- Typography: Modern neutral grotesk primary font + softer rounded secondary font for captions
- Type scale: Large headings (48px-64px), generous line height (1.5-1.7)
- Maximum 2 font families
- Color palette: Warm neutrals (off-white, cream, fog grey), stone palette (stone-100 through stone-900)
- Glassmorphism: "Velvet glass" (light blur, low opacity, soft borders) for cards, resource previews, project summaries
- Hand-drawn icons: Thin-line SVG icons with imperfect geometry for process diagrams, learning frameworks, concept explanations
- Animations: Slow, intentional animations (duration-300, ease-out)
- Progressive disclosure pattern: First scroll = pure clarity, second scroll = proof, third scroll = texture
- Accessibility: Keyboard navigation, screen reader support, ARIA attributes, focus management
- Semantic HTML: `<nav>`, `<main>`, `<article>` elements
- Skip links for keyboard users
- Alt text for all images
- Form labels and error messages
- Responsive breakpoints: Desktop-first design with mobile-responsive adaptations

**From Product Brief:**

- Employer-first optimization: 30-45 second skim requirement
- Commerce as evidence, not persuasion: No urgency, scarcity, or dark patterns
- Admin UX must feel like "internal tooling for a serious operation"
- Professional email tone (receipt-focused, no marketing)
- Event-driven content updates (not creator cadence)
- Zero-thought deployment experience

**Infrastructure Requirements:**

- Stripe webhook integration for payment processing
- Idempotent order processing
- Background job processing capability
- Audit logs for sensitive admin actions
- Database schema with migrations
- Secure file storage system
- Error tracking and monitoring
- Automated deployment pipeline

**Content Requirements:**

- HSC English resources content
- Educational course content structure
- Portfolio project data (with context and outcomes)
- Startup showcase content (MarkPoint and future ventures)
- Essay/writing content system
- About page narrative content

### FR Coverage Map

**FR1** → Epic 3 (Homepage identity/positioning with 30-45s target)
**FR2** → Epic 4 (About page story and trajectory)
**FR3** → Epic 5 & 6 (Work/Portfolio and Startups showcase)
**FR4** → Epic 7 (Writing page with instant loads)
**FR5** → Epic 8 (Resources page with calm framing)
**FR6** → Epic 9 (Stripe checkout integration)
**FR7** → Epic 9 (Order creation/fulfillment system)
**FR8** → Epic 10 (Entitlement system)
**FR9** → Epic 10 (Secure file access via signed URLs)
**FR10** → Epic 9 (Purchase confirmation emails)
**FR11** → Epic 11 (Admin dashboard)
**FR12** → Epic 7 (Essay publishing workflow)
**FR13** → Epic 5 & 6 (Project/startup management interface)
**FR14** → Epic 8 (Product creation/editing)
**FR15** → Epic 11 (Order viewing/management)
**FR16** → Epic 11 (Customer support capability)
**FR17** → Epic 0 (User authentication system)
**FR18** → Epic 0 (Role-based access control)
**FR19** → Epic 10 (User accounts with purchase history)
**FR20** → Epic 10 (User access to purchased resources)
**FR21** → Epic 15 (Contact forms)
**FR22** → Epic 1 (Navigation system)
**FR23** → Epic 1 & 2 (Responsive design)
**FR24** → Deferred (Search functionality - optional, not in MVP)

## Epic List

### Epic 0: Core Infrastructure, Backend & Data Foundation
Establish production-grade foundation with database, authentication core, and deployment pipeline. Users can register, login securely, and the platform has reliable infrastructure from day one.
**FRs covered:** FR17, FR18, NFR6, NFR7, NFR17

### Epic 1: Information Architecture & System Design
Define content models, navigation structure, URL patterns, and site hierarchy. Users can navigate intuitively across all sections with clear information architecture.
**FRs covered:** FR22, FR23

### Epic 2: Design System & Visual Language
Implement Tailwind CSS + Headless UI with warm neutral color palette, typography system, velvet glassmorphism, and hand-drawn icon system. The site has a cohesive "quietly premium, calmly obsessive" visual language.
**FRs covered:** Design system requirements (Tailwind, typography, glassmorphism, hand-drawn icons, progressive disclosure)

### Epic 3: Homepage (Identity Compression Engine)
Create homepage enabling employers to understand Nathanael's identity, positioning, and proof in 30-45 seconds with fast load times.
**FRs covered:** FR1, NFR1

### Epic 4: About / Narrative / Trajectory
Present personal story with contextual narrative explaining non-linear path (student → tutor → builder → founder) and current direction.
**FRs covered:** FR2

### Epic 5: Work & Portfolio (Proof of Execution)
Showcase projects with context, outcomes, and quantified impact. Includes admin interface for project management.
**FRs covered:** FR3, FR13

### Epic 6: Startups Showcase (MarkPoint & Others)
Professional startup presentation as chapters in larger arc, with problem space, mission, and traction.
**FRs covered:** FR3, FR13

### Epic 7: Writing & Thinking
Display essays and reflections with instant load times and frictionless publishing workflow (write → preview → publish, no build steps).
**FRs covered:** FR4, FR12

### Epic 8: Resources & Educational Products
Catalog educational products with calm framing ("Resources created from real tutoring experience"). Includes admin interface for product creation and editing.
**FRs covered:** FR5, FR14

### Epic 9: Commerce & Payments
Professional Stripe checkout for one-time purchases with webhook-driven order fulfillment, purchase confirmation emails, and zero-failure reliability.
**FRs covered:** FR6, FR7, FR10, NFR4, NFR10

### Epic 10: Customer Access & Delivery
Secure entitlement system granting access to purchased resources with signed URLs, user accounts, and purchase history.
**FRs covered:** FR8, FR9, FR19, FR20, NFR11

### Epic 11: Admin Experience (Operator UX)
Frictionless admin dashboard feeling like "internal tooling for a serious operation" with order management, customer support (resend access), and zero-thought deployment.
**FRs covered:** FR11, FR15, FR16, NFR5

### Epic 12: Performance, Reliability & Trust
Fast page loads (homepage < 2s, all pages < 3s), 99.9% uptime, zero broken links, reliable email delivery, and backup/recovery plan.
**FRs covered:** NFR1, NFR2, NFR3, NFR9, NFR12, NFR16

### Epic 13: Analytics & Insight (Minimal, Intentional)
Minimal analytics to understand employer engagement patterns without bloat. Focus on behavioral signals (pages visited, time spent, referral sources).
**FRs covered:** Analytics requirements (minimal, intentional)

### Epic 14: Security, Privacy & Professional Legitimacy
Secure authentication, data protection, WCAG AA accessibility compliance, and maintainable codebase for professional trust signals.
**FRs covered:** NFR8, NFR11, NFR13, NFR14

### Epic 15: Launch, Iteration & Long-Term Growth
Initial launch preparation with contact forms, scalable infrastructure, and post-launch iteration capability.
**FRs covered:** FR21, NFR15

## Epic 0: Core Infrastructure, Backend & Data Foundation

Establish production-grade foundation with database, authentication core, and deployment pipeline. Users can register, login securely, and the platform has reliable infrastructure from day one.

**FRs Covered:** FR17, FR18, NFR6, NFR7, NFR17

### Story 0.1: Repository & Engineering Baseline

As a developer,
I want a disciplined codebase with strict typing, linting, and pre-commit hooks,
So that code quality is enforced automatically and the codebase won't rot.

**Acceptance Criteria:**

**Given** the repository is set up with TypeScript strict mode
**When** a developer commits code that fails lint or typecheck
**Then** the CI pipeline fails and prevents the commit from being merged
**And** the app refuses to boot with missing environment variables

**Given** a new developer clones the repository
**When** they follow the README setup steps
**Then** they can run the project locally without manual configuration
**And** all required environment variables are documented in .env.example

**Given** the project uses conventional commits
**When** commits are made
**Then** a changelog strategy is in place (optional but recommended)
**And** commit messages follow a consistent format

### Story 0.2: Environments - Local, Staging, Production

As a developer,
I want isolated local, staging, and production environments,
So that I can prevent "it worked on my machine" issues and reduce deployment anxiety.

**Acceptance Criteria:**

**Given** staging and production environments are configured
**When** deploying to staging
**Then** staging uses separate databases from production
**And** staging uses Stripe test keys while production uses live keys
**And** staging uses separate webhook secrets from production

**Given** the project uses Vercel or similar hosting
**When** a pull request is created
**Then** a preview deployment is automatically generated
**And** the preview deployment is isolated from staging and production

**Given** environment naming conventions are established
**When** a developer checks environment config
**Then** they can clearly identify which environment they're working with
**And** configuration is consistent across all environments

### Story 0.3: Hosting, Domains, and Security Headers Baseline

As a site operator,
I want professional domain setup with HTTPS and security headers,
So that the public surface is secure and trustworthy by default.

**Acceptance Criteria:**

**Given** a custom domain is configured
**When** users access the site
**Then** HTTPS is enforced on all pages
**And** www and apex domains redirect to one canonical domain
**And** all HTTP requests redirect to HTTPS

**Given** security headers are configured
**When** any page loads
**Then** HSTS header is present
**And** X-Frame-Options or frame-ancestors CSP directive is set
**And** X-Content-Type-Options is set to nosniff
**And** Referrer-Policy is configured
**And** a practical Content Security Policy is in place

**Given** security headers are deployed
**When** tested with security scanning tools
**Then** all standard security headers are present on all responses
**And** the site scores well on security audits

### Story 0.4: Database Provisioning & Connection Strategy (Serverless-Safe)

As a developer,
I want a stable Postgres setup with proper connection pooling,
So that the database won't fall apart under concurrency or serverless constraints.

**Acceptance Criteria:**

**Given** a managed Postgres database is provisioned
**When** the application starts
**Then** it connects using a connection pooling strategy appropriate for the hosting environment
**And** database credentials are stored only in secrets manager or environment variables
**And** connections use timeouts and bounded retry logic

**Given** a database healthcheck endpoint exists
**When** the healthcheck is called
**Then** it confirms DB connectivity quickly (< 1 second)
**And** returns appropriate status codes (200 for healthy, 503 for unhealthy)

**Given** the application is under basic load
**When** multiple concurrent requests are made
**Then** connection exhaustion does not occur
**And** connections are properly released after use
**And** the connection pool metrics can be monitored

### Story 0.5: Schema Design - Core Tables and Relationships (v0)

As a developer,
I want a well-designed database schema that supports content and commerce,
So that the system is modeled correctly from the start.

**Acceptance Criteria:**

**Given** the database schema is designed
**When** reviewing the schema
**Then** the following table categories exist:

**Identity & Access:**
- users (admin + customers)
- sessions (or provider-backed session storage)
- roles table
- user_roles (junction table for RBAC)

**Content:**
- pages (optional, CMS-like pages)
- posts (writing/essays)
- projects (portfolio items)
- startups (ventures showcase)
- media_assets (upload metadata)
- tags, tag_links (optional but useful for organization)

**Commerce:**
- products (resources/courses catalog)
- prices (separate from products so prices can change without breaking order history)
- orders (purchase records)
- order_items (line items for each order)
- entitlements (access control for who can access what)
- stripe_events (webhook event tracking for idempotency)
- idempotency_keys (for safe retry operations)

**Operations:**
- audit_log (admin actions and sensitive events)
- email_log (sent/failed email references, not content)

**Given** relationships between tables are defined
**When** the schema is reviewed
**Then** foreign keys exist for all relationships
**And** unique constraints are present on:
  - users.email
  - products.slug
  - Stripe identifiers (stripeCustomerId, stripeSessionId, etc.)
**And** indexes exist for common queries:
  - posts.publishedAt
  - projects.featured
  - orders.userId, orders.status, orders.createdAt
  - entitlements.userId, entitlements.productId

**Given** a decision is made on soft-delete vs status fields
**When** records need to be "deleted"
**Then** the system uses status fields (recommended approach)
**And** deleted records remain queryable for historical purposes

**Given** the schema is complete
**When** reviewing business requirements
**Then** the schema supports:
  - Public content browsing
  - Admin-only editing
  - Product purchase flows
  - Entitlements and secure access control
  - Historical order accuracy even if prices change later

### Story 0.6: Migrations, Seeding, and Schema Governance

As a developer,
I want safe database migration tooling with seeding capabilities,
So that "DB changes are safe" becomes a rule, not a hope.

**Acceptance Criteria:**

**Given** a migration tool is configured (Prisma/Drizzle/Flyway/etc.)
**When** schema changes are needed
**Then** migrations are created using the migration tool
**And** migrations are required for all schema changes (no manual prod edits)
**And** migrations are backward-compatible where possible

**Given** a fresh database
**When** migrations are run from zero
**Then** the complete schema is created successfully
**And** all tables, relationships, and indexes are present

**Given** a seed script exists
**When** the seed script is executed
**Then** an admin account is created with known credentials
**And** sample products are created for testing
**And** sample content (posts, projects) is created
**And** the seed data is predictable and consistent

**Given** a deployment checklist
**When** preparing to deploy
**Then** running migrations is included as a required step
**And** the team knows the process for rolling back migrations if needed

### Story 0.7: API Architecture & Request Validation Standard

As a developer,
I want every API endpoint to be predictable, typed, and safe,
So that the backend is robust and clients can't send invalid data.

**Acceptance Criteria:**

**Given** an API style is chosen (REST or typed RPC like tRPC)
**When** new endpoints are created
**Then** they follow the chosen API style consistently
**And** APIs are modularly separated (public vs admin routes)

**Given** a validation layer is implemented (Zod or equivalent)
**When** any request payload is received
**Then** it is validated server-side before processing
**And** validation errors return a consistent error format
**And** no business logic executes on invalid input

**Given** API responses are standardized
**When** any endpoint returns data
**Then** successful responses follow a consistent structure
**And** error responses include: code, message, and details
**And** HTTP status codes are used correctly (200, 400, 401, 403, 404, 500, etc.)

**Given** list endpoints exist
**When** querying for lists of data
**Then** pagination patterns are implemented consistently
**And** pagination includes: page number/cursor, page size, total count

**Given** the architecture principle of "no business logic in client"
**When** reviewing the codebase
**Then** all business logic resides on the server
**And** clients only handle presentation and user interaction

### Story 0.8: Authentication (Admin + Customers) and Sessions

As a user (admin or customer),
I want secure login that doesn't create UX friction,
So that I can access my account safely and easily.

**Acceptance Criteria:**

**Given** an auth provider approach is chosen
**When** implementing authentication
**Then** passwordless email magic link is implemented (recommended), OR
**Then** email/password with reset flow is implemented
**And** the chosen approach is consistent across all environments

**Given** session security requirements
**When** a user logs in successfully
**Then** session cookies are HttpOnly (not readable by JavaScript)
**And** sessions have short-lived duration with refresh or rolling expiration
**And** sessions are stored securely (database or secure session storage)

**Given** brute force protection is needed
**When** implementing login endpoints
**Then** rate limits are applied to login attempts
**And** lockout policy or exponential backoff is implemented
**And** repeated failed attempts trigger rate limiting

**Given** the auth system is deployed
**When** testing on staging and production
**Then** admin login works correctly in both environments
**And** sessions persist across page reloads
**And** sessions expire appropriately based on configuration
**And** logout functionality clears sessions completely

### Story 0.9: Authorization (RBAC) + Ownership Rules

As a system operator,
I want role-based access control and ownership checks,
So that we prevent accidental exposure and admin mistakes.

**Acceptance Criteria:**

**Given** roles are defined (minimum: admin, editor optional, customer)
**When** a user is created
**Then** they are assigned at least one role
**And** roles determine what resources they can access

**Given** route guards are implemented
**When** a non-admin user attempts to access admin pages
**Then** they are denied access with a 403 Forbidden response
**And** admin APIs require admin role to access
**And** customer portal endpoints require customer role (or admin)

**Given** ownership rules are enforced
**When** a customer requests their own data
**Then** they can see their orders and entitlements
**When** a customer attempts to access another customer's data
**Then** they receive a 403 Forbidden response
**And** the system logs the unauthorized access attempt

**Given** an audit log exists
**When** sensitive actions occur (role changes, manual access grants, refunds)
**Then** the action is logged with: userId, timestamp, action type, and details
**And** audit logs are queryable by admins

**Given** authorization is deployed
**When** testing access control
**Then** non-admin users cannot access admin endpoints (returns 401 or 403)
**And** customers cannot access other customers' data
**And** all denied access attempts are logged

### Story 0.10: Secure File Storage and Delivery (Resources/Courses)

As a site operator,
I want paid resources to be private but frictionless to deliver,
So that content is protected but customers have a smooth experience.

**Acceptance Criteria:**

**Given** an object storage bucket is configured (private by default)
**When** files are uploaded
**Then** they are stored in a private bucket not publicly accessible
**And** asset metadata is stored in the database (file key, size, mime type, checksum, createdBy)

**Given** an admin upload flow exists
**When** uploading a file
**Then** file type and size are validated server-side
**And** metadata is stored in the media_assets table
**And** only admins can upload files

**Given** a signed URL generation system
**When** a customer requests a download
**Then** an entitlement check is performed first
**And** if entitled, a signed URL is generated with expiration (5-30 minutes)
**And** the signed URL is returned to the customer

**Given** download gating is enforced
**When** a user without entitlement attempts to access a paid file
**Then** they are denied access
**And** no signed URL is generated
**And** the attempt is logged

**Given** the secure file system is tested
**When** attempting to access files directly
**Then** no paid file is publicly accessible without a signed URL
**And** signed URLs expire after the configured time
**And** expired signed URLs return an error

### Story 0.11: Stripe Integration - Data Mapping & Checkout Session Creation

As a customer,
I want to purchase products via Stripe checkout,
So that I can access paid resources securely.

**Acceptance Criteria:**

**Given** Stripe is configured as the payment provider
**When** designing the data model
**Then** the database is the source of truth for orders and entitlements
**And** Stripe IDs are stored in the database for reference
**And** Stripe stores payment objects, not sensitive customer data

**Given** a Stripe customer mapping system
**When** a user makes a purchase
**Then** a Stripe customer is created or reused based on email
**And** the Stripe customer ID is stored in the users table (stripeCustomerId)

**Given** a checkout session endpoint exists
**When** a customer initiates checkout for a product
**Then** the product and price are validated server-side
**And** a Stripe Checkout Session is created
**And** a pending order intent is stored if needed
**And** the customer is redirected to Stripe's hosted checkout page

**Given** the checkout flow is tested in staging
**When** initiating a test purchase
**Then** the Stripe checkout session is created successfully
**And** the Stripe customer is linked to the user record
**And** no access is granted client-side (only via webhook)

### Story 0.12: Stripe Webhooks - Signature Verification & Idempotent Fulfillment

As a system operator,
I want robust webhook handling with idempotency,
So that payments are processed correctly every time without duplicates.

**Acceptance Criteria:**

**Given** a webhook endpoint is configured
**When** Stripe sends a webhook event
**Then** the raw body is preserved for signature verification
**And** the Stripe signature is verified using the webhook secret
**And** invalid signatures are rejected with a 400 response

**Given** essential webhook events are handled
**When** processing webhooks
**Then** checkout.session.completed is handled
**And** payment_intent.succeeded is handled (depending on flow)
**And** charge.refunded / refund events are handled
**And** all other events are acknowledged but not processed

**Given** idempotency is critical
**When** the same webhook is received multiple times
**Then** the Stripe event.id is checked in the stripe_events table
**And** if already processed, the webhook returns 200 without reprocessing
**And** each fulfillment step uses idempotency_keys where applicable

**Given** a fulfillment pipeline is defined
**When** a successful payment webhook is processed
**Then** an order record is created
**And** order_items are created for the purchased products
**And** entitlements are granted to the customer
**And** a confirmation email job is enqueued
**And** all steps are wrapped in a database transaction where possible

**Given** webhook reliability is tested
**When** replaying a webhook event
**Then** orders and entitlements are not duplicated
**And** the system returns 200 OK for already-processed events
**And** order and entitlement state matches the payment outcome every time

### Story 0.13: Background Jobs & Retries (Fulfillment & Emails)

As a system operator,
I want background job processing with retries,
So that heavy work doesn't block HTTP requests and failures are handled gracefully.

**Acceptance Criteria:**

**Given** a job runner/queue is configured (platform-native or external)
**When** heavy operations are needed
**Then** they are processed asynchronously via background jobs
**And** HTTP responses return quickly without blocking

**Given** essential background jobs are defined
**When** jobs are created
**Then** the following job types exist:
  - Send purchase confirmation email
  - Generate delivery links
  - Reconcile "stuck" orders (optional cleanup job)

**Given** a retry strategy is implemented
**When** a job fails
**Then** exponential backoff is used for retries
**And** a maximum retry count is configured
**And** jobs that exceed max retries are moved to a dead-letter queue
**And** failures generate alerts or log entries for investigation

**Given** email delivery can fail
**When** an email job fails
**Then** the purchase still completes successfully
**And** the email is retried automatically
**And** failures are logged for manual follow-up if needed

**Given** webhook processing performance
**When** webhooks are received
**Then** webhook processing stays fast (< 500ms ideally)
**And** heavy fulfillment work is offloaded to background jobs
**And** webhook endpoints return 200 quickly to avoid Stripe retries

### Story 0.14: Transactional Email Setup (Domain Legitimacy)

As a site operator,
I want professional transactional emails that don't land in spam,
So that receipts and access emails reach customers reliably.

**Acceptance Criteria:**

**Given** an email provider is integrated (SendGrid, Postmark, Resend, etc.)
**When** sending emails
**Then** the integration is configured with API keys
**And** sending limits and quotas are understood

**Given** domain DNS setup for email legitimacy
**When** configuring the sending domain
**Then** SPF records are configured
**And** DKIM signing is enabled
**And** DMARC policy is set (at least "none", ideally stricter for production)

**Given** email templates are defined
**When** sending transactional emails
**Then** the following templates exist:
  - Purchase confirmation with order details
  - Access instructions with download/course links
  - Admin notification (optional, for new orders)

**Given** email logging is implemented
**When** emails are sent
**Then** metadata is logged (to, subject, status, timestamp)
**And** email content is NOT stored in logs (privacy)
**And** sent and failed emails are trackable

**Given** emails are sent via background jobs
**When** an email needs to be sent
**Then** it is enqueued as a background job (not sent inline)
**And** failures are retried automatically
**And** email delivery is confirmed in staging and production

### Story 0.15: Observability - Logging, Errors, and Key Events

As a developer,
I want comprehensive logging and error tracking,
So that I can diagnose issues in minutes, not hours.

**Acceptance Criteria:**

**Given** structured logging is implemented
**When** logging events
**Then** logs include: request ID, user ID (when available), timestamp
**And** for Stripe events: event ID is included
**And** logs are structured (JSON format recommended)
**And** log levels are used appropriately (debug, info, warn, error)

**Given** error tracking is configured (Sentry or equivalent)
**When** exceptions occur
**Then** they are captured with full stack traces
**And** error context includes: user ID, request ID, environment
**And** errors are grouped and prioritized by frequency

**Given** business event tracking is minimal but critical
**When** key business events occur
**Then** the following events are logged:
  - Checkout created
  - Payment succeeded
  - Entitlement granted
  - Download link issued
**And** events can be traced end-to-end using correlation IDs

**Given** a purchase flow is being debugged
**When** tracing a specific purchase
**Then** all events can be found using the order ID or Stripe session ID
**And** the complete timeline is reconstructable from logs
**And** Stripe webhook outcomes are visible and searchable

### Story 0.16: Rate Limiting & Abuse Prevention

As a system operator,
I want rate limiting and abuse prevention,
So that cheap attacks and accidental overload don't cause issues.

**Acceptance Criteria:**

**Given** rate limiting is configured
**When** implementing sensitive endpoints
**Then** rate limits are applied to:
  - Login endpoints
  - Checkout creation
  - Signed URL generation
**And** rate limits are appropriate (e.g., 5 login attempts per 15 minutes)

**Given** rate limits are enforced
**When** a user exceeds the rate limit
**Then** they receive a 429 Too Many Requests response
**And** a Retry-After header is included
**And** the rate limit resets after the configured time window

**Given** spam protection for contact endpoints (baseline)
**When** contact forms are implemented (later epic)
**Then** basic rate limiting is in place
**And** consideration is given to honeypot fields or CAPTCHA

**Given** basic WAF rules are available
**When** configuring hosting/CDN
**Then** WAF rules are enabled if supported by the platform
**And** common attack patterns are blocked (SQL injection attempts, XSS, etc.)

**Given** abuse prevention is tested
**When** simulating abusive patterns
**Then** rate limits prevent resource exhaustion
**And** legitimate users are not impacted by rate limits under normal use

### Story 0.17: Backups, Restore Plan, and Data Protection

As a site operator,
I want automated backups with a tested restore plan,
So that catastrophic data loss is prevented and I can sleep at night.

**Acceptance Criteria:**

**Given** automated database backups are configured
**When** backups run
**Then** they occur on a regular schedule (daily recommended)
**And** backups have a retention policy (e.g., 30 days)
**And** backups are stored in a separate location from the primary database

**Given** a restore procedure is documented
**When** reviewing the restore runbook
**Then** step-by-step restore instructions exist
**And** the procedure is tested at least once
**And** restore time is known and acceptable

**Given** restore capability is tested
**When** performing a test restore
**Then** a backup can be restored to staging successfully
**And** data integrity is verified after restore
**And** the process is documented with any learnings

**Given** PII minimization is practiced
**When** designing data storage
**Then** only necessary data is collected (email, name)
**And** sensitive data like card numbers is NOT stored (Stripe handles this)
**And** data retention policies are defined

**Given** backups and data protection are operational
**When** reviewing the system
**Then** backups are confirmed active and successful
**And** restore procedure is documented and tested
**And** data stored is minimal and intentional (PII minimization)

### Story 0.18: CI/CD Gates & Release Discipline

As a developer,
I want CI/CD pipeline gates and release discipline,
So that broken deployments are prevented.

**Acceptance Criteria:**

**Given** CI checks are configured
**When** code is pushed or a PR is created
**Then** the following checks run automatically:
  - Linting
  - Type checking
  - Unit tests (at least for critical paths)
**And** the build fails if any check fails

**Given** a pre-deploy checklist exists
**When** preparing to deploy
**Then** the checklist includes:
  - Run migrations
  - Verify Stripe secrets are present
  - Confirm webhook endpoint is configured
  - Check environment variables are set
**And** the checklist is followed before every production deploy

**Given** a staging-first release habit is established
**When** releasing new features
**Then** changes are deployed to staging first
**And** critical flows (checkout, webhook) are tested in staging
**And** only after staging verification, changes are deployed to production

**Given** deployment safety is ensured
**When** a deploy fails or causes issues
**Then** a rollback plan exists (even if simple)
**And** the rollback procedure is documented
**And** rollback can be executed quickly (< 5 minutes)

### Story 0.19: Local Developer Experience (One-Command Setup)

As a developer,
I want one-command local setup,
So that I can iterate without friction and onboard quickly.

**Acceptance Criteria:**

**Given** local database setup is needed
**When** setting up locally
**Then** a local Postgres database can be run via docker-compose OR
**Then** a managed dev database is provided with connection instructions
**And** database connection works immediately after setup

**Given** local Stripe webhook testing is needed
**When** developing webhook flows locally
**Then** Stripe CLI is configured for webhook forwarding
**And** webhooks from Stripe reach the local development server
**And** local webhook testing works end-to-end

**Given** seed and reset scripts exist
**When** resetting local development data
**Then** a seed/reset script clears and repopulates the database
**And** the script is idempotent (can be run multiple times safely)

**Given** a clear README exists
**When** a new developer reads the README
**Then** setup steps are clear and sequential
**And** all prerequisites are documented (Node version, Docker, etc.)
**And** common troubleshooting steps are included

**Given** the local developer experience is tested
**When** running `pnpm dev` (or equivalent) after setup
**Then** the application starts successfully
**And** no manual configuration is needed beyond environment variables
**And** a new machine can be productive within 30 minutes

### Story 0.20: "Commerce from Day 1" Validation Checklist

As a site operator,
I want to validate the complete purchase flow before launch,
So that the end-to-end purchase path is bulletproof.

**Acceptance Criteria:**

**Given** all commerce infrastructure is complete
**When** testing the purchase flow
**Then** the following scenarios are verified:

**Must-Pass Flow: Successful Purchase**
- Checkout is initiated for a product
- Payment succeeds in Stripe
- Webhook is received and processed
- Order is created in the database
- Entitlement is granted to the customer
- Confirmation email is sent
- Customer can access the purchased resource

**Must-Pass Flow: Replayed Webhook Doesn't Double-Grant**
- Webhook is processed successfully
- Same webhook is sent again (replay)
- No duplicate order is created
- No duplicate entitlement is granted
- System returns 200 OK for idempotency

**Must-Pass Flow: Refund Revokes Entitlement**
- Purchase is completed successfully
- Refund is issued in Stripe
- Refund webhook is processed
- Entitlement is revoked or flagged (per policy)
- Customer can no longer access the resource

**Must-Pass Flow: Signed Download Links Expire**
- Customer requests a download link
- Signed URL is generated with expiration
- Link works immediately
- After expiration time, link returns an error
- No content is accessible after expiration

**Must-Pass Flow: Admin Can Manually Resend Access**
- Order exists in the system
- Admin views the order in admin dashboard
- Admin clicks "Resend Access"
- Customer receives a new email with access instructions

**Must-Pass Flow: No Paid Asset is Publicly Accessible**
- Attempt to access paid file directly (without signed URL)
- Access is denied (403 or 404)
- Files are not discoverable by URL guessing
- Only entitled users can generate signed URLs

**Given** failure recovery is tested
**When** simulating failure scenarios
**Then** the following are verified:
- Email provider failure: purchase still completes, email retries
- Webhook delay: order eventually processes correctly
- Duplicate webhook: idempotency prevents double-grant

**Given** end-to-end validation is complete
**When** running the full test purchase in both staging and production test mode
**Then** all must-pass flows succeed
**And** all failure recovery scenarios are handled correctly
**And** the commerce system is ready for real customers

## Epic 1: Information Architecture & System Design

Define content models, navigation structure, URL patterns, and site hierarchy. Users can navigate intuitively across all sections with clear information architecture.

**FRs Covered:** FR22, FR23

### Story 1.1: Content Model Definition

As a developer,
I want clearly defined content models for all content types,
So that the system has consistent structure for posts, projects, startups, and pages.

**Acceptance Criteria:**

**Given** content types are being designed
**When** defining the content models
**Then** the following models are specified:
  - Posts (essays/writing): title, slug, content, excerpt, publishedAt, status, author, tags
  - Projects (portfolio): title, slug, description, outcomes, technologies, links, featured, order
  - Startups: title, slug, description, problem, solution, traction, status, links
  - Pages (optional static pages): title, slug, content, template
  - Media Assets: key, url, size, mimeType, alt, createdBy

**Given** content relationships are defined
**When** reviewing model relationships
**Then** tags can be associated with posts, projects, and startups (many-to-many)
**And** media assets can be linked to any content type
**And** all content has consistent metadata (createdAt, updatedAt, status)

**Given** status field conventions are established
**When** content is created
**Then** status values are standardized: draft, published, archived
**And** only published content is visible to public users
**And** drafts and archived content are admin-only

### Story 1.2: URL Structure & Routing Patterns

As a user,
I want clean, predictable URLs for all pages,
So that navigation is intuitive and URLs can be shared confidently.

**Acceptance Criteria:**

**Given** URL patterns are designed
**When** accessing different content types
**Then** the following URL structure is used:
  - Homepage: `/`
  - About: `/about`
  - Work/Portfolio: `/work`
  - Individual Project: `/work/[project-slug]`
  - Startups: `/startups`
  - Individual Startup: `/startups/[startup-slug]`
  - Writing: `/writing`
  - Individual Post: `/writing/[post-slug]`
  - Resources: `/resources`
  - Individual Resource: `/resources/[product-slug]`
  - Contact: `/contact`

**Given** admin routes are separated
**When** accessing admin functionality
**Then** all admin routes use `/admin` prefix
**And** admin routes include: `/admin/dashboard`, `/admin/posts`, `/admin/projects`, `/admin/products`, `/admin/orders`

**Given** customer portal routes exist
**When** customers access their account
**Then** customer routes use `/account` prefix
**And** customer routes include: `/account/orders`, `/account/resources`, `/account/settings`

**Given** auth routes are defined
**When** handling authentication
**Then** auth routes include: `/login`, `/logout`, `/signup`, `/reset-password`
**And** OAuth callbacks use `/auth/callback/[provider]` if applicable

### Story 1.3: Navigation Structure & Site Hierarchy

As a user,
I want clear, consistent navigation across all pages,
So that I can find content easily without getting lost.

**Acceptance Criteria:**

**Given** primary navigation is defined
**When** viewing any page
**Then** the main navigation includes: About, Work, Writing, Resources, Contact
**And** navigation is visible on all public pages (desktop)
**And** mobile navigation uses a toggle menu (hamburger)
**And** the current page is indicated in navigation

**Given** footer navigation exists
**When** viewing the footer
**Then** footer includes: About, Work, Writing, Resources, Contact, Privacy, Terms (if applicable)
**And** social links are included if relevant
**And** copyright notice is present

**Given** admin navigation is separate
**When** logged in as admin
**Then** admin navigation includes: Dashboard, Posts, Projects, Startups, Products, Orders, Settings
**And** admin navigation is only visible to admin users
**And** a "View Site" link allows switching to public view

**Given** breadcrumbs are used where helpful
**When** viewing deep pages (e.g., individual project)
**Then** breadcrumbs show the path: Work > Project Name
**And** breadcrumbs are clickable for easy backtracking

### Story 1.4: Responsive Design Foundation & Breakpoints

As a user on any device,
I want the site to adapt to my screen size,
So that content is readable and functional on mobile, tablet, and desktop.

**Acceptance Criteria:**

**Given** responsive design breakpoints are defined
**When** implementing responsive layouts
**Then** Tailwind CSS default breakpoints are used:
  - sm: 640px (mobile landscape)
  - md: 768px (tablet)
  - lg: 1024px (small desktop)
  - xl: 1280px (desktop)
  - 2xl: 1536px (large desktop)

**Given** the site is desktop-first in design priority
**When** implementing layouts
**Then** desktop layouts are designed first
**And** mobile/tablet adaptations are created with responsive utilities
**And** content hierarchy is maintained across all breakpoints

**Given** navigation is responsive
**When** viewing on mobile (<768px)
**Then** main navigation collapses to a hamburger menu
**And** mobile menu is accessible and functional
**When** viewing on desktop (≥768px)
**Then** main navigation is horizontal and always visible

**Given** typography is responsive
**When** viewing on different devices
**Then** heading sizes scale down appropriately on mobile
**And** line length remains readable (max-width containers)
**And** touch targets are at least 44x44px on mobile

### Story 1.5: SEO Meta Structure & Open Graph Setup

As a site operator,
I want proper SEO metadata on all pages,
So that the site ranks well and shares beautifully on social media.

**Acceptance Criteria:**

**Given** SEO metadata is implemented
**When** any page loads
**Then** the following meta tags are present:
  - `<title>` (unique per page)
  - `<meta name="description">` (unique per page)
  - `<meta name="keywords">` (if relevant)
  - Canonical URL (`<link rel="canonical">`)

**Given** Open Graph tags are configured
**When** a page is shared on social media
**Then** Open Graph tags include:
  - `og:title`
  - `og:description`
  - `og:image` (unique per content item where possible)
  - `og:url`
  - `og:type` (website, article, etc.)

**Given** Twitter Card tags are configured
**When** shared on Twitter/X
**Then** Twitter Card tags include:
  - `twitter:card` (summary_large_image)
  - `twitter:title`
  - `twitter:description`
  - `twitter:image`

**Given** structured data is implemented
**When** search engines crawl pages
**Then** JSON-LD structured data is present for:
  - Website/Organization
  - Articles (for blog posts)
  - BreadcrumbList (where applicable)

### Story 1.6: Sitemap & Robots.txt Configuration

As a site operator,
I want proper sitemap and robots.txt files,
So that search engines can crawl and index the site effectively.

**Acceptance Criteria:**

**Given** a dynamic sitemap is generated
**When** accessing `/sitemap.xml`
**Then** all public pages are included:
  - Homepage, About, Work, Writing, Resources, Contact
  - All published posts
  - All published projects
  - All published startups
  - All public product pages
**And** lastmod dates are accurate
**And** priority values are set appropriately (homepage: 1.0, main pages: 0.8, content: 0.6)

**Given** robots.txt is configured
**When** accessing `/robots.txt`
**Then** it allows crawling of public pages
**And** it disallows crawling of admin routes (`/admin/*`)
**And** it disallows crawling of customer portal (`/account/*`)
**And** it disallows crawling of auth routes (`/login`, `/signup`, etc.)
**And** it references the sitemap location

**Given** admin and customer pages are protected from indexing
**When** search engines request admin or customer pages
**Then** those pages include `<meta name="robots" content="noindex, nofollow">`
**And** unauthorized pages return proper HTTP status codes (401/403)
