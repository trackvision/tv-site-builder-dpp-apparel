import { Recycle } from "lucide-react";
import { useDppItemTraceContext } from "@/hooks/useDppItemTraceContext";
import AccordionSection from "@/components/AccordionSection";

// PLACEHOLDER_DATA - Replace with API data when available
const PLACEHOLDER_DATA = {
  durability_score: 85,
  recyclable_percent: 92,
  recycled_content_percent: 8,
  recycling_instructions: "Remove all labels and tags. Rinse if needed. Place in textile recycling bin or return to store for recycling program.",
  end_of_life_instructions: "This product can be recycled through our take-back program. Visit our website to find the nearest drop-off location."
};

export default function Circularity() {
  const { isLoading } = useDppItemTraceContext();

  const circularity = PLACEHOLDER_DATA;

  if (isLoading) {
    return (
      <AccordionSection icon={Recycle} title="Circularity">
        <div className="text-gray-500 text-sm">Loading circularity data...</div>
      </AccordionSection>
    );
  }

  return (
    <AccordionSection icon={Recycle} title="Circularity">
      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-gray-50 p-3 text-center">
            <div className="text-xs text-gray-500 mb-1 h-5">Durability Score</div>
            <div className="text-lg font-bold text-primary">
              {circularity.durability_score}
            </div>
          </div>
          <div className="bg-gray-50 p-3 text-center">
            <div className="text-xs text-gray-500 mb-1 h-5">Recyclable</div>
            <div className="text-lg font-bold text-primary">
              {circularity.recyclable_percent}%
            </div>
          </div>
          <div className="bg-gray-50 p-3 text-center">
            <div className="text-xs text-gray-500 mb-1 h-5">Recycled Content</div>
            <div className="text-lg font-bold text-primary">
              {circularity.recycled_content_percent}%
            </div>
          </div>
        </div>

        {circularity.recycling_instructions && (
          <div className="bg-gray-50 border border-gray-200 p-3">
            <h3 className="font-semibold text-sm text-primary mb-2">Recycling Instructions</h3>
            <p className="text-sm text-gray-600">{circularity.recycling_instructions}</p>
          </div>
        )}

        {circularity.end_of_life_instructions && (
          <div className="bg-gray-50 border border-gray-200 p-3">
            <h3 className="font-semibold text-sm text-primary mb-2">End-of-Life Options</h3>
            <p className="text-sm text-gray-600">{circularity.end_of_life_instructions}</p>
          </div>
        )}
      </div>
    </AccordionSection>
  );
}
