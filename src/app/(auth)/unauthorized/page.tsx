import Link from 'next/link';

export default function UnauthorizedPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <div className="px-8 py-6">
        <Link
          href="/"
          className="text-sm font-medium text-stone-900 transition-colors hover:text-stone-500"
        >
          riqle
        </Link>
      </div>

      <div className="flex flex-1 items-center justify-center px-6 pb-20">
        <div className="w-full max-w-sm">
          <p className="mb-2 text-xs font-medium uppercase tracking-wider text-stone-400">
            access denied
          </p>
          <h1 className="mb-1 text-2xl font-semibold tracking-tight text-stone-900">
            not authorised
          </h1>
          <p className="mb-8 text-sm text-stone-500">
            you don&apos;t have permission to access this page. if you believe this is a mistake,
            contact an administrator.
          </p>

          <div className="space-y-3">
            <Link
              href="/"
              className="block w-full rounded-lg bg-stone-900 px-6 py-3 text-center text-sm font-medium text-white transition-colors hover:bg-stone-700"
            >
              go to homepage
            </Link>
          </div>

          <p className="mt-6 text-sm text-stone-500">
            need help?{' '}
            <a
              href="mailto:nathanael.thie@gmail.com"
              className="font-medium text-stone-900 underline underline-offset-2 hover:text-stone-600"
            >
              contact support
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
