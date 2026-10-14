-- 0016_revival_cleanup.sql
-- The Diamond — revival clean-up (2026-10-14)
--
-- Authored under: Spec v3.1 §4.6 (exactness rule), §5 (φ-cascade) and
-- §9 (fully-private schema posture); Roadmap v3.1 Part III, "Revival
-- clean-up". User instruction 2026-10-14: "Clean up all unused or
-- unecessary files and proceed."
--
-- Every step is idempotent, so db-push can re-run this file safely.
--
-- 1. Drop the 29 `directus_*` tables. Directus was retired on 2026-10-14
--    (its Railway deployment no longer exists). The tables held only
--    Directus's own configuration, activity log, sessions and admin
--    user. Checked 2026-10-14: no foreign key links them to any Diamond
--    table in either direction. Migrations 0010 and 0012 loop over
--    whatever tables exist, so they remain valid after this drop.
--
-- 2. Drop the two `*_public_read` policies on `zones` and `sub_zones`.
--    They were never created by a repo migration and had no effect
--    (anon and authenticated hold no table grants since 0010), but they
--    contradicted the fully-private posture of Spec §9.
--
-- 3. Store the φ-cascade at full precision. The baseline (0001) seeded
--    9-decimal truncations such as 1.618033989. `shells.radius`
--    (numeric; restored from a drifted numeric(12,9)) receives the
--    closed forms to 30 decimals; the landmark
--    `coordinates.z` values (double precision) receive the nearest
--    double. Closed forms: φ⁻² = (3 − √5)/2, φ⁻¹ = (√5 − 1)/2,
--    φ = (1 + √5)/2, φ² = (3 + √5)/2.
--
-- Not changed: `coordinates.is_pole` stays true for the six axis-terminal
-- landmarks and for Birth and Death; the Spec itself calls Heaven the
-- "+X pole" (§3.1), so the flag reads as "axis terminus". Birth and Death
-- need no schema change to be Class H (§6.24.2 schema fit: Class H labels
-- are named in `coordinates.name` and, once content exists, as `items`
-- of kind `concept`); `compute_zone` already returns NULL for them.

-- 1 ─ Directus tables -------------------------------------------------
DO $$
DECLARE t record;
BEGIN
  FOR t IN
    SELECT tablename FROM pg_tables
    WHERE schemaname = 'public' AND tablename LIKE 'directus\_%'
  LOOP
    EXECUTE format('DROP TABLE IF EXISTS public.%I CASCADE', t.tablename);
  END LOOP;
END $$;

-- 2 ─ Inert public-read policies ---------------------------------------
DROP POLICY IF EXISTS zones_public_read     ON public.zones;
DROP POLICY IF EXISTS sub_zones_public_read ON public.sub_zones;

-- 3 ─ Full-precision φ-cascade -----------------------------------------
-- The live column had drifted to numeric(12,9), which rounds every value
-- back to 9 decimals; the baseline (0001) declares plain numeric. Restore
-- the baseline type first (no views or constraints depend on the column).
-- Added 2026-10-14 after the first run of this file; idempotent.
ALTER TABLE public.shells ALTER COLUMN radius TYPE numeric;

UPDATE public.shells SET radius = CASE slug
    WHEN 'shell-1' THEN round((3 - sqrt(5.00000000000000000000000000000000000000000000000000)) / 2, 30)
    WHEN 'shell-2' THEN round((sqrt(5.00000000000000000000000000000000000000000000000000) - 1) / 2, 30)
    WHEN 'shell-3' THEN 1
    WHEN 'shell-4' THEN round((1 + sqrt(5.00000000000000000000000000000000000000000000000000)) / 2, 30)
    WHEN 'shell-5' THEN round((3 + sqrt(5.00000000000000000000000000000000000000000000000000)) / 2, 30)
  END
WHERE slug IN ('shell-1', 'shell-2', 'shell-3', 'shell-4', 'shell-5');

UPDATE public.coordinates SET z = CASE slug
    WHEN 'obliteration' THEN  (1 + sqrt(5::float8)) / 2
    WHEN 'awakening'    THEN -(1 + sqrt(5::float8)) / 2
    WHEN 'death'        THEN  (3 + sqrt(5::float8)) / 2
    WHEN 'birth'        THEN -(3 + sqrt(5::float8)) / 2
  END
WHERE slug IN ('obliteration', 'awakening', 'death', 'birth');
