-- 0006_phi_cascade_geometry.sql
-- Vegar's Diamond — Geometry v3 (Scheme δ: φ-cascade with polar-cap Zone 4)
--
-- This migration replaces the prior Scheme α geometry with a 5-shell
-- φ-cascade where:
--
--   Shell 1 = φ⁻² ≈ 0.381966011  (zone boundary)
--   Shell 2 = φ⁻¹ ≈ 0.618033989  (zone boundary)
--   Shell 3 = 1.000000000        (zone boundary; bipyramid equatorial corners)
--   Shell 4 = φ¹   ≈ 1.618033989  (landmark anchor: bipyramid tips Awakening/Obliteration)
--   Shell 5 = φ²   ≈ 2.618033989  (landmark anchor: Birth/Death)
--
-- The bipyramid spans Shell 3 → Shell 4 along the vertical axis. Its base
-- corners are the four equatorial-axis landmarks at radius 1 (Heaven/Hell
-- on the affect axis, Past/Future on the time axis). Its tips are
-- Awakening (-z, south) and Obliteration (+z, north) at radius φ on Shell 4.
--
-- Z-axis ordering (south → north): Birth − Awakening − Meditation −
-- Contemplation − Reflection − BEING − Oppression − Excitement −
-- Acceleration − Obliteration − Death.
--
-- Birth/Death are isolated points on Shell 5 at z = ∓φ² (Birth at -z,
-- Death at +z) — beyond the bipyramid, not part of any zone volume.
-- Shell 5 is a landmark anchor only; there is no Zone 5 volume.
--
-- BEING at (0, 0, 0) is a NULL-zoned landmark — the asymptotic center
-- of the cascade, not a point in the zone structure.
--
-- ZONES (4 total, computed from coordinates via compute_zone() in 0007):
--   Zone 1: r ≤ φ⁻²                                          (inner ball)
--   Zone 2: φ⁻² < r ≤ φ⁻¹                                    (spherical shell)
--   Zone 3: φ⁻¹ < r ≤ 1                                      (spherical shell)
--   Zone 4: r > 1 AND |x|+|y|+|z|/φ ≤ 1                      (polar caps only)
--   NULL:   everything else (outside the diamond)
--
-- This migration:
--   1. Adds a `role` column to `shells` distinguishing zone_boundary from
--      landmark_anchor.
--   2. Updates shell slugs and radii to the new 5-shell scheme.
--   3. Deletes 6 obsolete inner-tier vertical coordinate rows
--      (Oppression, Excitement, Intensity, Reflection, Meditation, Insight).
--      Their semantic weight moves to zone-quality metadata (added in 0007).
--   4. Deletes the Love and Hate coordinate rows. The semantic content
--      moves to Zone-3 affect-quality metadata. The points where the affect
--      axis meets Shell 3 are renamed/replaced as Heaven (+x) and Hell (-x).
--   5. Adds Awakening (0, 0, +φ) and Obliteration (0, 0, -φ) as new
--      coordinate rows on Shell 4 (the bipyramid tips).
--   6. Moves Birth/Death from their current Shell 4 position (z = ±φ) to
--      the new Shell 5 (z = ±φ²).
--   7. Past/Future stay at (0, ±1, 0) on Shell 3 — landmark coordinate
--      rows where the time axis meets Shell 3.
--   8. Adds a `landmark_type` column to coordinates distinguishing the
--      different kinds of named points (origin, equatorial-landmark,
--      bipyramid-tip, outer-landmark).
--
-- All changes are wrapped in a single transaction. To revert, restore from
-- a Supabase point-in-time snapshot taken before this migration.

set search_path = public, extensions;

begin;

-------------------------------------------------------------------------------
-- 0. Safety check — refuse to run if any source_positions point at coordinates
--    we're about to delete or move. (source_positions has ON DELETE RESTRICT
--    so this would fail anyway; the explicit check produces a clearer error.)
-------------------------------------------------------------------------------
do $$
declare
  blocking_count int;
begin
  select count(*) into blocking_count
  from source_positions sp
  join coordinates c on c.id = sp.coordinate_id
  where c.slug in (
    'love','hate',
    'oppression','excitement','intensity',
    'reflection','meditation','insight'
  );
  if blocking_count > 0 then
    raise exception
      'Migration blocked: % source_positions row(s) reference coordinates that this migration deletes. Resolve those positions first.',
      blocking_count;
  end if;
