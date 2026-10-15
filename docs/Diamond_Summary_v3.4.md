# The Diamond — Summary v3.4

> **Status:** Committed — **v3.4** (2026-10-15). Within-baseline revision
> of v3.3 (committed the same day), which follows v3.2 and v3.1
> (2026-10-14) and v3.0 (committed 2026-06-01 under PR #8). Sets the scope and posture
> of the v3 iteration. **This iteration is directed at deployment.**
>
> Where the body says "v3.0" (for example "What v3.0 is"), it denotes
> the v3 commitments as made on 2026-06-01; they remain in force unless
> §0 below or `CHANGELOG.md` lists them as revised. The v3.0 to v3.3
> files are archived unchanged at `/docs/archive/v3/`.
>
> **Filename convention:** see `Diamond_Versioning_Convention_v1.1.md`.
> Supersedes the v1.0 baseline and the archived v2.0 / v2.1 draft cycle
> in its entirety. v3.0 is now the project's committed baseline.
>
> **Standalone.** This document does not require the v2-draft documents to be
> read. The substantive material that was developed in the v2-draft cycle is
> folded into v3.0 here.
>
> **Reading order.** Read this first. Then the Containment Note. Then the
> Spec. Then the Roadmap.

---

## 0. Changes from previous baseline (v3.3 → v3.4)

Per `Diamond_Versioning_Convention_v1.1.md` §7, the active Summary
registers only the changes relative to the immediately previous
committed baseline, here v3.3 (2026-10-15). Earlier changes are in
`CHANGELOG.md` and in the archived v3.0 to v3.3 Summaries. v3.4 is a
minor bump under Convention §4.2: it changes how zooming out ends, adds
zoom level −1 and Indra's net, respecifies the labels at each zoom
level, settles the terms for points and regions and renames two
qualities, but opens no new iteration.

These entries are the v3.4 entry in the repo `CHANGELOG.md`. The user's
decisions of 2026-10-15 are quoted verbatim where they govern: Spec
§3.3, §4.5 and §8.1, Containment Note §A.3.1 and §A.3.2.

### Revised commitments

- **Zooming out stops at zoom level 0, set farther back** (Containment
  Note §A.3.1; Roadmap IV.1). Level 0 is the outermost camera position
  and a stop. Every level begins farther out than in v3.3, so there is
  more room around the model when its names appear.
- **Zoom level −1: back to the torus** (Containment Note §A.3.1; Spec
  §8.1). A second zoom-out begun at level 0 folds the diamond back into
  the torus, and zooming in unfolds it again; the fold follows the zoom,
  in place of the prototype's τ slider. The torus turns and swings as in
  the opening, and the user can drag it to tilt and turn it.
- **The labels at each zoom level, respecified** (Containment Note
  §A.3.1; Roadmap IV.1). Level 0 shows Birth and Death above and below
  an opaque diamond in a slightly translucent sphere; level 1 makes both
  translucent and adds BEING; level 2 adds Awakening and Obliteration;
  level 3 adds Love, Hate, Future and Past; level 4 adds the rest.
- **Indra's net at level 0** (Containment Note §A.3.1; Spec §4.5;
  Roadmap IV.1). Faint solid copies of the bipyramid on a spacious cube
  grid fixed to the model, receding into the distance. None comes
  between the eye and the diamond, and the net has gone where BEING
  begins to appear. Its theory is left open.
- **Axis points and regions** (Containment Note §A.3.1 and §A.3.2). An
  axis point has a single name; a region's name combines them. The
  third-person view names all axis points and never a region; from
  BEING, axis points are named in capitals and regions in title case.
- **Stillness and Meditation** (Spec §3.3). Stillness replaces
  Meditation (Zone 3, mirroring Acceleration), and Meditation replaces
  Contemplation (Zone 2).
- **Clearer dots on the shells** (Containment Note §A.3.1 and §A.3.2;
  Roadmap IV.1), above all from inside.
- **Migration 0018** (Spec §9). Renames the two qualities in `zones` and
  in the 18 sub-zones that carry them, and updates three descriptions;
  no schema change.

### Retired claims

- The outer zoom limit at Shell 5 (Containment Note §A.3.1, v3.0 to
  v3.3), and the decision of 2026-10-14 to keep it, which the user set
  aside.
