import {
  MembershipTier,
  MembershipDetails,
  ClientOrder,
  SavedAddress,
  ReturnExchangeRequest,
  AccountDossier,
  TrackingCheckpoint,
  TrackingStageId,
} from './types';

const RETURN_WINDOW_DAYS = 7;

/**
 * Calculates membership tier strictly from successful eligible orders.
 * Logic:
 * - < 2 successful orders => REGULAR (0% discount)
 * - 2 to 3 successful orders => SILVER (3% discount)
 * - >= 4 successful orders => GOLD (5% discount)
 */
export function calculateMembership(successfulOrderCount: number, qualifyingOrderIds: string[] = [], nonQualifyingOrderIds: string[] = []): MembershipDetails {
  let tier: MembershipTier = 'REGULAR';
  let discountPercent = 0;
  let tierName = 'Regular Client';
  let badgeTitle = 'Client of the Atelier';
  let nextTier: MembershipTier | null = 'SILVER';
  let ordersNeededForNextTier = Math.max(0, 2 - successfulOrderCount);
  let progressPercent = Math.min(100, Math.round((successfulOrderCount / 2) * 100));

  if (successfulOrderCount >= 4) {
    tier = 'GOLD';
    discountPercent = 5;
    tierName = 'Gold Member';
    badgeTitle = 'Patron of ABHI-MOH';
    nextTier = null;
    ordersNeededForNextTier = 0;
    progressPercent = 100;
  } else if (successfulOrderCount >= 2) {
    tier = 'SILVER';
    discountPercent = 3;
    tierName = 'Silver Member';
    badgeTitle = 'Connoisseur of ABHI-MOH';
    nextTier = 'GOLD';
    ordersNeededForNextTier = Math.max(0, 4 - successfulOrderCount);
    // Progress from 2 to 4 (50% to 100%)
    progressPercent = Math.min(100, Math.round(50 + ((successfulOrderCount - 2) / 2) * 50));
  }

  const benefits = [
    {
      title: '3% Personal Member Discount',
      description: 'Exclusive 3% client savings automatically applied to eligible couture sarees during checkout.',
      unlocked: tier === 'SILVER' || tier === 'GOLD',
    },
    {
      title: '5% Personal Member Discount',
      description: 'Exclusive 5% client savings automatically applied to bespoke sarees during checkout.',
      unlocked: tier === 'GOLD',
    },
    {
      title: 'Early Access to New Weaves',
      description: 'Private 72-hour preview window for seasonal limited-edition festival and bridal saree drops.',
      unlocked: tier === 'SILVER' || tier === 'GOLD',
    },
    {
      title: 'Earlier Access to Haute Drops',
      description: 'First-priority access to rare heritage zari masterworks before private collection launch.',
      unlocked: tier === 'GOLD',
    },
    {
      title: 'Complimentary Archival Gift Packaging',
      description: 'Signature ABHI-MOH velvet casket and satin ribbon unboxing experience complimentary with every order.',
      unlocked: tier === 'GOLD',
    },
    {
      title: 'Priority Master Weaver Advisory',
      description: 'Direct 1-on-1 consultations with our senior Varanasi & Kanchipuram textile curators.',
      unlocked: tier === 'SILVER' || tier === 'GOLD',
    },
    {
      title: 'Bespoke Custom Blouse & Fall Sizing',
      description: 'Personalized atelier adjustments and fall-pico detailing tailored by master craftsmen.',
      unlocked: true, // all registered clients
    },
  ];

  return {
    tier,
    tierName,
    badgeTitle,
    discountPercent,
    successfulOrderCount,
    nextTier,
    ordersNeededForNextTier,
    progressPercent,
    qualifyingOrderIds,
    nonQualifyingOrderIds,
    benefits,
  };
}

/**
 * Checks whether an order is a valid "Successful Order" that contributes to membership.
 * Requirements:
 * 1. Payment status is PAID
 * 2. Fulfillment status is DELIVERED
 * 3. Return window (7 days from delivery) has expired
 * 4. No return or exchange was requested or completed
 */
