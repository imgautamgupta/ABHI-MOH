import { NextRequest, NextResponse } from 'next/server';
import { WIX_TOKENS_COOKIE, WIX_OAUTH_DATA_COOKIE, getWixClient, type Tokens } from '@/lib/wix';

export async function GET(request: NextRequest) {
  return handleLogout(request);
}

export async function POST(request: NextRequest) {
  return handleLogout(request);
}

async function handleLogout(request: NextRequest) {
  const origin = new URL(request.url).origin;
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
  response.cookies.delete(WIX_OAUTH_DATA_COOKIE);

  return response;
}
