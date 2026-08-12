import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** "primary" is the filled-orange call to action; "secondary" is sage-outlined. */
  variant?: "primary" | "secondary";
  /** "md" already meets the 44px minimum tap target; "lg" is for hero-level CTAs. */
  size?: "md" | "lg";
  fullWidth?: boolean;
}

// A filled accent can't carry a light label here — white on primary-orange
// measures 2.64:1 — so filled surfaces use the dedicated text-on-primary ink
// (4.78:1 on orange). The outlined secondary keeps text-primary instead,
// because its label sits on the page ground rather than on a fill (9.60:1).
//
// Secondary's sage outline stays decorative rather than moving to
// border-strong: both variants are identified by a high-contrast visible
// label, which is the same reasoning that exempts primary's fill from the
// 3:1 non-text threshold. Ratios per design system §3.
const VARIANT_CLASSES: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary: "bg-primary-orange text-text-on-primary hover:bg-primary-orange/90",
  secondary:
    "border border-secondary-sage text-text-primary hover:bg-secondary-sage/15",
};

const SIZE_CLASSES: Record<NonNullable<ButtonProps["size"]>, string> = {
  md: "min-h-11 px-5 text-md",
  lg: "min-h-13 px-6 text-lg",
};

export interface ButtonClassNameOptions {
  variant?: ButtonProps["variant"];
  size?: ButtonProps["size"];
  fullWidth?: ButtonProps["fullWidth"];
  className?: string;
}

// Shared style source for Button and any non-<button> element that must look
// like one (e.g. a next/link Link standing in for a button-styled nav
// action) — both call this so their appearance can't drift apart.
export function buttonClassName({
  variant = "primary",
  size = "md",
  fullWidth = false,
  className,
}: ButtonClassNameOptions = {}) {
  return cn(
    "inline-flex items-center justify-center rounded-full font-semibold transition duration-fast ease-out active:scale-[0.96] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-text-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-cream disabled:opacity-50 disabled:pointer-events-none",
    VARIANT_CLASSES[variant],
    SIZE_CLASSES[size],
    fullWidth && "w-full",
    className
  );
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      fullWidth = false,
      type = "button",
      className,
      ...props
    },
    ref
  ) => (
    <button
      ref={ref}
      type={type}
      className={buttonClassName({ variant, size, fullWidth, className })}
      {...props}
    />
  )
);

Button.displayName = "Button";
