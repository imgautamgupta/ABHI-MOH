'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { motion } from 'framer-motion';
import * as THREE from 'three';

const SilkSimulationMesh = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  const silkGeo = useMemo(() => {
    const geo = new THREE.PlaneGeometry(12, 6, 40, 20);
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const z = Math.sin(x * 0.7) * 0.5 + Math.cos(y * 0.9) * 0.3;
      pos.setZ(i, z);
    }
    geo.computeVertexNormals();
    return geo;
  }, []);

  const silkMat = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: '#5E0006', // ABHI-MOH Deep Wine Burgundy Silk
    roughness: 0.35,
    metalness: 0.2,
    clearcoat: 0.7,
    sheen: 1.0,
    sheenColor: new THREE.Color('#C7A66A'), // Antique Gold sheen
    sheenRoughness: 0.25,
    side: THREE.DoubleSide,
  }), []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime * 0.35;

    meshRef.current.rotation.x = -0.15 + Math.sin(t * 0.4) * 0.05;
    meshRef.current.rotation.y = 0.1 + Math.cos(t * 0.3) * 0.08;
    meshRef.current.position.y = Math.sin(t * 0.5) * 0.12;
  });

  return (
    <mesh ref={meshRef} geometry={silkGeo} material={silkMat} position={[0, 0, -1]} rotation={[-0.2, 0, 0]} />
  );
};

import { WebGLCanvasWrapper } from '@/components/common/WebGLCanvasWrapper';

const LookbookFallbackWave: React.FC = () => (
  <div className="absolute inset-0 pointer-events-none opacity-40 flex items-center justify-center">
    <svg viewBox="0 0 1200 400" className="w-full h-full object-cover filter blur-[2px]">
      <path d="M 0,150 C 300,90 600,210 900,120 C 1050,75 1150,180 1200,150 L 1200,400 L 0,400 Z" fill="url(#lbSilkGrad)" />
      <defs>
        <linearGradient id="lbSilkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#5E0006" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#C7A66A" stopOpacity="0.4" />
        </linearGradient>
      </defs>
    </svg>
  </div>
);

export const LookbookSilkCanvas: React.FC = () => {
  return (
    <section className="relative w-full h-[65vh] lg:h-[80vh] bg-[#2A090D] overflow-hidden flex flex-col items-center justify-center text-center font-satoshi select-none">
      {/* 3D CANVAS WITH WEBGL FALLBACK */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <WebGLCanvasWrapper fallback={<LookbookFallbackWave />}>
          <Canvas camera={{ position: [0, 0, 4.5], fov: 42 }} gl={{ alpha: true, antialias: true }}>
            <ambientLight intensity={0.6} color="#5E0006" />
            <spotLight position={[3, 5, 4]} intensity={2.5} color="#FFF5E6" />
            <spotLight position={[-4, 3, -2]} intensity={2.0} color="#C7A66A" />
            <SilkSimulationMesh />
          </Canvas>
        </WebGLCanvasWrapper>
      </div>

      {/* OVERLAY EDITORIAL STATEMENT */}
      <div className="relative z-10 max-w-xl mx-auto px-6 text-[#F1E4CF]">
        <span className="text-[10px] uppercase tracking-[0.35em] text-[#C7A66A] font-semibold block mb-3">
          ATMOSPHERIC TACTILITY
        </span>
        <h2 className="font-hero text-3xl sm:text-5xl uppercase tracking-[0.1em] leading-tight mb-4">
          The Fluidity of <span className="italic font-normal text-[#C7A66A]">Pure Katan</span>
        </h2>
        <p className="font-sans text-xs sm:text-sm font-light text-[#F1E4CF]/80 tracking-wide leading-relaxed">
          Woven thread by thread, ABHI-MOH silk carries the memory of artisan hands and the fluid poetry of ancient looms.
        </p>
      </div>
    </section>
  );
};

LookbookSilkCanvas.displayName = 'LookbookSilkCanvas';
