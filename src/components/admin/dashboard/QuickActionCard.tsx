'use client';

import { motion } from 'framer-motion';
import { type ReactNode } from 'react';
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
        className="group rounded-xl border border-slate-100 bg-white p-6 shadow-card transition-shadow duration-200 hover:shadow-card-hover"
        whileHover={{ y: -4, scale: 1.02 }}
        transition={{ duration: 0.2 }}
      >
        <div className="mb-4 flex items-start justify-between">
          <div className="rounded-lg bg-brand-50 p-3 text-brand-600">{icon}</div>
          <ArrowRight className="h-5 w-5 text-slate-400 transition-all duration-200 group-hover:translate-x-1 group-hover:text-brand-600" />
        </div>
        <h3 className="mb-2 text-lg font-semibold text-slate-900">{title}</h3>
        <p className="text-sm text-slate-600">{description}</p>
      </motion.div>
    </Link>
  );
}
