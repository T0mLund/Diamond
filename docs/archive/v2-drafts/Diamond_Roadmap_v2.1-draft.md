# Vegar's Diamond — Roadmap v2.1 (draft)

> **Status:** In formation — v2.1-draft, as of 2026-05-15. Decimal increment over v2.0-draft per the versioning convention: same baseline iteration, accumulated edits since 2026-05-12.
>
> **Filename convention:** see `Diamond_Versioning_Convention_v1.0.md`. Supersedes `Diamond_Roadmap_v2.0-draft.md` (same iteration, prior decimal).
>
> **Reads alongside:** `Diamond_Summary_v2.0-draft.md` (posture, unchanged), `Diamond_Containment_Note_v2.0-draft.md` (shared frame, unchanged), `Diamond_Spec_v2.0-draft.md` (the canonical edits to the specification; will bump to v2.1 in a subsequent pass once color and active-zone commitments are folded into §§6.x).
>
> **Changes since v2.0-draft (2026-05-15):**
> 1. **Phase 1.5c executed and closed** (Part III) — RLS remediation applied as four migrations 0010–0014, posture reclassified from "public read, no write" to "private; Directus-managed access only". Acceptance criteria revised accordingly. The thread moves from open to **closed for v2.x**.
> 2. **I.9 (color) — architectural commitments locked.** OKLab decomposition (X = chroma, Y = hue, Z = lightness), bipyramid as translucent skin, togglable palette presets. Substantive open sub-questions remain.
> 3. **I.10 (active-zone rendering) — new thread.** Cone-front intersection chooses the active zone; continuous fade is the default rendering, discrete fade is an opt-in preset (§4.7 stipulation). Open sub-questions enumerated.
> 4. **Appendix tracked-unknowns list updated** to reflect the above.

---

## Purpose

The vNext+2 Roadmap is a **research roadmap with an infrastructure tail**. It does not enumerate product surfaces or schema work. It enumerates:

- Open questions and their decision points (Part I)
- The three reserved research threads carried over from vNext+1, now operating under the shared containment frame (Part II)
- Infrastructure hygiene deliverables that close debts from vNext+1's Phase 1.5 (Part III)
- Decision points and ordering (Part IV)

The Roadmap is **non-blocking**: vNext+2 items can be picked up in any order and at any pace. There is no fan-in to a release.

---

## Part I — Cross-cutting research questions

These questions cut across R1, R2, R3 and the editorial work. Each is enumerated separately so it can be reasoned about independently of any one thread.

### I.1 — Is containment the right organising question for the next iteration?

The Containment Note proposes that R1, R2, R3 share a single underlying form. This is itself a hypothesis about the structure of the open questions, not a hypothesis about the Diamond's geometry or metaphysics.

**Test for "yes":** Approaches to R1 that use the container–inhabitant vocabulary produce sharper questions than approaches that don't.

**Test for "no":** R1 yields a clean answer using purely geometric vocabulary; R2 and R3 turn out to be about *different* things (e.g., representation rather than containment).

**When to ask:** As soon as any R-thread starts to be worked seriously. The answer to I.1 should fall out of the first thread that is engaged.

### I.2 — Should "progression" remain umbrella-only, or should one mechanism reading be elevated?

vNext+1 §6.13 holds five mechanism readings of progression in suspension. vNext+2 carries this forward unchanged. But there is a latent question: is suspension a *permanent* posture for the Diamond, or a temporary one until evidence picks out a mechanism?

**When to ask:** When the first substantial body of zone prose has been written. Authors will be forced to pick a reading implicitly; that implicit choice is data.

### I.3 — What is the relationship between containment (vNext+2) and progression (vNext+1)?

These are the two structural questions the model carries forward unresolved. The Containment Note §6 notes they are not necessarily the same question. Are they orthogonal? Coupled? Reducible to one another?

**When to ask:** Once both I.1 and I.2 have at least preliminary answers. Not before.

### I.4 — Does the convex-hull reframe make the bipyramid easier or harder to reason about in prose?

Empirical question, answered by writing. The reframe is committed in Spec §6.22; this question tracks whether the commitment was a good move.

**When to ask:** After any Phase C zone-prose chunk that references the bipyramid is drafted. Compare to vNext+1 drafts that used the L¹ form. The reframe earns its place if reviewers find the convex-hull prose clearer.

### I.5 — Does the Class T / Class H / Class S reframe (Spec §6.24) actually make sub-zone prose flow better?

*Added vNext+2 from model-council review (GPT-5.5 Thinking).* The mixed-reading thesis is committed in Spec §6.24 as a way to keep the 26-subzone naming scheme without inheriting its compositionality risk. But the test is empirical: when an author writes prose about, say, the *Hell–Past–Awakening* sub-zone, does treating the label as a tag (Class T, default) produce text that reads more clearly than treating it as a phenomenological state (Class S) would have?

**Test for "yes":** Class T sub-zone prose reads as *coordinate description* ("the sub-zone where the x-, y-, and z-projections sit near the Hell, Past, and Awakening landmarks") without losing meaning, and a reader does not protest "but what *is* that?".