- The labels per zoom level as first given in v3.3 (level 3 adding
  Love, Hate, Acceleration and Meditation), which the user corrected.
- "Zone names" for the single names in the third-person view; they are
  axis-point names.
- Contemplation as the name of Zone 2's −Z quality, and Meditation as
  the name of Zone 3's.

### Open

- The region names, which the user will revise (the list was sent on
  2026-10-15).
- What, if anything, Indra's net and the space beyond Shell 5 stand for
  (left open by the user).
- The implementation choices listed in Containment Note §A.3.1 and
  §A.3.2 await the user's review. Among them: at zoom level 2 and
  nearer, seen from the resting viewpoint, Death passes beyond the top
  of the frame while Birth stays in view.

### Numerical values

- None of the framework's values changed. The new display values (level
  0 at \(1.25\,\varphi^{2}\), the levels a quarter farther out, the
  net's spacing, the gestures) are implementation choices, not framework
  values.

---

## 1. What v3.0 is

v3.0 is the **deployment-directed iteration**. It does three things:

1. **Consolidates** all surviving v2-draft commitments into a single
   coherent, standalone framework (this Summary plus the three companion
   documents).
2. **Locks the architecture** for two open questions inherited from v2 —
   color (I.9) and active-zone semantics (I.10) — so deployment can
   proceed.
3. **Introduces deployment as a first-class concern**, with a four-stage
   ladder: geometric object first, then cone-mode, then active-zone fade,
   then color. Each stage is independently shippable; functionality grows
   one modality at a time.

It is, in posture, the iteration where the framework moves from *research*
(v1.0, v2-drafts) to *deployment* (v3.0+). The substantive editorial work
of the v2-draft cycle is preserved verbatim; the difference is that v3.0 is
*meant to ship a model*, not only to consolidate the writing.

## 2. What v3.0 is not

