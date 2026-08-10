'use client';

import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { CartItemModel, CartContextType } from './cart.types';
import { INITIAL_CART_ITEMS } from './cart.constants';

const CartContext = createContext<CartContextType | undefined>(undefined);
const CART_STORAGE_KEY = 'abhimoh_cart_items';

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [items, setItems] = useState<CartItemModel[]>(INITIAL_CART_ITEMS);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load cart from localStorage on client mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setItems(parsed);
        }
      }
    } catch (e) {
      console.warn('Failed to load cart items from localStorage', e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save cart to localStorage whenever items state changes
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.warn('Failed to save cart items to localStorage', e);
    }
  }, [items, isLoaded]);

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);
  const toggleCart = () => setIsOpen((prev) => !prev);

  const addToCart = (newItem: Omit<CartItemModel, 'quantity'>) => {
    setItems((prevItems) => {
      const existingIndex = prevItems.findIndex((item) => item.id === newItem.id);
      if (existingIndex > -1) {
        const updated = [...prevItems];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + 1,
        };
        return updated;
      }
      return [...prevItems, { ...newItem, quantity: 1 }];
    });
    setIsOpen(true); // Open side drawer automatically when item is added
  };

  const removeFromCart = (id: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setItems((prevItems) =>
      prevItems
        .map((item) => {
          if (item.id === id) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItemModel => item !== null)
    );
  };

  const clearCart = () => setItems([]);

  const totalItemCount = useMemo(() => {
    return items.reduce((acc, item) => acc + item.quantity, 0);
  }, [items]);

  const value = useMemo(
    () => ({
      isOpen,
      items,
      openCart,
      closeCart,
      toggleCart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      totalItemCount,
    }),
    [isOpen, items, totalItemCount]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
