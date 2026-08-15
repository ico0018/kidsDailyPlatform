<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Kids Daily Planner — Engineering Guide

## Product goal

Help children independently plan and complete daily learning and life tasks. Parents set the available tasks, fixed commitments, and rewards. The product is tablet-first, calm, accessible, and appropriate for ages 6–12.

## Architecture

- Next.js App Router, React, TypeScript strict mode, and Tailwind CSS.
- Keep route files focused on composition; place reusable UI in `src/components`.
- Keep domain logic in `src/lib/{scheduling,points,timer,validation}` rather than React components.
- Access persisted data only through `src/data/repositories`; MVP storage may use localStorage behind that boundary.
- Shared domain contracts belong in `src/types`.

## Code conventions

- Do not use `any`; use explicit types and narrow unknown values.
- Prefer small, typed, reusable components. Split components that grow beyond roughly 200–300 lines.
- Represent times within a day as minutes after midnight, not Date objects.
- Add unit tests for new scheduling, points, timer, and validation logic.
- Run `npm run lint` and `npm run typecheck` before handing over a phase.

## Non-negotiable product rules

1. A child cannot schedule a task in fixed/locked time.
2. Scheduled tasks cannot overlap and must remain within the daily boundary.
3. Task block height must accurately represent its duration.
4. The current-time line must reflect real time.
5. A completed task awards points exactly once.
6. Reward redemption must create a ledger transaction.
7. Core interactions must work; never replace them with static mockups.
8. Do not begin a later phase before the user authorizes it.

## Phase 4 Stability Rule

The existing Task Pool → Timeline scheduling path is known-good. Do not rewrite its drag/drop architecture; extend the existing DndContext, timeline geometry, validation, repository, and scheduled-task rendering with minimal local changes. After each drag/drop sub-phase run focused tests, lint, typecheck, build, manually verify the requested interaction, then stop before the next interaction.
