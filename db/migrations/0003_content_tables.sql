-- 0003_content_tables.sql
-- Vegar's Diamond — Phase 1 schema, migration 3 of 4
-- Content tables: sources, source_positions, resonances, prose_sections,
-- glossary_terms, revisions.
--
-- Design notes:
--   * sources:source_positions is many-to-many. This implements the
--     Diamond_Changelist tier-1.5 fix: Plotinus VI.9.11 (and others) attach
--     to multiple coordinates without row-duplicating the source.
--   * sources.superseded_by lets re-attributions (changelist 1.2 Aśvaghoṣa
--     bundle split) preserve audit traceability rather than deleting history.
--   * resonances enforces source_a_id < source_b_id so the magenta web is
--     stored once per pair, not twice.
--   * revisions is append-only: every Directus or workflow write logs here.

set search_path = public, extensions;

-------------------------------------------------------------------------------
-- sources
-------------------------------------------------------------------------------
create table sources (
  id              uuid primary key default gen_random_uuid(),
  slug            text not null unique,
  title           text not null,
  author          text,
  year            text,                              -- text: 'c. 250', '12th c.', '1929' all valid
  citation        text,                              -- formatted Chicago author-date
  tradition       text,                              -- 'Plotinian', 'Zen', 'Kabbalah', 'Sufi', etc.
  notes           text,
  superseded_by   uuid references sources(id),       -- non-null = this row was split/merged into another
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

create index sources_tradition_idx    on sources (tradition);
create index sources_superseded_idx   on sources (superseded_by);

create trigger sources_set_updated_at
  before update on sources
  for each row execute function extensions.moddatetime(updated_at);

-------------------------------------------------------------------------------
-- source_positions  (many-to-many: one source can sit at many coordinates)
-------------------------------------------------------------------------------
create table source_positions (
  id              uuid primary key default gen_random_uuid(),
  source_id       uuid not null references sources(id) on delete cascade,
  coordinate_id   uuid not null references coordinates(id) on delete restrict,
  offset_x        numeric(10,6) not null default 0,    -- small jitter for visual layout
  offset_y        numeric(10,6) not null default 0,
  offset_z        numeric(10,6) not null default 0,
  weight          numeric(5,2) not null default 1.0,   -- how strongly this source claims this position
  rationale       text,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now(),
  unique (source_id, coordinate_id)
);

create index source_positions_source_idx     on source_positions (source_id);
create index source_positions_coordinate_idx on source_positions (coordinate_id);

create trigger source_positions_set_updated_at
  before update on source_positions
  for each row execute function extensions.moddatetime(updated_at);

-------------------------------------------------------------------------------
-- resonances  (the magenta web)
-------------------------------------------------------------------------------
create table resonances (
  id              uuid primary key default gen_random_uuid(),
  source_a_id     uuid not null references sources(id) on delete cascade,
  source_b_id     uuid not null references sources(id) on delete cascade,
  kind            text,                                -- 'thematic' | 'historical' | 'structural' | etc.
  notes           text,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now(),
  constraint resonance_pair_ordered check (source_a_id < source_b_id),
  unique (source_a_id, source_b_id, kind)
);

create index resonances_a_idx on resonances (source_a_id);
create index resonances_b_idx on resonances (source_b_id);

create trigger resonances_set_updated_at
  before update on resonances
  for each row execute function extensions.moddatetime(updated_at);

-------------------------------------------------------------------------------
-- prose_sections  (long-form content; copy starts as placeholder)
-------------------------------------------------------------------------------
create table prose_sections (
  id              uuid primary key default gen_random_uuid(),
  slug            text not null unique,                -- 'begin-here','being','awakening','time-axis', etc.
  title           text not null,
  body_md         text,                                -- markdown source of truth
  ord             integer not null,                    -- display order on readings page
  is_published    boolean not null default false,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

create trigger prose_sections_set_updated_at
  before update on prose_sections
  for each row execute function extensions.moddatetime(updated_at);

-------------------------------------------------------------------------------
-- glossary_terms  (changelist 1.7)
-------------------------------------------------------------------------------
create table glossary_terms (
  id              uuid primary key default gen_random_uuid(),
  term            text not null unique,
  definition_md   text,
  see_also        text[] not null default '{}',        -- array of slugs
  language        text,                                -- 'sanskrit','greek','german','latin','arabic', etc.
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

create trigger glossary_terms_set_updated_at
  before update on glossary_terms
  for each row execute function extensions.moddatetime(updated_at);

-------------------------------------------------------------------------------
-- revisions  (append-only audit log; powers changelist 5.4)
-------------------------------------------------------------------------------
create table revisions (
  id              bigserial primary key,
  table_name      text not null,
  row_id          uuid,
  op              text not null,                       -- 'INSERT' | 'UPDATE' | 'DELETE'
  actor           text,                                -- 'directus:vegar' | 'workflow:agent-push' | etc.
  diff            jsonb,
  occurred_at     timestamptz not null default now()
);

create index revisions_table_idx    on revisions (table_name);
create index revisions_row_idx      on revisions (row_id);
create index revisions_occurred_idx on revisions (occurred_at desc);
