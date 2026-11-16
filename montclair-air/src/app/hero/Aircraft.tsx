'use client';

import { useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import Concorde from './ConcordeModel';
import { AIRCRAFT_Y } from './constants';
import { EXTERIOR_PARTS } from './parts';

export type PinElements = Record<string, HTMLElement | null>;

/** Proyecta los marcadores a pantalla y mueve los botones DOM (capa superpuesta). */
function PinTracker({ pinEls }: { pinEls: React.RefObject<PinElements> }) {
  const world = useMemo(() => new THREE.Vector3(), []);
  const toCam = useMemo(() => new THREE.Vector3(), []);
  const normals = useMemo(() => EXTERIOR_PARTS.map((p) => new THREE.Vector3(...p.pinNormal).normalize()), []);

  useFrame(({ camera, size }) => {
    EXTERIOR_PARTS.forEach((part, i) => {
      const el = pinEls.current[part.id];
      if (!el) return;
      world.set(part.pin[0], part.pin[1] + AIRCRAFT_Y, part.pin[2]);
      toCam.copy(camera.position).sub(world);
      const facing = toCam.dot(normals[i]) > 0;
      world.project(camera);
      const visible = facing && world.z < 1 && Math.abs(world.x) < 1.05 && Math.abs(world.y) < 1.05;
      el.style.transform = `translate3d(${((world.x + 1) / 2) * size.width}px, ${((1 - world.y) / 2) * size.height}px, 0) translate(-50%, -50%)`;
      el.style.opacity = visible ? '1' : '0';
      el.style.visibility = visible ? 'visible' : 'hidden';
    });
  });
  return null;
}

export default function Aircraft({ pinEls }: { pinEls: React.RefObject<PinElements> }) {
  return (
    <group>
      <Concorde world="exterior" />
      <PinTracker pinEls={pinEls} />
    </group>
  );
}
