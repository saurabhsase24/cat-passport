create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  display_name text,
  avatar_path text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

-- updated_at trigger, reused by every table that has the column
create function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger set_profiles_updated_at
  before update on public.profiles
  for each row execute function public.set_updated_at();

-- auto-create a profile for every new auth user (password, OAuth, or anonymous)
create function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id) values (new.id);
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- RLS: self-only read and update for now. No anon SELECT policy at all —
-- anon has no auth.uid(), so it would match nothing anyway; being
-- explicit that profiles are NOT public avoids accidentally exposing
-- every user's row. Public attribution (e.g. "reported by X" on a
-- sighting) has no concrete product need yet — a dedicated public
-- view/RPC exposing only safe columns is deferred until that need is
-- real, rather than defaulting to `using (true)` today.
-- No INSERT/DELETE policy for anyone — profiles are only ever created by
-- the trigger above, which runs as security definer and bypasses RLS.
create policy "users can read their own profile"
  on public.profiles for select
  to authenticated
  using (id = auth.uid());

create policy "users can update their own profile"
  on public.profiles for update
  to authenticated
  using (id = auth.uid())
  with check (id = auth.uid());
