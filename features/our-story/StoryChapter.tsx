'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { StoryChapter as StoryChapterType } from './our-story.constants';
import { Sparkles, Compass } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface StoryChapterProps {
  chapter: StoryChapterType;
  index: number;
  totalChapters: number;
}

export const StoryChapter: React.FC<StoryChapterProps> = ({ chapter, index, totalChapters }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [-30, 30]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.96, 1.03, 0.98]);

  const isEven = index % 2 === 0;

  return (
    <section
      id={chapter.id}
      ref={containerRef}
      className={cn(
        'relative w-full py-20 sm:py-28 lg:py-36 px-4 sm:px-8 lg:px-16 transition-colors duration-1000 overflow-hidden font-satoshi',
        chapter.darkSection ? 'text-[#FAF7F2]' : 'text-[#382C26]'
      )}
      style={{
        background: `linear-gradient(180deg, ${chapter.bgFrom} 0%, ${chapter.bgTo} 100%)`,
      }}
    >
      {/* Subtle Background Radial Ambient Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] pointer-events-none opacity-40 blur-3xl z-0"
        style={{
          background: `radial-gradient(circle, ${chapter.accentHex}22 0%, transparent 70%)`,
        }}
      />

      <div className="max-w-[1400px] mx-auto relative z-10">
        <div
          className={cn(
            'flex flex-col gap-12 lg:gap-20 items-center justify-between',
            chapter.imageSide === 'left' ? 'lg:flex-row-reverse' : 'lg:flex-row'
          )}
        >
          {/* TEXT EDITORIAL COLUMN */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.85, ease: [0.25, 1, 0.5, 1] }}
            className="w-full lg:w-[48%] flex flex-col items-start text-left select-none"
          >
            {/* Chapter Step Badge */}
            <div className="flex items-center gap-3 mb-4">
              <span
                className={cn(
                  'px-3.5 py-1 rounded-full text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.3em] backdrop-blur-md border inline-flex items-center gap-2 shadow-2xs',
                  chapter.darkSection
                    ? 'bg-[#FAF7F2]/10 border-[#FAF7F2]/25 text-[#E5C388]'
                    : 'bg-[#7D2130]/10 border-[#7D2130]/25 text-[#7D2130]'
                )}
              >
                <Sparkles className="w-3 h-3" />
                <span>
                  CHAPTER 0{index + 1} &bull; {chapter.chapter}
                </span>
              </span>
            </div>

            {/* Chapter Main Title */}
            <h2
              className={cn(
                'font-hero text-3xl sm:text-4xl lg:text-5xl font-normal uppercase tracking-[0.08em] leading-tight mb-3',
                chapter.darkSection ? 'text-[#FAF7F2]' : 'text-[#2A221E]'
              )}
            >
              {chapter.heading}
            </h2>

            {/* Poetic Subheading */}
            <h3
              className={cn(
                'font-section text-lg sm:text-2xl italic font-light tracking-wide mb-6 leading-snug',
                chapter.darkSection ? 'text-[#E5C388]' : 'text-[#7D2130]'
              )}
            >
              &ldquo;{chapter.subheading}&rdquo;
            </h3>

            {/* Gold Accent Divider */}
            <div
              className="w-20 h-[1.5px] mb-6 rounded-full"
              style={{
                background: `linear-gradient(90deg, ${chapter.accentHex}, transparent)`,
              }}
            />

            {/* Narrative Body Copy */}
            <p
              className={cn(
                'font-sans text-sm sm:text-base font-light leading-relaxed tracking-wide mb-8',
                chapter.darkSection ? 'text-[#FAF7F2]/85' : 'text-[#5C4D44]'
              )}
            >
              {chapter.body}
            </p>

            {/* Craft Specification Tag */}
            {chapter.craftNote && (
              <div
                className={cn(
                  'p-4 sm:p-5 rounded-xl border backdrop-blur-md flex items-center gap-3.5 w-full sm:w-auto',
                  chapter.darkSection
                    ? 'bg-[#FAF7F2]/5 border-[#E5C388]/30 text-[#E5C388]'
                    : 'bg-white/70 border-[#D9C7A7]/60 text-[#736357]'
                )}
              >
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{
                    backgroundColor: `${chapter.accentHex}20`,
                    color: chapter.accentHex,
                  }}
                >
                  <Compass className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[9px] uppercase tracking-[0.25em] block opacity-75 font-semibold">
                    Loom Specification
                  </span>
                  <span
                    className={cn(
                      'text-xs font-medium tracking-wider',
                      chapter.darkSection ? 'text-[#FAF7F2]' : 'text-[#2A221E]'
                    )}
                  >
                    {chapter.craftNote}
                  </span>
                </div>
              </div>
            )}
          </motion.div>

          {/* EDITORIAL IMAGE COLUMN WITH LUXURY FRAME & PARALLAX */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.9, ease: [0.25, 1, 0.5, 1] }}
            className="w-full lg:w-[48%] flex items-center justify-center"
          >
            <div className="relative w-full max-w-[540px] aspect-[4/5] sm:aspect-[3/4] rounded-3xl p-3 sm:p-4 border backdrop-blur-md shadow-2xl transition-transform duration-700 hover:scale-[1.01] overflow-hidden group">
              {/* Outer Glass Card Boundary */}
              <div
                className="absolute inset-0 rounded-3xl pointer-events-none"
                style={{
                  borderColor: `${chapter.accentHex}40`,
                  borderWidth: '1px',
                  background: chapter.darkSection
                    ? 'rgba(255, 255, 255, 0.03)'
                    : 'rgba(250, 247, 242, 0.65)',
                }}
              />

              {/* Parallax Image Wrapper */}
              <motion.div
                style={{ y: imageY, scale: imageScale }}
                className="relative w-full h-full rounded-2xl overflow-hidden bg-[#2A090D]/10"
              >
                <Image
                  src={chapter.imageSrc}
                  alt={chapter.imageAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, 600px"
                  className="object-contain sm:object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-105"
                  priority={index === 0}
                />

                {/* Subtle Inner Vignette / Lighting Gradient */}
                <div
                  className={cn(
                    'absolute inset-0 pointer-events-none',
                    chapter.darkSection
                      ? 'bg-gradient-to-t from-[#2A090D]/80 via-transparent to-transparent'
                      : 'bg-gradient-to-t from-[#FAF7F2]/40 via-transparent to-transparent'
                  )}
                />

                {/* Subtle Decorative Floating Corner Monogram/Frame Details */}
                <div className="absolute top-4 left-4 border-l border-t border-[#FAF7F2]/40 w-5 h-5 pointer-events-none" />
                <div className="absolute top-4 right-4 border-r border-t border-[#FAF7F2]/40 w-5 h-5 pointer-events-none" />
                <div className="absolute bottom-4 left-4 border-l border-b border-[#FAF7F2]/40 w-5 h-5 pointer-events-none" />
                <div className="absolute bottom-4 right-4 border-r border-b border-[#FAF7F2]/40 w-5 h-5 pointer-events-none" />

                {/* Floating Chapter Caption Card at bottom */}
                <div className="absolute bottom-4 inset-x-4 p-3 sm:p-4 rounded-xl bg-[#2A090D]/75 backdrop-blur-md border border-[#E5C388]/30 flex items-center justify-between text-[#FAF7F2] shadow-md z-10">
                  <div className="flex flex-col">
                    <span className="text-[9px] uppercase tracking-[0.25em] text-[#E5C388] font-semibold">
                      ATELIER ARCHIVE
                    </span>
                    <span className="text-xs font-light tracking-wide text-[#FAF7F2]/90 line-clamp-1">
                      {chapter.heading}
                    </span>
                  </div>
                  <span className="font-hero text-xs sm:text-sm text-[#E5C388] font-medium tracking-wider">
                    0{index + 1} / 0{totalChapters}
                  </span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

StoryChapter.displayName = 'StoryChapter';
