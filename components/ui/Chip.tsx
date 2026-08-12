import { cn } from "@/lib/cn";

export interface ChipProps {
  /** Single emoji shown before the label; decorative, hidden from screen readers. */
  emoji: string;
  label: string;
  /** Presence of onClick switches the chip from a static <span> to a pressable <button>. */
  selected?: boolean;
  onClick?: () => void;
  className?: string;
}

// Uses the general (non-Passport) palette on purpose: this primitive is also
// meant for the future Add-a-Cat chip picker, which is not a Passport-styled
// screen — the reserved passport-* colors must not leak in here.
//
// The selected state splits the two-orange rule across fill and border
// (design system §4): the fill stays primary-orange because the chip carries
// a visible label, and that label at 4.78:1 is what identifies the control;
// the border moves to orange-strong because it is a state-signaling boundary
// standing on its own, where the 3:1 non-text threshold does apply. A weight
// shift accompanies both, so selection is never communicated by colour alone
// (brief §24) — an orange and a sage pill are hard to tell apart at a glance
// under sunlight or with a colour-vision deficiency.
export function Chip({ emoji, label, selected = false, onClick, className }: ChipProps) {
  const classes = cn(
    "inline-flex items-center gap-1 rounded-full border px-3 py-2 text-sm transition-colors duration-fast",
    selected
      ? "border-primary-orange-strong bg-primary-orange font-semibold text-text-on-primary"
      : "border-secondary-sage/40 bg-secondary-sage/15 font-medium text-text-primary",
    onClick &&
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-text-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-cream",
    className
  );

  const content = (
    <>
      <span aria-hidden="true">{emoji}</span>
      <span>{label}</span>
    </>
  );

  if (onClick) {
    return (
      <button type="button" onClick={onClick} aria-pressed={selected} className={classes}>
        {content}
      </button>
    );
  }

  return <span className={classes}>{content}</span>;
}
