'use client'
import { useState, useCallback } from 'react'
import styles from './SecurityPlayground.module.css'

/* ─── IP Threat Intelligence Engine ─── */

const SAMPLE_IPS = [
  '185.220.101.47',
  '92.118.160.12',
  '45.33.32.156',
  '198.51.100.23',
  '203.0.113.42',
]

const PROCESSING_STEPS = [
  'Resolving IP geolocation…',
  'Querying AbuseIPDB threat database…',
  'Cross-referencing with honeypot logs…',
  'Checking Cowrie + Suricata event streams…',
  'Mapping MITRE ATT&CK TTPs…',
  'Running LangGraph threat classifier…',
  'Generating forensic assessment…',
]

const COUNTRIES: Record<string, { name: string; flag: string }> = {
  DE: { name: 'Germany', flag: '🇩🇪' },
  RU: { name: 'Russia', flag: '🇷🇺' },
  US: { name: 'United States', flag: '🇺🇸' },
  CN: { name: 'China', flag: '🇨🇳' },
  BR: { name: 'Brazil', flag: '🇧🇷' },
  NL: { name: 'Netherlands', flag: '🇳🇱' },
  FR: { name: 'France', flag: '🇫🇷' },
  IN: { name: 'India', flag: '🇮🇳' },
  KR: { name: 'South Korea', flag: '🇰🇷' },
  GB: { name: 'United Kingdom', flag: '🇬🇧' },
  JP: { name: 'Japan', flag: '🇯🇵' },
  UA: { name: 'Ukraine', flag: '🇺🇦' },
  RO: { name: 'Romania', flag: '🇷🇴' },
  VN: { name: 'Vietnam', flag: '🇻🇳' },
}

const ISPS = [
  'Tor Exit Node — AS4242',
  'Selectel — AS49505',
  'Linode — AS63949',
  'DigitalOcean — AS14061',
  'OVH SAS — AS16276',
  'Hetzner — AS24940',
  'Alibaba Cloud — AS45102',
  'Amazon AWS — AS16509',
  'Google Cloud — AS15169',
  'Vultr — AS20473',
  'Contabo — AS40021',
]

const ATTACK_TYPES = [
  {
    type: 'SSH Brute Force',
    sources: 'Cowrie + Suricata',
    ttps: ['T1110.001 — Password guessing', 'T1021.004 — SSH remote services', 'T1078 — Valid accounts attempt'],
  },
  {
    type: 'Port Scanning',
    sources: 'Suricata + Tetragon',
    ttps: ['T1046 — Network service scanning', 'T1595 — Active scanning', 'T1590 — Gather victim network info'],
  },
  {
    type: 'Web Application Probe',
    sources: 'Beelzebub + Suricata',
    ttps: ['T1190 — Exploit public-facing app', 'T1059 — Command/scripting interpreter', 'T1083 — File and directory discovery'],
  },
  {
    type: 'API Abuse',
    sources: 'Beelzebub',
    ttps: ['T1190 — Exploit public-facing app', 'T1106 — Native API abuse', 'T1005 — Data from local system'],
  },
  {
    type: 'Credential Stuffing',
    sources: 'Cowrie + Beelzebub',
    ttps: ['T1110.004 — Credential stuffing', 'T1078 — Valid accounts attempt', 'T1110.001 — Password guessing'],
  },
]

interface ThreatResult {
  ip: string
  country: string
  flag: string
  isp: string
  abuseScore: number
  reports: number
  attackType: string
  sources: string
  attacks: number
  ttps: string[]
  action: string
  actionLabel: string
  actionColor: string
  threatLevel: string
  timeline: Array<{ t: string; event: string }>
}

