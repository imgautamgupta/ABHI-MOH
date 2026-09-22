'use client';

import React from 'react';
import { StoryChapter } from './our-story.constants';

export interface TimelineMilestoneProps {
  milestone?: Partial<StoryChapter>;
  index?: number;
}

/**
 * @deprecated Use StoryChapter component instead.
 */
export const TimelineMilestone: React.FC<TimelineMilestoneProps> = () => {
  return null;
};

TimelineMilestone.displayName = 'TimelineMilestone';
