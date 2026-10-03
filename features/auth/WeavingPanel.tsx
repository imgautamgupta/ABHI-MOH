'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { KalgaPaisleyMotif, ZariBorderStrip } from './auth.constants';

export interface WeavingPanelProps {
  mode: 'login' | 'signup' | 'forgot' | 'verify';
}

export const WeavingPanel: React.FC<WeavingPanelProps> = ({ mode }) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const [parallaxOffset, setParallaxOffset] = useState({ x: 0, y: 0 });
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Subtle mouse-parallax tilt (max 6px offset)
  useEffect(() => {
    if (prefersReducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!panelRef.current) return;
      const rect = panelRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Normalize between -1 and 1
      const normX = (e.clientX - centerX) / (rect.width / 2);
      const normY = (e.clientY - centerY) / (rect.height / 2);

      // Clamp to max 6px
      const clampedX = Math.max(-1, Math.min(1, normX)) * 6;
      const clampedY = Math.max(-1, Math.min(1, normY)) * 6;

      setParallaxOffset({ x: clampedX, y: clampedY });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [prefersReducedMotion]);

  const title =
    mode === 'signup'
      ? 'Join ABHI-MOH'
      : mode === 'forgot'
      ? 'Atelier Access'
      : mode === 'verify'
      ? 'Private Verification'
      : 'Welcome back';

  const subtitle =
    mode === 'signup'
      ? 'Step into a world of bespoke silk, heirloom weaves, and royal silhouettes.'
      : mode === 'forgot'
      ? 'Restore access to your private haute couture wardrobe and orders.'
      : mode === 'verify'
      ? 'A sacred OTP has been dispatched to authenticate your noble lineage.'
      : 'Your private salon of hand-spun heritage and haute couture awaits.';

  return (
    <div
      ref={panelRef}
      className="relative hidden lg:flex flex-col justify-between w-[54%] min-h-[640px] xl:min-h-[700px] p-12 xl:p-16 rounded-[32px] overflow-hidden bg-[#F7F2EA] border border-[#D9C7A7]/50 shadow-sm select-none"
    >
      {/* 1. Subtle Silk Jacquard Surface Shimmer Sweep */}
      {!prefersReducedMotion && (
        <div
          className="absolute inset-0 pointer-events-none opacity-40 mix-blend-soft-light"
          style={{
            background:
              'linear-gradient(105deg, transparent 20%, rgba(217, 199, 167, 0.4) 40%, rgba(255, 253, 252, 0.7) 50%, rgba(217, 199, 167, 0.4) 60%, transparent 80%)',
            animation: 'silkShimmerSlow 9s ease-in-out infinite',
            width: '200%',
            height: '100%',
          }}
        />
      )}

      {/* 2. Traditional Zari Borders (Framing the Panel) */}
      <div className="absolute top-0 inset-x-0 pointer-events-none opacity-70">
        <ZariBorderStrip orientation="horizontal" />
      </div>
      <div className="absolute bottom-0 inset-x-0 pointer-events-none opacity-70">
        <ZariBorderStrip orientation="horizontal" />
      </div>
      <div className="absolute left-0 inset-y-0 pointer-events-none opacity-50">
        <ZariBorderStrip orientation="vertical" />
      </div>

      {/* 3. Background Kalga / Paisley Motifs with Parallax Tilt (Max 6px) */}
      <div
        className="absolute -right-10 -bottom-16 w-[340px] xl:w-[400px] pointer-events-none transition-transform duration-500 ease-out"
        style={{
          transform: prefersReducedMotion
            ? 'none'
            : `translate3d(${parallaxOffset.x}px, ${parallaxOffset.y}px, 0)`,
        }}
      >
        <KalgaPaisleyMotif opacity={0.28} />
      </div>

      <div
        className="absolute -left-12 top-24 w-[240px] pointer-events-none transition-transform duration-500 ease-out"
        style={{
          transform: prefersReducedMotion
            ? 'none'
            : `translate3d(${-parallaxOffset.x * 0.7}px, ${-parallaxOffset.y * 0.7}px, 0) scaleX(-1)`,
        }}
      >
        <KalgaPaisleyMotif opacity={0.16} />
      </div>

      {/* 4. Top: Brand Monogram & Seal */}
      <div className="relative z-10 flex items-center gap-4">
        <div className="relative w-14 h-14 rounded-full bg-[#FAF7F2] border border-[#D9C7A7]/70 flex items-center justify-center p-2 shadow-xs">
          <Image
            src="/images/abhi-moh-monogram.png"
            alt="ABHI-MOH Monogram"
            width={48}
            height={48}
            className="w-full h-full object-contain"
            priority
          />
        </div>
        <div>
          <span className="font-hero text-sm xl:text-base font-semibold tracking-[0.24em] uppercase text-[#7D2130] block">
            ABHI-MOH
          </span>
          <span className="font-sans text-[10px] tracking-[0.18em] uppercase text-[#736357] font-light">
            Haute Couture Atelier
          </span>
        </div>
      </div>

      {/* 5. Center: Editorial Welcome Text */}
      <div className="relative z-10 max-w-md my-auto py-8">
        <span className="inline-block font-sans text-[11px] tracking-[0.25em] uppercase text-[#A67C52] font-medium mb-3">
          Atelier Client Dossier
        </span>
        <h1 className="font-hero text-3xl sm:text-4xl xl:text-5xl font-normal text-[#2A221E] tracking-tight leading-[1.15] mb-4">
          {title}
        </h1>
        <p className="font-section text-lg xl:text-xl text-[#5C4D44] font-light italic leading-relaxed">
          &ldquo;{subtitle}&rdquo;
        </p>
      </div>

      {/* 6. Bottom: Tagline & Pure Silk Seal */}
      <div className="relative z-10 pt-6 border-t border-[#D9C7A7]/40 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#C29F62]" />
          <span className="font-hero text-xs tracking-[0.2em] uppercase text-[#382C26]">
            The Essence of Elegance
          </span>
        </div>
        <span className="font-mono text-[10px] tracking-wider text-[#736357]/80 uppercase">
          EST. VARANASI &amp; BENGALURU
        </span>
      </div>
    </div>
  );
};
