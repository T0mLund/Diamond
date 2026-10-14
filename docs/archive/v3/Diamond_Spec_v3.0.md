# Vegar's Diamond — Specification v3.0

> **Status:** Committed — **v3.0** (committed 2026-06-01 under PR #8;
> closes R1 by Route B, hard-deletes R2, defers R3). Drafted from
> 2026-05-16. Standalone
> specification: this document does not require the v1.0 Roadmap or the
> archived v2-draft Spec to be read.
>
> **Filename convention:** see `Diamond_Versioning_Convention_v1.1.md`. This
> is the in-formation draft of the v3.0 baseline of the Spec. When the
> iteration commits, the `-draft` suffix is dropped, v1.0 documents move
> to `/docs/archive/v1/`, and this file becomes
> `Diamond_Spec_v3.0.md`.
>
> **Reading order.** Read `Diamond_Summary_v3.0.md` first. Then the
> `Diamond_Containment_Note_v3.0.md`. Then this Spec. Then the
> `Diamond_Roadmap_v3.0.md`.
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

Vegar's Diamond is a geometric framework for mapping human experience. It
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

## §3 — Landmarks and the Z-axis quality order

### 3.1 The seven Class-H landmarks (Spec, §6.24 Class H)

| Landmark | Coordinate | Shell | Notes |
|---|---|---|---|
| Heaven | \((1, 0, 0)\) | Shell 3 | equatorial; +X pole |
| Hell | \((-1, 0, 0)\) | Shell 3 | equatorial; −X pole |
| Future | \((0, 1, 0)\) | Shell 3 | equatorial; +Y pole |
| Past | \((0, -1, 0)\) | Shell 3 | equatorial; −Y pole |
| Obliteration | \((0, 0, \varphi)\) | Shell 4 | polar; +Z pole |
| Awakening | \((0, 0, -\varphi)\) | Shell 4 | polar; −Z pole |
| BEING | \((0, 0, 0)\) | — | origin; aperture / locus (Containment Note A.3) |

These seven landmarks are the **canonical Class-H labels** of v3.0
(see §6.24). They are the only seven labels guaranteed to appear in Stage 1
of the deployment (see `Diamond_Roadmap_v3.0.md` Part IV).

### 3.2 Beyond-bipyramid landmarks (Shell 5)

Two additional landmarks anchor the **outer horizons**:

| Landmark | Coordinate | Shell | Notes |
|---|---|---|---|
| Birth | \((0, 0, -\varphi^{2})\) | Shell 5 | landmark anchor; no zone volume |
| Death | \((0, 0, +\varphi^{2})\) | Shell 5 | landmark anchor; no zone volume |

Shell 5 is the outer horizon (see §6.7). Birth and Death are NULL-zoned —
they sit *on* Shell 5, not inside any of the four zones. They are *not* in
Stage 1 scope.

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

## §4 — Governance and editorial rules

### 4.1 Per-subject framework

The Diamond centres on **one subject** at a time. The framework can be
*populated* with many subjects' Diamonds (R2's question), but each
instance is one subject's. This is the **per-subject scope guard**.

### 4.2 Origin at BEING

The origin of the coordinate system is the landmark **BEING**. BEING is
both a centre (a *locus* in the 3rd-person camera regime) and an opening
(an *aperture* in the 1st-person camera regime). See Containment Note
Appendix A.

### 4.3 The Z-axis is structurally distinct

The Z-axis carries the time / meditative-quality reading and reaches all
the way to Shell 5 (the cosmological horizon overlay). The X- and Y-axes
saturate at Shell 4. This asymmetry is the formal reason the bipyramid is
*anisotropic* (the L¹ inequality of §6.22 has a 1/φ factor on z; the
convex hull of §6.22 places Obliteration and Awakening on Shell 4 while
Heaven / Hell / Past / Future sit on Shell 3).

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
| Shell 3 | \(1\) | 1.000000 | inner boundary of Z4; hosts equatorial landmarks (Heaven, Hell, Past, Future) |
| Shell 4 | \(\varphi\) | 1.618034 | outer boundary of Z4; hosts polar landmarks (Obliteration, Awakening) |
| Shell 5 | \(\varphi^{2}\) | 2.618034 | outer horizon; hosts Birth and Death; NULL-zoned (overlay) |

