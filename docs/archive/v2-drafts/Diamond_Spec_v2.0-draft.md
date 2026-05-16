# Vegar's Diamond — Specification v2.0 (draft)

> **Status:** In formation — v2.0-draft, as of 2026-05-12. Authoritative for what it changes; carries forward everything else from `Diamond_Roadmap_v1.0.md` (the v1.0 baseline, previously named vNext+1) unchanged.
>
> **Filename convention:** see `Diamond_Versioning_Convention_v1.0.md`. This is the in-formation draft of the v2.0 baseline of the Spec. When the iteration commits, the `-draft` suffix is dropped and v1.0 documents move to archive.
>
> **Scope.** vNext+2 changes:
> - §4 — adds §4.6 (Exactness rule), §4.7 (Epistemic-class triage as governance rule).
> - §6.7 — time axis reframed as nested horizons; "intensify" retired for this axis.
> - §6.22 — bipyramid description revised; canonical reading is now the convex hull.
> - §6.23 *(new)* — measured-geometry table for the four zones (containment table).
> - §6.24 *(new)* — sub-zone labels: tags-vs-states distinction (mixed reading).
> - §10 — hypothesis register updated (H4 carried forward; H8, H9 closed as theorems; H10–H13 adopted).
>
> All other sections of vNext+1 — §1, §2, §3, §4.1–§4.5, §5, §6.1–§6.21, §7, §8, §9, §11 — are inherited from vNext+1 unchanged. This document does not repeat them.

---

## Change Log (vNext+1 → vNext+2)

| Section | Change | Motivation |
|---|---|---|
| §4.6 *(new)* | Exactness rule added | Surfaced by errors in the vNext+1 session; codified so the pattern does not recur. |
| §4.7 *(new)* | Epistemic-class triage adopted as governance rule | Council review 2026-05-12 (Claude Opus 4.7) identified the derived/stipulated/borrowed triage as the spec's strongest rigor move; making it a formal rule prevents silent drift from scaffold to ontology. |
| §6.7 | Time axis reframed as nested horizons (personal Birth/Death at Shell 5 inner instance; cosmological horizons at Shell 5 outer overlay). "Intensify" retired for this axis. | Council review 2026-05-12 (unanimous) identified the time axis as the framework's biggest acknowledged gap. The nested-horizon formulation closes the gap without forcing a specific cosmology. |
| §6.22 | Canonical reading of the bipyramid is now "convex hull of the six landmarks". L¹ form retained as computational. | The container–inhabitant question (Containment Note §2) is much easier to discuss when the inhabitant is described by what it picks out. |
| §6.23 *(new)* | Measured-geometry table for the four zones | Replaces and removes the unverified "≈88% of the φ-ball" figure carried in earlier drafts. Closes part of R1. |
| §6.24 *(new)* | Sub-zone labels classified per-label as tag (coordinate address), state (unitary phenomenological kind), or hybrid (both) | Council review 2026-05-12 (GPT-5.5) identified "compositional naming" of 26 sub-zones as the largest semantic coherence risk; mixed reading dissolves the risk by being explicit about which labels do which work. |
| §10 | H4 carried over; H5–H7 reframed under containment; H8, H9 closed; H10–H13 adopted | Three new hypotheses adopted from council review; one rule (H11), one mixed-reading thesis (H12), one nested-horizon thesis (H13). |

---

## §4.6 — The exactness rule (new)

When a geometric quantity is analytically computable, **compute it analytically**. When it is not analytically computable, **measure it with declared precision** (sampling method, sample size, confidence interval) and **date the measurement**.

### 4.6.1 — What the rule covers

The rule applies to every numeric quantity that appears in any vNext+2 (or later) document and refers to:

- Volumes, surface areas, and ratios of geometric regions of the Diamond.
- Coordinates of landmarks and shell radii.
- Containment claims of the form "region X lies inside region Y" or "region X is split α/β by surface Y".
- Distances between landmarks or between any pair of specified points.
- Angles, solid angles, half-cone-angles for `cone_view` shapes.

### 4.6.2 — What the rule does not cover

The rule does **not** apply to:

- Item placements and anchor positions, which are interpretive by §7.5 and carry `epistemic_status` instead.
- Soft prose claims of the form "most items in this zone tend to X" — these are editorial generalisations, not geometric facts.
- Editorial judgements about which mechanism reading of progression (§6.13) is most apt — that is interpretive, not quantitative.

### 4.6.3 — Format requirements

Numeric claims must be presented in one of three forms:

1. **Analytic.** Show the closed-form expression; cite the section where the geometry was defined. Example: "Zone 3 has volume \(\tfrac{4}{3}\pi(1 - \varphi^{-3}) \approx 3.19995\)."
2. **Provably bounded.** Use a verified inequality. Example: "Zone 2 lies entirely inside the bipyramid; max \(|x|+|y|+|z|/\varphi\) on the shell \(r=\varphi^{-1}\) is \(\varphi^{-1}\sqrt{2+\varphi^{-2}} \approx 0.9539 < 1\) (Lagrange-multiplier argument)."
3. **Measured.** State method + sample size + confidence interval + date. Example: "Zone 3 is split 32.21% inside / 67.79% outside the bipyramid (Monte Carlo, 64,004,920 samples, 95% CI ±0.011 pp, 2026-05-11)."

