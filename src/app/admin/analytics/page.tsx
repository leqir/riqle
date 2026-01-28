import { getDashboardMetrics } from '@/lib/analytics/dashboard-data';
import {
  interpretEmployerUnderstanding,
  interpretProofEffectiveness,
  interpretCommerceHealth,
  interpretOperationalHealth,
} from '@/lib/analytics/interpretation';
import { SUCCESS_QUESTIONS } from '@/lib/analytics/questions';

export const dynamic = 'force-dynamic';

export default async function AnalyticsPage() {
  // Get metrics for last 30 days
  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - 30);

  const metrics = await getDashboardMetrics(startDate, endDate);

  // Interpret metrics
  const employerInterpretation = interpretEmployerUnderstanding({
    homepageBounceRate: metrics.employerUnderstanding.homepageBounceRate,
    navigationToProof: metrics.employerUnderstanding.navigationToProof,
  });

  const proofInterpretation = interpretProofEffectiveness({
    avgTimeOnProjects: metrics.proofEffectiveness.avgTimeOnProjects,
    writingScrollDepth: metrics.proofEffectiveness.writingScrollDepth,
  });

  const commerceInterpretation = interpretCommerceHealth({
    refundRate: metrics.commerceHealth.refundRate,
    supportRate: metrics.commerceHealth.supportRate,
  });

  const operationalInterpretation = interpretOperationalHealth({
    checkoutFailures: metrics.operationalHealth.checkoutFailures,
    webhookFailures: metrics.operationalHealth.webhookFailures,
    errorRate: metrics.operationalHealth.errorRate,
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-neutral-900">Analytics</h1>
        <p className="mt-1 text-sm text-neutral-600">
          Minimal, intentional insights. Last 30 days.
        </p>
      </div>

      {/* Question 1: Employer Understanding */}
      <section className="rounded-lg border border-neutral-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-neutral-900">
          {SUCCESS_QUESTIONS[0].question}
        </h2>
        <p className="mt-1 text-sm text-neutral-600">{SUCCESS_QUESTIONS[0].why}</p>

        <div className="mt-4 space-y-3">
          <MetricRow
            label="Homepage Bounce Rate"
            value={formatPercentage(metrics.employerUnderstanding.homepageBounceRate)}
            threshold="< 70%"
          />
          <MetricRow
            label="Navigation to Work/Writing"
            value={formatPercentage(metrics.employerUnderstanding.navigationToProof)}
            threshold="> 30%"
          />
        </div>

        <InterpretationBox interpretation={employerInterpretation} />
      </section>

      {/* Question 2: Proof Effectiveness */}
      <section className="rounded-lg border border-neutral-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-neutral-900">
          {SUCCESS_QUESTIONS[1].question}
        </h2>
        <p className="mt-1 text-sm text-neutral-600">{SUCCESS_QUESTIONS[1].why}</p>

        <div className="mt-4 space-y-3">
          <MetricRow
            label="Project Views"
            value={metrics.proofEffectiveness.projectViews.toString()}
            threshold="Relative"
          />
          <MetricRow
            label="Avg Time on Projects"
            value={`${Math.round(metrics.proofEffectiveness.avgTimeOnProjects)}s`}
            threshold="> 60s"
          />
          <MetricRow
            label="Writing Scroll Depth"
            value={formatPercentage(metrics.proofEffectiveness.writingScrollDepth / 100)}
            threshold="> 50%"
          />
        </div>

        <InterpretationBox interpretation={proofInterpretation} />
      </section>

      {/* Question 3: Commerce Health */}
      <section className="rounded-lg border border-neutral-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-neutral-900">
          {SUCCESS_QUESTIONS[2].question}
        </h2>
        <p className="mt-1 text-sm text-neutral-600">{SUCCESS_QUESTIONS[2].why}</p>

        <div className="mt-4 space-y-3">
          <MetricRow
            label="Conversion Rate"
            value={formatPercentage(metrics.commerceHealth.conversionRate)}
            threshold="Directional"
          />
          <MetricRow
            label="Refund Rate"
            value={formatPercentage(metrics.commerceHealth.refundRate)}
            threshold="< 5%"
          />
          <MetricRow
            label="Support Rate"
            value={formatPercentage(metrics.commerceHealth.supportRate)}
            threshold="< 10%"
          />
        </div>

        <InterpretationBox interpretation={commerceInterpretation} />
      </section>

      {/* Question 4: Operational Health */}
      <section className="rounded-lg border border-neutral-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-neutral-900">
          {SUCCESS_QUESTIONS[3].question}
        </h2>
        <p className="mt-1 text-sm text-neutral-600">{SUCCESS_QUESTIONS[3].why}</p>

        <div className="mt-4 space-y-3">
          <MetricRow
            label="Checkout Failures"
            value={metrics.operationalHealth.checkoutFailures.toString()}
            threshold="< 1%"
          />
          <MetricRow
            label="Webhook Failures"
            value={metrics.operationalHealth.webhookFailures.toString()}
            threshold="< 1%"
          />
          <MetricRow
            label="Access Recovery Usage"
            value={metrics.operationalHealth.accessRecoveryUsage.toString()}
            threshold="< 10%"
          />
        </div>

        <InterpretationBox interpretation={operationalInterpretation} />
      </section>

      {/* Review Cadence Reminder */}
      <section className="rounded-lg border border-blue-200 bg-blue-50 p-6">
        <h3 className="font-semibold text-blue-900">Review Cadence</h3>
        <div className="mt-3 space-y-2 text-sm text-blue-800">
          <p>
            <strong>Weekly (5 min):</strong> Check operational health
          </p>
          <p>
            <strong>Monthly (15 min):</strong> Review directional trends
          </p>
          <p>
            <strong>Quarterly (1 hour):</strong> Deep UX alignment review
          </p>
        </div>
      </section>
    </div>
  );
}

function MetricRow({
  label,
  value,
  threshold,
}: {
  label: string;
  value: string;
  threshold: string;
}) {
  return (
    <div className="flex items-center justify-between border-b border-neutral-100 pb-2">
      <span className="text-sm font-medium text-neutral-700">{label}</span>
      <div className="text-right">
        <div className="text-sm font-semibold text-neutral-900">{value}</div>
        <div className="text-xs text-neutral-500">{threshold}</div>
      </div>
    </div>
  );
}

function InterpretationBox({
  interpretation,
}: {
  interpretation: {
    status: string;
    message: string;
    actions: string[];
  };
}) {
  const statusColors = {
    good: 'bg-green-50 border-green-200 text-green-800',
    healthy: 'bg-green-50 border-green-200 text-green-800',
    needs_attention: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    poor: 'bg-red-50 border-red-200 text-red-800',
    unhealthy: 'bg-red-50 border-red-200 text-red-800',
  };

  const statusColor = statusColors[interpretation.status as keyof typeof statusColors];

  return (
    <div className={`mt-4 rounded-lg border p-4 ${statusColor}`}>
      <p className="text-sm font-medium">{interpretation.message}</p>
      {interpretation.actions.length > 0 && (
        <div className="mt-2">
          <p className="text-xs font-semibold">Actions:</p>
          <ul className="mt-1 list-inside list-disc text-xs">
            {interpretation.actions.map((action, i) => (
              <li key={i}>{action}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function formatPercentage(value: number): string {
  return `${(value * 100).toFixed(1)}%`;
}
