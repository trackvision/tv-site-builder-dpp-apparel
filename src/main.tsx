import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { ThemeProvider } from "@/contexts/ThemeProvider";
import DppLanding from "@/pages/DppLanding";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <DppLanding />
    </ThemeProvider>
  </StrictMode>,
);
