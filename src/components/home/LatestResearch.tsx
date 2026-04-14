import Link from 'next/link'
import { getArticles } from '@/lib/payload'
import styles from '@/styles/LatestResearch.module.css'

export default async function LatestResearch() {
  const articles = await getArticles(3)

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <span className={styles.number}>04</span>
        <span className={styles.label}>Research</span>
      </div>
      <div className={styles.grid}>
        {articles.map((article: any) => (
          <Link key={article.slug} href={`/research/${article.slug}`} className={styles.card}>
            <div className={styles.meta}>
              <span>{article.publishedAt ? new Date(article.publishedAt).toISOString().split('T')[0] : ''}</span>
              <span>{article.readTime || '5 min'}</span>
            </div>
            <h3 className={styles.title}>{article.title}</h3>
            <span className={styles.cta}>Read Article</span>
          </Link>
        ))}
      </div>
      <Link href="/research" className={styles.viewAll}>View All Index →</Link>
    </section>
  )
}
