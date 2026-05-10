# Vegar's Diamond — Build Repository

This repository implements the build pipeline for [Vegar's Diamond](https://diamond.thoughtfree.com), an interactive 3D metaphysical framework.

> **Status:** Phase 0 complete. Phase 1 (this PR) introduces the Supabase schema, the agent-push workflow, and project scaffolding. Phases 2–7 follow.

## Architecture (target)

| Layer            | Tool                                     | Role                                      |
| ---------------- | ---------------------------------------- | ----------------------------------------- |
| Database         | Supabase (Postgres + PostGIS)            | Single source of truth                    |
| No-code admin    | **Directus Cloud**                       | Human editing UI                          |
| Website          | Next.js + React Three Fiber              | Live 3D at `diamond.thoughtfree.com`      |
| 3D editor        | Triplex                                  | Visual scene editing                      |
| Video            | Remotion + `@remotion/three`             | Programmatic videos                       |
| Slide decks      | Reveal.js                                | Presentations                             |
| Hosting          | Vercel                                   | Website + previews                        |
| CI / credentials | GitHub App `perplexity-diamond-build`    | Short-lived AI-agent tokens               |

> *Update from the original handoff:* Phase 2 uses **Directus Cloud** (managed, ~€15/mo) instead of self-hosting Directus on a DigitalOcean droplet. This eliminates Docker / Caddy / `.env` ops and matches the project's "terminal-averse" preference at the cost of ~€10/mo over the original $7–10 target.

## Repository layout

```
.github/workflows/
  agent-push.yml   # Computer opens PRs via short-lived App tokens
  db-push.yml      # Applies db/migrations/ to Supabase on push to main
  db-verify.yml    # Asserts schema invariants after db-push
db/
  migrations/
    0001_extensions.sql      # PostGIS, pgcrypto, moddatetime
    0002_core_tables.sql     # axes, shells, coordinates
    0003_content_tables.sql  # sources, source_positions, resonances, prose, glossary, revisions
    0004_seed_geometry.sql   # 3 axes, 5 shells, 13 coordinates
docs/
  ARCHITECTURE.md
  DIRECTUS_CLOUD.md
  SECRETS.md
scripts/
  (reserved for import-v3.ts and similar tooling)
```

## Required Actions secrets

Set in **Settings → Secrets and variables → Actions**:

| Secret                  | Used by                | Notes                                                    |
| ----------------------- | ---------------------- | -------------------------------------------------------- |
| `APP_ID`                | `agent-push`           | `3663078`                                                |
| `APP_INSTALLATION_ID`   | `agent-push`           | `131053359`                                              |
| `APP_PRIVATE_KEY`       | `agent-push`           | PEM, never echoed                                        |
| `SUPABASE_PROJECT_REF`  | (future workflows)     | `zilnqideoswbsnbctqhi`                                   |
| `SUPABASE_REGION`       | (future workflows)     | `eu-west-1`                                              |
| `SUPABASE_DB_PASSWORD`  | (future workflows)     | Rotated 2026-05-10                                        |
| `SUPABASE_DB_URL`       | `db-push`, `db-verify` | Full connection string with password                     |

See [`docs/SECRETS.md`](docs/SECRETS.md) for the rotation protocol.

## Phase status

- ✅ **Phase 0** — Accounts, App, secrets (DNS verification non-blocking).
- 🟢 **Phase 1** — *This PR.* Schema + workflows + scaffolding.
- ⏸ **Phase 2** — Directus Cloud project linked to Supabase. (Awaiting user.)
- 🔲 **Phase 3** — Next.js + R3F site.
- 🔲 **Phase 4** — Triplex visual editing.
- 🔲 **Phase 5** — Remotion + `@remotion/three` video pipeline.
- 🔲 **Phase 6** — Reveal.js slide pipeline.
- 🔲 **Phase 7** — AI authorship loop end-to-end.

## What's intentionally *not* in this PR

- No source data. The 62 v3.1 sources will be imported by `scripts/import-v3.ts` in a later PR, after content guidance from the *Roadmap for Vegars Diamond Model* thread is incorporated.
- No prose. `prose_sections` and `glossary_terms` start empty.
- No Next.js or R3F code. Phase 3 is a separate PR.
