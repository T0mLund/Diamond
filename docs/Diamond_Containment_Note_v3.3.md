# The Diamond — Containment Note v3.3

> **Status:** Committed — **v3.3** (2026-10-15). Within-baseline revision
> of v3.2 (committed 2026-10-14), which follows v3.1 (the same day)
> and v3.0
> (committed 2026-06-01 under PR #8; R1 closed by Route B; R2
> hard-deleted; R3 deferred). Standalone
> reframe document. Authoritative for the framing of the reserved
> research threads R1 (closed under Route B, 2026-06-01) and R3 (deferred,
> 2026-06-01), and (per Appendix A) for the canonical UX camera regime.
> R2 was hard-deleted 2026-06-01 as hypothetical speculation; see
> `docs/decision-notes/2026-06-01_r1_route_b_closure.md`.
>
> **What v3.3 changes** (minor bump, Convention §4.2): the landmarks and
> their names. Love and Hate replace Heaven and Hell at \((\pm 1, 0, 0)\),
> and the order along the X axis is recorded verbatim; Birth and Death
> become a category of their own, the limits, and are not seen from
> BEING, which retires the merged pairs of v3.2; the time axis is
> zoneless; Shells 4 and 5 are anchors only and are never drawn. Full
> list: `Diamond_Summary_v3.3.md` §0 and `CHANGELOG.md`. The v3.0, v3.1
> and v3.2 files are archived unchanged at `/docs/archive/v3/`. Where the
> body says "v3.0", "v3.1" or "v3.2" (for example "v3.0 commitment"), it
> denotes the commitments as made in that version; they remain in force
> unless Summary §0 or `CHANGELOG.md` lists them as revised.
>
> **Filename convention:** see `Diamond_Versioning_Convention_v1.1.md`.
> Carried forward from the archived `Diamond_Containment_Note_v2.0-draft.md`
> with §A.3 refined for v3.0 deployment readiness (the camera regime is
> now the spec for Stage 1 / Stage 2 of the deployment ladder).
>
> **Reading order:** This note sits *under* `Diamond_Summary_v3.3.md`
> and *above* the threads themselves. Read it after the Summary, before
> consulting any individual R1 / R3 section in the Roadmap.

---

## 1. The framing observation

In v1.0 the three reserved research threads were enumerated as separate
appendices:

- **R1** — interstitial geometry and zone partition revision (does the
  bipyramid promote to a zone-defining surface?) — **CLOSED under Route B,
  2026-06-01**: the bipyramid is now a second containment system.
- **R2** — ~~M3 containing structure for multiple Diamonds~~ —
  **HARD-DELETED 2026-06-01** as hypothetical speculation. Disregarded.
- **R3** — M2 dynamic positions and animated trajectories (what holds a
  subject moving through time?) — **DEFERRED 2026-06-01** until the first
  item is inserted into a Z3 sub-zone.

Read in isolation, each looked like a different problem. Read together,
R1 and R3 share a single underlying form. **They are containment
questions**, asked at two different scales:

| Thread | Scale | Question (one sentence each) | Status |
|---|---|---|---|
| R1 | Within one Diamond | Is the bipyramid a *container* (a zoning surface that partitions interior from exterior) or an *inhabitant* (a structural landmark surface that lives inside the existing zones)? | **Closed under Route B**, 2026-06-01: container (second containment system) |
| R3 | Across time within one Diamond | What structure *contains* a single Diamond as the subject moves, so that positions at \(t_1\) and \(t_2\) are recognisably the same subject's positions? | **Deferred** until first item insertion in Z3 |

R1 and R3 are **not coincidentally related**. They are two faces of the
same problem: *what is the model containing and what is contained by
the model?* This note records that observation and uses it to structure
how the remaining open thread (R3) should be approached when it is
reopened.

## 2. The pattern: container–inhabitant ambiguity

Each thread, at its own scale, contains a structural object whose status
as container or inhabitant is undecided.

### 2.1 R1's resolved object: the bipyramid as second containment system

**R1 closed 2026-06-01 under Route B.** Full rationale:
`docs/decision-notes/2026-06-01_r1_route_b_closure.md`.

The anisotropic bipyramid \(|x|+|y|+|z|/\varphi \le 1\) — equivalently
the convex hull of the six landmarks (Spec §6.22) — is now treated as a
**second containment system** operating alongside the φ-spheres. It is
not a replacement for the shell structure; it is a parallel partition
that operates on Z3 (splitting the 26 angular sub-zones into 52 inner /
outer halves) and on the φ-shell formerly called Z4 (defining the two
polar caps as the only named regions; equatorial belt undefined).

