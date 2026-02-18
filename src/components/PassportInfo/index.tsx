import { FileText } from "lucide-react";
import { useDppItemTraceContext } from "@/hooks/useDppItemTraceContext";
import AccordionSection from "@/components/AccordionSection";

// PLACEHOLDER_DATA - Replace with API data when available
const PLACEHOLDER_DATA = {
  passport_id: "DPP-PAT-2024-891234",
  issue_date: "2024-09-15",
  issuer: "TrackVision AI Ltd",
  version: "1.0",
  product_category: "Apparel - Outdoor Jacket",
  regulatory_info: "This Digital Product Passport complies with EU Regulation 2023/1542 on Ecodesign for Sustainable Products."
};

export default function PassportInfo() {
  const { isLoading, gtin, serialNumber, commissionTime } = useDppItemTraceContext();

  const passport = PLACEHOLDER_DATA;

  if (isLoading) {
    return (
      <AccordionSection icon={FileText} title="DPP DETAILS">
        <div className="text-gray-500 text-sm">Loading DPP details...</div>
      </AccordionSection>
    );
  }

  return (
    <AccordionSection icon={FileText} title="DPP DETAILS">
      <div className="space-y-4">
        <div className="bg-gray-50 border border-gray-200 p-3">
          <div className="text-xs text-gray-500 mb-1">Passport ID</div>
          <div className="text-sm font-mono font-semibold text-primary">{passport.passport_id.replace('-PAT-', '-')}</div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {gtin && (
            <div className="bg-gray-50 p-3">
              <div className="text-xs text-gray-500 mb-1">GTIN</div>
              <div className="text-xs font-mono text-primary">{gtin}</div>
            </div>
          )}
          {serialNumber && (
            <div className="bg-gray-50 p-3">
              <div className="text-xs text-gray-500 mb-1">Serial Number</div>
              <div className="text-xs font-mono text-primary">{serialNumber}</div>
            </div>
          )}
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center py-2 border-b border-gray-200">
            <span className="text-sm text-gray-500">Issue Date</span>
            <span className="text-sm font-semibold text-primary">
              {commissionTime ? new Date(commissionTime).toLocaleDateString('en-GB', {
                day: '2-digit',
                month: 'short',
                year: 'numeric'
              }).toUpperCase() : new Date(passport.issue_date).toLocaleDateString('en-GB', {
                day: '2-digit',
                month: 'short',
                year: 'numeric'
              }).toUpperCase()}
            </span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-gray-200">
            <span className="text-sm text-gray-500">Issuer</span>
            <span className="text-sm font-semibold text-primary">{passport.issuer}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-gray-200">
            <span className="text-sm text-gray-500">Version</span>
            <span className="text-sm font-semibold text-primary">{passport.version}</span>
          </div>
        </div>

        {passport.regulatory_info && (
          <div className="bg-gray-50 p-3">
            <h3 className="font-semibold text-xs text-primary mb-2 uppercase tracking-[0.05em]">Regulatory Compliance</h3>
            <p className="text-xs text-gray-600">{passport.regulatory_info}</p>
          </div>
        )}
      </div>
    </AccordionSection>
  );
}
