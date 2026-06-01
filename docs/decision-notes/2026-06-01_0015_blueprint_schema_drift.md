# Decision Note — 0015 blueprint schema drift fixes

**Date:** 2026-06-01
**Author:** Council session (Vegar + agent)
**Status:** Approved
**Scope:** `db/migrations/0015_route_b_zone_partition.sql` only
**Related:**
- `docs/decision-notes/2026-06-01_r1_route_b_closure.md` (parent decision)
- `docs/Diamond_Spec_v3.0.md` §6.2 (26→52 Z3 sub-zones)
- `docs/Diamond_Roadmap_v3.0.md` Part II R1 (blueprint reference)
- PR #8 (v3.0 commitment, where the v1 blueprint shipped)

## Trigger

While walking through the Supabase application steps for the v1 blueprint
(immediately after PR #8 merged), the agent re-read the live schema of
`public.sub_zones` against the project `zilnqideoswbsnbctqhi` and found
that the v1 blueprint assumed a column layout that does not match the
live schema. Running the v1 blueprint body would have failed at the
first INSERT.

No SQL was executed against the database. The guard variable was set in
the SQL Editor session, but only the two empty `SET` and pre-flight
SELECTs ran before the drift was caught.

## Drift findings

The v1 blueprint assumed `(slug, label, description)` as the relevant
columns. The live schema has:

| Column              | Type            | Nullable | Notes                                          |
| ------------------- | --------------- | -------- | ---------------------------------------------- |
| `id`                | uuid            | NO       | default `gen_random_uuid()`                    |
| `zone_id`           | uuid            | NO       | FK -> `zones.id` ON DELETE CASCADE             |
| `slug`              | text            | NO       | UNIQUE                                         |
| `name`              | text            | NO       | (v1 blueprint called this `label`)             |
| `sign_x`            | text            | NO       | CHECK IN ('+','-','0','any')                   |
| `sign_y`            | text            | NO       | CHECK IN ('+','-','0','any')                   |
| `sign_z`            | text            | NO       | CHECK IN ('+','-','0','any')                   |
| `composite_quality` | text            | YES      | e.g. "Love", "Hate", "Past", "Future"          |
| `description`       | text            | YES      |                                                |
| `created_at`        | timestamptz     | NO       | default `now()`                                |
| `updated_at`        | timestamptz     | NO       | default `now()`                                |
| `kind`              | text            | NO       | default `'octant'`; CHECK IN ('octant','plane','axis','cap') |

Constraints that affect the partition:

- `UNIQUE (slug)` — fine; the new slugs are distinct.
- `UNIQUE (zone_id, sign_x, sign_y, sign_z)` — **breaks the partition.**
  Inner and outer children of a given Z3 parent share the same
  `(zone_id, sign_x, sign_y, sign_z)` tuple as the parent, so we cannot
  have all three rows simultaneously.

## Decisions

### D1. Use `name`, not `label`.

The blueprint INSERT writes into `name`, not `label`. The label-format
convention follows the council decision below.

### D2. Carry over `zone_id`, `sign_x`, `sign_y`, `sign_z`, `kind`, `composite_quality` from the parent.

These are intrinsic to the angular sub-zone and do not change between
the inner and outer halves. The new rows copy them verbatim.

### D3. Add a `bipyramid_side` discriminator column.

Type: `TEXT`, nullable, with `CHECK (bipyramid_side IS NULL OR bipyramid_side IN ('inner','outer'))`.

- Parent rows (the 26 retired Z3 angulars, the 2 polar caps, the Z1/Z2
  rows): `bipyramid_side IS NULL`. Semantics: "whole sub-zone, no
  bipyramid partition."
- New children: `bipyramid_side = 'inner'` or `'outer'`.

### D4. Replace the composite UNIQUE with one that includes `bipyramid_side`.

Drop `UNIQUE (zone_id, sign_x, sign_y, sign_z)`. Create:

```sql
CREATE UNIQUE INDEX sub_zones_zone_signs_side_uniq
  ON public.sub_zones (
    zone_id, sign_x, sign_y, sign_z,
    COALESCE(bipyramid_side, '_self_')
  );
```

`COALESCE(..., '_self_')` is the universal-Postgres way to treat the
parent's NULL side as a distinct value, so all three rows (parent,
inner child, outer child) coexist. Postgres 15+ `NULLS NOT DISTINCT`
on a unique constraint would also work, but the expression-index form
is robust across versions and explicit about intent.

### D5. Label convention: "inside bipyramid" / "outside bipyramid".

- Inner: `parent.name || ' (inside bipyramid)'`
- Outer: `parent.name || ' (outside bipyramid)'`

This was Option C in the 2026-06-01 council. Rejected alternatives:

- "(inside)" / "(interstitial)" — concise but conflicts with the
  v2 "interstitial shell" concept that v3.0 retired under Route B,
  and "interstitial" geometrically implies *between two surfaces*
  while the outer half is a half-space extending to infinity.

The Spec glossary will continue to use "outside the bipyramid" rather
than "interstitial" for the outer half; this is consistent with
v3.0 §6.22 language.

### D6. Description appends the Route B partition paragraph.

The new child's description = parent's description + a blank line +
`Route B partition (2026-06-01): {inner|outer} half of {parent.slug},
i.e. the part of this Z3 angular sub-zone that lies {inside|outside}
the bipyramid |x|+|y|+|z|/phi <= 1.`

### D7. The migration remains a BLUEPRINT.

Application policy from the v1 blueprint stands: this file is NOT to
be executed until (a) the first item is inserted with a Z3 anchor, AND
(b) Vegar explicitly approves at that time. The guard variable
(`SET diamond.route_b_migration.acknowledged = 'yes'`) is preserved.

## Verification expectations (when the migration is eventually applied)

| Metric                              | Before | After |
| ----------------------------------- | ------ | ----- |
| `sub_zones` total rows              | 80     | 106   |
| Z3 children active (`.inner`/`.outer`, `bipyramid_side` not NULL) | 0   | 52  |
| Z3 parents deprecated (`bipyramid_side IS NULL`, `deprecated_at` set) | 0   | 26  |
| Z3 active rows                      | 26     | 52    |
| Polar caps active                   | 2      | 2     |
| `bipyramid_side` column exists      | no     | yes   |
| `deprecated_at` column exists       | no     | yes   |
| `UNIQUE (zone_id, sign_x, sign_y, sign_z)` | yes (constraint) | replaced by expression index |

## Out of scope for this fix

- Item-zone references. The `items` table refers to sub-zones by
  `anchor_sub_zone_slug` (text), not by FK id. No schema change is
  required there to follow Route B; the migration only changes
  `sub_zones`.
- Application of the migration. Still gated on item insertion + user
  approval per R3 defer.
- Re-running anything against the live database in this session. The
  fix is committed to the repo; the SQL Editor session that the user
  opened earlier today should be closed without applying.

## Convention §4 / §9 implications

Per Convention §4.4 ("skip major number on drift"), this fix does NOT
require a documentation major bump. The drift is confined to a
migration blueprint, not to a `Diamond_*_v3.0.md` doc. The CHANGELOG
will receive a `v3.0.1`-style patch line referencing this PR; no
`-draft` cycle is needed.
