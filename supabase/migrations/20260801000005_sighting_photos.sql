create table public.sighting_photos (
  id uuid primary key default gen_random_uuid(),
  sighting_id uuid not null references public.sightings (id) on delete cascade,
  storage_path text not null,
  uploaded_by uuid not null references public.profiles (id) on delete restrict,
  is_primary boolean not null default false,
  created_at timestamptz not null default now(),
  deleted_at timestamptz
);

create index sighting_photos_sighting_id_idx on public.sighting_photos (sighting_id);
create index sighting_photos_uploaded_by_idx on public.sighting_photos (uploaded_by);

-- at most one primary photo per sighting
create unique index sighting_photos_one_primary_per_sighting
  on public.sighting_photos (sighting_id)
  where is_primary;

alter table public.sighting_photos enable row level security;

create policy "photos of active-cat sightings are publicly readable"
  on public.sighting_photos for select
  to anon, authenticated
  using (
    deleted_at is null
    and exists (
      select 1 from public.sightings
      join public.cats on cats.id = sightings.cat_id
      where sightings.id = sighting_photos.sighting_id
        and sightings.deleted_at is null
        and cats.status = 'active'
    )
  );

create policy "authenticated users can attach photos to their own sightings"
  on public.sighting_photos for insert
  to authenticated
  with check (
    uploaded_by = auth.uid()
    and deleted_at is null
    and exists (
      select 1 from public.sightings
      where sightings.id = sighting_id and sightings.reported_by = auth.uid()
    )
  );

create policy "owners can update their own uploaded photos"
  on public.sighting_photos for update
  to authenticated
  using (uploaded_by = auth.uid() and deleted_at is null)
  with check (uploaded_by = auth.uid() and deleted_at is null);
