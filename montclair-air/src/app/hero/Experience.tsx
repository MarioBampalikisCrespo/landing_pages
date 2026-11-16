'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import styles from './Experience.module.css';
import { EXTERIOR_PARTS } from './parts';
import { locate, worldOf, type Layout, type World } from './shots';
import type { FocusView } from './PageScene';
import type { PinElements } from './Aircraft';

const PageScene = dynamic(() => import('./PageScene'), { ssr: false });

function supportsWebGL() {
  try {
    const c = document.createElement('canvas');
    return !!(c.getContext('webgl2') || c.getContext('webgl'));
  } catch {
    return false;
  }
}

/**
 * Escena 3D fija detrás de toda la página. Cada hijo con `data-shot="id"` es una
 * toma de cámara: el scroll recorre el avión de una a otra.
 */
export default function Experience({ children }: { children: React.ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const layout = useRef<Layout>({ ids: [], mids: [] });
  const focus = useRef<FocusView | null>(null);
  const focusScroll = useRef(0);
  const pinEls = useRef<PinElements>({});


  const [webgl, setWebgl] = useState(true);
  const [reduced, setReduced] = useState(false);
  const [lowQuality, setLowQuality] = useState(false);
  const [ready, setReady] = useState(false);
  const [intro, setIntro] = useState(true);

  const [world, setWorld] = useState<World>('exterior');
  const [desiredWorld, setDesiredWorld] = useState<World>('exterior');
  const [activeId, setActiveId] = useState('hero');
  const [focusId, setFocusId] = useState<string | null>(null);
  const [curtain, setCurtain] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    const nav = navigator as Navigator & { deviceMemory?: number };
    const coarse = window.matchMedia('(pointer: coarse)').matches;
    setLowQuality((nav.hardwareConcurrency ?? 8) <= 4 || (nav.deviceMemory ?? 8) <= 4 || (coarse && window.innerWidth < 900));
    setWebgl(supportsWebGL());
    return () => mq.removeEventListener('change', sync);
  }, []);

  const closeFocus = useCallback(() => {
    focus.current = null;
    setFocusId(null);
  }, []);

  const measure = useCallback(() => {
    const root = rootRef.current;
    if (!root) return;
    const els = [...root.querySelectorAll<HTMLElement>('[data-shot]')];
    layout.current = {
      ids: els.map((e) => e.dataset.shot!),
      mids: els.map((e) => {
        const r = e.getBoundingClientRect();
        return r.top + window.scrollY + r.height / 2;
      }),
    };
  }, []);

  const update = useCallback(() => {
    const lay = layout.current;
    if (lay.ids.length === 0) return;
    const { i, j, u } = locate(lay, window.scrollY + window.innerHeight / 2);
    const id = lay.ids[u < 0.5 ? i : j];
    setActiveId((p) => (p === id ? p : id));
    const w = worldOf(id);
    setDesiredWorld((p) => (p === w ? p : w));
    if (focus.current && Math.abs(window.scrollY - focusScroll.current) > 140) closeFocus();
  }, [closeFocus]);

  useEffect(() => {
    measure();
    update();
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    const onResize = () => {
      measure();
      update();
    };
    const ro = new ResizeObserver(onResize);
    if (rootRef.current) ro.observe(rootRef.current);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    window.addEventListener('load', onResize);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('load', onResize);
    };
  }, [measure, update]);

  // Cortinilla al pasar del exterior al interior (y al volver).
  useEffect(() => {
    if (desiredWorld !== world) {
      setCurtain(true);
      const t = window.setTimeout(() => {
        setIntro(false);
        focus.current = null;
        setFocusId(null);
        setWorld(desiredWorld);
      }, reduced ? 0 : 420);
      return () => window.clearTimeout(t);
    }
    const t = window.setTimeout(() => setCurtain(false), reduced ? 0 : 380);
    return () => window.clearTimeout(t);
  }, [desiredWorld, world, reduced]);

  const pick = useCallback((id: string) => {
    const part = EXTERIOR_PARTS.find((p) => p.id === id);
    if (!part) return;
    focus.current = part.view;
    focusScroll.current = window.scrollY;
    setFocusId(id);
  }, []);

  const part = EXTERIOR_PARTS.find((p) => p.id === focusId) ?? null;
  const showPins = webgl && world === 'exterior' && activeId === 'hero' && !curtain;

  return (
    <div ref={rootRef} className={`${styles.root} ${webgl ? '' : styles.flat}`}>
      <div className={styles.sky} aria-hidden="true" />

      {webgl && (
        <div className={`${styles.stage} ${ready ? styles.stageReady : ''}`}>
          <PageScene
            world={world}
            layout={layout}
            focus={focus}
            pinEls={pinEls}
            reduced={reduced}
            lowQuality={lowQuality}
            intro={intro}
            onReady={() => setReady(true)}
          />
        </div>
      )}
      {webgl && !ready && <p className={styles.loading}>Preparando el hangar…</p>}

      {showPins && (
        <div className={styles.pinLayer}>
          {EXTERIOR_PARTS.map((p) => (
            <button
              key={p.id}
              ref={(el) => {
                pinEls.current[p.id] = el;
              }}
              type="button"
              className={`${styles.pin} ${p.id === 'puerta' ? styles.pinDoor : ''}`}
              onClick={() => pick(p.id)}
              aria-label={p.name}
            >
              <span className={styles.pinDot} />
              <span className={styles.pinLabel}>{p.name}</span>
            </button>
          ))}
        </div>
      )}

      {part && (
        <aside className={styles.card} key={part.id} aria-live="polite">
          <button type="button" className={styles.cardClose} onClick={closeFocus} aria-label="Cerrar ficha">
            ✕
          </button>
          <p className={styles.cardKicker}>{part.kicker}</p>
          <h2 className={styles.cardName}>{part.name}</h2>
          <p className={styles.cardText}>{part.text}</p>
          <dl className={styles.specs}>
            {part.specs.map(([k, v]) => (
              <div key={k}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
          {part.id === 'puerta' && (
            <a href="#cabina" className={styles.cardCta} onClick={closeFocus}>
              Entrar al avión
            </a>
          )}
        </aside>
      )}

      <div className={styles.rail} aria-hidden="true">
        <div className={styles.railFill} />
      </div>

      <div className={`${styles.curtain} ${curtain ? styles.curtainOn : ''}`} aria-hidden="true" />

      <div className={styles.content}>{children}</div>
    </div>
  );
}