The 2026-05-11 measurement (32.21% inside / 67.79% outside, for Z3) is
now the volumetric weighting of `.inner` vs `.outer` halves. The polar
cap split of the φ-shell remains uncomputed but is now informational
only (Roadmap R1.1 verification deliverable; no longer gates anything).

No Stage 1 render consequences: the bipyramid is already part of the
v3.0 render as a translucent skin; the Z3 partition is invisible until
items are inserted into Z3.

### 2.2 [Deleted] R2 — hard-deleted 2026-06-01

The v1.0-era hypothesis of M3 as a containing structure for multiple
Diamonds is **hard-deleted** as of 2026-06-01 under user instruction:
"that was a hypothetical speculation and irrelevant". H6 in the
hypothesis register is marked DISREGARDED. The archived v2-draft
Containment Note retains the original §2.2 text for historical reference.

### 2.3 R3's deferred object: the time dimension

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

**R3 status (2026-06-01):** DEFERRED until the first item is inserted
into a Z3 sub-zone. Rationale: no items currently occupy any sub-zone,
so the trajectory-identity question has no concrete instances on which
to be tested. Reopening trigger: the first row in `items` with a Z3
sub-zone in its `effective_period`. The `effective_period` column stays
in the schema (Migration 0009).

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

**First**, the threads were sequenced. R1 was approached first because
it is geometrically the smallest containment question — it lives entirely
within one Diamond. R1 is now closed (2026-06-01). R3 is the remaining
open thread, deferred until first item insertion in Z3.

**Second**, the threads inherit a shared vocabulary. Each thread answers
the same four questions in its own register:

| Question | R1 (closed) | R3 (deferred) |
|---|---|---|
| What is the candidate container? | the bipyramid (as a partitioning surface) | a temporal structure over one Diamond |
| What is the candidate inhabitant? | items in inner vs outer halves of Z3 sub-zones | items at different `effective_period`s |
| What is the test for container–inhabitant status? | does the surface change *zone identity* of items it bisects? | does the temporal structure change *subject identity* across time slices? |
| What is the resolution? | **Container** (second containment system, Route B, 2026-06-01) | Open; deferred until first item insertion in Z3 |

This table is the **interpretive grid** for the threads in v3.0. Every
R-thread answer should fit one row of it.

## 4. The bipyramid as convex hull (canonical reframe, v3.0 commitment)

A specific consequence of the containment frame, adopted as canonical in
v3.0:

**The bipyramid is the convex hull of the six landmark coordinates.**

That is: the bipyramid \(|x|+|y|+|z|/\varphi \le 1\) is **identically**
the smallest convex set containing the six points

- Love \((1,0,0)\), Hate \((-1,0,0)\), Past \((0,-1,0)\), Future
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
making the structural parallel visible so that R1 and R3 can be
approached with shared vocabulary. (R2 was hard-deleted 2026-06-01.)

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
2026-05-11, MC + grid; Spec §6.23) — under Route B this is the volumetric
weighting between `.inner` and `.outer` halves of the 52 Z3 sub-zones.
The φ-shell formerly called Z4: polar cap / equatorial belt split not
yet computed (R1.1 verification deliverable; informational only).

---

## Appendix A — User as Inhabitant (UX-as-intervention)

*Carried forward from the v2-draft cycle (Gemini 3.1 Pro Thinking
finding, refined with the user's specification of the camera regime).
v3.0 elevates this appendix to the spec for Stage 1 / Stage 2 of the
deployment ladder; see `Diamond_Roadmap_v3.3.md` Part IV.*

### A.1 — The observation

The Diamond is not only a diagram on a page. It is, increasingly, a
navigable artifact: a 3D scene with BEING at the origin,
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

### A.3 — The camera regime (canonical; revised v3.2)

The canonical 3D presentation of the Diamond uses **two perspectives**.
Each has its own controls. The transition between them is keyed to
Zone 1, and it is the framework's own geometry — not a user toggle —
that decides when the perspective changes.

**The role of BEING is different in each perspective, and the regime
turns on that difference.** In 3rd-person mode, BEING is a *locus* — a
point in the model that the camera looks at. In 1st-person mode, BEING
is the *vantage point* — the centre from which the viewer looks out, and
the apex of the light cone that is the viewer's field of view. (v3.0
placed the viewer *behind* BEING, looking *through* it as an aperture;
v3.2 retires that placement. See §A.3.2.)

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
  as a *locus*, not an opening. (Since v3.2, zooming in past Shell 1
  does not cross BEING either: it carries the eye *to* BEING and into
  the 1st-person mode of §A.3.2.)
