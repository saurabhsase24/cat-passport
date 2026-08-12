import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** "none" lets photo-first content (e.g. a future TrendingCard) bleed edge-to-edge. */
  padding?: "none" | "md" | "lg";
  /** Defaults to "none"; "soft"/"raised" are for deliberately elevated content. */
  shadow?: "none" | "soft" | "raised";
}

const PADDING_CLASSES: Record<NonNullable<CardProps["padding"]>, string> = {
  none: "",
  md: "p-4",
  lg: "p-6",
};

const SHADOW_CLASSES: Record<NonNullable<CardProps["shadow"]>, string> = {
  none: "",
  soft: "shadow-soft",
  raised: "shadow-raised",
};

// Sits on bg-surface, which in V2 is a *darker*, warmer tint than the page's
// bg-cream — cards recess into the ground rather than lifting off it. The
// tint and the border-soft hairline work as a single separation treatment:
// each is subtle alone, and together they replace the drop shadow V1 leaned
// on. Shadow is therefore off by default and reserved for content meant to
// read as genuinely floating (design system §7).
export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ padding = "md", shadow = "none", className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "rounded-md border border-border-soft bg-bg-surface",
        SHADOW_CLASSES[shadow],
        PADDING_CLASSES[padding],
        className
      )}
      {...props}
    />
  )
);

Card.displayName = "Card";
