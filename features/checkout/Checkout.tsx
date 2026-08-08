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
import { CheckCircle2, ShieldCheck, Edit3 } from 'lucide-react';

export const Checkout: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<CheckoutStep>(1);

  const [info, setInfo] = useState<InformationData>({
    fullName: 'Princess Gayatri Devi',
    phoneNumber: '+91 98765 43210',
    email: 'gayatri@abhi-moh.com',
  });

  const [delivery, setDelivery] = useState<DeliveryData>({
    address: 'Maison Residence, 42 Royal Palace Avenue',
    city: 'Jaipur',
    state: 'Rajasthan',
    pincode: '302001',
    deliveryMode: 'gift',
  });

  const [gift, setGift] = useState<GiftExperienceData>({
    selectedBoxId: 'signature-slider',
    giftMessage: 'With endless love and elegance on your special celebration.',
    selectedRibbonId: 'maroon',
  });

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
    alert('✨ ABHI-MOH Luxury Checkout Complete! Order placed successfully.');
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

      {/* STEPPER PROGRESS BAR */}
      <Stepper currentStep={currentStep} onStepClick={(step) => setCurrentStep(step)} />

      {/* MAIN CHECKOUT GRID (LEFT: STEP FORM | RIGHT: ORDER SUMMARY) */}
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
    </div>
  );
};

Checkout.displayName = 'Checkout';
