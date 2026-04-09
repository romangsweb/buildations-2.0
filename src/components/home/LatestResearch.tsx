'use client';

import Link from 'next/link';
import styles from '@/styles/LatestResearch.module.css';

const MOCK_POSTS = [
  {
    slug: 'the-new-primitives',
    title: 'The New Primitives: Prompting as a Design Tool',
    date: '2026-04-01',
    readTime: '5 min',
  },
  {
    slug: 'latent-spaces',
    title: 'Navigating Latent Spaces in Architectural Generation',
    date: '2026-03-15',
    readTime: '8 min',
  },
  {
    slug: 'synthetic-typography',
    title: 'Synthetic Typography and the Grotesk Revival',
    date: '2026-02-28',
    readTime: '4 min',
  },
];

export default function LatestResearch() {
  return (
    <section className={styles.research}>
      <div className={styles.header}>
        <p className={styles.label} data-reveal>Research</p>
        <Link href="/research" className={styles.viewAll} data-reveal>
          View All Index →
        </Link>
      </div>

      <div className={styles.grid}>
        {MOCK_POSTS.map((post, i) => (
          <Link href={`/research/${post.slug}`} key={post.slug} className={styles.card} data-reveal style={{ transitionDelay: `${i * 0.1}s` }}>
            <div className={styles.cardMeta}>
              <span>{post.date}</span>
              <span>{post.readTime}</span>
            </div>
            <h3 className={styles.cardTitle}>{post.title}</h3>
            <div className={styles.cardAction}>Read Article</div>
          </Link>
        ))}
      </div>
      <span className={styles.decNumber} aria-hidden="true">03</span>
    </section>
  );
}
