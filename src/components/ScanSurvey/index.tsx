import { useState } from "react";

export default function ScanSurvey() {
  const [selected, setSelected] = useState<string | null>(null);

  const handleSelect = (option: string) => {
    setSelected(option);
    try {
      localStorage.setItem("scan_survey_response", option);
    } catch {
      // localStorage unavailable
    }
  };

  return (
    <div className="px-6 py-8 text-center">
      <h2 className="text-base font-semibold uppercase tracking-[0.1em] text-primary mb-2">
        We Value Your Opinion
      </h2>
      <p className="text-sm text-gray-600 mb-6">
        Where are you scanning from today?
      </p>
      <div className="flex gap-4 justify-center">
        <button
          onClick={() => handleSelect("in-store")}
          className={`flex items-center gap-2 px-6 py-3 border text-sm font-semibold uppercase tracking-[0.08em] transition-colors ${
            selected === "in-store"
              ? "bg-primary text-white border-primary"
              : "border-gray-400 text-primary hover:border-primary"
          }`}
        >
          <img src="/images/survey-location.svg" alt="" className="h-5 w-5" />
          In Store
        </button>
        <button
          onClick={() => handleSelect("at-home")}
          className={`flex items-center gap-2 px-6 py-3 border text-sm font-semibold uppercase tracking-[0.08em] transition-colors ${
            selected === "at-home"
              ? "bg-primary text-white border-primary"
              : "border-gray-400 text-primary hover:border-primary"
          }`}
        >
          <img src="/images/survey-home.svg" alt="" className="h-5 w-5" />
          At Home
        </button>
      </div>
      <p className="text-xs text-gray-400 mt-4">
        Your response helps us improve our service. No personal data is collected.
      </p>
    </div>
  );
}
