'use client';

import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const SilkRibbonMesh = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  // Flowing silk ribbon plane geometry with sine wave deform
  const ribbonGeo = useMemo(() => {
    const geo = new THREE.PlaneGeometry(10, 4, 32, 16);
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const z = Math.sin(x * 0.8) * 0.4 + Math.cos(y * 1.2) * 0.25;
      pos.setZ(i, z);
    }
    geo.computeVertexNormals();
    return geo;
  }, []);

  const silkMat = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: '#7D2130',
    roughness: 0.45,
    metalness: 0.15,
    clearcoat: 0.5,
    sheen: 1.0,
    sheenColor: new THREE.Color('#D9C7A7'),
    sheenRoughness: 0.3,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.45,
  }), []);

  // Clean geometry & material on unmount
  useEffect(() => {
    return () => {
      ribbonGeo.dispose();
      silkMat.dispose();
    };
  }, [ribbonGeo, silkMat]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime * 0.35;

    // Subtle gentle wave motion
    meshRef.current.rotation.x = Math.sin(t * 0.5) * 0.08;
    meshRef.current.rotation.y = Math.cos(t * 0.4) * 0.12;
    meshRef.current.position.y = Math.sin(t * 0.6) * 0.15;
  });

  return (
    <mesh ref={meshRef} geometry={ribbonGeo} material={silkMat} position={[0, 0, -2]} rotation={[-0.2, 0.1, -0.05]} />
  );
};

import { WebGLCanvasWrapper } from '@/components/common/WebGLCanvasWrapper';

const SvgFallback = () => (
  <div className="absolute inset-0 z-0 opacity-40 animate-silk-wave flex items-center justify-center">
    <svg
      viewBox="0 0 1200 400"
      className="w-full h-full object-cover filter blur-[2px]"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M 0,150 C 300,90 600,210 900,120 C 1050,75 1150,180 1200,150 L 1200,400 L 0,400 Z"
        fill="url(#wineSilkGrad)"
      />
      <defs>
        <linearGradient id="wineSilkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#7D2130" stopOpacity="0.25" />
          <stop offset="50%" stopColor="#D9C7A7" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#5E1522" stopOpacity="0.3" />
        </linearGradient>
      </defs>
    </svg>
  </div>
);

export const HeroSilkCanvas: React.FC = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const timer = setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 60);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 w-full h-full min-h-[300px]">
      <WebGLCanvasWrapper fallback={<SvgFallback />}>
        {isMounted && (
          <div className="absolute inset-0 z-10 opacity-60">
            <Canvas
              camera={{ position: [0, 0, 4.5], fov: 45 }}
              gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
              onCreated={({ gl }) => {
                gl.setClearColor(0x000000, 0);
              }}
            >
              <ambientLight intensity={0.8} color="#FAF7F2" />
              <directionalLight position={[4, 5, 4]} intensity={1.5} color="#D9C7A7" />
              <pointLight position={[-4, -3, 2]} intensity={0.8} color="#7D2130" />
              <SilkRibbonMesh />
            </Canvas>
          </div>
        )}
      </WebGLCanvasWrapper>
    </div>
  );
};

HeroSilkCanvas.displayName = 'HeroSilkCanvas';

