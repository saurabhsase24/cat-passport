import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export interface SafeAreaProps extends HTMLAttributes<HTMLDivElement> {
  /** Which device safe-area insets (notch, home indicator) to pad for. Defaults to all edges. */
  edges?: Array<"top" | "bottom" | "left" | "right">;
}

const EDGE_CLASSES: Record<NonNullable<SafeAreaProps["edges"]>[number], string> = {
  top: "pt-[env(safe-area-inset-top)]",
  bottom: "pb-[env(safe-area-inset-bottom)]",
  left: "pl-[env(safe-area-inset-left)]",
  right: "pr-[env(safe-area-inset-right)]",
};

const ALL_EDGES: NonNullable<SafeAreaProps["edges"]> = ["top", "bottom", "left", "right"];

// Pads content away from device notches / rounded corners / home indicators
// using the env(safe-area-inset-*) values, e.g. wrapping the app Header
// (top) or bottom navigation (bottom) so they aren't obscured on notched
// devices. A no-op on browsers/devices without safe-area insets.
export const SafeArea = forwardRef<HTMLDivElement, SafeAreaProps>(
  ({ edges = ALL_EDGES, className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(...edges.map((edge) => EDGE_CLASSES[edge]), className)}
      {...props}
    />
  )
);

SafeArea.displayName = "SafeArea";