v3.0 is **not** a live schema migration. A blueprint for migration `0015`
(splitting Z3's 26 sub-zones into inner/outer halves under Route B; see §4.5)
is committed in this iteration but **not applied** to the live database.
Application waits for the implementation phase of Stage 1.

v3.0 **closes R1** under Route B. R2 has been disregarded. R3 is deferred
until the first item insertion in Z3. See §4.5 and the decision memo at
`docs/decision-notes/2026-06-01_r1_route_b_closure.md`.

v3.0 is **not** a relaxation of the §4.5 scope guards (per-subject, static
positions). Those remain in force.

v3.0 is **not** an open-collaboration release. Per the user's directive:

> *Now: Only you and I can write to the project. Others can only read.
> Later: Others are invited in as collaborators... This is 6-12 months away
> from now and not important.*

The Stage 1 deployment is **read-only** for everyone but the project owner
and the assisting agent. Collaboration affordances are tracked as open
questions but not committed.

## 3. The four artifacts (standalone)

| Document | Role |
|---|---|
| `Diamond_Summary_v3.4.md` *(this document)* | Scope and posture. Read first. |
| `Diamond_Containment_Note_v3.4.md` | Standalone reframe of R1 and R3 and the canonical UX camera regime. (R2 disregarded 2026-06-01.) Read before any individual thread or any UX work. |
| `Diamond_Spec_v3.4.md` | The full specification — geometry, axes, zones, bipyramid, time axis, exactness rule, triage rule, items / relations, hypothesis register. Standalone (does not require v1.0 Roadmap to be read). |
| `Diamond_Roadmap_v3.4.md` | The research phases, decision points, infrastructure history, **deployment ladder (new Part IV)**, and tracked open questions. |

The *committed* `Diamond_Roadmap_v1.0.md` remains in the active Space as the
historical baseline; it migrates to `/docs/archive/v1/` only when v3.0
itself commits.

The Convention itself lives at `docs/Diamond_Versioning_Convention_v1.1.md`
in the repo (superseding v1.0, archived in `/docs/archive/v2-drafts/`).

## 4. The threads of v3.0

### 4.1 Consolidation (carried forward from v2-drafts)

The substantive editorial work of the v2-draft cycle is folded in. See §0
above for the enumeration. The most consequential of these:

- **Bipyramid as convex hull of the six landmarks** (canonical reframe;
  Spec §6.22, H8 theorem). **As of 2026-06-01 also the second containment
  system** (Route B; H5 ADOPTED).
- **Measured-geometry table** for the four zones (Spec §6.23; H9 theorem
  for Z1 and Z2; under Route B, Z3 row splits into inner/outer and the
  Z4 row becomes the two polar caps).
- **Time axis as nested horizons** (Spec §6.7; H13 adopted; retired for
  now in v3.3).
- **Exactness rule** and **triage rule** (Spec §4.6 and §4.7; H10 and H11
  adopted as governance).
- **Mixed-reading thesis** for sub-zone labels (Spec §6.24; H12 adopted).
- **Camera regime** (Containment Note Appendix A): 3rd-person orbital
  outside Z1, 1st-person cone through BEING inside Z1, Shell 1 as
  perspective-transition threshold; cone-width-as-attention as the single
  Diamond-specific stipulation in the §6.25 lineage.

### 4.2 Infrastructure hygiene (CLOSED)

Both Phase 1.5b and Phase 1.5c are **closed** in v3.0:

- **Phase 1.5b** — Idempotent migrations. Migrations 0001–0008 replaced
  by a single idempotent baseline snapshot `0001_baseline.sql`. CI
  `db-push` runs to completion on main.
- **Phase 1.5c** — RLS remediation. Five migrations (`0010` – `0014`)
  apply the *fully-private* RLS posture: all tables RLS-enabled with
  policies that deny anon access; functions hardened with `search_path=''`;
  views set to `security_invoker=true`. Supabase advisor flags cleared.

The Roadmap (Part III) marks both as historic and points to the merged PRs
on `main`.

### 4.3 Deployment as a first-class concern (new in v3.0)

v3.0 introduces deployment as a tracked concern with its own Part in the
Roadmap (Part IV). The shape of the deployment ladder:

| Stage | Adds | Status |
|---|---|---|
| **Stage 1 — Geometric object** | Shells 1–3 with dots, axes, bipyramid skin, 7 Class-H landmarks (Love / Hate / Past / Future / Awakening / Obliteration / BEING) and the 2 limits, Birth / Death on Shell 5 (since v3.1; their own category since v3.3); the torus-to-diamond opening (v3.2). Orbital camera. Read-only. Full-frame web app. | **Live** 2026-10-14 (public). |
| **Stage 2 — Cone-mode** | Inside Z1, the light cone from BEING (eye at BEING, 24°–220°, fills the screen); zoom through at Shell 1 (revised v3.2); Birth and Death not shown from BEING (v3.3). | **Live** with Stage 1, 2026-10-14. |
| **Stage 3 — Active-zone fade** | Continuous opacity fade for the active zone (AZ.5 default). | Roadmap-tracked; ships after Stage 2. |
| **Stage 4 — Color palettes** | OKLab decomposition (X chroma, Y hue, Z lightness); togglable palette presets. | Roadmap-tracked; ships after Stage 3. |

Stages beyond 4 (labels, prose / items data surfacing, auth-gated editing,
collaboration affordances) are enumerated in the Roadmap as open tracked
questions but **not committed in v3.0**.

The deployment ladder honours two of the user's standing directives:

> *Objective 1 is to achieve a functioning model. Objective 2 is security.
> Always look for ways to simplify and avoid unnecessary confusion.*

> *This is not urgent. The project is not deployed and no public links have
> been made available. Proceed cautiously.*

Stage 1 ships only what is *visible* in the framework's geometry — no data
that isn't already in the schema, no auth surfaces that aren't required, no
prose-presentation features. Each subsequent stage adds *one* UX modality.
The pacing is deliberate.

### 4.4 Architecture locks (color, active-zone)

Two open questions inherited from the v2-draft cycle are **architecturally
locked** in v3.0 — enough to unblock deployment, not so much as to foreclose
sub-question exploration:

**Color (I.9) — locked architecture, palette sub-questions open.**

The three Diamond axes decompose into OKLab as follows:

- **X axis → chroma** (chroma magnitude).
- **Y axis → hue** (hue angle).
- **Z axis → lightness** (L\*).

This decomposition is a §4.7 stipulation. It is Class H (it does coordinate
work and state-name work simultaneously) and is documented in the Spec as
such.

The bipyramid renders as a *translucent skin* (the convex hull of the six
landmarks — §6.22).

What is **open in v3.0**: which specific palettes the user can toggle
between. Default candidates discussed in the v2 cycle:

- Y axis: green ↔ yellow.
- Z axis: blue ↔ red.
- X axis: chroma magnitude scaled to the axis.

These are starting points; the deployment Roadmap tracks palette selection
as a tracked UX decision, not a v3.0 commitment.

**Active-zone (I.10) — AZ.1 + AZ.5 locked; AZ.2/3/4/6/7 open.**

- **AZ.1 (locked).** The active zone is selected by the
  **cone-front intersection** — i.e., the zone the user's cone is currently
  pointing into (in cone-mode) or the zone the camera's reticle is on (in
  orbital mode).
