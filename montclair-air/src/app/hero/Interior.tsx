'use client';

import { Environment, Lightformer } from '@react-three/drei';
import Concorde from './ConcordeModel';

/** Luces de cabina a lo largo del pasillo (coordenadas de mundo; eje en z=0, techo ~ y=6). */
const LIGHTS: { x: number; color: string; intensity: number }[] = [
  { x: 24, color: '#a5c8ff', intensity: 30 },
  { x: 17, color: '#ffd7a3', intensity: 30 },
  { x: 10, color: '#ffd7a3', intensity: 30 },
  { x: 3, color: '#ffd7a3', intensity: 30 },
  { x: -4, color: '#ffd7a3', intensity: 30 },
  { x: -11, color: '#ffc994', intensity: 30 },
  { x: -18, color: '#ffe6c4', intensity: 30 },
];

export default function Interior() {
  return (
    <group>
      <Environment resolution={64} frames={1} environmentIntensity={0.9}>
        <Lightformer form="rect" intensity={1.4} color="#ffe2b8" position={[0, 3, 0]} rotation={[Math.PI / 2, 0, 0]} scale={[8, 3, 1]} />
        <Lightformer form="rect" intensity={0.7} color="#ffd7a3" position={[0, 0, 4]} scale={[8, 2, 1]} />
        <Lightformer form="rect" intensity={0.7} color="#ffd7a3" position={[0, 0, -4]} rotation={[0, Math.PI, 0]} scale={[8, 2, 1]} />
      </Environment>
      <hemisphereLight args={['#fff1dd', '#6a5844', 1.1]} />
      {LIGHTS.map((l) => (
        <pointLight key={l.x} position={[l.x, 5.1, 0]} color={l.color} intensity={l.intensity} distance={14} decay={1.4} />
      ))}
      <Concorde world="interior" />
    </group>
  );
}
