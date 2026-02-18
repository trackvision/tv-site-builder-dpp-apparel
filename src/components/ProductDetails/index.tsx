import { Shirt } from "lucide-react";
import { useDppItemTraceContext } from "@/hooks/useDppItemTraceContext";
import AccordionSection from "@/components/AccordionSection";

export default function ProductDetails() {
  const { isLoading, product } = useDppItemTraceContext();

  if (isLoading) {
    return (
      <AccordionSection icon={Shirt} title="PRODUCT DETAILS">
        <div className="text-gray-500 text-sm">Loading product details...</div>
      </AccordionSection>
    );
  }

  const translations = product?.translations;
  const firstTranslation = translations && translations.length > 0 ? translations[0] : null;
  const productDescription = firstTranslation?.product_description;
  const careInstructions = firstTranslation?.care_instructions;
  const materialComposition = firstTranslation?.ingredient_statement;

  // If no data is available, don't render the section
  if (!productDescription && !careInstructions && !materialComposition) {
    return null;
  }

  return (
    <AccordionSection icon={Shirt} title="PRODUCT DETAILS">
      <div className="space-y-4">
        {productDescription && (
          <div>
            <h3 className="font-semibold text-sm text-primary mb-2 uppercase tracking-[0.05em]">
              Product Description
            </h3>
            <p className="text-sm text-gray-600">{productDescription}</p>
          </div>
        )}

        {careInstructions && (
          <div>
            <h3 className="font-semibold text-sm text-primary mb-2 uppercase tracking-[0.05em]">
              Care Instructions
            </h3>
            <p className="text-sm text-gray-600">{careInstructions}</p>
          </div>
        )}

        {materialComposition && (
          <div>
            <h3 className="font-semibold text-sm text-primary mb-2 uppercase tracking-[0.05em]">
              Material Composition
            </h3>
            <p className="text-sm text-gray-600">{materialComposition}</p>
          </div>
        )}
      </div>
    </AccordionSection>
  );
}
