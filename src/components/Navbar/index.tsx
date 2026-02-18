import { useLanguage } from "@/hooks/useLanguage";
import { Globe } from "lucide-react";
import { useDppItemTraceContext } from "@/hooks/useDppItemTraceContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Navbar() {
  const { currentLanguage, availableLanguages, setLanguage } = useLanguage();
  const { brand } = useDppItemTraceContext();

  const currentLanguageAbbr = availableLanguages.find(
    lang => lang.code === currentLanguage
  )?.abbreviation || currentLanguage;

  const brandName = brand?.brand_name || "Your Brand";

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-primary text-white">
      <div className="text-sm font-semibold uppercase tracking-[0.15em]">
        {brandName}
      </div>

      <div className="flex items-center">
        <Select value={currentLanguage} onValueChange={setLanguage}>
          <SelectTrigger className="w-auto gap-2 border-none shadow-none focus:ring-0 h-10 text-white bg-transparent [&>svg]:text-white">
            <Globe className="h-4 w-4 text-white" />
            <SelectValue placeholder={currentLanguageAbbr} />
          </SelectTrigger>
          <SelectContent>
            {availableLanguages.map((lang) => (
              <SelectItem key={lang.code} value={lang.code}>
                {lang.abbreviation}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </nav>
  );
}
