'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { OUR_STORY_MILESTONES } from './our-story.constants';
import { TimelineMilestone } from './TimelineMilestone';
import { OurStorySilkCanvas } from './components/OurStorySilkCanvas';

export const OurStory: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 40%', 'end 85%'],
  });

  const ribbonHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-gradient-to-b from-[#2B171A] via-[#3A1D21] to-[#2B171A] text-[#F6ECE1] min-h-screen pt-[110px] lg:pt-[140px] pb-36 px-6 sm:px-12 lg:px-20 max-w-[1920px] mx-auto font-satoshi overflow-hidden select-none"
    >
      {/* 3D / SVG Silk Background Canvas */}
      <OurStorySilkCanvas />

      {/* Layered Subtle Radial Champagne & Wine Glows */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-[radial-gradient(ellipse_at_50%_0%,rgba(106,52,56,0.35)_0%,transparent_70%)] pointer-events-none z-0" />
      <motion.div
        animate={{ opacity: [0.3, 0.5, 0.3], scale: [1, 1.05, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle_at_50%_50%,rgba(229,195,136,0.08)_0%,transparent_65%)] pointer-events-none z-0"
      />
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-[radial-gradient(ellipse_at_50%_100%,rgba(74,37,41,0.4)_0%,transparent_75%)] pointer-events-none z-0" />

      {/* Subtle Grain Overlay */}
      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-20 mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center text-center">
        {/* EDITORIAL HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
          className="flex flex-col items-center justify-center text-center mb-16 lg:mb-24 max-w-2xl"
        >
          <span className="text-[11px] font-medium uppercase tracking-[0.3em] text-[#E5C388] mb-3 bg-[#3A1D21]/80 backdrop-blur-md px-4 py-1 rounded-full border border-[#E5C388]/30">
            Maison Heritage & Origins
          </span>
          <h1 className="font-hero text-4xl sm:text-5xl md:text-6xl font-[500] tracking-[0.18em] uppercase text-[#F6ECE1]">
            Our Story
          </h1>
          <p className="mt-4 font-section text-xl sm:text-2xl italic font-light tracking-wide text-[#E5C388]">
            A Legacy Woven In Pure Gold & Mulberry Silk
          </p>
        </motion.div>

        {/* TIMELINE CONTAINER WITH CENTRAL ELEGANT GUIDE LINE & SILKY FLOWING RIBBON */}
        <div className="relative w-full flex flex-col items-center">
          {/* 1. Thin Background Guide Line */}
          <div className="absolute top-8 bottom-8 left-1/2 -translate-x-1/2 w-[1px] bg-[#E5C388]/25 hidden md:block z-0" />

          {/* 2. Silky Fabric Flowing Ribbon Line */}
          <motion.div
            style={{ height: ribbonHeight }}
            className="absolute top-8 left-1/2 -translate-x-1/2 w-[2.5px] bg-gradient-to-b from-[#6A3438] via-[#E5C388] to-[#6A3438] shadow-[0_0_14px_rgba(229,195,136,0.75)] hidden md:block z-10 origin-top rounded-full"
          />

          {/* 3. Milestones */}
          {OUR_STORY_MILESTONES.map((milestone, idx) => (
            <TimelineMilestone key={milestone.year} milestone={milestone} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
};

OurStory.displayName = 'OurStory';
