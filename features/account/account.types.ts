export type AccountTabMode = 'signin' | 'signup' | 'loggedin';

export interface MemberAddress {
  _id?: string;
  streetAddress?: {
    number?: string;
    name?: string;
  };
  city?: string;
  subdivision?: string; // state / province
  country?: string;
  postalCode?: string;
  formatted?: string;
}

export interface UserProfile {
  id: string;
  name: string;
  firstName?: string;
  lastName?: string;
  email: string;
  avatarMonogram: string;
  avatarUrl?: string | null;
  phones?: string[];
  addresses?: MemberAddress[];
  status?: string;
}

export interface AuthContextType {
  user: UserProfile | null;
  member: unknown | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  login: (returnUrl?: string) => void;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

export * from '@/lib/account/types';
