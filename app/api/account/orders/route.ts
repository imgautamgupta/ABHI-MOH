import { NextRequest, NextResponse } from 'next/server';
import { getWixClient, WIX_TOKENS_COOKIE, type Tokens } from '@/lib/wix';
import {
  fetchMemberOrdersFromWix,
  computeMembershipFromOrders,
  userScopedDataStore,
} from '@/lib/account/account.service';

export async function GET(request: NextRequest) {
  try {
    const tokensCookie = request.cookies.get(WIX_TOKENS_COOKIE)?.value;

    if (!tokensCookie) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized. Please sign in to view orders.' },
        { status: 401 }
      );
    }

    let tokens: Tokens;
    try {
      tokens = JSON.parse(tokensCookie);
    } catch {
      return NextResponse.json(
        { success: false, error: 'Invalid authentication session.' },
        { status: 401 }
      );
    }

    const client = getWixClient(tokens);
    const memberRes = await client.members.getCurrentMember();
    const memberId = memberRes?.member?._id;

    if (!memberId) {
      return NextResponse.json(
        { success: false, error: 'Member profile not found.' },
        { status: 401 }
      );
    }

    // Fetch real orders strictly filtered by this member's ID
    const orders = await fetchMemberOrdersFromWix(tokens, memberId);

    const searchParams = request.nextUrl.searchParams;
    const orderId = searchParams.get('orderId');

    if (orderId) {
      const order = orders.find((o) => o.id === orderId || o.displayId === orderId);
      if (!order) {
        return NextResponse.json({ success: false, error: 'Order not found.' }, { status: 404 });
      }
      return NextResponse.json({ success: true, order });
    }

    const membership = computeMembershipFromOrders(orders);
    const returnRequests = userScopedDataStore.getReturns(memberId);

    return NextResponse.json({
      success: true,
      orders,
      totalOrders: orders.length,
      membership,
      returnRequests,
    });
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to retrieve orders.' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const tokensCookie = request.cookies.get(WIX_TOKENS_COOKIE)?.value;
    if (!tokensCookie) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized.' },
        { status: 401 }
      );
    }

    let tokens: Tokens;
    try {
      tokens = JSON.parse(tokensCookie);
    } catch {
      return NextResponse.json({ success: false, error: 'Invalid session.' }, { status: 401 });
    }

    const client = getWixClient(tokens);
    const memberRes = await client.members.getCurrentMember();
    const memberId = memberRes?.member?._id;

    if (!memberId) {
      return NextResponse.json({ success: false, error: 'Member not found.' }, { status: 401 });
    }

    const body = await request.json();
    const { orderId, type, reason, details, exchangeItemPreference } = body;

    if (!orderId || !type || !reason) {
      return NextResponse.json(
        { success: false, error: 'Order ID, request type, and reason are required.' },
        { status: 400 }
      );
    }

    const newRequest = {
      id: `req_${Date.now()}`,
      orderId,
      type: type as 'RETURN' | 'EXCHANGE',
      reason,
      details,
      exchangeItemPreference,
      status: 'PENDING_REVIEW' as const,
      createdAt: new Date().toISOString(),
    };

    userScopedDataStore.addReturnRequest(newRequest, memberId);

    return NextResponse.json({
      success: true,
      message: `${type === 'RETURN' ? 'Return' : 'Exchange'} request submitted. Our concierge will contact you within 24 hours.`,
      request: newRequest,
    });
  } catch (error) {
    console.error('Error submitting return/exchange request:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process return/exchange request.' },
      { status: 500 }
    );
  }
}
