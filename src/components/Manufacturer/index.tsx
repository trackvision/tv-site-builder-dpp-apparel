import { useState, useEffect } from "react";
import { Factory, MapPin, Phone, Mail, ChevronDown, ChevronRight } from "lucide-react";
import { useDppItemTraceContext } from "@/hooks/useDppItemTraceContext";
import AccordionSection from "@/components/AccordionSection";
import api from "@/api";

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

// PLACEHOLDER_FALLBACK - Used when commissionLocation API data unavailable
const PLACEHOLDER_DATA = {
  location_name: "TrackVision Manufacturing Facility",
  gln: "9361758000003",
  address: "123 Industrial Boulevard",
  city: "Melbourne",
  state: "Victoria",
  postal_code: "3000",
  country_code: "AU",
  primary_contact_telephone: "+61 3 9123 4567",
  primary_contact_email: "manufacturing@trackvision.au",
  primary_image: null,
  latitude: "-37.8136",
  longitude: "144.9631",
  quality_checks: ["Visual Inspection", "Stitch Quality", "Material Testing", "Color Fastness"],
  production_notes: "Manufactured in Fair Trade Certified factory with sustainable practices."
};

export default function Manufacturer() {
  const { isLoading, commissionLocation } = useDppItemTraceContext();
  const [manufacturerImage, setManufacturerImage] = useState<string | null>(null);
  const [imageLoading, setImageLoading] = useState(false);
  const [expandedStatements, setExpandedStatements] = useState<Record<number, boolean>>({});

  const manufacturer = {
    ...PLACEHOLDER_DATA,
    ...(commissionLocation || {})
  };

  const toggleStatement = (index: number) => {
    setExpandedStatements((prev) => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  useEffect(() => {
    const fetchManufacturerImage = async () => {
      if (manufacturer?.primary_image) {
        setImageLoading(true);
        try {
          const base64Image = await api.getBase64(`/assets/${manufacturer.primary_image}`);
          setManufacturerImage(base64Image);
        } catch (err) {
          console.error("Failed to load manufacturer image:", err);
          setManufacturerImage(null);
        } finally {
          setImageLoading(false);
        }
      }
    };

    fetchManufacturerImage();
  }, [manufacturer?.primary_image]);

  if (isLoading) {
    return (
      <AccordionSection icon={Factory} title="ORIGIN">
        <div className="text-gray-500 text-sm">Loading origin details...</div>
      </AccordionSection>
    );
  }

  const fullAddress = [
    manufacturer.address,
    manufacturer.city,
    manufacturer.state,
    manufacturer.postal_code,
    manufacturer.country_code ? COUNTRY_NAMES[manufacturer.country_code] || manufacturer.country_code : null
  ].filter(Boolean).join(", ");

  return (
    <AccordionSection icon={Factory} title="ORIGIN">
      <div className="space-y-4">
        {manufacturer.country_code && (
          <div className="text-sm mb-3">
            Made in <span className="font-bold text-primary">{COUNTRY_NAMES[manufacturer.country_code] || manufacturer.country_code}</span>
          </div>
        )}

        {(manufacturerImage || imageLoading) && (
          <div className="flex justify-center">
            {manufacturerImage ? (
              <img
                src={manufacturerImage}
                alt={manufacturer.location_name || "Manufacturer"}
                className="h-32 w-32 object-cover"
              />
            ) : (
              <div className="h-32 w-32 bg-gray-100 flex items-center justify-center">
                <span className="text-sm text-gray-500">Loading...</span>
              </div>
            )}
          </div>
        )}

        <div className="text-xs text-gray-600">
          Made at: <span className="text-xs font-semibold text-gray-600">{manufacturer.location_name || "Unknown Location"}</span>
        </div>

        {((manufacturer as any)?.latitude && (manufacturer as any)?.longitude) && (
          <div className="overflow-hidden border border-gray-200 rounded">
            <img
              alt="Manufacturer Location Map"
              className="w-full block"
              src={`https://api.mapbox.com/styles/v1/mapbox/streets-v12/static/pin-s+3b82f6(${
                (manufacturer as any).longitude
              },${
                (manufacturer as any).latitude
              })/${
                (manufacturer as any).longitude
              },${
                (manufacturer as any).latitude
              },14,0,0/350x200@2x?access_token=${
                import.meta.env.VITE_MAPBOX_ACCESS_TOKEN
              }&logo=false&attribution=false`}
            />
          </div>
        )}

        <div className="bg-gray-50 border border-gray-200 p-3">
          <div className="text-xs text-gray-500 mb-1">Global Location Number (GLN)</div>
          <div className="text-sm font-mono font-semibold text-primary">{manufacturer.gln}</div>
        </div>

        {fullAddress && (
          <div className="flex items-start gap-3">
            <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <div className="text-xs text-gray-500 mb-1">Address</div>
              <div className="text-sm text-primary">{fullAddress}</div>
            </div>
          </div>
        )}

        <div className="space-y-3">
          {manufacturer.primary_contact_telephone && (
            <div className="flex items-center gap-3">
              <Phone className="h-5 w-5 text-primary flex-shrink-0" />
              <div>
                <div className="text-xs text-gray-500">Phone</div>
                <a
                  href={`tel:${manufacturer.primary_contact_telephone}`}
                  className="text-sm text-primary underline"
                >
                  {manufacturer.primary_contact_telephone}
                </a>
              </div>
            </div>
          )}

          {manufacturer.primary_contact_email && (
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-primary flex-shrink-0" />
              <div>
                <div className="text-xs text-gray-500">Email</div>
                <a
                  href={`mailto:${manufacturer.primary_contact_email}`}
                  className="text-sm text-primary underline"
                >
                  {manufacturer.primary_contact_email}
                </a>
              </div>
            </div>
          )}
        </div>

        {(manufacturer as any)?.quality_checks && (manufacturer as any).quality_checks.length > 0 && (
          <div>
            <h3 className="font-semibold text-sm text-primary mb-2">Quality Control</h3>
            <ul className="space-y-2">
              {(manufacturer as any).quality_checks.map((check: string, index: number) => (
                <li key={index} className="flex items-center gap-2 text-sm text-gray-700">
                  <div className="w-2 h-2 bg-primary flex-shrink-0"></div>
                  {check}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div>
          <h3 className="font-semibold text-sm text-primary mb-2">Factory Certifications</h3>
          {(manufacturer as any)?.certifications && (manufacturer as any).certifications.length > 0 ? (
            <div className="space-y-3">
              {(manufacturer as any).certifications.map((cert: any, index: number) => {
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
            <div className="text-sm text-gray-600">None</div>
          )}
        </div>
      </div>
    </AccordionSection>
  );
}
