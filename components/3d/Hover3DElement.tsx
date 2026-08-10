'use client';

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
// @ts-expect-error maath types are missing for this subpath
import * as random from 'maath/random/dist/maath-random.esm';

const ParticleSwarm = () => {
  const ref = useRef<THREE.Points>(null);
  
  // Generate random points in a sphere
  const sphere = random.inSphere(new Float32Array(1500), { radius: 1.5 });

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
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

export const Hover3DElement: React.FC = () => {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
      <Canvas camera={{ position: [0, 0, 3] }}>
        <ambientLight intensity={0.5} />
        <ParticleSwarm />
      </Canvas>
    </div>
  );
};

Hover3DElement.displayName = 'Hover3DElement';