- Zoom-out has an outer limit at Shell 5 (the cosmological horizon — see
  Spec §6.7). The user cannot retreat *past* the framework's outermost
  horizon to view it as a finite object floating in some larger empty
  space, because the framework's claim is that Shell 5 *is* the outer
  limit of the imaginable.
  - **Birth and Death at the limit (v3.2).** User direction, 2026-10-14:
    *"In the furthest zoomed out state the birth and death points should
    both be visible."* Birth and Death sit on Shell 5 itself, so at the
    limit they are both in view when the model is seen from near its
    equatorial plane; from near-polar viewpoints one of them is at or
    behind the camera. Asked whether to keep the Shell 5 limit or allow
    zooming out further, the user decided (2026-10-14): *"keep limit"*.
- The user sees the diamond as a structure: shells, landmarks, axes, the
  bipyramid. This is the structural / diagrammatic reading consistent
  with Spec §4.4.

**Stage 1 of the deployment ships this mode** — orbital camera, the
seven Class-H landmarks and the two limits, Birth and Death, on Shell 5
(added v3.1; a category of their own since v3.3), bipyramid skin. Since v3.2 it ships together with
the 1st-person mode of §A.3.2 (Stage 2), which the user asked for on
2026-10-14. See `Diamond_Roadmap_v3.3.md` Part IV.

#### A.3.2 — 1st-person mode: the light cone from BEING (revised v3.2)

**Activated when zoom brings the camera completely within Zone 1.** The
regime flips. BEING's role changes from locus to **vantage point**.

User decisions, 2026-10-14 (verbatim). On the first build of this mode,
which still placed the viewer behind BEING:

> *There shouldnt be an in/out zoom from the inside view. The vantage
> point should be from the middle, looking out. Now you have the
> perspective off of the BEING middle point so that is not correct. You
> should be able to pan and tilt and zoom in and out, but as a light
> cone emanating from the center of the diamond!*

Asked how narrowing or widening the cone should look on screen:

> *Option 1 sounds the closest to what I want: The field of view of the
> cone always fills the entirety of the screen. Narrowing it magnifies
> what lies inside, like a camera lens zooming in; widening it takes in
> more of the model, up to 220 degrees to mimic human vision. This
> should be marked as a design choice that makes a statement about
> experience. Additionally, Obliteration/Death and Awakening/Birth
> should be kept apart until viewed directly, where they merge to become
> Birth and Death respectively*

(The last sentence, on Obliteration/Death and Awakening/Birth, was
reversed by the user on 2026-10-15; see below.)

From these decisions:

- **The viewer's eye is at BEING**, the centre of the diamond, and stays
  there for as long as this mode lasts. There is no movement toward or
  away from BEING inside Z1.
- **The visual field is a light cone with its apex at BEING.** It always
  fills the whole screen: the screen's longer side spans the cone's full
  angle.
- The user sees the shells from inside (their faint dots), the
  bipyramid's skin and edges, and each landmark in its direction from
  BEING, out to Awakening and Obliteration on Shell 4. Birth and Death
  are not shown (revised v3.3; see below).
- This is the witness / phenomenological / first-person reading. The
  framework's apophatic centre is doing real work: BEING is the empty
  centre from which awareness looks out into the model.

**User controls in 1st-person mode:**

- **Pan and tilt.** The user turns the cone freely: all the way round,
  and up or down as far as straight up (+Z) and straight down (−Z).
  Different segments of the diamond come into the cone as it turns.
- **Cone angle (zoom).** Zooming in narrows the cone and magnifies what
  lies inside it, like a camera lens zooming in. Zooming out widens it
  and takes in more of the model, up to **220°**, the user's figure for
  human vision.
  - **Wide cone** → *open / diffuse awareness*. **Narrow cone** →
    *focused / discriminating attention*.
  - **Spec §4.7 tag: *stipulation*, marked in the UX as a design
    choice.** The mapping of cone width to a quality of attention has
    *no precedent* in the historical lineage of spatial representation
    surveyed in Spec §6.25 (Western linear perspective, Chinese *San
    Yuan*, Egyptian aspective art, Paleolithic cartography). It is the
    framework's own claim about experience. Per §4.7 it is therefore a
    **stipulation** — a generative posit that does the work the
    framework needs it to do, not a borrowed convention with independent
    epistemic warrant. Per the user's decision it is marked on screen as
    a design choice that makes a statement about experience (Roadmap
    IV.2, acceptance criterion 5).

