insert into storage.buckets (id, name, public)
values ('cat-sightings', 'cat-sightings', true)
on conflict (id) do nothing;

-- Public read (V1). Also covers reading back metadata for an object right
-- after upload — the JS client's .upload() call needs a SELECT policy to
-- return that metadata, independent of the bucket's public-read flag,
-- which only governs the raw-file CDN path.
create policy "cat-sightings objects are publicly readable"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'cat-sightings');

-- Upload only into the uploader's own {user_id}/... folder.
-- storage.foldername() splits the object path into segments;
-- segment 1 must equal the caller's uid.
create policy "authenticated users can upload into their own folder"
  on storage.objects for insert
  to authenticated
  with check (
    bucket_id = 'cat-sightings'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

-- No UPDATE/DELETE storage policies — matches "no client moderation" and
-- the default-deny stance used throughout this schema.
