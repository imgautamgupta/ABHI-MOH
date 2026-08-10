'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

import { ChapterSpread, FullBleedMomentData } from './lookbook.types';
import { LookbookHero } from './components/LookbookHero';
import { EditionNav, EDITION_TABS, EditionTab } from './components/EditionNav';
import { EditorialSpread } from './components/EditorialSpread';
import { FullBleedMoment } from './components/FullBleedMoment';
import { LookbookSilkCanvas } from './components/LookbookSilkCanvas';
import { EditionPagination } from './components/EditionPagination';

// CHAPTER SPREAD DATASET (ALTERNATING LIGHT AND DARK THEMES)
const CHAPTER_01: ChapterSpread = {
  id: 'chapter-01',
  chapterNumber: '01',
  chapterTag: 'ORIGIN',
  title: 'THE LANGUAGE OF THE LOOM',
  storyText:
    'Every ABHI-MOH saree begins with an intimate dialogue between hand, thread, and heritage. In ancient weaving ateliers, master weavers calculate intricate silk lattices by memory alone, transforming pure double-twisted silk into drapes of luminous grace.',
  image: '/assets/sarees/saree-maroon.png',
  imageAlt: 'ABHI-MOH Kanjivaram Pure Silk Drape in Deep Velvet Maroon',
  theme: 'LIGHT',
  metadata: {
    craft: 'Kanjivaram Handloom',
    location: 'Kanchipuram, Tamil Nadu',
    artisan: 'Master Weaver Collective',
  },
  productUrl: '/collections',
  imagePosition: 'LEFT',
};

const CHAPTER_02: ChapterSpread = {
  id: 'chapter-02',
  chapterNumber: '02',
  chapterTag: 'CRAFT',
  title: 'ANTIQUE GOLD ZARI',
  storyText:
    'Infused with real gold zari threads woven on traditional wooden pit looms. The gold zari reflects ambient room light with an elusive metallic luster that glows quietly under evening candlelight.',
  image: '/assets/sarees/saree-gold.png',
  imageAlt: 'ABHI-MOH Imperial Gold Brocade Tissue Saree Detail',
  theme: 'DARK',
  metadata: {
    craft: 'Pit Loom Brocade',
    location: 'Varanasi, Uttar Pradesh',
    artisan: 'Kadwa Weaver Guild',
  },
  productUrl: '/collections',
  imagePosition: 'RIGHT',
};

const CHAPTER_03: ChapterSpread = {
  id: 'chapter-03',
  chapterNumber: '03',
  chapterTag: 'TEXTURE',
  title: 'THE HAND OF THE ARTISAN',
  storyText:
    'Tactile perfection born from centuries of patience. From raw mulberry cocoons to hand-spun silk strands, each fold is sculpted to flow like liquid mercury down the silhouette.',
  image: '/assets/sarees/saree-chanderi.png',
  imageAlt: 'Chanderi Moti Silk Saree Texture Close-up',
  theme: 'LIGHT',
  metadata: {
    craft: 'Fine Moti Work & Organza',
    location: 'Chanderi, Madhya Pradesh',
    artisan: 'Heritance Textile Atelier',
  },
  productUrl: '/collections',
  imagePosition: 'LEFT',
};

const CHAPTER_04: ChapterSpread = {
  id: 'chapter-04',
  chapterNumber: '04',
  chapterTag: 'SILHOUETTE',
  title: 'THE ART OF THE DRAPE',
  storyText:
    'A homage to the timeless Indian silhouette. The drape balances structural weight with effortless, flowing movement — designed for grand celebrations and quiet heirloom moments alike.',
  image: '/assets/sarees/saree-banarasi.png',
  imageAlt: 'Banarasi Katan Silk Drape on Atelier Form',
  theme: 'DARK',
  metadata: {
    craft: 'Katan Silk Kadwa Brocade',
    location: 'Global Haute Atelier',
    artisan: 'ABHI-MOH Senior Draper',
  },
  productUrl: '/collections',
  imagePosition: 'RIGHT',
};

// FULL BLEED PHOTO MOMENTS
const FULL_BLEED_01: FullBleedMomentData = {
  id: 'bleed-01',
  image: '/assets/sarees/kanjivaram-detail.png',
  imageAlt: 'ABHI-MOH Zardozi Gold Border Close-up',
  captionTitle: 'ROYAL HERITAGE ZARDOZI',
  captionSub: 'EDITORIAL MOMENT 01 / 02',
};

const FULL_BLEED_02: FullBleedMomentData = {
  id: 'bleed-02',
  image: '/assets/sarees/banarasi-detail.png',
  imageAlt: 'Handwoven Pit Loom Metallic Brocade Weave',
  captionTitle: 'THE ARCHIVAL WEAVE',
  captionSub: 'EDITORIAL MOMENT 02 / 02',
};

