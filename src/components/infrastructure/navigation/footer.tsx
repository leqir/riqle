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
        href: 'https://github.com',
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
        href: 'https://linkedin.com',
        icon: (
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
        ),
      },
      {
        name: 'Twitter',
        href: 'https://twitter.com',
        icon: (
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
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
