'use client';

import { useEffect } from 'react';
import { trackPageView, trackEvent } from '@/lib/analytics/tracking';
import { AnalyticsEvent } from '@/lib/analytics/events';

export function usePageView() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      trackPageView(window.location.pathname);
    }
  }, []);
}

export function useScrollTracking() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const scrollPercentages = new Set<number>();

    function handleScroll() {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;

      const scrollPercentage = Math.floor(((scrollTop + windowHeight) / documentHeight) * 100);

      // Track milestones
      const milestones = [25, 50, 75, 100];

      for (const milestone of milestones) {
        if (scrollPercentage >= milestone && !scrollPercentages.has(milestone)) {
          scrollPercentages.add(milestone);
          trackEvent(AnalyticsEvent.SCROLL_DEPTH, {
            depth: milestone,
            page: window.location.pathname,
          });
        }
      }
    }

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
}

export function useTimeTracking() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const startTime = Date.now();
    let reported = false;

    const handleBeforeUnload = () => {
      if (reported) return;

      const timeOnPage = Math.floor((Date.now() - startTime) / 1000); // seconds

      // Only track if significant (> 10 seconds)
      if (timeOnPage > 10) {
        trackEvent(AnalyticsEvent.TIME_ON_PAGE, {
          duration: timeOnPage,
          page: window.location.pathname,
        });

        reported = true;
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, []);
}
