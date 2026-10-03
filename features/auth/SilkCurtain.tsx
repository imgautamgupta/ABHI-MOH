'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';

export interface SilkCurtainProps {
  firstName: string;
  onComplete: () => void;
}

export const SilkCurtain: React.FC<SilkCurtainProps> = ({ firstName, onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete,
      });

      if (prefersReduced) {
        // Simple subtle crossfade for reduced motion
        tl.fromTo(contentRef.current, { opacity: 0 }, { opacity: 1, duration: 0.5 })
          .to(contentRef.current, { opacity: 0, duration: 0.4, delay: 0.9 })
          .to(containerRef.current, { opacity: 0, duration: 0.3 });
      } else {
        // Signature Theatrical Maroon Silk Curtain Moment
        // 1. Content reveals in center
        tl.fromTo(
          contentRef.current,
          { opacity: 0, scale: 0.94, y: 15 },
          { opacity: 1, scale: 1, y: 0, duration: 0.6, ease: 'power2.out' }
        )
          // 2. Pause for 1.2s to celebrate user's welcome
          .to({}, { duration: 1.2 })
          // 3. Center content gently dissolves as curtains part
          .to(contentRef.current, { opacity: 0, scale: 1.05, duration: 0.4, ease: 'power2.in' })
          // 4. Two maroon silk panels slide horizontally outward like curtains
          .to(
            leftPanelRef.current,
            { xPercent: -102, duration: 0.85, ease: 'power3.inOut' },
            '-=0.2'
          )
          .to(
            rightPanelRef.current,
            { xPercent: 102, duration: 0.85, ease: 'power3.inOut' },
            '<'
          );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [onComplete]);

  const displayName = firstName?.trim() ? firstName.trim() : 'Esteemed Guest';

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden pointer-events-auto"
      role="status"
      aria-live="assertive"
    >
      {/* LEFT MAROON SILK CURTAIN PANEL */}
      <div
        ref={leftPanelRef}
        className="absolute top-0 left-0 w-1/2 h-full z-10 shadow-[8px_0_35px_rgba(0,0,0,0.5)] border-r border-[#D9C7A7]/40"
        style={{
          background:
            'linear-gradient(90deg, #471018 0%, #5E1522 30%, #7D2130 65%, #631722 85%, #420C13 100%)',
        }}
      >
        {/* Subtle Vertical Fabric-Fold Sheen Lines */}
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage:
              'repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(217,199,167,0.18) 45px, transparent 55px)',
          }}
        />
      </div>

      {/* RIGHT MAROON SILK CURTAIN PANEL */}
      <div
        ref={rightPanelRef}
        className="absolute top-0 right-0 w-1/2 h-full z-10 shadow-[-8px_0_35px_rgba(0,0,0,0.5)] border-l border-[#D9C7A7]/40"
        style={{
          background:
            'linear-gradient(270deg, #471018 0%, #5E1522 30%, #7D2130 65%, #631722 85%, #420C13 100%)',
        }}
      >
        {/* Subtle Vertical Fabric-Fold Sheen Lines */}
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage:
              'repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(217,199,167,0.18) 45px, transparent 55px)',
          }}
        />
      </div>

      {/* CENTER WELCOME REVEAL */}
      <div
        ref={contentRef}
        className="relative z-30 flex flex-col items-center justify-center text-center px-6 max-w-lg select-none"
      >
        {/* AM Monogram in Gold Medallion */}
        <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#FAF7F2] border-2 border-[#D9C7A7] shadow-xl flex items-center justify-center p-3 mb-6">
          <Image
            src="/images/abhi-moh-monogram.png"
            alt="ABHI-MOH Monogram"
            width={80}
            height={80}
            className="w-full h-full object-contain"
            priority
          />
        </div>

        <span className="font-sans text-[11px] tracking-[0.3em] uppercase text-[#D9C7A7] font-medium mb-3">
          Atelier Access Granted
        </span>

        <h2 className="font-hero text-3xl sm:text-4xl text-[#FAF7F2] font-normal tracking-wide mb-3">
          Welcome to ABHI-MOH, <br />
          <span className="italic text-[#D9C7A7]">{displayName}</span>
        </h2>

        <p className="font-section text-base sm:text-lg text-[#EADFCF]/90 font-light italic tracking-wide">
          &ldquo;The Essence of Elegance is woven into every thread.&rdquo;
        </p>

        <div className="mt-6 flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-[#D9C7A7] animate-pulse" />
          <span className="text-[10px] uppercase tracking-[0.2em] text-[#D9C7A7]/70 font-mono">
            Unveiling your private wardrobe...
          </span>
        </div>
      </div>
    </div>
  );
};
