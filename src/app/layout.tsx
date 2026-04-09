import type { Metadata } from 'next';
import '@/styles/globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import RevealInit from '@/components/RevealInit';

export const metadata: Metadata = {
  title: {
    default: 'Buildations — AI Research & Intelligence',
    template: '%s — Buildations',
  },
  description: 'Research, inteligencia artificial y exploración creativa. Ensayos, herramientas y síntesis generadas con IA y validadas por criterio humano.',
  openGraph: {
    siteName: 'Buildations',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <Navbar />
        <RevealInit />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
