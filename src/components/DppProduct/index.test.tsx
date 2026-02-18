import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import DppProduct from "./index";
import type { DppItemTraceContextData } from "@/contexts/DppItemTraceContext";

// Mock the context hook
const mockContextValue: DppItemTraceContextData = {
  isLoading: false,
  product: undefined,
  brand: undefined,
  gtin: null,
  serialNumber: null,
  lotNumber: null,
};

vi.mock("@/hooks/useDppItemTraceContext", () => ({
  useDppItemTraceContext: vi.fn(() => mockContextValue),
}));

// Mock the api module
vi.mock("@/api", () => ({
  default: {
    getBase64: vi.fn(),
  },
}));

describe("DppProduct", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Reset mock context to defaults
    Object.assign(mockContextValue, {
      isLoading: false,
      error: undefined,
      product: undefined,
      brand: undefined,
      gtin: null,
      serialNumber: null,
      lotNumber: null,
    });
  });

  describe("loading state", () => {
    it("shows loading message when isLoading is true", () => {
      mockContextValue.isLoading = true;

      render(<DppProduct />);

      expect(screen.getByText("Loading product details...")).toBeInTheDocument();
    });
  });

  describe("error state", () => {
    it("shows error message when error exists", () => {
      mockContextValue.error = new Error("Failed to load");

      render(<DppProduct />);

      expect(screen.getByText("Error loading product details")).toBeInTheDocument();
    });

    it("shows error message when product is missing", () => {
      mockContextValue.product = undefined;

      render(<DppProduct />);

      expect(screen.getByText("Error loading product details")).toBeInTheDocument();
    });
  });

  describe("successful render", () => {
    beforeEach(() => {
      mockContextValue.product = {
        product_name: "Test Product",
        gtin: "01234567890123",
      };
      mockContextValue.brand = {
        brand_name: "Test Brand",
      };
      mockContextValue.gtin = "01234567890123";
      mockContextValue.serialNumber = "SN12345";
      mockContextValue.lotNumber = "LOT789";
    });

    it("displays product name", () => {
      render(<DppProduct />);

      expect(screen.getByText("Test Product")).toBeInTheDocument();
    });

    it("displays brand name", () => {
      render(<DppProduct />);

      expect(screen.getByText("Test Brand")).toBeInTheDocument();
    });

    it("displays Unknown Product when product_name is missing", () => {
      mockContextValue.product = { gtin: "123" };

      render(<DppProduct />);

      expect(screen.getByText("Unknown Product")).toBeInTheDocument();
    });

    it("does not display brand when missing", () => {
      mockContextValue.brand = null;

      render(<DppProduct />);

      expect(screen.getByText("Test Product")).toBeInTheDocument();
    });
  });
});
