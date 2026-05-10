-- 0004_seed_geometry.sql
-- Vegar's Diamond — Phase 1 schema, migration 4 of 4
-- Seeds the locked geometry only: 3 axes, 5 shells, 8 coordinates
-- (BEING + 6 axis poles + the 6 inner-tier names = 13 total, but we group
-- "axis poles" as the 6 named ones at the φ/equatorial radii).
--
-- We do NOT seed any sources, source_positions, resonances, prose_sections,
-- or glossary_terms here. Those are content, not geometry, and wait for the
-- import script + your direction from the Roadmap thread.

set search_path = public, extensions;

-------------------------------------------------------------------------------
-- axes  (3 rows)
-------------------------------------------------------------------------------
insert into axes (slug, name, description, positive_pole, negative_pole, ord) values
  ('vertical', 'Vertical', 'The contemplative axis. Birth at nadir, Death at apex; the lower piercing (Awakening) and upper piercing (Obliteration) lie just past the φ-tier.', 'Death', 'Birth', 1),
  ('affect',   'Affect',   'The equatorial axis of valence. Hate at one pole, Love at the other; flush with the sphere at radius 1.0.', 'Love',  'Hate', 2),
  ('time',     'Time',     'Past at one pole, Future at the other; the present lives at BEING (the only point all three axes meet).', 'Future', 'Past', 3);

-------------------------------------------------------------------------------
-- shells  (5 rows: 3 inner + sphere + φ-tier)
-------------------------------------------------------------------------------
-- Numeric values use 9 decimal places; the front-end can re-derive from φ
-- analytically if it wants exact, but these match Scheme α to ~nm precision.
insert into shells (slug, name, radius, ord, is_inner, description) values
  ('inner-3',  'Inner Shell 3 (1/φ³)', 0.236067977, 1, true,  'Innermost named shell; closest to BEING. Lines fade here under the breath rule.'),
  ('inner-2',  'Inner Shell 2 (1/φ²)', 0.381966011, 2, true,  'Middle inner shell.'),
  ('inner-1',  'Inner Shell 1 (1/φ)',  0.618033989, 3, true,  'Outer inner shell.'),
  ('sphere',   'Equatorial Sphere',    1.000000000, 4, false, 'The unit sphere; equatorial axis poles (Hate, Love, Past, Future) sit on this surface.'),
  ('phi-tier', 'φ-Tier',               1.618033989, 5, false, 'The φ shell; Birth (nadir) and Death (apex) sit on this radius along the vertical axis.');

-------------------------------------------------------------------------------
-- coordinates  (13 rows: BEING, 6 axis poles, 6 inner-tier names)
-------------------------------------------------------------------------------
-- BEING is the origin (0,0,0), is_origin=true, no axis, no shell.
insert into coordinates (slug, name, axis_id, shell_id, position, is_origin, is_pole, description) values
  ('being', 'BEING',
    null, null,
    st_makepoint(0, 0, 0)::geometry(PointZ, 0),
    true, false,
    'The centre that holds. The only point at which all three axes meet; the position from which a self can be named.');

-- Axis poles. Affect and time poles at ±1.0; vertical poles (Birth/Death) at ±φ.
insert into coordinates (slug, name, axis_id, shell_id, position, is_origin, is_pole, description)
select 'love',   'Love',   a.id, s.id, st_makepoint( 1.0, 0, 0)::geometry(PointZ, 0), false, true, 'Positive pole of the affect axis; equatorial.'
from axes a, shells s where a.slug='affect' and s.slug='sphere'
union all
select 'hate',   'Hate',   a.id, s.id, st_makepoint(-1.0, 0, 0)::geometry(PointZ, 0), false, true, 'Negative pole of the affect axis; equatorial.'
from axes a, shells s where a.slug='affect' and s.slug='sphere'
union all
select 'future', 'Future', a.id, s.id, st_makepoint(0,  1.0, 0)::geometry(PointZ, 0), false, true, 'Positive pole of the time axis; equatorial.'
from axes a, shells s where a.slug='time' and s.slug='sphere'
union all
select 'past',   'Past',   a.id, s.id, st_makepoint(0, -1.0, 0)::geometry(PointZ, 0), false, true, 'Negative pole of the time axis; equatorial.'
from axes a, shells s where a.slug='time' and s.slug='sphere'
union all
select 'death',  'Death',  a.id, s.id, st_makepoint(0, 0,  1.618033989)::geometry(PointZ, 0), false, true, 'Apex of the vertical axis; on the φ-tier. Just past lies the upper piercing (Obliteration).'
from axes a, shells s where a.slug='vertical' and s.slug='phi-tier'
union all
select 'birth',  'Birth',  a.id, s.id, st_makepoint(0, 0, -1.618033989)::geometry(PointZ, 0), false, true, 'Nadir of the vertical axis; on the φ-tier. Just past lies the lower piercing (Awakening).'
from axes a, shells s where a.slug='vertical' and s.slug='phi-tier';

-- Inner-tier vertical names. Above BEING (toward Death): Oppression, Excitement, Intensity at 1/φ³, 1/φ², 1/φ.
-- Below BEING (toward Birth):                         Reflection, Meditation, Insight at 1/φ³, 1/φ², 1/φ.
-- Per Diamond_Changelist tier 3.5, these names need rationales — left blank here, populated via Directus later.
insert into coordinates (slug, name, axis_id, shell_id, position, is_origin, is_pole, description)
select 'oppression', 'Oppression', a.id, s.id, st_makepoint(0, 0,  0.236067977)::geometry(PointZ, 0), false, false, 'Upper inner-tier-3 vertical position. Stipulated; rationale pending.'
from axes a, shells s where a.slug='vertical' and s.slug='inner-3'
union all
select 'excitement', 'Excitement', a.id, s.id, st_makepoint(0, 0,  0.381966011)::geometry(PointZ, 0), false, false, 'Upper inner-tier-2 vertical position. Stipulated; rationale pending.'
from axes a, shells s where a.slug='vertical' and s.slug='inner-2'
union all
select 'intensity',  'Intensity',  a.id, s.id, st_makepoint(0, 0,  0.618033989)::geometry(PointZ, 0), false, false, 'Upper inner-tier-1 vertical position. Stipulated; rationale pending.'
from axes a, shells s where a.slug='vertical' and s.slug='inner-1'
union all
select 'reflection', 'Reflection', a.id, s.id, st_makepoint(0, 0, -0.236067977)::geometry(PointZ, 0), false, false, 'Lower inner-tier-3 vertical position. Stipulated; rationale pending.'
from axes a, shells s where a.slug='vertical' and s.slug='inner-3'
union all
select 'meditation', 'Meditation', a.id, s.id, st_makepoint(0, 0, -0.381966011)::geometry(PointZ, 0), false, false, 'Lower inner-tier-2 vertical position. Stipulated; rationale pending.'
from axes a, shells s where a.slug='vertical' and s.slug='inner-2'
union all
select 'insight',    'Insight',    a.id, s.id, st_makepoint(0, 0, -0.618033989)::geometry(PointZ, 0), false, false, 'Lower inner-tier-1 vertical position. Stipulated; rationale pending.'
from axes a, shells s where a.slug='vertical' and s.slug='inner-1';
