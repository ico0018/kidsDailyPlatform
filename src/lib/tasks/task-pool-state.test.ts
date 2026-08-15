import { describe, expect, it } from "vitest";
import { demoAssignments, demoChild, demoTasks } from "@/data/seed/demo-data";
import { removeScheduledTask } from "@/data/repositories/schedule-repository";
import type { ScheduledTask } from "@/lib/scheduling/placement";
import { getTasksForDate } from "@/lib/tasks/task-selector";
import { getRemainingTasks } from "@/lib/tasks/task-pool-state";

describe("task pool scheduling state", () => {
  it("removes a newly scheduled RAZ task from the pool", () => {
    const tasks = getTasksForDate(
      demoChild.id,
      new Date(2026, 7, 17),
      demoTasks,
      demoAssignments,
    );
    const raz = tasks.find((task) => task.dailyTaskId === "assignment-mon-raz__2026-08-17");
    expect(raz).toBeDefined();

    const scheduled: ScheduledTask[] = [{
      id: raz!.dailyTaskId,
      dailyTaskId: raz!.dailyTaskId,
      taskTemplateId: raz!.id,
      startMinutes: 1020,
      durationMinutes: 15,
    }];

    expect(scheduled.filter((task) => task.dailyTaskId === raz!.dailyTaskId)).toHaveLength(1);
    expect(getRemainingTasks(tasks, scheduled).some((task) => task.dailyTaskId === raz!.dailyTaskId)).toBe(false);
  });

  it("restores an unscheduled RAZ task to the pool exactly once", () => {
    const tasks = getTasksForDate(
      demoChild.id,
      new Date(2026, 7, 17),
      demoTasks,
      demoAssignments,
    );
    const raz = tasks.find((task) => task.dailyTaskId === "assignment-mon-raz__2026-08-17");
    const scheduled: ScheduledTask[] = [{
      id: raz!.dailyTaskId,
      dailyTaskId: raz!.dailyTaskId,
      taskTemplateId: raz!.id,
      startMinutes: 1020,
      durationMinutes: 15,
    }];

    const afterUnschedule = removeScheduledTask(scheduled, raz!.dailyTaskId);
    expect(afterUnschedule).toHaveLength(0);
    expect(getRemainingTasks(tasks, afterUnschedule).filter((task) => task.dailyTaskId === raz!.dailyTaskId)).toHaveLength(1);
  });
});
