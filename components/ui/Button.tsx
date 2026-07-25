import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** "primary" is the filled-orange call to action; "secondary" is sage-outlined. */
  variant?: "primary" | "secondary";
  /** "md" already meets the 44px minimum tap target; "lg" is for hero-level CTAs. */
  size?: "md" | "lg";
  fullWidth?: boolean;
}

// Both brand accents (orange, sage) fall below 3:1 contrast against the cream
// page background, so dark text-primary is used for labels and focus rings
// instead of cream/white, keeping every state readable (Design System §11).
const VARIANT_CLASSES: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary: "bg-primary-orange text-text-primary hover:bg-primary-orange/90",
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
