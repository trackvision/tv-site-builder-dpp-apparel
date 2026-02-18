import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import ScanSurvey from "./index";

describe("ScanSurvey", () => {
  it("renders heading", () => {
    render(<ScanSurvey />);

    expect(screen.getByText("We Value Your Opinion")).toBeInTheDocument();
  });

  it("renders question text", () => {
    render(<ScanSurvey />);

    expect(screen.getByText("Where are you scanning from today?")).toBeInTheDocument();
  });

  it("renders both survey options", () => {
    render(<ScanSurvey />);

    expect(screen.getByText("In Store")).toBeInTheDocument();
    expect(screen.getByText("At Home")).toBeInTheDocument();
  });

  it("handles selection", () => {
    render(<ScanSurvey />);

    const inStoreButton = screen.getByText("In Store").closest("button")!;
    fireEvent.click(inStoreButton);

    expect(inStoreButton.className).toContain("bg-primary");
  });
});
