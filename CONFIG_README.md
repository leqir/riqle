# Root Configuration Files

This document explains why the Riqle project has 29+ files at the root directory level. These files MUST remain at root due to tool conventions and cannot be moved without breaking builds.

## Why So Many Root Files?

Modern web applications require configuration for multiple tools:
- **Build Tools**: Next.js, TypeScript, PostCSS, Tailwind
- **Code Quality**: ESLint, Prettier, lint-staged, Husky
- **Package Management**: npm (package.json, package-lock.json)
- **Monitoring**: Sentry (instrumentation + config files)
- **Version Control**: Git (.gitignore)
- **Documentation**: README.md
- **Environment**: .env files

Each tool expects its configuration at project root by convention.

## Configuration Files by Category

### Build & Framework (Required at Root)

**Next.js**
- `next.config.ts` - Next.js configuration (MUST be at root)
- `instrumentation.ts` - Server instrumentation hooks (referenced by Next.js build)
- `.next/` - Build cache directory

**TypeScript**
- `tsconfig.json` - TypeScript compiler configuration (MUST be at root)

**PostCSS & Tailwind**
- `postcss.config.mjs` - PostCSS configuration (MUST be at root)
- `tailwind.config.ts` - Tailwind CSS configuration (MUST be at root)

### Code Quality & Linting (Required at Root)

**ESLint**
- `eslint.config.mjs` - ESLint configuration (MUST be at root)

**Prettier**
- `.prettierrc` - Prettier formatting rules (MUST be at root)
- `.prettierignore` - Files to exclude from formatting

**Lint-staged**
- `.lintstagedrc.js` - Pre-commit linting configuration (MUST be at root)

### Git & Version Control

**Git**
- `.git/` - Git repository data
- `.gitignore` - Files to exclude from version control (MUST be at root)

**Husky**
- `.husky/` - Git hooks directory (MUST be at root)

### Package Management (Required at Root)

**npm**
- `package.json` - Dependencies and scripts (MUST be at root)
- `package-lock.json` - Locked dependency versions (MUST be at root)
- `node_modules/` - Installed dependencies (MUST be at root)

### Monitoring & Observability

**Sentry**
- `sentry.client.config.ts` - Client-side error tracking (referenced by instrumentation.ts)
- `sentry.server.config.ts` - Server-side error tracking (referenced by instrumentation.ts)
- `sentry.edge.config.ts` - Edge runtime error tracking (referenced by instrumentation.ts)
- `.env.sentry-build-plugin` - Sentry build plugin configuration

> **Note**: These files are referenced by `instrumentation.ts`, which is loaded by Next.js during build. Moving them breaks the import paths.

### Database & Backend

**Prisma**
- `prisma/` - Database schema and migrations

### Environment Variables

**Environment Files**
- `.env` - Local environment variables (DO NOT COMMIT - contains secrets)
- `.env.example` - Template for environment setup (safe to commit)
- `.env.sentry-build-plugin` - Sentry-specific environment (safe to commit)

### Documentation & Project Info

- `README.md` - Project documentation (GitHub convention)
- `CONFIG_README.md` - This file (explains root configuration)

### Source Code & Assets

- `src/` - Application source code
- `public/` - Static assets (Next.js convention)
- `types/` - Global TypeScript types
- `scripts/` - Utility scripts

### External Frameworks

- `_bmad/` - BMAD framework files

### CI/CD & Workflows

- `.github/` - GitHub Actions and workflows

## What Happens If We Move Config Files?

| File | What Breaks |
|------|-------------|
| `next.config.ts` | ❌ Build fails - Next.js cannot find configuration |
| `tsconfig.json` | ❌ TypeScript fails - Editor loses type checking |
| `eslint.config.mjs` | ❌ Linting fails - ESLint cannot find rules |
| `package.json` | ❌ Everything fails - npm cannot find dependencies |
| `instrumentation.ts` | ❌ Sentry breaks - Next.js cannot find instrumentation |
| `.prettierrc` | ❌ Formatting fails - Prettier cannot find rules |
| `tailwind.config.ts` | ❌ Styles fail - Tailwind cannot generate classes |
| `sentry.*.config.ts` | ❌ Monitoring breaks - instrumentation.ts imports fail |

## Alternative Approaches (Why They Don't Work)

### "Move configs to /config/"
- ❌ Tools don't support custom config paths
- ❌ Would require updating every tool's resolution logic
- ❌ Some tools (Next.js, npm) have hardcoded root requirements

### "Use monorepo structure"
- ❌ Adds complexity for single-app project
- ❌ Still requires root configs in each workspace
- ❌ Doesn't reduce root file count

### "Combine configs into single file"
- ❌ Each tool has its own file format requirements
- ❌ No standardization across ecosystem
- ❌ Would break tool integrations

## Best Practices for Root Directory Management

### ✅ DO:
- Keep configuration files well-documented (like this README)
- Use `.gitignore` to hide build artifacts and dependencies
- Group related configs mentally (build, lint, monitoring)
- Update `.env.example` when adding new environment variables

### ❌ DON'T:
- Don't move tool configuration files from root
- Don't add temporary files to root (use gitignore)
- Don't create custom config files at root unless necessary
- Don't commit `.env` (contains secrets)

## Current Root Directory Summary

**Total Items at Root**: ~29 files/directories
- Configuration files: 18
- Directories: 11
- Documentation: 2

**Can we reduce this?**
- No, without breaking builds and tooling
- This is standard for modern Next.js applications
- Other Next.js projects have similar root structures

## Comparison to Other Projects

Most Next.js applications have 25-35 root items:
- **Next.js starter**: ~28 files
- **Vercel templates**: ~30 files
- **Production apps**: ~35+ files

Riqle's 29 items is actually on the lighter end.

## Conclusion

The root directory organization is dictated by tool conventions, not project preference. While 29+ items seems like a lot, each serves a specific purpose and cannot be moved without breaking builds.

Instead of fighting tool conventions, we've organized everything else:
- `/docs/` - Clean 5-category hierarchy
- `/src/` - Well-organized route groups and components
- `/types/` - Centralized type definitions

This is the optimal structure given the constraints of the modern web development ecosystem.

---

Last updated: 2026-01-17
