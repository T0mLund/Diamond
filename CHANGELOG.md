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

Later the same day, answering three questions (the name "the limits";
Love and Hate naming both the landmarks and the Zone 3 qualities; the
time registers of Spec §6.7.2): *"1. this seems fine. in what context is
this word used? 2. this seems fine, in practice it shouldnt be an issue.
3. retire those for now."* In the same message:

- *"-The labels Fear, Aversion, Attraction, Desire, Meditation,
  Contemplation, Reflection, Oppression, Excitement, Acceleration, and
  Obliteration  should be visible from the third person view. The labels
  should appear in order of priority according to zoom levels: 0 is
  Birth and Death above and below an opaque sphere and diamond, plus
  _additional elements_ which will be specified later, 1 is BEING,
  Birth, and death with a translucent sphere and diamond, minus those
  additonal elements, 2 is BEING, Birth, and Death plus Awakening and
  Obliteration, 3 is the previous plus Love, Hate, Acceleration and
  Meditation, 4 is the previous plus remaining labels"*
- *"All labels should dim as they rotate behind the spheres. Moving
  behind two spheres would be dimmer than only being behind one.
  Currently the label is not dimmed quite enough."*
- *"-The way I want to solve the FPV is a version of the earlier Option
  2, but with the following modifications:  The zone that is being
  “inhabited” by the view cone should replace the nearest labels. So for
  instance, looking towards Hate, Future, and Obliteration from inside
  zone 1, you would be seeing “Future Aversion-Oppression” with the
  faded labels “Fear” slightly down to the left,“Future” slightly down
  to the right, and “Excitement” above. I think the zone names could be
  locked to the mid point between the axis, perhaps even curving along
  the sphere shell if thats possible."*
- *"- I have additional modifications to the torus animation and the
  additional elements that are visible at third person zoom level 0 but
  I’ll return to those later"*

Asked how the focus in the view from BEING should move from Zone 1 to
Zones 2 and 3: *"Narrowing moves outward"*.

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
- **Labels by zoom level** (Containment Note §A.3.1; Roadmap IV.1,
  acceptance criterion 6): five levels, from Birth and Death around an
  opaque sphere and diamond at the outer limit to all labels, including
  the zone names of the X and Z axes.
- **Labels dim behind the spheres**, more behind two than one
  (Containment Note §A.3.1).
- **Focus labels in the view from BEING** (Containment Note §A.3.2;
  Roadmap IV.2, acceptance criterion 6), a version of Option 2; narrowing
  the cone moves the focus outward.
- "The limits" stands as the name of Class L; Love and Hate name both
  the landmarks and the Zone 3 qualities.

### Retired claims

- Heaven and Hell as landmark names (v3.0 to v3.2).
- Birth and Death as Class H (v3.1, v3.2).
- The merged pairs (Containment Note §A.3.2, v3.2), with the open
  reading of "respectively" and the 30 px pair separation of the build.
- "The cosmological poles at Shell 5 are visible from cone mode"
  (Containment Note §A.6, v3.0 to v3.2).
- Retired for now: the per-zone time registers (Spec §6.7.2), the
  nested-horizon reading with its cosmological overlay (§6.7.1) and H13.
- Labelled points in the view from BEING (v3.2); the single 42% dim of
  far-side labels (v3.2); "no other labels" in Roadmap IV.1.

### Open

- The *additional elements* of zoom level 0 and the changes to the
  opening, which the user will specify later.
- The implementation choices of Containment Note §A.3.1 and §A.3.2,
  pending the user's review.

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
- `web/label-rules.js` (new): the zoom levels, the dimming behind the
  spheres, the zone names and the focus bands. `web/focus-labels.js`
  (new): the names in the view from BEING, drawn as SVG text along the
  sphere. `web/main.js`: the ten zone-name labels, the opaque body of
  level 0 (drawn in its own pass and crossfaded), and the label rules
  wired in. No change to the import map, so the CSP hash stands.

### Housekeeping

- README, `docs/ARCHITECTURE.md` and the two archive READMEs updated
  (v3.2 files archived). The Spec's §9 migration list now includes 0016
  and 0017.

### Numerical values

- None changed.

## v3.4 — committed 2026-10-15 (PR #16)

**Baseline transition:** v3.3 → v3.4, a within-baseline revision
(minor bump, Convention §4.2). The v3.3 files are archived unchanged
under `/docs/archive/v3/`, next to the v3.0 to v3.2 files.

### User decisions recorded (2026-10-15, verbatim)

In the message approving v3.3 for release:

- *"Each zoom level should occur sooner, so that there is more space
  around the diamond when the labels appear. Please just initiate
  further back so that there is more space above and below in
  general."*
- *"I made mistakes in specifying which labels at which zoom level,
  update with this: 0 is Birth and Death above and below an opaque
  diamond and a _slightly translucent_ sphere , plus the forthcoming
  additional elements. 1 is BEING, Birth, and death with a translucent
  sphere and diamond, minus those additonal elements, 2 is BEING, Birth,
  and Death plus Awakening and Obliteration, 3 is the previous plus
  Love, Hate, Future and Past, 4 is the previous plus the rest."*
- *"The intersection points should probably be in all caps, to
  distinguish them from the combined zone names. Please provide a list
  of all the zones with their current names, and I will edit their names
  slightly and feed back to you."*
- *"Meditation needs to be replaced across the board with Stillness (to
  mirror Acceleration), and Contemplation should be replaced across the
  board with Meditation."*
- *"For the opening animation I like how the torus rotates and
  oscillates. I would like to be able to drag it to tilt and rotate it,
  and to  return to it by zooming all the way back (to what we might
  call a -1 state)."*
