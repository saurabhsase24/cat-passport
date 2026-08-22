import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import type { Database } from "@/lib/supabase/database.types";

// For Server Components, Server Actions, and Route Handlers.
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: (cookiesToSet) => {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Called from a Server Component during render, where cookies
            // can't be set (next/headers' cookies().set() only works in a
            // Server Action or Route Handler) — safe to ignore because
            // proxy.ts refreshes the session on every request instead.
            // The cache-control `headers` argument this callback also
            // receives can't be forwarded here either, since next/headers
            // has no equivalent hook for setting arbitrary response
            // headers from a Server Component; proxy.ts is the
            // enforcement point for that.
          }
        },
      },
    }
  );
}
