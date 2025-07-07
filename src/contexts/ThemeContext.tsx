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
  getCSSVariables: () => Record<string, string>;
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
];

const defaultTheme = colorCollections[0];

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState<ThemeConfig>(defaultTheme);

  // Apply CSS variables to root for WEBSITE theme only
  useEffect(() => {
    const root = document.documentElement;
    
    // Apply website colors (these change with theme)
    Object.entries(currentTheme.colors).forEach(([key, value]) => {
      const cssVar = key.replace(/([A-Z])/g, '-$1').toLowerCase();
      root.style.setProperty(`--website-color-${cssVar}`, value);
    });

    // Apply website fonts
    Object.entries(currentTheme.fonts).forEach(([key, value]) => {
      root.style.setProperty(`--website-font-${key}`, `'${value}', sans-serif`);
    });

    // Apply website shadows
    Object.entries(currentTheme.shadows).forEach(([key, value]) => {
      root.style.setProperty(`--website-shadow-${key}`, value);
    });

    // Load Google Fonts
    const fontFamilies = Object.values(currentTheme.fonts);
    const fontString = fontFamilies.map(font => font.replace(' ', '+')).join('|');
    
    // Remove existing font link
    const existingLink = document.querySelector('link[data-website-fonts]');
    if (existingLink) {
      existingLink.remove();
    }

    // Add new font link
    const link = document.createElement('link');
    link.href = `https://fonts.googleapis.com/css2?${fontFamilies.map(font => 
      `family=${font.replace(' ', '+')}:wght@300;400;500;600;700;800;900`
    ).join('&')}&display=swap`;
    link.rel = 'stylesheet';
    link.setAttribute('data-website-fonts', 'true');
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

  // Helper function to get CSS custom properties for website
  const getCSSVariables = () => {
    return {
      '--website-color-primary': currentTheme.colors.primary,
      '--website-color-secondary': currentTheme.colors.secondary,
      '--website-color-accent': currentTheme.colors.accent,
      '--website-color-background': currentTheme.colors.background,
      '--website-color-surface': currentTheme.colors.surface,
      '--website-color-text': currentTheme.colors.text,
      '--website-color-text-secondary': currentTheme.colors.textSecondary,
      '--website-color-border': currentTheme.colors.border,
      '--website-color-success': currentTheme.colors.success,
      '--website-color-warning': currentTheme.colors.warning,
      '--website-color-error': currentTheme.colors.error,
      '--website-color-primary-100': currentTheme.colors.primary100,
      '--website-color-primary-200': currentTheme.colors.primary200,
      '--website-color-primary-300': currentTheme.colors.primary300,
      '--website-color-secondary-100': currentTheme.colors.secondary100,
      '--website-color-secondary-200': currentTheme.colors.secondary200,
      '--website-color-accent-100': currentTheme.colors.accent100,
      '--website-color-accent-200': currentTheme.colors.accent200,
      '--website-font-primary': `'${currentTheme.fonts.primary}', sans-serif`,
      '--website-font-secondary': `'${currentTheme.fonts.secondary}', sans-serif`,
      '--website-font-accent': `'${currentTheme.fonts.accent}', serif`,
      '--website-shadow-sm': currentTheme.shadows.sm,
      '--website-shadow-md': currentTheme.shadows.md,
      '--website-shadow-lg': currentTheme.shadows.lg,
      '--website-shadow-xl': currentTheme.shadows.xl,
    };
  };

  return (
    <ThemeContext.Provider value={{
      currentTheme,
      availableThemes: colorCollections,
      availableFonts: fontCollections,
      updateTheme,
      updateFonts,
      applyCustomColors,
      getCSSVariables
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