# Diamond — Versioning Convention

> **Status:** v1.1 (committed)
> **Established:** 2026-05-12 (v1.0). Revised 2026-05-16 (v1.1).
> **Scope:** All framework documents in the Vegar's Diamond project.

This document is itself a foundational reference. It is versioned (v1.1) but does not participate in the sliding-window iteration of the framework documents. It changes only by its own minor/major bumps.

---

## Changes from v1.0 → v1.1

- **§4.3 clarified** — drafts that accumulate substantial revisions without commitment do *not* gain a decimal counter (`v2.0-draft` → `v2.1-draft` remains prohibited). The rule that was already in v1.0 is restated more clearly because it was misapplied in practice during the v2 draft cycle.
- **§4.4 added** — new rule allowing the next iteration to *skip a major number* when a previous draft cycle accumulated substantial revisions without ever committing. This rule exists so the framework can recover from drift like the v2.0/v2.1-draft sprawl without leaving a confusing v2.x archive in the active workspace.
- **§9 (migration table) extended** — records the v2.0/v2.1-draft → v3.0-draft transition, with the v2 drafts moving to `/docs/archive/v2-drafts/` un-committed.

---

## 1. Why this convention exists

The framework's history contains at least one documented case (the "≈88% of the φ-ball" claim) of an outdated value persisting across multiple documents and surviving re-readings before being corrected by direct measurement. Stale claims in retained old files do not sit harmlessly in an archive; they leak forward into new work through search results, citation, model context, and human re-reading.

This convention exists to make that failure mode structurally hard rather than reactively fixable. It governs how iterations are named, where superseded iterations live, and what discipline carries a commitment forward from one iteration to the next.

A second failure mode emerged during the v2 draft cycle (May 2026): a draft accumulated revisions over several days, was treated by both human and AI as a semi-stable reference, and gained a decimal bump (`v2.1-draft`) that the convention's §4.3 already prohibited. The cycle never committed, and the v2.x documents lived in the active workspace alongside the v1.0 baseline, creating exactly the kind of confusion the sliding-window model was designed to prevent. §4.4 (new in v1.1) gives the project a way out of that situation: skip the major number, archive the un-committed drafts, start fresh.

---

## 2. Versioning model: sliding-window

The project uses a **sliding-window** versioning model rather than a **linear-monotonic** one.

- **Sliding-window (this convention):** At any moment, the active workspace contains exactly one committed framework version plus, optionally, one in-formation draft of the next version. Superseded versions move out of the active workspace to an archive.
- **Linear-monotonic (rejected):** All iterations accumulate in the active workspace, distinguished only by a status field.

Sliding-window is chosen because the active-workspace search surface is shared between the human author and any AI assistant — both of which can mistake a superseded document for an authoritative one. Removing superseded documents from the active workspace is the most reliable prevention.

---

## 3. Filename format

```
Diamond_<DocName>_v<Major>.<Minor>.md
```

with an optional `-draft` suffix while in formation.

### 3.1 Examples

- `Diamond_Spec_v1.0.md` — first committed baseline of the Spec.
- `Diamond_Spec_v1.1.md` — within-baseline revision of v1.0.
- `Diamond_Spec_v3.0-draft.md` — next iteration in formation (v2 was skipped per §4.4).
- `Diamond_Spec_v3.0.md` — that iteration after commitment.

### 3.2 Sort behaviour

Filenames sort correctly in alphabetical/lexical order. The `-draft` suffix sorts between the last committed version and the next committed version, which is exactly where in-formation work belongs chronologically.

### 3.3 No third version component

There is no patch component (no `vMajor.Minor.Patch`). Typo-only fixes overwrite in place without bumping the version. Anything substantive enough to deserve a version bump is at least a minor.

---

## 4. When to bump

### 4.1 Major bump

A major bump occurs **only at iteration commitment**. Major version N corresponds to "the framework's Nth committed baseline".

- v1.0 = first committed baseline (the iteration formerly called vNext+1).
- v2.0 = *never committed* (see §4.4 and §9); drafts archived to `/docs/archive/v2-drafts/`.
- v3.0 = second committed baseline, when it commits (the next consolidation, directed at deployment).

Major versions do not skip *between committed baselines* — but a major number that was used only by un-committed drafts may be passed over per §4.4. The minor counter of the previous major need not return to .0 before the next major; v1.7 can be the last v1 before v3.0 commits.

### 4.2 Minor bump

A minor bump occurs on any substantive edit that adds, removes, or modifies a commitment in the document. Examples that *do* bump the minor:

