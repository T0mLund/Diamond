# Secrets policy

## The rule

Long-lived credentials live in **exactly two places**:

1. The owner's password manager.
2. This repository's GitHub Actions secrets.

They never live in source files, chat conversations, Markdown
documentation, commit messages, issue or PR bodies, or logs. Workflows
pass connection strings through environment variables, never on the
command line.

## Actions secrets in use

| Secret | Used by | Notes |
|---|---|---|
| `SUPABASE_DB_URL` | `db-push`, `db-verify` | Full Postgres connection string, including the database password. |

That is the only one. Actions secrets cannot be read back, so a secret no
workflow uses has no value; unused ones are deleted rather than kept.

Removed on 2026-10-14 with the components they served: `APP_ID`,
`APP_INSTALLATION_ID`, `APP_PRIVATE_KEY` (GitHub App and `agent-push`),
`DIRECTUS_AGENT_TOKEN`, `DIRECTUS_URL` (Directus),
`NEXT_PUBLIC_SUPABASE_URL` (the never-built Next.js site), and
`SUPABASE_DB_PASSWORD`, `SUPABASE_REGION` (never used by a workflow; the
password is part of `SUPABASE_DB_URL`).

## The web app holds no secrets

Stage 1 is a static site with no database access, so it needs no keys.
If a later stage reads Supabase from the browser or an edge function, use
Supabase's current **publishable** and **secret** API keys, not the
legacy `anon` / `service_role` JWT keys, which Supabase retires by the
end of 2026. A secret key never goes into `web/`.

## Rotation protocol

If any secret leaks (chat paste, screenshot, commit, etc.):

1. Revoke it immediately in the issuing service (Supabase: reset the
   database password).
2. Generate a replacement.
3. Update the Actions secret.
4. Re-run `db-verify` (manual dispatch) to confirm.
5. Note the rotation date in this file.

Rotation history: the Supabase database password was rotated on
2026-05-10 after it appeared in a chat session.
