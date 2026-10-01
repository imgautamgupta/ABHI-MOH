'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

// ─────────────────────────────────────────────────────────────────────────────
// OUR STORY HOME FALLBACK
//
// Editorial, non-WebGL fallback for the homepage Our Story section.
// Used when WebGL is unavailable or prefers-reduced-motion is active.
// ─────────────────────────────────────────────────────────────────────────────

interface ChapterItem {
  id: string;
  num: string;
  eyebrow: string;
  heading: string;
  body: string;
  detail?: string;
  imageSrc: string;
  imageAlt: string;
  dark?: boolean;
}

const FALLBACK_CHAPTERS: ChapterItem[] = [
  {
    id: 'ch01',
    num: '01',
    eyebrow: '2020',
    heading: 'OUR STORY',
    body: 'A beginning woven from an idea — the belief that a saree deserves to be discovered, not just purchased.',
    detail: 'The genesis of ABHI-MOH began with a reverence for authentic Indian weaves.',
    imageSrc: '/assets/sarees/saree-maroon.png',
    imageAlt: 'Rich burgundy handwoven silk saree',
  },
  {
    id: 'ch02',
    num: '02',
    eyebrow: 'THE BEGINNING',
    heading: 'THE VISION',
    body: 'We began with a simple belief — that a saree could carry more than beauty. Memory, craftsmanship, identity.',
    detail: 'Preserving time-honored techniques while speaking to the contemporary connoisseur.',
    imageSrc: '/assets/sarees/banarasi-detail.png',
    imageAlt: 'Detailed handloom Banarasi silk weave',
  },
  {
    id: 'ch03',
    num: '03',
    eyebrow: 'THE CRAFT',
    heading: 'THE SEARCH',
    body: "Beyond trends, we looked closer — towards the regions, traditions and hands that keep India's weaving heritage alive.",
    detail: 'Journeying across Varanasi, Kanchipuram, and Chanderi to find master artisans.',
    imageSrc: '/assets/sarees/kanjivaram-detail.png',
    imageAlt: 'Intricate Kanjivaram zari border work',
    dark: true,
  },
  {
    id: 'ch04',
    num: '04',
    eyebrow: 'SILK & ZARI',
    heading: 'THE CRAFT',
    body: 'Every thread tells a story. Silk, zari, and the hands that weave them — this is where Indian heritage lives.',
    detail: 'Pure mulberry silk intertwined with electroplated metallic gold threads.',
    imageSrc: '/assets/sarees/hero-mannequin.png',
    imageAlt: 'Graceful drape of an artisanal silk saree',
    dark: true,
  },
  {
    id: 'ch05',
    num: '05',
    eyebrow: 'THE EDIT',
    heading: 'THE CURATION',
    body: 'Every piece considered with intention — from its weave and origin to the hands that bring it to life.',
    detail: 'Strict curation criteria ensuring museum-grade finishing on every single piece.',
    imageSrc: '/assets/sarees/chanderi-detail.png',
    imageAlt: 'Delicate Chanderi silk fabric with gold motif',
  },
  {
    id: 'ch06',
    num: '06',
    eyebrow: 'THE HOUSE',
    heading: 'ABHI-MOH',
    body: 'What began in 2020 as an idea grew into ABHI-MOH — a house built around timeless Indian craftsmanship.',
    detail: 'The Essence of Elegance — rooted in heritage, sculpted for today.',
    imageSrc: '/assets/sarees/saree-gold.png',
    imageAlt: 'Royal gold and zari saree',
  },
  {
    id: 'ch07',
    num: '07',
    eyebrow: 'TODAY',
    heading: 'THE STORY CONTINUES',
    body: 'The story continues with every saree we choose to bring into the world.',
    detail: 'Each piece carries a legacy waiting to become part of your most cherished moments.',
    imageSrc: '/assets/sarees/paithani-detail.png',
    imageAlt: 'Paithani peacock and floral border detail',
  },
];

