import { type HTMLAttributes } from "react";
import { cn } from "@/lib/cn";
import { createClient } from "@/lib/supabase/server";
import { formatRelativeTime } from "@/lib/relativeTime";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Avatar } from "@/components/ui/Avatar";

export type NearbyCatsPreviewProps = HTMLAttributes<HTMLElement>;

const RECENT_SIGHTINGS_LIMIT = 3;
const SIGHTING_PHOTOS_BUCKET = "cat-sightings";

// Shape of the nested select below. The hand-written Database type (see
// lib/supabase/database.types.ts) has no Relationships metadata for
// Supabase-js to infer this from, so it's asserted explicitly instead of
// relying on inference.
interface RecentSightingRow {
  id: string;
  observed_at: string;
  area_name: string | null;
  cats: { nickname: string | null; primary_photo_path: string | null } | null;
  sighting_photos: { storage_path: string; is_primary: boolean }[];
}

interface RecentSighting {
  id: string;
  name: string;
  area: string | null;
  relativeTime: string;
  photoUrl: string | null;
}

// Server Component — no "use client", so this can be async and query
// Supabase directly. Dropped forwardRef converting from the previous
// version: async components can't be wrapped in it, and nothing forwarded a
// ref here (app/page.tsx renders <NearbyCatsPreview /> with no ref).
async function getRecentSightings(): Promise<RecentSighting[]> {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("sightings")
      .select(
        "id, observed_at, area_name, cats ( nickname, primary_photo_path ), sighting_photos ( storage_path, is_primary )"
      )
      .order("observed_at", { ascending: false })
      .limit(RECENT_SIGHTINGS_LIMIT)
      .overrideTypes<RecentSightingRow[], { merge: false }>();

    // Treated the same as "no sightings yet" rather than shown as a visible
    // error: this is a read-only homepage section, not the Spot flow, and a
    // raw failure here shouldn't be scarier than an empty neighborhood.
    // Logged server-side so it's still diagnosable.
    if (error) {
      console.error("Failed to load recent sightings:", error.message);
      return [];
    }

    return (data ?? []).map((row) => {
      const primaryPhoto =
        row.sighting_photos.find((photo) => photo.is_primary) ?? row.sighting_photos[0];
      const photoPath = primaryPhoto?.storage_path ?? row.cats?.primary_photo_path ?? null;
      const photoUrl = photoPath
        ? supabase.storage.from(SIGHTING_PHOTOS_BUCKET).getPublicUrl(photoPath).data.publicUrl
        : null;

      return {
        id: row.id,
        name: row.cats?.nickname?.trim() || "An unnamed cat",
        area: row.area_name,
        relativeTime: formatRelativeTime(row.observed_at),
        photoUrl,
      };
    });
  } catch (err) {
    // Next's own dynamic-API bailout signal (thrown by cookies(), which
    // createClient() calls) carries a `digest` starting with
    // DYNAMIC_SERVER_USAGE and must be rethrown, not swallowed — Next relies
    // on it propagating to correctly mark this route as dynamic during a
    // static-generation attempt. Same treatment for redirect()/notFound(),
    // on the chance either is ever introduced upstream of this call.
    if (
      err &&
      typeof err === "object" &&
      "digest" in err &&
      typeof err.digest === "string" &&
      (err.digest.startsWith("DYNAMIC_SERVER_USAGE") ||
        err.digest.startsWith("NEXT_REDIRECT") ||
        err.digest === "NEXT_NOT_FOUND")
    ) {
      throw err;
    }

    // Everything else — e.g. missing/invalid Supabase env config, a real
    // query failure — is treated as "no sightings" for this read-only
    // section rather than shown as a visible error (see comment above).
    console.error("Failed to load recent sightings:", err);
    return [];
  }
}

export async function NearbyCatsPreview({ className, ...props }: NearbyCatsPreviewProps) {
  const sightings = await getRecentSightings();

  return (
    <Section
      spacing="lg"
      aria-labelledby="nearby-cats-heading"
      className={cn(className)}
      {...props}
    >
      <Container size="md">
        <h2
          id="nearby-cats-heading"
          className="font-display text-xl font-bold text-text-primary"
        >
          Recent Sightings
        </h2>

        {sightings.length === 0 ? (
          <p className="mt-4 text-sm text-text-secondary">Quiet out there right now.</p>
        ) : (
          <ul className="mt-4 divide-y divide-border-soft border-y border-border-soft">
            {sightings.map((sighting) => (
              <li key={sighting.id} className="flex items-center gap-3 py-3">
                <Avatar src={sighting.photoUrl ?? undefined} name={sighting.name} size="md" />
                <div>
                  <p className="text-md font-semibold text-text-primary">{sighting.name}</p>
                  <p className="text-sm text-text-secondary">
                    {sighting.area ? `${sighting.area} · ${sighting.relativeTime}` : sighting.relativeTime}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </Container>
    </Section>
  );
}

NearbyCatsPreview.displayName = "NearbyCatsPreview";
