'use client';

import React from 'react';
import { motion } from 'framer-motion';

export const LookbookHero: React.FC = () => {
  return (
    <section className="relative w-full pt-28 pb-16 lg:pt-36 lg:pb-24 px-6 sm:px-12 flex flex-col items-center justify-center text-center font-satoshi overflow-hidden">
      {/* Low-opacity silk texture background */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none opacity-20 mix-blend-multiply"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[450px] bg-[radial-gradient(ellipse_at_center,rgba(217,199,167,0.25)_0%,transparent_70%)] pointer-events-none z-0" />

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
        className="relative z-10 max-w-4xl mx-auto flex flex-col items-center"
      >
        <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.35em] text-[#7D2130] bg-[#FAF7F2]/90 px-4 py-1 rounded-full border border-[#D9C7A7]/60 inline-block mb-4 shadow-2xs">
          HAUTE COUTURE EDITORIAL
        </span>
        
        <h1 className="font-hero text-5xl sm:text-7xl md:text-8xl font-normal tracking-[0.18em] uppercase text-[#382C26] leading-none mb-3">
          LOOKBOOK
        </h1>

        <p className="font-hero text-lg sm:text-2xl md:text-3xl italic font-light tracking-wide text-[#7D2130] mb-4">
          VOLUME I — THE ART OF DRAPING
        </p>

        <p className="font-sans text-xs sm:text-sm font-light tracking-[0.12em] uppercase text-[#736357]/90 max-w-lg leading-relaxed">
          An exploration of Indian craftsmanship, woven heritage, and the timeless language of the saree.
        </p>

        <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-[#7D2130]/40 to-transparent mt-8" />
      </motion.div>
    </section>
  );
};

LookbookHero.displayName = 'LookbookHero';
