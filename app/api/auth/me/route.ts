import { NextRequest, NextResponse } from 'next/server';
import { getWixClient, WIX_TOKENS_COOKIE, type Tokens } from '@/lib/wix';

export async function GET(request: NextRequest) {
  try {
    const tokensCookie = request.cookies.get(WIX_TOKENS_COOKIE)?.value;

    if (!tokensCookie) {
      return NextResponse.json({
        isLoggedIn: false,
        user: null,
        member: null,
      });
    }

    let tokens: Tokens;
    try {
      tokens = JSON.parse(tokensCookie);
    } catch {
      return NextResponse.json({
        isLoggedIn: false,
        user: null,
        member: null,
      });
    }

    const client = getWixClient(tokens);

    try {
      const response = await client.members.getCurrentMember();
      const member = response?.member;

      if (!member) {
        return NextResponse.json({
          isLoggedIn: false,
          user: null,
          member: null,
        });
      }

      const firstName = member.contact?.firstName || '';
      const lastName = member.contact?.lastName || '';
      const fullName = `${firstName} ${lastName}`.trim() || member.profile?.nickname || 'Member';

      const email =
        member.loginEmail ||
        (member.contact?.emails && member.contact.emails.length > 0
          ? member.contact.emails[0]
          : '');

      const avatarMonogram =
        firstName && lastName
          ? `${firstName[0]}${lastName[0]}`.toUpperCase()
          : fullName
            ? fullName.substring(0, 2).toUpperCase()
            : 'AM';

      const user = {
        id: member._id || '',
        name: fullName,
        firstName,
        lastName,
        email,
        phones: member.contact?.phones || [],
        addresses: member.contact?.addresses || [],
        avatarUrl: member.profile?.photo?.url || null,
        avatarMonogram,
        status: member.status,
      };

      return NextResponse.json({
        isLoggedIn: true,
        user,
        member,
      });
    } catch (memberError) {
      console.warn('Wix getCurrentMember error (token might be expired or guest):', memberError);
      return NextResponse.json({
        isLoggedIn: false,
        user: null,
        member: null,
      });
    }
  } catch (error) {
    console.error('Error in /api/auth/me:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve member session' },
      { status: 500 }
    );
  }
}
