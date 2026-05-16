# Vegar's Diamond — Containment Note v3.0 (draft)

> **Status:** In formation — v3.0-draft, as of 2026-05-16. Standalone
> reframe document. Authoritative for the framing of the three reserved
> research threads R1, R2, R3, and (per Appendix A) for the canonical UX
> camera regime.
>
> **Filename convention:** see `Diamond_Versioning_Convention_v1.1.md`.
> Carried forward from the archived `Diamond_Containment_Note_v2.0-draft.md`
> with §A.3 refined for v3.0 deployment readiness (the camera regime is
> now the spec for Stage 1 / Stage 2 of the deployment ladder).
>
> **Reading order:** This note sits *under* `Diamond_Summary_v3.0-draft.md`
> and *above* the threads themselves. Read it after the Summary, before
> consulting any individual R1 / R2 / R3 section in the Roadmap.

---

## 1. The framing observation

In v1.0 the three reserved research threads were enumerated as separate
appendices:

- **R1** — interstitial geometry and zone partition revision (does the
  bipyramid promote to a zone-defining surface?)
- **R2** — M3 containing structure for multiple Diamonds (what holds a
  community of subjects?)
- **R3** — M2 dynamic positions and animated trajectories (what holds a
  subject moving through time?)

Read in isolation, each looks like a different problem. Read together,
they share a single underlying form. **All three are containment
questions**, asked at three different scales:

| Thread | Scale | Question (one sentence each) |
|---|---|---|
| R1 | Within one Diamond | Is the bipyramid a *container* (a zoning surface that partitions interior from exterior) or an *inhabitant* (a structural landmark surface that lives inside the existing zones)? |
| R2 | Across Diamonds | What structure *contains* a community of per-subject Diamonds such that shapes seen differently from different vantage points are recognisably the same shape? |
| R3 | Across time within one Diamond | What structure *contains* a single Diamond as the subject moves, so that positions at \(t_1\) and \(t_2\) are recognisably the same subject's positions? |

The three threads are **not coincidentally related**. They are three
faces of the same problem: *what is the model containing and what is
contained by the model?* This note records that observation and uses it
to structure how the threads should be approached.

## 2. The pattern: container–inhabitant ambiguity

Each thread, at its own scale, contains a structural object whose status
as container or inhabitant is undecided.

### 2.1 R1's ambiguous object: the bipyramid

The anisotropic bipyramid \(|x|+|y|+|z|/\varphi \le 1\) — equivalently
the convex hull of the six landmarks (Spec §6.22) — currently has the
structural role of a **landmark surface**: it passes through the six
named landmark coordinates and serves as a visual cue, but it is not a
zone boundary. The zones are defined from the φ-cascade of shells, not
from the bipyramid. So the bipyramid is currently an **inhabitant** of
the zone structure, not a **container** for sub-regions of zones.

The R1 question is whether to *promote* it to container status — to let
it partition Zone 3 into "axial-octant Zone 3" and "interstitial Zone 3",
and similarly for Zone 4. The 2026-05-11 measurement (32.21% inside /
67.79% outside, for Z3) showed that this would not be a trivial
partition: roughly two-thirds of Zone 3 lives in the interstitial
pockets. The Z4 split remains uncomputed (Roadmap R1.1).

### 2.2 R2's ambiguous object: the M3 super-structure

The v1.0 baseline §6.21 introduces M3 as a hypothesised structure
containing many per-subject Diamonds. M3 is currently described as
"a containing structure" — but the **nature** of the containment is left
open. Is M3 a manifold in which Diamonds float as points? A bundle in
which each Diamond is a fibre? A lattice of vantage points that mutually
project? Each reading entails different structural commitments.

The R2 question is whether to commit to a specific containment topology
for M3 — to decide, in effect, whether M3 is *the* container or whether
"M3" names a placeholder for a still-undecided container.

### 2.3 R3's ambiguous object: the time dimension

Spec §4.5 declares that the model uses **static positions** — items live
at a single coordinate. The geometry already has a time-relevant axis
(the time axis along Y; the meditative-quality axis along Z; see Spec
§3.3 and §6.7), but the model is not yet *temporal* in the dynamic
sense. R3 asks how to model a subject who moves through the geometry
over time.

