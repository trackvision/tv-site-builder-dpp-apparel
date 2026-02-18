import { describe, it, expect } from "vitest";
import {
  createNutrientMap,
  calculateServingsPerContainer,
  normalizeUnit,
  formatNutrientValue,
  formatDailyValue,
} from "./nutritionUtils";
import type { Nutrient } from "@/types";

describe("nutritionUtils", () => {
  describe("createNutrientMap", () => {
    it("creates a map from nutrients array", () => {
      const nutrients: Nutrient[] = [
        { nutrient_type: "proteinPerNutrientBasis", nutrient_value: 10 },
        { nutrient_type: "fatPerNutrientBasis", nutrient_value: 5 },
      ];

      const map = createNutrientMap(nutrients);

      expect(map["proteinPerNutrientBasis"]?.nutrient_value).toBe(10);
      expect(map["fatPerNutrientBasis"]?.nutrient_value).toBe(5);
    });

    it("returns empty map for empty array", () => {
      const map = createNutrientMap([]);
      expect(Object.keys(map)).toHaveLength(0);
    });

    it("returns empty map for undefined", () => {
      const map = createNutrientMap(undefined);
      expect(Object.keys(map)).toHaveLength(0);
    });

    it("skips nutrients without nutrient_type", () => {
      const nutrients: Nutrient[] = [
        { nutrient_type: "proteinPerNutrientBasis", nutrient_value: 10 },
        { nutrient_value: 5 }, // No type
      ];

      const map = createNutrientMap(nutrients);

      expect(Object.keys(map)).toHaveLength(1);
      expect(map["proteinPerNutrientBasis"]).toBeDefined();
    });

    it("handles all standard nutrient types", () => {
      const nutrients: Nutrient[] = [
        { nutrient_type: "energyPerNutrientBasis", nutrient_value: 200 },
        { nutrient_type: "carbohydratesPerNutrientBasis", nutrient_value: 30 },
        { nutrient_type: "sugarsPerNutrientBasis", nutrient_value: 15 },
      ];

      const map = createNutrientMap(nutrients);

      expect(map["energyPerNutrientBasis"]?.nutrient_value).toBe(200);
      expect(map["carbohydratesPerNutrientBasis"]?.nutrient_value).toBe(30);
      expect(map["sugarsPerNutrientBasis"]?.nutrient_value).toBe(15);
    });
  });

  describe("calculateServingsPerContainer", () => {
    it("calculates servings when units match", () => {
      const result = calculateServingsPerContainer(1000, 250, "ml", "ml");
      expect(result).toBe(4);
    });

    it("rounds to nearest integer", () => {
      const result = calculateServingsPerContainer(1000, 333, "ml", "ml");
      expect(result).toBe(3);
    });

    it("returns null when net content is missing", () => {
      const result = calculateServingsPerContainer(null, 250, "ml", "ml");
      expect(result).toBeNull();
    });

    it("returns null when serving size is missing", () => {
      const result = calculateServingsPerContainer(1000, null, "ml", "ml");
      expect(result).toBeNull();
    });

    it("returns null when units don't match", () => {
      const result = calculateServingsPerContainer(1000, 250, "g", "ml");
      expect(result).toBeNull();
    });

    it("returns null when serving size unit is missing", () => {
      const result = calculateServingsPerContainer(1000, 250, null, "ml");
      expect(result).toBeNull();
    });

    it("handles zero serving size (would be NaN)", () => {
      const result = calculateServingsPerContainer(1000, 0, "ml", "ml");
      expect(result).toBeNull();
    });

    it("returns 1 for equal content and serving size", () => {
      const result = calculateServingsPerContainer(250, 250, "ml", "ml");
      expect(result).toBe(1);
    });
  });

  describe("normalizeUnit", () => {
    it("converts MLT to ml", () => {
      expect(normalizeUnit("MLT")).toBe("ml");
    });

    it("returns original unit for non-MLT", () => {
      expect(normalizeUnit("g")).toBe("g");
    });

    it("returns original unit for 'kg'", () => {
      expect(normalizeUnit("kg")).toBe("kg");
    });

    it("returns empty string for null", () => {
      expect(normalizeUnit(null)).toBe("");
    });

    it("returns empty string for undefined", () => {
      expect(normalizeUnit(undefined)).toBe("");
    });

    it("returns empty string for empty string", () => {
      expect(normalizeUnit("")).toBe("");
    });
  });

  describe("formatNutrientValue", () => {
    it("formats nutrient value with default unit", () => {
      const nutrient: Nutrient = { nutrient_value: 10 };
      expect(formatNutrientValue(nutrient)).toBe("10g");
    });

    it("formats nutrient value with custom unit", () => {
      const nutrient: Nutrient = { nutrient_value: 200 };
      expect(formatNutrientValue(nutrient, "mg")).toBe("200mg");
    });

    it("returns N/A for undefined nutrient", () => {
      expect(formatNutrientValue(undefined)).toBe("N/A");
    });

    it("returns N/A for nutrient without value", () => {
      const nutrient: Nutrient = { nutrient_type: "proteinPerNutrientBasis" };
      expect(formatNutrientValue(nutrient)).toBe("N/A");
    });

    it("formats zero values", () => {
      const nutrient: Nutrient = { nutrient_value: 0 };
      expect(formatNutrientValue(nutrient)).toBe("N/A");
    });

    it("formats decimal values", () => {
      const nutrient: Nutrient = { nutrient_value: 2.5 };
      expect(formatNutrientValue(nutrient)).toBe("2.5g");
    });
  });

  describe("formatDailyValue", () => {
    it("formats daily value percentage", () => {
      const nutrient: Nutrient = { daily_value_intake_percent: 25 };
      expect(formatDailyValue(nutrient)).toBe("25%");
    });

    it("returns N/A% for undefined nutrient", () => {
      expect(formatDailyValue(undefined)).toBe("N/A%");
    });

    it("returns N/A% for nutrient without daily value", () => {
      const nutrient: Nutrient = { nutrient_value: 10 };
      expect(formatDailyValue(nutrient)).toBe("N/A%");
    });

    it("returns N/A% for null daily value", () => {
      const nutrient: Nutrient = { daily_value_intake_percent: null };
      expect(formatDailyValue(nutrient)).toBe("N/A%");
    });
  });
});
