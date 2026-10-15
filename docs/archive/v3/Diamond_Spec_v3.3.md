# The Diamond — Specification v3.3

> **Status:** Committed — **v3.3** (2026-10-15). Within-baseline revision
> of v3.2 (committed 2026-10-14), which follows v3.1 (the same day)
> and v3.0
> (committed 2026-06-01 under PR #8; closes R1 by Route B,
> hard-deletes R2, defers R3). Standalone specification: this document
> does not require the v1.0 Roadmap or the archived v2-draft Spec to be
> read.
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
>
> **Reading order.** Read `Diamond_Summary_v3.3.md` first. Then the
> `Diamond_Containment_Note_v3.3.md`. Then this Spec. Then the
> `Diamond_Roadmap_v3.3.md`.
>
> **Conventions used throughout.**
> - φ = (1 + √5) / 2 ≈ 1.6180339887498949 is the golden ratio.
> - The three axes are referred to as X, Y, Z and are **numerical only**.
>   The semantic content (affect / time / depth) lives in the zones and
>   the landmarks, not in the axes themselves.
> - Coordinates are written as ordered triples \((x, y, z)\) with the
>   conventions of §3 below.

---

## §1 — What this Spec is

The Diamond is a geometric framework for mapping human experience. It
posits:

- A single subject (the framework is **per-subject**; see §4.5).
- A three-dimensional Euclidean space in which experience-relevant content
  can be positioned (the *items* of §7).
- A **φ-cascade** of nested spherical shells (Shells 1–5; see §4 and §6.1).
- A set of **landmarks** — fixed named coordinates with structural status
  (see §3 and §6).
- A set of **zones** — concentric volumetric regions between shells that
  carry the framework's semantic content (see §6.1).
- A **bipyramid** — the convex hull of the six equatorial / polar
  landmarks; structurally an *inhabitant* of the zone structure rather
  than a *container* of it (see §6.22).
- Two governance rules — the **exactness rule** (§4.6) and the
  **epistemic-class triage rule** (§4.7) — that constrain how claims
  about the framework are made.

The framework is, in §4.4's phrase, *diagrammatic phenomenology, not
metaphysics*. The diagram is a workspace in which lived experience can be
oriented, not a discovered ontology of mind.

## §2 — Axes (numerical only)

Per the user's standing directive: **the three axes are numerical only**.
Semantics live in zones and in named landmarks, not in axis labels.

For the duration of v3.0 the three axes are denoted **X**, **Y**, **Z**.
They are mutually orthogonal and span the Euclidean space of the framework
under the standard right-handed convention.

The framework reserves the right to associate human-readable semantic
content with each axis *through zones and landmarks* (e.g., the Z-axis is
the axis on which the landmarks Awakening, BEING, and Obliteration sit,
and therefore inherits a meditative reading from those landmarks at the
zone level). It does *not* re-label the axes themselves.

## §3 — Landmarks, limits and the quality orders

### 3.1 The seven inner landmarks (Class H, §6.24)

| Landmark | Coordinate | Shell | Notes |
|---|---|---|---|
| Love | \((1, 0, 0)\) | Shell 3 | equatorial; +X pole (replaces Heaven, v3.3) |
| Hate | \((-1, 0, 0)\) | Shell 3 | equatorial; −X pole (replaces Hell, v3.3) |
| Future | \((0, 1, 0)\) | Shell 3 | equatorial; +Y pole |
| Past | \((0, -1, 0)\) | Shell 3 | equatorial; −Y pole |
| Obliteration | \((0, 0, \varphi)\) | Shell 4 | polar; +Z pole |
| Awakening | \((0, 0, -\varphi)\) | Shell 4 | polar; −Z pole |
| BEING | \((0, 0, 0)\) | — | origin; locus / vantage point (Containment Note A.3) |

These seven landmarks are the **seven canonical Class-H labels** (see
§6.24). The six non-origin landmarks are the vertices of the bipyramid
(§6.22). Together with the two limits of §3.2, Birth and Death, they are
the only labels guaranteed to appear in Stage 1 of the deployment (see
`Diamond_Roadmap_v3.3.md` Part IV). (v3.1 and v3.2 counted Birth and
Death among the Class-H labels, making nine; v3.3 gives them a category
of their own.)

User decision, 2026-10-15 (verbatim): *"We will let go of heaven and
hell, and change to the following:
Hate–Fear–Aversion-BEING-Attraction–Desire–Love"*. Love and Hate now
name the landmarks at \((\pm 1, 0, 0)\). They are also the Zone 3
qualities in those directions (§3.4), just as Past and Future name both
the landmarks and the quality of the time axis (§3.5).

### 3.2 The limits: Birth and Death (Shell 5; Class L)

Two additional landmarks anchor the **outer horizons**:

| Landmark | Coordinate | Shell | Notes |
|---|---|---|---|
| Birth | \((0, 0, -\varphi^{2})\) | Shell 5 | Class L (limit); NULL-zoned (outside all zones) |
| Death | \((0, 0, +\varphi^{2})\) | Shell 5 | Class L (limit); NULL-zoned (outside all zones) |

User decisions, 2026-10-15 (verbatim): *"Birth and Death are to be a
category onto themselves."* and *"Birth and Death should not be visible
in the FPV. I reverse my earlier design choice to have it merge with
Awakening and Obliteration. You cannot comprehend those from the first
person perspective, only Awakening and Obliteration."*

