'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface TableRowProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export function TableRow({ children, className = '', onClick }: TableRowProps) {
  const isInteractive = !!onClick;

  return (
    <motion.tr
      className={`
        transition-colors duration-150
        ${isInteractive ? 'cursor-pointer hover:bg-slate-50 hover:border-l-2 hover:border-brand-500' : ''}
        ${className}
      `.trim()}
      onClick={onClick}
      whileHover={isInteractive ? { x: 2 } : undefined}
    >
      {children}
    </motion.tr>
  );
}
