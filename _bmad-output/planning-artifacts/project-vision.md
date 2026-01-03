# Riqle - Project Vision & Overview

## Purpose & Vision

This project is a personal digital platform that functions simultaneously as:
- A professional identity hub
- A portfolio and proof-of-work archive
- A commerce platform for educational resources and courses
- A startup showcase for ventures such as MarkPoint
- A long-term personal knowledge and content system

The aim is to create a single, authoritative source of truth for:
- who the founder is,
- what they've built,
- how they think,
- and how users can meaningfully engage with their work.

Rather than a static résumé or marketing landing page, the platform is designed as a **living system** that grows with the founder's career, ventures, and intellectual output.

---

## Core Goals

### 1. Identity & Narrative
To clearly communicate:
- the founder's background and journey,
- non-linear career decisions,
- values and principles guiding their work,
- current focus and long-term direction.

This helps external audiences (recruiters, collaborators, investors, users) quickly understand context, motivation, and credibility.

### 2. Proof of Work & Impact
To demonstrate real execution through:
- portfolio projects (coding, UI/UX, systems),
- accolades and awards,
- startups built and operated,
- quantified impact (students taught, users served, products shipped).

The platform prioritises **outcomes and learning**, not vanity metrics.

### 3. Education & Value Creation
To distribute high-quality educational material built from firsthand experience, including:
- HSC English resources,
- structured online courses,
- free learning materials to establish trust,
- paid resources for sustainability.

The platform is designed to reduce friction for learners while ensuring secure delivery and fair monetisation.

### 4. Startup & Venture Showcase
To professionally present startups such as MarkPoint:
- explaining the problem space,
- articulating the product and mission,
- showcasing traction and experimentation,
- and linking out to live products.

This enables the founder to build public credibility as a **builder and operator**, not just an individual contributor.

### 5. Long-Term Scalability & Robustness
To ensure the platform is:
- production-grade,
- secure,
- observable,
- and extensible.

The project is intentionally architected with:
- authentication and role-based access control,
- payments and webhooks,
- audit logs,
- background jobs,
- and reliable infrastructure from day one.

This allows the platform to grow from a personal site into a fully-fledged ecosystem without needing rewrites.

---

## Feature Overview

### Public-Facing Features
- Homepage with clear positioning and calls-to-action
- About page with structured personal narrative and timeline
- Portfolio & accolades showcase
- Writing / essays / blog
- Startup pages (e.g. MarkPoint)
- Resources & courses catalogue
- Contact and collaboration inquiry forms

### Authenticated User Features
- User accounts with secure authentication
- Purchase history and receipts
- Access to purchased resources and courses
- Secure downloads via expiring links
- Course progress tracking (for online courses)

### Commerce & Payments
- Stripe-powered checkout
- Secure webhook-driven fulfillment
- Idempotent order processing
- Refund and access management
- Tax and pricing extensibility

### Admin & Operations
- Role-based admin dashboard
- CRUD management for:
  - content
  - products
  - courses
  - startups
- Manual access overrides and support tools
- Audit logs for sensitive actions

### Infrastructure & Quality
- Robust database schema with migrations
- Observability (logging, error tracking, metrics)
- Background job processing
- Secure file storage
- Automated backups and recovery plan
- CI/CD with quality gates

---

## Design Philosophy

The platform is built with the following principles:

**Clarity over cleverness**
- Every page should communicate its purpose within seconds.

**Substance over aesthetics**
- Design showcases taste, but content and outcomes come first.

**Trust over hype**
- Neutral, factual language is favoured over sales-heavy copy.

**Scalability without bloat**
- Features are added intentionally, with future extensibility in mind.

**User respect**
- No dark patterns, intrusive popups, or artificial urgency.

---

## Intended Audiences

- Recruiters and hiring managers
- Startup collaborators and investors
- Students and learners
- Customers purchasing educational resources
- Other builders and founders

Each audience is supported through clear navigation paths without compromising the overall coherence of the platform.

---

## Success Criteria

The project is considered successful if it:
- clearly communicates the founder's identity and direction,
- demonstrates real-world execution and impact,
- provides tangible value to learners,
- supports sustainable monetisation,
- and remains maintainable as scope grows.

---

## Summary

This project is **not a personal website in the traditional sense**.

It is a foundational platform designed to unify:
- personal narrative,
- professional proof,
- educational value,
- and entrepreneurial ambition

into a single, coherent system.

It serves both as a public-facing artifact and as the backbone for future ventures, content, and products.
