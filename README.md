# Food Traceability React Application

A modern React application for displaying product information, nutrition facts, and supply chain traceability data. This app connects to TrackVision API to provide comprehensive food product verification and tracking.

## 🚀 Quick Start

### Development
```bash
npm install
npm run dev
```

### Production Build
```bash
npm run build
npm run preview
```

## 📋 Available Scripts

- `npm run dev` - Start Vite development server on port 5173
- `npm run build` - Build production bundle with TypeScript compilation
- `npm run lint` - Run ESLint with TypeScript support
- `npm run preview` - Preview production build locally
- `npm run typecheck` - Run TypeScript type checking

## 🌐 Environment Variables

Copy `.env.example` to `.env` and configure:

### Required
- `VITE_API_URL` - TrackVision API endpoint
- `VITE_API_ACCESS_TOKEN` - API authentication token

### Optional
- `VITE_MAPBOX_ACCESS_TOKEN` - For mapping features
- `VITE_SHORT_DATE_FORMAT` - Date display format preference

### Offer System
- `VITE_OFFER_AMOUNT` - Default discount amount (default: 5)
- `VITE_OFFER_RETAILER` - Default retailer name (default: "Walmart")
- `VITE_OFFER_TIMEFRAME` - Offer validity period (default: "this week")
- `VITE_OFFER_CURRENCY` - Currency symbol (default: "$")
- `VITE_DRUMWAVE_SIGNUP_URL` - Drumwave registration URL

## 🏗️ Architecture

### Tech Stack
- **React 19** with TypeScript for modern component development
- **Vite** for fast development and optimized production builds
- **React Router 7** for client-side navigation
- **Tailwind CSS 4** for utility-first styling
- **shadcn/ui** component library for consistent UI
- **Axios** for API communication with custom extensions

### Project Structure
```
src/
├── api.ts              # Axios configuration with Bearer auth
├── types.d.ts          # TypeScript definitions for supply chain data
├── constants.ts        # App constants and configuration
├── hooks/              # Custom React hooks
│   ├── useItemTrace()  # Main data fetching hook
│   ├── useItemTraceContext() # Context data access
│   ├── useImg()        # Image loading from API
│   └── useRatings()    # Product rating management
├── contexts/           # React Context providers
│   ├── ItemTraceContext.ts    # Context definition
│   └── ItemTraceProvider.tsx  # Data provider wrapper
├── pages/              # Route components
│   ├── Landing/        # Main product display page
│   └── Guides/         # Documentation pages
├── components/         # React components
│   ├── Product/        # Product information display
│   ├── NutrientsTable/ # FDA-compliant nutrition facts
│   ├── Verification/   # Product verification flow
│   ├── OfferPage/      # Dynamic discount offers
│   ├── Ratings/        # Interactive rating system
│   ├── Location/       # Supply chain location info
│   ├── Navbar/         # Navigation header
│   ├── Footer/         # Site footer
│   └── ui/             # shadcn/ui components
└── assets/             # Static assets
```

## 🔧 Key Features

### Product Identification
- **GTIN/Serial**: `?gtin=123&serial=ABC`
- **SSCC**: `?sscc=123456789`
- **GRAI**: `?grai=987654321`
- **Preview Mode**: `?preview=true` (uses local test data)

### Data Display
- **Supply Chain Traceability** - Complete product journey visualization
- **Nutrition Facts** - FDA-compliant nutrition label rendering
- **Product Verification** - QR/barcode scanning support
- **Interactive Ratings** - User feedback with haptic feedback
- **Dynamic Offers** - Retailer-specific discount integration

### Performance Optimizations
- **Code Splitting** - Lazy loading for heavy components
- **Mobile-First** - Responsive design with touch interactions
- **Image Optimization** - Base64 conversion for authenticated assets
- **Bundle Optimization** - Chunked vendor libraries

## 🎨 UI Components

