import { getArticleBySlug } from '@/lib/payload'
import { notFound } from 'next/navigation'
import styles from './Article.module.css'

export const dynamic = 'force-dynamic'
export const dynamicParams = true

export async function generateStaticParams() {
  return []
}

const PAYLOAD_URL = process.env.NEXT_PUBLIC_PAYLOAD_URL || 'https://cms.buildations.com'

function renderContent(content: any) {
  if (!content?.root?.children) return null
  return content.root.children.map((block: any, i: number) => {
    const text = block.children?.map((c: any) => c.text || '').join('') || ''
    if (!text.trim()) return null
    if (block.type === 'paragraph') {
      if (text.startsWith('# ')) return <h1 key={i}>{text.slice(2)}</h1>
      if (text.startsWith('## ')) return <h2 key={i}>{text.slice(3)}</h2>
      if (text.startsWith('### ')) return <h3 key={i}>{text.slice(4)}</h3>
      return <p key={i}>{text}</p>
    }
    if (block.type === 'heading') {
      const Tag = `h${block.tag?.replace('h', '') || 2}` as any
      return <Tag key={i}>{text}</Tag>
    }
    return <p key={i}>{text}</p>
  })
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = await getArticleBySlug(slug)
  if (!article) notFound()

  const coverUrl = article.coverImage?.url
    ? article.coverImage.url.startsWith('http')
      ? article.coverImage.url
      : `${PAYLOAD_URL}${article.coverImage.url}`
    : null

  return (
    <div className={styles.article}>
      <div className={styles.header}>
        <div className={styles.container}>
          <div className={styles.meta}>
            <span>{article.publishedAt ? new Date(article.publishedAt).toISOString().split('T')[0] : ''}</span>
          </div>
          <h1 className={styles.title}>{article.title}</h1>
          {article.excerpt && <p className={styles.excerpt}>{article.excerpt}</p>}
        </div>
      </div>
      {coverUrl && (
        <img src={coverUrl} alt={article.title} className={styles.coverImage} />
      )}
      <div className={styles.content}>
        <div className={styles.containerText}>
          {renderContent(article.content)}
        </div>
      </div>
    </div>
  )
}
