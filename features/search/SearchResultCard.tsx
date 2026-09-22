'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Heart, ArrowRight } from 'lucide-react';
import { SareeProduct } from '@/features/collections/components/hanging-card.types';
import { useFavorites } from '@/features/favorites/FavoritesContext';
import { Badge } from '@/features/collections/components/Badge';
import { cn } from '@/lib/utils';

export interface SearchResultCardProps {
  product: SareeProduct;
  onSelect: () => void;
}

export const SearchResultCard: React.FC<SearchResultCardProps> = ({ product, onSelect }) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const isFav = isFavorite(product.id);

  const productUrl = `/collections/${product.slug || product.id}`;
  const displayImage = product.images?.[0] || '/assets/sarees/saree-maroon.png';

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(product);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
      className="group relative bg-[#FAF7F2] border border-[#D9C7A7]/50 rounded-xs p-4 flex flex-col justify-between shadow-2xs hover:shadow-md hover:border-[#7D2130]/40 transition-all duration-300 select-none"
    >
      {/* Product Image Showcase */}
      <Link
        href={productUrl}
        onClick={onSelect}
        className="relative w-full aspect-[3/4] bg-[#F5EFE7] rounded-xs overflow-hidden border border-[#D9C7A7]/40 mb-3.5 flex items-center justify-center p-2 block"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={displayImage}
          alt={product.name}
          className="w-full h-full object-contain object-center transition-transform duration-500 group-hover:scale-105"
        />

        {/* Badges Overlay */}
        {product.badges && product.badges.length > 0 && (
          <div className="absolute top-2 left-2 z-10 flex flex-wrap gap-1 pointer-events-none scale-90 origin-top-left">
            {product.badges.map((b) => (
              <Badge key={b} label={b} />
            ))}
          </div>
        )}

        {/* Favorite Heart Button */}
        <button
          type="button"
          onClick={handleFavoriteClick}
          aria-label={isFav ? 'Remove from favorites' : 'Add to favorites'}
          className="absolute top-2 right-2 w-8 h-8 rounded-full bg-[#FAF7F2]/90 backdrop-blur-md border border-[#D9C7A7]/60 flex items-center justify-center text-[#382C26] hover:text-[#7D2130] hover:bg-[#FAF7F2] transition-colors z-20 shadow-2xs cursor-pointer focus:outline-none"
        >
          <Heart
            className={cn(
              'w-3.5 h-3.5 transition-transform duration-200',
              isFav ? 'fill-[#7D2130] text-[#7D2130] scale-110' : 'text-[#382C26]'
            )}
          />
        </button>
      </Link>

      {/* Product Information */}
      <div className="flex flex-col gap-1.5">
        <span className="text-[9px] uppercase tracking-[0.22em] text-[#736357]/80 font-medium">
          {product.origin || 'Varanasi Handloom'}
        </span>

        <Link
          href={productUrl}
          onClick={onSelect}
          className="font-hero text-base sm:text-lg font-normal text-[#382C26] group-hover:text-[#7D2130] transition-colors line-clamp-1 leading-snug"
        >
          {product.name}
        </Link>

        <p className="text-[11px] text-[#736357] font-light line-clamp-1">
          {product.material}
        </p>

        {/* Price & View Action */}
        <div className="pt-2 mt-1 border-t border-[#D9C7A7]/40 flex items-center justify-between">
          <span className="font-hero text-sm sm:text-base font-medium text-[#7D2130] tracking-wide">
            {product.price}
          </span>

          <Link
            href={productUrl}
            onClick={onSelect}
            className="inline-flex items-center gap-1 text-[10px] uppercase tracking-[0.18em] font-medium text-[#382C26] group-hover:text-[#7D2130] transition-colors"
          >
            <span>View Product</span>
            <ArrowRight className="w-3 h-3 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

SearchResultCard.displayName = 'SearchResultCard';
