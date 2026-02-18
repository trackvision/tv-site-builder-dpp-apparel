# Theming & Brand Customization

This template uses a centralized theming system for easy brand customization. When cloning this template for a new customer, you can manually configure colors or extract them automatically from a reference website.

## Quick Start

### Option 1: Manual Configuration

1. Open `src/theme.config.ts`
2. Change the values to match the customer's brand
3. Build and deploy

### Option 2: Extract from Website with WebFetch (Recommended)

Use WebFetch to extract styling from a customer's website. This requires no additional setup.

**Step 1: Fetch the page HTML**
```
Use WebFetch to fetch [CUSTOMER_URL] and extract:
- Any <link rel="stylesheet"> URLs
- Inline <style> blocks
- CSS custom properties in :root
```

**Step 2: Fetch CSS files and extract theme**
```
Fetch the main CSS file(s) and look for:
1. Primary Color - button background-color, .btn classes, [class*="cta"]
2. Secondary Color - anchor/link color definitions
3. Heading Font - h1, h2 font-family declarations
4. Body Font - body, p font-family declarations
5. Border Radius - button border-radius values
6. Box Shadow - card or container box-shadow values
7. Container Width - max-width of main container

Output as theme.config.ts values.
```

**Example extraction prompt:**
```
Fetch https://example-customer.com and analyze the page:
1. Find all stylesheet links and fetch the main CSS file
2. Look for CSS custom properties (--primary-color, --brand-color, etc.)
3. Find button/CTA background colors
4. Find link text colors
5. Find font-family declarations for headings and body
6. Extract border-radius and box-shadow values

Create a theme.config.ts with these extracted values.
```

### Option 3: Playwright (Fallback for JS-Heavy Sites)

For single-page apps (React, Vue, Angular) where styles are loaded dynamically via JavaScript, use Playwright to render the page first. This requires installing the Playwright MCP server.

**When to use Playwright:**
- Site shows blank/loading state when fetched with WebFetch
- Styles are injected via JavaScript at runtime
- CSS-in-JS libraries (styled-components, emotion, etc.)

**Setup (optional):**
```json
// .mcp.json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["@playwright/mcp@latest"]
    }
  }
}
```

```bash
# Install Playwright browsers
npx playwright install chromium --with-deps
```

**Example Playwright prompt:**
```
Navigate to https://example-customer.com and extract their brand styling:
- Get the primary button background color
- Get the link text color
- Get the font families for headings and body
- Get the button border radius
- Get any card shadows
- Get the container max-width

Create a theme.config.ts with these values.
```

---

## Theme Configuration Reference

### theme.config.ts Structure

```typescript
export const theme = {
  // ===================
  // Brand Colors
  // ===================

  // Primary - CTA buttons, headers, key UI
  primary: "#A6C44A",
  primaryForeground: "#ffffff",

  // Secondary - links, secondary buttons
  secondary: "#8DC63F",
  secondaryForeground: "#ffffff",

  // Accent - highlights, badges
  accent: "#8DC63F",
  accentForeground: "#ffffff",

  // ===================
  // Typography
  // ===================

  headingFont: "Inter, system-ui, sans-serif",
  bodyFont: "Inter, system-ui, sans-serif",

  // ===================
  // Border Radius
  // ===================

  ctaBorderRadius: "0.5rem",
  cardBorderRadius: "0.75rem",
  radius: "0.625rem",

  // ===================
  // Shadows
  // ===================

  cardBoxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",

  // ===================
  // Layout
  // ===================

  containerMaxWidth: "448px",

  // ===================
  // UI Colors
  // ===================

  background: "#ffffff",
  foreground: "#0a0a0a",
  card: "#ffffff",
  cardForeground: "#0a0a0a",
  muted: "#f5f5f5",
  mutedForeground: "#737373",
  border: "#e5e5e5",
  input: "#e5e5e5",
  ring: "#a3a3a3",
  destructive: "#ef4444",
};
```

---

## Using Theme Properties

### CSS Variables Applied

The ThemeProvider creates these CSS custom properties:

| Theme Property | CSS Variable | Usage |
|---------------|--------------|-------|
| `primary` | `--primary` | `bg-primary`, `text-primary` |
| `secondary` | `--secondary` | `bg-secondary`, `text-secondary` |
| `headingFont` | `--font-heading` | `font-[var(--font-heading)]` |
| `bodyFont` | `--font-body` | `font-[var(--font-body)]` |
| `ctaBorderRadius` | `--radius-cta` | `rounded-[var(--radius-cta)]` |
| `cardBorderRadius` | `--radius-card` | `rounded-[var(--radius-card)]` |
| `cardBoxShadow` | `--shadow-card` | `shadow-[var(--shadow-card)]` |
| `containerMaxWidth` | `--container-max-width` | `max-w-[var(--container-max-width)]` |

### In Components

```typescript
// Colors (use Tailwind classes)
<button className="bg-primary text-primary-foreground">
<a className="text-secondary hover:text-secondary/80">

// Typography (use CSS variable)
<h1 className="font-[var(--font-heading)]">
<p className="font-[var(--font-body)]">

// Border radius
<button className="rounded-[var(--radius-cta)]">
<div className="rounded-[var(--radius-card)]">

// Shadows
<div className="shadow-[var(--shadow-card)]">

// Container width
<div className="max-w-[var(--container-max-width)] mx-auto">
```

### In JavaScript

```typescript
import { useTheme } from "@/contexts/ThemeProvider";

function MyComponent() {
  const { theme } = useTheme();

  return (
    <div style={{
      fontFamily: theme.bodyFont,
      maxWidth: theme.containerMaxWidth
    }}>
      {/* content */}
    </div>
  );
}
```

---

## Extraction Checklist

When extracting theme from a customer website:

- [ ] **Primary Color** - Main CTA button background color
- [ ] **Secondary Color** - Text link color
- [ ] **Heading Font** - h1/h2 font-family (first font in stack)
- [ ] **Body Font** - Body/paragraph font-family
- [ ] **CTA Border Radius** - Button corner rounding
- [ ] **Card Box Shadow** - Product card shadow
- [ ] **Container Max Width** - Main content area width

### Tips for Accurate Extraction

1. **Find the primary CTA** - Usually "Add to Cart", "Buy Now", or main action button
2. **Check multiple pages** - Product pages often have different styling than homepage
3. **Look for CSS custom properties** - Modern sites often use `--primary-color` etc.
4. **Font stacks** - Extract the first font name, add system fallbacks
5. **Shadows** - Copy the exact value, including rgba colors

---

## Files Reference

| File | Purpose |
|------|---------|
| `src/theme.config.ts` | Theme configuration - main file to edit |
| `src/contexts/ThemeProvider.tsx` | Applies theme as CSS variables |
| `src/index.css` | Base CSS with Tailwind integration |
| `THEMING.md` | This documentation file |
