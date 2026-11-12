-- ════════════════════════════════════════════════════════════════════════════
--  Wedding site backend — run once in Supabase → SQL Editor → New query → Run
--  Creates: public photo bucket, `photos` table, `rsvps` table, and the
--  row-level-security policies that let guests upload/view without logging in.
-- ════════════════════════════════════════════════════════════════════════════

-- 1) Storage bucket for guest photos (public read, 25 MB max, images only)
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('wedding-photos', 'wedding-photos', true, 26214400,
        array['image/jpeg','image/png','image/webp','image/heic','image/heif'])
on conflict (id) do update
  set public = excluded.public,
      file_size_limit = excluded.file_size_limit,
      allowed_mime_types = excluded.allowed_mime_types;

-- Guests (anonymous) may upload into uploads/… of this bucket only. No update/delete.
drop policy if exists "Guests can upload wedding photos" on storage.objects;
create policy "Guests can upload wedding photos"
  on storage.objects for insert to anon, authenticated
  with check (bucket_id = 'wedding-photos' and (storage.foldername(name))[1] = 'uploads');

-- Public bucket files are readable via their public URL; this policy also allows listing.
drop policy if exists "Anyone can view wedding photos" on storage.objects;
create policy "Anyone can view wedding photos"
  on storage.objects for select to anon, authenticated
  using (bucket_id = 'wedding-photos');

-- 2) Photos table — one row per uploaded photo (powers the gallery grid)
create table if not exists public.photos (
  id            uuid primary key default gen_random_uuid(),
  storage_path  text not null unique,
  uploader_name text,
  caption       text,
  width         int,
  height        int,
  created_at    timestamptz not null default now()
);
alter table public.photos enable row level security;

drop policy if exists "Anyone can view photos" on public.photos;
create policy "Anyone can view photos" on public.photos
  for select to anon, authenticated using (true);

drop policy if exists "Guests can add photos" on public.photos;
create policy "Guests can add photos" on public.photos
  for insert to anon, authenticated
  with check (
    storage_path like 'uploads/%'
    and coalesce(length(uploader_name), 0) <= 80
    and coalesce(length(caption), 0) <= 280
  );

-- Live updates: new photos appear for everyone viewing the gallery
do $$ begin
  alter publication supabase_realtime add table public.photos;
exception when duplicate_object then null; end $$;

-- 3) RSVPs — guests can submit, only the couple (dashboard) can read
create table if not exists public.rsvps (
  id          uuid primary key default gen_random_uuid(),
  full_name   text not null check (length(full_name) between 1 and 120),
  email       text check (length(email) <= 200),
  phone       text check (length(phone) <= 40),
  attending   boolean not null,
  guest_count int not null default 1 check (guest_count between 0 and 10),
  dietary     text check (length(dietary) <= 500),
  message     text check (length(message) <= 1000),
  created_at  timestamptz not null default now()
);
alter table public.rsvps enable row level security;

drop policy if exists "Guests can RSVP" on public.rsvps;
create policy "Guests can RSVP" on public.rsvps
  for insert to anon, authenticated with check (true);
-- (No select policy on purpose: responses are private to the dashboard.)

-- Moderation tip: to hide a photo, delete its row in Table editor → photos
-- (and optionally the file in Storage → wedding-photos).
