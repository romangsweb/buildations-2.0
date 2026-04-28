import type { Metadata } from 'next';
import Script from 'next/script';
import '@/styles/globals.css'

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import RevealInit from '@/components/RevealInit';
import CustomCursor from '@/components/CustomCursor';
import PageTransition from '@/components/PageTransition';
import AnnouncementBar from '@/components/AnnouncementBar';
import BackToTop from '@/components/BackToTop';
import SkipToContent from '@/components/SkipToContent';

const BASE_URL = 'https://buildations.com'

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Buildations',
  url: 'https://buildations.com',
  description: 'AI research laboratory that builds its own engines from infrastructure up.',
  publisher: {
    '@type': 'Organization',
    name: 'Buildations',
    url: 'https://buildations.com',
  },
}

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'Buildations — AI Research & Intelligence',
    template: '%s — Buildations',
  },
  description: 'Laboratorio editorial de inteligencia artificial. Research, motores de IA en producción y exploración creativa desde Ciudad de México.',
  keywords: ['inteligencia artificial', 'AI research', 'laboratorio IA', 'motores IA', 'RAG', 'LLM', 'Buildations', 'CDMX'],
  authors: [{ name: 'Buildations', url: BASE_URL }],
  creator: 'Buildations',
  publisher: 'Buildations',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  openGraph: {
    type: 'website',
    locale: 'es_MX',
    url: BASE_URL,
    siteName: 'Buildations',
    title: 'Buildations — AI Research & Intelligence',
    description: 'Laboratorio editorial de inteligencia artificial. Research, motores de IA en producción y exploración creativa desde Ciudad de México.',
    images: [
      {
        url: '/og-default.png',
        width: 1200,
        height: 630,
        alt: 'Buildations — AI Research Laboratory',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@buildations',
    creator: '@buildations',
    title: 'Buildations — AI Research & Intelligence',
    description: 'Laboratorio editorial de inteligencia artificial desde Ciudad de México.',
    images: ['/og-default.png'],
  },
  alternates: {
    canonical: BASE_URL,
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-touch-icon.png',
  },
};

// Organization JSON-LD schema
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Buildations',
  url: BASE_URL,
  logo: `${BASE_URL}/icon.svg`,
  description: 'Laboratorio editorial de inteligencia artificial. Diseñamos, construimos y documentamos motores de IA en producción.',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Ciudad de México',
    addressCountry: 'MX',
  },
  sameAs: [
    'https://github.com/romangsweb',
  ],
}

// Website JSON-LD schema (enables sitelinks search box in Google)
const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Buildations',
  url: BASE_URL,
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${BASE_URL}/research?q={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Preload critical font weight */}
        <link
          rel="preload"
          as="style"
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap"
        />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" />

        {/* Structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-037W81DJZW"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-037W81DJZW');
          `}
        </Script>

        {/* Skip to main content — accessibility */}
        <SkipToContent />

        <AnnouncementBar />
        <Navbar />
        <RevealInit />
        <CustomCursor />
        <BackToTop />
        <PageTransition>
          <main id="main-content">{children}</main>
        </PageTransition>
        <Footer />
      </body>
    </html>
  );
}
