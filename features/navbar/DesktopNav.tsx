'use client';

import React from 'react';
import Link from 'next/link';
import { Heart, ShoppingBag } from 'lucide-react';
import { DESKTOP_LEFT_LINKS, BRAND_MAROON } from './navbar.constants';
import { NavLink } from './NavLink';
import { IconButton } from './IconButton';
import { SearchBar } from './SearchBar';
import { AccountDropdown } from './AccountDropdown';

import { useCart } from '@/features/cart/CartContext';

export const DesktopNav: React.FC = () => {
  const { toggleCart, totalItemCount } = useCart();

  return (
    <div className="relative hidden md:flex items-center justify-between w-full h-[80px] lg:h-[88px] px-8 lg:px-16 max-w-[1920px] mx-auto font-satoshi">
      {/* LEFT: Collections, Lookbook, Our Story */}
      <nav className="flex items-center gap-8 lg:gap-12 z-10" aria-label="Desktop Navigation">
        {DESKTOP_LEFT_LINKS.map((item) => (
          <NavLink key={item.label} href={item.href} label={item.label} />
        ))}
      </nav>

      {/* CENTER: ABHI-MOH Wordmark (Absolute Center Anchor) */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-auto text-center">
        <Link
          href="/"
          className="group inline-block focus:outline-none"
          aria-label="ABHI-MOH Home"
        >
          <span
            className="font-hero text-2xl lg:text-3xl font-[500] tracking-[0.22em] uppercase transition-opacity duration-300 group-hover:opacity-90 block"
            style={{ color: BRAND_MAROON }}
          >
            ABHI-MOH
          </span>
        </Link>
      </div>

      {/* RIGHT: Search, Favorites, Shopping Bag, User Account */}
      <div className="flex items-center gap-5 lg:gap-7 z-10">
        {/* Animated Expanding Search */}
        <SearchBar />

        {/* Favorites Icon */}
        <IconButton ariaLabel="Favorites">
          <Heart className="w-[20px] h-[20px] text-primary-text" />
        </IconButton>

        {/* Shopping Bag Icon with Dynamic Cart Badge Count */}
        <IconButton
          ariaLabel="Shopping Bag"
          showBadge
          badgeCount={totalItemCount}
          onClick={toggleCart}
        >
          <ShoppingBag className="w-[20px] h-[20px] text-primary-text" />
        </IconButton>

        {/* User Account Icon Dropdown */}
        <AccountDropdown />
      </div>
    </div>
  );
};

DesktopNav.displayName = 'DesktopNav';
