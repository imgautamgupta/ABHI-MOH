'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Sparkles, ArrowRight, Loader2 } from 'lucide-react';
import { useSearch } from './SearchContext';
import { SearchResultCard } from './SearchResultCard';
import { cn } from '@/lib/utils';

const POPULAR_SEARCH_CHIPS = [
  'Silk',
  'Kanjivaram',
  'Banarasi',
  'Maroon',
  'Gold',
  'Wedding',
  'Heritage',
  'Chanderi',
  'Paithani',
];

export const SearchModal: React.FC = () => {
  const { isOpen, query, results, isLoading, hasSearched, closeSearch, setQuery, clearQuery } =
    useSearch();
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-focus input on open & lock background scroll
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 80);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeSearch();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, closeSearch]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden font-satoshi">
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeSearch}
            className="fixed inset-0 bg-[#2A221E]/60 backdrop-blur-md z-40 cursor-pointer"
            aria-hidden="true"
          />

          {/* Search Dropdown / Panel */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
            className="fixed top-0 inset-x-0 z-50 bg-[#FAF7F2] border-b border-[#D9C7A7]/60 shadow-2xl max-h-[90vh] flex flex-col text-[#382C26]"
            role="dialog"
            aria-modal="true"
            aria-label="Search Haute Couture Sarees"
          >
            {/* SEARCH INPUT BAR */}
            <div className="max-w-[1400px] w-full mx-auto px-5 sm:px-10 lg:px-16 pt-6 pb-5">
              <div className="flex items-center justify-between gap-4 pb-3 border-b border-[#D9C7A7]/50">
                <div className="flex items-center gap-3.5 flex-1">
                  <Search className="w-5 h-5 text-[#7D2130] flex-shrink-0" />
                  <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search by weave, fabric, origin or occasion…"
                    className="w-full bg-transparent font-hero text-base sm:text-xl lg:text-2xl text-[#382C26] placeholder:text-[#736357]/50 outline-none border-none tracking-wide"
                  />
                  {query && (
                    <button
                      type="button"
                      onClick={clearQuery}
                      className="p-1 text-[#736357] hover:text-[#7D2130] transition-colors cursor-pointer"
                      aria-label="Clear search query"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Close Button */}
                <button
                  type="button"
                  onClick={closeSearch}
                  className="p-2 rounded-full text-[#736357] hover:text-[#7D2130] hover:bg-[#7D2130]/10 transition-colors cursor-pointer flex-shrink-0"
                  aria-label="Close search"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* CURATED SUGGESTION CHIPS */}
              <div className="flex items-center gap-2 pt-3.5 overflow-x-auto no-scrollbar">
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#736357] font-semibold flex-shrink-0 mr-1 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-[#7D2130]" />
                  <span>Popular:</span>
                </span>
                {POPULAR_SEARCH_CHIPS.map((chip) => {
                  const isActive = query.toLowerCase().trim() === chip.toLowerCase();
                  return (
                    <button
                      key={chip}
                      type="button"
                      onClick={() => setQuery(chip)}
                      className={cn(
                        'px-3.5 py-1 rounded-full text-[11px] uppercase tracking-wider transition-all duration-200 cursor-pointer flex-shrink-0 select-none border',
                        isActive
                          ? 'bg-[#7D2130] text-[#FAF7F2] border-[#7D2130]'
                          : 'bg-[#FAF7F2] text-[#736357] border-[#D9C7A7]/60 hover:border-[#7D2130] hover:text-[#7D2130]'
                      )}
                    >
                      {chip}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* SEARCH CONTENT RESULTS AREA */}
            <div className="max-w-[1400px] w-full mx-auto px-5 sm:px-10 lg:px-16 overflow-y-auto no-scrollbar pb-10 flex-1">
              {/* 1. LOADING STATE */}
              {isLoading && (
                <div className="py-20 flex flex-col items-center justify-center gap-3 text-center">
                  <Loader2 className="w-7 h-7 text-[#7D2130] animate-spin" />
                  <span className="text-xs uppercase tracking-[0.2em] text-[#736357]">
                    Searching Haute Couture Index…
                  </span>
                </div>
              )}

              {/* 2. RESULTS FOUND STATE */}
              {!isLoading && hasSearched && results.length > 0 && (
                <div className="flex flex-col gap-6 pt-4">
                  <div className="flex items-baseline justify-between border-b border-[#D9C7A7]/40 pb-2">
                    <span className="text-xs uppercase tracking-[0.2em] text-[#736357]">
                      Found {results.length} {results.length === 1 ? 'Piece' : 'Pieces'} for &ldquo;{query}&rdquo;
                    </span>
                    <Link
                      href="/collections"
                      onClick={closeSearch}
                      className="text-[11px] uppercase tracking-[0.18em] text-[#7D2130] hover:underline font-medium"
                    >
                      View All Collection
                    </Link>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                    {results.map((product) => (
                      <SearchResultCard
                        key={product.id}
                        product={product}
                        onSelect={closeSearch}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* 3. EMPTY STATE (EXACT USER SPECIFIED COPY) */}
              {!isLoading && hasSearched && results.length === 0 && (
                <div className="py-16 flex flex-col items-center justify-center text-center max-w-md mx-auto">
                  <div className="w-16 h-16 rounded-full bg-[#F5EFE7] border border-[#D9C7A7]/60 flex items-center justify-center mb-4 text-[#7D2130]">
                    <Search className="w-6 h-6 stroke-[1.5]" />
                  </div>
                  <h3 className="font-hero text-2xl sm:text-3xl uppercase tracking-[0.06em] text-[#382C26] mb-2">
                    No pieces found
                  </h3>
                  <p className="text-xs sm:text-sm font-light text-[#736357] leading-relaxed mb-6">
                    We couldn&apos;t find a saree matching your search.
                  </p>
                  <Link href="/collections" onClick={closeSearch}>
                    <button
                      type="button"
                      className="inline-flex items-center gap-2.5 px-7 py-3 rounded-xs bg-[#7D2130] hover:bg-[#5E1522] text-[#FAF7F2] text-xs uppercase tracking-[0.2em] font-medium transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer"
                    >
                      <span>Explore Collection</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </Link>
                </div>
              )}

              {/* 4. DEFAULT INITIAL STATE (BEFORE SEARCHING) */}
              {!isLoading && !hasSearched && (
                <div className="py-12 flex flex-col items-center justify-center text-center">
                  <span className="text-[10px] uppercase tracking-[0.3em] text-[#7D2130] font-semibold mb-2">
                    ABHI-MOH ARCHIVE
                  </span>
                  <p className="font-hero text-xl sm:text-2xl text-[#382C26] font-light max-w-md leading-relaxed">
                    Explore artisanal Varanasi brocades, Kanjivaram silks, and royal heritage drapes.
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

SearchModal.displayName = 'SearchModal';
