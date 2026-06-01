-- 0015_route_b_zone_partition.sql
-- Vegar's Diamond — Route B zone partition (BLUEPRINT v2, NOT APPLIED)
--
-- =====================================================================
-- BLUEPRINT v2 — DO NOT APPLY WITHOUT EXPLICIT USER APPROVAL
-- =====================================================================
--
-- Drafted: 2026-06-01 (v1 blueprint)
-- Revised: 2026-06-01 (v2 — schema-drift fixes)
-- Authored under: Decision Memo `docs/decision-notes/2026-06-01_r1_route_b_closure.md`
-- Revision authored under:
--   `docs/decision-notes/2026-06-01_0015_blueprint_schema_drift.md`
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
-- Live schema baseline (verified 2026-06-01 against project
-- zilnqideoswbsnbctqhi)
-- ---------------------------------------------------------
-- Columns on public.sub_zones:
--   id                uuid          PK, default gen_random_uuid()
--   zone_id           uuid          NOT NULL, FK -> zones.id ON DELETE CASCADE
--   slug              text          NOT NULL, UNIQUE
--   name              text          NOT NULL
--   sign_x            text          NOT NULL, CHECK IN ('+','-','0','any')
--   sign_y            text          NOT NULL, CHECK IN ('+','-','0','any')
--   sign_z            text          NOT NULL, CHECK IN ('+','-','0','any')
--   composite_quality text          NULL
--   description       text          NULL
--   created_at        timestamptz   NOT NULL, default now()
--   updated_at        timestamptz   NOT NULL, default now()
--   kind              text          NOT NULL, default 'octant',
--                                   CHECK IN ('octant','plane','axis','cap')
--
-- Existing unique constraints:
--   UNIQUE (slug)
--   UNIQUE (zone_id, sign_x, sign_y, sign_z)         <-- (1) below
--
-- (1) This composite unique constraint is the reason this migration
--     cannot simply insert two child rows per parent: the inner and
--     outer halves of a given Z3 angular sub-zone share the same
--     (zone_id, sign_x, sign_y, sign_z) tuple as their parent. We
--     therefore add a `bipyramid_side` discriminator column and rebuild
--     the composite unique constraint to include it.
--
-- Naming convention
-- -----------------
-- Option A (chosen 2026-06-01): suffix the existing live-schema slugs
-- with `.inner` and `.outer`. The existing 26 Z3 parent rows are NOT
-- renamed in place; they are marked deprecated and replaced by 52 new
-- rows.
--
-- Label convention for new rows (chosen 2026-06-01, Option C from the
-- 2026-06-01 fix planning):
--   * inner: parent.name || ' (inside bipyramid)'
--   * outer: parent.name || ' (outside bipyramid)'
-- This is unambiguous and avoids collision with the v2 "interstitial
-- shell" concept which v3.0 retired under Route B.
--
-- What this blueprint would do (if applied)
-- -----------------------------------------
--   1. Add `deprecated_at TIMESTAMPTZ` to public.sub_zones (NULL=active).
--   2. Add `bipyramid_side TEXT` to public.sub_zones with CHECK constraint
--      restricting values to {'inner','outer',NULL}. Parents and polar
--      caps keep NULL; new Z3 children carry 'inner' or 'outer'.
--   3. Drop the existing UNIQUE (zone_id, sign_x, sign_y, sign_z) and
--      replace with UNIQUE (zone_id, sign_x, sign_y, sign_z,
--                           coalesce(bipyramid_side, '_self_')) — so
--      a parent row coexists with its inner/outer children.
--      (Implemented as a UNIQUE INDEX on an expression because Postgres
--      requires real values; nulls-distinct semantics would also work
--      on PG15+ but the index-on-expression form is universal.)
--   4. For each of the 26 active Z3 parent rows, INSERT two new rows
--      copying:
--         - zone_id, sign_x, sign_y, sign_z, kind, composite_quality
--      and computing:
--         - slug = parent.slug || '.inner' or '.outer'
--         - name = parent.name || ' (inside bipyramid)' or
--                                ' (outside bipyramid)'
--         - description = parent.description appended with a Route B
--                         partition paragraph
--         - bipyramid_side = 'inner' or 'outer'
--         - deprecated_at = NULL
--   5. UPDATE the 26 parent Z3 rows SET deprecated_at = now().
--   6. The two `zone-4.{north,south}` rows are untouched.
--
-- What this blueprint would NOT do
-- --------------------------------
-- - It does NOT move any items between sub-zones. Item migration is
--   a separate concern (no items currently anchor to Z3 sub-zones; the
--   first such item is the reopening trigger for R3).
-- - It does NOT alter public.zones.
-- - It does NOT add CHECK constraints on the slug format.
-- - It does NOT add effective_period to sub_zones.
--
-- Application policy
-- ------------------
-- This file is NOT to be applied via supabase db push, psql -f, the
-- Supabase MCP apply_migration tool, or any other route, until:
--   (a) the first item is inserted with a Z3 anchor, AND
--   (b) the user explicitly approves application at that point.
--
-- If a future agent or human encounters this file during a routine
-- migration sweep: SKIP IT. Verify that the docs in
-- docs/decision-notes/2026-06-01_r1_route_b_closure.md and
-- docs/Diamond_Roadmap_v3.0.md Part II R1 still document the gating
-- condition before considering application.

