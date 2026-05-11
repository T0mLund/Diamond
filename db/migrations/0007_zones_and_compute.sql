-- 0007_zones_and_compute.sql
-- Vegar's Diamond — Geometry v3 (Scheme δ): zones, sub-zones, and the
-- compute_zone() classification function.
--
-- This migration adds the zone-classification layer on top of the φ-cascade
-- geometry established in 0006. Zones and sub-zones are stored as metadata
-- (names, quality labels, descriptions); zone membership for any point is
-- COMPUTED at read time from its (x, y, z) via compute_zone() — never stored
-- per-point. This guarantees no drift between a point's coordinates and its
-- zone classification.
--
-- ZONES (4 total):
--   Zone 1: r ≤ φ⁻²                                          (inner ball)
--   Zone 2: φ⁻² < r ≤ φ⁻¹                                    (spherical shell)
--   Zone 3: φ⁻¹ < r ≤ 1                                      (spherical shell)
--   Zone 4: r > 1 AND |x|+|y|+|z|/φ ≤ 1                      (polar caps)
--   NULL:   everything else (BEING, Birth, Death, exterior)
--
-- SUB-ZONES:
--   Zones 1, 2, 3 each have 8 sub-zones (one per octant of x,y,z signs)
--   Zone 4 has 2 sub-zones (north for z>0, south for z<0)
--   Total: 26 sub-zones
--
-- Z-AXIS ORIENTATION (south → north):
--   Birth (-φ²) − Awakening (-φ) − Meditation − Contemplation − Reflection
--   − BEING (0) − Oppression − Excitement − Acceleration − Obliteration (+φ)
--   − Death (+φ²)
--
-- The descending half (toward Birth) is the contemplative / dissolving axis;
-- the ascending half (toward Death) is the intensifying / activating axis.
--
-- QUALITY LABELS (per zone, by axis; negative-pole / positive-pole):
--   Zone 1: vertical Reflection (-z) / Oppression (+z),
--           affect   Aversion   (-x) / Attraction (+x),
--           time     Past       (-y) / Future     (+y)
--   Zone 2: vertical Contemplation (-z) / Excitement (+z),
--           affect   Fear          (-x) / Desire     (+x),
--           time     Past          (-y) / Future     (+y)
--   Zone 3: vertical Meditation (-z) / Acceleration (+z),
--           affect   Hate       (-x) / Love         (+x),
--           time     Past       (-y) / Future       (+y)
--   Zone 4: south cap (-z) → Awakening,  north cap (+z) → Obliteration
--           (landmark-named tips, not axis-paired quality labels)
--
-- All changes wrapped in a single transaction.

set search_path = public, extensions;

begin;

-------------------------------------------------------------------------------
-- 1. Constants helper — store φ once for clarity in function bodies below
-------------------------------------------------------------------------------
-- φ = (1 + sqrt(5)) / 2 ≈ 1.6180339887498949
-- Used as a literal in the function body to avoid an extra table lookup.

