import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "@/lib/cn";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Card } from "@/components/ui/Card";

export interface HeroProps extends HTMLAttributes<HTMLElement> {
  /** Time-of-day greeting, e.g. "Good Evening". Swap in real time-of-day logic later. */
  greeting?: string;
}

// The screen's opening emotional beat: greeting, headline, and a short
// supporting line. The search block below is a visual placeholder only —
// no input/query logic until a later sprint. HeroIllustration is
// intentionally not rendered here (pending redesign); see HeroIllustration.tsx.
export const Hero = forwardRef<HTMLElement, HeroProps>(
  ({ greeting = "Good Evening", className, ...props }, ref) => (
    <Section
      ref={ref}
      spacing="lg"
      aria-labelledby="hero-heading"
      className={cn(className)}
      {...props}
    >
      <Container size="md">
        <p className="text-sm font-medium text-text-secondary">{greeting}</p>

        <h1
          id="hero-heading"
          className="mt-3 max-w-md font-display text-2xl font-bold leading-tight text-text-primary sm:text-3xl"
        >
          Every neighborhood has its regulars.
        </h1>

        <p className="mt-4 max-w-md text-md text-text-secondary">
          Meet the cats living around you, see who&apos;s been spotted
          lately, and add a sighting when you meet one yourself.
        </p>

        {/* Placeholder only — search functionality lands in a future sprint. */}
        <Card
          padding="md"
          className="mt-8 flex max-w-md items-center gap-2 border border-secondary-sage/20 text-text-secondary"
        >
          <span aria-hidden="true">🔍</span>
          <span className="text-sm">Search for cats or areas — coming soon</span>
        </Card>
      </Container>
    </Section>
  )
);

Hero.displayName = "Hero";
