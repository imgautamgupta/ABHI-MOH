import { Variants } from 'framer-motion';

// Stagger Container for Social Links
export const FOOTER_SOCIAL_CONTAINER: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

// Social Link Entry Animation
export const FOOTER_SOCIAL_ITEM: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 1, 0.5, 1],
    },
  },
};

// Tagline Reveal Variant (Animates smoothly after wordmark reveal)
export const TAGLINE_REVEAL_VARIANTS: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay: 0.6, // Staggered reveal after wordmark rises
      ease: [0.25, 1, 0.5, 1],
    },
  },
};
