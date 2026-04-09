import Link from 'next/link';
import { engines } from '@/lib/data';
import styles from './Engines.module.css';

export const metadata = {
  title: 'Engines | Infrastructure',
};

export default function EnginesIndex() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.container}>
          <h1 className={styles.title} data-reveal>Engines</h1>
          <p className={styles.subtitle} data-reveal>
            La infraestructura de modelos AI que corre en nuestro servidor. No es documentación, es una exhibición de nuestras herramientas.
          </p>
        </div>
      </header>

      <div className={styles.list}>
        {engines.map((engine) => (
          <Link href={`/engines/${engine.slug}`} key={engine.slug} className={styles.card} style={{ backgroundColor: engine.color }}>
            <div className={styles.cardInner}>
              <h2 className={styles.cardTitle} data-reveal>{engine.name}</h2>
              <p className={styles.description} data-reveal>{engine.description}</p>
              <span className={styles.exploreBtn} data-reveal>Explore Engine →</span>
            </div>
            {/* Dec number */}
            <span className={styles.decNumber}>{engine.number}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