Shell 5 is the outer horizon (see §6.7). Birth and Death are the
**limits** (Class L, §6.24.2), a category of their own, and they are
**NULL-zoned**: they sit *on* Shell 5, outside all four zones and outside
the bipyramid, so they are not vertices of the bipyramid hull (§6.22) and
have no zone volume. They are seen only from outside, in the 3rd-person
view; from BEING, in the 1st-person view, they are not shown
(Containment Note §A.3.2). They are in Stage 1 scope. (v3.0 left their
label class unstated and excluded them from Stage 1; v3.1 made them
Class H and added them to Stage 1; v3.3 gives them their own class.
"Limit" is the May 2026 prototype's word for them.)

### 3.3 The Z-axis quality order (user-specified, verbatim)

When the Z-axis is read as a gradation through meditative quality, the
order along the axis is (verbatim from the user, 2026-05-16):

> Birth − Awakening − Meditation − Contemplation − Reflection − BEING −
> Oppression − Excitement − Acceleration − Obliteration − Death

The order corresponds to z-values from \(-\varphi^{2}\) at one extreme
through \(0\) (BEING) to \(+\varphi^{2}\) at the other. The intermediate
gradations (Meditation, Contemplation, Reflection, Oppression, Excitement,
Acceleration) live at coordinates between the named anchor landmarks
and are sub-zone labels of Class T (coordinate-only) unless a §4.7-warranted
case is made for promoting them to Class H.

The order is part of the framework's commitment and is preserved verbatim
above so subsequent prose and UX cannot drift from it.

### 3.4 The X-axis quality order (user-specified, verbatim)

When the X-axis is read as a gradation through affect, the order along
the axis is (verbatim from the user, 2026-10-15):

> Hate–Fear–Aversion-BEING-Attraction–Desire–Love

The order runs from \(x = -1\) (Hate, on Shell 3) through \(0\) (BEING)
to \(x = +1\) (Love, on Shell 3). Aversion and Attraction are the
qualities of Zone 1, Fear and Desire those of Zone 2, and Hate and Love
those of Zone 3; Hate and Love also name the landmarks where the axis
ends (§3.1). The live database already uses these names for the affect
axis and the sub-zones. As with §3.3, the intermediate gradations
(Aversion, Fear, Attraction, Desire) are sub-zone labels of Class T
unless a §4.7-warranted case is made for promoting them to Class H. The
order replaces Heaven and Hell, which v3.0 to v3.2 used as provisional
names for the landmarks at \((\pm 1, 0, 0)\).

### 3.5 The time axis is zoneless (user-specified)

User decision, 2026-10-15 (verbatim): *"The past and future axis will
have to remain "zoneless""*.

The Y-axis carries no zone gradation. Past and Future are its only
names: they name the landmarks at \((0, \mp 1, 0)\) on Shell 3 and the
time quality in every zone, as the live database already records. The
per-zone registers of §6.7.2 are not zone names; they were retired for
now in v3.3 (see the note there).

## §4 — Governance and editorial rules

### 4.1 Per-subject framework

The Diamond centres on **one subject** at a time. The framework can be
*populated* with many subjects' Diamonds (R2's question), but each
instance is one subject's. This is the **per-subject scope guard**.

### 4.2 Origin at BEING

The origin of the coordinate system is the landmark **BEING**. BEING is
both a centre (a *locus* in the 3rd-person camera regime) and the
vantage point of the 1st-person camera regime, from which the viewer
looks out (revised v3.2; v3.0 called it an *aperture* that the viewer
looked through from behind). See Containment Note Appendix A.

### 4.3 The Z-axis is structurally distinct

The Z-axis carries the time / meditative-quality reading and reaches all
the way to Shell 5 (the cosmological horizon overlay). The X- and Y-axes
saturate at Shell 4. This asymmetry is the formal reason the bipyramid is
*anisotropic* (the L¹ inequality of §6.22 has a 1/φ factor on z; the
convex hull of §6.22 places Obliteration and Awakening on Shell 4 while
Love / Hate / Past / Future sit on Shell 3).

### 4.4 Diagrammatic phenomenology, not metaphysics

The Diamond is a *diagram* one inhabits. It is not a discovered ontology.
This is the framework's posture: it stipulates structure for the purpose
of orienting lived experience; it does not claim that the structure exists
prior to the framework.

### 4.5 Scope guards: per-subject, static positions

- **Per-subject.** Each Diamond is one subject's. The framework does not
  show multiple subjects' Diamonds simultaneously at this iteration.
- **Static positions.** Items live at a single coordinate per row. The
  `effective_period` column on `items` (added in migration 0009) allows
  multiple rows per item with non-overlapping periods, but the framework
  is not yet *temporal* in the dynamic sense. R3 addresses this.

These two guards are explicit and unchanged in v3.0. R2 and R3 explore
their eventual relaxation; v3.0 does not relax them.

### 4.6 The exactness rule (governance)

> *When a geometric quantity is analytically computable, compute it
> analytically. When it is not, measure it with declared precision
> (sampling method + confidence interval) and date the measurement.*

#### 4.6.1 What the rule covers

The rule applies to every numeric quantity that appears in any v3.0 (or
later) document and refers to:

- Volumes, surface areas, and ratios of geometric regions.
- Coordinates of landmarks and shell radii.
- Containment claims of the form "region X lies inside region Y" or
  "region X is split α / β by surface Y".
- Distances between landmarks or between any pair of specified points.
- Angles, solid angles, half-cone-angles for `cone_view` shapes.

#### 4.6.2 What the rule does not cover

The rule does **not** apply to:

- Item placements and anchor positions, which are interpretive by §7.5
  and carry `epistemic_status` instead.
- Soft prose claims of the form "most items in this zone tend to X" —
  editorial generalisations, not geometric facts.
- Editorial judgements about which mechanism reading of progression
  (§6.13) is most apt — interpretive, not quantitative.

#### 4.6.3 Format requirements

Numeric claims must be presented in one of three forms:

1. **Analytic.** Show the closed-form expression; cite the section where
   the geometry was defined. Example: "Zone 3 has volume
   \(\tfrac{4}{3}\pi(1 - \varphi^{-3}) \approx 3.19995\)."
2. **Provably bounded.** Use a verified inequality. Example: "Zone 2 lies
   entirely inside the bipyramid; the maximum of \(|x|+|y|+|z|/\varphi\)
   on the shell of radius \(\varphi^{-1}\) is \(\varphi^{-1}\sqrt{2+\varphi^{-2}}
   \approx 0.9539 < 1\) (Lagrange-multiplier argument)."
3. **Measured.** State method + sample size + confidence interval + date.
   Example: "Zone 3 is split 32.21% inside / 67.79% outside the bipyramid
   (Monte Carlo, 64,004,920 samples, 95% CI ±0.011 pp, 2026-05-11)."

