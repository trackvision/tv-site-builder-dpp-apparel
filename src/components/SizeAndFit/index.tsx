import { Ruler } from "lucide-react";
import { useDppItemTraceContext } from "@/hooks/useDppItemTraceContext";
import AccordionSection from "@/components/AccordionSection";

// PLACEHOLDER_DATA - Replace with API data when available
const PLACEHOLDER_DATA = {
  description: "Standard Fit Guide",
  available_sizes: ["XS", "S", "M", "L", "XL", "XXL"],
  reference_size: "M",
  measurements: [
    { measurement_name: "Chest Width", value: "21", unit: "in" },
    { measurement_name: "Body Length", value: "28", unit: "in" },
    { measurement_name: "Shoulder Width", value: "18", unit: "in" },
    { measurement_name: "Sleeve Length", value: "34", unit: "in" }
  ]
};

export default function SizeAndFit() {
  const { isLoading, product } = useDppItemTraceContext();

  const sizeAndFit = PLACEHOLDER_DATA;
  const productSize = product?.size;

  if (isLoading) {
    return (
      <AccordionSection icon={Ruler} title="Size & Fit">
        <div className="text-gray-500 text-sm">Loading size information...</div>
      </AccordionSection>
    );
  }

  return (
    <AccordionSection icon={Ruler} title="Size & Fit">
      <div className="space-y-4">
        <div className="text-sm font-semibold text-primary">
          {sizeAndFit.description}
        </div>
        {productSize && (
          <p className="text-sm text-gray-600">
            This item is size: <strong>{productSize}</strong>
          </p>
        )}

        {sizeAndFit.available_sizes && sizeAndFit.available_sizes.length > 0 && (
          <div>
            <h3 className="font-semibold text-sm text-primary mb-2 uppercase tracking-[0.05em]">Available Sizes</h3>
            <div className="flex flex-wrap gap-2">
              {sizeAndFit.available_sizes.map((size) => (
                <span
                  key={size}
                  className={`px-3 py-1 text-sm font-medium ${
                    size === productSize
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  {size}
                </span>
              ))}
            </div>
          </div>
        )}

        {sizeAndFit.reference_size && (
          <p className="text-sm text-gray-600">
            Measurements reference for size: <strong>{sizeAndFit.reference_size}</strong>
          </p>
        )}

        {sizeAndFit.measurements && sizeAndFit.measurements.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 px-3 text-xs font-semibold uppercase tracking-[0.05em] text-gray-500">
                    Measurement
                  </th>
                  <th className="text-right py-2 px-3 text-xs font-semibold uppercase tracking-[0.05em] text-gray-500">
                    Value
                  </th>
                </tr>
              </thead>
              <tbody>
                {sizeAndFit.measurements.map((measurement, index) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                  >
                    <td className="py-2 px-3 text-sm text-gray-700">
                      {measurement.measurement_name}
                    </td>
                    <td className="py-2 px-3 text-sm font-medium text-primary text-right">
                      {measurement.value} {measurement.unit}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AccordionSection>
  );
}
