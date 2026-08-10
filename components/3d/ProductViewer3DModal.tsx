'use client';

import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ProductViewer3DModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
}

import { WebGLCanvasWrapper } from '@/components/common/WebGLCanvasWrapper';

const ProductViewer2DFallback: React.FC = () => (
  <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center bg-[#FAF7F2]">
    <div className="w-48 h-48 rounded-full border border-[#D9C7A7] bg-[#EADFCF] flex items-center justify-center mb-4 shadow-xl">
      <span className="font-hero text-lg text-[#7D2130]">ABHI-MOH</span>
    </div>
    <p className="font-sans text-xs text-[#736357] uppercase tracking-widest">Atelier 3D Interactive View (Preview Mode)</p>
  </div>
);

export const ProductViewer3DModal: React.FC<ProductViewer3DModalProps> = ({ isOpen, onClose, productName }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#FAF7F2]/90 backdrop-blur-md"
        >
          <div className="relative w-[90vw] h-[80vh] max-w-6xl bg-[#EADFCF] rounded-3xl overflow-hidden shadow-2xl border border-[#D9C7A7]">
            <button
              onClick={onClose}
              className="absolute top-6 right-6 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-[#FAF7F2] text-[#4A3B32] hover:bg-[#7D2130] hover:text-white transition-colors duration-300 shadow-md"
            >
              <X className="w-6 h-6" />
            </button>
            
            <div className="absolute top-6 left-8 z-10">
              <h2 className="font-hero text-2xl text-[#382C26]">{productName}</h2>
              <p className="font-sans text-sm text-[#736357]">3D Interactive View</p>
            </div>

            <div className="w-full h-full cursor-grab active:cursor-grabbing">
              <WebGLCanvasWrapper fallback={<ProductViewer2DFallback />}>
                <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
                  <ambientLight intensity={0.7} />
                  <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
                  
                  {/* Abstract geometric representation for now */}
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
                  <OrbitControls autoRotate autoRotateSpeed={2} enableZoom={true} enablePan={false} />
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