export function evaluateOrderMembershipContribution(order: Partial<ClientOrder>): { contributes: boolean; reason: string } {
  if (order.paymentStatus !== 'PAID') {
    return {
      contributes: false,
      reason: 'Payment is not completed or is refunded.',
    };
  }

  if (order.fulfillmentStatus === 'CANCELLED') {
    return {
      contributes: false,
      reason: 'Order was cancelled.',
    };
  }

  if (order.fulfillmentStatus !== 'DELIVERED') {
    return {
      contributes: false,
      reason: 'Order is currently in crafting or transit. Contribution activates after delivery and return window completion.',
    };
  }

  if (order.returnStatus === 'RETURN_REQUESTED' || order.returnStatus === 'RETURNED') {
    return {
      contributes: false,
      reason: 'This order was returned and does not contribute to your membership milestone.',
    };
  }

  if (order.returnStatus === 'EXCHANGE_REQUESTED' || order.returnStatus === 'EXCHANGED') {
    return {
      contributes: false,
      reason: 'This order was exchanged and does not contribute to your membership milestone.',
    };
  }

  // Check return window
  if (order.deliveredDate) {
    const deliveredAt = new Date(order.deliveredDate).getTime();
    const returnWindowEnd = deliveredAt + RETURN_WINDOW_DAYS * 24 * 60 * 60 * 1000;
    const now = Date.now();

    if (now < returnWindowEnd) {
      const daysLeft = Math.ceil((returnWindowEnd - now) / (1000 * 60 * 60 * 24));
      return {
        contributes: false,
        reason: `Active return window (${daysLeft} day${daysLeft > 1 ? 's' : ''} remaining). Will contribute once return period safely concludes without return.`,
      };
    }
  }

  return {
    contributes: true,
    reason: 'Successful order verified. Return window safely concluded with no returns or exchanges.',
  };
}

/**
 * Generates tracking checkpoints for an order based on current stage.
 */
export function buildTrackingCheckpoints(currentStage: TrackingStageId, orderDate: string, deliveredDate?: string): TrackingCheckpoint[] {
  const stages: { stage: TrackingStageId; title: string; description: string }[] = [
    {
      stage: 'ORDER_CONFIRMED',
      title: 'Order Confirmed',
      description: 'Your bespoke commission has been verified by the ABHI-MOH atelier desk.',
    },
    {
      stage: 'PAYMENT_CONFIRMED',
      title: 'Payment Confirmed',
      description: 'Payment verified securely through encrypted luxury payment gateway.',
    },
    {
      stage: 'CRAFTED_PREPARING',
      title: 'Crafted & Preparing',
      description: 'Artisanal fall-pico detailing and handloom silk inspection under way.',
    },
    {
      stage: 'DISPATCHED',
      title: 'Dispatched',
      description: 'Securely packaged into velvet casket and handed to insured luxury courier.',
    },
    {
      stage: 'IN_TRANSIT',
      title: 'In Transit',
      description: 'Expedited air shipment en route to your destination sorting facility.',
    },
    {
      stage: 'OUT_FOR_DELIVERY',
      title: 'Out for Delivery',
      description: 'Dedicated courier partner is on the way for white-glove doorstep delivery.',
    },
    {
      stage: 'DELIVERED',
      title: 'Delivered',
      description: 'Handed over securely with signature verification.',
    },
  ];

  const stageOrder: TrackingStageId[] = [
    'ORDER_CONFIRMED',
    'PAYMENT_CONFIRMED',
    'CRAFTED_PREPARING',
    'DISPATCHED',
    'IN_TRANSIT',
    'OUT_FOR_DELIVERY',
    'DELIVERED',
  ];

  const currentIndex = stageOrder.indexOf(currentStage);

  return stages.map((s, idx) => ({
    stage: s.stage,
    title: s.title,
    description: s.description,
    completed: idx <= currentIndex,
    current: idx === currentIndex,
    timestamp: idx <= currentIndex ? (idx === 0 ? orderDate : idx === 6 && deliveredDate ? deliveredDate : 'Updated') : undefined,
  }));
}

/**
 * Default initial sample client dossier with realistic orders across different stages.
 */
