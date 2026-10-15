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

---

## v3.2 — committed 2026-10-14 (PR #14)

**Baseline transition:** v3.1 → v3.2, a within-baseline revision
(minor bump, Convention §4.2). The v3.1 files are archived unchanged
under `/docs/archive/v3/`, next to the v3.0 files.

### User decisions recorded (2026-10-14, verbatim)

- *"The zoom controls/perspective shift doesnt work (there's no inside
  view of the diamond yet). There's a fourth, outer sphere visible. I
  don't know where in the specs this comes from, but seems unrelated to
  anything. In any case there should just be three nested spheres
  visible. The axis lines shouldnt extend out past past/future and
  heaven/hell. In the furthest zoomed out state the birth and death
  points should both be visible. We also need to reinstate the torus
  animation from graves diamond"*
- *"The torus should "open" to become the diamond. The walls of its
  central hole should come together at the center, fusing into a line of
  no volume from which birth and death rises and descends, stretching
  out the points of obliteration and awakening into the diamond shape.
  The spheres should also have a texture, probaby very faint dots, to
  indicate that it rotates together with the diamond shape"*
- *"There shouldnt be an in/out zoom from the inside view. The vantage
  point should be from the middle, looking out. Now you have the
  perspective off of the BEING middle point so that is not correct. You
  should be able to pan and tilt and zoom in and out, but as a light
  cone emanating from the center of the diamond!"*
- On how narrowing or widening the cone should look: *"Option 1 sounds
  the closest to what I want: The field of view of the cone always fills
  the entirety of the screen. Narrowing it magnifies what lies inside,
  like a camera lens zooming in; widening it takes in more of the model,
  up to 220 degrees to mimic human vision. This should be marked as a
  design choice that makes a statement about experience. Additionally,
  Obliteration/Death and Awakening/Birth should be kept apart until
  viewed directly, where they merge to become Birth and Death
  respectively"*
- On how to move between the two views: *"Zoom through"*.
- On the outer zoom limit (Birth and Death are both in view there only
  from near-equatorial viewpoints): *"keep limit"*.

### Revised commitments

- **The view from BEING** (Containment Note §A.3, §A.3.2; Spec §4.2,
  §6.25.2, §6.25.5). Inside Z1 the eye is at BEING, looking out through a
  light cone that always fills the screen. Pan and tilt turn it; zoom
  sets its angle from 24° to 220°.
- **Cone width marked as a design choice** (Containment Note §A.3.2,
  §A.6; Roadmap IV.2 criterion 5). Still a §4.7 *stipulation*; the
  on-screen caption calls it "a design choice that makes a statement
  about experience".
- **Zoom through** (Containment Note §A.3.3). In: past Shell 1 the eye
  travels to BEING. Out: widening past 220° carries it back to just
  outside Shell 1.
- **Merged pairs** (Containment Note §A.3.2). Obliteration / Death and
  Awakening / Birth merge when viewed directly: Death straight up, Birth
  straight down. The reverse reading of "respectively" is noted as open;
  the user has been asked.
- **Open questions resolved** (Containment Note §A.8; Roadmap I.7): the
  widest cone is 220°; the eye never passes through BEING; \(r = 0\) is
  where the whole 1st-person mode takes place.
- **Stage 1 scope** (Roadmap IV.1): Shells 1–3 only, with very faint
  dots (Shell 4 not drawn; latitude and longitude lines removed); X and Y
  axes end at the four equatorial landmarks and Z runs to Birth and
  Death; the outer zoom limit stays at Shell 5.
- **Stages 1 and 2 ship together** (Roadmap IV.1, IV.2, V.1, V.2;
  Containment Note §A.3.1, §A.7; Summary §4.3).
- **The τ-deformation becomes the opening** (Spec §8.1, §11), in the two
  stages the user described: closing into the Z axis, then stretching
  into the diamond. Still auxiliary.
- **Public status** (Roadmap IV.0 status note, IV.1, V.3). The site has
  been public since 2026-10-14; merges and pull-request pushes both need
  the user's approval.

### Retired claims

- Viewer behind BEING; BEING as an aperture looked through (Containment
  Note §A.3, v3.0).
- Depth behind the aperture sets the cone's width (Containment Note
  §A.3.2, v3.0; Spec §6.25.5; Roadmap I.7, IV.2, IV.3).
- Stage 1 is "orbital camera only" and must not enter Z1; Stage 1 draws
  Shells 1–4 (Roadmap IV.1, v3.0).
- The τ-deformation "is not in any deployment stage scope" (Spec §8.1,
  v3.0).