export const Lookbook: React.FC = () => {
  const [activeTabId, setActiveTabId] = useState('01');
  const [currentVolume, setCurrentVolume] = useState(1);

  const handleTabSelect = (tab: EditionTab) => {
    setActiveTabId(tab.id);
  };

  return (
    <div className="relative w-full min-h-screen bg-[#FAF7F2] text-[#382C26] font-satoshi overflow-hidden">
      
      {/* 1. LOOKBOOK EDITORIAL HERO */}
      <LookbookHero />

      {/* 2. HORIZONTAL EDITION STORY NAVIGATION */}
      <EditionNav activeTabId={activeTabId} onSelectTab={handleTabSelect} />

      {/* 3. EDITORIAL SPREAD 01 — LIGHT THEME (ORIGIN) */}
      <EditorialSpread spread={CHAPTER_01} />

      {/* 4. FULL BLEED PHOTO MOMENT 01 */}
      <FullBleedMoment data={FULL_BLEED_01} />

      {/* 5. EDITORIAL SPREAD 02 — DARK THEME (CRAFT) */}
      <EditorialSpread spread={CHAPTER_02} />

      {/* 6. MACRO TEXTURE DETAIL SECTION (LIGHT INTERLUDE) */}
      <section className="w-full py-20 lg:py-28 bg-[#FAF7F2] border-y border-[#D9C7A7]/40 px-6 sm:px-12 text-center">
        <div className="max-w-3xl mx-auto flex flex-col items-center">
          <span className="text-[10px] uppercase tracking-[0.35em] text-[#7D2130] font-semibold mb-3">
            TEXTILE ARCHIVE NO. 48
          </span>
          <h3 className="font-hero text-2xl sm:text-4xl uppercase tracking-[0.1em] text-[#382C26] leading-tight mb-4">
            Double-Twisted <span className="italic font-normal text-[#7D2130]">Katan Strands</span>
          </h3>
          <p className="font-sans text-xs sm:text-sm font-light text-[#736357] leading-relaxed max-w-lg mb-6">
            Tested for tensile resilience and light dispersion. Each square inch contains over 14,000 warp and weft intersections.
          </p>
          <div className="w-12 h-[1px] bg-[#7D2130]" />
        </div>
      </section>

      {/* 7. 3D SILK SIMULATION EXPERIENCE (DARK THEME) */}
      <LookbookSilkCanvas />

      {/* 8. EDITORIAL SPREAD 03 — LIGHT THEME (TEXTURE) */}
      <EditorialSpread spread={CHAPTER_03} />

      {/* 9. FULL BLEED PHOTO MOMENT 02 */}
      <FullBleedMoment data={FULL_BLEED_02} />

      {/* 10. EDITORIAL SPREAD 04 — DARK THEME (SILHOUETTE) */}
      <EditorialSpread spread={CHAPTER_04} />

      {/* 11. DISCOVER COLLECTION CALLOUT SECTION */}
      <section className="w-full py-20 lg:py-28 bg-[#FAF7F2] border-t border-[#D9C7A7]/40 px-6 text-center">
        <div className="max-w-2xl mx-auto flex flex-col items-center">
          <span className="text-[10px] uppercase tracking-[0.4em] text-[#7D2130] font-semibold mb-3">
            MAISON ABHI-MOH
          </span>
          <h2 className="font-hero text-3xl sm:text-5xl uppercase tracking-[0.12em] text-[#382C26] mb-4">
            EXPLORE THE COLLECTION
          </h2>
          <p className="font-sans text-xs sm:text-sm font-light text-[#736357] max-w-md leading-relaxed mb-8">
            Acquire your handwoven heirloom piece directly from our haute couture atelier catalog.
          </p>
          <Link
            href="/collections"
            className="inline-flex items-center gap-3 px-8 py-3.5 bg-[#7D2130] hover:bg-[#5E1522] text-[#FAF7F2] border border-[#D9C7A7]/40 font-satoshi text-xs uppercase tracking-[0.2em] font-medium transition-all duration-300 rounded-sm shadow-md hover:shadow-lg"
          >
            <span>VIEW HAUTE COUTURE CATALOG</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* 12. BOTTOM EDITION PAGINATION */}
      <EditionPagination
        currentVolume={currentVolume}
        totalVolumes={2}
        onPrevVolume={() => setCurrentVolume(1)}
        onNextVolume={() => setCurrentVolume(2)}
      />

    </div>
  );
};

Lookbook.displayName = 'Lookbook';

