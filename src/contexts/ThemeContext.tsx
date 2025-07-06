import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface ThemeConfig {
  id: string;
  name: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
    border: string;
    success: string;
    warning: string;
    error: string;
    // Color variants
    primary100: string;
    primary200: string;
    primary300: string;
    secondary100: string;
    secondary200: string;
    accent100: string;
    accent200: string;
  };
  fonts: {
    primary: string;
    secondary: string;
    accent: string;
  };
  shadows: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
}

interface ThemeContextType {
  currentTheme: ThemeConfig;
  availableThemes: ThemeConfig[];
  availableFonts: FontCollection[];
  updateTheme: (themeId: string) => void;
  updateFonts: (fontCollectionId: string) => void;
  applyCustomColors: (colors: Partial<ThemeConfig['colors']>) => void;
}

interface FontCollection {
  id: string;
  name: string;
  fonts: {
    primary: string;
    secondary: string;
    accent: string;
  };
  description: string;
}

// 20+ Color Collections
const colorCollections: ThemeConfig[] = [
  {
    id: 'ocean-breeze',
    name: 'Ocean Breeze',
    colors: {
      primary: '#0ea5e9',
      secondary: '#06b6d4',
      accent: '#f59e0b',
      background: '#f8fafc',
      surface: '#ffffff',
      text: '#0f172a',
      textSecondary: '#64748b',
      border: '#e2e8f0',
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
      primary100: '#e0f2fe',
      primary200: '#bae6fd',
      primary300: '#7dd3fc',
      secondary100: '#cffafe',
      secondary200: '#a5f3fc',
      accent100: '#fef3c7',
      accent200: '#fde68a',
    },
    fonts: { primary: 'Inter', secondary: 'Poppins', accent: 'Merriweather' },
    shadows: {
      sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
      md: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
      lg: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
      xl: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
    },
  },
  {
    id: 'sunset-glow',
    name: 'Sunset Glow',
    colors: {
      primary: '#f97316',
      secondary: '#ef4444',
      accent: '#eab308',
      background: '#fefcfb',
      surface: '#ffffff',
      text: '#1c1917',
      textSecondary: '#78716c',
      border: '#e7e5e4',
      success: '#22c55e',
      warning: '#f59e0b',
      error: '#dc2626',
      primary100: '#fed7aa',
      primary200: '#fdba74',
      primary300: '#fb923c',
      secondary100: '#fecaca',
      secondary200: '#fca5a5',
      accent100: '#fef08a',
      accent200: '#fde047',
    },
    fonts: { primary: 'Inter', secondary: 'Poppins', accent: 'Merriweather' },
    shadows: {
      sm: '0 1px 2px 0 rgb(251 146 60 / 0.05)',
      md: '0 4px 6px -1px rgb(251 146 60 / 0.1)',
      lg: '0 10px 15px -3px rgb(251 146 60 / 0.1)',
      xl: '0 20px 25px -5px rgb(251 146 60 / 0.1)',
    },
  },
  {
    id: 'forest-green',
    name: 'Forest Green',
    colors: {
      primary: '#059669',
      secondary: '#10b981',
      accent: '#84cc16',
      background: '#f0fdf4',
      surface: '#ffffff',
      text: '#14532d',
      textSecondary: '#6b7280',
      border: '#d1fae5',
      success: '#22c55e',
      warning: '#f59e0b',
      error: '#ef4444',
      primary100: '#dcfce7',
      primary200: '#bbf7d0',
      primary300: '#86efac',
      secondary100: '#d1fae5',
      secondary200: '#a7f3d0',
      accent100: '#ecfccb',
      accent200: '#d9f99d',
    },
    fonts: { primary: 'Inter', secondary: 'Poppins', accent: 'Merriweather' },
    shadows: {
      sm: '0 1px 2px 0 rgb(5 150 105 / 0.05)',
      md: '0 4px 6px -1px rgb(5 150 105 / 0.1)',
      lg: '0 10px 15px -3px rgb(5 150 105 / 0.1)',
      xl: '0 20px 25px -5px rgb(5 150 105 / 0.1)',
    },
  },
  {
    id: 'royal-purple',
    name: 'Royal Purple',
    colors: {
      primary: '#7c3aed',
      secondary: '#a855f7',
      accent: '#ec4899',
      background: '#faf5ff',
      surface: '#ffffff',
      text: '#581c87',
      textSecondary: '#6b7280',
      border: '#e9d5ff',
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
      primary100: '#f3e8ff',
      primary200: '#e9d5ff',
      primary300: '#d8b4fe',
      secondary100: '#faf5ff',
      secondary200: '#f3e8ff',
      accent100: '#fce7f3',
      accent200: '#fbcfe8',
    },
    fonts: { primary: 'Inter', secondary: 'Poppins', accent: 'Merriweather' },
    shadows: {
      sm: '0 1px 2px 0 rgb(124 58 237 / 0.05)',
      md: '0 4px 6px -1px rgb(124 58 237 / 0.1)',
      lg: '0 10px 15px -3px rgb(124 58 237 / 0.1)',
      xl: '0 20px 25px -5px rgb(124 58 237 / 0.1)',
    },
  },
  {
    id: 'midnight-blue',
    name: 'Midnight Blue',
    colors: {
      primary: '#1e40af',
      secondary: '#3b82f6',
      accent: '#06b6d4',
      background: '#f8fafc',
      surface: '#ffffff',
      text: '#1e293b',
      textSecondary: '#64748b',
      border: '#e2e8f0',
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
      primary100: '#dbeafe',
      primary200: '#bfdbfe',
      primary300: '#93c5fd',
      secondary100: '#dbeafe',
      secondary200: '#bfdbfe',
      accent100: '#cffafe',
      accent200: '#a5f3fc',
    },
    fonts: { primary: 'Inter', secondary: 'Poppins', accent: 'Merriweather' },
    shadows: {
      sm: '0 1px 2px 0 rgb(30 64 175 / 0.05)',
      md: '0 4px 6px -1px rgb(30 64 175 / 0.1)',
      lg: '0 10px 15px -3px rgb(30 64 175 / 0.1)',
      xl: '0 20px 25px -5px rgb(30 64 175 / 0.1)',
    },
  },
  {
    id: 'rose-gold',
    name: 'Rose Gold',
    colors: {
      primary: '#e11d48',
      secondary: '#f43f5e',
      accent: '#f59e0b',
      background: '#fef7f7',
      surface: '#ffffff',
      text: '#881337',
      textSecondary: '#6b7280',
      border: '#fecdd3',
      success: '#10b981',
      warning: '#f59e0b',
      error: '#dc2626',
      primary100: '#ffe4e6',
      primary200: '#fecdd3',
      primary300: '#fda4af',
      secondary100: '#ffe4e6',
      secondary200: '#fecdd3',
      accent100: '#fef3c7',
      accent200: '#fde68a',
    },
    fonts: { primary: 'Inter', secondary: 'Poppins', accent: 'Merriweather' },
    shadows: {
      sm: '0 1px 2px 0 rgb(225 29 72 / 0.05)',
      md: '0 4px 6px -1px rgb(225 29 72 / 0.1)',
      lg: '0 10px 15px -3px rgb(225 29 72 / 0.1)',
      xl: '0 20px 25px -5px rgb(225 29 72 / 0.1)',
    },
  },
  {
    id: 'emerald-mint',
    name: 'Emerald Mint',
    colors: {
      primary: '#10b981',
      secondary: '#34d399',
      accent: '#06b6d4',
      background: '#f0fdfa',
      surface: '#ffffff',
      text: '#064e3b',
      textSecondary: '#6b7280',
      border: '#a7f3d0',
      success: '#22c55e',
      warning: '#f59e0b',
      error: '#ef4444',
      primary100: '#d1fae5',
      primary200: '#a7f3d0',
      primary300: '#6ee7b7',
      secondary100: '#d1fae5',
      secondary200: '#a7f3d0',
      accent100: '#cffafe',
      accent200: '#a5f3fc',
    },
    fonts: { primary: 'Inter', secondary: 'Poppins', accent: 'Merriweather' },
    shadows: {
      sm: '0 1px 2px 0 rgb(16 185 129 / 0.05)',
      md: '0 4px 6px -1px rgb(16 185 129 / 0.1)',
      lg: '0 10px 15px -3px rgb(16 185 129 / 0.1)',
      xl: '0 20px 25px -5px rgb(16 185 129 / 0.1)',
    },
  },
  {
    id: 'golden-hour',
    name: 'Golden Hour',
    colors: {
      primary: '#d97706',
      secondary: '#f59e0b',
      accent: '#eab308',
      background: '#fffbeb',
      surface: '#ffffff',
      text: '#92400e',
      textSecondary: '#6b7280',
      border: '#fde68a',
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
      primary100: '#fef3c7',
      primary200: '#fde68a',
      primary300: '#fcd34d',
      secondary100: '#fef3c7',
      secondary200: '#fde68a',
      accent100: '#fef3c7',
      accent200: '#fde68a',
    },
    fonts: { primary: 'Inter', secondary: 'Poppins', accent: 'Merriweather' },
    shadows: {
      sm: '0 1px 2px 0 rgb(217 119 6 / 0.05)',
      md: '0 4px 6px -1px rgb(217 119 6 / 0.1)',
      lg: '0 10px 15px -3px rgb(217 119 6 / 0.1)',
      xl: '0 20px 25px -5px rgb(217 119 6 / 0.1)',
    },
  },
  {
    id: 'lavender-dream',
    name: 'Lavender Dream',
    colors: {
      primary: '#8b5cf6',
      secondary: '#a78bfa',
      accent: '#ec4899',
      background: '#faf5ff',
      surface: '#ffffff',
      text: '#581c87',
      textSecondary: '#6b7280',
      border: '#e9d5ff',
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
      primary100: '#f3e8ff',
      primary200: '#e9d5ff',
      primary300: '#d8b4fe',
      secondary100: '#f3e8ff',
      secondary200: '#e9d5ff',
      accent100: '#fce7f3',
      accent200: '#fbcfe8',
    },
    fonts: { primary: 'Inter', secondary: 'Poppins', accent: 'Merriweather' },
    shadows: {
      sm: '0 1px 2px 0 rgb(139 92 246 / 0.05)',
      md: '0 4px 6px -1px rgb(139 92 246 / 0.1)',
      lg: '0 10px 15px -3px rgb(139 92 246 / 0.1)',
      xl: '0 20px 25px -5px rgb(139 92 246 / 0.1)',
    },
  },
  {
    id: 'coral-reef',
    name: 'Coral Reef',
    colors: {
      primary: '#f97316',
      secondary: '#fb923c',
      accent: '#06b6d4',
      background: '#fff7ed',
      surface: '#ffffff',
      text: '#9a3412',
      textSecondary: '#6b7280',
      border: '#fed7aa',
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
      primary100: '#fed7aa',
      primary200: '#fdba74',
      primary300: '#fb923c',
      secondary100: '#fed7aa',
      secondary200: '#fdba74',
      accent100: '#cffafe',
      accent200: '#a5f3fc',
    },
    fonts: { primary: 'Inter', secondary: 'Poppins', accent: 'Merriweather' },
    shadows: {
      sm: '0 1px 2px 0 rgb(249 115 22 / 0.05)',
      md: '0 4px 6px -1px rgb(249 115 22 / 0.1)',
      lg: '0 10px 15px -3px rgb(249 115 22 / 0.1)',
      xl: '0 20px 25px -5px rgb(249 115 22 / 0.1)',
    },
  },
  {
    id: 'arctic-blue',
    name: 'Arctic Blue',
    colors: {
      primary: '#0284c7',
      secondary: '#0ea5e9',
      accent: '#06b6d4',
      background: '#f0f9ff',
      surface: '#ffffff',
      text: '#0c4a6e',
      textSecondary: '#6b7280',
      border: '#bae6fd',
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
      primary100: '#e0f2fe',
      primary200: '#bae6fd',
      primary300: '#7dd3fc',
      secondary100: '#e0f2fe',
      secondary200: '#bae6fd',
      accent100: '#cffafe',
      accent200: '#a5f3fc',
    },
    fonts: { primary: 'Inter', secondary: 'Poppins', accent: 'Merriweather' },
    shadows: {
      sm: '0 1px 2px 0 rgb(2 132 199 / 0.05)',
      md: '0 4px 6px -1px rgb(2 132 199 / 0.1)',
      lg: '0 10px 15px -3px rgb(2 132 199 / 0.1)',
      xl: '0 20px 25px -5px rgb(2 132 199 / 0.1)',
    },
  },
  {
    id: 'cherry-blossom',
    name: 'Cherry Blossom',
    colors: {
      primary: '#ec4899',
      secondary: '#f472b6',
      accent: '#a855f7',
      background: '#fdf2f8',
      surface: '#ffffff',
      text: '#831843',
      textSecondary: '#6b7280',
      border: '#fbcfe8',
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
      primary100: '#fce7f3',
      primary200: '#fbcfe8',
      primary300: '#f9a8d4',
      secondary100: '#fce7f3',
      secondary200: '#fbcfe8',
      accent100: '#f3e8ff',
      accent200: '#e9d5ff',
    },
    fonts: { primary: 'Inter', secondary: 'Poppins', accent: 'Merriweather' },
    shadows: {
      sm: '0 1px 2px 0 rgb(236 72 153 / 0.05)',
      md: '0 4px 6px -1px rgb(236 72 153 / 0.1)',
      lg: '0 10px 15px -3px rgb(236 72 153 / 0.1)',
      xl: '0 20px 25px -5px rgb(236 72 153 / 0.1)',
    },
  },
  {
    id: 'sage-green',
    name: 'Sage Green',
    colors: {
      primary: '#16a34a',
      secondary: '#22c55e',
      accent: '#84cc16',
      background: '#f7fdf7',
      surface: '#ffffff',
      text: '#15803d',
      textSecondary: '#6b7280',
      border: '#bbf7d0',
      success: '#22c55e',
      warning: '#f59e0b',
      error: '#ef4444',
      primary100: '#dcfce7',
      primary200: '#bbf7d0',
      primary300: '#86efac',
      secondary100: '#dcfce7',
      secondary200: '#bbf7d0',
      accent100: '#ecfccb',
      accent200: '#d9f99d',
    },
    fonts: { primary: 'Inter', secondary: 'Poppins', accent: 'Merriweather' },
    shadows: {
      sm: '0 1px 2px 0 rgb(22 163 74 / 0.05)',
      md: '0 4px 6px -1px rgb(22 163 74 / 0.1)',
      lg: '0 10px 15px -3px rgb(22 163 74 / 0.1)',
      xl: '0 20px 25px -5px rgb(22 163 74 / 0.1)',
    },
  },
  {
    id: 'warm-terracotta',
    name: 'Warm Terracotta',
    colors: {
      primary: '#dc2626',
      secondary: '#ef4444',
      accent: '#f59e0b',
      background: '#fef2f2',
      surface: '#ffffff',
      text: '#991b1b',
      textSecondary: '#6b7280',
      border: '#fecaca',
      success: '#10b981',
      warning: '#f59e0b',
      error: '#dc2626',
      primary100: '#fee2e2',
      primary200: '#fecaca',
      primary300: '#fca5a5',
      secondary100: '#fee2e2',
      secondary200: '#fecaca',
      accent100: '#fef3c7',
      accent200: '#fde68a',
    },
    fonts: { primary: 'Inter', secondary: 'Poppins', accent: 'Merriweather' },
    shadows: {
      sm: '0 1px 2px 0 rgb(220 38 38 / 0.05)',
      md: '0 4px 6px -1px rgb(220 38 38 / 0.1)',
      lg: '0 10px 15px -3px rgb(220 38 38 / 0.1)',
      xl: '0 20px 25px -5px rgb(220 38 38 / 0.1)',
    },
  },
  {
    id: 'steel-gray',
    name: 'Steel Gray',
    colors: {
      primary: '#475569',
      secondary: '#64748b',
      accent: '#0ea5e9',
      background: '#f8fafc',
      surface: '#ffffff',
      text: '#1e293b',
      textSecondary: '#64748b',
      border: '#e2e8f0',
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
      primary100: '#f1f5f9',
      primary200: '#e2e8f0',
      primary300: '#cbd5e1',
      secondary100: '#f1f5f9',
      secondary200: '#e2e8f0',
      accent100: '#e0f2fe',
      accent200: '#bae6fd',
    },
    fonts: { primary: 'Inter', secondary: 'Poppins', accent: 'Merriweather' },
    shadows: {
      sm: '0 1px 2px 0 rgb(71 85 105 / 0.05)',
      md: '0 4px 6px -1px rgb(71 85 105 / 0.1)',
      lg: '0 10px 15px -3px rgb(71 85 105 / 0.1)',
      xl: '0 20px 25px -5px rgb(71 85 105 / 0.1)',
    },
  },
  {
    id: 'cosmic-purple',
    name: 'Cosmic Purple',
    colors: {
      primary: '#6366f1',
      secondary: '#8b5cf6',
      accent: '#ec4899',
      background: '#faf5ff',
      surface: '#ffffff',
      text: '#4338ca',
      textSecondary: '#6b7280',
      border: '#e0e7ff',
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
      primary100: '#e0e7ff',
      primary200: '#c7d2fe',
      primary300: '#a5b4fc',
      secondary100: '#f3e8ff',
      secondary200: '#e9d5ff',
      accent100: '#fce7f3',
      accent200: '#fbcfe8',
    },
    fonts: { primary: 'Inter', secondary: 'Poppins', accent: 'Merriweather' },
    shadows: {
      sm: '0 1px 2px 0 rgb(99 102 241 / 0.05)',
      md: '0 4px 6px -1px rgb(99 102 241 / 0.1)',
      lg: '0 10px 15px -3px rgb(99 102 241 / 0.1)',
      xl: '0 20px 25px -5px rgb(99 102 241 / 0.1)',
    },
  },
  {
    id: 'autumn-leaves',
    name: 'Autumn Leaves',
    colors: {
      primary: '#ea580c',
      secondary: '#f97316',
      accent: '#eab308',
      background: '#fff7ed',
      surface: '#ffffff',
      text: '#c2410c',
      textSecondary: '#6b7280',
      border: '#fed7aa',
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
      primary100: '#ffedd5',
      primary200: '#fed7aa',
      primary300: '#fdba74',
      secondary100: '#ffedd5',
      secondary200: '#fed7aa',
      accent100: '#fef3c7',
      accent200: '#fde68a',
    },
    fonts: { primary: 'Inter', secondary: 'Poppins', accent: 'Merriweather' },
    shadows: {
      sm: '0 1px 2px 0 rgb(234 88 12 / 0.05)',
      md: '0 4px 6px -1px rgb(234 88 12 / 0.1)',
      lg: '0 10px 15px -3px rgb(234 88 12 / 0.1)',
      xl: '0 20px 25px -5px rgb(234 88 12 / 0.1)',
    },
  },
  {
    id: 'deep-ocean',
    name: 'Deep Ocean',
    colors: {
      primary: '#1e40af',
      secondary: '#1d4ed8',
      accent: '#06b6d4',
      background: '#f0f9ff',
      surface: '#ffffff',
      text: '#1e3a8a',
      textSecondary: '#6b7280',
      border: '#bfdbfe',
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
      primary100: '#dbeafe',
      primary200: '#bfdbfe',
      primary300: '#93c5fd',
      secondary100: '#dbeafe',
      secondary200: '#bfdbfe',
      accent100: '#cffafe',
      accent200: '#a5f3fc',
    },
    fonts: { primary: 'Inter', secondary: 'Poppins', accent: 'Merriweather' },
    shadows: {
      sm: '0 1px 2px 0 rgb(30 64 175 / 0.05)',
      md: '0 4px 6px -1px rgb(30 64 175 / 0.1)',
      lg: '0 10px 15px -3px rgb(30 64 175 / 0.1)',
      xl: '0 20px 25px -5px rgb(30 64 175 / 0.1)',
    },
  },
  {
    id: 'neon-lime',
    name: 'Neon Lime',
    colors: {
      primary: '#65a30d',
      secondary: '#84cc16',
      accent: '#eab308',
      background: '#f7fee7',
      surface: '#ffffff',
      text: '#365314',
      textSecondary: '#6b7280',
      border: '#d9f99d',
      success: '#22c55e',
      warning: '#f59e0b',
      error: '#ef4444',
      primary100: '#ecfccb',
      primary200: '#d9f99d',
      primary300: '#bef264',
      secondary100: '#ecfccb',
      secondary200: '#d9f99d',
      accent100: '#fef3c7',
      accent200: '#fde68a',
    },
    fonts: { primary: 'Inter', secondary: 'Poppins', accent: 'Merriweather' },
    shadows: {
      sm: '0 1px 2px 0 rgb(101 163 13 / 0.05)',
      md: '0 4px 6px -1px rgb(101 163 13 / 0.1)',
      lg: '0 10px 15px -3px rgb(101 163 13 / 0.1)',
      xl: '0 20px 25px -5px rgb(101 163 13 / 0.1)',
    },
  },
  {
    id: 'monochrome',
    name: 'Monochrome',
    colors: {
      primary: '#374151',
      secondary: '#4b5563',
      accent: '#6b7280',
      background: '#f9fafb',
      surface: '#ffffff',
      text: '#111827',
      textSecondary: '#6b7280',
      border: '#e5e7eb',
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
      primary100: '#f3f4f6',
      primary200: '#e5e7eb',
      primary300: '#d1d5db',
      secondary100: '#f3f4f6',
      secondary200: '#e5e7eb',
      accent100: '#f3f4f6',
      accent200: '#e5e7eb',
    },
    fonts: { primary: 'Inter', secondary: 'Poppins', accent: 'Merriweather' },
    shadows: {
      sm: '0 1px 2px 0 rgb(55 65 81 / 0.05)',
      md: '0 4px 6px -1px rgb(55 65 81 / 0.1)',
      lg: '0 10px 15px -3px rgb(55 65 81 / 0.1)',
      xl: '0 20px 25px -5px rgb(55 65 81 / 0.1)',
    },
  },
];

