import { Variants } from 'framer-motion';
import { EASING_SILK } from '@/lib/animations';

// Slide-down panel entry animation (300ms, Scale + Fade)
export const ACCOUNT_PANEL_VARIANTS: Variants = {
  initial: {
    opacity: 0,
    scale: 0.96,
    y: -8,
  },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: EASING_SILK,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.96,
    y: -8,
    transition: {
      duration: 0.25,
      ease: EASING_SILK,
    },
  },
};

// Tab Form Switch Cross-Fade
export const FORM_TAB_VARIANTS: Variants = {
  initial: { opacity: 0, y: 6 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.25,
      ease: EASING_SILK,
    },
  },
  exit: {
    opacity: 0,
    y: -6,
    transition: {
      duration: 0.2,
      ease: EASING_SILK,
    },
  },
};
