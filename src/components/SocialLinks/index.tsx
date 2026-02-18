import { useDppItemTraceContext } from "@/hooks/useDppItemTraceContext";

const SOCIAL_LINKS = [
  { name: "Instagram", icon: "/images/Instagram.svg", href: "#" },
  { name: "Facebook", icon: "/images/Facebook.svg", href: "#" },
  { name: "YouTube", icon: "/images/Youtube.svg", href: "#" },
  { name: "X", icon: "/images/TwitterX.svg", href: "#" },
  { name: "Pinterest", icon: "/images/Pinterest.svg", href: "#" },
];

export default function SocialLinks() {
  const { brand } = useDppItemTraceContext();
  const brandName = brand?.brand_name || "Our Brand";

  return (
    <div className="px-6 py-8 text-center">
      <h2 className="text-xs font-semibold uppercase tracking-[0.1em] text-primary mb-6">
        Follow the World of {brandName}
      </h2>
      <div className="flex items-center justify-center gap-6">
        {SOCIAL_LINKS.map((link) => (
          <a
            key={link.name}
            href={link.href}
            aria-label={link.name}
            className="opacity-70 hover:opacity-100 transition-opacity"
          >
            <img src={link.icon} alt={link.name} className="h-5 w-5" />
          </a>
        ))}
      </div>
    </div>
  );
}
