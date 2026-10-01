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
        <label htmlFor="gift-msg" className="flex items-center gap-2 uppercase tracking-[0.18em] text-[#736357] text-[10px] font-medium">
          <MessageSquareQuote className="w-3.5 h-3.5 text-[#7A1C28]" />
          Personalized Gift Message (Optional)
        </label>
        <span className="text-[10px] text-[#736357]/70 font-light">
          {message.length} / {maxLength}
        </span>
      </div>

      <textarea
        id="gift-msg"
        rows={3}
        maxLength={maxLength}
        placeholder="Write a heartfelt message to be hand-written on our gold-embossed card..."
        value={message}
        onChange={handleChange}
        className="w-full bg-[#FAF7F2] border border-[#D9C7A7] focus:border-[#7A1C28] text-[#2A221E] p-4 rounded-xl outline-none transition-colors duration-200 resize-none font-sans text-xs leading-relaxed placeholder:text-[#C9A96E]/60"
      />
    </div>
  );
};

GiftMessage.displayName = 'GiftMessage';
