import Link from 'next/link'
import { getArticles } from '@/lib/payload'
import styles from '@/styles/LatestResearch.module.css'

const CMS_URL = process.env.NEXT_PUBLIC_PAYLOAD_URL || 'https://cms.buildations.com'

export default async function LatestResearch() {
  const articles = await getArticles(3)

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <span className={styles.number}>04</span>
        <span className={styles.label}>Research</span>
      </div>
      <div className={styles.grid}>
        {articles.map((article: any) => {
          const coverUrl = article.coverImage?.url
            ? `${CMS_URL}${article.coverImage.url}`
            : null
          return (
            <Link key={article.slug} href={`/research/${article.slug}`} className={styles.card}>
              {coverUrl && (
                <img
                  src={coverUrl}
                  alt=""
                  className={styles.cardBg}
                  aria-hidden="true"
                />
              )}
              <div className={styles.cardContent}>
                <div className={styles.meta}>
                  <span>{article.publishedAt ? new Date(article.publishedAt).toISOString().split('T')[0] : ''}</span>
                  <span>{article.readTime || '5 min'}</span>
                </div>
                <h3 className={styles.title}>{article.title}</h3>
                <span className={styles.cta}>Read Article</span>
              </div>
            </Link>
          )
        })}
      </div>
      <Link href="/research" className={styles.viewAll}>View All Index →</Link>
    </section>
  )
}
