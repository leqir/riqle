import type { Metadata } from 'next';
import { Inter, Nanum_Pen_Script } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import { AuthSessionProvider } from '@/components/infrastructure/providers/session-provider';
import { TRPCProvider } from '@/lib/trpc/provider';
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
  metadataBase: new URL(process.env.NEXT_PUBLIC_URL || 'https://riqle.com'),
  title: {
    default: 'riqle | nathanael - builder, founder & educator',
    template: '%s | riqle',
  },
  description:
    'my future employers want a personal website, here it is. co-founder of MarkPoint, building educational products for HSC students.',
  keywords: [
    'riqle',
    'nathanael',
    'MarkPoint',
    'HSC resources',
    'education',
    'systems thinking',
    'builder',
    'founder',
    'tutor',
    'Australia',
  ],
  authors: [{ name: 'nathanael (riqle)', url: 'https://riqle.com' }],
  creator: 'nathanael (riqle)',
  publisher: 'riqle',
  openGraph: {
    type: 'website',
    locale: 'en_AU',
    url: 'https://riqle.com',
    siteName: 'riqle',
    title: 'riqle | nathanael - builder, founder & educator',
    description:
      'my future employers want a personal website, here it is. co-founder of MarkPoint, building educational products for HSC students.',
    images: [
      {
        url: '/og-image.png', // You'll need to create this
        width: 1200,
        height: 630,
        alt: 'riqle - nathanael',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'riqle | nathanael - builder, founder & educator',
    description:
      'my future employers want a personal website, here it is. co-founder of MarkPoint, building educational products for HSC students.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Add these when you set up Google Search Console
    // google: 'your-google-site-verification-code',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
    other: [
      {
        rel: 'android-chrome-192x192',
        url: '/android-chrome-192x192.png',
      },
      {
        rel: 'android-chrome-512x512',
        url: '/android-chrome-512x512.png',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${nanumPen.variable}`}>
      <body className="bg-gradient-to-br from-blue-50 via-white to-purple-50 font-sans">
        <TRPCProvider>
          <AuthSessionProvider>
            <Header />
            <main>{children}</main>
            <Footer />
          </AuthSessionProvider>
        </TRPCProvider>
        <Analytics />
      </body>
    </html>
  );
}
