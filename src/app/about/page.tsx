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
          <p className={styles.label}>Mission</p>
          <h1 className={styles.statement}>
            Buildations is a research laboratory. We build intelligence from scratch — from the infrastructure layer to finished, production-ready engines. Not prototypes. Not demos. Systems that run real workloads and get better over time.
          </h1>
          <p className={styles.text} style={{ marginTop: '40px', opacity: 0.6, maxWidth: '60ch', fontSize: 'clamp(18px, 2vw, 24px)', lineHeight: 1.5 }}>
            The question we&apos;re answering: what does it look like to build AI seriously, without renting the stack from someone else?
          </p>
        </div>
      </section>

      <section className={`${styles.block} ${styles.blockYellow}`}>
        <div className={styles.container}>
          <p className={styles.label}>Architecture</p>
          <div className={styles.grid}>
            <div>
              <h2 className={styles.subhead}>The Lego Principle</h2>
              <p className={styles.text}>
                Every engine is a module. Independent, composable, replaceable. The Revenue engine doesn&apos;t know the Security engine exists. The Search engine doesn&apos;t depend on the Revenue engine running. Each one solves a specific layer — and connects to the others through clean interfaces, not tangled dependencies.
              </p>
              <p className={styles.text} style={{ marginTop: '24px' }}>
                This is intentional. It&apos;s how you build something that scales without breaking.
              </p>
            </div>
            <div>
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
          <p className={styles.label}>Research Philosophy</p>
          <div className={styles.grid}>
            <div>
              <h2 className={styles.subhead}>IA + Human Curation</h2>
              <p className={styles.text}>
                Not an automated feed. We use advanced models — LLMs, diffusion, audio — to generate synthesis, tools, and visuals. But every piece is validated, edited, and designed with human judgment. The AI generates. The human decides.
              </p>
            </div>
            <div>
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
          <p className={styles.label}>The Origin</p>
          <h2 className={styles.subhead} style={{ fontSize: 'clamp(24px, 3vw, 48px)', marginBottom: '40px' }}>
            How security became the foundation for everything else
          </h2>
          <div className={styles.grid}>
            <div>
              <p className={styles.text}>
                The first engine we built was Adaptive Security. Not because it was the most commercially obvious — but because it solved an immediate problem: protecting infrastructure we owned, without renting someone else&apos;s tools to do it.
              </p>
              <p className={styles.text} style={{ marginTop: '24px' }}>
                What we did not expect was what the honeypots would teach us. Millions of real attack events, collected in weeks. Patterns, behaviors, intent signals — all of it labeled by the attackers themselves. It was the highest-density training dataset we had ever worked with.
              </p>
            </div>
            <div>
              <p className={styles.text}>
                The architecture that learned to classify threats turned out to be the same architecture that could classify leads, content opportunities, and buying signals. The variables changed. The structure did not.
              </p>
              <p className={styles.text} style={{ marginTop: '24px' }}>
                Revenue Intelligence and Search &amp; Presence were not built from scratch. They were built on top of what security proved. The cycle of training, the reasoning pipeline, the feedback loops — all of it transferred. The precision came from volume. The volume came from building security first.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className={`${styles.block} ${styles.blockYellow}`}>
        <div className={styles.container}>
          <p className={styles.label}>Who it is for</p>
          <h2 className={styles.statement} style={{ fontSize: 'clamp(28px, 4vw, 64px)', marginBottom: '40px' }}>
            Built in a lab. Available to anyone who cannot afford the alternative.
          </h2>
          <div className={styles.grid}>
            <div>
              <p className={styles.text}>
                The engines were built for our own infrastructure. But the problem they solve is not unique to a research lab. A small business with serious ambitions faces the same tradeoffs: security tools that cost more than the server they protect, CRM intelligence locked behind enterprise contracts, SEO agencies that charge monthly for what a well-trained model can do daily.
              </p>
              <p className={styles.text} style={{ marginTop: '24px' }}>
                A mid-range server and an internet connection are enough to run all three engines. The models train on your data — your traffic, your attackers, your deals, your search queries. Not on someone else&apos;s.
              </p>
            </div>
            <div>
              <p className={styles.text}>
                This is not a SaaS subscription. It is infrastructure you install, configure, and own. It takes longer to set up than signing up for a tool. It also never sends your data to a server you do not control.
              </p>
              <p className={styles.text} style={{ marginTop: '24px' }}>
                The engines are available as a managed implementation — we handle the setup, the configuration, and the first training cycles. After that, they run on your hardware, on your terms.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className={`${styles.block} ${styles.blockBlack}`}>
        <div className={styles.container}>
          <p className={styles.label}>Who We Are</p>
          <h2 className={styles.statement} style={{ fontSize: 'clamp(32px, 4vw, 64px)' }}>
            Buildations is not a company. It is not a team. It is a working method — a set of principles applied consistently to hard problems. The work speaks. The infrastructure runs. The rest is noise.
          </h2>
          <p className={styles.text} style={{ marginTop: '40px', opacity: 0.6, maxWidth: '60ch', fontSize: 'clamp(18px, 2vw, 24px)', lineHeight: 1.5 }}>
            Built with love &amp; passion. Designed to run anywhere.
          </p>
        </div>
      </section>
    </div>
  );
}
