import { NextRequest, NextResponse } from 'next/server';
import { getWixClient, WIX_TOKENS_COOKIE, type Tokens } from '@/lib/wix';
import { userScopedDataStore } from '@/lib/account/account.service';

export async function GET(request: NextRequest) {
  try {
    const tokensCookie = request.cookies.get(WIX_TOKENS_COOKIE)?.value;
    if (!tokensCookie) {
      return NextResponse.json({ success: false, error: 'Unauthorized.' }, { status: 401 });
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

    const addresses = userScopedDataStore.getAddresses(memberId);
    return NextResponse.json({ success: true, addresses });
  } catch (error) {
    console.error('Error fetching addresses:', error);
    return NextResponse.json({ success: false, error: 'Failed to retrieve addresses.' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const tokensCookie = request.cookies.get(WIX_TOKENS_COOKIE)?.value;
    if (!tokensCookie) {
      return NextResponse.json({ success: false, error: 'Unauthorized.' }, { status: 401 });
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
    const { address } = body;

    if (!address?.recipientName || !address?.addressLine1 || !address?.city || !address?.state || !address?.pincode) {
      return NextResponse.json({ success: false, error: 'All address fields are required.' }, { status: 400 });
    }

    const saved = userScopedDataStore.addAddress(address, memberId);
    return NextResponse.json({ success: true, address: saved });
  } catch (error) {
    console.error('Error adding address:', error);
    return NextResponse.json({ success: false, error: 'Failed to save address.' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const tokensCookie = request.cookies.get(WIX_TOKENS_COOKIE)?.value;
    if (!tokensCookie) {
      return NextResponse.json({ success: false, error: 'Unauthorized.' }, { status: 401 });
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
    const { address, action, addressId } = body;

    if (action === 'set_default' && addressId) {
      userScopedDataStore.setDefaultAddress(addressId, memberId);
      return NextResponse.json({ success: true, message: 'Default address updated.' });
    }

    if (address && address.id) {
      const ok = userScopedDataStore.updateAddress(address, memberId);
      return NextResponse.json({ success: ok, address });
    }

    return NextResponse.json({ success: false, error: 'Invalid update payload.' }, { status: 400 });
  } catch (error) {
    console.error('Error updating address:', error);
    return NextResponse.json({ success: false, error: 'Failed to update address.' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const tokensCookie = request.cookies.get(WIX_TOKENS_COOKIE)?.value;
    if (!tokensCookie) {
      return NextResponse.json({ success: false, error: 'Unauthorized.' }, { status: 401 });
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

    const searchParams = request.nextUrl.searchParams;
    const addressId = searchParams.get('id');

    if (!addressId) {
      return NextResponse.json({ success: false, error: 'Address ID required.' }, { status: 400 });
    }

    const ok = userScopedDataStore.deleteAddress(addressId, memberId);
    return NextResponse.json({ success: ok });
  } catch (error) {
    console.error('Error deleting address:', error);
    return NextResponse.json({ success: false, error: 'Failed to delete address.' }, { status: 500 });
  }
}
