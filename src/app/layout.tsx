import type { Metadata } from 'next';
import { Inter, Nanum_Pen_Script } from 'next/font/google';
import { AuthSessionProvider } from '@/components/providers/session-provider';
import { Header } from '@/components/navigation/header';
import { KoreanBackground } from '@/components/korean-aesthetic/korean-background';
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
  title: 'riqle.',
  description: 'student → tutor → builder → founder. 1am study energy. honest work. quiet proof.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${nanumPen.variable}`}>
      <body className="font-sans">
        <AuthSessionProvider>
          <KoreanBackground>
            <Header />
            <main className="pt-16">{children}</main>
          </KoreanBackground>
        </AuthSessionProvider>
      </body>
    </html>
  );
}
