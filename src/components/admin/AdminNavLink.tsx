'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

interface AdminNavLinkProps {
  href: string;
  children: React.ReactNode;
}

export function AdminNavLink({ href, children }: AdminNavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href || (href !== '/admin' && pathname.startsWith(href));

  return (
    <Link href={href} className="relative group">
      <span
        className={`
          text-sm transition-colors duration-150
          ${isActive ? 'text-brand-600 font-medium' : 'text-slate-700 hover:text-slate-900'}
        `.trim()}
      >
        {children}
      </span>
      {isActive ? (
        <motion.div
          className="absolute -bottom-[17px] left-0 right-0 h-0.5 bg-brand-600"
          layoutId="activeNav"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        />
      ) : (
        <motion.div
          className="absolute -bottom-[17px] left-0 right-0 h-0.5 bg-slate-300 opacity-0 group-hover:opacity-100"
          initial={{ scaleX: 0 }}
          whileHover={{ scaleX: 1 }}
          transition={{ duration: 0.2 }}
        />
      )}
    </Link>
  );
}
