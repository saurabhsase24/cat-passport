import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  /** "md" fits card-list content; "lg" (default) matches the app's page-level width; "full" removes the max-width cap. */
  size?: "md" | "lg" | "full";
}

const SIZE_CLASSES: Record<NonNullable<ContainerProps["size"]>, string> = {
  md: "max-w-3xl",
  lg: "max-w-6xl",
  full: "max-w-none",
};

// Centers page content and applies a consistent horizontal gutter so every
// screen shares the same left/right edges regardless of viewport width.
export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ size = "lg", className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("mx-auto w-full px-5", SIZE_CLASSES[size], className)}
      {...props}
    />
  )
);

Container.displayName = "Container";
