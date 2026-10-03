import { NextRequest, NextResponse } from 'next/server';
import { WIX_TOKENS_COOKIE, WIX_OAUTH_DATA_COOKIE, getWixClient, type Tokens } from '@/lib/wix';

export async function GET(request: NextRequest) {
  return handleLogout(request);
}

export async function POST(request: NextRequest) {
  return handleLogout(request);
}

async function handleLogout(request: NextRequest) {
  const host = request.headers.get('x-forwarded-host') || request.headers.get('host') || new URL(request.url).host;
  const proto = request.headers.get('x-forwarded-proto') || (request.url.startsWith('https') ? 'https' : 'http');
  const origin = `${proto}://${host}`;
  const isJsonRequested = request.headers.get('accept')?.includes('application/json');

  const tokensCookie = request.cookies.get(WIX_TOKENS_COOKIE)?.value;
  let logoutUrl = '/';

  if (tokensCookie) {
    try {
      const tokens: Tokens = JSON.parse(tokensCookie);
      const authenticatedClient = getWixClient(tokens);
      const res = await authenticatedClient.auth.logout(origin);
      if (res?.logoutUrl) {
        logoutUrl = res.logoutUrl;
      }
    } catch (err) {
      console.warn('Wix logout call warning:', err);
    }
  }

  const response = isJsonRequested
    ? NextResponse.json({ success: true, logoutUrl })
    : NextResponse.redirect(new URL('/', origin));

  // Clear token cookies
  response.cookies.delete(WIX_TOKENS_COOKIE);
  response.cookies.delete('wix_access_token');
  response.cookies.delete('wix_refresh_token');
  response.cookies.delete(WIX_OAUTH_DATA_COOKIE);

  return response;
}
