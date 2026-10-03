'use client';

import React, { useState, useId } from 'react';
import { Eye, EyeOff, Check } from 'lucide-react';

export interface StitchedInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  isValid?: boolean;
  prefixPill?: string;
}

export const StitchedInput: React.FC<StitchedInputProps> = ({
  label,
  error,
  isValid = false,
  prefixPill,
  type = 'text',
  value,
  onChange,
  onFocus,
  onBlur,
  autoComplete,
  required,
  name,
  id: customId,
  className = '',
  disabled,
  ...props
}) => {
  const generatedId = useId();
  const inputId = customId || generatedId;
  const errorId = `${inputId}-error`;

  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const hasValue = value !== undefined && value !== null && String(value).length > 0;
  const isFloating = isFocused || hasValue;
  const isPassword = type === 'password';
  const effectiveType = isPassword ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className={`relative flex flex-col pt-4 pb-2.5 w-full text-left font-satoshi group ${className}`}>
      {/* Floating Label */}
      <label
        htmlFor={inputId}
        className={`absolute left-0 transition-all duration-300 pointer-events-none select-none tracking-[0.14em] uppercase font-medium ${
          isFloating
            ? 'top-0 text-[10px] text-[#A67C52]'
            : 'top-5 text-xs text-[#736357]'
        } ${prefixPill && !isFloating ? 'left-14' : 'left-0'}`}
      >
        {label} {required && <span className="text-[#8B2232]">*</span>}
      </label>

      {/* Input container with optional prefix */}
      <div className="relative flex items-center w-full">
        {prefixPill && (
          <span className="inline-flex items-center justify-center px-2.5 py-1 mr-2 text-xs font-mono font-medium rounded-xs bg-[#FAF7F2] border border-[#D9C7A7]/70 text-[#382C26] select-none shrink-0 shadow-2xs">
            {prefixPill}
          </span>
        )}

        <input
          id={inputId}
          name={name}
          type={effectiveType}
          value={value}
          onChange={onChange}
          onFocus={(e) => {
            setIsFocused(true);
            onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            onBlur?.(e);
          }}
          autoComplete={autoComplete}
          required={required}
          disabled={disabled}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          className="w-full bg-transparent border-none outline-none py-1.5 px-0 text-sm md:text-base text-[#2A221E] font-medium tracking-wide placeholder:opacity-0 focus:ring-0 focus:outline-none"
          {...props}
        />

        {/* Valid field tiny gold tick */}
        {isValid && !error && (
          <span
            className="flex items-center justify-center w-5 h-5 rounded-full text-[#C29F62] shrink-0 ml-1.5 animate-in fade-in zoom-in-75 duration-300"
            title="Valid input"
            aria-label="Valid entry"
          >
            <Check className="w-3.5 h-3.5 stroke-[2.5]" />
          </span>
        )}

        {/* Password show/hide toggle */}
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            className="p-1.5 ml-1 text-[#736357] hover:text-[#7D2130] focus:outline-none focus-visible:ring-1 focus-visible:ring-[#7D2130] rounded-xs cursor-pointer transition-colors"
          >
            {showPassword ? (
              <EyeOff className="w-4 h-4 stroke-[1.5]" />
            ) : (
              <Eye className="w-4 h-4 stroke-[1.5]" />
            )}
          </button>
        )}
      </div>

      {/* Underline Base and Golden Stitched Thread on Focus */}
      <div className="relative w-full h-[2px] mt-1 overflow-hidden pointer-events-none">
        {/* Neutral stationary baseline */}
        <div
          className={`absolute inset-0 transition-colors duration-300 ${
            error ? 'bg-[#8B2232]/80' : 'bg-[#D9C7A7]/50'
          }`}
        />

        {/* Active Stitching Gold Thread SVG */}
        <svg
          className="absolute inset-0 w-full h-full overflow-visible"
          preserveAspectRatio="none"
          viewBox="0 0 100 2"
        >
          <line
            x1="0"
            y1="1"
            x2="100"
            y2="1"
            stroke={error ? '#8B2232' : '#C29F62'}
            strokeWidth="2.5"
            strokeDasharray="100"
            strokeDashoffset={isFocused ? '0' : '100'}
            className="transition-all duration-500 ease-out"
          />
        </svg>
      </div>

      {/* Human-readable Error announcement */}
      {error && (
        <div
          id={errorId}
          role="alert"
          aria-live="polite"
          className="mt-1.5 text-xs text-[#8B2232] font-normal leading-relaxed animate-in fade-in slide-in-from-top-1 duration-200"
        >
          {error}
        </div>
      )}
    </div>
  );
};
