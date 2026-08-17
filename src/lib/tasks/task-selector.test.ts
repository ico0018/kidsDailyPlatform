import { describe, expect, it } from "vitest";
import { demoAssignments, demoChild, demoTasks } from "@/data/seed/demo-data";
import { formatDuration, getTasksForDate, getTotalTaskDuration } from "@/lib/tasks/task-selector";
const monday = new Date(2026, 7, 17, 12);
describe("today's task selector", () => {
  it("returns the five Monday tasks with stable identities", () => { const tasks = getTasksForDate(demoChild.id, monday, demoTasks, demoAssignments); expect(tasks).toHaveLength(5); expect(tasks.map((task) => task.name)).toEqual(["RAZ 1本", "数学计算", "语文古诗", "语文字词", "数学思维"]); expect(tasks[0].dailyTaskId).toBe("assignment-mon-raz__2026-08-17"); });
  it("filters inactive and duplicate/missing templates", () => { const inactive = [{ ...demoTasks[0], active: false }, ...demoTasks.slice(1)]; expect(getTasksForDate(demoChild.id, monday, inactive, [...demoAssignments, demoAssignments[1], { id: "missing", childId: demoChild.id, taskTemplateId: "none", weekdays: [1] }])).toHaveLength(4); });
  it("formats totals", () => { const tasks = getTasksForDate(demoChild.id, monday, demoTasks, demoAssignments); expect(formatDuration(getTotalTaskDuration(tasks))).toBe("1 hr 30 min"); expect(formatDuration(5)).toBe("5 min"); expect(formatDuration(60)).toBe("1 hr"); expect(formatDuration(75)).toBe("1 hr 15 min"); });
});
