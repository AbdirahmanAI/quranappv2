import './globals.css';
import { Inter, Plus_Jakarta_Sans, Noto_Sans } from 'next/font/google';
import { Providers } from '@/components/providers';
import { SITE_CONFIG } from '@/lib/constants';
import type { Metadata } from 'next';
import { viewport } from '@/lib/meta';
import GoogleTagManager from '@/components/analytics/google-tag-manager';
import { Suspense } from 'react';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const notoSans = Noto_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-noto-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: SITE_CONFIG.name,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'),
  icons: {
    icon: [
      { url: '/icons/icon-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icons/icon-512x512.png', sizes: '512x512', type: 'image/png' }
    ],
    apple: [
      { url: '/icons/icon-192x192.png', sizes: '192x192', type: 'image/png' }
    ],
    shortcut: ['/icons/icon-192x192.png']
  },
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: SITE_CONFIG.name
  },
  formatDetection: {
    telephone: false
  },
  other: {
    'mobile-web-app-capable': 'yes'
  }
};

export { viewport };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${plusJakarta.variable} ${notoSans.variable}`}>
      <head>
        <GoogleTagManager />
      </head>
      <body>
        <Suspense>
          <Providers>{children}</Providers>
        </Suspense>
      </body>
    </html>
  );
}
