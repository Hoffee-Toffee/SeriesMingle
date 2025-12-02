import React, { createContext, useContext, useMemo, useState, useEffect, ReactNode } from 'react';
import classicTheme from '../themes/classic.json';

export type ThemeId = string;

export interface ThemeColors {
  textMain: string;
  textSec: string;
  textTert: string;
  bgMain: string;
  bgSec: string;
  bgTert: string;
  bgBorder: string;
  linkSec: string;
  linkMain: string;
  linkTert: string;
  buttonBg: string;
  buttonSec: string;
  buttonBorder: string;
  buttonHoverBg: string;
  buttonBorderHover: string;
  laneOdd: string;
  laneOddSec: string;
  laneEven: string;
  laneEvenSec: string;
  hoverMain: string;
  hoverSec: string;
  divider: string;
  dividerSec: string;
}

export interface ThemeMeta {
  name: string;
  default: boolean;
  dark: boolean;
  colors: ThemeColors;
}

// Add more imports for additional themes as needed
const themeFiles: Record<ThemeId, ThemeMeta> = {
  classic: classicTheme as ThemeMeta,
  // Add more: themeId: themeImport
};

interface ThemeProviderProps {
  children: ReactNode;
  initialTheme?: ThemeId;
}

const ThemeContext = createContext<{
  theme: ThemeColors;
  themeId: ThemeId;
  setTheme: (id: ThemeId) => void;
  themes: Record<ThemeId, ThemeMeta>;
}>(
  {
    theme: themeFiles.classic.colors,
    themeId: 'classic',
    setTheme: () => { },
    themes: themeFiles,
  }
);

export const ThemeProvider = ({ children, initialTheme = 'classic' }: ThemeProviderProps) => {
  const [themeId, setThemeId] = useState<ThemeId>(initialTheme);
  const theme = useMemo(() => themeFiles[themeId]?.colors || themeFiles.classic.colors, [themeId]);

  // Set CSS variables in :root whenever theme changes
  useEffect(() => {
    const root = document.documentElement;
    Object.entries(theme).forEach(([key, value]) => {
      root.style.setProperty(`--${key}`, value);
    });
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, themeId, setTheme: setThemeId, themes: themeFiles }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
