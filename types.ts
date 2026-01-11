
import React from 'react';

export interface SectionContent {
  id: string;
  title: string;
  content: string;
  icon: React.ReactNode;
}

export interface AIPersonalization {
  skill: string;
  hoursPerDay: number;
  targetIncome: string;
}
