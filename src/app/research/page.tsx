'use client';

import { useState } from 'react';
import Link from 'next/link';
import { articles } from '@/lib/data';
import styles from './Research.module.css';

const categories = ['All', 'Design', 'Architecture', 'Typography', 'AI'];

export default function ResearchIndex() {
  const [filter, setFilter] = useState('All');

  const filtered = filter === 'All' 
    ? articles 
    : articles.filter(a => a.category === filter);

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.container}>
          <h1 className={styles.title} data-reveal>Research</h1>
          <p className={styles.subtitle} data-reveal>
            Ensayos, síntesis y notas sobre el impacto de la IA en la creatividad tecnológica.
          </p>

          <div className={styles.filters} data-reveal>
            {categories.map(c => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={`${styles.filterBtn} ${filter === c ? styles.activeFilter : ''}`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </header>

      <div className={styles.list}>
        {filtered.map((article, i) => (
          <article 
            key={article.slug} 
            className={styles.card} 
            style={{ backgroundColor: article.color, color: 'var(--white)' }}
            data-reveal
          >
            <div className={styles.cardInner}>
              <div className={styles.meta}>
                <span>{article.category}</span>
                <span>{article.readTime}</span>
              </div>
              <h2 className={styles.cardTitle}>
                <Link href={`/research/${article.slug}`}>{article.title}</Link>
              </h2>
              <p className={styles.excerpt}>{article.excerpt}</p>
              <div className={styles.footer}>
                <span>{article.date}</span>
                <span>Read →</span>
              </div>
            </div>
            {/* Dec number */}
            <span className={styles.decNumber}>0{i + 1}</span>
          </article>
        ))}
      </div>
    </div>
  );
}