### 4.6.4 — Removal of stale numbers

When the rule encounters a prior approximation that does not meet §4.6.3 format, the prior approximation **must be removed**, not merely supplemented. The replacement may be analytic, bounded, or measured, but the prior loose figure may not survive in the same document.

Example: the "≈88% of the φ-ball" figure for Zone 4 carried in `Diamond_vNext+1_Roadmap.md` was removed in the vNext+1 → vNext+1.1 patch (2026-05-11) and replaced with the explicit "Zone 4 split, percentages not yet computed" entry in the measured-geometry table.

---

## §4.7 — Epistemic-class triage as governance rule (new)

Every public claim made in the Spec, Roadmap, Summary, Containment Note, zone prose, item descriptions, item-relation provenance, and any external publication associated with the project **must declare its epistemic class** as one of:

- **Derived** — a logical or geometric consequence of earlier definitions. Carries the burden of showing the derivation.
- **Stipulated** — a definitional choice the framework makes by fiat. Carries the burden of saying so explicitly.
- **Borrowed** — a claim imported from an external tradition, text, school, or thinker. Carries the burden of citing the source and noting where the borrowing modifies it.

This rule is the semantic counterpart to the exactness rule (§4.6). The exactness rule governs *numeric* claims; the triage rule governs *semantic* claims. Together they form a two-pronged editorial discipline.

### 4.7.1 — Why this is a rule, not a recommendation

The council review of 2026-05-12 (Claude Opus 4.7) identified the derived/stipulated/borrowed triage as "the spec's strongest rigor move" and recommended elevating it to a formal governance gate. The reasoning: a framework that distinguishes its own categories of claim is much harder to misread as deductive metaphysics. The biggest reception risk for the Diamond, per all three council models, is that the framework be read as a *discovered ontology* rather than as the *diagrammatic phenomenology* its prose explicitly identifies it as. The triage rule is the editorial mechanism that keeps that distinction visible to readers.

### 4.7.2 — Format requirements

A claim's epistemic class can be declared:

- **Inline** — with a parenthetical tag, e.g., "BEING sits at the origin (stipulated)."
- **Section-level** — with a header note covering all claims in the section, e.g., "All claims in this section are stipulated unless otherwise noted."
- **By the item's `epistemic_status` column** — for items inserted into the schema (migration 0009), the column already exists and is enum-typed. Use it.

At least one of these three mechanisms must be in force for every claim. Untagged claims are editorial drift.

### 4.7.3 — Migration of existing prose

Pre-vNext+2 prose (in vNext, vNext+1 documents, in the v3.1 site at diamond.thoughtfree.com) is **not** retroactively re-tagged in bulk. Instead, each piece of prose acquires triage tags the next time it is revised, in line with the broader vNext+2 posture of consolidation-over-throughput. The Tier 1–5 changelist work for the v3.1 site is a natural occasion for triage tagging — each tier should add the missing tags as part of its scope.

### 4.7.4 — What the rule does not prohibit

The rule does not prohibit stipulation. Stipulation is one of the three legitimate epistemic classes. The Diamond contains many stipulations (the φ-cascade, the orientation of the Z-axis, the BEING-at-origin convention) and these are not failures of rigor — they are declared design choices. The rule prohibits *silent* stipulation: stipulation presented as if derived.

---

## §6.7 — The time axis as nested horizons (revised)

### 6.7.1 — What is being revised

vNext+1 §6.7 carried the time axis as "the only semantically symmetric axis," with personal Past and Future as deictic poles. vNext+1 §6.13 held five mechanism readings of progression open for the affect and depth axes but left the time axis's relationship to "progression" underspecified. The council review of 2026-05-12 (unanimous across Claude Opus 4.7, GPT-5.5, and Gemini 3.1 Pro) flagged this as the framework's most urgent gap.

vNext+2 §6.7 (this section) closes the gap with a **nested-horizon formulation**: phenomenological Past/Future at the inner zones; cosmological horizons at Shell 5. The two are not identified, they are nested.

### 6.7.2 — The two-layer time axis

| Zone | Pastward pole | Futureward pole | Register |
|---|---|---|---|
| Zone 1 | Memory | Anticipation | personal / phenomenological |
| Zone 2 | History / ancestry | Projection / possibility | biographical-cultural |
| Zone 3 | Deep past / origin myth | Deep future / destiny | civilisational / cosmic imagination |
| Shell 5 (outer horizon) | Big Bang / initial low-entropy boundary | Heat death / Big Rip / Big Crunch / CCC — *which* cosmological terminus is not specified | cosmological limit |

The inner three rows are **phenomenological** time — time as a subject inhabits it. The outer row is **cosmological** time — time as it bounds any subject's possible temporal experience. The two registers are connected by the nesting relationship: personal birth and death are local instances of the outer horizons, sitting on Shell 5 (the φ²-shell, NULL-zoned) alongside the cosmological instances.

