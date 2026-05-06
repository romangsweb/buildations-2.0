import { NextRequest, NextResponse } from 'next/server'

const PAYLOAD_URL = process.env.NEXT_PUBLIC_PAYLOAD_URL || 'https://cms.buildations.com'

async function fetchCollection(endpoint: string) {
  try {
    const res = await fetch(`${PAYLOAD_URL}${endpoint}`, { cache: 'no-store' })
    if (!res.ok) return []
    const data = await res.json()
    return data.docs || []
  } catch {
    return []
  }
}

function scoreItem(item: any, q: string, fields: string[]): number {
  let score = 0
  for (const field of fields) {
    const val = (item[field] || '').toLowerCase()
    if (val.startsWith(q)) score += 100
    if (val.includes(q)) score += 60
    for (const word of q.split(' ').filter(Boolean)) {
      if (val.includes(word)) score += 10
    }
  }
  return score
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const q = searchParams.get('q')?.toLowerCase().trim() || ''

  const [articles, cases, notes, terms] = await Promise.all([
    fetchCollection('/api/articles?limit=100&where[status][equals]=published'),
    fetchCollection('/api/case-studies?limit=100&where[status][equals]=published'),
    fetchCollection('/api/field-notes?limit=100&where[status][equals]=published'),
    fetchCollection('/api/lexicon-terms?limit=200&where[status][equals]=published'),
  ])

  if (!q) {
    const suggested = [
      ...articles.slice(0, 3).map((a: any) => ({ slug: a.slug, title: a.title, excerpt: a.excerpt || '', type: 'article', url: `/research/${a.slug}` })),
      ...cases.slice(0, 2).map((c: any) => ({ slug: c.slug, title: c.title, excerpt: c.summary || '', type: 'case-study', url: `/research/cases/${c.slug}` })),
      ...notes.slice(0, 2).map((n: any) => ({ slug: n.slug, title: n.title, excerpt: n.excerpt || '', type: 'field-note', url: `/field-notes/${n.slug}` })),
    ]
    return NextResponse.json({ results: suggested, total: suggested.length, suggested: true })
  }

  const scored = [
    ...articles.map((a: any) => ({ item: a, score: scoreItem(a, q, ['title', 'excerpt', 'category']), type: 'article', url: `/research/${a.slug}` })),
    ...cases.map((c: any) => ({ item: c, score: scoreItem(c, q, ['title', 'summary', 'engine', 'industry']), type: 'case-study', url: `/research/cases/${c.slug}` })),
    ...notes.map((n: any) => ({ item: n, score: scoreItem(n, q, ['title', 'excerpt']), type: 'field-note', url: `/field-notes/${n.slug}` })),
    ...terms.map((t: any) => ({ item: t, score: scoreItem(t, q, ['term', 'definition']), type: 'lexicon', url: `/lexicon/${t.slug}` })),
  ]
  .filter(({ score }) => score > 0)
  .sort((a, b) => b.score - a.score)
  .slice(0, 10)
  .map(({ item, type, url }) => ({
    slug: item.slug,
    title: item.title || item.term,
    excerpt: item.excerpt || item.summary || item.definition || '',
    type,
    url,
    engine: item.engine || item.relatedEngine || '',
    coverImage: item.coverImage?.url ? `${process.env.NEXT_PUBLIC_PAYLOAD_URL || 'https://cms.buildations.com'}${item.coverImage.url}` : undefined,
  }))

  return NextResponse.json({ results: scored, total: scored.length, suggested: false })
}
