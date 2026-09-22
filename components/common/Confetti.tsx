'use client';

import React, { useEffect } from 'react';

interface ConfettiProps {
  /** Fire once on mount (default true) */
  fire?: boolean;
  /** Delay in ms before firing (default 200) */
  delay?: number;
}

/**
 * Fires a brand-coloured confetti burst on mount.
 * Uses canvas-confetti for zero-dependency DOM injection.
 * ABHI-MOH brand palette: burgundy, champagne, ivory, espresso.
 */
export const Confetti: React.FC<ConfettiProps> = ({ fire = true, delay = 200 }) => {
  useEffect(() => {
    if (!fire) return;

    let cancelled = false;
    const timer = setTimeout(async () => {
      if (cancelled) return;
      try {
        // Dynamically import to keep SSR safe
        const confetti = (await import('canvas-confetti')).default;

        const COLORS = ['#7D2130', '#C9A96E', '#FAF7F2', '#2A221E', '#D9C7A7', '#A32233'];

        // First burst — elegant left angle
        confetti({
          particleCount: 90,
          angle: 60,
          spread: 55,
          origin: { x: 0, y: 0.65 },
          colors: COLORS,
          gravity: 0.9,
          scalar: 1.1,
          ticks: 220,
        });

        // Second burst — right angle
        confetti({
          particleCount: 90,
          angle: 120,
          spread: 55,
          origin: { x: 1, y: 0.65 },
          colors: COLORS,
          gravity: 0.9,
          scalar: 1.1,
          ticks: 220,
        });

        // Third burst — center upward for drama
        setTimeout(() => {
          if (cancelled) return;
          confetti({
            particleCount: 60,
            angle: 90,
            spread: 70,
            origin: { x: 0.5, y: 0.75 },
            colors: COLORS,
            gravity: 0.75,
            scalar: 0.95,
            ticks: 180,
          });
        }, 350);
      } catch {
        // Silently ignore if canvas-confetti fails (SSR or blocked)
      }
    }, delay);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [fire, delay]);

  // Renders nothing — purely a side-effect component
  return null;
};

Confetti.displayName = 'Confetti';
