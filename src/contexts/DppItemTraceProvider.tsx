import React, { useMemo } from "react";
import { useDppItemTrace } from "@/hooks/useDppItemTrace";
import { DppItemTraceContext } from "./DppItemTraceContext";

interface DppItemTraceProviderProps {
  children: React.ReactNode;
}

export function DppItemTraceProvider({ children }: DppItemTraceProviderProps) {
  const { isLoading, data, error } = useDppItemTrace();

  const contextValue = useMemo(() => {
    if (!data) {
      return {
        isLoading,
        data,
        error
      };
    }

    return {
      isLoading,
      data,
      error,

      // Product details from product_join_key
      product: data.product_join_key,

      // Brand details from product_join_key.brand
      brand: data.product_join_key?.brand,

      // Lot/Batch details from lgtin_join_key
      lot: data.lgtin_join_key,

      // Location details
      commissionLocation: data.commission_location_join_key,
      lastSeenLocation: data.last_seen_biz_location_join_key,
      expectedLocation: data.expected_biz_location_join_key,

      // Parent/child relationships
      parent: data.parent_join_key,
      children: data.children,

      // Events history
      events: data.events,

      // Item metadata
      serialNumber: data.serial,
      lotNumber: data.lot_number,
      gtin: data.product_join_key?.gtin,
      currentDisposition: data.current_disposition,
      lastBizStep: data.last_biz_step,
      commissionTime: data.commission_time
    };
  }, [isLoading, data, error]);

  return (
    <DppItemTraceContext.Provider value={contextValue}>
      {children}
    </DppItemTraceContext.Provider>
  );
}
