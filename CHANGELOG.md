# Diamond — CHANGELOG

Per `docs/Diamond_Versioning_Convention_v1.1.md` §7, this file accumulates
linearly across all committed iterations. The active Summary always shows
only the current iteration's changes relative to the immediately previous
*committed* baseline (never against an archived draft).

This file is created at the v3.0 commitment on 2026-06-01. The v1.0
baseline is reconstructable from git history prior to commit `5a004b5`
(the v3.0-draft consolidation).

---

## v3.0 — committed 2026-06-01 (PR #8)

**Baseline transition:** v1.0 → v3.0. v2.0 / v2.1 were never committed;
their drafts are archived under `/docs/archive/v2-drafts/`.

### R-thread close-outs (2026-06-01)

- **R1 — CLOSED under Route B.** The bipyramid is promoted to a **second
  containment system** operating alongside the φ-spheres. Z3 is
  jointly defined: 26 angular sub-zones × 2 (`.inner` / `.outer` halves)
  = **52 sub-zones**. The φ-shell formerly called Z4 is retired in
  prose; only the two **polar caps** (inside-bipyramid) are defined
  regions; the equatorial belt is undefined / blank (conservative
  Route B). Hypothesis register: H5 ADOPTED.
- **R2 — HARD-DELETED.** The M3 super-structure for multiple Diamonds
  was disregarded per user instruction ("hypothetical speculation and
  irrelevant"). H6 DISREGARDED. No multi-subject commitments are
  carried forward.
- **R3 — DEFERRED** until first item insertion into a Z3 sub-zone.
  `items.effective_period` (Migration 0009) stays in schema. H7 deferred.
- **Decision memo:** `docs/decision-notes/2026-06-01_r1_route_b_closure.md`.
- **Migration blueprint (NOT applied):**
  `db/migrations/0015_route_b_zone_partition.sql` — drafted for the
  eventual schema partition; application is gated on (i) first item
  insertion into Z3 and (ii) explicit user approval.

### Framework changes folded forward from the v2-draft cycle

- **Spec §4.6** — Exactness rule for geometric quantities (analytic /
  bounded / dated-measured with declared precision). Adopted as rule.
- **Spec §4.7** — Epistemic-class triage as governance rule (every
  substantive claim tagged *derived* / *stipulated* / *borrowed*).
- **Spec §6.7** — Time axis reframed as nested horizons. "Intensifies"
  retired for the time axis; replaced by *unfolds*, *dilates*, *deepens*.
- **Spec §6.22** — Bipyramid canonical description is the convex hull
  of the six landmark coordinates (H8 closed as theorem).
- **Spec §6.23** — Zone-bipyramid containment table; Z1 / Z2 both
  100% inside (H9 closed as theorem); Z3 32.21% / 67.79%, measured
  2026-05-11.
- **Spec §6.24** — Mixed-reading of sub-zone and landmark labels
  (Class T default, Class H hybrid, Class S empty).
- **Spec §6.25** — Historical lineage of spatial representation
  (four borrowings + one stipulation).
- **Spec §10** — Hypothesis register extended with H8–H13.
- **Containment Note (standalone document)** — R1 and R3 reframed as
  containment questions at different scales. Appendix A "User as
  Inhabitant" introduces the canonical two-perspective camera regime.
- **Roadmap I.1 – I.10** — Cross-cutting questions enumerated. I.9
  (color: OKLab decomposition, X→chroma / Y→hue / Z→lightness) and
  I.10 (active-zone semantics, AZ.5 default) **architecture locked**.
- **Roadmap Part III — Phase 1.5b, Phase 1.5c** — Infrastructure
  hygiene. Both CLOSED. Phase 1.5b: `0001_baseline.sql` idempotent.
  Phase 1.5c: `0010`–`0014` RLS remediation (full private mode).
- **Roadmap Part IV — Deployment ladder** *(new Part)*. Stages 1 – 4
  in scope; Stages 5+ enumerated as tracked decisions.

### Convention bumps

- `Diamond_Versioning_Convention_v1.1.md` accompanies the v3.0 baseline
  (committed alongside, no separate version bump on the convention).

### Naming / housekeeping

- **No v1.0 archive move.** No `Diamond_*_v1.0.md` files existed in the
  active workspace; the v1.0 baseline existed only in git history prior
  to commit `5a004b5` (v3.0-draft consolidation). This is recorded as
  an irregularity for the historical record.

### PR

[T0mLund/Diamond#8](https://github.com/T0mLund/Diamond/pull/8).

---

## v3.0.1 — 2026-06-01 (patch, post-merge of PR #8)

Scope: `db/migrations/0015_route_b_zone_partition.sql` blueprint only.
No `Diamond_*_v3.0.md` doc was altered, so per Convention §4.4 this is
a patch, not a draft cycle.

### Fixed

- **Migration 0015 schema drift.** The v1 blueprint shipped in PR #8
  assumed `(slug, label, description)` columns on `public.sub_zones`.
  The live schema has `(slug, name, ...)` plus NOT NULL `zone_id`,
  `sign_x/y/z`, `kind`, and a `UNIQUE (zone_id, sign_x, sign_y, sign_z)`
  composite constraint that the partition would have violated. The v2
  blueprint:
  - Uses `name` (not `label`).
  - Copies `zone_id`, `sign_x`, `sign_y`, `sign_z`, `kind`,
    `composite_quality` from parent to children.
  - Adds a `bipyramid_side` column (`'inner'` / `'outer'` / NULL) with a
    CHECK constraint.
  - Drops the composite UNIQUE and replaces it with a unique expression
    index that includes `COALESCE(bipyramid_side, '_self_')`, so a
    deprecated parent row coexists with its two children.
  - Adopts label convention "`(inside bipyramid)` / `(outside bipyramid)`"
    (Option C from the 2026-06-01 council).
- Migration is still a BLUEPRINT; guard variable preserved; application
  remains gated on first Z3 item insertion + explicit user approval
  (per R3 defer).

### Documents

- New: `docs/decision-notes/2026-06-01_0015_blueprint_schema_drift.md`.

---

## v3.1 — committed 2026-10-14 (PRs #10, #11, #12)

**Baseline transition:** v3.0 → v3.1, a within-baseline revision
(minor bump, Convention §4.2). The v3.0 files are archived unchanged
under `/docs/archive/v3/`. The project had been dormant from 2026-06-02
to 2026-10-14; this entry also records the revival clean-up.

### Revised commitments

- **Birth and Death are Class H** (Spec §3.2, §6.24.3, §6.24.4; register
  row H12). User decision 2026-10-14: "Birth and Death are class H
  outside all zones." They remain NULL-zoned on Shell 5 at
  (0, 0, ∓φ²) and are not bipyramid vertices. The canonical Class-H set
  grows from seven to nine.
- **Stage 1 scope includes Birth and Death** (Roadmap IV.1 scope and
  acceptance criterion 2; Containment Note §A.3.1, §A.7; Summary exit
  criterion 1). Shell 5 is not drawn as a surface; it is the outer zoom
  limit.
- **Stage 1 has no database read path** (Roadmap IV.1 criterion 5).
  Geometry comes from the Spec constants; v3.0 specified a service-role
  read path.

### Retired claims

- "Birth and Death are not in Stage 1 scope" (Spec §3.2, v3.0).

### Naming

- Framework and public surface are named **"The Diamond"** (user
  decision 2026-10-14). Document titles change from "Vegar's Diamond — …"
  to "The Diamond — …".

### Infrastructure (Roadmap Part III, "Revival clean-up")

- `0015_route_b_zone_partition.sql` moved from `db/migrations/` to
  `db/blueprints/`. Its guard had aborted every `db-push` run since
  2026-06-01. Status unchanged: blueprint, not applied.
- New migration `0016_revival_cleanup.sql`: drops the 29 `directus_*`
  tables; drops the inert `zones_public_read` / `sub_zones_public_read`
  policies (never in a repo migration; contradicted Spec §9); stores
  shell radii and the four polar landmark coordinates at full φ
  precision (previously 9-decimal truncations; Spec §4.6). Before the
  update it restores `shells.radius` to plain `numeric`: the live column
  had drifted to `numeric(12,9)`, which is not in any repo migration and
  rounded the values back (found on the first run; fixed in PR #12).
  After PR #12, `db-verify` passed all 15 checks (2026-10-14).
- `db-verify` rewritten against Spec v3.1 §3, §5 and §9 (it still
  expected the May 2026 schema of 9 tables and 13 coordinates).
  `actions/checkout` bumped from v4 to v7 (Node 20 runners removed
  September 2026).
- Removed: `agent-push` and `directus-snapshot` workflows, `directus/`,
  `docs/DIRECTUS_CLOUD.md`, `scripts/`, and every unused Actions secret
  (only `SUPABASE_DB_URL` remains). README, `docs/ARCHITECTURE.md` and
  `docs/SECRETS.md` rewritten to describe the stack that exists.
- Archived: the May 2026 "Graves' Diamond" prototype at
  `docs/archive/prototype-2026-05/`, downloaded from the live site
  because it had never been committed.
- Stage 1 web app added in `web/`, with `netlify.toml` (PR #11). Not yet
  linked to Netlify; linking publishes a URL and needs user approval
  (Roadmap IV.0).

### Irregularity noted

- The entry above titled "v3.0.1 — patch" does not fit Convention §3.3,
  which has no patch component, and it cites §4.4, which concerns
  skipping a major number. The change it records altered only a blueprint
  file and no framework document, so no version bump was needed. No
  `v3.0.1` filename was ever created. The entry is kept as written, as
  history.
