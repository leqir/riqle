import type { Metadata } from 'next';
import { Inter, Nanum_Pen_Script } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import { AuthSessionProvider } from '@/components/infrastructure/providers/session-provider';
import { Header } from '@/components/infrastructure/navigation/header';
import { Footer } from '@/components/infrastructure/navigation/footer';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const nanumPen = Nanum_Pen_Script({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-chalk',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Riqle',
  description:
    'Student → Tutor → Builder → Founder. Building products and teaching systems thinking.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${nanumPen.variable}`}>
      <body className="bg-gradient-to-br from-blue-50 via-white to-purple-50 font-sans">
        <AuthSessionProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </AuthSessionProvider>
        <Analytics />
      </body>
    </html>
  );
}
