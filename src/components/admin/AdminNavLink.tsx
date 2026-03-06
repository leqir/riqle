'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface AdminNavLinkProps {
  href: string;
  children: React.ReactNode;
}

export function AdminNavLink({ href, children }: AdminNavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href || (href !== '/admin' && pathname.startsWith(href));

  return (
    <Link
      href={href}
      className={`text-sm transition-colors duration-100 ${
        isActive ? 'font-medium text-slate-900' : 'text-slate-500 hover:text-slate-800'
      }`}
    >
      {children}
    </Link>
  );
}
