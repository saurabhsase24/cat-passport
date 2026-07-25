import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "@/lib/cn";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";

export interface HeroProps extends HTMLAttributes<HTMLElement> {
  /** Time-of-day greeting, e.g. "Good Evening". Swap in real time-of-day logic later. */
  greeting?: string;
}

// Kept intentionally brief — the map below is the first viewport's
// dominant element, so the intro's job is a quick "you're in the right
// place" beat, not a full pitch. HeroIllustration is intentionally not
// rendered here (pending redesign); see HeroIllustration.tsx.
export const Hero = forwardRef<HTMLElement, HeroProps>(
  ({ greeting = "Good Evening", className, ...props }, ref) => (
    <Section
      ref={ref}
      spacing="sm"
      aria-labelledby="hero-heading"
      className={cn(className)}
      {...props}
    >
      <Container size="md">
        <p className="text-sm font-medium text-text-secondary">{greeting}</p>

        <h1
          id="hero-heading"
          className="mt-1 max-w-md font-display text-xl font-bold leading-tight text-text-primary sm:text-2xl"
        >
          Every neighborhood has its regulars.
        </h1>

        <p className="mt-2 max-w-md text-sm text-text-secondary">
          Meet the cats living around you and see who&apos;s been spotted lately.
        </p>
      </Container>
    </Section>
  )
);

Hero.displayName = "Hero";
