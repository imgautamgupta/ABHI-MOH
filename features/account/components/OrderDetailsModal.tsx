'use client';

import React from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Package, ShieldCheck, MapPin, Gift, Clock, Truck, ArrowRight } from 'lucide-react';
import { ClientOrder } from '@/lib/account/types';
import { isWixImage, wixThumbImage, SOFT_IVORY_PLACEHOLDER, FALLBACK_PRODUCT_IMAGE } from '@/lib/wixImage';

interface OrderDetailsModalProps {
  order: ClientOrder | null;
  isOpen: boolean;
  onClose: () => void;
  onTrackOrder?: (orderId: string) => void;
  onRequestReturn?: (orderId: string) => void;
}

export const OrderDetailsModal: React.FC<OrderDetailsModalProps> = ({
  order,
  isOpen,
  onClose,
  onTrackOrder,
  onRequestReturn,
}) => {
  if (!isOpen || !order) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#2A221E]/60 backdrop-blur-xs"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25 }}
          className="relative w-full max-w-2xl bg-[#FAF7F2] border border-[#E8DFD5] rounded-2xl shadow-2xl overflow-hidden z-10 my-8 max-h-[90vh] flex flex-col font-satoshi text-[#2A221E]"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-[#E8DFD5] bg-[#FFFDFC]">
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-[#7A1C28] bg-[#7A1C28]/10 px-2.5 py-0.5 rounded-full">
                  Commission Details
                </span>
                <span className="text-xs font-mono font-medium text-[#6E645A]">
                  {order.displayId}
                </span>
              </div>
              <h3 className="font-hero text-lg uppercase tracking-wider text-[#2A221E] mt-1">
                Order Dossier
              </h3>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-[#F3ECE3] hover:bg-[#E8DFD5] text-[#2A221E] flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Scrollable Content */}
          <div className="p-6 overflow-y-auto space-y-6">
            {/* Status Summary Strip */}
            <div className={`grid grid-cols-2 ${order.returnEligibility.isEligible ? 'sm:grid-cols-4' : 'sm:grid-cols-3'} gap-3`}>
              <div className="p-3 rounded-xl bg-[#FFFDFC] border border-[#E8DFD5] text-xs">
                <span className="text-[10px] uppercase tracking-widest text-[#6E645A]">Order Date</span>
                <p className="font-medium text-[#2A221E] mt-0.5">
                  {new Date(order.orderDate).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-[#FFFDFC] border border-[#E8DFD5] text-xs">
                <span className="text-[10px] uppercase tracking-widest text-[#6E645A]">Payment</span>
                <p className="font-medium text-emerald-700 mt-0.5 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  {order.paymentStatus}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-[#FFFDFC] border border-[#E8DFD5] text-xs">
                <span className="text-[10px] uppercase tracking-widest text-[#6E645A]">Fulfillment</span>
                <p className="font-medium text-[#7A1C28] mt-0.5">
                  {order.fulfillmentStatus}
                </p>
              </div>

              {order.returnEligibility.isEligible && (
                <div className="p-3 rounded-xl bg-[#FFFDFC] border border-[#E8DFD5] text-xs">
                  <span className="text-[10px] uppercase tracking-widest text-[#6E645A]">Return Window</span>
                  <p className="font-medium text-emerald-700 mt-0.5">
                    {order.returnEligibility.daysRemaining} Days Left
                  </p>
                </div>
              )}
            </div>

            {/* Loyalty Milestone Contribution Banner */}
            <div className="p-4 rounded-xl bg-[#FFFDFC] border border-[#C89D5C]/30 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-[#C89D5C] shrink-0 mt-0.5" />
              <div className="text-xs">
                <p className="font-semibold text-[#2A221E]">
                  {order.membershipContribution.contributes
                    ? '✓ Contributes to ABHI-MOH Loyalty Milestone'
                    : 'Membership Milestone Note'}
                </p>
                <p className="text-[#6E645A] font-light mt-0.5 leading-relaxed">
                  {order.membershipContribution.reason}
                </p>
              </div>
            </div>

            {/* Product Items List */}
            <div className="space-y-3">
              <h4 className="text-xs uppercase tracking-widest font-semibold text-[#6E645A]">
                Commissioned Sarees ({order.items.length})
              </h4>
              <div className="divide-y divide-[#E8DFD5] border border-[#E8DFD5] rounded-xl bg-[#FFFDFC] overflow-hidden">
                {order.items.map((item) => (
                  <div key={item.id} className="p-4 flex items-center gap-4">
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
                    <div className="flex-1 min-w-0">
                      <h5 className="font-hero text-sm font-medium text-[#2A221E] truncate">
                        {item.name}
                      </h5>
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
            </div>

            {/* Financial Summary */}
            <div className="p-4 rounded-xl bg-[#FFFDFC] border border-[#E8DFD5] space-y-2.5 text-xs">
              <div className="flex justify-between text-[#6E645A]">
                <span>Item Subtotal</span>
                <span className="font-medium text-[#2A221E]">₹{order.subtotal.toLocaleString('en-IN')}</span>
              </div>

              {order.discountAmount > 0 && (
                <div className="flex justify-between text-[#7A1C28]">
                  <span>
                    Personal Member Discount ({order.membershipDiscountApplied?.percentage || 3}%)
                  </span>
                  <span className="font-semibold">-₹{order.discountAmount.toLocaleString('en-IN')}</span>
                </div>
              )}

              {order.packagingFee > 0 && (
                <div className="flex justify-between text-[#6E645A]">
                  <span>Archival Gift Packaging</span>
                  <span className="text-[#2A221E]">₹{order.packagingFee.toLocaleString('en-IN')}</span>
                </div>
              )}

              <div className="flex justify-between text-[#6E645A]">
                <span>White-Glove Shipping</span>
                <span className="text-emerald-700 font-medium">Complimentary</span>
              </div>

              <div className="pt-2 border-t border-[#E8DFD5] flex justify-between text-sm font-semibold text-[#2A221E]">
                <span>Total Amount Paid</span>
                <span className="text-[#7A1C28] text-base">₹{order.total.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Shipping & Delivery Address */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className={`p-4 rounded-xl bg-[#FFFDFC] border border-[#E8DFD5] text-xs ${!order.tracking.trackingNumber ? 'sm:col-span-2' : ''}`}>
                <div className="flex items-center gap-2 text-[#7A1C28] font-semibold uppercase tracking-wider mb-2">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Delivery Address</span>
                </div>
                <p className="font-semibold text-[#2A221E]">{order.shippingAddress.recipientName}</p>
                <p className="text-[#6E645A] mt-0.5">{order.shippingAddress.addressLine1}</p>
                {order.shippingAddress.addressLine2 && (
                  <p className="text-[#6E645A]">{order.shippingAddress.addressLine2}</p>
                )}
                <p className="text-[#6E645A]">
                  {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.pincode}
                </p>
                <p className="text-[#6E645A] mt-1">Phone: {order.shippingAddress.phone}</p>
              </div>

              {Boolean(order.tracking?.trackingNumber) && (
                <div className="p-4 rounded-xl bg-[#FFFDFC] border border-[#E8DFD5] text-xs">
                  <div className="flex items-center gap-2 text-[#7A1C28] font-semibold uppercase tracking-wider mb-2">
                    <Truck className="w-3.5 h-3.5" />
                    <span>Carrier Logistics</span>
                  </div>
                  <p className="font-semibold text-[#2A221E]">{order.tracking.carrier || 'Courier'}</p>
                  <p className="font-mono text-[#6E645A] mt-0.5">AWB: {order.tracking.trackingNumber}</p>
                  <p className="text-[#6E645A] mt-1">Status: {order.deliveryStatus}</p>
                </div>
              )}
            </div>

            {/* Gift Experience details if available */}
            {order.giftPackaging?.boxTitle && (
              <div className="p-4 rounded-xl bg-[#FFFDFC] border border-[#C89D5C]/30 text-xs">
                <div className="flex items-center gap-2 text-[#7A1C28] font-semibold uppercase tracking-wider mb-2">
                  <Gift className="w-3.5 h-3.5 text-[#C89D5C]" />
                  <span>Atelier Gift Presentation</span>
                </div>
                <p className="font-medium text-[#2A221E]">
                  Box: {order.giftPackaging.boxTitle} • Ribbon: {order.giftPackaging.ribbonColor || 'Gold Satin'}
                </p>
                {order.giftPackaging.giftMessage && (
                  <p className="text-[#6E645A] italic mt-1 bg-[#FAF7F2] p-2.5 rounded-lg border border-[#E8DFD5]">
                    &ldquo;{order.giftPackaging.giftMessage}&rdquo;
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Footer Actions */}
          <div className="px-6 py-4 border-t border-[#E8DFD5] bg-[#FFFDFC] flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              {order.returnEligibility.isEligible && onRequestReturn && (
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onRequestReturn(order.id);
                  }}
                  className="px-4 py-2 rounded-full border border-[#7A1C28] text-[#7A1C28] hover:bg-[#7A1C28]/10 text-xs uppercase tracking-widest font-semibold transition-colors cursor-pointer"
                >
                  Request Return / Exchange
                </button>
              )}
            </div>

            <div className="flex items-center gap-3">
              {onTrackOrder && Boolean(order.tracking?.trackingNumber) && (
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onTrackOrder(order.id);
                  }}
                  className="px-5 py-2.5 rounded-full bg-[#7A1C28] hover:bg-[#60121D] text-[#FAF7F2] text-xs uppercase tracking-widest font-semibold flex items-center gap-2 transition-all cursor-pointer shadow-xs"
                >
                  <span>Track Order</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
