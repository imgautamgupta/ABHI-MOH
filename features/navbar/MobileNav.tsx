'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
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
import { useSearch } from '@/features/search/SearchContext';

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
  const [mounted, setMounted] = useState(false);
  const { openSearch } = useSearch();
  const { toggleCart, totalItemCount } = useCart();
  const { totalFavoriteCount, isLoaded } = useFavorites();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Escape key & background scroll lock
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsDrawerOpen(false);
      }
    };

    if (isDrawerOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      document.body.style.touchAction = '';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      document.body.style.touchAction = '';
    };
  }, [isDrawerOpen]);

  return (
    /*
     * Mobile Header Bar (hidden at md+ where DesktopNav takes over):
     * [ ☰ ] [ AM + ABHI-MOH ] [ SEARCH | FAVORITES | CART | ACCOUNT ]
     * Uses flexible responsive grid with proportional scaling so no element overlaps or clips.
     */
    <div className="md:hidden grid grid-cols-[auto_1fr_auto] items-center w-full h-[58px] min-[360px]:h-[64px] sm:h-[68px] px-2 min-[360px]:px-3 sm:px-5 font-satoshi relative z-40">

      {/* ══ LEFT: Hamburger [ ☰ ] ══ */}
      <div className="flex items-center justify-start flex-shrink-0">
        <IconButton
          ariaLabel="Open navigation"
          onClick={() => setIsDrawerOpen(true)}
          className="w-9 h-9 min-[360px]:w-10 min-[360px]:h-10 p-1.5"
        >
          <Menu className="w-5 h-5 min-[360px]:w-[22px] min-[360px]:h-[22px] text-primary-text" />
        </IconButton>
      </div>

      {/* ══ CENTER: [ AM + ABHI-MOH ] ══ */}
      <div className="flex items-center justify-center min-w-0 px-1">
        <Link
          href="/"
          className="flex items-center gap-1.5 min-[360px]:gap-2 focus:outline-none select-none max-w-full justify-center"
          aria-label="ABHI-MOH Home"
        >
          {/* Monogram */}
          <Image
            src="/images/abhi-moh-monogram.png"
            alt="ABHI-MOH Monogram"
            width={90}
            height={45}
            className="object-contain h-[22px] min-[360px]:h-[26px] min-[400px]:h-[30px] sm:h-[36px] w-auto flex-shrink-0"
            priority
          />
          {/* Brand Wordmark */}
          <span className="font-hero text-[10px] min-[360px]:text-[11px] min-[400px]:text-xs sm:text-sm font-[500] tracking-[0.12em] min-[360px]:tracking-[0.16em] sm:tracking-[0.2em] uppercase text-[#7A1C28] whitespace-nowrap truncate">
            ABHI-MOH
          </span>
        </Link>
      </div>

      {/* ══ RIGHT: [ SEARCH | FAVORITES | CART | ACCOUNT ] ══ */}
      <div className="flex items-center justify-end gap-0.5 min-[360px]:gap-1 flex-shrink-0">
        {/* Search */}
        <IconButton
          ariaLabel="Search"
          onClick={() => openSearch()}
          className="w-8 h-8 min-[360px]:w-9 min-[360px]:h-9 p-1.5"
        >
          <Search className="w-4 h-4 min-[360px]:w-[17px] min-[360px]:h-[17px] text-primary-text" />
        </IconButton>

        {/* Favorites */}
        <Link href="/favorites" aria-label="Favorites" className="inline-flex">
          <IconButton
            ariaLabel="Favorites"
            showBadge={isLoaded && totalFavoriteCount > 0}
            badgeCount={totalFavoriteCount}
            className="w-8 h-8 min-[360px]:w-9 min-[360px]:h-9 p-1.5"
          >
            <Heart className="w-4 h-4 min-[360px]:w-[17px] min-[360px]:h-[17px] text-primary-text" />
          </IconButton>
        </Link>

        {/* Cart */}
        <IconButton
          ariaLabel="Shopping bag"
          showBadge={totalItemCount > 0}
          badgeCount={totalItemCount}
          onClick={toggleCart}
          className="w-8 h-8 min-[360px]:w-9 min-[360px]:h-9 p-1.5"
        >
          <ShoppingBag className="w-4 h-4 min-[360px]:w-[17px] min-[360px]:h-[17px] text-primary-text" />
        </IconButton>

        {/* Account */}
        <Link href="/account" aria-label="Account" className="inline-flex">
          <IconButton
            ariaLabel="Account"
            className="w-8 h-8 min-[360px]:w-9 min-[360px]:h-9 p-1.5"
          >
            <User className="w-4 h-4 min-[360px]:w-[17px] min-[360px]:h-[17px] text-primary-text" />
          </IconButton>
        </Link>
      </div>

      {/* ══ FULL-HEIGHT MOBILE NAVIGATION DRAWER (Portaled to document.body for true full-screen overlay) ══ */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {isDrawerOpen && (
              <div
                className="fixed inset-0 z-[999] select-none pointer-events-auto"
                role="dialog"
                aria-modal="true"
                aria-label="Mobile Navigation Menu"
              >
                {/* Backdrop Overlay (covers full viewport) */}
                <motion.div
                  variants={DRAWER_OVERLAY_VARIANTS}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  onClick={() => setIsDrawerOpen(false)}
                  onPointerDown={() => setIsDrawerOpen(false)}
                  className="fixed inset-0 bg-[#190A0C]/50 backdrop-blur-md z-40 cursor-pointer pointer-events-auto"
                  aria-hidden="true"
                />

                {/* Slide-in Full-Height Mobile Navigation Panel (100dvh, top-0, left-0) */}
                <motion.div
                  variants={DRAWER_PANEL_VARIANTS}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  onClick={(e) => e.stopPropagation()}
                  className="fixed top-0 left-0 z-50 w-[86vw] min-[380px]:w-[340px] max-w-[380px] h-[100dvh] bg-[#FAF7F2] border-r border-[#E8DFD5] px-5 sm:px-7 py-4 sm:py-6 flex flex-col justify-between font-satoshi shadow-2xl overflow-hidden text-[#2A221E] pointer-events-auto"
                >
                  {/* Drawer Header */}
                  <div className="flex items-center justify-between h-[56px] sm:h-[68px] pb-2 border-b border-[#E8DFD5] flex-shrink-0">
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
                        className="object-contain h-[28px] sm:h-[36px] w-auto"
                      />
                      <span className="font-hero text-sm sm:text-base font-medium tracking-[0.18em] uppercase text-[#7A1C28]">
                        ABHI-MOH
                      </span>
                    </Link>
                    <IconButton
                      ariaLabel="Close navigation"
                      onClick={() => setIsDrawerOpen(false)}
                      className="w-10 h-10 p-2"
                    >
                      <X className="w-5 h-5 text-[#2A221E]" />
                    </IconButton>
                  </div>

                  {/* Navigation Items: Collections, Lookbook, Our Story, Favorites, Account */}
                  <motion.nav
                    variants={DRAWER_ITEM_CONTAINER_VARIANTS}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="flex flex-col justify-center gap-2 sm:gap-3 flex-1 my-2 overflow-hidden"
                    aria-label="Mobile Navigation Links"
                  >
                    {MOBILE_DRAWER_LINKS.map((item, index) => (
                      <motion.div key={item.label} variants={DRAWER_ITEM_VARIANTS} className="w-full">
                        <Link
                          href={item.href}
                          onClick={() => setIsDrawerOpen(false)}
                          className="flex items-center gap-3 w-full py-2.5 sm:py-3 border-b border-[#E8DFD5]/50 text-sm sm:text-base font-light uppercase tracking-[0.16em] text-[#2A221E] hover:text-[#7A1C28] transition-colors duration-300 min-h-[44px]"
                        >
                          <span className="text-[11px] font-medium text-[#C9A96E] tracking-widest w-5 text-right flex-shrink-0">
                            {String(index + 1).padStart(2, '0')}
                          </span>
                          {item.label === 'Favorites' && <Heart className="w-4 h-4 text-[#7A1C28] flex-shrink-0" />}
                          {item.label === 'Account'   && <User className="w-4 h-4 text-[#7A1C28] flex-shrink-0" />}
                          <span className="truncate font-normal">{item.label}</span>
                        </Link>
                      </motion.div>
                    ))}
                  </motion.nav>

                  {/* Bottom Socials & Maison Concierge Footer */}
                  <div className="pt-3 sm:pt-4 border-t border-[#E8DFD5] flex flex-col gap-2 flex-shrink-0">
                    <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.22em] text-[#6E645A]/80 font-medium">
                      Maison Concierge
                    </span>
                    <div className="flex items-center gap-4 sm:gap-6">
                      {MOBILE_SOCIAL_LINKS.map((social) => (
                        <a
                          key={social.label}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[11px] sm:text-xs uppercase tracking-widest text-[#6E645A] hover:text-[#7A1C28] transition-colors duration-300 py-1"
                        >
                          {social.label}
                        </a>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </div>
  );
};

MobileNav.displayName = 'MobileNav';

