'use client';

import React from 'react';
import Link from 'next/link';
import { Heart, ShoppingBag } from 'lucide-react';
import { DESKTOP_LEFT_LINKS } from './navbar.constants';
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
    /* hidden on mobile, grid on md+ so it never fights with MobileNav */
    <div className="hidden md:grid grid-cols-[1fr_auto_1fr] items-center w-full h-[80px] lg:h-[88px] xl:h-[96px] px-6 lg:px-10 xl:px-16 max-w-[1920px] mx-auto font-satoshi">

      {/* LEFT: BRAND MONOGRAM + WORDMARK — min-w-0 allows flex-shrink */}
      <div className="flex items-center justify-start z-10 min-w-0">
        <Link
          href="/"
          className="flex items-center gap-2 md:gap-2.5 lg:gap-3.5 group focus:outline-none select-none min-w-0"
          aria-label="ABHI-MOH Home"
        >
          {/* Monogram — scales across breakpoints */}
          <Image
            src="/images/abhi-moh-monogram.png"
            alt="ABHI-MOH Monogram"
            width={120}
            height={60}
            className="object-contain h-[36px] md:h-[42px] lg:h-[50px] xl:h-[56px] w-auto flex-shrink-0 transition-transform duration-300 ease-silk group-hover:scale-[1.03]"
            priority
          />
          {/* Brand name — responsive text size */}
          <span className="font-hero text-[11px] md:text-sm lg:text-base xl:text-xl font-[500] tracking-[0.18em] md:tracking-[0.2em] xl:tracking-[0.22em] uppercase text-[#7A1C28] transition-opacity duration-300 group-hover:opacity-90 whitespace-nowrap truncate">
            ABHI-MOH
          </span>
        </Link>
      </div>

      {/* CENTER: NAV LINKS — tighter gaps at md, expands at lg/xl */}
      <nav
        className="flex items-center justify-center gap-5 md:gap-6 lg:gap-9 xl:gap-12 z-10 px-2"
        aria-label="Desktop Navigation"
      >
        {DESKTOP_LEFT_LINKS.map((item) => (
          <NavLink key={item.label} href={item.href} label={item.label} />
        ))}
      </nav>

      {/* RIGHT: ACTION ICONS — min-w-0 allows flex-shrink */}
      <div className="flex items-center justify-end gap-3 md:gap-4 lg:gap-5 xl:gap-7 z-10 min-w-0">
        {/* Animated Expanding Search */}
        <SearchBar />

        {/* Favorites Icon with Badge */}
        <Link href="/favorites" aria-label="Favorites">
          <IconButton
            ariaLabel="Favorites"
            showBadge={totalFavoriteCount > 0}
            badgeCount={totalFavoriteCount}
          >
            <Heart className="w-[18px] h-[18px] lg:w-[20px] lg:h-[20px] text-primary-text" />
          </IconButton>
        </Link>

        {/* Shopping Bag Icon with Dynamic Cart Badge Count */}
        <IconButton
          ariaLabel="Shopping Bag"
          showBadge={totalItemCount > 0}
          badgeCount={totalItemCount}
          onClick={toggleCart}
        >
          <ShoppingBag className="w-[18px] h-[18px] lg:w-[20px] lg:h-[20px] text-primary-text" />
        </IconButton>

        {/* User Account Icon Dropdown */}
        <AccountDropdown />
      </div>
    </div>
  );
};

DesktopNav.displayName = 'DesktopNav';