**Test for "no":** Authors find themselves repeatedly smuggling Class S phenomenological content back in to make the prose live; or readers consistently demand a phenomenological gloss that the Class T frame cannot supply. In that case, the mixed-reading thesis is too thin and either Class S needs to be populated (with §4.7 warrants) or the labels need a different reframe altogether.

**When to ask:** After the first 3–5 sub-zone prose chunks are drafted in Phase C. Earlier is too soon; later risks accumulating prose under an unexamined commitment.

### I.6 — Does the cosmological time-axis overlay (Spec §6.7, Shell 5) interfere with the per-subject scope guard (§4.5)?

*Added vNext+2 from model-council review (unanimous time-axis finding).* The nested-horizon time axis places phenomenological Past/Future at inner zones and Big Bang / heat-death–Big-Rip–CCC poles at Shell 5. Shell 5 is, by other framework commitments, a *cosmic* or *containing* layer, not a per-subject layer. So the time axis ends up reaching from the most intimate (a single subject's Now at the origin) to the most cosmic (the universe's birth and end) inside one Diamond.

The per-subject scope guard (§4.5) says each Diamond is one subject's. Does the cosmological overlay at Shell 5 quietly violate this — by suggesting that every per-subject Diamond contains *the* cosmological history, not *a* subject's relation to history?

**Test for "compatible":** The overlay reads naturally as "this subject's outer horizon of imaginable time, which happens to coincide with what cosmology calls the Big Bang / heat-death pole". The cosmological poles are *available* to the subject as outer horizons, not *imposed* as universal facts inside their Diamond.

**Test for "in tension":** Authors keep slipping into "the Big Bang is at Shell 5" rather than "this subject's outermost past horizon is at Shell 5, and we identify it with the Big Bang as an overlay". If the slip is hard to resist, the overlay is doing more than overlay work.

**When to ask:** Once any zone-prose chunk treats Shell 5 in time terms. This question is closely coupled to I.1 (containment frame) and to R3 (subject motion / scope-guard relaxation).

### I.7 — What does the framework train when the user inhabits it? *(carries the Containment Note A.8 questions)*

The Containment Note Appendix "User as Inhabitant" commits vNext+2 to a two-perspective camera regime keyed to Shell 1 (\(r = \varphi^{-2}\)): orbital camera centred on BEING (BEING-as-locus, non-passable) outside Z1, and a 1st-person light-cone *through* BEING (BEING-as-aperture, viewer behind the aperture, cone width as a continuous function of depth behind the aperture) inside Z1.

This question tracks whether that commitment holds up as the framework gains more visual surfaces (Three.js scenes, PDF renders, walkthroughs), and specifically:

- Does the Shell 1 perspective transition *feel* like the framework's geometry deciding, rather than like a UI glitch?
- **How panoramic does the 1st-person cone become at small depth?** The canonical regime says the cone *approaches but does not reach* a panoramic limit, leaving open whether the structural ceiling is 180° (forward hemisphere), something between 180° and 360°, or genuinely full panoramic only at the limit \(r = 0\). The 180° ceiling reads as a §4.7-flagged borrowing from optical physics; the full-panoramic reading places heavy phenomenological weight on the *r = 0* position. Either resolution is doctrinally consequential and is best tested rather than asserted.
- Is BEING a non-passable singularity or a passable focal point inside Z1?
- What is the phenomenology of \(r = 0\) — stable terminal, momentary threshold, or something else?
- Does the cone-mode view of Shell 5 actually communicate the cosmological-horizon reading of §6.7, or does it confuse?
- Does the *depth-behind-aperture ↔ cone-width* mapping (close to aperture = wide / open awareness; far from aperture = narrow / focused attention) read naturally to users who haven't been told the mapping in text? If yes, the framework's claim about the phenomenology of attention is being *enacted* rather than asserted, which is the strongest possible form of the commitment.
- **Future:** Should a model-side focal depth (depth-of-field, distinct from depth-behind-aperture) be introduced as a second 1st-person control? Deferred per Containment Note A.7.

**When to ask:** Before any new visual surface ships. Before, not after. The first Three.js prototype of the Diamond is the natural occasion for these questions to acquire data, particularly the panoramic-limit question.

---

### I.8 — Is the Diamond's spatial syntax linear-perspective, scattered-perspective, or mixed? *(parallels §6.24 mixed-reading)*

**Origin.** Spec §6.25 surveys four historical traditions of spatial representation (Western linear, Chinese *San Yuan*, Egyptian aspective, Paleolithic cartography) and tags each as a *borrowing*. Two of these traditions — Western linear perspective and Chinese *San Yuan* — disagree fundamentally on whether the viewer of a representation occupies *one* station-point or *multiple kinds of looking* that can coexist in a single composition. Western linear demands one; *San Yuan* permits scattering. The Diamond UX currently commits to *one* viewer position at a time (orbital *xor* cone), but the question of how the framework's *prose, diagrams, and walkthroughs* compose multiple viewpoints is unsettled.