function analyzeIP(ip: string): ThreatResult {
  // Deterministic but varied results based on IP
  const octets = ip.split('.').map(Number)
  const seed = octets.reduce((a, b) => a * 31 + b, 0)

  const countryKeys = Object.keys(COUNTRIES)
  const countryCode = countryKeys[Math.abs(seed) % countryKeys.length]
  const country = COUNTRIES[countryCode]
  const isp = ISPS[Math.abs(seed * 7) % ISPS.length]
  const attack = ATTACK_TYPES[Math.abs(seed * 3) % ATTACK_TYPES.length]

  // Generate abuse score — higher for certain patterns
  const isTor = isp.includes('Tor')
  const isHighRisk = ['RU', 'CN', 'UA', 'RO', 'VN'].includes(countryCode)
  let abuseScore = 20 + (Math.abs(seed * 13) % 40)
  if (isTor) abuseScore = Math.min(100, abuseScore + 40)
  if (isHighRisk) abuseScore = Math.min(100, abuseScore + 20)

  const reports = Math.round(abuseScore * (8 + (Math.abs(seed * 5) % 30)))
  const attacks = 3 + (Math.abs(seed * 11) % 35)

  // Determine action
  let action: string, actionLabel: string, actionColor: string, threatLevel: string
  if (abuseScore >= 80) {
    action = 'permanent_ban'
    actionLabel = 'Permanent ban'
    actionColor = '#FF2E2E'
    threatLevel = 'CRITICAL'
  } else if (abuseScore >= 50) {
    action = 'temp_ban'
    actionLabel = 'Temp ban — 24h'
    actionColor = '#F5E642'
    threatLevel = 'HIGH'
  } else if (abuseScore >= 30) {
    action = 'monitor'
    actionLabel = 'Monitor + rate limit'
    actionColor = '#2EFF6E'
    threatLevel = 'MEDIUM'
  } else {
    action = 'allow'
    actionLabel = 'Allow — low risk'
    actionColor = '#2EFF6E'
    threatLevel = 'LOW'
  }

  // Generate timeline
  const timeline = [
    { t: '00:00', event: `First ${attack.type.toLowerCase()} attempt detected by ${attack.sources.split('+')[0].trim()}` },
    { t: '00:01', event: `IP appears in ${attack.sources.split('+')[1]?.trim() || 'secondary'} alerts — multi-source trigger` },
    { t: '00:02', event: 'Multi-source correlator escalates to LangGraph agent' },
    { t: '00:03', event: `AbuseIPDB query — score ${abuseScore}/100, ${reports.toLocaleString()} reports` },
    { t: '00:03', event: `Geolocation: ${country.name} — ISP: ${isp.split('—')[0].trim()}` },
    { t: '00:04', event: `Threat classified: ${threatLevel}` },
    { t: '00:04', event: `${actionLabel} executed${abuseScore >= 80 ? ' — UFW + Fail2ban + Sentinel edge node' : abuseScore >= 50 ? ' — UFW block applied' : ' — iptables rate limit'}` },
    { t: '00:05', event: 'Forensic report generated — attack pattern embedded in Qdrant vector store' },
  ]

  return {
    ip,
    country: countryCode,
    flag: country.flag,
    isp,
    abuseScore,
    reports,
    attackType: attack.type,
    sources: attack.sources,
    attacks,
    ttps: attack.ttps,
    action,
    actionLabel,
    actionColor,
    threatLevel,
    timeline,
  }
}

function isValidIP(ip: string): boolean {
  const parts = ip.trim().split('.')
  if (parts.length !== 4) return false
  return parts.every(p => {
    const n = parseInt(p, 10)
    return !isNaN(n) && n >= 0 && n <= 255 && String(n) === p
  })
}

