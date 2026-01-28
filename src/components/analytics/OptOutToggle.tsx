'use client';

import { useState, useEffect } from 'react';
import { checkOptOut, setOptOut } from '@/lib/analytics/privacy';

export function AnalyticsOptOut() {
  const [isOptedOut, setIsOptedOut] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsOptedOut(checkOptOut());
  }, []);

  function handleToggle() {
    const newValue = !isOptedOut;
    setOptOut(newValue);
    setIsOptedOut(newValue);
  }

  // Avoid hydration mismatch by not rendering until mounted
  if (!mounted) {
    return (
      <button className="text-xs text-neutral-400 cursor-not-allowed" disabled>
        Loading...
      </button>
    );
  }

  return (
    <button
      onClick={handleToggle}
      className="text-xs text-neutral-600 hover:text-neutral-900 underline transition-colors"
    >
      {isOptedOut ? 'Enable' : 'Disable'} analytics
    </button>
  );
}
