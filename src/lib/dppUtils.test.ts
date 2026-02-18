import { describe, it, expect } from "vitest";
import {
  formatCircularityPercent,
  formatEnvironmentalMetric,
  calculateRecycledContentPercent,
  hasEnvironmentalData,
  hasCircularityData,
  formatDppDate,
  getProductIdentifier,
  processDppData,
} from "./dppUtils";
import type { ApparelDppData, EnvironmentalMetrics, CircularityMetrics } from "@/types";

describe("dppUtils", () => {
  describe("formatCircularityPercent", () => {
    it("formats a valid number with percent sign", () => {
      expect(formatCircularityPercent(75)).toBe("75%");
    });

    it("formats zero correctly", () => {
      expect(formatCircularityPercent(0)).toBe("0%");
    });

    it("returns dash for null", () => {
      expect(formatCircularityPercent(null)).toBe("-");
    });

    it("returns dash for undefined", () => {
      expect(formatCircularityPercent(undefined)).toBe("-");
    });

    it("formats decimal values", () => {
      expect(formatCircularityPercent(33.5)).toBe("33.5%");
    });
  });

  describe("formatEnvironmentalMetric", () => {
    it("formats value with unit", () => {
      expect(formatEnvironmentalMetric(100, "kg CO2")).toBe("100 kg CO2");
    });

    it("formats zero with unit", () => {
      expect(formatEnvironmentalMetric(0, "L")).toBe("0 L");
    });

    it("returns dash with unit for null", () => {
      expect(formatEnvironmentalMetric(null, "kWh")).toBe("- kWh");
    });

    it("returns dash with unit for undefined", () => {
      expect(formatEnvironmentalMetric(undefined, "kg")).toBe("- kg");
    });

    it("handles decimal values", () => {
      expect(formatEnvironmentalMetric(12.5, "L")).toBe("12.5 L");
    });
  });

  describe("calculateRecycledContentPercent", () => {
    it("calculates average recycled content from fabrics", () => {
      const data: ApparelDppData = {
        main_fabrics: [
          {
            fabric_name: "Cotton Blend",
            components: [
              { material: "Cotton", recycled_content: 50 },
              { material: "Polyester", recycled_content: 100 },
            ],
          },
        ],
      };
      expect(calculateRecycledContentPercent(data)).toBe(75);
    });

    it("returns null for empty fabrics array", () => {
      const data: ApparelDppData = { main_fabrics: [] };
      expect(calculateRecycledContentPercent(data)).toBeNull();
    });

    it("returns null for undefined fabrics", () => {
      const data: ApparelDppData = {};
      expect(calculateRecycledContentPercent(data)).toBeNull();
    });

    it("skips components with null recycled_content", () => {
      const data: ApparelDppData = {
        main_fabrics: [
          {
            fabric_name: "Mix",
            components: [
              { material: "Cotton", recycled_content: 80 },
              { material: "Unknown", recycled_content: null },
            ],
          },
        ],
      };
      expect(calculateRecycledContentPercent(data)).toBe(80);
    });

    it("handles multiple fabrics", () => {
      const data: ApparelDppData = {
        main_fabrics: [
          { fabric_name: "Fabric1", components: [{ material: "A", recycled_content: 100 }] },
          { fabric_name: "Fabric2", components: [{ material: "B", recycled_content: 0 }] },
        ],
      };
      expect(calculateRecycledContentPercent(data)).toBe(50);
    });

    it("rounds to nearest integer", () => {
      const data: ApparelDppData = {
        main_fabrics: [
          {
            fabric_name: "Test",
            components: [
              { material: "A", recycled_content: 33 },
              { material: "B", recycled_content: 33 },
              { material: "C", recycled_content: 34 },
            ],
          },
        ],
      };
      expect(calculateRecycledContentPercent(data)).toBe(33);
    });
  });

  describe("hasEnvironmentalData", () => {
    it("returns false for undefined", () => {
      expect(hasEnvironmentalData(undefined)).toBe(false);
    });

    it("returns false for empty object", () => {
      const env: EnvironmentalMetrics = {};
      expect(hasEnvironmentalData(env)).toBe(false);
    });

    it("returns true when carbon_footprint_kg is set", () => {
      const env: EnvironmentalMetrics = { carbon_footprint_kg: 10 };
      expect(hasEnvironmentalData(env)).toBe(true);
    });

    it("returns true when water_used_l is set", () => {
      const env: EnvironmentalMetrics = { water_used_l: 500 };
      expect(hasEnvironmentalData(env)).toBe(true);
    });

    it("returns true when energy_used_kwh is set", () => {
      const env: EnvironmentalMetrics = { energy_used_kwh: 25 };
      expect(hasEnvironmentalData(env)).toBe(true);
    });

    it("returns false when all values are null", () => {
      const env: EnvironmentalMetrics = {
        carbon_footprint_kg: null,
        water_used_l: null,
        energy_used_kwh: null,
      };
      expect(hasEnvironmentalData(env)).toBe(false);
    });
  });

  describe("hasCircularityData", () => {
    it("returns false for undefined", () => {
      expect(hasCircularityData(undefined)).toBe(false);
    });

    it("returns false for empty object", () => {
      const circ: CircularityMetrics = {};
      expect(hasCircularityData(circ)).toBe(false);
    });

    it("returns true when durability_score is set (not dash)", () => {
      const circ: CircularityMetrics = { durability_score: "A" };
      expect(hasCircularityData(circ)).toBe(true);
    });

    it("returns false when durability_score is dash", () => {
      const circ: CircularityMetrics = { durability_score: "-" };
      expect(hasCircularityData(circ)).toBe(false);
    });

    it("returns true when recyclable_percent is greater than 0", () => {
      const circ: CircularityMetrics = { recyclable_percent: 50 };
      expect(hasCircularityData(circ)).toBe(true);
    });

    it("returns false when recyclable_percent is 0", () => {
      const circ: CircularityMetrics = { recyclable_percent: 0 };
      expect(hasCircularityData(circ)).toBe(false);
    });

    it("returns true when recycled_content_percent is greater than 0", () => {
      const circ: CircularityMetrics = { recycled_content_percent: 25 };
      expect(hasCircularityData(circ)).toBe(true);
    });
  });

  describe("formatDppDate", () => {
    it("returns dash for undefined", () => {
      expect(formatDppDate(undefined)).toBe("-");
    });

    it("returns dash for empty string", () => {
      expect(formatDppDate("")).toBe("-");
    });

    it("preserves week format (e.g., 2025 W20)", () => {
      expect(formatDppDate("2025 W20")).toBe("2025 W20");
    });

    it("formats ISO date string to DD-MM-YYYY", () => {
      expect(formatDppDate("2024-09-15")).toBe("15-09-2024");
    });

    it("formats date with time to DD-MM-YYYY", () => {
      expect(formatDppDate("2024-12-25T10:30:00Z")).toBe("25-12-2024");
    });

    it("returns original string if not parseable", () => {
      expect(formatDppDate("invalid-date")).toBe("invalid-date");
    });
  });

  describe("getProductIdentifier", () => {
    it("returns both class_id and lot_id", () => {
      const data: ApparelDppData = { class_id: "ABC123", lot_id: "LOT456" };
      expect(getProductIdentifier(data)).toBe("ABC123 / Lot: LOT456");
    });

    it("returns only class_id if lot_id is missing", () => {
      const data: ApparelDppData = { class_id: "ABC123" };
      expect(getProductIdentifier(data)).toBe("ABC123");
    });

    it("returns only lot_id if class_id is missing", () => {
      const data: ApparelDppData = { lot_id: "LOT456" };
      expect(getProductIdentifier(data)).toBe("Lot: LOT456");
    });

    it("returns 'Unknown Product' if both are missing", () => {
      const data: ApparelDppData = {};
      expect(getProductIdentifier(data)).toBe("Unknown Product");
    });
  });

  describe("processDppData", () => {
    it("returns raw data with computed properties", () => {
      const rawData: ApparelDppData = {
        product_name: "Test Product",
        class_id: "CLASS1",
        lot_id: "LOT1",
        environmental: { carbon_footprint_kg: 10 },
        circularity: { recyclable_percent: 50 },
        main_fabrics: [
          {
            fabric_name: "Cotton",
            components: [{ material: "Cotton", recycled_content: 100 }],
          },
        ],
      };

      const result = processDppData(rawData);

      expect(result.product_name).toBe("Test Product");
      expect(result.computed.hasEnvironmentalData).toBe(true);
      expect(result.computed.hasCircularityData).toBe(true);
      expect(result.computed.productIdentifier).toBe("CLASS1 / Lot: LOT1");
      expect(result.computed.totalRecycledContent).toBe(100);
    });

    it("handles empty data", () => {
      const rawData: ApparelDppData = {};
      const result = processDppData(rawData);

      expect(result.computed.hasEnvironmentalData).toBe(false);
      expect(result.computed.hasCircularityData).toBe(false);
      expect(result.computed.productIdentifier).toBe("Unknown Product");
      expect(result.computed.totalRecycledContent).toBeNull();
    });
  });
});
