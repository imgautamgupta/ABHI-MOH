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
  visible: { transition: { staggerChildren: 0.04, delayChildren: 0.06 } },
  exit: {},
};

const DRAWER_ITEM_VARIANTS: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.25, ease: 'easeOut' } },
  exit:   { opacity: 0, y: -4,  transition: { duration: 0.15 } },
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
      document.documentElement.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      document.body.style.touchAction = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      document.body.style.touchAction = '';
    };
  }, [isDrawerOpen]);

  return (
    /*
     * 3-column grid layout on top mobile header:
     *   col 1 (auto): hamburger button — always LEFT
     *   col 2 (1fr):  brand centered in its column — appears CENTERED in viewport
     *   col 3 (auto): action icons — always RIGHT
     *
     * Hidden at md+ (DesktopNav takes over at md)
     */
    <div className="md:hidden grid grid-cols-[auto_1fr_auto] items-center w-full h-[60px] sm:h-[68px] px-3 sm:px-5 font-satoshi relative z-40">

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
            className="object-contain h-[28px] min-[380px]:h-[32px] sm:h-[38px] w-auto flex-shrink-0"
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
            onClick={() => { setIsSearchActive((prev) => !prev); }}
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

      {/* Search Input Bar (Dropdown below navbar when active) */}
      <AnimatePresence>
        {isSearchActive && (
          <motion.div
            key="search-bar-mobile"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 p-3 bg-[#FAF7F2] border-b border-[#E8DFD5] shadow-md z-30"
          >
            <input
              type="text"
              placeholder="Search Sarees..."
              className="w-full bg-[#FFFDFC] text-[#2A221E] border border-[#E8DFD5] px-4 py-2 text-xs tracking-wider uppercase rounded-lg outline-none focus:border-[#7A1C28]"
              autoFocus
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══ FULL-HEIGHT MOBILE NAVIGATION DRAWER ══ */}
      <AnimatePresence>
        {isDrawerOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden select-none">
            {/* Backdrop Overlay (Dark Blur Overlay covering full viewport) */}
            <motion.div
              variants={DRAWER_OVERLAY_VARIANTS}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={() => setIsDrawerOpen(false)}
              className="fixed inset-0 bg-[#190A0C]/45 backdrop-blur-md z-40"
            />

            {/* Slide-in Full-Height Mobile Navigation Panel (top:0, 100dvh, NO internal scrollbar) */}
            <motion.div
              variants={DRAWER_PANEL_VARIANTS}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed top-0 left-0 z-50 w-[88vw] min-[400px]:w-[350px] max-w-[90vw] h-[100dvh] bg-[#FAF7F2] border-r border-[#E8DFD5] px-5 sm:px-7 py-3 sm:py-5 flex flex-col justify-between font-satoshi shadow-2xl overflow-hidden text-[#2A221E]"
            >
              {/* Drawer Header (starts at top:0) */}
              <div className="flex items-center justify-between h-[60px] sm:h-[72px] pb-2 border-b border-[#E8DFD5] flex-shrink-0">
                <Link
                  href="/"
                  onClick={() => setIsDrawerOpen(false)}
                  className="flex items-center gap-2"
                  aria-label="ABHI-MOH Home"
                >
                  <Image
                    src="/images/abhi-moh-monogram.png"
                    alt="ABHI-MOH Monogram"
                    width={80}
                    height={40}
                    className="object-contain h-[32px] sm:h-[38px] w-auto"
                  />
                  <span className="font-hero text-base sm:text-lg font-medium tracking-[0.18em] uppercase text-[#7A1C28]">
                    ABHI-MOH
                  </span>
                </Link>
                <IconButton
                  ariaLabel="Close Menu"
                  onClick={() => setIsDrawerOpen(false)}
                >
                  <X className="w-5 h-5 text-[#2A221E]" />
                </IconButton>
              </div>

              {/* Navigation Items (01 COLLECTIONS, 02 LOOKBOOK, 03 OUR STORY, 04 FAVORITES, 05 ACCOUNT) */}
              <motion.nav
                variants={DRAWER_ITEM_CONTAINER_VARIANTS}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="flex flex-col justify-center gap-1 sm:gap-2 flex-1 my-1 overflow-hidden"
                aria-label="Mobile Navigation"
              >
                {MOBILE_DRAWER_LINKS.map((item, index) => (
                  <motion.div key={item.label} variants={DRAWER_ITEM_VARIANTS} className="w-full">
                    <Link
                      href={item.href}
                      onClick={() => setIsDrawerOpen(false)}
                      className="flex items-center gap-3 w-full py-2 sm:py-3 border-b border-[#E8DFD5]/40 text-sm sm:text-base font-light uppercase tracking-[0.16em] text-[#2A221E] hover:text-[#7A1C28] transition-colors duration-300"
                    >
                      <span className="text-[11px] font-medium text-[#C9A96E] tracking-widest w-5 text-right flex-shrink-0">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      {item.label === 'Favorites' && <Heart className="w-3.5 h-3.5 text-[#7A1C28] flex-shrink-0" />}
                      {item.label === 'Account'   && <User className="w-3.5 h-3.5 text-[#7A1C28] flex-shrink-0" />}
                      <span className="truncate">{item.label}</span>
                    </Link>
                  </motion.div>
                ))}
              </motion.nav>

              {/* Bottom Socials & Maison Concierge Footer */}
              <div className="pt-2 sm:pt-3 border-t border-[#E8DFD5] flex flex-col gap-1.5 flex-shrink-0">
                <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.22em] text-[#6E645A]/80 font-light">
                  Maison Concierge
                </span>
                <div className="flex items-center gap-4 sm:gap-6">
                  {MOBILE_SOCIAL_LINKS.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] sm:text-xs uppercase tracking-widest text-[#6E645A] hover:text-[#7A1C28] transition-colors duration-300"
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
