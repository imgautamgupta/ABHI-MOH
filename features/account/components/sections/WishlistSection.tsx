'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ShoppingBag, Trash2, ArrowRight, Sparkles } from 'lucide-react';
import { useFavorites } from '@/features/favorites/FavoritesContext';
import { useCart } from '@/features/cart/CartContext';
import { isWixImage, wixCardImage, SOFT_IVORY_PLACEHOLDER } from '@/lib/wixImage';

export const WishlistSection: React.FC = () => {
  const { favoriteProducts, removeFavorite, totalFavoriteCount } = useFavorites();
  const { addToCart } = useCart();

  if (totalFavoriteCount === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -15 }}
        transition={{ duration: 0.3 }}
        className="bg-[#FFFDFC] border border-[#E8DFD5] rounded-2xl p-8 sm:p-14 text-center max-w-2xl mx-auto shadow-xs font-satoshi text-[#2A221E]"
      >
        <div className="w-16 h-16 rounded-full bg-[#F3ECE3] border border-[#E8DFD5] flex items-center justify-center mx-auto mb-4 text-[#7A1C28]">
          <Heart className="w-7 h-7" />
        </div>
        <h3 className="font-hero text-2xl uppercase tracking-wider text-[#2A221E] mb-2">
          YOUR WISHLIST IS CURRENTLY EMPTY
        </h3>
        <p className="font-sans text-xs sm:text-sm text-[#6E645A] font-light max-w-md mx-auto mb-6 leading-relaxed">
          Curate your personal collection of heirloom sarees. Save pieces you desire to reserve for bridal consultations, festive celebrations, or bespoke sizing.
        </p>
        <Link
          href="/collections"
          className="inline-flex items-center gap-2.5 px-6 py-3 bg-[#7A1C28] hover:bg-[#60121D] text-[#FAF7F2] text-xs uppercase tracking-widest font-semibold rounded-full shadow-sm transition-all"
        >
          <span>EXPLORE COLLECTION</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.3 }}
      className="space-y-6 font-satoshi text-[#2A221E]"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E8DFD5] pb-4">
        <div>
          <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-[#7A1C28]">
            Curated Heirloom Pieces
          </span>
          <h2 className="font-hero text-2xl uppercase tracking-wider text-[#2A221E] mt-0.5">
            Client Wishlist & Favorites
          </h2>
        </div>
        <span className="text-xs text-[#6E645A]">
          {totalFavoriteCount} Saved {totalFavoriteCount === 1 ? 'Piece' : 'Pieces'}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <AnimatePresence mode="popLayout">
          {favoriteProducts.map((item) => {
            const imageSrc = item.images && item.images.length > 0 ? item.images[0] : '/assets/sarees/saree-maroon.png';
            const priceNumber = item.priceNumber || (item.price ? parseInt(item.price.replace(/[^\d]/g, ''), 10) || 18500 : 18500);

            return (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.25 }}
                className="bg-[#FFFDFC] border border-[#E8DFD5] rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col group"
              >
                {/* Image Container */}
                <div className="relative aspect-[3/4] bg-[#FAF7F2] w-full overflow-hidden">
                  <Image
                    src={wixCardImage(imageSrc)}
                    alt={item.name}
                    fill
                    unoptimized={isWixImage(imageSrc)}
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (target.src !== SOFT_IVORY_PLACEHOLDER) {
                        target.src = SOFT_IVORY_PLACEHOLDER;
                      }
                    }}
                  />

                  {/* Remove Button */}
                  <button
                    type="button"
                    onClick={() => removeFavorite(item.id)}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-[#FFFDFC]/90 backdrop-blur-xs text-[#6E645A] hover:text-[#7A1C28] hover:bg-[#FFFDFC] flex items-center justify-center transition-colors cursor-pointer shadow-xs"
                    title="Remove from Wishlist"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  {/* In Stock Badge */}
                  <div className="absolute bottom-3 left-3">
                    <span className="px-2.5 py-0.5 rounded-full text-[9px] uppercase tracking-widest font-semibold bg-[#2A221E]/80 backdrop-blur-xs text-[#FAF7F2]">
                      {item.inStock !== false ? 'In Atelier' : 'Bespoke Order'}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between gap-4">
                  <div>
                    <h3 className="font-hero text-base font-medium text-[#2A221E] group-hover:text-[#7A1C28] transition-colors truncate">
                      {item.name}
                    </h3>
                    <p className="text-xs text-[#6E645A] font-light mt-0.5 truncate">
                      {item.material || 'Luxury Handloom Saree'}
                    </p>
                    <p className="font-hero text-base font-semibold text-[#7A1C28] mt-2">
                      {item.price || `₹${priceNumber.toLocaleString('en-IN')}`}
                    </p>
                  </div>

                  {/* Add to Cart Action */}
                  <button
                    type="button"
                    onClick={() => {
                      addToCart({
                        id: item.id,
                        name: item.name,
                        priceNumber: priceNumber,
                        priceFormatted: item.price || `₹${priceNumber.toLocaleString('en-IN')}`,
                        material: item.material || 'Pure Silk',
                        color: 'Heirloom Hue',
                        imageSrc: imageSrc,
                      });
                    }}
                    className="w-full py-2.5 rounded-full bg-[#7A1C28] hover:bg-[#60121D] text-[#FAF7F2] text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Add to Shopping Bag</span>
                  </button>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
