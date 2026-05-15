-- 0010_phase_1_5c_rls_remediation_phase_a.sql
-- Vegar's Diamond — Phase 1.5c RLS Remediation, Phase A
--
-- Background
-- ----------
-- The v2.0-draft Roadmap (Part III, Phase 1.5c) identified that Supabase's
-- advisor flagged 41 tables in the `public` schema with RLS disabled and the
-- `anon` and `authenticated` roles holding full DML grants on all of them.
-- Sensitive columns exposed included `directus_users.{password, token}`,
-- `directus_sessions.token`, and `directus_shares.password`.
--
-- The 2026-05-15 user direction supersedes the v2.0-draft "public read, no
-- write" classification with a fully-private posture: only the agent and
-- Vegar can read or write; "others" as collaborators is a 6–12 month future
-- concern with an admin-contributor-user hierarchy to be defined then.
--
-- Phase A: revoke all grants from `anon` and `authenticated` on every table
-- in the `public` schema. Phase A2 (migration 0011) handles the two
-- ours-owned views that pg_tables does not enumerate. Phase B (migration
-- 0012) enables RLS deny-all. Phases D1 and D2 (migrations 0013 and 0014)
-- harden functions and views.
--
-- Safety
-- ------
-- - Directus connects as the `postgres` role via Supavisor; unaffected.
-- - The agent operates via `service_role` and `postgres`; both unaffected.
-- - No public site or external client currently consumes these grants.
-- - Reversible: grants can be re-issued in a future migration.
--
-- Applied to Supabase on 2026-05-15 14:52 UTC as version 20260515135215.

DO $$
DECLARE t record;
BEGIN
  FOR t IN SELECT tablename FROM pg_tables WHERE schemaname = 'public'
  LOOP EXECUTE format('REVOKE ALL ON TABLE public.%I FROM anon, authenticated', t.tablename);
  END LOOP;
END $$;
