'use client';

import React, { useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei';
import { X, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { WebGLCanvasWrapper } from '@/components/common/WebGLCanvasWrapper';

interface ProductViewer3DModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
}

const ProductViewer2DFallback: React.FC<{ productName: string }> = ({ productName }) => (
  <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center bg-[#FAF7F2] select-none">
    <div className="w-44 h-44 rounded-full border border-[#D9C7A7] bg-[#EADFCF] flex flex-col items-center justify-center mb-6 shadow-xl relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(125,33,48,0.15)_0%,transparent_70%)]" />
      <Sparkles className="w-6 h-6 text-[#7D2130] mb-1" />
      <span className="font-hero text-xl text-[#7D2130] font-medium tracking-[0.2em] uppercase">
        ABHI-MOH
      </span>
      <span className="text-[9px] text-[#736357] uppercase tracking-widest mt-1">
        Atelier Master Weave
      </span>
    </div>
    <h3 className="font-hero text-lg text-[#2A221E] uppercase tracking-wider mb-1">
      {productName}
    </h3>
    <p className="font-sans text-xs text-[#736357] tracking-wider max-w-sm leading-relaxed">
      Interactive 3D model rendering is preserved for WebGL-enabled displays. High-resolution gallery photography is available in the product salon.
    </p>
  </div>
);

export const ProductViewer3DModal: React.FC<ProductViewer3DModalProps> = ({
  isOpen,
  onClose,
  productName,
}) => {
  // Escape key handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#2A221E]/80 backdrop-blur-md p-4"
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label={`3D View: ${productName}`}
            className="relative w-[90vw] h-[80vh] max-w-5xl bg-[#EADFCF] rounded-3xl overflow-hidden shadow-2xl border border-[#D9C7A7]"
          >
            <button
              onClick={onClose}
              className="absolute top-5 right-5 z-20 w-11 h-11 flex items-center justify-center rounded-full bg-[#FAF7F2] text-[#4A3B32] hover:bg-[#7D2130] hover:text-white transition-colors duration-300 shadow-md cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7D2130]"
              aria-label="Close 3D modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="absolute top-6 left-8 z-10 pointer-events-none">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#7D2130] font-semibold block">
                Atelier 3D Dimensional View
              </span>
              <h2 className="font-hero text-xl sm:text-2xl text-[#382C26] uppercase">
                {productName}
              </h2>
            </div>

            <div className="w-full h-full cursor-grab active:cursor-grabbing">
              <WebGLCanvasWrapper fallback={<ProductViewer2DFallback productName={productName} />}>
                <Canvas
                  camera={{ position: [0, 0, 5], fov: 45 }}
                  dpr={[1, 1.5]}
                  gl={{
                    alpha: true,
                    antialias: true,
                    powerPreference: 'low-power',
                    preserveDrawingBuffer: false,
                  }}
                >
                  <ambientLight intensity={0.7} />
                  <spotLight
                    position={[10, 10, 10]}
                    angle={0.15}
                    penumbra={1}
                    intensity={1}
                    castShadow
                  />

                  <mesh position={[0, 0, 0]} castShadow>
                    <torusKnotGeometry args={[1, 0.3, 128, 32]} />
                    <meshPhysicalMaterial
                      color="#D9C7A7"
                      metalness={0.7}
                      roughness={0.2}
                      clearcoat={1}
                      clearcoatRoughness={0.1}
                    />
                  </mesh>

                  <ContactShadows position={[0, -1.5, 0]} opacity={0.4} scale={10} blur={2} far={4} />
                  <Environment preset="studio" />
                  <OrbitControls autoRotate autoRotateSpeed={1.5} enableZoom={true} enablePan={false} />
                </Canvas>
              </WebGLCanvasWrapper>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

ProductViewer3DModal.displayName = 'ProductViewer3DModal';
