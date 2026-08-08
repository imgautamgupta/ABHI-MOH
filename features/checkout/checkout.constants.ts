import { GiftBoxOption, RibbonOption } from './checkout.types';

export const CHECKOUT_STEPS_LIST = [
  { step: 1 as const, label: 'Information' },
  { step: 2 as const, label: 'Delivery' },
  { step: 3 as const, label: 'Gift Experience' },
  { step: 4 as const, label: 'Review' },
];

export const GIFT_BOX_OPTIONS: GiftBoxOption[] = [
  {
    id: 'metallic-box',
    title: 'Metallic Gift Box',
    description: 'Luxury silver finish with embossed gold foil logo',
    priceNumber: 499,
    priceFormatted: '₹499',
    badge: 'Popular',
  },
  {
    id: 'signature-slider',
    title: 'Signature Slider Box',
    description: 'Premium sliding boutique box with satin ribbon pull',
    priceNumber: 699,
    priceFormatted: '₹699',
    badge: 'Signature',
  },
  {
    id: 'magnetic-box',
    title: 'Magnetic Box',
    description: 'Luxury rigid box with concealed magnetic snap closure',
    priceNumber: 899,
    priceFormatted: '₹899',
  },
  {
    id: 'fabric-heritage',
    title: 'Fabric Heritage Box',
    description: 'Luxury reusable silk fabric box with zardozi trim',
    priceNumber: 1199,
    priceFormatted: '₹1,199',
    badge: 'Haute Couture',
  },
];

export const RIBBON_OPTIONS: RibbonOption[] = [
  { id: 'maroon', label: 'Maroon', hex: '#5E0006' },
  { id: 'ivory', label: 'Ivory', hex: '#EED9B9' },
  { id: 'emerald', label: 'Emerald', hex: '#043927' },
  { id: 'black-satin', label: 'Black Satin', hex: '#111111' },
];
