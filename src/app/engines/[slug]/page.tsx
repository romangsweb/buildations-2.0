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
,
  'revenue-intelligence': {
    flow: [
      ['01', 'ICP mapping', 'The engine starts with who actually buys. Industries are tiered by historical win rate — tier 1, tier 2, hidden gems. A lead from the right industry starts with a different score than one from the wrong one.'],
      ['02', 'Signal collection', 'Each deal is evaluated across 12 signals: industry fit, traffic source, ticket size, buying role of the contact, engagement depth, stage velocity, and pipeline history.'],
      ['03', 'Buying role detection', 'Talking to an end user without a decision maker is a leading indicator of loss. The engine detects who is in the room and adjusts the score accordingly.'],
      ['04', 'ML prediction', 'A Random Forest and Gradient Boosting ensemble trained on closed deals produces a 0-100 score with full attribution. Not a number. A diagnosis.'],
      ['05', 'RevOps sync', 'Scores write back to the CRM daily. Sales teams see updated signals in their existing workflow. No new dashboards, no new logins. The intelligence meets them where they work.'],
    ],
    stats: [
      ['12', 'Scoring signals'],
      ['7.6pts', 'Delta won vs lost deals'],
      ['Daily', 'Model refresh cycle'],
      ['0', 'New tools required'],
    ],
    capabilities: [
      ['ICP tier scoring', 'Industries are classified by win rate into tiers. The engine knows which verticals close and weights every deal from that industry accordingly.'],
      ['Buying role detection', 'Decision maker, influencer, or end user — the engine reads who is involved and penalizes patterns that historically lead to loss.'],
      ['Source attribution', 'Not all leads are equal. The model learns which acquisition channels produce deals that close, not just deals that start.'],
      ['Ticket size signals', 'Deal size is a proxy for seriousness and organizational fit. Enterprise deals from the right industry score higher regardless of stage.'],
      ['Explainable output', 'Every score comes with a breakdown: which signals are lifting it, which are dragging it down, and what the team should act on.'],
      ['LangGraph agent', 'A 7-node reasoning agent reads active deals, generates natural language summaries of risk and opportunity, and flags deals needing immediate attention.'],
    ],
    solves: 'RevOps is not a dashboard problem. It is a signal problem. Sales teams are sitting on the data that predicts who will buy — they just cannot see it. This engine surfaces those signals daily, in the tools the team already uses, before the opportunity closes.',
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
