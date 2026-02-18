import { useDppItemTraceContext } from "@/hooks/useDppItemTraceContext";

export default function ProductDetailsBanner() {
  const { product, commissionLocation, commissionTime, serialNumber } = useDppItemTraceContext();

  const formatDate = (dateString: any): string | null => {
    if (!dateString) return null;
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      }).toUpperCase();
    } catch {
      return null;
    }
  };

  const details = [
    { label: "Unique Serial", value: serialNumber },
    { label: "Manufacture Date", value: formatDate(commissionTime) },
    { label: "Color", value: product?.color },
    { label: "Material Number", value: product?.custom_id },
    { label: "Supplier Number", value: commissionLocation?.gln },
  ].filter((d) => d.value);

  if (details.length === 0) return null;

  return (
    <div className="bg-primary text-white px-6 py-5">
      <div className="space-y-3">
        {details.map((detail) => (
          <div key={detail.label} className="flex justify-between items-center">
            <span className="text-xs uppercase tracking-[0.1em] text-white/70">
              {detail.label}
            </span>
            <span className="text-sm font-semibold">{detail.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
