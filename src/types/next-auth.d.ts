import 'next-auth';
import 'next-auth/jwt';

/**
 * NextAuth Type Extensions
 *
 * Extends NextAuth types to include custom fields like 'role'
 */

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      email: string;
      name?: string | null;
      image?: string | null;
      role?: string;
    };
  }

  interface User {
    role?: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    role?: string;
  }
}
