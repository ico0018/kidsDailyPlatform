# Decisions Log

Record durable product, process, and release decisions here. Add new entries at the top with the date, decision, rationale, and approver/source.

## 2026-08-17 — Automatic feature-branch checkpoints

- **Decision:** Developer creates and pushes a descriptive checkpoint commit after every completed, verified work unit on the active `feature/*` branch.
- **Boundary:** Checkpoints may never merge to `dev` or `main` automatically. Only the user's explicit post-verification approval can authorize a merge to `main`.
- **Source:** User instruction in this task.

## 2026-08-17 — Three-agent delivery workflow established

- **Decision:** Use Manager, Developer, and QA roles with `.agents/STATUS.md` as the current operational dashboard and this file as the durable decision record.
- **Delivery branches:** `main` is production and may never receive a direct Agent push. `dev` is the human-acceptance/Vercel Preview branch. Developer work is restricted to `feature/*` branches.
- **Quality gate:** QA must record `PASS` before a feature can merge to `dev`.
- **Human release gate:** Manager may authorize `dev` → `main` only after the user explicitly says “验收通过” or “可以上线”.
- **Source:** User instruction in this task.
