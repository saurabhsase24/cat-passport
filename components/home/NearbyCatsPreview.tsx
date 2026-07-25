import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "@/lib/cn";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Card } from "@/components/ui/Card";
import { Avatar } from "@/components/ui/Avatar";

export type NearbyCatsPreviewProps = HTMLAttributes<HTMLElement>;

interface PlaceholderCat {
  name: string;
  area: string;
  lastSeen: string;
}

// Static placeholders — swapped for real sightings once data fetching lands.
const PLACEHOLDER_CATS: PlaceholderCat[] = [
  { name: "Marmalade", area: "Elm Street Park", lastSeen: "Seen 2 hours ago" },
  { name: "Smokey", area: "Riverside Lane", lastSeen: "Seen this morning" },
  { name: "Patches", area: "Old Mill Court", lastSeen: "Seen yesterday" },
];

export const NearbyCatsPreview = forwardRef<HTMLElement, NearbyCatsPreviewProps>(
  ({ className, ...props }, ref) => (
    <Section
      ref={ref}
      spacing="lg"
      aria-labelledby="nearby-cats-heading"
      className={cn(className)}
      {...props}
    >
      <Container size="md">
        <h2
          id="nearby-cats-heading"
          className="font-display text-xl font-bold text-text-primary"
        >
          Spotted nearby today
        </h2>

        <ul className="mt-5 flex flex-col gap-4">
          {PLACEHOLDER_CATS.map((cat) => (
            <li key={cat.name}>
              <Card padding="md" shadow="raised" className="flex items-center gap-3">
                <Avatar name={cat.name} size="lg" />
                <div>
                  <p className="text-lg font-semibold text-text-primary">{cat.name}</p>
                  <p className="text-sm text-text-secondary">
                    {cat.area} · {cat.lastSeen}
                  </p>
                </div>
              </Card>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  )
);

NearbyCatsPreview.displayName = "NearbyCatsPreview";
