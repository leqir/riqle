'use client';

import Link from 'next/link';
import { useState } from 'react';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-stone-200/50 bg-white/80 backdrop-blur-md">
      <nav className="mx-auto max-w-7xl px-6 lg:px-8" aria-label="Global">
        <div className="flex h-16 items-center justify-between">
          {/* Logo/Brand */}
          <div className="flex lg:flex-1">
            <Link href="/" className="-m-1.5 p-1.5">
              <span className="text-2xl font-bold tracking-tight text-stone-900">riqle</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-stone-700"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <svg
                  className="h-6 w-6"
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
          <div className="hidden lg:flex lg:gap-x-8">
            <Link
              href="/about"
              className="text-sm font-medium leading-6 text-stone-700 transition-colors duration-200 hover:text-cyan-500"
            >
              About
            </Link>
            <Link
              href="/work"
              className="text-sm font-medium leading-6 text-stone-700 transition-colors duration-200 hover:text-cyan-500"
            >
              Work
            </Link>
            <Link
              href="/writing"
              className="text-sm font-medium leading-6 text-stone-700 transition-colors duration-200 hover:text-cyan-500"
            >
              Writing
            </Link>
            <Link
              href="/resources"
              className="text-sm font-medium leading-6 text-stone-700 transition-colors duration-200 hover:text-cyan-500"
            >
              Resources
            </Link>
            <Link
              href="/contact"
              className="text-sm font-medium leading-6 text-stone-700 transition-colors duration-200 hover:text-cyan-500"
            >
              Contact
            </Link>
          </div>

          {/* Auth buttons */}
          <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-4">
            <Link
              href="/auth/signin"
              className="text-sm font-medium leading-6 text-stone-700 transition-colors duration-200 hover:text-cyan-500"
            >
              Log in
            </Link>
            <Link
              href="/auth/signup"
              className="rounded-full bg-cyan-500 px-4 py-1.5 text-sm font-medium text-white shadow-sm transition-colors duration-200 hover:bg-cyan-600"
            >
              Sign up
            </Link>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              <Link
                href="/about"
                className="block rounded-md px-3 py-2 text-base font-medium text-stone-700 transition-colors duration-200 hover:bg-stone-100 hover:text-cyan-500"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/work"
                className="block rounded-md px-3 py-2 text-base font-medium text-stone-700 transition-colors duration-200 hover:bg-stone-100 hover:text-cyan-500"
                onClick={() => setMobileMenuOpen(false)}
              >
                Work
              </Link>
              <Link
                href="/writing"
                className="block rounded-md px-3 py-2 text-base font-medium text-stone-700 transition-colors duration-200 hover:bg-stone-100 hover:text-cyan-500"
                onClick={() => setMobileMenuOpen(false)}
              >
                Writing
              </Link>
              <Link
                href="/resources"
                className="block rounded-md px-3 py-2 text-base font-medium text-stone-700 transition-colors duration-200 hover:bg-stone-100 hover:text-cyan-500"
                onClick={() => setMobileMenuOpen(false)}
              >
                Resources
              </Link>
              <Link
                href="/contact"
                className="block rounded-md px-3 py-2 text-base font-medium text-stone-700 transition-colors duration-200 hover:bg-stone-100 hover:text-cyan-500"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
              <div className="mt-4 space-y-2 border-t border-stone-200 pt-4">
                <Link
                  href="/auth/signin"
                  className="block rounded-md px-3 py-2 text-base font-medium text-stone-700 transition-colors duration-200 hover:bg-stone-100 hover:text-cyan-500"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Log in
                </Link>
                <Link
                  href="/auth/signup"
                  className="block rounded-full bg-cyan-500 px-4 py-2 text-center text-base font-medium text-white shadow-sm transition-colors duration-200 hover:bg-cyan-600"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign up
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
