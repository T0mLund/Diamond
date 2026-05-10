# Secrets policy

## The rule

Long-lived credentials live in **exactly two places**:

1. The owner's password manager.
2. This repository's GitHub Actions secrets.

They never live in:
- Source files (this repository).
- Chat conversations (Perplexity, ChatGPT, anywhere).
- Markdown documentation, READMEs, comments, or commit messages.
- Issue/PR bodies, including drafts.
- Logs (workflows must redact; psql is invoked with `PGPASSWORD` env, never on the command line).

## Required Actions secrets

| Secret                  | Notes                                                    |
| ----------------------- | -------------------------------------------------------- |
| `APP_ID`                | `3663078` — the perplexity-diamond-build App.            |
| `APP_INSTALLATION_ID`   | `131053359` — the App's installation on this repo.       |
| `APP_PRIVATE_KEY`       | PEM private key for the App. Used only in `agent-push`.  |
| `SUPABASE_PROJECT_REF`  | `zilnqideoswbsnbctqhi`.                                  |
| `SUPABASE_REGION`       | `eu-west-1`.                                             |
| `SUPABASE_DB_PASSWORD`  | Rotated 2026-05-10 after a prior chat leak.              |
| `SUPABASE_DB_URL`       | Full connection string. Used by `db-push` / `db-verify`. |

## What about Directus Cloud?

A future PR will add `DIRECTUS_AGENT_TOKEN`. It is a *Directus*-issued static token for a scoped `agent` role, not an admin token. It is rotatable from Directus Cloud's UI without affecting Postgres.

## Bootstrap exception (one-time, this PR only)

The very first commit cannot use Option A's `agent-push` workflow because the workflow is part of the commit itself. We resolve this with a fine-grained Personal Access Token issued by the repo owner, scoped to `T0mLund/Diamond` only, with `Contents: read+write` and `Pull requests: read+write`, expiring within 7 days. The PAT is used once to push the bootstrap branch and open this PR, then revoked. **No PAT is needed thereafter.**

## Rotation protocol

If any secret leaks (chat paste, screenshot, commit, etc.):

1. Revoke immediately in the issuing service (GitHub, Supabase, Directus).
2. Generate a replacement.
3. Update the Actions secret.
4. Re-run any workflow that depends on it to confirm.
5. Note the rotation date in the relevant doc (this file, README, etc.).

The `APP_PRIVATE_KEY` and `SUPABASE_DB_PASSWORD` were rotated on 2026-05-10 after they appeared in an earlier chat session. Both replacements are in place.
