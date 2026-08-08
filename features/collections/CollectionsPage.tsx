'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { COLLECTIONS_COPY } from './collections.constants';
import { CollectionsToolbar } from './CollectionsToolbar';
import { CollectionsGrid } from './CollectionsGrid';

export const CollectionsPage: React.FC = () => {
  return (
    <div className="relative w-full bg-[#14090C] text-[#F6ECE1] min-h-screen pt-[110px] lg:pt-[140px] pb-32 px-6 sm:px-12 lg:px-20 max-w-[1920px] mx-auto font-satoshi overflow-hidden">
      {/* Soft Silk & Bronze Ambient Boutique Lighting */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[800px] lg:w-[1200px] h-[600px] bg-[radial-gradient(ellipse_at_50%_20%,rgba(163,34,51,0.22)_0%,transparent_70%)] pointer-events-none z-0" />
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle_at_50%_50%,rgba(200,157,92,0.14)_0%,transparent_75%)] pointer-events-none z-0" />

      <div className="relative z-10">
        {/* EDITORIAL BOUTIQUE HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
          className="flex flex-col items-center justify-center text-center my-10 lg:my-16 max-w-3xl mx-auto"
        >
          <span className="text-[11px] font-medium uppercase tracking-[0.3em] text-[#C89D5C] mb-3">
            Haute Couture Atelier
          </span>
          <h1 className="font-hero text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-[500] tracking-[0.18em] uppercase text-[#F6ECE1]">
            {COLLECTIONS_COPY.title}
          </h1>
          <p className="mt-4 font-section text-xl sm:text-2xl md:text-3xl italic font-light tracking-wide text-[#E5C388]">
            {COLLECTIONS_COPY.subtitle}
          </p>
        </motion.div>

        {/* TOP TOOLBAR: Result Count & Floating Glass Sort Dropdown */}
        <CollectionsToolbar />

        {/* LUXURY BOUTIQUE GALLERY GRID */}
        <CollectionsGrid />
      </div>
    </div>
  );
};

CollectionsPage.displayName = 'CollectionsPage';
