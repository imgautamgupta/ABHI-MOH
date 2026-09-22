'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, ShoppingBag, Heart, Check, Sparkles } from 'lucide-react';
import type { SareeProduct } from './components/hanging-card.types';
import { ProductDetailGallery } from './components/ProductDetailGallery';
import { ProductDescription } from './components/ProductDescription';
import { ProductDetailAccordion } from './components/ProductDetailAccordion';
import { ProductTrustBadges } from './components/ProductTrustBadges';
import { useCart } from '@/features/cart/CartContext';
import { useFavorites } from '@/features/favorites/FavoritesContext';
import { cn } from '@/lib/utils';

interface ProductDetailPageProps {
  product: SareeProduct;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ product }) => {
  const { addToCart, openCart } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();
  const [isAdded, setIsAdded] = useState(false);

  const isInStock = product.inStock !== false;
  const isFav = isFavorite(product.id);

  const handleAddToBag = () => {
    if (!isInStock) return;
    addToCart({
      id: product.id,
      name: product.name,
      material: product.material,
      color: 'Luxury Saree',
      priceNumber: product.priceNumber,
      priceFormatted: product.price,
      imageSrc: product.images[0] || '/assets/sarees/saree-maroon.png',
    });
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      openCart();
    }, 600);
  };

  const handleFavoriteClick = () => {
    toggleFavorite(product);
  };

  return (
    <div className="relative w-full min-h-screen bg-[#FAF7F2] text-[#382C26] pt-[100px] lg:pt-[130px] pb-32 font-satoshi">
      {/* Subtle warm light layer */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] lg:w-[1300px] h-[550px] bg-[radial-gradient(ellipse_at_50%_0%,rgba(217,199,167,0.22)_0%,transparent_70%)] pointer-events-none z-0" />

      <div className="relative z-10 max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-16">
        {/* Back to Collections breadcrumb */}
        <motion.div
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
          className="mb-8 lg:mb-12"
        >
          <Link
            href="/collections"
            className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-[#736357] hover:text-[#7D2130] transition-colors duration-300 group"
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform duration-300 group-hover:-translate-x-1" />
            Back to Collections
          </Link>
        </motion.div>

        {/* Main product layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 xl:gap-20 items-start">
          {/* LEFT COLUMN: Large Image Gallery (7 cols on desktop) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
            className="lg:col-span-7 w-full"
          >
            <ProductDetailGallery
              product={product}
              images={product.images}
              title={product.name}
              badges={product.badges}
              isFavorite={isFav}
              onFavoriteToggle={() => toggleFavorite(product)}
            />
          </motion.div>

          {/* RIGHT COLUMN: Product information & purchase actions (5 cols on desktop, sticky) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: [0.25, 1, 0.5, 1], delay: 0.08 }}
            className="lg:col-span-5 flex flex-col gap-6 lg:sticky lg:top-32"
          >
            {/* Atelier Eyebrow */}
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-semibold uppercase tracking-[0.35em] text-[#7D2130]">
                ABHI-MOH ATELIER
              </span>
              <span className="text-[#D9C7A7]">•</span>
              <span className="text-[10px] font-light uppercase tracking-[0.25em] text-[#736357]">
                HAUTE COUTURE
              </span>
            </div>

            {/* Product Name & Short Tagline */}
            <div className="flex flex-col gap-2">
              <h1 className="font-hero text-3xl sm:text-4xl lg:text-5xl font-normal tracking-[0.05em] text-[#382C26] leading-tight">
                {product.name}
              </h1>
              <p className="font-sans text-sm font-light text-[#736357] tracking-wide leading-relaxed">
                {product.material}
              </p>
            </div>

            {/* Price, Sale State & Inventory */}
            <div className="flex items-baseline justify-between border-y border-[#D9C7A7]/40 py-3.5">
              <div className="flex items-baseline gap-3">
                <span className="font-hero text-2xl sm:text-3xl font-medium text-[#7D2130] tracking-wide">
                  {product.price}
                </span>
                {product.discountedPrice && product.originalPrice && (
                  <span className="font-sans text-sm sm:text-base text-[#736357]/60 line-through">
                    {product.originalPrice}
                  </span>
                )}
                {product.discountedPrice && (
                  <span className="text-[10px] uppercase font-semibold tracking-wider text-[#7D2130] bg-[#7D2130]/10 px-2 py-0.5 rounded-full">
                    Special Edition
                  </span>
                )}
              </div>

              {/* Stock indicator */}
              <div className="flex items-center gap-2">
                <span
                  className={cn(
                    'w-2 h-2 rounded-full',
                    isInStock ? 'bg-emerald-500 animate-pulse' : 'bg-[#736357]/50'
                  )}
                />
                <span className="text-[11px] uppercase tracking-[0.2em] font-medium text-[#736357]">
                  {isInStock ? 'Available' : 'Sold Out'}
                </span>
              </div>
            </div>

            {/* Action Buttons: Add to Bag + Wishlist */}
            <div className="flex flex-col gap-3">
              <div className="flex items-stretch gap-3">
                <button
                  type="button"
                  onClick={handleAddToBag}
                  disabled={!isInStock}
                  className={cn(
                    'flex-1 py-4 px-6 rounded-xs font-satoshi font-medium text-xs uppercase tracking-[0.22em] flex items-center justify-center gap-3 transition-all duration-400 select-none cursor-pointer',
                    !isInStock
                      ? 'bg-[#E8DFD5] text-[#736357]/60 cursor-not-allowed border border-[#D9C7A7]/50'
                      : isAdded
                      ? 'bg-emerald-800 text-emerald-50 shadow-md'
                      : 'bg-gradient-to-r from-[#8C1C2A] via-[#A32233] to-[#7A1523] text-[#FAF7F2] shadow-md hover:shadow-lg hover:-translate-y-[1px]'
                  )}
                  aria-label={!isInStock ? 'Sold Out' : 'Add To Bag'}
                >
                  {isAdded ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-200" />
                      <span>Added — Opening Bag…</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>{!isInStock ? 'Sold Out' : 'Add To Bag'}</span>
                    </>
                  )}
                </button>

                {/* Secondary Wishlist Button */}
                <button
                  type="button"
                  onClick={handleFavoriteClick}
                  aria-label={isFav ? 'Remove from Wishlist' : 'Add to Wishlist'}
                  className={cn(
                    'p-4 rounded-xs border transition-all duration-300 flex items-center justify-center cursor-pointer shadow-xs focus:outline-none',
                    isFav
                      ? 'border-[#7D2130] bg-[#7D2130]/10 text-[#7D2130]'
                      : 'border-[#D9C7A7]/60 bg-[#FAF7F2] text-[#382C26] hover:border-[#7D2130] hover:text-[#7D2130]'
                  )}
                >
                  <Heart className={cn('w-5 h-5 transition-transform', isFav && 'fill-current scale-110')} />
                </button>
              </div>

              <p className="text-[10px] text-center text-[#736357]/80 uppercase tracking-[0.2em]">
                Complimentary Insured Express Shipping Across India
              </p>
            </div>

            {/* Trust & Assurance Grid */}
            <ProductTrustBadges className="mt-1" />

            {/* Complete Wix Product Story & Full Description */}
            <div className="flex flex-col gap-3 pt-2">
              <div className="flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-[#7D2130]" />
                <span className="text-[10px] uppercase tracking-[0.28em] text-[#7D2130] font-semibold">
                  About This Piece
                </span>
              </div>
              <ProductDescription
                description={product.description || product.descriptionHtml || product.material}
              />
            </div>

            {/* Luxury Specifications, Care, Shipping & Returns Accordion */}
            <ProductDetailAccordion product={product} className="mt-2" />

            {/* Certificate of Authenticity Card */}
            <div className="p-5 border border-[#D9C7A7]/50 rounded-xs bg-[#FAF7F2] flex flex-col gap-1.5 shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-[0.28em] text-[#382C26] font-semibold">
                  Certificate of Authenticity
                </span>
                <span className="text-[9px] uppercase tracking-[0.2em] text-[#7D2130] font-medium">
                  ABHI-MOH Provenance
                </span>
              </div>
              <p className="text-xs font-light text-[#736357] leading-relaxed">
                Each piece comes with ABHI-MOH&apos;s hallmark of artisanal provenance, certifying the handloom cluster, weave technique, and pure yarn specifications.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

ProductDetailPage.displayName = 'ProductDetailPage';
