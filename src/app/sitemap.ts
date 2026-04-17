import type { MetadataRoute } from 'next'
import { getArticles, getEngines, getCaseStudies, getFieldNotes, getLexiconTerms } from '@/lib/payload'
import { lexiconTerms as MOCK_LEXICON } from '@/lib/lexicon'

const BASE_URL = 'https://buildations.com'

const MOCK_FIELD_NOTE_SLUGS = [
  'temperatura-cero',
  'rag-no-es-magia',
  'n8n-como-lenguaje',
  'embeddings-son-opinion',
  'hallucination-como-feature',
  'agente-vs-pipeline',
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()

  // ─── Static pages ───────────────────────────────────────────
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL,                        lastModified: now, changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${BASE_URL}/research`,          lastModified: now, changeFrequency: 'daily',   priority: 0.9 },
    { url: `${BASE_URL}/engines`,           lastModified: now, changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${BASE_URL}/about`,             lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/contact`,           lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE_URL}/lexicon`,           lastModified: now, changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${BASE_URL}/stack`,             lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/field-notes`,       lastModified: now, changeFrequency: 'daily',   priority: 0.8 },
    { url: `${BASE_URL}/colophon`,          lastModified: now, changeFrequency: 'monthly', priority: 0.4 },
  ]

  // ─── Lexicon terms ──────────────────────────────────────────
  let lexiconPages: MetadataRoute.Sitemap = []
  try {
    const terms = await getLexiconTerms(200)
    const src = terms.length > 0 ? terms : MOCK_LEXICON
    lexiconPages = src.map((t: any) => ({
      url: `${BASE_URL}/lexicon/${t.id || t.slug}`,
      lastModified: t.updatedAt ? new Date(t.updatedAt) : now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))
  } catch { lexiconPages = MOCK_LEXICON.map(t => ({ url: `${BASE_URL}/lexicon/${t.id}`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.7 })) }

  // ─── Field notes ────────────────────────────────────────────
  let fieldNotePages: MetadataRoute.Sitemap = []
  try {
    const notes = await getFieldNotes(100)
    const src = notes.length > 0 ? notes : MOCK_FIELD_NOTE_SLUGS.map(s => ({ slug: s }))
    fieldNotePages = src.map((n: any) => ({
      url: `${BASE_URL}/field-notes/${n.slug}`,
      lastModified: n.updatedAt ? new Date(n.updatedAt) : now,
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    }))
  } catch { fieldNotePages = MOCK_FIELD_NOTE_SLUGS.map(s => ({ url: `${BASE_URL}/field-notes/${s}`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.6 })) }

  // ─── CMS articles ───────────────────────────────────────────
  let articlePages: MetadataRoute.Sitemap = []
  try {
    const articles = await getArticles(200)
    articlePages = (articles || []).map((a: any) => ({
      url: `${BASE_URL}/research/${a.slug}`,
      lastModified: a.updatedAt ? new Date(a.updatedAt) : now,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    }))
  } catch { /* CMS unavailable — skip */ }

  // ─── CMS case studies ────────────────────────────────────────
  let casePages: MetadataRoute.Sitemap = []
  try {
    const cases = await getCaseStudies(100)
    casePages = (cases || []).map((c: any) => ({
      url: `${BASE_URL}/research/cases/${c.slug}`,
      lastModified: c.updatedAt ? new Date(c.updatedAt) : now,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }))
  } catch { /* CMS unavailable — skip */ }

  // ─── CMS engines ─────────────────────────────────────────────
  let enginePages: MetadataRoute.Sitemap = []
  try {
    const engines = await getEngines()
    enginePages = (engines || []).map((e: any) => ({
      url: `${BASE_URL}/engines/${e.slug}`,
      lastModified: e.updatedAt ? new Date(e.updatedAt) : now,
      changeFrequency: 'monthly' as const,
      priority: 0.75,
    }))
  } catch { /* CMS unavailable — skip */ }

  return [
    ...staticPages,
    ...lexiconPages,
    ...fieldNotePages,
    ...articlePages,
    ...casePages,
    ...enginePages,
  ]
}
