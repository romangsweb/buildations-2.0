'use client'
import { useEffect, useRef } from 'react'
import styles from './LatexRenderer.module.css'

interface Props {
  content: string
}

declare global {
  interface Window { katex: any }
}

function processLatexCommands(text: string): string {
  return text
    .replace(/\\textbf\{([^}]+)\}/g, '<strong>$1</strong>')
    .replace(/\\textit\{([^}]+)\}/g, '<em>$1</em>')
    .replace(/\\emph\{([^}]+)\}/g, '<em>$1</em>')
    .replace(/\\underline\{([^}]+)\}/g, '<u>$1</u>')
}

function latexTableToHtml(tableContent: string): string {
  try {
    const rows = tableContent.split('\\\\').map((r: string) => r.trim()).filter((r: string) => r && !r.match(/^\\hline$/))
    const html = rows.map((row: string, i: number) => {
      const cleanRow = row.replace(/\\hline/g, '').trim()
      if (!cleanRow) return ''
      const cells = cleanRow.split('&').map((c: string) => processLatexCommands(c.trim()))
      const tag = i === 0 ? 'th' : 'td'
      return '<tr>' + cells.map((c: string) => '<' + tag + '>' + c + '</' + tag + '>').join('') + '</tr>'
    }).filter(Boolean).join('')
    return '<div class="latex-table-wrap"><table class="latex-table">' + html + '</table></div>'
  } catch { return tableContent }
}

function processText(text: string, katex: any): string {
  let result = text
  result = result.replace(/\\begin\{equation\}([\s\S]+?)\\end\{equation\}/g, (_: string, math: string) => {
    try { return '<div class="katex-block">' + katex.renderToString(math.trim(), { displayMode: true, throwOnError: false }) + '</div>' }
    catch { return '<div class="katex-error">' + math + '</div>' }
  })
  result = result.replace(/\$\$([\s\S]+?)\$\$/g, (_: string, math: string) => {
    try { return '<div class="katex-block">' + katex.renderToString(math.trim(), { displayMode: true, throwOnError: false }) + '</div>' }
    catch { return '<div class="katex-error">' + math + '</div>' }
  })
  result = result.replace(/\$([^\$\n]+?)\$/g, (_: string, math: string) => {
    try { return katex.renderToString(math.trim(), { displayMode: false, throwOnError: false }) }
    catch { return '<span class="katex-error">' + math + '</span>' }
  })
  result = processLatexCommands(result)
  return result
}

function toHtml(text: string): string {
  if (!text) return ''
  return text.split('\n\n').map((para: string) => {
    if (para.startsWith('## ')) return '<h2>' + para.replace(/^## /, '') + '</h2>'
    if (para.startsWith('# ')) return '<h1>' + para.replace(/^# /, '') + '</h1>'
    if (para.startsWith('- ') || para.startsWith('* ')) {
      const items = para.split('\n').map((l: string) => '<li>' + l.replace(/^[-*] /, '') + '</li>').join('')
      return '<ul>' + items + '</ul>'
    }
    return '<p>' + para + '</p>'
  }).join('')
}

export default function LatexRenderer({ content }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!ref.current || !content) return
    const render = () => {
      if (!ref.current) return
      ref.current.innerHTML = processText(ref.current.innerHTML, window.katex)
    }
    if (window.katex) {
      render()
    } else {
      const script = document.createElement('script')
      script.src = 'https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js'
      script.onload = render
      document.head.appendChild(script)
    }
  }, [content])
  return (
    <div ref={ref} className={styles.latex}
      dangerouslySetInnerHTML={{ __html: toHtml(content) }} />
  )
}
// Wed Apr 15 07:33:07 CST 2026
