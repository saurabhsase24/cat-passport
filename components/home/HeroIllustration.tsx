import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export type HeroIllustrationProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  "children"
>;

// A curious cat peeking over the top edge of an open notebook page — the
// Hero's one decorative idea. Purely presentational: nothing here is
// informational, so the whole panel is hidden from assistive tech.
export const HeroIllustration = forwardRef<HTMLDivElement, HeroIllustrationProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("relative h-40 w-40 shrink-0", className)}
      {...props}
      aria-hidden="true"
    >
      {/* Cat head, positioned to straddle the notebook's top edge */}
      <div className="absolute left-1/2 top-3 h-16 w-16 -translate-x-1/2">
        {/* ears */}
        <span className="absolute -top-2 left-2 h-5 w-5 rotate-45 rounded-sm bg-secondary-sage/35" />
        <span className="absolute -top-2 right-2 h-5 w-5 rotate-45 rounded-sm bg-secondary-sage/35" />
        {/* head */}
        <span className="absolute inset-x-0 top-2 h-14 rounded-full bg-secondary-sage/35" />
        {/* eyes, kept visible above the page edge to read as "peeking" */}
        <span className="absolute left-[22px] top-8 h-1.5 w-1.5 rounded-full bg-text-primary/70" />
        <span className="absolute right-[22px] top-8 h-1.5 w-1.5 rounded-full bg-text-primary/70" />
        {/* nose, the illustration's single sparing touch of orange */}
        <span className="absolute left-1/2 top-[42px] h-1 w-1.5 -translate-x-1/2 rounded-full bg-primary-orange/70" />
      </div>

      {/* Notebook page — its opaque background occludes the lower half of
          the head above, which is what creates the "peeking" illusion. */}
      <div className="absolute inset-x-0 bottom-0 top-16 rounded-lg border border-secondary-sage/20 bg-bg-cream shadow-soft">
        <div className="mx-4 mt-4 h-px bg-text-secondary/15" />
      </div>
    </div>
  )
);

HeroIllustration.displayName = "HeroIllustration";
