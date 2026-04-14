'use client';

import { useState } from 'react';
import Image from 'next/image';
import styles from '@/styles/SeasonGallery.module.css';

type Season = 'space' | 'architecture' | 'human' | 'organic';

const seasons: Record<Season, { label: string; labelEs: string; images: string[] }> = {
  space: {
    label: 'Space / Artemis',
    labelEs: 'Espacio',
    images: [
      'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=900&q=80',
      'https://images.unsplash.com/photo-1454789548928-9efd52dc4031?w=900&q=80',
      'https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?w=900&q=80',
      'https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?w=900&q=80',
      'https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=900&q=80',
    ],
  },
  architecture: {
    label: 'Architecture',
    labelEs: 'Arquitectura',
    images: [
      'https://images.unsplash.com/photo-1429497419816-9ca5cfb4571a?w=900&q=80',
      'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=900&q=80',
      'https://images.unsplash.com/photo-1460574283810-2aab119d8511?w=900&q=80',
      'https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=900&q=80',
      'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=900&q=80',
    ],
  },
  human: {
    label: 'Human Forms',
    labelEs: 'Formas Humanas',
    images: [
      'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=900&q=80',
      'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=900&q=80',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=900&q=80',
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=900&q=80',
      'https://images.unsplash.com/photo-1528766438741-e4da7a96d9bb?w=900&q=80',
    ],
  },
  organic: {
    label: 'Organic Abstract',
    labelEs: 'Abstracto Orgánico',
    images: [
      'https://images.unsplash.com/photo-1482189349482-56c6e7e295eb?w=900&q=80',
      'https://images.unsplash.com/photo-1504198322253-cfa87a0ff60f?w=900&q=80',
      'https://images.unsplash.com/photo-1557682233-43e671455dfa?w=900&q=80',
      'https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?w=900&q=80',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80',
    ],
  },
};

const seasonOrder: Season[] = ['space', 'architecture', 'human', 'organic'];

export default function SeasonGallery() {
  const [active, setActive] = useState<Season>('space');
  const [featured, setFeatured] = useState(0);

  const current = seasons[active];

  return (
    <section className={styles.gallery}>
      {/* Header row */}
      <div className={styles.header}>
        <div>
          <p className={styles.label}>Gallery</p>
          <h2 className={styles.title}>
            {current.label}
          </h2>
        </div>

        {/* Season switcher */}
        <div className={styles.switcher}>
          {seasonOrder.map((s) => (
            <button
              key={s}
              onClick={() => { setActive(s); setFeatured(0); }}
              className={`${styles.seasonBtn} ${active === s ? styles.seasonBtnActive : ''}`}
            >
              {seasons[s].labelEs}
            </button>
          ))}
        </div>
      </div>

      {/* Featured image */}
      <div className={styles.featured}>
        <div className={styles.featuredImg}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={current.images[featured]}
            alt={`${current.label} ${featured + 1}`}
            loading="lazy"
          />
        </div>
        <div className={styles.featuredMeta}>
          <span className={styles.imgNum}>0{featured + 1} / 05</span>
          <span className={styles.imgLabel}>{current.label}</span>
        </div>
      </div>

      {/* Thumbnail strip */}
      <div className={styles.strip}>
        {current.images.map((src, i) => (
          <button
            key={i}
            onClick={() => setFeatured(i)}
            className={`${styles.thumb} ${featured === i ? styles.thumbActive : ''}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt="" loading="lazy" />
          </button>
        ))}
      </div>
    </section>
  );
}
