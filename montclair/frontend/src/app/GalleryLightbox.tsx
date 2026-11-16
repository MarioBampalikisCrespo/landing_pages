'use client';

import { useState, useEffect, useCallback } from 'react';
import styles from './page.module.css';

interface Props {
  images: { src: string }[];
  labels: { close: string; previous: string; next: string };
}

export default function GalleryLightbox({ images, labels }: Props) {
  const [active, setActive] = useState<number | null>(null);

  const close = useCallback(() => setActive(null), []);
  const prev  = useCallback(() => setActive(i => i === null ? null : (i - 1 + images.length) % images.length), [images.length]);
  const next  = useCallback(() => setActive(i => i === null ? null : (i + 1) % images.length), [images.length]);

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape')     close();
      if (e.key === 'ArrowLeft')  prev();
      if (e.key === 'ArrowRight') next();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [active, close, prev, next]);

  return (
    <>
      {/* ── Gallery grid ── */}
      <div className={styles.galleryGrid}>
        {images.map((g, i) => (
          <div
            key={g.src}
            className={styles.galleryItem}
            onClick={() => setActive(i)}
            style={{ cursor: 'zoom-in' }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={g.src}
              alt="Montclair"
              className={styles.galleryImage}
              loading="lazy"
            />
          </div>
        ))}
      </div>

      {/* ── Lightbox overlay ── */}
      {active !== null && (
        <div className={styles.lightboxOverlay} onClick={close}>
          {/* Imagen */}
          <div className={styles.lightboxFrame} onClick={e => e.stopPropagation()}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={images[active].src}
              alt="Montclair"
              className={styles.lightboxImage}
            />
          </div>

          {/* Cerrar */}
          <button className={styles.lightboxClose} onClick={close} aria-label={labels.close}>
            ✕
          </button>

          {/* Anterior */}
          <button className={`${styles.lightboxArrow} ${styles.lightboxArrowPrev}`} onClick={(e) => { e.stopPropagation(); prev(); }} aria-label={labels.previous}>
            ←
          </button>

          {/* Siguiente */}
          <button className={`${styles.lightboxArrow} ${styles.lightboxArrowNext}`} onClick={(e) => { e.stopPropagation(); next(); }} aria-label={labels.next}>
            →
          </button>

          {/* Contador */}
          <p className={styles.lightboxCounter}>
            {active + 1} / {images.length}
          </p>
        </div>
      )}
    </>
  );
}
