# Product Component Modification Patterns

*This file contains pre-analyzed patterns for common Product component modifications to speed up Claude agent responses*

## **Adding GTIN Field to Product Display**

### Target File: `src/components/Product/index.tsx`

**Location to Modify**: `getDefaultDetails()` function around lines 46-51

**Pattern**: Add GTIN entry to the ProductItem array

```typescript
// BEFORE (existing pattern):
return [
  { label: "CONDITION", value: overrides?.condition || PRODUCT_DEFAULTS.CONDITION },
  { label: "SEASON", value: getSeasonDisplay() },
  { label: "STORAGE", value: overrides?.storage || PRODUCT_DEFAULTS.STORAGE },
  { label: "PACK NUMBER", value: packNumber, showBorder: false }
];

// AFTER (with GTIN added):
return [
  { label: "CONDITION", value: overrides?.condition || PRODUCT_DEFAULTS.CONDITION },
  { label: "SEASON", value: getSeasonDisplay() },
  { label: "STORAGE", value: overrides?.storage || PRODUCT_DEFAULTS.STORAGE },
  { label: "GTIN", value: product?.gtin || "Not Available" },
  { label: "PACK NUMBER", value: packNumber, showBorder: false }
];
```

**Key Points**:
- Insert GTIN before PACK NUMBER (which should remain last with `showBorder: false`)
- Use `product?.gtin` with null-safe access
- Provide fallback value "Not Available" for missing GTIN
- No imports needed - `product` is already available in scope

## **Removing GTIN Field from Product Display**

### Target File: `src/components/Product/index.tsx`

**Location to Modify**: `getDefaultDetails()` function around lines 46-51

**Pattern**: Remove GTIN entry from ProductItem array

```typescript
// BEFORE (with GTIN):
return [
  { label: "CONDITION", value: overrides?.condition || PRODUCT_DEFAULTS.CONDITION },
  { label: "SEASON", value: getSeasonDisplay() },
  { label: "STORAGE", value: overrides?.storage || PRODUCT_DEFAULTS.STORAGE },
  { label: "GTIN", value: product?.gtin || "Not Available" },
  { label: "PACK NUMBER", value: packNumber, showBorder: false }
];

// AFTER (GTIN removed):
return [
  { label: "CONDITION", value: overrides?.condition || PRODUCT_DEFAULTS.CONDITION },
  { label: "SEASON", value: getSeasonDisplay() },
  { label: "STORAGE", value: overrides?.storage || PRODUCT_DEFAULTS.STORAGE },
  { label: "PACK NUMBER", value: packNumber, showBorder: false }
];
```

## **Adding Other Product Fields**

### Common Product Fields Available (from AVAILABLE_FIELDS.md):
- `gtin` - Global Trade Item Number
- `custom_id` - Custom product identifier
- `variant_description` - Product variant details
- `functional_name` - Functional product name
- `brand` - Brand information (object with `brand_name`, `sub_brand_name`)
- `product_manufacturer` - Manufacturing details
- `brand_owner` - Brand ownership
- `net_content` + `net_content_unit` - Content amount and unit
- `net_weight` + `net_weight_unit` - Weight and unit
- `packaging_type_code` - Packaging type

### Pattern for Adding Any Field:
```typescript
// Generic pattern:
{ label: "FIELD_LABEL", value: product?.field_name || "Fallback Value" }

// For fields with units:
{ label: "NET WEIGHT", value: product?.net_weight ? `${product.net_weight} ${product.net_weight_unit || ''}`.trim() : "Not Available" }

// For nested objects:
{ label: "BRAND", value: product?.brand?.brand_name || "Not Available" }
```

## **Modifying Field Display Order**

### Guidelines:
- PACK NUMBER should always be last with `showBorder: false`
- Core fields (CONDITION, SEASON, STORAGE) typically stay at top
- Product-specific fields (GTIN, BRAND, etc.) go in middle
- Lot-specific fields use `lot?.field_name` pattern

### Example Custom Order:
```typescript
return [
  { label: "CONDITION", value: overrides?.condition || PRODUCT_DEFAULTS.CONDITION },
  { label: "BRAND", value: product?.brand?.brand_name || "Not Available" },
  { label: "GTIN", value: product?.gtin || "Not Available" },
  { label: "SEASON", value: getSeasonDisplay() },
  { label: "STORAGE", value: overrides?.storage || PRODUCT_DEFAULTS.STORAGE },
  { label: "PACK NUMBER", value: packNumber, showBorder: false }
];
```

## **Adding Props for Custom Fields**

### If fields need to be customizable via props:

1. **Add to ProductProps interface** (around line 15):
```typescript
interface ProductProps {
  details?: ProductItem[];
  variety?: string;
  description?: string;
  condition?: string;
  storage?: string;
  season?: string;
  showGtin?: boolean;  // New prop
  customGtinLabel?: string;  // New prop
}
```

2. **Use props in getDefaultDetails** (around line 25):
```typescript
const getDefaultDetails = (
  product?: Product, 
  lot?: Lot, 
  overrides?: {
    condition?: string;
    storage?: string;
    season?: string;
    showGtin?: boolean;    // New override
    customGtinLabel?: string;  // New override
  }
): ProductItem[] => {
  // ... existing code ...
  
  const baseItems = [
    { label: "CONDITION", value: overrides?.condition || PRODUCT_DEFAULTS.CONDITION },
    { label: "SEASON", value: getSeasonDisplay() },
    { label: "STORAGE", value: overrides?.storage || PRODUCT_DEFAULTS.STORAGE }
  ];
  
  // Conditionally add GTIN
  if (overrides?.showGtin && product?.gtin) {
    baseItems.push({
      label: overrides?.customGtinLabel || "GTIN",
      value: product.gtin
    });
  }
  
  baseItems.push({ label: "PACK NUMBER", value: packNumber, showBorder: false });
  
  return baseItems;
};
```

## **Constants for Field Labels**

### If adding many fields, consider adding to `src/constants.ts`:
```typescript
export const PRODUCT_FIELD_LABELS = {
  GTIN: "GTIN",
  BRAND: "BRAND",
  MANUFACTURER: "MANUFACTURER",
  NET_WEIGHT: "NET WEIGHT",
  PACKAGING: "PACKAGING"
} as const;
```

Then use in component:
```typescript
{ label: PRODUCT_FIELD_LABELS.GTIN, value: product?.gtin || "Not Available" }
```