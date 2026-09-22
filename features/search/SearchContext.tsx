'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { SareeProduct } from '@/features/collections/components/hanging-card.types';
import { SearchContextType } from './search.types';
import { fetchSearchIndex, filterProductsByQuery } from './search.service';

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQueryState] = useState('');
  const [allProducts, setAllProducts] = useState<SareeProduct[]>([]);
  const [results, setResults] = useState<SareeProduct[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  // Preload search index on open
  useEffect(() => {
    if (isOpen && allProducts.length === 0) {
      setIsLoading(true);
      fetchSearchIndex()
        .then((data) => {
          setAllProducts(data);
          if (query.trim()) {
            setResults(filterProductsByQuery(data, query));
            setHasSearched(true);
          }
        })
        .finally(() => setIsLoading(false));
    }
  }, [isOpen, allProducts.length, query]);

  const openSearch = useCallback((initialQuery?: string) => {
    if (initialQuery !== undefined) {
      setQueryState(initialQuery);
      if (allProducts.length > 0) {
        setResults(filterProductsByQuery(allProducts, initialQuery));
        setHasSearched(true);
      }
    }
    setIsOpen(true);
  }, [allProducts]);

  const closeSearch = useCallback(() => {
    setIsOpen(false);
  }, []);

  const toggleSearch = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const setQuery = useCallback(
    (newQuery: string) => {
      setQueryState(newQuery);
      if (!newQuery.trim()) {
        setResults([]);
        setHasSearched(false);
        return;
      }

      setHasSearched(true);
      const matches = filterProductsByQuery(allProducts, newQuery);
      setResults(matches);
    },
    [allProducts]
  );

  const clearQuery = useCallback(() => {
    setQueryState('');
    setResults([]);
    setHasSearched(false);
  }, []);

  const value = useMemo(
    () => ({
      isOpen,
      query,
      results,
      isLoading,
      hasSearched,
      openSearch,
      closeSearch,
      toggleSearch,
      setQuery,
      clearQuery,
    }),
    [isOpen, query, results, isLoading, hasSearched, openSearch, closeSearch, toggleSearch, setQuery, clearQuery]
  );

  return <SearchContext.Provider value={value}>{children}</SearchContext.Provider>;
};

export const useSearch = (): SearchContextType => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};
