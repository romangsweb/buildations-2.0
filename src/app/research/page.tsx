import Link from 'next/link'
import { getArticles } from '@/lib/payload'
import styles from './Research.module.css'

export default async function ResearchPage() {
  const articles = await getArticles(50)

  return (
    <main className={styles.main}>
      <div className={styles.header}>
        <h1 className={styles.title}>Research</h1>
      </div>
      <div className={styles.list}>
        {articles.map((article: any) => (
          <Link key={article.slug} href={`/research/${article.slug}`} className={styles.item}>
            <div className={styles.meta}>
              <span>{article.publishedAt ? new Date(article.publishedAt).toISOString().split('T')[0] : ''}</span>
              <span>{article.excerpt || ''}</span>
            </div>
            <h2 className={styles.articleTitle}>{article.title}</h2>
          </Link>
        ))}
      </div>
    </main>
  )
}
