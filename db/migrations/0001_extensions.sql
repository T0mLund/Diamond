-- 0001_extensions.sql
-- Vegar's Diamond — Phase 1 schema, migration 1 of 4
-- Enables required Postgres extensions on the Supabase project.
--
-- postgis    : spatial queries on the diamond's interior (PointZ coordinates).
-- pgcrypto   : gen_random_uuid() for table primary keys.
-- moddatetime: auto-updates updated_at columns on row changes.

create extension if not exists postgis;
create extension if not exists pgcrypto;
create extension if not exists moddatetime schema extensions;

-- Sanity: surface the installed PostGIS version into the migration log.
do $$
begin
  raise notice 'postgis version: %', postgis_version();
end$$;
