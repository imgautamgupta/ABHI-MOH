'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  RotateCcw,
  RefreshCw,
  Clock,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  ShieldAlert,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { ClientOrder, ReturnExchangeRequest } from '@/lib/account/types';
import { isWixImage, wixThumbImage, SOFT_IVORY_PLACEHOLDER } from '@/lib/wixImage';

interface ReturnsExchangesSectionProps {
  orders: ClientOrder[];
  returnRequests: ReturnExchangeRequest[];
  onRequestReturn: (orderId: string) => void;
}

export const ReturnsExchangesSection: React.FC<ReturnsExchangesSectionProps> = ({
  orders,
  returnRequests,
  onRequestReturn,
}) => {
  const eligibleOrders = orders.filter((o) => o.returnEligibility.isEligible);
  const pastReturnedOrExchanged = orders.filter(
    (o) =>
      o.returnStatus === 'RETURNED' ||
      o.returnStatus === 'EXCHANGED' ||
      o.returnStatus === 'RETURN_REQUESTED' ||
      o.returnStatus === 'EXCHANGE_REQUESTED'
  );
  const expiredOrders = orders.filter(
    (o) =>
      o.fulfillmentStatus === 'DELIVERED' &&
      !o.returnEligibility.isEligible &&
      o.returnStatus === 'WINDOW_EXPIRED'
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.3 }}
      className="space-y-8 font-satoshi text-[#2A221E]"
    >
      {/* Top Title & Policy Overview */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#E8DFD5] pb-4">
        <div>
          <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-[#7A1C28]">
            Atelier Guarantee
          </span>
          <h2 className="font-hero text-2xl uppercase tracking-wider text-[#2A221E] mt-0.5">
            Returns & Exchanges Protocol
          </h2>
        </div>
      </div>

      {/* Return-Free Loyalty Milestone Explanation Notice */}
      <div className="p-5 rounded-2xl bg-gradient-to-br from-[#FFFDFC] to-[#F3ECE3] border border-[#C89D5C]/40 flex items-start gap-4 shadow-xs">
        <ShieldCheck className="w-5 h-5 text-[#7A1C28] shrink-0 mt-0.5" />
        <div className="text-xs space-y-1">
          <p className="font-semibold text-[#2A221E]">
            Our 7-Day Bespoke Returns & Loyalty Commitment
          </p>
          <p className="text-[#6E645A] font-light leading-relaxed">
            Every ABHI-MOH drape comes with a 7-day complimentary return & exchange window starting on the day of delivery. A successful order is counted towards your <strong className="text-[#7A1C28] font-medium">Silver or Gold Membership milestone</strong> strictly after delivery and after this 7-day period concludes safely without a return or exchange. If you request a return or exchange, our team will process it with complete care, though the order will not contribute toward your tier progression.
          </p>
        </div>
      </div>

      {/* 1. ELIGIBLE ORDERS FOR RETURN / EXCHANGE */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-hero text-lg uppercase tracking-wider text-[#2A221E]">
            Eligible Drapes for Return / Exchange
          </h3>
          {eligibleOrders.length > 0 ? (
            <span className="text-xs text-emerald-700 font-semibold bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
              {eligibleOrders.length} Active Window{eligibleOrders.length > 1 ? 's' : ''}
            </span>
          ) : (
            <span className="text-xs text-[#6E645A] font-medium bg-[#FAF7F2] px-2.5 py-0.5 rounded-full border border-[#E8DFD5]">
              None Active
            </span>
          )}
        </div>

        {eligibleOrders.length === 0 ? (
          <div className="p-6 rounded-2xl bg-[#FFFDFC] border border-[#E8DFD5] text-center space-y-2">
            <div className="w-10 h-10 rounded-full bg-[#F3ECE3] border border-[#E8DFD5] flex items-center justify-center mx-auto mb-3">
              <Clock className="w-5 h-5 text-[#7A1C28]" />
            </div>
            <p className="text-xs text-[#2A221E] font-medium">No Active Return Windows</p>
            <p className="text-xs text-[#6E645A] font-light leading-relaxed max-w-xs mx-auto">
              Your commissioned drapes are either beyond the 7-day window, already milestone-verified, or no orders have been placed yet.
            </p>
            <p className="text-[10px] text-[#7A1C28]/70 uppercase tracking-widest mt-2">
              Use the QA Simulator ↙ to test with an &ldquo;Active Return Window&rdquo; scenario
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {eligibleOrders.map((order) => (
              <div
                key={order.id}
                className="bg-[#FFFDFC] border border-[#E8DFD5] rounded-2xl p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
              >
                <div className="flex items-center gap-4">
                  {order.items[0]?.image && (
                    <div className="relative w-16 h-20 rounded-lg overflow-hidden bg-[#FAF7F2] border border-[#E8DFD5] shrink-0">
                      <Image
                        src={wixThumbImage(order.items[0].image)}
                        alt={order.items[0].name}
                        fill
                        unoptimized={isWixImage(order.items[0].image)}
                        className="object-contain p-1"
                        onError={(e) => {
                          const target = e.currentTarget;
                          if (target.src !== SOFT_IVORY_PLACEHOLDER) {
                            target.src = SOFT_IVORY_PLACEHOLDER;
                          }
                        }}
                      />
                    </div>
                  )}
                  <div className="text-xs space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-semibold text-[#2A221E]">{order.displayId}</span>
                      <span className="px-2 py-0.5 rounded-full text-[9px] uppercase tracking-wider font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        {order.returnEligibility.daysRemaining} Days Left to Request
                      </span>
                    </div>
                    <h4 className="font-hero text-sm font-medium text-[#2A221E]">
                      {order.items[0]?.name}
                    </h4>
                    <p className="text-[#6E645A]">
                      Delivered on{' '}
                      {order.deliveredDate
                        ? new Date(order.deliveredDate).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                          })
                        : 'Recently'}
                    </p>
                    <p className="text-[#7A1C28] font-semibold">
                      ₹{order.total.toLocaleString('en-IN')}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto">
                  <button
                    type="button"
                    onClick={() => onRequestReturn(order.id)}
                    className="flex-1 md:flex-none px-5 py-2.5 rounded-full bg-[#7A1C28] hover:bg-[#60121D] text-[#FAF7F2] text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Request Return / Exchange</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 2. RECENT RETURN / EXCHANGE REQUESTS & HISTORY */}
      {pastReturnedOrExchanged.length > 0 && (
        <div className="space-y-4 pt-4 border-t border-[#E8DFD5]">
          <h3 className="font-hero text-lg uppercase tracking-wider text-[#2A221E]">
            Return & Exchange History
          </h3>

          <div className="space-y-3">
            {pastReturnedOrExchanged.map((order) => (
              <div
                key={order.id}
                className="bg-[#FFFDFC] border border-[#E8DFD5] rounded-xl p-4 flex flex-wrap items-center justify-between gap-4 text-xs"
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono font-medium text-[#2A221E]">{order.displayId}</span>
                  <span className="text-[#6E645A] truncate max-w-xs">{order.items[0]?.name}</span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-full text-[10px] uppercase tracking-wider font-semibold bg-amber-50 text-amber-800 border border-amber-200">
                    {order.returnStatus.replace('_', ' ')}
                  </span>
                  <span className="text-[11px] text-[#6E645A] italic">
                    (Does not contribute to loyalty milestone)
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. EXPIRED WINDOW ARCHIVE */}
      {expiredOrders.length > 0 && (
        <div className="space-y-4 pt-4 border-t border-[#E8DFD5]">
          <h3 className="font-hero text-lg uppercase tracking-wider text-[#2A221E]">
            Concluded Commissions (Return Window Closed)
          </h3>

          <div className="space-y-3">
            {expiredOrders.map((order) => (
              <div
                key={order.id}
                className="bg-[#FFFDFC] border border-[#E8DFD5] rounded-xl p-4 flex flex-wrap items-center justify-between gap-4 text-xs"
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono font-medium text-[#2A221E]">{order.displayId}</span>
                  <span className="text-[#6E645A] truncate max-w-xs">{order.items[0]?.name}</span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-full text-[10px] uppercase tracking-wider font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                    ✓ Milestone Verified
                  </span>
                  <span className="text-[10px] uppercase tracking-wider text-[#6E645A] bg-[#FAF7F2] px-2.5 py-0.5 rounded-full border border-[#E8DFD5]">
                    Return Window Closed
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
};
