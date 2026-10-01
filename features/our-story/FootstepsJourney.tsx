'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Compass, MapPin } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { STORY_MILESTONES } from './storyData';

gsap.registerPlugin(ScrollTrigger);

// ─────────────────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────────────────
interface FootstepPoint {
  x: number;
  y: number;
  angle: number;
  isRight: boolean;
  progress: number;
}

interface WaypointPoint {
  x: number;
  y: number;
  year: string;
  chapterIndex: number;
  progress: number;
}

// ─────────────────────────────────────────────────────────────────────────────
// ABHI-MOH — FOOTSTEPS JOURNEY MAP
//
// Layout Architecture:
//  • Document Flow: Each chapter block is a normal ~100vh section in document flow.
//    Alternating left (2020), right (2021), left (2022), right (2023), etc.
//  • Background SVG: Spans 100% of container width & height directly behind blocks.
//  • Route: Dynamically passes through real DOM waypoint coordinates beside each card.
//  • Footprints: Anatomical silhouette (heel, sole, 5 toe pads), walking along
//    the route with alternating left/right feet offset from the centerline.
//  • ScrollTrigger: Scrubbed progress reveals walked footsteps and crimson path.
//  • Individual Chapter ScrollTriggers: Smooth slide & fade in, solid text on ivory.
//  • Zero Three.js / Canvas. Reversible GSAP lifecycle.
// ─────────────────────────────────────────────────────────────────────────────

