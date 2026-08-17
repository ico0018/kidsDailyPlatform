# Decisions Log

## 2026-08-17 — Phase 4B production release authorized

- **Decision:** Merge QA-approved `dev` into `main` and push the production branch.
- **Approval:** “合并到main吧，基本功能实现了，后续小bug我自己再改”.
- **Scope:** Weekly Calendar recovery plus Phase 4B daily execution panel, including timers, local photo check-in, and idempotent points ledger.

## 2026-08-16 — Protected release flow reaffirmed

- Decision: `main` is production; `dev` is the integration, human-acceptance,
  and Vercel Preview branch; Developer works on `feature/*` only.
- Gate: QA must record PASS before feature -> dev. Manager may authorize dev ->
  main only after the user's explicit “验收通过”, “可以上线”, “发布到生产”, or equally
  unambiguous approval. Ambiguous phrases are not approval.
- Parallelism: each active feature uses its own branch and worktree.
- Source: User instruction, 2026-08-16.

Record durable product, process, and release decisions here. Add new entries at the top with the date, decision, rationale, and approver/source.

## 2026-08-17 — Automatic feature-branch checkpoints

## 2026-08-16 — Protected release flow reaffirmed

- Decision: `main` is production; `dev` is the integration, human-acceptance,
  and Vercel Preview branch; Developer works on `feature/*` only.
- Gate: QA must record PASS before feature -> dev. Manager may authorize dev ->
  main only after the user's explicit “验收通过”, “可以上线”, “发布到生产”, or equally
  unambiguous approval. Ambiguous phrases are not approval.
- Parallelism: each active feature uses its own branch and worktree.
- Source: User instruction, 2026-08-16.

- **Decision:** Developer creates and pushes a descriptive checkpoint commit after every completed, verified work unit on the active `feature/*` branch.
- **Boundary:** Checkpoints may never merge to `dev` or `main` automatically. Only the user's explicit post-verification approval can authorize a merge to `main`.
- **Source:** User instruction in this task.

## 2026-08-17 — Three-agent delivery workflow established

## 2026-08-16 — Protected release flow reaffirmed

- Decision: `main` is production; `dev` is the integration, human-acceptance,
  and Vercel Preview branch; Developer works on `feature/*` only.
- Gate: QA must record PASS before feature -> dev. Manager may authorize dev ->
  main only after the user's explicit “验收通过”, “可以上线”, “发布到生产”, or equally
  unambiguous approval. Ambiguous phrases are not approval.
- Parallelism: each active feature uses its own branch and worktree.
- Source: User instruction, 2026-08-16.

- **Decision:** Use Manager, Developer, and QA roles with `.agents/STATUS.md` as the current operational dashboard and this file as the durable decision record.
- **Delivery branches:** `main` is production and may never receive a direct Agent push. `dev` is the human-acceptance/Vercel Preview branch. Developer work is restricted to `feature/*` branches.
- **Quality gate:** QA must record `PASS` before a feature can merge to `dev`.
- **Human release gate:** Manager may authorize `dev` → `main` only after the user explicitly says “验收通过” or “可以上线”.
- **Source:** User instruction in this task.

