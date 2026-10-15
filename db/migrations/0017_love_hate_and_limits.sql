-- 0017_love_hate_and_limits.sql
-- The Diamond — Love and Hate replace Heaven and Hell; Birth and Death
-- become limits (2026-10-15)
--
-- Authored under: Spec v3.3 §3.1, §3.2 and §3.3. User decisions
-- 2026-10-15, verbatim:
--   "We will let go of heaven and hell, and change to the following:
--    Hate–Fear–Aversion-BEING-Attraction–Desire–Love"
--   "Birth and Death are to be a category onto themselves."
--   "Birth and Death should not be visible in the FPV. [...] You cannot
--    comprehend those from the first person perspective, only Awakening
--    and Obliteration."
--
-- Every step is idempotent, so db-push can re-run this file safely.
--
-- 1. The two landmarks at (±1, 0, 0) on Shell 3 are renamed: heaven →
--    love (+x) and hell → hate (−x). Their ids, positions, shell, axis and
--    landmark_type are unchanged, so nothing that refers to them by id is
--    affected. Checked 2026-10-15: no function, view or other row refers
--    to the slugs 'heaven' or 'hell', and `items` (whose
--    anchor_coordinate_slug refers to coordinates.slug) is empty. The
--    affect axis (`axes.affect`) and the sub-zone composite qualities
--    already read Hate / Love, Fear / Desire and Aversion / Attraction,
--    so they need no change.
--
--    Re-runs: db-push re-applies every file, and the baseline (0001)
--    seeds 'heaven' and 'hell' with `on conflict (slug) do nothing`, so
--    after the rename each later run of 0001 inserts them again as new
--    rows. This file therefore first deletes any 'heaven' or 'hell' row
--    when 'love' or 'hate' already exists (such a row is minutes old and
--    nothing can refer to it), then renames. The first run renames the
--    original rows, keeping their ids; every later run removes the
--    re-seeded copies, leaving nine coordinates.
--
-- 2. The Zone 3 and Shell 3 descriptions name the four equatorial
--    landmarks; they now read Love, Hate, Past, Future.
--
-- 3. The Birth and Death descriptions record that they are limits, a
--    category of their own. Their `landmark_type` stays 'outer_landmark',
--    which already sets them apart from every other landmark, so the
--    check constraint needs no change.
--
-- Not changed: `shells.role` already marks Shells 1–3 'zone_boundary' and
-- Shells 4–5 'landmark_anchor', which matches the decision that Shells 4
-- and 5 are anchors only.

-- 1 ─ Love and Hate ----------------------------------------------------
DELETE FROM public.coordinates WHERE slug = 'heaven'
  AND EXISTS (SELECT 1 FROM public.coordinates WHERE slug = 'love');
DELETE FROM public.coordinates WHERE slug = 'hell'
  AND EXISTS (SELECT 1 FROM public.coordinates WHERE slug = 'hate');

UPDATE public.coordinates SET slug = 'love', name = 'Love' WHERE slug = 'heaven';
UPDATE public.coordinates SET slug = 'hate', name = 'Hate' WHERE slug = 'hell';

UPDATE public.coordinates SET description =
  'Landmark where the affect axis meets Shell 3 in the +x direction. Coincides with a bipyramid equatorial corner. Quality-name and landmark-name are the same: Love is the Zone-3 affect-quality toward +x and the end of the axis (Hate – Fear – Aversion – BEING – Attraction – Desire – Love).'
WHERE slug = 'love';

UPDATE public.coordinates SET description =
  'Landmark where the affect axis meets Shell 3 in the -x direction. Coincides with a bipyramid equatorial corner. Quality-name and landmark-name are the same: Hate is the Zone-3 affect-quality toward -x and the end of the axis (Hate – Fear – Aversion – BEING – Attraction – Desire – Love).'
WHERE slug = 'hate';

-- 2 ─ Zone 3 and Shell 3 -----------------------------------------------
UPDATE public.zones SET description =
  'The outermost spherical zone, bounded by the unit sphere. Strong commitment: acceleration and meditation, love and hate. The four equatorial landmarks (Love, Hate, Past, Future) sit on its outer boundary.'
WHERE slug = 'zone-3';

UPDATE public.shells SET description =
  'The unit sphere. Outer boundary of Zone 3. The four equatorial landmarks (Love, Hate, Past, Future) sit on this shell. The bipyramid equatorial corners coincide with these landmarks.'
WHERE slug = 'shell-3';

-- 3 ─ Birth and Death as limits ----------------------------------------
UPDATE public.coordinates SET description =
  'Outermost point on the -z (south) half of the vertical axis at radius φ² on Shell 5. Beyond Awakening; beyond the bipyramid envelope — a landmark anchor with no surrounding zone volume. A limit: Birth and Death are a category of their own and are not seen from the first-person view at BEING.'
WHERE slug = 'birth';

UPDATE public.coordinates SET description =
  'Outermost point on the +z (north) half of the vertical axis at radius φ² on Shell 5. Beyond Obliteration; beyond the bipyramid envelope — a landmark anchor with no surrounding zone volume. A limit: Birth and Death are a category of their own and are not seen from the first-person view at BEING.'
WHERE slug = 'death';
