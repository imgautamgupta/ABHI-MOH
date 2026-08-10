'use client';

import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { WebGLCanvasWrapper } from '@/components/common/WebGLCanvasWrapper';

const OurStorySilkMesh = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  const ribbonGeo = useMemo(() => {
    const geo = new THREE.PlaneGeometry(12, 5, 24, 12);
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const z = Math.sin(x * 0.6) * 0.4 + Math.cos(y * 1.0) * 0.2;
      pos.setZ(i, z);
    }
    geo.computeVertexNormals();
    return geo;
  }, []);

  const silkMat = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: '#4A1C24',
    roughness: 0.4,
    metalness: 0.2,
    clearcoat: 0.6,
    sheen: 1.0,
    sheenColor: new THREE.Color('#E5C388'),
    sheenRoughness: 0.25,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.35,
  }), []);

  useEffect(() => {
    return () => {
      ribbonGeo.dispose();
      silkMat.dispose();
    };
  }, [ribbonGeo, silkMat]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime * 0.25;

    meshRef.current.rotation.x = Math.sin(t * 0.4) * 0.06;
    meshRef.current.rotation.y = Math.cos(t * 0.3) * 0.08;
    meshRef.current.position.y = Math.sin(t * 0.5) * 0.1;
  });

  return (
    <mesh ref={meshRef} geometry={ribbonGeo} material={silkMat} position={[0, 0, -2]} rotation={[-0.15, 0.05, -0.02]} />
  );
};

const FallbackSilkWave: React.FC = () => (
  <div className="absolute inset-0 pointer-events-none opacity-30 flex items-center justify-center overflow-hidden">
    <svg
      viewBox="0 0 1200 500"
      className="w-full h-full object-cover filter blur-[3px]"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M 0,200 C 350,110 700,280 1000,160 C 1120,110 1180,210 1200,180 L 1200,500 L 0,500 Z"
        fill="url(#ourStorySilkGrad)"
      />
      <defs>
        <linearGradient id="ourStorySilkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6A3438" stopOpacity="0.3" />
          <stop offset="50%" stopColor="#E5C388" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#2B171A" stopOpacity="0.35" />
        </linearGradient>
      </defs>
    </svg>
  </div>
);

export const OurStorySilkCanvas: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 w-full h-full">
      <WebGLCanvasWrapper fallback={<FallbackSilkWave />}>
        <div className="absolute inset-0 z-10 opacity-50">
          <Canvas
            camera={{ position: [0, 0, 4.5], fov: 45 }}
            gl={{ alpha: true, antialias: true, powerPreference: 'low-power' }}
            onCreated={({ gl }) => {
              gl.setClearColor(0x000000, 0);
            }}
          >
            <ambientLight intensity={0.7} color="#2B171A" />
            <directionalLight position={[4, 5, 4]} intensity={1.4} color="#E5C388" />
            <pointLight position={[-4, -3, 2]} intensity={0.8} color="#6A3438" />
            <OurStorySilkMesh />
          </Canvas>
        </div>
      </WebGLCanvasWrapper>
    </div>
  );
};

OurStorySilkCanvas.displayName = 'OurStorySilkCanvas';
