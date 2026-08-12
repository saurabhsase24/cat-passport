"use client";

import { forwardRef, type HTMLAttributes } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";
import { Container } from "@/components/layout/Container";

export type BottomNavigationProps = HTMLAttributes<HTMLElement>;

interface NavItem {
  label: string;
  symbol: string;
  href: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: "Home", symbol: "🏠", href: "/" },
  { label: "Explore", symbol: "🧭", href: "/explore" },
  { label: "Add", symbol: "➕", href: "/spot" },
  { label: "Passports", symbol: "📘", href: "/passports" },
  { label: "Profile", symbol: "👤", href: "/profile" },
];

// Mobile-first bottom tab bar. The only Client Component in this sprint —
// active-route highlighting needs usePathname, which requires "use client".
export const BottomNavigation = forwardRef<HTMLElement, BottomNavigationProps>(
  ({ className, ...props }, ref) => {
    const pathname = usePathname();

    return (
      <nav
        ref={ref}
        aria-label="Primary"
        className={cn(
          // The safe-area-inset-bottom padding below clears the home
          // indicator on notched devices — this nav is fixed, so SafeArea's
          // flow-based bottom padding elsewhere on the page doesn't reach it;
          // it needs its own safe-area padding.
          "fixed bottom-0 left-0 right-0 z-10 border-t border-border-soft bg-bg-cream/85 pb-[env(safe-area-inset-bottom)] shadow-soft backdrop-blur-sm",
          className
        )}
        {...props}
      >
        <Container size="md">
          <ul className="flex items-stretch justify-between">
            {NAV_ITEMS.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname === item.href || pathname.startsWith(`${item.href}/`);

              return (
                <li key={item.label} className="flex-1">
                  <Link
                    href={item.href}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "flex w-full flex-col items-center gap-1 py-2 transition-colors duration-fast focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-text-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-cream",
                      isActive ? "text-text-primary" : "text-text-secondary hover:text-text-primary"
                    )}
                  >
                    <span aria-hidden="true" className="text-lg">
                      {item.symbol}
                    </span>
                    <span className={cn("text-xs font-medium", isActive && "font-semibold")}>
                      {item.label}
                    </span>
                    {/* Always rendered, transparent when inactive, so switching
                        tabs never changes a tab's height. Uses orange-strong
                        rather than primary-orange: this bar carries no text, so
                        it's a standalone non-text indicator and has to clear
                        3:1 on its own (design system §4). Colour isn't the only
                        active signal here — the label's weight shift and
                        aria-current carry it too. */}
                    <span
                      aria-hidden="true"
                      className={cn(
                        "h-0.5 w-6 rounded-full",
                        isActive ? "bg-primary-orange-strong" : "bg-transparent"
                      )}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </Container>
      </nav>
    );
  }
);

BottomNavigation.displayName = "BottomNavigation";
