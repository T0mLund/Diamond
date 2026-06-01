-- 0015_route_b_zone_partition.sql
-- Vegar's Diamond — Route B zone partition (BLUEPRINT, NOT APPLIED)
--
-- =====================================================================
-- BLUEPRINT ONLY — DO NOT APPLY WITHOUT EXPLICIT USER APPROVAL
-- =====================================================================
--
-- Drafted: 2026-06-01
-- Authored under: Decision Memo `docs/decision-notes/2026-06-01_r1_route_b_closure.md`
-- Standing directive: "DO NOT use v3.1 files to build anything without
--                     consulting me." (user, prior phase)
-- Status: BLUEPRINT. This file is a planning artifact. It MUST NOT be
--         executed against any database — staging or production —
--         without:
--           (i)  the first item being inserted into a Z3 sub-zone, AND
--           (ii) explicit user approval at that time.
--
-- Background
-- ----------
-- R1 closed 2026-06-01 under Route B. The bipyramid is promoted to a
-- second containment system, partitioning each of the 26 Z3 angular
-- sub-zones into an `.inner` half (inside the bipyramid) and an
-- `.outer` half (outside). This migration draft documents the schema
-- change that would realise that partition in `public.sub_zones`.
--
-- Spec references:
--   - Diamond_Spec_v3.0.md §6.2  — 26→52 Z3 sub-zones
--   - Diamond_Spec_v3.0.md §6.22.4 — Route B structural status
--   - Diamond_Spec_v3.0.md §6.23 — measured-geometry table
--   - Diamond_Containment_Note_v3.0.md §2.1 — R1 close-out
--   - Diamond_Roadmap_v3.0.md Part II R1 — blueprint reference
--
-- Naming convention
-- -----------------
-- Option A (chosen 2026-06-01): suffix the existing live-schema slugs
-- with `.inner` and `.outer`. The existing 26 Z3 rows are NOT renamed
-- in place; they are marked deprecated and replaced by 52 new rows.
--
-- Live-schema baseline (verified 2026-06-01 against project
-- zilnqideoswbsnbctqhi):
--   - 6 axial:   zone-3.axis-{x±,y±,z±}
--   - 12 plane:  zone-3.plane-{x0-y±z±, y0-x±z±, z0-x±y±}  -- (canonical
--                form; live slugs use the long form e.g.
--                zone-3.plane-x0-y+z+)
--   - 8 octant:  zone-3.octant-{ppp,ppn,pnp,pnn,npp,npn,nnp,nnn}
--   - 2 caps:    zone-4.{north,south}  -- schema slugs PRESERVED;
--                prose-rename to "polar cap" only
--
-- Polar caps note
-- ---------------
-- The two `zone-4.*` rows are NOT renamed at the schema level. Their
-- slugs (`zone-4.north`, `zone-4.south`) are stable database
-- identifiers. The v3.0 prose convention calls these "polar caps".
-- The equatorial belt of the φ-shell is undefined / blank in v3.0
-- (conservative Route B) and is NOT represented as a sub-zone row.
--
-- What this blueprint would do (if applied)
-- -----------------------------------------
-- 1. Add a `deprecated_at TIMESTAMPTZ` column to `public.sub_zones`
--    (NULL = active). This lets us retire the 26 parent Z3 rows
--    without dropping their UUIDs (preserves any prior FK references).
-- 2. For each of the 26 active Z3 sub-zone rows, INSERT two new rows:
--    one with slug `<parent_slug>.inner` and one with `<parent_slug>.outer`.
--    Copy the parent's metadata (label, description, etc.); append
--    " (inside bipyramid)" / " (outside bipyramid)" to labels.
-- 3. UPDATE the 26 parent Z3 rows to SET `deprecated_at = now()`.
-- 4. The `zone-4.north` / `zone-4.south` rows are untouched. Optional:
--    add a comment column or metadata flag noting their v3.0 prose name
--    ("polar cap north" / "polar cap south") — left out of this
--    blueprint pending naming-policy review.
--
-- What this blueprint would NOT do
-- --------------------------------
-- - It does NOT move any items between sub-zones. Item migration is
--   a separate concern (no items currently anchor to Z3 sub-zones; the
--   first such item is the reopening trigger for R3).
-- - It does NOT alter `public.zones`. Zone 4's row stays in the schema
--   with its existing slug; the prose retirement of "Zone 4" is not a
--   schema-level rename.
-- - It does NOT add CHECK constraints on the new slug format. The
--   slug column is already free-form text in the baseline schema.
-- - It does NOT add an `effective_period` to sub-zones. Sub-zones are
--   structurally permanent; only items have effective_period.
--
-- Application policy
-- ------------------
-- This file is NOT to be applied via `supabase db push`, `psql -f`,
-- the Supabase MCP `apply_migration` tool, or any other route, until:
--   (a) the first item is inserted with a Z3 anchor, AND
--   (b) the user explicitly approves application at that point.
--
-- If a future agent or human encounters this file during a routine
-- migration sweep: SKIP IT. Verify that the docs in
-- `docs/decision-notes/2026-06-01_r1_route_b_closure.md` and
-- `docs/Diamond_Roadmap_v3.0.md` Part II R1 still document the
-- gating condition before considering application.

