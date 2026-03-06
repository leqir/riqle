# CLAUDE.md - Riqle Project Guide

> **Claudemaxxing**: Maximizing Claude's effectiveness through systematic context engineering, autonomous iteration, and verification systems.
>
> Reference: https://claudemaxxing.org

## 🏆 Core Claudemaxxing Principles

### The Diamond Armour Model

Four components unlock Claude's full potential:

1. **Skills** — Reusable prompt templates (slash commands) that load on-demand
2. **MCPs** — Model Context Protocol for external services
3. **Context Engineering** — Persistent project memory via this file
4. **Verification Systems** — Automated quality checks

### The Ralph Loop: Autonomous Iteration

**Persist despite setbacks.** Never give up on a task. If one approach fails, try another:

- Each major attempt gets a fresh 200K token context window
- Binary pass/fail checks (tests either pass or fail, no partial credit)
- Autonomous completion without manual intervention where possible
- State lives in files, not context (sessions are resumable)

### CoVe Model: Chain-of-Verification

Four-stage process that increases accuracy by 28%:

1. **Create** — Generate initial response
2. **Outline** — Decompose into verification questions
3. **Verify** — Sub-agents check claims against documentation
4. **Emit** — Synthesize corrected output

### Get Shit Done (GSD) Framework

Structured 4-phase methodology:

1. **Discuss** — Lock decisions before implementation
2. **Plan** — Parallel task research (use Task tool with subagents)
3. **Execute** — Fresh context windows with atomic commits
4. **Verify** — Automated diagnostics (tests, lints, type checks)

## 📋 Project Context: Riqle

### What is Riqle?

A production-grade personal platform that unifies:

- **Professional Identity Hub** — Authentic narrative and career journey
- **Portfolio & Proof-of-Work** — Projects, accolades, quantified impact
- **Educational Commerce** — HSC English resources and online courses
- **Startup Showcase** — MarkPoint and other ventures
- **Knowledge System** — Essays, writing, and insights

### Tech Stack

**Core:**

- Next.js 15 (App Router) + TypeScript (strict mode)
- PostgreSQL + Prisma ORM
- tRPC (end-to-end type safety)
- React 19

**Auth & Payments:**

- NextAuth.js v5 (passwordless email magic links)
- Stripe (hosted checkout + webhooks)
- Vercel Blob (signed URLs for file storage)

**Infrastructure:**

- Inngest (background jobs)
- Resend (email delivery)
- Sentry (observability)
- Upstash Redis (rate limiting)
- Vercel (hosting)

### Key Directories

```
src/
├── app/                    # Next.js App Router (pages, layouts, API routes)
│   ├── api/                # API routes (webhooks, tRPC)
│   ├── (auth)/             # Auth pages (login, verify)
│   └── (commerce)/         # Commerce pages (products, checkout, access)
├── components/             # React components (UI + feature components)
├── lib/                    # Utilities, services, business logic
│   ├── db.ts               # Prisma client singleton
│   ├── rbac.ts             # Role-based access control
│   ├── ownership.ts        # Resource ownership checks
│   ├── audit.ts            # Audit logging
│   └── storage.ts          # Vercel Blob storage utilities
├── server/
│   └── api/                # tRPC routers
└── trpc/                   # tRPC setup (client, server, context)

prisma/
├── schema.prisma           # Database schema
├── seed.ts                 # Seed data
└── migrations/             # Migration history

docs/                       # Project documentation
_bmad/                      # BMad Method artifacts
```

## 🎯 Context Management Best Practices

### Front-Load Critical Information

> "Give me six hours to implement a feature and I will spend the first four writing the prompt."

**Quality is proportional to input quality.** This CLAUDE.md file exists to prevent context rot as windows fill.

### Use Fresh Sessions Strategically

- Start new sessions for major tasks to get full 200K token context budget
- Keep context utilization at 30-40% by storing state in files, not chat
- Leverage the Ralph Loop: if stuck, spawn a fresh session with learnings

### Avoid Context Bloat

