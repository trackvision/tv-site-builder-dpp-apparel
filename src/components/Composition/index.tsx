import { useState } from "react";
import { Layers, ChevronDown, ChevronRight } from "lucide-react";
import { useDppItemTraceContext } from "@/hooks/useDppItemTraceContext";
import AccordionSection from "@/components/AccordionSection";

// Country code to name mapping
const COUNTRY_NAMES: Record<string, string> = {
  "AU": "Australia",
  "US": "United States",
  "GB": "United Kingdom",
  "CA": "Canada",
  "DE": "Germany",
  "FR": "France",
  "IT": "Italy",
  "ES": "Spain",
  "NZ": "New Zealand",
  "JP": "Japan",
  "CN": "China",
  "IN": "India",
  "BR": "Brazil",
  "MX": "Mexico",
  "NL": "Netherlands",
  "BE": "Belgium",
  "CH": "Switzerland",
  "SE": "Sweden",
  "DK": "Denmark",
  "NO": "Norway",
  "PT": "Portugal",
  "GR": "Greece",
  "PL": "Poland",
  "TH": "Thailand",
  "VN": "Vietnam",
  "ID": "Indonesia",
  "PH": "Philippines",
  "SG": "Singapore",
  "MY": "Malaysia",
  "KR": "South Korea",
  "TW": "Taiwan",
  "HK": "Hong Kong",
};

interface MaterialNodeProps {
  material: any;
  level: number;
  expanded: Record<string, boolean>;
  onToggleExpand: (key: string) => void;
}

function MaterialNode({ material, level, expanded, onToggleExpand }: MaterialNodeProps) {
  const relatedLot = material.related_lot_id;
  const hasNestedMaterials = relatedLot?.input_material && relatedLot.input_material.length > 0;
  const hasData = relatedLot && relatedLot.product;
  const nodeKey = `${level}-${relatedLot?.id || Math.random()}`;
  const isExpanded = expanded[nodeKey];

  if (!hasData) {
    return (
      <div className="text-sm text-gray-500 py-2">
        No detailed traceability available for this material
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {/* Material Header with expand/collapse button */}
      <div className="flex items-start gap-2">
        {hasNestedMaterials && (
          <button
            onClick={() => onToggleExpand(nodeKey)}
            className="mt-1 p-0 hover:bg-gray-100 rounded"
            aria-label="Toggle material details"
          >
            {isExpanded ? (
              <ChevronDown size={16} className="text-primary" />
            ) : (
              <ChevronRight size={16} className="text-primary" />
            )}
          </button>
        )}
        {!hasNestedMaterials && <div className="w-4" />}

        {/* Material Details */}
        <div className="flex-1 space-y-2">
          {/* Material Name */}
          <div>
            <div className="text-xs text-gray-500 mb-1 uppercase tracking-[0.05em]">Material</div>
            <div className="text-sm font-semibold text-primary">
              {relatedLot?.product?.product_name || "N/A"}
            </div>
          </div>

          {/* Lot and Origin on same row */}
          <div className="grid grid-cols-2 gap-4">
            {/* Lot Number */}
            <div>
              <div className="text-xs text-gray-500 mb-1 uppercase tracking-[0.05em]">Lot</div>
              <div className="text-sm font-semibold text-primary">
                {relatedLot?.lot_number || "N/A"}
              </div>
            </div>

            {/* Origin */}
            <div>
              <div className="text-xs text-gray-500 mb-1 uppercase tracking-[0.05em]">Origin</div>
              <div className="text-sm font-semibold text-primary">
                {relatedLot?.production_location ?
                  [relatedLot.production_location.state, COUNTRY_NAMES[relatedLot.production_location.country_code || ""] || relatedLot.production_location.country_code]
                    .filter(Boolean)
                    .join(", ") || "N/A"
                  : "N/A"
                }
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Nested Materials */}
      {hasNestedMaterials && isExpanded && (
        <div className="ml-6 pl-4 border-l-2 border-gray-200 space-y-4">
          {relatedLot.input_material.map((nestedMaterial: any, index: number) => (
            <MaterialNode
              key={index}
              material={nestedMaterial}
              level={level + 1}
              expanded={expanded}
              onToggleExpand={onToggleExpand}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function Composition() {
  const { isLoading, lot } = useDppItemTraceContext();
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const inputMaterials = lot?.input_material;
  const hasInputMaterials = inputMaterials && inputMaterials.length > 0;

  const handleToggleExpand = (key: string) => {
    setExpanded((prev) => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  if (isLoading) {
    return (
      <AccordionSection icon={Layers} title="MATERIAL TRACEABILITY">
        <div className="text-gray-500 text-sm">Loading material traceability...</div>
      </AccordionSection>
    );
  }

  return (
    <AccordionSection icon={Layers} title="MATERIAL TRACEABILITY">
      <div className="space-y-4">
        {hasInputMaterials ? (
          <div className="space-y-6">
            {inputMaterials.map((material, index) => (
              <div key={index} className="pb-4 border-b border-gray-200 last:border-b-0">
                <MaterialNode
                  material={material}
                  level={0}
                  expanded={expanded}
                  onToggleExpand={handleToggleExpand}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 py-6 text-sm">
            Not Available
          </div>
        )}
      </div>
    </AccordionSection>
  );
}
