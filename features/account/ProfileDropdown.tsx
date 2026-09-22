'use client';

import React from 'react';
import Link from 'next/link';
import { Package, Heart, MapPin, User, LogOut, Sparkles } from 'lucide-react';
import { UserProfile } from './account.types';
import { useAuth } from './AuthContext';
import { cn } from '@/lib/utils';

export interface ProfileDropdownProps {
  user?: UserProfile | null;
  onLogout?: () => void;
  onClose?: () => void;
  className?: string;
}

const GUEST_USER: UserProfile = {
  id: '',
  name: 'Guest Client',
  email: '',
  avatarMonogram: 'GC',
};

export const ProfileDropdown: React.FC<ProfileDropdownProps> = ({
  user: userProp,
  onLogout: onLogoutProp,
  onClose,
  className,
}) => {
  const { user: authUser, logout: authLogout } = useAuth();
  const activeUser = userProp ?? authUser ?? GUEST_USER;

  const handleLogout = async () => {
    if (onLogoutProp) {
      onLogoutProp();
    } else {
      await authLogout();
    }
    if (onClose) onClose();
  };

  const menuItems = [
    { label: 'My Profile', href: '/account?tab=profile', icon: User },
    { label: 'My Orders', href: '/account?tab=orders', icon: Package },
    { label: 'Membership & Rewards', href: '/account?tab=membership', icon: Sparkles },
    { label: 'Wishlist', href: '/account?tab=wishlist', icon: Heart },
    { label: 'Saved Addresses', href: '/account?tab=addresses', icon: MapPin },
  ];

  return (
    <div className={cn('flex flex-col font-satoshi text-xs text-left w-full', className)}>
      {/* Client Header Info */}
      <div className="flex items-center gap-3.5 pb-4 border-b border-[#E8DFD5]">
        {/* Monogram Avatar Badge */}
        <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#7A1C28] to-[#450A10] border border-[#C89D5C]/40 flex items-center justify-center text-[#FAF7F2] font-hero text-sm font-semibold tracking-wider shadow-sm shrink-0">
          {activeUser.avatarMonogram || 'AM'}
        </div>

        <div className="flex flex-col overflow-hidden">
          <div className="flex items-center gap-1.5">
            <span className="font-hero text-sm font-medium text-[#2A221E] truncate">
              {activeUser.name}
            </span>
            <Sparkles className="w-3 h-3 text-[#C89D5C] shrink-0" />
          </div>
          {activeUser.email && (
            <span className="font-sans text-[11px] font-normal text-[#6E645A] truncate">
              {activeUser.email}
            </span>
          )}
          <span className="text-[9px] uppercase tracking-widest text-[#7A1C28] font-semibold mt-0.5">
            Verified Member
          </span>
        </div>
      </div>

      {/* Account Menu Items */}
      <div className="flex flex-col py-2.5 divide-y divide-[#E8DFD5]/40">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.label}
              href={item.href}
              onClick={onClose}
              className="flex items-center justify-between px-2.5 py-2.5 rounded-lg hover:bg-[#F3ECE3] text-[#2A221E] hover:text-[#7A1C28] transition-colors duration-200 uppercase tracking-wider text-[11px] font-medium group"
            >
              <span className="flex items-center gap-2.5">
                <Icon className="w-3.5 h-3.5 text-[#6E645A] group-hover:text-[#7A1C28] transition-colors" />
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>

      {/* Logout Action */}
      <div className="pt-2.5 border-t border-[#E8DFD5]">
        <button
          type="button"
          onClick={handleLogout}
          className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg hover:bg-[#7A1C28]/10 text-[#7A1C28] hover:text-[#5E0006] transition-colors duration-200 uppercase tracking-widest text-[10px] font-semibold cursor-pointer"
        >
          <LogOut className="w-3.5 h-3.5" />
          Sign Out
        </button>
      </div>
    </div>
  );
};

ProfileDropdown.displayName = 'ProfileDropdown';
