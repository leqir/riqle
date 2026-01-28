import Link from 'next/link';

export function ErrorPage({
  title,
  message,
  action,
  onAction,
}: {
  title: string;
  message: string;
  action?: string;
  onAction?: () => void;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <div className="w-full max-w-md space-y-6 text-center">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold text-slate-900">{title}</h1>
          <p className="text-slate-600">{message}</p>
        </div>

        {action && onAction && (
          <button
            onClick={onAction}
            className="
              inline-flex items-center justify-center
              px-4 py-2 rounded-lg
              bg-brand-600 text-white
              font-medium text-sm
              hover:bg-brand-700
              transition-colors duration-150
            "
          >
            {action}
          </button>
        )}

        <div className="pt-4">
          <Link href="/" className="text-sm text-slate-600 hover:text-slate-900">
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
