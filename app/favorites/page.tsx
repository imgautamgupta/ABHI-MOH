'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Heart, ArrowRight } from 'lucide-react';
import { useFavorites } from '@/features/favorites/FavoritesContext';
import { HangingCard } from '@/features/collections/components/HangingCard';

export default function FavoritesPage() {
  const { favoriteProducts, totalFavoriteCount } = useFavorites();

  return (
    <div className="relative w-full bg-[#FAF7F2] text-[#382C26] min-h-screen pt-[110px] lg:pt-[140px] pb-32 px-5 sm:px-10 lg:px-16 max-w-[1800px] mx-auto font-satoshi overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] lg:w-[1300px] h-[550px] bg-[radial-gradient(ellipse_at_50%_0%,rgba(217,199,167,0.22)_0%,transparent_70%)] pointer-events-none z-0" />

      <div className="relative z-10">
        {/* EDITORIAL HERO HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
          className="flex flex-col items-center justify-center text-center my-8 lg:my-14 max-w-3xl mx-auto px-4"
        >
          <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.35em] text-[#7D2130] bg-[#FAF7F2]/90 px-4 py-1 rounded-full border border-[#D9C7A7]/50 inline-block mb-3 shadow-2xs">
            HAUTE COUTURE WISHLIST
          </span>
          <h1 className="font-hero text-4xl sm:text-6xl md:text-7xl font-normal tracking-[0.16em] uppercase text-[#382C26] leading-none">
            YOUR FAVORITES
          </h1>
          <p className="mt-4 font-sans text-xs sm:text-sm md:text-base font-light tracking-[0.15em] uppercase text-[#736357]/90 max-w-lg">
            {totalFavoriteCount === 0
              ? 'Your Personal Curation Awaits'
              : `${totalFavoriteCount} ${totalFavoriteCount === 1 ? 'Piece' : 'Pieces'} Saved In Your Wishlist`}
          </p>
          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-[#7D2130]/40 to-transparent mt-6" />
        </motion.div>

        {/* CONTENT CONDITION: EMPTY VS PRODUCTS EXIST */}
        {totalFavoriteCount === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col items-center justify-center text-center py-20 px-6 max-w-lg mx-auto bg-[#F5EFE7]/60 backdrop-blur-md rounded-2xl border border-[#D9C7A7]/40 shadow-xs"
          >
            <div className="w-16 h-16 rounded-full bg-[#FAF7F2] border border-[#D9C7A7]/60 flex items-center justify-center mb-6 text-[#7D2130]">
              <Heart className="w-7 h-7" />
            </div>
            <h2 className="font-hero text-2xl sm:text-3xl uppercase tracking-[0.12em] text-[#382C26] mb-3">
              Your favorites are waiting.
            </h2>
            <p className="font-sans text-xs sm:text-sm text-[#736357] font-light leading-relaxed mb-8">
              Save pieces you love and they will appear here for easy access and consultation with our Maison Concierge.
            </p>
            <Link
              href="/collections"
              className="inline-flex items-center gap-3 px-8 py-4 bg-[#7D2130] hover:bg-[#5E1522] text-[#FAF7F2] border border-[#D9C7A7]/40 font-satoshi text-xs uppercase tracking-[0.2em] font-medium transition-all duration-300 rounded-sm shadow-md hover:shadow-lg"
            >
              <span>EXPLORE COLLECTIONS</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 lg:gap-10">
            {favoriteProducts.map((product) => (
              <HangingCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
