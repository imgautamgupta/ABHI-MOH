'use client';

import React from 'react';
import {
  User,
  Package,
  Truck,
  Heart,
  RotateCcw,
  MapPin,
  Crown,
  Sparkles,
  ShieldCheck,
  FileText,
  LogOut,
  ChevronDown,
} from 'lucide-react';
import { AccountTabKey, AccountDossier } from '@/lib/account/types';
import { cn } from '@/lib/utils';

interface AccountMobileNavProps {
  activeTab: AccountTabKey;
  onSelectTab: (tab: AccountTabKey) => void;
  dossier: AccountDossier;
  onLogout: () => void;
}

export const AccountMobileNav: React.FC<AccountMobileNavProps> = ({
  activeTab,
  onSelectTab,
  dossier,
  onLogout,
}) => {
  const tabs = [
    { key: 'profile' as AccountTabKey, label: 'Profile Dossier', icon: User },
    { key: 'orders' as AccountTabKey, label: `My Orders (${dossier.orders.length})`, icon: Package },
    { key: 'tracking' as AccountTabKey, label: 'Order Tracking', icon: Truck },
    { key: 'wishlist' as AccountTabKey, label: `Wishlist (${dossier.wishlistIds.length})`, icon: Heart },
    { key: 'returns' as AccountTabKey, label: 'Returns & Exchanges', icon: RotateCcw },
    { key: 'addresses' as AccountTabKey, label: 'Saved Addresses', icon: MapPin },
    { key: 'membership' as AccountTabKey, label: `Membership (${dossier.membership.tier})`, icon: Crown },
    { key: 'concierge' as AccountTabKey, label: 'Concierge Desk', icon: Sparkles },
    { key: 'security' as AccountTabKey, label: 'Privacy & Security', icon: ShieldCheck },
    { key: 'policies' as AccountTabKey, label: 'Policies', icon: FileText },
  ];

  return (
    <div className="w-full lg:hidden flex flex-col gap-3 font-satoshi text-[#2A221E] mb-6">
      {/* Mobile Active Tab Header Dropdown / Selector */}
      <div className="relative w-full">
        <select
          value={activeTab}
          onChange={(e) => {
            if (e.target.value === 'signout') {
              onLogout();
            } else {
              onSelectTab(e.target.value as AccountTabKey);
            }
          }}
          className="w-full px-4 py-3.5 bg-[#FFFDFC] border border-[#E8DFD5] rounded-2xl text-xs uppercase tracking-wider font-semibold text-[#2A221E] shadow-xs focus:outline-none focus:border-[#7A1C28] appearance-none cursor-pointer"
        >
          {tabs.map((t) => (
            <option key={t.key} value={t.key}>
              {t.label}
            </option>
          ))}
          <option value="signout">Sign Out</option>
        </select>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#7A1C28]">
          <ChevronDown className="w-4 h-4" />
        </div>
      </div>

      {/* Horizontal Fast Scroll Pill Tabs for Top Frequent Actions */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {[
          { key: 'profile', label: 'Profile' },
          { key: 'orders', label: `Orders (${dossier.orders.length})` },
          { key: 'tracking', label: 'Tracking' },
          { key: 'membership', label: 'Rewards' },
          { key: 'wishlist', label: 'Wishlist' },
          { key: 'returns', label: 'Returns' },
          { key: 'concierge', label: 'Concierge' },
        ].map((tab) => {
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => onSelectTab(tab.key as AccountTabKey)}
              className={cn(
                'px-3.5 py-1.5 rounded-full text-[11px] uppercase tracking-wider font-medium whitespace-nowrap transition-all duration-200 cursor-pointer',
                isActive
                  ? 'bg-[#7A1C28] text-[#FAF7F2] shadow-xs'
                  : 'bg-[#FFFDFC] text-[#6E645A] border border-[#E8DFD5] hover:text-[#2A221E]'
              )}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};
