-- 0008_axis_plane_subzones.sql
-- Vegar's Diamond — Fix: classify axis-on and plane-on points as their own
-- sub-zones instead of forcing them into an octant via sign(0):='+'.
--
-- Background
-- ----------
-- 0007's compute_sub_zone_slug() used the convention "if a coordinate is
-- exactly 0, treat it as +" so every point inside a zone got assigned to one
-- of 8 octants. Geometrically this is degenerate for points that lie exactly
-- on a coordinate axis or plane — they are on the shared boundary of multiple
-- octants, not strictly inside any of them. The result was misleading
-- composite-quality strings like Future (0, 1, 0) → "Acceleration / Love /
-- Future" when in fact Future has no vertical or affect quality at all.
--
-- This migration:
--   1. Adds a `kind` column to sub_zones distinguishing octant / plane / axis.
--   2. Inserts 6 axis sub-zones per zone (1-3): +x, -x, +y, -y, +z, -z.
--      And 12 plane sub-zones per zone (1-3): one for each ±x±y, ±x±z, ±y±z
--      half-plane (one coordinate exactly zero, the other two non-zero).
--      That's 18 boundary sub-zones × 3 zones = 54 new rows, plus the
--      24 existing octant rows + 2 Zone 4 caps = 80 total sub_zones.
--   3. Re-writes compute_sub_zone_slug() to route axis-on points to
--      axis sub-zones, plane-on points to plane sub-zones, generic interior
--      points to octants, and Zone-4 points to north/south caps as before.
--   4. Drops the +/- sign-check constraint pattern on sub_zones in favour
--      of '+', '-', '0' so plane/axis rows can encode the zero dimension(s)
--      directly.
--   5. Re-runs the sanity check against the 9 named coordinates and the
--      26-row count expectation (now 80).
--
-- Composite-quality convention for boundary sub-zones:
--   * Axis sub-zone (+y in Zone 3) → just "Future"
--   * Plane sub-zone (+x+y, z=0 in Zone 3) → "Love / Future"
--   * Octant sub-zone (+x+y+z in Zone 3) → "Acceleration / Love / Future"
--
-- All changes wrapped in a single transaction.

set search_path = public, extensions;

begin;

-------------------------------------------------------------------------------
-- 1. Loosen the sign check to allow '0' and add a `kind` column
-------------------------------------------------------------------------------
alter table sub_zones drop constraint if exists sub_zones_sign_x_check;
alter table sub_zones drop constraint if exists sub_zones_sign_y_check;
alter table sub_zones drop constraint if exists sub_zones_sign_z_check;

alter table sub_zones
  add constraint sub_zones_sign_x_check check (sign_x in ('+', '-', '0', 'any')),
  add constraint sub_zones_sign_y_check check (sign_y in ('+', '-', '0', 'any')),
  add constraint sub_zones_sign_z_check check (sign_z in ('+', '-', '0', 'any'));

alter table sub_zones
  add column if not exists kind text not null default 'octant'
    check (kind in ('octant', 'plane', 'axis', 'cap'));

-- Re-label existing rows.
update sub_zones set kind = 'cap'    where slug like 'zone-4.%';
update sub_zones set kind = 'octant' where slug like 'zone-_.octant-%';

-------------------------------------------------------------------------------
-- 2. Seed boundary sub-zones for Zones 1, 2, 3.
-------------------------------------------------------------------------------
-- For each zone we add:
--   * 6 axis sub-zones  (two coords exactly zero)
--   * 12 plane sub-zones (one coord exactly zero, other two non-zero)
do $$
declare
  z record;
  -- Axis loop
  axis_name   text;
  axis_sign   text;
  axis_label  text;
  axis_slug   text;
  axis_desc   text;
  -- Plane loop
  plane_axis  text;             -- which axis is zero ('x' | 'y' | 'z')
  s1_dim      text; s2_dim text;  -- the two non-zero axes
  s1_sign     text; s2_sign text;
  s1_label    text; s2_label text;
  plane_slug  text;
  plane_quality text;
  plane_desc  text;
  signs       text[];
