create type public.sighting_tag as enum (
  'eating', 'sleeping', 'with_kittens', 'needs_help', 'looks_injured'
);

create table public.sighting_tags (
  sighting_id uuid not null references public.sightings (id) on delete cascade,
  tag public.sighting_tag not null,
  primary key (sighting_id, tag)
);

alter table public.sighting_tags enable row level security;

create policy "tags of active-cat sightings are publicly readable"
  on public.sighting_tags for select
  to anon, authenticated
  using (
    exists (
      select 1 from public.sightings
      join public.cats on cats.id = sightings.cat_id
      where sightings.id = sighting_tags.sighting_id and cats.status = 'active'
    )
  );

create policy "authenticated users can tag their own sightings"
  on public.sighting_tags for insert
  to authenticated
  with check (
    exists (
      select 1 from public.sightings
      where sightings.id = sighting_id and sightings.reported_by = auth.uid()
    )
  );

create policy "owners can remove tags from their own sightings"
  on public.sighting_tags for delete
  to authenticated
  using (
    exists (
      select 1 from public.sightings
      where sightings.id = sighting_id and sightings.reported_by = auth.uid()
    )
  );

-- The primary key above is the index needed for lookups by sighting_id;
-- no separate index required.