- **AZ.5 (locked).** The default is **continuous opacity fade** as the
  active zone changes. Discrete switching is an opt-in preset.

What is **open in v3.0** (carried in the Roadmap):

- **AZ.2.** Whether the active-zone selection respects *radial layers* or
  the *bipyramid partition* (or both, hybridised).
- **AZ.3.** How active-zone selection interacts with the Shell-1 perspective
  transition.
- **AZ.4.** Policy for the Shell-5 / Z5-overlay region (which has no zone
  proper).
- **AZ.6.** "Behind" disambiguation — when the cone passes through the
  active zone and into another, which zone wins.
- **AZ.7.** Whether active-zone selection is a *modal* surface (the user
  asks for it) or an *ontological* feature (the framework always has one
  active zone).

### 4.5 R1 closed (Route B); R2 disregarded; R3 deferred

State as of 2026-06-01. See `docs/decision-notes/2026-06-01_r1_route_b_closure.md`
for the full dialogue and rationale.

- **R1** — **CLOSED under Route B**. The bipyramid is a *second containment
  system* operating alongside the spheres. Zone 3's 26 angular sub-zones
  split into inner (inside the bipyramid) and outer (outside) halves. The
  label "Zone 4" is retired and demoted to **the polar caps**: two named
  regions defined as the parts of the φ-shell *inside* the bipyramid;
  the rest of the φ-shell is undefined space. Total defined sub-zones:
  80 → **106**. H5 is **ADOPTED** in the register.
- **R1.1** (Zone 4 volumetric split) — retained as a *verification*
  deliverable for the polar-cap geometry; no longer gates anything.
- **R1.2 / R1.3** — closed by the Route B decision; the decision memo
  is the artefact that R1.2 would have produced.
- **R2** (M3 super-structure across multiple Diamonds) — **disregarded**
  as hypothetical speculation. Removed from the v3.0 docs. H6's status
  is recorded in the register as *disregarded* with a one-line rationale.
- **R3** (dynamic positions and trajectories) — **deferred until the
  first item insertion in Z3**. The schema affordance
  (`items.effective_period`) is in place since migration 0009; R3.1
  (editorial policy) will be written when an item with a multi-period
  history is actually about to be inserted. R3.2 stays parked for v4.0+.

## 5. Exit criteria for v3.0

v3.0 is *complete* (i.e., ready to commit and drop the `-draft` suffix) when:

1. **Stage 1 deployment is live.** A read-only web app renders the
   geometric object with the nine landmarks (seven Class H plus Birth
   and Death, per v3.1; the two limits since v3.3), orbital camera,
   full-frame layout, on a hostable surface (Netlify or equivalent).
   No public links published unless the user explicitly opens it.
2. The Containment Note has been read, accepted, or revised, **including
   its Appendix A "User as Inhabitant".**
3. The bipyramid-as-convex-hull reframe has been carried into Spec §6.22
   and into any prose the Stage 1 surface presents.
4. The exactness rule (§4.6) has been applied at least once retroactively
   (already happened: "≈88%" → 32.21% / 67.79%).
5. The polar-cap geometry (formerly the "Zone 4 volumetric split") has
   either been computed as a verification of Route B or has a tracked
   owner and target date.
6. **The triage rule (§4.7)** has been applied at least once to a
   substantive paragraph of prose (the Containment Note Appendix A is
   the first instance; this counts).
