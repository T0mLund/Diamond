# Decision memo: R1 closed under Route B (with Conservative Z4)

**Date:** 2026-06-01
**Threads affected:** R1 (closed), R2 (disregarded), R3 (deferred)
**Hypotheses affected:** H5 (ADOPTED)
**Schema impact:** Pending migration `0015_route_b_zone_partition.sql` (blueprint only)
**Stage 1 render impact:** None
**Authored by:** Vegar (decisions) + agent (dialogue scaffolding and capture)

---

## Summary

R1 — the question of whether the bipyramid is a *container* (zone-defining
surface) or an *inhabitant* (decorative landmark) — is closed in favour of
**Route B (container)**. The bipyramid is now a second containment system
operating alongside the spheres. Zone 3's 26 sub-zones split into inner and
outer halves (52 sub-zones total). The label "Zone 4" is retired and
demoted to "the polar caps": two named regions defined as the parts of the
φ-shell *inside* the bipyramid. The rest of the φ-shell is undefined space.

Total defined sub-zones: 80 → **106**.

The decision has no Stage 1 render consequences: the bipyramid is already
drawn as a translucent skin, no items are yet anchored in Z3, and the
inner/outer distinction is invisible until item insertion begins.

R2 (M3 super-structure across Diamonds) is disregarded as hypothetical
speculation. R3 (dynamic positions and trajectories) is deferred until
the first item insertion in Z3.

---

## Dialogue process

The decision emerged from a focused dialogue on 2026-06-01 (this date).
The conversation deliberately started from a "reversibility first" posture,
because the user's standing direction is to *proceed cautiously* and the
project is *not deployed*. The shape of the dialogue:

### Step 1 — Cost-asymmetry framing

We mapped the three routes (A — inhabitant; B — zone-defining surface;
C — replace bipyramid with regular octahedron of circumradius φ) against
the cost of switching between them after Stage 1 ships.

The asymmetry that emerged:

- **A → B** is cheap *now*, while no items are anchored in Z3.
- **A → C** is expensive regardless, because it moves the four equatorial
  landmarks (Heaven, Hell, Past, Future) from Shell 3 to Shell 4 and
  invalidates every prior render.
- **B → C** or **C → B** is catastrophic.

### Step 2 — Route C ruled out

The user ruled Route C out unconditionally. This left A vs B as the live
question.

### Step 3 — Re-grounding ("what is the problem we're trying to resolve?")

The user, returning to the project after some time, asked for a plain-
language restatement of what R1 is actually about. The agent restated:
that the spheres define zones, that the bipyramid is a separately-shaped
object that cuts through Zone 3 (~32% in / ~68% out per the 2026-05-11
Monte Carlo measurement), and that R1 asks whether that cut is meaningful
(Route B) or decorative (Route A).

### Step 4 — User's answer

The user committed Route B in one sentence:

> *"The bipyramid is a second containment system. It serves primarily to
> intersect zone 3 into two zones per subzone, and also to create two
> subzones that penetrate out of the shell at the vertical axis."*

Two structural roles, in order of importance:

1. **Z3 partition.** The bipyramid splits each of Zone 3's 26 angular
   sub-zones into an inner half (inside the bipyramid skin) and an outer
   half. 26 → 52.
2. **Vertical-axis caps.** The bipyramid's +Z and −Z caps reach beyond
   Shell 3 into the φ-shell, creating two regions that "penetrate out of
   the shell at the vertical axis."

### Step 5 — Conservative Z4

The user chose option (i) "Conservative Z4": **only the two bipyramid
caps are defined regions in the φ-shell.** The rest of the φ-shell —
the equatorial belt outside the bipyramid — is **undefined space**, not
a zone, not a sub-zone, not anchored to anything.

This makes Z4 categorically different from Z1/Z2/Z3 and structurally
parallel to Shell 5 (which hosts Birth and Death as NULL-zoned
overlays).

### Step 6 — Polar caps; Option A naming

- The label "Zone 4" is retired in prose. The two regions are now "the
  polar caps."
- Sub-zone slugs for Z3 inner/outer use the existing live-schema
  convention with a suffix: `zone-3.octant-ppp.inner` and
  `zone-3.octant-ppp.outer` (and similarly for axis and plane sub-zones).
- The two existing `zone-4.north` and `zone-4.south` rows in the
  `sub_zones` table keep their slugs for schema continuity. The slug
  prefix `zone-4.` becomes a legacy artefact; prose renames Z4 → polar
  caps.

---

## What this commits us to

### Geometric

- Two containment systems: the spheres (radial; define Z1/Z2/Z3 by shell
  boundaries) and the bipyramid (polyhedral; partitions Z3 into inner /
  outer and defines the two polar caps).
