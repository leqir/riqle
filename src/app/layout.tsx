import type { Metadata } from 'next';
import { AuthSessionProvider } from '@/components/providers/session-provider';
import './globals.css';

export const metadata: Metadata = {
  title: 'Riqle - Personal Platform',
  description:
    'Personal digital platform unifying identity, portfolio, educational resources, and startup ventures.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthSessionProvider>{children}</AuthSessionProvider>
      </body>
    </html>
  );
}
