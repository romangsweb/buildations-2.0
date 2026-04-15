import { NextRequest, NextResponse } from 'next/server'

const PAYLOAD_URL = process.env.NEXT_PUBLIC_PAYLOAD_URL || 'https://cms.buildations.com'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const q = searchParams.get('q')?.toLowerCase().trim() || ''

  try {
    // Fetch all published articles
    const res = await fetch(
      `${PAYLOAD_URL}/api/articles?limit=100&where[status][equals]=published`,
      { cache: 'no-store' }
    )
    if (!res.ok) return NextResponse.json({ results: [] })
    const data = await res.json()
    const articles = data.docs || []

    if (!q) {
      // Return recent articles when no query (suggested state)
      return NextResponse.json({
        results: articles.slice(0, 6).map((a: any) => ({
          slug: a.slug,
          title: a.title,
          excerpt: a.excerpt || '',
          category: a.category || '',
          publishedAt: a.publishedAt || '',
          readTime: a.readTime || '',
          type: 'article',
        })),
        total: articles.length,
        suggested: true,
      })
    }

    // Score-based fuzzy search
    const scored = articles
      .map((a: any) => {
        const title = (a.title || '').toLowerCase()
        const excerpt = (a.excerpt || '').toLowerCase()
        const category = (a.category || '').toLowerCase()
        const tags = (a.tags || []).join(' ').toLowerCase()

        let score = 0
        if (title.startsWith(q)) score += 100
        if (title.includes(q)) score += 60
        if (category.includes(q)) score += 40
        if (excerpt.includes(q)) score += 20
        if (tags.includes(q)) score += 15

        // Word-level matching
        const words = q.split(' ').filter(Boolean)
        for (const word of words) {
          if (title.includes(word)) score += 10
          if (excerpt.includes(word)) score += 4
        }

        return { article: a, score }
      })
      .filter(({ score }: { score: number }) => score > 0)
      .sort((a: any, b: any) => b.score - a.score)
      .slice(0, 8)
      .map(({ article }: { article: any }) => ({
        slug: article.slug,
        title: article.title,
        excerpt: article.excerpt || '',
        category: article.category || '',
        publishedAt: article.publishedAt || '',
        readTime: article.readTime || '',
        type: 'article',
      }))

    return NextResponse.json({ results: scored, total: scored.length, suggested: false })
  } catch {
    return NextResponse.json({ results: [], total: 0, suggested: false })
  }
}