// 15+ Font Collections
const fontCollections: FontCollection[] = [
  {
    id: 'modern-clean',
    name: 'Modern Clean',
    fonts: {
      primary: 'Inter',
      secondary: 'Poppins',
      accent: 'Roboto',
    },
    description: 'Clean, modern fonts perfect for tech and business',
  },
  {
    id: 'elegant-serif',
    name: 'Elegant Serif',
    fonts: {
      primary: 'Playfair Display',
      secondary: 'Merriweather',
      accent: 'Lora',
    },
    description: 'Sophisticated serif fonts for luxury and editorial',
  },
  {
    id: 'friendly-rounded',
    name: 'Friendly Rounded',
    fonts: {
      primary: 'Nunito',
      secondary: 'Quicksand',
      accent: 'Comfortaa',
    },
    description: 'Warm, approachable fonts for lifestyle and wellness',
  },
  {
    id: 'professional-corporate',
    name: 'Professional Corporate',
    fonts: {
      primary: 'Source Sans Pro',
      secondary: 'Open Sans',
      accent: 'Lato',
    },
    description: 'Reliable, professional fonts for corporate use',
  },
  {
    id: 'creative-display',
    name: 'Creative Display',
    fonts: {
      primary: 'Montserrat',
      secondary: 'Oswald',
      accent: 'Raleway',
    },
    description: 'Bold, creative fonts for agencies and portfolios',
  },
  {
    id: 'minimal-geometric',
    name: 'Minimal Geometric',
    fonts: {
      primary: 'Work Sans',
      secondary: 'Space Grotesk',
      accent: 'DM Sans',
    },
    description: 'Clean geometric fonts for modern minimalism',
  },
  {
    id: 'classic-traditional',
    name: 'Classic Traditional',
    fonts: {
      primary: 'Crimson Text',
      secondary: 'Libre Baskerville',
      accent: 'Cormorant Garamond',
    },
    description: 'Timeless serif fonts for traditional elegance',
  },
  {
    id: 'tech-futuristic',
    name: 'Tech Futuristic',
    fonts: {
      primary: 'JetBrains Mono',
      secondary: 'Fira Code',
      accent: 'Space Mono',
    },
    description: 'Monospace fonts perfect for tech and coding',
  },
  {
    id: 'artistic-handwritten',
    name: 'Artistic Handwritten',
    fonts: {
      primary: 'Dancing Script',
      secondary: 'Pacifico',
      accent: 'Kaushan Script',
    },
    description: 'Handwritten fonts for creative and personal brands',
  },
  {
    id: 'bold-impact',
    name: 'Bold Impact',
    fonts: {
      primary: 'Anton',
      secondary: 'Bebas Neue',
      accent: 'Fjalla One',
    },
    description: 'Strong, impactful fonts for headlines and branding',
  },
  {
    id: 'retro-vintage',
    name: 'Retro Vintage',
    fonts: {
      primary: 'Righteous',
      secondary: 'Fredoka One',
      accent: 'Bungee',
    },
    description: 'Nostalgic fonts with vintage character',
  },
  {
    id: 'luxury-fashion',
    name: 'Luxury Fashion',
    fonts: {
      primary: 'Cinzel',
      secondary: 'Cormorant',
      accent: 'Marcellus',
    },
    description: 'Elegant fonts for luxury and fashion brands',
  },
  {
    id: 'playful-fun',
    name: 'Playful Fun',
    fonts: {
      primary: 'Fredoka',
      secondary: 'Rubik',
      accent: 'Varela Round',
    },
    description: 'Fun, playful fonts for children and entertainment',
  },
  {
    id: 'editorial-news',
    name: 'Editorial News',
    fonts: {
      primary: 'PT Serif',
      secondary: 'Source Serif Pro',
      accent: 'Spectral',
    },
    description: 'Professional fonts for news and editorial content',
  },
  {
    id: 'startup-dynamic',
    name: 'Startup Dynamic',
    fonts: {
      primary: 'Manrope',
      secondary: 'Plus Jakarta Sans',
      accent: 'Outfit',
    },
    description: 'Modern, dynamic fonts for startups and innovation',
  },
];

