-- ============================================================================
-- 0001_baseline.sql — Diamond schema baseline snapshot
-- ============================================================================
-- Captures the full live public-schema DDL and seed data as of
-- Phase 1.5b. This file is fully idempotent: it can be replayed on the
-- live database with zero net effect, and it can build the schema from
-- an empty database in one pass.
--
-- This file replaces the granular migration history that used to live in
-- 0001..0008 (extensions / core tables / content tables / seed geometry /
-- the missing 0005 transform / phi-cascade / zones+compute / axis+plane
-- sub-zones). Earlier file-level history is preserved in git.
--
-- Migrations 0009 and onward (items+relations, RLS remediation) remain
-- as separate, already-idempotent files layered on top of this baseline.
-- ============================================================================

-- ----------------------------------------------------------------------------
-- 1. Extensions
-- ----------------------------------------------------------------------------
create schema if not exists extensions;

create extension if not exists postgis     with schema extensions;
create extension if not exists pgcrypto    with schema extensions;
create extension if not exists moddatetime with schema extensions;

-- ----------------------------------------------------------------------------
-- 2. Custom enum types (used by items / item_relations)
-- ----------------------------------------------------------------------------
do $$ begin
  if not exists (select 1 from pg_type t join pg_namespace n on n.oid=t.typnamespace
                 where t.typname='anchor_kind' and n.nspname='public') then
    create type public.anchor_kind as enum
      ('coordinate', 'sub_zone', 'zone', 'axis_segment', 'shape', 'none');
  end if;
end $$;

do $$ begin
  if not exists (select 1 from pg_type t join pg_namespace n on n.oid=t.typnamespace
                 where t.typname='epistemic_status' and n.nspname='public') then
    create type public.epistemic_status as enum
      ('definitional', 'stipulated', 'interpretive', 'hypothetical', 'borrowed');
  end if;
end $$;

do $$ begin
  if not exists (select 1 from pg_type t join pg_namespace n on n.oid=t.typnamespace
                 where t.typname='item_kind' and n.nspname='public') then
    create type public.item_kind as enum
      ('person', 'text', 'concept', 'practice', 'tradition', 'commentary');
  end if;
end $$;

do $$ begin
  if not exists (select 1 from pg_type t join pg_namespace n on n.oid=t.typnamespace
                 where t.typname='relation_kind' and n.nspname='public') then
    create type public.relation_kind as enum
      ('authored_by', 'comments_on', 'cites', 'responds_to', 'translates',
       'belongs_to_tradition', 'influenced_by', 'practices', 'develops', 'other');
  end if;
end $$;

do $$ begin
  if not exists (select 1 from pg_type t join pg_namespace n on n.oid=t.typnamespace
                 where t.typname='shape_type' and n.nspname='public') then
    create type public.shape_type as enum
      ('point', 'region_anchor', 'polyline', 'polygon', 'volume', 'cone_view');
  end if;
end $$;

-- ----------------------------------------------------------------------------
-- 3. Tables (geometry core)
-- ----------------------------------------------------------------------------
create table if not exists public.axes (
  id            uuid primary key default gen_random_uuid(),
  slug          text not null unique,
  name          text not null,
  description   text,
  positive_pole text not null,
  negative_pole text not null,
  ord           smallint not null unique,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create table if not exists public.shells (
  id          uuid primary key default gen_random_uuid(),
  slug        text not null unique,
  name        text not null,
  radius      numeric not null,
  ord         smallint not null unique,
  description text,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),
  role        text not null default 'zone_boundary'
);

create table if not exists public.coordinates (
  id            uuid primary key default gen_random_uuid(),
  slug          text not null unique,
  name          text not null,
  axis_id       uuid references public.axes(id),
  shell_id      uuid references public.shells(id),
  is_origin     boolean not null default false,
  is_pole       boolean not null default false,
  description   text,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now(),
  x             double precision not null default 0,
  y             double precision not null default 0,
  z             double precision not null default 0,
  landmark_type text
);