function createDefaultOrders(): ClientOrder[] {
  const now = Date.now();
  const DAY_MS = 24 * 60 * 60 * 1000;

  // Order 1: Delivered 20 days ago, return window expired, contributed to Silver
  const order1Delivered = new Date(now - 20 * DAY_MS).toISOString();
  const order1Date = new Date(now - 25 * DAY_MS).toISOString();
  const order1ReturnEnd = new Date(now - 13 * DAY_MS).toISOString();

  // Order 2: Delivered 12 days ago, return window expired, contributed to Silver
  const order2Delivered = new Date(now - 12 * DAY_MS).toISOString();
  const order2Date = new Date(now - 16 * DAY_MS).toISOString();
  const order2ReturnEnd = new Date(now - 5 * DAY_MS).toISOString();

  // Order 3: Delivered 2 days ago, active return window (eligible for return/exchange, does not yet contribute)
  const order3Delivered = new Date(now - 2 * DAY_MS).toISOString();
  const order3Date = new Date(now - 6 * DAY_MS).toISOString();
  const order3ReturnEnd = new Date(now + 5 * DAY_MS).toISOString();

  // Order 4: In transit (crafted & dispatched)
  const order4Date = new Date(now - 1 * DAY_MS).toISOString();

  const defaultAddress: SavedAddress = {
    id: 'addr_1',
    title: 'Home Atelier Residence',
    recipientName: 'Gautam Gupta',
    phone: '+91 98765 43210',
    addressLine1: 'Plot 42, Vasant Vihar Heritage Enclave',
    addressLine2: 'Near Club House',
    city: 'New Delhi',
    state: 'Delhi',
    pincode: '110057',
    country: 'India',
    isDefault: true,
  };

  const o1: ClientOrder = {
    id: 'ord_AM9841',
    displayId: 'AM-9841',
    orderDate: order1Date,
    deliveredDate: order1Delivered,
    returnWindowEndDate: order1ReturnEnd,
    subtotal: 18500,
    discountAmount: 0,
    packagingFee: 0,
    total: 18500,
    paymentStatus: 'PAID',
    fulfillmentStatus: 'DELIVERED',
    deliveryStatus: 'Delivered safely with OTP verification',
    returnStatus: 'WINDOW_EXPIRED',
    returnEligibility: {
      isEligible: false,
      reasonIfNotEligible: '7-day return/exchange window concluded.',
      daysRemaining: 0,
    },
    membershipContribution: {
      contributes: true,
      reason: 'Successful order verified. Return window safely concluded with no returns or exchanges.',
    },
    items: [
      {
        id: 'saree-kashi-crimson',
        name: 'Crimson Kashi Brocade Silk Saree',
        material: 'Pure Katan Silk & Real Gold Zari',
        image: '/assets/sarees/saree-maroon.png',
        price: '₹18,500',
        priceNumber: 18500,
        quantity: 1,
        slug: 'crimson-kashi-brocade',
      },
    ],
    tracking: {
      carrier: 'Blue Dart Luxury Express',
      trackingNumber: 'BD-8472910482',
      currentStage: 'DELIVERED',
      estimatedDelivery: 'Delivered',
      checkpoints: buildTrackingCheckpoints('DELIVERED', order1Date, order1Delivered),
    },
    shippingAddress: defaultAddress,
  };

  const o2: ClientOrder = {
    id: 'ord_AM9894',
    displayId: 'AM-9894',
    orderDate: order2Date,
    deliveredDate: order2Delivered,
    returnWindowEndDate: order2ReturnEnd,
    subtotal: 24500,
    discountAmount: 0,
    packagingFee: 0,
    total: 24500,
    paymentStatus: 'PAID',
    fulfillmentStatus: 'DELIVERED',
    deliveryStatus: 'Delivered safely with OTP verification',
    returnStatus: 'WINDOW_EXPIRED',
    returnEligibility: {
      isEligible: false,
      reasonIfNotEligible: '7-day return/exchange window concluded.',
      daysRemaining: 0,
    },
    membershipContribution: {
      contributes: true,
      reason: 'Successful order verified. Return window safely concluded with no returns or exchanges.',
    },
    items: [
      {
        id: 'saree-mughal-emerald',
        name: 'Noorani Jamdani Emerald Saree',
        material: 'Fine Cotton Silk with Muted Gold Weaves',
        image: '/assets/sarees/saree-green.png',
        price: '₹24,500',
        priceNumber: 24500,
        quantity: 1,
        slug: 'noorani-jamdani-emerald',
      },
    ],
    tracking: {
      carrier: 'Blue Dart Luxury Express',
      trackingNumber: 'BD-9182740192',
      currentStage: 'DELIVERED',
      estimatedDelivery: 'Delivered',
      checkpoints: buildTrackingCheckpoints('DELIVERED', order2Date, order2Delivered),
    },
    shippingAddress: defaultAddress,
  };

  const o3: ClientOrder = {
    id: 'ord_AM9930',
    displayId: 'AM-9930',
    orderDate: order3Date,
    deliveredDate: order3Delivered,
    returnWindowEndDate: order3ReturnEnd,
    subtotal: 32000,
    discountAmount: 960, // 3% Silver discount
    membershipDiscountApplied: {
      tier: 'SILVER',
      percentage: 3,
      amount: 960,
    },
    packagingFee: 0,
    total: 31040,
    paymentStatus: 'PAID',
    fulfillmentStatus: 'DELIVERED',
    deliveryStatus: 'Delivered • Return Window Open',
    returnStatus: 'ELIGIBLE',
    returnEligibility: {
      isEligible: true,
      daysRemaining: 5,
    },
    membershipContribution: {
      contributes: false,
      reason: 'Active return window (5 days remaining). Will contribute once return period safely concludes without return.',
    },
    items: [
      {
        id: 'saree-kanchi-gold',
        name: 'Varanasi Gulab Shikar Zari Saree',
        material: 'Handloom Pure Mulberry Silk & Antique Zari',
        image: '/assets/sarees/saree-gold.png',
        price: '₹32,000',
        priceNumber: 32000,
        quantity: 1,
        slug: 'varanasi-gulab-shikar',
      },
    ],
    tracking: {
      carrier: 'Blue Dart Luxury Express',
      trackingNumber: 'BD-9938472910',
      currentStage: 'DELIVERED',
      estimatedDelivery: 'Delivered',
      checkpoints: buildTrackingCheckpoints('DELIVERED', order3Date, order3Delivered),
    },
    shippingAddress: defaultAddress,
  };

  const o4: ClientOrder = {
    id: 'ord_AM9982',
    displayId: 'AM-9982',
    orderDate: order4Date,
    subtotal: 21000,
    discountAmount: 630, // 3% Silver discount
    membershipDiscountApplied: {
      tier: 'SILVER',
      percentage: 3,
      amount: 630,
    },
    packagingFee: 450,
    total: 20820,
    paymentStatus: 'PAID',
    fulfillmentStatus: 'DISPATCHED',
    deliveryStatus: 'In transit via expedited air courier',
    returnStatus: 'NONE',
    returnEligibility: {
      isEligible: false,
      reasonIfNotEligible: 'Returns open after order delivery is completed.',
      daysRemaining: 0,
    },
    membershipContribution: {
      contributes: false,
      reason: 'Order is currently in transit. Contribution activates after delivery and return window completion.',
    },
    items: [
      {
        id: 'saree-royal-peacock',
        name: 'Royal Mayura Midnight Blue Saree',
        material: 'Pure Chanderi Silk with Intricate Meenakari',
        image: '/assets/sarees/saree-blue.png',
        price: '₹21,000',
        priceNumber: 21000,
        quantity: 1,
        slug: 'royal-mayura-midnight',
      },
    ],
    tracking: {
      carrier: 'Blue Dart Luxury Express',
      trackingNumber: 'BD-1029384756',
      currentStage: 'IN_TRANSIT',
      estimatedDelivery: 'Tomorrow by 4:00 PM',
      checkpoints: buildTrackingCheckpoints('IN_TRANSIT', order4Date),
    },
    shippingAddress: defaultAddress,
    giftPackaging: {
      selectedBoxId: 'royal-velvet-casket',
      boxTitle: 'Royal Velvet Casket',
      selectedRibbonId: 'gold-satin',
      ribbonColor: 'Champagne Gold Satin',
      giftMessage: 'With deepest reverence and blessings from the atelier.',
    },
  };

  return [o4, o3, o2, o1];
}

