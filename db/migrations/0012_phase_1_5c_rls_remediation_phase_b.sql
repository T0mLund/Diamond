-- 0012_phase_1_5c_rls_remediation_phase_b.sql
-- Vegar's Diamond — Phase 1.5c RLS Remediation, Phase B
--
-- Background
-- ----------
-- Phases A and A2 (migrations 0010 and 0011) revoked all DML grants from
-- `anon` and `authenticated` on ours-owned tables and views. Phase B now
-- enables Row Level Security on the 40 ours-owned `public` tables that had
-- RLS disabled (`zones` and `sub_zones` already had it enabled from prior
-- work). No policies are created — effective behaviour is deny-all for any
-- role that is not the table owner, a superuser, or has BYPASSRLS.
--
-- Excluded
-- --------
-- - public.zones, public.sub_zones        — RLS already enabled
-- - public.spatial_ref_sys                — owned by supabase_admin, PostGIS
--                                           standard Supabase exception
--
-- Safety
-- ------
-- - Directus connects as `postgres` (the table owner) — RLS does not apply
--   to the owner.
-- - The agent uses `service_role`, which has BYPASSRLS by default.
-- - `anon` and `authenticated` already have no grants (Phase A); RLS adds
--   defense-in-depth.
-- - Reversible via `ALTER TABLE ... DISABLE ROW LEVEL SECURITY`.
--
-- Verification
-- ------------
-- Post-application: 42/42 ours-owned `public` tables have `relrowsecurity =
-- true`. Directus admin login confirmed working by user 2026-05-15 16:00
-- CEST; `directus_sessions` count incremented after the migration, evidence
-- of successful reconnection.
--
-- Applied to Supabase on 2026-05-15 14:58 UTC as version 20260515135811.

DO $$
DECLARE t record;
BEGIN
  FOR t IN
    SELECT c.relname
    FROM pg_class c
    JOIN pg_namespace n ON n.oid = c.relnamespace
    WHERE n.nspname = 'public'
      AND c.relkind = 'r'
      AND pg_catalog.pg_get_userbyid(c.relowner) = 'postgres'
      AND c.relrowsecurity = false
  LOOP
    EXECUTE format('ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY', t.relname);
  END LOOP;
END $$;