#### 4.6.4 Removal of stale numbers

When the rule encounters a prior approximation that does not meet §4.6.3
format, the prior approximation **must be removed**, not merely
supplemented. The replacement may be analytic, bounded, or measured, but
the prior loose figure may not survive in the same document.

Worked example: the "≈88% of the φ-ball" figure for Zone 3 was removed
in the v2-draft cycle and replaced by the measured 32.21% / 67.79% figure
(2026-05-11). v3.0 inherits the removal.

### 4.7 The triage rule (governance)

> *Every public substantive claim in the framework must declare its
> epistemic class: **derived**, **stipulated**, or **borrowed**. Silent
> stipulation is prohibited.*

- **Derived** — a logical or geometric consequence of earlier definitions.
  Carries the burden of showing the derivation.
- **Stipulated** — a definitional choice the framework makes by fiat.
  Carries the burden of saying so explicitly.
- **Borrowed** — a claim imported from an external tradition, text,
  school, or thinker. Carries the burden of citing the source and noting
  where the borrowing modifies it.

#### 4.7.1 Why this is a rule, not a recommendation

The biggest reception risk for the Diamond is that the framework be read
as a *discovered ontology* rather than as the *diagrammatic phenomenology*
its prose explicitly identifies it as (§4.4). The triage rule is the
editorial mechanism that keeps that distinction visible to readers.

#### 4.7.2 Format requirements

A claim's epistemic class may be declared:

- **Inline** — with a parenthetical tag. *Example: "BEING sits at the
  origin (stipulated)."*
- **Section-level** — with a header note covering all claims in the
  section. *Example: "All claims in this section are stipulated unless
  otherwise noted."*
- **Schema-level** — by the item's `epistemic_status` column for items
  inserted via migration 0009.

At least one of the three mechanisms must be in force for every
substantive claim. Untagged claims are editorial drift.

#### 4.7.3 What the rule does not prohibit

The rule does not prohibit stipulation. Stipulation is one of the three
legitimate epistemic classes. The Diamond contains many stipulations
(the φ-cascade, the orientation of the Z-axis, the BEING-at-origin
convention) and these are not failures of rigour — they are declared
design choices. The rule prohibits *silent* stipulation: stipulation
presented as if derived.

## §5 — The φ-cascade

The Diamond's nested shells are at radii drawn from the φ-cascade:

| Shell | Radius (exact) | Radius (approx) | Notes |
|---|---|---|---|
| Shell 1 | \(\varphi^{-2}\) | 0.381966 | inner boundary of Z2 |
| Shell 2 | \(\varphi^{-1}\) | 0.618034 | inner boundary of Z3 |
| Shell 3 | \(1\) | 1.000000 | inner boundary of Z4; hosts equatorial landmarks (Love, Hate, Past, Future) |
| Shell 4 | \(\varphi\) | 1.618034 | outer boundary of Z4; anchors the polar landmarks (Obliteration, Awakening); never drawn |
| Shell 5 | \(\varphi^{2}\) | 2.618034 | outer horizon; anchors the limits (Birth, Death); NULL-zoned (overlay); never drawn |

The cascade is a **stipulation** under §4.7. Its motivation is structural:
the ratios between successive shells are all φ, so the framework has a
self-similar logic at every scale. The intermediate radii at Shell 3 and
Shell 4 host the bipyramid's vertices (§6.22).

**Drawn shells and anchor shells (v3.3).** User decision, 2026-10-15
(verbatim): *"Shell 1, 2, 3 are the only ones that would remain visible
under any circumstance. Shell 4 was developed to give an anchor point for
the polar points of Awakening and Obliteration, and shell 5 was developed
similarly to anchor the Birth and Death points."* Shells 1–3 are the
zone boundaries and the only shells ever drawn. Shells 4 and 5 are
anchors only: radii that place Awakening and Obliteration (Shell 4) and
Birth and Death (Shell 5). The live database already records the
distinction (`shells.role`: `zone_boundary` for Shells 1–3,
`landmark_anchor` for Shells 4 and 5).

## §6 — Zones, sub-zones, the bipyramid, and the time axis

### 6.1 The four zones

The four zones are spherical shells of the Diamond:

| Zone | Definition | Inner radius | Outer radius | Volume (analytic) |
|---|---|---|---|---|
| Z1 | innermost ball | 0 | \(\varphi^{-2}\) | \(\tfrac{4}{3}\pi\varphi^{-6} \approx 0.2270\) |
| Z2 | shell | \(\varphi^{-2}\) | \(\varphi^{-1}\) | \(\tfrac{4}{3}\pi(\varphi^{-3}-\varphi^{-6}) \approx 0.7616\) |
| Z3 | shell | \(\varphi^{-1}\) | \(1\) | \(\tfrac{4}{3}\pi(1-\varphi^{-3}) \approx 3.19995\) |
| Z4 | shell | \(1\) | \(\varphi\) | \(\tfrac{4}{3}\pi(\varphi^{3}-1) \approx 13.65\) |

Zones Z1, Z2 are **shell-defined**. Zone 3 is **jointly defined** by the
φ-shell and by the bipyramid (§6.22), which under Route B (R1 close-out,
2026-06-01) operates as a **second containment system** alongside the
spheres. The bipyramid intersects the Z3 shell transversally, partitioning
each Z3 angular sub-zone into an **inner half** (inside the bipyramid)
and an **outer half** (outside). The φ-shell once labelled "Zone 4"
is no longer treated as a uniform zone: only its two **polar caps** —
the parts of the φ-shell that lie inside the bipyramid, projecting through
the ±Z vertices — are defined regions in v3.0. The remainder of the
φ-shell is **undefined / blank space**, structurally parallel to Shell 5
(see §6.22.5).

### 6.2 Sub-zones (schema and partition)

Z1 and Z2 each carry 26 sub-zones (unchanged from v2-draft):

- **6 axial sub-zones** (one per ±X / ±Y / ±Z direction).
- **12 plane sub-zones** (one per signed pair of axes; e.g., +X+Y / +X−Y /
  ... / −Y+Z).
