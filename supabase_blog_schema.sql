-- Run this SQL in your Supabase project's SQL editor.
-- Creates blogs table, storage bucket, and RLS policies.
-- Only the admin user (admin@tradingsmart.ai) can create/update/delete blogs and upload/delete images.
-- After running this, create the admin user via Dashboard or the script in scripts/create-admin.mjs.

------------------------------------------------------------
-- BLOGS TABLE
------------------------------------------------------------

create table if not exists public.blogs (
  id text primary key,
  title text not null,
  excerpt text not null,
  content text not null,
  image text not null,
  category text not null,
  "readTime" text,
  date text,
  author_name text,
  author_avatar text,
  author_id uuid references auth.users (id),
  created_at timestamptz not null default timezone('utc'::text, now())
);

-- Enable RLS
alter table public.blogs enable row level security;

-- Drop existing policies so this script is re-runnable
drop policy if exists "Public read blogs" on public.blogs;
drop policy if exists "Authenticated insert blogs" on public.blogs;
drop policy if exists "Authenticated update blogs" on public.blogs;
drop policy if exists "Authenticated delete blogs" on public.blogs;
drop policy if exists "Admin insert blogs" on public.blogs;
drop policy if exists "Admin update blogs" on public.blogs;
drop policy if exists "Admin delete blogs" on public.blogs;

-- Everyone (anon + authenticated) can read blogs
create policy "Public read blogs"
  on public.blogs
  for select
  using (true);

-- Only admin email can insert/update/delete
create policy "Admin insert blogs"
  on public.blogs
  for insert
  with check ((auth.jwt() ->> 'email') = 'admin@tradingsmart.ai');

create policy "Admin update blogs"
  on public.blogs
  for update
  using ((auth.jwt() ->> 'email') = 'admin@tradingsmart.ai')
  with check ((auth.jwt() ->> 'email') = 'admin@tradingsmart.ai');

create policy "Admin delete blogs"
  on public.blogs
  for delete
  using ((auth.jwt() ->> 'email') = 'admin@tradingsmart.ai');


------------------------------------------------------------
-- STORAGE BUCKET FOR BLOG IMAGES
------------------------------------------------------------

insert into storage.buckets (id, name, public)
values ('blog-images', 'blog-images', true)
on conflict (id) do nothing;

-- Drop existing policies for this bucket so script is re-runnable
drop policy if exists "Public read blog images" on storage.objects;
drop policy if exists "Authenticated insert blog images" on storage.objects;
drop policy if exists "Authenticated update blog images" on storage.objects;
drop policy if exists "Authenticated delete blog images" on storage.objects;
drop policy if exists "Admin insert blog images" on storage.objects;
drop policy if exists "Admin update blog images" on storage.objects;
drop policy if exists "Admin delete blog images" on storage.objects;

-- Everyone can read blog images
create policy "Public read blog images"
  on storage.objects
  for select
  using (bucket_id = 'blog-images');

-- Only admin email can upload/update/delete images
create policy "Admin insert blog images"
  on storage.objects
  for insert
  with check (bucket_id = 'blog-images' and (auth.jwt() ->> 'email') = 'admin@tradingsmart.ai');

create policy "Admin update blog images"
  on storage.objects
  for update
  using (bucket_id = 'blog-images' and (auth.jwt() ->> 'email') = 'admin@tradingsmart.ai')
  with check (bucket_id = 'blog-images' and (auth.jwt() ->> 'email') = 'admin@tradingsmart.ai');

create policy "Admin delete blog images"
  on storage.objects
  for delete
  using (bucket_id = 'blog-images' and (auth.jwt() ->> 'email') = 'admin@tradingsmart.ai');


------------------------------------------------------------
-- ADMIN USER
------------------------------------------------------------
-- Create the admin user in one of these ways:
--
-- Option A – Supabase Dashboard:
--   Authentication → Users → Add user → Invite user (or Create user)
--   Email: admin@tradingsmart.ai
--   Password: Admin@trading123
--
-- Option B – One-time script (no password in repo):
--   cd /path/to/tradingsmart.ai
--   SUPABASE_URL=https://YOUR_PROJECT.supabase.co \
--   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key \
--   ADMIN_EMAIL=admin@tradingsmart.ai \
--   ADMIN_PASSWORD=Admin@trading123 \
--   node scripts/create-admin.mjs
