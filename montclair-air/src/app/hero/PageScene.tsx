'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Bloom, EffectComposer, ToneMapping, Vignette } from '@react-three/postprocessing';
import { ToneMappingMode } from 'postprocessing';
import Hangar from './Hangar';
import Aircraft, { type PinElements } from './Aircraft';
import Interior from './Interior';
import { ease, locate, resolvePose, type Layout, type Pose, type World } from './shots';
import type { Vec3 } from './parts';

export interface FocusView {
  pos: Vec3;
  look: Vec3;
}

export interface PageSceneProps {
  world: World;
  layout: React.RefObject<Layout>;
  focus: React.RefObject<FocusView | null>;
  pinEls: React.RefObject<PinElements>;
  reduced: boolean;
  lowQuality: boolean;
  /** Solo la primera carga hace el vuelo de entrada; al cambiar de mundo la cámara salta. */
  intro: boolean;
  onReady?: () => void;
}

const START: Vec3 = [-52, 8, 56];
const TAU = Math.PI * 2;

const wrapAngle = (a: number) => a - TAU * Math.round(a / TAU);

function blend(a: Pose, b: Pose, t: number): Pose {
  if (a.world === 'exterior' && b.world === 'exterior') {
    return {
      world: 'exterior',
      pos: a.pos.map((v, k) => v + (b.pos[k] - v) * t) as Vec3,
      look: a.look.map((v, k) => v + (b.look[k] - v) * t) as Vec3,
    };
  }
  if (a.world === 'interior' && b.world === 'interior') {
    return {
      world: 'interior',
      pos: a.pos.map((v, k) => v + (b.pos[k] - v) * t) as Vec3,
      yaw: a.yaw + wrapAngle(b.yaw - a.yaw) * t,
      pitch: a.pitch + (b.pitch - a.pitch) * t,
    };
  }
  return a;
}

/** Cámara dirigida por el scroll, con una desviación que el usuario controla arrastrando. */
function ScrollRig({ world, layout, focus, reduced, intro }: Pick<PageSceneProps, 'world' | 'layout' | 'focus' | 'reduced' | 'intro'>) {
  const camera = useThree((s) => s.camera) as THREE.PerspectiveCamera;
  const gl = useThree((s) => s.gl);
  const portrait = useThree((s) => s.size.width / s.size.height < 0.8);
  const st = useRef({
    pos: new THREE.Vector3(),
    look: new THREE.Vector3(),
    yaw: 0,
    pitch: 0,
    ready: false,
    offYaw: 0,
    offPitch: 0,
    drag: null as null | { id: number; x: number; y: number },
  });
  const tmp = useRef({ pos: new THREE.Vector3(), look: new THREE.Vector3(), v: new THREE.Vector3() });

  useEffect(() => {
    camera.fov = world === 'interior' ? 68 : portrait ? 55 : 38;
    camera.near = world === 'interior' ? 0.1 : 0.6;
    camera.far = 300;
    camera.rotation.order = world === 'interior' ? 'YXZ' : 'XYZ';
    camera.updateProjectionMatrix();
  }, [camera, world, portrait]);

  useEffect(() => {
    const s = st.current;
    const el = gl.domElement;
    // Los gestos verticales siguen desplazando la página; los horizontales miran.
    el.style.touchAction = 'pan-y';
    const down = (e: PointerEvent) => {
      s.drag = { id: e.pointerId, x: e.clientX, y: e.clientY };
      el.setPointerCapture(e.pointerId);
    };
    const move = (e: PointerEvent) => {
      if (!s.drag || s.drag.id !== e.pointerId) return;
      const sign = world === 'interior' ? 1 : -1;
      const limit = world === 'interior' ? Math.PI : 1.4;
      s.offYaw = THREE.MathUtils.clamp(s.offYaw + sign * (e.clientX - s.drag.x) * 0.004, -limit, limit);
      s.offPitch = THREE.MathUtils.clamp(s.offPitch - sign * (e.clientY - s.drag.y) * 0.003, -0.6, 0.6);
      s.drag.x = e.clientX;
      s.drag.y = e.clientY;
    };
    const up = (e: PointerEvent) => {
      if (s.drag?.id === e.pointerId) s.drag = null;
    };
    el.addEventListener('pointerdown', down);
    el.addEventListener('pointermove', move);
    el.addEventListener('pointerup', up);
    el.addEventListener('pointercancel', up);
    return () => {
      el.removeEventListener('pointerdown', down);
      el.removeEventListener('pointermove', move);
      el.removeEventListener('pointerup', up);
      el.removeEventListener('pointercancel', up);
    };
  }, [gl, world]);

  useFrame(({ clock }, dtRaw) => {
    const lay = layout.current;
    if (!lay || lay.ids.length === 0) return;
    const s = st.current;
    const t = tmp.current;
    const dt = Math.min(dtRaw, 0.1);

    const { i, j, u } = locate(lay, window.scrollY + window.innerHeight / 2);
    const pa = resolvePose(lay.ids[i], portrait);
    const pb = resolvePose(lay.ids[j], portrait);
    let target: Pose | null = null;
    if (pa.world === world && pb.world === world) target = blend(pa, pb, ease(u));
    else if (pa.world === world) target = pa;
    else if (pb.world === world) target = pb;

    const f = focus.current;
    if (world === 'exterior' && f) target = { world: 'exterior', pos: f.pos, look: f.look };
    if (!target) return;

    const first = !s.ready;
    const snap = reduced || (first && !(intro && world === 'exterior'));
    const k = 3.2;
    const damp = (a: number, b: number) => (snap ? b : THREE.MathUtils.damp(a, b, k, dt));

    if (target.world === 'exterior') {
      if (first) {
        s.pos.copy(snap ? t.pos.set(...target.pos) : camera.position);
        s.look.set(...target.look);
      }
      s.pos.set(damp(s.pos.x, target.pos[0]), damp(s.pos.y, target.pos[1]), damp(s.pos.z, target.pos[2]));
      s.look.set(damp(s.look.x, target.look[0]), damp(s.look.y, target.look[1]), damp(s.look.z, target.look[2]));
      // Desviación orbital controlada por el usuario, alrededor del punto de mira.
      const v = t.v.copy(s.pos).sub(s.look);
      const r = v.length();
      const az = Math.atan2(v.x, v.z) + s.offYaw;
      const el = THREE.MathUtils.clamp(Math.asin(v.y / r) + s.offPitch, 0.02, 1.2);
      camera.position.set(s.look.x + r * Math.cos(el) * Math.sin(az), Math.max(s.look.y + r * Math.sin(el), 0.6), s.look.z + r * Math.cos(el) * Math.cos(az));
      camera.lookAt(s.look);
    } else {
      if (first) {
        s.pos.set(...target.pos);
        s.yaw = target.yaw;
        s.pitch = target.pitch;
      }
      s.pos.set(damp(s.pos.x, target.pos[0]), damp(s.pos.y, target.pos[1]), damp(s.pos.z, target.pos[2]));
      s.yaw = damp(s.yaw, s.yaw + wrapAngle(target.yaw - s.yaw));
      s.pitch = damp(s.pitch, target.pitch);
      const sway = reduced ? 0 : Math.sin(clock.elapsedTime * 0.6) * 0.004;
      camera.position.copy(s.pos);
      camera.rotation.set(s.pitch + s.offPitch + sway, s.yaw + s.offYaw, 0, 'YXZ');
    }
    s.ready = true;

    if (!s.drag) {
      s.offYaw = THREE.MathUtils.damp(s.offYaw, 0, 0.7, dt);
      s.offPitch = THREE.MathUtils.damp(s.offPitch, 0, 0.7, dt);
    }
  });

  return null;
}