begin
  for z in select id, slug, ord,
                  vertical_neg, vertical_pos,
                  affect_neg, affect_pos,
                  time_neg, time_pos
           from zones
           where ord in (1, 2, 3)
  loop
    -------------------------------------------------------------------------
    -- 6 axis sub-zones per zone
    -------------------------------------------------------------------------
    -- +x
    insert into sub_zones (zone_id, slug, name, sign_x, sign_y, sign_z,
                           kind, composite_quality, description)
    values (z.id, z.slug || '.axis-x+',
            z.slug || ' axis +x',
            '+', '0', '0',
            'axis',
            z.affect_pos,
            'Axis sub-zone of ' || z.slug || ' along +x. Composite quality is the affect-positive label only: "' || z.affect_pos || '".');

    -- -x
    insert into sub_zones (zone_id, slug, name, sign_x, sign_y, sign_z,
                           kind, composite_quality, description)
    values (z.id, z.slug || '.axis-x-',
            z.slug || ' axis -x',
            '-', '0', '0',
            'axis',
            z.affect_neg,
            'Axis sub-zone of ' || z.slug || ' along -x. Composite quality is the affect-negative label only: "' || z.affect_neg || '".');

    -- +y
    insert into sub_zones (zone_id, slug, name, sign_x, sign_y, sign_z,
                           kind, composite_quality, description)
    values (z.id, z.slug || '.axis-y+',
            z.slug || ' axis +y',
            '0', '+', '0',
            'axis',
            z.time_pos,
            'Axis sub-zone of ' || z.slug || ' along +y. Composite quality is the time-positive label only: "' || z.time_pos || '".');

    -- -y
    insert into sub_zones (zone_id, slug, name, sign_x, sign_y, sign_z,
                           kind, composite_quality, description)
    values (z.id, z.slug || '.axis-y-',
            z.slug || ' axis -y',
            '0', '-', '0',
            'axis',
            z.time_neg,
            'Axis sub-zone of ' || z.slug || ' along -y. Composite quality is the time-negative label only: "' || z.time_neg || '".');

    -- +z
    insert into sub_zones (zone_id, slug, name, sign_x, sign_y, sign_z,
                           kind, composite_quality, description)
    values (z.id, z.slug || '.axis-z+',
            z.slug || ' axis +z',
            '0', '0', '+',
            'axis',
            z.vertical_pos,
            'Axis sub-zone of ' || z.slug || ' along +z. Composite quality is the vertical-positive label only: "' || z.vertical_pos || '".');

    -- -z
    insert into sub_zones (zone_id, slug, name, sign_x, sign_y, sign_z,
                           kind, composite_quality, description)
    values (z.id, z.slug || '.axis-z-',
            z.slug || ' axis -z',
            '0', '0', '-',
            'axis',
            z.vertical_neg,
            'Axis sub-zone of ' || z.slug || ' along -z. Composite quality is the vertical-negative label only: "' || z.vertical_neg || '".');

    -------------------------------------------------------------------------
    -- 12 plane sub-zones per zone
    -------------------------------------------------------------------------
    signs := array['+', '-'];

    -- z=0 plane (4 quadrants spanned by x, y signs)
    foreach s1_sign in array signs loop
      foreach s2_sign in array signs loop
        s1_label := case s1_sign when '+' then z.affect_pos else z.affect_neg end;
        s2_label := case s2_sign when '+' then z.time_pos   else z.time_neg   end;
        plane_quality := s1_label || ' / ' || s2_label;
        plane_slug := z.slug || '.plane-z0-x' || s1_sign || 'y' || s2_sign;
        insert into sub_zones (zone_id, slug, name, sign_x, sign_y, sign_z,
                               kind, composite_quality, description)
        values (z.id, plane_slug,
                z.slug || ' plane z=0 (x' || s1_sign || ', y' || s2_sign || ')',
                s1_sign, s2_sign, '0',
                'plane',
                plane_quality,
                'Plane sub-zone of ' || z.slug || ' on z=0. Composite quality: "' || plane_quality || '".');
      end loop;
    end loop;

    -- y=0 plane (4 quadrants spanned by x, z signs)
    foreach s1_sign in array signs loop
      foreach s2_sign in array signs loop
        s1_label := case s1_sign when '+' then z.affect_pos   else z.affect_neg   end;
        s2_label := case s2_sign when '+' then z.vertical_pos else z.vertical_neg end;
        plane_quality := s2_label || ' / ' || s1_label;
        plane_slug := z.slug || '.plane-y0-x' || s1_sign || 'z' || s2_sign;
        insert into sub_zones (zone_id, slug, name, sign_x, sign_y, sign_z,
                               kind, composite_quality, description)
        values (z.id, plane_slug,
                z.slug || ' plane y=0 (x' || s1_sign || ', z' || s2_sign || ')',
                s1_sign, '0', s2_sign,
                'plane',
                plane_quality,
                'Plane sub-zone of ' || z.slug || ' on y=0. Composite quality: "' || plane_quality || '".');
      end loop;
    end loop;

    -- x=0 plane (4 quadrants spanned by y, z signs)
    foreach s1_sign in array signs loop
      foreach s2_sign in array signs loop
        s1_label := case s1_sign when '+' then z.time_pos     else z.time_neg     end;
        s2_label := case s2_sign when '+' then z.vertical_pos else z.vertical_neg end;
        plane_quality := s2_label || ' / ' || s1_label;
        plane_slug := z.slug || '.plane-x0-y' || s1_sign || 'z' || s2_sign;
        insert into sub_zones (zone_id, slug, name, sign_x, sign_y, sign_z,
                               kind, composite_quality, description)
        values (z.id, plane_slug,
                z.slug || ' plane x=0 (y' || s1_sign || ', z' || s2_sign || ')',
                '0', s1_sign, s2_sign,
                'plane',
                plane_quality,
                'Plane sub-zone of ' || z.slug || ' on x=0. Composite quality: "' || plane_quality || '".');
      end loop;
    end loop;

  end loop;
