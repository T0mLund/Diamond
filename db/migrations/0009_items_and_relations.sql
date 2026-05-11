-- 0009_items_and_relations.sql
-- Vegar's Diamond — Items and Relations Taxonomy
--
-- Background
-- ----------
-- §7 of Diamond_vNext+1_Spec.md introduces a data-model layer separate from
-- the geometry: persons, texts, concepts, practices, traditions, and
-- commentaries that need to be *placed in relation to* the coordinate system
-- and to each other.
--
-- This migration creates:
--
--   1. Enum types `item_kind`, `anchor_kind`, `shape_type`,
--      `epistemic_status`, `relation_kind` — exactly matching §7.2, §7.3,
--      §7.4, §7.5, §7.6 of the vNext+1 spec.
--   2. An `items` table holding the items themselves with an optional anchor.
--   3. An `item_relations` table holding typed edges between items.
--   4. Indices for common access patterns.
--   5. A `current_items` view exposing only items whose `effective_period`
--      includes the present moment (for the renderer).
--
-- Design constraints carried from §7.8:
--
--   * Architecture B (relation ribbons) requires *no* schema changes — the
--     renderer reads `item_relations` and draws curves.
--   * Architecture C (discourses) requires *only* two new tables; the
--     present schema is forward-compatible.
--   * Shape geometry lives in JSONB, not in a fixed columnar shape — so new
--     shape types can be added without further migrations.
--   * Both `provenance` and `epistemic_status` are first-class so every
--     anchor and every relation carries its interpretive lineage.
--
-- Compatibility note
-- ------------------
-- 0001–0008 establish the geometry (shells, axes, zones, sub-zones,
-- coordinates). This migration depends only on `sub_zones(slug)` and
-- `zones(slug)` from those migrations for the optional anchor foreign keys.
-- It does not modify anything in 0001–0008.

begin;

-- ----------------------------------------------------------------------------
-- 1. Enum types
-- ----------------------------------------------------------------------------

-- §7.2 — Item kinds (closed for now; extending requires a migration).
do $$ begin
  if not exists (select 1 from pg_type where typname = 'item_kind') then
    create type item_kind as enum (
      'person',
      'text',
      'concept',
      'practice',
      'tradition',
      'commentary'
    );
  end if;
end $$;

-- §7.3 — Anchor kinds.
do $$ begin
  if not exists (select 1 from pg_type where typname = 'anchor_kind') then
    create type anchor_kind as enum (
      'coordinate',     -- one of the 9 named landmarks
      'sub_zone',       -- one of the 80 sub-zones
      'zone',           -- one of the 4 zones
      'axis_segment',   -- a (sign × axis) within a zone or range
      'shape',          -- user-defined geometric region (§7.4)
      'none'            -- item exists but is not geometrically anchored
    );
  end if;
end $$;

-- §7.4 — Shape ontology. Six geometric primitives.
do $$ begin
  if not exists (select 1 from pg_type where typname = 'shape_type') then
    create type shape_type as enum (
      'point',
      'region_anchor',  -- redundant with zone/sub_zone but kept for renderer parity
      'polyline',
      'polygon',
      'volume',
      'cone_view'       -- axis vector + half-angle, anchored at BEING
    );
  end if;
end $$;

-- §7.5 — Epistemic status. Shape anchors must be 'interpretive' or
-- 'hypothetical' (enforced by a constraint on `items` below).
do $$ begin
  if not exists (select 1 from pg_type where typname = 'epistemic_status') then
    create type epistemic_status as enum (
      'definitional',   -- forced by the geometry (landmarks, zones, sub-zones)
      'stipulated',     -- chosen without justification
      'interpretive',   -- a reading
      'hypothetical',   -- under investigation
      'borrowed'        -- taken from a tradition without verification
    );
  end if;
end $$;

-- §7.6 — Relation kinds.
do $$ begin
  if not exists (select 1 from pg_type where typname = 'relation_kind') then
    create type relation_kind as enum (
      'authored_by',
      'comments_on',
      'cites',
      'responds_to',
      'translates',
      'belongs_to_tradition',
      'influenced_by',
      'practices',
      'develops',
      'other'           -- requires non-null notes
    );
  end if;
end $$;

-- ----------------------------------------------------------------------------
-- 2. items table
-- ----------------------------------------------------------------------------

