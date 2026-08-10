'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { ChapterSpread } from '../lookbook.types';
import { cn } from '@/lib/utils';

export interface EditorialSpreadProps {
  spread: ChapterSpread;
}

export const EditorialSpread: React.FC<EditorialSpreadProps> = ({ spread }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isDark = spread.theme === 'DARK';

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Subtle image parallax
  const imageY = useTransform(scrollYProgress, [0, 1], [0, -30]);

  const isRightImage = spread.imagePosition === 'RIGHT';

  return (
    <section
      id={spread.id}
      ref={containerRef}
      className={cn(
        'w-full py-20 lg:py-32 px-6 sm:px-12 lg:px-20 font-satoshi overflow-hidden transition-colors duration-700',
        isDark ? 'bg-[#2A090D] text-[#F1E4CF]' : 'bg-[#FAF7F2] text-[#382C26]'
      )}
    >
      <div className="max-w-[1600px] mx-auto">
        <div
          className={cn(
            'flex flex-col lg:flex-row items-center gap-12 lg:gap-20',
            isRightImage && 'lg:flex-row-reverse'
          )}
        >
          {/* IMAGE COLUMN (OCCUPIES 60–65% VIEWPORT WIDTH) */}
          <div className="w-full lg:w-[62%] relative">
            <motion.div
              style={{ y: imageY }}
              initial={{ opacity: 0, scale: 1.04 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.9, ease: [0.25, 1, 0.5, 1] }}
              className={cn(
                'relative w-full aspect-[4/5] max-h-[720px] rounded-sm overflow-hidden border shadow-lg',
                isDark ? 'border-[#C7A66A]/20 bg-[#1A0406]' : 'border-[#D9C7A7]/40 bg-[#FAF7F2]'
              )}
            >
              <Image
                src={spread.image}
                alt={spread.imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 65vw"
                className="object-cover object-center"
              />
              <div
                className={cn(
                  'absolute inset-0 pointer-events-none opacity-20',
                  isDark
                    ? 'bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.6)_100%)]'
                    : 'bg-[radial-gradient(ellipse_at_center,transparent_60%,rgba(94,0,6,0.05)_100%)]'
                )}
              />
            </motion.div>
          </div>

          {/* EDITORIAL TEXT & STORY COLUMN (35–40% WIDTH) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.25, 1, 0.5, 1] }}
            className="w-full lg:w-[38%] flex flex-col items-start justify-center"
          >
            {/* Chapter Number & Tag */}
            <div className="flex items-center gap-3 mb-4">
              <span
                className={cn(
                  'text-xs uppercase tracking-[0.35em] font-semibold',
                  isDark ? 'text-[#C7A66A]' : 'text-[#7D2130]'
                )}
              >
                {spread.chapterNumber} — {spread.chapterTag}
              </span>
            </div>

            {/* Headline */}
            <h2
              className={cn(
                'font-hero text-3xl sm:text-4xl md:text-5xl uppercase tracking-[0.08em] leading-[1.1] mb-6',
                isDark ? 'text-[#F1E4CF]' : 'text-[#382C26]'
              )}
            >
              {spread.title}
            </h2>

            {/* Story Text */}
            <p
              className={cn(
                'font-sans text-xs sm:text-sm font-light leading-relaxed tracking-wide mb-8 max-w-md',
                isDark ? 'text-[#F1E4CF]/80' : 'text-[#736357]'
              )}
            >
              {spread.storyText}
            </p>

            {/* Metadata Section */}
            <div
              className={cn(
                'w-full pt-6 border-t flex flex-col gap-3 mb-8',
                isDark ? 'border-[#C7A66A]/20' : 'border-[#D9C7A7]/40'
              )}
            >
              <div className="flex items-baseline justify-between text-xs tracking-wider">
                <span className={cn('uppercase font-medium text-[10px]', isDark ? 'text-[#C7A66A]' : 'text-[#7D2130]')}>
                  CRAFT
                </span>
                <span className={cn('font-light', isDark ? 'text-[#F1E4CF]' : 'text-[#382C26]')}>
                  {spread.metadata.craft}
                </span>
              </div>
              <div className="flex items-baseline justify-between text-xs tracking-wider">
                <span className={cn('uppercase font-medium text-[10px]', isDark ? 'text-[#C7A66A]' : 'text-[#7D2130]')}>
                  LOCATION
                </span>
                <span className={cn('font-light', isDark ? 'text-[#F1E4CF]' : 'text-[#382C26]')}>
                  {spread.metadata.location}
                </span>
              </div>
              {spread.metadata.artisan && (
                <div className="flex items-baseline justify-between text-xs tracking-wider">
                  <span className={cn('uppercase font-medium text-[10px]', isDark ? 'text-[#C7A66A]' : 'text-[#7D2130]')}>
                    ARTISAN
                  </span>
                  <span className={cn('font-light', isDark ? 'text-[#F1E4CF]' : 'text-[#382C26]')}>
                    {spread.metadata.artisan}
                  </span>
                </div>
              )}
            </div>

            {/* Product Connection CTA Link */}
            <Link
              href={spread.productUrl || '/collections'}
              className={cn(
                'group inline-flex items-center gap-3 text-xs uppercase tracking-[0.2em] font-medium transition-colors duration-300',
                isDark ? 'text-[#C7A66A] hover:text-[#F1E4CF]' : 'text-[#7D2130] hover:text-[#382C26]'
              )}
            >
              <span>EXPLORE THE SAREE</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1.5" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

EditorialSpread.displayName = 'EditorialSpread';
