'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { SORT_OPTIONS, COLLECTIONS_COPY } from './collections.constants';
import { SortOption } from './collections.types';
import { cn } from '@/lib/utils';

export const SortDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<SortOption>(SORT_OPTIONS[0]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Click outside and Escape listener
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div ref={dropdownRef} className="relative inline-block text-left font-satoshi z-30">
      {/* SORT BY BUTTON */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="inline-flex items-center gap-3 px-5 py-2.5 bg-[#250D14]/80 border border-[#C89D5C]/35 hover:border-[#C89D5C]/70 text-xs uppercase tracking-[0.2em] text-[#F6ECE1] hover:text-[#E5C388] transition-all duration-300 ease-silk rounded-md focus:outline-none focus-visible:ring-1 focus-visible:ring-[#C89D5C]/50 select-none cursor-pointer shadow-md"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label="Sort Collections"
      >
        <span className="text-[#D0BEAB] font-light">{COLLECTIONS_COPY.sortByDefault}:</span>
        <span className="font-medium text-[#E5C388]">{selectedOption.label}</span>
        <ChevronDown
          className={cn(
            'w-4 h-4 text-[#D0BEAB] transition-transform duration-300 ease-silk',
            isOpen && 'rotate-180 text-[#E5C388]'
          )}
        />
      </button>

      {/* FLOATING DARK GLASS DROPDOWN */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -4 }}
            transition={{ duration: 0.25, ease: [0.25, 1, 0.5, 1] }}
            className="absolute right-0 mt-2 w-64 bg-[#1C0A10]/95 backdrop-blur-[24px] border border-[#C89D5C]/35 shadow-2xl rounded-md p-1.5 z-50 overflow-hidden"
            role="listbox"
          >
            <div className="flex flex-col py-1">
              {SORT_OPTIONS.map((option) => {
                const isSelected = selectedOption.id === option.id;
                return (
                  <button
                    key={option.id}
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => {
                      setSelectedOption(option);
                      setIsOpen(false);
                    }}
                    className={cn(
                      'flex items-center justify-between px-4 py-2.5 text-xs uppercase tracking-wider font-light text-[#F6ECE1]/85 hover:text-[#E5C388] hover:bg-[#C89D5C]/10 transition-colors duration-200 rounded-sm text-left',
                      isSelected && 'text-[#E5C388] font-medium bg-[#C89D5C]/15'
                    )}
                  >
                    <span>{option.label}</span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-[#E5C388]" />}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

SortDropdown.displayName = 'SortDropdown';