create table if not exists public.zones (
  id              uuid primary key default gen_random_uuid(),
  slug            text not null unique,
  name            text not null,
  ord             smallint not null unique,
  membership_rule text not null,
  vertical_neg    text,
  vertical_pos    text,
  affect_neg      text,
  affect_pos      text,
  time_neg        text,
  time_pos        text,
  description     text,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

create table if not exists public.sub_zones (
  id                uuid primary key default gen_random_uuid(),
  zone_id           uuid not null references public.zones(id) on delete cascade,
  slug              text not null unique,
  name              text not null,
  sign_x            text not null,
  sign_y            text not null,
  sign_z            text not null,
  composite_quality text,
  description       text,
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now(),
  kind              text not null default 'octant',
  unique (zone_id, sign_x, sign_y, sign_z)
);

-- ----------------------------------------------------------------------------
-- 4. Tables (content layer)
-- ----------------------------------------------------------------------------
create table if not exists public.sources (
  id            uuid primary key default gen_random_uuid(),
  slug          text not null unique,
  title         text not null,
  author        text,
  year          text,
  citation      text,
  tradition     text,
  notes         text,
  superseded_by uuid references public.sources(id),
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create table if not exists public.source_positions (
  id            uuid primary key default gen_random_uuid(),
  source_id     uuid not null references public.sources(id) on delete cascade,
  coordinate_id uuid not null references public.coordinates(id) on delete restrict,
  offset_x      numeric not null default 0,
  offset_y      numeric not null default 0,
  offset_z      numeric not null default 0,
  weight        numeric not null default 1.0,
  rationale     text,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now(),
  unique (source_id, coordinate_id)
);

create table if not exists public.resonances (
  id          uuid primary key default gen_random_uuid(),
  source_a_id uuid not null references public.sources(id) on delete cascade,
  source_b_id uuid not null references public.sources(id) on delete cascade,
  kind        text,
  notes       text,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),
  unique (source_a_id, source_b_id, kind)
);

create table if not exists public.prose_sections (
  id           uuid primary key default gen_random_uuid(),
  slug         text not null unique,
  title        text not null,
  body_md      text,
  ord          integer not null,
  is_published boolean not null default false,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

create table if not exists public.glossary_terms (
  id            uuid primary key default gen_random_uuid(),
  term          text not null unique,
  definition_md text,
  see_also      text[] not null default '{}'::text[],
  language      text,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create table if not exists public.revisions (
  id          bigserial primary key,
  table_name  text not null,
  row_id      uuid,
  op          text not null,
  actor       text,
  diff        jsonb,
  occurred_at timestamptz not null default now()
);

-- ----------------------------------------------------------------------------
-- 5. Tables (items + relations, originally 0009)
-- ----------------------------------------------------------------------------
create table if not exists public.items (
  id                     uuid primary key default gen_random_uuid(),
  slug                   text not null unique,
  kind                   item_kind not null,
  name                   text not null,
  description            text,
  anchor_kind            anchor_kind not null default 'none',
  anchor_sub_zone_slug   text references public.sub_zones(slug) on delete restrict,
  anchor_zone_slug       text references public.zones(slug)     on delete restrict,
  anchor_coordinate_slug text references public.coordinates(slug) on delete restrict,
  anchor_axis_segment    text,
  anchor_shape_type      shape_type,
  anchor_geometry        jsonb,
  tradition              text,
  primary_period         text,
  provenance             text,
  epistemic_status       epistemic_status not null default 'stipulated',
  effective_period_start date,
  effective_period_end   date,
  created_at             timestamptz not null default now(),
  updated_at             timestamptz not null default now()
);

create table if not exists public.item_relations (
  id           uuid primary key default gen_random_uuid(),
  from_item_id uuid not null references public.items(id) on delete cascade,
  to_item_id   uuid not null references public.items(id) on delete cascade,
  kind         relation_kind not null,
  notes        text,
  provenance   text,
  created_at   timestamptz not null default now()
);

-- ----------------------------------------------------------------------------
-- 6. Named check / unique constraints added via guarded blocks
-- ----------------------------------------------------------------------------
-- shells.role check
do $$ begin
  if not exists (select 1 from pg_constraint where conname='shells_role_check') then
    alter table public.shells
      add constraint shells_role_check
      check (role = any (array['zone_boundary'::text, 'landmark_anchor'::text]));
  end if;
end $$;

-- coordinates check constraints
do $$ begin
  if not exists (select 1 from pg_constraint where conname='being_at_origin') then
    alter table public.coordinates
      add constraint being_at_origin
      check ((not is_origin) or (x = 0::double precision and y = 0::double precision and z = 0::double precision));
  end if;
end $$;

do $$ begin
  if not exists (select 1 from pg_constraint where conname='one_origin') then
    alter table public.coordinates
      add constraint one_origin
      check ((is_origin = false) or (is_pole = false and axis_id is null and shell_id is null));
  end if;
end $$;

do $$ begin
  if not exists (select 1 from pg_constraint where conname='coordinates_landmark_type_check') then
    alter table public.coordinates
      add constraint coordinates_landmark_type_check
      check (landmark_type = any (array['origin'::text, 'equatorial_landmark'::text, 'bipyramid_tip'::text, 'outer_landmark'::text]));
  end if;
end $$;

-- sub_zones check constraints
do $$ begin
  if not exists (select 1 from pg_constraint where conname='sub_zones_kind_check') then
    alter table public.sub_zones
      add constraint sub_zones_kind_check
      check (kind = any (array['octant'::text, 'plane'::text, 'axis'::text, 'cap'::text]));
  end if;
end $$;

do $$ begin
  if not exists (select 1 from pg_constraint where conname='sub_zones_sign_x_check') then
    alter table public.sub_zones
      add constraint sub_zones_sign_x_check
      check (sign_x = any (array['+'::text, '-'::text, '0'::text, 'any'::text]));
  end if;
end $$;

do $$ begin
  if not exists (select 1 from pg_constraint where conname='sub_zones_sign_y_check') then
    alter table public.sub_zones
      add constraint sub_zones_sign_y_check
      check (sign_y = any (array['+'::text, '-'::text, '0'::text, 'any'::text]));
  end if;
end $$;

do $$ begin
  if not exists (select 1 from pg_constraint where conname='sub_zones_sign_z_check') then
    alter table public.sub_zones
      add constraint sub_zones_sign_z_check
      check (sign_z = any (array['+'::text, '-'::text, '0'::text, 'any'::text]));
  end if;
end $$;

-- resonances pair-ordering constraint
do $$ begin
  if not exists (select 1 from pg_constraint where conname='resonance_pair_ordered') then
    alter table public.resonances
      add constraint resonance_pair_ordered
      check (source_a_id < source_b_id);
  end if;
end $$;

-- items: slug format
do $$ begin
  if not exists (select 1 from pg_constraint where conname='items_slug_check') then
    alter table public.items
      add constraint items_slug_check
      check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$');
  end if;
end $$;

-- items: anchor consistency
do $$ begin
  if not exists (select 1 from pg_constraint where conname='items_anchor_kind_consistency') then
    alter table public.items
      add constraint items_anchor_kind_consistency
      check (
        case anchor_kind
          when 'coordinate'::anchor_kind then
            (anchor_coordinate_slug is not null and anchor_sub_zone_slug is null and anchor_zone_slug is null and anchor_shape_type is null)
          when 'sub_zone'::anchor_kind then
            (anchor_sub_zone_slug is not null and anchor_coordinate_slug is null and anchor_zone_slug is null and anchor_shape_type is null)
          when 'zone'::anchor_kind then
            (anchor_zone_slug is not null and anchor_coordinate_slug is null and anchor_sub_zone_slug is null and anchor_shape_type is null)
          when 'axis_segment'::anchor_kind then
            (anchor_axis_segment is not null and anchor_shape_type is null)
          when 'shape'::anchor_kind then
            (anchor_shape_type is not null and anchor_geometry is not null
             and anchor_coordinate_slug is null and anchor_sub_zone_slug is null and anchor_zone_slug is null)
          when 'none'::anchor_kind then
            (anchor_coordinate_slug is null and anchor_sub_zone_slug is null and anchor_zone_slug is null
             and anchor_axis_segment is null and anchor_shape_type is null and anchor_geometry is null)
          else null::boolean
        end
      );
  end if;
end $$;

do $$ begin
  if not exists (select 1 from pg_constraint where conname='items_effective_period_valid') then
    alter table public.items
      add constraint items_effective_period_valid
      check (effective_period_start is null or effective_period_end is null or effective_period_start <= effective_period_end);
  end if;
end $$;

do $$ begin
  if not exists (select 1 from pg_constraint where conname='items_shape_not_definitional') then
    alter table public.items
      add constraint items_shape_not_definitional
      check (anchor_kind <> 'shape'::anchor_kind or epistemic_status <> 'definitional'::epistemic_status);
  end if;
end $$;

do $$ begin
  if not exists (select 1 from pg_constraint where conname='items_shape_requires_provenance') then
    alter table public.items
      add constraint items_shape_requires_provenance
      check (anchor_kind <> 'shape'::anchor_kind or (provenance is not null and length(trim(both from provenance)) > 0));
  end if;
end $$;

-- item_relations: no self-loop, ordered triple uniqueness, "other" requires notes
do $$ begin
  if not exists (select 1 from pg_constraint where conname='item_relations_no_self_loop') then
    alter table public.item_relations
      add constraint item_relations_no_self_loop
      check (from_item_id <> to_item_id);
  end if;
end $$;

do $$ begin
  if not exists (select 1 from pg_constraint where conname='item_relations_other_requires_notes') then
    alter table public.item_relations
      add constraint item_relations_other_requires_notes
      check (kind <> 'other'::relation_kind or (notes is not null and length(trim(both from notes)) > 0));
  end if;
end $$;

-- ----------------------------------------------------------------------------
-- 7. Indexes (non-PK / non-unique-by-table-decl)
-- ----------------------------------------------------------------------------
create index        if not exists coordinates_axis_idx       on public.coordinates(axis_id);
create index        if not exists coordinates_shell_idx      on public.coordinates(shell_id);
create unique index if not exists coordinates_one_origin_idx on public.coordinates((true)) where (is_origin = true);

create index        if not exists sub_zones_zone_idx        on public.sub_zones(zone_id);

create index        if not exists sources_superseded_idx    on public.sources(superseded_by);
create index        if not exists sources_tradition_idx     on public.sources(tradition);

create index        if not exists source_positions_source_idx     on public.source_positions(source_id);
create index        if not exists source_positions_coordinate_idx on public.source_positions(coordinate_id);

create index        if not exists resonances_a_idx on public.resonances(source_a_id);
create index        if not exists resonances_b_idx on public.resonances(source_b_id);

create index        if not exists revisions_table_idx    on public.revisions(table_name);
create index        if not exists revisions_row_idx      on public.revisions(row_id);
create index        if not exists revisions_occurred_idx on public.revisions(occurred_at desc);

create index        if not exists idx_items_kind        on public.items(kind);
create index        if not exists idx_items_anchor_kind on public.items(anchor_kind);
create index        if not exists idx_items_zone        on public.items(anchor_zone_slug)       where anchor_zone_slug is not null;
create index        if not exists idx_items_sub_zone    on public.items(anchor_sub_zone_slug)   where anchor_sub_zone_slug is not null;
create index        if not exists idx_items_coordinate  on public.items(anchor_coordinate_slug) where anchor_coordinate_slug is not null;
create index        if not exists idx_items_tradition   on public.items(tradition)              where tradition is not null;

create index        if not exists idx_item_relations_from on public.item_relations(from_item_id);
create index        if not exists idx_item_relations_to   on public.item_relations(to_item_id);
create index        if not exists idx_item_relations_kind on public.item_relations(kind);
create unique index if not exists uq_item_relations_triple on public.item_relations(from_item_id, to_item_id, kind);

-- ----------------------------------------------------------------------------
-- 8. Functions (zone / sub-zone classification, items updated_at trigger fn)
-- ----------------------------------------------------------------------------
create or replace function public.compute_zone(x double precision, y double precision, z double precision)
returns smallint
language plpgsql
immutable
set search_path to ''
as $function$
declare
  PHI    constant float8 := (1 + sqrt(5.0)) / 2.0;
  EPS    constant float8 := 1e-9;
  r      float8;
  bipyramid_lhs float8;
begin
  if x = 0 and y = 0 and z = 0 then
    return null;
  end if;

  r := sqrt(x * x + y * y + z * z);

  -- Boundary tests use +EPS so points exactly on a shell or on the bipyramid
  -- surface are classified inclusively. Coordinates are stored at ~9 decimal
  -- places while φ is computed at full double precision, so Awakening /
  -- Obliteration at z = ±φ would otherwise round to just outside by ~1e-10.
  if r <= 1.0 / (PHI * PHI) + EPS then
    return 1;
  elsif r <= 1.0 / PHI + EPS then
    return 2;
  elsif r <= 1.0 + EPS then
    return 3;
  else
    bipyramid_lhs := abs(x) + abs(y) + abs(z) / PHI;
    if bipyramid_lhs <= 1.0 + EPS then
      return 4;
    else
      return null;
    end if;
  end if;
end;
$function$;

create or replace function public.compute_sub_zone_slug(x double precision, y double precision, z double precision)
returns text
language plpgsql
immutable
set search_path to ''
as $function$
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

create or replace function public.set_items_updated_at()
returns trigger
language plpgsql
set search_path to ''
as $function$
begin
  new.updated_at := now();
  return new;
end
$function$;

-- ----------------------------------------------------------------------------
-- 9. Triggers (moddatetime on each content table; custom on items)
-- ----------------------------------------------------------------------------
drop trigger if exists axes_set_updated_at             on public.axes;
create trigger axes_set_updated_at             before update on public.axes
  for each row execute function extensions.moddatetime(updated_at);

drop trigger if exists shells_set_updated_at           on public.shells;
create trigger shells_set_updated_at           before update on public.shells
  for each row execute function extensions.moddatetime(updated_at);

drop trigger if exists coordinates_set_updated_at      on public.coordinates;
create trigger coordinates_set_updated_at      before update on public.coordinates
  for each row execute function extensions.moddatetime(updated_at);

drop trigger if exists zones_set_updated_at            on public.zones;
create trigger zones_set_updated_at            before update on public.zones
  for each row execute function extensions.moddatetime(updated_at);

drop trigger if exists sub_zones_set_updated_at        on public.sub_zones;
create trigger sub_zones_set_updated_at        before update on public.sub_zones
  for each row execute function extensions.moddatetime(updated_at);

drop trigger if exists sources_set_updated_at          on public.sources;
create trigger sources_set_updated_at          before update on public.sources
  for each row execute function extensions.moddatetime(updated_at);

drop trigger if exists source_positions_set_updated_at on public.source_positions;
create trigger source_positions_set_updated_at before update on public.source_positions
  for each row execute function extensions.moddatetime(updated_at);

drop trigger if exists resonances_set_updated_at       on public.resonances;
create trigger resonances_set_updated_at       before update on public.resonances
  for each row execute function extensions.moddatetime(updated_at);

drop trigger if exists prose_sections_set_updated_at   on public.prose_sections;
create trigger prose_sections_set_updated_at   before update on public.prose_sections
  for each row execute function extensions.moddatetime(updated_at);

drop trigger if exists glossary_terms_set_updated_at   on public.glossary_terms;
create trigger glossary_terms_set_updated_at   before update on public.glossary_terms
  for each row execute function extensions.moddatetime(updated_at);

drop trigger if exists items_set_updated_at            on public.items;
create trigger items_set_updated_at            before update on public.items
  for each row execute function public.set_items_updated_at();

-- ----------------------------------------------------------------------------
-- 10. Views (security_invoker so RLS of underlying tables applies)
-- ----------------------------------------------------------------------------
create or replace view public.points_with_zones
  with (security_invoker = true)
as
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
  public.compute_zone(c.x, c.y, c.z)           as zone_ord,
  z.id                                          as zone_id,
  z.slug                                        as zone_slug,
  z.name                                        as zone_name,
  public.compute_sub_zone_slug(c.x, c.y, c.z)  as sub_zone_slug,
  sz.id                                         as sub_zone_id,
  sz.name                                       as sub_zone_name,
  sz.composite_quality                          as sub_zone_quality,
  sqrt(c.x * c.x + c.y * c.y + c.z * c.z)       as r,
  c.created_at,
  c.updated_at
from public.coordinates c
  left join public.zones z      on z.ord  = public.compute_zone(c.x, c.y, c.z)
  left join public.sub_zones sz on sz.slug = public.compute_sub_zone_slug(c.x, c.y, c.z);

create or replace view public.current_items
  with (security_invoker = true)
as
select
  id,
  slug,
  kind,
  name,
  description,
  anchor_kind,
  anchor_sub_zone_slug,
  anchor_zone_slug,
  anchor_coordinate_slug,
  anchor_axis_segment,
  anchor_shape_type,
  anchor_geometry,
  tradition,
  primary_period,
  provenance,
  epistemic_status,
  effective_period_start,
  effective_period_end,
  created_at,
  updated_at
from public.items i
where (effective_period_start is null or effective_period_start <= current_date)
  and (effective_period_end   is null or effective_period_end   >= current_date);

-- ============================================================================
-- 11. Seed data — axes, shells, coordinates, zones, sub_zones
-- ============================================================================
-- All seed inserts use `on conflict (slug) do nothing` so the baseline is a
-- no-op when seeds are already present and a full populate when run fresh.

-- ---- axes (3 rows) ---------------------------------------------------------
insert into public.axes (slug, name, description, positive_pole, negative_pole, ord) values
  ('vertical', 'Vertical', 'The contemplative axis. Birth at nadir, Death at apex; the lower piercing (Awakening) and upper piercing (Obliteration) lie just past the φ-tier.', 'Death',  'Birth', 1),
  ('affect',   'Affect',   'The equatorial axis of valence. Hate at one pole, Love at the other; flush with the sphere at radius 1.0.', 'Love',   'Hate',  2),
  ('time',     'Time',     'Past at one pole, Future at the other; the present lives at BEING (the only point all three axes meet).', 'Future', 'Past',  3)
on conflict (slug) do nothing;

-- ---- shells (5 rows) -------------------------------------------------------
insert into public.shells (slug, name, radius, ord, description, role) values
  ('shell-1', 'Shell 1 (φ⁻²)',      0.381966011, 1, 'Inner zone boundary at radius φ⁻². Separates Zone 1 (inner ball) from Zone 2.', 'zone_boundary'),
  ('shell-2', 'Shell 2 (φ⁻¹)',      0.618033989, 2, 'Zone boundary at radius φ⁻¹. Separates Zone 2 from Zone 3.',                    'zone_boundary'),
  ('shell-3', 'Shell 3 (unit sphere)', 1.000000000, 3, 'The unit sphere. Outer boundary of Zone 3. The four equatorial landmarks (Heaven, Hell, Past, Future) sit on this shell. The bipyramid equatorial corners coincide with these landmarks.', 'zone_boundary'),
  ('shell-4', 'Shell 4 (φ)',        1.618033989, 4, 'Landmark anchor at radius φ. The bipyramid tips (Awakening at -z, Obliteration at +z) sit on this shell along the vertical axis. Not a zone boundary.', 'landmark_anchor'),
  ('shell-5', 'Shell 5 (φ²)',       2.618033989, 5, 'Landmark anchor at radius φ². Birth (-z, south) and Death (+z, north) sit on this shell along the vertical axis. Not a zone boundary; no Zone 5 volume exists.', 'landmark_anchor')
on conflict (slug) do nothing;

-- ---- coordinates (9 rows) --------------------------------------------------
insert into public.coordinates (slug, name, axis_id, shell_id, is_origin, is_pole, description, x, y, z, landmark_type) values
  ('awakening',    'Awakening',
     (select id from public.axes   where slug='vertical'),
     (select id from public.shells where slug='shell-4'),
     false, true,
     'The -z (south) tip of the bipyramid at radius φ on Shell 4. Terminus of the contemplative / dissolving half of the vertical axis (Reflection → Contemplation → Meditation → Awakening); beyond this lies Birth at radius φ².',
     0, 0, -1.618033989, 'bipyramid_tip'),
  ('being',        'BEING',
     null, null,
     true,  false,
     'The still center at the origin (0, 0, 0). Asymptotic limit of the φ-cascade — what the inner shells converge toward, not a point in the zone structure. NULL-zoned.',
     0, 0, 0, 'origin'),
  ('birth',        'Birth',
     (select id from public.axes   where slug='vertical'),
     (select id from public.shells where slug='shell-5'),
     false, true,
     'Outermost point on the -z (south) half of the vertical axis at radius φ² on Shell 5. Beyond Awakening; beyond the bipyramid envelope — a landmark anchor with no surrounding zone volume.',
     0, 0, -2.618033989, 'outer_landmark'),
  ('death',        'Death',
     (select id from public.axes   where slug='vertical'),
     (select id from public.shells where slug='shell-5'),
     false, true,
     'Outermost point on the +z (north) half of the vertical axis at radius φ² on Shell 5. Beyond Obliteration; beyond the bipyramid envelope — a landmark anchor with no surrounding zone volume.',
     0, 0, 2.618033989, 'outer_landmark'),
  ('future',       'Future',
     (select id from public.axes   where slug='time'),
     (select id from public.shells where slug='shell-3'),
     false, true,
     'Landmark where the time axis meets Shell 3 in the +y direction. Coincides with a bipyramid equatorial corner. Quality-name and landmark-name are the same: Future is uniform on the time axis across all zones.',
     0, 1, 0, 'equatorial_landmark'),
  ('heaven',       'Heaven',
     (select id from public.axes   where slug='affect'),
     (select id from public.shells where slug='shell-3'),
     false, true,
     'Landmark where the affect axis meets Shell 3 in the +x direction. Coincides with the bipyramid''s equatorial corner toward Love. Provisional proper-noun name; the Zone-3 affect-quality at this location is Love.',
     1, 0, 0, 'equatorial_landmark'),
  ('hell',         'Hell',
     (select id from public.axes   where slug='affect'),
     (select id from public.shells where slug='shell-3'),
     false, true,
     'Landmark where the affect axis meets Shell 3 in the -x direction. Coincides with the bipyramid''s equatorial corner toward Hate. Provisional proper-noun name; the Zone-3 affect-quality at this location is Hate.',
     -1, 0, 0, 'equatorial_landmark'),
  ('obliteration', 'Obliteration',
     (select id from public.axes   where slug='vertical'),
     (select id from public.shells where slug='shell-4'),
     false, true,
     'The +z (north) tip of the bipyramid at radius φ on Shell 4. Terminus of the intensifying / activating half of the vertical axis (Oppression → Excitement → Acceleration → Obliteration); beyond this lies Death at radius φ².',
     0, 0, 1.618033989, 'bipyramid_tip'),
  ('past',         'Past',
     (select id from public.axes   where slug='time'),
     (select id from public.shells where slug='shell-3'),
     false, true,
     'Landmark where the time axis meets Shell 3 in the -y direction. Coincides with a bipyramid equatorial corner. Quality-name and landmark-name are the same: Past is uniform on the time axis across all zones.',
     0, -1, 0, 'equatorial_landmark')
on conflict (slug) do nothing;

-- ---- zones (4 rows) --------------------------------------------------------
insert into public.zones (slug, name, ord, membership_rule, vertical_neg, vertical_pos, affect_neg, affect_pos, time_neg, time_pos) values
  ('zone-1', 'Zone 1', 1, 'r ≤ φ⁻² (inner ball; radius ≤ 0.381966011)',
     'Reflection',    'Oppression',    'Aversion',   'Attraction', 'Past', 'Future'),
  ('zone-2', 'Zone 2', 2, 'φ⁻² < r ≤ φ⁻¹ (spherical shell; 0.381966011 < r ≤ 0.618033989)',
     'Contemplation', 'Excitement',    'Fear',       'Desire',     'Past', 'Future'),
  ('zone-3', 'Zone 3', 3, 'φ⁻¹ < r ≤ 1 (spherical shell; 0.618033989 < r ≤ 1.000000000)',
     'Meditation',    'Acceleration',  'Hate',       'Love',       'Past', 'Future'),
  ('zone-4', 'Zone 4', 4, 'r > 1 AND |x|+|y|+|z|/φ ≤ 1 (the two polar caps of the bipyramid)',
     null,            null,            null,         null,         null,   null)
on conflict (slug) do nothing;

-- ---- sub_zones (80 rows: zones 1–3 × {6 axis + 12 plane + 8 octant} + zone 4 × 2 caps) ----
-- Zone 1 — axis (6)
insert into public.sub_zones (zone_id, slug, name, sign_x, sign_y, sign_z, composite_quality, description, kind) values
  ((select id from public.zones where slug='zone-1'), 'zone-1.axis-x-', 'zone-1 axis -x', '-','0','0', 'Aversion',    'Axis sub-zone of zone-1 along -x. Composite quality: "Aversion".',    'axis'),
  ((select id from public.zones where slug='zone-1'), 'zone-1.axis-x+', 'zone-1 axis +x', '+','0','0', 'Attraction',  'Axis sub-zone of zone-1 along +x. Composite quality: "Attraction".',  'axis'),
  ((select id from public.zones where slug='zone-1'), 'zone-1.axis-y-', 'zone-1 axis -y', '0','-','0', 'Past',        'Axis sub-zone of zone-1 along -y. Composite quality: "Past".',        'axis'),
  ((select id from public.zones where slug='zone-1'), 'zone-1.axis-y+', 'zone-1 axis +y', '0','+','0', 'Future',      'Axis sub-zone of zone-1 along +y. Composite quality: "Future".',      'axis'),
  ((select id from public.zones where slug='zone-1'), 'zone-1.axis-z-', 'zone-1 axis -z', '0','0','-', 'Reflection',  'Axis sub-zone of zone-1 along -z. Composite quality: "Reflection".',  'axis'),
  ((select id from public.zones where slug='zone-1'), 'zone-1.axis-z+', 'zone-1 axis +z', '0','0','+', 'Oppression',  'Axis sub-zone of zone-1 along +z. Composite quality: "Oppression".',  'axis')
on conflict (slug) do nothing;

-- Zone 1 — plane (12)
insert into public.sub_zones (zone_id, slug, name, sign_x, sign_y, sign_z, composite_quality, description, kind) values
  ((select id from public.zones where slug='zone-1'), 'zone-1.plane-x0-y-z-', 'zone-1 plane x=0 (y-, z-)', '0','-','-', 'Reflection / Past',   'Plane sub-zone of zone-1 on x=0. Composite quality: "Reflection / Past".',   'plane'),
  ((select id from public.zones where slug='zone-1'), 'zone-1.plane-x0-y-z+', 'zone-1 plane x=0 (y-, z+)', '0','-','+', 'Oppression / Past',   'Plane sub-zone of zone-1 on x=0. Composite quality: "Oppression / Past".',   'plane'),
  ((select id from public.zones where slug='zone-1'), 'zone-1.plane-x0-y+z-', 'zone-1 plane x=0 (y+, z-)', '0','+','-', 'Reflection / Future', 'Plane sub-zone of zone-1 on x=0. Composite quality: "Reflection / Future".', 'plane'),
  ((select id from public.zones where slug='zone-1'), 'zone-1.plane-x0-y+z+', 'zone-1 plane x=0 (y+, z+)', '0','+','+', 'Oppression / Future', 'Plane sub-zone of zone-1 on x=0. Composite quality: "Oppression / Future".', 'plane'),
  ((select id from public.zones where slug='zone-1'), 'zone-1.plane-y0-x-z-', 'zone-1 plane y=0 (x-, z-)', '-','0','-', 'Reflection / Aversion',  'Plane sub-zone of zone-1 on y=0. Composite quality: "Reflection / Aversion".',  'plane'),
  ((select id from public.zones where slug='zone-1'), 'zone-1.plane-y0-x-z+', 'zone-1 plane y=0 (x-, z+)', '-','0','+', 'Oppression / Aversion',  'Plane sub-zone of zone-1 on y=0. Composite quality: "Oppression / Aversion".',  'plane'),
  ((select id from public.zones where slug='zone-1'), 'zone-1.plane-y0-x+z-', 'zone-1 plane y=0 (x+, z-)', '+','0','-', 'Reflection / Attraction','Plane sub-zone of zone-1 on y=0. Composite quality: "Reflection / Attraction".','plane'),
  ((select id from public.zones where slug='zone-1'), 'zone-1.plane-y0-x+z+', 'zone-1 plane y=0 (x+, z+)', '+','0','+', 'Oppression / Attraction','Plane sub-zone of zone-1 on y=0. Composite quality: "Oppression / Attraction".','plane'),
  ((select id from public.zones where slug='zone-1'), 'zone-1.plane-z0-x-y-', 'zone-1 plane z=0 (x-, y-)', '-','-','0', 'Aversion / Past',    'Plane sub-zone of zone-1 on z=0. Composite quality: "Aversion / Past".',    'plane'),
  ((select id from public.zones where slug='zone-1'), 'zone-1.plane-z0-x-y+', 'zone-1 plane z=0 (x-, y+)', '-','+','0', 'Aversion / Future',  'Plane sub-zone of zone-1 on z=0. Composite quality: "Aversion / Future".',  'plane'),
  ((select id from public.zones where slug='zone-1'), 'zone-1.plane-z0-x+y-', 'zone-1 plane z=0 (x+, y-)', '+','-','0', 'Attraction / Past',  'Plane sub-zone of zone-1 on z=0. Composite quality: "Attraction / Past".',  'plane'),
  ((select id from public.zones where slug='zone-1'), 'zone-1.plane-z0-x+y+', 'zone-1 plane z=0 (x+, y+)', '+','+','0', 'Attraction / Future','Plane sub-zone of zone-1 on z=0. Composite quality: "Attraction / Future".','plane')
on conflict (slug) do nothing;

-- Zone 1 — octant (8)
insert into public.sub_zones (zone_id, slug, name, sign_x, sign_y, sign_z, composite_quality, description, kind) values
  ((select id from public.zones where slug='zone-1'), 'zone-1.octant-nnn', 'zone-1 octant (x-, y-, z-)', '-','-','-', 'Reflection / Aversion / Past',    'Octant sub-zone of zone-1: composite quality is "Reflection / Aversion / Past".',    'octant'),
  ((select id from public.zones where slug='zone-1'), 'zone-1.octant-nnp', 'zone-1 octant (x-, y-, z+)', '-','-','+', 'Oppression / Aversion / Past',    'Octant sub-zone of zone-1: composite quality is "Oppression / Aversion / Past".',    'octant'),
  ((select id from public.zones where slug='zone-1'), 'zone-1.octant-npn', 'zone-1 octant (x-, y+, z-)', '-','+','-', 'Reflection / Aversion / Future',  'Octant sub-zone of zone-1: composite quality is "Reflection / Aversion / Future".',  'octant'),
  ((select id from public.zones where slug='zone-1'), 'zone-1.octant-npp', 'zone-1 octant (x-, y+, z+)', '-','+','+', 'Oppression / Aversion / Future',  'Octant sub-zone of zone-1: composite quality is "Oppression / Aversion / Future".',  'octant'),
  ((select id from public.zones where slug='zone-1'), 'zone-1.octant-pnn', 'zone-1 octant (x+, y-, z-)', '+','-','-', 'Reflection / Attraction / Past',  'Octant sub-zone of zone-1: composite quality is "Reflection / Attraction / Past".',  'octant'),
  ((select id from public.zones where slug='zone-1'), 'zone-1.octant-pnp', 'zone-1 octant (x+, y-, z+)', '+','-','+', 'Oppression / Attraction / Past',  'Octant sub-zone of zone-1: composite quality is "Oppression / Attraction / Past".',  'octant'),
  ((select id from public.zones where slug='zone-1'), 'zone-1.octant-ppn', 'zone-1 octant (x+, y+, z-)', '+','+','-', 'Reflection / Attraction / Future','Octant sub-zone of zone-1: composite quality is "Reflection / Attraction / Future".','octant'),
  ((select id from public.zones where slug='zone-1'), 'zone-1.octant-ppp', 'zone-1 octant (x+, y+, z+)', '+','+','+', 'Oppression / Attraction / Future','Octant sub-zone of zone-1: composite quality is "Oppression / Attraction / Future".','octant')
on conflict (slug) do nothing;

-- Zone 2 — axis (6)
insert into public.sub_zones (zone_id, slug, name, sign_x, sign_y, sign_z, composite_quality, description, kind) values
  ((select id from public.zones where slug='zone-2'), 'zone-2.axis-x-', 'zone-2 axis -x', '-','0','0', 'Fear',           'Axis sub-zone of zone-2 along -x. Composite quality: "Fear".',           'axis'),
  ((select id from public.zones where slug='zone-2'), 'zone-2.axis-x+', 'zone-2 axis +x', '+','0','0', 'Desire',         'Axis sub-zone of zone-2 along +x. Composite quality: "Desire".',         'axis'),
  ((select id from public.zones where slug='zone-2'), 'zone-2.axis-y-', 'zone-2 axis -y', '0','-','0', 'Past',           'Axis sub-zone of zone-2 along -y. Composite quality: "Past".',           'axis'),
  ((select id from public.zones where slug='zone-2'), 'zone-2.axis-y+', 'zone-2 axis +y', '0','+','0', 'Future',         'Axis sub-zone of zone-2 along +y. Composite quality: "Future".',         'axis'),
  ((select id from public.zones where slug='zone-2'), 'zone-2.axis-z-', 'zone-2 axis -z', '0','0','-', 'Contemplation',  'Axis sub-zone of zone-2 along -z. Composite quality: "Contemplation".',  'axis'),
  ((select id from public.zones where slug='zone-2'), 'zone-2.axis-z+', 'zone-2 axis +z', '0','0','+', 'Excitement',     'Axis sub-zone of zone-2 along +z. Composite quality: "Excitement".',     'axis')
on conflict (slug) do nothing;

-- Zone 2 — plane (12)
insert into public.sub_zones (zone_id, slug, name, sign_x, sign_y, sign_z, composite_quality, description, kind) values
  ((select id from public.zones where slug='zone-2'), 'zone-2.plane-x0-y-z-', 'zone-2 plane x=0 (y-, z-)', '0','-','-', 'Contemplation / Past',   'Plane sub-zone of zone-2 on x=0. Composite quality: "Contemplation / Past".',   'plane'),
  ((select id from public.zones where slug='zone-2'), 'zone-2.plane-x0-y-z+', 'zone-2 plane x=0 (y-, z+)', '0','-','+', 'Excitement / Past',      'Plane sub-zone of zone-2 on x=0. Composite quality: "Excitement / Past".',      'plane'),
  ((select id from public.zones where slug='zone-2'), 'zone-2.plane-x0-y+z-', 'zone-2 plane x=0 (y+, z-)', '0','+','-', 'Contemplation / Future', 'Plane sub-zone of zone-2 on x=0. Composite quality: "Contemplation / Future".', 'plane'),
  ((select id from public.zones where slug='zone-2'), 'zone-2.plane-x0-y+z+', 'zone-2 plane x=0 (y+, z+)', '0','+','+', 'Excitement / Future',    'Plane sub-zone of zone-2 on x=0. Composite quality: "Excitement / Future".',    'plane'),
  ((select id from public.zones where slug='zone-2'), 'zone-2.plane-y0-x-z-', 'zone-2 plane y=0 (x-, z-)', '-','0','-', 'Contemplation / Fear',   'Plane sub-zone of zone-2 on y=0. Composite quality: "Contemplation / Fear".',   'plane'),
  ((select id from public.zones where slug='zone-2'), 'zone-2.plane-y0-x-z+', 'zone-2 plane y=0 (x-, z+)', '-','0','+', 'Excitement / Fear',      'Plane sub-zone of zone-2 on y=0. Composite quality: "Excitement / Fear".',      'plane'),
  ((select id from public.zones where slug='zone-2'), 'zone-2.plane-y0-x+z-', 'zone-2 plane y=0 (x+, z-)', '+','0','-', 'Contemplation / Desire', 'Plane sub-zone of zone-2 on y=0. Composite quality: "Contemplation / Desire".', 'plane'),
  ((select id from public.zones where slug='zone-2'), 'zone-2.plane-y0-x+z+', 'zone-2 plane y=0 (x+, z+)', '+','0','+', 'Excitement / Desire',    'Plane sub-zone of zone-2 on y=0. Composite quality: "Excitement / Desire".',    'plane'),
  ((select id from public.zones where slug='zone-2'), 'zone-2.plane-z0-x-y-', 'zone-2 plane z=0 (x-, y-)', '-','-','0', 'Fear / Past',            'Plane sub-zone of zone-2 on z=0. Composite quality: "Fear / Past".',            'plane'),
  ((select id from public.zones where slug='zone-2'), 'zone-2.plane-z0-x-y+', 'zone-2 plane z=0 (x-, y+)', '-','+','0', 'Fear / Future',          'Plane sub-zone of zone-2 on z=0. Composite quality: "Fear / Future".',          'plane'),
  ((select id from public.zones where slug='zone-2'), 'zone-2.plane-z0-x+y-', 'zone-2 plane z=0 (x+, y-)', '+','-','0', 'Desire / Past',          'Plane sub-zone of zone-2 on z=0. Composite quality: "Desire / Past".',          'plane'),
  ((select id from public.zones where slug='zone-2'), 'zone-2.plane-z0-x+y+', 'zone-2 plane z=0 (x+, y+)', '+','+','0', 'Desire / Future',        'Plane sub-zone of zone-2 on z=0. Composite quality: "Desire / Future".',        'plane')
on conflict (slug) do nothing;

-- Zone 2 — octant (8)
insert into public.sub_zones (zone_id, slug, name, sign_x, sign_y, sign_z, composite_quality, description, kind) values
  ((select id from public.zones where slug='zone-2'), 'zone-2.octant-nnn', 'zone-2 octant (x-, y-, z-)', '-','-','-', 'Contemplation / Fear / Past',    'Octant sub-zone of zone-2: composite quality is "Contemplation / Fear / Past".',    'octant'),
  ((select id from public.zones where slug='zone-2'), 'zone-2.octant-nnp', 'zone-2 octant (x-, y-, z+)', '-','-','+', 'Excitement / Fear / Past',       'Octant sub-zone of zone-2: composite quality is "Excitement / Fear / Past".',       'octant'),
  ((select id from public.zones where slug='zone-2'), 'zone-2.octant-npn', 'zone-2 octant (x-, y+, z-)', '-','+','-', 'Contemplation / Fear / Future',  'Octant sub-zone of zone-2: composite quality is "Contemplation / Fear / Future".',  'octant'),
  ((select id from public.zones where slug='zone-2'), 'zone-2.octant-npp', 'zone-2 octant (x-, y+, z+)', '-','+','+', 'Excitement / Fear / Future',     'Octant sub-zone of zone-2: composite quality is "Excitement / Fear / Future".',     'octant'),
  ((select id from public.zones where slug='zone-2'), 'zone-2.octant-pnn', 'zone-2 octant (x+, y-, z-)', '+','-','-', 'Contemplation / Desire / Past',  'Octant sub-zone of zone-2: composite quality is "Contemplation / Desire / Past".',  'octant'),
  ((select id from public.zones where slug='zone-2'), 'zone-2.octant-pnp', 'zone-2 octant (x+, y-, z+)', '+','-','+', 'Excitement / Desire / Past',     'Octant sub-zone of zone-2: composite quality is "Excitement / Desire / Past".',     'octant'),
  ((select id from public.zones where slug='zone-2'), 'zone-2.octant-ppn', 'zone-2 octant (x+, y+, z-)', '+','+','-', 'Contemplation / Desire / Future','Octant sub-zone of zone-2: composite quality is "Contemplation / Desire / Future".','octant'),
  ((select id from public.zones where slug='zone-2'), 'zone-2.octant-ppp', 'zone-2 octant (x+, y+, z+)', '+','+','+', 'Excitement / Desire / Future',   'Octant sub-zone of zone-2: composite quality is "Excitement / Desire / Future".',   'octant')
on conflict (slug) do nothing;

-- Zone 3 — axis (6)
insert into public.sub_zones (zone_id, slug, name, sign_x, sign_y, sign_z, composite_quality, description, kind) values
  ((select id from public.zones where slug='zone-3'), 'zone-3.axis-x-', 'zone-3 axis -x', '-','0','0', 'Hate',         'Axis sub-zone of zone-3 along -x. Composite quality: "Hate".',         'axis'),
  ((select id from public.zones where slug='zone-3'), 'zone-3.axis-x+', 'zone-3 axis +x', '+','0','0', 'Love',         'Axis sub-zone of zone-3 along +x. Composite quality: "Love".',         'axis'),
  ((select id from public.zones where slug='zone-3'), 'zone-3.axis-y-', 'zone-3 axis -y', '0','-','0', 'Past',         'Axis sub-zone of zone-3 along -y. Composite quality: "Past".',         'axis'),
  ((select id from public.zones where slug='zone-3'), 'zone-3.axis-y+', 'zone-3 axis +y', '0','+','0', 'Future',       'Axis sub-zone of zone-3 along +y. Composite quality: "Future".',       'axis'),
  ((select id from public.zones where slug='zone-3'), 'zone-3.axis-z-', 'zone-3 axis -z', '0','0','-', 'Meditation',   'Axis sub-zone of zone-3 along -z. Composite quality: "Meditation".',   'axis'),
  ((select id from public.zones where slug='zone-3'), 'zone-3.axis-z+', 'zone-3 axis +z', '0','0','+', 'Acceleration', 'Axis sub-zone of zone-3 along +z. Composite quality: "Acceleration".', 'axis')
on conflict (slug) do nothing;

-- Zone 3 — plane (12)
insert into public.sub_zones (zone_id, slug, name, sign_x, sign_y, sign_z, composite_quality, description, kind) values
  ((select id from public.zones where slug='zone-3'), 'zone-3.plane-x0-y-z-', 'zone-3 plane x=0 (y-, z-)', '0','-','-', 'Meditation / Past',     'Plane sub-zone of zone-3 on x=0. Composite quality: "Meditation / Past".',     'plane'),
  ((select id from public.zones where slug='zone-3'), 'zone-3.plane-x0-y-z+', 'zone-3 plane x=0 (y-, z+)', '0','-','+', 'Acceleration / Past',   'Plane sub-zone of zone-3 on x=0. Composite quality: "Acceleration / Past".',   'plane'),
  ((select id from public.zones where slug='zone-3'), 'zone-3.plane-x0-y+z-', 'zone-3 plane x=0 (y+, z-)', '0','+','-', 'Meditation / Future',   'Plane sub-zone of zone-3 on x=0. Composite quality: "Meditation / Future".',   'plane'),
  ((select id from public.zones where slug='zone-3'), 'zone-3.plane-x0-y+z+', 'zone-3 plane x=0 (y+, z+)', '0','+','+', 'Acceleration / Future', 'Plane sub-zone of zone-3 on x=0. Composite quality: "Acceleration / Future".', 'plane'),
  ((select id from public.zones where slug='zone-3'), 'zone-3.plane-y0-x-z-', 'zone-3 plane y=0 (x-, z-)', '-','0','-', 'Meditation / Hate',     'Plane sub-zone of zone-3 on y=0. Composite quality: "Meditation / Hate".',     'plane'),
  ((select id from public.zones where slug='zone-3'), 'zone-3.plane-y0-x-z+', 'zone-3 plane y=0 (x-, z+)', '-','0','+', 'Acceleration / Hate',   'Plane sub-zone of zone-3 on y=0. Composite quality: "Acceleration / Hate".',   'plane'),
  ((select id from public.zones where slug='zone-3'), 'zone-3.plane-y0-x+z-', 'zone-3 plane y=0 (x+, z-)', '+','0','-', 'Meditation / Love',     'Plane sub-zone of zone-3 on y=0. Composite quality: "Meditation / Love".',     'plane'),
  ((select id from public.zones where slug='zone-3'), 'zone-3.plane-y0-x+z+', 'zone-3 plane y=0 (x+, z+)', '+','0','+', 'Acceleration / Love',   'Plane sub-zone of zone-3 on y=0. Composite quality: "Acceleration / Love".',   'plane'),
  ((select id from public.zones where slug='zone-3'), 'zone-3.plane-z0-x-y-', 'zone-3 plane z=0 (x-, y-)', '-','-','0', 'Hate / Past',           'Plane sub-zone of zone-3 on z=0. Composite quality: "Hate / Past".',           'plane'),
  ((select id from public.zones where slug='zone-3'), 'zone-3.plane-z0-x-y+', 'zone-3 plane z=0 (x-, y+)', '-','+','0', 'Hate / Future',         'Plane sub-zone of zone-3 on z=0. Composite quality: "Hate / Future".',         'plane'),
  ((select id from public.zones where slug='zone-3'), 'zone-3.plane-z0-x+y-', 'zone-3 plane z=0 (x+, y-)', '+','-','0', 'Love / Past',           'Plane sub-zone of zone-3 on z=0. Composite quality: "Love / Past".',           'plane'),
  ((select id from public.zones where slug='zone-3'), 'zone-3.plane-z0-x+y+', 'zone-3 plane z=0 (x+, y+)', '+','+','0', 'Love / Future',         'Plane sub-zone of zone-3 on z=0. Composite quality: "Love / Future".',         'plane')
on conflict (slug) do nothing;

-- Zone 3 — octant (8)
insert into public.sub_zones (zone_id, slug, name, sign_x, sign_y, sign_z, composite_quality, description, kind) values
  ((select id from public.zones where slug='zone-3'), 'zone-3.octant-nnn', 'zone-3 octant (x-, y-, z-)', '-','-','-', 'Meditation / Hate / Past',     'Octant sub-zone of zone-3: composite quality is "Meditation / Hate / Past".',     'octant'),
  ((select id from public.zones where slug='zone-3'), 'zone-3.octant-nnp', 'zone-3 octant (x-, y-, z+)', '-','-','+', 'Acceleration / Hate / Past',   'Octant sub-zone of zone-3: composite quality is "Acceleration / Hate / Past".',   'octant'),
  ((select id from public.zones where slug='zone-3'), 'zone-3.octant-npn', 'zone-3 octant (x-, y+, z-)', '-','+','-', 'Meditation / Hate / Future',   'Octant sub-zone of zone-3: composite quality is "Meditation / Hate / Future".',   'octant'),
  ((select id from public.zones where slug='zone-3'), 'zone-3.octant-npp', 'zone-3 octant (x-, y+, z+)', '-','+','+', 'Acceleration / Hate / Future', 'Octant sub-zone of zone-3: composite quality is "Acceleration / Hate / Future".', 'octant'),
  ((select id from public.zones where slug='zone-3'), 'zone-3.octant-pnn', 'zone-3 octant (x+, y-, z-)', '+','-','-', 'Meditation / Love / Past',     'Octant sub-zone of zone-3: composite quality is "Meditation / Love / Past".',     'octant'),
  ((select id from public.zones where slug='zone-3'), 'zone-3.octant-pnp', 'zone-3 octant (x+, y-, z+)', '+','-','+', 'Acceleration / Love / Past',   'Octant sub-zone of zone-3: composite quality is "Acceleration / Love / Past".',   'octant'),
  ((select id from public.zones where slug='zone-3'), 'zone-3.octant-ppn', 'zone-3 octant (x+, y+, z-)', '+','+','-', 'Meditation / Love / Future',   'Octant sub-zone of zone-3: composite quality is "Meditation / Love / Future".',   'octant'),
  ((select id from public.zones where slug='zone-3'), 'zone-3.octant-ppp', 'zone-3 octant (x+, y+, z+)', '+','+','+', 'Acceleration / Love / Future', 'Octant sub-zone of zone-3: composite quality is "Acceleration / Love / Future".', 'octant')
on conflict (slug) do nothing;

-- Zone 4 — caps (2)
insert into public.sub_zones (zone_id, slug, name, sign_x, sign_y, sign_z, composite_quality, description, kind) values
  ((select id from public.zones where slug='zone-4'), 'zone-4.north', 'Zone 4 north cap', 'any','any','+', 'Obliteration cap', 'The +z (north) polar cap of the bipyramid — the region where the bipyramid extends past Shell 3 toward Obliteration at (0, 0, +φ).', 'cap'),
  ((select id from public.zones where slug='zone-4'), 'zone-4.south', 'Zone 4 south cap', 'any','any','-', 'Awakening cap',    'The -z (south) polar cap of the bipyramid — the region where the bipyramid extends past Shell 3 toward Awakening at (0, 0, -φ).',    'cap')
on conflict (slug) do nothing;

-- ============================================================================
-- End of baseline.
-- ============================================================================
