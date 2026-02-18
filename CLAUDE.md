# CLAUDE.md

This file provides guidance to Claude Code when working with this repository.

## Commands

### Development
- `npm run dev` - Start Vite dev server (port 5173)
- `npm run build` - TypeScript compile + Vite build
- `npm run preview` - Test production build locally

### Quality Assurance
- `npx tsc --noEmit` - Run TypeScript type checker
- `npm run lint` - ESLint with TypeScript rules
- `npm test` - Run tests in watch mode (development)
- `npm run test:run` - Run tests once (CI/pre-commit)
- `npm run test:coverage` - Run tests with coverage report

### Deployment
1. `npm run build` - Creates production build in `dist/`
2. `netlify deploy --auth=$NETLIFY_TOKEN --prod` - Deploy to Netlify

### Other
- `npm install` - Install dependencies
- `rm -rf node_modules package-lock.json && npm install` - Clean install

---

## What This App Does

This is a **Digital Product Passport (DPP)** application. It displays:
- Product details (name, images, size, brand, identifiers)
- Manufacturing info (factory details, address, contact)
- Sustainability metrics (durability, recyclability, materials)
- Compliance (certifications, safety standards)
- Supply chain events (when/where product was scanned)

Data comes from the **TrackVision ItemTrace API**. Some sections use placeholder data until API integration is complete.

### Page Sections (Display Order)
1. Product Card - Name, image, brand, GTIN, serial/lot numbers
2. Manufacturer Card - Factory details, GLN, address, map, contact
3. Size & Fit - Available sizes, measurements
4. Circularity - Sustainability metrics
5. Composition - Material breakdown
6. Environmental Impact - Carbon, water, energy footprint
7. Compliance - Certifications and standards
8. Events - Supply chain timeline
9. Passport Info - DPP metadata

---

## Architecture

### Data Flow
1. **`useDppItemTrace` hook** (`src/hooks/useDppItemTrace.ts`)
   - Reads URL parameters (GTIN, serial number from QR code)
   - Calls TrackVision ItemTrace API
   - Supports preview mode: `?preview=true`

2. **`DppItemTraceProvider`** (`src/contexts/DppItemTraceProvider.tsx`)
   - Structures API response for components
   - Provides: `product`, `brand`, `commissionLocation`, `events`, `serialNumber`, `lotNumber`, `gtin`

3. **Components access data via context hook:**
   ```typescript
   const { product, brand, isLoading, error } = useDppItemTraceContext();
   ```

### API Integration
- **Base URL**: `VITE_API_URL` (default: `https://fsma.trackvision.ai`)
- **Auth**: Bearer token via `VITE_API_ACCESS_TOKEN`
- **Images**: Use `api.getBase64()` for authenticated image loading

The `api` object (`src/api.ts`) is a pre-configured axios instance:

```typescript
import api from "@/api";

// GET request
const response = await api.get("/items/collection_name");

// GET with query parameters
const response = await api.get("/items/products", {
  params: {
    filter: { status: { _eq: "published" } },
    fields: ["id", "name", "description"],
    limit: 10
  }
});

// Fetch image as base64 (for authenticated assets)
const imageData = await api.getBase64("/assets/image-id-here");
```

**Common Endpoints:**
- `/items/{collection}` - CRUD operations on collections
- `/assets/{file-id}` - Access uploaded files/images
- `/flows/trigger/{flow-id}` - Trigger Directus Flows

**Query Parameters:**
```typescript
filter: { field: { _eq: "value" } }
filter: { _and: [{ field1: { _eq: "a" } }, { field2: { _gt: 10 } }] }
fields: ["id", "name", "nested.field"]
fields: ["*", "relation.*"]  // Expand relations
sort: ["-date_created"]      // "-" for descending
limit: 10
```

### Available Fields
Refer to `AVAILABLE_FIELDS.md` for the complete API field reference.

### Environment Variables
Configured in `vite.config.ts` with fallback defaults:
- `VITE_API_URL` - API endpoint
- `VITE_API_ACCESS_TOKEN` - API authentication
- `VITE_MAPBOX_ACCESS_TOKEN` - Map display (optional)
- `VITE_SHORT_DATE_FORMAT` - Date formatting

---

## Components

All components are in `src/components/`. Search for `PLACEHOLDER_DATA` in any component to find sample data.

### Using Real API Data
| Component | File | Data Source |
|-----------|------|-------------|
| DppProduct | `DppProduct/index.tsx` | `product`, `brand` from API |
| Manufacturer | `Manufacturer/index.tsx` | `commissionLocation` from API (with fallbacks) |
| Events | `Events/index.tsx` | `events[]` from API |

### Using Placeholder Data
| Component | File | Description |
|-----------|------|-------------|
| SizeAndFit | `SizeAndFit/index.tsx` | Size guide, measurements |
| Circularity | `Circularity/index.tsx` | Sustainability metrics |
| Composition | `Composition/index.tsx` | Material breakdown |
| EnvironmentalImpact | `EnvironmentalImpact/index.tsx` | Carbon/water/energy |
| Compliance | `Compliance/index.tsx` | Certifications, standards |
| ProductionInfo | `ProductionInfo/index.tsx` | Manufacturing details (not in page layout) |
| PassportInfo | `PassportInfo/index.tsx` | DPP metadata |

