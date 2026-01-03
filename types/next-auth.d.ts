import 'next-auth';
import { type DefaultSession } from 'next-auth';

/**
 * TypeScript Module Augmentation for NextAuth
 *
 * Extends the default NextAuth types to include custom fields:
 * - user.id: The user's database ID
 * - user.role: The user's role (admin, editor, customer)
 *
 * These fields are populated in the session callback in auth.config.ts
 */

declare module 'next-auth' {
  /**
   * Returned by `auth()`, `useSession()`, `getSession()` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      id: string;
      role: string;
    } & DefaultSession['user'];
  }

  /**
   * The shape of the user object returned in the OAuth providers' `profile` callback,
   * or the second parameter of the `session` callback, when using a database.
   */
  interface User {
    id: string;
    email: string;
    name?: string | null;
    image?: string | null;
  }
}

declare module 'next-auth/jwt' {
  /**
   * Returned by the `jwt` callback and `getToken`, when using JWT sessions
   */
  interface JWT {
    id: string;
    role?: string;
  }
}
