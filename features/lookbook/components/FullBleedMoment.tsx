'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FullBleedMomentData } from '../lookbook.types';

export interface FullBleedMomentProps {
  data: FullBleedMomentData;
}

export const FullBleedMoment: React.FC<FullBleedMomentProps> = ({ data }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.08, 1, 1.05]);

  return (
    <section ref={containerRef} className="relative w-full h-[60vh] sm:h-[75vh] md:h-[85vh] overflow-hidden select-none">
      {/* FULL BLEED IMAGE WITH SCROLL PARALLAX SCALE */}
      <motion.div style={{ scale }} className="relative w-full h-full">
        <Image
          src={data.image}
          alt={data.imageAlt}
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Soft gradient overlay for subtle contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />
      </motion.div>

      {/* ELEGANT SUBTLE OVERLAY CAPTION */}
      <div className="absolute bottom-10 left-8 sm:left-16 lg:left-24 z-10 text-[#FAF7F2] font-satoshi pointer-events-none max-w-sm">
        <span className="text-[10px] uppercase tracking-[0.35em] text-[#C7A66A] font-semibold block mb-1">
          {data.captionSub}
        </span>
        <h3 className="font-hero text-2xl sm:text-4xl uppercase tracking-[0.1em] text-[#F1E4CF]">
          {data.captionTitle}
        </h3>
      </div>
    </section>
  );
};

FullBleedMoment.displayName = 'FullBleedMoment';
