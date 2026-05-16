# Vegar's Diamond — Summary v3.0 (draft)

> **Status:** In formation — v3.0-draft, as of 2026-05-16. Sets the scope and
> posture of the v3.0 iteration. **This iteration is directed at deployment.**
>
> **Filename convention:** see `Diamond_Versioning_Convention_v1.1.md`.
> Supersedes the v2.0/v2.1 draft cycle in its entirety. v1.0 remains the
> *committed* baseline; v3.0-draft is the in-formation next baseline and is
> **meant to commit** (no decimal drafts are planned between v3.0-draft and
> v3.0).
>
> **Standalone.** This document does not require the v2-draft documents to be
> read. The substantive material that was developed in the v2-draft cycle is
> folded into v3.0 here.
>
> **Reading order.** Read this first. Then the Containment Note. Then the
> Spec. Then the Roadmap.

---

## 0. Changes from previous baseline (v1.0 → v3.0-draft)

Per `Diamond_Versioning_Convention_v1.1.md` §7, every iteration's Summary
registers its changes relative to the immediately previous *committed*
baseline. The v2-draft cycle never committed; per Convention §4.4, the
relevant un-committed v2-draft commitments are folded forward into v3.0-draft
and the v2 drafts themselves are archived under `/docs/archive/v2-drafts/`.

At commitment of v3.0, the entries below will fold into the repo CHANGELOG.

### New commitments (added in v3.0-draft, folded forward from the v2-draft cycle)

- **Spec §4.6** — Exactness rule for geometric quantities (analytic /
  bounded / dated-measured with declared precision). Adopted as rule.
- **Spec §4.7** — Epistemic-class triage as governance rule (every
  substantive claim tagged *derived* / *stipulated* / *borrowed*; silent
  stipulation prohibited). Adopted as rule.
- **Spec §6.7** — Time axis reframed as nested horizons (phenomenological
  Past/Future at inner zones; biographical-cultural at Z2; civilisational /
  cosmic at Z3; cosmological as *overlay* at Shell 5). The verb "intensifies"
  is retired for the time axis; replaced by *unfolds*, *dilates*, *deepens*.
- **Spec §6.22** — Bipyramid canonical description is now the convex hull of
  the six landmark coordinates; the L¹ inequality
  \(|x|+|y|+|z|/\varphi \le 1\) is retained as the computational form.
  H8 closed as theorem.
- **Spec §6.23** — Zone-bipyramid containment table with proven analytical
  bounds for Z1 and Z2 (both 100% inside), and measured value for Z3
  (32.21% inside / 67.79% outside, MC + grid, 2026-05-11). H9 closed as
  theorem for Z1 and Z2.
- **Spec §6.24** — Mixed-reading of sub-zone and landmark labels: Class T
  (tag/coordinate, default), Class H (hybrid, six landmarks plus BEING),
  Class S (phenomenological state, empty by default). Adopted as
  mixed-reading thesis.
- **Spec §6.25** — Historical lineage of spatial representation: four
  borrowings (Western linear perspective, Chinese *San Yuan*, Egyptian
  aspective, Paleolithic cartography) and one stipulation
  (cone-width-as-attention). Each tradition tagged *borrowed* under §4.7.
- **Spec §10** — Hypothesis register extended with H8–H13. H8, H9 closed as
  theorems; H10–H13 adopted as rules / commitments rather than open
  conjectures.
- **Containment Note (standalone document)** — R1, R2, R3 reframed as
  containment questions at different scales. Includes Appendix A "User as
  Inhabitant" (canonical two-perspective camera regime: 3rd-person orbital
  outside Z1, 1st-person cone through BEING inside Z1, Shell 1 transition).
- **Roadmap I.1 – I.10** — Cross-cutting questions. I.8 (linear vs scattered
  perspective), I.9 (color in spatial representation; **architecture locked
  in v3.0** — see §4.4 below), I.10 (active-zone semantics; **architecture
  locked in v3.0** — see §4.4 below).
- **Roadmap Part III — Phase 1.5b, Phase 1.5c** — Infrastructure-hygiene
  deliverables (idempotent migrations PR; RLS audit). **Status in v3.0:
  both CLOSED.** Phase 1.5b shipped as the idempotent baseline snapshot
  migration (`0001_baseline.sql`); Phase 1.5c shipped as the fully-private
  RLS-remediation migrations (`0010`–`0014`). CI `db-push` is green on main.

