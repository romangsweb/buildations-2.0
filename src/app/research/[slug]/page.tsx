import { getArticleBySlug, getArticles } from '@/lib/payload'
import { notFound } from 'next/navigation'
import styles from './Article.module.css'

export const dynamic = 'force-dynamic'
export const dynamicParams = true

export async function generateStaticParams() {
  return []
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = await getArticleBySlug(slug)
  if (!article) notFound()

  return (
    <main className={styles.main}>
      <div className={styles.header}>
        <span className={styles.date}>
          {article.publishedAt ? new Date(article.publishedAt).toISOString().split('T')[0] : ''}
        </span>
        <h1 className={styles.title}>{article.title}</h1>
        {article.excerpt && <p className={styles.excerpt}>{article.excerpt}</p>}
      </div>
      <div className={styles.content}>
        {article.content?.root?.children?.map((block: any, i: number) => {
          if (block.type === 'paragraph') {
            const text = block.children?.map((c: any) => c.text).join('') || ''
            return text ? <p key={i}>{text}</p> : null
          }
          if (block.type === 'heading') {
            const text = block.children?.map((c: any) => c.text).join('') || ''
            const Tag = `h${block.tag?.replace('h', '') || 2}` as any
            return <Tag key={i}>{text}</Tag>
          }
          return null
        })}
      </div>
    </main>
  )
}
