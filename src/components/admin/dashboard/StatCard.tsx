'use client';

import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { type ReactNode, useEffect } from 'react';
import { Card } from '../ui/Card';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: number;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  icon?: ReactNode;
  href?: string;
  loading?: boolean;
}

export function StatCard({ title, value, trend, icon, href, loading }: StatCardProps) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    if (!loading) {
      const controls = animate(count, value, {
        duration: 1,
        ease: [0.4, 0, 0.2, 1],
      });
      return controls.stop;
    }
  }, [value, loading, count]);

  if (loading) {
    return (
      <Card variant="stat" className="animate-pulse">
        <div className="space-y-2">
          <div className="h-4 w-1/2 rounded bg-slate-200" />
          <div className="h-12 w-3/4 rounded bg-slate-200" />
        </div>
      </Card>
    );
  }

  return (
    <Card variant="stat" href={href}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="mb-2 text-sm font-medium text-slate-600">{title}</p>
          <div className="flex items-baseline gap-2">
            <motion.p className="text-4xl font-bold text-slate-900">{rounded}</motion.p>
            {trend && (
              <div
                className={`flex items-center gap-1 text-sm font-medium ${trend.isPositive ? 'text-success-600' : 'text-error-600'} `.trim()}
              >
                {trend.isPositive ? (
                  <ArrowUpRight className="h-4 w-4" />
                ) : (
                  <ArrowDownRight className="h-4 w-4" />
                )}
                <span>{Math.abs(trend.value)}%</span>
              </div>
            )}
          </div>
        </div>
        {icon && (
          <div className="flex-shrink-0 rounded-lg bg-brand-50 p-3 text-brand-600">{icon}</div>
        )}
      </div>
    </Card>
  );
}
