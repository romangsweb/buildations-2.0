'use client';

import styles from '@/styles/IntroBlock.module.css';

export default function IntroBlock() {
  return (
    <section className={styles.intro}>
      <div className={styles.container}>
        <p className={styles.label} data-reveal>About</p>
        <h2 className={styles.statement} data-reveal>
          Buildations is a research initiative exploring the intersection of artificial intelligence, design, and editorial synthesis. We build tools to understand the future.
        </h2>
      </div>
      <span className={styles.decNumber} aria-hidden="true">02</span>
    </section>
  );
}
