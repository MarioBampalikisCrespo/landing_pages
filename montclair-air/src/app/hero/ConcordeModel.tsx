'use client';

import { useMemo } from 'react';
import * as THREE from 'three';
import { useGLTF } from '@react-three/drei';
import type { World } from './shots';

/**
 * «Concorde free with interior» de taeemtasbi (Sketchfab), CC BY 4.0.
 * https://sketchfab.com/3d-models/concorde-free-with-interior-c0226f9f1a68438d939968d58e42f4de
 *
 * Unidades del modelo: 856 de largo para ~62 m. Morro hacia -X, eje de simetría en z=40,
 * suelo (ruedas) en y=-30. Se coloca con el morro en +X y centrado en el origen.
 */
export const MODEL_URL = '/models/concorde_free_with_interior.glb';
const SCALE = 62 / 856;

// Mallas del archivo (Object_N) que forman el casco exterior blanco y la librea.
const PAINT_BLACK = new Set([6, 14, 15, 16, 20, 21, 22]);
// Góndolas de motor y estructura del tren.
const ENGINE_METAL = new Set([23, 24, 29]);
const GLASS = new Set([5, 25]);
const SEAT = new Set([31, 32, 33, 34, 35, 36, 37, 38]);

function meshIndex(o: THREE.Object3D) {
  return Number(o.name.replace('Object_', ''));
}

function repaint(root: THREE.Object3D, world: World) {
  const cache = new Map<string, THREE.Material>();
  const get = (key: string, make: () => THREE.Material) => {
    let m = cache.get(key);
    if (!m) cache.set(key, (m = make()));
    return m;
  };

  root.traverse((o) => {
    const mesh = o as THREE.Mesh;
    if (!mesh.isMesh) return;
    const i = meshIndex(o);
    const old = mesh.material as THREE.MeshStandardMaterial;
    mesh.castShadow = world === 'exterior';
    mesh.receiveShadow = !PAINT_BLACK.has(i);

    if (PAINT_BLACK.has(i)) {
      mesh.material =
        world === 'exterior'
          ? get('paint', () =>
              new THREE.MeshPhysicalMaterial({
                color: '#0b0c10',
                metalness: 0.6,
                roughness: 0.34,
                clearcoat: 1,
                clearcoatRoughness: 0.12,
                side: THREE.DoubleSide,
              }),
            )
          : get('lining', () => new THREE.MeshStandardMaterial({ color: '#d6cdbd', roughness: 0.85, side: THREE.DoubleSide }));
    } else if (ENGINE_METAL.has(i)) {
      mesh.material = get('engine', () => new THREE.MeshStandardMaterial({ color: '#15171c', metalness: 0.85, roughness: 0.38, side: THREE.DoubleSide }));
    } else if (GLASS.has(i)) {
      mesh.material = get('glass', () =>
        new THREE.MeshPhysicalMaterial({
          color: '#0a1018',
          metalness: 0.2,
          roughness: 0.04,
          transparent: true,
          opacity: world === 'exterior' ? 0.55 : 0.22,
          side: THREE.DoubleSide,
          depthWrite: false,
        }),
      );
    } else if (SEAT.has(i)) {
      mesh.material = get('seat', () => new THREE.MeshStandardMaterial({ color: '#2b3b6e', roughness: 0.5, metalness: 0.05, side: THREE.DoubleSide }));
    } else {
      // Resto (revestimientos, moqueta, detalles): se conservan, con un tono más cálido y mate.
      const m = old.clone();
      if (m.color) m.color.multiply(new THREE.Color(1, 0.95, 0.86));
      m.roughness = 0.75;
      m.metalness = 0;
      m.side = THREE.DoubleSide;
      mesh.material = m;
    }
  });
}

export default function Concorde({ world }: { world: World }) {
  const { scene } = useGLTF(MODEL_URL);
  const root = useMemo(() => {
    const c = scene.clone(true);
    repaint(c, world);
    return c;
  }, [scene, world]);

  return (
    <group scale={SCALE} rotation={[0, Math.PI, 0]}>
      <group position={[-153, 30, -40]}>
        <primitive object={root} />
      </group>
    </group>
  );
}

useGLTF.preload(MODEL_URL);
