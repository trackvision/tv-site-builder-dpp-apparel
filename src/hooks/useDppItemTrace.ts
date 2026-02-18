import { useEffect, useState, useCallback } from "react";
import api from "@/api";
import type { Itemtrace } from "@/types";
import { dppLogger as logger } from "@/constants";

interface UseItemTraceState {
  isLoading: boolean;
  data?: Itemtrace;
  error?: Error;
}

interface ItemTraceUrlParams {
  isPreview: boolean;
  gtin: string | null;
  serial: string | null;
  scanid: string | null;
}

function parseUrlParams(): ItemTraceUrlParams {
  const urlParams = new URLSearchParams(location.search);
  return {
    isPreview: urlParams.get("preview") === "true",
    gtin: urlParams.get("gtin"),
    serial: urlParams.get("serial"),
    scanid: urlParams.get("scanid")
  };
}

async function updateScanWithUser(scanid: string | null): Promise<void> {
  if (!scanid) return;

  const localUser = localStorage.getItem("localUser");
  if (!localUser) {
    logger.info("No localUser found, skipping scan update");
    return;
  }

  try {
    // Update the scan_event record in Directus
    const response = await api.patch(`/items/scan_event/${scanid}`, {
      client_id: localUser
    });

    if (response.status === 200 || response.status === 204) {
      logger.info(`Successfully updated scan ${scanid} with client_id: ${localUser}`);
    } else {
      logger.warn(`Unexpected status ${response.status} when updating scan ${scanid}`);
    }
  } catch (error: any) {
    logger.error("Failed to update scan with user:", {
      scanid,
      localUser,
      error: error.message,
      status: error.response?.status
    });
  }
}

function hasValidApiParams(params: ItemTraceUrlParams): boolean {
  return Boolean(params.gtin && params.serial);
}

async function loadPreviewData(): Promise<Itemtrace | null> {
  try {
    const response = await fetch("/ApparelItemTraceExample.json");
    if (!response.ok) {
      return null;
    }
    return await response.json();
  } catch {
    return null;
  }
}

async function fetchApiData(params: ItemTraceUrlParams): Promise<Itemtrace> {
  const { gtin, serial } = params;
  logger.info(`Fetching itemtrace with GTIN: ${gtin}, Serial: ${serial}`);

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    const res = await api.get<Itemtrace>("/itemtrace", {
      params: { gtin, serial },
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    logger.info(`API Response Status: ${res.status}`);
    logger.info("API Response:", res.data);

    if (res.status === 200) {
      return res.data;
    }

    throw new Error(`API request failed with status ${res.status}`);
  } catch (err) {
    const error = err as any;
    logger.error("API Call Error:", {
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      message: error.message,
      code: error.code
    });
    throw error;
  }
}

export function useDppItemTrace(): UseItemTraceState {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<Itemtrace>();
  const [error, setError] = useState<Error>();

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(undefined);

    try {
      const urlParams = parseUrlParams();
      const hasApiParams = hasValidApiParams(urlParams);

      // Check for unauthenticated code (serial without GTIN)
      if (urlParams.serial && !urlParams.gtin) {
        logger.warn("Unauthenticated code detected: Serial provided without GTIN");
        throw new Error("Cannot validate code: Authentication required");
      }

      // Handle localStorage for returning user tracking only for subsequent visits
      const cookieConsent = localStorage.getItem("cookieConsent");
      const existingLocalUser = localStorage.getItem("localUser");

      // Only update scan events on subsequent visits after initial consent
      if (cookieConsent === "accepted" && existingLocalUser && urlParams.scanid) {
        logger.info(`Returning user detected. LocalUser: ${existingLocalUser}, Current scanid: ${urlParams.scanid}`);
        await updateScanWithUser(urlParams.scanid);
      }

      if (urlParams.isPreview || !hasApiParams) {
        const previewData = await loadPreviewData();

        if (previewData) {
          setData(previewData);
          if (!hasApiParams && !urlParams.isPreview) {
            logger.warn(
              "No Item Trace API parameters provided, falling back to preview data. Add ?preview=true to URL to explicitly enable preview mode."
            );
          }
        } else if (urlParams.isPreview) {
          setError(new Error("Preview data not found. Please ensure itemTracePreview.json exists in the public folder."));
        } else {
          logger.warn("No Item Trace API parameters provided and preview data not available. Showing 404 state.");
        }
      } else {
        const apiData = await fetchApiData(urlParams);
        setData(apiData);
      }
    } catch (err) {
      const error = err as Error;
      logger.error("Failed to fetch Item Trace data:", error.message);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { isLoading, data, error };
}
