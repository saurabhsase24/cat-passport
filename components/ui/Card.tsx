import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** "none" lets photo-first content (e.g. a future TrendingCard) bleed edge-to-edge. */
  padding?: "none" | "md" | "lg";
  /** "raised" gives content-heavy cards (e.g. cat sightings) slightly more lift. */
  shadow?: "soft" | "raised";
}

const PADDING_CLASSES: Record<NonNullable<CardProps["padding"]>, string> = {
  none: "",
  md: "p-4",
  lg: "p-6",
};

const SHADOW_CLASSES: Record<NonNullable<CardProps["shadow"]>, string> = {
  soft: "shadow-soft",
  raised: "shadow-raised",
};

// Sits on bg-surface, a tint brighter than the page's bg-cream, so cards read
// as lifted content rather than blending into one flat beige rectangle.
export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ padding = "md", shadow = "soft", className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "rounded-md bg-bg-surface",
        SHADOW_CLASSES[shadow],
        PADDING_CLASSES[padding],
        className
      )}
      {...props}
    />
  )
);

Card.displayName = "Card";
