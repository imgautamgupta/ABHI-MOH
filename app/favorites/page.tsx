'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ArrowRight } from 'lucide-react';
import { useAuth } from '@/features/account/AuthContext';
import { useFavorites } from '@/features/favorites/FavoritesContext';
import { HangingCard } from '@/features/collections/components/HangingCard';

export default function FavoritesPage() {
  const router = useRouter();
  const { isLoggedIn, isLoading: isAuthLoading } = useAuth();
  const { favoriteProducts, totalFavoriteCount, isLoaded } = useFavorites();

  // Guard: Redirect to /login if unauthenticated
  useEffect(() => {
    if (!isAuthLoading && !isLoggedIn) {
      router.replace('/login?returnTo=%2Ffavorites');
    }
  }, [isAuthLoading, isLoggedIn, router]);

  if (isAuthLoading || !isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex flex-col items-center justify-center pt-24 font-satoshi text-[#2A221E]">
        <div className="w-10 h-10 rounded-full border-2 border-[#7A1C28]/20 border-t-[#7A1C28] animate-spin mb-4" />
        <p className="font-hero text-xs tracking-[0.25em] uppercase text-[#7A1C28]">
          Verifying Client Session...
        </p>
      </div>
    );
  }

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
            {!isLoaded || totalFavoriteCount === 0
              ? 'Your Personal Curation Awaits'
              : `${totalFavoriteCount} ${totalFavoriteCount === 1 ? 'Piece' : 'Pieces'} Saved In Your Wishlist`}
          </p>
          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-[#7D2130]/40 to-transparent mt-6" />
        </motion.div>

        {/* CONTENT CONDITION: LOADING VS EMPTY VS PRODUCTS EXIST */}
        {!isLoaded ? (
          <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10 xl:gap-12 items-start animate-pulse">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="w-full flex flex-col gap-3">
                <div className="w-full aspect-[3/4] bg-[#E8DFD5]/60 rounded-2xl" />
                <div className="h-4 bg-[#E8DFD5]/60 rounded w-3/4" />
                <div className="h-3 bg-[#E8DFD5]/40 rounded w-1/2" />
                <div className="h-9 bg-[#E8DFD5]/40 rounded-xs mt-1" />
              </div>
            ))}
          </div>
        ) : totalFavoriteCount === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col items-center justify-center text-center py-20 px-6 max-w-lg mx-auto bg-[#F5EFE7]/60 backdrop-blur-md rounded-2xl border border-[#D9C7A7]/40 shadow-xs"
          >
            <div className="w-16 h-16 rounded-full bg-[#FAF7F2] border border-[#D9C7A7]/60 flex items-center justify-center mb-6 text-[#7D2130]">
              <Heart className="w-7 h-7" />
            </div>
            <h2 className="font-hero text-2xl sm:text-3xl uppercase tracking-[0.12em] text-[#382C26] mb-3">
              Your curated collection awaits.
            </h2>
            <p className="font-sans text-xs sm:text-sm text-[#736357] font-light leading-relaxed mb-8">
              Save pieces you love and return to them anytime.
            </p>
            <Link
              href="/collections"
              className="inline-flex items-center gap-3 px-8 py-4 bg-[#7D2130] hover:bg-[#5E1522] text-[#FAF7F2] border border-[#D9C7A7]/40 font-satoshi text-xs uppercase tracking-[0.2em] font-medium transition-all duration-300 rounded-sm shadow-md hover:shadow-lg"
            >
              <span>Explore Collection</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        ) : (
          <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10 xl:gap-12 items-start">
            <AnimatePresence mode="popLayout">
              {favoriteProducts.map((product) => (
                <HangingCard key={product.id} product={product} />
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
