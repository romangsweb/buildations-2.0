'use client';
import { useEffect, useRef, useState } from 'react';
import styles from '@/styles/Hero.module.css';

const IMAGES = [
  'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=1800&q=90',
  'https://images.unsplash.com/photo-1429497419816-9ca5cfb4571a?w=1800&q=90',
  'https://images.unsplash.com/photo-1482189349482-56c6e7e295eb?w=1800&q=90',
  'https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?w=1800&q=90',
];

export default function Hero() {
  const wordRef = useRef<HTMLHeadingElement>(null);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const el = wordRef.current;
    if (!el) return;
    const letters = el.querySelectorAll('.letter');
    letters.forEach((l, i) => {
      const letter = l as HTMLElement;
      letter.style.transitionDelay = `${i * 0.04}s`;
      setTimeout(() => letter.classList.add('visible'), 100);
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(c => (c + 1) % IMAGES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const word = 'BUILDATIONS';

  return (
    <section className={styles.hero}>
      {/* Background images */}
      {IMAGES.map((src, i) => (
        <div
          key={i}
          className={styles.bgImage}
          style={{
            backgroundImage: `url(${src})`,
            opacity: current === i ? 1 : 0,
          }}
        />
      ))}
      <div className={styles.overlay} />

      <span className={styles.decNumber} aria-hidden="true">01</span>
      <div className={styles.content}>
        <p className={styles.label}>Research · AI · Intelligence</p>
        <h1 className={styles.headline} ref={wordRef}>
          {word.split('').map((char, i) => (
            <span key={i} className={`${styles.letter} letter`}>{char}</span>
          ))}
        </h1>
        <p className={styles.sub}>
          Investigación artificial.<br />
          Síntesis editorial.
        </p>
      </div>

      <div className={styles.scrollCue} aria-hidden="true">
        <span className={styles.scrollLine} />
        <span className={styles.scrollText}>scroll</span>
      </div>
    </section>
  );
}
