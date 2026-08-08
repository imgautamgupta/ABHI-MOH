'use client';

import React from 'react';
import { Search, ChevronDown, Plus, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';

// ==========================================
// 1. STANDARD TEXT INPUT
// ==========================================
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'text', label, error, ...props }, ref) => {
    return (
      <div className="w-full flex flex-col gap-1.5 font-satoshi">
        {label && (
          <label className="text-xs uppercase tracking-widest text-secondary-text font-medium">
            {label}
          </label>
        )}
        <input
          ref={ref}
          type={type}
          className={cn(
            'w-full bg-surface text-primary-text border border-borders px-4 py-3 text-sm transition-all duration-300 ease-silk outline-none focus:border-warm-cream focus:ring-1 focus:ring-warm-cream/30 placeholder:text-secondary-text/40 rounded-sm disabled:opacity-40 disabled:cursor-not-allowed',
            error && 'border-destructive focus:border-destructive focus:ring-destructive/30',
            className
          )}
          {...props}
        />
        {error && <span className="text-xs text-destructive tracking-wide mt-0.5">{error}</span>}
      </div>
    );
  }
);
Input.displayName = 'Input';

// ==========================================
// 2. SEARCH INPUT
// ==========================================
export type SearchInputProps = Omit<InputProps, 'type'>;

export const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  ({ className, label, error, ...props }, ref) => {
    return (
      <div className="w-full flex flex-col gap-1.5 font-satoshi">
        {label && (
          <label className="text-xs uppercase tracking-widest text-secondary-text font-medium">
            {label}
          </label>
        )}
        <div className="relative w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary-text/50 pointer-events-none" />
          <input
            ref={ref}
            type="text"
            className={cn(
              'w-full bg-surface text-primary-text border border-borders pl-11 pr-4 py-3 text-sm transition-all duration-300 ease-silk outline-none focus:border-warm-cream focus:ring-1 focus:ring-warm-cream/30 placeholder:text-secondary-text/40 rounded-sm disabled:opacity-40 disabled:cursor-not-allowed',
              error && 'border-destructive focus:border-destructive',
              className
            )}
            {...props}
          />
        </div>
        {error && <span className="text-xs text-destructive tracking-wide mt-0.5">{error}</span>}
      </div>
    );
  }
);
SearchInput.displayName = 'SearchInput';

// ==========================================
// 3. DROPDOWN (SELECT)
// ==========================================
export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { label: string; value: string | number }[];
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, options, ...props }, ref) => {
    return (
      <div className="w-full flex flex-col gap-1.5 font-satoshi">
        {label && (
          <label className="text-xs uppercase tracking-widest text-secondary-text font-medium">
            {label}
          </label>
        )}
        <div className="relative w-full">
          <select
            ref={ref}
            className={cn(
              'w-full bg-surface text-primary-text border border-borders px-4 py-3 pr-10 text-sm transition-all duration-300 ease-silk outline-none appearance-none focus:border-warm-cream focus:ring-1 focus:ring-warm-cream/30 rounded-sm disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer',
              error && 'border-destructive focus:border-destructive',
              className
            )}
            {...props}
          >
            {options.map((opt) => (
              <option key={opt.value} value={opt.value} className="bg-surface text-primary-text">
                {opt.label}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary-text/50 pointer-events-none" />
        </div>
        {error && <span className="text-xs text-destructive tracking-wide mt-0.5">{error}</span>}
      </div>
    );
  }
);
Select.displayName = 'Select';

// ==========================================
// 4. CHECKBOX
// ==========================================
export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, id, ...props }, ref) => {
    const generatedId = React.useId();
    const inputId = id || generatedId;
    return (
      <div className="flex items-center gap-3 font-satoshi select-none cursor-pointer">
        <div className="relative flex items-center">
          <input
            ref={ref}
            type="checkbox"
            id={inputId}
            className={cn(
              'peer h-5 w-5 cursor-pointer appearance-none rounded-sm border border-borders bg-surface transition-all duration-300 ease-silk checked:border-warm-cream checked:bg-brand-maroon focus:outline-none focus:ring-1 focus:ring-warm-cream/30 disabled:opacity-40 disabled:cursor-not-allowed',
              className
            )}
            {...props}
          />
          {/* Custom checkmark check icon overlay */}
          <svg
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 text-warm-cream pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity duration-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="3.5"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <label
          htmlFor={inputId}
          className="text-sm text-secondary-text cursor-pointer peer-disabled:opacity-40 font-light tracking-wide uppercase"
        >
          {label}
        </label>
      </div>
    );
  }
);
Checkbox.displayName = 'Checkbox';

// ==========================================
// 5. RADIO BUTTON
// ==========================================
export interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string;
}

export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  ({ className, label, id, ...props }, ref) => {
    const generatedId = React.useId();
    const inputId = id || generatedId;
    return (
      <div className="flex items-center gap-3 font-satoshi select-none cursor-pointer">
        <div className="relative flex items-center">
          <input
            ref={ref}
            type="radio"
            id={inputId}
            className={cn(
              'peer h-5 w-5 cursor-pointer appearance-none rounded-full border border-borders bg-surface transition-all duration-300 ease-silk checked:border-warm-cream focus:outline-none focus:ring-1 focus:ring-warm-cream/30 disabled:opacity-40 disabled:cursor-not-allowed',
              className
            )}
            {...props}
          />
          {/* Custom inner dot radio overlay */}
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-warm-cream pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity duration-300" />
        </div>
        <label
          htmlFor={inputId}
          className="text-sm text-secondary-text cursor-pointer peer-disabled:opacity-40 font-light tracking-wide uppercase"
        >
          {label}
        </label>
      </div>
    );
  }
);
Radio.displayName = 'Radio';

// ==========================================
// 6. QUANTITY STEPPER
// ==========================================
export interface QuantityStepperProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  className?: string;
  isDisabled?: boolean;
}

export const QuantityStepper: React.FC<QuantityStepperProps> = ({
  value,
  onChange,
  min = 1,
  max = 99,
  className,
  isDisabled = false,
}) => {
  const handleDecrement = () => {
    if (value > min && !isDisabled) {
      onChange(value - 1);
    }
  };

  const handleIncrement = () => {
    if (value < max && !isDisabled) {
      onChange(value + 1);
    }
  };

  return (
    <div
      className={cn(
        'inline-flex items-center bg-surface border border-borders rounded-sm h-11 font-satoshi overflow-hidden',
        isDisabled && 'opacity-40 cursor-not-allowed',
        className
      )}
    >
      <button
        type="button"
        onClick={handleDecrement}
        disabled={value <= min || isDisabled}
        className="w-10 h-full flex items-center justify-center text-secondary-text hover:text-warm-cream hover:bg-white/5 active:bg-white/10 transition-colors duration-300 disabled:opacity-30 disabled:hover:bg-transparent"
      >
        <Minus className="w-3.5 h-3.5" />
      </button>
      <span className="w-12 text-center text-sm font-medium text-primary-text select-none">
        {value}
      </span>
      <button
        type="button"
        onClick={handleIncrement}
        disabled={value >= max || isDisabled}
        className="w-10 h-full flex items-center justify-center text-secondary-text hover:text-warm-cream hover:bg-white/5 active:bg-white/10 transition-colors duration-300 disabled:opacity-30 disabled:hover:bg-transparent"
      >
        <Plus className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
QuantityStepper.displayName = 'QuantityStepper';