### shadcn/ui Integration
This app uses [shadcn/ui](https://ui.shadcn.com/) as the primary component library.

**Installing New Components:**
```bash
npx shadcn@latest add [component-name]
```

**Currently Available:**
- `Button` - Various styles and sizes
- `Card` - Content containers with headers/footers

### Icon System
Uses [Lucide React](https://lucide.dev/) for all iconography.

**Usage Example:**
```tsx
import { Check, Loader2 } from "lucide-react"

<Check className="h-5 w-5 text-green-500" />
<Loader2 className="h-4 w-4 animate-spin" />
```

## 📱 Mobile-First Development

### Mobile Optimizations
- **Responsive Breakpoints** - 320px, 480px, 768px, 1024px+
- **Touch Interactions** - 48px+ touch targets, haptic feedback
- **Performance** - Code splitting, lazy loading, optimized images
- **Navigation** - Mobile-friendly menu with backdrop handling

### Testing Mobile
- Use browser dev tools mobile view
- Test touch interactions and gestures
- Verify loading states work on slower connections
- Check haptic feedback on supported devices

## 🔌 API Integration

### TrackVision API
The app expects these endpoints:

**Item Trace Data:**
```
GET /itemtrace?gtin={gtin}&serial={serial}
GET /itemtrace?sscc={sscc}  
GET /itemtrace?grai={grai}
```

**Image Assets:**
```
GET /assets/{id}
```

### Authentication
- Uses Bearer token authentication
- Token configured via `VITE_API_ACCESS_TOKEN`
- All requests include `Authorization: Bearer {token}` header

### Custom Extensions
- `api.getBase64(url)` - Loads images as base64 with auth
- Automatic error handling and retry logic
- Request/response logging in development

## 🧪 Development Guidelines

### Code Standards
- **TypeScript Strict Mode** - Full type safety
- **ESLint + Prettier** - Code formatting and linting
- **Component Patterns** - Functional components with hooks
- **Import Aliases** - Use `@/` for internal imports

### Adding Components
1. **Check shadcn/ui first** - Don't recreate existing components
2. **Use TypeScript** - Define proper interfaces
3. **Follow naming** - PascalCase for components, camelCase for functions
4. **Context over Props** - Use `useItemTraceContext()` for data access

### Component Template
```tsx
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useItemTraceContext } from "@/hooks/useItemTraceContext";

interface MyComponentProps {
  customValue?: string;
}

export default function MyComponent({ customValue }: MyComponentProps) {
  const { product, isLoading, error } = useItemTraceContext();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error || !product) {
    return <div>Error loading data</div>;
  }

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <h2>{product.name}</h2>
      </CardHeader>
      <CardContent>
        {/* Component content */}
      </CardContent>
    </Card>
  );
}
```

## 🚢 Deployment

### Static Hosting
The built `dist/` folder can be deployed to:
- **Netlify** - Drag & drop or Git integration
- **Vercel** - Automatic deployments from Git
- **GitHub Pages** - Static site hosting
- **AWS S3 + CloudFront** - Scalable CDN deployment

### Build Output
```bash
npm run build
# Creates dist/ directory with:
# - index.html (entry point)
# - assets/ (JS, CSS, images)
# - Optimized and minified bundles
```

### Environment Variables for Production
Ensure these are set in your deployment platform:
- All `VITE_*` variables from your `.env`
- API endpoints and authentication tokens
- Any feature flags or configuration

## 🐛 Troubleshooting

### Common Issues

**Build Failures:**
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

**TypeScript Errors:**
```bash
npm run typecheck
# Fix any type issues in the output
```

**API Connection Issues:**
- Verify `VITE_API_URL` is correct
- Check `VITE_API_ACCESS_TOKEN` is valid
- Test API endpoints directly with curl/Postman

**Component Not Loading:**
- Check for lazy loading with Suspense wrapper
- Verify import paths use `@/` alias correctly
- Ensure component is exported as default

### Development Tools
- **React DevTools** - Component inspection
- **Browser DevTools** - Network, Console, Performance
- **Vite DevTools** - Build analysis and HMR debugging

## 📚 Additional Resources

- **[shadcn/ui Components](https://ui.shadcn.com/docs/components)** - UI component library
- **[Lucide Icons](https://lucide.dev/icons/)** - Icon reference
- **[Tailwind CSS](https://tailwindcss.com/docs)** - Styling documentation
- **[React Router](https://reactrouter.com/)** - Navigation and routing
- **[Vite](https://vitejs.dev/)** - Build tool and development server

For app-specific development patterns and conventions, see `CLAUDE.md` in this directory.