The Shell 5 placement is structurally consistent: Birth and Death are already NULL-zoned in vNext+1 (Shell 5 lies outside the four-zone structure), and the cosmological horizons inherit that NULL status by the same reasoning — they are horizons bounding the system, not positions within it.

### 6.7.3 — What scales along the time axis

The verb "intensify" is retired for the time axis. Time does not become "more time-ish" with radius. What scales along the time axis, in the order in which the gradient is felt:

- Temporal depth (cosmological age, biographical reach)
- Entropy gradient (low near the pastward pole, high near the futureward pole — Eddington/Boltzmann arrow)
- Irreversibility of thermodynamic processes
- Structure-formation history (inflation → nucleosynthesis → galaxies → stars → biology → ???)
- Horizon distance / causal reach

This is a *directional unfolding*, not an intensification. Better verbs for the time axis specifically: **unfolds**, **dilates**, **deepens**. Acceptable alternatives in context: **develops**, **extends**. Prohibited verbs for the time axis: **intensifies**, **progresses** (the latter for its teleological connotation; the Teilhard/Omega-point trap is already flagged in vNext+1 §10 risk register).

### 6.7.4 — Cosmological commitments

vNext+2 §6.7 does **not** commit to any specific cosmological model for the futureward horizon. ΛCDM with heat death is currently favoured empirically and is past-future *asymmetric*; Big Rip, Big Crunch, and Penrose's Conformal Cyclic Cosmology are minority readings that preserve different forms of symmetry. The Diamond's only commitment is the structural one: **the time axis is bounded by horizons it cannot cross**, regardless of which physical model best describes the futureward horizon.

This posture is consistent with the framework's general stance: stipulate the structure; leave the empirical particulars to the disciplines that own them.

### 6.7.5 — Risks introduced by the cosmological overlay

The nested-horizon formulation introduces five risks, which it must hold under tension:

1. **Category confusion.** Inner experience and cosmological time are different explananda. Risk: collapsing them. Mitigation: the nesting relation is *containment*, not *identification* — personal birth/death sit inside cosmological horizons, they are not the same as them.
2. **Single-subject tension with §4.5.** Each Diamond centres on one subject, but the Big Bang is a shared past for all subjects. Mitigation: the cosmological reading is an **overlay** on each per-subject Diamond, not a shared structural commitment. Each Diamond has its *own* projection onto the cosmological horizons; the projections are co-referential (they refer to the same physical Big Bang) but the *structural placement* on Shell 5 is per-subject.
3. **Asymmetry.** ΛCDM is past-future asymmetric. Mitigation: see §6.7.4 above — vNext+2 does not commit to a specific cosmology; the structural claim is symmetric (horizons exist at both ends) even if the physical instances are asymmetric.
4. **Second-law directionality.** If past→future is an entropy gradient, the y-axis is no longer semantically neutral. Mitigation: accept this consequence and revise the vNext+1 claim that the time axis is the "only semantically symmetric axis" — it is no longer. The time axis has *structural* symmetry (two horizons) but *directional* asymmetry (entropy gradient). This is documented in §6.7.6 below.
5. **Transpersonal scope creep.** "Experiencing the Big Bang" pushes the framework toward transpersonal/cosmic-mysticism registers. Mitigation: the Big Bang here is a **conceptual horizon**, not an accessible memory state. Unless the project explicitly embraces transpersonal scope (it does not, per vNext+1 §4.5), the cosmological reading is marked as an overlay layer, not a claim about what subjects can experience.

### 6.7.6 — Revision to the "time is the only symmetric axis" claim

vNext+1 §6.7 stated that the time axis is the only one of the three axes that does not develop radially. This claim is **rescinded** in vNext+2. The time axis *does* develop radially — outward toward horizons — but the gradient is *directional* (entropy / causal reach / depth), not *intensive* (more-affect-ness, more-depth-ness). The new statement: **the time axis is the only one of the three axes whose radial development is gradient-directional rather than gradient-intensive.**

This preserves the asymmetry-of-character between time and the other two axes (the asymmetry was real and the council was right to flag it) without leaving time "bare."

---

## §6.22 — The bipyramid (revised)

### 6.22.1 — Canonical description (convex hull)

The bipyramid is **the convex hull of the six landmark coordinates**:

\[
B \;=\; \operatorname{conv}\{\, \text{Heaven},\, \text{Hell},\, \text{Past},\, \text{Future},\, \text{Awakening},\, \text{Obliteration} \,\}
\]

where in the canonical coordinates of the Diamond,

\[
\begin{aligned}
\text{Heaven} &= (1,0,0),\quad \text{Hell} = (-1,0,0),\\
\text{Future} &= (0,1,0),\quad \text{Past} = (0,-1,0),\\
\text{Obliteration} &= (0,0,\varphi),\quad \text{Awakening} = (0,0,-\varphi).
\end{aligned}
\]

This is the **primary description of the bipyramid in prose**.

### 6.22.2 — Computational form (L¹ inequality)

The convex hull described in §6.22.1 is **identically** the closed region

\[
B \;=\; \big\{\, (x,y,z) \in \mathbb{R}^{3} \;\big|\; |x| + |y| + \tfrac{|z|}{\varphi} \,\le\, 1 \,\big\}.
\]

