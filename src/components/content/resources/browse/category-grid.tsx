/**
 * Category Grid Component
 *
 * Displays subcategories as cards with product counts
 * Server component for optimal SEO
 */

import Link from 'next/link';
import type { ResourceCategory } from '@prisma/client';

type CategoryWithCount = ResourceCategory & {
  _count: {
    products: number;
  };
};

type Props = {
  categories: CategoryWithCount[];
};

export function CategoryGrid({ categories }: Props) {
  if (categories.length === 0) {
    return null;
  }

  // Color schemes for different category levels
  const getColorScheme = (level: number) => {
    const schemes = [
      {
        // Level 0 (Root) - Purple
        gradient: 'from-purple-50/50 to-white',
        border: 'border-purple-200',
        hoverBorder: 'hover:border-purple-600',
        text: 'group-hover:text-purple-600',
        badge: 'bg-purple-100 text-purple-700',
        accent: 'text-purple-600',
      },
      {
        // Level 1 (Year) - Blue
        gradient: 'from-blue-50/50 to-white',
        border: 'border-blue-200',
        hoverBorder: 'hover:border-blue-600',
        text: 'group-hover:text-blue-600',
        badge: 'bg-blue-100 text-blue-700',
        accent: 'text-blue-600',
      },
      {
        // Level 2 (Subject) - Emerald
        gradient: 'from-emerald-50/50 to-white',
        border: 'border-emerald-200',
        hoverBorder: 'hover:border-emerald-600',
        text: 'group-hover:text-emerald-600',
        badge: 'bg-emerald-100 text-emerald-700',
        accent: 'text-emerald-600',
      },
      {
        // Level 3 (Module) - Amber
        gradient: 'from-amber-50/50 to-white',
        border: 'border-amber-200',
        hoverBorder: 'hover:border-amber-600',
        text: 'group-hover:text-amber-600',
        badge: 'bg-amber-100 text-amber-700',
        accent: 'text-amber-600',
      },
    ];

    return schemes[level] || schemes[0];
  };

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {categories.map((category) => {
        const colors = getColorScheme(category.level);

        return (
          <Link
            key={category.id}
            href={`/resources/browse/${category.path}`}
            className="group block"
          >
            <div
              className={`h-full rounded-2xl border-2 bg-gradient-to-br p-6 transition-all hover:shadow-lg ${colors.gradient} ${colors.border} ${colors.hoverBorder}`}
            >
              {/* Category Name */}
              <h3
                className={`mb-2 text-xl font-semibold text-stone-900 transition-colors ${colors.text}`}
              >
                {category.name}
              </h3>

              {/* Description */}
              {category.description && (
                <p className="mb-4 text-sm leading-relaxed text-stone-600">
                  {category.description}
                </p>
              )}

              {/* Product Count */}
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-stone-900">
                  {category._count.products}
                </span>
                <span className="text-sm text-stone-500">
                  {category._count.products === 1 ? 'resource' : 'resources'}
                </span>
                <span
                  className={`ml-auto text-sm font-medium transition-transform group-hover:translate-x-1 ${colors.accent}`}
                >
                  →
                </span>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
