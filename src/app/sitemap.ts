import { MetadataRoute } from 'next'
import {
  getArticles,
  getEngines,
  getCaseStudies,
  getFieldNotes,
  getLexiconTerms,
} from '@/lib/payload'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://buildations.com'

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl,                        lastModified: new Date(), changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${baseUrl}/engines`,           lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${baseUrl}/research`,          lastModified: new Date(), changeFrequency: 'daily',   priority: 0.9 },
    { url: `${baseUrl}/field-notes`,       lastModified: new Date(), changeFrequency: 'daily',   priority: 0.8 },
    { url: `${baseUrl}/lexicon`,           lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.7 },
    { url: `${baseUrl}/stack`,             lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/about`,             lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/contact`,           lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/colophon`,          lastModified: new Date(), changeFrequency: 'monthly', priority: 0.4 },
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

  // Dynamic research/article pages
  let researchPages: MetadataRoute.Sitemap = []
  try {
    const articles = await getArticles(200)
    researchPages = articles.map((article: any) => ({
      url: `${baseUrl}/research/${article.slug}`,
      lastModified: new Date(article.updatedAt || article.publishedAt || new Date()),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))
  } catch { /* fallback */ }

  // Dynamic case study pages
  let casePages: MetadataRoute.Sitemap = []
  try {
    const cases = await getCaseStudies(100)
    casePages = cases.map((cs: any) => ({
      url: `${baseUrl}/research/cases/${cs.slug}`,
      lastModified: new Date(cs.updatedAt || cs.publishedAt || new Date()),
      changeFrequency: 'monthly' as const,
      priority: 0.75,
    }))
  } catch { /* fallback */ }

  // Dynamic field notes pages
  let fieldNotePages: MetadataRoute.Sitemap = []
  try {
    const notes = await getFieldNotes(200)
    fieldNotePages = notes.map((note: any) => ({
      url: `${baseUrl}/field-notes/${note.slug}`,
      lastModified: new Date(note.updatedAt || note.publishedAt || new Date()),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }))
  } catch { /* fallback */ }

  // Dynamic lexicon terms
  let lexiconPages: MetadataRoute.Sitemap = []
  try {
    const terms = await getLexiconTerms(500)
    lexiconPages = terms.map((term: any) => ({
      url: `${baseUrl}/lexicon/${term.id || term.slug}`,
      lastModified: new Date(term.updatedAt || new Date()),
      changeFrequency: 'monthly' as const,
      priority: 0.55,
    }))
  } catch { /* fallback */ }

  return [
    ...staticPages,
    ...enginePages,
    ...researchPages,
    ...casePages,
    ...fieldNotePages,
    ...lexiconPages,
  ]
}
