import styles from './page.module.css';
import ConcordeMark from './ConcordeMark';
import Experience from './hero/Experience';
import { STATIONS } from './hero/parts';

const FLEET = [
  {
    id: '01',
    category: '10 plazas',
    name: 'Lucen One',
    description:
      'Uno de los ocho Concorde de Montclair, reconstruido desde el fuselaje: cabina reducida a diez plazas, dormitorio independiente y el mismo morro abatible original, ahora solo decorativo.',
    price: '18.500 €',
  },
  {
    id: '02',
    category: '6 plazas',
    name: 'Lucen Meridian',
    description:
      'La configuración más íntima de la flota — seis plazas, suite doble convertible en dormitorio y bodega de vinos climatizada donde antes iba el galley de cien pasajeros.',
    price: '27.000 €',
  },
  {
    id: '03',
    category: '16 plazas · Insignia',
    name: 'Lucen Aurora',
    description:
      'La unidad insignia de los ocho Concorde — ducha presurizada, tres cabinas diferenciadas y capacidad para dieciséis pasajeros con tripulación dedicada.',
    price: '42.000 €',
  },
];

const CONCORDE_STATS = [
  { number: '8', label: 'Unidades, ninguna a la venta' },
  { number: 'Mach 5', label: 'Techo de velocidad objetivo' },
  { number: '2019–2024', label: 'Años de restauración, unidad por unidad' },
];

const EXPERIENCE = [
  { name: 'Terminal Privada', desc: 'Acceso directo a pista sin pasar por terminal comercial, en cada aeropuerto de la red Lucen' },
  { name: 'Gastronomía', desc: 'Menú diseñado por el equipo culinario de Lumière, embarcado en frío una hora antes del despegue' },
  { name: 'Suite de Descanso', desc: 'Asiento-cama de piel completa, con la misma ropa de cama que las habitaciones Montclair' },
  { name: 'Tripulación Fija', desc: 'El mismo piloto y la misma auxiliar de vuelo en cada trayecto, para quienes prefieren no repetir presentaciones' },
  { name: 'Conectividad Total', desc: 'Wifi de banda ancha vía satélite, sin límite de datos, en las tres cabinas' },
  { name: 'Puerta a Puerta', desc: 'Chófer privado incluido desde cualquier propiedad Montclair hasta el ala de embarque' },
];

const ROUTES = [
  { code: 'NCE → JFK', pair: 'Niza — Nueva York', duration: '7h 40m sin escalas' },
  { code: 'NCE → LHR', pair: 'Niza — Londres', duration: '1h 55m sin escalas' },
  { code: 'NCE → DXB', pair: 'Niza — Dubái', duration: '6h 10m sin escalas' },
  { code: 'NCE → GVA', pair: 'Niza — Ginebra', duration: '45m sin escalas' },
  { code: 'NCE → LAX', pair: 'Niza — Los Ángeles', duration: '11h 20m sin escalas' },
  { code: 'NCE → LIN', pair: 'Niza — Milán', duration: '50m sin escalas' },
];


