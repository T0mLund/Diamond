-- 0002_core_tables.sql
-- Vegar's Diamond — Phase 1 schema, migration 2 of 4
-- Core geometric tables: axes, shells, coordinates.
--
-- The Diamond's geometry (Scheme α, locked):
--   Bipyramid + sphere with three orthogonal axes (vertical, affect, time).
--   Five radii, all derived from φ:
--     inner shells   : 1/φ³ ≈ 0.236, 1/φ² ≈ 0.382, 1/φ ≈ 0.618
--     equatorial     : 1.0   (Hate/Love, Past/Future flush with sphere)
--     pyramid tips   : √φ   ≈ 1.272 (used by the bipyramid envelope)
--     birth/death    : φ    ≈ 1.618 (Birth nadir, Death apex)
--   τ-slider deforms the bipyramid → horn torus; τ=0 is rest, τ=1 is identity.
--
-- We store radii as numeric so the front-end derives positions from data,
-- not from magic numbers in code.

set search_path = public, extensions;

-------------------------------------------------------------------------------
-- axes
-------------------------------------------------------------------------------
create table axes (
  id              uuid primary key default gen_random_uuid(),
  slug            text not null unique,            -- 'vertical' | 'affect' | 'time'
  name            text not null,                   -- 'Vertical', 'Affect', 'Time'
  description     text,
  positive_pole   text not null,                   -- 'Death', 'Love', 'Future'
  negative_pole   text not null,                   -- 'Birth', 'Hate', 'Past'
  ord             smallint not null unique,        -- display order: 1,2,3
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

create trigger axes_set_updated_at
  before update on axes
  for each row execute function extensions.moddatetime(updated_at);

-------------------------------------------------------------------------------
-- shells
-------------------------------------------------------------------------------
-- The φ-cascade as data. Inner shells fade lines (the "breath rule"); the
-- equatorial sphere holds Hate/Love/Past/Future; the φ-tier holds Birth/Death.
create table shells (
  id              uuid primary key default gen_random_uuid(),
  slug            text not null unique,            -- 'inner-1','inner-2','inner-3','sphere','phi-tier'
  name            text not null,
  radius          numeric(12,9) not null,          -- 0.236… 0.382… 0.618… 1.000 1.618…
  ord             smallint not null unique,        -- 1=innermost … 5=outermost
  is_inner        boolean not null default false,  -- inner shells obey the breath rule
  description     text,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

create trigger shells_set_updated_at
  before update on shells
  for each row execute function extensions.moddatetime(updated_at);

-------------------------------------------------------------------------------
-- coordinates
-------------------------------------------------------------------------------
-- Named points in the Diamond's interior. BEING is the origin (0,0,0).
-- The six axis poles sit at radius 1.0 (equatorial) or φ (vertical poles).
-- Inner-tier names (Oppression/Excitement/Intensity above; Reflection/
-- Meditation/Insight below) sit at radii 1/φ, 1/φ², 1/φ³ on the vertical.
--
-- Position is stored as PointZ in SRID 0 (abstract space, not Earth).
-- xyz mapping: x = affect axis (Hate−1 → Love+1)
--              y = time axis   (Past−1 → Future+1)
--              z = vertical    (Birth−φ → Death+φ)
create table coordinates (
  id              uuid primary key default gen_random_uuid(),
  slug            text not null unique,            -- 'being','death','birth','love','hate','past','future', etc.
  name            text not null,
  axis_id         uuid references axes(id),        -- nullable: BEING and interstitials are not on a single axis
  shell_id        uuid references shells(id),      -- nullable: BEING is shell-less
  position        geometry(PointZ, 0) not null,    -- abstract SRID
  is_origin       boolean not null default false,  -- true only for BEING
  is_pole         boolean not null default false,  -- true for the 6 axis poles
  description     text,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now(),
  constraint one_origin check (is_origin = false or (is_pole = false and axis_id is null and shell_id is null))
);

create unique index coordinates_one_origin_idx
  on coordinates ((true)) where is_origin = true;

create index coordinates_position_gix on coordinates using gist (position);
create index coordinates_axis_idx     on coordinates (axis_id);
create index coordinates_shell_idx    on coordinates (shell_id);

create trigger coordinates_set_updated_at
  before update on coordinates
  for each row execute function extensions.moddatetime(updated_at);
