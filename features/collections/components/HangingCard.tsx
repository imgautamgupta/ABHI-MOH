'use client';

import React from 'react';
import Link from 'next/link';
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

  // inStock is undefined for static mock data → treat as in-stock
  const isInStock = product.inStock !== false;

  const handleAdd = () => {
    if (!isInStock) return;
    addToCart({
      id: product.id,
      name: product.name,
      material: product.material,
      color: 'Luxury Saree',
      priceNumber:
        product.priceNumber ||
        parseInt(product.price.replace(/[^\d]/g, ''), 10) ||
        0,
      priceFormatted: product.price,
      imageSrc: product.images[0],
    });
    if (onAddToBag) onAddToBag(product.id);
  };

  // If slug is available, the image area links to the detail page
  const detailHref = product.slug ? `/collections/${product.slug}` : undefined;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
      className={cn(
        'group relative w-full flex flex-col justify-between gap-3 p-0 font-satoshi select-none transition-all duration-500 text-[#382C26]',
        !isInStock && 'opacity-70',
        className
      )}
    >
      {/* OUT OF STOCK OVERLAY */}
      {!isInStock && (
        <div className="absolute top-3 inset-x-3 z-30 flex justify-center pointer-events-none">
          <span className="bg-[#382C26]/80 text-[#FAF7F2] text-[9px] uppercase tracking-[0.25em] px-3 py-1 rounded-full">
            Out of Stock
          </span>
        </div>
      )}

      {/* 1. TOP: EDITORIAL PRODUCT IMAGE (links to detail page) */}
      {detailHref ? (
        <Link href={detailHref} aria-label={`View ${product.name}`} tabIndex={0}>
          <ProductImage
            productId={product.id}
            images={product.images}
            title={product.name}
            badges={product.badges}
            isFavorite={product.isFavorite}
            onFavoriteToggle={(isFav) =>
              onFavoriteToggle && onFavoriteToggle(product.id, isFav)
            }
          />
        </Link>
      ) : (
        <ProductImage
          productId={product.id}
          images={product.images}
          title={product.name}
          badges={product.badges}
          isFavorite={product.isFavorite}
          onFavoriteToggle={(isFav) =>
            onFavoriteToggle && onFavoriteToggle(product.id, isFav)
          }
        />
      )}

      {/* 2. BOTTOM: PRODUCT INFORMATION & ADD TO BAG */}
      <div className="flex flex-col gap-2.5 px-0.5 pt-1">
        {/* Name links to detail page if slug available */}
        {detailHref ? (
          <Link href={detailHref} tabIndex={-1} className="hover:text-[#7D2130] transition-colors">
            <ProductInfo name={product.name} material={product.material} />
          </Link>
        ) : (
          <ProductInfo name={product.name} material={product.material} />
        )}

        <div className="flex items-center justify-between gap-2 mt-0.5">
          {/* Show discounted price with strikethrough when applicable */}
          {product.discountedPrice && product.originalPrice ? (
            <div className="flex items-center gap-2">
              <Price amount={product.discountedPrice} />
              <span className="font-sans text-xs text-[#736357]/60 line-through">
                {product.originalPrice}
              </span>
            </div>
          ) : (
            <Price amount={product.price} />
          )}
        </div>

        <AddToBagButton
          onAdd={handleAdd}
          disabled={!isInStock}
          className="mt-1"
        />
      </div>
    </motion.article>
  );
};

HangingCard.displayName = 'HangingCard';
