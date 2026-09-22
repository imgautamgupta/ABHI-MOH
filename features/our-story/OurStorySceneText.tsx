'use client';

import React from 'react';
import Link from 'next/link';
import { motion, MotionValue, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { BRAND_SCENES, BrandScene } from './our-story.constants';
import { cn } from '@/lib/utils';

// ─────────────────────────────────────────────────────────────────────────────
// Helpers — per-scene motion values
// ─────────────────────────────────────────────────────────────────────────────

function useSceneOpacity(scrollProgress: MotionValue<number>, scene: BrandScene) {
  const fadeInEnd = scene.scrollStart + (scene.scrollPeak - scene.scrollStart) * 0.5;
  const fadeOutStart = scene.scrollPeak + (scene.scrollEnd - scene.scrollPeak) * 0.55;
  return useTransform(
    scrollProgress,
    [scene.scrollStart, fadeInEnd, fadeOutStart, scene.scrollEnd],
    [0, 1, 1, 0]
  );
}

function useSceneY(scrollProgress: MotionValue<number>, scene: BrandScene) {
  return useTransform(
    scrollProgress,
    [scene.scrollStart, scene.scrollPeak, scene.scrollEnd],
    [18, 0, -12]
  );
}

// Stagger delay index for list items
function useListItemOpacity(
  scrollProgress: MotionValue<number>,
  scene: BrandScene,
  itemIndex: number,
  total: number
) {
  const staggerStep = (scene.scrollEnd - scene.scrollPeak) / (total + 1);
  const start = scene.scrollPeak + staggerStep * itemIndex;
  const peak = start + staggerStep * 0.7;
  const end = scene.scrollEnd;
  return useTransform(scrollProgress, [start, peak, end], [0, 1, 1]);
}

// ─────────────────────────────────────────────────────────────────────────────
// Ornamental divider
// ─────────────────────────────────────────────────────────────────────────────
const GoldDivider: React.FC<{ accentHex: string }> = ({ accentHex }) => (
  <div className="flex items-center gap-4 my-5">
    <div className="h-[1px] w-14 sm:w-20" style={{ background: `linear-gradient(90deg, transparent, ${accentHex}80)` }} />
    <svg className="w-3.5 h-3.5 flex-shrink-0" viewBox="0 0 24 24" fill={accentHex} aria-hidden="true">
      <path d="M12 3L13.5 10.5L21 12L13.5 13.5L12 21L10.5 13.5L3 12L10.5 10.5L12 3Z" />
    </svg>
    <div className="h-[1px] w-14 sm:w-20" style={{ background: `linear-gradient(90deg, ${accentHex}80, transparent)` }} />
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// Staggered list items (for selection criteria + belief)
// ─────────────────────────────────────────────────────────────────────────────
interface StaggerListProps {
  items: string[];
  scrollProgress: MotionValue<number>;
  scene: BrandScene;
  darkSection: boolean;
}

const StaggerList: React.FC<StaggerListProps> = ({ items, scrollProgress, scene, darkSection }) => (
  <div className="mt-6 flex flex-wrap gap-3 sm:gap-4 justify-center">
    {items.map((item, idx) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const opacity = useListItemOpacity(scrollProgress, scene, idx, items.length);
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const y = useTransform(opacity, [0, 1], [10, 0]);
      return (
        <motion.div
          key={item}
          style={{ opacity, y }}
          className={cn(
            'px-5 py-2.5 rounded-full text-[10px] sm:text-[11px] uppercase tracking-[0.35em] font-semibold border backdrop-blur-sm',
            darkSection
              ? 'border-[#C9A96E]/40 bg-[#FAF7F2]/8 text-[#C9A96E]'
              : 'border-[#A67C52]/30 bg-[#A67C52]/8 text-[#6B4C2A]'
          )}
        >
          {item}
        </motion.div>
      );
    })}
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// Single scene text block
// ─────────────────────────────────────────────────────────────────────────────
interface SceneBlockProps {
  scene: BrandScene;
  scrollProgress: MotionValue<number>;
  sceneIndex: number;
}

const SceneBlock: React.FC<SceneBlockProps> = ({ scene, scrollProgress, sceneIndex }) => {
  const opacity = useSceneOpacity(scrollProgress, scene);
  const y = useSceneY(scrollProgress, scene);

  const textColorMain = scene.darkSection ? 'text-[#FAF7F2]' : 'text-[#2A221E]';
  const textColorSub = scene.darkSection ? 'text-[#D8C6A0]' : 'text-[#7D5C3A]';
  const textColorBody = scene.darkSection ? 'text-[#FAF7F2]/80' : 'text-[#5C4D44]';

  return (
    <motion.div
      style={{ opacity, y }}
      className="absolute inset-0 flex flex-col items-center justify-center px-6 sm:px-12 lg:px-24 pointer-events-none"
    >
      <div className={cn('flex flex-col items-center text-center max-w-2xl lg:max-w-3xl mx-auto select-none', textColorMain)}>

        {/* Scene number badge */}
        <div className="flex items-center gap-3 mb-4">
          <div className="h-[1px] w-8 sm:w-12" style={{ background: `${scene.accentHex}60` }} />
          <span
            className="text-[10px] sm:text-[11px] uppercase tracking-[0.4em] font-semibold"
            style={{ color: scene.accentHex }}
          >
            {scene.eyebrow ?? `0${sceneIndex + 1}`}
          </span>
          <div className="h-[1px] w-8 sm:w-12" style={{ background: `${scene.accentHex}60` }} />
        </div>

        {/* Main Heading */}
        <h2
          className={cn(
            'font-hero font-normal uppercase leading-[1.0] mb-3 drop-shadow-sm',
            scene.heading.split('\n').length >= 3
              ? 'text-3xl min-[380px]:text-4xl sm:text-5xl lg:text-6xl tracking-[0.12em]'
              : 'text-4xl min-[380px]:text-5xl sm:text-6xl lg:text-7xl xl:text-8xl tracking-[0.14em]'
          )}
        >
          {scene.heading.split('\n').map((line, i) => (
            <span key={i} className="block">{line}</span>
          ))}
        </h2>

        {/* Subheading */}
        {scene.subheading && (
          <p className={cn('font-section text-lg sm:text-xl md:text-2xl italic font-light tracking-wide leading-snug mb-2', textColorSub)}>
            &ldquo;{scene.subheading}&rdquo;
          </p>
        )}

        {/* Ornamental divider */}
        {scene.showDivider !== false && (
          <GoldDivider accentHex={scene.accentHex} />
        )}

        {/* Body paragraph */}
        <p className={cn('font-satoshi text-sm sm:text-base font-light leading-relaxed tracking-wide max-w-xl', textColorBody)}>
          {scene.body}
        </p>

        {/* Optional second paragraph */}
        {scene.body2 && (
          <p className={cn('font-satoshi text-sm sm:text-base font-light leading-relaxed tracking-wide max-w-xl mt-4 opacity-85', textColorBody)}>
            {scene.body2}
          </p>
        )}

        {/* Staggered list items */}
        {scene.listItems && scene.listItems.length > 0 && (
          <StaggerList
            items={scene.listItems}
            scrollProgress={scrollProgress}
            scene={scene}
            darkSection={scene.darkSection}
          />
        )}

        {/* CTA — pointer-events re-enabled here */}
        {scene.hasCta && scene.ctaHref && (
          <div className="mt-8 pointer-events-auto">
            <Link href={scene.ctaHref}>
              <button
                type="button"
                className={cn(
                  'inline-flex items-center gap-3 px-8 sm:px-10 py-4 rounded-full',
                  'font-satoshi font-semibold text-[11px] sm:text-xs uppercase tracking-[0.25em]',
                  'transition-all duration-300 cursor-pointer shadow-lg backdrop-blur-sm',
                  scene.darkSection
                    ? 'bg-[#FAF7F2] text-[#3A1117] hover:bg-[#D8C6A0] hover:text-[#2A1810] border border-[#FAF7F2]/30'
                    : 'bg-[#7D2130] text-[#FAF7F2] hover:bg-[#5E1522] border border-[#7D2130]/30 shadow-[#7D2130]/20'
                )}
                aria-label={scene.ctaLabel}
              >
                <span>{scene.ctaLabel}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </Link>
          </div>
        )}
      </div>
    </motion.div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// OUR STORY SCENE TEXT — all 10 scenes stacked
// ─────────────────────────────────────────────────────────────────────────────
export interface OurStorySceneTextProps {
  scrollProgress: MotionValue<number>;
}

export const OurStorySceneText: React.FC<OurStorySceneTextProps> = ({ scrollProgress }) => {
  return (
    <div className="absolute inset-0 z-20 pointer-events-none">
      {BRAND_SCENES.map((scene, idx) => (
        <SceneBlock
          key={scene.id}
          scene={scene}
          scrollProgress={scrollProgress}
          sceneIndex={idx}
        />
      ))}
    </div>
  );
};

OurStorySceneText.displayName = 'OurStorySceneText';
