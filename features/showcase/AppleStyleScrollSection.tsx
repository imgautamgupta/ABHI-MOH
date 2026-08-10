'use client';

/**
 * ABHI-MOH — ART IN MOTION v2.0
 *
 * Architecture: Pure image-based cinematic scroll journey.
 * NO Three.js dependency. NO WebGL required.
 * Works identically on all devices.
 *
 * Journey: Full Mannequin → Saree → Pallu → Zari/Weave → Single Thread
 * Controlled entirely by Framer Motion useScroll / useTransform.
 */

import React, { useRef } from 'react';
import Image from 'next/image';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from 'framer-motion';

// ─────────────────────────────────────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────────────────────────────────────
const STAGES = [
  {
    src: '/images/art-in-motion/saree-full.png',
    alt: 'Full mannequin wearing a complete ABHI-MOH handwoven saree',
    // At stage 1 the image fills frame normally, scale up into next stage
    label: 'THE SAREE',
    detail: 'Draped in 6 yards of handwoven silk',
  },
  {
    src: '/images/art-in-motion/saree-pallu.png',
    alt: 'Pallu of an ABHI-MOH saree showing intricate zari border',
    label: 'THE PALLU',
    detail: 'Where heritage patterns bloom in gold',
  },
  {
    src: '/images/art-in-motion/saree-zari.png',
    alt: 'Extreme macro of antique gold zari and silk weave interlocked',
    label: 'ANTIQUE ZARI',
    detail: 'Real gold metallic thread from Varanasi',
  },
  {
    src: '/images/art-in-motion/saree-thread.png',
    alt: 'Single silk and zari thread at microscopic scale',
    label: 'THE THREAD',
    detail: 'Every fiber tells a story',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// SCROLL PROGRESS → SMOOTH SPRING
// ─────────────────────────────────────────────────────────────────────────────
function useSmoothScroll(scrollYProgress: MotionValue<number>) {
  return useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 25,
    mass: 0.5,
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// LAYER COMPONENT — each zoom layer
// ─────────────────────────────────────────────────────────────────────────────
interface LayerProps {
  src: string;
  alt: string;
  /** When to start appearing [0–1] */
  enterAt: number;
  /** When fully visible [0–1] */
  peakAt: number;
  /** When to start disappearing [0–1] */
  leaveAt: number;
  /** When fully gone [0–1] */
  goneAt: number;
  /** Zoom-in scale at peak vs at entry */
  zoomScale: number;
  smoothScroll: MotionValue<number>;
  zIndex: number;
}

const ZoomLayer: React.FC<LayerProps> = ({
  src,
  alt,
  enterAt,
  peakAt,
  leaveAt,
  goneAt,
  zoomScale,
  smoothScroll,
  zIndex,
}) => {
  const opacity = useTransform(
    smoothScroll,
    [enterAt, peakAt, leaveAt, goneAt],
    [0, 1, 1, 0]
  );

  const scale = useTransform(
    smoothScroll,
    [enterAt, goneAt],
    [1, zoomScale]
  );

  // Subtle parallax drift
  const translateY = useTransform(
    smoothScroll,
    [enterAt, goneAt],
    ['0%', '-3%']
  );

  return (
    <motion.div
      className="absolute inset-0 w-full h-full"
      style={{ opacity, zIndex }}
    >
      <motion.div
        className="absolute inset-0 w-full h-full"
        style={{ scale, y: translateY, transformOrigin: 'center 40%' }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          quality={90}
          sizes="100vw"
          className="object-cover object-center"
          priority={enterAt < 0.1}
        />
      </motion.div>
    </motion.div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// MOVING LIGHT SWEEP — soft gradient that drifts across as user scrolls
// ─────────────────────────────────────────────────────────────────────────────
const LightSweep: React.FC<{ smoothScroll: MotionValue<number> }> = ({ smoothScroll }) => {
  const x = useTransform(smoothScroll, [0, 1], ['-60%', '60%']);
  const opacity = useTransform(smoothScroll, [0, 0.1, 0.9, 1], [0, 0.35, 0.35, 0]);

  return (
    <motion.div
      className="absolute inset-0 pointer-events-none z-[30]"
      style={{ opacity }}
    >
      <motion.div
        className="absolute inset-y-0 w-[40%] bg-gradient-to-r from-transparent via-[#FFF8EE]/25 to-transparent blur-2xl"
        style={{ x, left: '30%' }}
      />
    </motion.div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// OPENING TITLE (fades out as scroll begins)
// ─────────────────────────────────────────────────────────────────────────────
const OpeningTitle: React.FC<{ smoothScroll: MotionValue<number> }> = ({ smoothScroll }) => {
  const opacity = useTransform(smoothScroll, [0, 0.12, 0.2], [1, 1, 0]);
  const y = useTransform(smoothScroll, [0, 0.2], ['0px', '-32px']);

  return (
    <motion.div
      style={{ opacity, y }}
      className="absolute inset-x-0 top-12 md:top-16 z-[50] flex flex-col items-center text-center px-6 pointer-events-none"
    >
      {/* Eyebrow pill */}
      <span className="inline-flex items-center gap-2 text-[10px] md:text-[11px] uppercase tracking-[0.35em] text-[#5E0006] bg-[#FAF7F2]/95 border border-[#D8C6A5]/70 px-5 py-1.5 rounded-full font-semibold mb-4 shadow-sm">
        <span className="w-1 h-1 rounded-full bg-[#5E0006] inline-block" />
        THE ATELIER EXPERIENCE
        <span className="w-1 h-1 rounded-full bg-[#5E0006] inline-block" />
      </span>

      {/* Headline */}
      <h2 className="font-hero text-4xl sm:text-6xl md:text-7xl text-[#292321] uppercase tracking-[0.1em] leading-[1.05]">
        Art in{' '}
        <em className="not-italic text-[#5E0006] font-normal italic">Motion</em>
      </h2>

      {/* Supporting line */}
      <p className="mt-3 font-sans text-xs md:text-sm font-light text-[#736357] leading-relaxed tracking-wide max-w-sm">
        Where silk, zari and centuries of Indian craftsmanship
        <br className="hidden sm:block" /> move as one.
      </p>

      {/* Scroll cue */}
      <div className="mt-6 flex flex-col items-center gap-1 opacity-60">
        <span className="text-[9px] uppercase tracking-[0.3em] text-[#5E0006]">Scroll to explore</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-4 h-4 flex items-center justify-center"
        >
          <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4 text-[#5E0006]">
            <path d="M8 2v10M4 9l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.div>
      </div>
    </motion.div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// STAGE LABEL CARD — slides in / out on each stage
// ─────────────────────────────────────────────────────────────────────────────
interface StageLabelProps {
  label: string;
  detail: string;
  stageNum: string;
  enterAt: number;
  leaveAt: number;
  smoothScroll: MotionValue<number>;
  align: 'left' | 'right';
}

const StageLabel: React.FC<StageLabelProps> = ({
  label, detail, stageNum, enterAt, leaveAt, smoothScroll, align,
}) => {
  const mid = (enterAt + leaveAt) / 2;
  const opacity = useTransform(
    smoothScroll,
    [enterAt, enterAt + 0.04, leaveAt - 0.04, leaveAt],
    [0, 1, 1, 0]
  );
  const x = useTransform(
    smoothScroll,
    [enterAt, mid],
    [align === 'left' ? -24 : 24, 0]
  );

  return (
    <motion.div
      style={{ opacity, x }}
      className={`absolute bottom-16 md:bottom-20 z-[50] ${
        align === 'left' ? 'left-8 md:left-16 lg:left-24' : 'right-8 md:right-16 lg:right-24 text-right'
      }`}
    >
      <div className="bg-[#FAF7F2]/90 backdrop-blur-md border border-[#D8C6A5]/70 rounded-xl px-6 py-5 shadow-xl max-w-xs">
        <div className={`w-8 h-[1.5px] bg-[#5E0006] mb-3 ${align === 'right' ? 'ml-auto' : ''}`} />
        <span className="block text-[9px] uppercase tracking-[0.35em] text-[#5E0006] font-semibold mb-1">
          {stageNum}
        </span>
        <p className="font-hero text-xl md:text-2xl uppercase tracking-[0.1em] text-[#292321] leading-tight">
          {label}
        </p>
        <p className="mt-2 font-sans text-xs text-[#736357] font-light leading-relaxed">
          {detail}
        </p>
      </div>
    </motion.div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// CLOSING CARD — "Every Thread Tells a Story"
// ─────────────────────────────────────────────────────────────────────────────
const ClosingTitle: React.FC<{ smoothScroll: MotionValue<number> }> = ({ smoothScroll }) => {
  const opacity = useTransform(smoothScroll, [0.85, 0.92, 1], [0, 1, 1]);
  const y = useTransform(smoothScroll, [0.85, 0.95], ['24px', '0px']);

  return (
    <motion.div
      style={{ opacity, y }}
      className="absolute inset-x-0 bottom-16 md:bottom-20 z-[50] flex flex-col items-center text-center px-6 pointer-events-none"
    >
      <span className="inline-flex items-center gap-2 text-[9px] uppercase tracking-[0.35em] text-[#5E0006] bg-[#FAF7F2]/95 border border-[#D8C6A5]/70 px-4 py-1.5 rounded-full font-semibold mb-3 shadow-sm">
        WOVEN BY HAND · PRESERVED THROUGH GENERATIONS
      </span>
      <h2 className="font-hero text-3xl sm:text-5xl md:text-6xl text-[#292321] uppercase tracking-[0.1em] leading-tight">
        Every Thread
        <br />
        <em className="not-italic text-[#5E0006] italic font-normal">Tells a Story</em>
      </h2>
    </motion.div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// PROGRESS BAR
// ─────────────────────────────────────────────────────────────────────────────
const ProgressBar: React.FC<{ smoothScroll: MotionValue<number> }> = ({ smoothScroll }) => {
  const width = useTransform(smoothScroll, [0, 1], ['0%', '100%']);
  return (
    <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#D8C6A5]/40 z-[60]">
      <motion.div style={{ width }} className="h-full bg-gradient-to-r from-[#5E0006] via-[#B79A5B] to-[#5E0006]" />
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// FRAME ACCENTS
// ─────────────────────────────────────────────────────────────────────────────
const FrameAccents: React.FC = () => (
  <div className="absolute inset-6 md:inset-10 border border-[#D8C6A5]/50 rounded-sm z-[40] pointer-events-none">
    <div className="absolute top-2.5 left-2.5 w-3.5 h-3.5 border-t-2 border-l-2 border-[#5E0006]/60" />
    <div className="absolute top-2.5 right-2.5 w-3.5 h-3.5 border-t-2 border-r-2 border-[#5E0006]/60" />
    <div className="absolute bottom-2.5 left-2.5 w-3.5 h-3.5 border-b-2 border-l-2 border-[#5E0006]/60" />
    <div className="absolute bottom-2.5 right-2.5 w-3.5 h-3.5 border-b-2 border-r-2 border-[#5E0006]/60" />
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// MAIN EXPORT
// ─────────────────────────────────────────────────────────────────────────────
export const AppleStyleScrollSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const smooth = useSmoothScroll(scrollYProgress);

  /**
   * LAYER SCHEDULE — 4 layers, each layer occupies ~35% of scroll with overlap.
   * Transition region ~10% so the zoom hides the crossfade.
   *
   *  Layer 0 (Full Mannequin):  0.00 → peak 0.05 → leave 0.25 → gone 0.35
   *  Layer 1 (Pallu):           0.25 → peak 0.35 → leave 0.55 → gone 0.65
   *  Layer 2 (Zari/Weave):      0.55 → peak 0.65 → leave 0.80 → gone 0.90
   *  Layer 3 (Thread):          0.80 → peak 0.90 → leave 1.00 → gone 1.00
   */
  const layerSchedule: Array<[number, number, number, number, number]> = [
    [0.00, 0.05, 0.25, 0.35, 1.35],
    [0.25, 0.35, 0.55, 0.65, 1.45],
    [0.55, 0.65, 0.80, 0.90, 1.55],
    [0.80, 0.90, 1.00, 1.00, 1.65],
  ];

  const stageLabelSchedule: Array<{
    stageNum: string;
    enterAt: number;
    leaveAt: number;
    align: 'left' | 'right';
  }> = [
    { stageNum: 'STAGE 01 — THE SAREE', enterAt: 0.08, leaveAt: 0.26, align: 'right' },
    { stageNum: 'STAGE 02 — THE PALLU',  enterAt: 0.35, leaveAt: 0.54, align: 'left' },
    { stageNum: 'STAGE 03 — ANTIQUE ZARI', enterAt: 0.65, leaveAt: 0.79, align: 'right' },
  ];

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[400vh] font-satoshi"
      aria-label="Art in Motion — saree craftsmanship journey"
    >
      {/* ── PINNED STAGE ── */}
      <div className="sticky top-0 w-full h-screen overflow-hidden bg-[#F4EFE7]">

        {/* Subtle paper grain */}
        <div
          className="absolute inset-0 z-[1] pointer-events-none opacity-[0.15] mix-blend-multiply"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Warm vignette / atmosphere */}
        <div className="absolute inset-0 z-[2] pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_70%_at_50%_50%,transparent_40%,rgba(94,0,6,0.06)_100%)]" />
          <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#F4EFE7]/80 to-transparent" />
        </div>

        {/* ── IMAGE ZOOM LAYERS ── */}
        <div className="absolute inset-0 z-[10]">
          {STAGES.map((stage, i) => {
            const [enterAt, peakAt, leaveAt, goneAt, zoomScale] = layerSchedule[i];
            return (
              <ZoomLayer
                key={stage.src}
                src={stage.src}
                alt={stage.alt}
                enterAt={enterAt}
                peakAt={peakAt}
                leaveAt={leaveAt}
                goneAt={goneAt}
                zoomScale={zoomScale}
                smoothScroll={smooth}
                zIndex={10 + i}
              />
            );
          })}
        </div>

        {/* ── LIGHT SWEEP ── */}
        <LightSweep smoothScroll={smooth} />

        {/* ── EDITORIAL FRAME ── */}
        <FrameAccents />

        {/* ── OPENING TITLE ── */}
        <OpeningTitle smoothScroll={smooth} />

        {/* ── STAGE LABELS ── */}
        {stageLabelSchedule.map((s, i) => (
          <StageLabel
            key={s.stageNum}
            label={STAGES[i].label}
            detail={STAGES[i].detail}
            stageNum={s.stageNum}
            enterAt={s.enterAt}
            leaveAt={s.leaveAt}
            smoothScroll={smooth}
            align={s.align}
          />
        ))}

        {/* ── CLOSING CARD ── */}
        <ClosingTitle smoothScroll={smooth} />

        {/* ── PROGRESS BAR ── */}
        <ProgressBar smoothScroll={smooth} />
      </div>
    </section>
  );
};

AppleStyleScrollSection.displayName = 'AppleStyleScrollSection';
