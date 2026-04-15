'use client'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import styles from './LatexRenderer.module.css'

interface Props {
  content: string
}

function latexTableToHtml(match: string): string {
  const tabularMatch = match.match(/\\begin\{tabular\}[^}]*\}([\s\S]*?)\\end\{tabular\}/)
  if (!tabularMatch) return match
  const tableContent = tabularMatch[1]
  const rows = tableContent.split('\\\\').map(r => r.replace(/\\hline/g, '').trim()).filter(Boolean)
  const html = rows.map((row, i) => {
    const cells = row.split('&').map(c => c.trim()
      .replace(/\\textbf\{([^}]+)\}/g, '<strong>$1</strong>')
      .replace(/\\textit\{([^}]+)\}/g, '<em>$1</em>')
      .replace(/\\texttt\{([^}]+)\}/g, '<code>$1</code>')
    )
    const tag = i === 0 ? 'th' : 'td'
    return `<tr>${cells.map(c => `<${tag}>${c}</${tag}>`).join('')}</tr>`
  }).join('')
  return `<table class="latex-table">${html}</table>`
}

function renderSegment(text: string, key: number) {
  // Table
  if (text.includes('\\begin{table}')) {
    return <div key={key} className="latex-table-wrap" dangerouslySetInnerHTML={{ __html: latexTableToHtml(text) }} />
  }
  // Block math
  if (text.startsWith('$$') && text.endsWith('$$')) {
    try { return <BlockMath key={key} math={text.slice(2, -2).trim()} /> }
    catch { return <p key={key}>{text}</p> }
  }
  if (text.startsWith('\\begin{equation}')) {
    const math = text.replace(/\\begin\{equation\}/, '').replace(/\\end\{equation\}/, '').trim()
    try { return <BlockMath key={key} math={math} /> }
    catch { return <p key={key}>{text}</p> }
  }
  // Inline with mixed content
  const parts = text.split(/(\$[^\$\n]+?\$)/)
  const rendered = parts.map((part, i) => {
    if (part.startsWith('$') && part.endsWith('$')) {
      try { return <InlineMath key={i} math={part.slice(1, -1)} /> }
      catch { return <span key={i}>{part}</span> }
    }
    const html = part
      .replace(/\\textbf\{([^}]+)\}/g, '<strong>$1</strong>')
      .replace(/\\textit\{([^}]+)\}/g, '<em>$1</em>')
      .replace(/\\texttt\{([^}]+)\}/g, '<code>$1</code>')
      .replace(/\\emph\{([^}]+)\}/g, '<em>$1</em>')
    return <span key={i} dangerouslySetInnerHTML={{ __html: html }} />
  })
  return <span key={key}>{rendered}</span>
}

export default function LatexRenderer({ content }: Props) {
  if (!content) return null

  const segments: string[] = []
  let remaining = content

  // Extract tables first
  remaining = remaining.replace(/(\\begin\{table\}[\s\S]*?\\end\{table\})/g, (match) => {
    segments.push(match)
    return `\x00TABLE${segments.length - 1}\x00`
  })

  // Extract block math
  remaining = remaining.replace(/(\$\$[\s\S]+?\$\$)/g, (match) => {
    segments.push(match)
    return `\x00BLOCK${segments.length - 1}\x00`
  })
  remaining = remaining.replace(/(\\begin\{equation\}[\s\S]+?\\end\{equation\})/g, (match) => {
    segments.push(match)
    return `\x00BLOCK${segments.length - 1}\x00`
  })

  const paras = remaining.split('\n\n').map((para, i) => {
    if (para.includes('\x00')) {
      const parts = para.split(/(\x00(?:TABLE|BLOCK)\d+\x00)/)
      return (
        <div key={i}>
          {parts.map((part, j) => {
            const m = part.match(/\x00(?:TABLE|BLOCK)(\d+)\x00/)
            if (m) return renderSegment(segments[parseInt(m[1])], j)
            if (!part.trim()) return null
            return renderSegment(part, j)
          })}
        </div>
      )
    }
    if (para.startsWith('## ')) return <h2 key={i}>{para.replace(/^## /, '')}</h2>
    if (para.startsWith('# ')) return <h1 key={i}>{para.replace(/^# /, '')}</h1>
    return <p key={i}>{renderSegment(para, 0)}</p>
  })

  return <div className={styles.latex}>{paras}</div>
}
