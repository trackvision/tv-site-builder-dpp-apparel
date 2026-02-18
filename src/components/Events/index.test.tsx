import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Events from "./index";
import type { DppItemTraceContextData } from "@/contexts/DppItemTraceContext";
import type { Event } from "@/types";

// Mock the context hook
const mockContextValue: DppItemTraceContextData = {
  isLoading: false,
  events: undefined,
};

vi.mock("@/hooks/useDppItemTraceContext", () => ({
  useDppItemTraceContext: vi.fn(() => mockContextValue),
}));

describe("Events", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Reset mock context to defaults
    Object.assign(mockContextValue, {
      isLoading: false,
      events: undefined,
    });
  });

  describe("empty state", () => {
    it("returns null when events is undefined", () => {
      mockContextValue.events = undefined;

      const { container } = render(<Events />);

      expect(container.firstChild).toBeNull();
    });

    it("returns null when events array is empty", () => {
      mockContextValue.events = [];

      const { container } = render(<Events />);

      expect(container.firstChild).toBeNull();
    });
  });

  describe("event list rendering", () => {
    const mockEvents: Event[] = [
      {
        event_id: "1",
        event_time: new Date("2024-06-15T10:30:00Z"),
        biz_step: "commissioning",
        disposition: "active",
      },
      {
        event_id: "2",
        event_time: new Date("2024-06-20T14:00:00Z"),
        biz_step: "Retail_Sold",
        disposition: "sold",
      },
    ];

    beforeEach(() => {
      mockContextValue.events = mockEvents;
    });

    it("renders the section title", () => {
      render(<Events />);

      expect(screen.getByText("PRODUCT JOURNEY")).toBeInTheDocument();
    });

    it("renders all events when expanded", () => {
      render(<Events />);

      // Open the accordion
      fireEvent.click(screen.getByRole("button"));

      // Check for formatted business steps
      expect(screen.getByText("Commissioning")).toBeInTheDocument();
      expect(screen.getByText("Retail Sold")).toBeInTheDocument();
    });

    it("formats business step text correctly", () => {
      mockContextValue.events = [
        {
          event_id: "1",
          biz_step: "shipping_receiving",
          disposition: "in_transit",
        },
      ];

      render(<Events />);
      fireEvent.click(screen.getByRole("button"));

      expect(screen.getByText("Shipping Receiving")).toBeInTheDocument();
    });

    it("displays N/A for missing event data", () => {
      mockContextValue.events = [
        {
          event_id: "1",
          biz_step: "",
          disposition: "",
        },
      ];

      render(<Events />);
      fireEvent.click(screen.getByRole("button"));

      // formatText returns "N/A" for empty strings
      const naElements = screen.getAllByText("N/A");
      expect(naElements.length).toBeGreaterThanOrEqual(2);
    });
  });
});
