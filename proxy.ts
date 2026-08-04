import { updateSession } from "@/lib/supabase/proxy";
import type { NextRequest } from "next/server";

// Renamed from `middleware.ts` as of Next.js 16 — see
// node_modules/next/dist/docs/.../file-conventions/proxy.md.
export async function proxy(request: NextRequest) {
  return updateSession(request);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|webp)$).*)"],
};
