/**
 * Type definitions for the Resources system
 */

import type { ResourceCategory, Product, ProductCategory } from '@prisma/client';

/**
 * Category with product count
 */
export type CategoryWithCount = ResourceCategory & {
  _count: {
    products: number;
  };
  children?: CategoryWithCount[];
};

/**
 * Product with categories
 */
export type ProductWithCategories = Product & {
  categories: (ProductCategory & {
    category: {
      id: string;
      name: string;
      slug: string;
      path: string;
      level: number;
    };
  })[];
};

/**
 * Breadcrumb item for navigation
 */
export type BreadcrumbItem = {
  id: string;
  name: string;
  slug: string;
  path: string;
  level: number;
};

/**
 * Filter options for faceted filtering
 */
export type FilterOptions = {
  tags: string[];
  formats: string[];
  priceRange: {
    min: number;
    max: number;
  };
};

/**
 * Sort options for resources
 */
export type SortOption = 'displayOrder' | 'createdAt' | 'title' | 'priceInCents';

/**
 * Sort order
 */
export type SortOrder = 'asc' | 'desc';

/**
 * Resource filter state
 */
export type ResourceFilters = {
  search?: string;
  tags?: string[];
  categoryPath?: string;
  sortBy?: SortOption;
  sortOrder?: SortOrder;
};

/**
 * Paginated resources response
 */
export type PaginatedResourcesResponse = {
  products: ProductWithCategories[];
  nextCursor?: string;
};

/**
 * Category with full details including children and counts
 */
export type CategoryDetail = ResourceCategory & {
  parent?: {
    id: string;
    name: string;
    slug: string;
    path: string;
  } | null;
  children: CategoryWithCount[];
  _count: {
    products: number;
  };
};
