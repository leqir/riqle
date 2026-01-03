# Riqle - Personal Digital Platform

A production-grade personal platform that unifies professional identity, portfolio showcase, educational commerce, and startup ventures into a single coherent system.

## 🎯 Project Overview

Riqle serves as:

- **Professional Identity Hub** - Authentic narrative and career journey
- **Portfolio & Proof-of-Work** - Projects, accolades, and quantified impact
- **Educational Commerce** - HSC English resources and online courses
- **Startup Showcase** - MarkPoint and other ventures
- **Long-term Knowledge System** - Essays, writing, and insights

## 🏗️ Tech Stack

### Core

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript (strict mode)
- **Database:** PostgreSQL (via managed service)
- **ORM:** Prisma
- **API:** tRPC (end-to-end type safety)

### Authentication & Payments

- **Auth:** NextAuth.js v5 (passwordless email magic links)
- **Payments:** Stripe (hosted checkout + webhooks)
- **File Storage:** Vercel Blob (signed URLs)

### Infrastructure

- **Background Jobs:** Inngest
- **Email:** Resend
- **Observability:** Sentry
- **Rate Limiting:** Upstash Redis
- **Hosting:** Vercel

## 🚀 Getting Started

### Prerequisites

- Node.js 20+
- PostgreSQL database (local or managed)
- Stripe account (test mode keys)
- Resend account for email

### Quick Setup

1. **Clone and install:**

   ```bash
   git clone <repository-url>
   cd riqle
   npm install
   ```

2. **Environment setup:**

   ```bash
   cp .env.example .env.local
   # Edit .env.local with your actual credentials
   ```

3. **Database setup:**

   ```bash
   npx prisma generate
   npx prisma db push
   npx prisma db seed
   ```

4. **Start development server:**

   ```bash
   npm run dev
   ```

5. **Open http://localhost:3000**

### Stripe Webhook Testing (Local)

```bash
# Install Stripe CLI
brew install stripe/stripe-cli/stripe

# Login to Stripe
stripe login

# Forward webhooks to local
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

## 📦 Project Structure

```
riqle/
├── prisma/
│   ├── schema.prisma          # Database schema
│   └── seed.ts                # Seed data
├── src/
│   ├── app/                   # Next.js App Router
│   │   ├── api/               # API routes
│   │   ├── (auth)/            # Auth pages
│   │   └── (marketing)/       # Public pages
│   ├── components/            # React components
│   ├── lib/                   # Utilities
│   │   ├── db.ts              # Prisma client
│   │   ├── rbac.ts            # Role-based access control
│   │   ├── ownership.ts       # Resource ownership checks
│   │   ├── audit.ts           # Audit logging
│   │   └── storage.ts         # File storage
│   ├── server/
│   │   └── api/               # tRPC routers
│   ├── trpc/                  # tRPC setup
│   └── env.ts                 # Environment validation
├── docs/                      # Documentation
└── _bmad/                     # BMad Method artifacts
```

## 🔐 Security

- **Authentication:** Passwordless magic links (no password storage)
- **Sessions:** HttpOnly cookies (not accessible to JavaScript)
- **RBAC:** Role-based access control (admin, customer)
- **Audit Logs:** All sensitive actions logged
- **Rate Limiting:** Protection against brute force and abuse
- **CSP Headers:** Content Security Policy configured
- **Webhook Verification:** Stripe signature validation
- **File Access:** Signed URLs with expiration

## 💳 Commerce Flow

1. Customer browses products/courses
2. Clicks checkout → Creates Stripe Checkout Session
3. Completes payment on Stripe's hosted page
4. Webhook fires → Idempotent processing
5. Order created, entitlement granted, email sent
6. Customer can download resources with signed URLs

## 🧪 Testing

```bash
# Lint
npm run lint

# Type check
npm run typecheck

# Format check
npm run format:check

# Format fix
npm run format

# Build
npm run build
```

## 📚 Key Scripts

```bash
# Development
npm run dev                    # Start dev server
npm run build                  # Production build
npm run start                  # Start production server

# Database
npm run db:generate            # Generate Prisma client
npm run db:push                # Push schema to DB
npm run db:migrate             # Run migrations (production)
npm run db:migrate:dev         # Create migration (development)
npm run db:seed                # Seed database
npm run db:studio              # Open Prisma Studio

# Code Quality
npm run lint                   # Run ESLint
npm run typecheck              # Run TypeScript checks
npm run format                 # Format code
npm run format:check           # Check formatting
```

## 🌍 Environments

### Local Development

- Database: Local Postgres or dev instance
- Stripe: Test mode keys
- Emails: Preview mode (no actual sending)

### Staging

- Database: Staging Postgres
- Stripe: Test mode keys
- Emails: Real delivery (test domain)
- URL: `staging.riqle.com`

### Production

- Database: Production Postgres (automated backups)
- Stripe: Live mode keys
- Emails: Real delivery (production domain)
- URL: `riqle.com`

## 🔄 Deployment

### Vercel (Recommended)

1. Connect GitHub repository to Vercel
2. Configure environment variables
3. Enable preview deployments for PRs
4. Production deploys on merge to `main`

### Environment Variables

All required environment variables are documented in `.env.example`.

**CRITICAL:** Never commit `.env.local` to git!

## 📖 Documentation

- [Epic 0: Infrastructure](./docs/epics/epic-0-infrastructure.md)
- [Architecture Decisions](./docs/architecture.md)
- [API Documentation](./docs/api.md)
- [Deployment Guide](./docs/deployment.md)

## 🤝 Contributing

This is a personal project, but the infrastructure and patterns are designed to be production-grade and reusable.

## 📝 License

Private - All Rights Reserved

## 🙏 Acknowledgments

Built using the BMad Method (Business Model-Agnostic Development).

---

**Status:** Epic 0 (Infrastructure) - In Progress

✅ Database schema
✅ Authentication
✅ Payments infrastructure
✅ Background jobs
✅ Email system
✅ Observability
⏳ Full commerce validation
⏳ Production deployment