- Don't read unnecessary files — be surgical with file operations
- Use specialized tools (Read/Edit/Write) instead of bash for file operations
- Batch independent operations with parallel tool calls
- Minimize round trips — get all needed information in one go

## ⚡ Tool Usage Efficiency

### Read Before Modifying

**ALWAYS read files before editing them.** The Edit tool will error if you haven't read the file first.

### Batch Independent Operations

Make parallel tool calls when operations don't depend on each other:

```javascript
// ✅ Good - parallel reads
Read(file1.ts)
Read(file2.ts)
Read(file3.ts)

// ❌ Bad - sequential when unnecessary
Read(file1.ts) → then Read(file2.ts) → then Read(file3.ts)
```

### Use Specialized Tools

- **File search:** Use `Glob` (NOT `find` or `ls`)
- **Content search:** Use `Grep` (NOT `grep` or `rg`)
- **Read files:** Use `Read` (NOT `cat`/`head`/`tail`)
- **Edit files:** Use `Edit` (NOT `sed`/`awk`)
- **Write files:** Use `Write` (NOT `echo >/cat <<EOF`)
- **Terminal ops:** Reserve `Bash` for git, npm, build commands

### Leverage Subagents Strategically

- **Simple searches:** Use `Glob` or `Grep` directly
- **Deep research:** Use `Task` tool with `subagent_type=Explore` (only when 3+ queries needed)
- **Avoid duplication:** Don't do the same searches a subagent is doing

## 🔧 Task Execution

### Read → Understand → Modify → Test

1. **Read** the relevant files completely
2. **Understand** existing patterns and architecture
3. **Modify** only what's necessary (avoid over-engineering)
4. **Test** your changes (run lints, type checks, tests)

### Keep It Simple

- Only make changes that are directly requested or clearly necessary
- Don't add features, refactor surrounding code, or make "improvements" beyond what was asked
- A bug fix doesn't need surrounding code cleaned up
- A simple feature doesn't need extra configurability
- Don't add docstrings, comments, or type annotations to code you didn't change

### No Backwards Compatibility Hacks

- Delete unused code completely (no `_unused`, `// removed`, re-exports, etc.)
- Trust that if something is unused, it can be safely deleted
- Avoid feature flags or shims when you can just change the code

### Security First

Watch for OWASP Top 10 vulnerabilities:

