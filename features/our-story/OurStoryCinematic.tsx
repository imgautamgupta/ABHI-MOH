'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { OurStoryBackground } from './OurStoryBackground';
import { OurStorySceneText } from './OurStorySceneText';
import { OurStoryProgressDots } from './OurStoryProgressDots';

// ─────────────────────────────────────────────────────────────────────────────
// OUR STORY CINEMATIC
//
// Architecture:
//   ~900vh scroll container → creates scroll range for the pin
//   └── sticky 100vh viewport → stays on screen throughout the experience
//         ├── OurStoryBackground  (absolute inset-0, z-0 — 10 crossfading envs)
//         ├── OurStorySceneText   (absolute inset-0, z-20 — 10 overlaid scenes)
//         └── Gold progress bar   (absolute top, z-50)
//
// OurStoryProgressDots are rendered as siblings (fixed positioning).
// ─────────────────────────────────────────────────────────────────────────────

export const OurStoryCinematic: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Smooth spring — feels like silk resistance
  const scrollProgress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 26,
    restDelta: 0.0005,
  });

  // Scroll hint fades immediately when user starts scrolling
  const scrollHintOpacity = useTransform(scrollYProgress, [0, 0.04], [1, 0]);

  return (
    <>
      {/* ── SCROLL CONTAINER ─── */}
      <div
        ref={containerRef}
        className="relative w-full h-[720vh] sm:h-[800vh] lg:h-[900vh]"
        aria-label="ABHI-MOH brand story — scroll to continue"
      >
        {/* ── STICKY VIEWPORT ─── */}
        <div className="sticky top-0 w-full h-screen overflow-hidden">
          {/* Gold top progress bar */}
          <motion.div
            style={{ scaleX: scrollProgress }}
            className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#7D2130] via-[#C9A96E] to-[#7D2130] origin-left z-50 shadow-[0_0_8px_rgba(201,169,110,0.6)]"
          />

          {/* 10 crossfading background environments */}
          <OurStoryBackground scrollProgress={scrollProgress} />

          {/* 10 brand story text scenes */}
          <OurStorySceneText scrollProgress={scrollProgress} />

          {/* Scroll hint — shown only at the entry */}
          <motion.div
            style={{ opacity: scrollHintOpacity }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 pointer-events-none"
          >
            <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.45em] text-[#A67C52]/80 font-satoshi font-semibold">
              SCROLL TO BEGIN
            </span>
            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              className="w-6 h-6 rounded-full border border-[#A67C52]/40 flex items-center justify-center"
            >
              <svg
                className="w-3 h-3 text-[#A67C52]/60"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M19 9l-7 7-7-7" />
              </svg>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Right-side progress dots — fixed, outside the scroll container */}
      <OurStoryProgressDots scrollProgress={scrollProgress} />
    </>
  );
};

OurStoryCinematic.displayName = 'OurStoryCinematic';
