export type AccountTabMode = 'signin' | 'signup' | 'loggedin';

export interface UserProfile {
  name: string;
  email: string;
  avatarMonogram: string;
}
