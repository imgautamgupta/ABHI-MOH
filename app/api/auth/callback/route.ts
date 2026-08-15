import { NextRequest, NextResponse } from 'next/server';
import { wixClient, WIX_OAUTH_DATA_COOKIE, WIX_TOKENS_COOKIE, type OauthData } from '@/lib/wix';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const state = searchParams.get('state');
  const error = searchParams.get('error');
  const errorDescription = searchParams.get('error_description');

  const origin = new URL(request.url).origin;

  if (error) {
    console.error('Wix OAuth callback error:', error, errorDescription);
    const redirectUrl = new URL('/?auth_error=' + encodeURIComponent(errorDescription || error), origin);
    return NextResponse.redirect(redirectUrl);
  }

  if (!code || !state) {
    console.error('Missing code or state in Wix OAuth callback');
    return NextResponse.redirect(new URL('/?auth_error=missing_parameters', origin));
  }

  const oauthDataCookie = request.cookies.get(WIX_OAUTH_DATA_COOKIE)?.value;

  if (!oauthDataCookie) {
    console.error('Missing OAuth state cookie in Wix OAuth callback');
    return NextResponse.redirect(new URL('/?auth_error=session_expired', origin));
  }

  let oauthData: OauthData;
  try {
    oauthData = JSON.parse(oauthDataCookie);
  } catch (err) {
    console.error('Failed to parse OAuth cookie data:', err);
    return NextResponse.redirect(new URL('/?auth_error=invalid_session', origin));
  }

  if (oauthData.state !== state) {
    console.error('OAuth state mismatch in Wix callback');
    return NextResponse.redirect(new URL('/?auth_error=state_mismatch', origin));
  }

  try {
    // Exchange the authorization code for member tokens using PKCE verifier
    const tokens = await wixClient.auth.getMemberTokens(code, state, oauthData);

    // Determine target redirection URL safely
    let targetUrl = oauthData.originalUri || '/account';
    if (!targetUrl.startsWith('/')) {
      try {
        const parsed = new URL(targetUrl);
        targetUrl = parsed.pathname + parsed.search + parsed.hash;
      } catch {
        targetUrl = '/account';
      }
    }

    const response = NextResponse.redirect(new URL(targetUrl, origin));

    // Store member tokens in secure cookie
    response.cookies.set(WIX_TOKENS_COOKIE, JSON.stringify(tokens), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });

    // Clear temporary OAuth data cookie
    response.cookies.delete(WIX_OAUTH_DATA_COOKIE);

    return response;
  } catch (err) {
    console.error('Failed to exchange member tokens:', err);
    return NextResponse.redirect(new URL('/?auth_error=token_exchange_failed', origin));
  }
}
