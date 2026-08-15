# Product specification

## Problem and audience

Kids Daily Planner supports children aged 6–12 in independently arranging and completing daily tasks. A parent/admin defines available work, recurring assignments, locked commitments, and rewards. The child turns those choices into a day plan and follows it.

## Roles

| Role | Responsibilities |
| --- | --- |
| Child | View the week, schedule eligible tasks, start a day, complete tasks, earn and redeem points. |
| Parent/Admin | Manage tasks, recurring assignments, locked time, rewards, completion history, and point records. |

The MVP can seed one child (Nora), but all domain models must retain `childId` for future multi-child support.

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Weekly calendar and per-day status. |
| `/day/[date]` | Daily task planning and timeline. |
| `/today` | Daily execution dashboard. |
| `/task/[id]` | Task detail/workspace. |
| `/rewards` | Points and reward redemption. |
| `/admin` | Parent management area. |

## Experience requirements

- Prioritize landscape tablets and 1366×768 desktops; support mobile stacking.
- Use large type, large touch targets, clear labels, rounded surfaces, and sufficient contrast.
- Do not use colour alone for task state. Provide loading, empty, and error states.
- Day timeline spans 06:00–21:00; calculations use five-minute increments.
