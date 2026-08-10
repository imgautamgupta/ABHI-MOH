'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ShoppingBag, Search, Heart, User } from 'lucide-react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { IconButton } from './IconButton';
import {
  MOBILE_DRAWER_LINKS,
  MOBILE_SOCIAL_LINKS,
} from './navbar.constants';
import { DRAWER_OVERLAY_VARIANTS, DRAWER_PANEL_VARIANTS } from './navbar.animations';

import { useCart } from '@/features/cart/CartContext';
import { useFavorites } from '@/features/favorites/FavoritesContext';

import Image from 'next/image';

// Stagger variants for drawer nav items
const DRAWER_ITEM_CONTAINER_VARIANTS: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
  exit: {},
};

const DRAWER_ITEM_VARIANTS: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } },
  exit:   { opacity: 0, y: -8,  transition: { duration: 0.2 } },
};

export const MobileNav: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const { toggleCart, totalItemCount } = useCart();
  const { totalFavoriteCount } = useFavorites();

  // Prevent background scroll when drawer is open
  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isDrawerOpen]);

  return (
    /*
     * 3-column grid layout:
     *   col 1 (auto): hamburger button — always LEFT
     *   col 2 (1fr):  brand centered in its column — appears CENTERED in viewport
     *   col 3 (auto): action icons — always RIGHT
     *
     * Hidden at md+ (DesktopNav takes over at md)
     */
    <div className="md:hidden grid grid-cols-[auto_1fr_auto] items-center w-full h-[64px] sm:h-[68px] px-3 sm:px-5 font-satoshi relative z-40">

      {/* ══ LEFT COLUMN: Hamburger ══ */}
      <div className="flex items-center justify-start">
        <IconButton
          ariaLabel="Open Menu"
          onClick={() => setIsDrawerOpen(true)}
        >
          <Menu className="w-[22px] h-[22px] text-primary-text" />
        </IconButton>
      </div>

      {/* ══ CENTER COLUMN: ABHI-MOH Brand (truly centered in 1fr) ══ */}
      <div className="flex items-center justify-center min-w-0">
        <Link
          href="/"
          className="flex items-center gap-2 focus:outline-none select-none"
          aria-label="ABHI-MOH Home"
        >
          {/* Monogram — smaller on tiny screens, larger on sm+ */}
          <Image
            src="/images/abhi-moh-monogram.png"
            alt="ABHI-MOH Monogram"
            width={90}
            height={45}
            className="object-contain h-[30px] min-[380px]:h-[34px] sm:h-[38px] w-auto flex-shrink-0"
            priority
          />
          {/* Brand name — compact on tiny screens */}
          <span className="font-hero text-[10px] min-[380px]:text-[11px] sm:text-sm font-[500] tracking-[0.15em] sm:tracking-[0.2em] uppercase text-[#7A1C28] whitespace-nowrap">
            ABHI-MOH
          </span>
        </Link>
      </div>

      {/* ══ RIGHT COLUMN: Action Icons ══ */}
      <div className="flex items-center justify-end gap-0">

        {/* Search — only on 380px+ to avoid tiny-screen overflow */}
        <div className="hidden min-[380px]:flex">
          <IconButton
            ariaLabel="Search"
            onClick={() => { setIsSearchActive(true); setIsDrawerOpen(true); }}
          >
            <Search className="w-[18px] h-[18px] text-primary-text" />
          </IconButton>
        </div>

        {/* Favorites — only on 380px+ */}
        <div className="hidden min-[380px]:flex">
          <Link href="/favorites" aria-label="Favorites">
            <IconButton
              ariaLabel="Favorites"
              showBadge={totalFavoriteCount > 0}
              badgeCount={totalFavoriteCount}
            >
              <Heart className="w-[18px] h-[18px] text-primary-text" />
            </IconButton>
          </Link>
        </div>

        {/* Cart — always visible */}
        <IconButton
          ariaLabel="Shopping Bag"
          showBadge={totalItemCount > 0}
          badgeCount={totalItemCount}
          onClick={toggleCart}
        >
          <ShoppingBag className="w-[18px] h-[18px] text-primary-text" />
        </IconButton>

        {/* Account — only on 380px+ */}
        <div className="hidden min-[380px]:flex">
          <Link href="/account" aria-label="Account">
            <IconButton ariaLabel="Account">
              <User className="w-[18px] h-[18px] text-primary-text" />
            </IconButton>
          </Link>
        </div>
      </div>

      {/* ══ FULL-SCREEN NAVIGATION DRAWER ══ */}
      <AnimatePresence>
        {isDrawerOpen && (
          <div className="fixed inset-0 z-50 flex">
            {/* Backdrop Overlay */}
            <motion.div
              variants={DRAWER_OVERLAY_VARIANTS}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={() => { setIsDrawerOpen(false); setIsSearchActive(false); }}
              className="fixed inset-0 bg-background-primary/80 backdrop-blur-md"
            />

            {/* Slide-in Drawer Panel */}
            <motion.div
              variants={DRAWER_PANEL_VARIANTS}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="relative w-full max-w-sm h-full bg-[#FAF7F2] border-r border-[#E8DFD5] p-6 sm:p-8 flex flex-col justify-between z-10 font-satoshi shadow-xl overflow-y-auto text-[#2A221E]"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-5 border-b border-[#E8DFD5]">
                <Link
                  href="/"
                  onClick={() => { setIsDrawerOpen(false); setIsSearchActive(false); }}
                  className="flex items-center gap-2.5"
                  aria-label="ABHI-MOH Home"
                >
                  <Image
                    src="/images/abhi-moh-monogram.png"
                    alt="ABHI-MOH Monogram"
                    width={80}
                    height={40}
                    className="object-contain h-[36px] w-auto"
                  />
                  <span className="font-hero text-base font-medium tracking-[0.2em] uppercase text-[#7A1C28]">
                    ABHI-MOH
                  </span>
                </Link>
                <IconButton
                  ariaLabel="Close Menu"
                  onClick={() => { setIsDrawerOpen(false); setIsSearchActive(false); }}
                >
                  <X className="w-5 h-5 text-[#2A221E]" />
                </IconButton>
              </div>

              {/* Search Field — shown when search icon tapped */}
              <AnimatePresence>
                {isSearchActive && (
                  <motion.div
                    key="search-field"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="pt-4">
                      <input
                        type="text"
                        placeholder="Search Sarees..."
                        className="w-full bg-[#FFFDFC] text-[#2A221E] border border-[#E8DFD5] px-4 py-3 text-xs tracking-wider uppercase rounded-lg outline-none focus:border-[#7A1C28] transition-colors duration-200"
                        autoFocus
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Navigation Items with stagger animation */}
              <motion.nav
                variants={DRAWER_ITEM_CONTAINER_VARIANTS}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="flex flex-col gap-0 py-6 flex-1"
                aria-label="Mobile Navigation"
              >
                {MOBILE_DRAWER_LINKS.map((item, index) => (
                  <motion.div key={item.label} variants={DRAWER_ITEM_VARIANTS}>
                    {item.label === 'Search' ? (
                      /* Search item — toggle search field */
                      <button
                        type="button"
                        onClick={() => setIsSearchActive((prev) => !prev)}
                        className="flex items-center gap-3 w-full py-4 border-b border-[#E8DFD5]/60 text-base font-light uppercase tracking-[0.18em] text-[#2A221E] hover:text-[#7A1C28] transition-colors duration-200 text-left"
                      >
                        <span className="text-[10px] font-medium text-[#C9A96E] tracking-widest w-5 text-right">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <Search className="w-4 h-4 text-[#7A1C28]" />
                        Search
                      </button>
                    ) : (
                      <Link
                        href={item.href}
                        onClick={() => { setIsDrawerOpen(false); setIsSearchActive(false); }}
                        className="flex items-center gap-3 w-full py-4 border-b border-[#E8DFD5]/60 text-base font-light uppercase tracking-[0.18em] text-[#2A221E] hover:text-[#7A1C28] transition-colors duration-300"
                      >
                        <span className="text-[10px] font-medium text-[#C9A96E] tracking-widest w-5 text-right">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        {item.label === 'Favorites' && <Heart className="w-4 h-4 text-[#7A1C28]" />}
                        {item.label === 'Account'   && <User className="w-4 h-4 text-[#7A1C28]" />}
                        {item.label}
                      </Link>
                    )}
                  </motion.div>
                ))}
              </motion.nav>

              {/* Bottom: Socials & Concierge */}
              <div className="pt-5 border-t border-[#E8DFD5] flex flex-col gap-4">
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#6E645A]/80 font-light">
                  Maison Concierge
                </span>
                <div className="flex items-center gap-6">
                  {MOBILE_SOCIAL_LINKS.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs uppercase tracking-widest text-[#6E645A] hover:text-[#7A1C28] transition-colors duration-300"
                    >
                      {social.label}
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

MobileNav.displayName = 'MobileNav';
