'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Heart, ShoppingBag, Check, Sparkles, ArrowRight } from 'lucide-react';
import { useCart } from '@/features/cart/CartContext';
import { useFavorites } from '@/features/favorites/FavoritesContext';
import { BadgeType } from './components/hanging-card.types';
import { cn } from '@/lib/utils';

export type ExclusiveBadge = 'LIMITED' | 'NEW' | 'HANDWOVEN' | "EDITOR'S PICK" | 'HERITAGE';

export interface CuratedSaree {
  id: string;
  name: string;
  material: string;
  price: string;
  priceValue: number;
  images: string[];
  origin: string;
  badge: ExclusiveBadge;
}

const EXCLUSIVE_SAREES: CuratedSaree[] = [
  {
    id: 'kanjivaram-royal',
    name: 'Kanjivaram Pure Silk Saree',
    material: 'Pure Mulberry Silk & 24K Gold Zari',
    price: '₹84,500',
    priceValue: 84500,
    images: [
      '/assets/sarees/saree-kanjivaram.png',
      '/assets/sarees/kanjivaram-detail.png',
      '/assets/sarees/saree-maroon.png',
    ],
    origin: 'Kanchipuram, Tamil Nadu',
    badge: 'HERITAGE',
  },
  {
    id: 'banarasi-ruby',
    name: 'Banarasi Katan Silk Brocade Saree',
    material: 'Pure Katan Silk & Kadwa Weave',
    price: '₹96,000',
    priceValue: 96000,
    images: [
      '/assets/sarees/saree-banarasi.png',
      '/assets/sarees/banarasi-detail.png',
    ],
    origin: 'Varanasi, Uttar Pradesh',
    badge: "EDITOR'S PICK",
  },
  {
    id: 'paithani-peacock',
    name: 'Paithani Heritage Silk Saree',
    material: 'Pure Silk & Tapestry Asavali Weave',
    price: '₹1,12,000',
    priceValue: 112000,
    images: [
      '/assets/sarees/saree-paithani.png',
      '/assets/sarees/paithani-detail.png',
    ],
    origin: 'Paithan, Maharashtra',
    badge: 'LIMITED',
  },
  {
    id: 'chanderi-tissue',
    name: 'Chanderi Moti Silk Saree',
    material: 'Fine Tissue Silk & Real Moti Work',
    price: '₹52,000',
    priceValue: 52000,
    images: [
      '/assets/sarees/saree-chanderi.png',
      '/assets/sarees/chanderi-detail.png',
    ],
    origin: 'Chanderi, Madhya Pradesh',
    badge: 'NEW',
  },
  {
    id: 'organza-blush',
    name: 'Hand Embroidered Organza Saree',
    material: 'Sheer Organza Silk & Zardozi',
    price: '₹48,000',
    priceValue: 48000,
    images: [
      '/assets/sarees/saree-organza.png',
      '/assets/sarees/organza-detail.png',
    ],
    origin: 'Varanasi Atelier',
    badge: 'LIMITED',
  },
  {
    id: 'tussar-walnut',
    name: 'Textured Tussar Silk Saree',
    material: 'Wild Tussar Silk & Antique Zari',
    price: '₹39,500',
    priceValue: 39500,
    images: [
      '/assets/sarees/saree-tussar.png',
      '/assets/sarees/tussar-detail.png',
    ],
    origin: 'Bhagalpur, Bihar',
    badge: 'HANDWOVEN',
  },
];

