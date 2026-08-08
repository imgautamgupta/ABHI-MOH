'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { SareeProduct } from './hanging-card.types';
import { ProductImage } from './ProductImage';
import { ProductInfo } from './ProductInfo';
import { Price } from './Price';
import { AddToBagButton } from './AddToBagButton';
import { CARD_LIFT_TRANSITION } from './hanging-card.animations';
import { cn } from '@/lib/utils';
import { useCart } from '@/features/cart/CartContext';

export interface HangingCardProps {
  product: SareeProduct;
  onFavoriteToggle?: (id: string, isFav: boolean) => void;
  onAddToBag?: (id: string) => void;
  className?: string;
}

export const HangingCard: React.FC<HangingCardProps> = ({
  product,
  onFavoriteToggle,
  onAddToBag,
  className,
}) => {
  const { addToCart } = useCart();

  const handleAdd = () => {
    addToCart({
      id: product.id,
      name: product.name,
      material: product.material,
      color: 'Luxury Silk',
      priceNumber: parseInt(product.price.replace(/[^\d]/g, ''), 10) || 12999,
      priceFormatted: product.price,
      imageSrc: product.images[0],
    });
    if (onAddToBag) onAddToBag(product.id);
  };

  return (
    <motion.article
      initial="initial"
      whileHover="hover"
      transition={CARD_LIFT_TRANSITION}
      variants={{
        initial: { y: 0 },
        hover: { y: -4 },
      }}
      className={cn(
        'group relative w-full max-w-[420px] bg-[#230C14]/85 backdrop-blur-[16px] border border-[#C89D5C]/30 rounded-lg flex flex-col justify-between gap-5 p-4 font-satoshi select-none transition-all duration-500 shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:shadow-[0_15px_40px_rgba(200,157,92,0.25)] hover:border-[#C89D5C]/70 text-[#F6ECE1]',
        className
      )}
    >
      {/* 1. TOP: LUXURY WOODEN HANGER & DRAPED SAREE */}
      <ProductImage
        images={product.images}
        title={product.name}
        badges={product.badges}
        isFavorite={product.isFavorite}
        onFavoriteToggle={(isFav) => onFavoriteToggle && onFavoriteToggle(product.id, isFav)}
      />

      {/* 2. MIDDLE & BOTTOM: PRODUCT INFORMATION, PRICE & ADD TO BAG */}
      <div className="flex flex-col gap-3.5 px-2 pb-2">
        <ProductInfo name={product.name} material={product.material} />
        <Price amount={product.price} />
        <AddToBagButton onAdd={handleAdd} />
      </div>
    </motion.article>
  );
};

HangingCard.displayName = 'HangingCard';
