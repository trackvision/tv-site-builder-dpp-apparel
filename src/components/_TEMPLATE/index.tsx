/**
 * Component Template
 *
 * Copy this file when creating a new DPP section component.
 * Rename the component and update the content as needed.
 *
 * Usage:
 *   1. Copy this directory to src/components/YourComponentName/
 *   2. Rename the component function and update imports
 *   3. Add to src/pages/DppLanding.tsx
 */

/* eslint-disable @typescript-eslint/no-unused-vars */
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useDppItemTraceContext } from "@/hooks/useDppItemTraceContext";
import { FileText } from "lucide-react"; // Change icon as needed

// PLACEHOLDER_DATA - Replace with API data when available
const PLACEHOLDER_DATA = {
  title: "Section Title",
  description: "Section description goes here",
};

interface TemplateComponentProps {
  onBack?: () => void;
}

export default function TemplateComponent({ onBack: _onBack }: TemplateComponentProps) {
  const { product: _product, isLoading, error } = useDppItemTraceContext();

  // TODO: Get real data from API - for now using placeholder
  const data = PLACEHOLDER_DATA;

  if (isLoading) {
    return (
      <Card className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <CardHeader className="text-center pb-4">
          <div className="text-gray-500">Loading...</div>
        </CardHeader>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <CardHeader className="text-center pb-4">
          <div className="text-red-500">Error loading data</div>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <CardHeader className="text-center pb-4">
        <div className="flex justify-center mb-4">
          <FileText className="h-12 w-12 text-blue-600" />
        </div>
        <div className="text-sm font-medium text-gray-600 tracking-wide mb-2">
          SECTION LABEL
        </div>
        <h2 className="text-xl font-bold text-gray-900">{data.title}</h2>
      </CardHeader>

      <CardContent className="pt-0 space-y-4">
        <p className="text-sm text-gray-600">{data.description}</p>

        {/* Add your content here */}
      </CardContent>
    </Card>
  );
}
