import { useDppItemTraceContext } from "@/hooks/useDppItemTraceContext";

export default function CTAButton() {
  const { brand } = useDppItemTraceContext();
  const brandName = brand?.brand_name || "Our Brand";

  return (
    <div className="px-6 py-4">
      <a
        href="#"
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full bg-primary text-white text-center py-3 text-sm font-semibold uppercase tracking-[0.08em] hover:bg-[#153456] transition-colors"
      >
        Explore {brandName}
      </a>
    </div>
  );
}
