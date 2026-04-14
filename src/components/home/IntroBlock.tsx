'use client';
import styles from '@/styles/IntroBlock.module.css';

const stats = [
  { num: '3', label: 'Engines in production' },
  { num: '57', label: 'Services orchestrated' },
  { num: '1.4M+', label: 'Security events processed' },
  { num: '0', label: 'Critical cloud dependencies' },
];

export default function IntroBlock() {
  return (
    <>
      <section className={styles.intro}>
        <div className={styles.container}>
          <p className={styles.label} data-reveal>About</p>
          <h2 className={styles.statement} data-reveal>
            Not everything built with AI deserves to be called intelligence. Buildations is a research laboratory that builds from the ground up — from infrastructure to finished engines. Each piece tested, broken, and rebuilt until it works in production.
          </h2>
          <p className={styles.sub} data-reveal>
            Building this takes decisions. Some work. Some don&apos;t. The ones worth documenting live in Research.
          </p>
          <a href="/research" className={styles.cta} data-reveal>→ Read the research</a>
        </div>
        <span className={styles.decNumber} aria-hidden="true">02</span>
      </section>
      <section className={styles.stats}>
        {stats.map((s, i) => (
          <div key={i} className={styles.stat} data-reveal style={{ transitionDelay: `${i * 0.08}s` }}>
            <span className={styles.statNum}>{s.num}</span>
            <span className={styles.statLabel}>{s.label}</span>
          </div>
        ))}
      </section>
    </>
  );
}
