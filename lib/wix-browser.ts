'use client';

import { createClient, OAuthStrategy, LoginState, type Tokens } from '@wix/sdk';

const clientId = process.env.NEXT_PUBLIC_WIX_CLIENT_ID || '';

let browserClientInstance: ReturnType<typeof createClient> | null = null;

/**
 * Returns a shared browser-side Wix client instance with OAuthStrategy.
 */
export function getBrowserWixClient() {
  if (typeof window === 'undefined') {
    return createClient({
      auth: OAuthStrategy({ clientId }),
    });
  }

  if (!browserClientInstance) {
    browserClientInstance = createClient({
      auth: OAuthStrategy({ clientId }),
    });
  }

  return browserClientInstance;
}

/**
 * Detects whether the current device is a mobile browser or webview where
 * third-party cookie restrictions frequently block the hidden iframe PKCE flow.
 */
export function isMobileDevice(): boolean {
  if (typeof window === 'undefined') return false;
  const ua = navigator.userAgent || '';
  const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
  const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  const isNarrow = window.innerWidth < 768;
  return mobileRegex.test(ua) || (isTouch && isNarrow);
}

export interface DirectTokenExchangeResult {
  success: boolean;
  tokens?: Tokens;
  timedOut?: boolean;
  error?: string;
}

/**
 * Exchanges a sessionToken for member access/refresh tokens in the browser
 * using Wix's hidden iframe direct login method, bounded by an 8-second timeout.
 */
export async function exchangeDirectLoginTokens(
  sessionToken: string,
  timeoutMs = 8000
): Promise<Tokens> {
  const client = getBrowserWixClient();

  const iframePromise = client.auth.getMemberTokensForDirectLogin(sessionToken);

  const timeoutPromise = new Promise<never>((_, reject) => {
    const timer = setTimeout(() => {
      clearTimeout(timer);
      reject(new Error('DIRECT_LOGIN_TIMEOUT'));
    }, timeoutMs);
  });

  const tokens = await Promise.race([iframePromise, timeoutPromise]);
  client.auth.setTokens(tokens);
  return tokens;
}

/**
 * Stores tokens securely in httpOnly cookies via the server /api/auth/session route.
 */
export async function syncSessionToServer(
  tokens: Tokens,
  keepSignedIn = true,
  profile?: { name?: string; firstName?: string; lastName?: string; mobile?: string }
): Promise<boolean> {
  try {
    const res = await fetch('/api/auth/session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tokens, keepSignedIn, profile }),
    });
    const data = await res.json();
    return Boolean(data.success);
  } catch (err) {
    console.error('Failed to sync tokens to /api/auth/session:', err);
    return false;
  }
}

/**
 * Fallback redirect flow when iframe token exchange is blocked or times out.
 * Calls /api/auth/login to generate an OAuth redirect URL with the sessionToken,
 * then navigates the user's browser there for seamless silent authentication.
 */
export async function initiateRedirectLogin(
  returnTo = '/account',
  sessionToken?: string
): Promise<void> {
  if (typeof window === 'undefined') return;

  const params = new URLSearchParams();
  if (returnTo) params.set('returnTo', returnTo);
  if (sessionToken) params.set('sessionToken', sessionToken);

  const endpoint = `/api/auth/login?${params.toString()}`;

  try {
    const res = await fetch(endpoint, {
      headers: { Accept: 'application/json' },
    });
    const data = await res.json();
    if (data.authUrl) {
      window.location.href = data.authUrl;
      return;
    }
  } catch (e) {
    console.warn('Failed to fetch redirect URL as JSON, falling back to direct navigation:', e);
  }

  // Fallback direct navigation to route
  window.location.href = endpoint;
}

export interface BrowserAuthResult {
  success: boolean;
  loginState?: LoginState;
  sessionToken?: string;
  error?: string;
  errorCode?: string;
  needsVerification?: boolean;
  firstName?: string;
  lastName?: string;
}

/**
 * Executes login in the browser via SDK OAuthStrategy, falling back to /api/auth/signin
 */
export async function browserLogin(email: string, password: string): Promise<BrowserAuthResult> {
  try {
    const client = getBrowserWixClient();
    const loginRes = await client.auth.login({ email, password });

    if (loginRes.loginState === LoginState.SUCCESS && loginRes.data?.sessionToken) {
      return {
        success: true,
        loginState: loginRes.loginState,
        sessionToken: loginRes.data.sessionToken,
      };
    }

    if (loginRes.loginState === LoginState.EMAIL_VERIFICATION_REQUIRED) {
      return {
        success: false,
        loginState: loginRes.loginState,
        needsVerification: true,
      };
    }

    if (loginRes.loginState === LoginState.OWNER_APPROVAL_REQUIRED) {
      return {
        success: false,
        loginState: loginRes.loginState,
        error: 'Your account is pending owner approval.',
      };
    }

    const errState = loginRes as { error?: string; errorCode?: string };
    return {
      success: false,
      loginState: loginRes.loginState,
      errorCode: errState.errorCode,
      error: errState.error || 'The email or password you entered is incorrect.',
    };
  } catch (browserErr) {
    console.warn('Direct browser auth.login encountered error, trying API fallback:', browserErr);
    try {
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      return await res.json();
    } catch {
      return {
        success: false,
        error: 'Unable to connect to authentication server. Please check your connection.',
      };
    }
  }
}

/**
 * Executes registration in the browser via SDK OAuthStrategy, falling back to /api/auth/register
 */
export async function browserRegister(params: {
  name: string;
  email: string;
  password: string;
  mobile?: string;
}): Promise<BrowserAuthResult> {
  const nameParts = params.name.trim().split(/\s+/);
  const firstName = nameParts[0] || '';
  const lastName = nameParts.slice(1).join(' ') || '';

  try {
    const client = getBrowserWixClient();
    const regRes = await client.auth.register({
      email: params.email,
      password: params.password,
      profile: {
        nickname: firstName,
        firstName,
        lastName,
      },
    });

    if (regRes.loginState === LoginState.SUCCESS && (regRes as { data?: { sessionToken?: string } }).data?.sessionToken) {
      return {
        success: true,
        loginState: regRes.loginState,
        sessionToken: (regRes as { data: { sessionToken: string } }).data.sessionToken,
        firstName,
        lastName,
      };
    }

    if (regRes.loginState === LoginState.FAILURE) {
      const err = regRes as { errorCode?: string; error?: string };
      if (err.errorCode === 'emailAlreadyExists') {
        return { success: false, error: 'EMAIL_EXISTS', errorCode: 'emailAlreadyExists' };
      }
      return { success: false, error: err.error || 'Registration could not be completed.' };
    }

    if (regRes.loginState === LoginState.EMAIL_VERIFICATION_REQUIRED) {
      return { success: false, needsVerification: true, loginState: regRes.loginState };
    }

    return { success: false, error: 'Registration could not be completed.' };
  } catch (browserErr) {
    console.warn('Direct browser auth.register encountered error, trying API fallback:', browserErr);
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params),
      });
      return await res.json();
    } catch {
      return {
        success: false,
        error: 'Unable to connect to registration server. Please check your connection.',
      };
    }
  }
}

export { LoginState, type Tokens };

