import type { Metadata } from 'next';
import Hero from '@/components/home/Hero';
import IntroBlock from '@/components/home/IntroBlock';
import LatestResearch from '@/components/home/LatestResearch';

export const metadata: Metadata = {
  title: 'Buildations — AI Research & Intelligence',
  description: 'Research, inteligencia artificial y exploración creativa. Ensayos generados con IA y validados por criterio humano.',
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <IntroBlock />
      <LatestResearch />
    </>
  );
}
