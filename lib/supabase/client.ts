import { createBrowserClient } from "@supabase/ssr";

// For Client Components. No custom cookie handlers needed — when both
// getAll/setAll are omitted, the browser client falls back to document.cookie.
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
  );
}
