'use client';

import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { SareeProduct } from '@/features/collections/components/hanging-card.types';
import { HANGING_CARD_DATASET } from '@/features/collections/components/hanging-card.constants';

interface FavoritesContextType {
  favorites: string[];
  favoriteProducts: SareeProduct[];
  isFavorite: (id: string) => boolean;
  toggleFavorite: (id: string) => void;
  removeFavorite: (id: string) => void;
  totalFavoriteCount: number;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'abhimoh_favorites_ids';

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load favorites from localStorage on client mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setFavorites(parsed);
        }
      }
    } catch (e) {
      console.warn('Failed to load favorites from localStorage', e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save favorites to localStorage whenever state changes
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(favorites));
    } catch (e) {
      console.warn('Failed to save favorites to localStorage', e);
    }
  }, [favorites, isLoaded]);

  const isFavorite = (id: string) => favorites.includes(id);

  const toggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]
    );
  };

  const removeFavorite = (id: string) => {
    setFavorites((prev) => prev.filter((favId) => favId !== id));
  };

  // Derive actual favorite product objects from HANGING_CARD_DATASET
  const favoriteProducts = useMemo(() => {
    return HANGING_CARD_DATASET.filter((product) => favorites.includes(product.id));
  }, [favorites]);

  const value = useMemo(
    () => ({
      favorites,
      favoriteProducts,
      isFavorite,
      toggleFavorite,
      removeFavorite,
      totalFavoriteCount: favorites.length,
    }),
    [favorites, favoriteProducts]
  );

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
};

export const useFavorites = (): FavoritesContextType => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};
