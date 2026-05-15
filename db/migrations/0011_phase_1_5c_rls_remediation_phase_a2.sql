-- 0011_phase_1_5c_rls_remediation_phase_a2.sql
-- Vegar's Diamond — Phase 1.5c RLS Remediation, Phase A2
--
-- Background
-- ----------
-- Phase A (migration 0010) looped over `pg_tables` to revoke grants on the
-- 41 ours-owned regular tables. `pg_tables` excludes views, however, leaving
-- two ours-owned views with full `anon` and `authenticated` DML grants:
--
--   - public.current_items     (view over `items`, filtered to current rows)
--   - public.points_with_zones (view joining `coordinates` to `zones` and
--                              `sub_zones` via `compute_zone`)
--
-- Three PostGIS objects (geography_columns, geometry_columns,
-- spatial_ref_sys) remain with grants but are owned by `supabase_admin` and
-- contain only public coordinate-reference-system data; these are standard
-- Supabase-side exceptions and are deliberately not modified.
--
-- Safety
-- ------
-- Same logic as Phase A. Both views currently return zero rows (no items
-- inserted). Directus uses `postgres` role; unaffected. Reversible.
--
-- Applied to Supabase on 2026-05-15 14:55 UTC as version 20260515135542.

REVOKE ALL ON public.current_items FROM anon, authenticated;
REVOKE ALL ON public.points_with_zones FROM anon, authenticated;
