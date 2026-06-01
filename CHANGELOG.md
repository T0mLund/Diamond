# Diamond — CHANGELOG

Per `docs/Diamond_Versioning_Convention_v1.1.md` §7, this file accumulates
linearly across all committed iterations. The active Summary always shows
only the current iteration's changes relative to the immediately previous
*committed* baseline (never against an archived draft).

This file is created at the v3.0 commitment on 2026-06-01. The v1.0
baseline is reconstructable from git history prior to commit `5a004b5`
(the v3.0-draft consolidation).

---

## v3.0 — committed 2026-06-01 (PR #8)

**Baseline transition:** v1.0 → v3.0. v2.0 / v2.1 were never committed;
their drafts are archived under `/docs/archive/v2-drafts/`.

### R-thread close-outs (2026-06-01)

- **R1 — CLOSED under Route B.** The bipyramid is promoted to a **second
  containment system** operating alongside the φ-spheres. Z3 is
  jointly defined: 26 angular sub-zones × 2 (`.inner` / `.outer` halves)
  = **52 sub-zones**. The φ-shell formerly called Z4 is retired in
  prose; only the two **polar caps** (inside-bipyramid) are defined
  regions; the equatorial belt is undefined / blank (conservative
  Route B). Hypothesis register: H5 ADOPTED.
- **R2 — HARD-DELETED.** The M3 super-structure for multiple Diamonds
  was disregarded per user instruction ("hypothetical speculation and
  irrelevant"). H6 DISREGARDED. No multi-subject commitments are
  carried forward.
- **R3 — DEFERRED** until first item insertion into a Z3 sub-zone.
  `items.effective_period` (Migration 0009) stays in schema. H7 deferred.
- **Decision memo:** `docs/decision-notes/2026-06-01_r1_route_b_closure.md`.
- **Migration blueprint (NOT applied):**
  `db/migrations/0015_route_b_zone_partition.sql` — drafted for the
  eventual schema partition; application is gated on (i) first item
  insertion into Z3 and (ii) explicit user approval.

### Framework changes folded forward from the v2-draft cycle

- **Spec §4.6** — Exactness rule for geometric quantities (analytic /
  bounded / dated-measured with declared precision). Adopted as rule.
- **Spec §4.7** — Epistemic-class triage as governance rule (every
  substantive claim tagged *derived* / *stipulated* / *borrowed*).
- **Spec §6.7** — Time axis reframed as nested horizons. "Intensifies"
  retired for the time axis; replaced by *unfolds*, *dilates*, *deepens*.
- **Spec §6.22** — Bipyramid canonical description is the convex hull
  of the six landmark coordinates (H8 closed as theorem).
- **Spec §6.23** — Zone-bipyramid containment table; Z1 / Z2 both
  100% inside (H9 closed as theorem); Z3 32.21% / 67.79%, measured
  2026-05-11.
- **Spec §6.24** — Mixed-reading of sub-zone and landmark labels
  (Class T default, Class H hybrid, Class S empty).
- **Spec §6.25** — Historical lineage of spatial representation
  (four borrowings + one stipulation).
- **Spec §10** — Hypothesis register extended with H8–H13.
- **Containment Note (standalone document)** — R1 and R3 reframed as
  containment questions at different scales. Appendix A "User as
  Inhabitant" introduces the canonical two-perspective camera regime.
- **Roadmap I.1 – I.10** — Cross-cutting questions enumerated. I.9
  (color: OKLab decomposition, X→chroma / Y→hue / Z→lightness) and
  I.10 (active-zone semantics, AZ.5 default) **architecture locked**.
- **Roadmap Part III — Phase 1.5b, Phase 1.5c** — Infrastructure
  hygiene. Both CLOSED. Phase 1.5b: `0001_baseline.sql` idempotent.
  Phase 1.5c: `0010`–`0014` RLS remediation (full private mode).
- **Roadmap Part IV — Deployment ladder** *(new Part)*. Stages 1 – 4
  in scope; Stages 5+ enumerated as tracked decisions.

### Convention bumps

- `Diamond_Versioning_Convention_v1.1.md` accompanies the v3.0 baseline
  (committed alongside, no separate version bump on the convention).

### Naming / housekeeping

- **No v1.0 archive move.** No `Diamond_*_v1.0.md` files existed in the
  active workspace; the v1.0 baseline existed only in git history prior
  to commit `5a004b5` (v3.0-draft consolidation). This is recorded as
  an irregularity for the historical record.

### PR

[T0mLund/Diamond#8](https://github.com/T0mLund/Diamond/pull/8).

---
