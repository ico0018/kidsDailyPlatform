import type { ScheduledTask } from "@/lib/scheduling/placement";
import type { TodaysTask } from "@/lib/tasks/task-selector";

export function getRemainingTasks(tasks: TodaysTask[], scheduledTasks: ScheduledTask[]): TodaysTask[] {
  return tasks.filter(
    (task) => !scheduledTasks.some((scheduled) => scheduled.dailyTaskId === task.dailyTaskId),
  );
}
