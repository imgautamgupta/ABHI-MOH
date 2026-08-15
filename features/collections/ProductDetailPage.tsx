'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, ShoppingBag } from 'lucide-react';
import type { SareeProduct } from './components/hanging-card.types';
import { ProductImage } from './components/ProductImage';
import { useCart } from '@/features/cart/CartContext';

interface ProductDetailPageProps {
  product: SareeProduct;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ product }) => {
  const { addToCart, openCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  const isInStock = product.inStock !== false;

  const handleAddToBag = () => {
    if (!isInStock) return;
    addToCart({
      id: product.id,
      name: product.name,
      material: product.material,
      color: 'Luxury Saree',
      priceNumber: product.priceNumber,
      priceFormatted: product.price,
      imageSrc: product.images[0],
    });
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      openCart();
    }, 800);
  };

  return (
    <div className="relative w-full min-h-screen bg-[#FAF7F2] text-[#382C26] pt-[100px] lg:pt-[130px] pb-32 font-satoshi">

      {/* Subtle warm light layer */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[550px] bg-[radial-gradient(ellipse_at_50%_0%,rgba(217,199,167,0.18)_0%,transparent_70%)] pointer-events-none z-0" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-5 sm:px-10 lg:px-16">

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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 xl:gap-24 items-start">

          {/* LEFT — Image gallery */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
          >
            <ProductImage
              productId={product.id}
              images={product.images}
              title={product.name}
              badges={product.badges}
              isFavorite={product.isFavorite}
              className="max-w-[560px] mx-auto lg:mx-0"
            />

            {/* Additional image thumbnails */}
            {product.images.length > 1 && (
              <div className="flex gap-2.5 mt-4 max-w-[560px] mx-auto lg:mx-0 overflow-x-auto pb-1 no-scrollbar">
                {product.images.slice(0, 5).map((img, idx) => (
                  <div
                    key={idx}
                    className="relative flex-shrink-0 w-16 h-20 sm:w-20 sm:h-24 bg-[#FAF7F2] border border-[#D9C7A7]/40 rounded-xs overflow-hidden"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={img}
                      alt={`${product.name} view ${idx + 1}`}
                      className="w-full h-full object-contain p-1"
                    />
                  </div>
                ))}
              </div>
            )}
          </motion.div>

          {/* RIGHT — Product information */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: [0.25, 1, 0.5, 1], delay: 0.08 }}
            className="flex flex-col gap-6 lg:pt-4 lg:sticky lg:top-32"
          >
            {/* Eyebrow label */}
            <span className="text-[10px] font-semibold uppercase tracking-[0.35em] text-[#7D2130]">
              ABHI-MOH ATELIER
            </span>

            {/* Product name */}
            <div className="flex flex-col gap-1.5">
              <h1 className="font-hero text-3xl sm:text-4xl lg:text-5xl font-normal tracking-[0.06em] text-[#382C26] leading-tight">
                {product.name}
              </h1>
              <p className="font-sans text-sm font-light text-[#736357] tracking-wide leading-relaxed mt-1">
                {product.material}
              </p>
            </div>

            {/* Divider */}
            <div className="w-12 h-[1px] bg-gradient-to-r from-[#7D2130]/40 to-transparent" />

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="font-hero text-2xl sm:text-3xl font-medium text-[#7D2130] tracking-wide">
                {product.price}
              </span>
              {product.discountedPrice && product.originalPrice && (
                <span className="font-sans text-base text-[#736357]/60 line-through">
                  {product.originalPrice}
                </span>
              )}
            </div>

            {/* Stock indicator */}
            <div className="flex items-center gap-2">
              <span
                className={`w-1.5 h-1.5 rounded-full ${isInStock ? 'bg-emerald-500' : 'bg-[#736357]/40'}`}
              />
              <span className="text-[11px] uppercase tracking-[0.22em] text-[#736357]">
                {isInStock ? 'Available' : 'Out of Stock'}
              </span>
            </div>

            {/* Add To Bag button */}
            <div className="flex flex-col gap-3 mt-2">
              <button
                type="button"
                onClick={handleAddToBag}
                disabled={!isInStock}
                className={`
                  w-full py-4 px-8 rounded-xs font-satoshi font-medium text-xs uppercase tracking-[0.22em]
                  flex items-center justify-center gap-3 transition-all duration-400 cursor-pointer
                  ${!isInStock
                    ? 'bg-[#E8DFD5] text-[#736357]/60 cursor-not-allowed'
                    : isAdded
                    ? 'bg-emerald-700 text-emerald-50 shadow-md'
                    : 'bg-gradient-to-r from-[#8C1C2A] via-[#A32233] to-[#7A1523] text-[#FAF7F2] shadow-md hover:shadow-lg hover:-translate-y-[1px]'
                  }
                `}
              >
                <ShoppingBag className="w-4 h-4" />
                {!isInStock
                  ? 'Currently Unavailable'
                  : isAdded
                  ? 'Added — Opening Bag…'
                  : 'Add To Bag'}
              </button>

              <p className="text-[10px] text-center text-[#736357]/70 uppercase tracking-[0.2em]">
                Complimentary Express Shipping
              </p>
            </div>

            {/* Divider */}
            <div className="w-full h-[1px] bg-[#E8DFD5]" />

            {/* Product story / description */}
            <div className="flex flex-col gap-2">
              <span className="text-[10px] uppercase tracking-[0.28em] text-[#7D2130] font-medium">
                About This Piece
              </span>
              <p className="font-sans text-sm font-light text-[#736357] leading-relaxed">
                {product.material}
              </p>
              <p className="font-sans text-xs font-light text-[#736357]/70 leading-relaxed mt-1">
                Every ABHI-MOH saree is crafted with meticulous artisanal care, 
                celebrating centuries of Indian textile heritage.
              </p>
            </div>

            {/* Authenticity note */}
            <div className="mt-2 p-4 border border-[#D9C7A7]/40 rounded-xs bg-[#FAF7F2] flex flex-col gap-1">
              <span className="text-[10px] uppercase tracking-[0.28em] text-[#382C26] font-medium">
                Certificate of Authenticity
              </span>
              <p className="text-[11px] font-light text-[#736357] leading-relaxed">
                Each piece comes with ABHI-MOH's hallmark of provenance, 
                confirming the origin, craft, and fabric specifications.
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

ProductDetailPage.displayName = 'ProductDetailPage';
