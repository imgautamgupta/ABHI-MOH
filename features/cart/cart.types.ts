export interface CartItemModel {
  id: string;
  name: string;
  material: string;
  color: string;
  priceNumber: number;
  priceFormatted: string;
  imageSrc: string;
  quantity: number;
}

export interface CartContextType {
  isOpen: boolean;
  items: CartItemModel[];
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addToCart: (item: Omit<CartItemModel, 'quantity'>) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
  totalItemCount: number;
}
