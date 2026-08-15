import { createClient, OAuthStrategy, type Tokens, type OauthData } from '@wix/sdk';
import { products, collections } from '@wix/stores';
import { members } from '@wix/members';

export const WIX_TOKENS_COOKIE = 'wix_tokens';
export const WIX_OAUTH_DATA_COOKIE = 'wix_oauth_data';

const clientId = process.env.NEXT_PUBLIC_WIX_CLIENT_ID || '';

/**
 * Creates a Wix Client configured with the store and members modules.
 * If tokens are passed, the client will make authenticated calls on behalf of that member/visitor.
 */
export function getWixClient(tokens?: Tokens) {
  return createClient({
    modules: {
      products,
      collections,
      members,
    },
    auth: OAuthStrategy({
      clientId,
      tokens: tokens || undefined,
    }),
  });
}

/**
 * Global default client for unauthenticated or public operations (e.g. fetching products)
 */
export const wixClient = getWixClient();

export type { Tokens, OauthData };