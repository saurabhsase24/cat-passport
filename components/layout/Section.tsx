import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  /** Vertical rhythm between stacked sections (e.g. Hero, Trending, Nearby) on a screen. */
  spacing?: "sm" | "md" | "lg";
}

const SPACING_CLASSES: Record<NonNullable<SectionProps["spacing"]>, string> = {
  sm: "py-4",
  md: "py-6",
  lg: "py-10",
};

// A semantic <section> landmark for a distinct block of a screen (Hero,
// Trending Cats, Nearby Cats, ...). Pass aria-label or aria-labelledby when
// the section has no visible heading of its own so it remains identifiable
// to assistive tech.
export const Section = forwardRef<HTMLElement, SectionProps>(
  ({ spacing = "md", className, ...props }, ref) => (
    <section
      ref={ref}
      className={cn(SPACING_CLASSES[spacing], className)}
      {...props}
    />
  )
);

Section.displayName = "Section";