export default function LucenPage() {
  return (
    <main className={styles.main}>

      <nav className={styles.nav}>
        <span className={styles.navLogo}>
          LUCEN AIRWAYS
          <span className={styles.navLogoSub}>by Montclair</span>
        </span>
        <ul className={styles.navLinks}>
          <li><a href="#rutas">Rutas</a></li>
          <li><a href="#flota">Flota</a></li>
          <li><a href="#cabina">Cabina</a></li>
          <li><a href="#programa">Programa</a></li>
          <li><a href="#contacto">Contacto</a></li>
        </ul>
        <a href="#reserva" className={styles.navCta}>Reservar Vuelo</a>
      </nav>

      <Experience>

        <section data-shot="hero" className={`${styles.shot} ${styles.hero} ${styles.left}`}>
          <div className={styles.heroInner}>
            <p className={styles.eyebrow}>Aviación Privada · Est. MMXVIII</p>
            <h1 className={styles.title}>LUCEN</h1>
            <div className={styles.rule} />
            <p className={styles.tagline}>La luz llega antes que el destino.</p>
            <div className={styles.actions}>
              <a href="#cabina" className={styles.cta}>Entrar en el Concorde</a>
              <a href="#reserva" className={styles.ctaGhost}>Reservar Vuelo</a>
            </div>
          </div>
          <p className={styles.heroHint}>Desliza para recorrer el avión · Arrastra para mirar · Pulsa los puntos</p>
        </section>

        <section data-shot="filosofia" className={`${styles.shot} ${styles.left}`}>
          <div className={styles.glass}>
            <p className={styles.eyebrow}>01 · La Filosofía</p>
            <blockquote className={styles.quote}>
              &ldquo;En 2018, la familia Montclair decidió que sus huéspedes no debían despedirse
              del silencio de Lumière al abandonar la finca — así nació Lucen, una flota de ocho
              aeronaves para quienes prefieren no ser vistos llegar.&rdquo;
            </blockquote>
            <p className={styles.lead}>
              No operamos rutas. Operamos itinerarios. Cada vuelo se diseña alrededor de un
              solo pasajero, una sola familia, una sola razón para volar. Ocho aeronaves,
              tripulaciones fijas, y la misma promesa que ampara cada propiedad Montclair:
              nada se anuncia, todo se recuerda.
            </p>
          </div>
        </section>

        <section id="flota" data-shot="flota" className={`${styles.shot} ${styles.right}`}>
          <div className={styles.glass}>
            <p className={styles.eyebrow}>02 · La Flota</p>
            <h2 className={styles.sectionTitle}>Ocho Concorde. Restaurados en Negro.</h2>
            <p className={styles.lead}>
              Cuando el último Concorde comercial aterrizó en 2003, Montclair compró ocho. No para
              exhibirlos — para reconstruirlos. Cada aeronave fue desmontada hasta el fuselaje,
              repintada en negro mate y reequipada con una planta motriz capaz de rozar Mach 5.
              Ya no llevan cien pasajeros. Llevan ocho.
            </p>
            <div className={styles.stats}>
              {CONCORDE_STATS.map((s) => (
                <div key={s.label}>
                  <span className={styles.statNumber}>{s.number}</span>
                  <span className={styles.statLabel}>{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="unidades" data-shot="unidades" className={`${styles.shot} ${styles.center} ${styles.bottom}`}>
          <div className={`${styles.glass} ${styles.glassWide}`}>
            <div className={styles.fleetHead}>
              <div>
                <p className={styles.eyebrow}>03 · Las Unidades</p>
                <h2 className={styles.sectionTitle}>Tres de las Ocho</h2>
              </div>
            </div>
            <div className={styles.fleetGrid}>
              {FLEET.map((jet) => (
                <article key={jet.id} className={styles.jetCard}>
                  <div className={styles.jetMarkWrap}>
                    <ConcordeMark className={styles.jetMark} />
                    <span className={styles.jetNumber}>{jet.id}</span>
                  </div>
                  <p className={styles.jetCategory}>{jet.category}</p>
                  <h3 className={styles.jetName}>{jet.name}</h3>
                  <p className={styles.jetDesc}>{jet.description}</p>
                  <div className={styles.jetFooter}>
                    <span className={styles.jetPrice}>{jet.price} / hora</span>
                    <a href="#reserva" className={styles.jetLink}>Reservar →</a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="cabina" data-shot="puerta" className={`${styles.shot} ${styles.left}`}>
          <div className={styles.glass}>
            <p className={styles.eyebrow}>04 · La Experiencia a Bordo</p>
            <h2 className={styles.sectionTitle}>Cabina Montclair</h2>
            <p className={styles.lead}>
              Acceso directo desde pista, sin pasar por terminal comercial. Cruza el umbral y
              recorre el avión de proa a popa, zona por zona.
            </p>
          </div>
        </section>

        {STATIONS.map((st, i) => (
          <section
            key={st.id}
            data-shot={st.id}
            className={`${styles.shot} ${styles.shotShort} ${i % 2 === 0 ? styles.right : styles.left}`}
          >
            <div className={styles.glass}>
              <div className={styles.stepIndex}>
                <span className={styles.stepNum}>
                  {String(i + 1).padStart(2, '0')} / {String(STATIONS.length).padStart(2, '0')}
                </span>
                <span className={styles.stepBar} aria-hidden="true">
                  {STATIONS.map((o, k) => (
                    <i key={o.id} data-on={k <= i} />
                  ))}
                </span>
              </div>
              <h3 className={styles.sectionTitle}>{st.name}</h3>
              <p className={styles.lead}>{st.text}</p>
              <dl className={styles.stepSpecs}>
                {st.specs.map(([k, v]) => (
                  <div key={k}>
                    <dt>{k}</dt>
                    <dd>{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </section>
        ))}

        <section id="programa" data-shot="servicios" className={`${styles.shot} ${styles.center} ${styles.bottom}`}>
          <div className={`${styles.glass} ${styles.glassWide}`}>
            <p className={styles.eyebrow}>Incluido en cada vuelo</p>
            <h3 className={styles.sectionTitle}>Todo lo que ocurre a bordo</h3>
            <div className={styles.servicios}>
              {EXPERIENCE.map((item) => (
                <div key={item.name} className={styles.servicio}>
                  <div className={styles.servicioDot} />
                  <div>
                    <h4 className={styles.servicioName}>{item.name}</h4>
                    <p className={styles.servicioDesc}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── RUTAS · de vuelta en el hangar ── */}
        <section id="rutas" data-shot="rutas" className={`${styles.shot} ${styles.right}`}>
          <div className={`${styles.glass} ${styles.glassMid}`}>
            <p className={styles.eyebrow}>05 · La Red</p>
            <h2 className={styles.sectionTitle}>Desde Niza, Sin Escalas</h2>
            <div className={styles.routesBoard}>
              <div className={styles.routesBoardHead}>
                <span>Ruta</span>
                <span>Trayecto</span>
                <span>Duración</span>
              </div>
              {ROUTES.map((r) => (
                <div key={r.code} className={styles.routesBoardRow}>
                  <span className={styles.routeCode}>{r.code}</span>
                  <span className={styles.routePair}>{r.pair}</span>
                  <span className={styles.routeDuration}>{r.duration}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── TESTIMONIO ── */}
        <section data-shot="testimonio" className={`${styles.shot} ${styles.shotShort} ${styles.center}`}>
          <div className={`${styles.glass} ${styles.glassMid}`}>
            <div className={styles.testimonialMark}>&ldquo;</div>
            <blockquote className={styles.testimonialQuote}>
              Lucen no vuela hacia un lugar. Vuela hacia el tiempo que ganas al no tener que
              despedirte de la calma de Montclair.
            </blockquote>
            <p className={styles.testimonialAuthor}>— Julian K., Ginebra</p>
          </div>
        </section>

        {/* ── RESERVA ── */}
        <section id="reserva" data-shot="reserva" className={`${styles.shot} ${styles.center}`}>
          <div className={`${styles.glass} ${styles.glassMid}`}>
            <p className={`${styles.eyebrow} ${styles.centerText}`}>06 · Reserva</p>
            <h2 className={styles.bookingTitle}>Diseña Tu Vuelo</h2>
            <p className={styles.bookingSubtitle}>
              Itinerarios privados, disponibles las 24 horas para nuestros miembros
            </p>
            <form className={styles.bookingForm}>
              <div className={styles.bookingField}>
                <label htmlFor="origin">Origen</label>
                <input id="origin" type="text" placeholder="Niza (NCE)" defaultValue="Niza (NCE)" />
              </div>
              <div className={styles.bookingField}>
                <label htmlFor="destination">Destino</label>
                <input id="destination" type="text" placeholder="¿A dónde volamos?" />
              </div>
              <div className={styles.bookingField}>
                <label htmlFor="date">Fecha</label>
                <input id="date" type="date" />
              </div>
              <div className={styles.bookingField}>
                <label htmlFor="passengers">Pasajeros</label>
                <select id="passengers">
                  <option>1 pasajero</option>
                  <option>2 pasajeros</option>
                  <option>4 pasajeros</option>
                  <option>8+ pasajeros</option>
                </select>
              </div>
              <button type="submit" className={styles.bookingBtn}>Solicitar Vuelo</button>
            </form>
            <p className={styles.bookingAlt}>
              O llama directamente al{' '}
              <a href="tel:+33493000000">+33 4 93 00 00 00</a>
            </p>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <section data-shot="contacto" className={`${styles.shot} ${styles.footerShot}`}>
          <footer id="contacto" className={styles.footer}>
            <div className={styles.footerTop}>
              <div className={styles.footerBrand}>
                <p className={styles.footerLogo}>LUCEN</p>
                <p className={styles.footerTagline}>Aviación Privada · Costa Azul</p>
              </div>
              <div className={styles.footerCol}>
                <p className={styles.footerLabel}>Base</p>
                <p>Aéroport Nice Côte d&apos;Azur</p>
                <p>Terminal Général de l&apos;Aviation</p>
                <p>06206 Nice, Francia</p>
              </div>
              <div className={styles.footerCol}>
                <p className={styles.footerLabel}>Contacto</p>
                <a href="tel:+33493000000">+33 4 93 00 00 00</a>
                <a href="mailto:reservas@lucen.fr">reservas@lucen.fr</a>
              </div>
              <div className={styles.footerCol}>
                <p className={styles.footerLabel}>Síguenos</p>
                <a href="#">Instagram</a>
                <a href="#">LinkedIn</a>
                <a href="#">X</a>
              </div>
            </div>
            <div className={styles.footerBottom}>
              <p>© 2026 Lucen Airways. Todos los derechos reservados.</p>
              <p>
                <a href="#">Privacidad</a>
                {' · '}
                <a href="#">Aviso legal</a>
              </p>
            </div>
            <p className={styles.credit}>
              Modelo 3D «Concorde free with interior» de{' '}
              <a
                href="https://sketchfab.com/3d-models/concorde-free-with-interior-c0226f9f1a68438d939968d58e42f4de"
                target="_blank"
                rel="noreferrer"
              >
                taeemtasbi
              </a>{' '}
              (Sketchfab), licencia{' '}
              <a href="http://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noreferrer">
                CC BY 4.0
              </a>
              , modificado: repintado en negro. Hangar e iluminación: HDRI y texturas de{' '}
              <a href="https://polyhaven.com" target="_blank" rel="noreferrer">
                Poly Haven
              </a>{' '}
              (CC0).
            </p>
          </footer>
        </section>

      </Experience>
    </main>
  );
}
