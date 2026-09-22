'use client';

import React from 'react';
import { motion, MotionValue, useTransform } from 'framer-motion';
import { BRAND_SCENES } from './our-story.constants';

interface DotProps {
  index: number;
  scrollProgress: MotionValue<number>;
  scene: (typeof BRAND_SCENES)[0];
}

const Dot: React.FC<DotProps> = ({ index, scrollProgress, scene }) => {
  // Distance from active: 1 when exactly on this scene's peak, 0 when far
  const active = useTransform(scrollProgress, (v) =>
    Math.max(0, 1 - Math.abs(v - scene.scrollPeak) / 0.12)
  );
  const scale = useTransform(active, [0, 1], [1, 1.5]);
  const opacity = useTransform(active, [0, 0.4, 1], [0.3, 0.6, 1]);

  // Interpolate dot color: muted ivory → gold
  const bg = useTransform(active, (d) => {
    const r = Math.round(201 * d + 250 * (1 - d));
    const g = Math.round(169 * d + 248 * (1 - d));
    const b = Math.round(110 * d + 242 * (1 - d));
    return `rgb(${r},${g},${b})`;
  });

  return (
    <div className="group relative flex items-center justify-end">
      {/* Tooltip */}
      <span className="absolute right-6 px-2.5 py-1 rounded-md bg-[#2A090D]/90 text-[#FAF7F2] text-[9px] uppercase tracking-[0.2em] font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none shadow-lg border border-[#C9A96E]/20">
        {String(index + 1).padStart(2, '0')}. {scene.navLabel}
      </span>

      {/* Dot */}
      <motion.div
        style={{ scale, opacity, backgroundColor: bg }}
        className="w-2 h-2 rounded-full cursor-pointer"
        title={scene.navLabel}
        aria-hidden="true"
      />
    </div>
  );
};

export interface OurStoryProgressDotsProps {
  scrollProgress: MotionValue<number>;
}

export const OurStoryProgressDots: React.FC<OurStoryProgressDotsProps> = ({
  scrollProgress,
}) => {
  return (
    <div
      className="fixed right-4 sm:right-5 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-2.5 p-2.5 rounded-full bg-[#2A090D]/65 backdrop-blur-md border border-[#C9A96E]/20 shadow-xl"
      aria-hidden="true"
    >
      {BRAND_SCENES.map((scene, idx) => (
        <Dot key={scene.id} index={idx} scrollProgress={scrollProgress} scene={scene} />
      ))}
    </div>
  );
};

OurStoryProgressDots.displayName = 'OurStoryProgressDots';
