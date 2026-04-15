const PAYLOAD_URL = process.env.NEXT_PUBLIC_PAYLOAD_URL || 'https://cms.buildations.com'

export async function getArticles(limit = 10) {
  const res = await fetch(`${PAYLOAD_URL}/api/articles?limit=${limit}&where[status][equals]=published`, {
    cache: 'no-store'
  })
  if (!res.ok) return []
  const data = await res.json()
  return data.docs
}

export async function getArticleBySlug(slug: string) {
  try {
    const res = await fetch(`${PAYLOAD_URL}/api/articles?where[slug][equals]=${slug}&where[status][equals]=published`, {
      cache: 'no-store',
      next: { revalidate: 0 }
    })
    if (!res.ok) return null
    const data = await res.json()
    return data.docs?.[0] || null
  } catch {
    return null
  }
}

export async function getEngines() {
  const res = await fetch(`${PAYLOAD_URL}/api/engines?where[active][equals]=true&sort=order&depth=1`, {
    cache: 'no-store'
  })
  if (!res.ok) return []
  const data = await res.json()
  return data.docs
}

export async function getActiveImages(season?: string) {
  const seasonFilter = season ? `&where[season][equals]=${season}` : ''
  const res = await fetch(`${PAYLOAD_URL}/api/generated-images?where[active][equals]=true${seasonFilter}`, {
    cache: 'no-store'
  })
  if (!res.ok) return []
  const data = await res.json()
  return data.docs
}

export async function getEngineBySlug(slug: string) {
  const res = await fetch(`${PAYLOAD_URL}/api/engines?where[slug][equals]=${slug}&where[active][equals]=true&depth=1`, {
    cache: 'no-store'
  })
  if (!res.ok) return null
  const data = await res.json()
  return data.docs[0] || null
}

export async function getCaseStudies(limit = 20) {
  try {
    const res = await fetch(`${PAYLOAD_URL}/api/case-studies?limit=${limit}&where[status][equals]=published&sort=-createdAt`, {
      cache: 'no-store'
    })
    if (!res.ok) return []
    const data = await res.json()
    return data.docs || []
  } catch {
    return []
  }
}

export async function getCaseStudyBySlug(slug: string) {
  const res = await fetch(`${PAYLOAD_URL}/api/case-studies?where[slug][equals]=${slug}&where[status][equals]=published&depth=1`, {
    cache: 'no-store'
  })
  if (!res.ok) return null
  const data = await res.json()
  return data.docs[0] || null
}

export async function getCaseStudiesByEngine(engine: string, limit = 6) {
  const res = await fetch(`${PAYLOAD_URL}/api/case-studies?where[engine][equals]=${engine}&where[status][equals]=published&limit=${limit}&sort=-publishedAt`, {
    cache: 'no-store'
  })
  if (!res.ok) return []
  const data = await res.json()
  return data.docs
}
