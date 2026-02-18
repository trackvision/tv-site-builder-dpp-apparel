import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Newsletter from "./index";

describe("Newsletter", () => {
  it("renders heading", () => {
    render(<Newsletter />);

    expect(screen.getByText("Stay Connected")).toBeInTheDocument();
  });

  it("renders email input", () => {
    render(<Newsletter />);

    expect(screen.getByPlaceholderText("Email Address")).toBeInTheDocument();
  });

  it("renders name inputs", () => {
    render(<Newsletter />);

    expect(screen.getByPlaceholderText("First Name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Last Name")).toBeInTheDocument();
  });

  it("renders submit button", () => {
    render(<Newsletter />);

    expect(screen.getByText("Submit")).toBeInTheDocument();
  });

  it("shows thank you message after submit", () => {
    render(<Newsletter />);

    const emailInput = screen.getByPlaceholderText("Email Address");
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });

    const submitButton = screen.getByText("Submit");
    fireEvent.click(submitButton);

    expect(screen.getByText("Thank you for subscribing!")).toBeInTheDocument();
  });
});