-------------------------------------------------------------------------------
-- 2. zones table
-------------------------------------------------------------------------------
create table zones (
  id              uuid primary key default gen_random_uuid(),
  slug            text not null unique,            -- 'zone-1' .. 'zone-4'
  name            text not null,                   -- 'Zone 1' .. 'Zone 4'
  ord             smallint not null unique,        -- 1..4

  -- Geometric definition (descriptive — the canonical test is compute_zone())
  membership_rule text not null,                   -- human-readable rule

  -- Quality labels (by axis). Pair-encoded as "{negative} / {positive}" with
  -- the positive pole being the +axis direction. NULLable because Zone 4
  -- has no axis-paired qualities (it has named tips instead).
  vertical_neg    text,                            -- e.g. 'Reflection'   (-z direction; Zone 1)
  vertical_pos    text,                            -- e.g. 'Oppression'   (+z direction; Zone 1)
  affect_neg      text,                            -- e.g. 'Aversion'     (-x direction; Zone 1)
  affect_pos      text,                            -- e.g. 'Attraction'   (+x direction; Zone 1)
  time_neg        text,                            -- e.g. 'Past'         (-y direction)
  time_pos        text,                            -- e.g. 'Future'       (+y direction)

  description     text,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

create trigger zones_set_updated_at
  before update on zones
  for each row execute function extensions.moddatetime(updated_at);

-------------------------------------------------------------------------------
-- 3. Seed zones
-------------------------------------------------------------------------------
-- Note on quality-pair conventions:
--   {neg}_{name} holds the quality at the -axis-direction pole,
--   {pos}_{name} holds the quality at the +axis-direction pole.
--
--   z-axis (vertical), confirmed orientation:
--     Zone 1:  Reflection (-z)   ↔ Oppression  (+z)
--     Zone 2:  Contemplation(-z) ↔ Excitement  (+z)
--     Zone 3:  Meditation (-z)   ↔ Acceleration(+z)
--   x-axis (affect):
--     Zone 1:  Aversion (-x)     ↔ Attraction  (+x)
--     Zone 2:  Fear      (-x)    ↔ Desire      (+x)
--     Zone 3:  Hate      (-x)    ↔ Love        (+x)
--   y-axis (time): Past (-y) ↔ Future (+y), uniform across all zones.

insert into zones (slug, name, ord, membership_rule,
                   vertical_neg, vertical_pos,
                   affect_neg, affect_pos,
                   time_neg, time_pos,
                   description)
values
  ('zone-1', 'Zone 1', 1,
   'r ≤ φ⁻² (inner ball; radius ≤ 0.381966011)',
   'Reflection', 'Oppression',
   'Aversion',   'Attraction',
   'Past',       'Future',
   'The innermost zone surrounding BEING. Subtle differentiation: the conditions immediately adjacent to the still center.'),

  ('zone-2', 'Zone 2', 2,
   'φ⁻² < r ≤ φ⁻¹ (spherical shell; 0.381966011 < r ≤ 0.618033989)',
   'Contemplation', 'Excitement',
   'Fear',          'Desire',
   'Past',          'Future',
   'The middle zone. Intermediate intensification: contemplation and excitement, desire and fear.'),

  ('zone-3', 'Zone 3', 3,
   'φ⁻¹ < r ≤ 1 (spherical shell; 0.618033989 < r ≤ 1.000000000)',
   'Meditation', 'Acceleration',
   'Hate',       'Love',
   'Past',       'Future',
   'The outermost spherical zone, bounded by the unit sphere. Strong commitment: acceleration and meditation, love and hate. The four equatorial landmarks (Heaven, Hell, Past, Future) sit on its outer boundary.'),

  ('zone-4', 'Zone 4', 4,
   'r > 1 AND |x|+|y|+|z|/φ ≤ 1 (the two polar caps of the bipyramid)',
   null, null,    -- Zone 4 uses landmark-named tips (Awakening/Obliteration), not axis-paired quality labels
   null, null,
   null, null,
   'The two polar caps of the bipyramid — the regions where the bipyramid extends past the unit sphere along the vertical axis. The -z (south) cap leads to Awakening; the +z (north) cap leads to Obliteration. Disconnected from each other; only reachable along the vertical axis.');

-------------------------------------------------------------------------------
-- 4. sub_zones table
-------------------------------------------------------------------------------
-- Stores the 26 sub-divisions: 8 octants for each of Zones 1-3 (24 rows),
-- plus 2 polar caps for Zone 4 (2 rows).
create table sub_zones (
  id              uuid primary key default gen_random_uuid(),
  zone_id         uuid not null references zones(id) on delete cascade,
  slug            text not null unique,           -- e.g. 'zone-1.octant-ppp', 'zone-4.north'
  name            text not null,                  -- human-readable

  -- Geometric classifier — for octants, the signs of (x, y, z).
  -- Each is one of '+', '-', or 'any' (the latter for Zone 4 sub-zones
  -- where the x/y signs don't matter).
  sign_x          text not null check (sign_x in ('+', '-', 'any')),
  sign_y          text not null check (sign_y in ('+', '-', 'any')),
  sign_z          text not null check (sign_z in ('+', '-', 'any')),

  -- Composite quality string derived from the parent zone's labels and the
  -- octant directions (e.g., 'Oppression / Attraction / Future' for Zone 1, +z+x+y).
  -- Stored for convenience; can be regenerated from zone + signs.
  composite_quality text,

  description     text,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now(),

  unique (zone_id, sign_x, sign_y, sign_z)
);

create trigger sub_zones_set_updated_at
  before update on sub_zones
  for each row execute function extensions.moddatetime(updated_at);

create index sub_zones_zone_idx on sub_zones (zone_id);

-------------------------------------------------------------------------------
-- 5. Seed sub_zones — generate 8 octants for each of Zones 1, 2, 3
-------------------------------------------------------------------------------
-- Helper: produce composite-quality string from a zone's labels and an octant.
do $$
declare
  z record;
  sx text;
  sy text;
  sz text;
  vert_label text;
  affect_label text;
  time_label text;
  composite text;
  octant_slug text;
  octant_name text;
begin
  for z in select id, slug, ord,
                  vertical_neg, vertical_pos,
                  affect_neg, affect_pos,
                  time_neg, time_pos
           from zones
           where ord in (1, 2, 3)
  loop
    foreach sx in array array['+', '-'] loop
      foreach sy in array array['+', '-'] loop
        foreach sz in array array['+', '-'] loop
          vert_label   := case sz when '+' then z.vertical_pos else z.vertical_neg end;
          affect_label := case sx when '+' then z.affect_pos   else z.affect_neg   end;
          time_label   := case sy when '+' then z.time_pos     else z.time_neg     end;
          composite    := vert_label || ' / ' || affect_label || ' / ' || time_label;
          octant_slug  := z.slug
                          || '.octant-'
                          || case sx when '+' then 'p' else 'n' end
                          || case sy when '+' then 'p' else 'n' end
                          || case sz when '+' then 'p' else 'n' end;
          octant_name  := z.slug
                          || ' octant (x' || sx
                          || ', y' || sy
                          || ', z' || sz || ')';

          insert into sub_zones (zone_id, slug, name, sign_x, sign_y, sign_z, composite_quality, description)
          values (z.id, octant_slug, octant_name, sx, sy, sz, composite,
                  'Octant sub-zone of ' || z.slug || ': composite quality is "' || composite || '".');
        end loop;
      end loop;
    end loop;
  end loop;
end $$;

-- Zone 4 sub-zones: north (+z) and south (-z) polar caps.
-- South cap leads to Awakening at (0, 0, -φ); north cap leads to Obliteration at (0, 0, +φ).
insert into sub_zones (zone_id, slug, name, sign_x, sign_y, sign_z, composite_quality, description)
select id, 'zone-4.north', 'Zone 4 north cap',
       'any', 'any', '+',
       'Obliteration cap',
       'The +z (north) polar cap of the bipyramid — the region where the bipyramid extends past Shell 3 toward Obliteration at (0, 0, +φ).'
from zones where slug = 'zone-4'
union all
select id, 'zone-4.south', 'Zone 4 south cap',
       'any', 'any', '-',
       'Awakening cap',
       'The -z (south) polar cap of the bipyramid — the region where the bipyramid extends past Shell 3 toward Awakening at (0, 0, -φ).'
from zones where slug = 'zone-4';

-- Sanity check: 24 octants + 2 caps = 26 sub-zones
do $$
declare
  cnt int;
begin
  select count(*) into cnt from sub_zones;
  if cnt != 26 then
    raise exception 'Migration error: expected 26 sub_zones, found %', cnt;
  end if;
end $$;

-------------------------------------------------------------------------------
-- 6. compute_zone() function
-------------------------------------------------------------------------------
-- Returns the ordinal zone number (1, 2, 3, 4) or NULL for "outside the
-- diamond" (BEING at origin, Birth/Death beyond bipyramid, etc.)
--
-- Uses φ = (1 + sqrt(5)) / 2 as a literal constant.
-- IMMUTABLE so Postgres can use it in functional indexes and computed columns.

create or replace function compute_zone(x float8, y float8, z float8)
returns smallint
language plpgsql
immutable
as $$
declare
  PHI    constant float8 := (1 + sqrt(5.0)) / 2.0;     -- 1.6180339887498949
  EPS    constant float8 := 1e-9;                       -- floating-point tolerance
  r      float8;
  bipyramid_lhs float8;
begin
  -- BEING at exactly (0, 0, 0) — explicitly NULL-zoned
  if x = 0 and y = 0 and z = 0 then
    return null;
  end if;

  r := sqrt(x * x + y * y + z * z);

  -- Boundary tests use +EPS so points exactly on a shell or on the bipyramid
  -- surface are classified inclusively into the inner zone. Coordinates are
  -- stored at ~9 decimal places while φ is computed at full double precision,
  -- so the tips Awakening/Obliteration at z = ±φ would otherwise round to
  -- just outside the bipyramid by ~1e-10.
  if r <= 1.0 / (PHI * PHI) + EPS then
    return 1;
  elsif r <= 1.0 / PHI + EPS then
    return 2;
  elsif r <= 1.0 + EPS then
    return 3;
  else
    -- r > 1 — test bipyramid: |x| + |y| + |z|/φ ≤ 1 (with epsilon)
    bipyramid_lhs := abs(x) + abs(y) + abs(z) / PHI;
    if bipyramid_lhs <= 1.0 + EPS then
      return 4;
    else
      return null;
    end if;
  end if;
end;
$$;

-------------------------------------------------------------------------------
-- 7. compute_sub_zone_slug() function
-------------------------------------------------------------------------------
-- Given a point (x, y, z), returns the slug of the sub-zone it belongs to,
-- or NULL if the point is not in any zone.
--
-- For Zone 4, the sub-zone is determined by the sign of z (north / south).
-- For Zones 1-3, the sub-zone is the octant determined by signs of x, y, z.
-- For NULL-zoned points (BEING, Birth/Death, exterior), returns NULL.
--
-- Edge case: when one of x, y, z is exactly zero, that octant sign is
-- ambiguous. We follow the convention sign(0) := '+'. This affects only
-- points placed on a coordinate plane; landmark points handle this naturally
-- (e.g., Heaven at (1, 0, 0) goes to Zone 3 octant +,+,+).

create or replace function compute_sub_zone_slug(x float8, y float8, z float8)
returns text
language plpgsql
immutable
as $$
declare
  z_num smallint;
  sx    text;
  sy    text;
  sz    text;
begin
  z_num := compute_zone(x, y, z);
  if z_num is null then
    return null;
  end if;

  if z_num = 4 then
    return 'zone-4.' || case when z >= 0 then 'north' else 'south' end;
  end if;

  -- Zones 1, 2, 3: octant by sign of (x, y, z). Convention: 0 counts as +.
  sx := case when x >= 0 then 'p' else 'n' end;
  sy := case when y >= 0 then 'p' else 'n' end;
  sz := case when z >= 0 then 'p' else 'n' end;
  return 'zone-' || z_num || '.octant-' || sx || sy || sz;
end;
$$;

-------------------------------------------------------------------------------
-- 8. points_with_zones view
-------------------------------------------------------------------------------
-- A read-friendly view that joins each coordinate with its computed zone
-- and sub-zone (including the human-readable composite-quality string).
--
-- The base `coordinates` table remains the source of truth for (x, y, z).
-- Editing happens there; this view is for display and querying.

create or replace view points_with_zones as
select
  c.id,
  c.slug,
  c.name,
  c.x,
  c.y,
  c.z,
  c.axis_id,
  c.shell_id,
  c.landmark_type,
  c.is_origin,
  c.is_pole,
  c.description,
  -- Computed zone
  compute_zone(c.x, c.y, c.z)                       as zone_ord,
  z.id                                              as zone_id,
  z.slug                                            as zone_slug,
  z.name                                            as zone_name,
  -- Computed sub-zone
  compute_sub_zone_slug(c.x, c.y, c.z)              as sub_zone_slug,
  sz.id                                             as sub_zone_id,
  sz.name                                           as sub_zone_name,
  sz.composite_quality                              as sub_zone_quality,
  -- Convenience: radius and bipyramid-membership indicator
  sqrt(c.x * c.x + c.y * c.y + c.z * c.z)           as r,
  c.created_at,
  c.updated_at
from coordinates c
left join zones     z  on z.ord  = compute_zone(c.x, c.y, c.z)
left join sub_zones sz on sz.slug = compute_sub_zone_slug(c.x, c.y, c.z);

-- Note: this view is read-only by default. Edits go through the underlying
-- `coordinates` table (which is what Directus binds to for write operations).

-------------------------------------------------------------------------------
-- 9. Sanity-check the seeded geometry against compute_zone()
-------------------------------------------------------------------------------
-- Verify that the 9 named coordinates land in the expected zones.
do $$
declare
  r record;
  expected_zones jsonb := jsonb_build_object(
    'being',        null,
    'heaven',         3,
    'hell',           3,
    'past',           3,
    'future',         3,
    'awakening',      4,
    'obliteration',   4,
    'birth',        null,
    'death',        null
  );
  actual_zone   smallint;
  expected_zone smallint;
begin
  for r in select slug, x, y, z from coordinates loop
    actual_zone := compute_zone(r.x, r.y, r.z);
    -- expected may be null (json null) or a number
    if expected_zones ? r.slug then
      expected_zone := nullif(expected_zones ->> r.slug, '')::smallint;
      if (actual_zone is null) != (expected_zone is null)
         or (actual_zone is not null and actual_zone != expected_zone)
      then
        raise exception
          'compute_zone sanity check failed: % at (%, %, %) computed zone=% but expected=%',
          r.slug, r.x, r.y, r.z,
          coalesce(actual_zone::text, 'NULL'),
          coalesce(expected_zone::text, 'NULL');
      end if;
    end if;
  end loop;
end $$;

commit;

-- After running this migration, inspect the result with:
--
--   select slug, name, x, y, z, r, zone_slug, sub_zone_slug, sub_zone_quality
--   from points_with_zones
--   order by r, slug;
--
-- Test compute_zone() on arbitrary points:
--
--   select compute_zone(0.5, 0, 0);   -- expect 3 (r=0.5, between φ⁻¹ and 1)
--   select compute_zone(0, 0, 1.5);   -- expect 4 (inside bipyramid, r>1)
--   select compute_zone(1.5, 0, 0);   -- expect null (outside bipyramid, r>1)
--   select compute_zone(0, 0, 0);     -- expect null (BEING)
