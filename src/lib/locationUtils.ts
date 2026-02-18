import type { BizLocation, Itemtrace } from "@/types";

/**
 * Derives a region name from location data.
 * This function contains business logic for mapping locations to regions.
 * In the future, this could be enhanced with actual region lookup logic or API calls.
 */
export function deriveRegionFromLocation(location: BizLocation): string {
  // Business logic for region mapping
  if (location.location_name?.includes("Gen")) {
    return "Robinvale";
  }
  
  // Additional region mapping logic could be added here
  // Example: if (location.state === "Victoria") return "Greater Sunraysia";
  
  // Default fallback
  return "Robinvale";
}

/**
 * Extracts the primary location from itemtrace data.
 * Tries to get location from child items first, then falls back to main item.
 */
export function extractPrimaryLocation(data: Itemtrace): BizLocation | null {
  // Try to get location data from the first child's commission location
  if (data.children && data.children.length > 0 && data.children[0].commission_location_join_key) {
    return data.children[0].commission_location_join_key;
  }
  
  // Fall back to the main item's commission location
  if (data.commission_location_join_key) {
    return data.commission_location_join_key;
  }
  
  return null;
}

/**
 * Transforms a BizLocation object into a standardized location details object.
 * Handles null/undefined values and provides consistent field mapping.
 */
export function transformLocationDetails(location: BizLocation | null) {
  if (!location) {
    // Fallback to hardcoded data if no location found
    return {
      locationName: "Raw Gen Factory",
      address: "309 Morris Ave",
      city: undefined,
      state: undefined,
      country: undefined,
      region: "Robinvale"
    };
  }

  return {
    locationName: location.location_name || undefined,
    address: location.address || undefined,
    city: location.city || undefined,
    state: location.state || undefined,
    country: location.country_code || undefined,
    region: deriveRegionFromLocation(location)
  };
}

/**
 * Processes raw itemtrace data into a structured format suitable for context.
 * This is the main data transformation function that coordinates all location processing.
 */
export function processItemTraceData(data: Itemtrace | undefined) {
  if (!data) {
    return {
      product: undefined,
      lot: undefined,
      location: null,
      locationName: undefined,
      address: undefined,
      city: undefined,
      state: undefined,
      country: undefined,
      region: undefined
    };
  }

  // Extract core entities
  const product = data.product_join_key;
  const lot = data.lgtin_join_key;
  const location = extractPrimaryLocation(data);
  
  // Transform location details
  const locationDetails = transformLocationDetails(location);

  return {
    product,
    lot,
    location,
    ...locationDetails
  };
}