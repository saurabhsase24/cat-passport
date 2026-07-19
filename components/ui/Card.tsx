import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** "none" lets photo-first content (e.g. a future TrendingCard) bleed edge-to-edge. */
  padding?: "none" | "md" | "lg";
}

const PADDING_CLASSES: Record<NonNullable<CardProps["padding"]>, string> = {
  none: "",
  md: "p-4",
  lg: "p-6",
};

// V1 has no separate "card surface" token — the card sits on the same cream
// background as the page and relies on shadow-soft alone for elevation,
// matching the design system's restrained, low-color-noise home palette.
export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ padding = "md", className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "rounded-md bg-bg-cream shadow-soft",
        PADDING_CLASSES[padding],
        className
      )}
      {...props}
    />
  )
);

Card.displayName = "Card";
