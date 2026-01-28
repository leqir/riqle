# Analytics System

## Philosophy: Minimal, Intentional, Privacy-First

This analytics system is designed to answer **4 core questions** without turning the site into a metrics-driven machine.

### Core Questions

1. **Do employers understand me quickly?** (Homepage effectiveness)
2. **Which proof surfaces are working?** (Content resonance)
3. **Is commerce functioning healthily?** (Trust-first validation)
4. **Is anything broken?** (Operational health)

If analytics don't help answer these questions, they do not belong.

## Architecture

```
lib/analytics/
├── config.ts              # Analytics configuration
├── events.ts              # Event taxonomy (max 15 events)
├── event-catalog.ts       # Complete event catalog with validation
├── questions.ts           # Success questions mapping
├── tracking.ts            # Core tracking functions
├── engagement.ts          # Engagement tracking (scroll, time)
├── commerce.ts            # Commerce event tracking
├── privacy.ts             # Privacy controls (DNT, opt-out)
├── provider.ts            # Analytics provider config (Vercel)
├── dashboard-data.ts      # Dashboard metrics aggregation
├── interpretation.ts      # Metric interpretation helpers
└── governance.ts          # Metric governance & validation
```

## Key Principles

1. **Fewer Metrics > More Metrics** - Maximum 15 tracked events
2. **Directional Truth > Precision** - Trends over exact numbers
3. **Trends > Snapshots** - Compare periods, not days
4. **Insight > Numbers** - Translate metrics into meaning

## Privacy Commitments

- ✅ **No cookies** - Cookieless tracking
- ✅ **No personal data** - No PII collection
- ✅ **Anonymized IPs** - IP addresses anonymized
- ✅ **Respect DNT** - Do Not Track honored
- ✅ **Opt-out available** - localStorage-based opt-out

## Review Cadence

### Weekly (5 minutes)
- Operational health check
- Check error rates
- Verify checkout functioning

### Monthly (15 minutes)
- Directional insight review
- Compare to previous month
- Identify trends

### Quarterly (1 hour)
- UX alignment reflection
- Review all 4 core questions
- Consider structural changes

## Usage

### Track Page View
```typescript
import { trackPageView } from '@/lib/analytics/tracking';

trackPageView('/work');
```

### Track Custom Event
```typescript
import { trackEvent } from '@/lib/analytics/tracking';
import { AnalyticsEvent } from '@/lib/analytics/events';

trackEvent(AnalyticsEvent.PROJECT_VIEW, {
  project_slug: 'markpoint',
});
```

### Track Commerce Event
```typescript
import { trackCheckoutInitiated } from '@/lib/analytics/commerce';

trackCheckoutInitiated(product.id, product.priceInCents);
```

### Use Tracking Hooks
```typescript
import { usePageView, useScrollTracking, useTimeTracking } from '@/hooks/useAnalytics';

export default function Page() {
  usePageView();
  useScrollTracking();
  useTimeTracking();

  return <div>...</div>;
}
```

## Adding New Metrics

Before adding any new metric, use the proposal template:

1. Which core question does this answer?
2. Why is this necessary?
3. What action would you take?
4. How often will you review it?

See: `docs/new-metric-proposal-template.md`

## Banned Patterns

The following are explicitly **NOT** allowed:

- ❌ Vanity metrics (raw pageviews without context)
- ❌ Real-time dashboards
- ❌ Gamified charts (leaderboards, progress bars)
- ❌ Heatmaps (click maps, scroll maps)
- ❌ Session replays
- ❌ Funnel optimization frameworks
- ❌ User identification/tracking

## Governance

### Event Count Validation
```typescript
import { validateEventCatalog } from '@/lib/analytics/event-catalog';

const validation = validateEventCatalog();
console.log(validation); // { valid: true, errors: [] }
```

### Quarterly Review
```typescript
import { generateQuarterlyReview } from '@/lib/analytics/governance';

const review = generateQuarterlyReview();
console.log(review);
```

## Admin Dashboard

View analytics insights at: `/admin/analytics`

The dashboard shows:
- All 4 core questions
- Metrics with thresholds
- Interpretation and recommended actions
- Review cadence reminders

## Documentation

- `docs/analytics-philosophy.md` - Core principles
- `docs/analytics-success-questions.md` - Question definitions
- `docs/analytics-review-cadence.md` - Review schedule
- `docs/event-usage-guide.md` - Event tracking guide
- `docs/new-metric-proposal-template.md` - Metric proposal process
- `docs/privacy-policy-analytics.md` - Privacy commitments

## Testing

The analytics system respects:
- Do Not Track browser settings
- localStorage opt-out (`analytics_opt_out`)
- Development environment (no tracking in dev)

To opt out:
```javascript
localStorage.setItem('analytics_opt_out', 'true');
```

## Provider: Vercel Analytics

We use Vercel Analytics because:
- Cookieless by default
- Lightweight (< 1KB)
- Privacy-first
- Built-in Next.js integration

Alternative providers considered:
- Plausible (privacy-focused, self-hostable)
- Fathom (privacy-focused, simple)

## Success Criteria

Analytics are successful when:
1. ✅ You can answer all 4 core questions
2. ✅ You check analytics occasionally (not compulsively)
3. ✅ Metrics reduce uncertainty rather than create anxiety
4. ✅ Every metric maps to a real question
5. ✅ Total events < 15
6. ✅ Privacy is respected
