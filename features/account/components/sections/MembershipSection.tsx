'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Crown,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Gift,
  Award,
  ArrowRight,
  Info,
} from 'lucide-react';
import { MembershipDetails } from '@/lib/account/types';

interface MembershipSectionProps {
  membership: MembershipDetails;
}

export const MembershipSection: React.FC<MembershipSectionProps> = ({ membership }) => {
  const {
    tier,
    tierName,
    discountPercent,
    successfulOrderCount,
    nextTier,
    ordersNeededForNextTier,
    progressPercent,
    benefits,
  } = membership;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.3 }}
      className="space-y-8 font-satoshi text-[#2A221E]"
    >
      {/* Top Header */}
      <div className="border-b border-[#E8DFD5] pb-4">
        <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-[#7A1C28]">
          Atelier Loyalty & Privileges
        </span>
        <h2 className="font-hero text-2xl uppercase tracking-wider text-[#2A221E] mt-0.5">
          Membership & Privileges
        </h2>
      </div>

      {/* Tier Hero Card */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#2A221E] via-[#3D141A] to-[#1F070A] text-[#FAF7F2] p-8 sm:p-10 shadow-xl border border-[#C89D5C]/30">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[radial-gradient(circle_at_top_right,rgba(200,157,92,0.25)_0%,transparent_70%)] pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full text-[10px] uppercase tracking-[0.2em] font-semibold bg-[#C89D5C] text-[#2A221E]">
                {membership.badgeTitle}
              </span>
              <span className="text-xs text-[#E5C388] font-mono">
                {successfulOrderCount} Verified {successfulOrderCount === 1 ? 'Order' : 'Orders'}
              </span>
            </div>

            <div className="flex items-center gap-3">
              {tier === 'GOLD' ? (
                <Crown className="w-8 h-8 text-[#C89D5C]" />
              ) : tier === 'SILVER' ? (
                <Award className="w-8 h-8 text-slate-300" />
              ) : (
                <Sparkles className="w-8 h-8 text-[#E5C388]" />
              )}
              <h3 className="font-hero text-3xl sm:text-4xl font-normal tracking-[0.08em] uppercase text-[#FAF7F2]">
                {tierName}
              </h3>
            </div>

            <p className="font-sans text-xs sm:text-sm font-light text-[#E8DFD5] max-w-lg leading-relaxed">
              {tier === 'GOLD'
                ? 'As a Gold Patron, you have unlocked our highest tier of artisanal privileges, priority concierge, and bespoke loom reservations.'
                : tier === 'SILVER'
                ? 'As a Silver Member, you have unlocked early collection access, priority weaver advisory, and bespoke privileges.'
                : 'Complete 2 successful orders to unlock Silver Membership and exclusive bespoke client privileges.'}
            </p>
          </div>

          {/* Tier Status Pill */}
          <div className="p-6 rounded-2xl bg-[#FFFDFC]/10 backdrop-blur-md border border-[#C89D5C]/40 text-center flex flex-col items-center justify-center min-w-[180px]">
            <span className="text-[10px] uppercase tracking-widest text-[#E5C388]">
              Tier Milestone
            </span>
            <span className="font-hero text-2xl text-[#FAF7F2] font-semibold mt-1">
              {tierName}
            </span>
            <span className="text-[10px] text-[#E8DFD5] mt-1 font-mono">
              {successfulOrderCount} / {tier === 'GOLD' ? '4' : '2'} Orders
            </span>
          </div>
        </div>
      </div>

      {/* "YOUR ABHI-MOH JOURNEY" PROGRESSION CARD */}
      <div className="bg-[#FFFDFC] border border-[#E8DFD5] rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex items-center justify-between border-b border-[#E8DFD5] pb-4">
          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-[#7A1C28]">
              Milestone Progression
            </span>
            <h3 className="font-hero text-lg uppercase tracking-wider text-[#2A221E] mt-0.5">
              YOUR ABHI-MOH JOURNEY
            </h3>
          </div>
          <Crown className="w-5 h-5 text-[#C89D5C]" />
        </div>

        {/* 3-Tier Visual Milestones */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Regular Tier */}
          <div
            className={`p-5 rounded-xl border flex flex-col justify-between gap-3 ${
              tier === 'REGULAR'
                ? 'bg-[#FAF7F2] border-[#7A1C28] shadow-xs ring-1 ring-[#7A1C28]/20'
                : 'bg-[#FFFDFC] border-[#E8DFD5]'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-hero text-sm uppercase tracking-wider font-semibold text-[#2A221E]">
                Regular Client
              </span>
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            </div>
            <p className="text-xs text-[#6E645A] font-light">
              Starting milestone for every esteemed client of ABHI-MOH.
            </p>
            <div className="pt-2 border-t border-[#E8DFD5] text-[11px] font-medium text-[#7A1C28]">
              0 - 1 Successful Orders
            </div>
          </div>

          {/* Silver Tier */}
          <div
            className={`p-5 rounded-xl border flex flex-col justify-between gap-3 ${
              tier === 'SILVER'
                ? 'bg-[#FAF7F2] border-[#7A1C28] shadow-xs ring-1 ring-[#7A1C28]/20'
                : 'bg-[#FFFDFC] border-[#E8DFD5]'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="text-base">🥈</span>
                <span className="font-hero text-sm uppercase tracking-wider font-semibold text-[#2A221E]">
                  Silver Member
                </span>
              </div>
              {tier === 'SILVER' || tier === 'GOLD' ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              ) : (
                <Lock className="w-3.5 h-3.5 text-[#6E645A]" />
              )}
            </div>
            <p className="text-xs text-[#6E645A] font-light">
              Early collection access, priority master weaver advisory, and bespoke privileges.
            </p>
            <div className="pt-2 border-t border-[#E8DFD5] text-[11px] font-medium text-[#7A1C28]">
              2 Successful Orders
            </div>
          </div>

          {/* Gold Tier */}
          <div
            className={`p-5 rounded-xl border flex flex-col justify-between gap-3 ${
              tier === 'GOLD'
                ? 'bg-[#FAF7F2] border-[#C89D5C] shadow-xs ring-1 ring-[#C89D5C]/30'
                : 'bg-[#FFFDFC] border-[#E8DFD5]'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="text-base">🥇</span>
                <span className="font-hero text-sm uppercase tracking-wider font-semibold text-[#2A221E]">
                  Gold Patron
                </span>
              </div>
              {tier === 'GOLD' ? (
                <CheckCircle2 className="w-4 h-4 text-[#C89D5C]" />
              ) : (
                <Lock className="w-3.5 h-3.5 text-[#6E645A]" />
              )}
            </div>
            <p className="text-xs text-[#6E645A] font-light">
              Rare heritage previews, private bridal consultations, and complimentary archival velvet gift caskets.
            </p>
            <div className="pt-2 border-t border-[#E8DFD5] text-[11px] font-medium text-[#7A1C28]">
              4 Successful Orders
            </div>
          </div>
        </div>

        {/* Milestone Indicator & Narrative */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-medium text-[#2A221E]">
              {tier === 'GOLD'
                ? 'GOLD MEMBER (4 / 4 SUCCESSFUL ORDERS)'
                : tier === 'SILVER'
                ? `SILVER MEMBER (${successfulOrderCount} / 2 SUCCESSFUL ORDERS • ✓ SILVER UNLOCKED)`
                : `REGULAR CLIENT (${successfulOrderCount} / 2 ORDERS)`}
            </span>
            <span className="text-[#7A1C28] font-semibold">{progressPercent}% Progress</span>
          </div>

          <div className="w-full h-3 bg-[#F3ECE3] rounded-full overflow-hidden p-0.5 border border-[#E8DFD5]">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.8 }}
              className="h-full bg-gradient-to-r from-[#7A1C28] via-[#A32233] to-[#C89D5C] rounded-full"
            />
          </div>

          {nextTier && (
            <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#E8DFD5] text-xs text-[#6E645A] flex items-center justify-between">
              <div>
                <strong className="text-[#2A221E] uppercase tracking-wider font-semibold">
                  NEXT MILESTONE: {nextTier}
                </strong>
                <p className="mt-0.5">
                  {ordersNeededForNextTier} more successful {ordersNeededForNextTier === 1 ? 'order' : 'orders'} to unlock {nextTier} privileges.
                </p>
              </div>
              <span className="font-hero text-lg text-[#7A1C28] font-semibold">
                {successfulOrderCount} / {nextTier === 'GOLD' ? '4' : '2'}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* RETURN-FREE JOURNEY TRANSPARENCY ACCORDION / BOX */}
      <div className="bg-[#FFFDFC] border border-[#C89D5C]/40 rounded-2xl p-6 sm:p-8 shadow-xs space-y-4">
        <div className="flex items-center gap-3 text-[#7A1C28]">
          <ShieldCheck className="w-5 h-5 text-[#C89D5C]" />
          <h3 className="font-hero text-base sm:text-lg uppercase tracking-wider text-[#2A221E]">
            How Successful Orders Are Counted (Return-Free Protocol)
          </h3>
        </div>

        <p className="text-xs text-[#6E645A] font-light leading-relaxed">
          At ABHI-MOH, every loyalty milestone is earned through authentic patronage. An order becomes a verified <strong className="text-[#2A221E] font-medium">Successful Order</strong> only when:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3.5 rounded-xl bg-[#FAF7F2] border border-[#E8DFD5] flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <strong className="text-[#2A221E]">1. Payment Completed</strong>
              <p className="text-[#6E645A] mt-0.5 font-light">Payment verified through secure gateway.</p>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#FAF7F2] border border-[#E8DFD5] flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <strong className="text-[#2A221E]">2. Order Delivered</strong>
              <p className="text-[#6E645A] mt-0.5 font-light">Delivered to your doorstep with courier confirmation.</p>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#FAF7F2] border border-[#E8DFD5] flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <strong className="text-[#2A221E]">3. 7-Day Return Period Safely Concluded</strong>
              <p className="text-[#6E645A] mt-0.5 font-light">Return/exchange window expired with no issues.</p>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#FAF7F2] border border-[#E8DFD5] flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <strong className="text-[#2A221E]">4. No Returns / Exchanges</strong>
              <p className="text-[#6E645A] mt-0.5 font-light">Drape retained and cherished by the patron.</p>
            </div>
          </div>
        </div>

        <p className="text-[11px] text-[#6E645A] italic pt-1">
          * Cancelled, refunded, returned, or exchanged orders do not contribute to your membership milestone count.
        </p>
      </div>

      {/* DETAILED PRIVILEGES LIST */}
      <div className="bg-[#FFFDFC] border border-[#E8DFD5] rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
        <h3 className="font-hero text-lg uppercase tracking-wider text-[#2A221E]">
          Available Privileges & Benefits
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {benefits.map((b, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-xl border flex items-start gap-3 transition-all ${
                b.unlocked
                  ? 'bg-[#FAF7F2] border-[#C89D5C]/50 text-[#2A221E]'
                  : 'bg-[#FAF7F2]/40 border-[#E8DFD5] text-[#6E645A] opacity-60'
              }`}
            >
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                  b.unlocked
                    ? 'bg-[#7A1C28] text-[#FAF7F2]'
                    : 'bg-[#E8DFD5] text-[#6E645A]'
                }`}
              >
                {b.unlocked ? (
                  <CheckCircle2 className="w-4 h-4" />
                ) : (
                  <Lock className="w-3.5 h-3.5" />
                )}
              </div>
              <div className="text-xs space-y-0.5">
                <h4 className="font-hero font-medium uppercase tracking-wider">
                  {b.title}
                </h4>
                <p className="font-light leading-relaxed">{b.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
