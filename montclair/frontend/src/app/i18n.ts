export type Locale = 'es' | 'en';

export const LOCALES: Locale[] = ['es', 'en'];

export interface Dictionary {
  nav: {
    rooms: string;
    experiences: string;
    gallery: string;
    contact: string;
    reserve: string;
  };
  hero: {
    eyebrow: string;
    tagline: string;
    cta: string;
    scroll: string;
  };
  about: {
    eyebrow: string;
    quote: string;
    body: string;
  };
  rooms: {
    sectionEyebrow: string;
    sectionTitle: string;
    priceSuffix: string;
    bookLabel: string;
    items: {
      id: string;
      category: string;
      name: string;
      description: string;
      price: string;
      img: string;
    }[];
  };
  amenities: {
    sectionEyebrow: string;
    sectionTitle: string;
    items: { name: string; desc: string }[];
  };
  gallery: {
    sectionEyebrow: string;
    close: string;
    previous: string;
    next: string;
  };
  testimonial: {
    quote: string;
    author: string;
  };
  booking: {
    eyebrow: string;
    title: string;
    subtitle: string;
    checkin: string;
    checkout: string;
    guests: string;
    guestOptions: string[];
    submit: string;
    altPrefix: string;
  };
  footer: {
    tagline: string;
    addressLabel: string;
    contactLabel: string;
    followLabel: string;
    copyright: string;
    privacy: string;
    legal: string;
  };
}

