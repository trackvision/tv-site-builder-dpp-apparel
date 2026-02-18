import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import ImageCarousel from "./index";
import type { DppItemTraceContextData } from "@/contexts/DppItemTraceContext";

const mockContextValue: DppItemTraceContextData = {
  isLoading: false,
  brand: { brand_name: "Test Brand" },
};

vi.mock("@/hooks/useDppItemTraceContext", () => ({
  useDppItemTraceContext: vi.fn(() => mockContextValue),
}));

describe("ImageCarousel", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    Object.assign(mockContextValue, {
      isLoading: false,
      brand: { brand_name: "Test Brand" },
    });
  });

  it("renders carousel heading with brand name", () => {
    render(<ImageCarousel />);

    expect(screen.getByText("The World of Test Brand")).toBeInTheDocument();
  });

  it("renders counter showing position", () => {
    render(<ImageCarousel />);

    expect(screen.getByText("1 / 4")).toBeInTheDocument();
  });

  it("renders all carousel images", () => {
    render(<ImageCarousel />);

    expect(screen.getByAltText("Discover More")).toBeInTheDocument();
    expect(screen.getByAltText("Heritage & Craft")).toBeInTheDocument();
    expect(screen.getByAltText("Sustainability")).toBeInTheDocument();
    expect(screen.getByAltText("Collections")).toBeInTheDocument();
  });
});
