'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface EditionTab {
  id: string;
  label: string;
  targetId: string;
}

export const EDITION_TABS: EditionTab[] = [
  { id: '01', label: '01 ORIGIN', targetId: 'chapter-01' },
  { id: '02', label: '02 CRAFT', targetId: 'chapter-02' },
  { id: '03', label: '03 TEXTURE', targetId: 'chapter-03' },
  { id: '04', label: '04 SILHOUETTE', targetId: 'chapter-04' },
];

export interface EditionNavProps {
  activeTabId: string;
  onSelectTab: (tab: EditionTab) => void;
}

export const EditionNav: React.FC<EditionNavProps> = ({ activeTabId, onSelectTab }) => {
  const scrollToChapter = (tab: EditionTab) => {
    onSelectTab(tab);
    const element = document.getElementById(tab.targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="w-full max-w-[1200px] mx-auto px-6 mb-16 font-satoshi z-20">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-3 border-y border-[#D9C7A7]/40">
        <div className="flex items-center gap-3 text-xs uppercase tracking-[0.22em] text-[#7D2130] font-semibold flex-shrink-0">
          <span>VOLUME I</span>
          <span className="w-8 h-[1px] bg-[#7D2130]/40" />
        </div>

        <div className="flex items-center gap-6 sm:gap-10 overflow-x-auto no-scrollbar py-1 text-xs uppercase tracking-[0.2em]">
          {EDITION_TABS.map((tab) => {
            const isActive = activeTabId === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => scrollToChapter(tab)}
                className={cn(
                  'relative py-1 font-medium transition-colors duration-300 whitespace-nowrap cursor-pointer select-none focus:outline-none focus-visible:text-[#7D2130]',
                  isActive ? 'text-[#7D2130]' : 'text-[#736357] hover:text-[#382C26]'
                )}
              >
                <span>{tab.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeEditionBorder"
                    className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#7D2130]"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

EditionNav.displayName = 'EditionNav';
