export type MembershipTier = 'REGULAR' | 'SILVER' | 'GOLD';

export type OrderPaymentStatus = 'PAID' | 'PENDING' | 'FAILED' | 'REFUNDED';
export type OrderFulfillmentStatus = 'PENDING' | 'PREPARING' | 'DISPATCHED' | 'DELIVERED' | 'CANCELLED';
export type OrderReturnStatus = 'NONE' | 'ELIGIBLE' | 'RETURN_REQUESTED' | 'EXCHANGE_REQUESTED' | 'RETURNED' | 'EXCHANGED' | 'WINDOW_EXPIRED';

export type TrackingStageId =
  | 'ORDER_CONFIRMED'
  | 'PAYMENT_CONFIRMED'
  | 'CRAFTED_PREPARING'
  | 'DISPATCHED'
  | 'IN_TRANSIT'
  | 'OUT_FOR_DELIVERY'
  | 'DELIVERED';

export interface TrackingCheckpoint {
  stage: TrackingStageId;
  title: string;
  description: string;
  timestamp?: string;
  completed: boolean;
  current: boolean;
}

export interface OrderItem {
  id: string;
  name: string;
  material?: string;
  image: string;
  price: string;
  priceNumber: number;
  quantity: number;
  slug?: string;
}

export interface ClientOrder {
  id: string;
  displayId: string;
  orderDate: string;
  estimatedDeliveryDate?: string;
  deliveredDate?: string;
  returnWindowEndDate?: string;
  items: OrderItem[];
  subtotal: number;
  discountAmount: number;
  membershipDiscountApplied?: {
    tier: MembershipTier;
    percentage: number;
    amount: number;
  };
  packagingFee: number;
  total: number;
  paymentStatus: OrderPaymentStatus;
  fulfillmentStatus: OrderFulfillmentStatus;
  deliveryStatus: string;
  returnStatus: OrderReturnStatus;
  returnEligibility: {
    isEligible: boolean;
    reasonIfNotEligible?: string;
    daysRemaining: number;
  };
  membershipContribution: {
    contributes: boolean;
    reason: string;
  };
  tracking: {
    carrier: string;
    trackingNumber: string;
    trackingUrl?: string;
    currentStage: TrackingStageId;
    checkpoints: TrackingCheckpoint[];
    estimatedDelivery: string;
  };
  shippingAddress: SavedAddress;
  giftPackaging?: {
    selectedBoxId?: string;
    boxTitle?: string;
    selectedRibbonId?: string;
    ribbonColor?: string;
    giftMessage?: string;
  };
}

export interface SavedAddress {
  id: string;
  title: string;
  recipientName: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  isDefault: boolean;
}

export interface ReturnExchangeRequest {
  id: string;
  orderId: string;
  type: 'RETURN' | 'EXCHANGE';
  reason: string;
  details?: string;
  exchangeItemPreference?: string;
  status: 'PENDING_REVIEW' | 'APPROVED' | 'PICKUP_SCHEDULED' | 'COMPLETED' | 'REJECTED';
  createdAt: string;
}

export interface MembershipDetails {
  tier: MembershipTier;
  tierName: string;
  badgeTitle: string;
  discountPercent: number;
  successfulOrderCount: number;
  nextTier: MembershipTier | null;
  ordersNeededForNextTier: number;
  progressPercent: number;
  qualifyingOrderIds: string[];
  nonQualifyingOrderIds: string[];
  benefits: {
    title: string;
    description: string;
    unlocked: boolean;
  }[];
}

export interface AccountDossier {
  userId: string;
  name: string;
  firstName?: string;
  lastName?: string;
  email: string;
  phone?: string;
  avatarMonogram: string;
  avatarUrl?: string | null;
  membership: MembershipDetails;
  orders: ClientOrder[];
  savedAddresses: SavedAddress[];
  returnRequests: ReturnExchangeRequest[];
  wishlistIds: string[];
  security: {
    twoFactorEnabled: boolean;
    lastLogin: string;
    loginMethod: string;
  };
}

export type AccountTabKey =
  | 'profile'
  | 'orders'
  | 'tracking'
  | 'wishlist'
  | 'returns'
  | 'addresses'
  | 'membership'
  | 'concierge'
  | 'security'
  | 'policies'
  | 'signout';
