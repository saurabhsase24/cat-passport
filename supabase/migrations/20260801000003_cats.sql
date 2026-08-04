create type public.cat_status as enum ('active', 'archived');

create table public.cats (
  id uuid primary key default gen_random_uuid(),
  nickname text,
  description text,
  primary_photo_path text,
  status public.cat_status not null default 'active',
  created_by uuid not null references public.profiles (id) on delete restrict,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

create index cats_created_by_idx on public.cats (created_by);
create index cats_status_idx on public.cats (status) where status = 'active';

alter table public.cats enable row level security;

create trigger set_cats_updated_at
  before update on public.cats
  for each row execute function public.set_updated_at();

create policy "active cats are publicly readable"
  on public.cats for select
  to anon, authenticated
  using (status = 'active' and deleted_at is null);

create policy "authenticated users can create their own cats"
  on public.cats for insert
  to authenticated
  with check (created_by = auth.uid() and status = 'active' and deleted_at is null);

-- WITH CHECK deliberately re-requires status = 'active', deleted_at is
-- null, and created_by = auth.uid() on the new row: this is what makes
-- archiving, soft-deletion, and ownership transfer impossible through a
-- normal client update (see security notes in the Sprint 5A plan),
-- without needing a separate trigger. Soft-deleting a cat is therefore
-- only possible via the secret key server-side, same as archiving.
create policy "owners can update their own active cats"
  on public.cats for update
  to authenticated
  using (created_by = auth.uid() and deleted_at is null)
  with check (created_by = auth.uid() and status = 'active' and deleted_at is null);
