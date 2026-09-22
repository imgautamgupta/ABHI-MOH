'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckoutStep, InformationData, DeliveryData, GiftExperienceData } from './checkout.types';
import { Stepper } from './Stepper';
import { Information } from './Information';
import { Delivery } from './Delivery';
import { GiftExperience } from './GiftExperience';
import { OrderSummary } from './OrderSummary';
import { GIFT_BOX_OPTIONS, RIBBON_OPTIONS } from './checkout.constants';
import { STEP_TRANSITION_VARIANTS } from './checkout.animations';
import { CheckCircle2, ShieldCheck, Edit3, PartyPopper, AlertCircle, AlertTriangle, RefreshCw } from 'lucide-react';
import { useCart } from '../cart/CartContext';

// ─── Clean empty initial state constants ─────────────────────────────────────
const EMPTY_INFO: InformationData = {
  fullName: '',
  phoneNumber: '',
  email: '',
};

const EMPTY_DELIVERY: DeliveryData = {
  address: '',
  city: '',
  state: '',
  pincode: '',
  deliveryMode: 'normal',
};

const EMPTY_GIFT: GiftExperienceData = {
  selectedBoxId: '',
  giftMessage: '',
  selectedRibbonId: '',
};

const CheckoutContent: React.FC = () => {
  const searchParams = useSearchParams();
  const { items, clearCart } = useCart();
  const [currentStep, setCurrentStep] = useState<CheckoutStep>(1);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [confirmedOrderId, setConfirmedOrderId] = useState<string | null>(null);

  const [info, setInfo] = useState<InformationData>(EMPTY_INFO);
  const [delivery, setDelivery] = useState<DeliveryData>(EMPTY_DELIVERY);
  const [gift, setGift] = useState<GiftExperienceData>(EMPTY_GIFT);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [cancelNotice, setCancelNotice] = useState<string | null>(null);

  // Check URL params for callback status from payment gateway
  useEffect(() => {
    const status = searchParams.get('status');
    const orderId = searchParams.get('orderId');

    if (status === 'success' && orderId) {
      setConfirmedOrderId(orderId);
      setOrderPlaced(true);
      clearCart();
    } else if (status === 'cancelled') {
      setCancelNotice('Your checkout session was cancelled. Your items remain safely in your shopping bag.');
    }
  }, [searchParams, clearCart]);

  const isGiftMode = delivery.deliveryMode === 'gift';

  const handleNextStep = () => {
    setErrorMessage(null);
    setCancelNotice(null);

    if (currentStep === 1) {
      if (!info.fullName.trim() || !info.phoneNumber.trim() || !info.email.trim()) {
        return;
      }
      setCurrentStep(2);
    } else if (currentStep === 2) {
      if (!delivery.address.trim() || !delivery.city.trim() || !delivery.state.trim() || !delivery.pincode.trim()) {
        return;
      }
      setCurrentStep(isGiftMode ? 3 : 4);
    } else if (currentStep === 3) {
      setCurrentStep(4);
    }
  };

  const handleBackStep = () => {
    setErrorMessage(null);
    if (currentStep === 4) {
      setCurrentStep(isGiftMode ? 3 : 2);
    } else if (currentStep === 3) {
      setCurrentStep(2);
    } else if (currentStep === 2) {
      setCurrentStep(1);
    }
  };

  const handlePaymentClick = async () => {
    if (isLoading) return;
    if (items.length === 0) {
      setErrorMessage('Your shopping bag is empty. Please select a saree before placing an order.');
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);
    setCancelNotice(null);

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items,
          info,
          delivery,
          gift: isGiftMode ? gift : undefined,
        }),
      });

      const data = await response.json();

      if (data.success && data.checkoutUrl) {
        // Redirect to Wix Secure Checkout page
        window.location.href = data.checkoutUrl;
      } else if (data.success && data.checkoutId) {
        // Wix checkout created
        setConfirmedOrderId(data.checkoutId);
        setOrderPlaced(true);
        clearCart();
      } else {
        // Informative failure message
        setErrorMessage(
          data.error || 'Payment gateway is currently experiencing high demand. Please try again in a moment.'
        );
      }
    } catch (err: unknown) {
      console.error('Checkout error:', err);
      setErrorMessage('A network error occurred while connecting to the checkout service. Please verify your connection.');
    } finally {
      setIsLoading(false);
    }
  };

  const selectedBox = GIFT_BOX_OPTIONS.find((b) => b.id === gift.selectedBoxId);
  const selectedRibbon = RIBBON_OPTIONS.find((r) => r.id === gift.selectedRibbonId);

  return (
    <div className="w-full min-h-screen bg-[#FAF7F2] text-[#2A221E] pt-[90px] md:pt-[110px] pb-28 font-satoshi select-none">
      {/* ── MAIN CONTENT ────────────────────────────────────────────────────── */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-16">

        {/* CANCELLATION NOTICE */}
        {cancelNotice && (
          <div className="max-w-2xl mx-auto mb-6 p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-center gap-3 text-amber-800 text-xs">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
            <span className="flex-1">{cancelNotice}</span>
            <button
              onClick={() => setCancelNotice(null)}
              className="text-amber-700 hover:text-amber-900 font-medium ml-2 uppercase text-[10px]"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* ERROR BANNER */}
        {errorMessage && (
          <div className="max-w-2xl mx-auto mb-6 p-4 bg-[#7A1C28]/5 border border-[#7A1C28]/30 rounded-xl flex items-center gap-3 text-[#7A1C28] text-xs">
            <AlertCircle className="w-5 h-5 text-[#7A1C28] shrink-0" />
            <span className="flex-1">{errorMessage}</span>
            <button
              onClick={() => setErrorMessage(null)}
              className="text-[#7A1C28] hover:underline font-medium ml-2 uppercase text-[10px]"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* ORDER SUCCESS STATE */}
        <AnimatePresence>
          {orderPlaced && (
            <motion.div
              key="order-success"
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
              className="max-w-xl mx-auto mt-12 p-10 bg-white border border-[#E8DFD5] rounded-2xl flex flex-col items-center text-center gap-5 shadow-sm"
            >
              <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center">
                <PartyPopper className="w-8 h-8 text-emerald-600" />
              </div>
              <h2 className="font-hero text-2xl sm:text-3xl uppercase tracking-[0.14em] text-[#2A221E]">
                Order Confirmed
              </h2>
              {confirmedOrderId && (
                <span className="px-3 py-1 bg-[#FAF7F2] border border-[#E8DFD5] rounded-full text-xs font-mono text-[#7A1C28]">
                  Order ID: {confirmedOrderId}
                </span>
              )}
              <p className="font-sans text-sm text-[#736357] font-light leading-relaxed">
                Thank you for your bespoke order. Our Maison Concierge will reach out within 24 hours with your dispatch and tracking details.
              </p>
              <div className="w-12 h-[1px] bg-[#C9A96E]/50" />
              <p className="text-xs text-[#736357]/70 uppercase tracking-widest">
                A confirmation has been sent to {info.email || 'your registered email'}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* STEPPER — hidden after order placed */}
        {!orderPlaced && (
          <Stepper currentStep={currentStep} onStepClick={(step) => setCurrentStep(step)} />
        )}

        {/* MAIN CHECKOUT GRID */}
        {!orderPlaced && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 xl:gap-14 mt-6 lg:mt-8 items-start">

            {/* LEFT COLUMN: STEP FORM */}
            <div className="lg:col-span-7 bg-white border border-[#E8DFD5] rounded-2xl p-5 sm:p-8 shadow-sm">
              <AnimatePresence mode="wait">
                {currentStep === 1 && (
                  <Information
                    key="step-1"
                    data={info}
                    onChange={setInfo}
                    onNext={handleNextStep}
                  />
                )}

                {currentStep === 2 && (
                  <Delivery
                    key="step-2"
                    data={delivery}
                    onChange={setDelivery}
                    onNext={handleNextStep}
                    onBack={handleBackStep}
                  />
                )}

                {currentStep === 3 && (
                  <GiftExperience
                    key="step-3"
                    data={gift}
                    onChange={setGift}
                    onNext={handleNextStep}
                    onBack={handleBackStep}
                  />
                )}

                {currentStep === 4 && (
                  <motion.div
                    key="step-4"
                    variants={STEP_TRANSITION_VARIANTS}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="flex flex-col gap-6 text-left"
                  >
                    <div className="flex flex-col gap-1 border-b border-[#E8DFD5] pb-4">
                      <h3 className="font-hero text-xl font-[500] uppercase tracking-[0.16em] text-[#2A221E]">
                        Review Your Order
                      </h3>
                      <p className="text-xs font-light text-[#736357]">
                        Confirm your details before proceeding to payment.
                      </p>
                    </div>

                    {/* Contact & Shipping Card */}
                    <div className="p-4 sm:p-5 bg-[#FAF7F2] border border-[#E8DFD5] rounded-xl flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] uppercase tracking-widest text-[#7A1C28] font-medium flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                          Contact &amp; Shipping Address
                        </span>
                        <button
                          type="button"
                          onClick={() => setCurrentStep(1)}
                          className="text-[10px] uppercase tracking-widest text-[#736357] hover:text-[#7A1C28] flex items-center gap-1 transition-colors cursor-pointer"
                        >
                          <Edit3 className="w-3 h-3" /> Edit
                        </button>
                      </div>
                      <span className="font-medium text-[#2A221E] text-xs">{info.fullName}</span>
                      <span className="text-[#736357] text-xs">{info.email} • +91 {info.phoneNumber}</span>
                      <span className="text-[#736357] text-xs">{delivery.address}, {delivery.city}, {delivery.state} — {delivery.pincode}</span>
                    </div>

                    {/* Gift Experience Card */}
                    {isGiftMode && (
                      <div className="p-4 sm:p-5 bg-[#FAF7F2] border border-[#E8DFD5] rounded-xl flex flex-col gap-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] uppercase tracking-widest text-[#7A1C28] font-medium flex items-center gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                            Gift Experience Details
                          </span>
                          <button
                            type="button"
                            onClick={() => setCurrentStep(3)}
                            className="text-[10px] uppercase tracking-widest text-[#736357] hover:text-[#7A1C28] flex items-center gap-1 transition-colors cursor-pointer"
                          >
                            <Edit3 className="w-3 h-3" /> Edit
                          </button>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <span className="text-[#736357]">Packaging Box: <strong className="text-[#2A221E]">{selectedBox?.title || 'Standard Box'}</strong></span>
                          <span className="text-[#736357]">Ribbon Color: <strong className="text-[#2A221E]">{selectedRibbon?.label || 'Classic'}</strong></span>
                        </div>
                        {gift.giftMessage && (
                          <div className="mt-1 p-3 bg-white border border-[#E8DFD5] rounded-lg italic text-xs text-[#2A221E] font-section leading-relaxed">
                            &ldquo;{gift.giftMessage}&rdquo;
                          </div>
                        )}
                      </div>
                    )}

                    {/* Review Action Buttons */}
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mt-2">
                      <button
                        type="button"
                        disabled={isLoading}
                        onClick={handleBackStep}
                        className="sm:w-auto px-7 py-4 rounded-full border border-[#D9C7A7] hover:border-[#7A1C28] text-[#736357] hover:text-[#7A1C28] text-xs uppercase tracking-[0.18em] transition-colors cursor-pointer"
                      >
                        Back
                      </button>
                      <button
                        type="button"
                        disabled={isLoading}
                        onClick={handlePaymentClick}
                        className="flex-1 py-4 rounded-full bg-gradient-to-r from-[#8C1C2A] via-[#A32233] to-[#7A1523] text-[#FAF7F2] font-medium text-xs uppercase tracking-[0.2em] transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-[1px] cursor-pointer flex items-center justify-center gap-2"
                      >
                        {isLoading ? (
                          <RefreshCw className="w-4 h-4 text-[#E5C388] animate-spin" />
                        ) : (
                          <ShieldCheck className="w-4 h-4 text-[#E5C388]" />
                        )}
                        <span>{isLoading ? 'Connecting To Payment...' : 'Place Order'}</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* RIGHT COLUMN: ORDER SUMMARY */}
            <div className="lg:col-span-5 sticky top-28">
              <OrderSummary
                selectedBoxId={gift.selectedBoxId}
                isGiftDelivery={isGiftMode}
                currentStep={currentStep}
                isLoading={isLoading}
                onNextStep={handleNextStep}
                onPaymentClick={handlePaymentClick}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export const Checkout: React.FC = () => {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FAF7F2]" />}>
      <CheckoutContent />
    </Suspense>
  );
};

Checkout.displayName = 'Checkout';

