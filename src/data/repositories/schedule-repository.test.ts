import { describe, expect, it } from "vitest";
import { removeScheduledTask } from "@/data/repositories/schedule-repository";
const tasks = [{ id: "raz", dailyTaskId: "raz", taskTemplateId: "raz", startMinutes: 1020, durationMinutes: 15 }, { id: "reading", dailyTaskId: "reading", taskTemplateId: "reading", startMinutes: 1050, durationMinutes: 30 }];
describe("removeScheduledTask", () => { it("removes exactly the requested placement", () => expect(removeScheduledTask(tasks, "raz")).toEqual([tasks[1]])); it("leaves the plan unchanged for an unknown id", () => expect(removeScheduledTask(tasks, "none")).toEqual(tasks)); });
