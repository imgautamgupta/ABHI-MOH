import { NextRequest, NextResponse } from 'next/server';
import { wixClient, WIX_OAUTH_DATA_COOKIE } from '@/lib/wix';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const returnUrl = searchParams.get('returnUrl') || '/account';

    // Construct the absolute callback URL based on host/headers
    const origin =
      request.headers.get('origin') ||
      request.headers.get('x-forwarded-host')
        ? `${request.headers.get('x-forwarded-proto') || 'http'}://${request.headers.get('x-forwarded-host') || request.headers.get('host')}`
        : new URL(request.url).origin;

    const redirectUri = `${origin}/api/auth/callback`;

    // Generate OAuth 2.0 PKCE data
    const oauthData = wixClient.auth.generateOAuthData(redirectUri, returnUrl);

    // Retrieve Wix managed login URL
    const { authUrl } = await wixClient.auth.getAuthUrl(oauthData, {
      responseMode: 'query',
    });

    const isJsonRequested = request.headers.get('accept')?.includes('application/json');

    const response = isJsonRequested
      ? NextResponse.json({ authUrl, success: true })
      : NextResponse.redirect(authUrl);

    // Save oauthData to a secure cookie for validation during callback
    response.cookies.set(WIX_OAUTH_DATA_COOKIE, JSON.stringify(oauthData), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 15, // 15 minutes
    });

    return response;
  } catch (error) {
    console.error('Error generating Wix OAuth login URL:', error);
    return NextResponse.json(
      { error: 'Failed to initiate Wix login flow' },
      { status: 500 }
    );
  }
}
