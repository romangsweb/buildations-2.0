import { notFound } from 'next/navigation'
import { getEngineBySlug } from '@/lib/payload'
import styles from './EnginePage.module.css'

type Props = {
  params: Promise<{ slug: string }>
}

export const dynamic = 'force-dynamic'
export const dynamicParams = true

export async function generateStaticParams() {
  return []
}

const ENGINE_IMAGES: Record<string, string> = {
  'revenue-intelligence': 'https://cms.buildations.com/api/media/file/engine-1776179832.png',
  'search-presence': 'https://cms.buildations.com/api/media/file/engine-1776180600.png',
  'adaptive-security': 'https://cms.buildations.com/api/media/file/engine-1776180988.png',
}

const ENGINE_DATA = {
  'adaptive-security': {
    flow: [
      ['01', 'Ingestion', '9 monitoring sources — Cowrie, Suricata, Beelzebub, Tetragon eBPF, Sentinel edge node, and four more — feed a unified event stream.'],
      ['02', 'Correlation', 'A multi-source correlator cross-references IPs across all sources within 10-minute windows. An IP appearing in two or more sources triggers automatic escalation.'],
      ['03', 'Reasoning', 'A LangGraph agent enriches each threat via AbuseIPDB and geolocation, then reasons on attack patterns and assigns a threat level.'],
      ['04', 'Action', 'The engine acts without human input — temporary ban, permanent ban, or range block — and executes via UFW and Fail2ban on both local and edge nodes.'],
      ['05', 'Memory', 'Every ban generates a forensic report with MITRE ATT&CK TTP mapping, ISP, country, and attack vector. Stored in PostgreSQL and indexed in Qdrant for semantic search.'],
    ],
    stats: [
      ['1.4M+', 'Attack events processed'],
      ['9', 'Monitoring sources'],
      ['0', 'Human interventions required'],
      ['24 / 7', 'Autonomous operation'],
    ],
    capabilities: [
      ['Adaptive thresholds', 'Auto-tightens ban criteria under sustained attack. The engine learns from volume, not just individual events.'],
      ['AI honeypot', 'Beelzebub generates LLM-based trap responses that keep attackers engaged while profiling their techniques.'],
      ['Edge node', 'Sentinel — a Hetzner server in Germany — extends coverage to a second geographic perimeter, syncing logs over Tailscale.'],
      ['MITRE ATT&CK', 'Every attack is automatically classified against the MITRE framework. No analyst required.'],
      ['Forensic reports', 'Post-ban reports include geolocation, ISP, previous attack history, and full TTP breakdown, delivered via Telegram.'],
      ['Vector memory', 'Attack patterns are embedded and stored in Qdrant. Semantic search finds similar historical attacks in milliseconds.'],
    ],
    solves: 'Most security systems react. This one learns. The difference is not speed — it is that every attack makes the next defense stronger. No alert fatigue. No missed patterns. No manual triage.',
  }
} as const

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const engine = await getEngineBySlug(slug)
  return {
    title: engine ? `${engine.name} | Engine` : 'Engine Not Found',
  }
}

export default async function EnginePage({ params }: Props) {
  const { slug } = await params
  const engine = await getEngineBySlug(slug)
  if (!engine) notFound()

  const colorMap: Record<string, string> = {
    yellow: '#F5E642', blue: '#1A3BFF', green: '#2EFF6E', red: '#FF2E2E'
  }
  const bgColor = colorMap[engine.color] || '#0A0A0A'
  const isDark = bgColor === '#0A0A0A' || bgColor === '#1A3BFF' || bgColor === '#FF2E2E'
  const textColor = isDark ? 'var(--white)' : 'var(--black)'
  const order = String(engine.order || 1).padStart(2, '0')
  const data = ENGINE_DATA[engine.slug as keyof typeof ENGINE_DATA]

  return (
    <div className={styles.page}>
      <section className={styles.hero} style={{
        backgroundColor: bgColor,
        color: textColor,
        ...(ENGINE_IMAGES[engine.slug] ? {
          backgroundImage: `linear-gradient(${bgColor}e6, ${bgColor}e6), url(${ENGINE_IMAGES[engine.slug]})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        } : {})
      }}>
        <div className={styles.container}>
          <p className={styles.label}>Core Engine // {order}</p>
          <h1 className={styles.title}>{engine.name}</h1>
          <p className={styles.abstract}>{engine.tagline}</p>
          {engine.description && (
            <p className={styles.text} style={{ marginTop: '2rem', maxWidth: '640px' }}>
              {engine.description}
            </p>
          )}
        </div>
        <span className={styles.decNumber}>{order}</span>
      </section>

      {data && (
        <>
          <section className={styles.flowSection}>
            <div className={styles.flowContainer}>
              <p className={styles.sectionLabel}>How it works</p>
              <div className={styles.flowList}>
                {data.flow.map(([num, title, text]) => (
                  <div key={num} className={styles.flowStep}>
                    <span className={styles.flowNum}>{num}</span>
                    <div className={styles.flowContent}>
                      <h3 className={styles.flowTitle}>{title}</h3>
                      <p className={styles.flowText}>{text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className={styles.statsSection} style={{ backgroundColor: bgColor, color: textColor }}>
            <div className={styles.statsGrid}>
              {data.stats.map(([num, label]) => (
                <div key={label} className={styles.statBlock} style={{ borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)' }}>
                  <div className={styles.statNum}>{num}</div>
                  <div className={styles.statLabel}>{label}</div>
                </div>
              ))}
            </div>
          </section>

          <section className={styles.capabilitiesSection}>
            <div className={styles.capabilitiesContainer}>
              <p className={styles.sectionLabel} style={{ color: 'var(--black)' }}>Capabilities</p>
              <div className={styles.capabilitiesGrid}>
                {data.capabilities.map(([title, text]) => (
                  <div key={title} className={styles.capabilityItem}>
                    <h3 className={styles.capabilityTitle}>{title}</h3>
                    <p className={styles.capabilityText}>{text}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className={styles.solvesSection}>
            <div className={styles.solvesContainer}>
              <p className={styles.sectionLabel} style={{ color: 'rgba(255,255,255,0.4)' }}>What it solves</p>
              <p className={styles.solvesText}>{data.solves}</p>
            </div>
          </section>
        </>
      )}
    </div>
  )
}
