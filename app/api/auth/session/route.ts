import { NextRequest, NextResponse } from 'next/server';
import { getWixClient, WIX_TOKENS_COOKIE, type Tokens } from '@/lib/wix';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      tokens,
      keepSignedIn = true,
      profile,
    } = body as {
      tokens?: Tokens;
      keepSignedIn?: boolean;
      profile?: {
        name?: string;
        firstName?: string;
        lastName?: string;
        mobile?: string;
      };
    };

    if (!tokens || !tokens.accessToken?.value || !tokens.refreshToken?.value) {
      return NextResponse.json(
        { success: false, error: 'Invalid or missing member tokens.' },
        { status: 400 }
      );
    }

    const cookieMaxAge = keepSignedIn ? 60 * 60 * 24 * 30 : 60 * 60 * 24; // 30 days or 1 day

    // If mobile number or name is provided (e.g. fresh registration), update contact
    if (profile) {
      const cleanMobile = profile.mobile ? profile.mobile.replace(/\D/g, '').slice(0, 10) : '';
      const firstName = profile.firstName || (profile.name ? profile.name.trim().split(/\s+/)[0] : '');
      const lastName = profile.lastName || (profile.name ? profile.name.trim().split(/\s+/).slice(1).join(' ') : '');

      if (cleanMobile.length === 10 || firstName || lastName) {
        try {
          const authedClient = getWixClient(tokens);
          const meResponse = await authedClient.members.getCurrentMember();
          const memberId = meResponse?.member?._id;

          if (memberId) {
            await authedClient.members.updateMember(memberId, {
              contact: {
                ...(firstName && { firstName }),
                ...(lastName && { lastName }),
                ...(cleanMobile.length === 10 && { phones: [`+91${cleanMobile}`] }),
              },
            });
          }
        } catch (contactErr) {
          console.warn('[/api/auth/session] Contact update warning:', contactErr);
        }
      }
    }

    const response = NextResponse.json({ success: true });

    // 1. Primary multi-token cookie used by /api/auth/me and server components
    response.cookies.set(WIX_TOKENS_COOKIE, JSON.stringify(tokens), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: cookieMaxAge,
    });

    // 2. Individual access and refresh token cookies for maximum compatibility
    response.cookies.set('wix_access_token', tokens.accessToken.value, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: tokens.accessToken.expiresAt
        ? Math.max(0, Math.floor((tokens.accessToken.expiresAt * 1000 - Date.now()) / 1000))
        : cookieMaxAge,
    });

    response.cookies.set('wix_refresh_token', tokens.refreshToken.value, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: cookieMaxAge,
    });

    return response;
  } catch (error) {
    console.error('[/api/auth/session] Error setting session:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to establish member session.' },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  const response = NextResponse.json({ success: true });
  response.cookies.delete(WIX_TOKENS_COOKIE);
  response.cookies.delete('wix_access_token');
  response.cookies.delete('wix_refresh_token');
  return response;
}
