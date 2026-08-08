import { Variants } from 'framer-motion';
import { EASING_SILK } from '@/lib/animations';

// Step Transition Variant (350ms Fade + Y)
export const STEP_TRANSITION_VARIANTS: Variants = {
  initial: { opacity: 0, y: 12 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
      ease: EASING_SILK,
    },
  },
  exit: {
    opacity: 0,
    y: -12,
    transition: {
      duration: 0.25,
      ease: EASING_SILK,
    },
  },
};

// Smooth Accordion Panel Expansion
export const ACCORDION_EXPAND_VARIANTS: Variants = {
  hidden: { opacity: 0, height: 0, overflow: 'hidden' },
  visible: {
    opacity: 1,
    height: 'auto',
    overflow: 'visible',
    transition: {
      duration: 0.4,
      ease: EASING_SILK,
    },
  },
};

// Gift Card Select Pop Animation
export const CARD_SELECTION_VARIANTS: Variants = {
  idle: { scale: 1 },
  selected: {
    scale: [1, 1.02, 1],
    transition: {
      duration: 0.25,
      ease: 'easeOut',
    },
  },
};
