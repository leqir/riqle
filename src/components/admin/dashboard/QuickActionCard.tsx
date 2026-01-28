'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface QuickActionCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  href: string;
}

export function QuickActionCard({ title, description, icon, href }: QuickActionCardProps) {
  return (
    <Link href={href}>
      <motion.div
        className="
          bg-white rounded-xl p-6 shadow-card
          hover:shadow-card-hover
          transition-shadow duration-200
          border border-slate-100
          group
        "
        whileHover={{ y: -4, scale: 1.02 }}
        transition={{ duration: 0.2 }}
      >
        <div className="flex items-start justify-between mb-4">
          <div className="p-3 bg-brand-50 rounded-lg text-brand-600">
            {icon}
          </div>
          <ArrowRight className="h-5 w-5 text-slate-400 group-hover:text-brand-600 group-hover:translate-x-1 transition-all duration-200" />
        </div>
        <h3 className="text-lg font-semibold text-slate-900 mb-2">{title}</h3>
        <p className="text-sm text-slate-600">{description}</p>
      </motion.div>
    </Link>
  );
}