end $$;

-------------------------------------------------------------------------------
-- 3. Replace compute_sub_zone_slug() to route boundary points correctly.
-------------------------------------------------------------------------------
create or replace function compute_sub_zone_slug(x float8, y float8, z float8)
returns text
language plpgsql
immutable
as $$
declare
  EPS    constant float8 := 1e-9;
  z_num  smallint;
  is_x0  boolean;
  is_y0  boolean;
  is_z0  boolean;
  zeros  int;
  sx     text;
  sy     text;
  sz     text;
  zslug  text;
begin
  z_num := compute_zone(x, y, z);
  if z_num is null then
    return null;
  end if;

  zslug := 'zone-' || z_num;

  if z_num = 4 then
    -- Zone 4 only meaningfully divides along z (north / south).
    return zslug || '.' || case when z >= 0 then 'north' else 'south' end;
  end if;

  is_x0 := abs(x) < EPS;
  is_y0 := abs(y) < EPS;
  is_z0 := abs(z) < EPS;
  zeros := (case when is_x0 then 1 else 0 end)
         + (case when is_y0 then 1 else 0 end)
         + (case when is_z0 then 1 else 0 end);

  -- 2 zeros → axis sub-zone (point lies on a single coordinate axis)
  if zeros = 2 then
    if not is_x0 then
      return zslug || '.axis-x' || case when x > 0 then '+' else '-' end;
    elsif not is_y0 then
      return zslug || '.axis-y' || case when y > 0 then '+' else '-' end;
    else
      return zslug || '.axis-z' || case when z > 0 then '+' else '-' end;
    end if;
  end if;

  -- 1 zero → plane sub-zone (point lies on a coordinate plane)
  if zeros = 1 then
    if is_z0 then
      return zslug || '.plane-z0-x' || case when x > 0 then '+' else '-' end
                                    || 'y' || case when y > 0 then '+' else '-' end;
    elsif is_y0 then
      return zslug || '.plane-y0-x' || case when x > 0 then '+' else '-' end
                                    || 'z' || case when z > 0 then '+' else '-' end;
    else
      return zslug || '.plane-x0-y' || case when y > 0 then '+' else '-' end
                                    || 'z' || case when z > 0 then '+' else '-' end;
    end if;
  end if;

  -- 3 zeros would mean (0,0,0) which compute_zone already rejected.
  -- 0 zeros → generic interior octant.
  sx := case when x > 0 then 'p' else 'n' end;
  sy := case when y > 0 then 'p' else 'n' end;
  sz := case when z > 0 then 'p' else 'n' end;
  return zslug || '.octant-' || sx || sy || sz;
