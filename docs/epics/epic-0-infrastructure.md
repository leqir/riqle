# Epic 0: Core Infrastructure, Backend & Data Foundation

**Status:** Ready for Implementation
**Priority:** Critical - Must Complete First
**Estimated Complexity:** High
**Dependencies:** None (Foundation Epic)

---

## Epic Overview

### Goal

Establish a production-grade foundation with database, authentication core, deployment pipeline, and commerce infrastructure. Users can register, login securely, and the platform has reliable infrastructure from day one that enables all future epics.

### User Outcome

When Epic 0 is complete, the system has:
- ✅ Secure authentication (admin + customer)
- ✅ Stripe checkout working reliably end-to-end
- ✅ Webhooks that are correct and idempotent
- ✅ Entitlements system that gates access properly
- ✅ Paid files secured with signed URLs
- ✅ Emails delivering access reliably
- ✅ Observability (logs & error tracking) making issues diagnosable
- ✅ Backups reducing existential risk
- ✅ CI/CD preventing broken deployments

**This epic makes everything else safe.**

### Functional Requirements Covered

- FR17: User authentication system
- FR18: Role-based access control

### Non-Functional Requirements Covered

- NFR6: Database migrations for schema versioning
- NFR7: Observability (logging, error tracking)
- NFR17: CI/CD pipeline with quality gates

### Additional Requirements

- Stripe webhook integration
- Idempotent order processing
- Background job processing
- Audit logs for sensitive actions
- Secure file storage with signed URLs
- Automated database backups
- Local development environment setup

---

## Architecture Decisions

### Tech Stack (Recommended: T3 Stack)

**Framework:** Next.js 14+ (App Router)
- Server-side rendering for SEO
- API routes for backend endpoints
- React Server Components for performance

**Database:** PostgreSQL (via Vercel Postgres, Supabase, or Neon)
- Managed service for reliability
- Connection pooling for serverless compatibility

**ORM:** Prisma or Drizzle
- Type-safe database access
- Migration tooling built-in
- Schema as code

**Authentication:** NextAuth.js v5 (Auth.js) or Clerk
- Passwordless email magic links (recommended)
- Session management with HttpOnly cookies
- RBAC support

**Payments:** Stripe
- Hosted Checkout (PCI compliance handled by Stripe)
- Webhook-driven fulfillment
- Database as source of truth

**File Storage:** Vercel Blob or AWS S3
- Private bucket by default
- Signed URL generation
- Metadata stored in database

**Email:** Resend or Postmark
- Transactional email delivery
- Template support
- Delivery tracking

**Background Jobs:** Vercel Cron + Inngest (or BullMQ if self-hosted)
- Async processing for emails and heavy tasks
- Retry logic with exponential backoff

**Observability:** Sentry + Vercel Analytics
- Error tracking with stack traces
- Request logs with correlation IDs
- Performance monitoring

---

## Stories

### Story 0.1: Repository & Engineering Baseline

**Priority:** Critical (Must Do First)
**Complexity:** Low
**Estimated Time:** 2-4 hours

#### User Story

As a developer,
I want a disciplined codebase with strict typing, linting, and pre-commit hooks,
So that code quality is enforced automatically and the codebase won't rot.

#### Acceptance Criteria

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

#### Implementation Checklist

- [ ] Initialize Next.js project with TypeScript
- [ ] Configure `tsconfig.json` with strict mode:
  ```json
  {
    "compilerOptions": {
      "strict": true,
      "noUncheckedIndexedAccess": true,
      "noImplicitOverride": true
    }
  }
  ```
- [ ] Install and configure ESLint:
  - `@typescript-eslint/eslint-plugin`
  - `eslint-config-next`
  - Custom rules for project standards
- [ ] Install and configure Prettier:
  - `.prettierrc` with consistent formatting
  - `.prettierignore` for build artifacts
- [ ] Set up Husky for git hooks:
  - Pre-commit: Run lint-staged
  - Commit-msg: Validate conventional commits (optional)
- [ ] Configure lint-staged:
  ```json
  {
    "*.{ts,tsx}": ["eslint --fix", "prettier --write"],
    "*.{json,md}": ["prettier --write"]
  }
  ```
- [ ] Create `.env.example` with all required variables:
  ```
  # Database
  DATABASE_URL=
  DIRECT_URL= # For migrations if using connection pooler

  # Auth
  NEXTAUTH_SECRET=
  NEXTAUTH_URL=

  # Stripe
  STRIPE_SECRET_KEY=
  STRIPE_PUBLISHABLE_KEY=
  STRIPE_WEBHOOK_SECRET=

  # Email
  EMAIL_FROM=
  EMAIL_API_KEY=

  # File Storage
  BLOB_READ_WRITE_TOKEN=

  # Observability
  SENTRY_DSN=
  ```
- [ ] Add environment variable validation at boot using Zod:
  ```typescript
  import { z } from 'zod';

  const envSchema = z.object({
    DATABASE_URL: z.string().url(),
    NEXTAUTH_SECRET: z.string().min(32),
    STRIPE_SECRET_KEY: z.string().startsWith('sk_'),
    // ... all required vars
  });

  export const env = envSchema.parse(process.env);
  ```
- [ ] Create comprehensive README with:
  - Prerequisites (Node version, pnpm/npm)
  - Quick start steps
  - Environment setup
  - Common troubleshooting
- [ ] Set up GitHub repository with branch protection rules

#### Testing Requirements

- [ ] Verify CI fails on lint errors
- [ ] Verify CI fails on type errors
- [ ] Verify app crashes with helpful error on missing env vars
- [ ] Test new developer onboarding (fresh clone to running app)

---

### Story 0.2: Environments - Local, Staging, Production

**Priority:** Critical
**Complexity:** Medium
**Estimated Time:** 4-6 hours

#### User Story

As a developer,
I want isolated local, staging, and production environments,
So that I can prevent "it worked on my machine" issues and reduce deployment anxiety.

#### Acceptance Criteria

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

#### Implementation Checklist

**Local Environment:**
- [ ] Create `.env.local` for local development (gitignored)
- [ ] Set up local Postgres via Docker Compose or managed dev DB
- [ ] Configure Stripe test mode keys
- [ ] Set up Stripe CLI for webhook forwarding
- [ ] Use local email testing (email preview or service like MailHog)

**Staging Environment:**
- [ ] Provision staging database (separate from production)
- [ ] Deploy staging to Vercel staging environment or equivalent
- [ ] Configure staging domain: `staging.riqle.com`
- [ ] Set Stripe test mode keys in staging env vars
- [ ] Configure staging webhook endpoint in Stripe
- [ ] Set up staging email sending (can use test email or real with prefix)

**Production Environment:**
- [ ] Provision production database with appropriate plan
- [ ] Deploy production to Vercel production environment
- [ ] Configure production domain: `riqle.com`
- [ ] Set Stripe live mode keys in production env vars
- [ ] Configure production webhook endpoint in Stripe
- [ ] Set up production email sending with domain authentication

**Environment Variables Strategy:**
- [ ] Create environment variable naming convention:
  - `NEXT_PUBLIC_*` for client-exposed vars
  - Regular names for server-only vars
- [ ] Document which vars are required in which environment
- [ ] Use Vercel environment variable scopes:
  - Development (local)
  - Preview (PR deployments)
  - Production

**Preview Deployments (Vercel):**
- [ ] Enable preview deployments for all PRs
- [ ] Configure preview deployments to use:
  - Staging database (or preview-specific DB)
  - Stripe test mode keys
  - Staging webhook endpoints
- [ ] Add preview URL to PR comments automatically

#### Testing Requirements

- [ ] Deploy to staging and verify:
  - Separate database from production
  - Stripe test purchases don't affect production
  - Webhook events route correctly
- [ ] Create a test PR and verify preview deployment:
  - Deploys automatically
  - Uses correct environment variables
  - Isolated from staging and production
- [ ] Verify environment indicator visible in each environment (e.g., badge in header)

#### Environment Indicator Component

```typescript
// components/EnvironmentBadge.tsx
export function EnvironmentBadge() {
  const env = process.env.NODE_ENV;
  const isProduction = process.env.NEXT_PUBLIC_VERCEL_ENV === 'production';

  if (isProduction) return null;

  return (
    <div className="fixed top-0 left-0 bg-yellow-500 text-black px-2 py-1 text-xs font-mono z-50">
      {process.env.NEXT_PUBLIC_VERCEL_ENV || 'local'}
    </div>
  );
}
```

---

### Story 0.3: Hosting, Domains, and Security Headers Baseline

