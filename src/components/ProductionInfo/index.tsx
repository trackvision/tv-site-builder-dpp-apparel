import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Factory } from "lucide-react";
import { useDppItemTraceContext } from "@/hooks/useDppItemTraceContext";

// PLACEHOLDER_DATA - Replace with API data when available
const PLACEHOLDER_DATA = {
  manufacturing_location: "Hanoi, Vietnam",
  production_date: "2024-09-15",
  batch_number: "PAT-2024-Q3-891",
  quality_checks: ["Visual Inspection", "Stitch Quality", "Material Testing", "Color Fastness"],
  production_notes: "Manufactured in Fair Trade Certified factory with sustainable practices."
};

export default function ProductionInfo() {
  const { isLoading, lot } = useDppItemTraceContext();

  // TODO: Get real production data from API - for now using placeholder
  const production = PLACEHOLDER_DATA;

  // Try to get production date from lot if available
  const productionDate = lot?.production_date || production.production_date;
  const lotNumber = lot?.lot_number || production.batch_number;

  if (isLoading) {
    return (
      <Card className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <CardHeader className="text-center pb-4">
          <div className="text-gray-500">Loading production information...</div>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <CardHeader className="text-center pb-4">
        <div className="flex justify-center mb-4">
          <Factory className="h-12 w-12 text-gray-700" />
        </div>
        <div className="text-sm font-medium text-gray-600 tracking-wide mb-2">
          PRODUCTION INFO
        </div>
        <h2 className="text-xl font-bold text-gray-900">
          Manufacturing Details
        </h2>
      </CardHeader>

      <CardContent className="pt-0 space-y-4">
        {/* Production Details Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-gray-50 p-3 rounded-lg">
            <div className="text-xs text-gray-600 mb-1">Location</div>
            <div className="text-sm font-semibold text-gray-900">
              {production.manufacturing_location}
            </div>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg">
            <div className="text-xs text-gray-600 mb-1">Production Date</div>
            <div className="text-sm font-semibold text-gray-900">
              {new Date(productionDate).toLocaleDateString()}
            </div>
          </div>
        </div>

        {/* Batch Number */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <div className="text-xs text-gray-600 mb-1">Batch Number</div>
          <div className="text-sm font-mono font-semibold text-gray-900">{lotNumber}</div>
        </div>

        {/* Quality Checks */}
        {production.quality_checks && production.quality_checks.length > 0 && (
          <div>
            <h3 className="font-semibold text-sm text-gray-700 mb-2">Quality Control</h3>
            <ul className="space-y-2">
              {production.quality_checks.map((check, index) => (
                <li key={index} className="flex items-center gap-2 text-sm text-gray-700">
                  <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                  {check}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Production Notes */}
        {production.production_notes && (
          <div className="bg-gray-50 rounded-lg p-3">
            <p className="text-sm text-gray-600">{production.production_notes}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
