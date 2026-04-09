import type { Metadata } from 'next';
import styles from './About.module.css';

export const metadata: Metadata = {
  title: 'About',
};

export default function AboutPage() {
  return (
    <div className={styles.about}>
      {/* Block 1: Who */}
      <section className={`${styles.block} ${styles.blockBlack}`}>
        <div className={styles.container}>
          <p className={styles.label} data-reveal>Mission</p>
          <h1 className={styles.statement} data-reveal>
            Buildations es un estudio de investigación y diseño. Exploramos cómo la inteligencia artificial redefine la creatividad, la infraestructura y el criterio humano.
          </h1>
        </div>
      </section>

      {/* Block 2: Method */}
      <section className={`${styles.block} ${styles.blockYellow}`}>
        <div className={styles.container}>
          <p className={styles.label} data-reveal>Methodology</p>
          <div className={styles.grid}>
            <div data-reveal>
              <h2 className={styles.subhead}>IA + Human Curation</h2>
              <p className={styles.text}>
                No somos un feed automatizado. Utilizamos modelos avanzados (LLMs, Diffusion, Audio) para generar síntesis, herramientas y visuales, pero cada pieza es validada, editada y diseñada con criterio humano.
              </p>
            </div>
            <div data-reveal style={{ transitionDelay: '0.1s' }}>
              <h2 className={styles.subhead}>Design as Structure</h2>
              <p className={styles.text}>
                El diseño no es decoración, es la estructura del contenido. Apostamos por el minimalismo extremo, la tipografía como elemento gráfico y la ausencia de ruido.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Block 3: The Author */}
      <section className={`${styles.block} ${styles.blockWhite}`}>
        <div className={styles.container}>
          <p className={styles.label} data-reveal>Director</p>
          <h2 className={styles.authorName} data-reveal>Román</h2>
          <p className={styles.authorBio} data-reveal>
            Investigador, diseñador y desarrollador. Combinando años de experiencia en arquitectura de software corporativa (SAP) con exploración en IA generativa aplicada.
          </p>
        </div>
      </section>
    </div>
  );
}
