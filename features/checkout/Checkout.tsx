'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckoutStep, InformationData, DeliveryData, GiftExperienceData } from './checkout.types';
import { Stepper } from './Stepper';
import { Information } from './Information';
import { Delivery } from './Delivery';
import { GiftExperience } from './GiftExperience';
import { OrderSummary } from './OrderSummary';
import { GIFT_BOX_OPTIONS, RIBBON_OPTIONS } from './checkout.constants';
import { STEP_TRANSITION_VARIANTS } from './checkout.animations';
import { CheckCircle2, ShieldCheck, Edit3, PartyPopper } from 'lucide-react';
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

export const Checkout: React.FC = () => {
  const { clearCart } = useCart();
  const [currentStep, setCurrentStep] = useState<CheckoutStep>(1);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const [info, setInfo] = useState<InformationData>(EMPTY_INFO);
  const [delivery, setDelivery] = useState<DeliveryData>(EMPTY_DELIVERY);
  const [gift, setGift] = useState<GiftExperienceData>(EMPTY_GIFT);

  const isGiftMode = delivery.deliveryMode === 'gift';

  const handleNextStep = () => {
    if (currentStep === 1) {
      setCurrentStep(2);
    } else if (currentStep === 2) {
      setCurrentStep(isGiftMode ? 3 : 4);
    } else if (currentStep === 3) {
      setCurrentStep(4);
    }
  };

  const handleBackStep = () => {
    if (currentStep === 4) {
      setCurrentStep(isGiftMode ? 3 : 2);
    } else if (currentStep === 3) {
      setCurrentStep(2);
    } else if (currentStep === 2) {
      setCurrentStep(1);
    }
  };

  const handlePaymentClick = () => {
    // Clear cart on successful order. Favorites are intentionally preserved.
    clearCart();
    // Reset checkout state for next order
    setInfo(EMPTY_INFO);
    setDelivery(EMPTY_DELIVERY);
    setGift(EMPTY_GIFT);
    setCurrentStep(1);
    setOrderPlaced(true);
  };

  const selectedBox = GIFT_BOX_OPTIONS.find((b) => b.id === gift.selectedBoxId);
  const selectedRibbon = RIBBON_OPTIONS.find((r) => r.id === gift.selectedRibbonId);

  return (
    <div className="w-full bg-[#14090C] text-[#F6ECE1] min-h-screen pt-[110px] lg:pt-[140px] pb-32 px-6 lg:px-16 max-w-[1920px] mx-auto font-satoshi select-none">
      {/* HEADER TITLE */}
      <div className="flex flex-col items-center justify-center text-center my-6">
        <h1 className="font-hero text-3xl sm:text-4xl md:text-5xl font-[500] tracking-[0.18em] uppercase text-[#F6ECE1]">
          Maison Checkout
        </h1>
        <p className="mt-2 font-section text-lg sm:text-xl italic font-light tracking-wide text-[#E5C388]">
          The Essence of Elegance • Bespoke Order Review
        </p>
      </div>

      {/* ORDER SUCCESS STATE */}
      <AnimatePresence>
        {orderPlaced && (
          <motion.div
            key="order-success"
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
            className="max-w-xl mx-auto mt-12 p-10 bg-[#1F0A10] border border-[#C89D5C]/30 rounded-xl flex flex-col items-center text-center gap-5"
          >
            <div className="w-16 h-16 rounded-full bg-emerald-900/40 border border-emerald-400/30 flex items-center justify-center">
              <PartyPopper className="w-8 h-8 text-emerald-400" />
            </div>
            <h2 className="font-hero text-2xl sm:text-3xl uppercase tracking-[0.14em] text-[#E5C388]">
              Order Confirmed
            </h2>
            <p className="font-sans text-sm text-[#D0BEAB] font-light leading-relaxed">
              Thank you for your bespoke order. Our Maison Concierge will reach out within 24 hours with your shipping details.
            </p>
            <div className="w-12 h-[1px] bg-[#C89D5C]/40" />
            <p className="text-xs text-[#D0BEAB]/60 uppercase tracking-widest">
              A confirmation has been sent to {info.email || 'your registered email'}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* STEPPER PROGRESS BAR — hidden after order placed */}
      {!orderPlaced && (
        <Stepper currentStep={currentStep} onStepClick={(step) => setCurrentStep(step)} />
      )}

      {/* MAIN CHECKOUT GRID (LEFT: STEP FORM | RIGHT: ORDER SUMMARY) */}
      {!orderPlaced && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 mt-10 items-start">
          {/* LEFT COLUMN: ACTIVE STEP FORM */}
          <div className="lg:col-span-7 bg-[#230C14]/85 backdrop-blur-[16px] border border-[#C89D5C]/30 rounded-lg p-6 sm:p-10 shadow-2xl text-[#F6ECE1]">
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
                  <div className="flex flex-col gap-1 border-b border-[#C89D5C]/25 pb-3">
                    <h3 className="font-hero text-xl font-[500] uppercase tracking-[0.16em] text-[#E5C388]">
                      Step 4: Final Order Review
                    </h3>
                    <p className="font-sans text-xs font-light text-[#D0BEAB]">
                      Review your shipping address, gift instructions, and complete your order.
                    </p>
                  </div>

                  {/* Info Card */}
                  <div className="p-4 bg-[#1F0A10] border border-[#C89D5C]/30 rounded-md flex flex-col gap-2 relative">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] uppercase tracking-widest text-[#E5C388] font-medium flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        Contact & Shipping Address
                      </span>
                      <button
                        type="button"
                        onClick={() => setCurrentStep(1)}
                        className="text-[10px] uppercase tracking-widest text-[#D0BEAB] hover:text-[#E5C388] flex items-center gap-1"
                      >
                        <Edit3 className="w-3 h-3" /> Edit
                      </button>
                    </div>
                    <span className="font-medium text-[#F6ECE1] text-xs">{info.fullName}</span>
                    <span className="text-[#D0BEAB] text-xs">{info.email} • {info.phoneNumber}</span>
                    <span className="text-[#D0BEAB] text-xs">{delivery.address}, {delivery.city}, {delivery.state} - {delivery.pincode}</span>
                  </div>

                  {/* Gift Experience Summary Card */}
                  {isGiftMode && (
                    <div className="p-4 bg-[#1F0A10] border border-[#C89D5C]/30 rounded-md flex flex-col gap-2 relative">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] uppercase tracking-widest text-[#E5C388] font-medium flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                          Gift Experience Details
                        </span>
                        <button
                          type="button"
                          onClick={() => setCurrentStep(3)}
                          className="text-[10px] uppercase tracking-widest text-[#D0BEAB] hover:text-[#E5C388] flex items-center gap-1"
                        >
                          <Edit3 className="w-3 h-3" /> Edit
                        </button>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <span className="text-[#D0BEAB]">Packaging Box: <strong className="text-[#F6ECE1]">{selectedBox?.title}</strong></span>
                        <span className="text-[#D0BEAB]">Ribbon Color: <strong className="text-[#F6ECE1]">{selectedRibbon?.label}</strong></span>
                      </div>
                      {gift.giftMessage && (
                        <div className="mt-1 p-3 bg-[#17080C] border border-[#C89D5C]/25 rounded-sm italic text-xs text-[#F6ECE1] font-section">
                          &quot;{gift.giftMessage}&quot;
                        </div>
                      )}
                    </div>
                  )}

                  {/* Buttons */}
                  <div className="flex items-center justify-between gap-4 mt-2">
                    <button
                      type="button"
                      onClick={handleBackStep}
                      className="py-3.5 px-6 rounded-full border border-[#C89D5C]/30 hover:border-[#C89D5C] text-[#D0BEAB] hover:text-[#E5C388] text-xs uppercase tracking-[0.18em] transition-colors cursor-pointer"
                    >
                      Back
                    </button>

                    <button
                      type="button"
                      onClick={handlePaymentClick}
                      className="flex-1 py-4 rounded-full bg-gradient-to-r from-[#8C1C2A] via-[#A32233] to-[#7A1523] text-[#F6ECE1] border border-[#C89D5C]/35 hover:border-[#C89D5C]/70 font-medium text-xs uppercase tracking-[0.2em] transition-all duration-300 ease-silk shadow-lg hover:shadow-xl cursor-pointer flex items-center justify-center gap-2"
                    >
                      <ShieldCheck className="w-4 h-4 text-[#E5C388]" />
                      <span>Complete Order</span>
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
              onPaymentClick={handlePaymentClick}
            />
          </div>
        </div>
      )}
    </div>
  );
};

Checkout.displayName = 'Checkout';