// In-memory store for server lifetime
class AccountDataStore {
  private dossiers: Map<string, AccountDossier> = new Map();

  constructor() {
    this.initDefaultDossier('default_user');
  }

  private initDefaultDossier(userId: string): AccountDossier {
    const orders = createDefaultOrders();
    const qualifying = orders.filter((o) => evaluateOrderMembershipContribution(o).contributes).map((o) => o.id);
    const nonQualifying = orders.filter((o) => !evaluateOrderMembershipContribution(o).contributes).map((o) => o.id);
    const membership = calculateMembership(qualifying.length, qualifying, nonQualifying);

    const dossier: AccountDossier = {
      userId,
      name: 'Gautam Gupta',
      firstName: 'Gautam',
      lastName: 'Gupta',
      email: 'gautam@abhi-moh.com',
      phone: '+91 98765 43210',
      avatarMonogram: 'GG',
      avatarUrl: null,
      membership,
      orders,
      savedAddresses: [
        {
          id: 'addr_1',
          title: 'Home Atelier Residence',
          recipientName: 'Gautam Gupta',
          phone: '+91 98765 43210',
          addressLine1: 'Plot 42, Vasant Vihar Heritage Enclave',
          addressLine2: 'Near Club House',
          city: 'New Delhi',
          state: 'Delhi',
          pincode: '110057',
          country: 'India',
          isDefault: true,
        },
        {
          id: 'addr_2',
          title: 'Mumbai Studio Suite',
          recipientName: 'Gautam Gupta',
          phone: '+91 98765 43210',
          addressLine1: 'Suite 14B, Seaface Heritage Towers',
          addressLine2: 'Worli',
          city: 'Mumbai',
          state: 'Maharashtra',
          pincode: '400018',
          country: 'India',
          isDefault: false,
        },
      ],
      returnRequests: [],
      wishlistIds: [],
      security: {
        twoFactorEnabled: true,
        lastLogin: 'Today, 2:15 PM from Delhi, IN',
        loginMethod: 'Wix OAuth 2.0 Secure Session',
      },
    };

    this.dossiers.set(userId, dossier);
    return dossier;
  }