**Priority:** High
**Complexity:** Medium
**Estimated Time:** 3-5 hours

#### User Story

As a site operator,
I want professional domain setup with HTTPS and security headers,
So that the public surface is secure and trustworthy by default.

#### Acceptance Criteria

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

#### Implementation Checklist

**Domain Setup:**
- [ ] Register domain: `riqle.com`
- [ ] Configure DNS records:
  - A record for apex domain → Vercel IP
  - CNAME for www → Vercel
  - (or) CNAME for both using Vercel DNS
- [ ] Add domain to Vercel project
- [ ] Verify SSL certificate auto-provisioning
- [ ] Decide canonical domain (recommend apex: `riqle.com`)
- [ ] Configure redirect from non-canonical to canonical

**Security Headers Configuration (Next.js):**

Create `next.config.js` with headers:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://js.stripe.com", // Stripe
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: https: blob:",
              "font-src 'self' data:",
              "connect-src 'self' https://api.stripe.com", // Stripe
              "frame-src https://js.stripe.com https://hooks.stripe.com", // Stripe
              "frame-ancestors 'none'",
              "base-uri 'self'",
              "form-action 'self'"
            ].join('; ')
          }
        ]
      }
    ];
  }
};

module.exports = nextConfig;
```

**HTTPS Enforcement:**
- [ ] Verify Vercel automatically redirects HTTP → HTTPS
- [ ] Test all page routes for HTTPS enforcement
- [ ] Ensure canonical domain redirects work

**CSP Refinement:**
- [ ] Start with permissive CSP, test all functionality
- [ ] Gradually tighten CSP directives
- [ ] Add nonce-based CSP for inline scripts if needed
- [ ] Test Stripe checkout with CSP (allow js.stripe.com)
- [ ] Monitor CSP violations in production

#### Testing Requirements

- [ ] Use SecurityHeaders.com to scan the site
- [ ] Verify A+ rating on SSL Labs
- [ ] Test all security headers present:
  ```bash
  curl -I https://riqle.com
  ```
- [ ] Verify HSTS preload eligibility
- [ ] Test Stripe checkout works with CSP
- [ ] Verify no console CSP violation errors
- [ ] Test on multiple browsers (Chrome, Firefox, Safari)

---

### Story 0.4: Database Provisioning & Connection Strategy (Serverless-Safe)

**Priority:** Critical
**Complexity:** Medium
**Estimated Time:** 4-6 hours

#### User Story

As a developer,
I want a stable Postgres setup with proper connection pooling,
So that the database won't fall apart under concurrency or serverless constraints.

#### Acceptance Criteria

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

#### Implementation Checklist

**Database Provisioning:**

Choose one of these managed Postgres providers:

**Option A: Vercel Postgres (Neon underneath)**
- [ ] Provision via Vercel dashboard
- [ ] Automatically gets connection pooler
- [ ] Environment variables auto-injected

**Option B: Supabase**
- [ ] Create project on Supabase
- [ ] Get connection strings (both direct and pooled)
- [ ] Add to environment variables

**Option C: Neon**
- [ ] Create project on Neon
- [ ] Enable connection pooling
- [ ] Get both DATABASE_URL and DIRECT_URL

**Connection Strategy for Serverless:**

For Prisma with serverless (Next.js on Vercel):

```typescript
// lib/db.ts
import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
    datasources: {
      db: {
        url: process.env.DATABASE_URL, // Use pooled connection
      },
    },
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db;

// Graceful shutdown
if (process.env.NODE_ENV === 'production') {
  process.on('beforeExit', async () => {
    await db.$disconnect();
  });
}
```

For migrations (needs direct connection):
```bash
# In package.json scripts
"db:migrate": "DATABASE_URL=$DIRECT_URL prisma migrate deploy",
"db:migrate:dev": "prisma migrate dev",
"db:studio": "DATABASE_URL=$DIRECT_URL prisma studio"
```

**Connection Pool Configuration:**

Prisma automatically handles connection pooling, but configure limits:

```prisma
// schema.prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
  directUrl = env("DIRECT_URL") // For migrations

  // Connection pool settings (via connection string parameters)
  // DATABASE_URL should include: ?connection_limit=10&pool_timeout=20
}
```

**Healthcheck Endpoint:**

```typescript
// app/api/health/route.ts
import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Simple query to verify DB connection
    await db.$queryRaw`SELECT 1`;

    return NextResponse.json(
      { status: 'healthy', database: 'connected' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Healthcheck failed:', error);

    return NextResponse.json(
      { status: 'unhealthy', database: 'disconnected', error: error.message },
      { status: 503 }
    );
  }
}
```

**Connection Retry Logic:**

```typescript
// lib/db-with-retry.ts
export async function queryWithRetry<T>(
  queryFn: () => Promise<T>,
  maxRetries = 3,
  delay = 1000
): Promise<T> {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await queryFn();
    } catch (error) {
      if (attempt === maxRetries) throw error;

      console.warn(`Query attempt ${attempt} failed, retrying in ${delay}ms...`);
      await new Promise(resolve => setTimeout(resolve, delay));
      delay *= 2; // Exponential backoff
    }
  }

  throw new Error('Max retries exceeded');
}
```

#### Testing Requirements

- [ ] Test healthcheck returns 200 when DB is up
- [ ] Test healthcheck returns 503 when DB is unreachable
- [ ] Load test with 50 concurrent requests:
  ```bash
  ab -n 1000 -c 50 https://riqle.com/api/health
  ```
- [ ] Verify no connection pool exhaustion errors
- [ ] Monitor connection pool usage in database dashboard
- [ ] Test graceful degradation when DB is slow

#### Monitoring & Alerts

- [ ] Set up database monitoring dashboard
- [ ] Alert on connection pool saturation (>80% usage)
- [ ] Alert on query response time degradation
- [ ] Monitor slow queries and add indexes as needed

---

### Story 0.5: Schema Design - Core Tables and Relationships (v0)

**Priority:** Critical
**Complexity:** High
**Estimated Time:** 8-12 hours

#### User Story

As a developer,
I want a well-designed database schema that supports content and commerce,
So that the system is modeled correctly from the start.

#### Acceptance Criteria

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

#### Complete Prisma Schema

```prisma
// prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL")
  directUrl = env("DIRECT_URL")
}

// ============================================================================
// IDENTITY & ACCESS
// ============================================================================

model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String?
  image     String?

  // Stripe mapping
  stripeCustomerId String? @unique

  // Auth
  emailVerified DateTime?
  sessions      Session[]
  accounts      Account[]

  // RBAC
  userRoles UserRole[]

  // Relations
  posts         Post[]
  projects      Project[]
  startups      Startup[]
  mediaAssets   MediaAsset[]
  orders        Order[]
  entitlements  Entitlement[]
  auditLogs     AuditLog[]

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([email])
  @@index([stripeCustomerId])
}

model Account {
  id                String  @id @default(cuid())
  userId            String
  type              String
  provider          String
  providerAccountId String
  refresh_token     String? @db.Text
  access_token      String? @db.Text
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String? @db.Text
  session_state     String?

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
  @@index([userId])
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([userId])
}

model VerificationToken {
  identifier String
  token      String   @unique
  expires    DateTime

  @@unique([identifier, token])
}

model Role {
  id          String     @id @default(cuid())
  name        String     @unique // admin, editor, customer
  description String?
  userRoles   UserRole[]
  createdAt   DateTime   @default(now())
  updatedAt   DateTime   @updatedAt
}

model UserRole {
  id        String   @id @default(cuid())
  userId    String
  roleId    String
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  role      Role     @relation(fields: [roleId], references: [id], onDelete: Cascade)
  createdAt DateTime @default(now())

  @@unique([userId, roleId])
  @@index([userId])
  @@index([roleId])
}

// ============================================================================
// CONTENT
// ============================================================================

model Post {
  id          String    @id @default(cuid())
  title       String
  slug        String    @unique
  content     String    @db.Text
  excerpt     String?   @db.Text
  publishedAt DateTime?
  status      String    @default("draft") // draft, published, archived
  authorId    String
  author      User      @relation(fields: [authorId], references: [id])

  // SEO
  metaTitle       String?
  metaDescription String?
  ogImage         String?

  // Relations
  tags    TagLink[]

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([slug])
  @@index([publishedAt])
  @@index([status])
  @@index([authorId])
}

