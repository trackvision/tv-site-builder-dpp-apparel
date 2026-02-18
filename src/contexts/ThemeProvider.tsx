/* eslint-disable react-refresh/only-export-components */
import { useEffect, createContext, useContext } from "react";
import type { ReactNode } from "react";
import { theme } from "@/theme.config";
import type { Theme } from "@/theme.config";

/**
 * ThemeProvider applies the theme configuration to CSS custom properties.
 *
 * It converts the theme.config.ts values into CSS variables that Tailwind
 * and components can use. This enables easy brand customization by editing
 * a single configuration file.
 */

interface ThemeContextValue {
  theme: Theme;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

/**
 * Convert a hex color to oklch format for CSS variables.
 * Falls back to the original value if conversion fails.
 */
function hexToOklch(hex: string): string {
  // If not a hex color, return as-is (might be rgb, hsl, etc.)
  if (!hex.startsWith("#")) {
    return hex;
  }

  try {
    // Parse hex to RGB
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;

    // Convert RGB to linear RGB
    const toLinear = (c: number) =>
      c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    const lr = toLinear(r);
    const lg = toLinear(g);
    const lb = toLinear(b);

    // Convert to XYZ
    const x = 0.4124564 * lr + 0.3575761 * lg + 0.1804375 * lb;
    const y = 0.2126729 * lr + 0.7151522 * lg + 0.072175 * lb;
    const z = 0.0193339 * lr + 0.119192 * lg + 0.9503041 * lb;

    // Convert XYZ to OKLab
    const l_ = Math.cbrt(0.8189330101 * x + 0.3618667424 * y - 0.1288597137 * z);
    const m_ = Math.cbrt(0.0329845436 * x + 0.9293118715 * y + 0.0361456387 * z);
    const s_ = Math.cbrt(0.0482003018 * x + 0.2643662691 * y + 0.6338517070 * z);

    const L = 0.2104542553 * l_ + 0.793617785 * m_ - 0.0040720468 * s_;
    const a = 1.9779984951 * l_ - 2.428592205 * m_ + 0.4505937099 * s_;
    const bVal = 0.0259040371 * l_ + 0.7827717662 * m_ - 0.808675766 * s_;

    // Convert OKLab to OKLCH
    const C = Math.sqrt(a * a + bVal * bVal);
    let H = Math.atan2(bVal, a) * (180 / Math.PI);
    if (H < 0) H += 360;

    // Format as oklch
    return `oklch(${L.toFixed(3)} ${C.toFixed(3)} ${H.toFixed(3)})`;
  } catch {
    // If conversion fails, return original
    return hex;
  }
}

/**
 * Apply theme values to CSS custom properties on the document root.
 */
function applyThemeToCSS(themeConfig: Theme): void {
  const root = document.documentElement;

  // Color properties - these get converted to oklch
  const colorVarMap: Record<string, string> = {
    primary: "--primary",
    primaryForeground: "--primary-foreground",
    secondary: "--secondary",
    secondaryForeground: "--secondary-foreground",
    accent: "--accent",
    accentForeground: "--accent-foreground",
    background: "--background",
    foreground: "--foreground",
    card: "--card",
    cardForeground: "--card-foreground",
    muted: "--muted",
    mutedForeground: "--muted-foreground",
    border: "--border",
    input: "--input",
    ring: "--ring",
    destructive: "--destructive",
  };

  // Non-color properties - applied as-is
  const rawVarMap: Record<string, string> = {
    headingFont: "--font-heading",
    bodyFont: "--font-body",
    ctaBorderRadius: "--radius-cta",
    cardBorderRadius: "--radius-card",
    radius: "--radius",
    cardBoxShadow: "--shadow-card",
    containerMaxWidth: "--container-max-width",
  };

  // Apply color values (convert to oklch)
  Object.entries(colorVarMap).forEach(([themeKey, cssVar]) => {
    const value = themeConfig[themeKey as keyof Theme];
    if (value && typeof value === "string") {
      root.style.setProperty(cssVar, hexToOklch(value));
    }
  });

  // Apply non-color values (as-is)
  Object.entries(rawVarMap).forEach(([themeKey, cssVar]) => {
    const value = themeConfig[themeKey as keyof Theme];
    if (value && typeof value === "string") {
      root.style.setProperty(cssVar, value);
    }
  });
}

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  useEffect(() => {
    applyThemeToCSS(theme);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme }}>
      {children}
    </ThemeContext.Provider>
  );
}

/**
 * Hook to access theme configuration in components.
 *
 * @example
 * const { theme } = useTheme();
 * // Access theme.primary, theme.accent, etc.
 */
export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

export default ThemeProvider;
