'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { usePathname } from 'next/navigation';

/**
 * Modern, Animated Header Component
 *
 * Features:
 * - Dynamic user state (logged in/out)
 * - Smooth animations
 * - User dropdown menu
 * - Mobile responsive
 * - Glass morphism design
 * - Hover effects
 */
export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const handleLogout = async () => {
    setUserMenuOpen(false);
    await signOut({ callbackUrl: '/' });
  };

  const isActive = (path: string) => pathname === path;

  return (
    <>
      <header
        className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'border-b border-stone-200/50 bg-white/95 shadow-sm backdrop-blur-xl'
            : 'border-b border-transparent bg-white/80 backdrop-blur-md'
        }`}
      >
        <nav className="mx-auto max-w-7xl px-6 lg:px-8" aria-label="Global">
          <div className="flex h-16 items-center justify-between">
            {/* Logo/Brand */}
            <div className="flex lg:flex-1">
              <Link
                href="/"
                className="group -m-1.5 p-1.5 transition-transform duration-200 hover:scale-105"
              >
                <span className="bg-gradient-to-r from-stone-900 via-stone-700 to-stone-900 bg-clip-text text-2xl font-bold tracking-tight text-transparent transition-all duration-300 group-hover:from-cyan-600 group-hover:via-purple-600 group-hover:to-cyan-600">
                  riqle
                </span>
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="flex lg:hidden">
              <button
                type="button"
                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-stone-700 transition-transform duration-200 hover:scale-110 active:scale-95"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
              >
                <span className="sr-only">Open main menu</span>
                {mobileMenuOpen ? (
                  <svg
                    className="h-6 w-6 rotate-90 transition-transform duration-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                    />
                  </svg>
                )}
              </button>
            </div>

            {/* Desktop navigation */}
            <div className="hidden lg:flex lg:gap-x-1">
              {[
                { href: '/about', label: 'about' },
                { href: '/work', label: 'work' },
                { href: '/writing', label: 'writing' },
                { href: '/resources', label: 'resources' },
                { href: '/contact', label: 'contact' },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative px-4 py-2 text-sm font-medium lowercase tracking-wide transition-all duration-200 ${
                    isActive(item.href) ? 'text-cyan-600' : 'text-stone-700 hover:text-cyan-500'
                  }`}
                >
                  {item.label}
                  {isActive(item.href) && (
                    <span className="animate-shimmer absolute inset-x-0 -bottom-px h-0.5 bg-gradient-to-r from-cyan-500 to-purple-500" />
                  )}
                </Link>
              ))}
            </div>

            {/* Auth section */}
            <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-3">
              {status === 'loading' ? (
                <div className="flex items-center gap-2">
                  <div className="h-8 w-16 animate-pulse rounded-full bg-stone-200" />
                  <div className="h-8 w-20 animate-pulse rounded-full bg-stone-200" />
                </div>
              ) : session?.user ? (
                <div className="relative" ref={userMenuRef}>
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="group flex items-center gap-2 rounded-full border border-stone-200 bg-white px-3 py-1.5 shadow-sm transition-all duration-200 hover:border-cyan-300 hover:shadow-md active:scale-95"
                  >
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-purple-500 text-sm font-medium text-white shadow-inner">
                      {session.user.name?.[0]?.toUpperCase() ||
                        session.user.email?.[0]?.toUpperCase() ||
                        'U'}
                    </div>
                    <span className="text-sm font-medium lowercase text-stone-700 transition-colors group-hover:text-cyan-600">
                      {session.user.name?.split(' ')[0] || 'account'}
                    </span>
                    <svg
                      className={`h-4 w-4 text-stone-500 transition-transform duration-200 ${
                        userMenuOpen ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* User dropdown */}
                  {userMenuOpen && (
                    <div className="animate-slideDown absolute right-0 mt-2 w-56 origin-top-right rounded-xl border border-stone-200 bg-white shadow-xl ring-1 ring-black ring-opacity-5">
                      <div className="border-b border-stone-100 px-4 py-3">
                        <p className="text-sm font-medium text-stone-900">
                          {session.user.name || 'User'}
                        </p>
                        <p className="text-xs text-stone-500">{session.user.email}</p>
                      </div>
                      <div className="py-1">
                        <Link
                          href="/account"
                          onClick={() => setUserMenuOpen(false)}
                          className="block px-4 py-2 text-sm lowercase text-stone-700 transition-colors hover:bg-cyan-50 hover:text-cyan-600"
                        >
                          my account
                        </Link>
                        <Link
                          href="/account/purchases"
                          onClick={() => setUserMenuOpen(false)}
                          className="block px-4 py-2 text-sm lowercase text-stone-700 transition-colors hover:bg-cyan-50 hover:text-cyan-600"
                        >
                          my purchases
                        </Link>
                        {session.user.role === 'admin' && (
                          <Link
                            href="/admin"
                            onClick={() => setUserMenuOpen(false)}
                            className="block px-4 py-2 text-sm lowercase text-stone-700 transition-colors hover:bg-purple-50 hover:text-purple-600"
                          >
                            admin panel
                          </Link>
                        )}
                      </div>
                      <div className="border-t border-stone-100 py-1">
                        <button
                          onClick={handleLogout}
                          className="block w-full px-4 py-2 text-left text-sm lowercase text-red-600 transition-colors hover:bg-red-50"
                        >
                          sign out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="rounded-full px-4 py-1.5 text-sm font-medium lowercase text-stone-700 transition-all duration-200 hover:scale-105 hover:text-cyan-500 active:scale-95"
                  >
                    sign in
                  </Link>
                  <Link
                    href="/login"
                    className="group relative overflow-hidden rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 px-5 py-1.5 text-sm font-medium lowercase text-white shadow-md transition-all duration-200 hover:scale-105 hover:shadow-lg active:scale-95"
                  >
                    <span className="relative z-10">get started</span>
                    <div className="absolute inset-0 -z-0 bg-gradient-to-r from-purple-500 to-cyan-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Mobile menu */}
          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out lg:hidden ${
              mobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <div className="space-y-1 px-2 pb-3 pt-2">
              {[
                { href: '/about', label: 'about' },
                { href: '/work', label: 'work' },
                { href: '/writing', label: 'writing' },
                { href: '/resources', label: 'resources' },
                { href: '/contact', label: 'contact' },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block rounded-lg px-3 py-2.5 text-base font-medium lowercase transition-all duration-200 ${
                    isActive(item.href)
                      ? 'bg-cyan-50 text-cyan-600'
                      : 'text-stone-700 hover:bg-stone-50 hover:text-cyan-500'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}

              <div className="mt-4 space-y-2 border-t border-stone-200 pt-4">
                {session?.user ? (
                  <>
                    <div className="px-3 pb-2">
                      <p className="text-sm font-medium text-stone-900">
                        {session.user.name || 'User'}
                      </p>
                      <p className="text-xs text-stone-500">{session.user.email}</p>
                    </div>
                    <Link
                      href="/account"
                      className="block rounded-lg px-3 py-2.5 text-base font-medium lowercase text-stone-700 transition-all duration-200 hover:bg-stone-50 hover:text-cyan-500"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      my account
                    </Link>
                    <Link
                      href="/account/purchases"
                      className="block rounded-lg px-3 py-2.5 text-base font-medium lowercase text-stone-700 transition-all duration-200 hover:bg-stone-50 hover:text-cyan-500"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      my purchases
                    </Link>
                    {session.user.role === 'admin' && (
                      <Link
                        href="/admin"
                        className="block rounded-lg px-3 py-2.5 text-base font-medium lowercase text-stone-700 transition-all duration-200 hover:bg-purple-50 hover:text-purple-600"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        admin panel
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="block w-full rounded-lg px-3 py-2.5 text-left text-base font-medium lowercase text-red-600 transition-all duration-200 hover:bg-red-50"
                    >
                      sign out
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/login"
                      className="block rounded-lg px-3 py-2.5 text-center text-base font-medium lowercase text-stone-700 transition-all duration-200 hover:bg-stone-50 hover:text-cyan-500"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      sign in
                    </Link>
                    <Link
                      href="/login"
                      className="block rounded-lg bg-gradient-to-r from-cyan-500 to-purple-500 px-4 py-2.5 text-center text-base font-medium lowercase text-white shadow-md transition-all duration-200 hover:shadow-lg active:scale-95"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      get started
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </nav>
      </header>

      {/* Spacer to prevent content from being hidden under fixed header */}
      <div className="h-16" />

      {/* Animations */}
      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes shimmer {
          0% {
            background-position: -200% center;
          }
          100% {
            background-position: 200% center;
          }
        }
        .animate-slideDown {
          animation: slideDown 0.2s ease-out;
        }
        .animate-shimmer {
          background-size: 200% 100%;
          animation: shimmer 2s linear infinite;
        }
      `}</style>
    </>
  );
}
