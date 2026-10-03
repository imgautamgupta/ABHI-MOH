'use client';

import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { TagThreadHole, RunningStitchLoader } from './auth.constants';
import { StitchedInput } from './StitchedInput';
import { ArrowRight, RotateCcw, Check } from 'lucide-react';

import {
  browserLogin,
  browserRegister,
  exchangeDirectLoginTokens,
  syncSessionToServer,
  initiateRedirectLogin,
  LoginState,
} from '@/lib/wix-browser';

export interface SilkTagCardProps {
  mode: 'login' | 'signup' | 'forgot' | 'verify';
  /** onModeChange: second arg is optional email to prefill in the new mode */
  onModeChange: (mode: 'login' | 'signup' | 'forgot' | 'verify', prefillEmail?: string) => void;
  onSuccess: (firstName: string) => void;
  /** prefillEmail: set from parent when switching due to duplicate email */
  prefillEmail?: string;
  returnTo?: string;
}

export const SilkTagCard: React.FC<SilkTagCardProps> = ({
  mode,
  onModeChange,
  onSuccess,
  prefillEmail,
  returnTo = '/account',
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // ── Form Fields ──────────────────────────────────────────────────────────────
  const [email, setEmail] = useState(prefillEmail || '');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [consent, setConsent] = useState(false);
  const [keepSignedIn, setKeepSignedIn] = useState(true);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const otpInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Sync prefillEmail → email field when switching modes
  useEffect(() => {
    if (prefillEmail) setEmail(prefillEmail);
  }, [prefillEmail]);

  // ── UI State ─────────────────────────────────────────────────────────────────
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [resetSent, setResetSent] = useState(false);

  // ── Reduced-motion preference ─────────────────────────────────────────────
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // ── GSAP Damped Pendulum Swing on Mount ──────────────────────────────────
  useEffect(() => {
    if (prefersReducedMotion || !cardRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current,
        { rotation: 3.5, transformOrigin: '50% 0%' },
        { rotation: 0, duration: 1.6, ease: 'elastic.out(1, 0.45)', clearProps: 'rotation' }
      );
    }, cardRef);
    return () => ctx.revert();
  }, [prefersReducedMotion]);

  // ── Card shake on error ───────────────────────────────────────────────────
  const triggerErrorShake = () => {
    if (prefersReducedMotion || !cardRef.current) return;
    gsap.fromTo(
      cardRef.current,
      { x: -5 },
      {
        x: 0,
        duration: 0.45,
        ease: 'rough({template: none.out, strength: 6, points: 10, taper: none, randomize: false, clamp: false})',
        clearProps: 'x',
      }
    );
  };

  // ── Validators ───────────────────────────────────────────────────────────
  const validateEmail = (val: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
  const validateMobile = (val: string) => /^[6-9]\d{9}$/.test(val.replace(/\D/g, ''));

  // ── Password strength ─────────────────────────────────────────────────────
  const getPasswordStrength = (pwd: string) => {
    if (!pwd) return null;
    let score = 0;
    if (pwd.length >= 8) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;
    if (score <= 1) return { label: 'Gentle', color: 'bg-amber-400' };
    if (score === 2) return { label: 'Medium', color: 'bg-[#C29F62]' };
    return { label: 'Heirloom Strong', color: 'bg-emerald-600' };
  };

  // ── Switch mode helper (clears errors) ───────────────────────────────────
  const switchMode = (next: 'login' | 'signup' | 'forgot' | 'verify') => {
    setErrors({});
    setPassword('');
    onModeChange(next);
  };

  // ─────────────────────────────────────────────────────────────────────────────
  // 1. LOGIN SUBMIT
  // ─────────────────────────────────────────────────────────────────────────────
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!email) {
      newErrors.email = 'Please provide your registered email address.';
    } else if (!validateEmail(email)) {
      newErrors.email = 'Please enter a valid email (e.g. name@domain.com).';
    }
    if (!password) {
      newErrors.password = 'Please enter your account password.';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      triggerErrorShake();
      return;
    }

    setErrors({});
    setIsLoading(true);

    try {
      const authResult = await browserLogin(email, password);

      if (
        authResult.needsVerification ||
        authResult.loginState === LoginState.EMAIL_VERIFICATION_REQUIRED
      ) {
        switchMode('verify');
        return;
      }

      if (!authResult.success || !authResult.sessionToken) {
        setErrors({ password: authResult.error || 'The email or password you entered is incorrect.' });
        triggerErrorShake();
        return;
      }

      // Step 2: Exchange sessionToken in the browser (SDK iframe flow bounded by 8s)
      try {
        const tokens = await exchangeDirectLoginTokens(authResult.sessionToken, 8000);
        const synced = await syncSessionToServer(tokens, keepSignedIn);
        if (!synced) {
          throw new Error('SESSION_SYNC_FAILED');
        }

        const displayName = email.split('@')[0];
        const capitalized = displayName.charAt(0).toUpperCase() + displayName.slice(1);
        onSuccess(capitalized);
        return;
      } catch (exchangeErr) {
        console.warn(
          'Direct token exchange timed out or blocked by browser; falling back to redirect flow:',
          exchangeErr
        );
        // Mobile or iframe timeout fallback: seamlessly redirect via /api/auth/login with sessionToken
        await initiateRedirectLogin(returnTo, authResult.sessionToken);
        return;
      }
    } catch {
      setErrors({ email: 'An atelier connection error occurred. Please try again.' });
      triggerErrorShake();
    } finally {
      setIsLoading(false);
    }
  };

  // ─────────────────────────────────────────────────────────────────────────────
  // 2. SIGNUP SUBMIT
  // ─────────────────────────────────────────────────────────────────────────────
  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!name.trim()) newErrors.name = 'Please provide your full name.';
    if (!email) {
      newErrors.email = 'Please provide an email address.';
    } else if (!validateEmail(email)) {
      newErrors.email = 'Please enter a valid email format.';
    }
    const cleanMobile = mobile.replace(/\D/g, '');
    if (!cleanMobile) {
      newErrors.mobile = 'Please enter your mobile number.';
    } else if (!validateMobile(cleanMobile)) {
      newErrors.mobile = 'Please enter a valid 10-digit Indian mobile number.';
    }
    if (!password) {
      newErrors.password = 'Please choose a secure password.';
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      triggerErrorShake();
      return;
    }

    setErrors({});
    setIsLoading(true);

    try {
      const authResult = await browserRegister({
        name: name.trim(),
        email,
        password,
        mobile: cleanMobile,
      });

      if (authResult.error === 'EMAIL_EXISTS' || authResult.errorCode === 'emailAlreadyExists') {
        // Friendly duplicate-email handling: switch to login with email prefilled
        setErrors({});
        onModeChange('login', email);
        return;
      }

      if (
        authResult.needsVerification ||
        authResult.loginState === LoginState.EMAIL_VERIFICATION_REQUIRED
      ) {
        switchMode('verify');
        return;
      }

      if (!authResult.success || !authResult.sessionToken) {
        setErrors({ name: authResult.error || 'Registration could not be completed.' });
        triggerErrorShake();
        return;
      }

      const firstName = authResult.firstName || name.trim().split(/\s+/)[0] || 'Member';

      // Step 2: Exchange sessionToken for member tokens in the browser
      try {
        const tokens = await exchangeDirectLoginTokens(authResult.sessionToken, 8000);
        const synced = await syncSessionToServer(tokens, keepSignedIn, {
          name: name.trim(),
          firstName,
          lastName: authResult.lastName,
          mobile: cleanMobile,
        });
        if (!synced) {
          throw new Error('SESSION_SYNC_FAILED');
        }

        onSuccess(firstName);
        return;
      } catch (exchangeErr) {
        console.warn(
          'Signup direct token exchange timed out or blocked; falling back to redirect flow:',
          exchangeErr
        );
        await initiateRedirectLogin(returnTo, authResult.sessionToken);
        return;
      }
    } catch {
      setErrors({ name: 'An unexpected error occurred. Please try again.' });
      triggerErrorShake();
    } finally {
      setIsLoading(false);
    }
  };

  // ─────────────────────────────────────────────────────────────────────────────
  // 3. FORGOT PASSWORD SUBMIT
  // ─────────────────────────────────────────────────────────────────────────────
  const handleForgotSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !validateEmail(email)) {
      setErrors({ email: 'Please provide a valid registered email address.' });
      triggerErrorShake();
      return;
    }
    setErrors({});
    setIsLoading(true);
    try {
      await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      setResetSent(true);
    } catch {
      // Still show success to avoid email enumeration
      setResetSent(true);
    } finally {
      setIsLoading(false);
    }
  };

  // ─────────────────────────────────────────────────────────────────────────────
  // 4. OTP / VERIFY SUBMIT
  // ─────────────────────────────────────────────────────────────────────────────
  const handleOtpChange = (index: number, val: string) => {
    const digit = val.replace(/\D/g, '').slice(-1);
    const newOtp = [...otp];
    newOtp[index] = digit;
    setOtp(newOtp);
    if (digit && index < 5) otpInputRefs.current[index + 1]?.focus();
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerifySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const fullOtp = otp.join('');
    if (fullOtp.length < 6) {
      setErrors({ otp: 'Please enter all 6 digits of your verification code.' });
      triggerErrorShake();
      return;
    }
    setErrors({});
    setIsLoading(true);
    try {
      // TODO: wire processVerification when backend OTP handling is added
      await new Promise((res) => setTimeout(res, 900));
      onSuccess(name ? name.split(' ')[0] : 'Client');
    } catch {
      setErrors({ otp: 'The verification code provided has expired or is incorrect.' });
      triggerErrorShake();
    } finally {
      setIsLoading(false);
    }
  };

  const pwdStrength = getPasswordStrength(password);

  // ── Shared styles ─────────────────────────────────────────────────────────
  const outlinedSwitchBtn =
    'w-full h-11 mt-1 rounded-xs border border-[#7D2130] text-[#7D2130] hover:bg-[#7D2130] hover:text-[#FAF7F2] font-hero text-xs tracking-[0.18em] uppercase font-medium transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer focus:outline-none';

  // ── Keep Signed In checkbox ───────────────────────────────────────────────
  const KeepSignedInCheckbox = () => (
    <label className="flex items-center gap-2 cursor-pointer select-none group text-left">
      <input
        type="checkbox"
        checked={keepSignedIn}
        onChange={(e) => setKeepSignedIn(e.target.checked)}
        className="sr-only"
        id="keep-signed-in"
      />
      <div
        className={`w-4 h-4 rounded-xs border transition-colors flex items-center justify-center shrink-0 ${
          keepSignedIn
            ? 'bg-[#7D2130] border-[#7D2130] text-white'
            : 'bg-[#FAF7F2] border-[#D9C7A7] group-hover:border-[#7D2130]'
        }`}
      >
        {keepSignedIn && <Check className="w-3 h-3 stroke-[3]" />}
      </div>
      <span className="text-xs text-[#5C4D44] font-light">Keep me signed in</span>
    </label>
  );

  return (
    <div
      ref={cardRef}
      className="relative w-full max-w-[460px] mx-auto bg-[#FFFDFC] border border-[#D9C7A7]/70 rounded-[28px] p-6 sm:p-9 md:p-10 shadow-[0_12px_36px_rgba(56,44,38,0.07)] transition-all duration-300"
    >
      {/* BOUTIQUE HANG TAG EYELET HOLE & GOLD THREAD LOOP */}
      <TagThreadHole className="mb-2" />

      {/* TAG HEADING & MODE TOGGLE */}
      <div className="text-center mb-7">
        <span className="font-sans text-[10px] uppercase tracking-[0.24em] text-[#C29F62] font-semibold block mb-1">
          {mode === 'signup'
            ? 'Atelier Commission Registry'
            : mode === 'forgot'
            ? 'Account Recovery'
            : mode === 'verify'
            ? 'Two-Factor Authentication'
            : 'Private Client Dossier'}
        </span>
        <h2 className="font-hero text-2xl sm:text-3xl text-[#2A221E] font-normal tracking-tight">
          {mode === 'signup'
            ? 'Join the House'
            : mode === 'forgot'
            ? 'Reset Access'
            : mode === 'verify'
            ? 'Enter Code'
            : 'Sign In'}
        </h2>
        <div className="w-12 h-[1px] bg-[#D9C7A7] mx-auto mt-3" />
      </div>

      {/* ── 1. LOGIN FORM ───────────────────────────────────────────────────── */}
      {mode === 'login' && (
        <form onSubmit={handleLoginSubmit} noValidate className="space-y-4" autoComplete="on">
          {/* Duplicate-email info banner */}
          {prefillEmail && (
            <div className="flex items-start gap-2 p-3 rounded-xs bg-[#FAF7F2] border border-[#C29F62]/50 text-xs text-[#5C4D44] leading-relaxed">
              <span className="text-[#C29F62] text-base leading-none shrink-0 mt-0.5">ℹ</span>
              <span>
                An account already exists for <strong>{prefillEmail}</strong>. Please enter your
                password below.
              </span>
            </div>
          )}
          <StitchedInput
            label="Email Address"
            type="email"
            name="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (errors.email) setErrors((prev) => ({ ...prev, email: '' }));
            }}
            error={errors.email}
            isValid={validateEmail(email)}
            autoComplete="email"
            required
          />

          <StitchedInput
            label="Password"
            type="password"
            name="current-password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (errors.password) setErrors((prev) => ({ ...prev, password: '' }));
            }}
            error={errors.password}
            isValid={password.length >= 6}
            autoComplete="current-password"
            required
          />

          {/* Forgot Password */}
          <div className="flex items-center justify-between pt-1">
            <KeepSignedInCheckbox />
            <button
              type="button"
              onClick={() => {
                setErrors({});
                setResetSent(false);
                switchMode('forgot');
              }}
              className="text-xs text-[#736357] hover:text-[#7D2130] transition-colors underline-offset-4 hover:underline cursor-pointer focus:outline-none"
            >
              Forgot password?
            </button>
          </div>

          {/* Primary Action */}
          <button
            type="submit"
            disabled={isLoading}
            className="relative w-full h-12 mt-2 bg-[#7D2130] hover:bg-[#5E1522] text-[#FAF7F2] rounded-xs font-hero text-sm tracking-[0.2em] uppercase font-medium shadow-sm transition-all duration-300 hover:shadow-md cursor-pointer disabled:opacity-90 disabled:cursor-wait overflow-hidden group focus:outline-none"
          >
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none bg-[linear-gradient(110deg,transparent_20%,rgba(217,199,167,0.35)_50%,transparent_80%)]" />
            {isLoading ? (
              <RunningStitchLoader />
            ) : (
              <span className="flex items-center justify-center gap-2">
                <span>Sign In</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            )}
          </button>

          {/* Switch to Signup — outlined button */}
          <div className="pt-3 border-t border-[#D9C7A7]/30 mt-4">
            <button
              type="button"
              onClick={() => {
                setErrors({});
                switchMode('signup');
              }}
              className={outlinedSwitchBtn}
            >
              <span>New to ABHI-MOH?</span>
              <span className="font-semibold">Join the House</span>
            </button>
          </div>
        </form>
      )}

      {/* ── 2. SIGNUP FORM ─────────────────────────────────────────────────── */}
      {mode === 'signup' && (
        <form onSubmit={handleSignupSubmit} noValidate className="space-y-3.5" autoComplete="on">
          <StitchedInput
            label="Full Name"
            type="text"
            name="name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (errors.name) setErrors((prev) => ({ ...prev, name: '' }));
            }}
            error={errors.name}
            isValid={name.trim().length >= 3}
            autoComplete="name"
            required
          />

          <StitchedInput
            label="Email Address"
            type="email"
            name="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (errors.email) setErrors((prev) => ({ ...prev, email: '' }));
            }}
            error={errors.email}
            isValid={validateEmail(email)}
            autoComplete="email"
            required
          />

          <StitchedInput
            label="Mobile Number"
            type="tel"
            name="tel"
            prefixPill="+91"
            value={mobile}
            onChange={(e) => {
              const val = e.target.value.replace(/\D/g, '').slice(0, 10);
              setMobile(val);
              if (errors.mobile) setErrors((prev) => ({ ...prev, mobile: '' }));
            }}
            error={errors.mobile}
            isValid={validateMobile(mobile)}
            autoComplete="tel"
            required
            maxLength={10}
          />

          <div>
            <StitchedInput
              label="Create Password"
              type="password"
              name="new-password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errors.password) setErrors((prev) => ({ ...prev, password: '' }));
              }}
              error={errors.password}
              isValid={password.length >= 8}
              autoComplete="new-password"
              required
            />
            {/* Strength Hint */}
            {password && pwdStrength && (
              <div className="flex items-center gap-2 mt-1 text-[11px] text-[#736357]">
                <div className="w-16 h-1 bg-[#D9C7A7]/40 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${pwdStrength.color}`}
                    style={{
                      width:
                        pwdStrength.label === 'Heirloom Strong'
                          ? '100%'
                          : pwdStrength.label === 'Medium'
                          ? '60%'
                          : '30%',
                    }}
                  />
                </div>
                <span>{pwdStrength.label}</span>
              </div>
            )}
            {!password && (
              <span className="text-[10px] text-[#736357]/80 mt-1 block">
                At least 8 characters with letters &amp; numbers
              </span>
            )}
          </div>

          {/* Keep Signed In */}
          <div className="pt-1">
            <KeepSignedInCheckbox />
          </div>

          {/* Promotional consent */}
          <div className="pt-1">
            <label className="flex items-start gap-2.5 cursor-pointer select-none group text-left">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="sr-only"
              />
              <div
                className={`w-4 h-4 rounded-xs border transition-colors flex items-center justify-center shrink-0 mt-0.5 ${
                  consent
                    ? 'bg-[#C29F62] border-[#C29F62] text-white'
                    : 'bg-[#FAF7F2] border-[#C29F62]/70 group-hover:border-[#7D2130]'
                }`}
              >
                {consent && <Check className="w-3 h-3 stroke-[3]" />}
              </div>
              <span className="text-xs text-[#5C4D44] font-light leading-relaxed">
                I&apos;d like to receive bespoke offers and dispatch updates from ABHI-MOH on WhatsApp/SMS.
              </span>
            </label>
          </div>

          {/* Primary Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="relative w-full h-12 mt-2 bg-[#7D2130] hover:bg-[#5E1522] text-[#FAF7F2] rounded-xs font-hero text-sm tracking-[0.2em] uppercase font-medium shadow-sm transition-all duration-300 hover:shadow-md cursor-pointer disabled:opacity-90 disabled:cursor-wait overflow-hidden group focus:outline-none"
          >
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none bg-[linear-gradient(110deg,transparent_20%,rgba(217,199,167,0.35)_50%,transparent_80%)]" />
            {isLoading ? (
              <RunningStitchLoader />
            ) : (
              <span className="flex items-center justify-center gap-2">
                <span>Create Atelier Account</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            )}
          </button>

          {/* Switch to Login — outlined button */}
          <div className="pt-3 border-t border-[#D9C7A7]/30 mt-4">
            <button
              type="button"
              onClick={() => {
                setErrors({});
                switchMode('login');
              }}
              className={outlinedSwitchBtn}
            >
              <span>Already a member?</span>
              <span className="font-semibold">Sign In</span>
            </button>
          </div>
        </form>
      )}

      {/* ── 3. FORGOT PASSWORD FORM ─────────────────────────────────────────── */}
      {mode === 'forgot' && (
        <div>
          {resetSent ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-12 h-12 rounded-full bg-[#FAF7F2] border border-[#C29F62] flex items-center justify-center mx-auto text-[#7D2130]">
                <Check className="w-6 h-6 stroke-[2]" />
              </div>
              <h3 className="font-hero text-xl text-[#2A221E]">Instructions Dispatched</h3>
              <p className="text-xs text-[#736357] leading-relaxed max-w-xs mx-auto">
                We have sent private account recovery steps to <br />
                <span className="font-medium text-[#2A221E]">{email}</span>. Please inspect your
                inbox.
              </p>
              <button
                type="button"
                onClick={() => {
                  setResetSent(false);
                  switchMode('login');
                }}
                className="w-full h-11 bg-[#7D2130] text-[#FAF7F2] rounded-xs font-hero text-xs uppercase tracking-widest mt-4 cursor-pointer"
              >
                Return to Sign In
              </button>
            </div>
          ) : (
            <form onSubmit={handleForgotSubmit} noValidate className="space-y-5" autoComplete="on">
              <p className="text-xs text-[#736357] leading-relaxed text-center">
                Enter your registered email address and our atelier concierge will dispatch a secure
                recovery link.
              </p>

              <StitchedInput
                label="Registered Email"
                type="email"
                name="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors((prev) => ({ ...prev, email: '' }));
                }}
                error={errors.email}
                isValid={validateEmail(email)}
                autoComplete="email"
                required
              />

              <button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 bg-[#7D2130] hover:bg-[#5E1522] text-[#FAF7F2] rounded-xs font-hero text-sm tracking-[0.2em] uppercase font-medium shadow-sm transition-all cursor-pointer disabled:opacity-90"
              >
                {isLoading ? <RunningStitchLoader /> : 'Send Reset Instructions'}
              </button>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => switchMode('login')}
                  className="text-xs text-[#736357] hover:text-[#7D2130] underline underline-offset-4 cursor-pointer"
                >
                  Return to Sign In
                </button>
              </div>
            </form>
          )}
        </div>
      )}

      {/* ── 4. VERIFICATION / OTP MODE ─────────────────────────────────────── */}
      {mode === 'verify' && (
        <form onSubmit={handleVerifySubmit} noValidate className="space-y-6 text-center">
          <p className="text-xs text-[#736357] leading-relaxed max-w-xs mx-auto">
            Please enter the 6-digit security code transmitted to your registered contact.
          </p>

          <div className="flex justify-center items-center gap-2 sm:gap-2.5">
            {otp.map((digit, idx) => (
              <input
                key={idx}
                ref={(el) => {
                  otpInputRefs.current[idx] = el;
                }}
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={1}
                value={digit}
                onChange={(e) => handleOtpChange(idx, e.target.value)}
                onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                className="w-10 h-12 sm:w-11 sm:h-13 text-center font-mono text-lg font-semibold text-[#2A221E] bg-[#FAF7F2] border border-[#D9C7A7]/80 rounded-xs focus:border-[#7D2130] focus:ring-1 focus:ring-[#7D2130] focus:outline-none transition-all shadow-2xs"
                aria-label={`Digit ${idx + 1}`}
              />
            ))}
          </div>

          {errors.otp && (
            <p role="alert" className="text-xs text-[#8B2232] font-normal">
              {errors.otp}
            </p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-12 bg-[#7D2130] hover:bg-[#5E1522] text-[#FAF7F2] rounded-xs font-hero text-sm tracking-[0.2em] uppercase font-medium shadow-sm transition-all cursor-pointer disabled:opacity-90"
          >
            {isLoading ? <RunningStitchLoader /> : 'Verify & Enter Atelier'}
          </button>

          <div className="flex items-center justify-between text-xs text-[#736357] pt-2">
            <button
              type="button"
              onClick={() => switchMode('login')}
              className="hover:text-[#7D2130] underline underline-offset-4 cursor-pointer"
            >
              Back to Sign In
            </button>
            <button
              type="button"
              onClick={() => {
                setOtp(['', '', '', '', '', '']);
                otpInputRefs.current[0]?.focus();
              }}
              className="flex items-center gap-1 hover:text-[#7D2130] cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Resend Code</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
