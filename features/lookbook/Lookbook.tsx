'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Magazine } from './Magazine';

export const Lookbook: React.FC = () => {
  return (
    <section className="relative w-full min-h-[calc(100vh-88px)] bg-[#14090C] text-[#F6ECE1] flex flex-col items-center justify-center pt-28 pb-32 px-4 sm:px-8 overflow-hidden font-satoshi select-none">
      {/* 1. Subtle Radial Velvet & Gold Spotlight Behind Magazine */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] lg:w-[1000px] h-[500px] bg-[radial-gradient(circle_at_50%_50%,rgba(163,34,51,0.24)_0%,transparent_70%)] pointer-events-none z-0" />

      {/* 2. Page Header Copy */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
        className="relative z-10 flex flex-col items-center text-center mb-8 lg:mb-12"
      >
        <span className="text-[11px] font-medium uppercase tracking-[0.3em] text-[#C89D5C] mb-2">
          Haute Couture Editorial
        </span>
        <h1 className="font-hero text-4xl sm:text-5xl md:text-6xl font-[500] tracking-[0.2em] uppercase text-[#F6ECE1]">
          Lookbook
        </h1>
        <p className="mt-3 font-section text-xl sm:text-2xl italic font-light tracking-wide text-[#E5C388]">
          Haute Couture Volume I • The Magazine Reader
        </p>
      </motion.div>

      {/* 3. HARDCOVER MAGAZINE READER STAGE */}
      <div className="relative z-10 w-full flex items-center justify-center">
        <Magazine />
      </div>
    </section>
  );
};

Lookbook.displayName = 'Lookbook';
