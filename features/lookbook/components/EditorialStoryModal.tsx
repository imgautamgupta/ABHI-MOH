'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, Sparkles, ShieldCheck, MapPin, Feather } from 'lucide-react';
import { EditorialStory } from '../lookbook.types';
import { cn } from '@/lib/utils';

export interface EditorialStoryModalProps {
  story: EditorialStory | null;
  onClose: () => void;
}

export const EditorialStoryModal: React.FC<EditorialStoryModalProps> = ({ story, onClose }) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Close on Escape key
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (story) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [story, onClose]);

  if (!story) return null;

  const galleryImages = [
    story.mainImage,
    ...(story.secondaryImage ? [story.secondaryImage] : []),
    ...(story.detailImage ? [story.detailImage] : []),
  ];

  const currentImage = galleryImages[activeImageIndex] || galleryImages[0];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 lg:p-10 font-satoshi">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#2A221E]/80 backdrop-blur-md z-40 cursor-pointer"
          aria-hidden="true"
        />

        {/* Modal Container */}
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={story.headline}
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
          className="relative z-50 w-full max-w-5xl max-h-[90vh] bg-[#FAF7F2] border border-[#D9C7A7]/60 rounded-sm shadow-2xl overflow-y-auto no-scrollbar flex flex-col text-[#382C26]"
        >
          {/* TOP BAR */}
          <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#D9C7A7]/40">
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#7D2130]">
                EDITION {story.editionNumber}
              </span>
              <span className="text-[#D9C7A7]">•</span>
              <span className="font-hero text-sm uppercase tracking-[0.1em] text-[#382C26]">
                {story.category}
              </span>
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close story"
              className="p-2 rounded-full hover:bg-[#7D2130]/10 text-[#382C26] hover:text-[#7D2130] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* MODAL CONTENT BODY */}
          <div className="p-6 sm:p-10 flex flex-col gap-10">
            {/* 1. HERO SPREAD */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* IMAGE SHOWCASE (7 cols) */}
              <div className="lg:col-span-7 flex flex-col gap-3">
                <div className="relative w-full aspect-[4/5] bg-[#EADFCF]/40 rounded-sm overflow-hidden border border-[#D9C7A7]/40 shadow-sm flex items-center justify-center p-3">
                  <Image
                    src={currentImage.src}
                    alt={currentImage.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-contain object-center"
                  />
                  {currentImage.caption && (
                    <div className="absolute bottom-3 inset-x-3 bg-[#FAF7F2]/90 backdrop-blur-md p-2 rounded-xs border border-[#D9C7A7]/40 text-[10px] text-[#736357] text-center font-light tracking-wide">
                      {currentImage.caption}
                    </div>
                  )}
                </div>

                {/* Thumbnails */}
                {galleryImages.length > 1 && (
                  <div className="flex gap-2.5 overflow-x-auto no-scrollbar pb-1">
                    {galleryImages.map((img, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setActiveImageIndex(idx)}
                        className={cn(
                          'relative w-16 h-20 rounded-xs overflow-hidden border p-1 bg-[#FAF7F2] transition-all cursor-pointer flex-shrink-0',
                          idx === activeImageIndex
                            ? 'border-[#7D2130] ring-1 ring-[#7D2130]'
                            : 'border-[#D9C7A7]/40 opacity-70 hover:opacity-100'
                        )}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={img.src} alt={img.alt} className="w-full h-full object-contain" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* STORY TEXT & PROSE (5 cols) */}
              <div className="lg:col-span-5 flex flex-col gap-5">
                <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-[#7D2130]">
                  {story.tagline}
                </span>

                <h2 className="font-hero text-2xl sm:text-3xl lg:text-4xl uppercase tracking-[0.06em] text-[#382C26] leading-tight">
                  {story.headline}
                </h2>

                {story.quote && (
                  <blockquote className="pl-4 border-l-2 border-[#7D2130] italic font-hero text-sm sm:text-base text-[#7D2130]/90 leading-relaxed my-1">
                    &ldquo;{story.quote}&rdquo;
                  </blockquote>
                )}

                <div className="flex flex-col gap-3 text-xs sm:text-sm font-light text-[#5c4d44] leading-relaxed">
                  {story.storyBody.map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                  ))}
                </div>

                {/* Metadata Pill Table */}
                <div className="p-4 bg-[#FAF7F2] border border-[#D9C7A7]/40 rounded-xs flex flex-col gap-2.5 mt-2">
                  <div className="flex items-center gap-2 text-xs">
                    <Feather className="w-3.5 h-3.5 text-[#7D2130]" />
                    <span className="text-[10px] uppercase tracking-wider text-[#736357] font-medium w-20">
                      Craft:
                    </span>
                    <span className="font-medium text-[#382C26]">{story.metadata.craft}</span>
                  </div>

                  <div className="flex items-center gap-2 text-xs">
                    <MapPin className="w-3.5 h-3.5 text-[#7D2130]" />
                    <span className="text-[10px] uppercase tracking-wider text-[#736357] font-medium w-20">
                      Origin:
                    </span>
                    <span className="font-medium text-[#382C26]">{story.metadata.origin}</span>
                  </div>

                  <div className="flex items-center gap-2 text-xs">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#7D2130]" />
                    <span className="text-[10px] uppercase tracking-wider text-[#736357] font-medium w-20">
                      Technique:
                    </span>
                    <span className="font-medium text-[#382C26]">{story.metadata.technique}</span>
                  </div>

                  <div className="flex items-center gap-2 text-xs">
                    <Sparkles className="w-3.5 h-3.5 text-[#7D2130]" />
                    <span className="text-[10px] uppercase tracking-wider text-[#736357] font-medium w-20">
                      Palette:
                    </span>
                    <span className="font-medium text-[#382C26]">{story.metadata.palette}</span>
                  </div>
                </div>

                {/* Direct link to collections */}
                <Link
                  href="/collections"
                  onClick={onClose}
                  className="mt-3 inline-flex items-center justify-center gap-3 py-3.5 px-6 bg-[#7D2130] hover:bg-[#5E1522] text-[#FAF7F2] text-xs uppercase tracking-[0.2em] font-medium rounded-xs transition-colors shadow-sm"
                >
                  <span>Explore Haute Couture Sarees</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* 2. LOOK BREAKDOWN IF AVAILABLE */}
            {story.looks && story.looks.length > 0 && (
              <div className="pt-8 border-t border-[#D9C7A7]/40 flex flex-col gap-6">
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-[#7D2130]">
                    CURATED LOOKBOOK BREAKDOWN
                  </span>
                  <h3 className="font-hero text-xl sm:text-2xl uppercase tracking-[0.08em] text-[#382C26] mt-1">
                    Atelier Styling & Drape Notes
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {story.looks.map((look, idx) => (
                    <div
                      key={idx}
                      className="p-5 border border-[#D9C7A7]/40 rounded-xs bg-[#FAF7F2] flex flex-col gap-3 shadow-2xs"
                    >
                      <div className="flex items-baseline justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-[#7D2130]">
                          {look.lookNumber}
                        </span>
                        <span className="text-[10px] uppercase tracking-wider text-[#736357]">
                          {look.drapeStyle}
                        </span>
                      </div>
                      <h4 className="font-hero text-lg font-medium text-[#382C26]">
                        {look.lookName}
                      </h4>
                      <p className="text-xs font-light text-[#5c4d44] leading-relaxed">
                        {look.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

EditorialStoryModal.displayName = 'EditorialStoryModal';
