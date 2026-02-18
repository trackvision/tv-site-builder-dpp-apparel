import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import AccordionSection from "./index";
import { Factory } from "lucide-react";

describe("AccordionSection", () => {
  it("renders the title text", () => {
    render(
      <AccordionSection icon={Factory} title="Test Section">
        <p>Content here</p>
      </AccordionSection>
    );

    expect(screen.getByText("Test Section")).toBeInTheDocument();
  });

  it("hides content by default", () => {
    render(
      <AccordionSection icon={Factory} title="Test Section">
        <p>Hidden content</p>
      </AccordionSection>
    );

    expect(screen.queryByText("Hidden content")).not.toBeInTheDocument();
  });

  it("shows content when defaultOpen is true", () => {
    render(
      <AccordionSection icon={Factory} title="Test Section" defaultOpen>
        <p>Visible content</p>
      </AccordionSection>
    );

    expect(screen.getByText("Visible content")).toBeInTheDocument();
  });

  it("toggles content visibility on click", () => {
    render(
      <AccordionSection icon={Factory} title="Test Section">
        <p>Toggle content</p>
      </AccordionSection>
    );

    expect(screen.queryByText("Toggle content")).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button"));

    expect(screen.getByText("Toggle content")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button"));

    expect(screen.queryByText("Toggle content")).not.toBeInTheDocument();
  });

  it("sets aria-expanded correctly", () => {
    render(
      <AccordionSection icon={Factory} title="Test Section">
        <p>Content</p>
      </AccordionSection>
    );

    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("aria-expanded", "false");

    fireEvent.click(button);
    expect(button).toHaveAttribute("aria-expanded", "true");
  });
});
