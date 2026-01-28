import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import { Table, TableHeader, TableHeaderCell, TableBody, TableRow, TableCell } from './ui/Table';
import { Badge } from './ui/Badge';
import { FileX } from 'lucide-react';

/**
 * Content List Component - Stripe-Inspired Design
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
      <div className="rounded-lg bg-white p-12 text-center shadow-card">
        <FileX className="mx-auto h-12 w-12 text-slate-400 mb-4" />
        <p className="text-slate-600 text-lg">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-card">
      <Table>
        <TableHeader>
          <TableHeaderCell>Title</TableHeaderCell>
          <TableHeaderCell>Status</TableHeaderCell>
          <TableHeaderCell>Updated</TableHeaderCell>
          <TableHeaderCell className="text-right">Actions</TableHeaderCell>
        </TableHeader>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.id}>
              <TableCell>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-slate-900">{item.title}</span>
                  {item.featured && (
                    <Badge variant="info" size="sm">
                      Featured
                    </Badge>
                  )}
                </div>
              </TableCell>
              <TableCell>
                <Badge variant={item.published ? 'success' : 'neutral'} size="sm">
                  {item.published ? 'Published' : 'Draft'}
                </Badge>
              </TableCell>
              <TableCell className="text-slate-600">
                {formatDistanceToNow(item.updatedAt, { addSuffix: true })}
              </TableCell>
              <TableCell className="text-right">
                <Link
                  href={`${baseUrl}/${item.slug}`}
                  target="_blank"
                  className="text-brand-600 hover:text-brand-700 font-medium transition-colors duration-150"
                >
                  View
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
