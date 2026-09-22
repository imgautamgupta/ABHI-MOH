'use client';

import React from 'react';
import { cn } from '@/lib/utils';

export interface ProductDescriptionProps {
  description?: string;
  className?: string;
}

/**
 * Checks if a string contains HTML markup tags.
 */
function containsHtml(str: string): boolean {
  return /<[a-z][\s\S]*>/i.test(str);
}

export const ProductDescription: React.FC<ProductDescriptionProps> = ({
  description,
  className,
}) => {
  if (!description) {
    return (
      <p className={cn('font-sans text-sm font-light text-[#736357] leading-relaxed', className)}>
        Every ABHI-MOH saree is crafted with meticulous artisanal care, celebrating centuries of
        Indian textile heritage.
      </p>
    );
  }

  const isHtml = containsHtml(description);

  if (isHtml) {
    return (
      <div
        className={cn('wix-rich-description w-full', className)}
        dangerouslySetInnerHTML={{ __html: description }}
      />
    );
  }

  // Plain text: preserve paragraphs and line breaks
  return (
    <div className={cn('wix-rich-description whitespace-pre-line w-full', className)}>
      {description}
    </div>
  );
};

ProductDescription.displayName = 'ProductDescription';