-- =====================================================================
-- Begin (illustrative) SQL — DO NOT RUN without acknowledged guard
-- =====================================================================

BEGIN;

-- Guard: refuse to run unless an explicit override is set.
DO $$
BEGIN
  IF current_setting('diamond.route_b_migration.acknowledged', true)
       IS DISTINCT FROM 'yes'
  THEN
    RAISE EXCEPTION
      'Migration 0015 is a blueprint. To apply, set '
      '`SET diamond.route_b_migration.acknowledged = ''yes'';` '
      'in the same session after confirming the gating conditions in '
      'docs/decision-notes/2026-06-01_r1_route_b_closure.md.';
  END IF;
END
$$;

-- ---------------------------------------------------------------------
-- Step 1. Add deprecated_at column (idempotent).
-- ---------------------------------------------------------------------

ALTER TABLE public.sub_zones
  ADD COLUMN IF NOT EXISTS deprecated_at TIMESTAMPTZ;

COMMENT ON COLUMN public.sub_zones.deprecated_at IS
  'Set when a sub-zone is retired in favour of finer-grained children. '
  'NULL = active. First used by migration 0015 (Route B Z3 partition).';

-- ---------------------------------------------------------------------
-- Step 2. Add bipyramid_side column with check constraint (idempotent).
-- ---------------------------------------------------------------------

ALTER TABLE public.sub_zones
  ADD COLUMN IF NOT EXISTS bipyramid_side TEXT;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conname = 'sub_zones_bipyramid_side_check'
      AND conrelid = 'public.sub_zones'::regclass
  ) THEN
    ALTER TABLE public.sub_zones
      ADD CONSTRAINT sub_zones_bipyramid_side_check
      CHECK (bipyramid_side IS NULL
             OR bipyramid_side IN ('inner', 'outer'));
  END IF;
END
$$;

COMMENT ON COLUMN public.sub_zones.bipyramid_side IS
  'Route B (2026-06-01): partitions Z3 angular sub-zones into halves '
  'relative to the bipyramid |x|+|y|+|z|/phi <= 1. NULL = whole sub-zone '
  '(parent rows, polar caps, Z1, Z2). inner = inside the bipyramid; '
  'outer = outside.';

-- ---------------------------------------------------------------------
-- Step 3. Rebuild the (zone_id, sign_x, sign_y, sign_z) unique
--          constraint to include bipyramid_side, so a deprecated parent
--          row coexists with its inner/outer children.
-- ---------------------------------------------------------------------

DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conname = 'sub_zones_zone_id_sign_x_sign_y_sign_z_key'
      AND conrelid = 'public.sub_zones'::regclass
  ) THEN
    ALTER TABLE public.sub_zones
      DROP CONSTRAINT sub_zones_zone_id_sign_x_sign_y_sign_z_key;
  END IF;
END
$$;

-- Replacement: unique index on (zone_id, sign_x, sign_y, sign_z,
-- coalesce(bipyramid_side,'_self_')).
CREATE UNIQUE INDEX IF NOT EXISTS sub_zones_zone_signs_side_uniq
  ON public.sub_zones (
    zone_id,
    sign_x,
    sign_y,
    sign_z,
    COALESCE(bipyramid_side, '_self_')
  );

