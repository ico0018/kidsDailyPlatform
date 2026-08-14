"use client";
import { useDroppable } from "@dnd-kit/core";
import { DailyFixedScheduleBlock } from "@/components/planner/DailyFixedScheduleBlock";
import { DailyTimeAxis } from "@/components/planner/DailyTimeAxis";
import { FreeTimeRegion } from "@/components/planner/FreeTimeRegion";
import { getFreeTimeBlocks } from "@/lib/timeline/free-time";
import { DAY_DURATION_MINUTES } from "@/lib/timeline/geometry";
import type { FixedSchedule } from "@/types/domain";
import type { ScheduledTask } from "@/lib/scheduling/placement";
import type { TaskTemplate } from "@/types/domain";

const PIXELS_PER_MINUTE = 1.1;
const timelineHeight = DAY_DURATION_MINUTES * PIXELS_PER_MINUTE;

export function DailyTimeline({ schedules, scheduledTasks = [], templates = [] }: { schedules: FixedSchedule[]; scheduledTasks?: ScheduledTask[]; templates?: TaskTemplate[] }) {
  const { setNodeRef, isOver } = useDroppable({ id: "timeline" });
  const freeBlocks = getFreeTimeBlocks(schedules);
  return <section aria-label="Daily planner timeline" className="grid grid-cols-[76px_minmax(0,1fr)]"><DailyTimeAxis height={timelineHeight} /><div ref={setNodeRef} className={`relative rounded-[24px] border bg-[#fffdf9] shadow-sm ${isOver ? "border-amber-400" : "border-[#eedfce]"}`} style={{ height: timelineHeight }}><div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden rounded-[24px]">{Array.from({ length: 31 }, (_, index) => <span key={index} className={`absolute inset-x-0 border-t ${index % 2 === 0 ? "border-[#ebe0d4]" : "border-[#f6efe7]"}`} style={{ top: `${(index / 30) * 100}%` }} />)}</div><div className="pointer-events-none absolute inset-0" aria-hidden="true">{freeBlocks.map((block) => <FreeTimeRegion key={block.startMinutes} block={block} pixelsPerMinute={PIXELS_PER_MINUTE} />)}</div><div className="absolute inset-0">{schedules.map((schedule) => <DailyFixedScheduleBlock key={schedule.id} schedule={schedule} pixelsPerMinute={PIXELS_PER_MINUTE} />)}{scheduledTasks.map((item) => { const task = templates.find((template) => template.id === item.taskTemplateId); return <div key={item.id} className="absolute inset-x-4 z-20 rounded-xl border border-[#c9dced] bg-[#edf6ff] px-2 text-xs font-bold" style={{ top: (item.startMinutes - 360) * PIXELS_PER_MINUTE, height: item.durationMinutes * PIXELS_PER_MINUTE }}>{task?.icon} {item.durationMinutes >= 15 && task?.name}</div>; })}</div></div></section>;
}
