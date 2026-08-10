'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MilestoneItem } from './our-story.constants';
import { cn } from '@/lib/utils';

export interface TimelineMilestoneProps {
  milestone: MilestoneItem;
  index: number;
}

export const TimelineMilestone: React.FC<TimelineMilestoneProps> = ({ milestone, index }) => {
  const isEven = index % 2 === 0;

  return (
    <div
      className={cn(
        'relative flex flex-col md:flex-row items-center justify-between w-full my-12 lg:my-20 font-satoshi',
        isEven ? 'md:flex-row' : 'md:flex-row-reverse'
      )}
    >
      {/* Milestone Card Container with Blur-to-Clarity Motion */}
      <motion.div
        initial={{ opacity: 0.05, filter: 'blur(12px)', y: 35 }}
        whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1] }}
        className="w-full md:w-[45%] bg-[#3A1D21]/85 backdrop-blur-[24px] border border-[#E5C388]/35 rounded-xl p-6 sm:p-10 shadow-2xl text-left select-none group hover:border-[#E5C388]/70 transition-colors duration-500"
      >
        <div className="flex items-center justify-between border-b border-[#E5C388]/25 pb-3 mb-4">
          <span className="font-hero text-2xl sm:text-3xl font-[500] text-[#E5C388] tracking-[0.1em]">
            {milestone.year}
          </span>
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#E5C388]/80 font-light">
            {milestone.location}
          </span>
        </div>

        <h3 className="font-hero text-xl sm:text-2xl font-[500] uppercase tracking-[0.14em] text-[#F6ECE1] mb-1">
          {milestone.title}
        </h3>

        <h4 className="font-section text-sm sm:text-base italic font-light text-[#E5C388] mb-3">
          {milestone.subtitle}
        </h4>

        <p className="font-sans text-xs font-light leading-relaxed text-[#F6ECE1]/90 tracking-wide mb-4">
          {milestone.description}
        </p>

        <div className="pt-3 border-t border-[#E5C388]/20 text-[10px] uppercase tracking-widest text-[#E5C388] font-medium flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#E5C388]" />
          <span>{milestone.craftDetail}</span>
        </div>
      </motion.div>

      {/* Central Milestone Node Indicator */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:flex items-center justify-center z-20 pointer-events-none">
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="w-8 h-8 rounded-full bg-[#2B171A] border-2 border-[#E5C388] shadow-[0_0_15px_rgba(229,195,136,0.5)] flex items-center justify-center"
        >
          <div className="w-2.5 h-2.5 rounded-full bg-[#6A3438]" />
        </motion.div>
      </div>

      {/* Empty Spacer Column for Desktop Symmetry */}
      <div className="hidden md:block w-[45%]" />
    </div>
  );
};

TimelineMilestone.displayName = 'TimelineMilestone';
