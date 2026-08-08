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

const DEFAULT_USER: UserProfile = {
  name: 'Princess Gayatri Devi',
  email: 'gayatri@abhi-moh.com',
  avatarMonogram: 'AM',
};

export const ProfileDropdown: React.FC<ProfileDropdownProps> = ({
  user = DEFAULT_USER,
  onLogout,
  onClose,
  className,
}) => {
  const menuItems = [
    { label: 'Orders', href: '/account/orders', icon: Package, badge: 2 },
    { label: 'Wishlist', href: '/account/wishlist', icon: Heart, badge: 5 },
    { label: 'Addresses', href: '/account/addresses', icon: MapPin },
    { label: 'Profile', href: '/account/profile', icon: User },
  ];

  return (
    <div className={cn('flex flex-col font-satoshi text-xs text-left w-full', className)}>
      {/* Client Header Info */}
      <div className="flex items-center gap-4 pb-5 border-b border-white/[0.08]">
        {/* Monogram Avatar Badge */}
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#5E0006] to-[#2D0003] border border-warm-cream/30 flex items-center justify-center text-warm-cream font-hero text-sm font-medium tracking-widest shadow-md flex-shrink-0">
          {user.avatarMonogram}
        </div>

        <div className="flex flex-col overflow-hidden">
          <span className="font-hero text-base font-[500] text-[#EED9B9] truncate">
            {user.name}
          </span>
          <span className="font-sans text-[11px] font-light text-secondary-text truncate">
            {user.email}
          </span>
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
              {item.badge !== undefined && (
                <span className="px-2 py-0.5 rounded-full bg-[#5E0006]/60 text-warm-cream text-[10px]">
                  {item.badge}
                </span>
              )}
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
