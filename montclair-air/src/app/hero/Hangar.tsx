'use client';

import { useLayoutEffect, useMemo } from 'react';
import * as THREE from 'three';
import { Environment, MeshReflectorMaterial, useTexture } from '@react-three/drei';

const HALF_LEN = 85; // medio largo (X)
const HALF_WIDTH = 62; // medio ancho (Z)
const VAULT_SCALE = 0.6; // altura de la bóveda = HALF_WIDTH * VAULT_SCALE

function vaultY(z: number) {
  return HALF_WIDTH * VAULT_SCALE * Math.sqrt(Math.max(1 - (z / HALF_WIDTH) ** 2, 0));
}

function gradientTexture(stops: [number, string][], w = 4, h = 256) {
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  const ctx = c.getContext('2d')!;
  const g = ctx.createLinearGradient(0, 0, 0, h);
  stops.forEach(([o, col]) => g.addColorStop(o, col));
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, h);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

function shadowTexture() {
  const c = document.createElement('canvas');
  c.width = 256;
  c.height = 256;
  const ctx = c.getContext('2d')!;
  const g = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
  g.addColorStop(0, 'rgba(0,0,0,0.85)');
  g.addColorStop(0.55, 'rgba(0,0,0,0.35)');
  g.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 256, 256);
  return new THREE.CanvasTexture(c);
}

const SHELL_Z = [-46, -30, -14, 14, 30, 46];
const ARCH_X = Array.from({ length: 13 }, (_, i) => -78 + i * 13);
const MULLION_X = Array.from({ length: 26 }, (_, i) => -75 + i * 6);

function useFloorTextures() {
  const [map, roughnessMap, normalMap] = useTexture(['/tex/floor_diff.jpg', '/tex/floor_rough.jpg', '/tex/floor_nor.jpg']);
  useLayoutEffect(() => {
    for (const t of [map, roughnessMap, normalMap]) {
      t.wrapS = t.wrapT = THREE.RepeatWrapping;
      t.repeat.set(26, 15);
      t.anisotropy = 8;
      t.needsUpdate = true;
    }
    map.colorSpace = THREE.SRGBColorSpace;
  }, [map, roughnessMap, normalMap]);
  return { map, roughnessMap, normalMap };
}

