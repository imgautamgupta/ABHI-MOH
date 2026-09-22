'use client';

import React, { useState } from 'react';
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
  Sliders,
} from 'lucide-react';
import { AccountTabKey, AccountDossier } from '@/lib/account/types';
import { cn } from '@/lib/utils';

interface AccountSidebarProps {
  activeTab: AccountTabKey;
  onSelectTab: (tab: AccountTabKey) => void;
  dossier: AccountDossier;
  onLogout: () => void;
  onSelectTestScenario?: (scenario: string) => void;
}

export const AccountSidebar: React.FC<AccountSidebarProps> = ({
  activeTab,
  onSelectTab,
  dossier,
  onLogout,
  onSelectTestScenario,
}) => {
  const [showScenarioTester, setShowScenarioTester] = useState(false);

  const navItems = [
    { key: 'profile' as AccountTabKey, label: 'Profile Dossier', icon: User },
    {
      key: 'orders' as AccountTabKey,
      label: 'My Orders',
      icon: Package,
      badge: dossier.orders.length > 0 ? String(dossier.orders.length) : undefined,
    },
    { key: 'tracking' as AccountTabKey, label: 'Order Tracking', icon: Truck },
    {
      key: 'wishlist' as AccountTabKey,
      label: 'Wishlist',
      icon: Heart,
      badge: dossier.wishlistIds.length > 0 ? String(dossier.wishlistIds.length) : undefined,
    },
    { key: 'returns' as AccountTabKey, label: 'Returns & Exchanges', icon: RotateCcw },
    { key: 'addresses' as AccountTabKey, label: 'Saved Addresses', icon: MapPin },
    {
      key: 'membership' as AccountTabKey,
      label: 'Membership & Rewards',
      icon: Crown,
      badge: dossier.membership.tier !== 'REGULAR' ? dossier.membership.tier : undefined,
    },
    { key: 'concierge' as AccountTabKey, label: 'Concierge Desk', icon: Sparkles },
    { key: 'security' as AccountTabKey, label: 'Privacy & Security', icon: ShieldCheck },
    { key: 'policies' as AccountTabKey, label: 'Policies', icon: FileText },
  ];

  return (
    <aside className="w-full lg:w-72 shrink-0 flex flex-col gap-6 font-satoshi text-[#2A221E]">
      {/* Client Profile Card */}
      <div className="bg-[#FFFDFC] border border-[#E8DFD5] rounded-2xl p-5 shadow-xs flex items-center gap-3.5">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#7A1C28] to-[#450A10] border border-[#C89D5C]/50 flex items-center justify-center text-[#FAF7F2] font-hero text-base font-bold tracking-wider shadow-sm shrink-0">
          {dossier.avatarMonogram || 'AM'}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <h3 className="font-hero text-sm font-medium text-[#2A221E] truncate">
              {dossier.name}
            </h3>
            {dossier.membership.tier === 'GOLD' && (
              <Crown className="w-3.5 h-3.5 text-[#C89D5C] shrink-0" />
            )}
          </div>
          <p className="text-[11px] text-[#6E645A] truncate">{dossier.email}</p>
          <span className="text-[9px] uppercase tracking-widest text-[#7A1C28] font-semibold block mt-0.5">
            {dossier.membership.tierName}
          </span>
        </div>
      </div>

      {/* Navigation List */}
      <div className="bg-[#FFFDFC] border border-[#E8DFD5] rounded-2xl p-2.5 shadow-xs flex flex-col gap-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.key;

          return (
            <button
              key={item.key}
              type="button"
              onClick={() => onSelectTab(item.key)}
              className={cn(
                'w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs uppercase tracking-wider font-medium transition-all duration-200 cursor-pointer text-left',
                isActive
                  ? 'bg-[#7A1C28] text-[#FAF7F2] shadow-xs'
                  : 'text-[#6E645A] hover:text-[#2A221E] hover:bg-[#F3ECE3]'
              )}
            >
              <div className="flex items-center gap-3">
                <Icon
                  className={cn(
                    'w-4 h-4 shrink-0 transition-colors',
                    isActive ? 'text-[#E5C388]' : 'text-[#6E645A]'
                  )}
                />
                <span className="truncate">{item.label}</span>
              </div>

              {item.badge && (
                <span
                  className={cn(
                    'px-2 py-0.5 rounded-full text-[9px] uppercase tracking-widest font-semibold ml-2',
                    isActive
                      ? 'bg-[#FAF7F2]/20 text-[#FAF7F2]'
                      : 'bg-[#7A1C28]/10 text-[#7A1C28]'
                  )}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}

        {/* Sign Out Action */}
        <div className="pt-2 mt-1 border-t border-[#E8DFD5]">
          <button
            type="button"
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs uppercase tracking-wider font-semibold text-[#7A1C28] hover:bg-[#7A1C28]/10 transition-colors cursor-pointer text-left"
          >
            <LogOut className="w-4 h-4 shrink-0" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* QA SCENARIO TESTER (For seamless testing of all 17 QA scenarios) */}
      {onSelectTestScenario && (
        <div className="bg-[#FAF7F2] border border-[#C89D5C]/40 rounded-2xl p-4 text-xs space-y-2">
          <button
            type="button"
            onClick={() => setShowScenarioTester(!showScenarioTester)}
            className="w-full flex items-center justify-between text-[#7A1C28] font-semibold uppercase tracking-wider text-[10px] cursor-pointer"
          >
            <span className="flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5" />
              <span>QA Scenario Simulator</span>
            </span>
            <ChevronDown
              className={cn(
                'w-3.5 h-3.5 transition-transform duration-200',
                showScenarioTester && 'rotate-180'
              )}
            />
          </button>

          {showScenarioTester && (
            <div className="pt-2 space-y-1.5 border-t border-[#E8DFD5]">
              <p className="text-[10px] text-[#6E645A] font-light">
                Switch client data to verify loyalty tiers, returns, and order rules:
              </p>
              <div className="grid grid-cols-1 gap-1 pt-1">
                {[
                  { id: 'new_user', label: '1. New User (0 orders)' },
                  { id: '1_order', label: '2. User with 1 order' },
                  { id: '2_orders_silver', label: '3. Silver Tier (2 orders)' },
                  { id: '3_orders', label: '4. Silver Tier (3 orders)' },
                  { id: '4_orders_gold', label: '5. Gold Tier (4 orders)' },
                  { id: 'returned_order', label: '6. Returned Order (Non-milestone)' },
                  { id: 'exchanged_order', label: '7. Exchanged Order' },
                  { id: 'active_return_window', label: '8. Active Return Window' },
                  { id: 'expired_return_window', label: '9. Expired Return Window' },
                ].map((sc) => (
                  <button
                    key={sc.id}
                    type="button"
                    onClick={() => onSelectTestScenario(sc.id)}
                    className="w-full text-left px-2.5 py-1.5 rounded-lg bg-[#FFFDFC] hover:bg-[#7A1C28] hover:text-[#FAF7F2] text-[#2A221E] text-[11px] border border-[#E8DFD5] transition-colors cursor-pointer"
                  >
                    {sc.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </aside>
  );
};
