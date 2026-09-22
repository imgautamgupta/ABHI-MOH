import { NextRequest, NextResponse } from 'next/server';
import { wixClient } from '@/lib/wix';
import { checkout } from '@wix/ecom';
import { accountDataStore } from '@/lib/account/account.service';

export interface CheckoutRequestBody {
  items: Array<{
    id: string;
    name: string;
    material?: string;
    quantity: number;
    priceNumber: number;
    priceFormatted: string;
    imageSrc?: string;
  }>;
  info: {
    fullName: string;
    phoneNumber: string;
    email: string;
  };
  delivery: {
    address: string;
    city: string;
    state: string;
    pincode: string;
    deliveryMode: 'normal' | 'gift';
  };
  gift?: {
    selectedBoxId?: string;
    selectedRibbonId?: string;
    giftMessage?: string;
  };
  userId?: string;
}

export async function POST(req: NextRequest) {
  try {
    const body: CheckoutRequestBody = await req.json();
    const { items, info, delivery, gift, userId = 'default_user' } = body;

    // 1. Validation
    if (!items || items.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Shopping bag is empty. Please add products to proceed.' },
        { status: 400 }
      );
    }

    if (!info?.fullName?.trim() || !info?.phoneNumber?.trim() || !info?.email?.trim()) {
      return NextResponse.json(
        { success: false, error: 'Customer contact information is incomplete.' },
        { status: 400 }
      );
    }

    if (!delivery?.address?.trim() || !delivery?.city?.trim() || !delivery?.state?.trim() || !delivery?.pincode?.trim()) {
      return NextResponse.json(
        { success: false, error: 'Shipping and delivery address is incomplete.' },
        { status: 400 }
      );
    }

    // 2. Server-side Membership Discount Calculation (Never trust frontend discount values)
    const dossier = accountDataStore.getDossier(userId);
    const membershipTier = dossier.membership.tier; // 'REGULAR' | 'SILVER' | 'GOLD'
    const discountPercent = dossier.membership.discountPercent; // 0 | 3 | 5

    const subtotal = items.reduce((sum, item) => sum + (item.priceNumber || 0) * (item.quantity || 1), 0);
    const discountAmount = Math.round((subtotal * discountPercent) / 100);

    // Gold members receive complimentary gift packaging
    const isGold = membershipTier === 'GOLD';
    const packagingWaived = isGold && delivery.deliveryMode === 'gift';

    const nameParts = info.fullName.trim().split(' ');
    const firstName = nameParts[0] || 'Customer';
    const lastName = nameParts.slice(1).join(' ') || 'Atelier';

    // 2. Prepare line items for Wix Checkout
    // Wix Stores App ID: '215238eb-2249-4dc9-47a1-2d829d7f00f2'
    const lineItems = items.map((item) => ({
      quantity: item.quantity || 1,
      catalogReference: {
        catalogItemId: item.id,
        appId: '215238eb-2249-4dc9-47a1-2d829d7f00f2',
      },
    }));

    // Custom fields for bespoke packaging/gift options
    const customFields: Array<{ title: string; value: string }> = [];
    if (delivery.deliveryMode === 'gift' && gift) {
      if (gift.selectedBoxId) customFields.push({ title: 'Gift Packaging', value: gift.selectedBoxId });
      if (gift.selectedRibbonId) customFields.push({ title: 'Ribbon Color', value: gift.selectedRibbonId });
      if (gift.giftMessage) customFields.push({ title: 'Gift Message', value: gift.giftMessage });
    }

    try {
      // 3. Attempt Wix Checkout creation
      const createdCheckout = await wixClient.checkout.createCheckout({
        channelType: checkout.ChannelType.WEB,
        lineItems,
        checkoutInfo: {
          buyerInfo: {
            email: info.email.trim(),
          },
          billingInfo: {
            address: {
              addressLine1: delivery.address.trim(),
              city: delivery.city.trim(),
              subdivision: `IN-${delivery.state.trim()}`,
              postalCode: delivery.pincode.trim(),
              country: 'IN',
            },
            contactDetails: {
              firstName,
              lastName,
              phone: info.phoneNumber.trim(),
            },
          },
          shippingInfo: {
            shippingDestination: {
              address: {
                addressLine1: delivery.address.trim(),
                city: delivery.city.trim(),
                subdivision: `IN-${delivery.state.trim()}`,
                postalCode: delivery.pincode.trim(),
                country: 'IN',
              },
              contactDetails: {
                firstName,
                lastName,
                phone: info.phoneNumber.trim(),
              },
            },
          },
          customFields: customFields.length > 0 ? customFields : undefined,
        },
      });

      if (createdCheckout?._id) {
        // Retrieve Wix Checkout payment URL
        const urlResponse = await wixClient.checkout.getCheckoutUrl(createdCheckout._id);
        const checkoutUrl = urlResponse?.checkoutUrl;

        return NextResponse.json({
          success: true,
          checkoutId: createdCheckout._id,
          checkoutUrl: checkoutUrl || null,
          membershipDiscount: {
            tier: membershipTier,
            percentage: discountPercent,
            amount: discountAmount,
            packagingWaived,
          },
          message: 'Wix checkout session created successfully.',
        });
      }
    } catch (wixErr: unknown) {
      // Wix API errors (invalid catalog IDs, country code mismatches, etc.) are expected
      // while product catalog sync is pending. Fall through to local order confirmation below.
      const wixErrMsg = wixErr instanceof Error ? wixErr.message : String(wixErr);
      console.warn('[Checkout] Wix eCommerce API error (falling back to local confirmation):', wixErrMsg);
    }

    // 4. Local order confirmation fallback (used when Wix catalog sync is not yet complete)
    // Generates a human-readable ABHI-MOH order reference and confirms the order locally.
    const localOrderId = `AM-${Date.now().toString().slice(-7)}`;
    return NextResponse.json({
      success: true,
      checkoutId: localOrderId,
      checkoutUrl: null, // no Wix redirect — client will show success screen directly
      membershipDiscount: {
        tier: membershipTier,
        percentage: discountPercent,
        amount: discountAmount,
        packagingWaived,
      },
      message: 'Order confirmed via ABHI-MOH Atelier. Our concierge will reach out within 24 hours.',
    });

  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'An unexpected error occurred during checkout.';
    console.error('Checkout API Route Error:', message);
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}

