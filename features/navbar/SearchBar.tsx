'use client';

import React from 'react';
import { Search } from 'lucide-react';
import { IconButton } from './IconButton';
import { useSearch } from '@/features/search/SearchContext';

export const SearchBar: React.FC = () => {
  const { openSearch } = useSearch();

  return (
    <div className="relative flex items-center justify-end">
      <IconButton
        ariaLabel="Search"
        onClick={() => openSearch()}
      >
        <Search className="w-[18px] h-[18px] lg:w-[20px] lg:h-[20px] text-primary-text" />
      </IconButton>
    </div>
  );
};

SearchBar.displayName = 'SearchBar';