  public getDossier(userId = 'default_user'): AccountDossier {
    let dossier = this.dossiers.get(userId);
    if (!dossier) {
      dossier = this.initDefaultDossier(userId);
    }
    // Re-evaluate membership dynamically based on current orders state
    this.refreshMembership(userId);
    return this.dossiers.get(userId)!;
  }

  public refreshMembership(userId = 'default_user') {
    const dossier = this.dossiers.get(userId);
    if (!dossier) return;

    // Recalculate contributions
    const qualifyingIds: string[] = [];
    const nonQualifyingIds: string[] = [];

    dossier.orders.forEach((o) => {
      const evalResult = evaluateOrderMembershipContribution(o);
      o.membershipContribution = evalResult;
      if (evalResult.contributes) {
        qualifyingIds.push(o.id);
      } else {
        nonQualifyingIds.push(o.id);
      }
    });

    dossier.membership = calculateMembership(qualifyingIds.length, qualifyingIds, nonQualifyingIds);
  }

  public addOrder(order: ClientOrder, userId = 'default_user') {
    const dossier = this.getDossier(userId);
    dossier.orders.unshift(order);
    this.refreshMembership(userId);
  }

  public submitReturnOrExchange(
    orderId: string,
    type: 'RETURN' | 'EXCHANGE',
    reason: string,
    details?: string,
    exchangeItemPreference?: string,
    userId = 'default_user'
  ): { success: boolean; request?: ReturnExchangeRequest; error?: string } {
    const dossier = this.getDossier(userId);
    const order = dossier.orders.find((o) => o.id === orderId);

    if (!order) {
      return { success: false, error: 'Order not found.' };
    }

    if (order.fulfillmentStatus !== 'DELIVERED') {
      return { success: false, error: 'Cannot request return/exchange before order is delivered.' };
    }

    // Check window
    if (order.deliveredDate) {
      const deliveredAt = new Date(order.deliveredDate).getTime();
      const returnWindowEnd = deliveredAt + RETURN_WINDOW_DAYS * 24 * 60 * 60 * 1000;
      if (Date.now() > returnWindowEnd) {
        return { success: false, error: '7-day return and exchange window has expired for this order.' };
      }
    }

    if (order.returnStatus === 'RETURN_REQUESTED' || order.returnStatus === 'RETURNED' || order.returnStatus === 'EXCHANGE_REQUESTED' || order.returnStatus === 'EXCHANGED') {
      return { success: false, error: `A ${order.returnStatus.toLowerCase().replace('_', ' ')} has already been initiated for this order.` };
    }

    const newRequest: ReturnExchangeRequest = {
      id: `req_${Date.now()}`,
      orderId,
      type,
      reason,
      details,
      exchangeItemPreference,
      status: 'PENDING_REVIEW',
      createdAt: new Date().toISOString(),
    };

    order.returnStatus = type === 'RETURN' ? 'RETURN_REQUESTED' : 'EXCHANGE_REQUESTED';
    order.returnEligibility = {
      isEligible: false,
      reasonIfNotEligible: `${type === 'RETURN' ? 'Return' : 'Exchange'} request submitted and under review.`,
      daysRemaining: 0,
    };

    dossier.returnRequests.unshift(newRequest);
    this.refreshMembership(userId);

    return { success: true, request: newRequest };
  }