- A new section or appendix.
- A substantive revision to an existing section (e.g., reframing or expanding).
- Adopting a new rule or commitment.
- Adding, removing, or revising a row in a tracked register (hypotheses, rules, etc.).
- Integrating findings from an external review.

Examples that *do not* bump the minor (overwrite in place):

- Typos, grammar, punctuation.
- Markdown formatting fixes.
- Internal link repairs.
- Renumbering of headings that does not change content.

### 4.3 In-formation work (drafts do not gain decimals)

A `v<N>.0-draft` file is created when a new iteration begins. **Minor bumps to a draft are not separately numbered.** Revisions overwrite the draft in place. The `-draft` suffix is preserved throughout; only commitment (when the suffix is dropped) increments the visible counter.

The reason this rule exists: a draft is one continuous piece of in-formation work. A decimal bump on a draft (`v2.0-draft` → `v2.1-draft`) creates the appearance of a stable v2.0 that never existed, and leaves two draft documents in the workspace competing for attention. Both happened during the v2 cycle. The rule is restated in v1.1 of this convention precisely because it was misapplied.

If a draft cycle accumulates enough revisions that a single `-draft` file no longer reads cleanly, the answer is to **commit the iteration** (drop the `-draft`, archive the previous baseline, restart) — not to add a decimal.

### 4.4 Skipping a major number (new in v1.1)

If a draft cycle has accumulated substantial revisions but never committed — and especially if it has drifted into multiple `-draft` files in violation of §4.3 — the next iteration **may skip the un-committed major number**.

Procedure:

1. The un-committed drafts are moved to `/docs/archive/v<N>-drafts/` in the repo with their filenames intact (e.g., `Diamond_Spec_v2.0-draft.md` is archived as-is). They are not retroactively renumbered.
2. The drafts are removed from the active workspace (the Space).
3. A new iteration begins as `v<N+1>.0-draft`. It does not inherit any "in formation since v<N>" status; it is treated as a fresh consolidation pass against the last committed baseline (v<N−1>).
4. The §9 migration table records the skip.
5. The new iteration's Summary §0 (Changes from previous baseline) registers the changes against the last *committed* baseline, not against the archived drafts.

The archived drafts remain in version control as historical record. They may be referenced when reconstructing the lineage of a commitment, but they are not citable as "v<N>".

Skipping is a discipline of last resort. The default expectation is that drafts commit. Skipping is the recovery move when a draft cycle has drifted past the point where committing-in-place would propagate the drift into the new baseline.

---

## 5. Commitment process

An in-formation iteration commits when:

1. It meets the exit criteria defined in its own Summary §5.
2. The previous baseline is verified-superseded — i.e., every authoritative commitment in the previous baseline is either preserved in the new iteration, or has been explicitly retired in the new iteration's *Changes from previous baseline* section.
3. The `-draft` suffix is dropped from the filenames.
4. The previous baseline's files are moved to the archive (see §6).
5. The CHANGELOG receives a new entry summarising the iteration's changes.

The commitment moment is the only time a major version bumps.

---

## 6. Archive

Superseded iterations move to `/docs/archive/v<Major>/` in the GitHub repo (`T0mLund/Diamond`). The repo is the project's permanent versioned history; the Space is the active workspace.

The archive is version-controlled (via git), retrievable, and structurally separate from the active workspace. It is not searched by default in the active Space.

Each archived iteration retains its filename intact (e.g., `/docs/archive/v1/Diamond_Spec_v1.0.md`), so there is no ambiguity about which iteration a given archived file belongs to.

Un-committed drafts archived per §4.4 go to `/docs/archive/v<N>-drafts/` (note the `-drafts` suffix on the directory name), to distinguish them from committed-then-archived baselines.

---

## 7. The "Changes from previous baseline" discipline

Every iteration's Summary document includes a section titled *Changes from previous baseline* near the top. It enumerates:

- New commitments added.
- Existing commitments revised, with a one-line note on what changed.
- Commitments retired (and where the retirement is justified).
- Numerical values updated (especially ones that supersede prior approximations).

At commitment, this section is folded into a repo-level `CHANGELOG.md`. The CHANGELOG accumulates linearly across all iterations; the active Summary always shows only the current iteration's changes relative to the immediately previous *committed* baseline (never against an archived draft).

This discipline is the mechanism that prevents the "≈88% of the φ-ball" failure mode at scale. Every change of consequence is registered at the moment it happens, in a location that both the human author and any AI assistant will see when working on the new iteration.

