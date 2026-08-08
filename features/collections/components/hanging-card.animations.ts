import { Variants, Transition } from 'framer-motion';
import { EASING_SILK } from '@/lib/animations';

// 1-Degree Hanger Sway Animation
export const HANGER_SWAY_VARIANTS: Variants = {
  initial: { rotate: 0 },
  hover: {
    rotate: [0, 1, -0.5, 0],
    transition: {
      duration: 1.2,
  ease: EASING_SILK,
    },
  },
};

// Heart Pop Fill Animation (300ms)
export const HEART_POP_VARIANTS: Variants = {
  idle: { scale: 1 },
  pop: {
    scale: [1, 1.15, 1],
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
};

// Image Pure Opacity Cross-Fade (300ms)
export const IMAGE_CROSS_FADE: Variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.3,
  ease: EASING_SILK,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.3,
  ease: EASING_SILK,
    },
  },
};

export const CARD_LIFT_TRANSITION: Transition = {
  duration: 0.35,
  ease: EASING_SILK,
};
