import { NextRequest, NextResponse } from 'next/server';
import { getWixClient } from '@/lib/wix';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body as { email: string };

    if (!email) {
      return NextResponse.json(
        { success: false, error: 'Email is required.' },
        { status: 400 }
      );
    }

    const host =
      request.headers.get('x-forwarded-host') ||
      request.headers.get('host') ||
      new URL(request.url).host;
    const proto =
      request.headers.get('x-forwarded-proto') ||
      (request.url.startsWith('https') ? 'https' : 'http');
    const redirectUri = `${proto}://${host}/login`;

    const client = getWixClient();
    await client.auth.sendPasswordResetEmail(email, redirectUri);

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    console.error('[/api/auth/forgot-password] Error:', err);
    // Always return success to avoid email enumeration
    return NextResponse.json({ success: true });
  }
}
