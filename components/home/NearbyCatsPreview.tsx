import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "@/lib/cn";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Avatar } from "@/components/ui/Avatar";

export type NearbyCatsPreviewProps = HTMLAttributes<HTMLElement>;

interface PlaceholderCat {
  name: string;
  area: string;
  lastSeen: string;
}

// Static placeholders — swapped for real sightings once data fetching lands.
// Areas are deliberately broad UAE locales rather than specific streets: a
// precise-looking fake address reads as real data, and territory precision is
// a genuine privacy question for community cats. The relative times are fixed
// strings, not computed, for the same reason.
const PLACEHOLDER_CATS: PlaceholderCat[] = [
  { name: "Marmalade", area: "Dubai Marina", lastSeen: "Seen 2 hours ago" },
  { name: "Smokey", area: "Jumeirah Lake Towers", lastSeen: "Seen this morning" },
  { name: "Patches", area: "Al Barsha", lastSeen: "Seen yesterday" },
];

// A quiet divided feed rather than a stack of raised cards. This section sits
// below the map in the homepage's hierarchy, so it rewards a scroll instead of
// competing with the map for the eye — light rules and the page ground do the
// separating (design system §8.3).
//
// Kept lightweight on purpose: whether Recent Sightings belongs on Home at all
// gets reassessed once the real map and live sightings are connected.
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
          Recent Sightings
        </h2>

        <ul className="mt-4 divide-y divide-border-soft border-y border-border-soft">
          {PLACEHOLDER_CATS.map((cat) => (
            <li key={cat.name} className="flex items-center gap-3 py-3">
              <Avatar name={cat.name} size="md" />
              <div>
                <p className="text-md font-semibold text-text-primary">{cat.name}</p>
                <p className="text-sm text-text-secondary">
                  {cat.area} · {cat.lastSeen}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  )
);

NearbyCatsPreview.displayName = "NearbyCatsPreview";
