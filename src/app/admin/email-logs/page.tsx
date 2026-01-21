import { db } from '@/lib/db';
import { formatDistanceToNow } from 'date-fns';

async function getEmailLogs() {
  return db.emailLog.findMany({
    orderBy: { createdAt: 'desc' },
    take: 100,
  });
}

async function getStats() {
  const [total, sent, failed] = await Promise.all([
    db.emailLog.count(),
    db.emailLog.count({ where: { status: 'sent' } }),
    db.emailLog.count({ where: { status: 'failed' } }),
  ]);

  return { total, sent, failed };
}

export default async function EmailLogsPage() {
  const [logs, stats] = await Promise.all([getEmailLogs(), getStats()]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-stone-900">Email Logs</h1>
        <p className="mt-1 text-stone-600">Monitor email delivery status</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <StatBox label="Total" value={stats.total} />
        <StatBox label="Sent" value={stats.sent} />
        <StatBox label="Failed" value={stats.failed} alert={stats.failed > 0} />
      </div>

      {logs.length === 0 ? (
        <div className="rounded-lg border border-stone-200 bg-white p-12 text-center">
          <p className="text-stone-500">No email logs yet</p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-lg border border-stone-200 bg-white">
          <table className="min-w-full divide-y divide-stone-200">
            <thead className="bg-stone-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-stone-500">
                  Recipient
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-stone-500">
                  Subject
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-stone-500">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-stone-500">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200 bg-white">
              {logs.map((log) => {
                const statusClass =
                  log.status === 'sent' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';

                return (
                  <tr key={log.id} className="hover:bg-stone-50">
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-stone-900">{log.to}</td>
                    <td className="px-6 py-4 text-sm text-stone-900">{log.subject}</td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <span
                        className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${statusClass}`}
                      >
                        {log.status}
                      </span>
                      {log.error && <div className="mt-1 text-xs text-red-600">{log.error}</div>}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-stone-500">
                      {formatDistanceToNow(log.createdAt, { addSuffix: true })}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function StatBox({ label, value, alert }: { label: string; value: number; alert?: boolean }) {
  const borderColor = alert ? 'border-red-200' : 'border-stone-200';

  return (
    <div className={`rounded-lg border ${borderColor} bg-white p-4`}>
      <div className="text-sm text-stone-500">{label}</div>
      <div className="mt-1 text-2xl font-bold text-stone-900">{value}</div>
    </div>
  );
}
