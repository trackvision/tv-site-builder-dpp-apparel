import { Clock } from "lucide-react";
import { useDppItemTraceContext } from "@/hooks/useDppItemTraceContext";
import AccordionSection from "@/components/AccordionSection";

// Helper function to format text: "Retail_Sold" -> "Retail Sold" or "commissioning" -> "Commissioning"
const formatText = (text: string): string => {
  if (!text) return "N/A";
  return text
    .split("_")
    .map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(" ");
};

// Helper function to format date as DD-MMM-YY
const formatEventDate = (dateInput: string | Date): string => {
  if (!dateInput) return "N/A";
  try {
    const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: '2-digit'
    }).toUpperCase();
  } catch {
    return "N/A";
  }
};

export default function Events() {
  const { events } = useDppItemTraceContext();

  if (!events || events.length === 0) {
    return null;
  }

  return (
    <AccordionSection icon={Clock} title="PRODUCT JOURNEY">
      <div className="space-y-4">
        {events.map((event, index) => (
          <div key={index} className="grid grid-cols-3 gap-2 items-center border-b border-gray-200 pb-4 last:border-b-0" style={{ gridTemplateColumns: "auto 1fr 1fr" }}>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.05em] text-gray-500">Date</p>
              <p className="text-xs font-bold text-primary">{formatEventDate(event.event_time || "")}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.05em] text-gray-500">Business Step</p>
              <p className="text-xs font-bold text-primary">{formatText(event.biz_step || "")}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.05em] text-gray-500">Location</p>
              <p className="text-xs font-bold text-primary">{event.biz_location_join_key?.location_name || "N/A"}</p>
            </div>
          </div>
        ))}
      </div>
    </AccordionSection>
  );
}