---

## 8. Files exempt from this convention

Some files in the Space are *inputs to* framework iterations rather than parts of them. These follow a different rule.

### 8.1 Council review thread exports

Date-stamped, not versioned. Format: `Diamond_Council_Review_<YYYY-MM-DD>.md`. Persist in the active Space indefinitely as permanent inputs. The framework documents cite them by date.

### 8.2 One-off deployment artifacts

Documents like a deployment roadmap that drive a single deployment to completion are not versioned framework documents. They retire to the archive when the deployment they describe is complete. Format: `Diamond_<Purpose>_<YYYY-MM-DD>.md` if dated; otherwise descriptive name without version suffix.

### 8.3 This convention document

Versioned, but does not participate in the sliding-window. It stays in the active Space indefinitely. Major bumps when the versioning rule itself changes; minor bumps for clarifications and additions.

### 8.4 Research input artifacts

Date-stamped research files (e.g., `Diamond_Perspective_Cartography_Research_2026-05-12.md`) that supply external evidence to framework iterations. Permanent inputs; not versioned. Cited by date.

---

## 9. Migration history (extended in v1.1)

The prior naming scheme used `vNext+N` as a permanent label. The first migration, on 2026-05-12, was:

| Prior name | New name | Notes |
|---|---|---|
| `Diamond_vNext+1_Roadmap.md` | `Diamond_Roadmap_v1.0.md` | Committed baseline. |
| `Diamond_vNext+1_Deployment_Roadmap.md` | retired to archive as-is | One-off deployment artifact (§8.2); migration 0009 deployment is complete. |
| `Diamond_vNext+2_Spec.md` | `Diamond_Spec_v2.0-draft.md` | In formation. |
| `Diamond_vNext+2_Roadmap.md` | `Diamond_Roadmap_v2.0-draft.md` | In formation. |
| `Diamond_vNext+2_Containment_Note.md` | `Diamond_Containment_Note_v2.0-draft.md` | In formation. |
| `Diamond_vNext+2_Summary.md` | `Diamond_Summary_v2.0-draft.md` | In formation. |
| `Diamond_vNext_Model_Council_Review_Thread_Export_2026-05-12.md` | `Diamond_Council_Review_2026-05-12.md` | Permanent input artifact (§8.1). |

The `vNext+0` baseline (the framework's state before vNext+1) is not retroactively numbered v0.0; it exists only in the GitHub repo's commit history prior to the v1.0 baseline.

A second migration, on 2026-05-16, was forced by drift in the v2 draft cycle and is recorded here as the worked example for §4.4:

| Prior name | New location | Notes |
|---|---|---|
| `Diamond_Spec_v2.0-draft.md` | `/docs/archive/v2-drafts/Diamond_Spec_v2.0-draft.md` | Un-committed draft, archived per §4.4. |
| `Diamond_Summary_v2.0-draft.md` | `/docs/archive/v2-drafts/Diamond_Summary_v2.0-draft.md` | Un-committed draft, archived per §4.4. |
| `Diamond_Containment_Note_v2.0-draft.md` | `/docs/archive/v2-drafts/Diamond_Containment_Note_v2.0-draft.md` | Un-committed draft, archived per §4.4. |
| `Diamond_Roadmap_v2.0-draft.md` | `/docs/archive/v2-drafts/Diamond_Roadmap_v2.0-draft.md` | Un-committed draft, archived per §4.4. |
| `Diamond_Roadmap_v2.1-draft.md` | `/docs/archive/v2-drafts/Diamond_Roadmap_v2.1-draft.md` | Un-committed draft, archived per §4.4. Note: the existence of this file is itself a §4.3 violation; archived as historical record. |

The v2 cycle accumulated substantial work that is preserved (and accessible via git) but is not citable as v2.0. Commitments from v2 that survive the consolidation are restated cleanly in v3.0-draft and acquire their authoritative form there.

---

## 10. Open question

The Summary documents prior to this convention had front-matter status labels (e.g., "Authoritative", "Draft"). Once filenames carry version and draft-status, these labels in the front-matter become partially redundant. The current recommendation is to keep them for legibility but stop relying on them as the authoritative status indicator — the filename is authoritative.

The v2 drift suggests a second redundancy is worth examining: the in-document "Status:" front-matter line and the filename's `-draft` suffix carry the same information. The v1.1 recommendation: continue to include the Status line for human readability, but the AI tooling and any automation should key off the filename suffix only.

---

*End of Versioning Convention v1.1.*
