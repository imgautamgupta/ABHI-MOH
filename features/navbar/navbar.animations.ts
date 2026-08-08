import { Variants, Transition } from 'framer-motion';
import { EASING_SILK } from '@/lib/animations';



export const TRANSITION_NAV: Transition = {
  type: 'tween',
  ease: EASING_SILK,
  duration: 0.35,
};

// Active Indicator Underline (Animates 2px maroon line from center outward)
export const ACTIVE_LINE_VARIANTS: Variants = {
  hidden: {
    scaleX: 0,
    opacity: 0,
  },
  visible: {
    scaleX: 1,
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: EASING_SILK,
    },
  },
};

// Mobile Drawer Overlay Fade
export const DRAWER_OVERLAY_VARIANTS: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.3 },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.25 },
  },
};

// Mobile Drawer Slide From Left
export const DRAWER_PANEL_VARIANTS: Variants = {
  hidden: { x: '-100%' },
  visible: {
    x: '0%',
    transition: {
      type: 'tween',
      ease: EASING_SILK,
      duration: 0.4,
    },
  },
  exit: {
    x: '-100%',
    transition: {
      type: 'tween',
      ease: [0.3, 0, 0.8, 0.15],
      duration: 0.3,
    },
  },
};
