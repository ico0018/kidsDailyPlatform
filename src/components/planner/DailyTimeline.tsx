"use client";

import { useDraggable, useDroppable } from "@dnd-kit/core";
import { DailyFixedScheduleBlock } from "@/components/planner/DailyFixedScheduleBlock";
import { DailyTimeAxis } from "@/components/planner/DailyTimeAxis";
import { FreeTimeRegion } from "@/components/planner/FreeTimeRegion";
import type { PoolTimelinePreview } from "@/lib/scheduling/pool-timeline-preview";
import type { ScheduledTask } from "@/lib/scheduling/placement";
import { getFreeTimeBlocks } from "@/lib/timeline/free-time";
import {
  DAILY_PIXELS_PER_MINUTE,
  DAY_DURATION_MINUTES,
  DAY_END_MINUTES,
  DAY_START_MINUTES,
  minutesToY,
  SNAP_MINUTES,
} from "@/lib/timeline/geometry";
import type { FixedSchedule, TaskTemplate } from "@/types/domain";

const PIXELS_PER_MINUTE = DAILY_PIXELS_PER_MINUTE;
const timelineHeight = DAY_DURATION_MINUTES * PIXELS_PER_MINUTE;
const gridMinutes = Array.from(
  { length: (DAY_END_MINUTES - DAY_START_MINUTES) / SNAP_MINUTES + 1 },
  (_, index) => DAY_START_MINUTES + index * SNAP_MINUTES,
);

function gridLineClass(minutes: number): string {
  if (minutes % 60 === 0) return "border-[#ddcbb8]";
  if (minutes % 30 === 0) return "border-[#e7d7c8]";
  if (minutes % 15 === 0) return "border-[#eee2d7]";
  return "border-[#f7f1eb]";
}

function ScheduledBlock({ item, task }: { item: ScheduledTask; task?: TaskTemplate }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `scheduled:${item.id}`,
    data: {
      type: "SCHEDULED_TASK",
      scheduledTaskId: item.id,
      dailyTaskId: item.dailyTaskId,
      taskTemplateId: item.taskTemplateId,
      durationMinutes: item.durationMinutes,
      originalStartMinutes: item.startMinutes,
    },
  });
  const short = item.durationMinutes < 15;

  return (
    <div
      className="absolute inset-x-4 z-20"
      style={{
        top: minutesToY(item.startMinutes, PIXELS_PER_MINUTE),
        height: item.durationMinutes * PIXELS_PER_MINUTE,
      }}
    >
      <div
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        className={`h-full cursor-grab rounded-xl border border-[#c9dced] bg-[#edf6ff] px-2 text-xs font-bold active:cursor-grabbing ${isDragging ? "opacity-40" : ""}`}
      >
        {task?.icon} {!short && task?.name}
      </div>
      {short && (
        <span className="pointer-events-none absolute left-2 top-0 ml-8 -translate-y-1/2 whitespace-nowrap rounded-full border border-[#f0cfc0] bg-[#fff0e9] px-2 py-1 text-xs font-bold text-[#765343]">
          {task?.icon} {task?.name} · {item.durationMinutes} min
        </span>
      )}
    </div>
  );
}

function PlacementPreview({
  preview,
  task,
}: {
  preview: PoolTimelinePreview;
  task?: Pick<TaskTemplate, "icon" | "name">;
}) {
  const valid = preview.result.valid;

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-x-4 z-[15] rounded-xl border-2 border-dashed px-2 text-xs font-bold opacity-65 ${
        valid
          ? "border-[#79bca8] bg-[#dff4e9] text-[#31715f]"
          : "border-[#e28c8c] bg-[#ffe3e3] text-[#9f4a4a]"
      }`}
      style={{
        top: minutesToY(preview.startMinutes, PIXELS_PER_MINUTE),
        height: preview.height,
      }}
    >
      <span className="absolute left-2 top-1">
        {task?.icon} {task?.name}
      </span>
    </div>
  );
}

export function DailyTimeline({
  schedules,
  scheduledTasks = [],
  templates = [],
  poolPreview,
  poolPreviewTask,
}: {
  schedules: FixedSchedule[];
  scheduledTasks?: ScheduledTask[];
  templates?: TaskTemplate[];
  poolPreview?: PoolTimelinePreview | null;
  poolPreviewTask?: Pick<TaskTemplate, "icon" | "name">;
}) {
  const { setNodeRef, isOver } = useDroppable({ id: "timeline" });
  const freeBlocks = getFreeTimeBlocks(schedules);

  return (
    <section aria-label="Daily planner timeline" className="grid grid-cols-[82px_minmax(0,1fr)]">
      <DailyTimeAxis height={timelineHeight} />
      <div
        ref={setNodeRef}
        className={`relative rounded-[24px] border bg-[#fffdf9] shadow-sm ${isOver ? "border-amber-400" : "border-[#eedfce]"}`}
        style={{ height: timelineHeight }}
      >
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden rounded-[24px]">
          {gridMinutes.map((minutes) => (
            <span
              key={minutes}
              className={`absolute inset-x-0 border-t ${gridLineClass(minutes)}`}
              style={{ top: minutesToY(minutes, PIXELS_PER_MINUTE) }}
            />
          ))}
        </div>
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          {freeBlocks.map((block) => (
            <FreeTimeRegion key={block.startMinutes} block={block} pixelsPerMinute={PIXELS_PER_MINUTE} />
          ))}
        </div>
        <div className="absolute inset-0">
          {schedules.map((schedule) => (
            <DailyFixedScheduleBlock key={schedule.id} schedule={schedule} pixelsPerMinute={PIXELS_PER_MINUTE} />
          ))}
          {poolPreview && <PlacementPreview preview={poolPreview} task={poolPreviewTask} />}
          {scheduledTasks.map((item) => (
            <ScheduledBlock
              key={item.id}
              item={item}
              task={templates.find((template) => template.id === item.taskTemplateId)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