  public addAddress(address: Omit<SavedAddress, 'id'>, userId = 'default_user'): SavedAddress {
    const dossier = this.getDossier(userId);
    const newAddr: SavedAddress = {
      ...address,
      id: `addr_${Date.now()}`,
    };
    if (newAddr.isDefault) {
      dossier.savedAddresses.forEach((a) => (a.isDefault = false));
    }
    dossier.savedAddresses.push(newAddr);
    return newAddr;
  }

  public updateAddress(address: SavedAddress, userId = 'default_user'): boolean {
    const dossier = this.getDossier(userId);
    const idx = dossier.savedAddresses.findIndex((a) => a.id === address.id);
    if (idx === -1) return false;
    if (address.isDefault) {
      dossier.savedAddresses.forEach((a) => (a.isDefault = false));
    }
    dossier.savedAddresses[idx] = address;
    return true;
  }

  public deleteAddress(addressId: string, userId = 'default_user'): boolean {
    const dossier = this.getDossier(userId);
    const initLen = dossier.savedAddresses.length;
    dossier.savedAddresses = dossier.savedAddresses.filter((a) => a.id !== addressId);
    return dossier.savedAddresses.length < initLen;
  }

  public setDefaultAddress(addressId: string, userId = 'default_user'): boolean {
    const dossier = this.getDossier(userId);
    dossier.savedAddresses.forEach((a) => {
      a.isDefault = a.id === addressId;
    });
    return true;
  }

