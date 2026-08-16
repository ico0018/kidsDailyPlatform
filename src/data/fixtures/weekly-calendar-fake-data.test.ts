import { describe, expect, it } from "vitest";
import {
  weeklyCalendarFakeSchedules,
  weeklyCalendarFakeTasks,
} from "@/data/fixtures/weekly-calendar-fake-data";

describe("weekly calendar fake data", () => {
  it("covers every day with deterministic schedule or task content", () => {
    const coveredDays = new Set([
      ...weeklyCalendarFakeSchedules.flatMap((schedule) => schedule.weekdays),
      ...weeklyCalendarFakeTasks.map((task) => task.weekday),
    ]);
    expect([...coveredDays].sort()).toEqual([0, 1, 2, 3, 4, 5, 6]);
  });

  it("contains the required representative durations and stable IDs", () => {
    expect(new Set(weeklyCalendarFakeTasks.map((task) => task.durationMinutes))).toEqual(
      expect.objectContaining(new Set([5, 15, 30, 40, 60])),
    );
    expect(new Set(weeklyCalendarFakeTasks.map((task) => task.id)).size).toBe(weeklyCalendarFakeTasks.length);
  });
});
