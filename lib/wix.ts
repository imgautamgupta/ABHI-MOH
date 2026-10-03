import { createClient, OAuthStrategy, type Tokens, type OauthData } from '@wix/sdk';
import { products, collections, productGroupsV3 } from '@wix/stores';
import { categories } from '@wix/categories';
import { members } from '@wix/members';
import { checkout, orders } from '@wix/ecom';

export const WIX_TOKENS_COOKIE = 'wix_tokens';
export const WIX_OAUTH_DATA_COOKIE = 'wix_oauth_data';

const clientId = process.env.NEXT_PUBLIC_WIX_CLIENT_ID || '';

/**
 * Creates a Wix Client configured with the store, members, and ecom modules.
 * If tokens are passed, the client will make authenticated calls on behalf of that member/visitor.
 */
export function getWixClient(tokens?: Tokens) {
  return createClient({
    modules: {
      products,
      collections,
      productGroupsV3,
      members,
      checkout,
      orders,
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

/**
 * Separate client for Wix Categories API (@wix/categories).
 * The categories module is kept in its own client to avoid module conflicts
 * with the stores SDK, which does not re-export the Categories API.
 * Used exclusively in exclusive.service.ts (server-side only).
 */
export const wixCategoriesClient = createClient({
  modules: { categories },
  auth: OAuthStrategy({ clientId }),
});

export type { Tokens, OauthData };