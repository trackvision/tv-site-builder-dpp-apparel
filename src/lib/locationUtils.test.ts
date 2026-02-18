import { describe, it, expect } from "vitest";
import {
  deriveRegionFromLocation,
  extractPrimaryLocation,
  transformLocationDetails,
  processItemTraceData,
} from "./locationUtils";
import type { BizLocation, Itemtrace } from "@/types";

describe("locationUtils", () => {
  describe("deriveRegionFromLocation", () => {
    it("returns Robinvale when location_name includes 'Gen'", () => {
      const location: BizLocation = { location_name: "Gen Factory" };
      expect(deriveRegionFromLocation(location)).toBe("Robinvale");
    });

    it("returns Robinvale when location_name includes 'General'", () => {
      const location: BizLocation = { location_name: "General Mills Plant" };
      expect(deriveRegionFromLocation(location)).toBe("Robinvale");
    });

    it("returns Robinvale as default for other locations", () => {
      const location: BizLocation = { location_name: "Some Other Factory" };
      expect(deriveRegionFromLocation(location)).toBe("Robinvale");
    });

    it("returns Robinvale when location_name is undefined", () => {
      const location: BizLocation = {};
      expect(deriveRegionFromLocation(location)).toBe("Robinvale");
    });

    it("returns Robinvale when location_name is null", () => {
      const location: BizLocation = { location_name: null };
      expect(deriveRegionFromLocation(location)).toBe("Robinvale");
    });
  });

  describe("extractPrimaryLocation", () => {
    it("returns commission_location from first child when available", () => {
      const childLocation: BizLocation = { location_name: "Child Location" };
      const data: Itemtrace = {
        children: [{ commission_location_join_key: childLocation }],
        commission_location_join_key: { location_name: "Main Location" },
      };
      expect(extractPrimaryLocation(data)).toEqual(childLocation);
    });

    it("returns main commission_location when no children", () => {
      const mainLocation: BizLocation = { location_name: "Main Location" };
      const data: Itemtrace = {
        commission_location_join_key: mainLocation,
      };
      expect(extractPrimaryLocation(data)).toEqual(mainLocation);
    });

    it("returns null when no location data available", () => {
      const data: Itemtrace = {};
      expect(extractPrimaryLocation(data)).toBeNull();
    });

    it("returns main commission_location when children array is empty", () => {
      const mainLocation: BizLocation = { location_name: "Main Location" };
      const data: Itemtrace = {
        children: [],
        commission_location_join_key: mainLocation,
      };
      expect(extractPrimaryLocation(data)).toEqual(mainLocation);
    });

    it("returns main commission_location when first child has no location", () => {
      const mainLocation: BizLocation = { location_name: "Main Location" };
      const data: Itemtrace = {
        children: [{ epc_join_key: "some-epc" }],
        commission_location_join_key: mainLocation,
      };
      expect(extractPrimaryLocation(data)).toEqual(mainLocation);
    });
  });

  describe("transformLocationDetails", () => {
    it("transforms a complete location object", () => {
      const location: BizLocation = {
        location_name: "Test Factory",
        address: "123 Main St",
        city: "Melbourne",
        state: "North Island",
        country_code: "NZ",
      };

      const result = transformLocationDetails(location);

      expect(result.locationName).toBe("Test Factory");
      expect(result.address).toBe("123 Main St");
      expect(result.city).toBe("Melbourne");
      expect(result.state).toBe("North Island");
      expect(result.country).toBe("NZ");
      expect(result.region).toBe("Robinvale");
    });

    it("returns fallback data when location is null", () => {
      const result = transformLocationDetails(null);

      expect(result.locationName).toBe("Raw Gen Factory");
      expect(result.address).toBe("309 Morris Ave");
      expect(result.city).toBeUndefined();
      expect(result.state).toBeUndefined();
      expect(result.country).toBeUndefined();
      expect(result.region).toBe("Robinvale");
    });

    it("handles location with missing fields", () => {
      const location: BizLocation = {
        location_name: "Partial Factory",
      };

      const result = transformLocationDetails(location);

      expect(result.locationName).toBe("Partial Factory");
      expect(result.address).toBeUndefined();
      expect(result.city).toBeUndefined();
    });

    it("converts empty strings to undefined", () => {
      const location: BizLocation = {
        location_name: "",
        address: "",
      };

      const result = transformLocationDetails(location);

      expect(result.locationName).toBeUndefined();
      expect(result.address).toBeUndefined();
    });
  });

  describe("processItemTraceData", () => {
    it("processes complete itemtrace data", () => {
      const product = { product_name: "Test Product" };
      const lot = { lot_number: "LOT123" };
      const location: BizLocation = {
        location_name: "Factory",
        address: "456 Industrial Ave",
        city: "Sydney",
        country_code: "AU",
      };

      const data: Itemtrace = {
        product_join_key: product,
        lgtin_join_key: lot,
        commission_location_join_key: location,
      };

      const result = processItemTraceData(data);

      expect(result.product).toEqual(product);
      expect(result.lot).toEqual(lot);
      expect(result.location).toEqual(location);
      expect(result.locationName).toBe("Factory");
      expect(result.address).toBe("456 Industrial Ave");
      expect(result.city).toBe("Sydney");
      expect(result.country).toBe("AU");
    });

    it("returns empty structure when data is undefined", () => {
      const result = processItemTraceData(undefined);

      expect(result.product).toBeUndefined();
      expect(result.lot).toBeUndefined();
      expect(result.location).toBeNull();
      expect(result.locationName).toBeUndefined();
      expect(result.address).toBeUndefined();
      expect(result.city).toBeUndefined();
      expect(result.state).toBeUndefined();
      expect(result.country).toBeUndefined();
      expect(result.region).toBeUndefined();
    });

    it("extracts location from children if main location not available", () => {
      const childLocation: BizLocation = {
        location_name: "Child Factory",
        city: "Auckland",
      };

      const data: Itemtrace = {
        children: [{ commission_location_join_key: childLocation }],
      };

      const result = processItemTraceData(data);

      expect(result.location).toEqual(childLocation);
      expect(result.locationName).toBe("Child Factory");
      expect(result.city).toBe("Auckland");
    });
  });
});