-- =====================================================================
-- Begin (illustrative) SQL — DO NOT RUN
-- =====================================================================

BEGIN;

-- Guard: refuse to run unless an explicit override is set. This is a
-- safety net; the primary protection is that this file is not invoked.
DO $$
BEGIN
  IF current_setting('diamond.route_b_migration.acknowledged', true)
       IS DISTINCT FROM 'yes'
  THEN
    RAISE EXCEPTION
      'Migration 0015 is a blueprint. To apply, set '
      '`SET LOCAL diamond.route_b_migration.acknowledged = ''yes'';` '
      'in the same transaction after confirming the gating conditions '
      'in docs/decision-notes/2026-06-01_r1_route_b_closure.md.';
  END IF;
END
$$;

-- ---------------------------------------------------------------------
-- Step 1. Add deprecated_at column to sub_zones (idempotent).
-- ---------------------------------------------------------------------

ALTER TABLE public.sub_zones
  ADD COLUMN IF NOT EXISTS deprecated_at TIMESTAMPTZ;

COMMENT ON COLUMN public.sub_zones.deprecated_at IS
  'Set when a sub-zone is retired in favour of finer-grained children. '
  'NULL = active. First used by migration 0015 (Route B Z3 partition).';

-- ---------------------------------------------------------------------
-- Step 2. Insert 52 inner/outer children for each of the 26 Z3 parents.
--
-- Implementation note: this uses a CTE over the existing 26 parents
-- (slugs starting with 'zone-3.' and NOT containing '.inner'/'.outer').
-- The label/description columns are assumed; adjust to actual schema
-- before application.
-- ---------------------------------------------------------------------

WITH parents AS (
  SELECT id, slug, label, description
  FROM public.sub_zones
  WHERE slug LIKE 'zone-3.%'
    AND slug NOT LIKE '%.inner'
    AND slug NOT LIKE '%.outer'
    AND deprecated_at IS NULL
)
INSERT INTO public.sub_zones (slug, label, description)
SELECT slug || '.inner',
       label || ' (inside bipyramid)',
       COALESCE(description, '')
         || E'\n\nRoute B partition (2026-06-01): inner half of '
         || slug || ', i.e. the part of this Z3 angular sub-zone that '
         || 'lies inside the bipyramid |x|+|y|+|z|/φ ≤ 1.'
FROM parents
UNION ALL
SELECT slug || '.outer',
       label || ' (outside bipyramid)',
       COALESCE(description, '')
         || E'\n\nRoute B partition (2026-06-01): outer half of '
         || slug || ', i.e. the part of this Z3 angular sub-zone that '
         || 'lies outside the bipyramid |x|+|y|+|z|/φ ≤ 1.'
FROM parents;

-- ---------------------------------------------------------------------
-- Step 3. Retire the 26 parent Z3 rows (soft-delete via deprecated_at).
-- ---------------------------------------------------------------------

UPDATE public.sub_zones
SET deprecated_at = now()
WHERE slug LIKE 'zone-3.%'
  AND slug NOT LIKE '%.inner'
  AND slug NOT LIKE '%.outer'
  AND deprecated_at IS NULL;

-- ---------------------------------------------------------------------
-- Step 4. Polar caps — NO schema change.
--
-- The two `zone-4.{north,south}` rows are deliberately untouched. The
-- v3.0 prose rename to "polar cap north" / "polar cap south" is a
-- documentation convention only.
-- ---------------------------------------------------------------------

-- ---------------------------------------------------------------------
-- Step 5. Verification queries (for the operator running the migration).
-- ---------------------------------------------------------------------

-- Expected: 52 active Z3 children, 26 deprecated Z3 parents, 2 polar caps.
SELECT
  COUNT(*) FILTER (
    WHERE slug LIKE 'zone-3.%'
      AND (slug LIKE '%.inner' OR slug LIKE '%.outer')
      AND deprecated_at IS NULL
  ) AS z3_children_active,
  COUNT(*) FILTER (
    WHERE slug LIKE 'zone-3.%'
      AND slug NOT LIKE '%.inner'
      AND slug NOT LIKE '%.outer'
      AND deprecated_at IS NOT NULL
  ) AS z3_parents_deprecated,
  COUNT(*) FILTER (
    WHERE slug LIKE 'zone-4.%' AND deprecated_at IS NULL
  ) AS polar_caps_active
FROM public.sub_zones;

-- Expected: z3_children_active = 52, z3_parents_deprecated = 26,
--           polar_caps_active = 2.

COMMIT;

-- =====================================================================
-- End of blueprint. Reminder: this file is NOT applied.
-- =====================================================================