model Project {
  id           String   @id @default(cuid())
  title        String
  slug         String   @unique
  description  String   @db.Text
  outcomes     String?  @db.Text
  technologies String[] // Array of tech tags
  links        Json?    // Flexible JSON for various link types
  featured     Boolean  @default(false)
  order        Int      @default(0)
  status       String   @default("draft") // draft, published, archived
  authorId     String
  author       User     @relation(fields: [authorId], references: [id])

  // SEO
  metaTitle       String?
  metaDescription String?
  ogImage         String?

  // Relations
  tags TagLink[]

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([slug])
  @@index([featured])
  @@index([status])
  @@index([order])
  @@index([authorId])
}

model Startup {
  id          String  @id @default(cuid())
  title       String
  slug        String  @unique
  description String  @db.Text
  problem     String? @db.Text
  solution    String? @db.Text
  traction    String? @db.Text
  status      String  @default("draft") // draft, published, archived
  links       Json?   // Flexible JSON for various links
  authorId    String
  author      User    @relation(fields: [authorId], references: [id])

  // SEO
  metaTitle       String?
  metaDescription String?
  ogImage         String?

  // Relations
  tags TagLink[]

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([slug])
  @@index([status])
  @@index([authorId])
}

model Page {
  id       String  @id @default(cuid())
  title    String
  slug     String  @unique
  content  String  @db.Text
  template String? // Optional template identifier
  status   String  @default("draft")

  // SEO
  metaTitle       String?
  metaDescription String?
  ogImage         String?

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([slug])
  @@index([status])
}

model MediaAsset {
  id        String  @id @default(cuid())
  key       String  @unique // Storage key/path
  url       String  // Public or signed URL
  size      Int     // Bytes
  mimeType  String
  alt       String?
  checksum  String? // For integrity verification
  createdBy String
  creator   User    @relation(fields: [createdBy], references: [id])

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([key])
  @@index([createdBy])
}

model Tag {
  id    String    @id @default(cuid())
  name  String    @unique
  slug  String    @unique
  links TagLink[]

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([slug])
}

model TagLink {
  id     String @id @default(cuid())
  tagId  String
  tag    Tag    @relation(fields: [tagId], references: [id], onDelete: Cascade)

  // Polymorphic relation (one of these will be set)
  postId    String?
  post      Post?    @relation(fields: [postId], references: [id], onDelete: Cascade)
  projectId String?
  project   Project? @relation(fields: [projectId], references: [id], onDelete: Cascade)
  startupId String?
  startup   Startup? @relation(fields: [startupId], references: [id], onDelete: Cascade)

  @@unique([tagId, postId])
  @@unique([tagId, projectId])
  @@unique([tagId, startupId])
  @@index([tagId])
  @@index([postId])
  @@index([projectId])
  @@index([startupId])
}

// ============================================================================
// COMMERCE
// ============================================================================

model Product {
  id          String  @id @default(cuid())
  name        String
  slug        String  @unique
  description String  @db.Text
  status      String  @default("draft") // draft, published, archived
  type        String  @default("resource") // resource, course, bundle

  // File/content references
  files Json? // Array of file keys from MediaAsset

  // Relations
  prices       Price[]
  orderItems   OrderItem[]
  entitlements Entitlement[]

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([slug])
  @@index([status])
  @@index([type])
}

model Price {
  id              String     @id @default(cuid())
  productId       String
  product         Product    @relation(fields: [productId], references: [id], onDelete: Cascade)

  // Price details
  amount          Int        // in cents
  currency        String     @default("USD")
  interval        String?    // null for one-time, "month"/"year" for subscriptions
  stripePriceId   String?    @unique

  // Status
  active          Boolean    @default(true)

  orderItems      OrderItem[]

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([productId])
  @@index([stripePriceId])
  @@index([active])
}

model Order {
  id                 String      @id @default(cuid())
  userId             String?     // Null for guest purchases initially
  user               User?       @relation(fields: [userId], references: [id])

  // Order details
  status             String      @default("pending") // pending, processing, completed, failed, refunded
  total              Int         // in cents
  currency           String      @default("USD")

  // Stripe references
  stripeSessionId    String?     @unique
  stripePaymentIntentId String?  @unique

  // Customer info (for guest purchases)
  customerEmail      String
  customerName       String?

  // Relations
  items              OrderItem[]
  entitlements       Entitlement[]

  // Fulfillment
  fulfilledAt        DateTime?
  refundedAt         DateTime?

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([userId])
  @@index([status])
  @@index([createdAt])
  @@index([stripeSessionId])
  @@index([customerEmail])
}

model OrderItem {
  id        String  @id @default(cuid())
  orderId   String
  order     Order   @relation(fields: [orderId], references: [id], onDelete: Cascade)
  productId String
  product   Product @relation(fields: [productId], references: [id])
  priceId   String
  price     Price   @relation(fields: [priceId], references: [id])

  // Snapshot at time of purchase (prices can change later)
  amount      Int
  currency    String
  productName String

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([orderId])
  @@index([productId])
  @@index([priceId])
}

model Entitlement {
  id        String   @id @default(cuid())
  userId    String
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  productId String
  product   Product  @relation(fields: [productId], references: [id])
  orderId   String?
  order     Order?   @relation(fields: [orderId], references: [id])

  // Access control
  active    Boolean  @default(true)
  expiresAt DateTime? // Null for lifetime access
  revokedAt DateTime?
  revokeReason String?

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@unique([userId, productId])
  @@index([userId])
  @@index([productId])
  @@index([orderId])
  @@index([active])
}

model StripeEvent {
  id            String   @id @default(cuid())
  eventId       String   @unique // Stripe event ID for idempotency
  type          String   // Event type (checkout.session.completed, etc.)
  processed     Boolean  @default(false)
  processingError String? @db.Text
  data          Json     // Full event data

  createdAt DateTime @default(now())
  processedAt DateTime?

  @@index([eventId])
  @@index([type])
  @@index([processed])
}

model IdempotencyKey {
  id        String   @id @default(cuid())
  key       String   @unique
  operation String   // Description of operation
  result    Json?    // Result of operation (optional)

  createdAt DateTime @default(now())
  expiresAt DateTime // Keys can expire after some time

  @@index([key])
  @@index([expiresAt])
}

// ============================================================================
// OPERATIONS
// ============================================================================

model AuditLog {
  id        String   @id @default(cuid())
  userId    String?
  user      User?    @relation(fields: [userId], references: [id])

  action    String   // "role_change", "manual_access_grant", "refund", etc.
  entity    String   // "user", "order", "entitlement", etc.
  entityId  String
  details   Json?    // Additional context
  ipAddress String?
  userAgent String?

  createdAt DateTime @default(now())

  @@index([userId])
  @@index([action])
  @@index([entity, entityId])
  @@index([createdAt])
}

model EmailLog {
  id        String   @id @default(cuid())
  to        String
  subject   String
  status    String   // "sent", "failed", "pending"
  provider  String   // "resend", "postmark", etc.
  messageId String?  // Provider message ID
  error     String?  @db.Text

  sentAt    DateTime?
  failedAt  DateTime?

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([to])
  @@index([status])
  @@index([createdAt])
}
```

#### Schema Design Decisions

**Why separate `prices` from `products`?**
- Prices can change over time
- Order history must reflect the price at time of purchase
- Supports future subscription pricing without schema changes

**Why `status` fields instead of soft deletes?**
- Clearer semantics (draft/published/archived)
- Easier to query specific states
- Historical records remain intact
- No need for complex `deletedAt IS NULL` filters everywhere

**Why `TagLink` polymorphic junction table?**
- Tags can apply to posts, projects, and startups
- Avoids duplicate tag tables
- Maintains referential integrity

**Why `StripeEvent` table?**
- Idempotency: Prevent duplicate processing of webhooks
- Debugging: Full event history
- Reconciliation: Audit trail for all payment events

**Why `IdempotencyKey` separate from `StripeEvent`?**
- General-purpose idempotency for non-Stripe operations
- Supports retry logic anywhere in the system
- Can expire and be cleaned up

#### Testing Requirements

- [ ] Generate initial migration
- [ ] Run migration on local database
- [ ] Verify all tables created successfully
- [ ] Test foreign key constraints work correctly
- [ ] Verify unique constraints prevent duplicates
- [ ] Test indexes improve query performance
- [ ] Seed database with sample data for each table
- [ ] Verify all relationships can be queried correctly

---

### Story 0.6: Migrations, Seeding, and Schema Governance

**Priority:** High
**Complexity:** Medium
**Estimated Time:** 4-6 hours

#### User Story

As a developer,
I want safe database migration tooling with seeding capabilities,
So that "DB changes are safe" becomes a rule, not a hope.

#### Acceptance Criteria

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

#### Implementation Checklist

**Initial Migration:**

```bash
# Create initial migration from Prisma schema
npx prisma migrate dev --name init

