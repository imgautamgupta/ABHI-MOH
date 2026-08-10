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
import { useFavorites } from '@/features/favorites/FavoritesContext';

import Image from 'next/image';

export const DesktopNav: React.FC = () => {
  const { toggleCart, totalItemCount } = useCart();
  const { totalFavoriteCount } = useFavorites();

  return (
    <div className="grid grid-cols-[1fr_auto_1fr] items-center w-full h-[88px] lg:h-[96px] px-8 lg:px-16 max-w-[1920px] mx-auto font-satoshi">
      {/* LEFT: BRAND MONOGRAM PNG + HTML HIGH-CONTRAST SERIF WORDMARK */}
      <div className="flex items-center justify-start z-10 max-w-[280px]">
        <Link
          href="/"
          className="flex items-center gap-3.5 group focus:outline-none select-none"
          aria-label="ABHI-MOH Home"
        >
          {/* Official AM Monogram Asset (Dominant, 52-58px height) */}
          <Image
            src="/images/abhi-moh-monogram.png"
            alt="ABHI-MOH Monogram"
            width={120}
            height={60}
            className="object-contain h-[52px] lg:h-[58px] w-auto transition-transform duration-300 ease-silk group-hover:scale-[1.03]"
            priority
          />
          {/* Refined HTML Bodoni Moda Serif Brand Name */}
          <span
            className="font-hero text-xl lg:text-2xl font-[500] tracking-[0.22em] uppercase text-[#7A1C28] transition-opacity duration-300 group-hover:opacity-90 whitespace-nowrap"
          >
            ABHI-MOH
          </span>
        </Link>
      </div>

      {/* CENTER: NAVIGATION LINKS (COLLECTIONS, LOOKBOOK, OUR STORY) */}
      <nav className="flex items-center justify-center gap-8 lg:gap-12 z-10" aria-label="Desktop Navigation">
        {DESKTOP_LEFT_LINKS.map((item) => (
          <NavLink key={item.label} href={item.href} label={item.label} />
        ))}
      </nav>

      {/* RIGHT: ACTION ICONS (SEARCH, FAVORITES, BAG, ACCOUNT) */}
      <div className="flex items-center justify-end gap-5 lg:gap-7 z-10">
        {/* Animated Expanding Search */}
        <SearchBar />

        {/* Favorites Icon with Badge */}
        <Link href="/favorites" aria-label="Favorites">
          <IconButton
            ariaLabel="Favorites"
            showBadge={totalFavoriteCount > 0}
            badgeCount={totalFavoriteCount}
          >
            <Heart className="w-[20px] h-[20px] text-primary-text" />
          </IconButton>
        </Link>

        {/* Shopping Bag Icon with Dynamic Cart Badge Count */}
        <IconButton
          ariaLabel="Shopping Bag"
          showBadge={totalItemCount > 0}
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
