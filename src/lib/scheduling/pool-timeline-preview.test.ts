import { describe, expect, it } from "vitest";
import {
  createScheduledTask,
  getPoolTimelinePreview,
} from "@/lib/scheduling/pool-timeline-preview";
import type { ScheduledTask } from "@/lib/scheduling/placement";
import { DAILY_PIXELS_PER_MINUTE, durationToHeight, minutesToY } from "@/lib/timeline/geometry";

const timelineTop = 1000;

function previewAt(
  startMinutes: number,
  durationMinutes: number,
  scheduledTasks: ScheduledTask[] = [],
) {
  return getPoolTimelinePreview({
    translatedTop: timelineTop + minutesToY(startMinutes, DAILY_PIXELS_PER_MINUTE),
    timelineTop,
    durationMinutes,
    pixelsPerMinute: DAILY_PIXELS_PER_MINUTE,
    fixedSchedules: [],
    scheduledTasks,
  });
}

describe("pool timeline placement preview", () => {
  it("uses shared timeline geometry for preview height", () => {
    expect(previewAt(390, 30).height).toBe(durationToHeight(30, DAILY_PIXELS_PER_MINUTE));
  });

  it("snaps the preview start to the shared five-minute rule", () => {
    expect(previewAt(394, 15).startMinutes).toBe(395);
  });

  it("recomputes the snapped candidate as a drag moves in either direction", () => {
    expect(previewAt(600, 15).startMinutes).toBe(600);
    expect(previewAt(605, 15).startMinutes).toBe(605);
    expect(previewAt(610, 15).startMinutes).toBe(610);
    expect(previewAt(605, 15).startMinutes).toBe(605);
  });

  it("marks an open gap as valid", () => {
    expect(previewAt(390, 15).result.valid).toBe(true);
  });

  it("marks an overlapping placement as invalid", () => {
    const preview = previewAt(395, 15, [{
      id: "existing",
      dailyTaskId: "existing",
      taskTemplateId: "existing-template",
      startMinutes: 400,
      durationMinutes: 15,
    }]);
    expect(preview.result).toEqual({ valid: false, reason: "TASK_COLLISION" });
  });

  it("keeps adjacent half-open placements valid", () => {
    const preview = previewAt(420, 15, [{
      id: "next",
      dailyTaskId: "next",
      taskTemplateId: "next-template",
      startMinutes: 435,
      durationMinutes: 15,
    }]);
    expect(preview.result.valid).toBe(true);
  });

  it("ignores the moving scheduled task's original interval", () => {
    const preview = getPoolTimelinePreview({
      translatedTop: timelineTop + minutesToY(400, DAILY_PIXELS_PER_MINUTE),
      timelineTop,
      durationMinutes: 30,
      pixelsPerMinute: DAILY_PIXELS_PER_MINUTE,
      fixedSchedules: [],
      scheduledTasks: [{
        id: "moving",
        dailyTaskId: "moving",
        taskTemplateId: "moving-template",
        startMinutes: 390,
        durationMinutes: 30,
      }],
      ignoreScheduledTaskId: "moving",
    });
    expect(preview.startMinutes).toBe(400);
    expect(preview.result.valid).toBe(true);
  });

  it("still marks another scheduled task as a move collision", () => {
    const preview = getPoolTimelinePreview({
      translatedTop: timelineTop + minutesToY(400, DAILY_PIXELS_PER_MINUTE),
      timelineTop,
      durationMinutes: 30,
      pixelsPerMinute: DAILY_PIXELS_PER_MINUTE,
      fixedSchedules: [],
      scheduledTasks: [
        {
          id: "moving",
          dailyTaskId: "moving",
          taskTemplateId: "moving-template",
          startMinutes: 390,
          durationMinutes: 30,
        },
        {
          id: "other",
          dailyTaskId: "other",
          taskTemplateId: "other-template",
          startMinutes: 420,
          durationMinutes: 15,
        },
      ],
      ignoreScheduledTaskId: "moving",
    });
    expect(preview.result).toEqual({ valid: false, reason: "TASK_COLLISION" });
  });

  it("creates the same stable scheduled-task shape used by the drop", () => {
    expect(createScheduledTask({
      dailyTaskId: "raz__2026-08-17",
      taskTemplateId: "raz",
      startMinutes: 1020,
      durationMinutes: 15,
    })).toEqual({
      id: "raz__2026-08-17",
      dailyTaskId: "raz__2026-08-17",
      taskTemplateId: "raz",
      startMinutes: 1020,
      durationMinutes: 15,
    });
  });
});
