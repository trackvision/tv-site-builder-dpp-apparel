import { useDppItemTraceContext } from "@/hooks/useDppItemTraceContext";

const FOOTER_LINKS = {
  about: [
    { label: "About Us", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Use", href: "#" },
  ],
  account: [
    { label: "My Account", href: "#" },
    { label: "Check Order", href: "#" },
  ],
  service: [
    { label: "Help", href: "#" },
    { label: "Shipping", href: "#" },
    { label: "Returns", href: "#" },
  ],
};

export default function Footer() {
  const { brand } = useDppItemTraceContext();
  const brandName = brand?.brand_name || "TrackVision AI";

  return (
    <footer className="bg-primary text-white py-8 px-6 mt-8">
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.1em] mb-3">About</h3>
          <ul className="space-y-2">
            {FOOTER_LINKS.about.map((link) => (
              <li key={link.label}>
                <a href={link.href} className="text-xs text-white/70 hover:text-white transition-colors">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.1em] mb-3">Account</h3>
          <ul className="space-y-2">
            {FOOTER_LINKS.account.map((link) => (
              <li key={link.label}>
                <a href={link.href} className="text-xs text-white/70 hover:text-white transition-colors">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.1em] mb-3">Customer Service</h3>
          <ul className="space-y-2">
            {FOOTER_LINKS.service.map((link) => (
              <li key={link.label}>
                <a href={link.href} className="text-xs text-white/70 hover:text-white transition-colors">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/20 pt-4">
        <p className="text-xs text-white/50 text-center">
          &copy; {new Date().getFullYear()} {brandName}
        </p>
      </div>
    </footer>
  );
}
