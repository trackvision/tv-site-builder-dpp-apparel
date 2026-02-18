import { Leaf } from "lucide-react";
import { useDppItemTraceContext } from "@/hooks/useDppItemTraceContext";
import AccordionSection from "@/components/AccordionSection";

// PLACEHOLDER_DATA - Replace with API data when available
const PLACEHOLDER_DATA = {
  carbon_footprint: 12.5,
  water_usage: 95,
  energy_consumption: 18.2,
  carbon_offset_program: "This product is part of our carbon offset program. We invest in renewable energy and reforestation projects to offset emissions."
};

export default function EnvironmentalImpact() {
  const { isLoading } = useDppItemTraceContext();

  const envData = PLACEHOLDER_DATA;

  if (isLoading) {
    return (
      <AccordionSection icon={Leaf} title="Environmental Impact">
        <div className="text-gray-500 text-sm">Loading environmental impact...</div>
      </AccordionSection>
    );
  }

  return (
    <AccordionSection icon={Leaf} title="Environmental Impact">
      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-gray-50 p-3 text-center border border-gray-200">
            <div className="text-xs text-gray-500 mb-1">Carbon</div>
            <div className="text-lg font-bold text-primary">
              {envData.carbon_footprint}
            </div>
            <div className="text-xs text-gray-500">kg CO₂e</div>
          </div>
          <div className="bg-gray-50 p-3 text-center border border-gray-200">
            <div className="text-xs text-gray-500 mb-1">Water</div>
            <div className="text-lg font-bold text-primary">
              {envData.water_usage}
            </div>
            <div className="text-xs text-gray-500">liters</div>
          </div>
          <div className="bg-gray-50 p-3 text-center border border-gray-200">
            <div className="text-xs text-gray-500 mb-1">Energy</div>
            <div className="text-lg font-bold text-primary">
              {envData.energy_consumption}
            </div>
            <div className="text-xs text-gray-500">kWh</div>
          </div>
        </div>

        {envData.carbon_offset_program && (
          <div className="bg-gray-50 border border-gray-200 p-3">
            <h3 className="font-semibold text-sm text-primary mb-2">Carbon Offset Program</h3>
            <p className="text-sm text-gray-600">{envData.carbon_offset_program}</p>
          </div>
        )}

        <div className="bg-gray-50 p-3">
          <p className="text-xs text-gray-500 text-center">
            This represents the total environmental impact from raw materials through manufacturing.
            We're continuously working to reduce our footprint through sustainable practices.
          </p>
        </div>
      </div>
    </AccordionSection>
  );
}
