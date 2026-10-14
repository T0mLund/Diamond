# The Diamond

Source repository for **The Diamond**, an interactive 3D model of a
geometric framework for mapping human experience.

**Status (2026-10-14):** framework documents at **v3.1**; Stage 1 of the
deployment ladder (the geometric object) is in `web/`.

## Layout

```
docs/                 Framework documents and governance
  Diamond_Summary_v3.1.md            read first
  Diamond_Containment_Note_v3.1.md   then this
  Diamond_Spec_v3.1.md               then the Spec
  Diamond_Roadmap_v3.1.md            then the Roadmap (Part IV = deployment ladder)
  Diamond_Versioning_Convention_v1.1.md
  ARCHITECTURE.md · SECRETS.md
  decision-notes/ · security-notes/
  archive/            superseded documents and the May 2026 prototype (not served)
web/                  Stage 1 web app: static Three.js, no build step
db/migrations/        Supabase schema; every file is idempotent and re-applied by db-push
db/blueprints/        drafted migrations that must not run (0015, Route B partition)
.github/workflows/    db-push (apply migrations), db-verify (check invariants)
netlify.toml          publishes web/ as-is
CHANGELOG.md          accumulated changes per committed version
```

## How the pieces fit

- **Web app.** `web/` is plain HTML, CSS and JavaScript. Three.js is loaded
  from a pinned CDN version through an import map, so there is nothing to
  install or build. Geometry comes from the Spec constants in
  `web/constants.js`, computed exactly from φ at runtime.
- **Hosting.** Netlify serves `web/` (see `netlify.toml`). Once the Netlify
  site is linked to this repository, every merge to `main` deploys.
- **Database.** Supabase (Postgres + PostGIS, project
  `zilnqideoswbsnbctqhi`, eu-west-1) holds the schema for later stages.
  It is fully private: RLS on every table, no policies, no grants to
  `anon` or `authenticated`. Stage 1 does not read it. On the Free plan it
  pauses after a week without use; restoring is one click.
- **Pipeline.** A push to `main` that touches `db/migrations/` runs
  `db-push`, then `db-verify` checks the invariants of Spec v3.1 §9.

## Secrets

One Actions secret, `SUPABASE_DB_URL`. See [`docs/SECRETS.md`](docs/SECRETS.md).

## Archive

- `docs/archive/prototype-2026-05/`: the May 2026 "Graves' Diamond"
  prototype, formerly live at diamond.thoughtfree.com. Kept for reference;
  not served, not maintained.
- `docs/archive/v3/`: the v3.0 documents (committed 2026-06-01).
- `docs/archive/v2-drafts/`: the never-committed v2 drafts.