/** El tone mapping lo hace el composer en calidad alta; en baja lo hace el renderer. */
function Tone({ composer }: { composer: boolean }) {
  const gl = useThree((s) => s.gl);
  useEffect(() => {
    gl.toneMapping = composer ? THREE.NoToneMapping : THREE.ACESFilmicToneMapping;
    gl.toneMappingExposure = 1;
  }, [gl, composer]);
  return null;
}

export default function PageScene({ world, layout, focus, pinEls, reduced, lowQuality, intro, onReady }: PageSceneProps) {
  const exterior = world === 'exterior';
  return (
    <Canvas
      onCreated={() => onReady?.()}
      dpr={[1, lowQuality ? 1.25 : 1.75]}
      shadows
      gl={{ antialias: lowQuality, powerPreference: 'high-performance' }}
      camera={{ fov: 38, near: 0.6, far: 300, position: START }}
    >
      <color attach="background" args={[exterior ? '#090c12' : '#07080b']} />
      <fog attach="fog" args={exterior ? ['#0b0f16', 70, 190] : ['#07080b', 18, 46]} />
      {exterior ? (
        <>
          <Hangar reflective={!lowQuality} />
          <Aircraft pinEls={pinEls} />
        </>
      ) : (
        <Interior />
      )}
      <Tone composer={!lowQuality} />
      {!lowQuality && (
        <EffectComposer multisampling={4} enableNormalPass={false}>
          <Bloom intensity={exterior ? 0.55 : 0.7} luminanceThreshold={1} luminanceSmoothing={0.2} mipmapBlur />
          <ToneMapping mode={ToneMappingMode.ACES_FILMIC} />
          <Vignette offset={0.28} darkness={0.6} />
        </EffectComposer>
      )}
      <ScrollRig key={world} world={world} layout={layout} focus={focus} reduced={reduced} intro={intro} />
    </Canvas>
  );
}
