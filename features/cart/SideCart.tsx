'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from './CartContext';
import { CartHeader } from './CartHeader';
import { CartItem } from './CartItem';
import { EmptyCart } from './EmptyCart';
import { CartFooter } from './CartFooter';
import { DRAWER_SLIDE_VARIANTS, BACKDROP_FADE_VARIANTS } from './cart.animations';

export const SideCart: React.FC = () => {
  const { isOpen, items, closeCart, updateQuantity, removeFromCart, totalItemCount } = useCart();

  // Calculate Subtotal
  const subtotal = items.reduce((sum, item) => sum + item.priceNumber * item.quantity, 0);

  // Close drawer on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeCart();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, closeCart]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden font-satoshi">
          {/* 1. SOFT BACKDROP OVERLAY */}
          <motion.div
            variants={BACKDROP_FADE_VARIANTS}
            initial="initial"
            animate="animate"
            exit="exit"
            onClick={closeCart}
            className="absolute inset-0 bg-black/40 backdrop-blur-xs cursor-pointer"
            aria-hidden="true"
          />

          {/* 2. SIDE CART DRAWER (FROSTED IVORY GLASS) */}
          <motion.div
            variants={DRAWER_SLIDE_VARIANTS}
            initial="initial"
            animate="animate"
            exit="exit"
            className="absolute top-0 right-0 bottom-0 w-full sm:max-w-[420px] lg:max-w-[480px] bg-[#FFFDFC]/98 backdrop-blur-[24px] border-l border-[#E8DFD5] shadow-2xl flex flex-col justify-between overflow-hidden text-[#2A221E]"
            role="dialog"
            aria-modal="true"
            aria-label="Shopping Bag"
          >
            {/* Header */}
            <CartHeader itemCount={totalItemCount} onClose={closeCart} />

            {/* Content Body */}
            {items.length === 0 ? (
              <EmptyCart onClose={closeCart} />
            ) : (
              <>
                {/* Scrollable Items List */}
                <div className="flex-1 overflow-y-auto px-6 lg:px-8 divide-y divide-[#C89D5C]/20">
                  <AnimatePresence initial={false}>
                    {items.map((item) => (
                      <CartItem
                        key={item.id}
                        item={item}
                        onUpdateQuantity={updateQuantity}
                        onRemove={removeFromCart}
                      />
                    ))}
                  </AnimatePresence>
                </div>

                {/* Summary & Action Buttons */}
                <CartFooter
                  subtotal={subtotal}
                  onClose={closeCart}
                  onCheckout={() => {
                    window.location.href = '/checkout';
                  }}
                />
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

SideCart.displayName = 'SideCart';
