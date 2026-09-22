'use client';

import React from 'react';
import Image from 'next/image';
import { motion, MotionValue, useTransform } from 'framer-motion';
import { BRAND_SCENES, BrandScene } from './our-story.constants';

// ─────────────────────────────────────────────────────────────────────────────
// Per-scene opacity helper
// Adds a small crossfade window at start and end of each scene
// ─────────────────────────────────────────────────────────────────────────────
function useSceneOpacity(
  scrollProgress: MotionValue<number>,
  scene: BrandScene
): MotionValue<number> {
  const fadeInEnd = scene.scrollStart + (scene.scrollPeak - scene.scrollStart) * 0.6;
  const fadeOutStart = scene.scrollPeak + (scene.scrollEnd - scene.scrollPeak) * 0.5;

  return useTransform(
    scrollProgress,
    [scene.scrollStart, fadeInEnd, fadeOutStart, scene.scrollEnd],
    [0, 1, 1, 0]
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Single Background Layer
// ─────────────────────────────────────────────────────────────────────────────
interface BgLayerProps {
  scene: BrandScene;
  scrollProgress: MotionValue<number>;
}

const BgLayer: React.FC<BgLayerProps> = ({ scene, scrollProgress }) => {
  const opacity = useSceneOpacity(scrollProgress, scene);

  return (
    <motion.div
      style={{ opacity }}
      className="absolute inset-0 pointer-events-none"
    >
      {/* CSS gradient */}
      <div
        className="absolute inset-0"
        style={{ background: scene.bgGradient }}
      />

      {/* Ambient radial accent glow */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at 50% 40%, ${scene.accentHex}18 0%, transparent 65%)`,
        }}
      />

      {/* Optional background saree/texture image */}
      {scene.bgImageSrc && (
        <div
          className="absolute inset-0"
          style={{ opacity: scene.bgImageOpacity ?? 0.12 }}
        >
          <Image
            src={scene.bgImageSrc}
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
            style={{ objectPosition: scene.bgImagePosition ?? 'center' }}
            aria-hidden="true"
            priority={false}
          />
        </div>
      )}
    </motion.div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// OUR STORY BACKGROUND — all 10 layers stacked
// ─────────────────────────────────────────────────────────────────────────────
export interface OurStoryBackgroundProps {
  scrollProgress: MotionValue<number>;
}

export const OurStoryBackground: React.FC<OurStoryBackgroundProps> = ({
  scrollProgress,
}) => {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {/* Initial fallback bg — visible before any scene loads */}
      <div className="absolute inset-0 bg-[#FAF7F2]" />

      {BRAND_SCENES.map((scene) => (
        <BgLayer key={scene.id} scene={scene} scrollProgress={scrollProgress} />
      ))}

      {/* Consistent top vignette — prevents hard edge at navbar */}
      <div className="absolute top-0 inset-x-0 h-28 bg-gradient-to-b from-black/10 to-transparent pointer-events-none z-10" />

      {/* Consistent bottom blend — transitions into the page close section */}
      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-[#FAF7F2] to-transparent pointer-events-none z-10" />
    </div>
  );
};

OurStoryBackground.displayName = 'OurStoryBackground';
