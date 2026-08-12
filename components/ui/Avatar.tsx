import { cn } from "@/lib/cn";

export interface AvatarProps {
  src?: string;
  /** Drives both the accessible label and the initials fallback. */
  name: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const BOX_SIZE_CLASSES: Record<NonNullable<AvatarProps["size"]>, string> = {
  sm: "h-8 w-8",
  md: "h-10 w-10",
  lg: "h-14 w-14",
};

const INITIALS_TEXT_CLASSES: Record<NonNullable<AvatarProps["size"]>, string> = {
  sm: "text-xs",
  md: "text-sm",
  lg: "text-md",
};

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  const initials = parts.slice(0, 2).map((part) => part[0]?.toUpperCase() ?? "");
  return initials.join("") || "?";
}

// Plain <img> rather than next/image: no remote image domains are configured
// yet (no Supabase/photo source exists in Sprint 1), and next/image throws
// at runtime for unconfigured external hosts. Revisit once real photo URLs
// are wired up.
//
// Both forms carry the border-soft hairline so a pale cat photo or a sage
// initials disc still reads as a distinct object against the cream page —
// the same surface-plus-border treatment Card uses (design system §5).
export function Avatar({ src, name, size = "md", className }: AvatarProps) {
  if (src) {
    return (
      <img
        src={src}
        alt={name}
        loading="lazy"
        decoding="async"
        className={cn(
          "rounded-full border border-border-soft object-cover",
          BOX_SIZE_CLASSES[size],
          className
        )}
      />
    );
  }

  return (
    <div
      role="img"
      aria-label={name}
      className={cn(
        // The initials sit on a filled sage disc, so they take text-on-primary
        // — the ink V2 reserves for filled accent surfaces (design system §3).
        "flex items-center justify-center rounded-full border border-border-soft bg-secondary-sage font-semibold text-text-on-primary",
        BOX_SIZE_CLASSES[size],
        INITIALS_TEXT_CLASSES[size],
        className
      )}
    >
      <span aria-hidden="true">{getInitials(name)}</span>
    </div>
  );
}
