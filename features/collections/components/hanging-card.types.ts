export type BadgeType = 'Handwoven' | 'New Arrival' | 'Limited Edition' | 'Royal Heritage' | 'Masterpiece';

export interface SareeProduct {
  id: string;
  name: string;
  slug?: string;              // Wix product slug — used for detail page navigation
  material: string;           // Craft/fabric description (maps from Wix description)
  price: string;              // Formatted price string e.g. "₹24,999"
  priceNumber: number;        // Numeric price for sorting/calculations
  discountedPrice?: string;   // Formatted discounted price when Wix applies a discount
  originalPrice?: string;     // Original (full) price string when a discount is active
  images: string[];
  badges?: BadgeType[];
  isFavorite?: boolean;
  inStock?: boolean;          // From Wix inventory — undefined means assume in-stock (for static mock)
  category?: 'ALL' | 'NEW ARRIVALS' | 'HANDWOVEN' | 'SILK' | 'ZARI' | 'FESTIVE' | 'LIMITED EDITION';
  createdAt?: string;
}

