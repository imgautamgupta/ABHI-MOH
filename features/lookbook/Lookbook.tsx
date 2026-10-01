'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { EDITORIAL_STORIES } from './lookbook.data';
import { EditorialStory } from './lookbook.types';
import { LookbookHero } from './components/LookbookHero';
import { EditorialStoryCard } from './components/EditorialStoryCard';
import { EditorialStoryModal } from './components/EditorialStoryModal';

export const Lookbook: React.FC = () => {
  const [selectedStory, setSelectedStory] = useState<EditorialStory | null>(null);
  const [activeCategoryId, setActiveCategoryId] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'ALL EDITIONS' },
    ...EDITORIAL_STORIES.map((s) => ({
      id: s.id,
      label: s.category.replace('THE ', '').replace(' EDIT', ''),
    })),
  ];

  const handleSelectCategory = (categoryId: string) => {
    setActiveCategoryId(categoryId);
    if (categoryId === 'all') {
      window.scrollTo({ top: 400, behavior: 'smooth' });
    } else {
      const el = document.getElementById(categoryId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const filteredStories =
    activeCategoryId === 'all'
      ? EDITORIAL_STORIES
      : EDITORIAL_STORIES.filter((s) => s.id === activeCategoryId);

  return (
    <div className="relative w-full min-h-screen bg-[#FAF7F2] text-[#382C26] font-satoshi overflow-hidden">
      {/* 1. MAGAZINE COVER HERO */}
      <LookbookHero
        activeCategory={activeCategoryId}
        onSelectCategory={handleSelectCategory}
        categories={categories}
      />

      {/* 2. EDITORIAL CAMPAIGN STORIES SPREAD */}
      <div className="w-full flex flex-col">
        {filteredStories.map((story, index) => (
          <React.Fragment key={story.id}>
            <EditorialStoryCard
              story={story}
              onExploreStory={(s) => setSelectedStory(s)}
              index={index}
            />

            {/* Editorial Magazine Interlude after story 2 */}
            {index === 1 && activeCategoryId === 'all' && (
              <section className="w-full py-20 lg:py-28 bg-[#FAF7F2] border-b border-[#D9C7A7]/40 px-6 sm:px-12 text-center select-none">
                <div className="max-w-3xl mx-auto flex flex-col items-center">
                  <span className="text-[10px] uppercase tracking-[0.35em] text-[#7D2130] font-semibold mb-3 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>TEXTILE ARCHIVE NO. 48</span>
                  </span>
                  <h3 className="font-hero text-2xl sm:text-4xl uppercase tracking-[0.08em] text-[#382C26] leading-tight mb-4">
                    Double-Twisted <span className="italic font-normal text-[#7D2130]">Katan Silk</span>
                  </h3>
                  <p className="font-sans text-xs sm:text-sm font-light text-[#736357] leading-relaxed max-w-lg mb-6">
                    Each square inch of ABHI-MOH handloom contains over 14,000 warp and weft intersections, tested for natural lustre and generational resilience.
                  </p>
                  <div className="w-16 h-[1px] bg-[#7D2130]/40" />
                </div>
              </section>
            )}

            {/* Editorial Pull-Quote Interlude after story 4 */}
            {index === 3 && activeCategoryId === 'all' && (
              <section className="w-full py-20 lg:py-28 bg-[#2A090D] text-[#F1E4CF] border-b border-[#C7A66A]/30 px-6 sm:px-12 text-center select-none">
                <div className="max-w-3xl mx-auto flex flex-col items-center">
                  <span className="text-[10px] uppercase tracking-[0.35em] text-[#C7A66A] font-semibold mb-3">
                    THE PHILOSOPHY OF DRAPE
                  </span>
                  <blockquote className="font-hero text-2xl sm:text-4xl italic font-light tracking-wide text-[#F1E4CF] leading-snug mb-4">
                    &ldquo;A saree is not merely draped; it is sculpted around the wearer&apos;s story.&rdquo;
                  </blockquote>
                  <p className="text-[10px] uppercase tracking-[0.25em] text-[#C7A66A]/80 font-medium">
                    ABHI-MOH ATELIER
                  </p>
                </div>
              </section>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* 3. DISCOVER THE COLLECTION CTA CLOSING */}
      <section className="w-full py-24 lg:py-32 bg-[#FAF7F2] border-t border-[#D9C7A7]/40 px-6 text-center select-none">
        <div className="max-w-2xl mx-auto flex flex-col items-center">
          <span className="text-[10px] uppercase tracking-[0.4em] text-[#7D2130] font-semibold mb-3">
            ABHI-MOH
          </span>
          <h2 className="font-hero text-3xl sm:text-5xl uppercase tracking-[0.12em] text-[#382C26] mb-4">
            EXPLORE THE COLLECTION
          </h2>
          <p className="font-sans text-xs sm:text-sm font-light text-[#736357] max-w-md leading-relaxed mb-8">
            Acquire your handwoven heirloom piece directly from our haute couture atelier catalog.
          </p>
          <Link
            href="/collections"
            className="inline-flex items-center gap-3 px-8 py-4 bg-[#7D2130] hover:bg-[#5E1522] text-[#FAF7F2] border border-[#D9C7A7]/40 font-satoshi text-xs uppercase tracking-[0.22em] font-medium transition-all duration-300 rounded-sm shadow-md hover:shadow-lg hover:-translate-y-[1px]"
          >
            <span>VIEW HAUTE COUTURE CATALOG</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* 4. INTERACTIVE EDITORIAL STORY MODAL */}
      <EditorialStoryModal
        story={selectedStory}
        onClose={() => setSelectedStory(null)}
      />
    </div>
  );
};

Lookbook.displayName = 'Lookbook';
