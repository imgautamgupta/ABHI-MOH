import { MembershipTier, MembershipDetails } from './types';

/**
 * ABHI-MOH Atelier Membership & Loyalty Rules
 * 
 * Central configuration for membership tiers and qualification rules.
 * The store owner can easily modify thresholds, discounts, or criteria here.
 */
export const MEMBERSHIP_CONFIG = {
  TIERS: {
    REGULAR: {
      tier: 'REGULAR' as MembershipTier,
      name: 'Regular Client',
      badge: 'Client of the Atelier',
      thresholdOrders: 0,
      discountPercent: 0,
    },
    SILVER: {
      tier: 'SILVER' as MembershipTier,
      name: 'Silver Member',
      badge: 'Connoisseur of ABHI-MOH',
      thresholdOrders: 2, // 2 successful orders required for Silver
      discountPercent: 3,
    },
    GOLD: {
      tier: 'GOLD' as MembershipTier,
      name: 'Gold Member',
      badge: 'Patron of ABHI-MOH',
      thresholdOrders: 4, // 4 successful orders required for Gold
      discountPercent: 5,
    },
  },

  /**
   * Criteria defining a "Successful Order":
   * Must be paid, delivered/fulfilled, and not returned, refunded, or canceled.
   */
  SUCCESS_CRITERIA: {
    allowedPaymentStatuses: ['PAID'],
    allowedFulfillmentStatuses: ['FULFILLED', 'DELIVERED'],
    excludedOrderStatuses: ['CANCELED', 'CANCELLED'],
    disallowedPaymentStatuses: ['REFUNDED', 'PARTIALLY_REFUNDED'],
  },
};

/**
 * Determines whether a single order counts as a "Successful Order" towards membership tiers.
 */
export function isOrderSuccessful(order: {
  paymentStatus?: string | null;
  fulfillmentStatus?: string | null;
  status?: string | null;
  refundQuantity?: number | null;
}): boolean {
  if (!order) return false;

  const paymentUpper = (order.paymentStatus || '').toUpperCase();
  const fulfillmentUpper = (order.fulfillmentStatus || '').toUpperCase();
  const statusUpper = (order.status || '').toUpperCase();

  // 1. Must be Paid
  const isPaid = MEMBERSHIP_CONFIG.SUCCESS_CRITERIA.allowedPaymentStatuses.includes(paymentUpper);

  // 2. Must be Delivered or Fulfilled
  const isDeliveredOrFulfilled = MEMBERSHIP_CONFIG.SUCCESS_CRITERIA.allowedFulfillmentStatuses.includes(fulfillmentUpper);

  // 3. Must not be Canceled
  const isNotCanceled = !MEMBERSHIP_CONFIG.SUCCESS_CRITERIA.excludedOrderStatuses.includes(statusUpper);

  // 4. Must not be Refunded or Returned
  const isNotRefunded =
    !MEMBERSHIP_CONFIG.SUCCESS_CRITERIA.disallowedPaymentStatuses.includes(paymentUpper) &&
    (!order.refundQuantity || order.refundQuantity === 0);

  return isPaid && isDeliveredOrFulfilled && isNotCanceled && isNotRefunded;
}

/**
 * Pure function to calculate the membership details strictly on the server
 * based on verified real orders.
 */
export function computeMembershipFromOrders(orders: Array<{
  id?: string;
  _id?: string;
  paymentStatus?: string | null;
  fulfillmentStatus?: string | null;
  status?: string | null;
  refundQuantity?: number | null;
}>): MembershipDetails {
  const qualifyingOrderIds: string[] = [];
  const nonQualifyingOrderIds: string[] = [];

  for (const o of orders) {
    const orderId = o.id || o._id || '';
    if (isOrderSuccessful(o)) {
      qualifyingOrderIds.push(orderId);
    } else {
      nonQualifyingOrderIds.push(orderId);
    }
  }

  const successfulOrderCount = qualifyingOrderIds.length;

  let tier: MembershipTier = 'REGULAR';
  let discountPercent = MEMBERSHIP_CONFIG.TIERS.REGULAR.discountPercent;
  let tierName = MEMBERSHIP_CONFIG.TIERS.REGULAR.name;
  let badgeTitle = MEMBERSHIP_CONFIG.TIERS.REGULAR.badge;
  let nextTier: MembershipTier | null = 'SILVER';
  let ordersNeededForNextTier = Math.max(0, MEMBERSHIP_CONFIG.TIERS.SILVER.thresholdOrders - successfulOrderCount);
  let progressPercent = Math.min(
    100,
    Math.round((successfulOrderCount / MEMBERSHIP_CONFIG.TIERS.SILVER.thresholdOrders) * 100)
  );

  if (successfulOrderCount >= MEMBERSHIP_CONFIG.TIERS.GOLD.thresholdOrders) {
    tier = 'GOLD';
    discountPercent = MEMBERSHIP_CONFIG.TIERS.GOLD.discountPercent;
    tierName = MEMBERSHIP_CONFIG.TIERS.GOLD.name;
    badgeTitle = MEMBERSHIP_CONFIG.TIERS.GOLD.badge;
    nextTier = null;
    ordersNeededForNextTier = 0;
    progressPercent = 100;
  } else if (successfulOrderCount >= MEMBERSHIP_CONFIG.TIERS.SILVER.thresholdOrders) {
    tier = 'SILVER';
    discountPercent = MEMBERSHIP_CONFIG.TIERS.SILVER.discountPercent;
    tierName = MEMBERSHIP_CONFIG.TIERS.SILVER.name;
    badgeTitle = MEMBERSHIP_CONFIG.TIERS.SILVER.badge;
    nextTier = 'GOLD';
    ordersNeededForNextTier = Math.max(0, MEMBERSHIP_CONFIG.TIERS.GOLD.thresholdOrders - successfulOrderCount);
    // Progress from 2 to 4 (50% to 100%)
    const span = MEMBERSHIP_CONFIG.TIERS.GOLD.thresholdOrders - MEMBERSHIP_CONFIG.TIERS.SILVER.thresholdOrders;
    const progressInTier = successfulOrderCount - MEMBERSHIP_CONFIG.TIERS.SILVER.thresholdOrders;
    progressPercent = Math.min(100, Math.round(50 + (progressInTier / span) * 50));
  }

  const benefits = [
    {
      title: 'Early Access to New Weaves',
      description: 'Private preview window for seasonal limited-edition festival and bridal saree drops.',
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
      unlocked: true,
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