- **8 octant sub-zones** (one per signed triple of axes).

Z1 and Z2 are 100% inside the bipyramid (H9, §6.23) so the bipyramid does
not further partition them.

Z3 carries **52 sub-zones**: the 26 angular sub-zones (6 axial, 12 plane,
8 octant) are each split by the bipyramid surface into an `.inner` half
and an `.outer` half. The naming convention extends the live-schema slugs
by suffix (Option A, chosen 2026-06-01): e.g.,
`zone-3.octant-ppp.inner` and `zone-3.octant-ppp.outer`.

The label "Zone 4" is **retired in prose** in v3.0. The two regions
formerly called Z4 caps are now called **polar caps** (north and south),
defined as `polar-cap.north` and `polar-cap.south` in prose. For schema
continuity the existing slugs `zone-4.north` and `zone-4.south` are
**preserved** as their stable database identifiers; the prose rename is
not a migration.

Total defined sub-zones in v3.0: **106** (Z1: 26, Z2: 26, Z3: 52, polar
caps: 2). The 80-sub-zone live schema (`sub_zones` table) is the v2-draft
baseline; migration to the 106-sub-zone partition is drafted in
`db/blueprints/0015_route_b_zone_partition.sql` as a **blueprint only**,
not applied (moved out of `db/migrations/` on 2026-10-14 so that the
migration runner never executes it). The sub-zone labels are **Class T by default** under the
mixed-reading thesis of §6.24.

### 6.7 The time axis as nested horizons

> **Retired for now (v3.3).** Asked whether the per-zone registers of
> §6.7.2 should stay as a reading of the now zoneless axis or be
> retired, the user answered on 2026-10-15 (verbatim): *"retire those
> for now"*. The register table (§6.7.2), the nested-horizon reading it
> expresses (§6.7.1) and H13 (§10) are therefore retired for now, and
> the cosmological overlay at Shell 5 with them; §6.7.4 and §6.7.5,
> which discuss that overlay, are kept for the record. The rule on verbs
> in §6.7.3 stays in force. Birth and Death remain the limits at Shell 5
> (§3.2). The text is kept unchanged below so that it can be restored.

#### 6.7.1 What the section asserts

The time axis (the Y-axis in the canonical orientation; Past at \((0,-1,0)\),
Future at \((0,1,0)\); Birth at \((0,0,-\varphi^{2})\) and Death at
\((0,0,\varphi^{2})\) sit on the Z-axis and bound the cosmological overlay
at Shell 5) is read as a stack of **nested horizons** rather than as a
single uniform gradient.

#### 6.7.2 The two-layer time axis

| Zone | Pastward register | Futureward register | Register |
|---|---|---|---|
| Z1 | Memory | Anticipation | personal / phenomenological |
| Z2 | History / ancestry | Projection / possibility | biographical-cultural |
| Z3 | Deep past / origin myth | Deep future / destiny | civilisational / cosmic imagination |
| Shell 5 (outer overlay) | Big Bang / initial low-entropy boundary | Heat death / Big Rip / CCC — *which* cosmological terminus is left unspecified | cosmological limit (overlay) |

The inner three rows are **phenomenological time** — time as a subject
inhabits it. The outer row is **cosmological time** — time as it bounds
any subject's possible temporal experience. The two registers are
**nested**, not identified: personal birth and death are local instances
of the outer horizons (at Shell 5), and the cosmological instances are
overlays at the same shell.

**Note (v3.3).** The time axis is zoneless (§3.5). The registers in this
table are not zone names and are never shown as labels; Past and Future
remain the axis's only names in every zone. The table is retired for now
(user decision 2026-10-15; see the note under §6.7).

#### 6.7.3 What scales along the time axis

The verb "intensifies" is **retired** for the time axis. Time does not
become "more time-ish" with radius. What scales:

- Temporal depth (cosmological age, biographical reach).
- Entropy gradient (low near the pastward pole, high near the
  futureward pole — Eddington / Boltzmann arrow).
- Irreversibility of thermodynamic processes.
- Structure-formation history.
- Horizon distance / causal reach.

Prescribed verbs for the time axis: **unfolds**, **dilates**, **deepens**.
Acceptable alternatives: *develops*, *extends*. **Prohibited:**
*intensifies*, *progresses* (the latter for its teleological connotation).

#### 6.7.4 Cosmological commitments

v3.0 does **not** commit to a specific cosmological model for the
futureward horizon. The only commitment is structural: *the time axis is
bounded by horizons it cannot cross*.

#### 6.7.5 Risks introduced by the cosmological overlay

The nested-horizon formulation introduces five risks (see archived v2-draft
Spec §6.7.5 for full discussion): category confusion (mitigated by
*nesting*, not *identification*); single-subject tension with §4.5
(mitigated by treating the cosmological reading as a *per-subject overlay*,
not a shared structural commitment); asymmetry between the two cosmological
poles (accepted; the structural symmetry is preserved even when the
physical instances are asymmetric); second-law directionality (accepted;
the time axis has directional but not intensive asymmetry); transpersonal
scope creep (mitigated by treating Big Bang and heat-death as *conceptual
horizons*, not accessible states).

#### 6.7.6 Revision to the "time is the only symmetric axis" claim (v1.0
rescinded)

v1.0 §6.7 stated that the time axis is the only axis that does not develop
radially. **Rescinded.** The time axis *does* develop radially — outward
toward horizons — but the gradient is *directional* (entropy / causal
reach / depth), not *intensive*. The new statement: **the time axis is
the only axis whose radial development is gradient-directional rather
than gradient-intensive.**

### 6.13 Radial progression (H4 carried open)

The radial direction — outward from BEING toward Shell 4 / Shell 5 —
carries a notion the v1.0 baseline calls *progression*. Five mechanism
readings are held in suspension:

- **Intensification.** Each shell is a more-intense version of the
  preceding zone's content.
- **Transformation.** Each shell is a qualitative transformation of the
  preceding zone's content.
- **Development.** Each shell unfolds latent structure of the preceding
  zone.
- **Thresholding.** Each shell crosses a threshold the preceding zone
  did not.
