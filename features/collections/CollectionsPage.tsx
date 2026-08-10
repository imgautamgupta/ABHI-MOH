'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { HANGING_CARD_DATASET } from './components/hanging-card.constants';
import { HeroSilkCanvas } from './components/HeroSilkCanvas';
import { CollectionsFilterBar, CategoryFilter } from './CollectionsFilterBar';
import { CollectionsGrid } from './CollectionsGrid';
import { SORT_OPTIONS } from './collections.constants';
import { SortOption } from './collections.types';

export const CollectionsPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('ALL');
  const [selectedSort, setSelectedSort] = useState<SortOption>(SORT_OPTIONS[0]);

  // Dynamic category filtering & sorting logic
  const filteredProducts = useMemo(() => {
    let result = [...HANGING_CARD_DATASET];

    // Category filter
    if (activeCategory !== 'ALL') {
      result = result.filter((p) => {
        if (p.category === activeCategory) return true;
        if (activeCategory === 'NEW ARRIVALS' && p.badges?.includes('New Arrival')) return true;
        if (activeCategory === 'HANDWOVEN' && p.badges?.includes('Handwoven')) return true;
        if (activeCategory === 'LIMITED EDITION' && p.badges?.includes('Limited Edition')) return true;
        if (activeCategory === 'SILK' && p.material.toLowerCase().includes('silk')) return true;
        if (activeCategory === 'ZARI' && (p.material.toLowerCase().includes('zari') || p.name.toLowerCase().includes('zari') || p.name.toLowerCase().includes('gold'))) return true;
        if (activeCategory === 'FESTIVE' && (p.badges?.includes('Royal Heritage') || p.badges?.includes('Masterpiece') || p.badges?.includes('Handwoven'))) return true;
        return false;
      });
    }

    // Sort order
    if (selectedSort.id === 'price-low') {
      result.sort((a, b) => (a.priceNumber || 0) - (b.priceNumber || 0));
    } else if (selectedSort.id === 'price-high') {
      result.sort((a, b) => (b.priceNumber || 0) - (a.priceNumber || 0));
    } else if (selectedSort.id === 'newest') {
      result.sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || ''));
    }

    return result;
  }, [activeCategory, selectedSort]);

  return (
    <div className="relative w-full bg-[#FAF7F2] text-[#382C26] min-h-screen pt-[100px] lg:pt-[130px] pb-32 px-5 sm:px-10 lg:px-16 max-w-[1800px] mx-auto font-satoshi overflow-hidden">
      
      {/* Subtle Parchment Texture & Radial Warm Light Layers */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none opacity-25 mix-blend-multiply"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] lg:w-[1300px] h-[550px] bg-[radial-gradient(ellipse_at_50%_0%,rgba(217,199,167,0.22)_0%,transparent_70%)] pointer-events-none z-0" />
      <div className="absolute top-1/3 left-1/4 -translate-x-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle_at_50%_50%,rgba(125,33,48,0.04)_0%,transparent_75%)] pointer-events-none z-0" />

      {/* 3D Ambient Silk Ribbon Canvas behind Hero Header */}
      <HeroSilkCanvas />

      <div className="relative z-10">
        
        {/* EDITORIAL HERO SECTION */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
          className="flex flex-col items-center justify-center text-center my-8 lg:my-14 max-w-3xl mx-auto px-4"
        >
          <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.35em] text-[#7D2130] bg-[#FAF7F2]/90 px-4 py-1 rounded-full border border-[#D9C7A7]/50 inline-block mb-3 shadow-2xs">
            HAUTE COUTURE ATELIER
          </span>
          <h1 className="font-hero text-4xl sm:text-6xl md:text-7xl font-normal tracking-[0.16em] uppercase text-[#382C26] leading-none">
            COLLECTIONS
          </h1>
          <p className="mt-4 font-sans text-xs sm:text-sm md:text-base font-light tracking-[0.15em] uppercase text-[#736357]/90 max-w-lg">
            Curated Sarees For Every Celebration
          </p>
          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-[#7D2130]/40 to-transparent mt-6" />
        </motion.div>

        {/* MODERN FASHION FILTER BAR (Categories Left + Sort Right) */}
        <CollectionsFilterBar
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
          selectedSort={selectedSort}
          onSelectSort={setSelectedSort}
          itemCount={filteredProducts.length}
        />

        {/* EDITORIAL PRODUCT GRID (4-COL DESKTOP, 2-COL MOBILE) */}
        <CollectionsGrid products={filteredProducts} />

      </div>
    </div>
  );
};

CollectionsPage.displayName = 'CollectionsPage';