The cascade is a **stipulation** under §4.7. Its motivation is structural:
the ratios between successive shells are all φ, so the framework has a
self-similar logic at every scale. The intermediate radii at Shell 3 and
Shell 4 host the bipyramid's vertices (§6.22).

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
`db/migrations/0015_route_b_zone_partition.sql` as a **blueprint only**,
not applied. The sub-zone labels are **Class T by default** under the
mixed-reading thesis of §6.24.

### 6.7 The time axis as nested horizons

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
B \;=\; \operatorname{conv}\{\, \text{Heaven},\, \text{Hell},\, \text{Past},\, \text{Future},\, \text{Awakening},\, \text{Obliteration} \,\}
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

The bipyramid touches Shell 3 at exactly four points (Heaven, Hell, Past,
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

#### 6.24.2 Three classes for sub-zone and landmark labels

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

#### 6.24.3 The mixed-reading thesis (v3.0 commitment)

v3.0 commits to: **predominantly Class T** with **a small set of Class H
landmarks** scattered through it (the seven Class-H landmarks of §3.1;
the named meditative gradations on the Z-axis quality order of §3.3 if
and only if they argue for promotion under §4.7).

Anything outside that small Class-H set **defaults to Class T** unless
it argues for Class S explicitly.

Class S is the framework's open category. It is **empty by default**;
promotion requires §4.7-warranted argument.

#### 6.24.4 Editorial discipline that follows

- New compound sub-zone labels default to Class T.
- The seven landmarks of §3.1 are explicitly tagged Class H going
  forward.
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
*San Yuan*-style view (viewer inside; aperture they look through; kind of
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
| **(Diamond-specific stipulation, no precedent)** | **Depth-behind-aperture maps to cone-width, and cone-width maps to quality of attention** | **Cone-width-as-attention (Containment Note §A.3.2)** |

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

### 8.1 The τ-deformation (auxiliary, unchanged)

The τ-deformation parameter (v1.0 §8.1) remains an auxiliary apparatus
only. v3.0 makes no commitment about τ beyond what v1.0 made; it is not
in any deployment stage scope.

## §9 — Authoritative schema state

The live Supabase schema (project_id `zilnqideoswbsnbctqhi`) is the
authoritative implementation of §6 and §7.

| Table | Rows | Notes |
|---|---|---|
| `axes` | 3 | X, Y, Z, numerical only per user directive |
| `shells` | 5 | Shell 1 – Shell 5 at the φ-cascade radii (§5) |
| `coordinates` | 9 | The seven Class-H landmarks (§3.1) + Birth + Death |
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
| **H12** | Sub-zone and landmark labels admit a mixed reading: Class T (tags/coordinates) is the default, Class H (hybrid) covers the seven landmarks of §3.1 plus a small set of inherited terms, and Class S (phenomenological states) is empty by default and promotion requires a dedicated §4.7-tagged warrant | **ADOPTED as mixed-reading thesis (§6.24)** | §6.24 |
| **H13** | The time axis is bounded by nested horizons: phenomenological Past / Future at inner zones, biographical-cultural at Z2, civilisational / cosmic at Z3, and cosmological (Big Bang past pole / heat-death–Big-Rip–CCC future pole) as an *overlay* at Shell 5 — the cosmological reading is identification-by-overlay, not identification-by-equation | **ADOPTED as structural commitment (§6.7)** | §6.7 |

H8 and H9 are theorems. H10, H11, H12, H13 are rules and commitments
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
- **τ-deformation (§8.1)** — auxiliary apparatus only. Unchanged.

---

*End of Specification.*
