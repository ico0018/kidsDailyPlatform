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

## Three-Agent Workspace

This repository uses a Manager / Developer / QA workflow. The files in `.agents/` are the shared source of truth for work coordination:

- `.agents/manager.md` — Manager role and handoff rules.
- `.agents/developer.md` — Developer role and implementation rules.
- `.agents/qa.md` — QA role and validation rules.
- `.agents/STATUS.md` — current operational status; update it at every handoff or material state change.
- `.agents/DECISIONS.md` — durable product and delivery decisions.

### Manager is the only user-facing entry point

Treat requests from the user as Manager requests unless the user explicitly asks to act as Developer or QA. The Manager reads `STATUS.md` and `DECISIONS.md`, clarifies scope and acceptance criteria, assigns work to Developer, coordinates QA, and keeps `STATUS.md` current. Developer and QA do not independently expand scope or make product/release decisions.

### Protected delivery flow

`main` is the production branch. Agents must never push directly to `main`, force-push it, or merge into it without the user's explicit release approval.

`dev` is the human-acceptance branch and the branch intended for Vercel Preview deployments. Developer work happens only on a `feature/*` branch. The required sequence is:

1. Manager records the task and acceptance criteria in `STATUS.md`.
2. Developer creates or uses a `feature/*` branch, implements the scoped work, tests it, and hands it to QA.
3. QA validates the acceptance criteria and regression risk. Only after QA passes may the feature be merged into `dev` and `dev` be pushed for a Vercel Preview.
4. Wait for the user to explicitly say **“验收通过”** or **“可以上线”** (or equally unambiguous release approval).
5. Only then may Manager authorize `dev` → `main`. Create the merge/PR and push only after that authorization.

If the working tree has unrelated or uncommitted changes, preserve them. Do not switch branches, merge, commit, stash, reset, clean, or push until their owner has reviewed them and the Manager has recorded a safe next action in `STATUS.md`.

### Required status updates

At the start and end of every handoff, update `.agents/STATUS.md` with the three agent states, current task, branch, QA result, preview state/URL when available, and human-acceptance state. Record durable workflow or product decisions in `.agents/DECISIONS.md`.
