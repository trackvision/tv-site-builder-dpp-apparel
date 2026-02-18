import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import AuthenticationBadge from "./index";

describe("AuthenticationBadge", () => {
  it("renders authenticated text", () => {
    render(<AuthenticationBadge />);

    expect(screen.getByText("Authenticated")).toBeInTheDocument();
  });
});