# This creates:
# - prisma/migrations/TIMESTAMP_init/migration.sql
# - Updates prisma/schema.prisma
```

**Migration Workflow:**

```json
// package.json scripts
{
  "scripts": {
    "db:migrate": "prisma migrate deploy",
    "db:migrate:dev": "prisma migrate dev",
    "db:migrate:reset": "prisma migrate reset",
    "db:push": "prisma db push", // For prototyping only, NOT production
    "db:seed": "tsx prisma/seed.ts",
    "db:studio": "prisma studio"
  }
}
```

**Seed Script:**

```typescript
// prisma/seed.ts
import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create roles
  const adminRole = await prisma.role.upsert({
    where: { name: 'admin' },
    update: {},
    create: {
      name: 'admin',
      description: 'Administrator with full access',
    },
  });

  const customerRole = await prisma.role.upsert({
    where: { name: 'customer' },
    update: {},
    create: {
      name: 'customer',
      description: 'Customer with access to purchased resources',
    },
  });

  // Create admin user
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@riqle.com' },
    update: {},
    create: {
      email: 'admin@riqle.com',
      name: 'Nathanael',
      emailVerified: new Date(),
    },
  });

  // Assign admin role
  await prisma.userRole.upsert({
    where: {
      userId_roleId: {
        userId: adminUser.id,
        roleId: adminRole.id,
      },
    },
    update: {},
    create: {
      userId: adminUser.id,
      roleId: adminRole.id,
    },
  });

  // Create sample products
  const resourceProduct = await prisma.product.upsert({
    where: { slug: 'hsc-english-essay-guide' },
    update: {},
    create: {
      name: 'HSC English Essay Writing Guide',
      slug: 'hsc-english-essay-guide',
      description: 'Comprehensive guide to writing high-scoring HSC English essays, based on real tutoring experience with students achieving Band 6 results.',
      status: 'published',
      type: 'resource',
    },
  });

  // Create price for resource
  await prisma.price.upsert({
    where: { stripePriceId: 'price_seed_hsc_guide' }, // Placeholder
    update: {},
    create: {
      productId: resourceProduct.id,
      amount: 2900, // $29.00
      currency: 'USD',
      stripePriceId: 'price_seed_hsc_guide',
      active: true,
    },
  });

  // Create sample posts
  await prisma.post.upsert({
    where: { slug: 'building-in-public' },
    update: {},
    create: {
      title: 'Building in Public: Lessons from Building Riqle',
      slug: 'building-in-public',
      content: 'Sample content about building this platform...',
      excerpt: 'Reflections on building a personal platform that unifies identity, proof of work, and commerce.',
      status: 'published',
      publishedAt: new Date(),
      authorId: adminUser.id,
    },
  });

  // Create sample project
  await prisma.project.upsert({
    where: { slug: 'markpoint' },
    update: {},
    create: {
      title: 'MarkPoint',
      slug: 'markpoint',
      description: 'A startup focused on [problem space]. Built to [value proposition].',
      outcomes: '500+ users, $X MRR, Featured on Product Hunt',
      technologies: ['Next.js', 'TypeScript', 'Prisma', 'Stripe'],
      featured: true,
      status: 'published',
      order: 1,
      authorId: adminUser.id,
    },
  });

  // Create sample startup
  await prisma.startup.upsert({
    where: { slug: 'markpoint-startup' },
    update: {},
    create: {
      title: 'MarkPoint',
      slug: 'markpoint-startup',
      description: 'Detailed startup showcase...',
      problem: 'The problem we\'re solving...',
      solution: 'Our approach...',
      traction: 'Current metrics and growth...',
      status: 'published',
      authorId: adminUser.id,
    },
  });

  console.log('✅ Seed completed successfully');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```

Configure in `package.json`:
```json
{
  "prisma": {
    "seed": "tsx prisma/seed.ts"
  }
}
```

**Migration Best Practices:**

Create `docs/migration-guide.md`:

```markdown
# Migration Guide

## Rules

1. **NEVER** manually edit the database in production
2. **ALWAYS** create migrations for schema changes
3. **ALWAYS** test migrations on staging first
4. **ALWAYS** ensure backward compatibility when possible

## Workflow

### Development
1. Modify `schema.prisma`
2. Run `pnpm db:migrate:dev --name descriptive-name`
3. Review generated SQL in `prisma/migrations/`
4. Test migration locally
5. Commit migration files

### Staging
1. Deploy code with new migration
2. Run `pnpm db:migrate` in staging
3. Verify migration succeeded
4. Test affected features

### Production
1. **Review checklist:**
   - Migration tested in staging? ✓
   - Backward compatible? ✓
   - Data migration needed? ✓
   - Indexes added for performance? ✓
2. Deploy code
3. Run `pnpm db:migrate` in production
4. Monitor for errors
5. Verify data integrity

## Rollback Procedure

If a migration fails:

1. **Don't panic** - Prisma tracks migration state
2. Fix the issue in code
3. Create a new migration that fixes the problem
4. Deploy the fix

For severe issues:
1. Restore from latest backup
2. Replay migrations up to last known good state
3. Fix and redeploy

## Common Patterns

### Adding a column (backward compatible)
```prisma
model User {
  // Existing fields...
  newField String? // Make it optional initially
}
```

### Renaming a column (requires data migration)
1. Add new column
2. Migrate data (separate script)
3. Update code to use new column
4. Remove old column (later migration)

