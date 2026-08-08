'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { HERO_CONTENT } from './hero.constants';
import { HERO_CONTAINER_VARIANTS, HERO_ITEM_FADE_UP } from './hero.animations';
import { HeroButton } from './HeroButton';

export const HeroContent: React.FC = () => {
  return (
    <motion.div
      variants={HERO_CONTAINER_VARIANTS}
      initial="hidden"
      animate="visible"
      className="flex flex-col items-center lg:items-start justify-center text-center lg:text-left max-w-xl lg:max-w-2xl px-6 lg:px-16 py-12 lg:py-0 font-satoshi"
    >
      {/* 1. Vintage Boutique Subtitle */}
      <motion.div variants={HERO_ITEM_FADE_UP}>
        <span className="text-[11px] font-medium tracking-[0.3em] uppercase text-[#7A1C28] bg-[#F3ECE3] px-3.5 py-1.5 rounded-full border border-[#E8DFD5] inline-block mb-3">
          HAUTE COUTURE MAISON
        </span>
      </motion.div>

      {/* 2. Heading: "The Essence of Elegance" */}
      <motion.div variants={HERO_ITEM_FADE_UP} className="mt-1">
        <h1 className="font-hero text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-[500] tracking-[0.08em] uppercase block leading-[1.1] text-[#2A221E]">
          The Essence of Elegance
        </h1>
      </motion.div>

      {/* 3. Short Supporting Paragraph */}
      <motion.div variants={HERO_ITEM_FADE_UP} className="mt-4 md:mt-6 max-w-md">
        <p className="font-sans text-sm sm:text-base font-normal leading-relaxed text-[#6E645A] tracking-wide">
          Timeless handcrafted sarees woven with pure mulberry silk, antique gold zari, and centuries of royal Indian heritage.
        </p>
      </motion.div>

      {/* 4. One Primary CTA: "Explore Collection" */}
      <motion.div variants={HERO_ITEM_FADE_UP} className="mt-8 md:mt-10">
        <HeroButton text="Explore Collection" href="#exclusive-collections" />
      </motion.div>
    </motion.div>
  );
};

HeroContent.displayName = 'HeroContent';
