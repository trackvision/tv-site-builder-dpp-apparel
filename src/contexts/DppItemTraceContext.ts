import { createContext } from "react";
import type { Itemtrace, Product, Brand, Lot, BizLocation, Event } from "@/types";

export interface DppItemTraceContextData {
  // Core data from useItemTrace
  isLoading: boolean;
  data?: Itemtrace;
  error?: Error;

  // Product details from product_join_key
  product?: Product;

  // Brand details from product_join_key.brand
  brand?: Brand | null;

  // Lot/Batch details from lgtin_join_key
  lot?: Lot;

  // Location details
  commissionLocation?: BizLocation | null;
  lastSeenLocation?: BizLocation | null;
  expectedLocation?: BizLocation | null;

  // Parent/child relationships
  parent?: Itemtrace | null;
  children?: Itemtrace[];

  // Events history
  events?: Event[];

  // Item metadata
  serialNumber?: string | null;
  lotNumber?: string | null;
  gtin?: string | null;
  currentDisposition?: string | null;
  lastBizStep?: string | null;
  commissionTime?: Date | null;
}

export const DppItemTraceContext = createContext<DppItemTraceContextData | null>(null);
