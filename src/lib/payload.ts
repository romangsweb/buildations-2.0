const PAYLOAD_URL = process.env.NEXT_PUBLIC_PAYLOAD_URL || 'https://cms.buildations.com'

export async function getArticles(limit = 10) {
  const res = await fetch(`${PAYLOAD_URL}/api/articles?limit=${limit}&where[status][equals]=published`, {
    next: { revalidate: 0 }
  })
  if (!res.ok) return []
  const data = await res.json()
  return data.docs
}

export async function getArticleBySlug(slug: string) {
  const res = await fetch(`${PAYLOAD_URL}/api/articles?where[slug][equals]=${slug}&where[status][equals]=published`, {
    next: { revalidate: 0 }
  })
  if (!res.ok) return null
  const data = await res.json()
  return data.docs[0] || null
}

export async function getEngines() {
  const res = await fetch(`${PAYLOAD_URL}/api/engines?where[active][equals]=true&sort=order`, {
    next: { revalidate: 0 }
  })
  if (!res.ok) return []
  const data = await res.json()
  return data.docs
}

export async function getActiveImages(season?: string) {
  const seasonFilter = season ? `&where[season][equals]=${season}` : ''
  const res = await fetch(`${PAYLOAD_URL}/api/generated-images?where[active][equals]=true${seasonFilter}`, {
    next: { revalidate: 0 }
  })
  if (!res.ok) return []
  const data = await res.json()
  return data.docs
}
