import {
  MembershipTier,
  MembershipDetails,
  ClientOrder,
  OrderItem,
  SavedAddress,
  ReturnExchangeRequest,
  AccountDossier,
  TrackingStageId,
} from './types';
import { getWixClient, type Tokens } from '@/lib/wix';
import {
  MEMBERSHIP_CONFIG,
  isOrderSuccessful,
  computeMembershipFromOrders,
} from './membership.rules';

export { MEMBERSHIP_CONFIG, isOrderSuccessful, computeMembershipFromOrders };

/**
 * Creates an empty, pristine client dossier for a new or un-ordered member.
 * Zero mock orders. Default Regular Client tier. 0/2 progress to Silver.
 */
export function createEmptyDossier(
  userId: string,
  profile?: {
    name?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    avatarMonogram?: string;
    avatarUrl?: string | null;
    addresses?: SavedAddress[];
  }
): AccountDossier {
  const firstName = profile?.firstName || '';
  const lastName = profile?.lastName || '';
  const fullName = profile?.name || `${firstName} ${lastName}`.trim() || 'Client';
  const email = profile?.email || '';
  const phone = profile?.phone || '';
  const avatarMonogram =
    profile?.avatarMonogram ||
    (firstName && lastName
      ? `${firstName[0]}${lastName[0]}`.toUpperCase()
      : fullName
      ? fullName.slice(0, 2).toUpperCase()
      : 'AM');

  const emptyMembership = computeMembershipFromOrders([]);

  return {
    userId,
    name: fullName,
    firstName,
    lastName,
    email,
    phone,
    avatarMonogram,
    avatarUrl: profile?.avatarUrl || null,
    membership: emptyMembership,
    orders: [],
    savedAddresses: profile?.addresses || [],
    returnRequests: [],
    wishlistIds: [],
    security: {
      twoFactorEnabled: false,
      lastLogin: 'Active Session',
      loginMethod: 'Wix OAuth 2.0 Secure Session',
    },
  };
}

/**
 * Maps a real Wix eCommerce Order (@wix/ecom) to the frontend ClientOrder model.
 * Only populates data that Wix actually provides.
 */
export function mapWixOrderToClientOrder(wixOrder: any): ClientOrder {
  const id = wixOrder._id || '';
  const displayId = wixOrder.number ? `AM-${wixOrder.number}` : id ? `AM-${id.slice(0, 6).toUpperCase()}` : 'AM-ORDER';
  const orderDate = wixOrder._createdDate ? new Date(wixOrder._createdDate).toISOString() : new Date().toISOString();

  const totalAmount = Number(wixOrder.priceSummary?.total?.amount || 0);
  const subtotalAmount = Number(wixOrder.priceSummary?.subtotal?.amount || totalAmount);
  const discountAmount = Number(wixOrder.priceSummary?.discount?.amount || 0);

  // Wix payment status mapping
  const paymentUpper = (wixOrder.paymentStatus || '').toUpperCase();
  const paymentStatus =
    paymentUpper === 'PAID'
      ? 'PAID'
      : paymentUpper === 'REFUNDED' || paymentUpper === 'PARTIALLY_REFUNDED'
      ? 'REFUNDED'
      : 'PENDING';

  // Wix fulfillment status mapping
  const fulfillmentUpper = (wixOrder.fulfillmentStatus || '').toUpperCase();
  const statusUpper = (wixOrder.status || '').toUpperCase();

  const fulfillmentStatus =
    statusUpper === 'CANCELED' || statusUpper === 'CANCELLED'
      ? 'CANCELLED'
      : fulfillmentUpper === 'FULFILLED' || fulfillmentUpper === 'DELIVERED'
      ? 'DELIVERED'
      : fulfillmentUpper === 'PARTIALLY_FULFILLED'
      ? 'DISPATCHED'
      : 'PREPARING';

  // Map real line items
  const items: OrderItem[] = (wixOrder.lineItems || []).map((li: any, idx: number) => {
    const rawPrice = Number(li.price?.amount || 0);
    const formattedPrice = li.price?.formattedAmount || `₹${rawPrice.toLocaleString('en-IN')}`;
    return {
      id: li._id || `item_${idx}`,
      name: li.productName?.translated || li.productName?.original || 'Artisanal Couture Saree',
      material: li.descriptionLines?.[0]?.plainText?.original || undefined,
      image: li.image || '', // if empty, helper falls back gracefully
      price: formattedPrice,
      priceNumber: rawPrice,
      quantity: li.quantity || 1,
    };
  });

  // Tracking details: only present if Wix shippingInfo provides real carrier / tracking number
  const wixTracking = wixOrder.shippingInfo?.logistics?.trackingInfo;
  const trackingNumber = wixTracking?.trackingNumber || '';
  const carrier = wixTracking?.shippingProvider || wixTracking?.carrier || '';
  const trackingUrl = wixTracking?.trackingLink || undefined;

  const tracking = {
    carrier,
    trackingNumber,
    trackingUrl,
    currentStage: (fulfillmentStatus === 'DELIVERED' ? 'DELIVERED' : 'DISPATCHED') as TrackingStageId,
    checkpoints: [],
    estimatedDelivery: wixOrder.shippingInfo?.logistics?.deliveryTime || '',
  };

  // Return eligibility: in standard Wix eCom, returns require administrative flow or concierge
  const returnEligibility = {
    isEligible: false,
    reasonIfNotEligible: 'Returns handled via atelier concierge desk.',
    daysRemaining: 0,
  };

  const isSuccessful = isOrderSuccessful(wixOrder);

  // Delivery address from Wix shipping info
  const shippingAddress: SavedAddress = {
    id: 'addr_shipping',
    title: 'Shipping Address',
    recipientName: `${wixOrder.shippingInfo?.logistics?.deliveryAddress?.firstName || ''} ${wixOrder.shippingInfo?.logistics?.deliveryAddress?.lastName || ''}`.trim() || 'Client',
    phone: wixOrder.shippingInfo?.logistics?.deliveryAddress?.phone || '',
    addressLine1: wixOrder.shippingInfo?.logistics?.deliveryAddress?.addressLine1 || '',
    addressLine2: wixOrder.shippingInfo?.logistics?.deliveryAddress?.addressLine2 || undefined,
    city: wixOrder.shippingInfo?.logistics?.deliveryAddress?.city || '',
    state: wixOrder.shippingInfo?.logistics?.deliveryAddress?.subdivision || '',
    pincode: wixOrder.shippingInfo?.logistics?.deliveryAddress?.postalCode || '',
    country: wixOrder.shippingInfo?.logistics?.deliveryAddress?.country || 'India',
    isDefault: true,
  };

  return {
    id,
    displayId,
    orderDate,
    items,
    subtotal: subtotalAmount,
    discountAmount,
    packagingFee: 0,
    total: totalAmount,
    paymentStatus,
    fulfillmentStatus,
    deliveryStatus:
      statusUpper === 'CANCELED'
        ? 'Order Cancelled'
        : fulfillmentStatus === 'DELIVERED'
        ? 'Delivered'
        : 'Order Confirmed',
    returnStatus: 'NONE',
    returnEligibility,
    membershipContribution: {
      contributes: isSuccessful,
      reason: isSuccessful
        ? 'Verified successful order (Paid & Fulfilled).'
        : 'Order is pending fulfillment, unpaid, or canceled.',
    },
    tracking,
    shippingAddress,
  };
}