end $$;

-------------------------------------------------------------------------------
-- 1. Add `role` column to `shells` table
-------------------------------------------------------------------------------
alter table shells
  add column if not exists role text not null default 'zone_boundary'
    check (role in ('zone_boundary', 'landmark_anchor'));

-- Drop the `is_inner` boolean — it no longer carries useful information.
-- Shells 1, 2 are inner; Shell 3 is the equator; Shells 4, 5 are landmark anchors.
-- All shells have meaningful but different roles now.
alter table shells drop column if exists is_inner;

-------------------------------------------------------------------------------
-- 2. Update shells: rename slugs, set new radii and roles, add Shell 5
-------------------------------------------------------------------------------
-- The existing 5 shells under their old slugs:
--   inner-3 (was 0.236067977)  → shell-1 (φ⁻², zone_boundary)
--   inner-2 (was 0.381966011)  → shell-1 keeps existing radius if equal? no — we want exact φ⁻²
--   inner-1 (was 0.618033989)  → shell-2 (φ⁻¹, zone_boundary)
--   sphere  (was 1.000000000)  → shell-3 (1, zone_boundary)
--   phi-tier (was 1.618033989) → shell-4 (φ, landmark_anchor)
--   (new)                       → shell-5 (φ², landmark_anchor)
--
-- We rename incrementally to avoid unique-slug collisions during the swap.
-- First, prefix all existing slugs with 'old-' to free the new namespace.

update shells set slug = 'old-' || slug;

-- Now insert / update / delete to land on the new 5-shell layout.

-- Old inner-3 (was 0.236) was at innermost position — REPURPOSE as shell-1 (φ⁻² ≈ 0.382).
update shells
   set slug   = 'shell-1',
       name   = 'Shell 1 (φ⁻²)',
       radius = 0.381966011,
       ord    = 1,
       role   = 'zone_boundary',
       description = 'Inner zone boundary at radius φ⁻². Separates Zone 1 (inner ball) from Zone 2.'
 where slug = 'old-inner-3';

-- Old inner-2 (was 0.382) — REPURPOSE as shell-2 (φ⁻¹ ≈ 0.618).
update shells
   set slug   = 'shell-2',
       name   = 'Shell 2 (φ⁻¹)',
       radius = 0.618033989,
       ord    = 2,
       role   = 'zone_boundary',
       description = 'Zone boundary at radius φ⁻¹. Separates Zone 2 from Zone 3.'
 where slug = 'old-inner-2';

-- Old inner-1 (was 0.618) — REPURPOSE as shell-3 (1.0, the unit sphere).
update shells
   set slug   = 'shell-3',
       name   = 'Shell 3 (unit sphere)',
       radius = 1.000000000,
       ord    = 3,
       role   = 'zone_boundary',
       description = 'The unit sphere. Outer boundary of Zone 3. The four equatorial landmarks (Heaven, Hell, Past, Future) sit on this shell. The bipyramid equatorial corners coincide with these landmarks.'
 where slug = 'old-inner-1';

-- Old sphere (was 1.0) — REPURPOSE as shell-4 (φ ≈ 1.618, bipyramid tips anchor).
update shells
   set slug   = 'shell-4',
       name   = 'Shell 4 (φ)',
       radius = 1.618033989,
       ord    = 4,
       role   = 'landmark_anchor',
       description = 'Landmark anchor at radius φ. The bipyramid tips (Awakening at -z, Obliteration at +z) sit on this shell along the vertical axis. Not a zone boundary.'
 where slug = 'old-sphere';

-- Old phi-tier (was 1.618) — REPURPOSE as shell-5 (φ² ≈ 2.618, Birth/Death anchor).
update shells
   set slug   = 'shell-5',
       name   = 'Shell 5 (φ²)',
       radius = 2.618033989,
       ord    = 5,
       role   = 'landmark_anchor',
       description = 'Landmark anchor at radius φ². Birth (-z, south) and Death (+z, north) sit on this shell along the vertical axis. Not a zone boundary; no Zone 5 volume exists.'
 where slug = 'old-phi-tier';

