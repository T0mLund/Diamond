# Architecture

This document explains *why* each layer was chosen and how the layers communicate. For *what* is in the repo, see the README.

## The four hard constraints

The Diamond's build has four constraints that no single tool satisfies:

1. **Parametric bipyramid with τ-deformation to horn torus.** The geometry must be code-derived, not a static mesh. φ-cascade radii, named coordinates with descriptions, named resonances — all queryable.
2. **Interior must be database-backed.** Each coordinate is a row. Each source is a row that may attach to *many* coordinates. The "magenta resonance web" is a row per pair.
3. **Both AI and human must be able to author it.** No exclusive AI dependency. A non-developer must be able to add, split, merge, or reposition a source by clicking.
4. **Must publish to website + video + slide decks** from the same source of truth.

## Layer-by-layer rationale

### Database — Supabase (Postgres + PostGIS)

Postgres is the only DB choice that gives us spatial queries on an abstract 3D space (PostGIS `geometry(PointZ, 0)` — SRID 0 because this is metaphysical space, not Earth). The "all sources within radius `r` of BEING" query is one SQL statement. Realtime + REST + RLS come for free; row-level security separates public read from authenticated write.

The Supabase project is `zilnqideoswbsnbctqhi`, region `eu-west-1` (Ireland). Acceptable for a Bergen, Norway editor; Vercel edge will fan it out for global reads.

### No-code admin — Directus Cloud

Directus sits on top of Supabase: same Postgres rows, no second database. It auto-discovers our 9 tables and renders a click-to-edit UI immediately. Compared to the original plan (self-hosted Directus on a DigitalOcean droplet), Directus Cloud removes Docker, Caddy, `.env` files, OS patching, and certificate renewal from the project's responsibility surface. Cost moves from ~$5/mo (droplet) to ~€15/mo (Cloud), a worthwhile trade given the "terminal-averse" preference.

Permissions: Vegar full edit; Computer (via service token) scoped propose-only; public read.

### Website — Next.js + React Three Fiber

R3F wraps Three.js in a declarative React layer. Every named coordinate becomes a `<Coordinate slug="being" />` that fetches its own row and renders a hit-testable hotspot — the interior is *queryable*, not just renderable. The τ-slider is a `useFrame` interpolation against a shared Zustand store.

### 3D editor — Triplex

Triplex (joined Poimandres / R3F maintainers, Oct 2025) is the visual editor that writes back to source. Drag a vertex → JSX changes. This is the only tool that lets Vegar reposition the Diamond visually *and* lets Computer keep the geometry in code. If Triplex turns out to be too immature in production use, the fallback is "Computer edits R3F code, Vegar reviews PR" — no lock-in.

### Video — Remotion + @remotion/three

Remotion treats video as React: `useCurrentFrame()` advances a deterministic frame counter. The `@remotion/three` package wraps R3F so the *exact* same Diamond components used on the website render into MP4. Same scene, same sources, same φ-deformation curve. No re-implementation.

### Slide decks — Reveal.js

HTML slides that can embed the live R3F scene. For PPTX/PDF deliverables when academic readers want native files, Remotion's `renderStill()` exports any frame as PNG, scriptable into a deck.

### Hosting — Vercel

Git push → preview deploy in <60s. Production deploy on merge to `main`. Same flow whether Computer pushes via App-token or Vegar edits in the GitHub web UI.

### CI / credentials — GitHub App `perplexity-diamond-build`

App ID `3663078`, Installation ID `131053359`. The App's *private key* lives in Actions secrets as `APP_PRIVATE_KEY`; it is never echoed, never logged, never exposed in chat. Each `agent-push` workflow run mints a fresh installation token (≤1h TTL), opens a PR, and the token expires.

## Data flow

```
              ┌────────────────────────────────────────────┐
              │              Supabase Postgres             │
              │  axes / shells / coordinates / sources /   │
              │  source_positions / resonances / prose /   │
              │       glossary_terms / revisions           │
              └────────────────────────────────────────────┘
                       ▲                  ▲           ▲
                       │                  │           │
                ┌──────┴──────┐    ┌──────┴──────┐   │
                │   Directus  │    │  db-push    │   │
                │    Cloud    │    │  workflow   │   │
                │ (Vegar UI)  │    │ (CI applies │   │
                └─────────────┘    │ migrations) │   │
                                   └──────┬──────┘   │
                                          │          │
              ┌──────────────┐            │   ┌──────┴──────┐
              │ Computer     │  agent-push│   │  Next.js    │
              │ (this CI     │────────────┘   │  + R3F      │
              │  pipeline)   │                │  on Vercel  │
              └──────────────┘                └─────────────┘
                       │                            │
                       │   Triplex (visual edits)   │
                       └────────────►◄──────────────┘
                              JSX written back

       Outputs: live website, Remotion MP4s, Reveal.js HTML decks,
                Remotion renderStill PNG → PPTX/PDF
```

## What changes vs. the original handoff

| Item                              | Original handoff             | This repo               |
| --------------------------------- | ---------------------------- | ----------------------- |
| Directus host                     | Docker on DigitalOcean       | **Directus Cloud**      |
| `docs/DIRECTUS_CONNECTION.md`     | self-hosted setup guide      | **replaced by `DIRECTUS_CLOUD.md`** |
| 9-table schema                    | not enumerated               | enumerated and seeded   |
| Coordinate count                  | not specified                | 13 (BEING + 6 poles + 6 inner-tier) |
| Spatial reference                 | not specified                | SRID 0 (abstract space) |
