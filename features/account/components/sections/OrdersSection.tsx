'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Package,
  Calendar,
  CreditCard,
  Truck,
  RotateCcw,
  RefreshCw,
  ShieldCheck,
  ShieldAlert,
  ArrowRight,
  ExternalLink,
  ShoppingBag,
} from 'lucide-react';
import Link from 'next/link';
import { ClientOrder } from '@/lib/account/types';
import { isWixImage, wixThumbImage, SOFT_IVORY_PLACEHOLDER, FALLBACK_PRODUCT_IMAGE } from '@/lib/wixImage';

interface OrdersSectionProps {
  orders: ClientOrder[];
  onViewDetails: (order: ClientOrder) => void;
  onTrackOrder: (orderId: string) => void;
  onRequestReturn: (orderId: string) => void;
}

export const OrdersSection: React.FC<OrdersSectionProps> = ({
  orders,
  onViewDetails,
  onTrackOrder,
  onRequestReturn,
}) => {
  if (orders.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -15 }}
        transition={{ duration: 0.3 }}
        className="bg-[#FFFDFC] border border-[#E8DFD5] rounded-2xl p-8 sm:p-14 text-center max-w-2xl mx-auto shadow-xs font-satoshi text-[#2A221E]"
      >
        <div className="w-16 h-16 rounded-full bg-[#F3ECE3] border border-[#E8DFD5] flex items-center justify-center mx-auto mb-4 text-[#7A1C28]">
          <ShoppingBag className="w-7 h-7" />
        </div>
        <h3 className="font-hero text-2xl uppercase tracking-wider text-[#2A221E] mb-2">
          No orders yet
        </h3>
        <p className="font-sans text-xs sm:text-sm text-[#6E645A] font-light max-w-md mx-auto mb-6 leading-relaxed">
          When you commission an artisanal saree from our atelier, your invoice, loom crafting updates, and tracking timelines will be detailed here.
        </p>
        <Link
          href="/collections"
          className="inline-flex items-center gap-2.5 px-6 py-3 bg-[#7A1C28] hover:bg-[#60121D] text-[#FAF7F2] text-xs uppercase tracking-widest font-semibold rounded-full shadow-sm transition-all cursor-pointer"
        >
          <span>Discover The Weaves</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.3 }}
      className="space-y-6 font-satoshi text-[#2A221E]"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E8DFD5] pb-4">
        <div>
          <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-[#7A1C28]">
            Client Archive
          </span>
          <h2 className="font-hero text-2xl uppercase tracking-wider text-[#2A221E] mt-0.5">
            My Orders & Commissions
          </h2>
        </div>
        <span className="text-xs text-[#6E645A]">
          Showing {orders.length} {orders.length === 1 ? 'Commission' : 'Commissions'}
        </span>
      </div>

      <div className="space-y-6">
        {orders.map((order) => {
          const isEligibleForReturn = order.returnEligibility.isEligible;
          const isWindowClosed = order.returnStatus === 'WINDOW_EXPIRED' || (!isEligibleForReturn && order.fulfillmentStatus === 'DELIVERED');
          const isReturnOrExchangeDone = order.returnStatus === 'RETURNED' || order.returnStatus === 'EXCHANGED' || order.returnStatus === 'RETURN_REQUESTED' || order.returnStatus === 'EXCHANGE_REQUESTED';

          return (
            <div
              key={order.id}
              className="bg-[#FFFDFC] border border-[#E8DFD5] hover:border-[#C89D5C]/60 rounded-2xl p-6 shadow-xs transition-all flex flex-col gap-5"
            >
              {/* Order Top Bar: ID, Date, Total */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E8DFD5] pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#F3ECE3] flex items-center justify-center text-[#7A1C28]">
                    <Package className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-mono text-xs font-semibold text-[#2A221E]">
                      {order.displayId}
                    </span>
                    <div className="flex items-center gap-2 text-[11px] text-[#6E645A] mt-0.5">
                      <Calendar className="w-3 h-3 text-[#6E645A]" />
                      <span>
                        {new Date(order.orderDate).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-right">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-[#6E645A] block">
                      Total Paid
                    </span>
                    <span className="font-hero text-base font-semibold text-[#7A1C28]">
                      ₹{order.total.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <span
                    className={`px-3 py-1 rounded-full text-[10px] uppercase tracking-wider font-semibold ${
                      order.fulfillmentStatus === 'DELIVERED'
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                        : order.fulfillmentStatus === 'CANCELLED'
                        ? 'bg-red-50 text-red-700 border border-red-200'
                        : 'bg-[#7A1C28]/10 text-[#7A1C28] border border-[#7A1C28]/20'
                    }`}
                  >
                    {order.fulfillmentStatus}
                  </span>
                </div>
              </div>

              {/* Items List */}
              <div className="divide-y divide-[#E8DFD5]/60">
                {order.items.map((item) => (
                  <div key={item.id} className="py-3 first:pt-0 last:pb-0 flex items-center gap-4">
                    <div className="relative w-16 h-20 rounded-lg overflow-hidden bg-[#FAF7F2] border border-[#E8DFD5] shrink-0">
                      <Image
                        src={wixThumbImage(item.image) || FALLBACK_PRODUCT_IMAGE}
                        alt={item.name}
                        fill
                        unoptimized={isWixImage(item.image)}
                        className="object-contain p-1"
                        onError={(e) => {
                          const target = e.currentTarget;
                          if (target.src !== SOFT_IVORY_PLACEHOLDER) {
                            target.src = SOFT_IVORY_PLACEHOLDER;
                          }
                        }}
                      />
                    </div>
                    <div className="flex-1 min-w-0 text-xs">
                      <h4 className="font-hero font-medium text-sm text-[#2A221E] truncate">
                        {item.name}
                      </h4>
                      {item.material && (
                        <p className="text-[11px] text-[#6E645A] font-light truncate mt-0.5">
                          {item.material}
                        </p>
                      )}
                      <div className="flex items-center gap-4 mt-2 text-xs">
                        <span className="text-[#6E645A]">Qty: {item.quantity}</span>
                        <span className="font-semibold text-[#7A1C28]">{item.price}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Status & Real Wix Details Strip */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3.5 rounded-xl bg-[#FAF7F2] border border-[#E8DFD5] text-xs">
                {/* Payment & Fulfillment */}
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#6E645A] block">
                    Payment & Status
                  </span>
                  <p className="font-medium text-[#2A221E] mt-0.5 flex items-center gap-1.5">
                    <CreditCard className="w-3.5 h-3.5 text-[#7A1C28]" />
                    <span>{order.paymentStatus} • {order.deliveryStatus}</span>
                  </p>
                </div>

                {/* Tracking Logistics or Real Return Details */}
                <div>
                  {order.tracking?.trackingNumber ? (
                    <>
                      <span className="text-[10px] uppercase tracking-widest text-[#6E645A] block">
                        Shipment Tracking
                      </span>
                      <p className="font-medium text-[#2A221E] mt-0.5 flex items-center gap-1.5">
                        <Truck className="w-3.5 h-3.5 text-[#7A1C28]" />
                        <span>{order.tracking.carrier || 'Courier'}: {order.tracking.trackingNumber}</span>
                      </p>
                    </>
                  ) : isEligibleForReturn ? (
                    <>
                      <span className="text-[10px] uppercase tracking-widest text-[#6E645A] block">
                        Return / Exchange
                      </span>
                      <p className="font-medium text-emerald-700 mt-0.5">
                        Eligible ({order.returnEligibility.daysRemaining} days left)
                      </p>
                    </>
                  ) : order.returnStatus === 'RETURNED' || order.returnStatus === 'EXCHANGED' || order.returnStatus === 'RETURN_REQUESTED' || order.returnStatus === 'EXCHANGE_REQUESTED' ? (
                    <>
                      <span className="text-[10px] uppercase tracking-widest text-[#6E645A] block">
                        Return Status
                      </span>
                      <p className="font-medium text-amber-700 mt-0.5">
                        {order.returnStatus.replace('_', ' ')}
                      </p>
                    </>
                  ) : (
                    <>
                      <span className="text-[10px] uppercase tracking-widest text-[#6E645A] block">
                        Commission Summary
                      </span>
                      <p className="font-medium text-[#2A221E] mt-0.5">
                        {order.items.length} {order.items.length === 1 ? 'Handloom Saree' : 'Handloom Sarees'}
                      </p>
                    </>
                  )}
                </div>

                {/* Membership Contribution */}
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#6E645A] block">
                    Membership Milestone
                  </span>
                  <p className="font-medium mt-0.5 flex items-center gap-1.5">
                    {order.membershipContribution.contributes ? (
                      <>
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span className="text-emerald-700">Counts to Tier Milestone</span>
                      </>
                    ) : (
                      <>
                        <ShieldAlert className="w-3.5 h-3.5 text-[#C89D5C] shrink-0" />
                        <span className="text-[#6E645A] truncate" title={order.membershipContribution.reason}>
                          {order.membershipContribution.reason}
                        </span>
                      </>
                    )}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => onViewDetails(order)}
                    className="px-4 py-2 rounded-full border border-[#E8DFD5] hover:border-[#7A1C28] text-[#2A221E] hover:text-[#7A1C28] text-xs uppercase tracking-wider font-semibold transition-colors cursor-pointer"
                  >
                    View Details
                  </button>

                  {Boolean(order.tracking?.trackingNumber) && (
                    <button
                      type="button"
                      onClick={() => onTrackOrder(order.id)}
                      className="px-4 py-2 rounded-full bg-[#F3ECE3] hover:bg-[#E8DFD5] text-[#2A221E] text-xs uppercase tracking-wider font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Truck className="w-3.5 h-3.5 text-[#7A1C28]" />
                      <span>Track Order</span>
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  {isEligibleForReturn && !isReturnOrExchangeDone && (
                    <button
                      type="button"
                      onClick={() => onRequestReturn(order.id)}
                      className="px-4 py-2 rounded-full border border-[#7A1C28] text-[#7A1C28] hover:bg-[#7A1C28]/10 text-xs uppercase tracking-wider font-semibold transition-colors cursor-pointer flex items-center gap-1.5"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>Return / Exchange</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};
