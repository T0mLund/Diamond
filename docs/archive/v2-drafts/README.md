# Archive: v2 drafts

This folder preserves the v2-draft cycle of Vegar's Diamond framework
documents that were **never committed**. They are retained for historical
reference only.

## Why these are archived

Per *Diamond Versioning Convention v1.1*, §4.4 (major-skip rule):

> If a draft cycle drifts (multiple drafts, no commitment), the next iteration
> MAY skip the major number. Un-committed drafts MUST be archived to
> `/docs/archive/v<N>-drafts/`.

The v2 cycle drifted: two drafts (v2.0-draft and a wrongly-decimaled
v2.1-draft, which violated §4.3) accumulated without ever transitioning to a
committed v2.0. The user therefore approved a clean skip from committed v1.0
directly to v3.0-draft, with all surviving v2-draft commitments folded into
the v3.0 documents.

## Files in this archive

| File | Size | Status at archive |
| ---- | ---- | ----------------- |
| `Diamond_Summary_v2.0-draft.md`         | 23,482 B | superseded by Diamond_Summary_v3.0-draft.md |
| `Diamond_Spec_v2.0-draft.md`            | 43,204 B | superseded by Diamond_Spec_v3.0-draft.md |
| `Diamond_Containment_Note_v2.0-draft.md`| 34,464 B | superseded by Diamond_Containment_Note_v3.0-draft.md |
| `Diamond_Roadmap_v2.0-draft.md`         | 30,339 B | superseded by Diamond_Roadmap_v3.0-draft.md |
| `Diamond_Roadmap_v2.1-draft.md`         | 43,587 B | violated Convention §4.3; superseded by Diamond_Roadmap_v3.0-draft.md |

## What carried forward to v3.0-draft

The v3.0-draft documents are standalone — they restate the full v1.0 baseline
plus the v2-draft additions. The substantive v2-draft commitments folded into
v3.0 are:

- **Spec §4.6** — Exactness rule (φ-closed forms are canonical; decimal
  values are approximations).
- **Spec §4.7** — Epistemic triage (Hypothesis / Stipulation / Theorem
  status tags on every non-obvious claim).
- **Spec §6.7** — Nested-horizon reading of the time axis.
- **Spec §6.22** — Bipyramid as convex hull of the six landmarks (canonical),
  with `|x|+|y|+|z|/φ ≤ 1` as the equivalent computational form.
- **Spec §6.23** — Measured zone containment table.
- **Spec §6.24** — Mixed-reading rule (Theorem / Hypothesis / Stipulation).
- **Spec §6.25** — Historical lineage of the camera regime.
- **Containment Note Appendix A** — User-as-Inhabitant / camera regime.
- **Roadmap I.9 / I.10** — Color and active-zone architecture locks.
- **All Hypothesis-register updates** (H8–H13).

## What does NOT carry forward

- v2.1-draft's decimal numbering (Convention §4.3 violation).
- Any v2-cycle proposals that were left open or marked as TBD without being
  promoted to a v3.0 commitment.

— Archived on the `feat/v3.0-draft-consolidation` branch.
