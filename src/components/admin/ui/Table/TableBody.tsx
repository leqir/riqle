import { ReactNode } from 'react';

interface TableBodyProps {
  children: ReactNode;
  className?: string;
}

export function TableBody({ children, className = '' }: TableBodyProps) {
  return (
    <tbody className={`bg-white divide-y divide-slate-200 ${className}`}>
      {children}
    </tbody>
  );
}