- *"At the 0 zoom level, where the diamond is opaque and the spheres
  slightly translucent, the new element I want to include is an
  "Indra's net". This should be a grid of faint replicas of the diamond,
  just simple shapes in a spacious cube grid, receding into infinity,
  and locked in relationship to the center of our diamond. None of these
  would pass in between the viewer and the diamond.  This grid would
  fade out exactly at the point where BEING begins to fade in at the
  center of the diamond."*

Answering four questions:

- How zooming out should reach the torus: *"Disregard the current
  limitations in this regard from the containemnt note, and update
  it/remove those paragraphs. The zooming out should require two actions
  to reach the torus. The first goes from whatever zoomed in state the
  user is in out to zoom level 0 where it stops, to reach the torus zoom
  level -1  the user has to initiate another zoom out gesture. This
  comes in place of the slider that allowed a moving back and forth
  through the animation in a previous iteration. I also want to add that
  you need to refine the texture or definition of the spheres to make
  their rotation more obvious, particularly while being inside the
  sphere. At the moment the dots i suggested earlier are only faintly
  visible at zoom level 1"*
- What each copy in Indra's net should look like: *"Faint solid
  bipyramids"*
- Which names should be in capitals: *"Capital names are for every axis
  point in FPV, as BEING is not visible there. In third person view, no
  zone names should be visible. only axis points. We may need to refine
  exactly what is meant by points and zones. Please clarify if
  unclear"*
- How the documents should read Indra's net and the space beyond
  Shell 5: *"Leave the theory open"*

Asked, after the agent proposed the terms axis point and region, which
names the third-person view should show: *"All axis-point names"*.

### Revised commitments

- **Zooming out stops at zoom level 0, set farther back** (Containment
  Note §A.3.1; Roadmap IV.1, acceptance criterion 7).
- **Zoom level −1** (Containment Note §A.3.1; Spec §8.1): a second
  zoom-out at level 0 folds the diamond back into the torus, in place of
  the prototype's τ slider; the torus can be dragged.
- **The labels at each zoom level** (Containment Note §A.3.1; Roadmap
  IV.1), as the user corrected them; level 0 has an opaque diamond in a
  slightly translucent sphere.
- **Indra's net at level 0** (Containment Note §A.3.1; Spec §4.5, open
  note; Roadmap IV.1).
- **Axis points and regions** (Containment Note §A.3.1 and §A.3.2;
  Roadmap IV.2): the third-person view names all axis points and never a
  region; from BEING, axis points are in capitals.
- **Stillness and Meditation** (Spec §3.3): Stillness replaces Meditation
  (Zone 3); Meditation replaces Contemplation (Zone 2).
- **Clearer dots** on the shells (Containment Note §A.3.1 and §A.3.2;
  Roadmap IV.1).

### Retired claims

- The outer zoom limit at Shell 5 (v3.0 to v3.3) and the decision of
  2026-10-14 to keep it.
- The labels per zoom level as first given in v3.3.
- "Zone names" for the single names outside; they are axis-point names.
- Contemplation (Zone 2) and Meditation (Zone 3) as names of the −Z
  qualities.

### Open

- The region names, which the user will revise.
- What, if anything, Indra's net and the space beyond Shell 5 stand for.
- The implementation choices of Containment Note §A.3.1 and §A.3.2,
  pending the user's review.

### Implementation

- `web/constants.js`: level 0 at \(1.25\,\varphi^{2}\).
  `web/label-rules.js`: the new levels, a quarter farther out; the
  renamed qualities; the distance at which Indra's net fades.
  `web/main.js`: Indra's net (one instanced mesh, drawn first in its own
  pass); the slightly translucent sphere of level 0; the stop at level 0
  and the fold back to the torus by wheel, pinch, Safari gesture and
  keys; dragging the torus; the stronger dots. `web/cone.js`: stronger
  dots from BEING. `web/focus-labels.js`: axis points in capitals.
  `web/index.html`: the hint and the description for screen readers.
  No change to the import map, so the CSP hash stands.
- New migration `0018_stillness_and_meditation.sql`: renames Zone 3's
  −Z quality to Stillness and Zone 2's to Meditation in `zones` and the
  18 `sub_zones` that carry them, and updates the Zone 2, Zone 3 and
  Awakening descriptions. No schema change. `db-verify` now checks the
  vertical names, that no Contemplation remains, and the nine Stillness
  regions.

### Housekeeping

- README, `docs/ARCHITECTURE.md` and the archive README updated (v3.3
  files archived). The Spec's §9 migration list now includes 0018.

### Numerical values

- None changed.

---

## Unreleased — display vocabulary and continuous navigation (2026-10-19)

Site-only change under `web/`; no spec, schema or geometry change. See
`docs/decision-notes/2026-10-19_mandala_vocabulary_and_cone_navigation.md`.

- Display captions replaced by the contemplative-mandala vocabulary
  (Responsiveness / Involvement / Fixation; Permanence and Erasure at the axial
  tips; Craving, Hostility, Inflation, Abasement at the equatorial vertices).
  The time axis is now zoned. Birth, Death and BEING unchanged.
- The view from BEING is rooted at the origin: pan and tilt rotate the cone,
  narrowing it moves the focus outward; all directions' labels are present.
- One continuous zoom replaces the level-0 stop; the page still opens as the torus.
- Frozen-ripple markers (three concentric circles, larger on larger spheres)
  replace the rotating dots; far-side label opacity 90 / 61.5 / 33 %;
  label collisions are displaced with leader lines rather than hidden.
- Opening: gold lines fade to grey; spheres emerge from the centre.
- Birth and Death carry black point markers.
- `focus-labels.js` removed (unused); `main.js` rewritten. `#debug` not carried over.
