# Data model

All IDs are strings. A day-specific time is stored as **minutes after midnight** (for example, `06:00 = 360`, `16:30 = 990`). `totalPoints` is a cache; `PointTransaction` is the source of truth.

## Entities

| Entity | Key fields |
| --- | --- |
| Child | `id`, `name`, `avatar`, `totalPoints`, `createdAt` |
| TaskTemplate | `id`, `name`, `icon`, `description`, `durationMinutes`, `points`, `taskType`, `url`, `instructions`, `active` |
| TaskAssignment | `id`, `taskTemplateId`, `childId`, `weekdays` |
| FixedSchedule | `id`, `childId`, `title`, `weekdays`, `startMinutes`, `endMinutes`, `category` (`SCHOOL`, `MEAL`, `CLASS`, `ACTIVITY`, `OTHER`) |
| DailyPlan | `id`, `childId`, `date`, `status`, `startedAt` |
| ScheduledTask | `id`, `dailyPlanId`, `taskTemplateId`, `startMinutes`, `durationMinutes`, `status`, `actualStartedAt`, `completedAt` |
| PointTransaction | `id`, `childId`, `amount`, `type`, `taskId`, `rewardId`, `createdAt` |
| Reward | `id`, `name`, `emoji`, `description`, `costPoints`, `active` |
| RewardRedemption | `id`, `childId`, `rewardId`, `costPoints`, `redeemedAt` |

## Integrity rules

- A scheduled task may not intersect locked time, another scheduled task, or the 06:00–21:00 boundary.
- A task completion can produce only one `TASK_COMPLETE` transaction.
- A reward redemption creates one negative `REWARD_REDEEM` transaction only when the current balance covers its cost.