create table if not exists items (
  id                        uuid primary key default gen_random_uuid(),

  -- Identity
  slug                      text not null unique
                              check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  kind                      item_kind not null,
  name                      text not null,
  description               text,

  -- Anchor (§7.3 + §7.4)
  anchor_kind               anchor_kind not null default 'none',
  anchor_sub_zone_slug      text references sub_zones(slug) on delete restrict,
  anchor_zone_slug          text references zones(slug)     on delete restrict,
  anchor_coordinate_slug    text references coordinates(slug) on delete restrict,
  anchor_axis_segment       text,                            -- e.g. 'z-' or 'z- zones 1..3'
  anchor_shape_type         shape_type,                      -- only used when anchor_kind='shape'
  anchor_geometry           jsonb,                           -- shape payload; see notes below

  -- Biographical / contextual metadata (free-form, optional)
  tradition                 text,
  primary_period            text,

  -- Provenance and epistemic posture (§7.5)
  provenance                text,
  epistemic_status          epistemic_status not null default 'stipulated',

  -- Optional temporal validity for the anchor
  effective_period_start    date,
  effective_period_end      date,

  -- Bookkeeping
  created_at                timestamptz not null default now(),
  updated_at                timestamptz not null default now(),

  -- ----------------------------------------------------------------
  -- Anchor consistency constraints (§7.3, §7.5)
  -- ----------------------------------------------------------------

  -- anchor_kind dictates which anchor_* column must be populated.
  constraint items_anchor_kind_consistency check (
    case anchor_kind
      when 'coordinate'   then anchor_coordinate_slug is not null
                            and anchor_sub_zone_slug is null
                            and anchor_zone_slug     is null
                            and anchor_shape_type    is null
      when 'sub_zone'     then anchor_sub_zone_slug is not null
                            and anchor_coordinate_slug is null
                            and anchor_zone_slug     is null
                            and anchor_shape_type    is null
      when 'zone'         then anchor_zone_slug is not null
                            and anchor_coordinate_slug is null
                            and anchor_sub_zone_slug is null
                            and anchor_shape_type    is null
      when 'axis_segment' then anchor_axis_segment is not null
                            and anchor_shape_type    is null
      when 'shape'        then anchor_shape_type is not null
                            and anchor_geometry  is not null
                            and anchor_coordinate_slug is null
                            and anchor_sub_zone_slug is null
                            and anchor_zone_slug     is null
      when 'none'         then anchor_coordinate_slug is null
                            and anchor_sub_zone_slug is null
                            and anchor_zone_slug     is null
                            and anchor_axis_segment  is null
                            and anchor_shape_type    is null
                            and anchor_geometry      is null
    end
  ),

  -- §7.5: shape anchors cannot be 'definitional'.
  constraint items_shape_not_definitional check (
    anchor_kind <> 'shape' or epistemic_status <> 'definitional'
  ),

  -- §7.5: shape anchors require non-null provenance.
  constraint items_shape_requires_provenance check (
    anchor_kind <> 'shape' or (provenance is not null and length(trim(provenance)) > 0)
  ),

  -- Temporal sanity.
  constraint items_effective_period_valid check (
    effective_period_start is null
    or effective_period_end is null
    or effective_period_start <= effective_period_end
  )
);

comment on table items is
  'Vegar''s Diamond §7 — persons, texts, concepts, practices, traditions, '
  'commentaries placed in relation to the geometry and to each other.';

comment on column items.anchor_geometry is
  'Shape payload (JSONB) used when anchor_kind=''shape''. Schema by shape_type: '
  'point: {"x":n,"y":n,"z":n}; '
  'polyline: {"points":[{"x":n,"y":n,"z":n},...]}; '
  'polygon: {"vertices":[{"x":n,"y":n,"z":n},...]}; '
  'volume: {"predicate":"<expression>"} or {"sub_zones":["...",...]}; '
  'cone_view: {"axis":{"x":n,"y":n,"z":n},"half_angle_deg":n}; '
  'region_anchor: {"zone":"...","sub_zone":"..."}. '
  'Renderer dispatches on anchor_shape_type.';

-- Indices
create index if not exists idx_items_kind         on items (kind);
create index if not exists idx_items_anchor_kind  on items (anchor_kind);
create index if not exists idx_items_sub_zone     on items (anchor_sub_zone_slug)
  where anchor_sub_zone_slug is not null;
create index if not exists idx_items_zone         on items (anchor_zone_slug)
  where anchor_zone_slug is not null;
create index if not exists idx_items_coordinate   on items (anchor_coordinate_slug)
  where anchor_coordinate_slug is not null;
create index if not exists idx_items_tradition    on items (tradition)
  where tradition is not null;

-- updated_at trigger
create or replace function set_items_updated_at() returns trigger as $$
begin
  new.updated_at := now();
  return new;