### Implementation choices (assisting agent; open to revision)

- Equidistant (fisheye) projection for the cone, since an ordinary
  perspective projection cannot exceed 180°.
- Narrowest cone 24°; entry angle matched to the outside view's scale.
- Pair separation 30 px off-axis, closing near the axis.
- Caption wording; a first-entry hint that includes how to step back
  out; outside-view names hide when their point is off screen or when a
  nearer name overlaps them.
- The opening's in-between shapes and timing (3.6 s; 0.6 s with reduced
  motion).

### Housekeeping

- README, `docs/ARCHITECTURE.md` and the two archive READMEs updated
  (hosting is now public; v3.1 files archived; what the torus reuses from
  the May 2026 prototype).

### Numerical values

- New: the cone's range, 24° to 220°. No framework values changed.

---

## v3.3 — committed 2026-10-15 (PR #15)

**Baseline transition:** v3.2 → v3.3, a within-baseline revision
(minor bump, Convention §4.2). The v3.2 files are archived unchanged
under `/docs/archive/v3/`, next to the v3.0 and v3.1 files.

### User decisions recorded (2026-10-15, verbatim)

- *"First, lets update and settle the following, regardless of of the
  FPV is implemented: - Birth and Death are to be a category onto
  themselves."*
- *"-Shell 1, 2, 3 are the only ones that would remain visible under any
  circumstance. Shell 4 was developed to give an anchor point for the
  polar points of Awakening and Obliteration, and shell 5 was developed
  similarly to anchor the Birth and Death points. Birth and Death should
  not be visible in the FPV. I reverse my earlier design choice to have
  it merge with Awakening and Obliteration. You cannot comprehend those
  from the first person perspective, only Awakening and Obliteration."*
- *"- The past and future axis will have to remain "zoneless""*
- *"-We will let go of heaven and hell, and change to the following:
  Hate–Fear–Aversion-BEING-Attraction–Desire–Love"*

### Revised commitments

- **Love and Hate replace Heaven and Hell** (Spec §3.1, §3.4, §4.3, §5,
  §6.22; Containment Note §2, §A.3.2 supplement; Roadmap I.5, IV.1).
  The landmarks at \((\pm 1, 0, 0)\) are Love (+X) and Hate (−X); the
  X-axis order is recorded verbatim in the new Spec §3.4.
- **Birth and Death are the limits, Class L** (Spec §3.2, §6.24.2–
  §6.24.4, §9, H12). A category of their own; v3.1 and v3.2 had them as
  Class H. Seven Class-H landmarks and two limits.
- **Birth and Death are not seen from BEING** (Containment Note §A.3.2,
  §A.6, §A.7; Roadmap IV.2). Looking straight up from BEING shows
  Obliteration, straight down Awakening.
- **The time axis is zoneless** (new Spec §3.5; note in §6.7.2; H13).
  Past and Future are its only names, in every zone.
- **Shells 4 and 5 are anchors only** (Spec §5; Roadmap IV.1). Only
  Shells 1–3 are ever drawn; this matches the build and `shells.role`.

### Retired claims

- Heaven and Hell as landmark names (v3.0 to v3.2).
- Birth and Death as Class H (v3.1, v3.2).
- The merged pairs (Containment Note §A.3.2, v3.2), with the open
  reading of "respectively" and the 30 px pair separation of the build.
- "The cosmological poles at Shell 5 are visible from cone mode"
  (Containment Note §A.6, v3.0 to v3.2).

### Open

- Whether the per-zone time registers of Spec §6.7.2 stay as a reading
  of the axis or are retired.

### Implementation

- `web/`: Love and Hate in place of Heaven and Hell; Birth and Death
  carry a `limit` flag and are hidden in the view from BEING; the
  merged-pair code is removed; `og.png` regenerated.
- New migration `0017_love_hate_and_limits.sql`: renames the `heaven`
  and `hell` rows of `coordinates` to `love` and `hate` (ids kept) and
  updates the Love, Hate, Birth, Death, Zone 3 and Shell 3 descriptions.
  Because db-push re-runs the baseline seed, 0017 also removes any
  `heaven` or `hell` row that the seed re-creates once `love` and `hate`
  exist. No schema change. `db-verify` now checks the `love` and `hate`
  slugs.

### Housekeeping

- README, `docs/ARCHITECTURE.md` and the two archive READMEs updated
  (v3.2 files archived). The Spec's §9 migration list now includes 0016
  and 0017.

### Numerical values

- None changed.
