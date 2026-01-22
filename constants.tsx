
import React from 'react';
import { ThemeColor } from './types';

export const THEME_COLORS: Record<ThemeColor, string> = {
  red: 'text-red-500',
  blue: 'text-blue-500',
  green: 'text-emerald-500',
  orange: 'text-orange-500',
  purple: 'text-purple-500',
  white: 'text-white'
};

export const BG_ACCENTS: Record<ThemeColor, string> = {
  red: 'bg-red-500',
  blue: 'bg-blue-500',
  green: 'bg-emerald-500',
  orange: 'bg-orange-500',
  purple: 'bg-purple-500',
  white: 'bg-white'
};

export const RING_ACCENTS: Record<ThemeColor, string> = {
  red: 'ring-red-500',
  blue: 'ring-blue-500',
  green: 'ring-emerald-500',
  orange: 'ring-orange-500',
  purple: 'ring-purple-500',
  white: 'ring-white'
};