export const OurStoryHomeFallback: React.FC = () => {
  return (
    <section
      id="our-story-home-fallback"
      className="relative w-full bg-[#FAF7F2] py-24 sm:py-32 overflow-hidden"
      aria-label="ABHI-MOH brand story editorial"
    >
      {/* Editorial Header */}
      <div className="max-w-6xl mx-auto px-6 sm:px-10 mb-20 text-center">
        <span className="font-satoshi text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.45em] text-[#A67C52] block mb-3">
          THE JOURNEY &bull; SINCE 2020
        </span>
        <h2 className="font-hero text-3xl sm:text-5xl lg:text-6xl uppercase tracking-[0.08em] text-[#2A221E] mb-4">
          FROM A THREAD TO ABHI-MOH
        </h2>
        <div className="w-16 h-[1px] bg-[#C9A96E] mx-auto mb-6" />
        <p className="font-satoshi text-sm sm:text-base text-[#5C4D44] max-w-xl mx-auto font-light leading-relaxed">
          The journey of ABHI-MOH through silk, zari, and generations of Indian master craftsmanship.
        </p>
      </div>

      {/* Chapters list */}
      <div className="max-w-6xl mx-auto px-6 sm:px-10 space-y-24 sm:space-y-36">
        {FALLBACK_CHAPTERS.map((ch, idx) => {
          const isEven = idx % 2 === 0;

          return (
            <div
              key={ch.id}
              className={[
                'flex flex-col gap-10 lg:gap-16 items-center',
                isEven ? 'lg:flex-row' : 'lg:flex-row-reverse',
              ].join(' ')}
            >
              {/* Image Frame */}
              <div className="w-full lg:w-1/2 flex justify-center">
                <div className="relative w-full max-w-md aspect-[4/5] rounded-sm overflow-hidden bg-[#E8DDD0] shadow-xl border border-[#C9A96E]/20">
                  <Image
                    src={ch.imageSrc}
                    alt={ch.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover object-center filter saturate-[0.92] hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
                </div>
              </div>

              {/* Text Editorial */}
              <div className="w-full lg:w-1/2 flex flex-col justify-center text-left">
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-satoshi text-xs font-bold uppercase tracking-[0.4em] text-[#C9A96E]">
                    {ch.num}
                  </span>
                  <div className="h-[1px] w-8 bg-[#C9A96E]/50" />
                  <span className="font-satoshi text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.35em] text-[#A67C52]">
                    {ch.eyebrow}
                  </span>
                </div>

                <h3 className="font-hero text-3xl sm:text-4xl lg:text-5xl uppercase tracking-[0.06em] text-[#2A221E] leading-[1.05] mb-5">
                  {ch.heading}
                </h3>

                <p className="font-satoshi text-base sm:text-lg text-[#3E322C] font-light leading-relaxed mb-4">
                  {ch.body}
                </p>

                {ch.detail && (
                  <p className="font-satoshi text-xs sm:text-sm text-[#7D6B5D] font-light italic leading-relaxed border-l-2 border-[#C9A96E]/40 pl-4 py-1">
                    {ch.detail}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Editorial Footer CTA */}
      <div className="max-w-4xl mx-auto px-6 text-center mt-28">
        <div className="inline-block p-8 sm:p-12 border border-[#C9A96E]/30 bg-[#F4EFE7]/60 rounded-sm">
          <span className="font-satoshi text-[10px] uppercase tracking-[0.4em] text-[#A67C52] block mb-2">
            THE HOUSE OF ABHI-MOH
          </span>
          <h4 className="font-hero text-2xl sm:text-3xl uppercase tracking-[0.1em] text-[#2A221E] mb-4">
            DISCOVER THE HANDWOVEN CREATIONS
          </h4>
          <p className="font-satoshi text-sm text-[#5C4D44] font-light max-w-md mx-auto mb-6">
            Each saree is a living archive of Indian heritage, awaiting its place in your story.
          </p>
          <Link
            href="/collections"
            className="inline-flex items-center gap-3 px-8 py-3.5 bg-[#7D2130] text-[#FAF7F2] font-satoshi text-xs font-medium uppercase tracking-[0.25em] transition-all hover:bg-[#631824] shadow-md hover:shadow-lg"
          >
            <span>Explore Collections</span>
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

OurStoryHomeFallback.displayName = 'OurStoryHomeFallback';
