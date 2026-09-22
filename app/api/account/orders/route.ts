import { NextRequest, NextResponse } from 'next/server';
import { accountDataStore } from '@/lib/account/account.service';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const userId = searchParams.get('userId') || 'default_user';
    const orderId = searchParams.get('orderId');

    const dossier = accountDataStore.getDossier(userId);

    if (orderId) {
      const order = dossier.orders.find((o) => o.id === orderId || o.displayId === orderId);
      if (!order) {
        return NextResponse.json({ success: false, error: 'Order not found.' }, { status: 404 });
      }
      return NextResponse.json({ success: true, order });
    }

    return NextResponse.json({
      success: true,
      orders: dossier.orders,
      totalOrders: dossier.orders.length,
      returnRequests: dossier.returnRequests,
    });
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json({ success: false, error: 'Failed to retrieve orders.' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { orderId, type, reason, details, exchangeItemPreference, userId = 'default_user' } = body;

    if (!orderId || !type || !reason) {
      return NextResponse.json(
        { success: false, error: 'Order ID, request type, and reason are required.' },
        { status: 400 }
      );
    }

    const result = accountDataStore.submitReturnOrExchange(
      orderId,
      type,
      reason,
      details,
      exchangeItemPreference,
      userId
    );

    if (!result.success) {
      return NextResponse.json({ success: false, error: result.error }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      message: `${type === 'RETURN' ? 'Return' : 'Exchange'} request submitted successfully. Our concierge will contact you within 24 hours.`,
      request: result.request,
    });
  } catch (error) {
    console.error('Error submitting return/exchange request:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process return/exchange request.' },
      { status: 500 }
    );
  }
}
