import { describe, expect, it } from "vitest";
import { demoTasks } from "@/data/seed/demo-data";
import { executionTasksForPlan } from "@/lib/execution/execution-tasks";

describe("execution task mapping", () => {
  it("maps RAZ to a timer that records wrong answers", () => {
    const tasks = executionTasksForPlan([{ id: "raz-placement", dailyTaskId: "raz-daily", taskTemplateId: "task-raz-1-book", startMinutes: 900, durationMinutes: 15 }], demoTasks);
    expect(tasks[0]).toMatchObject({ mode: "TIMER", recordsWrongAnswers: true, requiresPhoto: false });
  });

  it("maps Chinese lessons to embedded content", () => {
    const tasks = executionTasksForPlan([{ id: "vocab-placement", dailyTaskId: "vocab-daily", taskTemplateId: "task-chinese-vocab", startMinutes: 930, durationMinutes: 15 }], demoTasks);
    expect(tasks[0]).toMatchObject({ mode: "EMBED", requiresPhoto: false });
  });

  it("requires a photo for offline timer work", () => {
    const tasks = executionTasksForPlan([{ id: "math-placement", dailyTaskId: "math-daily", taskTemplateId: "task-math-calculation", startMinutes: 960, durationMinutes: 20 }], demoTasks);
    expect(tasks[0]).toMatchObject({ mode: "TIMER", requiresPhoto: true });
  });
});
