create table public.sightings (
  id uuid primary key default gen_random_uuid(),
  cat_id uuid not null references public.cats (id) on delete cascade,
  reported_by uuid not null references public.profiles (id) on delete restrict,
  -- Nullable: SpotCatFlow already lets a visitor continue without sharing
  -- location (denied/unavailable permission), so the DB must accept that.
  location geography(Point, 4326),
  area_name text,
  note text,
  observed_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  deleted_at timestamptz
);

create index sightings_cat_id_idx on public.sightings (cat_id);
create index sightings_reported_by_idx on public.sightings (reported_by);
-- Partial: only indexes rows that actually have a location, which is now
-- an optional field.
create index sightings_location_gix on public.sightings using gist (location)
  where location is not null;

alter table public.sightings enable row level security;

create policy "sightings of active cats are publicly readable"
  on public.sightings for select
  to anon, authenticated
  using (
    deleted_at is null
    and exists (
      select 1 from public.cats
      where cats.id = sightings.cat_id and cats.status = 'active'
    )
  );

create policy "authenticated users can report sightings of active cats"
  on public.sightings for insert
  to authenticated
  with check (
    reported_by = auth.uid()
    and deleted_at is null
    and exists (
      select 1 from public.cats
      where cats.id = cat_id and cats.status = 'active'
    )
  );

-- WITH CHECK re-requires deleted_at is null, same technique used for
-- cats.status: a normal client update can edit their own sighting but
-- can't be the thing that soft-deletes it.
create policy "owners can update their own sightings"
  on public.sightings for update
  to authenticated
  using (reported_by = auth.uid() and deleted_at is null)
  with check (reported_by = auth.uid() and deleted_at is null);