**Birth and Death are not seen from BEING (revised v3.3).** User
decision, 2026-10-15 (verbatim):

> *Birth and Death should not be visible in the FPV. I reverse my earlier
> design choice to have it merge with Awakening and Obliteration. You
> cannot comprehend those from the first person perspective, only
> Awakening and Obliteration.*

From BEING, the cone shows Obliteration straight up and Awakening
straight down, each under its own name. Birth and Death, the limits
(Spec §3.2, Class L), are seen only from outside (§A.3.1).

**Retired in v3.3:** the merged pairs of v3.2, in which Obliteration /
Death and Awakening / Birth were shown apart off the axis and merged when
viewed directly; with them, the open reading of "respectively", which no
longer arises.

**Implementation choices** (the assisting agent's, 2026-10-14; not user
decisions, and open to revision):

- An **equidistant (fisheye) projection**: the angle from the cone's
  axis maps linearly to distance from the screen centre. An ordinary
  perspective projection cannot show more than 180°, so it cannot reach
  220°.
- The **narrowest cone is 24°**.
- On entry the cone opens at the angle that matches the scale of the
  outside view on that screen, at most 220° (about 147° on a phone held
  upright).

**A.3.2 supplement — Class H vocabulary for *kinds of looking* in
cone-mode (Spec §4.7 tag: *borrowed*).** Independent of how *wide* the
cone is (the *stipulation* tagged above), cone-mode admits a vocabulary
for *what kind of looking* the viewer is doing from BEING.
The framework borrows this vocabulary from Chinese *San Yuan* /
three-distances doctrine (Guo Xi, c. 1080; see Spec §6.25.2):

- **高遠 *gao yuan* — high distance.** Looking *up* from BEING toward
  the upper landmarks (Awakening / Obliteration along ±Z). In cone-mode
  terms: the cone's axis is oriented along the Z-axis; the viewer reads
  the framework's verticality.
- **深遠 *shen yuan* — deep distance.** Looking *into* radial depth from
  BEING, layering Z2, Z3, Z4 receding outward from BEING. The viewer
  reads the framework's radial layering (the work §6.13 / H4 is
  suspended on).
- **平遠 *ping yuan* — level distance.** Looking *across* the equatorial
  plane from BEING toward the horizontal landmarks (Hate / Love along
  ±X; Past / Future along ±Y). The viewer reads the framework's lateral
  structure.

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

**The viewer at BEING (resolved v3.2).** v3.0 treated the viewer exactly
at BEING as the limiting case of a depth-behind-the-aperture control —
the framework's deepest first-person stance — and left open whether it
was a stable position or a momentary threshold (§A.8). v3.2 makes it the
whole of 1st-person mode: inside Z1 the viewer is always at BEING, and
leaves only by zooming back out (§A.3.3).

**Retired in v3.2:** the viewer behind BEING; BEING as an aperture the
viewer looks through; depth behind the aperture as the control that sets
the cone's width (wide when close, narrow when far); the picture of the
narrow cone as a porthole at the aperture.

#### A.3.3 — The transition between modes (revised v3.2)

Asked how to move between the outside view and the view from BEING, the
user decided (2026-10-14): *"Zoom through"*.

- **3rd → 1st (zooming in).** When zooming in brings the orbital camera
  within Shell 1, the eye travels the rest of the way to BEING, still
  facing the way it was travelling, and the view becomes the light cone
  from BEING. The user crosses from "looking at BEING from outside" to
  "looking out from BEING".
- **1st → 3rd (zooming out).** Zooming out past the cone's widest angle
  (220°) carries the eye back out of BEING along its line of sight, to
  just outside Shell 1, and the orbital mode resumes facing the same way
  (or as near to it as the orbit's polar limit allows).
- Both transitions are continuous movements of the eye along the zoom
  direction, not teleports. The model on the screen is the same geometry
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
in 1st-person mode the user looks *out from* BEING as the vantage point. The
same point in the diamond plays two roles, and the user only encounters
BEING's full structure by passing between them.

This is the closest the UX comes to *enacting*, rather than merely
describing, the framework's claim that BEING is simultaneously a centre
and an emptiness: at Shell 1, the centre the user was viewing becomes
the position the user views *from*. The geometry on either side of
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
  that shows multiple subjects' Diamonds simultaneously. (Note: R2 was
  hard-deleted 2026-06-01; multi-subject views are no longer on the
  roadmap.)