end $$ language plpgsql;

drop trigger if exists items_set_updated_at on items;
create trigger items_set_updated_at
  before update on items
  for each row execute function set_items_updated_at();

-- ----------------------------------------------------------------------------
-- 3. item_relations table
-- ----------------------------------------------------------------------------

create table if not exists item_relations (
  id            uuid primary key default gen_random_uuid(),
  from_item_id  uuid not null references items(id) on delete cascade,
  to_item_id    uuid not null references items(id) on delete cascade,
  kind          relation_kind not null,
  notes         text,
  provenance    text,
  created_at    timestamptz not null default now(),

  -- No self-loops by default.
  constraint item_relations_no_self_loop
    check (from_item_id <> to_item_id),

  -- 'other' requires non-null notes (§7.6).
  constraint item_relations_other_requires_notes
    check (kind <> 'other' or (notes is not null and length(trim(notes)) > 0))
);

comment on table item_relations is
  'Vegar''s Diamond §7.6 — typed edges between items. '
  'Relations are *between items*, never between items and geometry. '
  'Read by Architecture B renderer for relation ribbons (deferred, §9).';

create unique index if not exists uq_item_relations_triple
  on item_relations (from_item_id, to_item_id, kind);

create index if not exists idx_item_relations_from  on item_relations (from_item_id);
create index if not exists idx_item_relations_to    on item_relations (to_item_id);
create index if not exists idx_item_relations_kind  on item_relations (kind);

-- ----------------------------------------------------------------------------
-- 4. current_items view
-- ----------------------------------------------------------------------------
-- Items whose effective_period (if any) includes the present moment.
-- Items without an effective_period are always current.

create or replace view current_items as
  select i.*
    from items i
   where (i.effective_period_start is null or i.effective_period_start <= current_date)
     and (i.effective_period_end   is null or i.effective_period_end   >= current_date);

comment on view current_items is
  'Items whose effective_period includes today. Renderer-friendly default.';

-- ----------------------------------------------------------------------------
-- 5. Sanity probe (non-destructive)
-- ----------------------------------------------------------------------------
-- After running this migration, the worked Dōgen example from §7.7 can be
-- inserted by an Editor (not by this migration) like so:
--
--   insert into items (slug, kind, name, anchor_kind, anchor_sub_zone_slug,
--                      tradition, primary_period, provenance, epistemic_status)
--   values
--     ('dogen-zenji', 'person', 'Dōgen Zenji', 'sub_zone',
--      'zone-3.axis-z-',
--      'Sōtō Zen', '13th century',
--      'Editor placement, 2026; biographical centre-of-mass of contemplative output.',
--      'interpretive');
--
--   insert into items (slug, kind, name, anchor_kind, anchor_shape_type,
--                      anchor_geometry, provenance, epistemic_status)
--   values
--     ('shobogenzo', 'text', 'Shōbōgenzō', 'shape', 'polygon',
--      '{"vertices":[{"x":-0.3,"y":0.0,"z":-0.5},{"x": 0.3,"y":0.0,"z":-0.5},'
--                  '{"x": 0.0,"y":-0.3,"z":-0.7},{"x": 0.0,"y": 0.3,"z":-0.3}]}'::jsonb,
--      'Editor mapping, 2026; textual coverage in Zone 3 z− with adjacent extensions.',
--      'interpretive');
--
--   insert into item_relations (from_item_id, to_item_id, kind)
--   select s.id, d.id, 'authored_by'
--     from items s, items d
--    where s.slug = 'shobogenzo' and d.slug = 'dogen-zenji';
--
-- The above is illustrative only; production seeding belongs in a separate
-- data migration once anchor decisions are reviewed by Editor.

commit;

-- ----------------------------------------------------------------------------
-- Roll-forward expectations
-- ----------------------------------------------------------------------------
-- * No prior rows are modified. This migration adds tables only.
-- * It is safe to run on a database where 0001–0008 have been applied.
-- * To verify install:
--
--     select count(*) from items;             -- expect 0
--     select count(*) from item_relations;    -- expect 0
--     select typname from pg_type
--      where typname in ('item_kind','anchor_kind','shape_type',
--                        'epistemic_status','relation_kind');
--     -- expect five rows
--
-- * To roll back (development only):
--
--     drop view  if exists current_items;
--     drop table if exists item_relations;
--     drop table if exists items;
--     drop type  if exists relation_kind;
--     drop type  if exists epistemic_status;
--     drop type  if exists shape_type;
--     drop type  if exists anchor_kind;
--     drop type  if exists item_kind;
