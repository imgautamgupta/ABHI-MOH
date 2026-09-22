'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Truck,
  CheckCircle2,
  Clock,
  MapPin,
  Package,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Search,
} from 'lucide-react';
import { ClientOrder, TrackingStageId } from '@/lib/account/types';

interface OrderTrackingSectionProps {
  orders: ClientOrder[];
  selectedOrderId?: string;
  onSelectOrder?: (orderId: string) => void;
}

export const OrderTrackingSection: React.FC<OrderTrackingSectionProps> = ({
  orders,
  selectedOrderId,
  onSelectOrder,
}) => {
  const [activeOrderId, setActiveOrderId] = useState<string>(
    selectedOrderId || (orders.length > 0 ? orders[0].id : '')
  );
  const [searchQuery, setSearchQuery] = useState('');

  const currentOrder = orders.find((o) => o.id === activeOrderId || o.displayId === activeOrderId) || orders[0] || null;

  if (!currentOrder) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -15 }}
        transition={{ duration: 0.3 }}
        className="bg-[#FFFDFC] border border-[#E8DFD5] rounded-2xl p-8 sm:p-14 text-center max-w-2xl mx-auto shadow-xs font-satoshi text-[#2A221E]"
      >
        <div className="w-16 h-16 rounded-full bg-[#F3ECE3] border border-[#E8DFD5] flex items-center justify-center mx-auto mb-4 text-[#7A1C28]">
          <Truck className="w-7 h-7" />
        </div>
        <h3 className="font-hero text-2xl uppercase tracking-wider text-[#2A221E] mb-2">
          No Active Shipments
        </h3>
        <p className="font-sans text-xs sm:text-sm text-[#6E645A] font-light max-w-md mx-auto mb-6 leading-relaxed">
          You currently have no active saree shipments in transit. When a commission is dispatched, real-time logistics tracking will appear here.
        </p>
        <button
          type="button"
          onClick={() => (window.location.href = '/collections')}
          className="inline-flex items-center gap-2.5 px-6 py-3 bg-[#7A1C28] hover:bg-[#60121D] text-[#FAF7F2] text-xs uppercase tracking-widest font-semibold rounded-full shadow-sm transition-all cursor-pointer"
        >
          <span>Explore The Weaves</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </motion.div>
    );
  }

  const { tracking, items, shippingAddress } = currentOrder;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.3 }}
      className="space-y-8 font-satoshi text-[#2A221E]"
    >
      {/* Top Header & Order Selector */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#E8DFD5] pb-4">
        <div>
          <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-[#7A1C28]">
            Atelier Logistics
          </span>
          <h2 className="font-hero text-2xl uppercase tracking-wider text-[#2A221E] mt-0.5">
            Real-Time Order Tracking
          </h2>
        </div>

        {/* Order Selector Dropdown */}
        {orders.length > 1 && (
          <div className="flex items-center gap-2">
            <span className="text-xs text-[#6E645A] whitespace-nowrap">Switch Commission:</span>
            <select
              value={activeOrderId}
              onChange={(e) => {
                setActiveOrderId(e.target.value);
                if (onSelectOrder) onSelectOrder(e.target.value);
              }}
              className="px-3.5 py-2 bg-[#FFFDFC] border border-[#E8DFD5] rounded-xl text-xs font-medium text-[#2A221E] focus:outline-none focus:border-[#7A1C28] shadow-2xs"
            >
              {orders.map((o) => (
                <option key={o.id} value={o.id}>
                  {o.displayId} — {o.items[0]?.name.slice(0, 24)}... ({o.fulfillmentStatus})
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Main Tracking Overview Card */}
      <div className="bg-[#FFFDFC] border border-[#E8DFD5] rounded-2xl p-6 sm:p-8 shadow-xs space-y-8">
        {/* Status Header */}
        <div className="flex flex-wrap items-start justify-between gap-4 pb-6 border-b border-[#E8DFD5]">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#7A1C28]/10 text-[#7A1C28] flex items-center justify-center shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-sm font-semibold text-[#2A221E]">
                  {currentOrder.displayId}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] uppercase tracking-wider font-semibold bg-[#7A1C28]/10 text-[#7A1C28]">
                  {currentOrder.fulfillmentStatus}
                </span>
              </div>
              <p className="text-xs text-[#6E645A] mt-0.5">
                Carrier: <strong className="text-[#2A221E] font-medium">{tracking.carrier}</strong> • AWB:{' '}
                <span className="font-mono">{tracking.trackingNumber}</span>
              </p>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[10px] uppercase tracking-widest text-[#6E645A] block">
              Estimated Delivery
            </span>
            <p className="font-hero text-base sm:text-lg font-semibold text-[#7A1C28] mt-0.5">
              {tracking.estimatedDelivery || 'In Progress'}
            </p>
          </div>
        </div>

        {/* ELEGANT TIMELINE VISUALIZER */}
        <div className="space-y-6">
          <h3 className="text-xs uppercase tracking-widest font-semibold text-[#6E645A]">
            Commission Journey Stages
          </h3>

          <div className="relative pl-6 sm:pl-8 space-y-8 before:absolute before:left-[15px] sm:before:left-[19px] before:top-3 before:bottom-3 before:w-0.5 before:bg-[#E8DFD5]">
            {tracking.checkpoints.map((cp, idx) => {
              const isDone = cp.completed;
              const isCurrent = cp.current;

              return (
                <motion.div
                  key={cp.stage}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05, duration: 0.3 }}
                  className="relative flex items-start gap-4"
                >
                  {/* Stage Node Icon */}
                  <div
                    className={`absolute -left-[24px] sm:-left-[28px] top-0.5 w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                      isDone
                        ? isCurrent
                          ? 'bg-[#7A1C28] text-[#FAF7F2] ring-4 ring-[#7A1C28]/20 shadow-xs'
                          : 'bg-[#7A1C28] text-[#FAF7F2]'
                        : 'bg-[#FFFDFC] border-2 border-[#E8DFD5] text-transparent'
                    }`}
                  >
                    {isDone ? (
                      <CheckCircle2 className="w-3.5 h-3.5 stroke-[2.5]" />
                    ) : (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#E8DFD5]" />
                    )}
                  </div>

                  {/* Stage Text */}
                  <div
                    className={`flex-1 p-4 rounded-xl transition-all ${
                      isCurrent
                        ? 'bg-[#FAF7F2] border border-[#C89D5C]/60 shadow-2xs'
                        : isDone
                        ? 'bg-[#FFFDFC] border border-[#E8DFD5]'
                        : 'opacity-50'
                    }`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <h4
                          className={`font-hero text-sm font-semibold uppercase tracking-wider ${
                            isCurrent ? 'text-[#7A1C28]' : 'text-[#2A221E]'
                          }`}
                        >
                          {cp.title}
                        </h4>
                        {isCurrent && (
                          <span className="px-2 py-0.5 rounded-full text-[9px] uppercase tracking-widest font-semibold bg-[#7A1C28] text-[#FAF7F2]">
                            Active Stage
                          </span>
                        )}
                      </div>

                      {cp.timestamp && (
                        <span className="text-[10px] text-[#6E645A] font-medium">
                          {cp.timestamp.includes('T')
                            ? new Date(cp.timestamp).toLocaleDateString('en-IN', {
                                day: 'numeric',
                                month: 'short',
                                hour: '2-digit',
                                minute: '2-digit',
                              })
                            : cp.timestamp}
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-[#6E645A] font-light mt-1 leading-relaxed">
                      {cp.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Saree & Shipping Details Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-[#E8DFD5]">
          {/* Saree Info */}
          <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#E8DFD5] flex items-center gap-4">
            {items[0]?.image && (
              <div className="relative w-16 h-20 rounded-lg overflow-hidden bg-[#FFFDFC] border border-[#E8DFD5] shrink-0">
                <Image
                  src={items[0].image}
                  alt={items[0].name}
                  fill
                  className="object-contain p-1"
                />
              </div>
            )}
            <div className="flex-1 min-w-0 text-xs">
              <span className="text-[10px] uppercase tracking-widest text-[#6E645A]">Piece in Transit</span>
              <h5 className="font-hero font-medium text-sm text-[#2A221E] truncate mt-0.5">
                {items[0]?.name}
              </h5>
              <p className="text-[#7A1C28] font-semibold mt-1">
                ₹{currentOrder.total.toLocaleString('en-IN')}
              </p>
            </div>
          </div>

          {/* Delivery Destination */}
          <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#E8DFD5] text-xs">
            <div className="flex items-center gap-1.5 text-[#7A1C28] font-semibold uppercase tracking-wider mb-1">
              <MapPin className="w-3.5 h-3.5" />
              <span>Destination Address</span>
            </div>
            <p className="font-medium text-[#2A221E]">{shippingAddress.recipientName}</p>
            <p className="text-[#6E645A] truncate mt-0.5">
              {shippingAddress.addressLine1}, {shippingAddress.city} {shippingAddress.pincode}
            </p>
            <p className="text-[#6E645A] mt-0.5">Phone: {shippingAddress.phone}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
