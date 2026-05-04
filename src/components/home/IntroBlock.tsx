'use client';
import { useEffect, useRef, useState } from 'react';
import styles from '@/styles/IntroBlock.module.css';

const stats = [
  { num: 3, display: '3', label: 'Engines in production', suffix: '' },
  { num: 52, display: '52', label: 'Docker containers running', suffix: '' },
  { num: 1400000, display: '1.4M+', label: 'Security events processed', suffix: '' },
  { num: 338, display: '338', label: 'Research articles published', suffix: '' },
  { num: 9, display: '9', label: 'Threat monitoring sources', suffix: '' },
  { num: 0, display: '0', label: 'Critical cloud dependencies', suffix: '' },
  { num: 367000, display: '367K', label: 'Search data rows updated daily', suffix: '' },
  { num: null, display: '24/7', label: 'Autonomous operation', suffix: '' },
];

function useCountUp(target: number | null, duration = 1800, isVisible: boolean) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible || target === null) return;
    if (target === 0) { setCount(0); return; }

    const start = performance.now();
    const animate = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [isVisible, target, duration]);

  return count;
}

function formatCount(count: number, display: string): string {
  if (display === '24/7') return '24/7';
  if (display === '0') return '0';
  if (display.includes('M')) {
    const millions = count / 1_000_000;
    return `${millions.toFixed(1)}M+`;
  }
  if (display.includes('K')) {
    const k = Math.round(count / 1000);
    return `${k}K`;
  }
  return String(count);
}

function StatCard({ stat }: { stat: typeof stats[0] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const count = useCountUp(stat.num, 1600, visible);
  const displayed = visible
    ? stat.num === null
      ? stat.display
      : formatCount(count, stat.display)
    : '—';

  return (
    <div ref={ref} className={`${styles.stat} ${visible ? styles.statVisible : ''}`}>
      <span className={styles.statNum}>{displayed}</span>
      <span className={styles.statLabel}>{stat.label}</span>
    </div>
  );
}

export default function IntroBlock() {
  return (
    <>
      <section className={styles.intro}>
        <div className={styles.container}>
          <p className={styles.label}>About</p>
          <h2 className={styles.statement}>
            Not everything built with AI deserves to be called intelligence. Buildations is a research laboratory that builds from the ground up — from infrastructure to finished engines. Each piece tested, broken, and rebuilt until it works in production.
          </h2>
          <p className={styles.sub}>
            Building this takes decisions. Some work. Some don&apos;t. The ones worth documenting live in Research.
          </p>
          <a href="/research" className={styles.cta}>→ Read the research</a>
        </div>
        <span className={styles.decNumber} aria-hidden="true">02</span>
      </section>
      <section className={styles.stats} aria-label="Métricas de producción">
        {stats.map((s, i) => (
          <StatCard key={i} stat={s} />
        ))}
      </section>
    </>
  );
}