This L¹-with-anisotropic-scaling inequality is the **computational form**: it is what code, queries, and analytic derivations use. It is mathematically equivalent to §6.22.1 — the same set, two descriptions.

### 6.22.3 — Why two forms

The two forms serve different purposes.

- **The convex-hull form** answers *what the bipyramid is*: a minimal convex region picking out the six named landmarks, and nothing else of equal structural status.
- **The L¹ form** answers *how to test membership*: given a point, sum the absolute values of its coordinates (with z scaled by \(1/\varphi\)) and compare to 1.

The convex-hull form makes the **deformation properties** obvious: if any one landmark moved, the bipyramid would deform to track it (the convex hull is determined by its vertices). The L¹ form makes the **scaling properties** obvious: the bipyramid is a φ-stretched octahedron.

### 6.22.4 — Structural status

The bipyramid is a **landmark surface**, not a zone-defining surface. It is an *inhabitant* of the zone structure (which is shell-defined), not a *container* for sub-regions of zones.

Whether to promote the bipyramid to container status — by adding "interior to bipyramid" and "exterior to bipyramid" as zone-defining qualifiers — is the **R1 question**, deferred for further research and informed by the measured-geometry table in §6.23 below.

The current vNext+2 commitment: the bipyramid stays a landmark. Any change to that status requires its own iteration (vNext+3 or later) and its own migration.

### 6.22.5 — Verified containment facts

From §6.23 (the measured-geometry table):

- The bipyramid contains all of Zone 1 (analytically).
- The bipyramid contains all of Zone 2 (analytically).
- The bipyramid intersects Zone 3 transversally; 32.21% of Zone 3 lies inside, 67.79% outside (measured).
- The bipyramid intersects Zone 4 transversally; volumetric split not yet computed (open).

The bipyramid touches the unit sphere (Shell 3) at exactly four points: the equatorial landmarks Heaven, Hell, Past, Future. It touches the φ-shell (Shell 4) at exactly two points: the polar landmarks Awakening, Obliteration. Everywhere else on Shell 3 and Shell 4, the bipyramid surface lies strictly interior.

---

## §6.23 — Measured-geometry table for the four zones (new)

The four zones are defined in §6.1 as spherical shells of the Diamond:

| Zone | Definition | Inner radius | Outer radius |
|---|---|---|---|
| Z1 | innermost ball | 0 | \(\varphi^{-2}\) |
| Z2 | shell | \(\varphi^{-2}\) | \(\varphi^{-1}\) |
| Z3 | shell | \(\varphi^{-1}\) | \(1\) |
| Z4 | shell | \(1\) | \(\varphi\) |

For each zone, the bipyramid \(B\) (§6.22) partitions the zone into an *inside-B* part and an *outside-B* part. The volumetric split, certified at the level the §4.6 exactness rule requires:

| Zone | Volume (analytic) | Inside B | Outside B | Method, date |
|---|---|---|---|---|
| Z1 | \(\tfrac{4}{3}\pi\varphi^{-6} \approx 0.2270\) | 100% | 0% | Analytic (Lagrange on max \(|x|+|y|+|z|/\varphi\) on shell of radius \(\varphi^{-2}\); maximum \(\approx 0.5895 < 1\)). |
| Z2 | \(\tfrac{4}{3}\pi(\varphi^{-3} - \varphi^{-6}) \approx 0.7616\) | 100% | 0% | Analytic (Lagrange on max \(|x|+|y|+|z|/\varphi\) on shell of radius \(\varphi^{-1}\); maximum \(\approx 0.9539 < 1\)). |
| Z3 | \(\tfrac{4}{3}\pi(1 - \varphi^{-3}) \approx 3.19995\) | **32.21%** | **67.79%** | Measured: Monte Carlo, 64,004,920 samples drawn uniformly in the Z3 shell, 95% CI ±0.011 pp; cross-checked against a 400³ uniform grid integration which returned 32.21% / 67.79% to the same precision. 2026-05-11. |
| Z4 | \(\tfrac{4}{3}\pi(\varphi^3 - 1) \approx 13.65\) | open | open | Not yet computed. Tracked as deliverable in `Diamond_vNext+2_Roadmap.md` R1.1. |

### 6.23.1 — Geometric reading

The table records a striking pattern: containment-by-the-bipyramid is **complete** in the inner two zones and **partial** in the outer two. The transition happens at Shell 3 (where the equatorial landmarks sit on the bipyramid). The bipyramid is, in a precise sense, the structure that *just contains* the inner Diamond.

This is independent geometric evidence that the bipyramid is doing structural work even in its current inhabitant-only role: it defines the boundary between the always-contained inner zones and the partially-contained outer zones.

### 6.23.2 — Implication for R1

The R1 question — whether to promote the bipyramid to container status — now has measured grounding for Zones 1, 2, 3. The Zone 4 split is the remaining piece of evidence needed before R1 can be debated quantitatively. Until that figure is in hand, R1 remains an open question with one row of the table missing.

---

## §6.24 — Sub-zone labels: tags, states, and hybrids (new)

### 6.24.1 — The problem this section addresses

