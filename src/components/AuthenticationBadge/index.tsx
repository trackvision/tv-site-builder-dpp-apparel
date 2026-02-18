import { BadgeCheck } from "lucide-react";

export default function AuthenticationBadge() {
  return (
    <div className="flex items-center justify-center gap-2 py-4">
      <BadgeCheck className="h-5 w-5 text-primary" />
      <span className="text-xs font-semibold uppercase tracking-[0.1em] text-primary">
        Authenticated
      </span>
    </div>
  );
}
