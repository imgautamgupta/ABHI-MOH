'use client';

import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { SareeProduct, BadgeType } from '@/features/collections/components/hanging-card.types';

export interface FavoriteItem {
  id: string;
  name: string;
  price: string;
  priceNumber?: number;
  discountedPrice?: string;
  originalPrice?: string;
  images: string[];
  slug?: string;
  description?: string;
  descriptionHtml?: string;
  plainDescription?: string;
  material?: string;
  origin?: string;
  badges?: BadgeType[];
  inStock?: boolean;
  category?: string;
  createdAt?: string;
}

interface FavoritesContextType {
  favorites: string[];
  favoriteProducts: FavoriteItem[];
  isFavorite: (id: string) => boolean;
  toggleFavorite: (productOrId: FavoriteItem | SareeProduct | string) => void;
  addFavorite: (product: FavoriteItem | SareeProduct) => void;
  removeFavorite: (id: string) => void;
  clearFavorites: () => void;
  totalFavoriteCount: number;
  isLoaded: boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'abhimoh_favorites';
const LEGACY_STORAGE_KEY = 'abhimoh_favorites_ids';

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favoriteProducts, setFavoriteProducts] = useState<FavoriteItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load favorites from localStorage on client mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          // Normalize items to ensure valid structure
          const validItems: FavoriteItem[] = parsed.filter(
            (item): item is FavoriteItem => Boolean(item && typeof item === 'object' && item.id)
          );
          setFavoriteProducts(validItems);
        }
      } else {
        // Legacy ID-only storage migration — IDs alone cannot be resolved without
        // the Wix catalog, so we simply clear the legacy key and start fresh.
        // Products favorited in this session will be persisted correctly going forward.
        try { localStorage.removeItem(LEGACY_STORAGE_KEY); } catch { /* ignore */ }
      }
    } catch (e) {
      console.warn('[FavoritesContext] Failed to load favorites from localStorage:', e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save favorites to localStorage whenever state changes
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(favoriteProducts));
    } catch (e) {
      console.warn('[FavoritesContext] Failed to save favorites to localStorage:', e);
    }
  }, [favoriteProducts, isLoaded]);

  const isFavorite = useCallback(
    (id: string) => favoriteProducts.some((item) => item.id === id),
    [favoriteProducts]
  );

  const addFavorite = useCallback((product: FavoriteItem | SareeProduct) => {
    if (!product || !product.id) return;
    setFavoriteProducts((prev) => {
      if (prev.some((item) => item.id === product.id)) {
        return prev;
      }
      const newItem: FavoriteItem = {
        id: product.id,
        name: product.name || 'Artisanal Saree',
        price: product.price || '₹0',
        priceNumber: product.priceNumber,
        discountedPrice: product.discountedPrice,
        originalPrice: product.originalPrice,
        images: product.images && product.images.length > 0
          ? product.images
          : ['/assets/sarees/saree-maroon.png'],
        slug: product.slug || product.id,
        description: product.description,
        descriptionHtml: product.descriptionHtml,
        plainDescription: product.plainDescription,
        material: product.material || 'Luxury Saree',
        origin: 'origin' in product ? (product as { origin?: string }).origin : undefined,
        badges: product.badges,
        inStock: product.inStock !== false,
        category: product.category,
        createdAt: product.createdAt,
      };
      return [...prev, newItem];
    });
  }, []);

  const removeFavorite = useCallback((id: string) => {
    if (!id) return;
    setFavoriteProducts((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const toggleFavorite = useCallback((productOrId: FavoriteItem | SareeProduct | string) => {
    if (!productOrId) return;

    if (typeof productOrId === 'string') {
      // String-ID-only toggle: we can only remove (no product data available to add)
      const id = productOrId;
      setFavoriteProducts((prev) => prev.filter((item) => item.id !== id));
    } else {
      const product = productOrId;
      setFavoriteProducts((prev) => {
        const exists = prev.some((item) => item.id === product.id);
        if (exists) {
          return prev.filter((item) => item.id !== product.id);
        }
        const newItem: FavoriteItem = {
          id: product.id,
          name: product.name || 'Artisanal Saree',
          price: product.price || '₹0',
          priceNumber: product.priceNumber,
          discountedPrice: product.discountedPrice,
          originalPrice: product.originalPrice,
          images: product.images && product.images.length > 0
            ? product.images
            : ['/assets/sarees/saree-maroon.png'],
          slug: product.slug || product.id,
          description: product.description,
          descriptionHtml: product.descriptionHtml,
          plainDescription: product.plainDescription,
          material: product.material || 'Luxury Saree',
          origin: 'origin' in product ? (product as { origin?: string }).origin : undefined,
          badges: product.badges,
          inStock: product.inStock !== false,
          category: product.category,
          createdAt: product.createdAt,
        };
        return [...prev, newItem];
      });
    }
  }, []);

  const clearFavorites = useCallback(() => {
    setFavoriteProducts([]);
  }, []);

  const favorites = useMemo(
    () => favoriteProducts.map((item) => item.id),
    [favoriteProducts]
  );

  const value = useMemo(
    () => ({
      favorites,
      favoriteProducts,
      isFavorite,
      toggleFavorite,
      addFavorite,
      removeFavorite,
      clearFavorites,
      totalFavoriteCount: favoriteProducts.length,
      isLoaded,
    }),
    [favorites, favoriteProducts, isFavorite, toggleFavorite, addFavorite, removeFavorite, clearFavorites, isLoaded]
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
