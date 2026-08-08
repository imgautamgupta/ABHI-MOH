'use client';

import React from 'react';
import { MessageSquareQuote } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface GiftMessageProps {
  message: string;
  onChange: (msg: string) => void;
  className?: string;
}

export const GiftMessage: React.FC<GiftMessageProps> = ({ message, onChange, className }) => {
  const maxLength = 200;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length <= maxLength) {
      onChange(e.target.value);
    }
  };

  return (
    <div className={cn('flex flex-col gap-2 font-satoshi text-xs text-left w-full', className)}>
      <div className="flex items-center justify-between">
        <label htmlFor="gift-msg" className="flex items-center gap-2 uppercase tracking-[0.18em] text-secondary-text/80 text-[10px]">
          <MessageSquareQuote className="w-3.5 h-3.5 text-warm-cream" />
          Personalized Gift Message (Optional)
        </label>
        <span className="text-[10px] text-secondary-text/60 font-light">
          {message.length} / {maxLength}
        </span>
      </div>

      <textarea
        id="gift-msg"
        rows={3}
        maxLength={maxLength}
        placeholder="Write a heartfelt message to be hand-written on our gold-embossed Maison card..."
        value={message}
        onChange={handleChange}
        className="w-full bg-[#181818] border border-borders focus:border-warm-cream/70 text-primary-text p-4 rounded-sm outline-none transition-colors duration-200 resize-none font-sans text-xs leading-relaxed placeholder:text-secondary-text/40"
      />
    </div>
  );
};

GiftMessage.displayName = 'GiftMessage';
