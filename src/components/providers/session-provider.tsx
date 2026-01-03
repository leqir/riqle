'use client';

import { SessionProvider } from 'next-auth/react';

/**
 * Session Provider Component
 *
 * Wraps the app with NextAuth's SessionProvider to enable:
 * - useSession() hook in client components
 * - Automatic session refresh
 * - Session synchronization across tabs
 *
 * This is a client component that wraps server-rendered content.
 */
export function AuthSessionProvider({ children }: { children: React.ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}
