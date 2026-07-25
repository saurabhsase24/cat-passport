import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "@/lib/cn";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Card } from "@/components/ui/Card";

export type MapPreviewProps = HTMLAttributes<HTMLElement>;

// Static stand-in for the real Mapbox view — no map integration yet.
export const MapPreview = forwardRef<HTMLElement, MapPreviewProps>(
  ({ className, ...props }, ref) => (
    <Section
      ref={ref}
      spacing="lg"
      aria-labelledby="map-preview-heading"
      className={cn(className)}
      {...props}
    >
      <Container size="md">
        <h2
          id="map-preview-heading"
          className="font-display text-xl font-bold text-text-primary"
        >
          Neighborhood map
        </h2>
        <p className="mt-1 text-sm text-text-secondary">
          Nearby sightings will appear here once the map is connected.
        </p>

        <Card
          padding="lg"
          role="img"
          aria-label="Map placeholder — nearby cat sightings will appear here"
          className="mt-5 flex h-40 flex-col items-center justify-center gap-2 border border-dashed border-secondary-sage/25"
        >
          <span aria-hidden="true" className="text-2xl">📍</span>
          <span className="text-sm text-text-secondary">
            A map of nearby sightings will live here soon
          </span>
        </Card>
      </Container>
    </Section>
  )
);

MapPreview.displayName = "MapPreview";
