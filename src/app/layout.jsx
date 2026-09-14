/**
 * THE PLUG TVET - root layout
 * ---------------------------------------------------------------------------
 * Owns the document shell, the font pipeline, global metadata (SEO + social
 * cards) and the persistent chrome (navbar, footer, scroll progress).
 */

import './globals.css';

import { Inter, JetBrains_Mono } from 'next/font/google';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollProgress from '@/components/ScrollProgress';
import { siteConfig, siteUrl } from '@/data/site';
import { organisationSchema, websiteSchema } from '@/lib/seo';

/* ---------------------------------------------------------------------------
   Typography - Inter (ultra-modern sans) + JetBrains Mono for code paths.
   Loaded through next/font so the CSS is self-hosted, preloaded and free of
   layout shift.
--------------------------------------------------------------------------- */
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800'],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
  weight: ['400', '500'],
});

/* ---------------------------------------------------------------------------
   Global metadata
--------------------------------------------------------------------------- */
export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteConfig.name} | ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name, url: siteUrl }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  keywords: [
    'TVET Botswana',
    'vocational training Botswana',
    'TVET admissions',
    'learnerships Botswana',
    'apprenticeships Botswana',
    'bursaries Botswana',
    'skills development Botswana',
    'labour market research Botswana',
    'TVET policy Botswana',
    'Francistown training',
    'artisan training',
    'HRDC levy training',
  ],
  category: 'Education',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    siteName: siteConfig.name,
    title: `${siteConfig.name}: ${siteConfig.tagline}`,
    description: siteConfig.description,
    locale: siteConfig.locale,
    url: siteUrl,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.name}: ${siteConfig.tagline}`,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  icons: {
    icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
    apple: [{ url: '/logo.svg' }],
  },
  formatDetection: { telephone: true, email: true, address: true },
};

/** Theme colour for mobile browser chrome. */
export const viewport = {
  themeColor: '#050912',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en-BW" className="dark">
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans`}>
        {/* Keyboard users can jump straight past the navigation. */}
        <a
          href="#main"
          className="sr-only-focusable fixed left-4 top-4 z-[70] rounded-full bg-cyan-400 px-4 py-2 text-sm font-semibold text-slate-950"
        >
          Skip to content
        </a>

        {/* Reading progress + back-to-top */}
        <ScrollProgress />

        <Navbar />

        <main id="main" className="relative">
          {children}
        </main>

        <Footer />

        {/* ---- Structured data (organisation + website) ------------------ */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organisationSchema()) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema()) }}
        />
      </body>
    </html>
  );
}