import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "@/lib/cn";
import { Container } from "@/components/layout/Container";

export type BottomNavigationProps = HTMLAttributes<HTMLElement>;

interface NavItem {
  label: string;
  symbol: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: "Home", symbol: "🏠" },
  { label: "Explore", symbol: "🧭" },
  { label: "Add Cat", symbol: "➕" },
  { label: "Passports", symbol: "📘" },
  { label: "Profile", symbol: "👤" },
];

// Mobile-first bottom tab bar. Presentation only — no routing/active-state
// logic until the destination screens exist.
export const BottomNavigation = forwardRef<HTMLElement, BottomNavigationProps>(
  ({ className, ...props }, ref) => (
    <nav
      ref={ref}
      aria-label="Primary"
      className={cn(
        "fixed bottom-0 left-0 right-0 z-10 border-t border-secondary-sage/15 bg-bg-cream/85 shadow-soft backdrop-blur-sm",
        className
      )}
      {...props}
    >
      <Container size="md">
        <ul className="flex items-stretch justify-between">
          {NAV_ITEMS.map((item) => (
            <li key={item.label} className="flex-1">
              <button
                type="button"
                className="flex w-full flex-col items-center gap-1 py-2 text-text-secondary transition-colors duration-fast hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-text-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-cream"
              >
                <span aria-hidden="true" className="text-lg">
                  {item.symbol}
                </span>
                <span className="text-xs font-medium">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </Container>
    </nav>
  )
);

BottomNavigation.displayName = "BottomNavigation";
