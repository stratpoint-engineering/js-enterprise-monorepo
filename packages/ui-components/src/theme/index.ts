/**
 * Theme configuration for the UI component library
 * This can be customized for different applications
 */

export interface ThemeColors {
  primary: string;
  secondary: string;
  success: string;
  danger: string;
  warning: string;
  info: string;
  light: string;
  dark: string;
  background: string;
  text: string;
  accent: string;
  foreground: string;
  muted: string;
  border: string;
}

export interface ThemeSizes {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
}

export interface ThemeBreakpoints {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
}

export interface ThemeFontSizes {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  "2xl": string;
  "3xl": string;
  "4xl": string;
  "5xl": string;
}

export interface ThemeFontWeights {
  thin: number;
  light: number;
  normal: number;
  medium: number;
  semibold: number;
  bold: number;
  extrabold: number;
}

export interface ThemeSpacing {
  0: string;
  1: string;
  2: string;
  3: string;
  4: string;
  5: string;
  6: string;
  8: string;
  10: string;
  12: string;
  16: string;
  20: string;
  24: string;
  32: string;
  40: string;
  48: string;
  64: string;
}

export interface ThemeRadius {
  none: string;
  sm: string;
  md: string;
  lg: string;
  full: string;
}

export interface ThemeShadows {
  none: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
}

export interface Theme {
  colors: ThemeColors;
  sizes: ThemeSizes;
  breakpoints: ThemeBreakpoints;
  fontSizes: ThemeFontSizes;
  fontWeights: ThemeFontWeights;
  spacing: ThemeSpacing;
  radius: ThemeRadius;
  shadows: ThemeShadows;
}

// Default theme
export const defaultTheme: Theme = {
  colors: {
    primary: "hsl(var(--primary))",
    secondary: "hsl(var(--secondary))",
    success: "#10B981", // green-500
    danger: "#EF4444", // red-500
    warning: "#F59E0B", // amber-500
    info: "hsl(var(--info))",
    light: "hsl(var(--light))",
    dark: "hsl(var(--dark))",
    background: "hsl(var(--background))",
    text: "hsl(var(--foreground))",
    accent: "hsl(var(--accent))",
    foreground: "hsl(var(--foreground))",
    muted: "hsl(var(--muted))",
    border: "hsl(var(--border))",
  },
  sizes: {
    xs: "0.75rem",
    sm: "0.875rem",
    md: "1rem",
    lg: "1.125rem",
    xl: "1.25rem",
  },
  breakpoints: {
    xs: "0px",
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
  },
  fontSizes: {
    xs: "0.75rem",
    sm: "0.875rem",
    md: "1rem",
    lg: "1.125rem",
    xl: "1.25rem",
    "2xl": "1.5rem",
    "3xl": "1.875rem",
    "4xl": "2.25rem",
    "5xl": "3rem",
  },
  fontWeights: {
    thin: 100,
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  },
  spacing: {
    0: "0px",
    1: "0.25rem",
    2: "0.5rem",
    3: "0.75rem",
    4: "1rem",
    5: "1.25rem",
    6: "1.5rem",
    8: "2rem",
    10: "2.5rem",
    12: "3rem",
    16: "4rem",
    20: "5rem",
    24: "6rem",
    32: "8rem",
    40: "10rem",
    48: "12rem",
    64: "16rem",
  },
  radius: {
    none: "0px",
    sm: "calc(var(--radius) - 4px)",
    md: "calc(var(--radius) - 2px)",
    lg: "var(--radius)",
    full: "9999px",
  },
  shadows: {
    none: "none",
    sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
    md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
    lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
    xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
  },
};

// Create a utility function to override the default theme
export const createTheme = (overrides: Partial<Theme> = {}): Theme => {
  return {
    ...defaultTheme,
    ...overrides,
    colors: {
      ...defaultTheme.colors,
      ...(overrides.colors || {}),
    },
    sizes: {
      ...defaultTheme.sizes,
      ...(overrides.sizes || {}),
    },
    breakpoints: {
      ...defaultTheme.breakpoints,
      ...(overrides.breakpoints || {}),
    },
    fontSizes: {
      ...defaultTheme.fontSizes,
      ...(overrides.fontSizes || {}),
    },
    fontWeights: {
      ...defaultTheme.fontWeights,
      ...(overrides.fontWeights || {}),
    },
    spacing: {
      ...defaultTheme.spacing,
      ...(overrides.spacing || {}),
    },
    radius: {
      ...defaultTheme.radius,
      ...(overrides.radius || {}),
    },
    shadows: {
      ...defaultTheme.shadows,
      ...(overrides.shadows || {}),
    },
  };
};

// Export the default theme
export default defaultTheme;
