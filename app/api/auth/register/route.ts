import { NextRequest, NextResponse } from 'next/server';
import { getWixClient, WIX_TOKENS_COOKIE } from '@/lib/wix';
import { LoginState } from '@wix/sdk';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      name,
      email,
      password,
      mobile,
      consentMarketing = false,
      keepSignedIn = true,
    } = body as {
      name: string;
      email: string;
      password: string;
      mobile?: string;
      consentMarketing?: boolean;
      keepSignedIn?: boolean;
    };

    if (!name || !email || !password) {
      return NextResponse.json(
        { success: false, error: 'Name, email, and password are required.' },
        { status: 400 }
      );
    }

    const client = getWixClient();

    // Split name into first + last
    const nameParts = name.trim().split(/\s+/);
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || '';

    // Step 1: Register the member with Wix
    // RegisterParams = { email, password, profile?: IdentityProfile }
    const registerResponse = await client.auth.register({
      email,
      password,
      profile: {
        nickname: firstName,
        firstName,
        lastName,
      },
    });

    // Handle duplicate email: loginState=FAILURE, errorCode='emailAlreadyExists'
    if (registerResponse.loginState === LoginState.FAILURE) {
      const errState = registerResponse as { loginState: string; errorCode?: string; error?: string };
      if (errState.errorCode === 'emailAlreadyExists') {
        return NextResponse.json(
          { success: false, error: 'EMAIL_EXISTS', email },
          { status: 200 }
        );
      }
      return NextResponse.json(
        { success: false, error: errState.error || 'Registration could not be completed.' },
        { status: 200 }
      );
    }

    // Handle verification required
    if (registerResponse.loginState === LoginState.EMAIL_VERIFICATION_REQUIRED) {
      return NextResponse.json(
        { success: false, error: 'EMAIL_VERIFICATION_REQUIRED', needsVerification: true },
        { status: 200 }
      );
    }

    if (registerResponse.loginState === LoginState.SUCCESS) {
      const successState = registerResponse as { loginState: string; data: { sessionToken: string } };
      return NextResponse.json({
        success: true,
        loginState: LoginState.SUCCESS,
        sessionToken: successState.data.sessionToken,
        firstName,
        lastName,
        email,
      });
    }

    return NextResponse.json(
      { success: false, error: 'Registration could not be completed. Please try again.' },
      { status: 200 }
    );
  } catch (err: unknown) {
    console.error('[/api/auth/register] Error:', err);

    const message = err instanceof Error ? err.message : String(err);
    if (
      message.toLowerCase().includes('already') ||
      message.toLowerCase().includes('exists') ||
      message.toLowerCase().includes('duplicate')
    ) {
      return NextResponse.json({ success: false, error: 'EMAIL_EXISTS' }, { status: 200 });
    }

    return NextResponse.json(
      { success: false, error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    );
  }
}
