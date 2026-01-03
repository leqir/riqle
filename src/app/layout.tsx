import type { Metadata } from 'next';
import { Inter, Nanum_Pen_Script } from 'next/font/google';
import { AuthSessionProvider } from '@/components/providers/session-provider';
import { Header } from '@/components/navigation/header';
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
          <main className="pt-16">{children}</main>
        </AuthSessionProvider>
      </body>
    </html>
  );
}