### New commitments unique to v3.0-draft (deployment direction)

- **Roadmap Part IV — Deployment** *(new Part)*. v3.0 is the first iteration
  with deployment in scope. Deployment is staged:
  - **Stage 1** ships the geometric object with **seven Class-H landmarks
    only** (Heaven, Hell, Past, Future on Shell 3; Awakening, Obliteration
    on Shell 4; BEING at origin). Orbital camera only. Full-frame web app.
    Read-only.
  - **Stages 2+** introduce UX modalities one at a time: cone-mode
    (Shell-1 transition); active-zone fade (continuous opacity); color
    palette presets (OKLab). Each stage is independently shippable.
- **Color architecture (I.9 locked).** OKLab decomposition with the three
  Diamond axes: X → chroma; Y → hue; Z → lightness. Togglable palette
  presets. All color choices are Class H (decomposition is a §4.7
  stipulation; palette selection is open).
- **Active-zone architecture (I.10 locked, two sub-rules).**
  - **AZ.1** — Cone-front intersection chooses the active zone.
  - **AZ.5** — Continuous opacity fade is the default; discrete switching
    is an opt-in preset.
  - AZ.2 / AZ.3 / AZ.4 / AZ.6 / AZ.7 (radial vs bipyramid layers; Shell-1
    transition; Z5 policy; "behind" disambiguation; modal vs ontological
    reading) remain open and are tracked in the Roadmap.
- **WYSIWYG kept deliberately open.** The exact editing surfaces are
  not determined at v3.0. Possible surfaces include camera/view state with
  shareable URLs, label visibility toggles, palette selection, and
  inline prose editing (auth-gated). The Roadmap enumerates these as
  tracked decisions; no commitment to *which ship when* is made in v3.0.

### Revised commitments

- **Bipyramid description.** The L¹-inequality form is no longer canonical;
  it is the computational form. The convex-hull form is canonical
  (§6.22).
- **Time-axis verb.** "Intensifies" is retired for the time axis. v3.0
  prose uses *unfolds*, *dilates*, *deepens*.
- **"Time axis is the only symmetric axis"** (v1.0). **Rescinded.** The
  time axis is the only axis whose radial development is *gradient-
  directional* rather than *gradient-intensive*; the gradient is the
  entropy / causal-reach / depth gradient (§6.7.6).

### Retired claims

- **"≈88% of the φ-ball"** — the prior approximate figure for the proportion
  of Zone 3 inside the bipyramid is retired and replaced by the dated
  measurement 32.21% inside / 67.79% outside (2026-05-11). Removed from
  all v3.0 documents, not merely superseded. This retirement was the
  originating example for the exactness rule (§4.6).

### Numerical values updated

- **Zone 3 inside/outside split** — was "≈88% inside" (informal estimate,
  v1.0); now 32.21% inside / 67.79% outside (MC 64,004,920 samples + 400³
  grid, 95% CI ±0.011 pp, 2026-05-11). Zone 4 split remains uncomputed and
  is an open R1 deliverable.

### Naming-convention notes

- **Convention v1.1.** §4.3 restated (drafts never get decimal bumps;
  revisions overwrite in place). §4.4 added (major-skip rule for drifted
  draft cycles; worked example: v2 → v3 transition this session).
- The v2-draft cycle's `Diamond_Roadmap_v2.1-draft.md` violated Convention
  §4.3 by carrying a decimal bump on an un-committed draft. The file has
  been archived as a record of the violation; it is *not* a baseline.

### Provenance

The commitments listed above were developed across the v2-draft cycle. The
intellectual lineage is preserved in `/docs/archive/v2-drafts/`:

- v2.0-draft set (Summary, Spec, Containment Note, Roadmap) — the
  research-and-consolidation draft.
- v2.1-draft (Roadmap only) — the (Convention-violating) revision that
  added I.9 color and I.10 active-zone explorations.

v3.0-draft is **not a delta** against any of these. It is the standalone
re-statement of the framework with the surviving commitments in place.

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

v3.0 is **not** a schema migration. No migration `0015` or later is written,
planned, or pre-committed in v3.0. The R1 thread may eventually justify one;
v3.0 does not assume that outcome.

