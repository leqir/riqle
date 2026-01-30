# Hierarchical Resources System - Setup Guide

This guide walks you through activating the newly implemented hierarchical resources system for riqle.com.

## Overview

The system has been fully implemented with the following features:

- ✅ Database schema with `ResourceCategory` and `ProductCategory` models
- ✅ Hierarchical category structure (HSC → Year 12 → English Advanced → Module A)
- ✅ Advanced filtering (search, tags, sorting)
- ✅ TRPC API router for server-side data fetching
- ✅ Server and client components for SEO optimisation
- ✅ Mobile-responsive design with Stripe-esque minimalist aesthetic
- ✅ Full type safety with TypeScript

## What Was Implemented

### 1. Database Schema Changes

**Files Modified:**

- `prisma/schema.prisma`

**New Models:**

- `ResourceCategory` - Hierarchical category structure
- `ProductCategory` - Junction table for many-to-many relationship

**Product Model Updates:**

- Removed `displayOrder` field (now per-category via ProductCategory)
- Added `searchVector` for full-text search
- Added `tags` array for flexible tagging
- Added `categories` relation

### 2. Seed Data

**Files Created:**

- `prisma/seeds/resource-categories.ts`

**Categories Created:**

```
HSC
├── Year 11
└── Year 12
    ├── English Advanced
    │   ├── Common Module
    │   ├── Module A: Textual Conversations
    │   ├── Module B: Critical Study of Literature
    │   └── Module C: The Craft of Writing
    ├── English Extension 1
    ├── English Extension 2
    └── Mathematics Advanced
Theology (unpublished)
University (unpublished)
```

### 3. API Layer

**Files Created:**

- `src/server/api/routers/resources.ts` - TRPC router with procedures:
  - `getCategories` - Fetch categories with product counts
  - `getResources` - Fetch filtered/paginated resources
  - `getBreadcrumbs` - Get category breadcrumb trail
  - `getFilterOptions` - Get available tags/formats for filtering
  - `getCategoryByPath` - Get single category details

**Files Modified:**

- `src/server/api/root.ts` - Added resources router

### 4. Type Definitions

**Files Created:**

- `src/types/resources.ts` - TypeScript types for resources system

### 5. Components

**Server Components (SEO-optimised):**

- `src/components/content/resources/browse/category-grid.tsx`
- `src/components/content/resources/browse/breadcrumbs.tsx`

**Client Components (Interactive):**

- `src/components/content/resources/browse/resource-list.tsx`
- `src/components/content/resources/filtering/search-bar.tsx`
- `src/components/content/resources/filtering/filter-panel.tsx`

### 6. Pages

**Files Created:**

- `src/app/(content)/resources/browse/[[...path]]/page.tsx` - Category browsing page

**Files Modified:**

- `src/app/(content)/resources/page.tsx` - Updated main resources page with category navigation

### 7. TRPC Client Setup

**Files Created:**

- `src/lib/trpc/client.ts` - TRPC React client
- `src/lib/trpc/provider.tsx` - TRPC + React Query provider

**Files Modified:**

- `src/app/layout.tsx` - Added TRPCProvider

---

## Activation Steps

### Step 1: Install Dependencies (if needed)

Check if these packages are installed. If not, install them:

```bash
npm install @trpc/react-query @tanstack/react-query superjson
```

### Step 2: Run Database Migration

⚠️ **IMPORTANT:** Before running the migration, note that it will:

- Remove the `displayOrder` column from the `Product` table (existing data will be lost)
- Add new tables: `ResourceCategory` and `ProductCategory`
- Add `searchVector` and `tags` columns to `Product`

**Backup your database first:**

```bash
# Create a backup (adjust for your database)
# For Neon/PostgreSQL, use pg_dump or Neon's backup feature
```

**Run the migration:**

```bash
npx prisma migrate dev --name add_resource_category_system
```

This will:

1. Create the new tables
2. Add indexes for performance
3. Update the Product table

### Step 3: Run Seed Script

Populate the database with initial HSC categories:

```bash
npx tsx prisma/seeds/resource-categories.ts
```

This will create:

- 1 HSC root category
- 2 year levels (Year 11, Year 12)
- 4 subjects (English Advanced, English Extension 1, English Extension 2, Mathematics Advanced)
- 4 modules for English Advanced
- 2 placeholder categories (Theology, University) - unpublished

**Expected Output:**

```
🌱 Seeding resource categories...
✓ Created HSC root category
✓ Created Year 11 and Year 12 categories
✓ Created English Advanced category
✓ Created 4 module categories for English Advanced
✓ Created English Extension 1 category
✓ Created English Extension 2 category
✓ Created Mathematics Advanced category
✓ Created placeholder categories for Theology and University

✅ Resource categories seeded successfully!
📊 Total categories created: 13
```

### Step 4: Migrate Existing Products to Categories

You'll need to assign your existing products to categories. Here's a script template:

**Create:** `scripts/migrate-products-to-categories.ts`

