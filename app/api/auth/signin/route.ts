import { NextRequest, NextResponse } from 'next/server';
import { getWixClient, WIX_TOKENS_COOKIE } from '@/lib/wix';
import { LoginState } from '@wix/sdk';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, keepSignedIn = true } = body as {
      email: string;
      password: string;
      keepSignedIn?: boolean;
    };

    if (!email || !password) {
      return NextResponse.json({ success: false, error: 'Email and password are required.' }, { status: 400 });
    }

    // Create a fresh client (no existing tokens) for login
    const client = getWixClient();

    // Step 1: Login with email + password
    const loginResponse = await client.auth.login({ email, password });

    if (loginResponse.loginState === LoginState.SUCCESS) {
      return NextResponse.json({
        success: true,
        loginState: LoginState.SUCCESS,
        sessionToken: loginResponse.data.sessionToken,
      });
    }

    if (loginResponse.loginState === LoginState.EMAIL_VERIFICATION_REQUIRED) {
      return NextResponse.json(
        { success: false, error: 'EMAIL_VERIFICATION_REQUIRED', needsVerification: true },
        { status: 200 }
      );
    }

    if (loginResponse.loginState === LoginState.OWNER_APPROVAL_REQUIRED) {
      return NextResponse.json(
        { success: false, error: 'Your account is pending approval.' },
        { status: 200 }
      );
    }

    // FAILURE / unknown state
    return NextResponse.json(
      { success: false, error: 'The email or password you entered is incorrect.' },
      { status: 200 }
    );
  } catch (err: unknown) {
    console.error('[/api/auth/signin] Error:', err);

    const message = err instanceof Error ? err.message : String(err);

    // Wix throws on invalid credentials — detect the known error shape
    if (message.toLowerCase().includes('invalid') || message.toLowerCase().includes('unauthorized')) {
      return NextResponse.json(
        { success: false, error: 'The email or password you entered is incorrect.' },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { success: false, error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    );
  }
}
