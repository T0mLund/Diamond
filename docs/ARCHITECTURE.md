# Architecture

Current as of 2026-10-14 (framework v3.1). For what is in the repository,
see the README.

## Principle

Use the smallest stack that serves the next stage of the deployment
ladder (Roadmap v3.1 Part IV). Every additional account is something that
can lapse while the project rests: between June and October 2026, four
did.

## Layers

| Layer | Tool | Role |
|---|---|---|
| Source of truth | GitHub, `T0mLund/Diamond` | Framework documents, migrations, web app, history |
| Web app | Static HTML/JS + Three.js r186, self-hosted in `web/vendor/` | Stage 1 geometric object; no build step, no third-party requests |
| Hosting | Netlify | Serves `web/`; deploys on merge to `main` once linked |
| Data | Supabase (Postgres 17 + PostGIS) | Schema for items and relations; used from Stage 5 |
| Row editing | Supabase Table Editor | Owner edits rows directly; no separate CMS |
| Agent access | GitHub CLI and the Supabase connector | Branches, pull requests, migrations |

## Data flow

Stage 1 reads no database. The landmark coordinates, shell radii and
bipyramid hull are computed in `web/constants.js` from
φ = (1 + √5) / 2, exactly as Spec v3.1 §3 and §5 define them. The
database holds the same values (at full precision since migration 0016),
and `db-verify` checks that the two agree with the Spec.

When a later stage needs database content in the browser, the read path
must not grant `anon` access (Roadmap Part III, "What Phase 1.5b / 1.5c
do not settle"): either a server-side function using a Supabase secret
key, or a static export generated at deploy time.

## Retired (2026-10-14)

| Component | Why retired |
|---|---|
| Directus (Cloud, then self-hosted on Railway) | Railway deployment gone; edits rows, not the model; Supabase Table Editor covers row edits |
| Next.js + React Three Fiber, Vercel | Never built; a static Three.js page meets Stage 1 without a build pipeline |
| Triplex, Remotion, Reveal.js | Never adopted; Triplex needs a local VS Code setup |
| GitHub App `perplexity-diamond-build`, `agent-push` workflow | The assisting agent now has direct repository access |
| Plausible analytics | Subscription lapsed; script returned 404 |

The May 2026 prototype ("Graves' Diamond", Three.js r160 with a different
geometry) is archived at `docs/archive/prototype-2026-05/`.