Migration 0009 ships an `effective_period` column on `items`. That
column is the schema-level affordance for non-static positions, but it
does not say what the container of those positions *is*. Is the
time-extended Diamond a sequence of static Diamonds? A four-dimensional
manifold? A trajectory in a single static Diamond? Each reading entails
different rendering and storage commitments.

The R3 question is what structure *contains* a subject's trajectory such
that the trajectory has identity.

### 2.4 Historical provenance: the container/inhabitant problem is the oldest problem in spatial representation

It would be a mistake to read §2.1 – §2.3 as if the framework had
*discovered* the container/inhabitant ambiguity. It did not. The
ambiguity is present in the earliest known maps and is, in that sense,
prior to philosophy.

- The **[Abauntz Cave stone map](https://www.cambridge.org/core/journals/antiquity/article/around-the-rocks-of-abauntz-a-late-magdalenian-engraved-stone-block-from-the-cave-of-abauntz-navarra-spain/)**
  (~13,660 BP, Navarra, Spain) engraves a landscape's rivers, mountains,
  and animal distributions onto a rock that is itself part of that
  landscape. The map is *inhabited by* the territory it depicts.
- The **Çatalhöyük mural** (~6,600 BCE, central Anatolia), sometimes
  called the world's oldest town map, sits on a wall *inside* the
  settlement it may depict.
- The **Babylonian Imago Mundi** (~600 BCE) shows the world as a disc
  surrounded by ocean while being itself a Babylonian artifact,
  simultaneously *contained by* and *containing* its subject.
- **Mercator's projection** (1569 CE) makes the inheritance technical:
  no map projection preserves all properties of the sphere; the choice
  of projection is therefore *always* an epistemic commitment, never a
  neutral recording.

The Diamond's contribution is not to introduce this problem. It is to
make the problem **explicit and productive** — to refuse to resolve it
prematurely on either side. The bipyramid is simultaneously the convex
hull of six landmark coordinates (inhabitant, Spec §6.22 H8) and a
candidate zone-defining surface (container, R1). The framework holds the
ambiguity in suspension as a structural commitment, not as an oversight.

This is a *borrowed* lineage in the Spec §4.7 sense and is declared as
such in Spec §6.25. The recognition that the container/inhabitant
problem is ~13,660 years old does not strengthen the framework's
geometry. It strengthens the framework's *posture*: a re-encounter with
an ancient problem, declared, rather than a freshly-discovered insight.

## 3. The reframe: name the container question explicitly

Rather than three loosely related appendices, v3.0 treats containment as
the **organising question** of the threads. The three threads become
three instances of one question.

This has two practical consequences for how the threads are structured.

**First**, the threads are sequenced. R1 is approached first because it
is geometrically the smallest containment question — it lives entirely
within one Diamond. R3 is approached second because it extends one
Diamond through time while keeping the spatial structure fixed. R2 is
approached last because it is the largest containment question — it
requires R1 and R3 to be settled before "what contains the Diamonds" has
a stable referent.

**Second**, the threads inherit a shared vocabulary. Each thread answers
the same four questions in its own register:

| Question | R1 | R3 | R2 |
|---|---|---|---|
| What is the candidate container? | the bipyramid (as a partitioning surface) | a temporal structure over one Diamond | M3 |
| What is the candidate inhabitant? | items in axial vs interstitial regions of zones | items at different `effective_period`s | individual Diamonds |
| What is the test for container–inhabitant status? | does the surface change *zone identity* of items it bisects? | does the temporal structure change *subject identity* across time slices? | does M3 change *Diamond identity* across vantage points? |
| What is the fall-back if the candidate stays an inhabitant? | bipyramid stays a landmark surface, zones stay shell-defined | items keep static positions; trajectories live as relations | each Diamond is independent; M3 is a façon de parler |

This table is the **interpretive grid** for the threads in v3.0. Every
R-thread answer should fit one row of it.

## 4. The bipyramid as convex hull (canonical reframe, v3.0 commitment)

A specific consequence of the containment frame, adopted as canonical in
v3.0:

**The bipyramid is the convex hull of the six landmark coordinates.**

That is: the bipyramid \(|x|+|y|+|z|/\varphi \le 1\) is **identically**
the smallest convex set containing the six points

- Heaven \((1,0,0)\), Hell \((-1,0,0)\), Past \((0,-1,0)\), Future
  \((0,1,0)\) — on Shell 3
- Awakening \((0,0,-\varphi)\), Obliteration \((0,0,\varphi)\) — on
  Shell 4

This is a theorem (Spec §6.22, H8), not a definition. Both descriptions
are correct and pick out the same region. They differ in **what they
make available for reading**:

- The **L¹ inequality** makes available a clean computational form, a
  connection to taxicab norms, and a manifest scaling property
  (the bipyramid is a φ-stretched octahedron).
- The **convex-hull description** makes available an immediate
  explanation of what the bipyramid *is for*, why the six landmarks sit
  on it, why its faces are flat (because they are determined by triples
  of landmark points), and what would happen if a landmark moved (the
  bipyramid would deform with it).

In v3.0 the convex-hull reading is the **canonical** description in
prose. The L¹ inequality is retained as the **computational** form. Spec
§6.22 makes this commitment binding.

This is not a change to the geometry. It is a change to how the geometry
is *described*. The motivation: container–inhabitant ambiguity (§2 of
this note) is much easier to discuss when the inhabitant is described in
terms of what it *picks out* (the six landmarks) rather than what
equation it *satisfies*.

## 5. House rules surfaced during this work

Two editorial disciplines have crystallised into governance rules. They
live in Spec §4.6 and §4.7 respectively; this section records them in
their containment-note context.

### 5.1 The exactness rule (Spec §4.6)

> *When a geometric quantity is analytically computable, compute it
> analytically. When it is not, measure it with declared precision
> (sampling method + confidence interval) and date the measurement.*

The rule was forced by errors of the same shape during the v1.0 session
— approximations accepted in place of available exact values
(the "≈88% of the φ-ball" figure for Zone 3). The Diamond's geometry is
algebraically clean (φ, L¹ planes, spheres), so analytic answers are
usually available.

### 5.2 The triage rule (Spec §4.7)

> *Every public substantive claim in the framework must declare its
> epistemic class: **derived**, **stipulated**, or **borrowed**. Silent
> stipulation is prohibited.*

The triage rule is the *semantic* counterpart of the exactness rule —
the latter governs *numeric* claims, the former governs *semantic*
claims. Together they form a two-pronged editorial discipline.

A framework that distinguishes its own categories of claim is much
harder to misread as deductive metaphysics. The biggest reception risk
for the Diamond is being read as a *discovered ontology* rather than as
the *diagrammatic phenomenology* it is. The triage rule is the editorial
mechanism that keeps that distinction visible to readers.

## 6. What this note is, and is not

This note is **structural**, not metaphysical. It does not claim that
"containment" is the fundamental category of the Diamond, or that the
three R-threads are reducible to a single problem. It claims only that
the three threads share a *form*, and that recognising the shared form
helps in approaching them.

Whether containment is *the* organising question of the Diamond — as
opposed to, say, intersubjectivity, or temporality, or progression — is
itself a future-iteration question (carried in Roadmap Part I). This
note does not answer that larger question. It does the smaller job of
making the structural parallel visible so that R1, R2, R3 can be
approached with shared vocabulary.

---

## Appendix — verified containment table (carried from v1.0, refreshed v3.0)

For reference, since the R1 thread leans on it:

| Shell | Radius | Max \(|x|+|y|+|z|/\varphi\) on shell | Status relative to bipyramid |
|---|---|---|---|
| Shell 1 | \(\varphi^{-2} \approx 0.382\) | \(\approx 0.5895\) | Entire shell strictly interior |
| Shell 2 | \(\varphi^{-1} \approx 0.618\) | \(\approx 0.9539\) | Entire shell strictly interior |
| Shell 3 | \(1\) | \(\approx 1.5434\) | Shell crosses the bipyramid surface |
| Shell 4 | \(\varphi \approx 1.618\) | \(\approx 2.4972\) | Shell crosses the bipyramid surface |

Zone 1 and Zone 2 are therefore 100% inside the bipyramid (provable
analytically; H9 theorem). Zone 3 is split 32.21% / 67.79% (measured,
2026-05-11, MC + grid; Spec §6.23). Zone 4 is split, percentages not
yet computed (open R1.1 deliverable in `Diamond_Roadmap_v3.0-draft.md`).

---

## Appendix A — User as Inhabitant (UX-as-intervention)

*Carried forward from the v2-draft cycle (Gemini 3.1 Pro Thinking
finding, refined with the user's specification of the camera regime).
v3.0 elevates this appendix to the spec for Stage 1 / Stage 2 of the
deployment ladder; see `Diamond_Roadmap_v3.0-draft.md` Part IV.*

### A.1 — The observation

The Diamond is not only a diagram on a page. It is, increasingly, a
navigable artifact: a 3D scene with an aperture at the origin (BEING),
shells the user can pass through, landmarks the user can approach. Any
such artifact has a user, and any user is positioned. Position is not
neutral.

Two camera gestures are available:

- Place the camera at the origin, let the user look outward
  (*first-person, witness-centric*).
- Place the camera outside the diamond and let the user orbit it
  (*third-person, structural*).

These two readings are not in competition. They are **two regions of a
single navigation, separated by a threshold in the framework's own
geometry.**

### A.2 — Why this is a containment question, not a UX question

The Containment Note exists because the framework has, throughout its
history, been silently teaching things through its geometry that it had
not explicitly argued for in text. The bipyramid taught a containment
claim before Spec §6.22 made it a theorem. The φ-shells taught a
progression claim before §6.13 reframed it.

The camera position teaches a selfhood claim. Under Spec §4.7, no such
claim may be made silently. The camera regime below is the framework's
declared commitment, taking the form of a single geometric rule rather
than a UI toggle.

### A.3 — The camera regime (canonical, v3.0 deployment spec)

The canonical 3D presentation of the Diamond uses **two perspectives**.
Each has its own controls. The transition between them is keyed to
Zone 1, and it is the framework's own geometry — not a user toggle —
that decides when the perspective changes.

**The role of BEING is different in each perspective, and the regime
turns on that difference.** In 3rd-person mode, BEING is a *locus* — a
point in the model that the camera looks at. In 1st-person mode, BEING
is an *aperture* — an opening that the viewer's perspective passes
*through* into the model.

#### A.3.1 — 3rd-person mode: orbital camera centred on BEING

**Active when the camera is not completely within Zone 1's bounds**
(i.e., the camera's radial position is \(> \varphi^{-2}\), or more
precisely the camera or any part of its near-frustum projects outside
Z1).

- The camera orbits BEING with **BEING as the fixed focal point on
  screen**. BEING is always at screen-centre.
- User controls: **angular position** around BEING (rotation on the
  celestial sphere centred at BEING), and **zoom** (radial distance
  from BEING).
- **BEING is non-passable in this mode.** The camera can approach BEING
  arbitrarily closely but cannot cross through it. BEING here behaves
  as a *locus*, not an opening.
- Zoom-out has an outer limit at Shell 5 (the cosmological horizon — see
  Spec §6.7). The user cannot retreat *past* the framework's outermost
  horizon to view it as a finite object floating in some larger empty
  space, because the framework's claim is that Shell 5 *is* the outer
  limit of the imaginable.
- The user sees the diamond as a structure: shells, landmarks, axes, the
  bipyramid. This is the structural / diagrammatic reading consistent
  with Spec §4.4.

**Stage 1 of the v3.0 deployment ships exactly this mode** — orbital
camera, seven Class-H landmarks, bipyramid skin, no cone-mode. See
`Diamond_Roadmap_v3.0-draft.md` Part IV.

#### A.3.2 — 1st-person mode: central light-cone *through* the aperture

**Activated when zoom brings the camera completely within Zone 1.** The
regime flips. BEING's role changes from locus to **aperture**.

- The viewer (the apex of the light cone, the user's eye) is located
  **behind** BEING. BEING is the **aperture** through which the
  viewer's perspective passes into the model.
- The visual field is a **cone** whose apex is the viewer, whose axis
  passes through the aperture (BEING), and whose far side opens *into
  the model on the other side of BEING from the viewer*.
- The user sees the inner surface of Shell 1, the meridional structure
  of Z2 – Z4, and the landmarks and Shell 5 cosmological horizons at
  distance — projected outward through the aperture from the viewer's
  position.
- This is the witness / phenomenological / first-person reading. The
  framework's apophatic centre is doing real work: BEING is the empty
  opening through which awareness passes into the model.

**User controls in 1st-person mode:**

- **Orientation of the viewer.** The user rotates the viewer freely. The
  cone's axis sweeps across different parts of the model through the
  aperture; different segments of the diamond come into the cone as the
  viewer turns.
- **Depth behind the aperture (focal depth).** The user moves the viewer
  toward or away from BEING. **Distance from the aperture determines the
  shape of the cone.**
  - **Close to the aperture** (small depth behind BEING) → **wide cone**.
    Most of the model is within the cone simultaneously; the viewer's
    perspective is diffuse, near-omnidirectional within the forward
    direction. Approaches but does not reach a panoramic limit. Maps
    phenomenologically to *open / diffuse awareness*.
  - **Far from the aperture** (large depth behind BEING) → **narrow
    cone**. The model appears framed and distant, viewed as if through
    a porthole at the aperture. Maps phenomenologically to *focused /
    discriminating attention*.
  - **Spec §4.7 tag: *stipulation*.** The cone-width-as-attention
    mapping has *no precedent* in the historical lineage of spatial
    representation surveyed in Spec §6.25 (Western linear perspective,
    Chinese *San Yuan*, Egyptian aspective art, Paleolithic
    cartography). It is the framework's own claim about how distance
    behind the aperture maps to a quality of attention. Per §4.7, this
    is therefore a **stipulation** — a generative posit that does the
    work the framework needs it to do, not a borrowed convention with
    independent epistemic warrant. It must be labelled as such in any
    UX or document that depicts the cone-deformation behaviour.

**Stage 2 of the v3.0 deployment ships cone-mode and the Shell-1
transition.** See `Diamond_Roadmap_v3.0-draft.md` Part IV.

**A.3.2 supplement — Class H vocabulary for *kinds of looking* in
cone-mode (Spec §4.7 tag: *borrowed*).** Independent of how *wide* the
cone is (the *stipulation* tagged above), cone-mode admits a vocabulary
for *what kind of looking* the viewer is doing through the aperture.
The framework borrows this vocabulary from Chinese *San Yuan* /
three-distances doctrine (Guo Xi, c. 1080; see Spec §6.25.2):

- **高遠 *gao yuan* — high distance.** Looking *up* through the
  aperture toward the upper landmarks (Awakening / Obliteration along
  ±Z). In cone-mode terms: the cone's axis is oriented along the Z-axis;
  the viewer reads the framework's verticality.
- **深遠 *shen yuan* — deep distance.** Looking *into* radial depth
  through the aperture, layering Z2, Z3, Z4 receding outward from BEING.
  The viewer reads the framework's radial layering (the work §6.13 / H4
  is suspended on).
- **平遠 *ping yuan* — level distance.** Looking *across* the equatorial
  plane through the aperture toward the horizontal landmarks (Heaven /
  Hell along ±X; Past / Future along ±Y). The viewer reads the
  framework's lateral structure.

**Status of the three-distances vocabulary, in three parts:**

1. **The borrowing.** The vocabulary itself is borrowed from *San Yuan*
   and carries that tradition's warrant. The framework adopts the three
   labels as Class H tags (Spec §6.24.2).
2. **What is *not* committed.** The framework does **not** commit to
   1-to-1 correspondence between Diamond cone-mode kinds-of-looking and
   *gao yuan / shen yuan / ping yuan*; to simultaneous availability of
   all three (scattered-perspective; cf. Roadmap I.8); or to whether
   the three labels exhaust the kinds-of-looking available.
3. **The deferral.** All resolution of (2) is **tagged for future UX
   consideration** — specifically at the Three.js prototype stage (which
   in v3.0 maps to Stage 2 of the deployment ladder), where the
   phenomenology can be tested rather than asserted.

**The vocabulary does *not* replace** the framework's existing
radial-mechanism vocabulary (*unfolds / dilates / deepens*; Spec §6.13
and H4 suspension). The two vocabularies operate on different domains
and are kept distinct.

**Limiting case: viewer at the aperture (depth = 0).** The viewer is
exactly at BEING. The cone widens to its maximum. This is the
framework's deepest first-person stance — the apophatic centre as the
position from which the model is viewed. Whether this is a stable
terminal position or a momentary threshold is left open in §A.8.

#### A.3.3 — The transition between modes

- **3rd → 1st (zooming in).** When the orbital camera zooms in such that
  its position is completely within Z1, the regime flips. The orbital
  camera's last position becomes the initial viewer position behind the
  aperture; the cone initially points back through BEING along the
  inverse of the approach direction. The user crosses from "looking at
  BEING from outside" to "looking through BEING from behind".
- **1st → 3rd (retreating).** When the viewer retreats far enough behind
  the aperture that the viewer's own position passes back out of Z1's
  bounds, the regime flips back to orbital. Continuity preserved.
- Both transitions are *perspective re-readings of the same geometry*,
  not teleports. The model on the screen is structurally continuous
  across the transition; only the user's stance toward it changes.

### A.4 — Why the threshold sits at Shell 1

The choice of \(r = \varphi^{-2}\) (Shell 1) as the perspective-transition
radius is not arbitrary. It is anchored by three independently-derived
properties of Zone 1:

1. **Z1 is fully contained in the bipyramid** (Spec §6.23, H9 theorem,
   proven analytically). Of the four zones, Z1 is the only one with no
   interstitial component. This makes Z1 the framework's unambiguous
   "inside".
2. **Z1 is the smallest zone** (radii in \([0, \varphi^{-2}]\)). The
   geometry treats Z1 as the framework's centre by construction.
3. **Z1 is the zone in which the third-person stance is structurally
   unavailable** (this appendix). Once inside Z1, the user is too close
   to BEING to view BEING as an object among others; BEING becomes the
   position from which everything else is viewed.

Three independent properties converging on Z1 is not coincidence. Z1
*is* the centre of the framework, and the perspective transition makes
the centre's special status experiential rather than merely
diagrammatic.

### A.5 — Why the transition is a genuine event

Crossing Shell 1 in either direction is not a UI toggle. It is the
framework's own geometry deciding when the user's stance toward the
model changes. In 3rd-person mode the user observes BEING as a locus;
in 1st-person mode the user looks *through* BEING as an aperture. The
same point in the diamond plays two roles, and the user only encounters
BEING's full structure by passing between them.

This is the closest the UX comes to *enacting*, rather than merely
describing, the framework's claim that BEING is simultaneously a centre
and an emptiness: at Shell 1, the centre the user was viewing becomes
the opening the user views *through*. The geometry on either side of
the threshold is the same geometry; what changes is which face of BEING
the user is engaging.

### A.6 — How this lands the framework's open claims

- **Spec §4.4 (diagrammatic phenomenology, not metaphysics)** is
  honoured by the 3rd-person mode being the *entry* mode (the user
  encounters the diamond as a diagram before they can become its
  inhabitant). v3.0's Stage 1 deployment makes this commitment
  operational: the first thing a user sees is the diagram.
- **Spec §4.5 (per-subject scope guard)** is honoured because the camera
  is always positioned within one subject's Diamond — there is no view
  that shows multiple subjects' Diamonds simultaneously. R2 may
  revisit this.
- **Spec §4.7 (epistemic-class triage)** is honoured because the camera
  regime is declared, not silent. The regime itself is a stipulation in
  the §4.7 sense and is tagged as such here. The cone-width-as-attention
  mapping in particular is tagged inline in §A.3.2 as a *stipulation*
  (no historical precedent in linear, *San Yuan*, aspective, or
  Paleolithic representation); the *kinds of looking* vocabulary in the
  §A.3.2 supplement is tagged as *borrowed*. The two epistemic statuses
  are kept distinct.
- **Spec §6.7 (time axis as nested horizons, H13)** is honoured because
  the cosmological poles at Shell 5 are *visible from cone mode*,
  looking outward from inside Z1. The horizons are seen from the witness
  position, not imposed as facts of the diamond's exterior.
- **Spec §6.13 (radial mechanism, H4)** is honoured because zoom is
  radial motion and *the camera regime does not pick a mechanism
  reading*. Zoom changes \(r\); it does not commit to whether that
  change is intensification, transformation, development, thresholding,
  or none of the above. The framework's suspension of H4 is inherited
  honestly by the UX.

### A.7 — What this means for downstream work (v3.0 deployment ladder)

- **Stage 1 of the deployment** implements **3rd-person orbital mode
  only.** Orbital around BEING, BEING non-passable, BEING-as-locus,
  seven Class-H landmarks. No cone-mode at Stage 1.
- **Stage 2** introduces **cone-mode** with the Shell-1 transition.
  Viewer-behind-aperture; cone-width as a continuous function of
  depth-behind-aperture; the *gao yuan / shen yuan / ping yuan* Class H
  tags are reserved but not surfaced as toggles at Stage 2 (they belong
  to UX iteration at or after Stage 2).
- **Stages 3 and 4** add active-zone fade (Roadmap I.10 AZ.5 default)
  and color palettes (Roadmap I.9 OKLab decomposition) respectively;
  neither changes the camera regime.
- **Future UX consideration: model-side focal depth.** A second control
  — depth-of-field on the model side, distinct from the depth-behind-
  aperture control that determines cone width — is *deferred*. If
  introduced, it would let the viewer bring a particular radial distance
  from BEING into focus while leaving nearer and farther structure soft.
  This is a UX possibility, not a v3.0 commitment, and will be revisited
  at or after Stage 2.
- Print and PDF renders default to 3rd-person mode. 1st-person
  (cone-mode) renders are permitted for contexts that require them
  (e.g., illustrating the cosmological-horizon reading of Spec §6.7)
  and must be labelled as such.

### A.8 — Open questions carried forward

- **Wide-cone limit at small depth: how panoramic?** As the viewer
  approaches the aperture (depth → 0), the cone widens. The canonical
  regime says the cone *approaches but does not reach* a full panoramic
  / 360° limit — awareness through the aperture remains directed, even
  when very wide. The boundary question is whether the limit is
  structurally a forward-hemisphere ceiling (180°), a softer approach to
  panoramic (asymptotic toward 270° or 360° without reaching it), or
  genuinely full panoramic only at \(r = 0\). v3.0 leaves this open and
  will resolve it at the Stage 2 cone-mode rollout where the
  phenomenology can be tested rather than asserted.
- **BEING as singularity vs. passable focal point.** Inside Z1, can the
  viewer's position pass through BEING to the other side, or does BEING
  act as a non-passable point that the viewer asymptotically approaches?
  This bears on whether \(r = 0\) is reachable as a stable position or
  only as a limit. v3.0 leaves this open.
- **What does the user *do* at \(r = 0\)?** If \(r = 0\) is reachable,
  the viewer is exactly at BEING, the cone is at its widest. This is the
  framework's deepest first-person stance. Whether it is stable
  terminal or momentary threshold is open.
- **Multi-subject views.** The §4.5 per-subject scope guard rules out
  any third-person view of multiple Diamonds simultaneously at this
  iteration. If R2 ever relaxes that guard, the camera regime needs
  revisiting.
- **Model-side focal depth (depth-of-field).** Deferred per §A.7.

These questions are carried as part of Roadmap I.7 (*what does the
framework train when the user inhabits it?*).

### A.9 — UX-as-cognitive-intervention: evolutionary precedent

The v2-draft council review (Gemini 3.1 Pro Thinking) flagged the
Diamond UX as *intervention*, not merely *display* — the geometry on
screen reshapes how the user perceives. The perspective-and-cartography
research surfaced an evolutionary precedent that lends weight to this
framing without collapsing into it.

[Miyagawa et al., MIT (2018)](https://news.mit.edu/2018/cave-art-cognitive-leap-language-mathematics-0221)
argue that Upper Paleolithic cave art (e.g., the Abauntz block at
~13,660 BP discussed in §2.4) functioned not as decoration but as
**cognitive training infrastructure** — the externalisation of spatial
reasoning into durable marks coincides with and likely scaffolded the
cognitive leap that produced symbolic language and mathematics. On this
reading, representation is not a window onto thought; it is a
*workspace in which thought becomes possible*.

The Diamond's UX inherits this lineage. The cone-mode regime, the
Shell-1 perspective transition, the encoding of *what does not have
ordinary outside* — these are not depictions of doctrinal claims the
framework makes elsewhere; they are the framework's stipulations
rendered as something the user *does with their attention*. The
framework trains the inhabitant.

The evolutionary precedent does not validate the Diamond's specific
stipulations (those remain §4.7-tagged); it validates the *mode of
operation* — that geometry-on-screen can be intervention-on-cognition,
and that this is a thing humans have been doing for at least ~13,660
years.

The cone-width-as-attention mapping (§A.3.2, *stipulation*) is the
framework's first piece of UX-as-intervention. Its effects on the
inhabitant are an empirical question carried by Roadmap I.7.

---

*End of Containment Note.*