export default function SecurityPlayground() {
  const [ip, setIp] = useState('')
  const [result, setResult] = useState<ThreatResult | null>(null)
  const [processing, setProcessing] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [timelineStep, setTimelineStep] = useState(-1)
  const [simulating, setSimulating] = useState(false)

  const runEngine = useCallback(async () => {
    const target = ip.trim()
    if (!isValidIP(target)) return
    setProcessing(true)
    setResult(null)
    setTimelineStep(-1)
    setCurrentStep(0)

    for (let i = 0; i < PROCESSING_STEPS.length; i++) {
      await new Promise(r => setTimeout(r, 300 + Math.random() * 200))
      setCurrentStep(i)
    }

    await new Promise(r => setTimeout(r, 300))
    const analyzed = analyzeIP(target)
    setProcessing(false)
    setResult(analyzed)
  }, [ip])

  const runTimeline = useCallback(async () => {
    if (!result) return
    setTimelineStep(-1)
    setSimulating(true)
    for (let i = 0; i < result.timeline.length; i++) {
      await new Promise(r => setTimeout(r, 500))
      setTimelineStep(i)
    }
    setSimulating(false)
  }, [result])

  const useSample = () => {
    const sample = SAMPLE_IPS[Math.floor(Math.random() * SAMPLE_IPS.length)]
    setIp(sample)
  }

  const reset = () => {
    setResult(null)
    setProcessing(false)
    setTimelineStep(-1)
    setIp('')
  }

  return (
    <div className={styles.playground}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <span className={styles.engineTag}>
            <span className={styles.engineDot} />
            Adaptive Security
          </span>
          <h2 className={styles.playgroundTitle}>IP Threat Analyzer</h2>
        </div>
        {result && (
          <button className={styles.resetBtn} onClick={reset}>
            Reset ↻
          </button>
        )}
      </div>

      {/* Input */}
      <div className={styles.inputArea}>
        <div className={styles.fieldGroup}>
          <label className={styles.fieldLabel}>IP Address</label>
          <input
            type="text"
            className={styles.fieldInput}
            placeholder="e.g. 185.220.101.47"
            value={ip}
            onChange={e => setIp(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && isValidIP(ip) && !processing && runEngine()}
          />
        </div>
        <button className={styles.sampleBtn} onClick={useSample}>
          Sample IP
        </button>
        <button
          className={styles.runBtn}
          onClick={runEngine}
          disabled={!isValidIP(ip) || processing}
        >
          {processing ? 'Analyzing…' : 'Analyze threat →'}
        </button>
      </div>

      {/* Processing */}
      {processing && (
        <div className={styles.processing}>
          <div className={styles.processingSpinner} />
          <div className={styles.processingSteps}>
            {PROCESSING_STEPS.slice(0, currentStep + 1).map((step, i) => (
              <span
                key={i}
                className={styles.processingStep}
                style={{ animationDelay: `${i * 80}ms` }}
              >
                {step}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Results */}
      {result && !processing && (
        <div className={styles.resultsGrid}>
          <div className={styles.leftCol}>
            <div className={styles.card}>
              <p className={styles.cardLabel}>Threat actor</p>
              <div className={styles.ipRow}>
                <span className={styles.flag}>{result.flag}</span>
                <span className={styles.ip}>{result.ip}</span>
              </div>
              <p className={styles.isp}>{result.isp}</p>
            </div>

            <div className={styles.card}>
              <p className={styles.cardLabel}>AbuseIPDB</p>
              <div className={styles.scoreBar}>
                <div
                  className={styles.scoreBarFill}
                  style={{
                    width: `${result.abuseScore}%`,
                    background: result.abuseScore > 80 ? '#FF2E2E' : result.abuseScore > 50 ? '#F5E642' : '#2EFF6E',
                  }}
                />
              </div>
              <div className={styles.scoreRow}>
                <span className={styles.scoreNum}>{result.abuseScore}/100</span>
                <span className={styles.scoreReports}>{result.reports.toLocaleString()} reports</span>
              </div>
            </div>

            <div className={styles.card}>
              <p className={styles.cardLabel}>Detection sources</p>
              <p className={styles.sourceVal}>{result.sources}</p>
              <p className={styles.attackCount}>{result.attacks} attack events — {result.attackType}</p>
            </div>

            <div className={styles.card}>
              <p className={styles.cardLabel}>MITRE ATT&amp;CK</p>
              <div className={styles.ttps}>
                {result.ttps.map(t => (
                  <p key={t} className={styles.ttp}>{t}</p>
                ))}
              </div>
            </div>

            <div className={styles.card} style={{ borderLeft: `3px solid ${result.actionColor}` }}>
              <p className={styles.cardLabel}>Engine decision</p>
              <p className={styles.actionVal} style={{ color: result.actionColor }}>
                {result.actionLabel}
              </p>
            </div>
          </div>

          <div className={styles.rightCol}>
            <div className={styles.card}>
              <div className={styles.timelineHeader}>
                <p className={styles.cardLabel} style={{ marginBottom: 0 }}>Response timeline</p>
                <button
                  className={styles.timelineRunBtn}
                  onClick={simulating ? undefined : runTimeline}
                  disabled={simulating}
                >
                  {simulating ? 'Running…' : timelineStep >= 0 ? 'Run again' : 'Run simulation →'}
                </button>
              </div>
              <div className={styles.timeline}>
                {result.timeline.map((ev, i) => (
                  <div
                    key={i}
                    className={`${styles.timelineStep} ${i <= timelineStep ? styles.timelineActive : ''}`}
                  >
                    <div className={styles.timelineDot} />
                    <div className={styles.timelineContent}>
                      <span className={styles.timelineTime}>{ev.t}</span>
                      <span className={styles.timelineEvent}>{ev.event}</span>
                    </div>
                  </div>
                ))}
              </div>

              {timelineStep === result.timeline.length - 1 && (
                <div className={styles.resultCard} style={{ borderColor: result.actionColor }}>
                  <p className={styles.resultLabel}>
                    Resolved in {result.timeline[result.timeline.length - 1].t}
                  </p>
                  <p className={styles.resultAction} style={{ color: result.actionColor }}>
                    ● {result.actionLabel}
                  </p>
                  <p className={styles.resultSub}>Zero human intervention</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
