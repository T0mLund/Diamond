-- 0013_phase_1_5c_rls_remediation_phase_d1.sql
-- Vegar's Diamond — Phase 1.5c RLS Remediation, Phase D1
--
-- Background
-- ----------
-- The Supabase advisor flagged three ours-owned functions with the lint
-- `function_search_path_mutable`:
--
--   - public.set_items_updated_at()
--   - public.compute_zone(double precision, double precision, double precision)
--   - public.compute_sub_zone_slug(double precision, double precision, double precision)
--
-- The remediation is to pin `search_path = ''` on each function so that name
-- resolution is fully deterministic regardless of session search_path.
--
-- The first two functions only use built-ins from `pg_catalog` (sqrt, abs,
-- now), which are resolved without search_path, so the change is a simple
-- ALTER. The third (`compute_sub_zone_slug`) calls `compute_zone(...)`
-- without schema qualification; under an empty search_path the unqualified
-- call would fail. We therefore CREATE OR REPLACE the function with the
-- same body except that the cross-function call is schema-qualified as
-- `public.compute_zone(...)`.
--
-- Functional preservation
-- -----------------------
-- Post-application smoke tests confirmed behaviour preserved on
-- representative coordinates:
--   compute_zone(0.5, 0, 0.5)       → 3      (r = √0.5 ≈ 0.707, Z3)
--   compute_zone(0, 0, 1.6180...)   → 4      (Awakening pole on z+; +EPS
--                                              boundary handling intact)
--   compute_sub_zone_slug(0.5,0,0.5)   → 'zone-3.plane-y0-x+z+'
--   compute_sub_zone_slug(0.3,0.3,0.3) → 'zone-2.octant-ppp'
--   compute_sub_zone_slug(0,0,1.5)     → 'zone-4.north'
--
-- The Awakening boundary at z = +φ is correctly classified as Z4 thanks to
-- the +EPS tolerance documented inline in `compute_zone` (boundary tests
-- use +EPS so points exactly on a shell or on the bipyramid surface are
-- classified inclusively; coordinates are stored at ~9 decimal places while
-- φ is computed at full double precision, so Awakening / Obliteration at
-- z = ±φ would otherwise round to just outside by ~1e-10).
--
-- Applied to Supabase on 2026-05-15 15:00 UTC as version 20260515140021.

ALTER FUNCTION public.set_items_updated_at() SET search_path = '';

ALTER FUNCTION public.compute_zone(double precision, double precision, double precision)
  SET search_path = '';

CREATE OR REPLACE FUNCTION public.compute_sub_zone_slug(x double precision, y double precision, z double precision)
 RETURNS text
 LANGUAGE plpgsql
 IMMUTABLE
 SET search_path = ''
AS $function$
declare
  EPS    constant float8 := 1e-9;
  z_num  smallint;
  is_x0  boolean;
  is_y0  boolean;
  is_z0  boolean;
  zeros  int;
  sx text; sy text; sz text;
  zslug text;
begin
  z_num := public.compute_zone(x, y, z);
  if z_num is null then
    return null;
  end if;

  zslug := 'zone-' || z_num;

  if z_num = 4 then
    return zslug || '.' || case when z >= 0 then 'north' else 'south' end;
  end if;

  is_x0 := abs(x) < EPS;
  is_y0 := abs(y) < EPS;
  is_z0 := abs(z) < EPS;
  zeros := (case when is_x0 then 1 else 0 end)
         + (case when is_y0 then 1 else 0 end)
         + (case when is_z0 then 1 else 0 end);

  if zeros = 2 then
    if not is_x0 then
      return zslug || '.axis-x' || case when x > 0 then '+' else '-' end;
    elsif not is_y0 then
      return zslug || '.axis-y' || case when y > 0 then '+' else '-' end;
    else
      return zslug || '.axis-z' || case when z > 0 then '+' else '-' end;
    end if;
  end if;

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

  sx := case when x > 0 then 'p' else 'n' end;
  sy := case when y > 0 then 'p' else 'n' end;
  sz := case when z > 0 then 'p' else 'n' end;
  return zslug || '.octant-' || sx || sy || sz;
end;
$function$;
