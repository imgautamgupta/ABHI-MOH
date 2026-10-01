'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { EditorialStory } from '../lookbook.types';
import { cn } from '@/lib/utils';

export interface EditorialStoryCardProps {
  story: EditorialStory;
  onExploreStory: (story: EditorialStory) => void;
  index: number;
}

export const EditorialStoryCard: React.FC<EditorialStoryCardProps> = ({
  story,
  onExploreStory,
  index,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -35]);
  const isEven = index % 2 === 0;

  const isDark = story.theme === 'DEEP_MAROON';

  return (
    <section
      id={story.id}
      ref={containerRef}
      className={cn(
        'relative w-full py-20 lg:py-32 px-5 sm:px-10 lg:px-16 font-satoshi overflow-hidden transition-colors duration-700 select-none border-b border-[#D9C7A7]/40',
        isDark ? 'bg-[#2A090D] text-[#F1E4CF]' : 'bg-[#FAF7F2] text-[#382C26]'
      )}
    >
      {/* Editorial Decorative Background Elements */}
      <div className="absolute top-10 right-10 text-[100px] lg:text-[160px] font-hero font-bold opacity-[0.03] pointer-events-none select-none">
        {story.editionNumber}
      </div>

      <div className="max-w-[1500px] mx-auto">
        {/* ── VARIANT 1: ASYMMETRIC SPLIT SPREAD ───────────────────────────── */}
        {story.layoutVariant === 'asymmetric-split' && (
          <div className={cn('grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center', !isEven && 'lg:flex-row-reverse')}>
            {/* HERO IMAGE WITH OFFSET DETAIL BADGE (7 cols) */}
            <div className={cn('lg:col-span-7 relative', !isEven && 'lg:order-2')}>
              {/* Vertical Editorial Watermark */}
              <div
                className={cn(
                  'hidden xl:block absolute -left-10 top-0 bottom-0 text-[10px] uppercase tracking-[0.4em] font-semibold [writing-mode:vertical-lr] rotate-180 pointer-events-none opacity-40',
                  isDark ? 'text-[#C7A66A]' : 'text-[#7D2130]'
                )}
              >
                ABHI-MOH • {story.category}
              </div>

              {/* Main Tall Image */}
              <motion.div
                style={{ y: parallaxY }}
                initial={{ opacity: 0, scale: 1.03 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.85, ease: [0.25, 1, 0.5, 1] }}
                className={cn(
                  'relative w-full aspect-[3/4] max-h-[700px] rounded-sm overflow-hidden border shadow-lg group',
                  isDark ? 'border-[#C7A66A]/30 bg-[#1A0406]' : 'border-[#D9C7A7]/50 bg-[#EADFCF]/30'
                )}
              >
                <Image
                  src={story.mainImage.src}
                  alt={story.mainImage.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-contain object-center transition-transform duration-1000 ease-out group-hover:scale-[1.02]"
                />
              </motion.div>

              {/* Floating Offset Secondary Detail Vignette */}
              {story.secondaryImage && (
                <motion.div
                  initial={{ opacity: 0, y: 30, x: 20 }}
                  whileInView={{ opacity: 1, y: 0, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 1, 0.5, 1] }}
                  className={cn(
                    'hidden sm:block absolute -bottom-8 -right-6 lg:-right-8 w-44 lg:w-56 aspect-[4/5] rounded-xs overflow-hidden border-2 shadow-2xl z-20 p-1.5',
                    isDark ? 'bg-[#2A090D] border-[#C7A66A]/40' : 'bg-[#FAF7F2] border-[#D9C7A7]/80'
                  )}
                >
                  <div className="relative w-full h-full overflow-hidden rounded-xs">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={story.secondaryImage.src}
                      alt={story.secondaryImage.alt}
                      className="w-full h-full object-contain"
                    />
                  </div>
                </motion.div>
              )}
            </div>

            {/* EDITORIAL STORY TEXT (5 cols) */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 1, 0.5, 1] }}
              className={cn('lg:col-span-5 flex flex-col items-start', !isEven && 'lg:order-1')}
            >
              {/* Category & Edition Badge */}
              <div className="flex items-center gap-3 mb-4">
                <span
                  className={cn(
                    'text-[10px] sm:text-[11px] uppercase tracking-[0.3em] font-semibold px-3 py-1 rounded-full border',
                    isDark
                      ? 'text-[#C7A66A] border-[#C7A66A]/40 bg-[#1A0406]/60'
                      : 'text-[#7D2130] border-[#D9C7A7]/60 bg-[#FAF7F2]'
                  )}
                >
                  EDITION {story.editionNumber} • {story.category}
                </span>
              </div>

              {/* Tagline */}
              <p className={cn('text-xs uppercase tracking-[0.25em] font-light mb-2', isDark ? 'text-[#C7A66A]' : 'text-[#7D2130]')}>
                {story.tagline}
              </p>

              {/* Headline */}
              <h2
                className={cn(
                  'font-hero text-3xl sm:text-4xl lg:text-5xl uppercase tracking-[0.06em] leading-[1.1] mb-6',
                  isDark ? 'text-[#F1E4CF]' : 'text-[#382C26]'
                )}
              >
                {story.headline}
              </h2>

              {/* Pull Quote */}
              {story.quote && (
                <div
                  className={cn(
                    'p-4 border-l-2 my-2 italic font-hero text-sm sm:text-base leading-relaxed',
                    isDark ? 'border-[#C7A66A] text-[#F1E4CF]/90 bg-[#1A0406]/40' : 'border-[#7D2130] text-[#7D2130]/90 bg-[#FAF7F2]'
                  )}
                >
                  &ldquo;{story.quote}&rdquo;
                </div>
              )}

              {/* Story Excerpt */}
              <p
                className={cn(
                  'font-sans text-xs sm:text-sm font-light leading-relaxed tracking-wide my-4 max-w-lg',
                  isDark ? 'text-[#F1E4CF]/80' : 'text-[#736357]'
                )}
              >
                {story.storyBody[0]}
              </p>

              {/* Metadata Micro-Grid */}
              <div
                className={cn(
                  'w-full pt-4 border-t grid grid-cols-2 gap-3 my-4',
                  isDark ? 'border-[#C7A66A]/20' : 'border-[#D9C7A7]/40'
                )}
              >
                <div>
                  <span className={cn('block text-[9px] uppercase tracking-wider font-semibold', isDark ? 'text-[#C7A66A]' : 'text-[#7D2130]')}>
                    ORIGIN
                  </span>
                  <span className="text-xs font-light tracking-wide">{story.metadata.origin}</span>
                </div>
                <div>
                  <span className={cn('block text-[9px] uppercase tracking-wider font-semibold', isDark ? 'text-[#C7A66A]' : 'text-[#7D2130]')}>
                    CRAFT
                  </span>
                  <span className="text-xs font-light tracking-wide">{story.metadata.craft}</span>
                </div>
              </div>

              {/* Interactive CTA */}
              <button
                type="button"
                onClick={() => onExploreStory(story)}
                className={cn(
                  'group mt-4 inline-flex items-center gap-3 py-3 px-6 rounded-xs text-xs uppercase tracking-[0.2em] font-medium transition-all duration-300 cursor-pointer shadow-xs',
                  isDark
                    ? 'bg-[#C7A66A] text-[#2A090D] hover:bg-[#EADFCF]'
                    : 'bg-[#7D2130] text-[#FAF7F2] hover:bg-[#5E1522]'
                )}
              >
                <span>EXPLORE STORY</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1.5" />
              </button>
            </motion.div>
          </div>
        )}

        {/* ── VARIANT 2: MAGAZINE TRIPTYCH SPREAD ─────────────────────────── */}
        {story.layoutVariant === 'magazine-triptych' && (
          <div className="flex flex-col gap-10">
            {/* Header / Intro */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#D9C7A7]/40">
              <div className="flex flex-col">
                <span className={cn('text-[10px] uppercase tracking-[0.3em] font-semibold mb-2', isDark ? 'text-[#C7A66A]' : 'text-[#7D2130]')}>
                  EDITION {story.editionNumber} • {story.category}
                </span>
                <h2 className={cn('font-hero text-3xl sm:text-5xl uppercase tracking-[0.08em] leading-tight', isDark ? 'text-[#F1E4CF]' : 'text-[#382C26]')}>
                  {story.headline}
                </h2>
              </div>
              <p className={cn('font-hero text-base sm:text-lg italic max-w-md', isDark ? 'text-[#C7A66A]' : 'text-[#7D2130]')}>
                &ldquo;{story.tagline}&rdquo;
              </p>
            </div>

            {/* Asymmetric 3-Image Collage */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
              {/* Primary Large Image (6 cols) */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className={cn(
                  'md:col-span-6 relative aspect-[3/4] rounded-sm overflow-hidden border p-2 flex items-center justify-center',
                  isDark ? 'bg-[#1A0406] border-[#C7A66A]/30' : 'bg-[#EADFCF]/20 border-[#D9C7A7]/60'
                )}
              >
                <Image
                  src={story.mainImage.src}
                  alt={story.mainImage.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-contain"
                />
              </motion.div>

              {/* Secondary Detail (3 cols) */}
              {story.secondaryImage && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.15 }}
                  className={cn(
                    'md:col-span-3 relative aspect-[3/4] rounded-sm overflow-hidden border p-2 flex items-center justify-center',
                    isDark ? 'bg-[#1A0406] border-[#C7A66A]/30' : 'bg-[#EADFCF]/20 border-[#D9C7A7]/60'
                  )}
                >
                  <Image
                    src={story.secondaryImage.src}
                    alt={story.secondaryImage.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className="object-contain"
                  />
                </motion.div>
              )}

              {/* Third Card / Story Text & CTA (3 cols) */}
              <div className="md:col-span-3 flex flex-col justify-between p-6 rounded-sm border bg-[#FAF7F2] border-[#D9C7A7]/50 text-[#382C26]">
                <div className="flex flex-col gap-3">
                  <span className="text-[9px] uppercase tracking-[0.25em] text-[#7D2130] font-semibold">
                    ATELIER DISCOURSE
                  </span>
                  <p className="text-xs font-light text-[#5c4d44] leading-relaxed">
                    {story.storyBody[0]}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => onExploreStory(story)}
                  className="mt-6 inline-flex items-center justify-between py-3 px-4 bg-[#7D2130] hover:bg-[#5E1522] text-[#FAF7F2] text-[10px] uppercase tracking-[0.2em] font-medium rounded-xs transition-colors cursor-pointer"
                >
                  <span>EXPLORE STORY</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ── VARIANT 3: CINEMATIC WIDE SPREAD ────────────────────────────── */}
        {story.layoutVariant === 'cinematic-wide' && (
          <div className="flex flex-col gap-8">
            {/* Top Tag */}
            <div className="flex items-center justify-between">
              <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.3em] font-semibold text-[#7D2130]">
                EDITION {story.editionNumber} • {story.category}
              </span>
              <span className="text-xs uppercase tracking-widest text-[#736357] font-light">
                {story.metadata.origin}
              </span>
            </div>

            {/* Widescreen Hero Banner */}
            <motion.div
              style={{ y: parallaxY }}
              initial={{ opacity: 0, scale: 1.02 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9 }}
              className="relative w-full h-[450px] lg:h-[580px] rounded-sm overflow-hidden border border-[#D9C7A7]/60 shadow-lg bg-[#EADFCF]/30 p-6 flex items-center justify-center"
            >
              <Image
                src={story.mainImage.src}
                alt={story.mainImage.alt}
                fill
                sizes="100vw"
                className="object-contain object-center"
              />

              {/* Floating Overlapping Story Excerpt Box */}
              <div className="absolute bottom-6 left-6 right-6 sm:right-auto sm:max-w-md p-6 bg-[#FAF7F2]/95 backdrop-blur-md border border-[#D9C7A7]/70 rounded-xs shadow-xl flex flex-col gap-2.5">
                <span className="text-[9px] uppercase tracking-[0.3em] font-semibold text-[#7D2130]">
                  {story.tagline}
                </span>
                <h3 className="font-hero text-xl sm:text-2xl text-[#382C26] uppercase">
                  {story.headline}
                </h3>
                <p className="text-xs font-light text-[#736357] leading-relaxed line-clamp-3">
                  {story.storyBody[0]}
                </p>
                <button
                  type="button"
                  onClick={() => onExploreStory(story)}
                  className="mt-2 inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-medium text-[#7D2130] hover:text-[#5E1522] transition-colors cursor-pointer"
                >
                  <span>Explore Story</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {/* ── VARIANT 4: EDITORIAL DIALOGUE SPREAD ────────────────────────── */}
        {story.layoutVariant === 'editorial-dialogue' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            {/* STORY TEXT & QUOTE (6 cols) */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-6 flex flex-col items-start gap-4"
            >
              <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-[#7D2130]">
                EDITION {story.editionNumber} • {story.category}
              </span>

              <h2 className="font-hero text-3xl sm:text-4xl lg:text-5xl uppercase tracking-[0.06em] text-[#382C26] leading-tight">
                {story.headline}
              </h2>

              <p className="font-hero text-base sm:text-lg italic text-[#7D2130]">
                &ldquo;{story.tagline}&rdquo;
              </p>

              <div className="flex flex-col gap-3 text-xs sm:text-sm font-light text-[#5c4d44] leading-relaxed my-2">
                {story.storyBody.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>

              <button
                type="button"
                onClick={() => onExploreStory(story)}
                className="mt-4 inline-flex items-center gap-3 py-3 px-6 bg-[#7D2130] hover:bg-[#5E1522] text-[#FAF7F2] text-xs uppercase tracking-[0.2em] font-medium rounded-xs transition-colors shadow-sm cursor-pointer"
              >
                <span>EXPLORE STORY</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </motion.div>

            {/* LAYERED IMAGERY (6 cols) */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="lg:col-span-6 relative aspect-[3/4] max-h-[640px] rounded-sm overflow-hidden border border-[#D9C7A7]/50 bg-[#EADFCF]/30 p-4 flex items-center justify-center shadow-lg"
            >
              <Image
                src={story.mainImage.src}
                alt={story.mainImage.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-contain object-center"
              />
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
};

EditorialStoryCard.displayName = 'EditorialStoryCard';
