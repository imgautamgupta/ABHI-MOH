'use client';

import React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'icon';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  isDisabled?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      isDisabled = false,
      icon,
      iconPosition = 'left',
      type = 'button',
      ...props
    },
    ref
  ) => {
    const isActuallyDisabled = isDisabled || isLoading;

    return (
      <button
        ref={ref}
        type={type}
        disabled={isActuallyDisabled}
        className={cn(
          // Base Styles
          'inline-flex items-center justify-center font-satoshi font-medium tracking-wider uppercase transition-all duration-300 ease-silk focus:outline-none focus-visible:ring-1 focus-visible:ring-warm-cream focus-visible:ring-offset-2 focus-visible:ring-offset-background-primary disabled:opacity-40 disabled:cursor-not-allowed select-none active:scale-[0.98]',

          // Radius (Subtle Rounded)
          'rounded-sm',

          // Size Classes
          {
            'px-4 py-2 text-xs gap-1.5': size === 'sm',
            'px-6 py-3.5 text-sm gap-2': size === 'md',
            'px-8 py-4.5 text-base gap-2.5': size === 'lg',
            'p-2.5': variant === 'icon' && size === 'sm',
            'p-3.5': variant === 'icon' && size === 'md',
            'p-4.5': variant === 'icon' && size === 'lg',
          },

          // Variant Classes
          {
            // Primary: Warm Cream Bg, Black Text. Hover: Maroon Bg, Cream Text.
            'bg-warm-cream text-background-primary hover:bg-brand-maroon hover:text-warm-cream':
              variant === 'primary',

            // Secondary: Surface Dark Bg, Bordered. Hover: gold/cream accent hover border
            'bg-surface text-primary-text border border-borders hover:border-warm-cream/50':
              variant === 'secondary',

            // Outline: Transparent Bg, Muted Border. Hover: Surface Bg, White text
            'bg-transparent text-primary-text border border-borders hover:border-warm-cream hover:bg-surface':
              variant === 'outline',

            // Ghost: Completely clean. Hover: subtle black overlay background
            'bg-transparent text-primary-text hover:bg-surface/50': variant === 'ghost',

            // Icon: Bordered/clean container optimized for lucide icon primitives
            'bg-transparent text-primary-text border border-borders hover:bg-surface hover:text-warm-cream rounded-full':
              variant === 'icon',
          },
          className
        )}
        {...props}
      >
        {isLoading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            {variant !== 'icon' && children}
          </>
        ) : (
          <>
            {icon && iconPosition === 'left' && <span className="flex-shrink-0">{icon}</span>}
            {children}
            {icon && iconPosition === 'right' && <span className="flex-shrink-0">{icon}</span>}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