### Adding an index
```prisma
model Order {
  userId String

  @@index([userId])
}
```
```

#### Testing Requirements

- [ ] Reset database and run all migrations from scratch
- [ ] Verify all tables, columns, indexes created correctly
- [ ] Run seed script multiple times (verify idempotent)
- [ ] Verify admin user can login
- [ ] Verify sample products exist and are queryable
- [ ] Test migration rollback procedure
- [ ] Document migration process in README

---

---

### Story 0.7: API Architecture & Request Validation Standard

**Priority:** Critical
**Complexity:** Medium
**Estimated Time:** 6-8 hours

#### User Story

As a developer,
I want every API endpoint to be predictable, typed, and safe,
So that the backend is robust and clients can't send invalid data.

#### Acceptance Criteria

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
**And** HTTP status codes are used correctly

**Given** the architecture principle of "no business logic in client"
**When** reviewing the codebase
**Then** all business logic resides on the server
**And** clients only handle presentation and user interaction

#### Implementation Checklist

- [ ] Choose API approach: **Recommended: tRPC for type safety**
  - Alternative: REST with Zod validation on all routes
- [ ] Install tRPC: `@trpc/server @trpc/client @trpc/next @trpc/react-query`
- [ ] Create tRPC router structure:
  ```typescript
  // server/api/trpc.ts
  import { initTRPC, TRPCError } from '@trpc/server';
  import { type Context } from './context';

  const t = initTRPC.context<Context>().create({
    errorFormatter({ shape }) {
      return shape;
    },
  });

  export const router = t.router;
  export const publicProcedure = t.procedure;
  export const protectedProcedure = t.procedure.use(async ({ ctx, next }) => {
    if (!ctx.session?.user) {
      throw new TRPCError({ code: 'UNAUTHORIZED' });
    }
    return next({
      ctx: {
        session: { ...ctx.session, user: ctx.session.user },
      },
    });
  });
  export const adminProcedure = protectedProcedure.use(async ({ ctx, next }) => {
    const isAdmin = await checkUserRole(ctx.session.user.id, 'admin');
    if (!isAdmin) {
      throw new TRPCError({ code: 'FORBIDDEN' });
    }
    return next({ ctx });
  });
  ```
- [ ] Create context with session:
  ```typescript
  // server/api/context.ts
  import { type CreateNextContextOptions } from '@trpc/server/adapters/next';
  import { getServerAuthSession } from '@/server/auth';

  export const createContext = async (opts: CreateNextContextOptions) => {
    const session = await getServerAuthSession(opts);
    return { session, db };
  };
  ```
- [ ] Create routers for each domain:
  - `server/api/routers/posts.ts` (public + admin procedures)
  - `server/api/routers/products.ts`
  - `server/api/routers/orders.ts`
  - `server/api/routers/admin.ts`
- [ ] Use Zod for all input validation:
  ```typescript
  export const postsRouter = router({
    getAll: publicProcedure
      .input(z.object({
        limit: z.number().min(1).max(100).default(10),
        cursor: z.string().optional(),
      }))
      .query(async ({ input, ctx }) => {
        const posts = await ctx.db.post.findMany({
          where: { status: 'published' },
          take: input.limit + 1,
          cursor: input.cursor ? { id: input.cursor } : undefined,
        });
        // ... pagination logic
      }),
  });
  ```
- [ ] Implement consistent error handling
- [ ] Create API client for frontend
- [ ] Document API patterns in README

#### Testing Requirements

- [ ] Test validation rejects invalid inputs
- [ ] Test error responses have consistent format
- [ ] Test unauthorized access returns 401
- [ ] Test admin-only endpoints return 403 for non-admins
- [ ] Test all CRUD operations work correctly
- [ ] Verify type safety end-to-end (client to server)

---

### Story 0.8: Authentication (Admin + Customers) and Sessions

**Priority:** Critical
**Complexity:** High
**Estimated Time:** 8-10 hours

#### User Story

As a user (admin or customer),
I want secure login that doesn't create UX friction,
So that I can access my account safely and easily.

#### Acceptance Criteria

**Given** an auth provider approach is chosen
**When** implementing authentication
**Then** passwordless email magic link is implemented (recommended), OR
**Then** email/password with reset flow is implemented
**And** the chosen approach is consistent across all environments

**Given** session security requirements
**When** a user logs in successfully
**Then** session cookies are HttpOnly (not readable by JavaScript)
**And** sessions have short-lived duration with refresh or rolling expiration
**And** sessions are stored securely

**Given** brute force protection is needed
**When** implementing login endpoints
**Then** rate limits are applied to login attempts
**And** repeated failed attempts trigger rate limiting

**Given** the auth system is deployed
**When** testing on staging and production
**Then** admin login works correctly
**And** sessions persist across page reloads
**And** logout functionality clears sessions completely

#### Implementation Checklist

- [ ] Install NextAuth.js: `next-auth@beta` (v5)
- [ ] Configure NextAuth with email provider:
  ```typescript
  // auth.config.ts
  import type { NextAuthConfig } from 'next-auth';
  import Resend from 'next-auth/providers/resend';

  export const authConfig = {
    providers: [
      Resend({
        from: 'noreply@riqle.com',
      }),
    ],
    adapter: PrismaAdapter(db),
    session: { strategy: 'jwt', maxAge: 30 * 24 * 60 * 60 }, // 30 days
    pages: {
      signIn: '/login',
      verifyRequest: '/verify-email',
      error: '/error',
    },
    callbacks: {
      authorized({ auth, request: { nextUrl } }) {
        const isLoggedIn = !!auth?.user;
        const isOnAdminPage = nextUrl.pathname.startsWith('/admin');

        if (isOnAdminPage) {
          if (isLoggedIn) return true;
          return false; // Redirect to login
        }
        return true;
      },
      async jwt({ token, user }) {
        if (user) {
          token.id = user.id;
          token.role = await getUserRole(user.id);
        }
        return token;
      },
      async session({ session, token }) {
        if (session.user) {
          session.user.id = token.id;
          session.user.role = token.role;
        }
        return session;
      },
    },
  } satisfies NextAuthConfig;
  ```
- [ ] Create auth helper function:
  ```typescript
  // lib/auth.ts
  import { auth } from '@/auth';

  export async function requireAuth() {
    const session = await auth();
    if (!session?.user) {
      throw new Error('Unauthorized');
    }
    return session;
  }

  export async function requireAdmin() {
    const session = await requireAuth();
    const isAdmin = await checkUserRole(session.user.id, 'admin');
    if (!isAdmin) {
      throw new Error('Forbidden');
    }
    return session;
  }
  ```
- [ ] Implement login page with email input
- [ ] Create middleware for protected routes
- [ ] Add rate limiting to login endpoint (see Story 0.16)
- [ ] Test magic link flow end-to-end
- [ ] Configure session security (HttpOnly cookies)

#### Testing Requirements

- [ ] Test successful login flow
- [ ] Test invalid email rejected
- [ ] Test magic link expires after use
- [ ] Test session persists across page reloads
- [ ] Test logout clears session completely
- [ ] Test rate limiting on login attempts
- [ ] Verify HttpOnly cookies set correctly

---

### Story 0.9: Authorization (RBAC) + Ownership Rules

**Priority:** High
**Complexity:** Medium
**Estimated Time:** 6-8 hours

#### User Story

As a system operator,
I want role-based access control and ownership checks,
So that we prevent accidental exposure and admin mistakes.

#### Acceptance Criteria

**Given** roles are defined (admin, customer)
**When** a user is created
**Then** they are assigned at least one role
**And** roles determine what resources they can access

**Given** route guards are implemented
**When** a non-admin user attempts to access admin pages
**Then** they are denied access with 403 Forbidden
**And** ownership checks prevent customers from accessing other customers' data

**Given** an audit log exists
**When** sensitive actions occur
**Then** the action is logged with userId, timestamp, action type, and details

#### Implementation Checklist

- [ ] Create role check utilities:
  ```typescript
  // lib/rbac.ts
  export async function checkUserRole(userId: string, roleName: string) {
    const userRole = await db.userRole.findFirst({
      where: {
        userId,
        role: { name: roleName },
      },
    });
    return !!userRole;
  }

  export async function requireRole(userId: string, roleName: string) {
    const hasRole = await checkUserRole(userId, roleName);
    if (!hasRole) {
      throw new Error(`Required role: ${roleName}`);
    }
  }
  ```
- [ ] Implement ownership checks:
  ```typescript
  // lib/ownership.ts
  export async function checkOrderOwnership(orderId: string, userId: string) {
    const order = await db.order.findUnique({
      where: { id: orderId },
      select: { userId: true },
    });
    return order?.userId === userId;
  }

  export async function requireOwnership(resourceId: string, userId: string, type: 'order' | 'post' | 'project') {
    let owns = false;
    if (type === 'order') {
      owns = await checkOrderOwnership(resourceId, userId);
    }
    // ... other types

    if (!owns) {
      throw new Error('Forbidden: You do not own this resource');
    }
  }
  ```
- [ ] Create audit logging utility:
  ```typescript
  // lib/audit.ts
  export async function logAuditEvent({
    userId,
    action,
    entity,
    entityId,
    details,
    ipAddress,
    userAgent,
  }: {
    userId?: string;
    action: string;
    entity: string;
    entityId: string;
    details?: any;
    ipAddress?: string;
    userAgent?: string;
  }) {
    await db.auditLog.create({
      data: {
        userId,
        action,
        entity,
        entityId,
        details,
        ipAddress,
        userAgent,
      },
    });
  }
  ```
- [ ] Add middleware for admin routes
- [ ] Protect all admin tRPC procedures with `adminProcedure`
- [ ] Add ownership checks to customer portal endpoints
- [ ] Log all sensitive actions (role changes, manual grants, refunds)

#### Testing Requirements

- [ ] Test non-admin cannot access admin pages
- [ ] Test non-admin cannot call admin API endpoints
- [ ] Test customer cannot access other customer's orders
- [ ] Test audit log records sensitive actions
- [ ] Test admin can perform all actions
- [ ] Verify proper 401/403 error codes

---

### Story 0.10: Secure File Storage and Delivery (Resources/Courses)

**Priority:** High
**Complexity:** Medium
**Estimated Time:** 6-8 hours

#### User Story

As a site operator,
I want paid resources to be private but frictionless to deliver,
So that content is protected but customers have a smooth experience.

#### Acceptance Criteria

**Given** an object storage bucket is configured (private by default)
**When** files are uploaded
**Then** they are stored in a private bucket not publicly accessible
**And** asset metadata is stored in the database

**Given** a signed URL generation system
**When** a customer requests a download
**Then** an entitlement check is performed first
**And** if entitled, a signed URL is generated with expiration (5-30 minutes)

**Given** the secure file system is tested
**When** attempting to access files directly
**Then** no paid file is publicly accessible without a signed URL
**And** signed URLs expire after the configured time

#### Implementation Checklist

- [ ] Set up Vercel Blob (or S3 with private bucket)
  ```bash
  pnpm add @vercel/blob
  ```
- [ ] Create upload utility:
  ```typescript
  // lib/storage.ts
  import { put } from '@vercel/blob';

  export async function uploadFile(file: File, userId: string) {
    const blob = await put(file.name, file, {
      access: 'public', // Use public with signed URLs, or private
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });

    // Store metadata
    const asset = await db.mediaAsset.create({
      data: {
        key: blob.pathname,
        url: blob.url,
        size: file.size,
        mimeType: file.type,
        createdBy: userId,
      },
    });

    return asset;
  }
  ```
- [ ] Create signed URL generator:
  ```typescript
  // lib/signed-urls.ts
  export async function generateDownloadUrl(productId: string, userId: string) {
    // Check entitlement
    const entitlement = await db.entitlement.findFirst({
      where: {
        userId,
        productId,
        active: true,
      },
    });

    if (!entitlement) {
      throw new Error('No entitlement for this product');
    }

    // Get product files
    const product = await db.product.findUnique({
      where: { id: productId },
      select: { files: true },
    });

    // Generate signed URLs (expires in 30 minutes)
    const signedUrls = generateSignedUrls(product.files, 30 * 60);

    return signedUrls;
  }
  ```
- [ ] Add file upload endpoint (admin only)
- [ ] Add download endpoint with entitlement check
- [ ] Implement file type and size validation
- [ ] Test direct file access is denied

#### Testing Requirements

- [ ] Test admin can upload files
- [ ] Test uploaded files are not publicly accessible
- [ ] Test entitled user can generate signed URL
- [ ] Test non-entitled user cannot generate signed URL
- [ ] Test signed URLs expire after 30 minutes
- [ ] Test file metadata stored correctly in database

---

### Story 0.11: Stripe Integration - Data Mapping & Checkout Session Creation

**Priority:** Critical
**Complexity:** High
**Estimated Time:** 8-10 hours

#### User Story

As a customer,
I want to purchase products via Stripe checkout,
So that I can access paid resources securely.

#### Acceptance Criteria

**Given** Stripe is configured as the payment provider
**When** designing the data model
**Then** the database is the source of truth for orders and entitlements
**And** Stripe IDs are stored in the database for reference

**Given** a checkout session endpoint exists
**When** a customer initiates checkout for a product
**Then** the product and price are validated server-side
**And** a Stripe Checkout Session is created
**And** the customer is redirected to Stripe's hosted checkout page

**Given** the checkout flow is tested in staging
**When** initiating a test purchase
**Then** the Stripe checkout session is created successfully
**And** no access is granted client-side (only via webhook)

#### Implementation Checklist

- [ ] Install Stripe SDK: `pnpm add stripe`
- [ ] Configure Stripe client:
  ```typescript
  // lib/stripe.ts
  import Stripe from 'stripe';

  export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2023-10-16',
    typescript: true,
  });
  ```
- [ ] Create checkout session endpoint:
  ```typescript
  // server/api/routers/checkout.ts
  export const checkoutRouter = router({
    createSession: protectedProcedure
      .input(z.object({
        productId: z.string(),
        priceId: z.string(),
      }))
      .mutation(async ({ input, ctx }) => {
        const { productId, priceId } = input;
        const userId = ctx.session.user.id;

        // Verify product and price exist
        const price = await db.price.findUnique({
          where: { id: priceId },
          include: { product: true },
        });

        if (!price || price.productId !== productId) {
          throw new TRPCError({ code: 'BAD_REQUEST', message: 'Invalid product/price' });
        }

        // Get or create Stripe customer
        let stripeCustomerId = ctx.session.user.stripeCustomerId;
        if (!stripeCustomerId) {
          const customer = await stripe.customers.create({
            email: ctx.session.user.email,
            metadata: { userId },
          });
          stripeCustomerId = customer.id;

          await db.user.update({
            where: { id: userId },
            data: { stripeCustomerId },
          });
        }

        // Create checkout session
        const session = await stripe.checkout.sessions.create({
          customer: stripeCustomerId,
          mode: 'payment',
          line_items: [{
            price: price.stripePriceId,
            quantity: 1,
          }],
          success_url: `${process.env.NEXT_PUBLIC_URL}/account/orders?success=true`,
          cancel_url: `${process.env.NEXT_PUBLIC_URL}/resources/${price.product.slug}`,
          metadata: {
            userId,
            productId,
            priceId,
          },
        });

        return { sessionId: session.id, url: session.url };
      }),
  });
  ```
- [ ] Create Stripe products and prices in Stripe Dashboard
- [ ] Store Stripe price IDs in database
- [ ] Test checkout session creation
- [ ] Implement checkout button on frontend

#### Testing Requirements

- [ ] Test checkout session creation
- [ ] Test Stripe customer creation/reuse
- [ ] Test invalid product/price rejected
- [ ] Test redirect to Stripe checkout
- [ ] Verify metadata passed to Stripe
- [ ] Test on staging with Stripe test mode

---

### Story 0.12: Stripe Webhooks - Signature Verification & Idempotent Fulfillment

**Priority:** Critical
**Complexity:** Very High
**Estimated Time:** 10-12 hours

#### User Story

As a system operator,
I want robust webhook handling with idempotency,
So that payments are processed correctly every time without duplicates.

#### Acceptance Criteria

**Given** a webhook endpoint is configured
**When** Stripe sends a webhook event
**Then** the Stripe signature is verified using the webhook secret
**And** invalid signatures are rejected with 400 response

**Given** idempotency is critical
**When** the same webhook is received multiple times
**Then** the Stripe event.id is checked in the stripe_events table
**And** if already processed, the webhook returns 200 without reprocessing

**Given** a fulfillment pipeline is defined
**When** a successful payment webhook is processed
**Then** an order is created, order_items created, entitlements granted, and email enqueued
**And** all steps are wrapped in a database transaction where possible

**Given** webhook reliability is tested
**When** replaying a webhook event
**Then** orders and entitlements are not duplicated
**And** order state matches payment outcome every time

#### Implementation Checklist

- [ ] Create webhook endpoint:
  ```typescript
  // app/api/webhooks/stripe/route.ts
  import { headers } from 'next/headers';
  import Stripe from 'stripe';
  import { stripe } from '@/lib/stripe';

  export async function POST(req: Request) {
    const body = await req.text();
    const signature = headers().get('stripe-signature');

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(
        body,
        signature!,
        process.env.STRIPE_WEBHOOK_SECRET!
      );
    } catch (err) {
      console.error('Webhook signature verification failed:', err.message);
      return new Response('Webhook Error', { status: 400 });
    }

    // Check idempotency
    const existingEvent = await db.stripeEvent.findUnique({
      where: { eventId: event.id },
    });

    if (existingEvent?.processed) {
      console.log('Event already processed:', event.id);
      return new Response('OK', { status: 200 });
    }

    // Create event record
    await db.stripeEvent.create({
      data: {
        eventId: event.id,
        type: event.type,
        data: event.data as any,
        processed: false,
      },
    });

    // Handle events
    try {
      switch (event.type) {
        case 'checkout.session.completed':
          await handleCheckoutCompleted(event.data.object as Stripe.Checkout.Session);
          break;
        case 'charge.refunded':
          await handleRefund(event.data.object as Stripe.Charge);
          break;
        default:
          console.log(`Unhandled event type: ${event.type}`);
      }

      // Mark as processed
      await db.stripeEvent.update({
        where: { eventId: event.id },
        data: { processed: true, processedAt: new Date() },
      });

      return new Response('OK', { status: 200 });
    } catch (error) {
      console.error('Error processing webhook:', error);

      await db.stripeEvent.update({
        where: { eventId: event.id },
        data: { processingError: error.message },
      });

      return new Response('Processing Error', { status: 500 });
    }
  }

  async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
    const { userId, productId, priceId } = session.metadata as {
      userId: string;
      productId: string;
      priceId: string;
    };

    // Use transaction for atomicity
    await db.$transaction(async (tx) => {
      // Create order
      const order = await tx.order.create({
        data: {
          userId,
          status: 'completed',
          total: session.amount_total!,
          currency: session.currency!,
          stripeSessionId: session.id,
          stripePaymentIntentId: session.payment_intent as string,
          customerEmail: session.customer_email!,
          customerName: session.customer_details?.name,
          fulfilledAt: new Date(),
        },
      });

      // Create order item
      const price = await tx.price.findUnique({
        where: { id: priceId },
        include: { product: true },
      });

      await tx.orderItem.create({
        data: {
          orderId: order.id,
          productId,
          priceId,
          amount: price!.amount,
          currency: price!.currency,
          productName: price!.product.name,
        },
      });

      // Grant entitlement
      await tx.entitlement.create({
        data: {
          userId,
          productId,
          orderId: order.id,
          active: true,
        },
      });

      // Enqueue confirmation email (background job)
      await enqueueEmail({
        to: session.customer_email!,
        type: 'purchase-confirmation',
        data: { orderId: order.id },
      });
    });
  }

  async function handleRefund(charge: Stripe.Charge) {
    const order = await db.order.findFirst({
      where: { stripePaymentIntentId: charge.payment_intent as string },
    });

    if (!order) return;

    await db.$transaction(async (tx) => {
      // Update order status
      await tx.order.update({
        where: { id: order.id },
        data: {
          status: 'refunded',
          refundedAt: new Date(),
        },
      });

      // Revoke entitlements
      await tx.entitlement.updateMany({
        where: { orderId: order.id },
        data: {
          active: false,
          revokedAt: new Date(),
          revokeReason: 'refund',
        },
      });
    });
  }
  ```
- [ ] Configure webhook endpoint in Stripe Dashboard
- [ ] Set STRIPE_WEBHOOK_SECRET environment variable
- [ ] Test webhook with Stripe CLI locally
- [ ] Implement idempotency key usage for retries
- [ ] Add comprehensive error logging

#### Testing Requirements

- [ ] Test successful checkout.session.completed webhook
- [ ] Test duplicate webhook doesn't create duplicate orders
- [ ] Test refund webhook revokes entitlements
- [ ] Test invalid signature rejected
- [ ] Test webhook failure is logged
- [ ] Verify transaction rollback on error

---

### Story 0.13: Background Jobs & Retries (Fulfillment & Emails)

**Priority:** High
**Complexity:** Medium
**Estimated Time:** 6-8 hours

#### User Story

As a system operator,
I want background job processing with retries,
So that heavy work doesn't block HTTP requests and failures are handled gracefully.

#### Acceptance Criteria

**Given** a job runner/queue is configured
**When** heavy operations are needed
**Then** they are processed asynchronously via background jobs

**Given** a retry strategy is implemented
**When** a job fails
**Then** exponential backoff is used for retries
**And** jobs that exceed max retries are moved to dead-letter queue

**Given** webhook processing performance
**When** webhooks are received
**Then** webhook processing stays fast (< 500ms)
**And** heavy fulfillment work is offloaded to background jobs

#### Implementation Checklist

- [ ] Install Inngest (recommended for Vercel):
  ```bash
  pnpm add inngest
  ```
- [ ] Configure Inngest client:
  ```typescript
  // lib/inngest.ts
  import { Inngest } from 'inngest';

  export const inngest = new Inngest({ id: 'riqle' });
  ```
- [ ] Create email job:
  ```typescript
  // inngest/functions.ts
  import { inngest } from '@/lib/inngest';
  import { sendEmail } from '@/lib/email';

  export const sendPurchaseConfirmation = inngest.createFunction(
    { id: 'send-purchase-confirmation', retries: 3 },
    { event: 'email/purchase-confirmation' },
    async ({ event, step }) => {
      const { orderId, email } = event.data;

      await step.run('fetch-order', async () => {
        return await db.order.findUnique({
          where: { id: orderId },
          include: { items: { include: { product: true } } },
        });
      });

      await step.run('send-email', async () => {
        return await sendEmail({
          to: email,
          subject: 'Your Purchase Confirmation',
          template: 'purchase-confirmation',
          data: { order },
        });
      });
    }
  );
  ```
- [ ] Create API route for Inngest:
  ```typescript
  // app/api/inngest/route.ts
  import { serve } from 'inngest/next';
  import { inngest } from '@/lib/inngest';
  import { sendPurchaseConfirmation } from '@/inngest/functions';

  export const { GET, POST, PUT } = serve({
    client: inngest,
    functions: [sendPurchaseConfirmation],
  });
  ```
- [ ] Enqueue jobs from webhook handler
- [ ] Configure retry strategy with exponential backoff
- [ ] Set up dead-letter queue monitoring

#### Testing Requirements

- [ ] Test job enqueued successfully
- [ ] Test job executes and completes
- [ ] Test job retries on failure
- [ ] Test exponential backoff works
- [ ] Test dead-letter queue after max retries
- [ ] Monitor job execution time

---

### Story 0.14: Transactional Email Setup (Domain Legitimacy)

**Priority:** High
**Complexity:** Medium
**Estimated Time:** 4-6 hours

#### User Story

As a site operator,
I want professional transactional emails that don't land in spam,
So that receipts and access emails reach customers reliably.

#### Acceptance Criteria

**Given** an email provider is integrated
**When** sending emails
**Then** the integration is configured with API keys

**Given** domain DNS setup for email legitimacy
**When** configuring the sending domain
**Then** SPF, DKIM, and DMARC records are configured

**Given** email templates are defined
**When** sending transactional emails
**Then** templates exist for: purchase confirmation, access instructions, admin notifications

**Given** emails are sent via background jobs
**When** an email needs to be sent
**Then** it is enqueued as a background job

#### Implementation Checklist

- [ ] Install Resend: `pnpm add resend`
- [ ] Configure Resend client:
  ```typescript
  // lib/email.ts
  import { Resend } from 'resend';

  const resend = new Resend(process.env.RESEND_API_KEY);

  export async function sendEmail({
    to,
    subject,
    template,
    data,
  }: {
    to: string;
    subject: string;
    template: string;
    data: any;
  }) {
    const html = await renderTemplate(template, data);

    try {
      const result = await resend.emails.send({
        from: 'Riqle <noreply@riqle.com>',
        to,
        subject,
        html,
      });

      // Log email
      await db.emailLog.create({
        data: {
          to,
          subject,
          status: 'sent',
          provider: 'resend',
          messageId: result.id,
          sentAt: new Date(),
        },
      });

      return result;
    } catch (error) {
      // Log failure
      await db.emailLog.create({
        data: {
          to,
          subject,
          status: 'failed',
          provider: 'resend',
          error: error.message,
          failedAt: new Date(),
        },
      });

      throw error;
    }
  }
  ```
- [ ] Create email templates (React Email or plain HTML):
  ```typescript
  // emails/purchase-confirmation.tsx
  import { Html, Text, Button } from '@react-email/components';

  export default function PurchaseConfirmation({ order }: { order: any }) {
    return (
      <Html>
        <Text>Thank you for your purchase!</Text>
        <Text>Order ID: {order.id}</Text>
        <Button href={`${process.env.NEXT_PUBLIC_URL}/account/orders/${order.id}`}>
          View Order
        </Button>
      </Html>
    );
  }
  ```
- [ ] Configure DNS records in domain registrar:
  - SPF: `v=spf1 include:_spf.resend.com ~all`
  - DKIM: Add records provided by Resend
  - DMARC: `v=DMARC1; p=none; rua=mailto:dmarc@riqle.com`
- [ ] Verify domain in Resend dashboard
- [ ] Test email sending in staging

#### Testing Requirements

- [ ] Test purchase confirmation email sent
- [ ] Test email appears in inbox (not spam)
- [ ] Test email links work correctly
- [ ] Verify SPF/DKIM/DMARC passing
- [ ] Test email failure is logged

---

### Story 0.15: Observability - Logging, Errors, and Key Events

**Priority:** High
**Complexity:** Medium
**Estimated Time:** 6-8 hours

#### User Story

As a developer,
I want comprehensive logging and error tracking,
So that I can diagnose issues in minutes, not hours.

#### Acceptance Criteria

**Given** structured logging is implemented
**When** logging events
**Then** logs include: request ID, user ID, timestamp, event ID for Stripe

**Given** error tracking is configured (Sentry)
**When** exceptions occur
**Then** they are captured with full stack traces and error context

**Given** business event tracking is minimal but critical
**When** key events occur (checkout, payment, entitlement granted)
**Then** events are logged and traceable end-to-end

#### Implementation Checklist

- [ ] Install Sentry: `pnpm add @sentry/nextjs`
- [ ] Initialize Sentry:
  ```bash
  npx @sentry/wizard@latest -i nextjs
  ```
- [ ] Configure Sentry:
  ```typescript
  // sentry.server.config.ts
  import * as Sentry from '@sentry/nextjs';

  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    environment: process.env.NODE_ENV,
    tracesSampleRate: 1.0,
  });
  ```
- [ ] Create logging utility:
  ```typescript
  // lib/logger.ts
  export function logEvent(event: {
    type: string;
    userId?: string;
    data?: any;
    requestId?: string;
  }) {
    console.log(JSON.stringify({
      timestamp: new Date().toISOString(),
      ...event,
    }));
  }
  ```
- [ ] Add request ID middleware
- [ ] Log key business events:
  - Checkout created
  - Payment succeeded
  - Entitlement granted
  - Download link issued
- [ ] Configure Sentry error grouping
- [ ] Set up Sentry alerts for critical errors

#### Testing Requirements

- [ ] Test errors captured in Sentry
- [ ] Test logs include request ID
- [ ] Test business events logged correctly
- [ ] Verify end-to-end tracing works
- [ ] Test Sentry alerts trigger

---

### Story 0.16: Rate Limiting & Abuse Prevention

**Priority:** Medium
**Complexity:** Medium
**Estimated Time:** 4-6 hours

#### User Story

As a system operator,
I want rate limiting and abuse prevention,
So that cheap attacks and accidental overload don't cause issues.

#### Acceptance Criteria

**Given** rate limiting is configured
**When** implementing sensitive endpoints
**Then** rate limits are applied to: login, checkout, signed URL generation

**Given** rate limits are enforced
**When** a user exceeds the rate limit
**Then** they receive a 429 Too Many Requests response

#### Implementation Checklist

- [ ] Install rate limiting library: `pnpm add @upstash/ratelimit @upstash/redis`
- [ ] Configure rate limiter:
  ```typescript
  // lib/rate-limit.ts
  import { Ratelimit } from '@upstash/ratelimit';
  import { Redis } from '@upstash/redis';

  const redis = new Redis({
    url: process.env.UPSTASH_REDIS_URL!,
    token: process.env.UPSTASH_REDIS_TOKEN!,
  });

  export const loginRateLimit = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(5, '15 m'), // 5 attempts per 15 min
  });

  export const checkoutRateLimit = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(10, '1 h'),
  });
  ```
- [ ] Apply to login endpoint
- [ ] Apply to checkout endpoint
- [ ] Apply to signed URL generation
- [ ] Return 429 with Retry-After header

#### Testing Requirements

- [ ] Test rate limit blocks after threshold
- [ ] Test rate limit resets after time window
- [ ] Test 429 response includes Retry-After
- [ ] Verify legitimate users not impacted

---

### Story 0.17: Backups, Restore Plan, and Data Protection

**Priority:** High
**Complexity:** Low
**Estimated Time:** 4-6 hours

#### User Story

As a site operator,
I want automated backups with a tested restore plan,
So that catastrophic data loss is prevented.

#### Acceptance Criteria

**Given** automated database backups are configured
**When** backups run
**Then** they occur daily with 30-day retention

**Given** a restore procedure is documented
**When** reviewing the restore runbook
**Then** step-by-step restore instructions exist and are tested

#### Implementation Checklist

- [ ] Enable automated backups in database provider (Vercel Postgres/Neon/Supabase)
- [ ] Configure backup retention (30 days)
- [ ] Document restore procedure in `docs/restore-runbook.md`
- [ ] Test restore to staging database
- [ ] Set up backup monitoring/alerts
- [ ] Implement PII minimization (only store email, name)

#### Testing Requirements

- [ ] Verify backups running daily
- [ ] Test restore to staging successful
- [ ] Verify backup retention policy
- [ ] Confirm PII minimization practices

---

### Story 0.18: CI/CD Gates & Release Discipline

**Priority:** High
**Complexity:** Medium
**Estimated Time:** 4-6 hours

#### User Story

As a developer,
I want CI/CD pipeline gates and release discipline,
So that broken deployments are prevented.

#### Acceptance Criteria

**Given** CI checks are configured
**When** code is pushed
**Then** lint, typecheck, and tests run automatically

**Given** a staging-first release habit
**When** releasing features
**Then** changes deploy to staging first and are tested before production

#### Implementation Checklist

- [ ] Create GitHub Actions workflow:
  ```yaml
  # .github/workflows/ci.yml
  name: CI
  on: [push, pull_request]
  jobs:
    test:
      runs-on: ubuntu-latest
      steps:
        - uses: actions/checkout@v3
        - uses: pnpm/action-setup@v2
        - uses: actions/setup-node@v3
          with:
            node-version: 20
            cache: 'pnpm'
        - run: pnpm install
        - run: pnpm lint
        - run: pnpm typecheck
        - run: pnpm test
  ```
- [ ] Configure Vercel deployments:
  - Production: main branch
  - Staging: staging branch
  - Preview: all PRs
- [ ] Create pre-deploy checklist
- [ ] Document rollback procedure

#### Testing Requirements

- [ ] Test CI fails on lint error
- [ ] Test CI fails on type error
- [ ] Verify staging deploys before production
- [ ] Test rollback procedure

---

### Story 0.19: Local Developer Experience (One-Command Setup)

**Priority:** Medium
**Complexity:** Low
**Estimated Time:** 3-4 hours

#### User Story

As a developer,
I want one-command local setup,
So that I can iterate without friction and onboard quickly.

#### Acceptance Criteria

**Given** local setup is documented
**When** running setup commands
**Then** database, Stripe CLI, and app start successfully

**Given** a clear README exists
**When** a new developer follows it
**Then** they can be productive within 30 minutes

#### Implementation Checklist

- [ ] Create docker-compose for local Postgres (optional)
- [ ] Document Stripe CLI webhook forwarding setup
- [ ] Create setup script:
  ```bash
  # scripts/setup.sh
  #!/bin/bash
  cp .env.example .env.local
  pnpm install
  pnpm db:push
  pnpm db:seed
  echo "Setup complete! Run 'pnpm dev' to start"
  ```
- [ ] Update README with setup steps
- [ ] Add troubleshooting section

#### Testing Requirements

- [ ] Test fresh clone to running app
- [ ] Verify seed data loads correctly
- [ ] Test Stripe webhook forwarding works
- [ ] Verify new developer can onboard in < 30 min

---

### Story 0.20: "Commerce from Day 1" Validation Checklist

**Priority:** Critical
**Complexity:** High
**Estimated Time:** 6-8 hours

#### User Story

As a site operator,
I want to validate the complete purchase flow before launch,
So that the end-to-end purchase path is bulletproof.

#### Acceptance Criteria

**Given** all commerce infrastructure is complete
**When** testing the purchase flow
**Then** all must-pass scenarios are verified:
- Successful purchase grants entitlement and sends email
- Replayed webhook doesn't double-grant
- Refund revokes entitlement
- Signed download links expire
- Admin can manually resend access
- No paid asset is publicly accessible

**Given** failure recovery is tested
**When** simulating failures
**Then** email failure doesn't block purchase, webhook delays process correctly, duplicates prevented

#### Implementation Checklist

**Must-Pass Flow: Successful Purchase**
- [ ] Initiate checkout for test product
- [ ] Complete payment in Stripe test mode
- [ ] Verify webhook received and processed
- [ ] Verify order created in database
- [ ] Verify entitlement granted
- [ ] Verify confirmation email sent
- [ ] Verify customer can access resource

**Must-Pass Flow: Replayed Webhook**
- [ ] Process webhook successfully
- [ ] Send same webhook again via Stripe CLI
- [ ] Verify no duplicate order
- [ ] Verify no duplicate entitlement
- [ ] Verify 200 OK response

**Must-Pass Flow: Refund**
- [ ] Complete test purchase
- [ ] Issue refund in Stripe
- [ ] Verify refund webhook processed
- [ ] Verify entitlement revoked
- [ ] Verify customer cannot access resource

**Must-Pass Flow: Signed URL Expiration**
- [ ] Request download link as entitled customer
- [ ] Verify link works immediately
- [ ] Wait for expiration (or manipulate time)
- [ ] Verify link returns error after expiration

**Must-Pass Flow: Admin Resend Access**
- [ ] Navigate to admin order page
- [ ] Click "Resend Access"
- [ ] Verify customer receives new email

**Must-Pass Flow: Private Files**
- [ ] Attempt direct file access (no signed URL)
- [ ] Verify 403 or 404 response
- [ ] Verify files not discoverable

**Failure Recovery Tests**
- [ ] Simulate email provider failure
  - Verify purchase completes
  - Verify email job retries
- [ ] Simulate webhook delay
  - Verify order eventually processes
- [ ] Simulate duplicate webhook
  - Verify idempotency prevents duplicates

#### Testing Checklist

- [ ] All must-pass flows succeed in staging
- [ ] All failure scenarios handled correctly
- [ ] Run full test purchase in production test mode
- [ ] Document any edge cases discovered
- [ ] Commerce system is launch-ready

---

## Epic Completion Criteria

Epic 0 is considered **COMPLETE** when:

✅ All 20 stories pass their acceptance criteria
✅ The "Commerce from Day 1" validation checklist (Story 0.20) passes all flows
✅ Staging environment has successful test purchases end-to-end
✅ Production environment is configured and ready (but not yet launched)
✅ Documentation is complete for all infrastructure components
✅ Backup and restore procedures are tested
✅ Observability is in place and tested

**This foundation enables all subsequent epics to build safely and rapidly.**
