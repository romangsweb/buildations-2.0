import type { Metadata } from 'next';
import Hero from '@/components/home/Hero';
import IntroBlock from '@/components/home/IntroBlock';
import LatestResearch from '@/components/home/LatestResearch';
import FeaturedEngines from '@/components/home/FeaturedEngines'
import HowItWorks from '@/components/home/HowItWorks';

export const metadata: Metadata = {
  title: 'Buildations — AI Research & Intelligence',
  description: 'Research, inteligencia artificial y exploración creativa. Ensayos generados con IA y validados por criterio humano.',
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <IntroBlock />
      <HowItWorks />
      <FeaturedEngines />
      <LatestResearch />
    </>
  );
}
