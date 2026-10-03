'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Trash2 } from 'lucide-react';
import { CartItemModel } from './cart.types';
import { QuantitySelector } from './QuantitySelector';
import { CART_ITEM_ANIMATION } from './cart.animations';
import { wixThumbImage, SOFT_IVORY_PLACEHOLDER } from '@/lib/wixImage';

export interface CartItemProps {
  item: CartItemModel;
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
}

export const CartItem: React.FC<CartItemProps> = ({ item, onUpdateQuantity, onRemove }) => {
  const lineSubtotal = item.priceNumber * item.quantity;
  const formattedLineSubtotal = `₹${lineSubtotal.toLocaleString('en-IN')}`;

  const safeImage = wixThumbImage(item.imageSrc) || '/assets/sarees/saree-maroon.png';

  return (
    <motion.div
      variants={CART_ITEM_ANIMATION}
      initial="initial"
      animate="animate"
      exit="exit"
      className="flex gap-4 py-5 border-b border-[#D9C7A7]/40 font-satoshi w-full items-start"
    >
      {/* Product Thumbnail */}
      <div className="relative w-20 sm:w-22 aspect-[3/4] bg-[#FAF7F2] rounded-xs flex-shrink-0 overflow-hidden border border-[#D9C7A7]/60 p-1 flex items-center justify-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={safeImage}
          alt={item.name}
          className="w-full h-full object-contain object-center"
          onError={(e) => {
            const target = e.currentTarget;
            if (target.src !== SOFT_IVORY_PLACEHOLDER) {
              target.src = SOFT_IVORY_PLACEHOLDER;
            }
          }}
        />
      </div>

      {/* Product Information & Controls */}
      <div className="flex flex-col justify-between flex-grow h-full py-0.5 gap-2 overflow-hidden">
        <div className="flex flex-col gap-0.5">
          {/* Title */}
          <h3 className="font-hero text-sm sm:text-base font-normal tracking-wide text-[#382C26] truncate">
            {item.name}
          </h3>

          {/* Material */}
          {item.material && (
            <p className="font-sans text-[11px] font-light text-[#736357] truncate">
              {item.material}
            </p>
          )}

          {/* Price & Line Subtotal */}
          <div className="flex items-baseline gap-2 mt-1">
            <span className="font-hero text-sm font-medium text-[#7D2130]">
              {item.priceFormatted}
            </span>
            {item.quantity > 1 && (
              <span className="text-[10px] text-[#736357] font-light">
                (Total: {formattedLineSubtotal})
              </span>
            )}
          </div>
        </div>

        {/* Quantity Controls & Remove Action */}
        <div className="flex items-center justify-between mt-1">
          <QuantitySelector
            quantity={item.quantity}
            onIncrease={() => onUpdateQuantity(item.id, 1)}
            onDecrease={() => onUpdateQuantity(item.id, -1)}
          />

          {/* Remove Button */}
          <button
            type="button"
            onClick={() => onRemove(item.id)}
            className="inline-flex items-center gap-1.5 min-h-[36px] px-2.5 py-1.5 rounded-xs text-[11px] uppercase tracking-wider text-[#736357] hover:text-[#7D2130] hover:bg-[#7D2130]/5 transition-colors focus:outline-none cursor-pointer active:scale-95"
            aria-label={`Remove ${item.name} from bag`}
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Remove</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

CartItem.displayName = 'CartItem';
