import { useState } from "react";
import { ShieldCheck, ChevronDown, ChevronRight } from "lucide-react";
import { useDppItemTraceContext } from "@/hooks/useDppItemTraceContext";
import AccordionSection from "@/components/AccordionSection";

export default function Compliance() {
  const { isLoading, product } = useDppItemTraceContext();
  const [expandedStatements, setExpandedStatements] = useState<Record<number, boolean>>({});

  const certifications = product?.certifications;
  const hasCertifications = certifications && certifications.length > 0;

  const toggleStatement = (index: number) => {
    setExpandedStatements((prev) => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  if (isLoading) {
    return (
      <AccordionSection icon={ShieldCheck} title="PRODUCT CERTIFICATIONS">
        <div className="text-gray-500 text-sm">Loading certification information...</div>
      </AccordionSection>
    );
  }

  return (
    <AccordionSection icon={ShieldCheck} title="PRODUCT CERTIFICATIONS">
      <div className="space-y-6">
        {hasCertifications ? (
          <div className="space-y-3">
              {certifications.map((cert: any, index: number) => {
                const certData = cert.certification_id;
                if (!certData) return null;

                const isExpanded = expandedStatements[index];

                return (
                  <div key={index} className="bg-gray-50 border border-gray-200 p-3">
                    <div className="space-y-2">
                      <div>
                        <div className="font-semibold text-sm text-primary">{certData.certification_standard}</div>
                        <div className="text-xs text-gray-500 mt-1">Certified by: {certData.certification_agency}</div>
                      </div>
                      <div className="text-xs text-gray-600 space-y-1">
                        {certData.certification_identification && (
                          <div><strong>ID:</strong> {certData.certification_identification}</div>
                        )}
                        {certData.certification_type && (
                          <div><strong>Type:</strong> {certData.certification_type}</div>
                        )}
                        {certData.certification_end_date && (
                          <div><strong>Valid Until:</strong> {new Date(certData.certification_end_date).toLocaleDateString('en-GB', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric'
                          }).toUpperCase()}</div>
                        )}
                      </div>
                      {certData.certification_statement && (
                        <div className="mt-2">
                          <button
                            onClick={() => toggleStatement(index)}
                            className="flex items-center gap-2 text-xs text-gray-600 hover:text-primary transition-colors"
                          >
                            {isExpanded ? (
                              <ChevronDown size={14} />
                            ) : (
                              <ChevronRight size={14} />
                            )}
                            <span>Certification Statement</span>
                          </button>
                          {isExpanded && (
                            <div className="text-xs text-gray-600 mt-2 p-2 bg-white border border-gray-100">
                              <p className="whitespace-pre-line">{certData.certification_statement}</p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
          </div>
        ) : (
          <div className="text-center text-gray-500 py-4 text-sm">
            No certifications available
          </div>
        )}
      </div>
    </AccordionSection>
  );
}
