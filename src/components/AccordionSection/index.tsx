import { useState, type ReactNode } from "react";
import { ChevronDown, type LucideIcon } from "lucide-react";

interface AccordionSectionProps {
  icon: LucideIcon;
  title: string;
  defaultOpen?: boolean;
  children: ReactNode;
}

export default function AccordionSection({
  icon: Icon,
  title,
  defaultOpen = false,
  children,
}: AccordionSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-4 px-6 text-left"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-3">
          <Icon className="h-5 w-5 text-primary flex-shrink-0" />
          <span className="text-xs font-semibold uppercase tracking-[0.15em] text-primary">
            {title}
          </span>
        </div>
        <ChevronDown
          className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      {isOpen && <div className="px-6 pb-6">{children}</div>}
    </div>
  );
}