export default function Hangar({ reflective }: { reflective: boolean }) {
  const floor = useFloorTextures();
  const shellGeo = useMemo(() => {
    const g = new THREE.CylinderGeometry(HALF_WIDTH, HALF_WIDTH, HALF_LEN * 2, 96, 1, true, 0, Math.PI);
    g.rotateZ(Math.PI / 2);
    return g;
  }, []);
  const endGeo = useMemo(() => new THREE.CircleGeometry(HALF_WIDTH, 96, 0, Math.PI), []);
  const dawn = useMemo(
    () =>
      gradientTexture([
        [0, '#1a2740'],
        [0.45, '#5b4a5a'],
        [0.8, '#d49a6a'],
        [1, '#f7dcb4'],
      ]),
    [],
  );
  const shadow = useMemo(() => shadowTexture(), []);

  return (
    <group>
      {/* Luz y reflejos: HDRI fotográfico de estudio (Poly Haven, CC0) */}
      <Environment files="/env/studio_kontrast_01_1k.hdr" environmentIntensity={1.15} environmentRotation={[0, 0.6, 0]} />

      <hemisphereLight args={['#d6deea', '#2a2f38', 0.35]} />
      <directionalLight
        position={[-22, 40, 30]}
        intensity={2.6}
        color="#fff0dc"
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-left={-48}
        shadow-camera-right={48}
        shadow-camera-top={32}
        shadow-camera-bottom={-32}
        shadow-camera-near={5}
        shadow-camera-far={120}
        shadow-bias={-0.0004}
        shadow-normalBias={0.04}
        shadow-radius={5}
      />
      <directionalLight position={[34, 20, -24]} intensity={0.9} color="#9fb8dd" />
      {[-42, -14, 14, 42].map((x) => (
        <pointLight key={x} position={[x, 25, 0]} intensity={1200} color="#ffe9cc" decay={2} />
      ))}

      {/* Suelo de hormigón pulido (PBR, Poly Haven CC0) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[HALF_LEN * 2, HALF_WIDTH * 2]} />
        {reflective ? (
          <MeshReflectorMaterial
            map={floor.map}
            roughnessMap={floor.roughnessMap}
            normalMap={floor.normalMap}
            normalScale={new THREE.Vector2(0.6, 0.6)}
            blur={[260, 80]}
            resolution={768}
            mixBlur={1.1}
            mixStrength={22}
            mixContrast={1.1}
            roughness={1}
            depthScale={1.1}
            minDepthThreshold={0.4}
            maxDepthThreshold={1.4}
            color="#9aa0aa"
            metalness={0.15}
          />
        ) : (
          <meshStandardMaterial {...floor} color="#7a808a" roughness={0.6} metalness={0.2} />
        )}
      </mesh>

      {/* Sombra de contacto del avión */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.03, 0]}>
        <planeGeometry args={[78, 24]} />
        <meshBasicMaterial map={shadow} transparent depthWrite={false} opacity={0.45} />
      </mesh>

      {/* Marcas de suelo: línea de remolque y perímetro de estacionamiento */}
      <group position={[0, 0.045, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <mesh>
          <planeGeometry args={[150, 0.12]} />
          <meshBasicMaterial color="#c9a96e" transparent opacity={0.55} depthWrite={false} />
        </mesh>
        {[-17, 17].map((z) => (
          <mesh key={z} position={[0, z, 0]}>
            <planeGeometry args={[74, 0.08]} />
            <meshBasicMaterial color="#c7d6e8" transparent opacity={0.28} depthWrite={false} />
          </mesh>
        ))}
        {[-37, 37].map((x) => (
          <mesh key={x} position={[x, 0, 0]}>
            <planeGeometry args={[0.08, 34]} />
            <meshBasicMaterial color="#c7d6e8" transparent opacity={0.28} depthWrite={false} />
          </mesh>
        ))}
      </group>

      {/* Bóveda */}
      <group scale={[1, VAULT_SCALE, 1]}>
        <mesh geometry={shellGeo}>
          <meshStandardMaterial color="#3b4351" roughness={0.85} metalness={0.2} side={THREE.BackSide} />
        </mesh>
        {[-1, 1].map((s) => (
          <mesh key={s} geometry={endGeo} position={[s * HALF_LEN, 0, 0]} rotation={[0, s * Math.PI / 2, 0]}>
            <meshStandardMaterial color="#2e3541" roughness={0.9} metalness={0.2} side={THREE.DoubleSide} />
          </mesh>
        ))}
      </group>

      {/* Arcos estructurales */}
      {ARCH_X.map((x) => (
        <mesh key={x} position={[x, 0, 0]} rotation={[0, Math.PI / 2, 0]} scale={[1, VAULT_SCALE, 1]}>
          <torusGeometry args={[HALF_WIDTH - 0.4, 0.45, 8, 96, Math.PI]} />
          <meshStandardMaterial color="#596273" roughness={0.45} metalness={0.7} />
        </mesh>
      ))}

      {/* Líneas de luz en la bóveda */}
      {SHELL_Z.map((z) => {
        const dz = 0.5;
        const tilt = Math.atan2(vaultY(z + dz) - vaultY(z - dz), 2 * dz);
        return (
          <mesh key={z} position={[0, vaultY(z) - 0.6, z]} rotation={[-tilt, 0, 0]}>
            <boxGeometry args={[HALF_LEN * 2 - 6, 0.18, 1.1]} />
            <meshBasicMaterial color={[5, 4.6, 4]} toneMapped={false} />
          </mesh>
        );
      })}

      {/* Fachada acristalada al amanecer */}
      <mesh position={[0, 4.6, -HALF_WIDTH + 1.4]}>
        <planeGeometry args={[HALF_LEN * 2 - 8, 9]} />
        <meshBasicMaterial map={dawn} toneMapped={false} />
      </mesh>
      {MULLION_X.map((x) => (
        <mesh key={x} position={[x, 4.7, -HALF_WIDTH + 1.5]}>
          <boxGeometry args={[0.22, 9.2, 0.3]} />
          <meshStandardMaterial color="#10141b" roughness={0.4} metalness={0.9} />
        </mesh>
      ))}
      <mesh position={[0, 9.2, -HALF_WIDTH + 1.5]}>
        <boxGeometry args={[HALF_LEN * 2 - 8, 0.3, 0.4]} />
        <meshStandardMaterial color="#10141b" roughness={0.4} metalness={0.9} />
      </mesh>

      {/* Luz de zócalo en los laterales */}
      {[-1, 1].map((s) => (
        <mesh key={s} position={[s * (HALF_LEN - 0.6), 0.2, 0]}>
          <boxGeometry args={[0.15, 0.12, HALF_WIDTH * 1.6]} />
          <meshBasicMaterial color="#c7d6e8" toneMapped={false} />
        </mesh>
      ))}
    </group>
  );
}