The Diamond's 26 sub-zones per shell carry compound labels (e.g., "Love + Future + Meditation," "Hate + Past + Excitement"). The council review of 2026-05-12 (GPT-5.5 Thinking) identified the compositional naming as the framework's largest semantic coherence risk: a label like "Love + Future + Meditation" can be read either as **a unitary phenomenological state** (an experience type one might be in) or as **a coordinate tag** (an address for items anchored at that position). The two readings entail different burdens and have different consequences.

vNext+2 adopts a **mixed reading**: not all labels do the same kind of work. Some labels are best read as tags (coordinate addresses with no claim of phenomenological unity); some as states (claims of recognisable kinds of experience); some as hybrids (carrying both). The spec must be explicit about which.

This section is the framework that lets that explicitness happen. Per-label classification is downstream work, captured in zone prose and (eventually) in a sub-zones reference table; this section only establishes the categories and the criteria.

### 6.24.2 — Three classes for sub-zone labels

**Class T — Tag (coordinate-only).** The label is a bookkeeping address. It denotes "the sub-zone where the affect axis is X, the time axis is Y, and the depth axis is Z." It claims nothing about whether the conjunction is itself a recognisable kind of experience. Example: a sub-zone in Z4 labeled "Hate + Future + Acceleration" is a tag if its only role is to anchor items whose tradition or content lives in that octant of the outer Diamond — the label is an address, not a state-name.

*Burden of proof for Class T:* the three component axes must each be defended. The compound label needs no defence beyond the axes.

*Schema fit:* perfect. Migration 0009's `items.anchor_sub_zone_slug` references `sub_zones(slug)`; the slug is by construction a coordinate string.

**Class S — State (phenomenological kind).** The label names a unitary experience type the framework claims is recognisable as such. Example: a sub-zone in Z3 labeled "Awakening" (on the BEING–Birth axis, polar) is a state — it names a recognisable kind of contemplative experience documented across multiple traditions. The label does work that the component coordinates alone do not do.

*Burden of proof for Class S:* the label must be defended as a kind, with cited sources or argued phenomenological warrant. The triage rule (§4.7) applies: state-labels are typically borrowed (from a tradition that recognises the kind) or stipulated (where the framework introduces a new term for a recognised phenomenon).

*Schema fit:* labels that need to do state-work have two routes — (1) the slug carries the label and the prose carries the warrant; (2) state-labels become individual `items` of kind `concept`, anchored at the relevant coordinate, with their own provenance and epistemic_status. Route (2) is cleaner and is what the schema is built for.

**Class H — Hybrid.** The label functions as a tag *for placement* and as a state-name *for content*. Example: a Shell 3 equatorial landmark like "Heaven" is a coordinate tag (it picks out the point \((1,0,0)\)) *and* a state-name (it names a recognisable theological/phenomenological pole). Many of the existing Diamond labels are hybrids in practice — they emerged from naming the coordinates after the experiences expected to anchor there.

*Burden of proof for Class H:* both burdens, separated. The coordinate role is defended by the axes; the state-name role is defended by the same standards as Class S.

*Schema fit:* in the schema, Class H labels live as `items` of kind `concept` (the state-name role) *and* are referenced by name in `sub_zones.label` or `coordinates.label` (the coordinate role). Concretely, "Heaven" can appear as the `label` of coordinate \((1,0,0)\) and *also* as an item of kind `concept` anchored at that coordinate, with the item carrying provenance and the coordinate carrying the bookkeeping address.

### 6.24.3 — Mixed-reading thesis

The vNext+2 commitment is that the Diamond's 26-per-shell sub-zone naming is **predominantly Class T** with **a small set of Class H landmarks** scattered through it (the six bipyramid landmarks Heaven, Hell, Past, Future, Awakening, Obliteration; the BEING aperture; the named meditative gradations on the z-axis; possibly a few axial-plane subzones). Anything outside that small Class-H set defaults to Class T unless it argues for Class S explicitly.

This is the mixed reading: most labels are tags, a few labels are hybrids, very few (possibly none) are pure states. The framework neither commits to full compositionality nor abandons the labels it has accumulated; it sorts them.

### 6.24.4 — What this dissolves and what it leaves open

*Dissolves:* the compositionality risk. Class T labels carry no compositionality claim, so "Love + Future + Meditation" does not need to be defended as a unitary blend. The components are defended; the conjunction is just an address.

*Leaves open:* which specific labels go in which class. Per-label classification is downstream work, tracked as a Roadmap deliverable (see `Diamond_vNext+2_Roadmap.md` I.5). The current best estimate: roughly 6–20 labels in Class H (the landmark names and meditative gradations); the rest in Class T; Class S left empty by default until an argued case is made.

### 6.24.5 — Relation to the schema (already aligned)

The `items` table already encodes the relevant distinction. A Class T label exists only as a `sub_zones.slug` (a coordinate-string in the schema). A Class S or H label exists as an `items` row of kind `concept`, with `anchor_sub_zone_slug` or `anchor_coordinate_slug` set, and its own `epistemic_status`, `tradition`, and `provenance`. The framework's data model has been silently committed to this distinction since migration 0009; vNext+2 §6.24 is the prose catch-up.

