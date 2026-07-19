type ClassValue = string | false | null | undefined;

/**
 * Joins class name strings, dropping falsy values.
 * This is a plain concatenation helper, not a Tailwind conflict resolver
 * (no clsx/tailwind-merge) — callers should avoid passing contradictory
 * utility classes (e.g. two different `bg-*` classes) at the same time.
 */
export function cn(...classes: ClassValue[]): string {
  return classes.filter(Boolean).join(" ");
}
