'use client';

import styles from './page.module.css';
import GalleryLightbox from './GalleryLightbox';
import { useLanguage } from './LanguageContext';
import type { Locale } from './i18n';

const GALLERY = [
  { src: '/images/gallery-1.jpg' },
  { src: '/images/gallery-2.jpg' },
  { src: '/images/gallery-3.jpg' },
  { src: '/images/gallery-4.jpg' },
  { src: '/images/gallery-5.jpg' },
  { src: '/images/gallery-6.jpg' },
];

function LanguageSwitch() {
  const { locale, setLocale } = useLanguage();

  const option = (value: Locale, label: string) => (
    <button
      type="button"
      className={`${styles.navLangOption} ${locale === value ? styles.navLangActive : ''}`}
      onClick={() => setLocale(value)}
      aria-pressed={locale === value}
    >
      {label}
    </button>
  );

  return (
    <div className={styles.navLang} aria-label="Idioma / Language">
      {option('es', 'ES')}
      <span className={styles.navLangDivider}>/</span>
      {option('en', 'EN')}
    </div>
  );
}

export default function MontclairPage() {
  const { t } = useLanguage();

  return (
    <main className={styles.main}>

      {/* ── NAV ── */}
      <nav className={styles.nav}>
        <span className={styles.navLogo}>
          LUMIÈRE HOTELS
          <span className={styles.navLogoSub}>by Montclair</span>
        </span>
        <ul className={styles.navLinks}>
          <li><a href="#habitaciones">{t.nav.rooms}</a></li>
          <li><a href="#experiencias">{t.nav.experiences}</a></li>
          <li><a href="#galeria">{t.nav.gallery}</a></li>
          <li><a href="#contacto">{t.nav.contact}</a></li>
        </ul>
        <div className={styles.navRight}>
          <LanguageSwitch />
          <a href="#reserva" className={styles.navCta}>{t.nav.reserve}</a>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className={styles.hero}>
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <p className={styles.heroEyebrow}>{t.hero.eyebrow}</p>
          <h1 className={styles.heroTitle}>LUMIÈRE</h1>
          <div className={styles.heroRule} />
          <p className={styles.heroTagline}>{t.hero.tagline}</p>
          <a href="#habitaciones" className={styles.heroCta}>{t.hero.cta}</a>
        </div>
        <div className={styles.heroScroll}>
          <span>{t.hero.scroll}</span>
          <div className={styles.heroScrollLine} />
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section className={styles.about}>
        <div className={styles.aboutNumber}>01</div>
        <div className={styles.aboutContent}>
          <p className={styles.aboutEyebrow}>{t.about.eyebrow}</p>
          <blockquote className={styles.aboutQuote}>{t.about.quote}</blockquote>
          <p className={styles.aboutBody}>{t.about.body}</p>
        </div>
        <div className={styles.aboutImageWrap}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/about.jpg"
            alt="L'hôtel Montclair"
            className={styles.aboutImage}
          />
          <div className={styles.aboutImageBorder} />
        </div>
      </section>

      {/* ── ROOMS ── */}
      <section id="habitaciones" className={styles.rooms}>
        <header className={styles.sectionHeader}>
          <p className={styles.sectionEyebrow}>{t.rooms.sectionEyebrow}</p>
          <h2 className={styles.sectionTitle}>{t.rooms.sectionTitle}</h2>
        </header>
        <div className={styles.roomsGrid}>
          {t.rooms.items.map((room) => (
            <article key={room.id} className={styles.roomCard}>
              <div className={styles.roomImageWrap}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={room.img}
                  alt={room.name}
                  className={styles.roomImage}
                  loading="lazy"
                />
                <span className={styles.roomNumber}>{room.id}</span>
              </div>
              <div className={styles.roomBody}>
                <p className={styles.roomCategory}>{room.category}</p>
                <h3 className={styles.roomName}>{room.name}</h3>
                <p className={styles.roomDesc}>{room.description}</p>
                <div className={styles.roomFooter}>
                  <span className={styles.roomPrice}>
                    {room.price} {t.rooms.priceSuffix}
                  </span>
                  <a href="#reserva" className={styles.roomLink}>{t.rooms.bookLabel}</a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ── AMENITIES ── */}
      <section id="experiencias" className={styles.amenities}>
        <header className={styles.sectionHeader}>
          <p className={styles.sectionEyebrow}>{t.amenities.sectionEyebrow}</p>
          <h2 className={styles.sectionTitle}>{t.amenities.sectionTitle}</h2>
        </header>
        <div className={styles.amenitiesGrid}>
          {t.amenities.items.map((a) => (
            <div key={a.name} className={styles.amenityItem}>
              <div className={styles.amenityDot} />
              <div>
                <h4 className={styles.amenityName}>{a.name}</h4>
                <p className={styles.amenityDesc}>{a.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── GALLERY ── */}
      <section id="galeria" className={styles.gallery}>
        <header className={styles.gallerySectionHeader}>
          <p className={styles.sectionEyebrow}>{t.gallery.sectionEyebrow}</p>
        </header>
        <GalleryLightbox
          images={GALLERY}
          labels={{ close: t.gallery.close, previous: t.gallery.previous, next: t.gallery.next }}
        />
      </section>

      {/* ── TESTIMONIAL ── */}
      <section className={styles.testimonial}>
        <div className={styles.testimonialInner}>
          <div className={styles.testimonialMark}>&ldquo;</div>
          <blockquote className={styles.testimonialQuote}>{t.testimonial.quote}</blockquote>
          <p className={styles.testimonialAuthor}>{t.testimonial.author}</p>
        </div>
      </section>

      {/* ── BOOKING ── */}
      <section id="reserva" className={styles.booking}>
        <div className={styles.bookingInner}>
          <p className={styles.bookingEyebrow}>{t.booking.eyebrow}</p>
          <h2 className={styles.bookingTitle}>{t.booking.title}</h2>
          <p className={styles.bookingSubtitle}>{t.booking.subtitle}</p>
          <form className={styles.bookingForm}>
            <div className={styles.bookingField}>
              <label htmlFor="checkin">{t.booking.checkin}</label>
              <input id="checkin" type="date" />
            </div>
            <div className={styles.bookingField}>
              <label htmlFor="checkout">{t.booking.checkout}</label>
              <input id="checkout" type="date" />
            </div>
            <div className={styles.bookingField}>
              <label htmlFor="guests">{t.booking.guests}</label>
              <select id="guests">
                {t.booking.guestOptions.map((opt) => (
                  <option key={opt}>{opt}</option>
                ))}
              </select>
            </div>
            <button type="submit" className={styles.bookingBtn}>{t.booking.submit}</button>
          </form>
          <p className={styles.bookingAlt}>
            {t.booking.altPrefix}{' '}
            <a href="tel:+33492000000">+33 4 92 00 00 00</a>
          </p>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer id="contacto" className={styles.footer}>
        <div className={styles.footerTop}>
          <div className={styles.footerBrand}>
            <p className={styles.footerLogo}>MONTCLAIR</p>
            <p className={styles.footerTagline}>{t.footer.tagline}</p>
          </div>
          <div className={styles.footerCol}>
            <p className={styles.footerLabel}>{t.footer.addressLabel}</p>
            <p>42 Chemin du Littoral</p>
            <p>06230 Saint-Jean-Cap-Ferrat</p>
            <p>Francia</p>
          </div>
          <div className={styles.footerCol}>
            <p className={styles.footerLabel}>{t.footer.contactLabel}</p>
            <a href="tel:+33492000000">+33 4 92 00 00 00</a>
            <a href="mailto:reservas@montclair.fr">reservas@montclair.fr</a>
          </div>
          <div className={styles.footerCol}>
            <p className={styles.footerLabel}>{t.footer.followLabel}</p>
            <a href="#">Instagram</a>
            <a href="#">Facebook</a>
            <a href="#">Pinterest</a>
          </div>
        </div>
        <div className={styles.footerBottom}>
          <p>{t.footer.copyright}</p>
          <p>
            <a href="#">{t.footer.privacy}</a>
            {' · '}
            <a href="#">{t.footer.legal}</a>
          </p>
        </div>
      </footer>

    </main>
  );
}
