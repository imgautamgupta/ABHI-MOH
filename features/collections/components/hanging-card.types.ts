export type BadgeType =
  | 'Handwoven'
  | 'New Arrival'
  | 'Limited Edition'
  | 'Royal Heritage'
  | 'Masterpiece'
  | 'Sale'
  | 'Special Edition';

export interface AdditionalInfoSection {
  title: string;
  description: string;
}

export interface SareeProduct {
  id: string;
  name: string;
  slug?: string;              // Wix product slug — used for detail page navigation
  description?: string;       // Complete rich-text or plain-text description from Wix
  descriptionHtml?: string;   // Full HTML description from Wix for rich rendering
  plainDescription?: string;  // Plain-text version of description
  material: string;           // Craft/fabric short excerpt for compact cards
  price: string;              // Formatted price string e.g. "₹24,999"
  priceNumber: number;        // Numeric price for sorting/calculations
  discountedPrice?: string;   // Formatted discounted price when Wix applies a discount
  originalPrice?: string;     // Original (full) price string when a discount is active
  images: string[];
  badges?: BadgeType[];
  isFavorite?: boolean;
  inStock?: boolean;          // From Wix inventory — undefined means assume in-stock (for static mock)
  category?: 'ALL' | 'NEW ARRIVALS' | 'HANDWOVEN' | 'SILK' | 'ZARI' | 'FESTIVE' | 'LIMITED EDITION';
  origin?: string;            // Origin craft cluster (e.g. Varanasi, Chanderi, Kanchipuram)
  weave?: string;             // Weave technique (e.g. Handloom Kadhwa, Zari Brocade)
  sareeLength?: string;       // Saree length (e.g. 5.5 Meters)
  blousePiece?: string;       // Blouse piece (e.g. 0.8 Meters Included)
  care?: string;              // Care recommendations
  additionalInfo?: AdditionalInfoSection[];
  createdAt?: string;
}

