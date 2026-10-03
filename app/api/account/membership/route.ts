import { NextRequest, NextResponse } from 'next/server';
import { getWixClient, WIX_TOKENS_COOKIE, type Tokens } from '@/lib/wix';
import {
  fetchMemberOrdersFromWix,
  computeMembershipFromOrders,
} from '@/lib/account/account.service';

export async function GET(request: NextRequest) {
  try {
    const tokensCookie = request.cookies.get(WIX_TOKENS_COOKIE)?.value;

    if (!tokensCookie) {
      // Unauthenticated visitor: default Regular Client tier with 0 orders
      return NextResponse.json({
        success: true,
        membership: computeMembershipFromOrders([]),
      });
    }

    let tokens: Tokens;
    try {
      tokens = JSON.parse(tokensCookie);
    } catch {
      return NextResponse.json({
        success: true,
        membership: computeMembershipFromOrders([]),
      });
    }

    const client = getWixClient(tokens);
    const memberRes = await client.members.getCurrentMember();
    const memberId = memberRes?.member?._id;

    if (!memberId) {
      return NextResponse.json({
        success: true,
        membership: computeMembershipFromOrders([]),
      });
    }

    const orders = await fetchMemberOrdersFromWix(tokens, memberId);
    const membership = computeMembershipFromOrders(orders);

    return NextResponse.json({
      success: true,
      membership,
    });
  } catch (error) {
    console.error('Error fetching membership:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to retrieve membership information.' },
      { status: 500 }
    );
  }
}
