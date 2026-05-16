# Vegar's Diamond — Containment Note v2.0 (draft)

> **Status:** In formation — v2.0-draft, as of 2026-05-12. Standalone reframe document. Authoritative for the framing of the three reserved research threads R1, R2, R3, and (per Appendix) for the canonical UX camera regime.
>
> **Filename convention:** see `Diamond_Versioning_Convention_v1.0.md`. New in v2.0 (no v1.0 predecessor).
>
> **Reading order:** This note sits *under* `Diamond_Summary_v2.0-draft.md` and *above* the threads themselves. Read it after the Summary, before consulting any individual R1/R2/R3 section in the Roadmap.

---

## 1. The framing observation

In vNext+1 the three reserved research threads were enumerated as three separate appendices:

- **R1** — interstitial geometry and zone partition revision (does the bipyramid promote to a zone-defining surface?)
- **R2** — M3 containing structure for multiple Diamonds (what holds a community of subjects?)
- **R3** — M2 dynamic positions and animated trajectories (what holds a subject moving through time?)

Read in isolation, each looks like a different problem. Read together, they share a single underlying form. **All three are containment questions**, asked at three different scales:

| Thread | Scale | Question (one sentence each) |
|---|---|---|
| R1 | Within one Diamond | Is the bipyramid a *container* (a zoning surface that partitions interior from exterior) or an *inhabitant* (a structural landmark surface that lives inside the existing zones)? |
| R2 | Across Diamonds | What structure *contains* a community of per-subject Diamonds such that shapes seen differently from different vantage points are recognisably the same shape? |
| R3 | Across time within one Diamond | What structure *contains* a single Diamond as the subject moves, so that positions at \( t_1 \) and \( t_2 \) are recognisably the same subject's positions? |

The three threads are **not coincidentally related**. They are three faces of the same problem: *what is the model containing and what is contained by the model?* This note records that observation and uses it to structure how the threads should be approached.

## 2. The pattern: container–inhabitant ambiguity

Each thread, at its own scale, contains a structural object whose status as container or inhabitant is undecided.

### 2.1 R1's ambiguous object: the bipyramid

The anisotropic bipyramid \(|x|+|y|+|z|/\varphi \le 1\) currently has the structural role of a **landmark surface**: it passes through the six named landmark coordinates (Heaven, Hell, Past, Future on Shell 3; Awakening, Obliteration on Shell 4) and serves as a visual cue, but it is not a zone boundary. Migrations 0007 and 0008 define zones from shells, not from the bipyramid. So the bipyramid is currently an **inhabitant** of the zone structure, not a **container** for sub-regions of zones.

The R1 question is whether to *promote* it to container status — to let it partition Zone 3 into "axial-octant Zone 3" and "interstitial Zone 3", and similarly for Zone 4. Tonight's measurement (32.21% / 67.79%) showed that this is not a trivial partition: roughly two-thirds of Zone 3 lives in the interstitial pockets.

### 2.2 R2's ambiguous object: the M3 super-structure

Spec vNext+1 §6.21 introduces M3 as a hypothesised structure containing many per-subject Diamonds. M3 is currently described as "a containing structure" — but the **nature** of the containment is left open. Is M3 a manifold in which Diamonds float as points? A bundle in which each Diamond is a fibre? A lattice of vantage points that mutually project? Each reading entails different structural commitments.

The R2 question is whether to commit to a specific containment topology for M3 — to decide, in effect, whether M3 is *the* container or whether "M3" names a placeholder for a still-undecided container.

### 2.3 R3's ambiguous object: the time dimension

Spec vNext+1 §4.5 declares that the model uses **static positions** — items live at a single coordinate. The geometry already has a time axis (the z-axis is also one of the three axes named "time" in some readings, distinct from the BEING-vertical in others; this is itself a vNext+2 thread, see §5 of this note), but the model is not yet *temporal* in the dynamic sense. R3 asks how to model a subject who moves through the geometry over time.

Migration 0009 ships an `effective_period` column on `items`. That column is the schema-level affordance for non-static positions, but it does not say what the container of those positions *is*. Is the time-extended Diamond a sequence of static Diamonds? A four-dimensional manifold? A trajectory in a single static Diamond? Each reading entails different rendering and storage commitments.

The R3 question is what structure *contains* a subject's trajectory such that the trajectory has identity.

