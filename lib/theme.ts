/**
 * ABHI-MOH Global Luxury Design System Tokens
 * Palette: Ivory Linen, Silk White & Royal Velvet Maroon
 */

export const COLOR_TOKENS = {
  background: {
    primary: '#F8F4EF',    // Ivory Cream
    secondary: '#F3ECE3',  // Warm Linen
    surface: '#FFFDFC',    // Pure Silk White
    elevated: '#FFFFFF',   // Pure White
  },
  brand: {
    maroon: '#6B0F1A',     // Royal Velvet Maroon
    darkMaroon: '#8C1C2A', // Dark Maroon
    gold: '#C8A96A',       // Antique Warm Gold
  },
  text: {
    primary: '#1F1A17',    // Deep Espresso/Charcoal
    secondary: '#6A625A',  // Muted Warm Taupe
    muted: '#9E948A',      // Soft Subtitle
  },
  border: {
    subtle: '#DDD3C8',     // Subtle Linen Border
    medium: '#C8BDBC',     // Warm Border
    maroon: 'rgba(107, 15, 26, 0.25)',
  },
} as const;

export const GLASS_TOKENS = {
  ivory: 'bg-[#F8F4EF]/85 backdrop-blur-[20px] border border-[#DDD3C8]/60 shadow-sm',
  card: 'bg-[#FFFDFC]/90 backdrop-blur-[16px] border border-[#DDD3C8]/70 shadow-sm',
  maroon: 'bg-[#6B0F1A]/90 backdrop-blur-[20px] text-[#F8F4EF]',
} as const;
