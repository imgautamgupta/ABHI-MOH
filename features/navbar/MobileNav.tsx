'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ShoppingBag, Search, Heart, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { IconButton } from './IconButton';
import {
  MOBILE_DRAWER_LINKS,
  MOBILE_SOCIAL_LINKS,
  BRAND_MAROON,
} from './navbar.constants';
import { DRAWER_OVERLAY_VARIANTS, DRAWER_PANEL_VARIANTS } from './navbar.animations';

import { useCart } from '@/features/cart/CartContext';

export const MobileNav: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const { toggleCart, totalItemCount } = useCart();

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
    <div className="flex md:hidden items-center justify-between w-full h-[72px] px-5 font-satoshi relative z-40">
      {/* LEFT: Hamburger Menu Trigger */}
      <IconButton
        ariaLabel="Open Menu"
        onClick={() => setIsDrawerOpen(true)}
      >
        <Menu className="w-[22px] h-[22px] text-primary-text" />
      </IconButton>

      {/* CENTER: ABHI-MOH Wordmark */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <Link href="/" className="focus:outline-none" aria-label="ABHI-MOH Home">
          <span
            className="font-hero text-xl font-[500] tracking-[0.2em] uppercase block"
            style={{ color: BRAND_MAROON }}
          >
            ABHI-MOH
          </span>
        </Link>
      </div>

      {/* RIGHT: User Icon & Shopping Bag */}
      <div className="flex items-center gap-2">
        <Link href="/account/signin" aria-label="User Account">
          <IconButton ariaLabel="User Account">
            <User className="w-[20px] h-[20px] text-primary-text" />
          </IconButton>
        </Link>
        <IconButton
          ariaLabel="Shopping Bag"
          showBadge
          badgeCount={totalItemCount}
          onClick={toggleCart}
        >
          <ShoppingBag className="w-[20px] h-[20px] text-primary-text" />
        </IconButton>
      </div>

      {/* FULL-SCREEN NAVIGATION DRAWER */}
      <AnimatePresence>
        {isDrawerOpen && (
          <div className="fixed inset-0 z-50 flex">
            {/* Backdrop Overlay */}
            <motion.div
              variants={DRAWER_OVERLAY_VARIANTS}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={() => setIsDrawerOpen(false)}
              className="fixed inset-0 bg-background-primary/80 backdrop-blur-md"
            />

            {/* Slide-in Drawer Panel */}
            <motion.div
              variants={DRAWER_PANEL_VARIANTS}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="relative w-full max-w-md h-full bg-[#FAF7F2] border-r border-[#E8DFD5] p-8 flex flex-col justify-between z-10 font-satoshi shadow-xl overflow-y-auto text-[#2A221E]"
            >
              {/* Header inside drawer */}
              <div className="flex items-center justify-between pb-6 border-b border-[#E8DFD5]">
                <span
                  className="font-hero text-lg font-medium tracking-[0.2em] uppercase"
                  style={{ color: BRAND_MAROON }}
                >
                  ABHI-MOH
                </span>
                <IconButton
                  ariaLabel="Close Menu"
                  onClick={() => setIsDrawerOpen(false)}
                >
                  <X className="w-6 h-6 text-[#2A221E]" />
                </IconButton>
              </div>

              {/* Navigation Items (Large Typography) */}
              <nav className="flex flex-col gap-6 py-8" aria-label="Mobile Navigation">
                {MOBILE_DRAWER_LINKS.map((item) => {
                  if (item.label === 'Search') {
                    return (
                      <div key={item.label} className="flex flex-col gap-2 pt-2">
                        <button
                          type="button"
                          onClick={() => setIsSearchActive((prev) => !prev)}
                          className="flex items-center justify-between text-xl font-light uppercase tracking-widest text-[#2A221E] hover:text-[#7A1C28] text-left transition-colors duration-200"
                        >
                          <span className="flex items-center gap-3">
                            <Search className="w-5 h-5 text-[#7A1C28]" />
                            Search
                          </span>
                        </button>
                        {isSearchActive && (
                          <div className="mt-2 relative">
                            <input
                              type="text"
                              placeholder="Search Sarees..."
                              className="w-full bg-[#FFFDFC] text-[#2A221E] border border-[#E8DFD5] px-4 py-3 text-xs tracking-wider uppercase rounded-lg outline-none focus:border-[#7A1C28]"
                              autoFocus
                            />
                          </div>
                        )}
                      </div>
                    );
                  }

                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={() => setIsDrawerOpen(false)}
                      className="text-xl font-light uppercase tracking-[0.18em] text-[#2A221E] hover:text-[#7A1C28] transition-colors duration-300 flex items-center gap-3"
                    >
                      {item.label === 'Favorites' && <Heart className="w-5 h-5 text-[#7A1C28]" />}
                      {item.label}
                    </Link>
                  );
                })}
              </nav>

              {/* Bottom Socials & Concierge */}
              <div className="pt-6 border-t border-[#E8DFD5] flex flex-col gap-4">
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