### 2.4 Historical provenance: the container/inhabitant problem is the oldest problem in spatial representation

*Added v2.0-draft from the perspective-and-cartography research thread (2026-05-12).*

It would be a mistake to read §2.1–§2.3 as if the framework had *discovered* the container/inhabitant ambiguity. It did not. The ambiguity is present in the earliest known maps and is, in that sense, prior to philosophy.

- The **Abauntz Cave stone map** (≈13,660 BP, Navarra, Spain; Utrilla et al., *Journal of Human Evolution* 2009) engraves a landscape's rivers, mountains, and animal distributions onto a rock that is itself part of that landscape. The map is *inhabited by* the territory it depicts.
- The **Çatalhöyük mural** (≈6600 BCE, central Anatolia), sometimes called the world's oldest town map, sits on a wall *inside* the settlement it may depict.
- The **Babylonian Imago Mundi** (≈600 BCE) shows the world as a disc surrounded by ocean while being itself a Babylonian artifact, simultaneously *contained by* and *containing* its subject.
- **Mercator's projection** (1569 CE) makes the inheritance technical: no map projection preserves all properties of the sphere; the choice of projection is therefore *always* an epistemic commitment, never a neutral recording.

The Diamond's contribution is not to introduce this problem. It is to make the problem **explicit and productive** — to refuse to resolve it prematurely on either side. The bipyramid is simultaneously the convex hull of six landmark coordinates (inhabitant, §6.22 H8) and a candidate zone-defining surface (container, R1). The framework holds the ambiguity in suspension as a structural commitment, not as an oversight.

This is a *borrowed* lineage in the §4.7 sense and is declared as such in Spec §6.25. The recognition that the container/inhabitant problem is ≈13,660 years old does not strengthen the framework's geometry. It strengthens the framework's *posture*: a re-encounter with an ancient problem, declared, rather than a freshly-discovered insight.

## 3. The reframe: name the container question explicitly

Rather than three loosely related appendices, vNext+2 treats containment as the **organising question** of the iteration. The three threads become three instances of one question.

This has two practical consequences for how vNext+2 is structured.

**First**, the threads are sequenced. R1 is approached first because it is geometrically the smallest containment question — it lives entirely within one Diamond. R3 is approached second because it extends one Diamond through time while keeping the spatial structure fixed. R2 is approached last because it is the largest containment question — it requires R1 and R3 to be settled before "what contains the Diamonds" has a stable referent.

**Second**, the threads inherit a shared vocabulary. Each thread answers the same four questions in its own register:

| Question | R1 | R3 | R2 |
|---|---|---|---|
| What is the candidate container? | the bipyramid (as a partitioning surface) | a temporal structure over one Diamond | M3 |
| What is the candidate inhabitant? | items in axial vs interstitial regions of zones | items at different `effective_period`s | individual Diamonds |
| What is the test for container–inhabitant status? | does the surface change *zone identity* of items it bisects? | does the temporal structure change *subject identity* across time slices? | does M3 change *Diamond identity* across vantage points? |
| What is the fall-back if the candidate stays an inhabitant? | bipyramid stays a landmark surface, zones stay shell-defined | items keep static positions; trajectories live as relations | each Diamond is independent; M3 is a façon de parler |

This table is the **interpretive grid** for vNext+2. Every R-thread answer should fit one row of it.

## 4. The bipyramid as convex hull (canonical reframe)

A specific consequence of the containment frame, adopted as canonical in vNext+2:

**The bipyramid is the convex hull of the six landmark coordinates.**

That is: the bipyramid \(|x|+|y|+|z|/\varphi \le 1\) is **identically** the smallest convex set containing the six points

- Heaven \((1,0,0)\), Hell \((-1,0,0)\), Past \((0,-1,0)\), Future \((0,1,0)\) — on Shell 3
- Awakening \((0,0,-\varphi)\), Obliteration \((0,0,\varphi)\) — on Shell 4

This is a theorem, not a definition: the L¹ inequality with the anisotropic scaling factor \(1/\varphi\) on z is *exactly* the convex hull of those six points. Both descriptions are correct and pick out the same region. They differ in **what they make available for reading**.

The L¹ inequality makes available: a clean computational form, an obvious analogue to higher dimensions, a connection to taxicab norms.

The convex-hull description makes available: an immediate explanation of what the bipyramid *is for*, why the six landmarks sit on it, why its faces are flat (because they are determined by triples of landmark points), and what would happen if a landmark moved (the bipyramid would deform with it).

