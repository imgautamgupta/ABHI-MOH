export type BadgeType = 'Handwoven' | 'New Arrival' | 'Limited Edition' | 'Royal Heritage' | 'Masterpiece';

export interface SareeProduct {
  id: string;
  name: string;
  material: string;
  price: string;
  priceNumber: number;
  images: string[];
  badges?: BadgeType[];
  isFavorite?: boolean;
  category?: 'ALL' | 'NEW ARRIVALS' | 'HANDWOVEN' | 'SILK' | 'ZARI' | 'FESTIVE' | 'LIMITED EDITION';
  createdAt?: string;
}