v3.0 is **not** an answer to R1, R2, or R3. The threads remain open and are
carried forward in the Roadmap with their current state.

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
| `Diamond_Summary_v3.0-draft.md` *(this document)* | Scope and posture. Read first. |
| `Diamond_Containment_Note_v3.0-draft.md` | Standalone reframe of R1 / R2 / R3 and the canonical UX camera regime. Read before any individual thread or any UX work. |
| `Diamond_Spec_v3.0-draft.md` | The full specification — geometry, axes, zones, bipyramid, time axis, exactness rule, triage rule, items / relations, hypothesis register. Standalone (does not require v1.0 Roadmap to be read). |
| `Diamond_Roadmap_v3.0-draft.md` | The research phases, decision points, infrastructure history, **deployment ladder (new Part IV)**, and tracked open questions. |

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
  Spec §6.22, H8 theorem).
- **Measured-geometry table** for the four zones (Spec §6.23; H9 theorem
  for Z1 and Z2; Z4 row remains open).
- **Time axis as nested horizons** (Spec §6.7; H13 adopted).
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
| **Stage 1 — Geometric object** | Shells, axes, bipyramid skin, 7 Class-H landmarks (Heaven / Hell / Past / Future / Awakening / Obliteration / BEING). Orbital camera only. Read-only. Full-frame web app. | **Scoped** for first shippable build. |
| **Stage 2 — Cone-mode** | 1st-person cone through BEING inside Z1, Shell-1 transition. | Roadmap-tracked; ships when Stage 1 has stabilised. |
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

### 4.5 R1 / R2 / R3 — carried forward open

The three reserved research threads are carried forward open, with the
state set during the v2-draft cycle:

- **R1.1** (Zone 4 volumetric split) — open deliverable. Same method as
  the Z3 measurement (MC + grid cross-check).
- **R1.2 / R1.3** — open. The container-vs-inhabitant decision framework
  remains a research question.
- **R2** (M3 super-structure) — slowest thread; carried forward at the
  survey level only.
- **R3** (dynamic positions) — `effective_period` is already in the schema
  (since migration 0009); R3.1 (editorial policy for `effective_period`)
  is the only in-scope v3.0 deliverable.

## 5. Exit criteria for v3.0

v3.0 is *complete* (i.e., ready to commit and drop the `-draft` suffix) when:

1. **Stage 1 deployment is live.** A read-only web app renders the
   geometric object with the seven Class-H landmarks, orbital camera,
   full-frame layout, on a hostable surface (Netlify or equivalent).
   No public links published unless the user explicitly opens it.
2. The Containment Note has been read, accepted, or revised, **including
   its Appendix A "User as Inhabitant".**
3. The bipyramid-as-convex-hull reframe has been carried into Spec §6.22
   and into any prose the Stage 1 surface presents.
4. The exactness rule (§4.6) has been applied at least once retroactively
   (already happened: "≈88%" → 32.21% / 67.79%).
5. The Zone 4 volumetric split has either been computed or has a tracked
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

v3.0 is *not* gated on R1, R2, or R3 reaching a decision. Those threads
remain deliberately open. The frame is what v3.0 commits to; the answers
stay deferred.

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
| H5 — Bipyramid as zone-defining surface | reframed under containment | R1 |
| H6 — M3 super-structure | reframed under containment | R2 |
| H7 — Dynamic positions | reframed under containment | R3 |
| **H8** — Bipyramid is identically the convex hull of the six landmarks | **CLOSED as theorem** | Spec §6.22 |
| **H9** — Zones 1 and 2 are 100% inside the bipyramid | **CLOSED as theorem** | Spec §6.23 |
| **H10** — Exactness rule for geometric quantities | **ADOPTED as rule (§4.6)** | Spec §4.6 |
| **H11** — Triage rule (derived / stipulated / borrowed) | **ADOPTED as governance rule (§4.7)** | Spec §4.7 |
| **H12** — Mixed reading of sub-zone labels (Class T / H / S) | **ADOPTED as mixed-reading thesis (§6.24)** | Spec §6.24 |
| **H13** — Time axis as nested horizons | **ADOPTED as structural commitment (§6.7)** | Spec §6.7 |

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