-- Sanity check: there should be no 'old-' shells remaining.
do $$
declare
  remaining int;
begin
  select count(*) into remaining from shells where slug like 'old-%';
  if remaining > 0 then
    raise exception 'Migration error: % shells still have old- prefix after rename', remaining;
  end if;
end $$;

-------------------------------------------------------------------------------
-- 3. Add landmark_type column to coordinates
-------------------------------------------------------------------------------
alter table coordinates
  add column if not exists landmark_type text
    check (landmark_type in ('origin', 'equatorial_landmark', 'bipyramid_tip', 'outer_landmark'));

-- The old `is_origin` and `is_pole` booleans are subsumed by landmark_type
-- but we keep them in case any view/code depends on them. They'll be updated
-- alongside landmark_type below.

-------------------------------------------------------------------------------
-- 4. Delete the 6 obsolete inner-tier vertical coordinates
-------------------------------------------------------------------------------
delete from coordinates
 where slug in (
   'oppression', 'excitement', 'intensity',
   'reflection', 'meditation', 'insight'
 );

-------------------------------------------------------------------------------
-- 5. Delete the Love and Hate coordinate rows
-------------------------------------------------------------------------------
-- Their semantic content moves to Zone-3 affect-quality metadata (added in 0007).
-- The points at (±1, 0, 0) are filled by the new Heaven/Hell landmarks below.
delete from coordinates where slug in ('love', 'hate');

-------------------------------------------------------------------------------
-- 6. Insert new landmark coordinates: Heaven, Hell, Awakening, Obliteration
-------------------------------------------------------------------------------

-- Heaven (+x) and Hell (-x) — where the affect axis meets Shell 3.
insert into coordinates (slug, name, axis_id, shell_id, x, y, z, is_origin, is_pole, landmark_type, description)
select 'heaven', 'Heaven',
       a.id, s.id,
       1.0, 0, 0,
       false, true, 'equatorial_landmark',
       'Landmark where the affect axis meets Shell 3 in the +x direction. Coincides with the bipyramid''s equatorial corner toward Love. Provisional proper-noun name; the Zone-3 affect-quality at this location is Love.'
from axes a, shells s
where a.slug = 'affect' and s.slug = 'shell-3';

insert into coordinates (slug, name, axis_id, shell_id, x, y, z, is_origin, is_pole, landmark_type, description)
select 'hell', 'Hell',
       a.id, s.id,
       -1.0, 0, 0,
       false, true, 'equatorial_landmark',
       'Landmark where the affect axis meets Shell 3 in the -x direction. Coincides with the bipyramid''s equatorial corner toward Hate. Provisional proper-noun name; the Zone-3 affect-quality at this location is Hate.'
from axes a, shells s
where a.slug = 'affect' and s.slug = 'shell-3';

-- Awakening (-z, south) and Obliteration (+z, north) — the bipyramid tips on Shell 4.
-- The descending half of the vertical axis (toward Birth) is the contemplative /
-- dissolving axis; Awakening sits at its bipyramid-tip extremum. The ascending
-- half (toward Death) is the intensifying / activating axis; Obliteration sits
-- at its bipyramid-tip extremum.
insert into coordinates (slug, name, axis_id, shell_id, x, y, z, is_origin, is_pole, landmark_type, description)
select 'awakening', 'Awakening',
       a.id, s.id,
       0, 0, -1.618033989,
       false, true, 'bipyramid_tip',
       'The -z (south) tip of the bipyramid at radius φ on Shell 4. Terminus of the contemplative / dissolving half of the vertical axis (Reflection → Contemplation → Meditation → Awakening); beyond this lies Birth at radius φ².'
from axes a, shells s
where a.slug = 'vertical' and s.slug = 'shell-4';

insert into coordinates (slug, name, axis_id, shell_id, x, y, z, is_origin, is_pole, landmark_type, description)
select 'obliteration', 'Obliteration',
       a.id, s.id,
       0, 0, 1.618033989,
       false, true, 'bipyramid_tip',
       'The +z (north) tip of the bipyramid at radius φ on Shell 4. Terminus of the intensifying / activating half of the vertical axis (Oppression → Excitement → Acceleration → Obliteration); beyond this lies Death at radius φ².'
