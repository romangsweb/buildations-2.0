import Link from 'next/link'
import { getArticles } from '@/lib/payload'
import styles from './Research.module.css'

const COLORS = ['#0A0A0A', '#1A3BFF', '#2EFF6E', '#F5E642', '#FF2E2E']

export default async function ResearchPage() {
  const articles = await getArticles(50)
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className={styles.container}>
          <h1 className={styles.title}>Research</h1>
          <p className={styles.subtitle}>
            Field notes from the build.
          </p>
        </div>
      </div>
      <div className={styles.list}>
        {articles.map((article: any, i: number) => (
          <Link
            key={article.slug}
            href={`/research/${article.slug}`}
            className={styles.card}
            style={{ background: COLORS[i % COLORS.length], color: COLORS[i % COLORS.length] === '#F5E642' || COLORS[i % COLORS.length] === '#2EFF6E' ? '#0A0A0A' : '#fff' }}
          >
            <div className={styles.cardInner}>
              <div className={styles.meta}>
                <span>{article.publishedAt ? new Date(article.publishedAt).toISOString().split('T')[0] : ''}</span>
              </div>
              <h2 className={styles.cardTitle}>{article.title}</h2>
              {article.excerpt && (
                <p className={styles.excerpt}>{article.excerpt.substring(0, 120)}...</p>
              )}
              <div className={styles.footer}>
                <span>Read Article →</span>
              </div>
            </div>
            <span className={styles.decNumber} aria-hidden="true">0{i + 1}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
