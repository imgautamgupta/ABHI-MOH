'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { OUR_STORY_MILESTONES } from './our-story.constants';
import { TimelineMilestone } from './TimelineMilestone';

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
      className="relative w-full bg-[#14090C] text-[#F6ECE1] min-h-screen pt-[110px] lg:pt-[140px] pb-36 px-6 sm:px-12 lg:px-20 max-w-[1920px] mx-auto font-satoshi overflow-hidden select-none"
    >
      {/* Subtle Ambient Radial Lighting */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-[radial-gradient(ellipse_at_50%_0%,rgba(163,34,51,0.22)_0%,transparent_70%)] pointer-events-none z-0" />

      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center text-center">
        {/* EDITORIAL HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
          className="flex flex-col items-center justify-center text-center mb-16 lg:mb-24 max-w-2xl"
        >
          <span className="text-[11px] font-medium uppercase tracking-[0.3em] text-[#C89D5C] mb-3">
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
          <div className="absolute top-8 bottom-8 left-1/2 -translate-x-1/2 w-[1px] bg-[#C89D5C]/20 hidden md:block z-0" />

          {/* 2. Silky Fabric Flowing Ribbon Line */}
          <motion.div
            style={{ height: ribbonHeight }}
            className="absolute top-8 left-1/2 -translate-x-1/2 w-[2.5px] bg-gradient-to-b from-[#A32233] via-[#E5C388] to-[#A32233] shadow-[0_0_14px_rgba(229,195,136,0.75)] hidden md:block z-10 origin-top rounded-full"
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