end;
$$;

-------------------------------------------------------------------------------
-- 4. Sanity checks
-------------------------------------------------------------------------------
-- Total sub_zones: 24 octants + 2 caps + (6 axis + 12 plane) * 3 = 80
do $$
declare
  total int;
  octant_count int;
  axis_count   int;
  plane_count  int;
  cap_count    int;
begin
  select count(*) into total       from sub_zones;
  select count(*) into octant_count from sub_zones where kind = 'octant';
  select count(*) into axis_count   from sub_zones where kind = 'axis';
  select count(*) into plane_count  from sub_zones where kind = 'plane';
  select count(*) into cap_count    from sub_zones where kind = 'cap';

  if total != 80 then
    raise exception 'Migration error: expected 80 sub_zones, found %', total;
  end if;
  if octant_count != 24 then
    raise exception 'Migration error: expected 24 octant sub_zones, found %', octant_count;
  end if;
  if axis_count != 18 then
    raise exception 'Migration error: expected 18 axis sub_zones, found %', axis_count;
  end if;
  if plane_count != 36 then
    raise exception 'Migration error: expected 36 plane sub_zones, found %', plane_count;
  end if;
  if cap_count != 2 then
    raise exception 'Migration error: expected 2 cap sub_zones, found %', cap_count;
  end if;
end $$;

-- The four equatorial landmarks should now resolve to single-axis sub-zones
-- with single-quality composite labels.
do $$
declare
  r record;
  expected jsonb := jsonb_build_object(
    'heaven',       'zone-3.axis-x+',
    'hell',         'zone-3.axis-x-',
    'future',       'zone-3.axis-y+',
    'past',         'zone-3.axis-y-',
    'awakening',    'zone-4.south',
    'obliteration', 'zone-4.north',
    'being',        null,
    'birth',        null,
    'death',        null
  );
  actual text;
  expect text;
begin
  for r in select slug, x, y, z from coordinates loop
    actual := compute_sub_zone_slug(r.x, r.y, r.z);
    if expected ? r.slug then
      expect := expected ->> r.slug;
      if (actual is null) != (expect is null)
         or (actual is not null and actual != expect)
      then
        raise exception
          'compute_sub_zone_slug sanity check failed: % at (%, %, %) computed sub_zone=% but expected=%',
          r.slug, r.x, r.y, r.z,
          coalesce(actual, 'NULL'),
          coalesce(expect, 'NULL');
      end if;
    end if;
  end loop;
end $$;

commit;

-- After running, inspect with:
--
--   select slug, name, x, y, z, r, zone_slug, sub_zone_slug, sub_zone_quality
--   from points_with_zones order by r nulls first, slug;
--
-- Expected for the equatorial landmarks:
--   heaven (1, 0, 0)  → zone-3.axis-x+  quality "Love"
--   hell   (-1, 0, 0) → zone-3.axis-x-  quality "Hate"
--   future (0, 1, 0)  → zone-3.axis-y+  quality "Future"
--   past   (0, -1, 0) → zone-3.axis-y-  quality "Past"
