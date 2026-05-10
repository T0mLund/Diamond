# Directus Cloud — Connection Guide

Replaces the original `DIRECTUS_CONNECTION.md` (self-hosted droplet path).
This repo no longer requires the DigitalOcean droplet for Directus; the droplet can be decommissioned once Phase 2 is verified.

## What you'll do (browser-only, ~10 minutes)

1. Sign up / sign in at [directus.cloud](https://directus.cloud).
2. Create a new project:
   - **Name:** `Vegars Diamond`
   - **Region:** Frankfurt (closest to Bergen + Supabase Ireland).
   - **Plan:** Starter (~€15/mo).
3. In the project's **Database** settings, choose *"Use my own database"* (NOT the bundled Directus DB).
4. Paste the Supabase connection string (the same `SUPABASE_DB_URL` used by `db-push`):
   ```
   postgresql://postgres:<password>@db.zilnqideoswbsnbctqhi.supabase.co:5432/postgres
   ```
   *(Use the connection string from Supabase → Settings → Database → Connection string. Do **not** paste the password into chat — type it directly into the Directus form.)*
5. Save. Directus will run an introspection pass and discover all 9 tables auto-magically.
6. Confirm the 9 collections appear in the left sidebar:
   - `axes`, `shells`, `coordinates`,
   - `sources`, `source_positions`, `resonances`,
   - `prose_sections`, `glossary_terms`, `revisions`.
7. **Rotate the bootstrap admin password** immediately (Directus assigns a temporary one). Store the new one in your password manager.
8. Create a service role for Computer:
   - Settings → Roles → *Create new* → name `agent`.
   - Permissions: read all, write to `sources`, `source_positions`, `resonances`, `prose_sections`, `glossary_terms`. Block writes to `axes`, `shells`, `coordinates` (geometry is locked).
   - Under that role, create a static token. Save the token to the GitHub Actions secret `DIRECTUS_AGENT_TOKEN` (we'll wire it in a later PR).

## What I (Computer) need from you after Phase 2

- Confirmation that all 9 collections were auto-discovered.
- The `directus.cloud` project URL (e.g. `https://vegars-diamond.directus.app`).
- That the `DIRECTUS_AGENT_TOKEN` secret has been created in `T0mLund/Diamond` Actions secrets.

I do not need the admin password or the agent token value itself.

## Why Cloud instead of self-hosted

The original handoff specified Docker + Caddy on a DigitalOcean droplet. That works, but has a permanent ops surface (OS patching, container updates, certificate renewal, log rotation). The "terminal-averse" preference in the project notes argues against it.

Directus Cloud removes that surface for ~€10/mo over the self-hosted cost. The droplet (`do-droplet-***`) can be deprovisioned once Phase 2 is green; nothing else in the stack uses it.
