import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import ProductDetailsBanner from "./index";
import type { DppItemTraceContextData } from "@/contexts/DppItemTraceContext";

const mockContextValue: DppItemTraceContextData = {
  isLoading: false,
  serialNumber: "SN12345",
  commissionTime: new Date("2024-06-15T10:30:00Z"),
  product: { color: "Navy", custom_id: "MAT-001" },
  commissionLocation: { gln: "9501234567890" },
};

vi.mock("@/hooks/useDppItemTraceContext", () => ({
  useDppItemTraceContext: vi.fn(() => mockContextValue),
}));

describe("ProductDetailsBanner", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    Object.assign(mockContextValue, {
      isLoading: false,
      serialNumber: "SN12345",
      commissionTime: new Date("2024-06-15T10:30:00Z"),
      product: { color: "Navy", custom_id: "MAT-001" },
      commissionLocation: { gln: "9501234567890" },
    });
  });

  it("renders serial number", () => {
    render(<ProductDetailsBanner />);

    expect(screen.getByText("SN12345")).toBeInTheDocument();
  });

  it("renders color", () => {
    render(<ProductDetailsBanner />);

    expect(screen.getByText("Navy")).toBeInTheDocument();
  });

  it("renders supplier number (GLN)", () => {
    render(<ProductDetailsBanner />);

    expect(screen.getByText("9501234567890")).toBeInTheDocument();
  });

  it("returns null when no details available", () => {
    Object.assign(mockContextValue, {
      serialNumber: null,
      commissionTime: null,
      product: null,
      commissionLocation: null,
    });

    const { container } = render(<ProductDetailsBanner />);

    expect(container.firstChild).toBeNull();
  });
});