- **No unified mechanism.** The five readings each apply locally but
  none applies globally.

H4 is **open**. v3.0 carries the suspension forward; no mechanism is
adopted. The retired verb "intensifies" (for the *time* axis only, per
§6.7.3) does not affect H4 — the affect and depth axes may still be read
as intensifying.

### 6.22 The bipyramid

#### 6.22.1 Canonical description (convex hull)

The bipyramid is **the convex hull of the six landmark coordinates**:

\[
B \;=\; \operatorname{conv}\{\, \text{Love},\, \text{Hate},\, \text{Past},\, \text{Future},\, \text{Awakening},\, \text{Obliteration} \,\}
\]

with the coordinates of §3.1.

This is the **canonical description in prose**.

#### 6.22.2 Computational form (L¹ inequality)

The convex hull of §6.22.1 is **identically** the closed region

\[
B \;=\; \big\{\, (x,y,z) \in \mathbb{R}^{3} \;\big|\; |x| + |y| + \tfrac{|z|}{\varphi} \,\le\, 1 \,\big\}.
\]

This is the **computational form** — what code, queries, and analytic
derivations use. The two descriptions are mathematically equivalent.

#### 6.22.3 Why two forms

- The **convex-hull form** answers *what the bipyramid is*: a minimal
  convex region picking out the six named landmarks.
- The **L¹ form** answers *how to test membership*: given a point, sum
  the absolute values of its coordinates (with z scaled by \(1/\varphi\))
  and compare to 1.

The convex-hull form makes the **deformation properties** legible: if any
one landmark moved, the bipyramid would deform to track it (the convex
hull is determined by its vertices). The L¹ form makes the **scaling
properties** legible: the bipyramid is a φ-stretched octahedron.

#### 6.22.4 Structural status (second containment system, Route B)

**Updated 2026-06-01 under R1 close-out (Route B).** The bipyramid is a
**second containment system** operating alongside the φ-spheres. It is
**not** a replacement for the shell structure; it is a parallel partition
that operates on Zone 3 and on the φ-shell formerly called Z4.

Under Route B:

- Z1, Z2 remain shell-defined; they are 100% inside the bipyramid so the
  bipyramid imposes no further partition on them.
- Z3 is jointly defined: the φ-shell defines the angular sub-zone
  partition (26 angular regions); the bipyramid surface splits each into
  inner / outer halves (52 total).
- The φ-shell formerly labelled Z4 is no longer a zone in prose. Two
  regions — the polar caps where the bipyramid penetrates the φ-shell
  along ±Z — are defined; the equatorial belt is undefined / blank.

This is a **conservative** instantiation of Route B (chosen 2026-06-01):
the non-cap parts of the φ-shell are left undefined rather than carved
into additional regions. Future iterations may revisit this. Promotion
of the bipyramid to fully zone-defining (Route C) was ruled out
2026-06-01.

The v1.0 / v2-draft "inhabitant-only" commitment is **rescinded**.

#### 6.22.5 Verified containment facts (Route B)

From §6.23 (the measured-geometry table):

- The bipyramid contains all of Zone 1 (analytically; Lagrange argument
  on Shell 1). H9 closed as theorem.
- The bipyramid contains all of Zone 2 (analytically; Lagrange argument
  on Shell 2). H9 closed as theorem.
- The bipyramid intersects the Zone 3 shell transversally; 32.21% of Z3
  is inside (now the `.inner` halves of the 26 angular sub-zones), 67.79%
  outside (the `.outer` halves). Measured 2026-05-11; sample size 64M;
  95% CI ±0.011 pp.
- The bipyramid intersects the φ-shell formerly called Z4 transversally;
  the two polar caps (the inside-bipyramid parts) are defined, the
  equatorial belt (outside-bipyramid) is **undefined / blank space** in
  v3.0 under the conservative reading. The volumetric split of the
  φ-shell into cap + belt is tracked as **verification deliverable R1.1**
  in the Roadmap — informational only; no longer gates R1.

The bipyramid touches Shell 3 at exactly four points (Love, Hate, Past,
Future) and the φ-shell at exactly two points (Awakening, Obliteration).
Everywhere else, the bipyramid surface lies strictly interior to the
corresponding shell.

**Stage 1 render consequence: none.** The bipyramid is already part of
the v3.0 render as a translucent skin (§6.22 in the Roadmap). The
partition of Z3 into inner / outer halves is *invisible* until items are
inserted into sub-zones, because no items currently populate Z3.

### 6.23 Measured-geometry table

For each zone, the bipyramid \(B\) (§6.22) partitions the zone into an
*inside-B* part and an *outside-B* part. The volumetric split, certified
at the level the §4.6 exactness rule requires:

| Zone | Volume (analytic) | Inside B | Outside B | Method, date |
|---|---|---|---|---|
| Z1 | \(\tfrac{4}{3}\pi\varphi^{-6} \approx 0.2270\) | 100% | 0% | Analytic (Lagrange on max \(|x|+|y|+|z|/\varphi\) on shell of radius \(\varphi^{-2}\); maximum \(\approx 0.5895 < 1\)). |
| Z2 | \(\tfrac{4}{3}\pi(\varphi^{-3} - \varphi^{-6}) \approx 0.7616\) | 100% | 0% | Analytic (Lagrange on max \(|x|+|y|+|z|/\varphi\) on shell of radius \(\varphi^{-1}\); maximum \(\approx 0.9539 < 1\)). |
| Z3.inner (the 32.21% of the Z3 shell inside B) | — (derived from Z3) | **100%** of Z3.inner | 0% | By construction. Measurement of the 32.21% / 67.79% Z3 split: Monte Carlo, 64,004,920 samples drawn uniformly in the Z3 shell, 95% CI ±0.011 pp; cross-checked against a 400³ uniform grid integration which returned 32.21% / 67.79% to the same precision. 2026-05-11. |
| Z3.outer (the 67.79% of the Z3 shell outside B) | — (derived from Z3) | 0% | **100%** of Z3.outer | By construction; same measurement source. |
| φ-shell (formerly Z4) | \(\tfrac{4}{3}\pi(\varphi^3 - 1) \approx 13.65\) | polar caps only (defined) | equatorial belt (undefined / blank) | Volumetric split into cap + belt: not yet computed. Tracked as R1.1 verification deliverable; informational only. |

