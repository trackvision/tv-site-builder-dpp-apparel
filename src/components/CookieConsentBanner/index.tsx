import { useState, useEffect } from "react";
import { X } from "lucide-react";

export default function CookieConsentBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasConsent = localStorage.getItem("cookieConsent");
    if (!hasConsent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "accepted");

    // Now that cookies are accepted, store the scanid as localUser if present
    const urlParams = new URLSearchParams(window.location.search);
    const scanid = urlParams.get("scanid");

    if (scanid && !localStorage.getItem("localUser")) {
      localStorage.setItem("localUser", scanid);
      console.log(`New user detected. Saved localUser: ${scanid}`);

      // Update scan event with client_id
      updateScanEventWithUser(scanid);
    }

    setIsVisible(false);
  };

  const updateScanEventWithUser = async (scanid: string) => {
    try {
      // Import api dynamically to avoid circular dependencies
      const api = (await import("@/api")).default;
      const response = await api.patch(`/items/scan_event/${scanid}`, {
        client_id: scanid
      });

      if (response.status === 200 || response.status === 204) {
        console.log(`Successfully updated scan ${scanid} with client_id: ${scanid}`);
      }
    } catch (error: any) {
      console.error("Failed to update scan with user:", error.message);
    }
  };

  const handleDecline = () => {
    localStorage.setItem("cookieConsent", "declined");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50 p-4">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex-1">
          <p className="text-sm text-gray-700">
            We use cookies to remember your visit and understand how you use our site.{" "}
            <a
              href="/privacy-policy"
              className="text-primary font-semibold hover:underline"
            >
              Privacy Policy
            </a>
          </p>
        </div>
        <div className="flex gap-2 shrink-0">
          <button
            onClick={handleDecline}
            className="px-4 py-2 text-sm font-semibold text-gray-700 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
          >
            Decline
          </button>
          <button
            onClick={handleAccept}
            className="px-4 py-2 text-sm font-semibold text-white bg-primary rounded hover:bg-[#153456] transition-colors"
          >
            Accept
          </button>
        </div>
        <button
          onClick={handleDecline}
          className="absolute top-3 right-3 sm:hidden text-gray-500 hover:text-gray-700"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