**The structural parallel.** This is the spatial-representation analog of §6.24's mixed-reading thesis on sub-zone labels. §6.24 dissolves the false choice between *one true label per sub-zone* and *infinitely many labels* by allowing labels of different epistemic classes (T / H / S) to coexist on the same coordinates. I.8 asks the same question of viewpoints: must the framework commit to a single station-point posture (linear-perspective), or can it compose multiple kinds-of-looking (scattered-perspective) within a single composition — e.g., a Three.js scene that supports both orbital and cone simultaneously through picture-in-picture, or a PDF walkthrough that interleaves *gao yuan / shen yuan / ping yuan* views of the same model? The parallel suggests that scattered-perspective is the structurally honest default once §6.25 is on the page, by the same logic that the mixed-reading is the structurally honest default in §6.24.

**Open sub-questions.**

- **Are orbital and cone simultaneously inhabitable?** The Containment Note A.3 currently says no — they are gated by the Shell-1 threshold, the user is in one mode *or* the other. But a *composed* surface (a PDF, an essay, an explainer scene) can show both at once. Does this break A.3, or does A.3 govern only the live-camera experience while composed surfaces are free to scatter?
- **Multiple kinds-of-looking within cone-mode.** The Containment Note §A.3.2 supplement (Class H *gao yuan / shen yuan / ping yuan*) reserves three kinds of looking. Can a single composition show two or three simultaneously? Chinese handscrolls do; the Diamond's UX *could*.
- **The container/inhabitant duality of §2.4.** The Diamond is both an external map and an inhabitable territory. A scattered-perspective composition that shows the map *and* the inhabitant's view at once — e.g., a split-screen Three.js scene — honours the duality more honestly than either mode alone.
- **Editorial discipline.** If the framework adopts scattered-perspective as the default for composed surfaces, the borrowing-vs-stipulation accounting in §6.25.5 needs an entry for *the act of scattering itself* — is scattering *San Yuan* (then borrowed) or a Diamond-specific synthesis of *San Yuan* and linear (then stipulated)?

**When to ask.** Before the first composed surface ships — specifically, before any Three.js scene that contemplates dual or multi-view rendering, and before any PDF or essay that mixes orbital and cone illustrations on a single page. The question is structural, not aesthetic; resolving it constrains every downstream composition.

**Relation to other threads.**

- Parallels §6.24 mixed-reading thesis (mixed labels ⇔ mixed viewpoints).
- Inherits the §6.25 borrowing-vs-stipulation discipline.
- Carries forward Containment Note §2.4 (container/inhabitant duality).
- Constrains Roadmap I.7 (the panoramic-limit question is local to one mode; I.8 is about *across* modes).

---

### I.9 — Color in spatial representation *(architectural commitments locked v2.1; open sub-questions remain)*

**Origin.** The perspective-and-cartography research (`Diamond_Perspective_Cartography_Research_2026-05-12.md`) surfaced a gap: the four traditions surveyed in Spec §6.25 each had *some* role for color in spatial representation (Egyptian iconographic color-coding; Chinese ink-tone gradients for *shen yuan* recession; pigment use in Paleolithic art; aerial perspective in linear-perspective Western painting), but the v2.0-draft had no formal commitment to how color signifies in the Diamond's visual surfaces.

**Status, v2.1.** *Architectural commitments locked; substantive sub-questions remain open and explicitly tagged below.* The user supplied a per-axis color requirement on 2026-05-12. After a round of clarification, the architecture has settled to a perceptual-decomposition reading.

**Locked commitments (architectural).**

- **Composition rule.** Each axis writes its own perceptual channel in OKLab; channels do not blend, they decompose:
  - **X-axis → chroma.** Distance to the X-axis modulates chroma. Saturation, not opacity — opacity is reserved for navigating the model (Z-depth, active-zone fade) and cannot also carry valence.
  - **Y-axis → hue.** A hue gradient along Y. Default candidate palette: green ↔ yellow (one preset; not a structural commitment).
  - **Z-axis → lightness.** A lightness gradient along Z. Default candidate palette: blue ↔ red (one preset; not a structural commitment).
- **Bipyramid as translucent skin.** The bipyramid's surface renders as a translucent skin over the underlying shell-and-octant structure, not as an opaque container. This honours the §6.22 inhabitant reading.
- **Togglable palette presets.** Palette is a preset, not a structural commitment. Multiple presets can be created and switched. The architecture (X = chroma, Y = hue, Z = lightness) is stable across presets.
- **Class H by architecture.** The three-axis decomposition is itself an instance of Class H — the axes are numerical, the palette is a borrowing, the mapping rule is the stipulation that needs §4.7 accounting in the Spec rewrite.

**Open sub-questions (still alive — to be resolved in v2.2 or later).**

- **I.9.a — X-axis rule.** Two readings remain alive: *nearness to the X-axis* (radial distance in the YZ plane) versus *position along X relative to BEING* (signed scalar projection). The two produce different chroma fields. No commitment yet.
- **I.9.b — Palette presets.** What is the default preset, and what other presets earn their place? The green-yellow Y / blue-red Z candidate is *one* candidate, not *the* default.
- **I.9.c — Cone-vs-orbital color reading.** Color was specified architecturally without reference to camera mode. Does the same chroma/hue/lightness field render usefully in both orbital (BEING-as-locus) and cone (BEING-as-aperture) modes, or do the two modes need different palettes — even though the architecture is shared?
- **I.9.d — Pole-color implications.** Spec §6.7 designates landmark coordinates with phenomenological labels (Heaven/Hell, Past/Future, Awakening/Obliteration). Does the decomposition produce pole colors that read coherently against the §6.7 labels, or does the architecture force a re-examination of which pole gets which color?

