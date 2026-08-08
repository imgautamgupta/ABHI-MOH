'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { SAREE_SLIDES, SAREE_TRANSITION_INTERVAL } from './hero.constants';
import { SAREE_CROSS_DISSOLVE } from './hero.animations';
import { HeroVideo } from './HeroVideo';

export const FashionStage: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [useVideo, setUseVideo] = useState(false);

  // Auto-switch saree every 7 seconds
  useEffect(() => {
    if (useVideo || SAREE_SLIDES.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % SAREE_SLIDES.length);
    }, SAREE_TRANSITION_INTERVAL);

    return () => clearInterval(interval);
  }, [useVideo]);

  const currentSaree = SAREE_SLIDES[currentIndex];

  return (
    <div className="relative w-full h-[550px] sm:h-[650px] lg:h-[820px] bg-[#FAF7F2] flex items-center justify-center overflow-hidden font-satoshi select-none">
      {/* 1. Warm Radial Spotlight (Top Center) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] lg:w-[900px] h-[500px] lg:h-[700px] bg-[radial-gradient(circle_at_50%_10%,rgba(194,159,98,0.18)_0%,rgba(250,247,242,0)_70%)] pointer-events-none z-0" />

      {/* 2. Secondary Soft Maroon Warmth Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[400px] lg:w-[600px] h-[300px] bg-[radial-gradient(circle_at_50%_50%,rgba(122,28,40,0.08)_0%,transparent_80%)] pointer-events-none z-0" />

      {/* 3. Stage Platform / Soft Floor Reflection Gradient */}
      <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-[#FAF7F2] via-[#FAF7F2]/80 to-transparent z-20 pointer-events-none" />

      {/* Video Loop (if user places video in public/videos/hero/) */}
      {useVideo ? (
        <div className="relative z-10 w-full h-full">
          <HeroVideo onError={() => setUseVideo(false)} />
        </div>
      ) : (
        /* FIXED STAGE CONTAINER WITH SILK CROSS-DISSOLVE */
        <div className="relative z-10 w-full h-full max-w-[500px] max-h-[750px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSaree.id}
              variants={SAREE_CROSS_DISSOLVE}
              initial="initial"
              animate="animate"
              exit="exit"
              className="relative w-full h-full flex items-center justify-center"
            >
              <Image
                src={currentSaree.imageSrc}
                alt={currentSaree.alt}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-contain object-center drop-shadow-[0_15px_30px_rgba(42,34,30,0.15)] pointer-events-none"
              />
            </motion.div>
          </AnimatePresence>

          {/* Minimal Saree Title Tag (Subtle luxury indicator) */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 text-center flex flex-col items-center gap-1 opacity-95 bg-[#FFFDFC]/90 backdrop-blur-md px-5 py-2.5 rounded-2xl border border-[#E8DFD5] shadow-xs">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#7A1C28] font-medium">
              {currentSaree.colorName}
            </span>
            <span className="font-section text-xs italic text-[#2A221E] tracking-wider">
              {currentSaree.title}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

FashionStage.displayName = 'FashionStage';
