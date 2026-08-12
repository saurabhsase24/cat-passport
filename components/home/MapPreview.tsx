import { forwardRef, type HTMLAttributes } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { buttonClassName } from "@/components/ui/Button";

export type MapPreviewProps = HTMLAttributes<HTMLElement>;

// Corner for the floating "Spot a Cat" action — kept as one named constant
// since future real map controls (e.g. a "recenter" button) may want this
// same corner, and it should stay a one-line change.
const FLOATING_ACTION_POSITION_CLASSES = "bottom-4 right-4";

// Static stand-in for the real Mapbox view — no map integration yet. Sized
// to be the dominant element of the first mobile viewport (see Design
// System notes in the homepage revision plan for the height rationale).
//
// Carries the surface treatment directly rather than wrapping a Card: the
// design system separates standard cards (16px) from map and major visual
// panels (20px), and cn() is a plain concatenation helper, so layering a
// second radius utility over Card's own would leave the winner to
// stylesheet order rather than intent.
export const MapPreview = forwardRef<HTMLElement, MapPreviewProps>(
  ({ className, ...props }, ref) => (
    <Section
      ref={ref}
      spacing="sm"
      aria-labelledby="map-preview-heading"
      className={cn(className)}
      {...props}
    >
      <Container size="md">
        <div className="flex items-baseline justify-between gap-3">
          <h2
            id="map-preview-heading"
            className="font-display text-xl font-bold text-text-primary"
          >
            Neighborhood map
          </h2>
          {/* Underlined by default rather than on hover only: hover states
              don't exist on touch, which is this product's primary input. */}
          <Link
            href="/explore"
            className="rounded-sm text-sm font-semibold text-text-primary underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-text-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-cream"
          >
            View full map
          </Link>
        </div>

        {/* relative wrapper: the floating action below is a sibling of the
            role="img" panel, not a child of it — nesting an interactive
            control inside role="img" would make it unreachable to some
            assistive tech, since role="img" flattens its content. */}
        <div className="relative mt-4">
          <div
            role="img"
            aria-label="Map placeholder — nearby cat sightings will appear here"
            className="flex h-[60dvh] min-h-[20rem] max-h-[30rem] flex-col items-center justify-center gap-2 rounded-lg border border-border-soft bg-bg-surface p-6 sm:h-[26rem] sm:max-h-[26rem]"
          >
            <span aria-hidden="true" className="text-2xl">📍</span>
            <span className="text-sm text-text-secondary">
              A map of nearby sightings will live here soon
            </span>
          </div>

          <Link
            href="/spot"
            className={buttonClassName({
              variant: "primary",
              className: cn("absolute gap-2 shadow-raised", FLOATING_ACTION_POSITION_CLASSES),
            })}
          >
            <span aria-hidden="true">🐾</span>
            <span>Spot a Cat</span>
          </Link>
        </div>
      </Container>
    </Section>
  )
);

MapPreview.displayName = "MapPreview";