In vNext+2 the convex-hull reading is the **canonical** description in prose. The L¹ inequality is retained as the **computational** form. Spec §6.22 will be revised accordingly.

This is not a change to the geometry. It is a change to how the geometry is *described*. The motivation: container–inhabitant ambiguity (§2 of this note) is much easier to discuss when the inhabitant is described in terms of what it *picks out* (the six landmarks) rather than what equation it *satisfies*.

## 5. A house rule that fell out of the work

A small editorial discipline, surfaced during the vNext+1 session and committed here as a vNext+2 rule:

> **Exactness rule.** When a geometric quantity is analytically computable, compute it analytically. When it is not, measure it with declared precision (sampling method + confidence interval) and date the measurement.

The motivation: tonight's session caught two errors of the same shape — approximations accepted in place of available exact values (the Shell 3 / Shell 4 landmark placements; the "≈88% of the φ-ball" figure for Zone 4). The Diamond's geometry is algebraically clean (φ, L¹ planes, spheres), so analytic answers are usually available. Approximations introduced casually become future confusions, especially when they get cited in subsequent prose.

The rule is documented in Spec vNext+2 §4.6 (new). It applies to:

- Volumes, surface areas, and ratios of geometric regions
- Landmark coordinates and shell radii
- Containment claims ("Zone 1 lies entirely inside the bipyramid" is now provable, not approximate)
- Distance calculations between landmarks
- Any number that appears in prose or in spec tables

The rule does **not** apply to:

- Item placements and anchor positions, which are interpretive by §7.5
- Editorial judgements about prose style
- Soft claims of the form "most items in this zone are X"

## 6. What this note is, and is not

This note is **structural**, not metaphysical. It does not claim that "containment" is the fundamental category of the Diamond, or that the three R-threads are reducible to a single problem. It claims only that the three threads share a *form*, and that recognising the shared form helps in approaching them.

Whether containment is *the* organising question of the Diamond — as opposed to, say, intersubjectivity, or temporality, or progression — is itself a vNext+2+1 question (see Roadmap §III.X1). This note does not answer that larger question. It does the smaller job of making the structural parallel visible so that R1, R2, R3 can be approached with shared vocabulary.

---

## Appendix — verified containment table (vNext+1 carryover)

For reference, since the R1 thread leans on it:

| Shell | Radius | Max \(|x|+|y|+|z|/\varphi\) on shell | Status relative to bipyramid |
|---|---|---|---|
| Shell 1 | \(\varphi^{-2} \approx 0.382\) | 0.5895 | Entire shell strictly interior |
| Shell 2 | \(\varphi^{-1} \approx 0.618\) | 0.9539 | Entire shell strictly interior |
| Shell 3 | \(1\) | 1.5434 | Shell crosses the bipyramid surface |
| Shell 4 | \(\varphi \approx 1.618\) | 2.4972 | Shell crosses the bipyramid surface |

Zone 1 and Zone 2 are therefore 100% inside the bipyramid (provable analytically). Zone 3 is split 32.21% / 67.79% (measured, 2026-05-11, MC + grid). Zone 4 is split, percentages not yet computed (open R1 deliverable).

---

## Appendix — User as Inhabitant (UX-as-intervention)

*Added vNext+2 from the model-council review (Gemini 3.1 Pro Thinking finding), refined 2026-05-12 with the user's specification of the camera regime.*

### A.1 — The observation

The Diamond is not only a diagram on a page. It is, increasingly, a navigable artifact: a 3D scene with an aperture at the origin (BEING), shells the user can pass through, landmarks the user can approach. Any such artifact has a user, and any user is positioned. Position is not neutral.

The council review observed that the standard UX gesture for an introspective 3D model — *place the camera at the origin and let the user look outward* — already commits the framework, before any text is read, to a particular reading of selfhood. The user becomes a witness located at BEING, watching phenomenal contents arrange themselves around them. This is a *first-person, witness-centric* reading.

A second gesture is available: place the camera *outside* the diamond and let the user orbit it. The user is now an observer of a structure, not an inhabitant of one. This is a *third-person, structural* reading.

These two readings are not in competition. They are not even alternative modes the user picks between. They are **two regions of a single navigation, separated by a threshold in the framework's own geometry.**