export const ExclusiveCollectionSection: React.FC = () => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [addedItems, setAddedItems] = useState<Record<string, boolean>>({});
  const [cardImageIndexes, setCardImageIndexes] = useState<Record<string, number>>({});
  const { addToCart, openCart } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();

  const scrollCarousel = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = 410;
      carouselRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const toggleWishlist = (saree: CuratedSaree, e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    toggleFavorite({
      id: saree.id,
      name: saree.name,
      material: saree.material,
      price: saree.price,
      priceNumber: saree.priceValue,
      images: saree.images,
      origin: saree.origin,
      badges: [saree.badge as BadgeType],
      slug: saree.id,
    });
  };

  const handlePrevImage = (id: string, totalImages: number, e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setCardImageIndexes((prev) => {
      const current = prev[id] || 0;
      const next = (current - 1 + totalImages) % totalImages;
      return { ...prev, [id]: next };
    });
  };

  const handleNextImage = (id: string, totalImages: number, e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setCardImageIndexes((prev) => {
      const current = prev[id] || 0;
      const next = (current + 1) % totalImages;
      return { ...prev, [id]: next };
    });
  };

  const handleAddToCart = (saree: CuratedSaree, e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    addToCart({
      id: saree.id,
      name: saree.name,
      material: saree.material,
      color: saree.badge,
      priceNumber: saree.priceValue,
      priceFormatted: saree.price,
      imageSrc: saree.images[cardImageIndexes[saree.id] || 0],
    });

    setAddedItems((prev) => ({ ...prev, [saree.id]: true }));
    setTimeout(() => {
      setAddedItems((prev) => ({ ...prev, [saree.id]: false }));
      openCart();
    }, 600);
  };

  return (
    <section
      id="exclusive-collections"
      className="w-full py-24 lg:py-32 bg-[#F5EFE7] text-[#382C26] font-satoshi relative overflow-hidden select-none"
    >
      {/* Subtle Warm Linen Texture & Ambient Light Layers */}
      <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-[radial-gradient(circle_at_70%_20%,rgba(217,199,167,0.35)_0%,transparent_70%)] pointer-events-none opacity-80" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[radial-gradient(circle_at_20%_80%,rgba(125,33,48,0.06)_0%,transparent_70%)] pointer-events-none opacity-70" />

      <div className="max-w-[1920px] mx-auto px-4 sm:px-10 lg:px-16 relative z-10">
        {/* SECTION HEADER BAR */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
          >
            <span className="text-[10px] sm:text-[11px] font-semibold tracking-[0.35em] uppercase text-[#7D2130] bg-[#FAF7F2]/90 px-4 py-1.5 rounded-full border border-[#D9C7A7]/60 inline-flex items-center gap-2 mb-3 shadow-2xs">
              <Sparkles className="w-3 h-3" />
              <span>CURATED HAUTE COUTURE</span>
            </span>

            <h2 className="font-hero text-3xl sm:text-5xl lg:text-6xl font-normal tracking-[0.08em] text-[#382C26] uppercase leading-tight">
              EXCLUSIVE COLLECTION
            </h2>

            <p className="font-hero text-base sm:text-xl italic text-[#7D2130] mt-2 max-w-xl font-light leading-relaxed">
              &ldquo;Selected pieces for those who appreciate the extraordinary.&rdquo;
            </p>
          </motion.div>

          {/* Carousel Nav Controls */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <button
              type="button"
              onClick={() => scrollCarousel('left')}
              className="w-12 h-12 rounded-full border border-[#D9C7A7]/80 bg-[#FAF7F2] text-[#382C26] hover:bg-[#7D2130] hover:text-[#FAF7F2] hover:border-[#7D2130] transition-all duration-300 flex items-center justify-center shadow-xs cursor-pointer focus:outline-none"
              aria-label="Previous Saree"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => scrollCarousel('right')}
              className="w-12 h-12 rounded-full border border-[#D9C7A7]/80 bg-[#FAF7F2] text-[#382C26] hover:bg-[#7D2130] hover:text-[#FAF7F2] hover:border-[#7D2130] transition-all duration-300 flex items-center justify-center shadow-xs cursor-pointer focus:outline-none"
              aria-label="Next Saree"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* HORIZONTAL CAROUSEL */}
        <div
          ref={carouselRef}
          className="flex items-stretch gap-6 sm:gap-8 overflow-x-auto pb-10 pt-2 scroll-smooth snap-x snap-mandatory no-scrollbar"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {EXCLUSIVE_SAREES.map((saree) => {
            const isLiked = isFavorite(saree.id);
            const isAdded = !!addedItems[saree.id];
            const currentImgIndex = cardImageIndexes[saree.id] || 0;
            const activeImage = saree.images[currentImgIndex];

            const isEditorsPick = saree.badge === "EDITOR'S PICK";
            const isLimited = saree.badge === 'LIMITED';

            return (
              <motion.div
                key={saree.id}
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.55 }}
                className="group snap-start flex-none w-[280px] min-[360px]:w-[310px] sm:w-[350px] md:w-[380px] bg-[#FAF7F2] border border-[#D9C7A7]/60 rounded-[24px] p-5 luxury-glow-hover hover:-translate-y-2 transition-all duration-500 flex flex-col justify-between select-none relative shadow-sm"
              >
                {/* IMAGE CONTAINER WITH GENTLE HOVER MOVEMENT */}
                <div className="shimmer-on-hover relative w-full h-[380px] sm:h-[420px] rounded-[18px] overflow-hidden bg-[#EADFCF]/40 mb-5 group/image flex items-center justify-center p-3">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeImage}
                      initial={{ opacity: 0.85 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0.85 }}
                      transition={{ duration: 0.4 }}
                      className="relative w-full h-full"
                    >
                      <Image
                        src={activeImage}
                        alt={saree.name}
                        fill
                        sizes="(max-width: 768px) 320px, 400px"
                        className="object-contain object-center group-hover/image:scale-[1.03] transition-transform duration-700 ease-out"
                      />
                    </motion.div>
                  </AnimatePresence>

                  {/* Top Badge Label */}
                  <span
                    className={cn(
                      'absolute top-3.5 left-3.5 backdrop-blur-md text-[9px] font-semibold uppercase tracking-[0.22em] px-3 py-1 rounded-full shadow-2xs pointer-events-none z-10',
                      isEditorsPick
                        ? 'bg-[#7D2130] text-[#FAF7F2] border border-[#7D2130]'
                        : isLimited
                        ? 'bg-[#FAF7F2]/95 text-[#7D2130] border border-[#C29F62] font-bold'
                        : 'bg-[#FAF7F2]/90 text-[#7D2130] border border-[#D9C7A7]/60'
                    )}
                  >
                    {saree.badge}
                  </span>

                  {/* Wishlist Heart Icon Button */}
                  <button
                    type="button"
                    onClick={(e) => toggleWishlist(saree, e)}
                    className="absolute top-3.5 right-3.5 w-10 h-10 rounded-full bg-[#FAF7F2]/90 backdrop-blur-md border border-[#D9C7A7]/70 flex items-center justify-center text-[#382C26] hover:text-[#7D2130] hover:bg-[#FAF7F2] transition-all duration-300 shadow-2xs cursor-pointer z-20 focus:outline-none"
                    aria-label={`Add ${saree.name} to Wishlist`}
                  >
                    <Heart
                      className={cn(
                        'w-4 h-4 transition-transform duration-300',
                        isLiked ? 'fill-[#7D2130] text-[#7D2130] scale-110' : 'text-[#382C26]'
                      )}
                    />
                  </button>

                  {/* CARD HOVER IMAGE ARROWS */}
                  {saree.images.length > 1 && (
                    <>
                      {/* Prev arrow: always visible on mobile, hover-only on sm+ */}
                      <button
                        type="button"
                        onClick={(e) => handlePrevImage(saree.id, saree.images.length, e)}
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#FAF7F2]/90 backdrop-blur-md border border-[#D9C7A7]/60 text-[#382C26] hover:bg-[#7D2130] hover:text-[#FAF7F2] hover:border-[#7D2130] opacity-60 sm:opacity-0 sm:group-hover/image:opacity-100 transition-all duration-300 flex items-center justify-center shadow-md cursor-pointer z-20 focus:outline-none"
                        aria-label="Previous Saree Image"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>

                      {/* Next arrow: always visible on mobile, hover-only on sm+ */}
                      <button
                        type="button"
                        onClick={(e) => handleNextImage(saree.id, saree.images.length, e)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#FAF7F2]/90 backdrop-blur-md border border-[#D9C7A7]/60 text-[#382C26] hover:bg-[#7D2130] hover:text-[#FAF7F2] hover:border-[#7D2130] opacity-60 sm:opacity-0 sm:group-hover/image:opacity-100 transition-all duration-300 flex items-center justify-center shadow-md cursor-pointer z-20 focus:outline-none"
                        aria-label="Next Saree Image"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>

                      {/* Image Indicator Capsule: always visible on mobile */}
                      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 opacity-90 sm:opacity-0 sm:group-hover/image:opacity-100 transition-opacity duration-300 z-10 bg-[#FAF7F2]/90 backdrop-blur-md px-2.5 py-1 rounded-full border border-[#D9C7A7]/60 shadow-xs">
                        <div className="flex items-center gap-1">
                          {saree.images.map((_, idx) => (
                            <span
                              key={idx}
                              className={cn(
                                'h-1 rounded-full transition-all duration-300',
                                idx === currentImgIndex ? 'bg-[#7D2130] w-3' : 'bg-[#736357]/40 w-1'
                              )}
                            />
                          ))}
                        </div>
                        <span className="text-[9px] font-medium text-[#736357] pl-1 border-l border-[#D9C7A7]/70 tracking-wider">
                          {currentImgIndex + 1}/{saree.images.length}
                        </span>
                      </div>
                    </>
                  )}
                </div>

                {/* PRODUCT INFO */}
                <div className="flex flex-col flex-grow justify-between gap-4">
                  <div>
                    <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#A67C52] block mb-1">
                      {saree.origin}
                    </span>

                    <h3 className="font-hero text-xl font-normal text-[#382C26] group-hover:text-[#7D2130] transition-colors duration-300 line-clamp-1 leading-snug">
                      {saree.name}
                    </h3>

                    <p className="font-sans text-xs text-[#736357] mt-1 font-light line-clamp-1 leading-relaxed">
                      {saree.material}
                    </p>
                  </div>

                  <div className="pt-3.5 border-t border-[#D9C7A7]/60 flex items-center justify-between">
                    <span className="font-hero text-lg font-medium text-[#7D2130] tracking-wide">
                      {saree.price}
                    </span>

                    <div className="flex items-center gap-2.5">
                      {/* View Piece Link */}
                      <Link
                        href="/collections"
                        className="group/link inline-flex items-center gap-1 text-[11px] uppercase tracking-[0.18em] font-medium text-[#736357] hover:text-[#7D2130] transition-colors py-1.5 px-2"
                      >
                        <span>View Piece</span>
                        <ArrowRight className="w-3 h-3 transition-transform duration-300 group-link:translate-x-1" />
                      </Link>

                      {/* Add to Bag Button */}
                      <button
                        type="button"
                        onClick={(e) => handleAddToCart(saree, e)}
                        className="inline-flex items-center gap-1.5 bg-[#FAF7F2] hover:bg-[#7D2130] text-[#7D2130] hover:text-[#FAF7F2] text-[11px] font-medium uppercase tracking-[0.16em] px-3.5 py-2 rounded-xs border border-[#7D2130]/40 hover:border-[#7D2130] transition-all duration-300 cursor-pointer shadow-xs"
                      >
                        {isAdded ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-600" />
                            <span>Added</span>
                          </>
                        ) : (
                          <>
                            <ShoppingBag className="w-3 h-3" />
                            <span>Add</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* BOTTOM: "View Haute Couture Catalog" BUTTON */}
        <div className="mt-8 text-center">
          <Link href="/collections" className="inline-block focus:outline-none">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center justify-center gap-3 bg-[#FAF7F2] hover:bg-[#7D2130] text-[#7D2130] hover:text-[#FAF7F2] font-satoshi font-medium text-xs sm:text-sm tracking-[0.22em] uppercase px-10 py-4 rounded-xs border-2 border-[#7D2130] shadow-xs hover:shadow-lg transition-all duration-300 cursor-pointer"
            >
              <span>Explore Full Haute Couture Collection</span>
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </Link>
        </div>
      </div>
    </section>
  );
};

ExclusiveCollectionSection.displayName = 'ExclusiveCollectionSection';