export const FootstepsJourney: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const chaptersContainerRef = useRef<HTMLDivElement>(null);
  const chapterRefs = useRef<(HTMLDivElement | null)[]>([]);
  const pathRef = useRef<SVGPathElement>(null);

  const [dimensions, setDimensions] = useState<{ width: number; height: number }>({
    width: 1200,
    height: 4800,
  });
  const [pathD, setPathD] = useState<string>('');
  const [pathLength, setPathLength] = useState<number>(0);
  const [footsteps, setFootsteps] = useState<FootstepPoint[]>([]);
  const [waypoints, setWaypoints] = useState<WaypointPoint[]>([]);
  const [scrollProg, setScrollProg] = useState<number>(0);
  const [reducedMotion, setReducedMotion] = useState<boolean>(false);

  // ── 1. Measure DOM & build route and footsteps ────────────────────────────
  useEffect(() => {
    const isReduced =
      typeof window !== 'undefined'
        ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
        : false;
    setReducedMotion(isReduced);

    const updateLayout = () => {
      const container = chaptersContainerRef.current;
      if (!container) return;

      const containerRect = container.getBoundingClientRect();
      const width = container.offsetWidth;
      const height = container.offsetHeight;
      if (width === 0 || height === 0) return;

      setDimensions({ width, height });

      const isMobile = width < 1024;
      const calculatedWaypoints: { x: number; y: number }[] = [];

      // Starting point at top
      const startX = isMobile ? 28 : width * 0.5;
      const startY = 30;
      calculatedWaypoints.push({ x: startX, y: startY });

      // Calculate waypoint beside each chapter block
      chapterRefs.current.forEach((blockEl, idx) => {
        if (!blockEl) return;
        const cardEl = blockEl.querySelector<HTMLElement>('.milestone-card') || blockEl;
        const cardRect = cardEl.getBoundingClientRect();
        const cardCenterY = cardRect.top - containerRect.top + cardRect.height * 0.45;

        let targetX: number;
        if (isMobile) {
          // On mobile, footsteps follow a dedicated path on the left edge
          targetX = 28;
        } else if (idx === STORY_MILESTONES.length - 1) {
          // Today (centered)
          targetX = width * 0.5;
        } else if (idx % 2 === 0) {
          // Left card: waypoint sits to the right in center corridor
          targetX = width * 0.54;
        } else {
          // Right card: waypoint sits to the left in center corridor
          targetX = width * 0.46;
        }

        calculatedWaypoints.push({ x: targetX, y: cardCenterY });
      });

      // End point leading downwards past the final card
      const lastPt = calculatedWaypoints[calculatedWaypoints.length - 1];
      calculatedWaypoints.push({ x: lastPt.x, y: Math.min(height - 40, lastPt.y + 140) });

      // Generate smooth cubic bezier SVG path connecting waypoints
      let d = `M ${calculatedWaypoints[0].x.toFixed(1)} ${calculatedWaypoints[0].y.toFixed(1)}`;
      for (let i = 1; i < calculatedWaypoints.length; i++) {
        const prev = calculatedWaypoints[i - 1];
        const curr = calculatedWaypoints[i];
        const dy = curr.y - prev.y;
        const cp1x = prev.x;
        const cp1y = prev.y + dy * 0.48;
        const cp2x = curr.x;
        const cp2y = curr.y - dy * 0.48;
        d += ` C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${curr.x.toFixed(1)} ${curr.y.toFixed(1)}`;
      }

      setPathD(d);

      // Measure path and generate footsteps
      const svgNS = 'http://www.w3.org/2000/svg';
      const tmpSvg = document.createElementNS(svgNS, 'svg');
      tmpSvg.setAttribute('viewBox', `0 0 ${width} ${height}`);
      tmpSvg.style.cssText = 'position:absolute;visibility:hidden;pointer-events:none';
      const tmpPath = document.createElementNS(svgNS, 'path');
      tmpPath.setAttribute('d', d);
      tmpSvg.appendChild(tmpPath);
      document.body.appendChild(tmpSvg);

      const totalLen = tmpPath.getTotalLength();
      setPathLength(totalLen);

      if (totalLen > 0) {
        // Step spacing ~52px
        const stepDist = 52;
        const numSteps = Math.floor(totalLen / stepDist);
        const steps: FootstepPoint[] = [];

        for (let i = 0; i <= numSteps; i++) {
          const s = i * stepDist + 20;
          if (s > totalLen - 12) break;

          const pt = tmpPath.getPointAtLength(s);
          const ptNext = tmpPath.getPointAtLength(Math.min(s + 3, totalLen));
          const rad = Math.atan2(ptNext.y - pt.y, ptNext.x - pt.x);
          const perp = rad + Math.PI / 2;
          const isRight = i % 2 === 1;
          const offset = isRight ? 10 : -10;

          steps.push({
            x: pt.x + Math.cos(perp) * offset,
            y: pt.y + Math.sin(perp) * offset,
            angle: (rad * 180) / Math.PI + 90,
            isRight,
            progress: s / totalLen,
          });
        }

        setFootsteps(steps);

        // Waypoints with progress
        const wps: WaypointPoint[] = [];
        for (let m = 0; m < STORY_MILESTONES.length; m++) {
          const pt = calculatedWaypoints[m + 1];
          const progressRatio = (m + 0.6) / (STORY_MILESTONES.length + 0.6);
          wps.push({
            x: pt.x,
            y: pt.y,
            year: STORY_MILESTONES[m].year,
            chapterIndex: m,
            progress: progressRatio,
          });
        }
        setWaypoints(wps);
      }

      document.body.removeChild(tmpSvg);
    };

    // Run layout calculation
    updateLayout();
    const timer1 = setTimeout(updateLayout, 150);
    const timer2 = setTimeout(updateLayout, 600);

    if (typeof document !== 'undefined' && 'fonts' in document) {
      document.fonts.ready.then(updateLayout);
    }

    const handleResize = () => {
      updateLayout();
      ScrollTrigger.refresh();
    };

    window.addEventListener('resize', handleResize);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // ── 2. GSAP ScrollTrigger for Walk & Cards ─────────────────────────────────
  useEffect(() => {
    if (!chaptersContainerRef.current) return;

    const ctx = gsap.context(() => {
      if (reducedMotion) {
        setScrollProg(1);
        chapterRefs.current.forEach((block) => {
          const card = block?.querySelector<HTMLElement>('.milestone-card');
          if (card) gsap.set(card, { opacity: 1, y: 0 });
        });
        return;
      }

      // Single ScrollTrigger to scrub the walk progress
      ScrollTrigger.create({
        trigger: chaptersContainerRef.current,
        start: 'top 35%',
        end: 'bottom 85%',
        scrub: 0.6,
        onUpdate: (self) => {
          setScrollProg(self.progress);
        },
      });

      // Individual ScrollTrigger for each chapter card
      chapterRefs.current.forEach((block) => {
        if (!block) return;
        const card = block.querySelector<HTMLElement>('.milestone-card');
        if (!card) return;

        gsap.fromTo(
          card,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: block,
              start: 'top 75%',
              end: 'bottom 25%',
              toggleActions: 'play reverse play reverse',
            },
          }
        );
      });
    }, chaptersContainerRef);

    return () => {
      ctx.revert();
    };
  }, [reducedMotion, pathLength]);

  return (
    <div
      ref={containerRef}
      className="relative w-full bg-[#FAF7F2] text-[#2A221E] selection:bg-[#7D2130] selection:text-[#FAF7F2]"
    >
      {/* ── EDITORIAL HEADER ──────────────────────────────────────────────── */}
      <section className="relative w-full pt-36 pb-20 sm:pt-44 sm:pb-28 px-6 sm:px-12 text-center max-w-4xl mx-auto z-20">
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#F3ECE3] border border-[#E8DFD5] mb-6">
          <Compass className="w-3.5 h-3.5 text-[#C9A96E]" />
          <span className="font-satoshi text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.35em] text-[#7D2130]">
            THE FOOTSTEPS JOURNEY &bull; 2020 &mdash; TODAY
          </span>
        </div>

        <h1 className="font-hero text-4xl sm:text-6xl md:text-7xl lg:text-8xl uppercase tracking-[0.08em] text-[#2A221E] leading-[1.05] mb-6">
          The Story of
          <span className="block text-[#7D2130]">ABHI-MOH</span>
        </h1>

        <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#C9A96E] to-transparent mx-auto mb-6" />

        <p className="font-satoshi text-sm sm:text-base md:text-lg text-[#5C4D44] font-light max-w-2xl mx-auto leading-relaxed">
          Follow the footprints across India&apos;s sacred loom corridors. Every milestone marks a discovery
          in silk, antique zari, and generational devotion.
        </p>

        <div className="mt-12 flex flex-col items-center gap-2 text-[#A67C52]">
          <span className="text-[10px] uppercase tracking-[0.35em] font-medium">Scroll to walk the path</span>
          <div className="w-5 h-8 rounded-full border border-[#C9A96E]/60 flex items-start justify-center p-1">
            <div className="w-1.5 h-2 bg-[#7D2130] rounded-full animate-bounce" />
          </div>
        </div>
      </section>

      {/* ── CHAPTER CONTAINER WITH BACKGROUND SVG ──────────────────────────── */}
      <div
        ref={chaptersContainerRef}
        className="relative w-full max-w-7xl mx-auto"
        style={{ minHeight: `${dimensions.height}px` }}
      >
        {/* ── BACKGROUND CARTOGRAPHIC SVG ──────────────────────────────────── */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none z-0"
          viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <defs>
            {/* High-fidelity anatomical bare footprint silhouette (right foot) */}
            <g id="footprint-right">
              {/* Sole, arch, ball, and heel pad */}
              <path d="M 0, 16 C -3.5, 16 -5, 12 -4.5, 8 C -4, 4 -1.8, 1 -1.8, -3 C -3.8, -5.5 -5.2, -9 -4.8, -13 C -4.2, -16.5 0.5, -16.5 3, -14 C 5.5, -12 7.2, -8.5 6.8, -4 C 6.4, 2 5.2, 8 4.2, 12 C 3.2, 16 1.8, 16 0, 16 Z" />
              {/* 5 Distinct toe pads */}
              <ellipse cx="-3.2" cy="-20.5" rx="2.6" ry="3.4" transform="rotate(-6 -3.2 -20.5)" />
              <ellipse cx="0.5" cy="-19.8" rx="1.9" ry="2.5" transform="rotate(2 0.5 -19.8)" />
              <ellipse cx="3.5" cy="-18.2" rx="1.7" ry="2.2" transform="rotate(8 3.5 -18.2)" />
              <ellipse cx="5.8" cy="-16.0" rx="1.5" ry="1.9" transform="rotate(14 5.8 -16.0)" />
              <ellipse cx="7.6" cy="-13.2" rx="1.3" ry="1.6" transform="rotate(20 7.6 -13.2)" />
            </g>
            {/* Mirror for left foot */}
            <g id="footprint-left">
              <use href="#footprint-right" transform="scale(-1, 1)" />
            </g>
          </defs>

          {/* Faint cartographic latitude/longitude lines */}
          <g opacity="0.09" stroke="#C9A96E" strokeWidth="0.75" strokeDasharray="3, 8">
            {Array.from({ length: 7 }).map((_, i) => {
              const y = (dimensions.height / 7) * (i + 0.5);
              return <line key={`h-${i}`} x1="0" y1={y} x2={dimensions.width} y2={y} />;
            })}
            {dimensions.width >= 1024 && (
              <>
                <line x1={dimensions.width * 0.25} y1="0" x2={dimensions.width * 0.25} y2={dimensions.height} />
                <line x1={dimensions.width * 0.5} y1="0" x2={dimensions.width * 0.5} y2={dimensions.height} />
                <line x1={dimensions.width * 0.75} y1="0" x2={dimensions.width * 0.75} y2={dimensions.height} />
              </>
            )}
          </g>

          {/* Vintage compass rose in top corner */}
          <g
            transform={`translate(${dimensions.width >= 1024 ? dimensions.width - 90 : dimensions.width - 45}, 70)`}
            opacity="0.22"
            stroke="#C9A96E"
            fill="none"
          >
            <circle r="26" strokeWidth="0.8" strokeDasharray="1, 4" />
            <path d="M 0,-26 L 0,26 M -26,0 L 26,0" strokeWidth="0.8" />
            <polygon points="0,-20 3.5,-5 0,0 -3.5,-5" fill="#7D2130" stroke="none" />
            <polygon points="0,20 3.5,5 0,0 -3.5,5" fill="#C9A96E" stroke="none" />
            <text x="0" y="-29" textAnchor="middle" fontSize="7.5" fill="#7D2130" fontFamily="serif" fontWeight="bold">
              N
            </text>
          </g>

          {/* Full historical route (dotted antique gold) */}
          {pathD && (
            <path
              d={pathD}
              fill="none"
              stroke="#C9A96E"
              strokeWidth="2"
              strokeDasharray="4, 8"
              opacity="0.35"
            />
          )}

          {/* Active walked route (revealed in crimson as user scrolls) */}
          {pathD && pathLength > 0 && (
            <path
              ref={pathRef}
              d={pathD}
              fill="none"
              stroke="#7D2130"
              strokeWidth="2.4"
              strokeDasharray={pathLength}
              strokeDashoffset={reducedMotion ? 0 : Math.max(0, pathLength * (1 - scrollProg))}
              opacity="0.8"
              style={{ transition: 'stroke-dashoffset 0.05s linear' }}
            />
          )}

          {/* Footsteps along the path */}
          {footsteps.map((fp, i) => {
            const isVisible = reducedMotion || scrollProg >= fp.progress;
            if (!isVisible) return null;
            const age = scrollProg - fp.progress;
            const isFresh = age < 0.04;
            const opacity = reducedMotion ? 0.75 : Math.max(0.35, 0.95 - age * 0.65);
            const scale = reducedMotion ? 1.0 : isFresh ? 1.15 : 1.0;

            return (
              <g
                key={i}
                transform={`translate(${fp.x.toFixed(1)},${fp.y.toFixed(1)}) rotate(${fp.angle.toFixed(1)}) scale(${scale})`}
                fill={fp.isRight ? '#7D2130' : '#8C2636'}
                opacity={opacity}
                style={{ transition: 'opacity 0.25s ease-out, transform 0.25s ease-out' }}
              >
                <use href={fp.isRight ? '#footprint-right' : '#footprint-left'} />
              </g>
            );
          })}

          {/* Milestone Waypoint Markers */}
          {waypoints.map((wp) => {
            const isActive = reducedMotion || scrollProg >= wp.progress - 0.05;
            const isRightSide = wp.x > dimensions.width * 0.5;

            return (
              <g key={wp.year} transform={`translate(${wp.x.toFixed(1)},${wp.y.toFixed(1)})`}>
                {/* Active ripple glow */}
                {isActive && !reducedMotion && (
                  <circle r="18" fill="rgba(201,169,110,0.18)" stroke="#C9A96E" strokeWidth="0.8">
                    <animate attributeName="r" values="14;22;14" dur="2.8s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.7;0.1;0.7" dur="2.8s" repeatCount="indefinite" />
                  </circle>
                )}

                {/* Outer ring */}
                <circle
                  r={isActive ? 11 : 8}
                  fill="#FAF7F2"
                  stroke={isActive ? '#7D2130' : '#C9A96E'}
                  strokeWidth={isActive ? 2 : 1.2}
                  style={{ transition: 'all 0.4s ease' }}
                />

                {/* Inner dot */}
                <circle
                  r={isActive ? 4.5 : 3}
                  fill={isActive ? '#7D2130' : '#C9A96E'}
                  style={{ transition: 'all 0.4s ease' }}
                />

                {/* Year Label (on desktop) */}
                {dimensions.width >= 1024 && (
                  <text
                    x={isRightSide ? -18 : 18}
                    y="4"
                    textAnchor={isRightSide ? 'end' : 'start'}
                    fontSize="11"
                    fontFamily="serif"
                    fontWeight={isActive ? '600' : '400'}
                    fill={isActive ? '#7D2130' : '#8A7A70'}
                    style={{ transition: 'all 0.3s ease' }}
                  >
                    {wp.year}
                  </text>
                )}
              </g>
            );
          })}
        </svg>

        {/* ── CHAPTER BLOCKS IN NORMAL FLOW ───────────────────────────────── */}
        <div className="relative w-full z-10">
          {STORY_MILESTONES.map((milestone, idx) => {
            const isFinale = idx === STORY_MILESTONES.length - 1;
            const isEven = idx % 2 === 0;

            return (
              <div
                key={milestone.year}
                ref={(el) => {
                  chapterRefs.current[idx] = el;
                }}
                className={`chapter-block min-h-[85vh] lg:min-h-[100vh] flex items-center py-12 lg:py-24 pl-16 pr-4 sm:pl-20 sm:pr-6 lg:px-16 ${
                  isFinale
                    ? 'justify-center pl-4 pr-4 sm:pl-6 sm:pr-6'
                    : isEven
                      ? 'justify-start lg:pl-16 xl:pl-24'
                      : 'justify-start lg:justify-end lg:pr-16 xl:pr-24'
                }`}
              >
                <div
                  className={`milestone-card relative rounded-2xl p-7 sm:p-10 lg:p-12 shadow-xl border border-[#E8DFD5] bg-[#FAF7F2] transition-colors duration-300 hover:border-[#C9A96E]/60 ${
                    isFinale
                      ? 'max-w-2xl w-full text-center border-[#7D2130]/30 shadow-2xl'
                      : 'max-w-xl w-full text-left'
                  }`}
                >
                  {/* Subtle warm paper lighting */}
                  <div
                    className="absolute inset-0 rounded-2xl pointer-events-none"
                    style={{
                      background:
                        'linear-gradient(135deg, rgba(250,247,242,0.98) 0%, rgba(246,238,228,0.85) 100%)',
                    }}
                  />

                  {/* Year + Chapter Badge */}
                  <div
                    className={`relative z-10 flex items-baseline gap-4 mb-4 sm:mb-5 ${
                      isFinale ? 'justify-center' : 'justify-between'
                    }`}
                  >
                    <span className="font-hero text-4xl sm:text-6xl lg:text-7xl font-light tracking-tight text-[#7D2130] leading-none">
                      {milestone.year}
                    </span>
                    <div className="flex flex-col items-end">
                      <span className="font-satoshi text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.35em] text-[#C9A96E]">
                        {milestone.chapter}
                      </span>
                      <div className="h-[1px] w-12 bg-[#C9A96E]/50 mt-1" />
                    </div>
                  </div>

                  {/* Title */}
                  <h2 className="relative z-10 font-hero text-2xl sm:text-3xl lg:text-4xl uppercase tracking-[0.06em] text-[#2A221E] mb-3 leading-snug">
                    {milestone.title}
                  </h2>

                  {/* Location + Craft Heritage */}
                  <div
                    className={`relative z-10 flex flex-wrap items-center gap-2 mb-4 sm:mb-5 font-satoshi text-xs text-[#5C4D44] ${
                      isFinale ? 'justify-center' : ''
                    }`}
                  >
                    <MapPin className="w-3.5 h-3.5 text-[#7D2130] flex-shrink-0" />
                    <span className="font-semibold tracking-wide text-[#2A221E]">
                      {milestone.location}
                    </span>
                    <span className="text-[#C9A96E]">&bull;</span>
                    <span className="italic font-normal text-[#5C4D44]">{milestone.craftHeritage}</span>
                  </div>

                  {/* Divider */}
                  <div
                    className={`relative z-10 h-[1.5px] w-16 bg-gradient-to-r from-[#C9A96E] to-transparent mb-4 sm:mb-5 ${
                      isFinale ? 'mx-auto' : ''
                    }`}
                  />

                  {/* Body text: Solid dark text on ivory, completely readable */}
                  <p className="relative z-10 font-satoshi text-sm sm:text-base font-normal text-[#382C26] leading-relaxed">
                    {milestone.body}
                  </p>

                  {/* Finale Action Button */}
                  {isFinale && (
                    <div className="relative z-10 mt-8 sm:mt-10 flex flex-col items-center gap-4">
                      <Link
                        href="/collections"
                        className="inline-flex items-center gap-3 px-8 sm:px-9 py-3.5 sm:py-4 bg-[#7D2130] text-[#FAF7F2] font-satoshi text-xs font-semibold uppercase tracking-[0.25em] rounded-full shadow-lg hover:bg-[#601420] hover:scale-105 transition-all duration-300"
                      >
                        <span>Explore the Collections</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                      <span className="text-[10px] uppercase tracking-[0.3em] text-[#A67C52] font-satoshi font-medium">
                        The Essence of Elegance &bull; ABHI-MOH
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

FootstepsJourney.displayName = 'FootstepsJourney';