**When to revisit (the open sub-questions).** Before any Three.js prototype renders the bipyramid as a translucent skin. The architectural commitments above are stable enough to begin prototype work without; the open questions surface only when palette choices have to be made for an actual rendered scene.

**Cross-references.** Spec §6.22 (bipyramid as inhabitant), Spec §6.25 (borrowing-vs-stipulation discipline), §4.7 (stipulation accounting), Roadmap I.10 (active-zone rendering — uses opacity, hence the saturation-not-opacity commitment above).

---

### I.10 — Active-zone rendering *(new thread, v2.1; AZ.1 and AZ.5 locked; AZ.2/3/4/6/7 open)*

**Origin.** In conversation 2026-05-12, the user committed the framework to a navigation-rendering principle: whichever zone the user is *passing through* should be highlighted (active); zones before and behind should be made inactive (low-opacity, faded). This applies to both camera modes — orbital (zone depth read from BEING-as-locus distance) and cone (zone depth read from depth-behind-aperture). The commitment establishes opacity as a navigation channel — separately from chroma (which carries I.9 X-axis valence).

**Locked commitments.**

- **AZ.1 — Cone-front intersection chooses the active zone.** The active zone in cone mode is the zone the *front of the cone* currently intersects. As the user adjusts depth-behind-aperture, the cone's front sweeps through Z1 → Z2 → Z3 → Z4 (or the reverse), and the active zone follows the intersection.
- **AZ.5 — Continuous fade is the default; discrete is an opt-in preset.** The transition between zones is rendered as a continuous opacity gradient by default. A discrete-fade rendering (sharp zone boundaries) is available as a togglable preset, with the discreteness itself tagged as a §4.7 stipulation (the zones are mathematically continuous; visual discreteness imposes the boundaries that the math does not).

**Open sub-questions (still alive — to be resolved in v2.2 or later).**

- **I.10.AZ.2 — Radial-shell zones vs. bipyramid-layer zones.** The four-zone partition is defined by radius-thresholds (Z1 inside Shell-1 at \(r = \varphi^{-2}\), Z2 inside Shell-2 at \(r = \varphi^{-1}\), Z3 inside the unit sphere, Z4 the bipyramid annulus outside the unit sphere). Active-zone-as-cone-front-intersection is well-defined for radial shells; whether the bipyramid-layer reading (Z4 as the convex-hull skin between sphere and bipyramid surface) participates in active-zone fade in the same way is unsettled.
- **I.10.AZ.3 — Z1-active handling at the Shell-1 camera transition.** The Containment Note A.3 specifies Shell-1 as the orbital ↔ cone gate. If Z1 is the active zone *and* the user is approaching Shell-1, the rendering should anticipate the camera transition without flickering. The interaction between active-zone fade and camera-mode switch is unspecified.
- **I.10.AZ.4 — Z5 in cone-mode policy.** Spec §6.7 places cosmological-horizon labels at Shell-5. Cone-mode normally reads zones in the depth-behind-aperture direction. Does Z5 (the cosmological horizon) participate in active-zone fade, or is it treated as a fixed background that cone-mode does not pass through?
- **I.10.AZ.6 — "Behind" disambiguation in cone-mode.** In orbital mode, "behind" is well-defined relative to the camera. In cone-mode (viewer behind the aperture, cone sweeping forward), "behind" could mean *behind the viewer* (outside the cone) or *behind the cone-front* (zones the cone has already passed through). The active-zone rendering needs a consistent reading.
- **I.10.AZ.7 — Mixed-reading reconciliation.** Active-zone is, plausibly, a *modal* commitment (about how the user reads the model) rather than an *ontological* one (about what the zones are). If so, active-zone state lives at the rendering layer, not in the data model. Working hypothesis: active-zone is modal, not ontological. This parallels §6.24's mixed-reading thesis on sub-zone labels.

**Cross-references.** Spec §6.7 (Z-axis labels, including Z5 cosmological pole), Spec §6.22 (bipyramid as inhabitant), Containment Note §A.3 (Shell-1 camera transition), Roadmap I.7 (panoramic-limit question — local to one mode; I.10 is also local to one mode at a time), Roadmap I.9 (color — uses chroma for valence, leaving opacity free for active-zone fade).

---

## Part II — The three reserved threads (under containment frame)

### R1 — Interstitial geometry and zone partition revision

**Frame:** Is the bipyramid a *container* (zone-defining) or an *inhabitant* (landmark)?

**Current status:**
- Bipyramid is documented as an **inhabitant** in Spec §6.22.4.
- Three-row evidence in the measured-geometry table (Spec §6.23): Zone 1 (100% inside, analytic), Zone 2 (100% inside, analytic), Zone 3 (32.21 / 67.79%, measured).
- Zone 4 row is open.

**Deliverables (in priority order):**

