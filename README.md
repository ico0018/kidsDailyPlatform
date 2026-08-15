# Kids Daily Planner

A tablet-first web app that helps children plan their day, complete learning tasks, and earn points. Parents define tasks, fixed commitments, and rewards; children choose when to schedule their work.

## Phase 0 status

Project foundation is complete. The app currently provides the shared shell and typed demo data only. Weekly calendar behaviour and date navigation begin in Phase 1.

## Run locally

Node.js 20.9+ is required. From this directory:

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Checks

```bash
npm run lint
npm run typecheck
npm run build
```

## Structure

- `src/app` — App Router routes and global styles.
- `src/components` — reusable UI by feature.
- `src/data` — seed data and repositories (introduced as features need them).
- `src/lib` — framework-independent scheduling, points, timer, and validation logic.
- `src/types` — shared domain types.
- `docs` — product, data-model, and delivery documentation.
