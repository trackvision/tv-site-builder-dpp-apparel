import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import CTAButton from "./index";
import type { DppItemTraceContextData } from "@/contexts/DppItemTraceContext";

const mockContextValue: DppItemTraceContextData = {
  isLoading: false,
  brand: { brand_name: "Test Brand" },
};

vi.mock("@/hooks/useDppItemTraceContext", () => ({
  useDppItemTraceContext: vi.fn(() => mockContextValue),
}));

describe("CTAButton", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    Object.assign(mockContextValue, {
      isLoading: false,
      brand: { brand_name: "Test Brand" },
    });
  });

  it("renders explore button with brand name", () => {
    render(<CTAButton />);

    expect(screen.getByText("Explore Test Brand")).toBeInTheDocument();
  });

  it("uses fallback when brand is missing", () => {
    mockContextValue.brand = null;

    render(<CTAButton />);

    expect(screen.getByText("Explore Our Brand")).toBeInTheDocument();
  });
});
