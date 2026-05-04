import { MetadataRoute } from 'next'
import { getArticles, getEngines } from '@/lib/payload'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://buildations.com'

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
    { url: `${baseUrl}/engines`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/research`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
  ]

  // Dynamic engine pages
  let enginePages: MetadataRoute.Sitemap = []
  try {
    const engines = await getEngines()
    enginePages = engines.map((engine: any) => ({
      url: `${baseUrl}/engines/${engine.slug}`,
      lastModified: new Date(engine.updatedAt || new Date()),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }))
  } catch { /* fallback */ }

  // Dynamic research pages
  let researchPages: MetadataRoute.Sitemap = []
  try {
    const articles = await getArticles(100)
    researchPages = articles.map((article: any) => ({
      url: `${baseUrl}/research/${article.slug}`,
      lastModified: new Date(article.updatedAt || article.publishedAt || new Date()),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))
  } catch { /* fallback */ }

  return [...staticPages, ...enginePages, ...researchPages]
}
