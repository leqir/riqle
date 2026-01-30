/**
 * Breadcrumbs Component
 *
 * Navigation breadcrumbs for hierarchical browsing
 * Server component for SEO
 */

import Link from 'next/link';

type BreadcrumbItem = {
  name: string;
  path: string;
};

type Props = {
  items: BreadcrumbItem[];
};

export function Breadcrumbs({ items }: Props) {
  if (items.length === 0) {
    return null;
  }

  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm">
      {/* Home / Resources link */}
      <Link
        href="/resources"
        className="font-medium text-purple-600 transition-colors hover:text-purple-700"
      >
        resources
      </Link>

      {/* Breadcrumb items */}
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <div key={item.path} className="flex items-center gap-2">
            <span className="text-stone-300">›</span>
            {isLast ? (
              <span className="font-medium text-stone-900">{item.name.toLowerCase()}</span>
            ) : (
              <Link
                href={`/resources/browse/${item.path}`}
                className="font-medium text-stone-600 transition-colors hover:text-purple-600"
              >
                {item.name.toLowerCase()}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
}
