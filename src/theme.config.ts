/**
 * Theme Configuration
 *
 * Edit this file to customize the app's appearance for your brand.
 * These values are applied to CSS variables on app load.
 *
 * To extract these values from a customer's website, see THEMING.md
 * for Playwright extraction instructions.
 *
 * Colors can be specified as:
 * - Hex: "#041E3A"
 * - RGB: "rgb(4, 30, 58)"
 * - HSL: "hsl(78, 52%, 53%)"
 */

export const theme = {
  // ===================
  // Brand Colors
  // ===================

  // Primary color - CTA buttons, headers, key UI elements
  primary: "#2D3748",
  primaryForeground: "#ffffff",

  // Secondary color - links, secondary buttons, icons
  secondary: "#4A5568",
  secondaryForeground: "#ffffff",

  // Accent color - highlights, badges, special elements
  accent: "#E07C5A",
  accentForeground: "#ffffff",

  // ===================
  // Typography
  // ===================

  // Font families - use web-safe fallbacks
  headingFont: '"Inter", Helvetica, Arial, sans-serif',
  bodyFont: '"Inter", Helvetica, Arial, sans-serif',

  // ===================
  // Border Radius
  // ===================

  // CTA/button border radius
  ctaBorderRadius: "0.5rem",

  // Card border radius
  cardBorderRadius: "0.5rem",

  // Base radius (used by shadcn components)
  radius: "0.5rem",

  // ===================
  // Shadows
  // ===================

  // Card box shadow
  cardBoxShadow: "none",

  // ===================
  // Layout
  // ===================

  // Main container max width
  containerMaxWidth: "448px",  // max-w-md equivalent

  // ===================
  // UI Colors (optional overrides)
  // ===================

  // Background colors
  background: "#ffffff",
  foreground: "#2D3748",

  // Card backgrounds
  card: "#ffffff",
  cardForeground: "#2D3748",

  // Muted/subtle elements
  muted: "#F7FAFC",
  mutedForeground: "#718096",

  // Borders and inputs
  border: "#E2E8F0",
  input: "#A0AEC0",
  ring: "#2D3748",

  // Destructive/error state
  destructive: "#ef4444",
};

export type Theme = typeof theme;
