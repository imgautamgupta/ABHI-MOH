export type CheckoutStep = 1 | 2 | 3 | 4;

export type DeliveryMode = 'normal' | 'gift';

export interface GiftBoxOption {
  id: string;
  title: string;
  description: string;
  priceNumber: number;
  priceFormatted: string;
  badge?: string;
}

export interface RibbonOption {
  id: string;
  label: string;
  hex: string;
}

export interface InformationData {
  fullName: string;
  phoneNumber: string;
  email: string;
}

export interface DeliveryData {
  address: string;
  state: string;
  city: string;
  pincode: string;
  deliveryMode: DeliveryMode;
}

export interface GiftExperienceData {
  selectedBoxId: string;
  giftMessage: string;
  selectedRibbonId: string;
}
