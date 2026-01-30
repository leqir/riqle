/**
 * Helper function to count products in a category including all descendant categories
 */

import { db } from '@/lib/db';

export async function countProductsInCategory(categoryPath: string): Promise<number> {
  const count = await db.product.count({
    where: {
      published: true,
      categories: {
        some: {
          category: {
            OR: [{ path: categoryPath }, { path: { startsWith: `${categoryPath}/` } }],
          },
        },
      },
    },
  });

  return count;
}

/**
 * Add product counts to categories (including descendants)
 */
export async function addProductCountsToCategories<T extends { path: string }>(
  categories: T[]
): Promise<(T & { _count: { products: number } })[]> {
  const categoriesWithCounts = await Promise.all(
    categories.map(async (category) => {
      const productCount = await countProductsInCategory(category.path);
      return {
        ...category,
        _count: {
          products: productCount,
        },
      };
    })
  );

  return categoriesWithCounts;
}