const defaultTheme = colorCollections[0];

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState<ThemeConfig>(defaultTheme);

  // Apply CSS variables to root
  useEffect(() => {
    const root = document.documentElement;
    
    // Apply colors
    Object.entries(currentTheme.colors).forEach(([key, value]) => {
      const cssVar = key.replace(/([A-Z])/g, '-$1').toLowerCase();
      root.style.setProperty(`--color-${cssVar}`, value);
    });

    // Apply fonts
    Object.entries(currentTheme.fonts).forEach(([key, value]) => {
      root.style.setProperty(`--font-${key}`, `'${value}', sans-serif`);
    });

    // Apply shadows
    Object.entries(currentTheme.shadows).forEach(([key, value]) => {
      root.style.setProperty(`--shadow-${key}`, value);
    });

    // Load Google Fonts
    const fontFamilies = Object.values(currentTheme.fonts);
    const fontString = fontFamilies.map(font => font.replace(' ', '+')).join('|');
    
    // Remove existing font link
    const existingLink = document.querySelector('link[data-theme-fonts]');
    if (existingLink) {
      existingLink.remove();
    }

    // Add new font link
    const link = document.createElement('link');
    link.href = `https://fonts.googleapis.com/css2?${fontFamilies.map(font => 
      `family=${font.replace(' ', '+')}:wght@300;400;500;600;700;800;900`
    ).join('&')}&display=swap`;
    link.rel = 'stylesheet';
    link.setAttribute('data-theme-fonts', 'true');
    document.head.appendChild(link);

  }, [currentTheme]);

  const updateTheme = (themeId: string) => {
    const theme = colorCollections.find(t => t.id === themeId);
    if (theme) {
      setCurrentTheme(theme);
    }
  };

  const updateFonts = (fontCollectionId: string) => {
    const fontCollection = fontCollections.find(f => f.id === fontCollectionId);
    if (fontCollection) {
      setCurrentTheme(prev => ({
        ...prev,
        fonts: fontCollection.fonts
      }));
    }
  };

  const applyCustomColors = (colors: Partial<ThemeConfig['colors']>) => {
    setCurrentTheme(prev => ({
      ...prev,
      colors: { ...prev.colors, ...colors }
    }));
  };

  return (
    <ThemeContext.Provider value={{
      currentTheme,
      availableThemes: colorCollections,
      availableFonts: fontCollections,
      updateTheme,
      updateFonts,
      applyCustomColors
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};