COMMENT ON INDEX public.sub_zones_zone_signs_side_uniq IS
  'Replaces UNIQUE (zone_id, sign_x, sign_y, sign_z) to allow a '
  'parent sub-zone row (bipyramid_side IS NULL) to coexist with its '
  'inner and outer children. Added by migration 0015 (Route B).';

-- ---------------------------------------------------------------------
-- Step 4. Insert 52 inner/outer children for each of the 26 Z3 parents.
--
-- Copies parent's zone_id, sign_x, sign_y, sign_z, kind,
-- composite_quality. Slug, name, description, bipyramid_side are
-- computed.
-- ---------------------------------------------------------------------

WITH parents AS (
  SELECT id, zone_id, slug, name, kind,
         sign_x, sign_y, sign_z, composite_quality, description
  FROM public.sub_zones
  WHERE slug LIKE 'zone-3.%'
    AND slug NOT LIKE '%.inner'
    AND slug NOT LIKE '%.outer'
    AND deprecated_at IS NULL
    AND bipyramid_side IS NULL
)
INSERT INTO public.sub_zones (
  zone_id, slug, name, kind,
  sign_x, sign_y, sign_z, composite_quality,
  description, bipyramid_side
)
SELECT
  zone_id,
  slug || '.inner',
  name || ' (inside bipyramid)',
  kind,
  sign_x, sign_y, sign_z, composite_quality,
  COALESCE(description, '')
    || E'\n\nRoute B partition (2026-06-01): inner half of '
    || slug || ', i.e. the part of this Z3 angular sub-zone that '
    || 'lies inside the bipyramid |x|+|y|+|z|/phi <= 1.',
  'inner'
FROM parents
ON CONFLICT (slug) DO NOTHING;

WITH parents AS (
  SELECT id, zone_id, slug, name, kind,
         sign_x, sign_y, sign_z, composite_quality, description
  FROM public.sub_zones
  WHERE slug LIKE 'zone-3.%'
    AND slug NOT LIKE '%.inner'
    AND slug NOT LIKE '%.outer'
    AND deprecated_at IS NULL
    AND bipyramid_side IS NULL
)
INSERT INTO public.sub_zones (
  zone_id, slug, name, kind,
  sign_x, sign_y, sign_z, composite_quality,
  description, bipyramid_side
)
SELECT
  zone_id,
  slug || '.outer',
  name || ' (outside bipyramid)',
  kind,
  sign_x, sign_y, sign_z, composite_quality,
  COALESCE(description, '')
    || E'\n\nRoute B partition (2026-06-01): outer half of '
    || slug || ', i.e. the part of this Z3 angular sub-zone that '
    || 'lies outside the bipyramid |x|+|y|+|z|/phi <= 1.',
  'outer'
FROM parents
ON CONFLICT (slug) DO NOTHING;

-- ---------------------------------------------------------------------
-- Step 5. Retire the 26 parent Z3 rows (soft-delete via deprecated_at).
-- ---------------------------------------------------------------------

UPDATE public.sub_zones
SET deprecated_at = now()
WHERE slug LIKE 'zone-3.%'
  AND slug NOT LIKE '%.inner'
  AND slug NOT LIKE '%.outer'
  AND deprecated_at IS NULL;

-- ---------------------------------------------------------------------
-- Step 6. Polar caps — NO schema change.
--
-- The two `zone-4.{north,south}` rows are deliberately untouched. The
-- v3.0 prose rename to "polar cap north" / "polar cap south" is a
-- documentation convention only.
-- ---------------------------------------------------------------------

-- ---------------------------------------------------------------------
-- Step 7. Verification queries (for the operator running the migration).
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
  ) AS polar_caps_active,
  COUNT(*) AS total_rows
FROM public.sub_zones;

-- Expected: z3_children_active = 52, z3_parents_deprecated = 26,
--           polar_caps_active = 2, total_rows = 106.

COMMIT;

-- =====================================================================
-- End of blueprint v2. Reminder: this file is NOT applied.
-- =====================================================================
