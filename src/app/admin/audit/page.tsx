import { db } from '@/lib/db';
import { formatDistanceToNow } from 'date-fns';

async function getAuditLogs() {
  return db.auditLog.findMany({
    orderBy: { createdAt: 'desc' },
    take: 100,
    include: {
      User: {
        select: {
          email: true,
          name: true,
        },
      },
    },
  });
}

export default async function AuditPage() {
  const logs = await getAuditLogs();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-stone-900">Audit Logs</h1>
        <p className="mt-1 text-stone-600">Complete history of all admin actions</p>
      </div>

      {logs.length === 0 ? (
        <div className="rounded-lg border border-stone-200 bg-white p-12 text-center">
          <p className="text-stone-500">No audit logs yet</p>
        </div>
      ) : (
        <div className="space-y-3">
          {logs.map((log) => (
            <div key={log.id} className="rounded-lg border border-stone-200 bg-white p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-sm font-medium text-indigo-600">
                      {log.action}
                    </span>
                    <span className="text-sm text-stone-500">
                      {log.entity}: {log.entityId.slice(0, 8)}...
                    </span>
                  </div>
                  <div className="mt-1 text-sm text-stone-600">
                    by {log.User?.email ?? 'Unknown'} •{' '}
                    {formatDistanceToNow(log.createdAt, { addSuffix: true })}
                  </div>
                  {log.details && Object.keys(log.details as object).length > 0 && (
                    <details className="mt-2">
                      <summary className="cursor-pointer text-xs text-stone-500">
                        View Details
                      </summary>
                      <pre className="mt-2 overflow-x-auto rounded bg-stone-50 p-2 text-xs text-stone-600">
                        {JSON.stringify(log.details, null, 2)}
                      </pre>
                    </details>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
