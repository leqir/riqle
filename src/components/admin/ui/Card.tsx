'use client';

import { motion, HTMLMotionProps } from 'framer-motion';
import { ReactNode, forwardRef } from 'react';
import Link from 'next/link';

type CardVariant = 'default' | 'interactive' | 'stat' | 'alert';

interface CardProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  variant?: CardVariant;
  children: ReactNode;
  href?: string;
}

const variantStyles: Record<CardVariant, string> = {
  default: 'bg-white rounded-xl p-8 shadow-card',
  interactive: 'bg-white rounded-xl p-8 shadow-card hover:shadow-card-hover cursor-pointer transition-shadow duration-200',
  stat: 'bg-white rounded-xl p-8 shadow-card hover:shadow-card-hover transition-all duration-200',
  alert: 'bg-white rounded-xl p-6 shadow-card border-l-4',
};

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ variant = 'default', children, href, className = '', ...props }, ref) => {
    const baseClassName = `${variantStyles[variant]} ${className}`;

    if (href) {
      return (
        <Link href={href} className="block">
          <motion.div
            ref={ref}
            className={baseClassName}
            whileHover={variant === 'interactive' || variant === 'stat' ? { y: -4 } : undefined}
            transition={{ duration: 0.2 }}
            {...props}
          >
            {children}
          </motion.div>
        </Link>
      );
    }

    return (
      <motion.div
        ref={ref}
        className={baseClassName}
        whileHover={variant === 'interactive' || variant === 'stat' ? { y: -4 } : undefined}
        transition={{ duration: 0.2 }}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

Card.displayName = 'Card';
