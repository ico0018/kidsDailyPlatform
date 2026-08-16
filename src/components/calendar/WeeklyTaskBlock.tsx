import { durationToPercent, minutesToPercent } from "@/lib/timeline/geometry";
import type { WeeklyCalendarFakeTask } from "@/data/fixtures/weekly-calendar-fake-data";

const taskColors: Record<WeeklyCalendarFakeTask["colorCategory"], string> = {
  LEARNING: "border-[#a8bedc] bg-[#e5effb] text-[#405a7d]",
  CREATIVE: "border-[#cfb1d8] bg-[#f2e7f5] text-[#704c79]",
  MOVEMENT: "border-[#a9d2c4] bg-[#e3f3ed] text-[#3f7063]",
  FAMILY: "border-[#e3c49d] bg-[#fff0dc] text-[#805d36]",
  FREE: "border-[#e8dfd2] bg-[#fffdf9] text-[#8d8175]",
};

export function WeeklyTaskBlock({ task }: { task: WeeklyCalendarFakeTask }) {
  const height = durationToPercent(task.startMinutes, task.startMinutes + task.durationMinutes);
  const compact = height < 6;

  return (
    <div
      aria-label={`${task.title}, ${task.durationMinutes} minutes`}
      className="absolute inset-x-1.5 z-20 py-px"
      style={{ top: `${minutesToPercent(task.startMinutes)}%`, height: `${Math.max(height, 1.2)}%` }}
    >
      <div className={`flex h-full items-center justify-center overflow-hidden rounded-[12px] border px-1 text-center text-[9px] font-bold leading-tight shadow-sm ${taskColors[task.colorCategory]}`}>
        <span className={compact ? "truncate" : "flex flex-col items-center gap-0.5"}>
          <span>{task.icon}</span>
          {!compact && <span className="truncate">{task.title}</span>}
        </span>
      </div>
    </div>
  );
}
