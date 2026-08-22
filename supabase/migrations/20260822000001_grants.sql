-- Baseline table-level GRANTs for anon/authenticated.
--
-- RLS policies (migrations 20260801000002–000006) control which *rows* each
-- role can see or change, but Postgres checks a more basic, table-level
-- privilege first — RLS is only ever evaluated once that base GRANT already
-- allows the operation. None of the earlier migrations issued one, which is
-- why every query against these tables failed with "permission denied for
-- table ..." regardless of how permissive the RLS policies were.
--
-- Every GRANT below is scoped to match its table's existing RLS policies
-- exactly (see the migration cited in each comment) — this does not widen
-- access beyond what those policies already intend, it only unblocks the
-- privilege check that has to pass before RLS gets a chance to run at all.

grant usage on schema public to anon, authenticated;

-- profiles (20260801000002_profiles.sql): self-only SELECT/UPDATE for
-- authenticated; no anon policy at all, and INSERT only ever happens via the
-- security-definer trigger, which runs as the function owner and doesn't
-- need the calling role to hold INSERT here.
grant select, update on public.profiles to authenticated;

-- cats (20260801000003_cats.sql): active cats publicly readable; owners can
-- INSERT/UPDATE their own. No DELETE policy — soft-delete is a
-- secret-key/server-side-only operation.
grant select on public.cats to anon, authenticated;
grant insert, update on public.cats to authenticated;

-- sightings (20260801000004_sightings.sql): same shape as cats.
grant select on public.sightings to anon, authenticated;
grant insert, update on public.sightings to authenticated;

-- sighting_photos (20260801000005_sighting_photos.sql): same shape again.
grant select on public.sighting_photos to anon, authenticated;
grant insert, update on public.sighting_photos to authenticated;

-- sighting_tags (20260801000006_sighting_tags.sql): a join table — tags are
-- added and removed, never edited in place, so DELETE replaces UPDATE here.
grant select on public.sighting_tags to anon, authenticated;
grant insert, delete on public.sighting_tags to authenticated;
