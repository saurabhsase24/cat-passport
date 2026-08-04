import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

// Session-refresh helper used by the root proxy.ts. Only ever refreshes an
// *existing* session's token — never creates one. Creating an anonymous
// identity is a deliberate action tied to a user gesture (first
// contribution), not something that should happen passively on every page
// view; see the Sprint 5A plan for where that will be wired in later.
export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({ request });

  // No Supabase project is linked yet (Sprint 5A ships the schema/clients
  // ahead of a real project). Without this guard every route 500s the
  // moment this file exists, since createServerClient throws on a missing
  // URL/key. Once .env.local has real values this branch never runs.
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY) {
    return response;
  }

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll: (cookiesToSet, headers) => {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
          // Cache-control headers Supabase requires whenever auth cookies
          // are written, so a CDN/reverse proxy in front of this app never
          // caches one user's session token and serves it to another.
          Object.entries(headers).forEach(([key, value]) => response.headers.set(key, value));
        },
      },
    }
  );

  // getClaims() (not getSession()) is Supabase's current recommendation for
  // server-side/Proxy verification — it validates the JWT rather than
  // trusting an unverified cookie value.
  await supabase.auth.getClaims();

  return response;
}