1. **R1.1 — Compute the Zone 4 volumetric split.** Same method as Zone 3 (MC + grid cross-check). Estimated effort: ~10 minutes of compute, ~30 minutes to write up. Output: a single row added to Spec §6.23 and to the appendix of the Containment Note. **This is the only quantitative gap remaining for R1.** Owner: open. Target: before any R1 decision discussion.

2. **R1.2 — Container-vs-inhabitant decision framework.** A short document (~3 pages) listing the consequences of each route:
   - Route A: keep bipyramid as inhabitant; consequences for zone prose, sub-zone naming, item anchoring.
   - Route B: promote bipyramid to zone-defining surface; consequences for migration 0010, sub-zone re-enumeration, Directus collection updates, Phase D anchor schema.
   - Route C: change the bipyramid to a regular octahedron of circumradius φ (the "Zone 3 cleanly bisected" reading); consequences for landmark coordinates (Heaven/Hell/Past/Future shift to Shell 4), Spec §6.22 rewrite, all prior renders.
   Owner: open. Target: when I.1 is answered "yes".

3. **R1.3 — Trial prose passage.** Write one or two paragraphs of Zone 3 zone-prose under each of Routes A and B (Route C is more expensive to draft because the landmark coordinates change). The author's experience writing each is data for R1.2. Output: comparison memo. Owner: Vegar or collaborator. Target: after R1.2.

**Out of scope for R1 in vNext+2:** Migration 0010 SQL. No migration is written until at least Routes A vs B is resolved.

---

### R2 — M3 super-structure for multiple Diamonds

**Frame:** What structure *contains* a community of per-subject Diamonds?

**Current status:** Carried over from vNext+1 §6.21 unchanged. M3 remains a placeholder name. No new geometric or schema commitments in vNext+2.

**Deliverables (low priority for vNext+2; this thread is the slowest):**

1. **R2.1 — Survey of candidate containment topologies.** A short document listing options:
   - Manifold (Diamonds as points)
   - Fibre bundle (Diamonds as fibres over a shared base)
   - Lattice of vantage points (Diamonds as mutual projections)
   - Other / placeholder
   Each option gets one paragraph: what it commits to, what it lets one say, what it forces one to give up. Owner: open. Target: no urgency.

2. **R2.2 — Identification criterion.** Under any candidate topology, *what makes a shape seen differently from two vantage points the same shape?* This is the substantive question that distinguishes R2 from R3. Owner: open. Target: after R2.1.

**Out of scope:** Any commitment to a particular M3 structure. R2 in vNext+2 stays at the survey level.

---

### R3 — Dynamic positions and animated trajectories

**Frame:** What structure *contains* one subject's trajectory through their Diamond over time?

**Current status:** Schema affordance already exists — `items.effective_period` columns (added in migration 0009) allow multiple rows per item with non-overlapping periods. The schema does not, however, commit to *what those rows mean*.

**Deliverables:**

1. **R3.1 — Editorial policy for `effective_period`.** A short policy doc answering: under what circumstances should an item have multiple rows with different `effective_period`s? Examples: a person before and after an awakening event; a concept that shifts position as a tradition evolves; a practice that migrates between zones. The policy should be **conservative** — only allow multi-row items when the position change is documented and provenanced. Owner: open. Target: before any item with multiple effective_period rows is inserted.

2. **R3.2 — Trajectory data model question.** Is a trajectory:
   - A sequence of static items (current schema can express this with multiple rows)
   - A single item with a time-parameterised position field (would require schema change)
   - A relation-graph object (could be expressed in `item_relations` with a new `transitions_to` relation kind, no schema change)
   This is **not** a question to settle in vNext+2. R3.2 is a tracked question for vNext+3 or later. Listed here only to flag that R3.1 is the only R3 deliverable in vNext+2 scope.

**Out of scope:** Animation. Rendering. The "subject as moving point" abstraction. All deferred.

---

## Part III — Infrastructure hygiene (Phase 1.5b and Phase 1.5c)

Two debts incurred during vNext+1's Phase 1.5 deployment. Both have been identified; both have known remediations.

### Phase 1.5b — Idempotent migrations 0001–0008