export const translations: Record<Locale, Dictionary> = {
  es: {
    nav: {
      rooms: 'Habitaciones',
      experiences: 'Experiencias',
      gallery: 'Galería',
      contact: 'Contacto',
      reserve: 'Reservar',
    },
    hero: {
      eyebrow: 'Costa Azul · Est. MCMXXIII',
      tagline: 'Donde el tiempo se disuelve en luz dorada',
      cta: 'Descubrir la Finca',
      scroll: 'Deslizar',
    },
    about: {
      eyebrow: 'La Historia',
      quote:
        '"En 1923, el primer hotel Lumière fue tallado por la familia Montclair en los acantilados de piedra caliza sobre Saint-Jean-Cap-Ferrat — un mundo privado aparte, donde el aire lleva jazmín y el mar nunca se pierde de vista."',
      body: 'Un siglo de excelencia silenciosa ha dado forma a cada piedra, cada aroma, cada silencio. Montclair no se anuncia. Simplemente perdura — como todo lo grande. Alojamos catorce suites. No aceptamos reservas sin cita previa.',
    },
    rooms: {
      sectionEyebrow: '02 · Las Habitaciones',
      sectionTitle: 'Refugios Privados',
      priceSuffix: '/ nuit',
      bookLabel: 'Reservar →',
      items: [
        {
          id: '01',
          category: 'Superior',
          name: 'La salle dorée',
          description:
            'Vistas panorámicas al Mediterráneo, con ropa de cama bordada a mano, vestidor a medida y terraza privada con el horizonte del mar al amanecer.',
          price: '850 €',
          img: '/images/room-1.jpg',
        },
        {
          id: '02',
          category: 'Suite',
          name: 'Le Jardin Secret',
          description:
            'Un refugio privado de 110 m² con bañera de mármol empotrada, jardín propio con acceso directo a los jardines de la finca y sommelier personal.',
          price: '1.450 €',
          img: '/images/room-2.jpg',
        },
        {
          id: '03',
          category: 'Ático',
          name: 'Le Grand Pavillon',
          description:
            'La cima de Montclair — 340 m² de esplendor curado con piscina privada en azotea, chef dedicado y terraza panorámica abierta a las estrellas.',
          price: '4.200 €',
          img: '/images/room-3.jpg',
        },
      ],
    },
    amenities: {
      sectionEyebrow: '03 · El Arte de Vivir',
      sectionTitle: 'La Vida Montclair',
      items: [
        { name: 'Spa & Bienestar', desc: '2.000 m² de circuitos termales, cabinas de tratamiento y jardines de meditación' },
        { name: 'Gastronomía', desc: 'Tres propuestas con estrella Michelin bajo la dirección del Chef Pierre Lacroix' },
        { name: 'Piscina Infinita', desc: 'Piscina climatizada con vistas a la Bahía de los Ángeles, abierta todo el año' },
        { name: 'Conserjería', desc: 'Servicio de mayordomo dedicado las 24 horas para cada suite y habitación' },
        { name: 'Cava de Vinos', desc: 'Una bodega de 4.000 referencias con maridaje personalizado por el sommelier' },
        { name: 'Traslados Privados', desc: 'Helicóptero y yate privado a Mónaco, Niza y los aeropuertos de Cannes' },
      ],
    },
    gallery: {
      sectionEyebrow: '04 · La Galería',
      close: 'Cerrar',
      previous: 'Anterior',
      next: 'Siguiente',
    },
    testimonial: {
      quote:
        'Montclair no es un hotel. Es la sensación de llegar a un lugar en el que siempre has debido estar.',
      author: '— Isabelle M., París',
    },
    booking: {
      eyebrow: '05 · Reservas',
      title: 'Comienza Tu Viaje',
      subtitle: 'Reservas privadas, exclusivamente para nuestros huéspedes',
      checkin: 'Llegada',
      checkout: 'Salida',
      guests: 'Huéspedes',
      guestOptions: ['1 persona', '2 personas', '3 personas', '4+ personas'],
      submit: 'Reservar',
      altPrefix: 'O llámanos al',
    },
    footer: {
      tagline: 'Hotel de Lujo · Costa Azul',
      addressLabel: 'Dirección',
      contactLabel: 'Contacto',
      followLabel: 'Síguenos',
      copyright: '© 2024 Hotel Montclair. Todos los derechos reservados.',
      privacy: 'Privacidad',
      legal: 'Aviso legal',
    },
  },
  en: {
    nav: {
      rooms: 'Rooms',
      experiences: 'Experiences',
      gallery: 'Gallery',
      contact: 'Contact',
      reserve: 'Reserve',
    },
    hero: {
      eyebrow: 'French Riviera · Est. MCMXXIII',
      tagline: 'Where time dissolves into golden light',
      cta: 'Discover the Estate',
      scroll: 'Scroll',
    },
    about: {
      eyebrow: 'Our History',
      quote:
        '"In 1923, the first Lumière hotel was carved by the Montclair family into the limestone cliffs above Saint-Jean-Cap-Ferrat — a private world apart, where the air carries jasmine and the sea is never out of sight."',
      body: 'A century of quiet excellence has shaped every stone, every scent, every silence. Montclair does not announce itself. It simply endures — as all great things do. We house fourteen suites. We do not accept reservations without prior arrangement.',
    },
    rooms: {
      sectionEyebrow: '02 · The Rooms',
      sectionTitle: 'Private Retreats',
      priceSuffix: '/ night',
      bookLabel: 'Book →',
      items: [
        {
          id: '01',
          category: 'Superior',
          name: 'La salle dorée',
          description:
            'Panoramic views over the Mediterranean, hand-embroidered linens, a bespoke dressing room and a private terrace overlooking the sunrise horizon.',
          price: '850 €',
          img: '/images/room-1.jpg',
        },
        {
          id: '02',
          category: 'Suite',
          name: 'Le Jardin Secret',
          description:
            'A private 110 m² sanctuary with an inset marble bath, its own garden with direct access to the estate grounds, and a personal sommelier.',
          price: '1.450 €',
          img: '/images/room-2.jpg',
        },
        {
          id: '03',
          category: 'Penthouse',
          name: 'Le Grand Pavillon',
          description:
            'The pinnacle of Montclair — 340 m² of curated splendor with a private rooftop pool, dedicated chef and a panoramic terrace open to the stars.',
          price: '4.200 €',
          img: '/images/room-3.jpg',
        },
      ],
    },
    amenities: {
      sectionEyebrow: '03 · The Art of Living',
      sectionTitle: 'The Montclair Life',
      items: [
        { name: 'Spa & Wellness', desc: '2,000 m² of thermal circuits, treatment cabins and meditation gardens' },
        { name: 'Gastronomy', desc: 'Three Michelin-starred venues under the direction of Chef Pierre Lacroix' },
        { name: 'Infinity Pool', desc: 'Heated infinity pool overlooking the Bay of Angels, open year-round' },
        { name: 'Concierge', desc: 'Dedicated 24-hour butler service for every suite and room' },
        { name: 'Wine Cellar', desc: 'A 4,000-bottle cellar with personalized pairing by our sommelier' },
        { name: 'Private Transfers', desc: 'Helicopter and private yacht to Monaco, Nice and the Cannes airports' },
      ],
    },
    gallery: {
      sectionEyebrow: '04 · The Gallery',
      close: 'Close',
      previous: 'Previous',
      next: 'Next',
    },
    testimonial: {
      quote: 'Montclair is not a hotel. It is the feeling of arriving somewhere you were always meant to be.',
      author: '— Isabelle M., Paris',
    },
    booking: {
      eyebrow: '05 · Reservations',
      title: 'Begin Your Journey',
      subtitle: 'Private bookings, exclusively for our guests',
      checkin: 'Arrival',
      checkout: 'Departure',
      guests: 'Guests',
      guestOptions: ['1 guest', '2 guests', '3 guests', '4+ guests'],
      submit: 'Reserve',
      altPrefix: 'Or call us at',
    },
    footer: {
      tagline: 'Luxury Hotel · French Riviera',
      addressLabel: 'Address',
      contactLabel: 'Contact',
      followLabel: 'Follow Us',
      copyright: '© 2024 Hotel Montclair. All rights reserved.',
      privacy: 'Privacy',
      legal: 'Legal Notice',
    },
  },
};
