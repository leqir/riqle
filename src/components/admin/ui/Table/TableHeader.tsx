import { type ReactNode } from 'react';

interface TableHeaderProps {
  children: ReactNode;
  className?: string;
}

export function TableHeader({ children, className = '' }: TableHeaderProps) {
  return (
    <thead className={`bg-slate-50 ${className}`}>
      <tr>{children}</tr>
    </thead>
  );
}

interface TableHeaderCellProps {
  children: ReactNode;
  className?: string;
}

export function TableHeaderCell({ children, className = '' }: TableHeaderCellProps) {
  return (
    <th
      className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-600 ${className} `.trim()}
    >
      {children}
    </th>
  );
}
