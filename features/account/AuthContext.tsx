'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { AuthContextType, UserProfile } from './account.types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [member, setMember] = useState<unknown | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fetchCurrentMember = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await fetch('/api/auth/me', {
        headers: {
          Accept: 'application/json',
        },
        cache: 'no-store',
      });

      if (res.ok) {
        const data = await res.json();
        if (data.isLoggedIn && data.user) {
          setUser(data.user);
          setMember(data.member);
          setIsLoggedIn(true);
        } else {
          setUser(null);
          setMember(null);
          setIsLoggedIn(false);
        }
      } else {
        setUser(null);
        setMember(null);
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.warn('Failed to load member auth session:', error);
      setUser(null);
      setMember(null);
      setIsLoggedIn(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCurrentMember();
  }, [fetchCurrentMember]);

  const login = useCallback((returnUrl?: string) => {
    const currentPath =
      typeof window !== 'undefined'
        ? window.location.pathname + window.location.search
        : '/account';
    const destination = returnUrl || currentPath || '/account';

    // Validate relative path on our own site
    const safeDestination =
      destination.startsWith('/') &&
      !destination.startsWith('//') &&
      !destination.startsWith('/\\')
        ? destination
        : '/account';

    const loginTarget = `/login?returnTo=${encodeURIComponent(safeDestination)}`;
    if (typeof window !== 'undefined') {
      window.location.href = loginTarget;
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      setIsLoading(true);
      await fetch('/api/auth/logout', {
        method: 'POST',
        headers: { Accept: 'application/json' },
      });
      setUser(null);
      setMember(null);
      setIsLoggedIn(false);
      if (typeof window !== 'undefined') {
        if (window.location.pathname.startsWith('/account')) {
          window.location.href = '/';
        } else {
          window.location.reload();
        }
      }
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const value = useMemo<AuthContextType>(
    () => ({
      user,
      member,
      isLoggedIn,
      isLoading,
      login,
      logout,
      refreshUser: fetchCurrentMember,
    }),
    [user, member, isLoggedIn, isLoading, login, logout, fetchCurrentMember]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
