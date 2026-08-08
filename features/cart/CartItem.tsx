'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { CartItemModel } from './cart.types';
import { QuantitySelector } from './QuantitySelector';
import { CART_ITEM_ANIMATION } from './cart.animations';
import { Price } from '../collections/components/Price';

export interface CartItemProps {
  item: CartItemModel;
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
}

export const CartItem: React.FC<CartItemProps> = ({ item, onUpdateQuantity, onRemove }) => {
  return (
    <motion.div
      variants={CART_ITEM_ANIMATION}
      initial="initial"
      animate="animate"
      exit="exit"
      className="flex gap-4 py-5 border-b border-[#E8DFD5] font-satoshi w-full items-start"
    >
      {/* Product Thumbnail */}
      <div className="relative w-20 sm:w-24 aspect-[3/4] bg-[#F8F4EF] rounded-md flex-shrink-0 overflow-hidden border border-[#E8DFD5]">
        <Image
          src={item.imageSrc}
          alt={item.name}
          fill
          sizes="96px"
          className="object-cover object-center"
        />
      </div>

      {/* Product Information & Controls */}
      <div className="flex flex-col justify-between flex-grow h-full py-0.5 gap-2">
        <div className="flex flex-col gap-1">
          {/* Title */}
          <h3 className="font-hero text-sm sm:text-base font-[500] tracking-wide text-[#2A221E] line-clamp-1">
            {item.name}
          </h3>

          {/* Material & Color */}
          <p className="font-sans text-[11px] font-normal text-[#6E645A] tracking-wide">
            {item.material} • <span className="text-[#7A1C28]">{item.color}</span>
          </p>

          {/* Price */}
          <Price amount={item.priceFormatted} className="text-sm font-semibold text-[#7A1C28] mt-0.5" />
        </div>

        {/* Quantity Controls & Remove Text Link */}
        <div className="flex items-center justify-between mt-2">
          <QuantitySelector
            quantity={item.quantity}
            onIncrease={() => onUpdateQuantity(item.id, 1)}
            onDecrease={() => onUpdateQuantity(item.id, -1)}
          />

          {/* Remove Text Link with Soft Maroon Hover */}
          <button
            type="button"
            onClick={() => onRemove(item.id)}
            className="text-xs uppercase tracking-widest text-[#6E645A] hover:text-[#7A1C28] transition-colors duration-200 focus:outline-none underline underline-offset-4 cursor-pointer"
          >
            Remove
          </button>
        </div>
      </div>
    </motion.div>
  );
};

CartItem.displayName = 'CartItem';
