'use client';

import React from 'react';
import Link from 'next/link';
import { Package, Heart, MapPin, User, LogOut } from 'lucide-react';
import { UserProfile } from './account.types';
import { cn } from '@/lib/utils';

export interface ProfileDropdownProps {
  user?: UserProfile;
  onLogout?: () => void;
  onClose?: () => void;
  className?: string;
}

const GUEST_USER: UserProfile = {
  name: 'Guest',
  email: '',
  avatarMonogram: 'G',
};

export const ProfileDropdown: React.FC<ProfileDropdownProps> = ({
  user,
  onLogout,
  onClose,
  className,
}) => {
  const activeUser = user ?? GUEST_USER;
  const menuItems = [
    { label: 'Orders', href: '/account/orders', icon: Package },
    { label: 'Wishlist', href: '/account/wishlist', icon: Heart },
    { label: 'Addresses', href: '/account/addresses', icon: MapPin },
    { label: 'Profile', href: '/account/profile', icon: User },
  ];

  return (
    <div className={cn('flex flex-col font-satoshi text-xs text-left w-full', className)}>
      {/* Client Header Info */}
      <div className="flex items-center gap-4 pb-5 border-b border-white/[0.08]">
        {/* Monogram Avatar Badge */}
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#5E0006] to-[#2D0003] border border-warm-cream/30 flex items-center justify-center text-warm-cream font-hero text-sm font-medium tracking-widest shadow-md flex-shrink-0">
          {activeUser.avatarMonogram}
        </div>

        <div className="flex flex-col overflow-hidden">
          <span className="font-hero text-base font-[500] text-[#EED9B9] truncate">
            {activeUser.name}
          </span>
          {activeUser.email && (
            <span className="font-sans text-[11px] font-light text-secondary-text truncate">
              {activeUser.email}
            </span>
          )}
        </div>
      </div>

      {/* Account Menu Items */}
      <div className="flex flex-col py-3 divide-y divide-white/[0.04]">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.label}
              href={item.href}
              onClick={onClose}
              className="flex items-center justify-between px-3 py-3 rounded-sm hover:bg-white/5 text-primary-text/80 hover:text-warm-cream transition-colors duration-200 uppercase tracking-widest text-[11px] font-medium"
            >
              <span className="flex items-center gap-3">
                <Icon className="w-4 h-4 text-secondary-text" />
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>

      {/* Logout Action */}
      <div className="pt-3 border-t border-white/[0.08]">
        <button
          type="button"
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-3 py-3 rounded-sm hover:bg-[#5E0006]/20 text-[#9B0F06] hover:text-rose-400 transition-colors duration-200 uppercase tracking-widest text-[11px] font-medium cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>
    </div>
  );
};

ProfileDropdown.displayName = 'ProfileDropdown';