- **Spec §4.7 (epistemic-class triage)** is honoured because the camera
  regime is declared, not silent. The regime itself is a stipulation in
  the §4.7 sense and is tagged as such here. The cone-width-as-attention
  mapping in particular is tagged inline in §A.3.2 as a *stipulation*
  (no historical precedent in linear, *San Yuan*, aspective, or
  Paleolithic representation) and, per the user's decision of
  2026-10-14, is marked on screen as a design choice that makes a
  statement about experience; the *kinds of looking* vocabulary in the
  §A.3.2 supplement is tagged as *borrowed*. The two epistemic statuses
  are kept distinct.
- **Spec §6.7 (time axis as nested horizons, H13)** is honoured because
  the horizons at Shell 5 bound the witness position without appearing
  in it (revised v3.3). From BEING the cone reaches Awakening and
  Obliteration; Birth and Death, which cannot be comprehended from the
  first-person perspective (user decision 2026-10-15, §A.3.2), are seen
  only from outside. v3.0 to v3.2 said the cosmological poles were
  *visible from cone mode*; that is retired.
- **Spec §6.13 (radial mechanism, H4)** is honoured because zoom is
  radial motion and *the camera regime does not pick a mechanism
  reading*. Zoom changes \(r\); it does not commit to whether that
  change is intensification, transformation, development, thresholding,
  or none of the above. The framework's suspension of H4 is inherited
  honestly by the UX. Inside Z1 (v3.2) zoom sets the cone's angle
  instead, and \(r\) stays at 0; that is a statement about attention
  (§A.3.2), not a reading of the radial mechanism.

### A.7 — What this means for downstream work (v3.0 deployment ladder)

- **Stage 1 of the deployment** implements **3rd-person orbital mode**:
  orbital around BEING, BEING non-passable, BEING-as-locus, the seven
  Class-H landmarks and the two limits (v3.1; limits since v3.3).
- **Stage 2** introduces **cone-mode** with the Shell-1 transition. As
  revised in v3.2: the eye at BEING, looking out; the cone always fills
  the screen, and zoom sets its angle from 24° to 220°; zoom through in
  both directions (§A.3.2, §A.3.3). As revised in v3.3: Birth and Death
  are not shown from BEING. The *gao yuan / shen yuan / ping
  yuan* Class H tags are reserved but not surfaced as toggles at Stage 2
  (they belong to UX iteration at or after Stage 2). **Stages 1 and 2
  ship together** (user request of 2026-10-14; Roadmap IV.1, IV.2).
- **Stages 3 and 4** add active-zone fade (Roadmap I.10 AZ.5 default)
  and color palettes (Roadmap I.9 OKLab decomposition) respectively;
  neither changes the camera regime.
- **Future UX consideration: model-side focal depth.** A second control
  — depth-of-field on the model side, distinct from the cone-angle
  control (§A.3.2) — is *deferred*. If
  introduced, it would let the viewer bring a particular radial distance
  from BEING into focus while leaving nearer and farther structure soft.
  This is a UX possibility, not a v3.0 commitment, and will be revisited
  at or after Stage 2.
- Print and PDF renders default to 3rd-person mode. 1st-person
  (cone-mode) renders are permitted for contexts that require them
  (e.g., illustrating the witness position at BEING) and must be
  labelled as such.

### A.8 — Open questions carried forward

- **Wide-cone limit: how panoramic? — RESOLVED v3.2.** v3.0 asked
  whether the widest cone was a forward-hemisphere ceiling (180°), a
  softer approach to panoramic, or full panoramic only at \(r = 0\). The
  user decided (2026-10-14): up to **220°**, "to mimic human vision"
  (§A.3.2). Awareness from BEING stays directed, even at its widest.
- **BEING as singularity vs. passable focal point — RESOLVED v3.2.** The
  viewer does not pass through BEING. Zooming in carries the eye *to*
  BEING, where it stays until the user zooms back out (§A.3.3).
- **What does the user *do* at \(r = 0\)? — RESOLVED v3.2.** \(r = 0\)
  is the stable position of the whole 1st-person mode. There the user
  pans and tilts the cone and narrows or widens it; widening past 220°
  is the way back out. Whether the cone's width *reads* as a quality of
  attention to users who have not been told so stays open (Roadmap I.7).
- **Multi-subject views.** The §4.5 per-subject scope guard rules out
  any third-person view of multiple Diamonds simultaneously at this
  iteration. R2 (which would have relaxed that guard) was hard-deleted
  2026-06-01. Multi-subject view is no longer on the roadmap.
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
