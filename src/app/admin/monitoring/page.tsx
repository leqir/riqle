import { db } from '@/lib/db';
import { formatDistanceToNow } from 'date-fns';
import { RetryJobButton, AbandonJobButton } from '@/components/admin/FailedJobActions';

async function getFailedJobs() {
  return db.failedJob.findMany({
    orderBy: { createdAt: 'desc' },
    take: 100,
  });
}

async function getStats() {
  const [total, pending, retrying, resolved, abandoned] = await Promise.all([
    db.failedJob.count(),
    db.failedJob.count({ where: { status: 'PENDING' } }),
    db.failedJob.count({ where: { status: 'RETRYING' } }),
    db.failedJob.count({ where: { status: 'RESOLVED' } }),
    db.failedJob.count({ where: { status: 'ABANDONED' } }),
  ]);

  return { total, pending, retrying, resolved, abandoned };
}

export default async function MonitoringPage() {
  const [jobs, stats] = await Promise.all([getFailedJobs(), getStats()]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-stone-900">System Monitoring</h1>
        <p className="mt-1 text-stone-600">Monitor failed background jobs</p>
      </div>

      <div className="grid grid-cols-5 gap-4">
        <StatBox label="Total" value={stats.total} />
        <StatBox label="Pending" value={stats.pending} alert={stats.pending > 0} />
        <StatBox label="Retrying" value={stats.retrying} />
        <StatBox label="Resolved" value={stats.resolved} />
        <StatBox label="Abandoned" value={stats.abandoned} />
      </div>

      {jobs.length === 0 ? (
        <div className="rounded-lg border border-stone-200 bg-white p-12 text-center">
          <p className="text-stone-500">No failed jobs</p>
        </div>
      ) : (
        <div className="space-y-4">
          {jobs.map((job) => {
            const statusColors: Record<string, string> = {
              PENDING: 'bg-amber-100 text-amber-800',
              RETRYING: 'bg-blue-100 text-blue-800',
              RESOLVED: 'bg-green-100 text-green-800',
              ABANDONED: 'bg-stone-100 text-stone-800',
            };
            const statusClass = statusColors[job.status] || statusColors.PENDING;

            return (
              <div key={job.id} className="rounded-lg border border-stone-200 bg-white p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg font-semibold text-stone-900">{job.jobType}</h3>
                      <span
                        className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${statusClass}`}
                      >
                        {job.status}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-red-600">{job.error}</p>
                    <div className="mt-3 text-xs text-stone-500">
                      <div>
                        Attempts: {job.attempts} / {job.maxAttempts}
                      </div>
                      <div>Created: {formatDistanceToNow(job.createdAt, { addSuffix: true })}</div>
                      {job.retriedAt && (
                        <div>
                          Last retry: {formatDistanceToNow(job.retriedAt, { addSuffix: true })}
                        </div>
                      )}
                    </div>
                    <details className="mt-4">
                      <summary className="cursor-pointer text-sm font-medium text-stone-700">
                        View Payload
                      </summary>
                      <pre className="mt-2 overflow-x-auto rounded bg-stone-50 p-3 text-xs text-stone-600">
                        {JSON.stringify(job.payload, null, 2)}
                      </pre>
                    </details>
                  </div>
                  {job.status === 'PENDING' && (
                    <div className="ml-4 flex gap-2">
                      <RetryJobButton jobId={job.id} />
                      <AbandonJobButton jobId={job.id} />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function StatBox({ label, value, alert }: { label: string; value: number; alert?: boolean }) {
  const borderColor = alert ? 'border-amber-200' : 'border-stone-200';

  return (
    <div className={`rounded-lg border ${borderColor} bg-white p-4`}>
      <div className="text-sm text-stone-500">{label}</div>
      <div className="mt-1 text-2xl font-bold text-stone-900">{value}</div>
    </div>
  );
}
