import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { useDppItemTrace } from "./useDppItemTrace";

// Mock the api module
vi.mock("@/api", () => ({
  default: {
    get: vi.fn(),
  },
}));

// Mock the constants module (logger)
vi.mock("@/constants", () => ({
  dppLogger: {
    warn: vi.fn(),
    error: vi.fn(),
    info: vi.fn(),
  },
}));

describe("useDppItemTrace", () => {
  const originalLocation = window.location;

  beforeEach(() => {
    // Reset all mocks before each test
    vi.clearAllMocks();

    // Mock window.location
    Object.defineProperty(window, "location", {
      value: {
        search: "",
        href: "http://localhost:5173",
      },
      writable: true,
    });

    // Mock fetch for preview data
    global.fetch = vi.fn();
  });

  afterEach(() => {
    // Restore original location
    Object.defineProperty(window, "location", {
      value: originalLocation,
      writable: true,
    });
    vi.restoreAllMocks();
  });

  describe("URL parameter parsing", () => {
    it("extracts gtin from URL", async () => {
      window.location.search = "?gtin=01234567890123&serial=SN001";

      const { default: api } = await import("@/api");
      vi.mocked(api.get).mockResolvedValue({
        status: 200,
        data: { product_join_key: { product_name: "Test" } },
      });

      const { result } = renderHook(() => useDppItemTrace());

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(api.get).toHaveBeenCalledWith("/itemtrace", expect.objectContaining({
        params: { gtin: "01234567890123", serial: "SN001" },
      }));
    });

    it("extracts serial from URL", async () => {
      window.location.search = "?gtin=01234567890123&serial=SERIAL123";

      const { default: api } = await import("@/api");
      vi.mocked(api.get).mockResolvedValue({
        status: 200,
        data: { product_join_key: { product_name: "Test" } },
      });

      const { result } = renderHook(() => useDppItemTrace());

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(api.get).toHaveBeenCalledWith("/itemtrace", expect.objectContaining({
        params: { gtin: "01234567890123", serial: "SERIAL123" },
      }));
    });

    it("detects preview mode from URL", async () => {
      window.location.search = "?preview=true";

      const mockPreviewData = {
        product_join_key: { product_name: "Preview Product" },
      };
      vi.mocked(global.fetch).mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockPreviewData),
      } as Response);

      const { result } = renderHook(() => useDppItemTrace());

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.data).toEqual(mockPreviewData);
    });
  });

  describe("preview mode", () => {
    it("loads preview data when preview=true", async () => {
      window.location.search = "?preview=true";

      const mockPreviewData = {
        product_join_key: { product_name: "Preview Product" },
        serial: "PREVIEW123",
      };
      vi.mocked(global.fetch).mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockPreviewData),
      } as Response);

      const { result } = renderHook(() => useDppItemTrace());

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(global.fetch).toHaveBeenCalledWith("/ApparelItemTraceExample.json");
      expect(result.current.data).toEqual(mockPreviewData);
      expect(result.current.error).toBeUndefined();
    });

    it("falls back to preview data when no API params provided", async () => {
      window.location.search = "";

      const mockPreviewData = {
        product_join_key: { product_name: "Fallback Product" },
      };
      vi.mocked(global.fetch).mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockPreviewData),
      } as Response);

      const { result } = renderHook(() => useDppItemTrace());

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.data).toEqual(mockPreviewData);
    });

    it("sets error when preview data not found in preview mode", async () => {
      window.location.search = "?preview=true";

      vi.mocked(global.fetch).mockResolvedValue({
        ok: false,
      } as Response);

      const { result } = renderHook(() => useDppItemTrace());

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.error).toBeDefined();
      expect(result.current.error?.message).toContain("Preview data not found");
    });
  });

  describe("API fetch", () => {
    it("fetches data from API when gtin and serial provided", async () => {
      window.location.search = "?gtin=01234567890123&serial=SN001";

      const mockApiData = {
        product_join_key: { product_name: "API Product" },
        serial: "SN001",
      };

      const { default: api } = await import("@/api");
      vi.mocked(api.get).mockResolvedValue({
        status: 200,
        data: mockApiData,
      });

      const { result } = renderHook(() => useDppItemTrace());

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.data).toEqual(mockApiData);
      expect(result.current.error).toBeUndefined();
    });

    it("sets error when API returns non-200 status", async () => {
      window.location.search = "?gtin=01234567890123&serial=SN001";

      const { default: api } = await import("@/api");
      vi.mocked(api.get).mockResolvedValue({
        status: 404,
        data: null,
      });

      const { result } = renderHook(() => useDppItemTrace());

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.error).toBeDefined();
      expect(result.current.error?.message).toContain("API request failed");
    });

    it("handles API network error", async () => {
      window.location.search = "?gtin=01234567890123&serial=SN001";

      const { default: api } = await import("@/api");
      vi.mocked(api.get).mockRejectedValue(new Error("Network error"));

      const { result } = renderHook(() => useDppItemTrace());

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.error).toBeDefined();
      expect(result.current.error?.message).toBe("Network error");
    });
  });

  describe("loading states", () => {
    it("starts with isLoading true", () => {
      window.location.search = "?preview=true";

      vi.mocked(global.fetch).mockImplementation(
        () => new Promise((resolve) => setTimeout(() => resolve({ ok: true, json: () => ({}) } as Response), 100))
      );

      const { result } = renderHook(() => useDppItemTrace());

      expect(result.current.isLoading).toBe(true);
    });

    it("sets isLoading to false after data loads", async () => {
      window.location.search = "?preview=true";

      vi.mocked(global.fetch).mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({}),
      } as Response);

      const { result } = renderHook(() => useDppItemTrace());

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });
    });

    it("sets isLoading to false after error", async () => {
      window.location.search = "?gtin=123&serial=456";

      const { default: api } = await import("@/api");
      vi.mocked(api.get).mockRejectedValue(new Error("Failed"));

      const { result } = renderHook(() => useDppItemTrace());

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });
    });
  });
});
