# Ronnell & Beulah Wedding

A premium, luxury "save the date" website for Ronnell & Beulah's wedding (November 7, 2026, 5PM), with real RSVP, guestbook, and photo gallery upload features.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

_Populate as you build — short repo map plus pointers to the source-of-truth file for DB schema, API contracts, theme files, etc._

## Architecture decisions

_Populate as you build — non-obvious choices a reader couldn't infer from the code (3-5 bullets)._

## Product

- `artifacts/wedding` — the guest-facing "save the date" site (previewPath `/`): loading screen with R&B monogram, cinematic hero, countdown to Nov 7 2026 5PM, story timeline, events schedule, venue info, RSVP form, guest photo gallery with upload, and a digital guestbook.
- `artifacts/api-server` — backend for RSVPs, guest messages, and photos, backed by Postgres + Replit object storage.

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

_Populate as you build — sharp edges, "always run X before Y" rules._

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