  /**
   * Switches the user's dataset to any of the test scenarios required for verification:
   * 'new_user', '1_order', '2_orders_silver', '3_orders', '4_orders_gold', 'returned_order', 'exchanged_order', 'expired_window', 'active_window'
   */
  public setTestScenario(scenario: string, userId = 'default_user'): AccountDossier {
    const now = Date.now();
    const DAY_MS = 24 * 60 * 60 * 1000;
    const dossier = this.getDossier(userId);

    const defaultAddress: SavedAddress = {
      id: 'addr_1',
      title: 'Home Atelier Residence',
      recipientName: 'Gautam Gupta',
      phone: '+91 98765 43210',
      addressLine1: 'Plot 42, Vasant Vihar Heritage Enclave',
      addressLine2: 'Near Club House',
      city: 'New Delhi',
      state: 'Delhi',
      pincode: '110057',
      country: 'India',
      isDefault: true,
    };

    const makeDeliveredOrder = (num: number, daysAgo: number): ClientOrder => ({
      id: `ord_AM${1000 + num}`,
      displayId: `AM-${1000 + num}`,
      orderDate: new Date(now - (daysAgo + 5) * DAY_MS).toISOString(),
      deliveredDate: new Date(now - daysAgo * DAY_MS).toISOString(),
      returnWindowEndDate: new Date(now - (daysAgo - 7) * DAY_MS).toISOString(),
      subtotal: 19500 + num * 2000,
      discountAmount: 0,
      packagingFee: 0,
      total: 19500 + num * 2000,
      paymentStatus: 'PAID',
      fulfillmentStatus: 'DELIVERED',
      deliveryStatus: 'Delivered safely with OTP verification',
      returnStatus: daysAgo > 7 ? 'WINDOW_EXPIRED' : 'ELIGIBLE',
      returnEligibility: {
        isEligible: daysAgo <= 7,
        reasonIfNotEligible: daysAgo > 7 ? '7-day return/exchange window concluded.' : undefined,
        daysRemaining: Math.max(0, 7 - daysAgo),
      },
      membershipContribution: {
        contributes: daysAgo > 7,
        reason: daysAgo > 7 ? 'Successful order verified.' : 'Active return window.',
      },
      items: [
        {
          id: `saree-sample-${num}`,
          name: `Heritage Artisanal Weave No. ${num}`,
          material: 'Pure Handloom Silk & Zari',
          image: ['/assets/sarees/saree-maroon.png', '/assets/sarees/saree-green.png', '/assets/sarees/saree-gold.png', '/assets/sarees/saree-blue.png'][num % 4],
          price: `₹${(19500 + num * 2000).toLocaleString('en-IN')}`,
          priceNumber: 19500 + num * 2000,
          quantity: 1,
        },
      ],
      tracking: {
        carrier: 'Blue Dart Luxury Express',
        trackingNumber: `BD-772910${num}`,
        currentStage: 'DELIVERED',
        estimatedDelivery: 'Delivered',
        checkpoints: buildTrackingCheckpoints('DELIVERED', new Date(now - (daysAgo + 5) * DAY_MS).toISOString(), new Date(now - daysAgo * DAY_MS).toISOString()),
      },
      shippingAddress: defaultAddress,
    });

    switch (scenario) {
      case 'new_user':
        dossier.orders = [];
        dossier.returnRequests = [];
        break;
      case '1_order':
        dossier.orders = [makeDeliveredOrder(1, 15)];
        dossier.returnRequests = [];
        break;
      case '2_orders_silver':
        dossier.orders = [makeDeliveredOrder(1, 15), makeDeliveredOrder(2, 20)];
        dossier.returnRequests = [];
        break;
      case '3_orders':
        dossier.orders = [makeDeliveredOrder(1, 12), makeDeliveredOrder(2, 18), makeDeliveredOrder(3, 25)];
        dossier.returnRequests = [];
        break;
      case '4_orders_gold':
        dossier.orders = [makeDeliveredOrder(1, 10), makeDeliveredOrder(2, 15), makeDeliveredOrder(3, 20), makeDeliveredOrder(4, 30)];
        dossier.returnRequests = [];
        break;
      case 'returned_order': {
        const retOrder = makeDeliveredOrder(1, 4);
        retOrder.returnStatus = 'RETURNED';
        retOrder.paymentStatus = 'REFUNDED';
        retOrder.membershipContribution = {
          contributes: false,
          reason: 'This order was returned and does not contribute to your membership milestone.',
        };
        dossier.orders = [retOrder];
        break;
      }
      case 'exchanged_order': {
        const exchOrder = makeDeliveredOrder(1, 5);
        exchOrder.returnStatus = 'EXCHANGED';
        exchOrder.membershipContribution = {
          contributes: false,
          reason: 'This order was exchanged and does not contribute to your membership milestone.',
        };
        dossier.orders = [exchOrder];
        break;
      }
      case 'active_return_window':
        dossier.orders = [makeDeliveredOrder(1, 2)];
        break;
      case 'expired_return_window':
        dossier.orders = [makeDeliveredOrder(1, 14)];
        break;
      default:
        dossier.orders = createDefaultOrders();
        break;
    }

    this.refreshMembership(userId);
    return dossier;
  }
}

export const accountDataStore = new AccountDataStore();
