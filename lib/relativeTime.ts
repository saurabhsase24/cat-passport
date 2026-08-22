// Formats a real timestamp as a short, natural relative string (design
// system copy conventions — "18 minutes ago", "yesterday"). Deliberately
// only ever called on a genuine observed_at value from the database now
// that Recent Sightings reads real rows; there is nothing to fabricate here.
export function formatRelativeTime(iso: string): string {
  const then = new Date(iso).getTime();
  const diffMinutes = Math.round((Date.now() - then) / 60_000);

  if (diffMinutes < 1) return "just now";
  if (diffMinutes < 60) {
    return `${diffMinutes} minute${diffMinutes === 1 ? "" : "s"} ago`;
  }

  const diffHours = Math.round(diffMinutes / 60);
  if (diffHours < 24) {
    return `${diffHours} hour${diffHours === 1 ? "" : "s"} ago`;
  }

  const diffDays = Math.round(diffHours / 24);
  if (diffDays === 1) return "yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;

  return new Date(iso).toLocaleDateString(undefined, { month: "short", day: "numeric" });
}
