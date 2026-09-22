'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  ShieldCheck,
  Crown,
  Sparkles,
  Package,
  Heart,
  MapPin,
  ArrowRight,
  Clock,
  ExternalLink,
  Award,
} from 'lucide-react';
import { AccountDossier, AccountTabKey } from '@/lib/account/types';

interface ProfileSectionProps {
  dossier: AccountDossier;
  onNavigateTab: (tab: AccountTabKey) => void;
  onSelectOrderForTracking?: (orderId: string) => void;
}

export const ProfileSection: React.FC<ProfileSectionProps> = ({
  dossier,
  onNavigateTab,
  onSelectOrderForTracking,
}) => {
  const { membership, orders, savedAddresses, wishlistIds } = dossier;
  const recentOrder = orders[0] || null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.3 }}
      className="space-y-8 font-satoshi text-[#2A221E]"
    >
      {/* Top Banner / Membership Status Hero */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#FFFDFC] via-[#FAF7F2] to-[#F3ECE3] border border-[#E8DFD5] p-6 sm:p-8 shadow-xs">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[radial-gradient(circle_at_top_right,rgba(200,157,92,0.18)_0%,transparent_70%)] pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-[#7A1C28] to-[#450A10] border-2 border-[#C89D5C]/50 flex items-center justify-center text-[#FAF7F2] font-hero text-xl sm:text-2xl font-bold tracking-widest shadow-md shrink-0">
              {dossier.avatarMonogram || 'AM'}
              {membership.tier === 'GOLD' && (
                <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-[#C89D5C] text-[#2A221E] flex items-center justify-center shadow-xs border-2 border-[#FAF7F2]">
                  <Crown className="w-3.5 h-3.5 fill-[#2A221E]" />
                </div>
              )}
              {membership.tier === 'SILVER' && (
                <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-slate-300 text-[#2A221E] flex items-center justify-center shadow-xs border-2 border-[#FAF7F2]">
                  <Award className="w-3.5 h-3.5 fill-[#2A221E]" />
                </div>
              )}
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-2 flex-wrap">
                <span
                  className={`text-[10px] uppercase tracking-[0.2em] font-semibold px-2.5 py-0.5 rounded-full ${
                    membership.tier === 'GOLD'
                      ? 'bg-[#C89D5C]/20 text-[#8F6526] border border-[#C89D5C]/40'
                      : membership.tier === 'SILVER'
                      ? 'bg-slate-200 text-slate-800 border border-slate-300'
                      : 'bg-[#7A1C28]/10 text-[#7A1C28]'
                  }`}
                >
                  {membership.tierName}
                </span>
                <span className="text-[10px] uppercase tracking-widest text-[#6E645A]">
                  Verified Client • {membership.successfulOrderCount} Successful {membership.successfulOrderCount === 1 ? 'Order' : 'Orders'}
                </span>
              </div>

              <h2 className="font-hero text-2xl sm:text-3xl font-medium tracking-[0.06em] uppercase text-[#2A221E] mt-1">
                {dossier.name}
              </h2>

              <p className="font-sans text-xs sm:text-sm font-light text-[#6E645A]">
                {dossier.email} {dossier.phone ? `• ${dossier.phone}` : ''}
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
            <button
              type="button"
              onClick={() => onNavigateTab('membership')}
              className="px-5 py-2.5 rounded-full bg-[#7A1C28] hover:bg-[#60121D] text-[#FAF7F2] text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs"
            >
              <Crown className="w-3.5 h-3.5 text-[#E5C388]" />
              <span>Privileges Dossier</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Quick Statistics Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div
          onClick={() => onNavigateTab('membership')}
          className="bg-[#FFFDFC] border border-[#E8DFD5] rounded-2xl p-5 hover:border-[#7A1C28]/50 transition-all cursor-pointer shadow-2xs group"
        >
          <div className="flex items-center justify-between text-[#6E645A]">
            <span className="text-[10px] uppercase tracking-widest font-semibold">Client Status</span>
            <Crown className="w-4 h-4 text-[#C89D5C]" />
          </div>
          <p className="font-hero text-lg sm:text-xl text-[#7A1C28] mt-2 font-medium">
            {membership.tier === 'GOLD' ? 'Gold Patron' : membership.tier === 'SILVER' ? 'Silver Member' : 'Regular Client'}
          </p>
          <span className="text-[11px] text-[#6E645A] mt-0.5 block">
            {membership.discountPercent > 0 ? `${membership.discountPercent}% Personal Discount Active` : 'Unlock Silver with 2 orders'}
          </span>
        </div>

        <div
          onClick={() => onNavigateTab('orders')}
          className="bg-[#FFFDFC] border border-[#E8DFD5] rounded-2xl p-5 hover:border-[#7A1C28]/50 transition-all cursor-pointer shadow-2xs group"
        >
          <div className="flex items-center justify-between text-[#6E645A]">
            <span className="text-[10px] uppercase tracking-widest font-semibold">Commissions</span>
            <Package className="w-4 h-4 text-[#7A1C28]" />
          </div>
          <p className="font-hero text-lg sm:text-xl text-[#2A221E] mt-2 font-medium">
            {orders.length} Total
          </p>
          <span className="text-[11px] text-[#6E645A] mt-0.5 block">
            {membership.successfulOrderCount} Milestone Qualifying
          </span>
        </div>

        <div
          onClick={() => onNavigateTab('wishlist')}
          className="bg-[#FFFDFC] border border-[#E8DFD5] rounded-2xl p-5 hover:border-[#7A1C28]/50 transition-all cursor-pointer shadow-2xs group"
        >
          <div className="flex items-center justify-between text-[#6E645A]">
            <span className="text-[10px] uppercase tracking-widest font-semibold">Wishlist Curations</span>
            <Heart className="w-4 h-4 text-[#7A1C28]" />
          </div>
          <p className="font-hero text-lg sm:text-xl text-[#2A221E] mt-2 font-medium">
            {wishlistIds.length || 0} Pieces
          </p>
          <span className="text-[11px] text-[#6E645A] mt-0.5 block">Saved for Private Consultation</span>
        </div>

        <div
          onClick={() => onNavigateTab('concierge')}
          className="bg-[#FFFDFC] border border-[#E8DFD5] rounded-2xl p-5 hover:border-[#7A1C28]/50 transition-all cursor-pointer shadow-2xs group"
        >
          <div className="flex items-center justify-between text-[#6E645A]">
            <span className="text-[10px] uppercase tracking-widest font-semibold">Atelier Concierge</span>
            <Sparkles className="w-4 h-4 text-[#C89D5C]" />
          </div>
          <p className="font-hero text-lg sm:text-xl text-[#2A221E] mt-2 font-medium">
            VIP Priority
          </p>
          <span className="text-[11px] text-[#6E645A] mt-0.5 block">Direct Weaver Advisory</span>
        </div>
      </div>

      {/* Main Grid: Journey Preview + Recent Commission */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: ABHI-MOH Journey Progress Card */}
        <div className="lg:col-span-2 bg-[#FFFDFC] border border-[#E8DFD5] rounded-2xl p-6 sm:p-8 shadow-xs flex flex-col justify-between gap-6">
          <div className="flex items-center justify-between border-b border-[#E8DFD5] pb-4">
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-[#7A1C28]">
                Loyalty Progression
              </span>
              <h3 className="font-hero text-lg uppercase tracking-wider text-[#2A221E] mt-0.5">
                Your ABHI-MOH Journey
              </h3>
            </div>
            <Crown className="w-5 h-5 text-[#C89D5C]" />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-[#2A221E] uppercase tracking-wider">
                Current Tier: {membership.tierName}
              </span>
              <span className="text-[#7A1C28] font-medium">
                {membership.successfulOrderCount} / {membership.tier === 'GOLD' ? '4' : membership.tier === 'SILVER' ? '4' : '2'} Orders
              </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-3 bg-[#F3ECE3] rounded-full overflow-hidden p-0.5 border border-[#E8DFD5]">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${membership.progressPercent}%` }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="h-full bg-gradient-to-r from-[#7A1C28] via-[#A32233] to-[#C89D5C] rounded-full"
              />
            </div>

            <div className="flex items-center justify-between text-[11px] text-[#6E645A]">
              <span>Regular (0-1)</span>
              <span>🥈 Silver (2) • 3% Off</span>
              <span>🥇 Gold (4+) • 5% Off</span>
            </div>

            {membership.nextTier ? (
              <p className="text-xs text-[#6E645A] font-light leading-relaxed bg-[#FAF7F2] p-3.5 rounded-xl border border-[#E8DFD5]">
                <strong className="text-[#2A221E] font-medium">{membership.ordersNeededForNextTier} more successful {membership.ordersNeededForNextTier === 1 ? 'order' : 'orders'}</strong> needed to unlock <strong className="text-[#7A1C28] font-medium">{membership.nextTier} Member Privileges</strong> ({membership.nextTier === 'GOLD' ? '5%' : '3%'} personal discount, earlier collections access & complimentary gift packaging).
              </p>
            ) : (
              <p className="text-xs text-emerald-800 font-light leading-relaxed bg-emerald-50/70 p-3.5 rounded-xl border border-emerald-200">
                You have achieved our highest <strong className="font-semibold">Gold Patron Tier</strong>. Enjoy 5% personal discounts, priority bridal consultations, and complimentary archival unboxing caskets with every commission.
              </p>
            )}
          </div>

          <div className="pt-2 border-t border-[#E8DFD5] flex items-center justify-between">
            <span className="text-xs text-[#6E645A]">
              Personal Member Discount: <strong className="text-[#7A1C28] font-semibold">{membership.discountPercent}%</strong>
            </span>
            <button
              type="button"
              onClick={() => onNavigateTab('membership')}
              className="text-xs uppercase tracking-widest font-semibold text-[#7A1C28] hover:text-[#5E0006] flex items-center gap-1 cursor-pointer"
            >
              <span>View All Privileges</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Right: Recent Order Spotlight */}
        <div className="lg:col-span-1 bg-[#FFFDFC] border border-[#E8DFD5] rounded-2xl p-6 sm:p-8 shadow-xs flex flex-col justify-between gap-5">
          <div className="flex items-center justify-between border-b border-[#E8DFD5] pb-4">
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-[#7A1C28]">
                Recent Drape
              </span>
              <h3 className="font-hero text-lg uppercase tracking-wider text-[#2A221E] mt-0.5">
                Latest Commission
              </h3>
            </div>
            <Clock className="w-4 h-4 text-[#6E645A]" />
          </div>

          {recentOrder ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono font-medium text-[#2A221E]">{recentOrder.displayId}</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] uppercase tracking-wider font-semibold bg-[#7A1C28]/10 text-[#7A1C28]">
                  {recentOrder.fulfillmentStatus}
                </span>
              </div>

              <div className="flex items-center gap-3.5">
                <div className="relative w-14 h-18 rounded-lg overflow-hidden bg-[#FAF7F2] border border-[#E8DFD5] shrink-0">
                  <img
                    src={recentOrder.items[0]?.image || '/assets/sarees/saree-maroon.png'}
                    alt="Saree"
                    className="w-full h-full object-contain p-1"
                  />
                </div>
                <div className="flex-1 min-w-0 text-xs">
                  <p className="font-hero font-medium text-sm text-[#2A221E] truncate">
                    {recentOrder.items[0]?.name}
                  </p>
                  <p className="text-[#6E645A] font-light mt-0.5">
                    Qty: {recentOrder.items[0]?.quantity} • ₹{recentOrder.total.toLocaleString('en-IN')}
                  </p>
                  <p className="text-[11px] text-[#7A1C28] font-medium mt-1 truncate">
                    {recentOrder.deliveryStatus}
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => {
                    if (onSelectOrderForTracking) onSelectOrderForTracking(recentOrder.id);
                    onNavigateTab('tracking');
                  }}
                  className="w-full py-2.5 rounded-full bg-[#F3ECE3] hover:bg-[#E8DFD5] text-[#2A221E] text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <span>Track Status</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-6">
              <p className="text-xs text-[#6E645A] font-light">No commissions placed yet.</p>
              <button
                type="button"
                onClick={() => (window.location.href = '/collections')}
                className="mt-3 text-xs uppercase tracking-widest text-[#7A1C28] font-semibold underline"
              >
                Browse Collections
              </button>
            </div>
          )}

          <div className="pt-3 border-t border-[#E8DFD5] flex items-center justify-between text-xs">
            <span className="text-[#6E645A]">Need assistance?</span>
            <button
              type="button"
              onClick={() => onNavigateTab('concierge')}
              className="text-[#7A1C28] font-medium hover:underline flex items-center gap-1"
            >
              <span>Contact Concierge</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
