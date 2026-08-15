import { getScheduledTaskCandidateStart } from "@/lib/scheduling/candidate-time";
import {
  validatePlacement,
  type PlacementResult,
  type ScheduledTask,
} from "@/lib/scheduling/placement";
import { durationToHeight } from "@/lib/timeline/geometry";
import type { FixedSchedule } from "@/types/domain";

export type PoolTimelinePreview = {
  startMinutes: number;
  durationMinutes: number;
  height: number;
  result: PlacementResult;
};

export function getPoolTimelinePreview({
  translatedTop,
  timelineTop,
  durationMinutes,
  pixelsPerMinute,
  fixedSchedules,
  scheduledTasks,
  ignoreScheduledTaskId,
}: {
  translatedTop: number;
  timelineTop: number;
  durationMinutes: number;
  pixelsPerMinute: number;
  fixedSchedules: Pick<FixedSchedule, "startMinutes" | "endMinutes">[];
  scheduledTasks: ScheduledTask[];
  ignoreScheduledTaskId?: string;
}): PoolTimelinePreview {
  const startMinutes = getScheduledTaskCandidateStart(
    translatedTop,
    timelineTop,
    pixelsPerMinute,
  );

  return {
    startMinutes,
    durationMinutes,
    height: durationToHeight(durationMinutes, pixelsPerMinute),
    result: validatePlacement({
      startMinutes,
      durationMinutes,
      fixedSchedules,
      scheduledTasks,
      ignoreScheduledTaskId,
    }),
  };
}

export function createScheduledTask({
  dailyTaskId,
  taskTemplateId,
  startMinutes,
  durationMinutes,
}: {
  dailyTaskId: string;
  taskTemplateId: string;
  startMinutes: number;
  durationMinutes: number;
}): ScheduledTask {
  return {
    id: dailyTaskId,
    dailyTaskId,
    taskTemplateId,
    startMinutes,
    durationMinutes,
  };
}
