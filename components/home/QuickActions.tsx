import { forwardRef, type HTMLAttributes } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { buttonClassName } from "@/components/ui/Button";

export type QuickActionsProps = HTMLAttributes<HTMLElement>;

// The two things a visitor most likely wants to do from Home. Styled to
// match Button exactly via buttonClassName, but rendered as real links —
// a <button> can't be nested inside the <a> a Link renders.
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
          <Link href="/spot" className={buttonClassName({ variant: "primary", className: "gap-2" })}>
            <span aria-hidden="true">🐾</span>
            <span>Spot a cat</span>
          </Link>
          <Link href="/explore" className={buttonClassName({ variant: "secondary", className: "gap-2" })}>
            <span aria-hidden="true">🧭</span>
            <span>Explore nearby</span>
          </Link>
        </div>
      </Container>
    </Section>
  )
);

QuickActions.displayName = "QuickActions";
