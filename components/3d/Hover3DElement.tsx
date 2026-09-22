'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { WebGLCanvasWrapper } from '@/components/common/WebGLCanvasWrapper';
// @ts-expect-error maath types are missing for this subpath
import * as random from 'maath/random/dist/maath-random.esm';

const ParticleSwarm = () => {
  const ref = useRef<THREE.Points>(null);

  // Generate random points in a sphere with useMemo to avoid recomputing on re-renders
  const sphere = useMemo(() => random.inSphere(new Float32Array(900), { radius: 1.5 }), []);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 12;
      ref.current.rotation.y -= delta / 18;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#D9C7A7"
          size={0.02}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

const HoverFallback: React.FC = () => (
  <div className="absolute inset-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(217,199,167,0.15)_0%,transparent_70%)] pointer-events-none" />
);

export const Hover3DElement: React.FC = () => {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
      <WebGLCanvasWrapper fallback={<HoverFallback />}>
        <Canvas
          camera={{ position: [0, 0, 3] }}
          dpr={[1, 1.5]}
          gl={{
            alpha: true,
            antialias: true,
            powerPreference: 'low-power',
            preserveDrawingBuffer: false,
          }}
        >
          <ambientLight intensity={0.5} />
          <ParticleSwarm />
        </Canvas>
      </WebGLCanvasWrapper>
    </div>
  );
};

Hover3DElement.displayName = 'Hover3DElement';
