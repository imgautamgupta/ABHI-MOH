'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { IconButton } from './IconButton';
import { cn } from '@/lib/utils';

export const SearchBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when search expands
  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  // Click outside and Escape key handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
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
    <div ref={containerRef} className="relative flex items-center justify-end">
      <AnimatePresence mode="wait">
        {!isOpen ? (
          <motion.div
            key="search-icon"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
          >
            <IconButton
              ariaLabel="Search"
              onClick={() => setIsOpen(true)}
            >
              <Search className="w-[20px] h-[20px] text-primary-text" />
            </IconButton>
          </motion.div>
        ) : (
          <motion.div
            key="search-input"
            initial={{ width: 40, opacity: 0 }}
            animate={{ width: 260, opacity: 1 }}
            exit={{ width: 40, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
            className="relative flex items-center bg-[#FFFDFC]/95 backdrop-blur-md border border-[#E8DFD5] rounded-full px-3 py-1.5 shadow-md overflow-hidden"
          >
            <Search className="w-[18px] h-[18px] text-[#7A1C28] flex-shrink-0 ml-1" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search Sarees..."
              className={cn(
                'w-full bg-transparent text-xs text-[#2A221E] placeholder:text-[#6E645A]/60 font-satoshi pl-2.5 pr-6 outline-none border-none tracking-wide'
              )}
            />
            <button
              type="button"
              onClick={() => {
                setQuery('');
                setIsOpen(false);
              }}
              className="absolute right-3 p-1 text-[#6E645A] hover:text-[#7A1C28] transition-colors duration-200"
              aria-label="Close Search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

SearchBar.displayName = 'SearchBar';
