import type { ApparelDppData, CircularityMetrics, EnvironmentalMetrics } from "@/types";

/**
 * Utility functions for processing and formatting Digital Product Passport (DPP) data.
 * These functions follow the same patterns as locationUtils.ts but for apparel DPP data.
 */

/**
 * Formats circularity percentage for display.
 * Handles null/undefined values and ensures consistent formatting.
 */
export function formatCircularityPercent(value: number | null | undefined): string {
  if (value === null || value === undefined) {
    return "-";
  }
  return `${value}%`;
}

/**
 * Formats environmental metric with unit.
 * Returns "-" with unit if value is null/undefined.
 */
export function formatEnvironmentalMetric(
  value: number | null | undefined,
  unit: string
): string {
  if (value === null || value === undefined) {
    return `- ${unit}`;
  }
  return `${value} ${unit}`;
}

/**
 * Calculates total recycled content percentage from material composition.
 * Averages the recycled_content values across all components.
 */
export function calculateRecycledContentPercent(
  data: ApparelDppData
): number | null {
  const fabrics = data.main_fabrics || [];
  let totalRecycled = 0;
  let componentCount = 0;

  fabrics.forEach(fabric => {
    fabric.components?.forEach(component => {
      if (component.recycled_content !== null && component.recycled_content !== undefined) {
        totalRecycled += component.recycled_content;
        componentCount++;
      }
    });
  });

  if (componentCount === 0) {
    return null;
  }

  return Math.round(totalRecycled / componentCount);
}

/**
 * Checks if environmental data is available.
 * Returns true if at least one environmental metric has a value.
 */
export function hasEnvironmentalData(
  environmental: EnvironmentalMetrics | undefined
): boolean {
  if (!environmental) return false;

  return !!(
    environmental.carbon_footprint_kg ||
    environmental.water_used_l ||
    environmental.energy_used_kwh
  );
}

/**
 * Checks if circularity data is meaningful.
 * Returns true if at least one circularity metric has a value other than 0/null.
 */
export function hasCircularityData(
  circularity: CircularityMetrics | undefined
): boolean {
  if (!circularity) return false;

  const hasScore = circularity.durability_score && circularity.durability_score !== "-";
  const hasRecyclable = circularity.recyclable_percent && circularity.recyclable_percent > 0;
  const hasRecycled = circularity.recycled_content_percent && circularity.recycled_content_percent > 0;

  return !!(hasScore || hasRecyclable || hasRecycled);
}

/**
 * Formats a date string for display.
 * Handles various date formats and returns a consistent display format.
 */
export function formatDppDate(dateString: string | undefined): string {
  if (!dateString) return "-";

  // If it's already in a special format like "2025 W20", keep it
  if (dateString.includes("W")) {
    return dateString;
  }

  // Try to parse and format standard dates
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return dateString; // Return as-is if not parseable
    }
    // Format as DD-MM-YYYY to match DPP documentation style
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  } catch {
    return dateString;
  }
}

/**
 * Gets a display-friendly product identifier.
 * Combines class_id and lot_id for full identification.
 */
export function getProductIdentifier(data: ApparelDppData): string {
  const parts = [];
  if (data.class_id) parts.push(data.class_id);
  if (data.lot_id) parts.push(`Lot: ${data.lot_id}`);
  return parts.join(" / ") || "Unknown Product";
}

/**
 * Transforms raw DPP data into a format ready for component consumption.
 * Provides computed values and handles missing data gracefully.
 */
export function processDppData(rawData: ApparelDppData) {
  return {
    ...rawData,
    computed: {
      hasEnvironmentalData: hasEnvironmentalData(rawData.environmental),
      hasCircularityData: hasCircularityData(rawData.circularity),
      productIdentifier: getProductIdentifier(rawData),
      totalRecycledContent: calculateRecycledContentPercent(rawData)
    }
  };
}
