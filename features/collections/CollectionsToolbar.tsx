'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { COLLECTIONS_COPY } from './collections.constants';
import { SortDropdown } from './SortDropdown';

export const CollectionsToolbar: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
      className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 py-6 border-b border-[#C89D5C]/25 mb-14 font-satoshi"
    >
      {/* LEFT: Result Count */}
      <span className="text-xs uppercase tracking-[0.25em] text-[#D0BEAB] font-light">
        {COLLECTIONS_COPY.resultCount}
      </span>

      {/* RIGHT: Floating Luxury Sort Dropdown */}
      <div className="self-end sm:self-auto">
        <SortDropdown />
      </div>
    </motion.div>
  );
};

CollectionsToolbar.displayName = 'CollectionsToolbar';
