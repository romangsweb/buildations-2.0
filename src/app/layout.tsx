import type { Metadata } from 'next';
import '@/styles/globals.css'
import 'katex/dist/katex.min.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import RevealInit from '@/components/RevealInit';
import CustomCursor from '@/components/CustomCursor';
import ScrollProgress from '@/components/ScrollProgress';

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
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body>
        <Navbar />
        <RevealInit />
        <CustomCursor />
        <ScrollProgress />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
