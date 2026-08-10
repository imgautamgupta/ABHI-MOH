'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export const BrandStatement: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Animate the gold line drawing from 0% to 100% width as the section scrolls into view
  const lineWidth = useTransform(scrollYProgress, [0.1, 0.5], ["0%", "100%"]);
  const textOpacity = useTransform(scrollYProgress, [0.15, 0.35], [0, 1]);
  const textY = useTransform(scrollYProgress, [0.15, 0.35], [40, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-28 md:py-40 bg-[#0A0A0A] text-[#F5EFE7] font-satoshi overflow-hidden"
    >
      {/* Ambient warm glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(194,159,98,0.06)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-8 md:px-16 text-center relative z-10">

        {/* Top decorative line — animates on scroll */}
        <div className="flex items-center justify-center mb-12">
          <motion.div
            style={{ width: lineWidth }}
            className="h-[1px] bg-gradient-to-r from-transparent via-[#C29F62] to-transparent"
          />
        </div>

        {/* Quote text */}
        <motion.div style={{ opacity: textOpacity, y: textY }}>
          <span className="text-[10px] md:text-[11px] uppercase tracking-[0.4em] text-[#C29F62]/70 font-medium block mb-6">
            OUR PHILOSOPHY
          </span>

          <blockquote className="font-hero text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-[400] tracking-[0.04em] leading-[1.2] text-[#F5EFE7]">
            <span className="text-[#C29F62]">&ldquo;</span>
            Every thread carries a{' '}
            <span className="italic text-[#D9C7A7]">legacy</span>,{' '}
            every weave tells a{' '}
            <span className="italic text-[#D9C7A7]">story</span>.
            <span className="text-[#C29F62]">&rdquo;</span>
          </blockquote>

          <p className="font-sans text-xs md:text-sm font-light text-[#F5EFE7]/40 mt-8 tracking-[0.15em] uppercase">
            — The Artisans of ABHI-MOH
          </p>
        </motion.div>

        {/* Bottom decorative line */}
        <div className="flex items-center justify-center mt-12">
          <motion.div
            style={{ width: lineWidth }}
            className="h-[1px] bg-gradient-to-r from-transparent via-[#C29F62] to-transparent"
          />
        </div>

      </div>
    </section>
  );
};

BrandStatement.displayName = 'BrandStatement';
