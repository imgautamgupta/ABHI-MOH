'use client';

import React from 'react';
import { HeroContent } from './HeroContent';
import { FashionStage } from './FashionStage';

export const Hero: React.FC = () => {
  return (
    <section className="relative w-full max-w-[1920px] mx-auto min-h-[calc(100vh-72px)] md:min-h-[calc(100vh-80px)] lg:min-h-[calc(100vh-88px)] bg-[#FAF7F2] text-[#2A221E] flex flex-col lg:flex-row items-center justify-between overflow-hidden">
      {/* Soft Warm Champagne Ambient Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(194,159,98,0.12)_0%,transparent_70%)] pointer-events-none z-10" />

      {/* Desktop Left / Mobile Top: Brand Content (45% Width) */}
      <div className="w-full lg:w-[45%] flex items-center justify-center lg:justify-start z-20 py-10 lg:py-0">
        <HeroContent />
      </div>

      {/* Desktop Right / Mobile Bottom: Fixed Fashion Stage (55% Width) */}
      <div className="w-full lg:w-[55%] flex items-center justify-center z-20">
        <FashionStage />
      </div>
    </section>
  );
};

Hero.displayName = 'Hero';
