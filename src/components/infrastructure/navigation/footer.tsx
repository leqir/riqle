'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

/**
 * Modern Footer Component
 *
 * Features:
 * - Comprehensive site navigation
 * - Legal links (Terms, Privacy)
 * - Social media links
 * - Newsletter subscription
 * - Stripe-inspired design
 * - Responsive layout
 */
export function Footer() {
  const pathname = usePathname();
  const currentYear = new Date().getFullYear();

  const isActive = (path: string) => pathname === path;

  const navigation = {
    main: [
      { href: '/about', label: 'about' },
      { href: '/work', label: 'work' },
      { href: '/writing', label: 'writing' },
      { href: '/resources', label: 'resources' },
      { href: '/contact', label: 'contact' },
    ],
    resources: [
      { href: '/resources', label: 'all resources' },
      { href: '/writing', label: 'articles' },
      { href: '/work', label: 'projects' },
    ],
    account: [
      { href: '/login', label: 'sign in' },
      { href: '/account', label: 'my account' },
      { href: '/account/purchases', label: 'my purchases' },
    ],
    legal: [
      { href: '/terms', label: 'terms & conditions' },
      { href: '/privacy', label: 'privacy policy' },
    ],
    social: [
      {
        name: 'GitHub',
        href: 'https://github.com/leqir',
        icon: (
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
            <path
              fillRule="evenodd"
              d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
              clipRule="evenodd"
            />
          </svg>
        ),
      },
      {
        name: 'LinkedIn',
        href: 'https://www.linkedin.com/in/nathanael-thie-036685297/',
        icon: (
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
        ),
      },
      {
        name: 'Instagram',
        href: 'https://instagram.com/riqle',
        icon: (
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
          </svg>
        ),
      },
    ],
  };

  return (
    <footer className="border-t border-stone-200 bg-white">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-16">
        {/* Main footer content */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-12 lg:gap-12">
          {/* Brand section */}
          <div className="lg:col-span-4">
            <Link
              href="/"
              className="group inline-block transition-transform duration-200 hover:scale-105"
            >
              <span className="bg-gradient-to-r from-stone-900 via-stone-700 to-stone-900 bg-clip-text text-3xl font-bold tracking-tight text-transparent transition-all duration-300 group-hover:from-cyan-600 group-hover:via-purple-600 group-hover:to-cyan-600">
                riqle
              </span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-stone-600">
              building products and teaching systems thinking. exploring the intersection of
              technology, education, and human potential.
            </p>

            {/* Social links */}
            <div className="mt-6 flex gap-4">
              {navigation.social.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-stone-500 transition-all duration-200 hover:scale-110 hover:text-cyan-600 active:scale-95"
                  aria-label={item.name}
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation sections */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-2 gap-8 md:grid-cols-3">
              {/* Main navigation */}
              <div>
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-stone-900">
                  navigate
                </h3>
                <ul className="space-y-3">
                  {navigation.main.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={`text-sm lowercase transition-colors duration-200 ${
                          isActive(item.href)
                            ? 'font-medium text-cyan-600'
                            : 'text-stone-600 hover:text-cyan-600'
                        }`}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Resources */}
              <div>
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-stone-900">
                  resources
                </h3>
                <ul className="space-y-3">
                  {navigation.resources.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={`text-sm lowercase transition-colors duration-200 ${
                          isActive(item.href)
                            ? 'font-medium text-cyan-600'
                            : 'text-stone-600 hover:text-cyan-600'
                        }`}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Account */}
              <div>
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-stone-900">
                  account
                </h3>
                <ul className="space-y-3">
                  {navigation.account.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={`text-sm lowercase transition-colors duration-200 ${
                          isActive(item.href)
                            ? 'font-medium text-cyan-600'
                            : 'text-stone-600 hover:text-cyan-600'
                        }`}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter section */}
        <div className="mt-12 border-t border-stone-200 pt-8">
          <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
            <div className="max-w-md">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-stone-900">
                stay updated
              </h3>
              <p className="mt-2 text-sm text-stone-600">
                get notified about new resources, articles, and projects.
              </p>
            </div>
            <form className="flex w-full max-w-md gap-2">
              <input
                type="email"
                placeholder="your email"
                className="flex-1 rounded-lg border border-stone-300 bg-white px-4 py-2 text-sm lowercase text-stone-900 placeholder-stone-400 transition-all duration-200 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
              />
              <button
                type="submit"
                className="rounded-lg bg-gradient-to-r from-cyan-500 to-purple-500 px-6 py-2 text-sm font-medium lowercase text-white shadow-md transition-all duration-200 hover:scale-105 hover:shadow-lg active:scale-95"
              >
                subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom section */}
        <div className="mt-12 border-t border-stone-200 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-stone-500">© {currentYear} riqle. all rights reserved.</p>
            <div className="flex flex-wrap justify-center gap-6">
              {navigation.legal.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm lowercase text-stone-500 transition-colors duration-200 hover:text-cyan-600"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
