'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Heart, ShoppingBag, Check } from 'lucide-react';
import { useCart } from '@/features/cart/CartContext';

export interface CuratedSaree {
  id: string;
  name: string;
  material: string;
  price: string;
  priceValue: number;
  images: string[];
  origin: string;
  tag: string;
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
    tag: 'Haute Couture',
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
    tag: 'Vintage Classic',
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
    tag: 'Royal Heritage',
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
    origin: 'Atelier Signature',
    tag: 'Limited Edition',
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
    tag: 'Artisanal Pure',
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
    tag: 'Masterpiece',
  },
];

export const ExclusiveCollectionSection: React.FC = () => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [wishlist, setWishlist] = useState<Record<string, boolean>>({});
  const [addedItems, setAddedItems] = useState<Record<string, boolean>>({});
  // Per-card active image index state
  const [cardImageIndexes, setCardImageIndexes] = useState<Record<string, number>>({});
  const { addToCart } = useCart();

  const scrollCarousel = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = 390;
      carouselRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const toggleWishlist = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setWishlist((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handlePrevImage = (id: string, totalImages: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setCardImageIndexes((prev) => {
      const current = prev[id] || 0;
      const next = (current - 1 + totalImages) % totalImages;
      return { ...prev, [id]: next };
    });
  };

  const handleNextImage = (id: string, totalImages: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setCardImageIndexes((prev) => {
      const current = prev[id] || 0;
      const next = (current + 1) % totalImages;
      return { ...prev, [id]: next };
    });
  };

  const handleAddToCart = (saree: CuratedSaree, e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart({
      id: saree.id,
      name: saree.name,
      material: saree.material,
      color: saree.tag,
      priceNumber: saree.priceValue,
      priceFormatted: saree.price,
      imageSrc: saree.images[cardImageIndexes[saree.id] || 0],
    });

    setAddedItems((prev) => ({ ...prev, [saree.id]: true }));
    setTimeout(() => {
      setAddedItems((prev) => ({ ...prev, [saree.id]: false }));
    }, 2000);
  };

  return (
    <section
      id="exclusive-collections"
      className="w-full py-24 lg:py-32 bg-[#EADFCF] text-[#4A3B32] font-satoshi relative overflow-hidden transition-colors duration-500"
    >
      {/* Subtle Warm Linen Texture & Ambient Glow */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[radial-gradient(circle_at_70%_20%,rgba(217,199,167,0.45)_0%,transparent_70%)] pointer-events-none opacity-80" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[radial-gradient(circle_at_20%_80%,rgba(166,124,82,0.18)_0%,transparent_70%)] pointer-events-none opacity-60" />

      <div className="max-w-[1920px] mx-auto px-6 sm:px-10 lg:px-16 relative z-10">
        {/* SECTION HEADER BAR */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <span className="text-[11px] font-medium tracking-[0.28em] uppercase text-[#7D2130] bg-[#F5EFE7] px-4 py-1.5 rounded-full border border-[#D9C7A7] inline-block mb-3 shadow-xs">
              CURATED HAUTE COUTURE
            </span>
            <h2 className="font-hero text-3xl sm:text-4xl lg:text-5xl font-[500] tracking-[0.06em] text-[#382C26] uppercase">
              Exclusive Saree Gallery
            </h2>
            <p className="font-sans text-sm text-[#736357] mt-2 max-w-lg font-normal leading-relaxed">
              Explore six master handloom creations draped in pure silk, antique gold zari, and timeless craftsmanship.
            </p>
          </div>

          {/* Carousel Nav Controls */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => scrollCarousel('left')}
              className="w-12 h-12 rounded-full border border-[#D9C7A7] bg-[#F5EFE7] text-[#382C26] hover:bg-[#7D2130] hover:text-[#F5EFE7] hover:border-[#7D2130] transition-all duration-300 flex items-center justify-center shadow-xs cursor-pointer focus:outline-none"
              aria-label="Previous Saree"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => scrollCarousel('right')}
              className="w-12 h-12 rounded-full border border-[#D9C7A7] bg-[#F5EFE7] text-[#382C26] hover:bg-[#7D2130] hover:text-[#F5EFE7] hover:border-[#7D2130] transition-all duration-300 flex items-center justify-center shadow-xs cursor-pointer focus:outline-none"
              aria-label="Next Saree"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* HORIZONTAL CAROUSEL */}
        <div
          ref={carouselRef}
          className="flex items-stretch gap-7 sm:gap-8 overflow-x-auto pb-10 pt-2 scroll-smooth snap-x snap-mandatory scrollbar-none"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {EXCLUSIVE_SAREES.map((saree) => {
            const isLiked = !!wishlist[saree.id];
            const isAdded = !!addedItems[saree.id];
            const currentImgIndex = cardImageIndexes[saree.id] || 0;
            const activeImage = saree.images[currentImgIndex];

            return (
              <div
                key={saree.id}
                className="group snap-start flex-none w-[300px] sm:w-[350px] md:w-[380px] bg-[#F5EFE7] border border-[#D9C7A7] rounded-[22px] p-5 shadow-xs hover:-translate-y-1.5 hover:shadow-2xl transition-all duration-500 flex flex-col justify-between select-none relative"
              >
                {/* IMAGE CONTAINER WITH HOVER ARROW BUTTONS */}
                <div className="relative w-full h-[370px] sm:h-[420px] rounded-[16px] overflow-hidden bg-[#EADFCF] mb-5 group/image">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeImage}
                      initial={{ opacity: 0.8 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0.8 }}
                      transition={{ duration: 0.4 }}
                      className="relative w-full h-full"
                    >
                      <Image
                        src={activeImage}
                        alt={saree.name}
                        fill
                        sizes="(max-width: 768px) 320px, 400px"
                        className="object-cover object-center group-hover/image:scale-[1.02] transition-transform duration-500 ease-out"
                      />
                    </motion.div>
                  </AnimatePresence>

                  {/* Top Tag Badge */}
                  <span className="absolute top-3.5 left-3.5 bg-[#F5EFE7]/90 backdrop-blur-md text-[#7D2130] text-[10px] font-medium uppercase tracking-widest px-3 py-1 rounded-full border border-[#D9C7A7] shadow-xs pointer-events-none z-10">
                    {saree.tag}
                  </span>

                  {/* Wishlist Heart Icon Button */}
                  <button
                    type="button"
                    onClick={(e) => toggleWishlist(saree.id, e)}
                    className="absolute top-3.5 right-3.5 w-10 h-10 rounded-full bg-[#F5EFE7]/85 backdrop-blur-md border border-[#D9C7A7] flex items-center justify-center text-[#382C26] hover:text-[#7D2130] hover:bg-[#F5EFE7] transition-all duration-300 shadow-xs cursor-pointer z-20"
                    aria-label={`Add ${saree.name} to Wishlist`}
                  >
                    <Heart
                      className={`w-4 h-4 transition-colors duration-300 ${
                        isLiked ? 'fill-[#7D2130] text-[#7D2130]' : 'text-[#382C26]'
                      }`}
                    />
                  </button>

                  {/* CARD HOVER IMAGE ARROWS (Appears ONLY on hover over image) */}
                  {saree.images.length > 1 && (
                    <>
                      <button
                        type="button"
                        onClick={(e) => handlePrevImage(saree.id, saree.images.length, e)}
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-[#F5EFE7]/75 backdrop-blur-md border border-[#D9C7A7] text-[#7D2130] hover:bg-[#7D2130] hover:text-[#F5EFE7] opacity-0 group-hover/image:opacity-100 transition-all duration-300 flex items-center justify-center shadow-md cursor-pointer z-20"
                        aria-label="Previous Saree Image"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>

                      <button
                        type="button"
                        onClick={(e) => handleNextImage(saree.id, saree.images.length, e)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-[#F5EFE7]/75 backdrop-blur-md border border-[#D9C7A7] text-[#7D2130] hover:bg-[#7D2130] hover:text-[#F5EFE7] opacity-0 group-hover/image:opacity-100 transition-all duration-300 flex items-center justify-center shadow-md cursor-pointer z-20"
                        aria-label="Next Saree Image"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>

                      {/* Image Indicator Dots */}
                      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 opacity-0 group-hover/image:opacity-100 transition-opacity duration-300 z-10 bg-[#382C26]/40 backdrop-blur-md px-2.5 py-1 rounded-full">
                        {saree.images.map((_, idx) => (
                          <span
                            key={idx}
                            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                              idx === currentImgIndex ? 'bg-[#F5EFE7] w-3' : 'bg-[#F5EFE7]/50'
                            }`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>

                {/* PRODUCT INFO */}
                <div className="flex flex-col flex-grow justify-between">
                  <div>
                    <span className="text-[11px] font-medium uppercase tracking-wider text-[#A67C52] block mb-1">
                      {saree.origin}
                    </span>
                    <h3 className="font-section text-xl font-medium text-[#382C26] group-hover:text-[#7D2130] transition-colors duration-300 line-clamp-1">
                      {saree.name}
                    </h3>
                    <p className="font-sans text-xs text-[#736357] mt-1 font-light line-clamp-1">
                      {saree.material}
                    </p>
                  </div>

                  <div className="mt-5 pt-4 border-t border-[#D9C7A7]/70 flex items-center justify-between">
                    <span className="font-hero text-lg font-medium text-[#7D2130] tracking-wide">
                      {saree.price}
                    </span>

                    <button
                      type="button"
                      onClick={(e) => handleAddToCart(saree, e)}
                      className="inline-flex items-center gap-2 bg-[#EADFCF] hover:bg-[#7D2130] hover:text-[#F5EFE7] text-[#382C26] text-xs font-medium uppercase tracking-wider px-4 py-2.5 rounded-full border border-[#D9C7A7] transition-all duration-300 cursor-pointer shadow-xs"
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-700" />
                          <span>Added</span>
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>Add to Bag</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* BOTTOM: "View All Collections" BUTTON */}
        <div className="mt-10 text-center">
          <Link href="/collections" className="inline-block focus:outline-none">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center justify-center bg-[#F5EFE7] hover:bg-[#7D2130] text-[#7D2130] hover:text-[#F5EFE7] font-satoshi font-medium text-xs sm:text-sm tracking-[0.22em] uppercase px-10 py-4 rounded-full border-2 border-[#7D2130] shadow-xs hover:shadow-xl transition-all duration-300 ease-silk cursor-pointer"
            >
              View All Collections
            </motion.button>
          </Link>
        </div>
      </div>
    </section>
  );
};

ExclusiveCollectionSection.displayName = 'ExclusiveCollectionSection';
