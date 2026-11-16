import { AIRCRAFT_Y } from './constants';

export type Vec3 = [number, number, number];

export interface CameraView {
  pos: Vec3;
  look: Vec3;
}

export interface ExteriorPart {
  id: string;
  name: string;
  kicker: string;
  text: string;
  specs: [string, string][];
  /** Posición del marcador, en coordenadas locales del avión. */
  pin: Vec3;
  /** Normal aproximada del marcador: se oculta si la cámara queda detrás. */
  pinNormal: Vec3;
  view: CameraView;
}

export interface Station {
  id: string;
  name: string;
  kicker: string;
  text: string;
  specs: [string, string][];
  /** Posición de la cámara dentro del avión (coordenadas locales). */
  pos: Vec3;
  /** Orientación horizontal inicial: -π/2 mira al morro, π/2 a la cola. */
  yaw: number;
  pitch?: number;
}

const y = (v: number) => v + AIRCRAFT_Y;

export const OVERVIEW: CameraView = {
  pos: [-18, 13, 56],
  look: [-4, -0.5, 0],
};

/** Encuadre para pantallas verticales: más en diagonal para que quepa más avión. */
export const OVERVIEW_PORTRAIT: CameraView = {
  pos: [-42, 12, 42],
  look: [2, -5, 0],
};

export function pickOverview(): CameraView {
  if (typeof window !== 'undefined' && window.innerWidth / window.innerHeight < 0.8) return OVERVIEW_PORTRAIT;
  return OVERVIEW;
}

export const EXTERIOR_PARTS: ExteriorPart[] = [
  {
    id: 'morro',
    name: 'El Morro',
    kicker: 'Exterior · 01',
    text: 'El morro abatible original sigue ahí, pero ya no baja: es solo decorativo. Detrás, un parabrisas oscurecido que deja la cabina de mando a oscuras desde fuera.',
    specs: [
      ['Morro', 'Abatible original, fijo'],
      ['Acabado', 'Negro mate, sin librea'],
    ],
    pin: [29.4, -1.9, 0.6],
    pinNormal: [1, 0, 0],
    view: { pos: [45, y(1.6), 13], look: [28, y(-1.6), 0] },
  },
  {
    id: 'alas',
    name: 'Ala en Delta',
    kicker: 'Exterior · 02',
    text: 'El ala ojival que definió al Concorde, reconstruida pieza a pieza. La misma geometría, con superficies selladas y revestimiento nuevo en negro mate.',
    specs: [
      ['Envergadura', '25,6 m'],
      ['Perfil', 'Delta ojival'],
    ],
    pin: [-9, -1.5, 7],
    pinNormal: [0, 1, 0.4],
    view: { pos: [-16, y(11), 31], look: [-10, y(-1.7), 6] },
  },
  {
    id: 'motores',
    name: 'Planta Motriz',
    kicker: 'Exterior · 03',
    text: 'Cuatro turbinas bajo el ala, en dos góndolas. Es la planta motriz que permite rozar Mach 5, el techo de velocidad objetivo de la flota Lucen.',
    specs: [
      ['Motores', '4, en góndolas gemelas'],
      ['Techo objetivo', 'Mach 5'],
    ],
    pin: [-5, -3, 4.7],
    pinNormal: [0.6, 0, 1],
    view: { pos: [3, y(-2.6), 17], look: [-10, y(-3), 4.6] },
  },
  {
    id: 'cola',
    name: 'La Deriva',
    kicker: 'Exterior · 04',
    text: 'Una única deriva vertical sobre una cola cónica. Desde aquí se ven las ocho unidades de la flota, todas con la misma discreción: ninguna lleva nombre en el fuselaje.',
    specs: [
      ['Altura total', '12,2 m'],
      ['Flota', '8 unidades'],
    ],
    pin: [-25.3, 5.4, 0.4],
    pinNormal: [0, 0, 1],
    view: { pos: [-46, y(4), 17], look: [-25, y(3.5), 0] },
  },
  {
    id: 'puerta',
    name: 'Puerta de Cabina',
    kicker: 'Acceso',
    text: 'Acceso directo desde pista, sin pasar por terminal comercial. Cruza el umbral y recorre el interior del avión, zona por zona.',
    specs: [
      ['Acceso', 'Directo a pista'],
      ['Interior', '4 zonas'],
    ],
    pin: [14.5, -0.2, 1.6],
    pinNormal: [0, 0, 1],
    view: { pos: [24, y(0.6), 10], look: [14.5, y(-0.3), 1.4] },
  },
];

export const STATIONS: Station[] = [
  {
    id: 'mando',
    name: 'Cabina de Mando',
    kicker: 'Interior · 01',
    text: 'Dos asientos de piloto, la consola central y el panel original del Concorde. Desde aquí el morro desciende hacia una pista que, a esta velocidad, aparece antes de lo esperado.',
    specs: [
      ['Tripulación', 'Piloto y copiloto fijos'],
      ['Instrumentos', 'Panel original'],
    ],
    pos: [19.2, 4.8, 0],
    yaw: -Math.PI / 2,
  },
  {
    id: 'acceso',
    name: 'Cabina Delantera',
    kicker: 'Interior · 02',
    text: 'La puerta se cierra y el ruido de pista desaparece. Butacas en azul noche, moqueta gruesa y la luz baja de Montclair reciben a quien llega.',
    specs: [
      ['Recepción', 'Tripulación fija'],
      ['Iluminación', 'Cálida, regulable'],
    ],
    pos: [16.9, 4.8, 0],
    yaw: Math.PI / 2,
  },
  {
    id: 'cabina',
    name: 'Cabina Principal',
    kicker: 'Interior · 03',
    text: 'Dos butacas de piel a cada lado del pasillo, la distribución original del Concorde reconstruida con materiales nuevos. Aquí se viaja sin alzar la voz.',
    specs: [
      ['Distribución', '2 + 2'],
      ['Conectividad', 'Wifi satélite sin límite'],
    ],
    pos: [6.7, 4.8, 0],
    yaw: Math.PI / 2,
  },
  {
    id: 'trasera',
    name: 'Cabina Trasera',
    kicker: 'Interior · 04',
    text: 'Menú del equipo culinario de Lumière, embarcado en frío una hora antes del despegue y servido en la butaca. La zona más alejada de las turbinas delanteras.',
    specs: [
      ['Cocina', 'Equipo de Lumière'],
      ['Servicio', 'En butaca'],
    ],
    pos: [-7, 4.8, 0],
    yaw: Math.PI / 2,
  },
];

export const DOOR_VIEW = EXTERIOR_PARTS.find((p) => p.id === 'puerta')!.view;
