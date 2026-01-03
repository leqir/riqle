import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { AuthSessionProvider } from '@/components/providers/session-provider';
import { Header } from '@/components/navigation/header';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

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
    <html lang="en" className={inter.variable}>
      <body className="font-sans">
        <AuthSessionProvider>
          <Header />
          <main className="pt-16">{children}</main>
        </AuthSessionProvider>
      </body>
    </html>
  );
}
