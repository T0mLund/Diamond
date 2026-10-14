# Archive: May 2026 prototype ("Graves' Diamond")

These are the files that were live at diamond.thoughtfree.com from
8 May 2026 until The Diamond's Stage 1 replaced it. They were built in a
Computer session and deployed straight to Netlify, never committed, so
they were downloaded from the live site on 2026-10-14 and archived here.
The site had no build step, so these files are its complete source.

**Status:** archived for reference. Not served, not maintained. User
decision 2026-10-14: "archive the first prototype. It doesnt have to be
kept alive."

## What it was

- Static page, Three.js r160 from a CDN, no build step.
- Geometry ("Scheme α") that predates the v3 framework: three φ-shells
  (φ⁻³, φ⁻², φ⁻¹) inside a unit sphere, Awakening / Obliteration at ±1,
  Birth / Death at ±φ, Love–Hate and Past–Future as the horizontal axes,
  bipyramid tips at ±√φ, and a horn-torus τ slider. See
  `docs/Diamond_Spec_v3.2.md` for the current geometry.
- `content/sources.js`: 65 sources placed at prototype coordinates, with
  glosses and resonances. `content/readings.js`: about 6,000 words of
  readings. This is the only content the project has; it was never
  imported into the database and would need re-mapping to the v3
  coordinates before use (Stage 5+).

## Note on "v3.1"

In May 2026 this prototype's content set was referred to as the "v3.1"
files, and the standing directive "DO NOT use v3.1 files to build
anything without consulting me" refers to them. That label is unrelated
to the framework documents versioned v3.1 (and v3.2) on 2026-10-14.

## What was reused

Only the horn-torus form (R = r = half the apex height), rebuilt at the
v3 dimensions for the opening in `web/torus.js` (user
decision 2026-10-14: "We also need to reinstate the torus animation from
graves diamond"; see Spec v3.2 §8.1). The animation itself was rewritten
to the user's description. Nothing from `content/` was used.
