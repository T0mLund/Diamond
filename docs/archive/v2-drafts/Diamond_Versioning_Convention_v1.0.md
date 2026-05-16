# Diamond — Versioning Convention

> **Status:** v1.0 (committed)
> **Established:** 2026-05-12
> **Scope:** All framework documents in the Vegar's Diamond project.

This document is itself a foundational reference. It is versioned (v1.0) but does not participate in the sliding-window iteration of the framework documents. It changes only by its own minor/major bumps.

---

## 1. Why this convention exists

The framework's history contains at least one documented case (the "≈88% of the φ-ball" claim) of an outdated value persisting across multiple documents and surviving re-readings before being corrected by direct measurement. Stale claims in retained old files do not sit harmlessly in an archive; they leak forward into new work through search results, citation, model context, and human re-reading.

This convention exists to make that failure mode structurally hard rather than reactively fixable. It governs how iterations are named, where superseded iterations live, and what discipline carries a commitment forward from one iteration to the next.

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
- `Diamond_Spec_v2.0-draft.md` — next iteration in formation.
- `Diamond_Spec_v2.0.md` — that iteration after commitment.

### 3.2 Sort behaviour

Filenames sort correctly in alphabetical/lexical order:

```
Diamond_Spec_v1.0.md
Diamond_Spec_v1.1.md
Diamond_Spec_v2.0-draft.md
Diamond_Spec_v2.0.md
Diamond_Spec_v2.1.md
Diamond_Spec_v3.0-draft.md
```

The `-draft` suffix sorts between the last committed version and the next committed version, which is exactly where in-formation work belongs chronologically.

### 3.3 No third version component

There is no patch component (no `vMajor.Minor.Patch`). Typo-only fixes overwrite in place without bumping the version. Anything substantive enough to deserve a version bump is at least a minor.

---

## 4. When to bump

### 4.1 Major bump

A major bump occurs **only at iteration commitment**. Major version N corresponds to "the framework's Nth committed baseline".

- v1.0 = first committed baseline (this is the iteration formerly called vNext+1).
- v2.0 = second committed baseline (this is what the in-formation vNext+2 documents will become at commitment).
- v3.0 = third committed baseline, and so on.

Major versions do not skip. The minor counter of the previous major need not return to .0 before the next major; v1.7 can be the last v1 before v2.0 commits.

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

### 4.3 In-formation work

A v\<N+1\>.0-draft file is created when a new iteration begins. Minor bumps to a draft happen with the `-draft` suffix preserved: `v2.0-draft` → `v2.1-draft` is not used; instead, in-formation revisions overwrite the draft, and the *commitment* moment is the only minor-counter increment that survives. (Rationale: a draft is one continuous piece of in-formation work, not a history of micro-revisions. The CHANGELOG entry at commit captures everything.)

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

---

## 7. The "Changes from previous baseline" discipline

Every iteration's Summary document includes a section titled *Changes from previous baseline* near the top. It enumerates:

- New commitments added.
- Existing commitments revised, with a one-line note on what changed.
- Commitments retired (and where the retirement is justified).
- Numerical values updated (especially ones that supersede prior approximations).

At commitment, this section is folded into a repo-level `CHANGELOG.md`. The CHANGELOG accumulates linearly across all iterations; the active Summary always shows only the current iteration's changes relative to the immediately previous baseline.

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

---

## 9. Migration from the prior naming

The prior naming scheme used `vNext+N` as a permanent label. The migration as of 2026-05-12 is:

| Prior name | New name | Notes |
|---|---|---|
| `Diamond_vNext+1_Roadmap.md` | `Diamond_Roadmap_v1.0.md` | Committed baseline; will move to archive when v2.0 commits. |
| `Diamond_vNext+1_Deployment_Roadmap.md` | retires to archive as-is | One-off deployment artifact (§8.2); migration 0009 deployment is complete. |
| `Diamond_vNext+2_Spec.md` | `Diamond_Spec_v2.0-draft.md` | In formation. |
| `Diamond_vNext+2_Roadmap.md` | `Diamond_Roadmap_v2.0-draft.md` | In formation. |
| `Diamond_vNext+2_Containment_Note.md` | `Diamond_Containment_Note_v2.0-draft.md` | In formation. |
| `Diamond_vNext+2_Summary.md` | `Diamond_Summary_v2.0-draft.md` | In formation. |
| `Diamond_vNext_Model_Council_Review_Thread_Export_2026-05-12.md` | `Diamond_Council_Review_2026-05-12.md` | Permanent input artifact (§8.1). |

The `vNext+0` baseline (the framework's state before vNext+1) is not retroactively numbered v0.0; it exists only in the GitHub repo's commit history prior to the v1.0 baseline.

---

## 10. Open question

The Summary documents prior to this convention had front-matter status labels (e.g., "Authoritative", "Draft"). Once filenames carry version and draft-status, these labels in the front-matter become partially redundant. The current recommendation is to keep them for legibility but stop relying on them as the authoritative status indicator — the filename is authoritative. This is reviewable at v1.1 of this convention.

---

*End of Versioning Convention v1.0.*
