'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ACTIVE_LINE_VARIANTS } from './navbar.animations';

export interface NavLinkProps {
  href: string;
  label: string;
  className?: string;
  onClick?: () => void;
}

export const NavLink: React.FC<NavLinkProps> = ({ href, label, className, onClick }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      prefetch={true}
      onClick={onClick}
      className={cn(
        'group relative inline-flex flex-col items-center py-1 font-satoshi text-xs font-medium uppercase tracking-[0.22em] text-[#2A221E]/90 hover:text-[#7A1C28] transition-all duration-300 ease-silk select-none cursor-pointer',
        className
      )}
    >
      {/* Upward Movement (1px) on Hover */}
      <span className="transition-transform duration-300 ease-silk group-hover:-translate-y-[1px]">
        {label}
      </span>

      {/* Underline Indicator */}
      <div className="relative w-full h-[1.5px] mt-1 overflow-hidden">
        {/* Active Page Indicator: 1.5px soft maroon line animates from center outward */}
        {isActive ? (
          <motion.span
            variants={ACTIVE_LINE_VARIANTS}
            initial="hidden"
            animate="visible"
            className="absolute inset-0 bg-[#7A1C28] origin-center"
          />
        ) : (
          /* Hover Underline Animation (center outward) */
          <span className="absolute inset-0 bg-[#7A1C28]/80 origin-center scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-silk" />
        )}
      </div>
    </Link>
  );
};

NavLink.displayName = 'NavLink';