- The bipyramid is no longer described as the convex hull of six landmarks
  that incidentally exists. It is **a structural surface** whose intersection
  with the spheres carries semantic load.

### Schema (pending migration 0015)

| Layer | Before | After |
|---|---|---|
| Z1 sub-zones | 26 | 26 (unchanged) |
| Z2 sub-zones | 26 | 26 (unchanged) |
| Z3 sub-zones | 26 | **52** (26 inner + 26 outer) |
| Polar caps (was Z4) | 2 | 2 (rows preserved; prose renamed) |
| **Total** | **80** | **106** |

### Hypothesis register

- **H5** (bipyramid promoted to zone-defining surface) — **ADOPTED**.
  Was "reframed under containment; see R1."
- **H8** (bipyramid = convex hull) — still CLOSED theorem.
- **H9** (Z1, Z2 100% inside bipyramid) — still CLOSED theorem.
  Reinterpreted: under Route B, this is no longer just a containment
  property but a statement that the second containment system *adds
  nothing* to the partition for Z1 and Z2. The bipyramid first becomes
  *informative* in Z3.

### Other threads

- **R1** — closed. R1.1 (Zone 4 volumetric split) retained as a
  verification deliverable but no longer gates anything: the polar cap
  volumes can be computed at leisure to confirm the bipyramid-cap geometry.
- **R2** — hard-deleted from v3.0 docs per user direction.
- **R3** — R3.1 deferred until first item insertion in Z3. R3.2 stays
  parked for v4.0+.

### Stage 1 deployment

**No render consequences.** Stage 1 still ships:

- Shells, axes, bipyramid skin, BEING at origin
- 7 Class-H landmarks (Heaven, Hell, Past, Future, Awakening, Obliteration,
  BEING)
- Orbital camera only
- Read-only

The bipyramid was always going to be rendered as a translucent skin; the
Route B commitment just gives that skin semantic weight that the user
cannot perceive in Stage 1 because no items are anchored. The cheap
A → B window we discussed under "reversibility first" was never closed
because items have not begun accumulating; we acted within it.

---

## What this does *not* commit us to

- **Migration 0015 has not been applied.** Only a blueprint is committed
  in this PR.
- **No items have been re-anchored or moved.** There are no items to
  re-anchor yet.
- **No rendering work has been changed.** The bipyramid material, opacity,
  edge treatment, and visibility decisions remain open for Stage 1's
  implementation phase.
- **No commitment to a future "inner / outer" UI distinction.** The
  partition exists in the data and the prose; whether and how it is
  surfaced visually is a separate UX question (parallels I.10 active-zone
  work).

---

## Why we are confident this is the right call

1. **It matches the geometry.** The bipyramid does, in fact, cut Z3 into
   two volumetrically distinct regions (32.21% / 67.79%, measured 2026-05-11).
   Calling those two regions different sub-zones is the more honest reading.

2. **It matches the user's intuition** about what the bipyramid is for.
   The "second containment system" framing came from the user, not the
   agent, and it explained the bipyramid's structural role in a way that
   prior drafts had been hedging around.

3. **It is acted on in the cheap window.** No items are anchored. The
   schema can grow from 80 to 106 sub-zone rows without any data migration
   beyond the new inserts. The cost is at its theoretical minimum.

4. **It cleans up the Z4 asymmetry.** The 2-caps-vs-26-sub-zones gap was
   always a wart. Demoting Z4 to "the polar caps" resolves it cleanly.

5. **It does not force changes to Stage 1.** The render layer remains
   untouched. The decision passes through the deployment ladder silently.

---

## Revisit triggers

Action this decision (i.e., re-open R1 or amend the partition) if any of:

- A future render or interaction surface makes the inner/outer distinction
  feel forced or arbitrary when items are first anchored.
- A discovered geometric property of the bipyramid (e.g., relating its
  facet planes to known frameworks like the Klein four-group, the
  rhombic dodecahedron, or the Penrose tilings) suggests that the partition
  should be richer than a binary inner/outer.
- The undefined-equatorial-belt-of-Z4 becomes uncomfortable in prose or
  in user-facing UI. (Possible response: promote the equatorial belt
  to a third polar-region category, or accept it as overlay-like NULL
  space.)

---

## References

- Spec §6.22 (bipyramid geometry and Lagrange-bound proofs)
- Spec §6.23 (measured-geometry table with the 32.21 / 67.79 split for Z3)
- Containment Note §2.1 (R1 framing)
- Roadmap Part II R1 (deliverables R1.1, R1.2, R1.3)
- Live schema: `public.sub_zones` (26 + 26 + 26 + 2 = 80 rows as of 2026-06-01)
- Pending: `db/migrations/0015_route_b_zone_partition.sql` (this PR)
