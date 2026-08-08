import { Variants, Transition } from 'framer-motion';

// Staggered Container for Hero Text Elements (100ms delay each)
export const HERO_CONTAINER_VARIANTS: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1, // 100ms Stagger
      delayChildren: 0.1,
    },
  },
};

// Item Fade Up (Brand -> Tagline -> Paragraph -> Button)
export const HERO_ITEM_FADE_UP: Variants = {
  hidden: {
    opacity: 0,
    y: 15,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 1, 0.5, 1], // Smooth silk ease
    },
  },
};

// Saree Pure Silk Cross-Dissolve (No Slide, No Zoom, No Flip, No Rotation)
export const SAREE_CROSS_DISSOLVE: Variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 1.2,
      ease: [0.25, 1, 0.5, 1],
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 1.2,
      ease: [0.25, 1, 0.5, 1],
    },
  },
};

export const BUTTON_HOVER_TRANSITION: Transition = {
  duration: 0.3,
  ease: [0.25, 1, 0.5, 1],
};
