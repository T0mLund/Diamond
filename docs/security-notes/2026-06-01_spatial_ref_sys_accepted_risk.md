# Accepted-risk note: `public.spatial_ref_sys` lacks RLS

**Date logged:** 2026-06-01
**Project:** T0mLund's Diamond (Supabase project `zilnqideoswbsnbctqhi`)
**Advisor finding:** `rls_disabled_in_public` (ERROR-level)
**Status:** **Accepted, deferred** — no code change required at this time.

---

## What the advisor reports

The Supabase Security Advisor (run 2026-05-17) raises one ERROR-level finding:

> Table `public.spatial_ref_sys` is public, but RLS has not been enabled.
>
> Reference: https://supabase.com/docs/guides/database/database-linter?lint=0013_rls_disabled_in_public

In addition, the same scan returns:

- **1 × WARN** `extension_in_public` (postgis)
- **6 × WARN** `*_security_definer_function_executable` on PostGIS function `st_estimatedextent`
- **40 × INFO** `rls_enabled_no_policy` on our own tables — **expected and correct** under the
  current private-mode posture (see Containment Note); not addressed here.

## What `spatial_ref_sys` actually is

`spatial_ref_sys` is the PostGIS reference catalog of spatial reference systems
(EPSG codes and similar). On this project it has:

- Owner: `supabase_admin`
- Extension-owned: yes (`pg_depend.deptype = 'e'`)
- ~8,500 rows of publicly published coordinate-system definitions — **not sensitive data**

The PostGIS extension on this project was installed into the `public` schema. The
current Supabase default is the `extensions` schema, which would have kept this
table out of the PostgREST surface entirely.

## Why the standard fix does not apply here

The standard remediation is:

```sql
ALTER TABLE public.spatial_ref_sys ENABLE ROW LEVEL SECURITY;
```

This fails for us with `ERROR 42501: must be owner of table spatial_ref_sys`.

Verified on 2026-06-01:

- `current_user` = `postgres`
- `has_table_privilege('postgres','public.spatial_ref_sys','SELECT WITH GRANT OPTION')` = **false**

So our migration role can neither `ENABLE RLS` nor `REVOKE` the existing grants on
this table. This is a known Supabase limitation; see community discussion
[supabase/supabase #26302 — "Cannot enable RLS for spatial_ref_sys table"](https://github.com/orgs/supabase/discussions/26302).

## Actual exposure (verified 2026-06-01)

Both `anon` and `authenticated` roles currently hold SELECT, INSERT, UPDATE,
DELETE, TRUNCATE, REFERENCES, and TRIGGER on `public.spatial_ref_sys`.

In principle, anyone with this project's anon key could corrupt the SRID
catalog. In practice:

- No public deployment exists. The project URL and anon key are not published
  anywhere (standing instruction: *"This is not urgent. The project is not
  deployed and no public links have been made available."*).
- None of our application data flows through PostGIS. PostGIS is present only
  as a transitive dependency of Directus' media handling.
- Corruption of `spatial_ref_sys` would only affect future PostGIS operations
  on this project, not any data we currently store.

## Why we are accepting this risk

Per standing project instructions:

- *"Objective 1 is to achieve a functioning model. Objective 2 is security.
  Always look for ways to simplify and avoid unnecessary confusion."*
- *"This is not urgent. The project is not deployed and no public links have
  been made available. Proceed cautiously."*

The three viable remediation paths are:

1. **Supabase Support ticket** — ask them to run, as `supabase_admin`,
   `ALTER EXTENSION postgis SET SCHEMA extensions` (the official PostGIS
   migration recipe). Resolves the ERROR + all 7 PostGIS WARN findings in one
   move.
2. **Self-relocate via drop + recreate** — `DROP EXTENSION postgis CASCADE`,
   re-create in `extensions`, restore Directus' PostGIS-typed columns.
   Touches Directus' media surface; backup window required.
3. **Accept and defer** — leave the alert in place; revisit before any
   public deployment.

All three reach the same end state geometrically and behaviourally. Option 3
is chosen now because (a) no public client exists, (b) the data at risk is
non-sensitive, and (c) Option 1 or 2 should be done *together with* the
broader pre-deployment security pass anyway.

## Revisit triggers

Action this note when **any** of the following becomes true:

- Stage 1 deployment is scheduled (Roadmap Part IV) — i.e., a public anon
  key will exist.
- The project gains collaborator roles beyond owner + agent.
- A new advisor finding interacts with PostGIS surface (e.g. introduction of
  any of our own tables using `geometry` / `geography` types).
- Supabase changes the default schema policy or adds a built-in dismiss
  mechanism for extension-owned tables.

When triggered, prefer Option 1 (support ticket) and reference this note in
the request.

## References

- Supabase advisor rule 0013: <https://supabase.com/docs/guides/database/database-linter?lint=0013_rls_disabled_in_public>
- PostGIS schema relocation (Supabase docs, "Troubleshooting" section): <https://supabase.com/docs/guides/database/extensions/postgis>
- Community thread: <https://github.com/orgs/supabase/discussions/26302>
- Related project doc: `docs/Diamond_Containment_Note_v3.0-draft.md` (private-mode posture)
