import { cn } from "@/lib/cn";

export interface StepProgressProps {
  /** Display label for every stage, in order — e.g. ["Photo", "Location", ...]. */
  stages: string[];
  /** 0-based index of the active stage. */
  currentIndex: number;
  className?: string;
}

// Dots communicate position at a glance; the visible text names the current
// stage rather than a raw "Step N of 5" count, which reads calmer for a
// short linear flow. A visually-hidden aria-live region still announces the
// ordinal for screen reader users.
//
// The dots carry no text of their own, so the active one uses orange-strong
// rather than primary-orange — a standalone non-text indicator has to clear
// 3:1 by itself (design system §4). Colour still isn't the only signal here:
// the stage label below and the live region both name the current step.
export function StepProgress({ stages, currentIndex, className }: StepProgressProps) {
  const currentLabel = stages[currentIndex] ?? "";

  return (
    <div className={cn("flex flex-col items-center gap-2", className)}>
      <ol className="flex items-center gap-1.5" aria-hidden="true">
        {stages.map((label, index) => (
          <li
            key={label}
            className={cn(
              "h-1.5 w-6 rounded-full transition-colors duration-standard",
              index === currentIndex
                ? "bg-primary-orange-strong"
                : index < currentIndex
                  ? "bg-secondary-sage"
                  : "bg-border-soft"
            )}
          />
        ))}
      </ol>

      <p className="text-sm font-semibold text-text-primary">{currentLabel}</p>

      <p aria-live="polite" className="sr-only">
        Step {currentIndex + 1} of {stages.length}: {currentLabel}
      </p>
    </div>
  );
}