### Other Components
- **Navbar** - Top navigation bar
- **Footer** - Bottom footer
- **ErrorBoundary** - Error catching (in DppLanding.tsx)

---

## Key Files

### Core
- `src/pages/DppLanding.tsx` - Main page, component order
- `src/hooks/useDppItemTrace.ts` - API data fetching
- `src/contexts/DppItemTraceProvider.tsx` - Data context provider
- `src/api.ts` - API client, image loading
- `src/types.d.ts` - TypeScript interfaces

### Configuration
- `vite.config.ts` - Build config, environment variables
- `AVAILABLE_FIELDS.md` - Complete API field reference

### Templates
- `src/components/_TEMPLATE/index.tsx` - New component boilerplate

---

## Development Patterns

### Data Access
Components use the context hook (not props):
```typescript
import { useDppItemTraceContext } from "@/hooks/useDppItemTraceContext";

const { product, brand, commissionLocation, isLoading, error } = useDppItemTraceContext();
```

### Available Context Fields
- `product` - Product details (name, GTIN, size, images)
- `brand` - Brand information
- `commissionLocation` - Manufacturing location
- `lastSeenLocation` - Last supply chain location
- `lot` - Lot/batch information
- `events` - Supply chain events array
- `serialNumber`, `lotNumber`, `gtin` - Product identifiers
- `isLoading`, `error` - Loading/error states

### Component Creation
1. Check shadcn/ui first (`src/components/ui/`)
2. Use `@/` import alias for internal modules
3. See `src/components/_TEMPLATE/` for boilerplate

### Project Standards
- **Theming**: Edit `src/theme.config.ts` to customize brand colors
- **Theme classes**: Use `bg-primary`, `text-primary` instead of hardcoded colors
- TypeScript strict mode enabled

---

## Common Tasks

- **Update placeholder data**: Edit `PLACEHOLDER_DATA` object in component file
- **Change component order**: Reorder JSX in `src/pages/DppLanding.tsx`
- **Add new component**: Copy `src/components/_TEMPLATE/`, add to `DppLanding.tsx`
- **Connect to real API**: Check `AVAILABLE_FIELDS.md`, use context data in component

---

## Template Customization

### Forking for New Projects
1. Update `src/types.d.ts` interfaces for your API
2. Configure environment variables
3. Customize components in `src/components/`
4. Update `src/api.ts` for different endpoints

---

## Theming & Brand Customization

**See [`THEMING.md`](./THEMING.md) for complete theming documentation.**

Quick reference:
- **Config file**: `src/theme.config.ts` - Edit this to change brand colors
- **Theme classes**: Use `bg-primary`, `text-primary` instead of hardcoded colors
- **Provider**: `ThemeProvider` in `src/contexts/` applies theme on app load

---

## Testing Workflow

### Philosophy: Prototype First, Test Before Commit

**During prototyping**: Write code freely without tests. Rapid iteration and exploration should not be slowed down by test requirements.

**Before committing**: Tests MUST exist and pass. A pre-commit hook automatically runs `npm run test:run` and blocks commits if tests fail.

### What Requires Tests

| Code Type | Test Required | Location |
|-----------|---------------|----------|
| Utility functions (`src/lib/*.ts`) | **Yes** | `src/lib/*.test.ts` |
| Custom hooks (`src/hooks/*.ts`) | **Yes** | `src/hooks/*.test.ts` |
| Components with logic | **Yes** | `src/components/*/index.test.tsx` |
| Simple presentational components | Optional | - |
| Type definitions | No | - |

### Before Pushing

**Always run `npm run build` before `git push`.** This catches TypeScript errors before code reaches the remote. If the build fails, fix the errors before pushing.

### Pre-Commit Hook

The pre-commit hook runs automatically on `git commit`:
- Executes `npm run test:run` (all tests, ~1-2 seconds)
- Blocks commit if any test fails
- Commit proceeds only when all tests pass

### Emergency Bypass

In rare cases where you need to commit without tests (hotfix, WIP branch):
```bash
git commit --no-verify -m "WIP: message"
```

**This is discouraged.** Tests must be added before merging to main.

### Writing Tests

Tests use Vitest with React Testing Library. Example patterns:

```typescript
// Utility test (src/lib/myUtil.test.ts)
import { describe, it, expect } from "vitest";
import { myFunction } from "./myUtil";

describe("myFunction", () => {
  it("handles normal input", () => {
    expect(myFunction("input")).toBe("expected");
  });
});
```

```typescript
// Component test (src/components/MyComponent/index.test.tsx)
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import MyComponent from "./index";

vi.mock("@/hooks/useDppItemTraceContext", () => ({
  useDppItemTraceContext: () => ({ product: { name: "Test" } }),
}));

describe("MyComponent", () => {
  it("renders product name", () => {
    render(<MyComponent />);
    expect(screen.getByText("Test")).toBeInTheDocument();
  });
});
```
