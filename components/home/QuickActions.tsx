import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "@/lib/cn";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";

export type QuickActionsProps = HTMLAttributes<HTMLElement>;

// The two things a visitor most likely wants to do from Home. Presentation
// only for now — no routing/click logic until the target screens exist.
export const QuickActions = forwardRef<HTMLElement, QuickActionsProps>(
  ({ className, ...props }, ref) => (
    <Section
      ref={ref}
      spacing="md"
      aria-label="Quick actions"
      className={cn(className)}
      {...props}
    >
      <Container size="md">
        <div className="flex justify-center gap-3">
          <Button variant="primary" className="gap-2">
            <span aria-hidden="true">🐾</span>
            <span>Spot a cat</span>
          </Button>
          <Button variant="secondary" className="gap-2">
            <span aria-hidden="true">🧭</span>
            <span>Explore nearby</span>
          </Button>
        </div>
      </Container>
    </Section>
  )
);

QuickActions.displayName = "QuickActions";