/**
 * Server-side order fetcher querying the real Wix eCommerce API.
 * Uses the logged-in member's session tokens to query orders and filters
 * strictly by buyerInfo.memberId on the server to prevent any cross-customer data leak.
 */
export async function fetchMemberOrdersFromWix(
  tokens: Tokens,
  memberId: string
): Promise<ClientOrder[]> {
  if (!tokens || !memberId) {
    return [];
  }

  try {
    const client = getWixClient(tokens);

    // Query Wix eCommerce orders filtered strictly to the logged-in member
    const searchResponse = await client.orders.searchOrders({
      filter: {
        'buyerInfo.memberId': { $eq: memberId },
      },
      sort: [
        {
          fieldName: '_createdDate',
          order: 'DESC',
        },
      ],
      cursorPaging: {
        limit: 100,
      },
    });

    const rawOrders = searchResponse.orders || [];

    // Additional strict server-side validation ensuring every returned order belongs to this member
    const verifiedOrders = rawOrders.filter(
      (o: any) => o.buyerInfo?.memberId === memberId
    );

    return verifiedOrders.map(mapWixOrderToClientOrder);
  } catch (error: any) {
    // If permission or network error occurs (or headless client lacks order scope),
    // safely return empty array — NEVER fall back to mock orders!
    console.warn(`[fetchMemberOrdersFromWix] Warning fetching orders for member ${memberId}:`, error?.message || error);
    return [];
  }
}

// User-scoped address and return request store (keyed strictly by authenticated member ID)
class UserScopedDataStore {
  private userAddresses: Map<string, SavedAddress[]> = new Map();
  private userReturns: Map<string, ReturnExchangeRequest[]> = new Map();

  public getAddresses(userId: string): SavedAddress[] {
    return this.userAddresses.get(userId) || [];
  }

  public addAddress(address: Omit<SavedAddress, 'id'>, userId: string): SavedAddress {
    const addresses = this.userAddresses.get(userId) || [];
    const newAddr: SavedAddress = {
      ...address,
      id: `addr_${Date.now()}`,
    };
    if (newAddr.isDefault) {
      addresses.forEach((a) => (a.isDefault = false));
    }
    addresses.push(newAddr);
    this.userAddresses.set(userId, addresses);
    return newAddr;
  }

  public updateAddress(address: SavedAddress, userId: string): boolean {
    const addresses = this.userAddresses.get(userId) || [];
    const idx = addresses.findIndex((a) => a.id === address.id);
    if (idx === -1) return false;
    if (address.isDefault) {
      addresses.forEach((a) => (a.isDefault = false));
    }
    addresses[idx] = address;
    this.userAddresses.set(userId, addresses);
    return true;
  }

  public deleteAddress(addressId: string, userId: string): boolean {
    const addresses = this.userAddresses.get(userId) || [];
    const filtered = addresses.filter((a) => a.id !== addressId);
    this.userAddresses.set(userId, filtered);
    return filtered.length < addresses.length;
  }

  public setDefaultAddress(addressId: string, userId: string): boolean {
    const addresses = this.userAddresses.get(userId) || [];
    addresses.forEach((a) => {
      a.isDefault = a.id === addressId;
    });
    this.userAddresses.set(userId, addresses);
    return true;
  }

  public getReturns(userId: string): ReturnExchangeRequest[] {
    return this.userReturns.get(userId) || [];
  }

  public addReturnRequest(req: ReturnExchangeRequest, userId: string) {
    const list = this.userReturns.get(userId) || [];
    list.unshift(req);
    this.userReturns.set(userId, list);
  }
}

export const userScopedDataStore = new UserScopedDataStore();

export const accountDataStore = {
  getDossier: (userId: string = 'default_user') => createEmptyDossier(userId),
};