#### 6.23.1 Geometric reading

Containment-by-the-bipyramid is **complete** in the inner two zones and
**partial** in the outer two. The transition happens at Shell 3 (where
the equatorial landmarks sit on the bipyramid). The bipyramid is, in a
precise sense, the structure that *just contains* the inner Diamond.

This is independent geometric evidence that the bipyramid is doing
structural work even in its current inhabitant-only role: it marks the
boundary between always-contained and partially-contained zones.

#### 6.23.2 R1 outcome (closed 2026-06-01)

**R1 closed under Route B** on 2026-06-01. Decision: the bipyramid is
promoted to a **second containment system**, partitioning the Z3 shell
into inner / outer halves (52 sub-zones) and defining the two polar caps
as the only defined regions of the φ-shell formerly called Z4. The
remainder of the φ-shell is undefined / blank space.

Full rationale: `docs/decision-notes/2026-06-01_r1_route_b_closure.md`.

The polar-cap volumetric split is retained as the R1.1 verification
deliverable but no longer gates anything; it is informational only.
Future iterations may revisit the equatorial-belt question (whether to
define additional φ-shell regions outside the bipyramid).

### 6.24 Sub-zone labels: tags, states, and hybrids (mixed-reading)

#### 6.24.1 The problem this section addresses

The Diamond's 26 sub-zones per shell carry compound labels (e.g.,
"Love + Future + Meditation"). Such a label can be read either as a
**unitary phenomenological state** (an experience type one might be in)
or as a **coordinate tag** (an address for items anchored at that
position). The two readings entail different burdens.

#### 6.24.2 Four classes for sub-zone and landmark labels

**Class T — Tag (coordinate-only).** The label is a bookkeeping address.
It denotes "the sub-zone where the X-, Y-, and Z-projections sit at
specified positions." It claims nothing about whether the conjunction is
itself a recognisable kind of experience.

*Burden:* the three component axes must each be defended. The compound
label needs no defence beyond the axes.

*Schema fit:* perfect. `sub_zones.slug` is by construction a coordinate
string.

**Class S — State (phenomenological kind).** The label names a unitary
experience type the framework claims is recognisable as such.

*Burden:* the label must be defended as a kind, with cited sources or
argued phenomenological warrant. The triage rule (§4.7) applies:
state-labels are typically *borrowed* or *stipulated*.

*Schema fit:* state-labels become `items` of kind `concept`, anchored
at the relevant coordinate.

**Class H — Hybrid.** The label functions as a tag *for placement* and as
a state-name *for content*.

*Burden:* both, separated.

*Schema fit:* in the schema, Class H labels live as `items` of kind
`concept` (the state-name role) *and* are referenced by name in
`sub_zones.label` or `coordinates.label` (the coordinate role).

**Class L — Limit (v3.3).** The label names a limit of the framework
rather than a place within it: what bounds experience and cannot be
comprehended from the first-person perspective. Its only members are
Birth and Death (§3.2). User decision, 2026-10-15 (verbatim): *"Birth
and Death are to be a category onto themselves."*

*Burden:* placement. A limit is defended by where it sits (on Shell 5,
outside every zone and outside the bipyramid), not as a kind of
experience.

*Schema fit:* the two `coordinates` rows with `landmark_type =
'outer_landmark'`; no other label has that type.

*Display:* seen only from outside, in the 3rd-person view; not shown
from BEING (Containment Note §A.3.2).

#### 6.24.3 The mixed-reading thesis (v3.0 commitment)

v3.0 commits to: **predominantly Class T** with **a small set of Class H
landmarks** scattered through it (the seven Class-H landmarks of §3.1;
the named gradations of the quality orders of §3.3 and §3.4 if and only
if they argue for promotion under §4.7). Birth and Death stand apart as
the two limits, Class L (§3.2; v3.3).

Anything outside that small Class-H set **defaults to Class T** unless
it argues for Class S explicitly.

Class S is the framework's open category. It is **empty by default**;
promotion requires §4.7-warranted argument.

#### 6.24.4 Editorial discipline that follows

- New compound sub-zone labels default to Class T.
- The seven landmarks of §3.1 are explicitly tagged Class H going
  forward. Birth and Death (§3.2) are tagged Class L (v3.3; v3.1 and
  v3.2 tagged them Class H).
- Promoting a label into Class S requires a dedicated argument and
  triggers §4.7 — the promotion itself is a stipulation or a borrowing
  and must be tagged.

### 6.25 Historical lineage of spatial representation

*§4.7 status: all four traditions surveyed here are tagged **borrowed**.
They inform the Diamond's UX vocabulary and provide epistemic precedent
for the camera regime described in the Containment Note Appendix A; they
do not, in themselves, license any Diamond-specific claim. Claims that
the Diamond makes about its own perspective behaviour that go beyond what
these traditions support — most notably the cone-width-as-attention
mapping (Containment Note §A.3.2) — are tagged separately as
**stipulations**.*

The Diamond's two-perspective camera regime draws on four well-documented
historical traditions of spatial representation. The traditions are
summarised here so the framework's own *additions* to the lineage (the
stipulations) are visible against the background of the *borrowings*. Full
historical treatment is in the archived v2-draft Spec §6.25.

#### 6.25.1 Western linear perspective (15th c.)

