import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ThemeConfig {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  fontFamily: string;
  buttonStyle: 'rounded' | 'square';
  spacing: 'compact' | 'comfortable' | 'spacious';
}

interface ThemeContextType {
  theme: ThemeConfig;
  updateTheme: (updates: Partial<ThemeConfig>) => void;
}

const defaultTheme: ThemeConfig = {
  primaryColor: '#3B82F6',
  secondaryColor: '#8B5CF6',
  accentColor: '#F59E0B',
  fontFamily: 'Inter',
  buttonStyle: 'rounded',
  spacing: 'comfortable'
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeConfig>(defaultTheme);

  const updateTheme = (updates: Partial<ThemeConfig>) => {
    setTheme(prev => ({ ...prev, ...updates }));
  };

  return (
    <ThemeContext.Provider value={{ theme, updateTheme }}>
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