### 6.24.6 — Editorial discipline that follows

- New compound sub-zone labels default to Class T. Authors who want to claim Class S or H bear the burden of saying so and providing the warrant.
- Existing labels carrying both functions (Heaven, Hell, Past, Future, BEING, Awakening, Obliteration, etc.) are explicitly tagged Class H going forward.
- The Class S category exists in the framework but is empty by default. Promoting a label into Class S requires a dedicated argument and triggers §4.7 (epistemic-class triage) — the promotion itself is a stipulation or a borrowing and must be tagged.

---

## §6.25 — Historical lineage of spatial representation (new)

*§4.7 status: all four traditions surveyed here are tagged **borrowed**. They inform the Diamond's UX vocabulary and provide epistemic precedent for the camera regime described in the Containment Note Appendix A; they do not, in themselves, license any Diamond-specific claim. Claims that the Diamond makes about its own perspective behaviour that go beyond what these traditions support — most notably the cone-width-as-attention mapping (Containment Note §A.3.2) — are tagged separately as **stipulations**.*

The Diamond's two-perspective camera regime (3rd-person orbital around BEING-as-locus; 1st-person cone through BEING-as-aperture; Shell-1 threshold; cf. Containment Note §A.3) does not appear out of nowhere. It draws on four well-documented historical traditions of spatial representation, each of which solved a different sub-problem. The Diamond inherits the relevant conventions from each and acknowledges the lineage here so that the framework's own *additions* to the lineage (the stipulations) are visible against the background of the *borrowings*.

### 6.25.1 — Western linear perspective (15th c. onward)

