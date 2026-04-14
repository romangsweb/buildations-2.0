import { getArticleBySlug } from '@/lib/payload'
import { notFound } from 'next/navigation'
import styles from './Article.module.css'

export const dynamic = 'force-dynamic'
export const dynamicParams = true

export async function generateStaticParams() {
  return []
}

const PAYLOAD_URL = process.env.NEXT_PUBLIC_PAYLOAD_URL || 'https://cms.buildations.com'

function renderInline(children: any[]): any {
  if (!children) return null
  return children.map((c: any, j: number) => {
    if (c.type === 'linebreak') return <br key={j} />
    let node: any = c.text || ''
    if (!node) return null
    if (c.format & 1) node = <strong key={j}>{node}</strong>
    else if (c.format & 2) node = <em key={j}>{node}</em>
    else if (c.format & 8) node = <u key={j}>{node}</u>
    else if (c.format & 16) node = <code key={j}>{node}</code>
    else node = <span key={j}>{node}</span>
    return node
  })
}

function renderContent(content: any) {
  if (!content?.root?.children) return null
  return content.root.children.map((block: any, i: number) => {
    if (block.type === 'heading') {
      const Tag = `h${block.tag?.replace('h', '') || 2}` as any
      return <Tag key={i}>{renderInline(block.children)}</Tag>
    }
    if (block.type === 'paragraph') {
      const hasContent = block.children?.some((c: any) => c.text?.trim())
      if (!hasContent) return null
      const firstText = block.children?.[0]?.text || ''
      if (firstText.startsWith('#### ')) return <h4 key={i}>{firstText.slice(5)}</h4>
      if (firstText.startsWith('### ')) return <h3 key={i}>{firstText.slice(4)}</h3>
      if (firstText.startsWith('## ')) return <h2 key={i}>{firstText.slice(3)}</h2>
      if (firstText.startsWith('# ')) return <h1 key={i}>{firstText.slice(2)}</h1>
      return <p key={i}>{renderInline(block.children)}</p>
    }
    if (block.type === 'list') {
      const Tag = block.listType === 'number' ? 'ol' : 'ul'
      return (
        <Tag key={i}>
          {block.children?.map((item: any, j: number) => (
            <li key={j}>{renderInline(item.children)}</li>
          ))}
        </Tag>
      )
    }
    return null
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