7. **The mixed-reading thesis (§6.24)** has been tested on at least one
   sub-zone prose draft.
8. **The time-axis nested-horizon reading (§6.7)** has been used in at
   least one piece of zone prose at Z3 or Shell 5.
9. **Convention v1.1** is committed to the repo (this Summary's
   commitment-to-commit applies to the Convention as well).

v3.0 is **gated on R1 being closed (under Route B; see §4.5)**. R2 is
disregarded and contributes no gate. R3 is deferred until first item
insertion and likewise contributes no gate to v3.0's exit. The frame is
what v3.0 commits to; R1 is now part of that frame.

## 6. Posture and pacing

v3.0 inherits the v2-draft cycle's posture (consolidation over expansion)
and adds one direction (toward deployment). The model needs:

- A period in which the editorial work consolidates as *something one can
  see* (Stage 1 deployment).
- Subsequent stages introduced one UX modality at a time, with time to
  observe how each one lands.
- No commitment to a release date, public link, or collaboration model.
- WYSIWYG kept deliberately open: the exact editing surfaces are not yet
  determined; the user's standing directive is *"Keep these options open
  as much as possible. The exact need is not yet determined."*

Two practical signals that v3.0 is being approached well:

- Each deployment stage ships only one new UX modality, and the previous
  stage's modality has been used in living prose / inhabited UX before the
  next stage begins.
- The framework documents (this Summary, the Spec, the Containment Note,
  the Roadmap) remain consistent with what the deployment surfaces *show*
  — geometry on screen matches geometry in text.

When those become habits, v3.0's deployment work is doing its job.

---

## Appendix — hypothesis ↔ thread index

For continuity with the v1.0 hypothesis register and the v2-draft cycle:

| Hypothesis | Status in v3.0 | Thread |
|---|---|---|
| H1 — *(carried from v1.0, unchanged)* | open | v1.0 §10 |
| H2 — *(carried from v1.0, unchanged)* | open | v1.0 §10 |
| H3 — *(carried from v1.0, unchanged)* | open | v1.0 §10 |
| H4 — Radial progression mechanism (five readings suspended) | open; suspension carried forward | v1.0 §6.13; v3.0 Spec §6.13 unchanged |
| **H5** — Bipyramid as zone-defining surface | **ADOPTED 2026-06-01 (Route B closure of R1)** | Spec §6.22; decision memo |
| H6 — M3 super-structure | **DISREGARDED 2026-06-01** (hypothetical speculation; R2 removed from v3.0) | — |
| H7 — Dynamic positions | reframed under containment; deferred until first item insertion | R3 |
| **H8** — Bipyramid is identically the convex hull of the six landmarks | **CLOSED as theorem** | Spec §6.22 |
| **H9** — Zones 1 and 2 are 100% inside the bipyramid | **CLOSED as theorem** | Spec §6.23 |
| **H10** — Exactness rule for geometric quantities | **ADOPTED as rule (§4.6)** | Spec §4.6 |
| **H11** — Triage rule (derived / stipulated / borrowed) | **ADOPTED as governance rule (§4.7)** | Spec §4.7 |
| **H12** — Mixed reading of sub-zone labels (Class T / H / S) | **ADOPTED as mixed-reading thesis (§6.24)** | Spec §6.24 |
| **H13** — Time axis as nested horizons | **RETIRED for now (2026-10-15)**; adopted as a structural commitment in v3.0 | Spec §6.7 |

H8 and H9 are no longer hypotheses — they are theorems. H10, H11, H12, H13
are rules and structural commitments adopted at the v2-draft → v3.0
transition. They remain in the register so the register tells a complete
story of what each iteration produced.

### Provenance of council-derived items

H11, H12, H13, and the Containment Note "User as Inhabitant" appendix all
enter the framework as the response to the v1.0 model-council review on
2026-05-12 (`Diamond_Council_Review_2026-05-12.md` in the historical record).
That review is the canonical source for any future question about why these
commitments were made when they were.

The cone-width-as-attention mapping (Containment Note §A.3.2; the one
Diamond-specific *stipulation* in the §6.25 lineage) entered from the
perspective-and-cartography research thread
(`Diamond_Perspective_Cartography_Research_2026-05-12.md`) and is also
preserved in the historical record.

---

*End of Summary.*
