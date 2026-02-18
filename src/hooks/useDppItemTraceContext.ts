import { useContext } from "react";
import { DppItemTraceContext } from "@/contexts/DppItemTraceContext";

export function useDppItemTraceContext() {
  const context = useContext(DppItemTraceContext);

  if (!context) {
    throw new Error("useDppItemTraceContext must be used within a DppItemTraceProvider");
  }

  return context;
}
