import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface PageHeaderProps extends HTMLAttributes<HTMLElement> {
  title: string;
  description?: string;
  /** Slot for a back button / icon rendered before the title. */
  leading?: ReactNode;
  /** Slot for trailing controls, e.g. a guest avatar or action button. */
  actions?: ReactNode;
}

// The single <h1> for a screen (Home, Explore, Passport, ...), pairing the
// title with optional leading (back button) and trailing (avatar/action)
// slots so every top-level page announces a consistent heading structure.
export const PageHeader = forwardRef<HTMLElement, PageHeaderProps>(
  ({ title, description, leading, actions, className, ...props }, ref) => (
    <header
      ref={ref}
      className={cn("flex items-start justify-between gap-4", className)}
      {...props}
    >
      <div className="flex items-start gap-3">
        {leading}
        <div>
          <h1 className="font-display text-xl font-bold text-text-primary">
            {title}
          </h1>
          {description && (
            <p className="mt-1 text-sm text-text-secondary">{description}</p>
          )}
        </div>
      </div>

      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </header>
  )
);

PageHeader.displayName = "PageHeader";
