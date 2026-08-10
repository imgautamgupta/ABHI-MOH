'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { SORT_OPTIONS, COLLECTIONS_COPY } from './collections.constants';
import { SortOption } from './collections.types';
import { cn } from '@/lib/utils';

export interface SortDropdownProps {
  selectedOption?: SortOption;
  onSelectOption?: (option: SortOption) => void;
}

export const SortDropdown: React.FC<SortDropdownProps> = ({
  selectedOption: controlledOption,
  onSelectOption,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [internalOption, setInternalOption] = useState<SortOption>(SORT_OPTIONS[0]);

  const selectedOption = controlledOption || internalOption;

  const handleSelect = (option: SortOption) => {
    if (onSelectOption) {
      onSelectOption(option);
    } else {
      setInternalOption(option);
    }
    setIsOpen(false);
  };

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
        className="inline-flex items-center gap-2.5 px-4 py-2 bg-[#FAF7F2] border border-[#D9C7A7]/60 hover:border-[#7D2130]/50 text-xs uppercase tracking-[0.18em] text-[#382C26] hover:text-[#7D2130] transition-all duration-300 rounded-sm focus:outline-none focus-visible:ring-1 focus-visible:ring-[#7D2130]/50 select-none cursor-pointer"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label="Sort Collections"
      >
        <span className="text-[#736357] font-light">{COLLECTIONS_COPY.sortByDefault}:</span>
        <span className="font-medium text-[#7D2130]">{selectedOption.label}</span>
        <ChevronDown
          className={cn(
            'w-3.5 h-3.5 text-[#736357] transition-transform duration-300',
            isOpen && 'rotate-180 text-[#7D2130]'
          )}
        />
      </button>

      {/* FLOATING LIGHT GLASS DROPDOWN */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -4 }}
            transition={{ duration: 0.2, ease: [0.25, 1, 0.5, 1] }}
            className="absolute right-0 mt-2 w-56 bg-[#FAF7F2]/95 backdrop-blur-[24px] border border-[#D9C7A7] shadow-xl rounded-sm p-1 z-50 overflow-hidden"
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
                    onClick={() => handleSelect(option)}
                    className={cn(
                      'flex items-center justify-between px-3.5 py-2 text-xs uppercase tracking-wider font-light text-[#736357] hover:text-[#7D2130] hover:bg-[#EADFCF]/50 transition-colors duration-200 rounded-xs text-left',
                      isSelected && 'text-[#7D2130] font-medium bg-[#EADFCF]/60'
                    )}
                  >
                    <span>{option.label}</span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-[#7D2130]" />}
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