**Problem.** Migrations 0001–0008 use `create table` without `if not exists`, and create types without `do $$ … if not exists … end $$` guards. As a result, every push to `main` that touches `db/migrations/**.sql` triggers the `db-push` workflow, which re-applies all migrations from 0001 and fails at 0002 with `relation "axes" already exists`. The latent effect: `db-push` has never succeeded on `main` since the project started, except on the very first run (PR #1). Migrations have only landed via manual application through Supabase Studio.

**Remediation.** Convert 0001–0008 to idempotent form:
- `create table` → `create table if not exists`
- `create type` → wrap in `do $$ begin if not exists (select 1 from pg_type where typname=…) then create type … end if; end $$;`
- `create index` → `create index if not exists`
- `create function` → `create or replace function`
- `create trigger` → drop trigger if exists; create trigger
- Seed inserts already use `on conflict do nothing` or equivalent — verify each migration.

**Acceptance criteria:**
- A clean PR converts 0001–0008.
- After merge, `db-push` runs to completion on `main` (workflow succeeds).
- A follow-up `db-verify` run (already configured to fire after `db-push` succeeds) passes the invariants in its current form.
- Migration 0009 (already in repo) does not need to be modified — it was written idempotent from the start.

**Estimated effort:** 30–60 minutes for the SQL edits; one PR cycle for review and merge.

**Owner:** open. **Target:** before any further migrations are queued, so the CI gate becomes trustworthy.

### Phase 1.5c — Row-level security remediation *(closed for v2.x — executed 2026-05-15)*

**Problem (as identified in v2.0-draft).** Supabase's advisor flagged 41 tables in the `public` schema with RLS disabled, including all Diamond geometry tables (`axes`, `shells`, `coordinates`, `zones`, `sub_zones`), all content tables (`sources`, `prose_sections`, `glossary_terms`, `revisions`, etc.), the new vNext+1 tables (`items`, `item_relations`), and all 29 Directus housekeeping tables. With RLS disabled, the `anon` key could read *and modify* every row. Sensitive columns flagged: `directus_users.{password, token}`, `directus_sessions.token`, `directus_shares.password`.

**Posture reclassification (v2.1).** The v2.0-draft classification proposed "public read, no write" for the geometry tables. **The user direction on 2026-05-15 supersedes this:** *Fully private now; only the agent and Vegar can write or read; "others" as collaborators is a future concern, 6–12 months out, with an admin-contributor-user hierarchy to be defined then.* The new classification therefore is:

- **All ours-owned `public` tables (41 tables): private; Directus-managed access only.** RLS enabled, deny-all by default (no policies). Directus connects as the `postgres` role (the table owner) and is unaffected by RLS. The agent connects via `service_role` (BYPASSRLS by default) and is unaffected. The `anon` and `authenticated` roles have no grants, are subject to RLS deny-all even if grants were re-issued.
- **PostGIS system objects** (`spatial_ref_sys`, `geography_columns`, `geometry_columns`): owned by `supabase_admin`, not modifiable from project-scope migrations, documented Supabase-side exceptions. Left as-is.

**Remediation as executed (four phases, four migrations).**

1. **Phase A — Revoke anon + authenticated grants** (migrations `0010_phase_1_5c_rls_remediation_phase_a` and `0011_phase_1_5c_rls_remediation_phase_a2`). Looped over `pg_tables` to revoke all grants from `anon` and `authenticated` on all 41 ours-owned tables, then revoked grants on two ours-owned views (`current_items`, `points_with_zones`). Verified: anon/authenticated table_privs went from 43 → 3 (PostGIS exceptions only).

2. **Phase B — Enable RLS deny-all** (migration `0012_phase_1_5c_rls_remediation_phase_b`). Looped over all ours-owned `public` tables with RLS disabled and enabled it. No policies created — effective behaviour is deny-all for any role that is not the table owner, a superuser, or has BYPASSRLS. Verified: 42/42 ours-owned tables now RLS-enabled.

3. **Phase D1 — Pin `search_path` on 3 functions** (migration `0013_phase_1_5c_rls_remediation_phase_d1`). Added `SET search_path = ''` to `set_items_updated_at`, `compute_zone`, and `compute_sub_zone_slug`. `compute_sub_zone_slug` was rewritten with `public.compute_zone(...)` schema-qualified to preserve the cross-function call under an empty search_path. Smoke tests confirmed identical behaviour on representative coordinates including the Awakening boundary at \(z = +\varphi\).

4. **Phase D2 — Switch 2 views to `security_invoker`** (migration `0014_phase_1_5c_rls_remediation_phase_d2`). `current_items` and `points_with_zones` had no `reloptions` set, meaning they inherited PostgreSQL's default definer-style behaviour. Both now run with the caller's permissions. Functionally identical in the current setup (only `postgres` and `service_role` query them, both with full table access), but the new posture composes correctly with any future `authenticated`-role policy work.

**Acceptance criteria (revised v2.1):**
- ✅ All ours-owned `public` tables have RLS enabled. *(42/42, verified)*
- ✅ `anon` and `authenticated` have no grants on ours-owned `public` tables. *(0 grants on 40 ours-owned objects; 3 remaining are PostGIS supabase_admin-owned)*
- ✅ All ours-owned functions have `search_path` pinned to `''`. *(3/3 verified)*
- ✅ All ours-owned views have `security_invoker = true`. *(2/2 verified)*
- ✅ Directus continues to function. *(User confirmed admin login 2026-05-15 16:00; Directus sessions count incremented, indicating successful reconnection.)*
- ✅ Supabase advisor: `rls_disabled_in_public` and `sensitive_columns_exposed` errors eliminated for ours-owned objects.

**Lint summary, before vs. after:**

| Lint | Before | After | Note |
|---|---|---|---|
| `rls_disabled_in_public` (ERROR) | 41 | 1 | Remaining: `spatial_ref_sys`, supabase_admin-owned |
| `sensitive_columns_exposed` (ERROR) | 4 | 0 | All cleared |
| `function_search_path_mutable` (WARN) | 3 | 0 | All cleared |
| `security_definer_view` (WARN) | 2 | 0 | All cleared |
| `rls_enabled_no_policy` (INFO) | 0 | 40 | Expected — confirms deny-all posture is active |
| `extension_in_public` (WARN) | 1 | 1 | PostGIS extension, Supabase-side exception |
| `anon/authenticated_security_definer_function_executable` (WARN) | 6 | 6 | All on `st_estimatedextent`, PostGIS supabase_admin functions |

**Net effect:** 56 → 48 lints; ERROR-level 46 → 1; all remaining items are PostGIS extension artifacts owned by `supabase_admin` and standard Supabase-side exceptions.

**Out of scope for v2.1 (deliberately not done):**
- Writing `anon`-readable policies. The fully-private posture is the v2.1 endpoint. Public read access, if ever wanted, becomes a separate Phase 1.5d in some future iteration with explicit user direction.
- Defining the admin-contributor-user role hierarchy. The user has tagged this as 6–12 months out and not currently important; the deny-all base makes any future hierarchy a strict policy-addition rather than a posture-change.
- Touching PostGIS supabase_admin-owned objects. Standard exception.

**Migration repository state.** Supabase's migration log holds the authoritative copies of `0010`, `0011`, `0012`, `0013`, `0014`. The `T0mLund/Diamond` repo's `supabase/migrations/` directory is one or more migrations behind (Phase 1.5b CI is still broken, blocking automated push). Reconciliation deferred to whichever Phase 1.5b PR cycle next lands.

**Decision D4 (RLS posture decided) — resolved.** Per IV.2, D4 was gated by "Phase 1.5c audit document written". It is now resolved in the affirmative with the fully-private posture above.

**Decision D6 — new.** When (or whether) to introduce per-role read policies for invited collaborators. **Not gated by Phase 1.5c.** Gated by the user's future direction on the admin-contributor-user hierarchy. Decision target: 6–12 months from now.

---

## Part IV — Decision points and ordering

vNext+2 has no fixed phase sequence. It does have a small number of decision points, and a recommended order for the threads.

### IV.1 — Recommended ordering of threads

1. **Phase 1.5b (idempotent migrations).** Smallest, mechanical, high payoff (CI becomes trustworthy). Do first.
2. **R1.1 (Zone 4 volumetric split).** Smallest research item; closes a tracked unknown. Do second.
3. **I.4 (does the convex-hull reframe make prose easier?).** Empirical, answered by writing. Do whenever the next zone-prose chunk is written.
4. **R1.2 + R1.3 (container-vs-inhabitant framework + trial prose).** The substantive R1 work. Do when contemplation has settled on what the bipyramid is *for*.
5. **R3.1 (effective_period editorial policy).** Cheap, prevents drift. Do before any multi-row item is inserted via Directus.
6. **R2.1 (M3 topology survey).** Slow thread; do when there is appetite for it.
7. ~~Phase 1.5c (RLS audit).~~ **Closed 2026-05-15.** See Phase 1.5c entry in Part III for posture and acceptance.
8. **I.9.a–d (color open sub-questions).** Surface when a Three.js prototype has to render the bipyramid as a translucent skin and palette choices have to be made for an actual scene.
9. **I.10.AZ.2/3/4/6/7 (active-zone open sub-questions).** Surface when the first interactive cone-mode walkthrough is built — the sub-questions about Shell-1 transition handling, Z5 cone-mode policy, and the modal-vs-ontological reading of active-zone state can only be answered against running rendering.

### IV.2 — Decision points

| Decision | Gating | Resolves |
|---|---|---|
| D1 — Container or inhabitant? | R1.1 done; R1.2 written; R1.3 prose-test complete | R1 closes or migrates to a vNext+3 commitment |
| D2 — Is containment the right organising frame? | At least one of R1, R3 substantively engaged | Containment Note's editorial status; possibly I.1 |
| D3 — Idempotency landed? | Phase 1.5b PR merged and `db-push` green | CI trustworthiness; unblocks future migrations |
| D4 — RLS posture decided? | Phase 1.5c audit document written | ✅ **Resolved 2026-05-15: fully-private posture, deny-all RLS, anon/authenticated revoked. See Part III Phase 1.5c entry.** |
| D5 — Progression mechanism still suspended? | After first body of zone prose | vNext+1 §6.13 status carries forward or is revised |
| D6 — Per-role read policies for invited collaborators? | User direction on admin-contributor-user hierarchy | Not currently gated; 6–12 months out per 2026-05-15 user direction. |

### IV.3 — What vNext+2 explicitly does *not* decide

- Whether to ever write migration 0010.
- Whether M3 has a definite topology.
- Whether subjects can have time-varying positions.
- Whether progression has a unified mechanism.
- Whether Phase 2 (Directus Cloud) goes ahead. (That decision lives in the Deployment Roadmap; vNext+2 takes no position.)

All five of the above are **deliberately left open**. vNext+2 is the iteration where the frame becomes shared; the answers come later.

---

## Appendix — Tracked unknowns

A short list of every figure or claim the Roadmap names as not-yet-resolved, for easy auditing later:

1. Zone 4 volumetric split (R1.1).
2. Whether the bipyramid is container or inhabitant (D1).
3. The topology of M3 (R2.1 survey, R2.2 identification criterion).
4. The editorial policy for `effective_period` (R3.1).
5. The trajectory data model (R3.2 — vNext+3+).
6. Whether containment is the right organising frame (I.1).
7. Whether the progression mechanism stays suspended (I.2).
8. The relationship between containment and progression (I.3).
9. Whether the convex-hull reframe helps in practice (I.4).
10. ~~The RLS policy posture for each of the 39 unguarded tables (Phase 1.5c).~~ **Resolved 2026-05-15: fully-private posture, deny-all RLS.**

11. The linear-vs-scattered hybrid question (I.8).
12. ~~Color in spatial representation (I.9 — reserved, deferred until user Q3 color spec).~~ **Architectural commitments locked v2.1 (OKLab decomposition; X = chroma, Y = hue, Z = lightness; bipyramid as translucent skin; togglable palette presets). Open sub-questions I.9.a–d remain.**
13. **Active-zone rendering (I.10 — new in v2.1).** AZ.1 and AZ.5 locked. Open sub-questions AZ.2, AZ.3, AZ.4, AZ.6, AZ.7 remain.
14. **Future-computational:** hexagonal grid-cell tiling vs. bipyramidal symmetries (F.1, deferred to v3.0+; see appendix below).

Each item above should resolve before being removed from this list. Items resolved during v2.0 move to the Spec §10 hypothesis register; items deferred to v3.0 stay listed here and migrate to that iteration's Roadmap.

---

## Appendix — Deferred to v3.0+ (future-computational threads)

The v2.0 integration of perspective-and-cartography research surfaced one thread that is *not* a structural or prose question the framework can resolve at the v2.0 stage, but a *computational* one that becomes tractable only when the framework has a working Three.js prototype and a populated `items` dataset. It is recorded here so the lineage is not lost.

### F.1 — Grid-cell hexagonal tiling vs. bipyramidal symmetries

**Origin.** The perspective-and-cartography research surfaced [grid-cell research from O'Keefe, Moser, and Moser](https://www.nobelprize.org/prizes/medicine/2014/press-release/) (2014 Nobel Prize) showing that the mammalian entorhinal cortex tiles spatial environments with a *hexagonal* grid. Mammalian spatial cognition appears to be hexagonally organised at the neural level. The Diamond's bipyramid (Spec §6.22), by contrast, has a 4-fold equatorial symmetry (Heaven–Hell along ±X, Past–Future along ±Y, square cross-section in the equatorial plane) and is *not* hexagonal.

**The question.** Is there a hexagonal reading of the Diamond that the bipyramid currently obscures? Specifically:

- **Tiling.** If the Diamond's volume were tiled by hexagonal cells (analogous to grid-cell firing fields) rather than by the rectilinear sub_zones currently in the schema, would semantic relations between items become more legible? Less? Differently?
- **Symmetry mismatch.** The bipyramid's 4-fold equatorial symmetry maps four cardinal landmarks. A 6-fold symmetry would map six. Is the framework's commitment to four equatorial landmarks (Heaven/Hell/Past/Future) a stipulation that could be revisited, or is four structurally required?
- **Composition.** Hexagonal tilings have a different shape-of-neighbourhood than rectilinear tilings. If the Diamond ever supports inter-item *adjacency* queries (e.g., "what items are *near* this one in framework-space?"), a hexagonal underlying mesh produces different answers than a rectilinear mesh.
- **Computational cost.** Hexagonal Voronoi tilings of bipyramidal volumes, or hexagonal-grid ↔ rectilinear-grid conversions on a 4-zone framework, are *computational* questions: they need code, they need profiling, they need data.

**Status.** *Deferred to v3.0+ and tagged for future computational/research effort.* This is a non-trivial computational thread that should not be opened until (a) a Three.js prototype exists and can be instrumented, (b) the `items` table has enough populated content to test adjacency queries against, and (c) the v2.0 perspective-and-cartography integration has been allowed to settle.

**Epistemic status, in advance.** Any hexagonal reading of the Diamond is, by default, a §4.7 *stipulation* unless explicit warrant is found in (i) the framework's own first principles, or (ii) a borrowing from grid-cell research that respects §4.7's discipline against importing claims from optical or neural physics into the framework's structural prose. The user has indicated that this question is **reserved for future calculation/computation effort**, consistent with the present recording.

**When to revisit.** v3.0 or later — specifically, after the v2.0 perspective-and-cartography integration has settled, the first Three.js prototype is running, and a separate decision-point is reached on whether the Diamond's items-and-relations infrastructure (Spec §7) should support adjacency queries.

**Cross-references.** Spec §6.22 (bipyramid), Spec §6.25 (historical lineage of spatial representation), Roadmap I.8 (scattered perspective), Containment Note §A.9 (UX-as-intervention).

---

*End of Roadmap. v2.1-draft carries 4 substantive threads (R1, R2, R3, Phase 1.5b), 1 closed thread (Phase 1.5c — completed 2026-05-15), 8 cross-cutting questions (I.1–I.4 inherited, I.7 carried from Containment Note, I.8 new, I.9 architecturally locked but with 4 open sub-questions, I.10 new with 5 open sub-questions), and 1 deferred future-computational thread (F.1 — hexagonal tiling, v3.0+). Pacing remains deliberately slow; the iteration is about consolidation, not throughput.*
