'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { SareeProduct } from './hanging-card.types';
import { ProductImage } from './ProductImage';
import { ProductInfo } from './ProductInfo';
import { Price } from './Price';
import { AddToBagButton } from './AddToBagButton';
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
      priceNumber: product.priceNumber || parseInt(product.price.replace(/[^\d]/g, ''), 10) || 12999,
      priceFormatted: product.price,
      imageSrc: product.images[0],
    });
    if (onAddToBag) onAddToBag(product.id);
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
      className={cn(
        'group relative w-full flex flex-col justify-between gap-3 p-0 font-satoshi select-none transition-all duration-500 text-[#382C26]',
        className
      )}
    >
      {/* 1. TOP: EDITORIAL PRODUCT IMAGE PRESENTATION (75-80% AREA) */}
      <ProductImage
        productId={product.id}
        images={product.images}
        title={product.name}
        badges={product.badges}
        isFavorite={product.isFavorite}
        onFavoriteToggle={(isFav) => onFavoriteToggle && onFavoriteToggle(product.id, isFav)}
      />

      {/* 2. BOTTOM: UNBOXED PRODUCT INFORMATION & ADD TO BAG */}
      <div className="flex flex-col gap-2.5 px-0.5 pt-1">
        <ProductInfo name={product.name} material={product.material} />
        <div className="flex items-center justify-between gap-2 mt-0.5">
          <Price amount={product.price} />
        </div>
        <AddToBagButton onAdd={handleAdd} className="mt-1" />
      </div>
    </motion.article>
  );
};

HangingCard.displayName = 'HangingCard';

