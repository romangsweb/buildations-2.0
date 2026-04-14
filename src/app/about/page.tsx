import type { Metadata } from 'next';
import styles from './About.module.css';

export const metadata: Metadata = {
  title: 'About',
};

export default function AboutPage() {
  return (
    <div className={styles.about}>
      <section className={`${styles.block} ${styles.blockBlack}`}>
        <div className={styles.container}>
          <p className={styles.label} data-reveal>Mission</p>
          <h1 className={styles.statement} data-reveal>
            Buildations is a research laboratory. We build intelligence from scratch — from the infrastructure layer to finished, production-ready engines. Not prototypes. Not demos. Systems that run real workloads and get better over time.
          </h1>
          <p className={styles.text} data-reveal style={{ marginTop: '40px', opacity: 0.6, maxWidth: '60ch', fontSize: 'clamp(18px, 2vw, 24px)', lineHeight: 1.5 }}>
            The question we&apos;re answering: what does it look like to build AI seriously, without renting the stack from someone else?
          </p>
        </div>
      </section>

      <section className={`${styles.block} ${styles.blockYellow}`}>
        <div className={styles.container}>
          <p className={styles.label} data-reveal>Architecture</p>
          <div className={styles.grid}>
            <div data-reveal>
              <h2 className={styles.subhead}>The Lego Principle</h2>
              <p className={styles.text}>
                Every engine is a module. Independent, composable, replaceable. The Revenue engine doesn&apos;t know the Security engine exists. The Search engine doesn&apos;t depend on the Revenue engine running. Each one solves a specific layer — and connects to the others through clean interfaces, not tangled dependencies.
              </p>
              <p className={styles.text} style={{ marginTop: '24px' }}>
                This is intentional. It&apos;s how you build something that scales without breaking.
              </p>
            </div>
            <div data-reveal style={{ transitionDelay: '0.1s' }}>
              <h2 className={styles.subhead}>From Zero</h2>
              <p className={styles.text}>
                We don&apos;t start with APIs. We start with infrastructure. The models run on our own hardware. The data pipelines are built by hand. The security layer is designed from first principles. This isn&apos;t ideological — it&apos;s practical.
              </p>
              <p className={styles.text} style={{ marginTop: '24px' }}>
                You can&apos;t understand a system you didn&apos;t build. You can&apos;t improve what you don&apos;t control. Building from zero is slower. It&apos;s also the only way to know what you actually have.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className={`${styles.block} ${styles.blockWhite}`}>
        <div className={styles.container}>
          <p className={styles.label} data-reveal>Research Philosophy</p>
          <div className={styles.grid}>
            <div data-reveal>
              <h2 className={styles.subhead}>IA + Human Curation</h2>
              <p className={styles.text}>
                Not an automated feed. We use advanced models — LLMs, diffusion, audio — to generate synthesis, tools, and visuals. But every piece is validated, edited, and designed with human judgment. The AI generates. The human decides.
              </p>
            </div>
            <div data-reveal style={{ transitionDelay: '0.1s' }}>
              <h2 className={styles.subhead}>Design as Structure</h2>
              <p className={styles.text}>
                Design is not decoration — it&apos;s the structure of content. Extreme minimalism, typography as graphic element, absence of noise. If something doesn&apos;t need to be there, it isn&apos;t.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className={`${styles.block} ${styles.blockBlack}`}>
        <div className={styles.container}>
          <p className={styles.label} data-reveal>Who We Are</p>
          <h2 className={styles.statement} data-reveal style={{ fontSize: 'clamp(32px, 4vw, 64px)' }}>
            Buildations is not a company. It is not a team. It is a working method — a set of principles applied consistently to hard problems. The work speaks. The infrastructure runs. The rest is noise.
          </h2>
          <p className={styles.text} data-reveal style={{ marginTop: '40px', opacity: 0.6, maxWidth: '60ch', fontSize: 'clamp(18px, 2vw, 24px)', lineHeight: 1.5 }}>
            Built in Ciudad de México. Designed to run anywhere.
          </p>
        </div>
      </section>
    </div>
  );
}
