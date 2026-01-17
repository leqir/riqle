'use client';

import { signOut } from 'next-auth/react';

/**
 * Sign Out Button
 *
 * Client component that triggers NextAuth sign out.
 * Can optionally redirect to a specific URL after sign out.
 */
export function SignOutButton({
  children,
  className,
  callbackUrl = '/',
}: {
  children?: React.ReactNode;
  className?: string;
  callbackUrl?: string;
}) {
  const handleSignOut = async () => {
    await signOut({ callbackUrl });
  };

  return (
    <button type="button" onClick={handleSignOut} className={className}>
      {children || 'Sign Out'}
    </button>
  );
}
