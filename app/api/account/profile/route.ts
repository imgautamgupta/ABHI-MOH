import { NextRequest, NextResponse } from 'next/server';
import { getWixClient, WIX_TOKENS_COOKIE, type Tokens } from '@/lib/wix';
import {
  fetchMemberOrdersFromWix,
  computeMembershipFromOrders,
  userScopedDataStore,
  createEmptyDossier,
} from '@/lib/account/account.service';

export async function GET(request: NextRequest) {
  try {
    const tokensCookie = request.cookies.get(WIX_TOKENS_COOKIE)?.value;

    if (!tokensCookie) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized. Please sign in.' },
        { status: 401 }
      );
    }

    let tokens: Tokens;
    try {
      tokens = JSON.parse(tokensCookie);
    } catch {
      return NextResponse.json(
        { success: false, error: 'Invalid session.' },
        { status: 401 }
      );
    }

    const client = getWixClient(tokens);
    const memberRes = await client.members.getCurrentMember();
    const member = memberRes?.member;
    const memberId = member?._id;

    if (!member || !memberId) {
      return NextResponse.json(
        { success: false, error: 'Member profile not found.' },
        { status: 401 }
      );
    }

    const firstName = member.contact?.firstName || '';
    const lastName = member.contact?.lastName || '';
    const fullName = `${firstName} ${lastName}`.trim() || member.profile?.nickname || 'Client';
    const email =
      member.loginEmail ||
      (member.contact?.emails && member.contact.emails.length > 0 ? member.contact.emails[0] : '');
    const phone = member.contact?.phones && member.contact.phones.length > 0 ? member.contact.phones[0] : '';

    const avatarMonogram =
      firstName && lastName
        ? `${firstName[0]}${lastName[0]}`.toUpperCase()
        : fullName
        ? fullName.slice(0, 2).toUpperCase()
        : 'AM';

    // Fetch real orders from Wix for this member
    const orders = await fetchMemberOrdersFromWix(tokens, memberId);

    // Compute membership strictly on the server from the verified real orders
    const membership = computeMembershipFromOrders(orders);

    // Saved addresses: merge from Wix contact addresses + userScopedDataStore
    const customAddresses = userScopedDataStore.getAddresses(memberId);
    const wixAddresses = (member.contact?.addresses || []).map((addr: any, idx: number) => ({
      id: addr._id || `wix_addr_${idx}`,
      title: addr.tag || 'Saved Address',
      recipientName: fullName,
      phone: phone || '',
      addressLine1: addr.addressLine1 || addr.streetAddress?.name || '',
      addressLine2: addr.addressLine2 || '',
      city: addr.city || '',
      state: addr.subdivision || '',
      pincode: addr.postalCode || '',
      country: addr.country || 'India',
      isDefault: idx === 0 && customAddresses.length === 0,
    }));

    const savedAddresses = [...customAddresses, ...wixAddresses];
    const returnRequests = userScopedDataStore.getReturns(memberId);

    const dossier = {
      userId: memberId,
      name: fullName,
      firstName,
      lastName,
      email,
      phone,
      avatarMonogram,
      avatarUrl: member.profile?.photo?.url || null,
      membership,
      orders,
      savedAddresses,
      returnRequests,
      wishlistIds: [],
      security: {
        twoFactorEnabled: false,
        lastLogin: 'Active Wix Session',
        loginMethod: 'Wix OAuth 2.0 Direct Session',
      },
    };

    return NextResponse.json({
      success: true,
      dossier,
    });
  } catch (error) {
    console.error('Error fetching profile dossier:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to retrieve profile dossier.' },
      { status: 500 }
    );
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
    const member = memberRes?.member;
    const memberId = member?._id;

    if (!memberId) {
      return NextResponse.json({ success: false, error: 'Member not found.' }, { status: 401 });
    }

    const body = await request.json();
    const { action, profile } = body;

    if (action === 'update_profile' && profile) {
      const nameParts = (profile.name || '').trim().split(/\s+/);
      const firstName = nameParts[0] || '';
      const lastName = nameParts.slice(1).join(' ') || '';

      await client.members.updateMember(memberId, {
        contact: {
          ...(firstName && { firstName }),
          ...(lastName && { lastName }),
          ...(profile.phone && { phones: [profile.phone] }),
        },
      });

      return NextResponse.json({ success: true, message: 'Profile updated in Wix successfully.' });
    }

    return NextResponse.json({ success: false, error: 'Invalid action.' }, { status: 400 });
  } catch (error) {
    console.error('Error updating profile:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update profile.' },
      { status: 500 }
    );
  }
}
