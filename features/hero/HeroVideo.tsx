'use client';

import React, { useState, useEffect } from 'react';
import { HERO_VIDEO_PATHS } from './hero.constants';

export interface HeroVideoProps {
  onError?: () => void;
}

export const HeroVideo: React.FC<HeroVideoProps> = ({ onError }) => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const handleError = () => {
    setHasError(true);
    if (onError) {
      onError();
    }
  };

  if (prefersReducedMotion || hasError) {
    return null;
  }

  return (
    <video
      autoPlay
      loop
      muted
      playsInline
      preload="none"
      onError={handleError}
      className="w-full h-full object-cover pointer-events-none"
      aria-label="ABHI-MOH Saree Craftsmanship Stage Video"
    >
      <source src={HERO_VIDEO_PATHS.mp4} type="video/mp4" />
      <source src={HERO_VIDEO_PATHS.webm} type="video/webm" />
    </video>
  );
};

HeroVideo.displayName = 'HeroVideo';
