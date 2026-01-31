import { getDashboardMetrics } from '@/lib/analytics/dashboard-data';
import {
  interpretEmployerUnderstanding,
  interpretProofEffectiveness,
  interpretCommerceHealth,
  interpretOperationalHealth,
} from '@/lib/analytics/interpretation';
import { SUCCESS_QUESTIONS } from '@/lib/analytics/questions';
import { getEventCount, SERVER_EVENTS } from '@/lib/analytics/tracking';

export const dynamic = 'force-dynamic';

export default async function AnalyticsPage() {
  // Get metrics for last 30 days
  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - 30);

  const metrics = await getDashboardMetrics(startDate, endDate);

  // Get event counts for last 30 days
  const resourceViews = await getEventCount(SERVER_EVENTS.RESOURCE_VIEWED, startDate, endDate);
  const markpointClicks = await getEventCount(SERVER_EVENTS.MARKPOINT_CLICKED, startDate, endDate);
  const checkoutsStarted = await getEventCount(SERVER_EVENTS.CHECKOUT_STARTED, startDate, endDate);
  const checkoutsCompleted = await getEventCount(
    SERVER_EVENTS.CHECKOUT_COMPLETED,
    startDate,
    endDate
  );

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

      {/* User Growth - Real Data */}
      <section className="rounded-lg border border-neutral-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-neutral-900">User Growth & Signups</h2>
        <p className="mt-1 text-sm text-neutral-600">Real-time data from your database</p>

        <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
          <div className="rounded-lg bg-blue-50 p-4">
            <div className="text-2xl font-bold text-blue-900">{metrics.userGrowth.totalUsers}</div>
            <div className="text-xs text-blue-700">Total Users</div>
          </div>
          <div className="rounded-lg bg-green-50 p-4">
            <div className="text-2xl font-bold text-green-900">
              {metrics.userGrowth.signupsLast7Days}
            </div>
            <div className="text-xs text-green-700">Last 7 Days</div>
          </div>
          <div className="rounded-lg bg-purple-50 p-4">
            <div className="text-2xl font-bold text-purple-900">
              {formatPercentage(metrics.userGrowth.verificationRate)}
            </div>
            <div className="text-xs text-purple-700">Email Verified</div>
          </div>
          <div className="rounded-lg bg-orange-50 p-4">
            <div className="text-2xl font-bold text-orange-900">
              {metrics.userGrowth.payingCustomers}
            </div>
            <div className="text-xs text-orange-700">Paying Customers</div>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="mb-3 text-sm font-semibold text-neutral-700">Recent Signups</h3>
          <div className="space-y-2">
            {metrics.userGrowth.recentSignups.slice(0, 5).map((signup, i) => (
              <div
                key={i}
                className="flex items-center justify-between rounded border border-neutral-100 bg-neutral-50 p-3"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`h-2 w-2 rounded-full ${signup.emailVerified ? 'bg-green-500' : 'bg-yellow-500'}`}
                  />
                  <div>
                    <div className="text-sm font-medium text-neutral-900">
                      {signup.name || 'No name'}
                    </div>
                    <div className="text-xs text-neutral-600">{signup.email}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-neutral-600">
                    {new Date(signup.createdAt).toLocaleDateString('en-AU', {
                      month: 'short',
                      day: 'numeric',
                    })}
                  </div>
                  {signup.hasPurchases && (
                    <div className="text-xs font-semibold text-green-600">💳 Paid</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Event Tracking - Real Data */}
      <section className="rounded-lg border border-neutral-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-neutral-900">Event Tracking</h2>
        <p className="mt-1 text-sm text-neutral-600">
          Custom events tracked in database (last 30 days)
        </p>

        <div className="mt-4 space-y-3">
          <MetricRow label="Resource Views" value={resourceViews.toString()} threshold="Total" />
          <MetricRow
            label="MarkPoint Button Clicks"
            value={markpointClicks.toString()}
            threshold="Total"
          />
          <MetricRow
            label="Checkouts Started"
            value={checkoutsStarted.toString()}
            threshold="Total"
          />
          <MetricRow
            label="Checkouts Completed"
            value={checkoutsCompleted.toString()}
            threshold="Total"
          />
          <MetricRow
            label="Checkout Conversion"
            value={
              checkoutsStarted > 0
                ? `${Math.round((checkoutsCompleted / checkoutsStarted) * 100)}%`
                : '0%'
            }
            threshold="> 30%"
          />
        </div>

        <div className="mt-4 rounded-lg bg-blue-50 p-4">
          <p className="text-sm text-blue-800">
            <strong>Note:</strong> Event tracking started when you added the AnalyticsEvent table.
            Resource views are now being tracked automatically on every resource page visit.
          </p>
        </div>
      </section>

      {/* Question 1: Employer Understanding */}
      <section className="rounded-lg border border-neutral-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-neutral-900">{SUCCESS_QUESTIONS[0].question}</h2>
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
        <h2 className="text-lg font-semibold text-neutral-900">{SUCCESS_QUESTIONS[1].question}</h2>
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
        <h2 className="text-lg font-semibold text-neutral-900">{SUCCESS_QUESTIONS[2].question}</h2>
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
        <h2 className="text-lg font-semibold text-neutral-900">{SUCCESS_QUESTIONS[3].question}</h2>
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
