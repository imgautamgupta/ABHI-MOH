import { CartItemModel } from './cart.types';

export const CART_COPY = {
  headerTitle: 'Shopping Bag',
  subtotalLabel: 'Subtotal',
  shippingLabel: 'Shipping',
  shippingValue: 'Complimentary Express',
  totalLabel: 'Estimated Total',
  checkoutBtn: 'Proceed To Checkout',
  continueShoppingBtn: 'Continue Shopping',
  emptyTitle: 'Your Bag Is Empty',
  emptySubtitle: 'Explore our curated haute-couture saree collections.',
};

export const INITIAL_CART_ITEMS: CartItemModel[] = [
  {
    id: 'saree-01',
    name: 'Haute Zardozi Maroon Silk',
    material: 'Pure Kanjivaram Silk',
    color: 'Royal Maroon & Gold',
    priceNumber: 24999,
    priceFormatted: '₹24,999',
    imageSrc: '/assets/sarees/saree-maroon.png',
    quantity: 1,
  },
  {
    id: 'saree-02',
    name: 'Heritage Imperial Gold Brocade',
    material: 'Pure Chanderi Tissue Silk',
    color: 'Imperial Gold',
    priceNumber: 18500,
    priceFormatted: '₹18,500',
    imageSrc: '/assets/sarees/saree-gold.png',
    quantity: 1,
  },
];
