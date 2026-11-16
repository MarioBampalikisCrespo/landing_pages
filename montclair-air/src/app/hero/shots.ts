import { OVERVIEW, OVERVIEW_PORTRAIT, STATIONS, DOOR_VIEW, type Vec3 } from './parts';

/**
 * Cada sección de la página (`data-shot="id"`) es una toma de cámara. La cámara
 * interpola entre las tomas según el scroll; las tomas interiores y exteriores
 * viven en mundos distintos y se cambian con una cortinilla.
 */
export type World = 'exterior' | 'interior';

export interface ExteriorPose {
  world: 'exterior';
  pos: Vec3;
  look: Vec3;
}

export interface InteriorPose {
  world: 'interior';
  pos: Vec3;
  yaw: number;
  pitch: number;
}

export type Pose = ExteriorPose | InteriorPose;

const ext = (pos: Vec3, look: Vec3): ExteriorPose => ({ world: 'exterior', pos, look });

const interior: Record<string, InteriorPose> = Object.fromEntries(
  STATIONS.map((s) => [s.id, { world: 'interior', pos: s.pos, yaw: s.yaw, pitch: s.pitch ?? 0 } as InteriorPose]),
);

const POSES: Record<string, Pose> = {
  hero: ext(OVERVIEW.pos, OVERVIEW.look),
  filosofia: ext([46, 5.6, 15], [22, 4.4, 0]),
  flota: ext([6, 13, 46], [-8, 3.2, 4]),
  unidades: ext([-46, 7, 22], [-24, -1, 0]),
  puerta: ext(DOOR_VIEW.pos, [12.5, 4.4, 1.4]),
  ...interior,
  servicios: { world: 'interior', pos: [-13.5, 4.8, 0], yaw: -Math.PI / 2, pitch: 0 },
  rutas: ext([32, 9, 36], [20, 4, 0]),
  testimonio: ext([60, 4, 6], [28, 4.6, 0]),
  reserva: ext([-10, 14, 50], [0, 1, 0]),
  contacto: ext([12, 12, 52], [0, 2, 0]),
};

export function resolvePose(id: string, portrait: boolean): Pose {
  if (id === 'hero' && portrait) return ext(OVERVIEW_PORTRAIT.pos, OVERVIEW_PORTRAIT.look);
  const pose = POSES[id] ?? POSES.hero;
  if (!portrait) return pose;
  // En vertical los paneles ocupan la parte baja: el encuadre sube el avión a la mitad superior.
  if (pose.world === 'exterior') return ext(pose.pos, [pose.look[0], pose.look[1] - 6, pose.look[2]]);
  return { ...pose, pitch: pose.pitch - 0.25 };
}

export function worldOf(id: string): World {
  return (POSES[id] ?? POSES.hero).world;
}

export interface Layout {
  ids: string[];
  /** Centro vertical de cada toma en coordenadas de página. */
  mids: number[];
}

/** Dónde está la vista entre dos tomas consecutivas: i → j con progreso u (0..1). */
export function locate(layout: Layout, y: number) {
  const { mids } = layout;
  const n = mids.length;
  if (n === 0 || y <= mids[0]) return { i: 0, j: 0, u: 0 };
  if (y >= mids[n - 1]) return { i: n - 1, j: n - 1, u: 0 };
  let i = 0;
  while (i < n - 2 && y >= mids[i + 1]) i++;
  return { i, j: i + 1, u: (y - mids[i]) / (mids[i + 1] - mids[i]) };
}

/** La cámara se queda quieta en cada toma y se mueve en el tramo central. */
export function ease(u: number) {
  const t = Math.min(1, Math.max(0, (u - 0.18) / 0.64));
  return t * t * (3 - 2 * t);
}
