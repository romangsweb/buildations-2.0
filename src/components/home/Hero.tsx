'use client';

import { useEffect, useRef } from 'react';
import styles from '@/styles/Hero.module.css';

export default function Hero() {
  const wordRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    // Staggered letter animation on mount
    const el = wordRef.current;
    if (!el) return;
    const letters = el.querySelectorAll('.letter');
    letters.forEach((l, i) => {
      const letter = l as HTMLElement;
      letter.style.transitionDelay = `${i * 0.04}s`;
      setTimeout(() => letter.classList.add('visible'), 100);
    });
  }, []);

  const word = 'BUILDATIONS';

  return (
    <section className={styles.hero}>
      {/* Decorative number */}
      <span className={styles.decNumber} aria-hidden="true">01</span>

      <div className={styles.content}>
        <p className={styles.label}>Research · AI · Intelligence</p>
        <h1 className={styles.headline} ref={wordRef}>
          {word.split('').map((char, i) => (
            <span key={i} className={`${styles.letter} letter`}>
              {char}
            </span>
          ))}
        </h1>
        <p className={styles.sub}>
          Investigación artificial.<br />
          Síntesis editorial.
        </p>
      </div>

      {/* Scroll indicator */}
      <div className={styles.scrollCue} aria-hidden="true">
        <span className={styles.scrollLine} />
        <span className={styles.scrollText}>scroll</span>
      </div>
    </section>
  );
}
