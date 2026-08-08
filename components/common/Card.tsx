'use client';

import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

// ==========================================
// 1. GLASS CARD
// ==========================================
export interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  intensity?: 'luxury' | 'surface';
}

export const GlassCard: React.FC<GlassCardProps> = ({
  className,
  intensity = 'luxury',
  children,
  ...props
}) => {
  return (
    <div
      className={cn(
        'transition-all duration-300 ease-silk rounded-sm p-6',
        {
          'glass-luxury': intensity === 'luxury',
          'glass-surface': intensity === 'surface',
        },
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

// ==========================================
// 2. EDITORIAL CARD (LOOKBOOK / SHOWCASE)
// ==========================================
export interface EditorialCardProps extends React.HTMLAttributes<HTMLDivElement> {
  imageSrc: string;
  title: string;
  subtitle?: string;
  aspectRatio?: 'portrait' | 'landscape' | 'square';
}

export const EditorialCard: React.FC<EditorialCardProps> = ({
  className,
  imageSrc,
  title,
  subtitle,
  aspectRatio = 'portrait',
  children,
  ...props
}) => {
  return (
    <div
      className={cn('group flex flex-col font-satoshi overflow-hidden cursor-pointer', className)}
      {...props}
    >
      <div
        className={cn(
          'relative w-full overflow-hidden bg-surface border border-borders transition-all duration-500 ease-silk',
          {
            'aspect-[3/4]': aspectRatio === 'portrait',
            'aspect-[16/9]': aspectRatio === 'landscape',
            'aspect-square': aspectRatio === 'square',
          }
        )}
      >
        <Image
          src={imageSrc}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-[1.2s] ease-silk group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background-primary/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
      <div className="mt-4 flex flex-col gap-1">
        <h3 className="font-section text-lg font-light tracking-wide text-primary-text group-hover:text-warm-cream transition-colors duration-300">
          {title}
        </h3>
        {subtitle && (
          <p className="text-xs uppercase tracking-widest text-secondary-text font-light">
            {subtitle}
          </p>
        )}
      </div>
      {children && <div className="mt-3">{children}</div>}
    </div>
  );
};

// ==========================================
// 3. COLLECTION CARD (GRID LINK)
// ==========================================
export interface CollectionCardProps extends React.HTMLAttributes<HTMLDivElement> {
  imageSrc: string;
  title: string;
  tagline?: string;
  ctaText?: string;
}

export const CollectionCard: React.FC<CollectionCardProps> = ({
  className,
  imageSrc,
  title,
  tagline,
  ctaText = 'Explore Collection',
  ...props
}) => {
  return (
    <div
      className={cn(
        'group relative aspect-[4/5] w-full overflow-hidden border border-borders cursor-pointer font-satoshi bg-surface',
        className
      )}
      {...props}
    >
      <Image
        src={imageSrc}
        alt={title}
        fill
        sizes="(max-width: 1024px) 100vw, 33vw"
        className="object-cover transition-transform duration-[1.5s] ease-silk group-hover:scale-103"
      />
      {/* Editorial Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-background-primary via-background-primary/20 to-transparent transition-all duration-500 group-hover:via-background-primary/45" />

      {/* Info Content */}
      <div className="absolute bottom-0 left-0 right-0 p-8 flex flex-col items-start gap-2.5">
        {tagline && (
          <span className="text-xs uppercase tracking-[0.25em] text-warm-cream/90 font-light translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-silk">
            {tagline}
          </span>
        )}
        <h2 className="font-hero text-2xl font-light text-primary-text tracking-wide lowercase italic group-hover:text-warm-cream transition-colors duration-300">
          {title}
        </h2>
        <span className="text-xs uppercase tracking-widest text-primary-text border-b border-primary-text/40 pb-0.5 mt-2 group-hover:border-warm-cream group-hover:text-warm-cream transition-all duration-300">
          {ctaText}
        </span>
      </div>
    </div>
  );
};

// ==========================================
// 4. CHECKOUT CARD (SUMMARY ROWS)
// ==========================================
export interface CheckoutCardProps extends React.HTMLAttributes<HTMLDivElement> {
  imageSrc: string;
  title: string;
  subtitle?: string;
  price: string;
  quantity?: number;
  onRemove?: () => void;
}

export const CheckoutCard: React.FC<CheckoutCardProps> = ({
  className,
  imageSrc,
  title,
  subtitle,
  price,
  quantity = 1,
  onRemove,
  ...props
}) => {
  return (
    <div
      className={cn(
        'flex items-center gap-4 py-4 border-b border-borders/50 font-satoshi w-full bg-transparent',
        className
      )}
      {...props}
    >
      <div className="relative w-16 h-20 bg-surface border border-borders flex-shrink-0">
        <Image
          src={imageSrc}
          alt={title}
          fill
          sizes="64px"
          className="object-cover"
        />
      </div>
      <div className="flex-grow flex flex-col gap-0.5">
        <h4 className="text-sm font-medium tracking-wide text-primary-text uppercase">{title}</h4>
        {subtitle && (
          <p className="text-xs text-secondary-text font-light uppercase tracking-wider">
            {subtitle}
          </p>
        )}
        <div className="flex items-center gap-2 mt-1">
          <span className="text-xs text-secondary-text">Qty: {quantity}</span>
        </div>
      </div>
      <div className="flex flex-col items-end gap-2">
        <span className="text-sm font-medium text-warm-cream font-satoshi tracking-wide">
          {price}
        </span>
        {onRemove && (
          <button
            onClick={onRemove}
            className="text-xs uppercase tracking-wider text-secondary-text/60 hover:text-dark-maroon transition-colors duration-300"
          >
            Remove
          </button>
        )}
      </div>
    </div>
  );
};

// ==========================================
// 5. PROFILE CARD (ACCOUNT DATA PANELS)
// ==========================================
export interface ProfileCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({
  className,
  title,
  children,
  ...props
}) => {
  return (
    <div
      className={cn(
        'bg-surface border border-borders p-6 font-satoshi flex flex-col gap-4 rounded-sm',
        className
      )}
      {...props}
    >
      <div className="border-b border-borders/40 pb-3 flex items-center justify-between">
        <h3 className="text-sm uppercase tracking-widest text-warm-cream font-medium">
          {title}
        </h3>
      </div>
      <div className="text-sm text-secondary-text font-light leading-relaxed flex flex-col gap-2">
        {children}
      </div>
    </div>
  );
};