Origin: [Brunelleschi c. 1413](https://en.wikipedia.org/wiki/Linear_perspective);
[Alberti's *De pictura* 1435](https://en.wikipedia.org/wiki/De_pictura).
Single station-point, picture plane, projective construction.

**Borrowed in the Diamond:** the 3rd-person orbital mode — the viewer is
outside the Diamond and sees it as a structured object with BEING at
screen-centre.

#### 6.25.2 Chinese *San Yuan* / three-distances (11th c.)

Origin: [Guo Xi, *Lofty Messages of Streams and Mountains* (c. 1080)](https://en.wikipedia.org/wiki/Guo_Xi).
Three *kinds of looking*:

- **高遠 *gao yuan* (high distance)** — looking up.
- **深遠 *shen yuan* (deep distance)** — looking into.
- **平遠 *ping yuan* (level distance)** — looking across.

**Borrowed in the Diamond:** the 1st-person cone-mode is structurally a
*San Yuan*-style view (viewer inside, looking out from BEING; kind of
looking matters). The three labels are reserved as Class H tags for
future UX (Containment Note §A.3.2 supplement).

#### 6.25.3 Egyptian aspective representation (3rd millennium BCE onward)

Origin term: [Heinrich Schäfer, *Principles of Egyptian Art*, 1919](https://archive.org/details/principlesofegyp0000scha).
No fixed station-point; each part shown from its canonical angle. The
image is *epistemic*, not *optical*.

**Borrowed in the Diamond:** §4.7's distinction between *what the
framework is structurally* and *what a particular reading depicts*. The
bipyramid (§6.22) is in this sense an aspective object.

#### 6.25.4 Paleolithic cartography (Abauntz, ~13,660 BP)

Origin: [Utrilla et al., *Antiquity*, 2009](https://www.cambridge.org/core/journals/antiquity/article/around-the-rocks-of-abauntz-a-late-magdalenian-engraved-stone-block-from-the-cave-of-abauntz-navarra-spain/).
The earliest known map; predates writing by ~8,000 years.

**Borrowed in the Diamond:** the *container-vs-inhabitant* duality
(Containment Note §2.4). The Diamond is both an external map (the
bipyramid as object) and an inhabitable territory (cone-mode from inside
Z1). Also: representation-as-cognitive-training ([Miyagawa et al., MIT,
2018](https://news.mit.edu/2018/cave-art-cognitive-leap-language-mathematics-0221))
gives epistemic warrant to UX-as-intervention.

#### 6.25.5 Synthesis

| Tradition | What the Diamond borrows | Where it appears |
|---|---|---|
| Western linear (Brunelleschi, Alberti) | Single station-point view of a structured object from outside | 3rd-person orbital mode |
| Chinese *San Yuan* (Guo Xi) | Viewer-inside-scene; *kinds of looking* vocabulary | 1st-person cone-mode; three-distances Class H tags |
| Egyptian aspective (Schäfer) | Epistemic-canonical representation distinct from perspectival depiction | The bipyramid as aspective object; §4.7's structural ↔ reading distinction |
| Paleolithic cartography (Abauntz) | Container/inhabitant duality; representation-as-cognitive-training | The Containment Note's framing |
| **(Diamond-specific stipulation, no precedent)** | **The width of the light cone from BEING maps to a quality of attention (wide: open awareness; narrow: focused attention); marked in the UX as a design choice (v3.2)** | **Cone-width-as-attention (Containment Note §A.3.2)** |

Anything in the left column except the last row is a **borrowing**. The
last row is a **stipulation** with no external warrant — its license
comes only from §4.7. This synthesis is the §4.7 discipline made
operational for the camera regime.

## §7 — Items and relations (schema-aligned)

The framework maintains a populated content layer through the `items` and
`item_relations` tables (deployed in migration 0009; baseline restated in
the idempotent `0001_baseline.sql`). The detailed schema and editorial
policies for items are inherited unchanged from v1.0 §7. v3.0 makes no
changes to the items / relations data model.

Key v1.0-inherited rules carried forward:

- **§7.5 — Anchor placement is interpretive.** Item anchor positions
  (`items.anchor_coordinate_slug`, `items.anchor_sub_zone_slug`) are
  not bound by the exactness rule (§4.6); they are interpretive judgements
  and carry `epistemic_status` instead.
- **§7.6 — Provenance is required.** Every item must carry a
  `provenance` field naming the source (tradition, text, school, or
  argued judgement) for its placement.
- **§7.7 — Relations are typed.** `item_relations.relation_kind` must be
  drawn from the existing enum; new kinds require their own iteration.

### 7.5.1 (new in v3.0) Item placements and the triage rule

Item descriptions and provenance must comply with the §4.7 triage rule.
The `epistemic_status` column already provides the inline mechanism; new
item insertions must populate it.

## §8 — Auxiliary apparatus

### 8.1 The τ-deformation (auxiliary; shown as the opening since v3.2)

The τ-deformation parameter (v1.0 §8.1) carries the bipyramid (τ = 0)
into a horn torus (τ = 1). It remains an auxiliary apparatus: v3.2 makes
no claim about what the torus means, and no landmark, shell or zone is
defined by it.

v3.2 brings it into deployment as the **opening** of the web app, played
once, from torus to diamond. User decisions, 2026-10-14 (verbatim):

> *We also need to reinstate the torus animation from graves diamond*

> *The torus should "open" to become the diamond. The walls of its
> central hole should come together at the center, fusing into a line of
> no volume from which birth and death rises and descends, stretching
> out the points of obliteration and awakening into the diamond shape.*

As built, the opening starts from the horn torus of the May 2026
prototype ("Graves' Diamond"): a horn torus about the Z axis whose
major and minor radii both equal half the apex height, here φ / 2 (the
prototype used the same rule at its own dimensions) and runs in two stages when the user
clicks, taps or presses Enter:

1. **Closing.** The walls of the central hole come together at the
   centre and fuse into the Z axis, a line of no volume, with BEING at
   its middle.
2. **Stretching.** Birth and Death rise and descend along that line,
   drawing Obliteration and Awakening out into the bipyramid's apices,
   while the round body settles onto the bipyramid. The shells then
   appear.

The in-between shapes and the timing (3.6 s; 0.6 s when the device asks
for reduced motion) are the assisting agent's choices, made to follow
the description above. They carry no framework meaning (§4.7: a
presentation choice, not a claim).

## §9 — Authoritative schema state

The live Supabase schema (project_id `zilnqideoswbsnbctqhi`) is the
authoritative implementation of §6 and §7.

| Table | Rows | Notes |
|---|---|---|
| `axes` | 3 | X, Y, Z, numerical only per user directive |
| `shells` | 5 | Shell 1 – Shell 5 at the φ-cascade radii (§5) |
| `coordinates` | 9 | The seven Class-H landmarks (§3.1) and the two limits, Birth and Death (§3.2) |
| `zones` | 4 | Z1 – Z4 (§6.1) |
| `sub_zones` | 80 | 26 × 3 (Z1, Z2, Z3) + 2 caps (Z4) |
| `sources` | n/a | Source registry |
| `source_positions` | n/a | Position-per-source |
| `resonances` | n/a | Pairwise resonance relations |
| `prose_sections` | n/a | Long-form prose entries |
| `glossary_terms` | n/a | Glossary |
| `revisions` | n/a | Revision history |
| `items` | n/a | Items at coordinates (migration 0009) |
| `item_relations` | n/a | Typed relations between items (migration 0009) |

All tables are **RLS-enabled** (fully-private posture). All functions are
hardened with `search_path = ''`. All views run with
`security_invoker = true`. Anon reads are not granted at v3.0 — the
project is **read-only for the project owner and the assisting agent
only**, per the user's directive.

Migration files on `main`:

- `0001_baseline.sql` — idempotent baseline snapshot (Phase 1.5b).
- `0009_items_and_relations.sql` — items + relations schema.
- `0010_phase_1_5c_rls_remediation_phase_a.sql` through
  `0014_phase_1_5c_rls_remediation_phase_d2.sql` — Phase 1.5c RLS
  remediation (5 migrations).
- `0016_revival_cleanup.sql` — revival clean-up (2026-10-14).
- `0017_love_hate_and_limits.sql` — Love and Hate replace Heaven and
  Hell; Birth and Death described as limits (2026-10-15; v3.3).

## §10 — Hypothesis register

v1.0 carried hypotheses H1–H4. v3.0 carries H4 forward unchanged,
**closes H5 by adoption under Route B** (R1, 2026-06-01),
**disregards H6** as hypothetical speculation (R2 hard-deleted, 2026-06-01),
**defers H7** until first item insertion in Z3 (R3, 2026-06-01), and
adopts H8–H13.

| # | Hypothesis | Status | Where |
|---|---|---|---|
| H1 | *(carried from v1.0, unchanged)* | open | v1.0 §10 |
| H2 | *(carried from v1.0, unchanged)* | open | v1.0 §10 |
| H3 | *(carried from v1.0, unchanged)* | open | v1.0 §10 |
| H4 | Radial progression has a unified mechanism (one of: intensification, transformation, development, thresholding, or no unified mechanism) | open; five readings held in suspension | §6.13 |
| H5 | The bipyramid should be promoted to a second containment system partitioning Zone 3 into inner / outer halves and defining the polar caps of the φ-shell | **ADOPTED** under Route B (R1 closed 2026-06-01); see `docs/decision-notes/2026-06-01_r1_route_b_closure.md` | §6.22.4, §6.23.2 |
| H6 | M3 is a containing structure for multiple per-subject Diamonds | **DISREGARDED** as hypothetical speculation (2026-06-01); R2 hard-deleted | — |
| H7 | Subjects move through their Diamonds over time; positions are not static | **deferred** until first item insertion in Z3 (R3 deferred 2026-06-01) | R3 |
| **H8** | The bipyramid is identically the convex hull of the six landmark coordinates | **CLOSED as theorem** | §6.22 |
| **H9** | Zones 1 and 2 lie 100% inside the bipyramid | **CLOSED as theorem** | §6.23 |
| **H10** | Every geometric quantity in v3.0+ documents is either analytic, bounded, or dated-measured with declared precision | **ADOPTED as rule (§4.6)** | §4.6 |
| **H11** | Every substantive claim in the framework is tagged by epistemic class — derived, stipulated, or borrowed — and silent stipulation is prohibited | **ADOPTED as governance rule (§4.7)** | §4.7 |
| **H12** | Sub-zone and landmark labels admit a mixed reading: Class T (tags/coordinates) is the default, Class H (hybrid) covers the seven landmarks of §3.1 plus a small set of inherited terms (v3.3; Birth and Death, Class H in v3.1–v3.2, are now the Class L limits), and Class S (phenomenological states) is empty by default and promotion requires a dedicated §4.7-tagged warrant | **ADOPTED as mixed-reading thesis (§6.24)** | §6.24 |
| **H13** | The time axis is bounded by nested horizons: phenomenological Past / Future at inner zones, biographical-cultural at Z2, civilisational / cosmic at Z3, and cosmological (Big Bang past pole / heat-death–Big-Rip–CCC future pole) as an *overlay* at Shell 5 — the cosmological reading is identification-by-overlay, not identification-by-equation. *v3.3: the time axis is zoneless (§3.5), so the per-zone registers are not zone names.* | **RETIRED for now (2026-10-15)**; adopted as a structural commitment in v3.0 | §6.7 |

H8 and H9 are theorems. H10, H11, H12, H13 are rules and commitments
(H13 retired for now in v3.3)
adopted in the v2-draft → v3.0 transition. They remain in the register so
the register tells a complete story of what each iteration produced.

**Provenance.** H11, H12, H13, and the Containment Note Appendix A enter
the framework as the response to the v1.0 model-council review
(2026-05-12). The cone-width-as-attention stipulation in §A.3.2 enters
from the perspective-and-cartography research thread (2026-05-12). Both
records are preserved in the historical archive.

## §11 — Reaffirmed (no change in v3.0)

- **Scope guards (§4.5)** — per-subject scope and static positions remain
  in force. R3 explores their eventual relaxation; v3.0 does not relax
  them.
- **Progression reframe (§6.13)** — the five mechanism readings continue
  to be held in suspension.
- **Schema** — no migration `0015` or later is proposed in v3.0. The
  live schema is the v3.0 schema.
- **Items / relations taxonomy (§7)** — unchanged. The data model is
  stable.
- **Zone definitions (§6.1)** — unchanged. Zones remain shell-defined.
- **τ-deformation (§8.1)** — auxiliary apparatus only. Shown as the
  opening since v3.2; no framework commitment added.

---

*End of Specification.*