### A.2 — Why this is a containment question, not a UX question

The Containment Note exists because the framework has, throughout its history, been silently teaching things through its geometry that it had not explicitly argued for in text. The bipyramid taught a containment claim before §6.22 made it a theorem. The φ-shells taught a progression claim before §6.13 reframed it.

The camera position teaches a selfhood claim. Under §4.7, no such claim may be made silently. The camera regime below is the framework's declared commitment, taking the form of a single geometric rule rather than a UI toggle.

### A.3 — The camera regime (canonical)

The canonical 3D presentation of the Diamond uses **two perspectives**. Each has its own controls. The transition between them is keyed to Zone 1, and it is the framework's own geometry — not a user toggle — that decides when the perspective changes.

**The role of BEING is different in each perspective, and the regime turns on that difference.** In 3rd-person mode, BEING is a *locus* — a point in the model that the camera looks at. In 1st-person mode, BEING is an *aperture* — an opening that the viewer's perspective passes *through* into the model. These are two roles BEING already plays in the framework (centre and opening), and the camera regime makes the user move between them by moving through space.

#### A.3.1 — 3rd-person mode: orbital camera centred on BEING

**Active when the camera is not completely within Zone 1's bounds** (i.e., the camera's radial position is \(> \varphi^{-2}\), or more precisely the camera or any part of its near-frustum projects outside Z1).

- The camera orbits BEING with **BEING as the fixed focal point on screen**. BEING is always at screen-centre.
- User controls: **angular position** around BEING (rotation on the celestial sphere centred at BEING), and **zoom** (radial distance from BEING).
- **BEING is non-passable in this mode.** The camera can approach BEING arbitrarily closely but cannot cross through it. BEING here behaves as a locus, not an opening.
- Zoom-out has an outer limit at Shell 5 (the cosmological horizon — see §6.7). The user cannot retreat *past* the framework's outermost horizon to view it as a finite object floating in some larger empty space, because the framework's claim is that Shell 5 *is* the outer limit of the imaginable.
- The user sees the diamond as a structure: shells, landmarks, axes, the bipyramid. This is the structural / diagrammatic reading consistent with §4.4 ("diagrammatic phenomenology, not metaphysics").

#### A.3.2 — 1st-person mode: central light-cone *through* the aperture

**Activated when zoom brings the camera completely within Zone 1.** The regime flips. BEING's role changes from locus to **aperture**.

