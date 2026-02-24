import { type ReactNode } from 'react';

interface TableBodyProps {
  children: ReactNode;
  className?: string;
}

export function TableBody({ children, className = '' }: TableBodyProps) {
  return <tbody className={`divide-y divide-slate-200 bg-white ${className}`}>{children}</tbody>;
}
