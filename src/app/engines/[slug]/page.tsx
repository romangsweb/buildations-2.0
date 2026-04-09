import { notFound } from 'next/navigation';
import { engines } from '@/lib/data';
import styles from './EnginePage.module.css';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const engine = engines.find(e => e.slug === slug);
  return {
    title: engine ? `${engine.name} | Engine` : 'Engine Not Found',
  };
}

export default async function EnginePage({ params }: Props) {
  const { slug } = await params;
  const engine = engines.find(e => e.slug === slug);

  if (!engine) notFound();

  // Determine text color based on background
  const isDark = engine.color === '#0A0A0A' || engine.color === '#1A3BFF';
  const textColor = isDark ? 'var(--white)' : 'var(--black)';

  return (
    <div className={styles.page}>
      {/* Hero Block */}
      <section className={styles.hero} style={{ backgroundColor: engine.color, color: textColor }}>
        <div className={styles.container}>
          <p className={styles.label} data-reveal>Core Engine // {engine.number}</p>
          <h1 className={styles.title} data-reveal>{engine.name}</h1>
          <p className={styles.abstract} data-reveal>{engine.description}</p>
        </div>
        <span className={styles.decNumber}>{engine.number}</span>
      </section>

      {/* SEO Engine Specific Detailed Block */}
      {slug === 'seo-automator' && (
        <>
          <section className={styles.capabilities}>
            <div className={styles.containerGrid}>
              <div className={styles.col} data-reveal>
                <h2 className={styles.subhead}>Arquitectura de Indexación</h2>
                <p className={styles.text}>
                  El SEO Automator no escribe para buscadores, estructura para humanos. Usando un enjambre de agentes especializados, mapea vacíos de conocimiento, genera grafos semánticos y redacta clústeres de contenido con densidad de palabras clave nativa.
                </p>
                <ul className={styles.list}>
                  <li>Análisis de entidades latentes</li>
                  <li>Generación de corpus a escala</li>
                  <li>Optimización On-Page automatizada</li>
                </ul>
              </div>
              <div className={styles.col} data-reveal style={{ transitionDelay: '0.1s' }}>
                <div className={styles.dataViz}>
                  <div className={styles.stat}>
                    <span className={styles.statNum}>+400%</span>
                    <span className={styles.statLabel}>Aceleración de Indexación</span>
                  </div>
                  <div className={styles.stat}>
                    <span className={styles.statNum}>O(1)</span>
                    <span className={styles.statLabel}>Costo Marginal de Contenido</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Deep Dive Black Block */}
          <section className={styles.deepDive}>
            <div className={styles.containerCenter} data-reveal>
              <h2 className={styles.massiveText}>Content is not king. Context is the entire kingdom.</h2>
              <p className={styles.textCenter}>
                La era del contenido genérico ha terminado. El SEO Automator inyecta especificidad, autoridad y estructura de datos directamente en el código fuente (Schema markup dinámico) mientras escribe prosa que merece ser leída. 
              </p>
            </div>
          </section>
        </>
      )}

      {/* Placeholder for other engines */}
      {slug !== 'seo-automator' && (
        <section className={styles.capabilities}>
          <div className={styles.containerCenter} data-reveal>
            <h2 className={styles.subhead}>Detailed specifications coming soon.</h2>
            <p className={styles.textCenter}>
              This is a layout placeholder for the detailed capabilities of the {engine.name} engine.
            </p>
          </div>
        </section>
      )}
    </div>
  );
}
