import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';

/**
 * Content List Component
 *
 * Reusable table component for content management pages
 * Epic 11 Principle: "Text over widgets" - Simple table, clear actions
 */

interface ContentItem {
  id: string;
  title: string;
  slug: string;
  published: boolean;
  featured?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface ContentListProps {
  items: ContentItem[];
  baseUrl: string;
  emptyMessage?: string;
}

export function ContentList({ items, baseUrl, emptyMessage = 'No items found' }: ContentListProps) {
  if (items.length === 0) {
    return (
      <div className="rounded-lg border border-stone-200 bg-white p-12 text-center">
        <p className="text-stone-500">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border border-stone-200 bg-white">
      <table className="min-w-full divide-y divide-stone-200">
        <thead className="bg-stone-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-stone-500">
              Title
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-stone-500">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-stone-500">
              Updated
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-stone-500">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-stone-200 bg-white">
          {items.map((item) => {
            const statusClass = item.published
              ? 'bg-green-100 text-green-800'
              : 'bg-stone-100 text-stone-800';

            return (
              <tr key={item.id} className="hover:bg-stone-50">
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-stone-900">{item.title}</span>
                    {item.featured && (
                      <span className="rounded-full bg-indigo-100 px-2 py-0.5 text-xs font-medium text-indigo-700">
                        Featured
                      </span>
                    )}
                  </div>
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <span
                    className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${statusClass}`}
                  >
                    {item.published ? 'Published' : 'Draft'}
                  </span>
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-stone-500">
                  {formatDistanceToNow(item.updatedAt, { addSuffix: true })}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-right text-sm">
                  <Link
                    href={`${baseUrl}/${item.slug}`}
                    target="_blank"
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    View
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
