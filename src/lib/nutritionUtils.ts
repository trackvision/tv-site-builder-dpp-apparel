import type { Nutrient } from "@/types";

export type NutrientType =
  | "energyPerNutrientBasis"
  | "energyFromFatPerNutrientBasis"
  | "fatPerNutrientBasis"
  | "saturatedFatPerNutrientBasis"
  | "cholesterolPerNutrientBasis"
  | "saltPerNutrientBasis"
  | "carbohydratesPerNutrientBasis"
  | "sugarsPerNutrientBasis"
  | "proteinPerNutrientBasis"
  | "fibrePerNutrientBasis"
  | "vitaminAPerNutrientBasis"
  | "vitaminCPerNutrientBasis"
  | "calciumPerNutrientBasis"
  | "ironPerNutrientBasis";

export interface NutrientMap {
  [key: string]: Nutrient | undefined;
}

/**
 * Transforms nutrients array into an easily accessible map
 * Eliminates repeated getNutrient() calls and improves performance
 */
export function createNutrientMap(nutrients: Nutrient[] = []): NutrientMap {
  const map: NutrientMap = {};
  nutrients.forEach(nutrient => {
    if (nutrient.nutrient_type) {
      map[nutrient.nutrient_type] = nutrient;
    }
  });
  return map;
}

/**
 * Calculates servings per container
 * Returns null if calculation is not possible or invalid
 */
export function calculateServingsPerContainer(
  netContent?: number | null,
  servingSize?: number | null,
  servingSizeUnit?: string | null,
  netContentUnit?: string | null
): number | null {
  if (!netContent || !servingSize || servingSizeUnit !== netContentUnit) {
    return null;
  }

  const servingPerContainerRaw = netContent / servingSize;
  return !Number.isNaN(servingPerContainerRaw) ? Math.round(servingPerContainerRaw) : null;
}

/**
 * Normalizes unit display (e.g., MLT -> ml)
 */
export function normalizeUnit(unit?: string | null): string {
  if (!unit) return '';
  return unit === 'MLT' ? 'ml' : unit;
}

/**
 * Formats nutrient value with unit
 */
export function formatNutrientValue(nutrient?: Nutrient, unit = 'g'): string {
  if (!nutrient?.nutrient_value) return 'N/A';
  return `${nutrient.nutrient_value}${unit}`;
}

/**
 * Formats daily value percentage
 */
export function formatDailyValue(nutrient?: Nutrient): string {
  if (!nutrient?.daily_value_intake_percent) return 'N/A%';
  return `${nutrient.daily_value_intake_percent}%`;
}