- SQL injection (use Prisma parameterized queries)
- XSS (sanitize user input, use React's built-in escaping)
- Command injection (avoid dynamic shell commands)
- Authentication bypass (verify auth checks in API routes)
- CSRF (leverage NextAuth's built-in protection)

If you notice insecure code, immediately fix it.

## 🗄️ Database & Prisma Patterns

### Schema Changes

1. Edit `prisma/schema.prisma`
2. Run `npm run db:migrate:dev` to create migration
3. Migration file is auto-generated in `prisma/migrations/`
4. Verify migration with `npm run db:generate && npm run typecheck`

### Query Patterns

```typescript
// ✅ Use Prisma client (imported from lib/db.ts)
import { prisma } from '@/lib/db';

// ✅ Type-safe queries
const user = await prisma.user.findUnique({
  where: { id: userId },
});

// ✅ Transactions for multi-step operations
await prisma.$transaction([
  prisma.order.create({ data: orderData }),
  prisma.entitlement.create({ data: entitlementData }),
]);

// ❌ Avoid raw SQL unless absolutely necessary
```

### Migration Best Practices

- Test migrations locally before deploying
- Use `npm run db:migrate` in production (not `db:push`)
- Never edit migration files after they've been deployed
- Keep migrations atomic (one logical change per migration)

## 🔐 Authentication & Authorization

### NextAuth.js v5 Patterns

```typescript
// ✅ Get session in Server Components
import { auth } from '@/lib/auth';

export default async function Page() {
  const session = await auth();
  if (!session) redirect('/auth/login');
  // ...
}

// ✅ Protect API routes
import { withAuth } from '@/lib/auth-helpers';

export const GET = withAuth(async (req, session) => {
  // session is guaranteed to exist
});
```

### Role-Based Access Control (RBAC)

```typescript
// ✅ Check permissions before operations
import { hasPermission } from '@/lib/rbac';

if (!hasPermission(session.user, 'admin:write')) {
  throw new Error('Forbidden');
}
```

### Ownership Checks

```typescript
// ✅ Verify resource ownership
import { verifyOwnership } from '@/lib/ownership';

await verifyOwnership({
  userId: session.user.id,
  resourceType: 'order',
  resourceId: orderId,
});
```

## 💳 Commerce & Stripe Patterns

### Payment Flow

1. Customer clicks checkout → Create Stripe Checkout Session
2. Redirect to Stripe's hosted page
3. Customer completes payment
4. Webhook fires → Idempotent processing
5. Order created, entitlement granted, email sent
6. Customer downloads resources with signed URLs

### Webhook Handling

```typescript
// ✅ Verify Stripe signatures
const sig = headers().get('stripe-signature');
const event = stripe.webhooks.constructEvent(body, sig, webhookSecret);

// ✅ Idempotent processing (use Stripe's idempotency key)
const existingOrder = await prisma.order.findUnique({
  where: { stripeCheckoutSessionId: session.id },
});
if (existingOrder) return; // Already processed

// ✅ Create order atomically
await prisma.$transaction([
  prisma.order.create({ data: orderData }),
  prisma.entitlement.create({ data: entitlementData }),
]);
```

### File Access with Signed URLs

```typescript
// ✅ Generate time-limited signed URLs
import { getSignedUrl } from '@/lib/storage';

const url = await getSignedUrl(blobPath, { expiresIn: 3600 }); // 1 hour
```

## 📧 Email Patterns (Resend)

```typescript
// ✅ Send transactional emails
import { resend } from '@/lib/email';

await resend.emails.send({
  from: 'Riqle <noreply@riqle.com>',
  to: user.email,
  subject: 'Order Confirmation',
  react: OrderConfirmationEmail({ order }), // React Email component
});
```

## 🧪 Testing & Quality

### Pre-Commit Checks

Before committing, ensure:

```bash
npm run lint           # ESLint passes
npm run typecheck      # TypeScript compiles
npm run format:check   # Code is formatted
npm run build          # Production build succeeds
```

### Test Coverage

- Write tests for critical paths (auth, payments, data mutations)
- E2E tests for user flows (login, checkout, resource access)
- Don't add tests for trivial code
- Tests should be deterministic and fast

## 🚀 Autonomous Operations

When running with `--dangerously-skip-permissions`:

1. **Auto-fix on errors** — If tests fail, analyze and fix without asking
2. **Complete migrations** — Run database migrations and verify they work
3. **Update documentation** — Keep docs in sync with code changes
4. **Verify changes** — Run relevant tests after modifications
5. **Atomic commits** — Commit logical units of work with clear messages

### Git Workflow

```bash
# ✅ Commit format (follow existing style)
git log --oneline -10  # Check recent commit messages
git add <specific-files>  # Don't use git add -A
git commit -m "type: concise description

Optional detailed explanation.

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

## ❌ Anti-Patterns to Avoid

- ❌ Creating files unnecessarily (especially .md files unless requested)
- ❌ Over-engineering simple features
- ❌ Adding comments to unchanged code
- ❌ Creating abstractions for single-use cases
- ❌ Proposing changes without reading the code first
- ❌ Giving time estimates
- ❌ Using excessive praise or validation language
- ❌ Backwards compatibility hacks (unused exports, renamed vars, etc.)
- ❌ Error handling for impossible scenarios (trust internal code)
- ❌ Feature flags for hypothetical future requirements

## ✅ Success Metrics

A successful session means:

- ✅ Task completed as requested (no more, no less)
- ✅ Tests pass (`npm run typecheck`, `npm run lint`, `npm run build`)
- ✅ No security vulnerabilities introduced
- ✅ Code follows existing patterns (check similar files first)
- ✅ Documentation updated if needed (only if APIs changed)
- ✅ No unnecessary changes made (minimal diff principle)
- ✅ Fresh context preserved (30-40% utilization, state in files)

## 📊 Current Project State

**Repository:** `/Users/nathanael/Desktop/Projects/riqle`

**Branch:** `master`

**Last Updated:** 2026-02-24

### What's Live

**Resources Commerce (complete):**

- HSC resources: 1984 annotated essay + Module A (Donne/Wit, Keats/Bright Star, Tempest/Hag-Seed) + Module C (Horological)
- Stripe checkout, webhooks, entitlements, signed URL delivery
- Category browsing at `/resources/browse/[...path]`
- Admin at `/admin/products`, `/admin/orders`, `/admin/entitlements`

**Tutoring System (infrastructure complete, scheduling IN PROGRESS):**

- `/tutoring` page live — single offering, A$80/hr, 1:1 HSC English
- DB tables: `TutoringPackage`, `TutoringSession`, `TutoringInquiry` (via `db:push`)
- tRPC router: `tutoring.*` (packages, sessions, inquiries)
- Admin at `/admin/tutoring`
- **Next:** Custom scheduling system (no Calendly — self-hosted availability + booking)
- Doc: `docs/features/tutoring/tutoring-system.md`

**Content (complete):**

- `/work`, `/writing`, `/startups`, `/about`, `/changelog`
- Projects: MarkPoint, Riqle (seeded)
- Essays: frameworks-over-content, feedback-speed-over-comprehensiveness (seeded)
- Startup: MarkPoint (seeded)

**Infrastructure (complete):**

- NextAuth.js v5 passwordless email magic links
- tRPC root router: posts, products, orders, admin, checkout, resources, tutoring
- Inngest background jobs, Resend email, Sentry, Upstash Redis rate limiting
- Analytics: Vercel Analytics + custom `AnalyticsEvent` DB table

### Seed Script State

The seed script (`prisma/seed.ts`) was fixed this session — all upsert creates now have
explicit `id` and `updatedAt` fields. Safe to re-run idempotently.

### Active Work: Custom Tutoring Scheduler

**Decision:** No Calendly. Building self-hosted availability + booking system into Riqle.

- Admin sets weekly availability rules + one-off blocks
- Students pick from generated open slots on `/tutoring/book`
- Confirmation email via Resend on booking
- No Google Calendar integration — manual availability management

**Key Commands:**

```bash
npm run dev              # Start dev server (http://localhost:3000)
npm run build            # Production build
npm run db:generate      # Generate Prisma client
npm run db:push          # Push schema changes (preferred — migration history has drift)
npm run db:studio        # Open Prisma Studio (GUI)
npm run create-admin     # Create admin user
npm run db:seed          # Seed all data (idempotent)
```

**Note on migrations:** The DB has schema drift from `db:push` usage. Use `db:push` for
all schema changes going forward, not `db:migrate:dev`.

## 🔄 Ralph Loop in Action

If a task fails or gets stuck:

1. **Analyze** why it failed (error messages, logs, diagnostics)
2. **Iterate** with a different approach (don't repeat the same failed action)
3. **Fresh context** if needed (spawn new session with learnings)
4. **Binary check** tests pass or fail (no partial credit)
5. **Persist** until task is complete (never give up)

**Example:**

- Test fails → Read error message → Identify root cause → Fix → Re-test
- Migration fails → Rollback → Adjust schema → Create new migration → Test
- Build fails → Check TypeScript errors → Fix type issues → Re-build

## 📚 Additional Resources

- **Project Docs:** `/docs/` (epics, architecture, API, deployment)
- **BMad Artifacts:** `/_bmad/` (product briefs, technical specs, workflows)
- **Prisma Schema:** `/prisma/schema.prisma`
- **Environment Template:** `/.env.example`

---

**Last Updated:** 2026-02-24
**Project:** Riqle - Personal Digital Platform
**Current Branch:** master
**Claude Model:** Sonnet 4.6 (claude-sonnet-4-6)

**Remember:** Quality is proportional to input quality. This file is your persistent context. Keep it updated as the project evolves.