- The viewer (= the apex of the light cone, = the user's eye) is located **behind** BEING. BEING is the **aperture** through which the viewer's perspective passes into the model.
- The visual field is a **cone** whose apex is the viewer, whose axis passes through the aperture (BEING), and whose far side opens *into the model on the other side of BEING from the viewer*.
- The user sees the inner surface of Shell 1, the meridional structure of Z2–Z4, and the landmarks and Shell 5 cosmological horizons at distance — projected outward through the aperture from the viewer's position.
- This is the witness / phenomenological / first-person reading. The framework's apophatic centre is doing real work: BEING is the empty opening through which awareness passes into the model.

**User controls in 1st-person mode:**
- **Orientation of the viewer.** The user rotates the viewer freely. The cone's axis sweeps across different parts of the model through the aperture; different segments of the diamond come into the cone as the viewer turns.
- **Depth behind the aperture (focal depth).** The user moves the viewer toward or away from BEING. **Distance from the aperture determines the shape of the cone.**
  - **Close to the aperture** (small depth behind BEING) → **wide cone**. Most of the model is within the cone simultaneously; the viewer's perspective is diffuse, near-omnidirectional within the forward direction. Approaches but does not reach a panoramic limit. Maps phenomenologically to *open / diffuse awareness*.
  - **Far from the aperture** (large depth behind BEING) → **narrow cone**. The model appears framed and distant, viewed as if through a porthole at the aperture. Maps phenomenologically to *focused / discriminating attention*.
  - The mapping *depth ↔ narrowness* is the framework saying something specific about the phenomenology of attention that it does not say in text anywhere else. The continuous deformation of the cone is itself a doctrinal commitment.
  - **§4.7 tag: *stipulation*.** The cone-width-as-attention mapping (close-to-aperture → wide cone → diffuse awareness; far-from-aperture → narrow cone → focused attention) has *no precedent* in the historical lineage of spatial representation surveyed in Spec §6.25 (Western linear perspective, Chinese *San Yuan*, Egyptian aspective art, Paleolithic cartography). It is the framework's own claim about how distance behind the aperture maps to a quality of attention. Per §4.7, this is therefore a **stipulation** — a generative posit that does the work the framework needs it to do, not a borrowed convention with independent epistemic warrant. It must be labelled as such in any UX or document that depicts the cone-deformation behavior. The historical *kinds of looking* (Class H vocabulary) discussed below in §A.3.2 supplement are *borrowed*; the depth↔width mapping itself is the stipulation.

**What the cone contains, on the model side.** The cone is a viewing frustum, in the sense that everything in the model that lies within the cone's angular range is visible. There is no separate model-side focal-depth control at this iteration; the cone extends through whatever radial distances it covers, up to and including Shell 5. A future UX iteration may introduce a model-side focal depth (depth-of-field) as a second control; this is deferred and tracked as a UX consideration, not as a vNext+2 commitment.

**A.3.2 supplement — Class H vocabulary for *kinds of looking* in cone-mode (§4.7 tag: *borrowed*).** Independent of how *wide* the cone is (the *stipulation* tagged above), cone-mode admits a vocabulary for *what kind of looking* the viewer is doing through the aperture. The framework borrows this vocabulary from Chinese *San Yuan* / three-distances doctrine ([Guo Xi, *Lofty Messages of Streams and Mountains*, c. 1080](https://en.wikipedia.org/wiki/Guo_Xi); see Spec §6.25.2 for full provenance). Three Class H labels are reserved for future UX work:

- **高遠 *gao yuan* — high distance.** Looking *up* through the aperture toward the upper landmarks (Awakening / Obliteration along +Z and −Z). In cone-mode terms: the cone's axis is oriented along the z-axis, the viewer reads the framework's verticality.
- **深遠 *shen yuan* — deep distance.** Looking *into* radial depth through the aperture, layering Z2, Z3, Z4 receding outward from BEING. The viewer reads the framework's radial layering (the work §6.13 / H4 is suspended on).
- **平遠 *ping yuan* — level distance.** Looking *across* the equatorial plane through the aperture toward the horizontal landmarks (Heaven / Hell along ±X; Past / Future along ±Y). The viewer reads the framework's lateral structure.

**Status, in three parts.**

1. **The borrowing.** The vocabulary itself — the recognition that there are different *kinds of looking* available to an inhabitant of a scene, each foregrounding a different structural axis — is borrowed from *San Yuan* and carries that tradition's warrant. The framework adopts the three labels as Class H tags (per Spec §6.24.2).
2. **What is *not* committed.** The framework does **not** commit, at vNext+2, to whether the Diamond's cone-mode kinds-of-looking correspond *1-to-1* with *gao yuan / shen yuan / ping yuan*; to whether all three are available *simultaneously* (scattered-perspective; cf. Roadmap I.8); or to whether the three labels exhaust the kinds-of-looking available in cone-mode (a fourth or fifth may emerge, e.g., a *diagonal* looking through landmark-to-landmark axes).
3. **The deferral.** All resolution of (2) is **tagged for future UX consideration when building the cone-view behavior** — specifically at the Three.js prototype stage, where the phenomenology can be tested rather than asserted. Any UX that adopts the three-distances vocabulary must reference this supplement and Spec §6.25.2; any UX that *extends* the vocabulary beyond *San Yuan*'s warrant must tag the extension as a stipulation per §4.7.

**The vocabulary does *not* replace** the framework's existing radial-mechanism vocabulary (*unfolds / dilates / deepens*; cf. Spec §6.13 and H4 suspension). *Gao yuan*, *shen yuan*, *ping yuan* describe **viewing stance** in cone-mode; *unfolds / dilates / deepens* describe candidate readings of **radial development**. The two vocabularies operate on different domains and are kept distinct.

**Limiting case: viewer at the aperture (depth = 0).** The viewer is exactly at BEING. The cone widens to its maximum. This is the framework's deepest first-person stance — the apophatic centre as the position from which the model is viewed. Whether this is a stable terminal position or a momentary threshold is left open in §A.8.

#### A.3.3 — The transition between modes

- **3rd → 1st (zooming in).** When the orbital camera zooms in such that its position is completely within Z1, the regime flips. The orbital camera's last position becomes the initial viewer position behind the aperture; the cone initially points back through BEING along the inverse of the approach direction. The user crosses from "looking at BEING from outside" to "looking through BEING from behind".
- **1st → 3rd (retreating).** When the viewer retreats far enough behind the aperture that the viewer's own position passes back out of Z1's bounds, the regime flips back to orbital. Continuity preserved: the orbital camera resumes from the equivalent position with the angle the user was facing.
- Both transitions are *perspective re-readings of the same geometry*, not teleports. The model on the screen is structurally continuous across the transition; only the user's stance toward it changes.

### A.4 — Why the threshold sits at Shell 1

The choice of \(r = \varphi^{-2}\) (Shell 1) as the perspective-transition radius is not arbitrary. It is anchored by three independently-derived properties of Zone 1:

1. **Z1 is fully contained in the bipyramid** (Spec §6.23, H9, proven analytically). Of the four zones, Z1 is the only one with no interstitial component. This makes Z1 the framework's unambiguous "inside".
2. **Z1 is the smallest zone** (radii in \([0, \varphi^{-2}]\)). The geometry treats Z1 as the framework's centre by construction.
3. **Z1 is the zone in which the third-person stance is structurally unavailable** (this appendix). Once inside Z1, the user is too close to BEING to view BEING as an object among others; BEING becomes the position from which everything else is viewed.

Three independent properties converging on Z1 is not coincidence. Z1 *is* the centre of the framework, and the perspective transition makes the centre's special status experiential rather than merely diagrammatic.

### A.5 — Why the transition is a genuine event

Crossing Shell 1 in either direction is not a UI toggle. It is the framework's own geometry deciding when the user's stance toward the model changes. In 3rd-person mode the user observes BEING as a locus; in 1st-person mode the user looks *through* BEING as an aperture. The same point in the diamond plays two roles, and the user only encounters BEING's full structure by passing between them.

This is the closest the UX comes to *enacting*, rather than merely describing, the framework's claim that BEING is simultaneously a centre and an emptiness: at Shell 1, the centre the user was viewing becomes the opening the user views *through*. The geometry on either side of the threshold is the same geometry; what changes is which face of BEING the user is engaging.

### A.6 — How this lands the framework's open claims

- **§4.4 ("diagrammatic phenomenology, not metaphysics")** is honoured by the 3rd-person mode being the *entry* mode (the user encounters the diamond as a diagram before they can become its inhabitant).
- **§4.5 (per-subject scope guard)** is honoured because the camera is always positioned within one subject's Diamond — there is no view that shows multiple subjects' Diamonds simultaneously at this iteration. R2 may revisit this.
- **§4.7 (epistemic-class triage)** is honoured because the camera regime is declared, not silent. The regime itself is a stipulation in the §4.7 sense and is tagged as such here. The cone-width-as-attention mapping in particular is tagged inline in §A.3.2 as a *stipulation* (no historical precedent in linear, *San Yuan*, aspective, or Paleolithic representation); the *kinds of looking* vocabulary discussed in the §A.3.2 supplement below is tagged as *borrowed*. The two epistemic statuses are kept distinct.
- **§6.7 (time axis as nested horizons, H13)** is honoured because the cosmological poles at Shell 5 are *visible from cone mode*, looking outward from inside Z1. This is the framework's strongest statement of "the subject's relation to cosmological horizons" — the horizons are seen from the witness position, not imposed as facts of the diamond's exterior.
- **§6.13 (radial mechanism, H4)** is honoured because zoom is radial motion and *the camera regime does not pick a mechanism reading*. Zoom changes \(r\); it does not commit to whether that change is intensification, transformation, development, thresholding, or none of the above. The framework's suspension of H4 is inherited honestly by the UX.

### A.7 — What this means for downstream work

- Any future Three.js/WebGL deployment of the Diamond implements the **two-perspective camera regime** described in §A.3, with the Shell 1 threshold as the perspective-mode switch.
  - 3rd-person mode: orbital around BEING, BEING non-passable, BEING-as-locus.
  - 1st-person mode: light-cone through BEING, viewer behind the aperture, BEING-as-aperture; viewer orientation and depth-behind-aperture as the two controls; cone width as a continuous function of depth.
- The static renders already in the artifact set (`scheme_delta_3d`, `diamond_v2_3d`, `diamond_no_interstitial_3d`) are *exterior* views with BEING at or near screen-centre and are compliant with the 3rd-person canonical opening.
- Print and PDF renders default to 3rd-person mode. 1st-person (cone-mode) renders are permitted for contexts that require them (e.g., illustrating the cosmological-horizon reading of §6.7) and must be labelled as such.
- The Shell 1 threshold transition is the framework's first piece of UX that *encodes* a doctrinal commitment rather than merely *displaying* the model. Future UX additions are evaluated against the same standard.
- **Future UX consideration: model-side focal depth.** A second control — depth-of-field on the model side, distinct from the depth-behind-aperture control that determines cone width — is *deferred*. If introduced, it would let the viewer bring a particular radial distance from BEING into focus while leaving nearer and farther structure soft. This is a UX possibility, not a vNext+2 commitment, and will be revisited at the Three.js prototype stage.

### A.8 — Open questions carried forward

- **Wide-cone limit at small depth: how panoramic?** As the viewer approaches the aperture (depth → 0), the cone widens. The canonical regime says the cone *approaches but does not reach* a full panoramic / 360° limit — awareness through the aperture remains directed, even when very wide. The boundary question is whether the limit is structurally a forward-hemisphere ceiling (180°), a softer approach to panoramic (e.g., asymptotic toward 270° or 360° without reaching it), or genuinely full panoramic only at \(r = 0\). vNext+2 leaves this open and will resolve it at the Three.js prototype stage where the phenomenology can be tested rather than asserted. The trade-off is philosophical: a 180° ceiling borrows from optical physics in a way §4.7 would flag; full panoramic at the limit makes the *r = 0* position do very heavy phenomenological work.
- **BEING as singularity vs. passable focal point.** Inside Z1, can the viewer's position pass through BEING to the other side, or does BEING act as a non-passable point that the viewer asymptotically approaches? This bears on whether \(r = 0\) is reachable as a stable position or only as a limit. vNext+2 leaves this open.
- **What does the user *do* at \(r = 0\)?** If \(r = 0\) is reachable, the viewer is exactly at BEING, the cone is at its widest. This is the framework's deepest first-person stance. Whether this is a stable terminal position or a momentary threshold the user passes through is a phenomenologically loaded question and is open.
- **Multi-subject views.** The §4.5 per-subject scope guard rules out any third-person view of multiple Diamonds simultaneously at this iteration. If R2 ever relaxes that guard, the camera regime needs revisiting.
- **Model-side focal depth (depth-of-field).** Deferred per §A.7. Will be revisited near UX implementation.

These questions are carried as part of Roadmap I.7 (*what does the framework train when the user inhabits it?*).

### A.9 — UX-as-cognitive-intervention: evolutionary precedent

The vNext+2 council (Gemini 3.1 Pro Thinking) flagged the Diamond UX as *intervention*, not merely *display* — the geometry on screen reshapes how the user perceives. The perspective-and-cartography research surfaced an evolutionary precedent that lends weight to this framing without collapsing into it.

Miyagawa et al. ([MIT, 2018](https://news.mit.edu/2018/cave-art-cognitive-leap-language-mathematics-0221)) argue that Upper Paleolithic cave art (e.g., the Abauntz block at ~13,660 BP discussed in §2.4) functioned not as decoration but as **cognitive training infrastructure** — the externalisation of spatial reasoning into durable marks coincides with and likely scaffolded the cognitive leap that produced symbolic language and mathematics. On this reading, representation is not a window onto thought; it is a *workspace in which thought becomes possible*.

The Diamond's UX inherits this lineage. The cone-mode regime, the Shell-1 perspective transition, the encoding of *what does not have ordinary outside* — these are not depictions of doctrinal claims the framework makes elsewhere; they are the framework's stipulations rendered as something the user *does with their attention*. The framework trains the inhabitant. This is consistent with the §6.7 reading of the time axis as nested horizons (the cosmological poles are visible *from* the witness position, not imposed from a god-view) and with the §4.4 commitment to diagrammatic phenomenology over metaphysics.

The evolutionary precedent does not validate the Diamond's specific stipulations (those remain §4.7-tagged); it validates the *mode of operation* — that geometry-on-screen can be intervention-on-cognition, and that this is a thing humans have been doing for at least ~13,660 years.

The cone-width-as-attention mapping (§A.3.2, *stipulation*) is the framework's first piece of UX-as-intervention. Its effects on the inhabitant are an empirical question carried by Roadmap I.7.

---

*End of Containment Note.*
