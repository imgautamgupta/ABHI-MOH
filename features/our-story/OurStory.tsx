'use client';

import React, { useRef } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowRight, ArrowDown } from 'lucide-react';
import { OurStoryCinematic } from './OurStoryCinematic';

// OurStorySilkCanvas — Three.js ambient ribbon (reused from before)
const OurStorySilkCanvas = dynamic(
  () => import('./components/OurStorySilkCanvas').then((m) => m.OurStorySilkCanvas),
  { ssr: false }
);

// ─────────────────────────────────────────────────────────────────────────────
// PAGE ENTRY HERO — not pinned, full-screen atmospheric opening
// ─────────────────────────────────────────────────────────────────────────────
const OurStoryEntryHero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const textOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.55], [0, -40]);
  const bgScale = useSpring(useTransform(scrollYProgress, [0, 1], [1, 1.08]), {
    stiffness: 100,
    damping: 30,
  });

  const scrollDown = () => {
    const cinematic = document.getElementById('our-story-cinematic');
    if (cinematic) {
      cinematic.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={heroRef}
      className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#2B1510]"
    >
      {/* Three.js ambient silk canvas */}
      <OurStorySilkCanvas />

      {/* Warm radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_45%,rgba(229,195,136,0.18)_0%,transparent_65%)] pointer-events-none z-[1]" />

      {/* Bottom gradient blending into cinematic section */}
      <motion.div
        style={{ scale: bgScale }}
        className="absolute inset-0 bg-gradient-to-b from-[#2B1510] via-[#3A1117]/90 to-[#FAF7F2]/0 pointer-events-none z-[1]"
      />

      {/* Text content */}
      <motion.div
        style={{ opacity: textOpacity, y: textY }}
        className="relative z-10 flex flex-col items-center text-center px-6 sm:px-10 max-w-4xl mx-auto"
      >
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
          className="flex items-center gap-3 mb-6"
        >
          <div className="h-[1px] w-10 sm:w-16 bg-[#C9A96E]/50" />
          <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.45em] text-[#C9A96E] font-satoshi">
            THE HOUSE OF ABHI-MOH
          </span>
          <div className="h-[1px] w-10 sm:w-16 bg-[#C9A96E]/50" />
        </motion.div>

        {/* Main heading */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.1, ease: [0.25, 1, 0.5, 1] }}
          className="font-hero text-5xl min-[380px]:text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-normal uppercase tracking-[0.12em] text-[#FAF7F2] leading-[1.0] mb-4 drop-shadow-sm"
        >
          OUR
          <span className="block text-[#C9A96E]">STORY</span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.2, ease: [0.25, 1, 0.5, 1] }}
          className="font-section text-lg sm:text-2xl md:text-3xl italic font-light tracking-wide text-[#D8C6A0] mb-3 leading-snug"
        >
          &ldquo;Where a saree is more than a garment.&rdquo;
        </motion.p>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.3, ease: [0.25, 1, 0.5, 1] }}
          className="font-satoshi text-sm sm:text-base font-light text-[#FAF7F2]/70 max-w-xl leading-relaxed tracking-wide mt-2"
        >
          Scroll to understand who we are, why we exist, and what makes every piece we choose worth choosing.
        </motion.p>

        {/* Scroll CTA */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          onClick={scrollDown}
          className="mt-10 sm:mt-14 flex flex-col items-center gap-2.5 cursor-pointer group"
          aria-label="Begin the story"
        >
          <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.45em] text-[#C9A96E]/70 font-satoshi font-medium group-hover:text-[#C9A96E] transition-colors duration-300">
            BEGIN THE STORY
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            className="w-8 h-8 rounded-full border border-[#C9A96E]/40 flex items-center justify-center group-hover:border-[#C9A96E]/80 group-hover:bg-[#C9A96E]/10 transition-all duration-300"
          >
            <ArrowDown className="w-3.5 h-3.5 text-[#C9A96E]/70" />
          </motion.div>
        </motion.button>
      </motion.div>
    </section>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// PAGE CLOSE SECTION — releases after pinned experience
// ─────────────────────────────────────────────────────────────────────────────
const OurStoryClose: React.FC = () => {
  return (
    <section className="relative w-full py-28 sm:py-36 px-6 sm:px-10 lg:px-16 bg-gradient-to-b from-[#FAF7F2] via-[#F2E8D9] to-[#FAF7F2] text-[#2A221E] overflow-hidden text-center">
      {/* Ambient warm glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[radial-gradient(circle,rgba(166,124,82,0.1)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-3xl mx-auto relative z-10 flex flex-col items-center">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex items-center gap-3 mb-6"
        >
          <div className="h-[1px] w-10 sm:w-16 bg-[#A67C52]/50" />
          <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.4em] text-[#A67C52] font-satoshi">
            THE COLLECTION AWAITS
          </span>
          <div className="h-[1px] w-10 sm:w-16 bg-[#A67C52]/50" />
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-hero text-4xl sm:text-6xl lg:text-7xl font-normal uppercase tracking-[0.12em] text-[#2A221E] leading-tight mb-3"
        >
          EVERY SAREE
          <span className="block text-[#7D2130] mt-1">CARRIES A STORY.</span>
        </motion.h2>

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.18 }}
          className="font-section text-xl sm:text-2xl italic font-light tracking-wide text-[#7D2130] mb-5"
        >
          &ldquo;Yours is about to begin.&rdquo;
        </motion.p>

        {/* Ornamental divider */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="flex items-center gap-4 my-5"
        >
          <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-[#A67C52]/60" />
          <svg className="w-3.5 h-3.5 text-[#A67C52]/70" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 3L13.5 10.5L21 12L13.5 13.5L12 21L10.5 13.5L3 12L10.5 10.5L12 3Z" />
          </svg>
          <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-[#A67C52]/60" />
        </motion.div>

        {/* Body */}
        <motion.p
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.28 }}
          className="font-satoshi text-sm sm:text-base font-light text-[#5C4D44] max-w-lg leading-relaxed tracking-wide mb-10"
        >
          We are grateful you took the time to understand what ABHI-MOH is before looking at what it has. The collection was curated with care — and it is waiting for you.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.35 }}
        >
          <Link href="/collections" className="inline-block">
            <button
              type="button"
              className="inline-flex items-center gap-3 px-10 sm:px-14 py-4 sm:py-5 rounded-full bg-[#7D2130] text-[#FAF7F2] hover:bg-[#5E1522] font-satoshi font-semibold text-xs sm:text-sm uppercase tracking-[0.22em] transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.03] cursor-pointer"
            >
              <span>Explore the Collection</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        </motion.div>

        {/* Footnote */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-14 text-[10px] sm:text-[11px] uppercase tracking-[0.3em] text-[#A67C52]/60 font-satoshi"
        >
          Handcrafted. Curated. ABHI-MOH.
        </motion.p>
      </div>
    </section>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// OUR STORY — PAGE ROOT
// ─────────────────────────────────────────────────────────────────────────────
export const OurStory: React.FC = () => {
  return (
    <div className="relative w-full bg-[#FAF7F2] text-[#2A221E] font-satoshi overflow-x-hidden select-none">
      {/* 1. Non-pinned atmospheric opening hero */}
      <OurStoryEntryHero />

      {/* 2. Pinned cinematic brand story (900vh scroll range) */}
      <div id="our-story-cinematic">
        <OurStoryCinematic />
      </div>

      {/* 3. Calm close section — releases into normal page scroll */}
      <OurStoryClose />
    </div>
  );
};

OurStory.displayName = 'OurStory';