**Origin.** [Filippo Brunelleschi's c. 1413 demonstration](https://en.wikipedia.org/wiki/Linear_perspective) in front of the Florence Baptistery established the projective construction of a scene onto a picture plane from a single, fixed viewpoint. [Leon Battista Alberti's *De pictura* (1435)](https://en.wikipedia.org/wiki/De_pictura) codified the method.

**Operational features.**
- A single station-point (the viewer's eye) outside the depicted scene.
- A picture plane between viewer and scene; objects project onto it via straight rays.
- Parallel lines in the scene converge to vanishing points on the picture plane.
- The scene is mathematically continuous; relative size encodes relative distance.

**What the Diamond inherits from this tradition (borrowed).** The 3rd-person orbital mode is, structurally, a linear-perspective view: the user is *outside* the Diamond, sees it as a structured object with BEING at screen-centre, and the rendered geometry preserves projective relations. The mode is consistent with the framework's §4.4 commitment to diagrammatic phenomenology — the Diamond is a *diagram* the user encounters before they can inhabit it.

**What the Diamond does not inherit.** Linear perspective assumes the viewer is *separate from* the depicted scene. The Diamond's full UX (with Shell-1 transition) refuses this separation past a threshold. Linear perspective alone cannot represent the 1st-person cone-mode.

### 6.25.2 — Chinese *San Yuan* / three-distances (11th c.)

**Origin.** [Guo Xi's *Lofty Messages of Streams and Mountains* (c. 1080)](https://en.wikipedia.org/wiki/Guo_Xi) formalised the three-distances (三遠 *san yuan*) doctrine in Northern Song landscape painting. The three are:

- **高遠 *gao yuan* (high distance)** — looking *up* at mountains from the valley floor. Verticality is foregrounded; the viewer is small and the world towers.
- **深遠 *shen yuan* (deep distance)** — looking *into* mountains from a foreground position. Recession is foregrounded; the viewer reads layers receding into mist.
- **平遠 *ping yuan* (level distance)** — looking *across* at distant mountains from a level vantage. Horizontality is foregrounded; the viewer is composed in a wide horizontal scan.

**Operational features.**
- Three *kinds of looking* rather than three views of the same scene. The painter chooses a kind of looking and composes accordingly.
- The viewer is implicitly *inside* the landscape (somewhere in the foreground), not outside it on a picture plane. The scene unfolds around them.
- Multiple kinds of looking can coexist within a single scroll (scattered perspective; see [Hung Wei's analysis](https://www.metmuseum.org/toah/hd/scro/hd_scro.htm) of Song handscrolls). This breaks linear-perspective's single station-point.

**What the Diamond inherits from this tradition (borrowed).** The 1st-person cone-mode is, structurally, a *San Yuan*-style view: the viewer is *inside* the Diamond, BEING is the aperture they look *through*, and what the viewer sees depends on a *kind of looking* (orientation of the cone, depth behind the aperture). The Diamond's Containment Note §A.3.2 supplement adopts the *San Yuan* vocabulary as Class H tags for **kinds of looking in cone-mode**, deferred to UX implementation.

**What the Diamond does not inherit.** *San Yuan* is a doctrine about *what kinds of looking are available to the painter and viewer*; it makes no claim that the kind of looking *changes the viewer's quality of attention*. The Diamond's cone-width-as-attention mapping (Containment Note §A.3.2, *stipulation*) goes beyond what *San Yuan* asserts, and is tagged accordingly.

### 6.25.3 — Egyptian aspective representation (3rd millennium BCE onward)

**Origin.** [Egyptian art's so-called "aspective" mode](https://en.wikipedia.org/wiki/Ancient_Egyptian_art#Style) (term: [Heinrich Schäfer, *Principles of Egyptian Art*, 1919](https://archive.org/details/principlesofegyp0000scha)) shows each part of a figure or scene from the angle that best displays *what kind of thing it is*: head in profile, eye frontal, torso frontal, legs in profile. The figure is constructed as an inventory of recognisable parts, not as a single projective view.

**Operational features.**
- No fixed station-point. Each part is seen from its most-recognisable angle.
- The composition is *epistemic* (each part labelled by its canonical view), not *optical* (what a viewer in space would see).
- Conventional, not perceptual. The aspective image is a *claim about what the depicted thing is*, not a record of what a witness saw.

**What the Diamond inherits from this tradition (borrowed).** The Spec's §4.7 distinction between *what the framework is structurally* and *what a particular reading depicts* mirrors the aspective ↔ perspective epistemic distinction. The bipyramid (§6.22) is, in this sense, an aspective object — it shows the six landmarks at their canonical positions, the three axes at their canonical orientations. It is a *claim about what the Diamond is*, not a record of a witnessed view. The 3rd-person orbital mode renders the same aspective object *perspectivally*, and the cone-mode lets the inhabitant *see from inside*.

**What the Diamond does not inherit.** Egyptian aspective art is flat (no projective depth). The Diamond renders aspective content into a perspectival space — the bipyramid is an aspective claim *embedded in* a 3D Euclidean scene the user can navigate. This is a Diamond-specific synthesis, not an Egyptian borrowing.

### 6.25.4 — Paleolithic cartography (Abauntz block, ~13,660 BP)

**Origin.** The [Abauntz Cave engraved block](https://www.cambridge.org/core/journals/antiquity/article/around-the-rocks-of-abauntz-a-late-magdalenian-engraved-stone-block-from-the-cave-of-abauntz-navarra-spain/) (Late Magdalenian, ~13,660 BP, Navarra, Spain; Utrilla et al., *Antiquity*, 2009) is the earliest known map: a stone block on which mountains, rivers, fords, and animal trails have been engraved as a survey of the surrounding landscape. The map predates writing by ~8,000 years and predates the agricultural revolution.

**Operational features.**
- The map is *external* to the territory it represents. The maker and viewer stand outside the landscape and see it as a structured whole.
- The map records *what is at what relative position*, including hidden features (paths through valleys, river fords). It is operational — it tells you how to move through the territory.
- It is the externalisation of spatial reasoning into a durable artefact ([Miyagawa et al., MIT, 2018](https://news.mit.edu/2018/cave-art-cognitive-leap-language-mathematics-0221) argue cave art of this kind functioned as cognitive-training infrastructure that scaffolded the cognitive leap producing symbolic language and mathematics; cf. Containment Note §A.9).

**What the Diamond inherits from this tradition (borrowed).** The Containment Note's framing of *container-vs-inhabitant* draws on the Abauntz precedent (Containment Note §2.4). The Diamond is both an *external* map (the bipyramid as object) and an *inhabitable* territory (cone-mode from inside Z1). The 13,660-year-old precedent for representations functioning as both *survey* and *operational guide* gives epistemic warrant to the Diamond's two-mode UX without licensing any specific stipulation.

**What the Diamond does not inherit.** The Abauntz map records a real territory the maker walked through. The Diamond's territory is the structure of human experience as the framework posits it; the territory itself is a Diamond-specific stipulation (Spec §6.22, §6.7), not a borrowing from cartography.

### 6.25.5 — Synthesis: where the Diamond stands in this lineage

The Diamond's UX is not one of these four traditions; it is a *composition* of borrowings from all four, with one stipulation added.

| Tradition | What the Diamond borrows | Where it appears in the UX |
|---|---|---|
| Western linear (Brunelleschi, Alberti) | Single station-point view of a structured object from outside | 3rd-person orbital mode (Containment Note §A.3.1) |
| Chinese *San Yuan* (Guo Xi) | Viewer-inside-scene; *kinds of looking* as a vocabulary | 1st-person cone-mode (Containment Note §A.3.2); three-distances vocabulary tagged as Class H for UX (Containment Note §A.3.2 supplement) |
| Egyptian aspective (Schäfer) | Epistemic-canonical representation distinct from perspectival depiction | The bipyramid (§6.22) as aspective claim; §4.7's structural ↔ reading distinction |
| Paleolithic cartography (Abauntz) | Representation as *both* external survey *and* operational territory; representation-as-cognitive-training | The container/inhabitant duality (Containment Note §2.4, §A.9) |
| **(Diamond-specific stipulation, no precedent)** | **Depth-behind-aperture maps to width of cone, and cone-width maps to quality of attention** | **Cone-width-as-attention (Containment Note §A.3.2)** |

The table is the discipline. Anything in the left column except the last row is a borrowing and carries the warrant of the cited tradition. The last row is a stipulation and carries no external warrant — its license comes only from §4.7 and its work is internal to the framework.

### 6.25.6 — Editorial discipline that follows

- Any future Diamond UX or document that depicts the camera regime must reference §6.25 to make the borrowings legible.
- Any extension of the camera regime that goes beyond what §6.25's borrowings support is, by default, a §4.7 stipulation and must be tagged as such.
- The *San Yuan* vocabulary (Containment Note §A.3.2 supplement) is deferred to UX implementation. The framework adopts the three-distances as Class H labels *for kinds of looking in cone-mode* (consistent with Guo Xi's tradition) but **does not** commit to whether the Diamond's cone-mode kinds-of-looking correspond *1-to-1* with *gao yuan / shen yuan / ping yuan*. That alignment is an open UX question and will be revisited at the Three.js prototype stage.
- Color in spatial representation is *not* surveyed in this section. The perspective-and-cartography research surfaced a gap in how the Diamond handles color; Roadmap I.9 (forthcoming) will treat color systematically.

---

## §10 — Hypothesis register (updated)

vNext+1 carried hypotheses H1–H4. vNext+2 carries H4 forward unchanged, reframes H5–H7 under the containment frame, adds H8–H10 from the containment work, and adds H11–H13 from the model-council integration.

| # | Hypothesis | Status | Where |
|---|---|---|---|
| H1 | … *(carried from vNext+1, unchanged)* | open | vNext+1 §10 |
| H2 | … *(carried from vNext+1, unchanged)* | open | vNext+1 §10 |
| H3 | … *(carried from vNext+1, unchanged)* | open | vNext+1 §10 |
| H4 | Radial progression has a unified mechanism (one of: intensification, transformation, development, thresholding, or no unified mechanism) | open; five readings held in suspension | vNext+1 §6.13 |
| H5 | The bipyramid should be promoted to a zone-defining surface, partitioning Zone 3 and Zone 4 into interior/interstitial sub-zones | **reframed under containment**; see Containment Note §2.1 and R1 | vNext+2 R1 |
| H6 | M3 is a containing structure for multiple per-subject Diamonds | **reframed under containment**; see Containment Note §2.2 and R2 | vNext+2 R2 |
| H7 | Subjects move through their Diamonds over time; positions are not static | **reframed under containment**; see Containment Note §2.3 and R3 | vNext+2 R3 |
| **H8** | The bipyramid is identically the convex hull of the six landmark coordinates | **CLOSED as theorem** | vNext+2 §6.22 |
| **H9** | Zones 1 and 2 lie 100% inside the bipyramid | **CLOSED as theorem** | vNext+2 §6.23 |
| **H10** | Every geometric quantity in vNext+2+ documents is either analytic, bounded, or dated-measured with declared precision | **ADOPTED as rule (§4.6)** | vNext+2 §4.6 |
| **H11** | Every substantive claim in the framework is tagged by epistemic class — derived, stipulated, or borrowed — and silent stipulation is prohibited | **ADOPTED as governance rule (§4.7)** | vNext+2 §4.7 |
| **H12** | Sub-zone and landmark labels admit a mixed reading: Class T (tags/coordinates) is the default, Class H (hybrid) covers the six landmarks plus BEING and similar inherited terms, and Class S (phenomenological states) is empty by default and promotion requires a dedicated §4.7-tagged warrant | **ADOPTED as mixed-reading thesis (§6.24)** | vNext+2 §6.24 |
| **H13** | The time axis is bounded by nested horizons: phenomenological Past/Future at inner zones, biographical-cultural at Z2, civilisational/cosmic at Z3, and cosmological (Big Bang past pole / heat-death–Big-Rip–CCC future pole) as an *overlay* at Shell 5 — the cosmological reading is identification-by-overlay, not identification-by-equation | **ADOPTED as structural commitment (§6.7)** | vNext+2 §6.7 |

H8 and H9 are no longer "hypotheses" in the falsifiable sense — they have proofs. H10, H11, H12, and H13 are rules and commitments adopted at this iteration rather than open conjectures. They are all kept in the register so the register tells a complete story of what each iteration produced and which moves were elevated from conjecture to governance.

**Provenance note.** H11, H12, and H13 enter the register as the framework's response to the vNext+1 model-council review (Diamond_vNext_Model_Council_Review_Thread_Export_2026-05-12). H11 formalises the rigour move identified by Claude Opus 4.7 Thinking; H12 answers the compositionality concern raised by GPT-5.5 Thinking with a mixed-reading rather than a wholesale reframe; H13 closes the time-axis gap flagged unanimously by all three reviewers.

---

## Editorial note — what this Spec does not change

Reaffirming, for clarity:

- The scope guards (§4.5) — per-subject scope, static positions — are **unchanged**. R3 explores their relaxation; vNext+2 does not relax them.
- The progression reframe (§4 note, §6.13) — **unchanged**. The five mechanism readings continue to be held in suspension.
- Schema migration 0009 — **unchanged**. No migration 0010 is proposed in vNext+2.
- The items / relations taxonomy (§7) — **unchanged**. The data model is stable.
- The zone definitions (§6.1) — **unchanged**. Zones remain shell-defined.
- The §8.1 τ-deformation status (auxiliary apparatus only) — **unchanged**.

---

*End of Specification.*