from axes a, shells s
where a.slug = 'vertical' and s.slug = 'shell-4';

-------------------------------------------------------------------------------
-- 7. Update Birth and Death — move from Shell 4 (φ) to Shell 5 (φ²)
-------------------------------------------------------------------------------
update coordinates
   set z          =  2.618033989,
       shell_id   = (select id from shells where slug = 'shell-5'),
       landmark_type = 'outer_landmark',
       description = 'Outermost point on the +z (north) half of the vertical axis at radius φ² on Shell 5. Beyond Obliteration; beyond the bipyramid envelope — a landmark anchor with no surrounding zone volume.'
 where slug = 'death';

update coordinates
   set z          = -2.618033989,
       shell_id   = (select id from shells where slug = 'shell-5'),
       landmark_type = 'outer_landmark',
       description = 'Outermost point on the -z (south) half of the vertical axis at radius φ² on Shell 5. Beyond Awakening; beyond the bipyramid envelope — a landmark anchor with no surrounding zone volume.'
 where slug = 'birth';

-------------------------------------------------------------------------------
-- 8. Update Past/Future — stay at (0, ±1, 0) but ensure shell_id points at shell-3
-------------------------------------------------------------------------------
update coordinates
   set shell_id   = (select id from shells where slug = 'shell-3'),
       landmark_type = 'equatorial_landmark',
       description = 'Landmark where the time axis meets Shell 3 in the +y direction. Coincides with a bipyramid equatorial corner. Quality-name and landmark-name are the same: Future is uniform on the time axis across all zones.'
 where slug = 'future';

update coordinates
   set shell_id   = (select id from shells where slug = 'shell-3'),
       landmark_type = 'equatorial_landmark',
       description = 'Landmark where the time axis meets Shell 3 in the -y direction. Coincides with a bipyramid equatorial corner. Quality-name and landmark-name are the same: Past is uniform on the time axis across all zones.'
 where slug = 'past';

-------------------------------------------------------------------------------
-- 9. Update BEING — origin, no shell, NULL-zoned landmark
-------------------------------------------------------------------------------
update coordinates
   set x = 0, y = 0, z = 0,
       shell_id   = null,
       axis_id    = null,
       landmark_type = 'origin',
       description = 'The still center at the origin (0, 0, 0). Asymptotic limit of the φ-cascade — what the inner shells converge toward, not a point in the zone structure. NULL-zoned.'
 where slug = 'being';

-------------------------------------------------------------------------------
-- 10. Verify final state
-------------------------------------------------------------------------------
-- Expected after this migration:
--   * 5 shells: shell-1 (0.382), shell-2 (0.618), shell-3 (1.0), shell-4 (φ), shell-5 (φ²)
--   * 9 coordinates: BEING, Heaven, Hell, Past, Future, Awakening, Obliteration, Birth, Death

do $$
declare
  shell_count int;
  coord_count int;
  expected_shells text[] := array['shell-1','shell-2','shell-3','shell-4','shell-5'];
  expected_coords text[] := array['being','heaven','hell','past','future','awakening','obliteration','birth','death'];
  missing text;
begin
  select count(*) into shell_count from shells;
  if shell_count != 5 then
    raise exception 'Migration error: expected 5 shells after migration, found %', shell_count;
  end if;

  select count(*) into coord_count from coordinates;
  if coord_count != 9 then
    raise exception 'Migration error: expected 9 coordinates after migration, found %', coord_count;
  end if;

  foreach missing in array expected_shells loop
    if not exists (select 1 from shells where slug = missing) then
      raise exception 'Migration error: missing expected shell slug %', missing;
    end if;
  end loop;

  foreach missing in array expected_coords loop
    if not exists (select 1 from coordinates where slug = missing) then
      raise exception 'Migration error: missing expected coordinate slug %', missing;
    end if;
  end loop;
end $$;

commit;

-- After running this migration, inspect the final geometry with:
--
--   select c.slug, c.name, c.x, c.y, c.z, c.landmark_type, s.slug as shell, s.radius
--   from coordinates c
--   left join shells s on s.id = c.shell_id
--   order by s.ord nulls first, c.z, c.x, c.y;
