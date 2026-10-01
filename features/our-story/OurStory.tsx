'use client';

import React from 'react';
import { FootstepsJourney } from './FootstepsJourney';

// ─────────────────────────────────────────────────────────────────────────────
// OUR STORY — ROOT PAGE COMPONENT
//
// Renders the scroll-driven Footsteps Journey Map through India's weaving
// corridors from 2020 to Today.
// Pure SVG + GSAP ScrollTrigger. Zero Three.js / WebGL.
// ─────────────────────────────────────────────────────────────────────────────

export const OurStory: React.FC = () => {
  return (
    <main className="relative w-full bg-[#FAF7F2] text-[#2A221E] font-satoshi overflow-x-hidden">
      <FootstepsJourney />
    </main>
  );
};

OurStory.displayName = 'OurStory';
