'use client'
import { useState } from 'react'
import styles from './SecuritySimulator.module.css'

const SCENARIOS = [
  {
    id: 'brute',
    label: 'SSH Brute Force',
    ip: '185.220.101.47',
    country: 'DE',
    flag: '🇩🇪',
    isp: 'Tor Exit Node — AS4242',
    abuseScore: 97,
    reports: 1842,
    source: 'Cowrie + Suricata',
    attacks: 23,
    ttps: ['T1110.001 — Password guessing', 'T1021.004 — SSH remote services', 'T1078 — Valid accounts attempt'],
    action: 'permanent_ban',
    actionLabel: 'Permanent ban',
    actionColor: '#FF2E2E',
    timeline: [
      { t: '00:00', event: 'First SSH attempt detected by Cowrie' },
      { t: '00:03', event: 'IP appears in Suricata alerts — 2nd source trigger' },
      { t: '00:03', event: 'Multi-source correlator escalates to LangGraph agent' },
      { t: '00:04', event: 'AbuseIPDB query — score 97/100, 1842 reports' },
      { t: '00:04', event: 'Threat classified: CRITICAL' },
      { t: '00:05', event: 'Permanent ban executed — UFW + Fail2ban + Sentinel edge node' },
      { t: '00:05', event: 'Forensic report generated — Telegram notification sent' },
    ]
  },
  {
    id: 'scan',
    label: 'Port Scanner',
    ip: '92.118.160.12',
    country: 'RU',
    flag: '🇷🇺',
    isp: 'Selectel — AS49505',
    abuseScore: 61,
    reports: 312,
    source: 'Suricata + Tetragon',
    attacks: 8,
    ttps: ['T1046 — Network service scanning', 'T1595 — Active scanning', 'T1590 — Gather victim network info'],
    action: 'temp_ban',
    actionLabel: 'Temp ban — 24h',
    actionColor: '#F5E642',
    timeline: [
      { t: '00:00', event: 'Port scan detected by Suricata IDS rule' },
      { t: '00:01', event: 'Tetragon eBPF flags unusual syscall pattern' },
      { t: '00:01', event: 'Multi-source correlator — 2 sources, escalation triggered' },
      { t: '00:02', event: 'AbuseIPDB query — score 61/100, 312 reports' },
      { t: '00:03', event: 'Threat classified: HIGH' },
      { t: '00:03', event: '24h temp ban executed — UFW block applied' },
      { t: '00:04', event: 'Forensic report generated — Telegram notification sent' },
    ]
  },
  {
    id: 'honeypot',
    label: 'AI Honeypot Probe',
    ip: '45.33.32.156',
    country: 'US',
    flag: '🇺🇸',
    isp: 'Linode — AS63949',
    abuseScore: 43,
    reports: 89,
    source: 'Beelzebub',
    attacks: 5,
    ttps: ['T1190 — Exploit public-facing application', 'T1059 — Command and scripting interpreter', 'T1083 — File and directory discovery'],
    action: 'monitor',
    actionLabel: 'Monitor + rate limit',
    actionColor: '#2EFF6E',
    timeline: [
      { t: '00:00', event: 'Beelzebub AI honeypot receives LLM API probe' },
      { t: '00:01', event: 'Attacker engages with fake Ollama endpoint' },
      { t: '00:02', event: 'LangGraph agent profiles attack technique' },
      { t: '00:03', event: 'AbuseIPDB query — score 43/100, 89 reports' },
      { t: '00:04', event: 'Threat classified: MEDIUM — single source' },
      { t: '00:05', event: 'Rate limit applied — attacker kept engaged for profiling' },
      { t: '00:06', event: 'Attack pattern embedded in Qdrant vector store' },
    ]
  }
]

export default function SecuritySimulator() {
  const [active, setActive] = useState(0)
  const [step, setStep] = useState(-1)
  const [running, setRunning] = useState(false)
  const s = SCENARIOS[active]

  const runSimulation = async () => {
    setStep(-1)
    setRunning(true)
    for (let i = 0; i < s.timeline.length; i++) {
      await new Promise(r => setTimeout(r, 600))
      setStep(i)
    }
    setRunning(false)
  }

  const reset = () => { setStep(-1); setRunning(false) }

  return (
    <div className={styles.simulator}>
      <div className={styles.tabs}>
        {SCENARIOS.map((sc, i) => (
          <button key={sc.id} className={`${styles.tab} ${active === i ? styles.tabActive : ''}`}
            onClick={() => { setActive(i); reset() }}>
            {sc.label}
          </button>
        ))}
      </div>

      <div className={styles.grid}>
        <div className={styles.left}>
          <div className={styles.card}>
            <p className={styles.cardLabel}>Threat actor</p>
            <div className={styles.ipRow}>
              <span className={styles.flag}>{s.flag}</span>
              <span className={styles.ip}>{s.ip}</span>
            </div>
            <p className={styles.isp}>{s.isp}</p>
          </div>

          <div className={styles.card}>
            <p className={styles.cardLabel}>AbuseIPDB</p>
            <div className={styles.scoreBar}>
              <div className={styles.scoreBarFill} style={{ width: `${s.abuseScore}%`, background: s.abuseScore > 80 ? '#FF2E2E' : s.abuseScore > 50 ? '#F5E642' : '#2EFF6E' }} />
            </div>
            <div className={styles.scoreRow}>
              <span className={styles.scoreNum}>{s.abuseScore}/100</span>
              <span className={styles.scoreReports}>{s.reports.toLocaleString()} reports</span>
            </div>
          </div>

          <div className={styles.card}>
            <p className={styles.cardLabel}>Detection sources</p>
            <p className={styles.sourceVal}>{s.source}</p>
            <p className={styles.attackCount}>{s.attacks} attack events</p>
          </div>

          <div className={styles.card}>
            <p className={styles.cardLabel}>MITRE ATT&CK</p>
            <div className={styles.ttps}>
              {s.ttps.map(t => <p key={t} className={styles.ttp}>{t}</p>)}
            </div>
          </div>

          <div className={styles.card} style={{ borderLeft: `3px solid ${s.actionColor}` }}>
            <p className={styles.cardLabel}>Engine decision</p>
            <p className={styles.actionVal} style={{ color: s.actionColor }}>{s.actionLabel}</p>
          </div>
        </div>

        <div className={styles.right}>
          <div className={styles.timelineHeader}>
            <p className={styles.cardLabel}>Response timeline</p>
            <button className={styles.runBtn} onClick={running ? undefined : runSimulation} disabled={running}>
              {running ? 'Running...' : step >= 0 ? 'Run again' : 'Run simulation →'}
            </button>
          </div>
          <div className={styles.timeline}>
            {s.timeline.map((ev, i) => (
              <div key={i} className={`${styles.timelineStep} ${i <= step ? styles.timelineActive : ''}`}>
                <div className={styles.timelineDot} />
                <div className={styles.timelineContent}>
                  <span className={styles.timelineTime}>{ev.t}</span>
                  <span className={styles.timelineEvent}>{ev.event}</span>
                </div>
              </div>
            ))}
          </div>
          {step === s.timeline.length - 1 && (
            <div className={styles.result} style={{ borderColor: s.actionColor }}>
              <p className={styles.resultLabel}>Resolved in {s.timeline[s.timeline.length-1].t}</p>
              <p className={styles.resultAction} style={{ color: s.actionColor }}>● {s.actionLabel}</p>
              <p className={styles.resultSub}>Zero human intervention</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
