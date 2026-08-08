export type BadgeType = 'Handwoven' | 'New Arrival' | 'Limited Edition';

export interface SareeProduct {
  id: string;
  name: string;
  material: string;
  price: string;
  images: string[];
  badges?: BadgeType[];
  isFavorite?: boolean;
}
