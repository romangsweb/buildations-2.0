'use client'
import styles from './LatexRenderer.module.css'

interface Props {
  content: string
}

export default function LatexRenderer({ content }: Props) {
  const toHtml = (text: string) => {
    if (!text) return ''
    return text
      .split('\n\n')
      .map(para => {
        if (para.startsWith('## ')) return `<h2>${para.replace(/^## /, '')}</h2>`
        if (para.startsWith('# ')) return `<h1>${para.replace(/^# /, '')}</h1>`
        if (para.startsWith('- ') || para.startsWith('* ')) {
          const items = para.split('\n').map(l => `<li>${l.replace(/^[-*] /, '')}</li>`).join('')
          return `<ul>${items}</ul>`
        }
        return `<p>${para}</p>`
      })
      .join('')
  }

  return (
    <div
      className={styles.latex}
      dangerouslySetInnerHTML={{ __html: toHtml(content) }}
    />
  )
}
