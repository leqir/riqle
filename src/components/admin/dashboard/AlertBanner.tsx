'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { type ReactNode, useState } from 'react';
import { X, AlertCircle, CheckCircle, Info, AlertTriangle } from 'lucide-react';

type AlertVariant = 'info' | 'warning' | 'success' | 'error';

interface AlertBannerProps {
  variant?: AlertVariant;
  children: ReactNode;
  dismissible?: boolean;
  onDismiss?: () => void;
}

const variantConfig: Record<AlertVariant, { icon: ReactNode; className: string }> = {
  info: {
    icon: <Info className="h-5 w-5" />,
    className: 'bg-brand-50 border-brand-200 text-brand-800',
  },
  warning: {
    icon: <AlertTriangle className="h-5 w-5" />,
    className: 'bg-warning-50 border-warning-200 text-warning-800',
  },
  success: {
    icon: <CheckCircle className="h-5 w-5" />,
    className: 'bg-success-50 border-success-200 text-success-800',
  },
  error: {
    icon: <AlertCircle className="h-5 w-5" />,
    className: 'bg-error-50 border-error-200 text-error-800',
  },
};

export function AlertBanner({
  variant = 'info',
  children,
  dismissible = false,
  onDismiss,
}: AlertBannerProps) {
  const [isVisible, setIsVisible] = useState(true);
  const config = variantConfig[variant];

  const handleDismiss = () => {
    setIsVisible(false);
    onDismiss?.();
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -8, height: 0 }}
          animate={{ opacity: 1, y: 0, height: 'auto' }}
          exit={{ opacity: 0, y: -8, height: 0 }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          className={`rounded-lg border p-4 ${config.className} `.trim()}
        >
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0">{config.icon}</div>
            <div className="flex-1 text-sm">{children}</div>
            {dismissible && (
              <button
                onClick={handleDismiss}
                className="flex-shrink-0 rounded p-0.5 transition-colors duration-150 hover:bg-black/5"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
