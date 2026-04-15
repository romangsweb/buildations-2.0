'use client';
import { useEffect, useRef, useState } from 'react';
import styles from '@/styles/Hero.module.css';

export default function HeroClient({ images }: { images: string[] }) {
  const wordRef = useRef<HTMLHeadingElement>(null);
  const [current, setCurrent] = useState(0);
  const [filled, setFilled] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setFilled(true), 800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(c => (c + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  const word = 'BUILDATIONS';

  return (
    <section className={styles.hero}>
      {images.map((src, i) => (
        <div
          key={i}
          className={styles.bgImage}
          style={{ backgroundImage: `url(${src})`, opacity: current === i ? 1 : 0 }}
        />
      ))}
      <div className={styles.overlay} />
      <span className={styles.decNumber} aria-hidden="true">01</span>
      <div className={styles.content}>
        <p className={styles.label}>Research · AI · Intelligence</p>
        <h1 className={styles.headline}>
          <span className={styles.wordWrap}>
            <span className={styles.wordBase}>{word}</span>
            <span
              className={styles.wordFill}
              style={{ clipPath: filled ? 'inset(0% 0% 0% 0%)' : 'inset(100% 0% 0% 0%)' }}
            >
              {word}
            </span>
          </span>
        </h1>
        <p className={styles.sub}>
          Investigación artificial.<br />
          Síntesis editorial.
        </p>
        <div className={styles.ctas}>
          <a href="/engines" className={styles.ctaPrimary}>Explore engines →</a>
          <a href="/contact" className={styles.ctaSecondary}>Work with us</a>
        </div>
      </div>
      <div className={styles.scrollCue} aria-hidden="true">
        <span className={styles.scrollLine} />
        <span className={styles.scrollText}>scroll</span>
      </div>
    </section>
  );
}
