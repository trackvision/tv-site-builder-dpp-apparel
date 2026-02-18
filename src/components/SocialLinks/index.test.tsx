import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import SocialLinks from "./index";
import type { DppItemTraceContextData } from "@/contexts/DppItemTraceContext";

const mockContextValue: DppItemTraceContextData = {
  isLoading: false,
  brand: { brand_name: "Test Brand" },
};

vi.mock("@/hooks/useDppItemTraceContext", () => ({
  useDppItemTraceContext: vi.fn(() => mockContextValue),
}));

describe("SocialLinks", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    Object.assign(mockContextValue, {
      isLoading: false,
      brand: { brand_name: "Test Brand" },
    });
  });

  it("renders heading with brand name", () => {
    render(<SocialLinks />);

    expect(screen.getByText("Follow the World of Test Brand")).toBeInTheDocument();
  });

  it("renders all social media links", () => {
    render(<SocialLinks />);

    expect(screen.getByLabelText("Instagram")).toBeInTheDocument();
    expect(screen.getByLabelText("Facebook")).toBeInTheDocument();
    expect(screen.getByLabelText("YouTube")).toBeInTheDocument();
    expect(screen.getByLabelText("X")).toBeInTheDocument();
    expect(screen.getByLabelText("Pinterest")).toBeInTheDocument();
  });
});