```typescript
import { PrismaClient } from '@prisma/client';
import { createId } from '@paralleldrive/cuid2';

const prisma = new PrismaClient();

async function migrateProducts() {
  // Get all published products
  const products = await prisma.product.findMany({
    where: { published: true },
  });

  // Example: Get the "English Advanced > Module A" category
  const moduleACategory = await prisma.resourceCategory.findUnique({
    where: { path: 'hsc/year-12/english-advanced/module-a' },
  });

  if (!moduleACategory) {
    throw new Error('Category not found');
  }

  // Assign each product to a category
  for (const product of products) {
    await prisma.productCategory.create({
      data: {
        id: createId(),
        productId: product.id,
        categoryId: moduleACategory.id,
        isPrimary: true, // This is the primary category
        displayOrder: 0, // Set display order within category
      },
    });

    // Optionally add tags
    await prisma.product.update({
      where: { id: product.id },
      data: {
        tags: ['essay-writing', 'critical-analysis'], // Add relevant tags
      },
    });
  }

  console.log(`✅ Migrated ${products.length} products to categories`);
}

migrateProducts()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
```

**Run it:**

```bash
npx tsx scripts/migrate-products-to-categories.ts
```

### Step 5: Generate Prisma Client

Regenerate the Prisma client with the new schema:

```bash
npx prisma generate
```

### Step 6: Test the System

1. **Start the development server:**

   ```bash
   npm run dev
   ```

2. **Test these URLs:**
   - `/resources` - Main landing page with category cards
   - `/resources/browse` - Root browse page
   - `/resources/browse/hsc` - HSC resources
   - `/resources/browse/hsc/year-12` - Year 12 resources
   - `/resources/browse/hsc/year-12/english-advanced` - English Advanced
   - `/resources/browse/hsc/year-12/english-advanced/module-a` - Module A

3. **Test filtering:**
   - Search for keywords
   - Filter by tags
   - Sort by different options
   - Verify pagination works

### Step 7: Add More Categories (Optional)

To add more subjects or modules, use Prisma Studio or create a script:

```bash
npx prisma studio
```

Or create categories programmatically:

```typescript
// Example: Add Mathematics Extension 1
const year12 = await prisma.resourceCategory.findUnique({
  where: { path: 'hsc/year-12' },
});

await prisma.resourceCategory.create({
  data: {
    id: createId(),
    name: 'Mathematics Extension 1',
    slug: 'mathematics-extension-1',
    path: 'hsc/year-12/mathematics-extension-1',
    level: 2,
    parentId: year12!.id,
    displayOrder: 5,
    published: true,
    description: 'Study resources for HSC Mathematics Extension 1',
    metaTitle: 'HSC Mathematics Extension 1 Resources',
    metaDescription: 'Comprehensive resources for HSC Mathematics Extension 1',
  },
});
```

---

## URL Structure Reference

### Category Pages

- `/resources` - Main landing with category navigation
- `/resources/browse` - All categories root
- `/resources/browse/{category-path}` - Specific category (e.g., `/resources/browse/hsc/year-12/english-advanced`)

### Product Pages (unchanged)

- `/resources/{product-slug}` - Individual product detail

### Query Parameters

- `?search=essay` - Search filter
- `?tags=essay-writing,critical-analysis` - Tag filters
- `?sort=price-asc` - Sort option

---

## Troubleshooting

### Migration Fails

**Error:** "Product has 2 non-null values in displayOrder"

**Solution:** The migration needs to drop the displayOrder column. Data will be lost, but it's now stored per-category in ProductCategory. If you need to preserve the order:

1. Before migration, save displayOrder values
2. Run migration
3. Use the saved values to set displayOrder in ProductCategory

### TRPC Errors

**Error:** "Cannot find module '@trpc/react-query'"

**Solution:** Install missing dependencies:

```bash
npm install @trpc/react-query @tanstack/react-query superjson
```

### Products Not Showing

**Issue:** Products don't appear in categories

**Cause:** Products haven't been assigned to categories yet

**Solution:** Run the product migration script (Step 4)

### Infinite Scroll Not Working

**Issue:** "Load More" button doesn't work

**Possible Causes:**

1. TRPC client not configured correctly
2. React Query not installed
3. API route not accessible

**Solution:**

1. Check browser console for errors
2. Verify `/api/trpc` endpoint is accessible
3. Check TRPC provider is wrapping the app

---

## Performance Optimization

### Database Indexes

The schema includes these indexes for performance:

- `ResourceCategory`: path, parentId, level, displayOrder, published
- `ProductCategory`: productId, categoryId, isPrimary
- `Product`: tags

### Caching Strategy

- React Query stale time: 5 seconds
- React Query cache time: 10 minutes
- Server-side static generation with 5-minute revalidation (can be configured)

### Pagination

- Cursor-based pagination (more efficient than offset)
- Default limit: 20 products per page
- Infinite scroll pattern with "Load More" button

---

## Next Steps

1. **Content Population:**
   - Categorize all existing products
   - Add tags to products for cross-category discovery
   - Write SEO-optimised descriptions for each category

2. **Testing:**
   - Test all category pages
   - Test search functionality
   - Test filter combinations
   - Cross-browser testing

3. **Analytics:**
   - Track category navigation usage
   - Track search queries
   - Track filter usage
   - Monitor conversion rates

4. **Future Enhancements:**
   - Add "Related resources" recommendations
   - Create resource bundles
   - Add student reviews/ratings
   - Build admin dashboard for category management

---

## Support

If you encounter issues:

1. Check this guide's Troubleshooting section
2. Review the implementation plan at `/Users/nathanael/.claude/projects/-Users-nathanael-Desktop-Projects-riqle/8b4452d0-eda7-4140-b9f4-19146eaa9e49.jsonl`
3. Check browser console for errors
4. Verify all dependencies are installed

---

**Implementation Date:** 2026-01-30
**Status:** Ready for Activation
**Estimated Setup Time:** 30-60 minutes
