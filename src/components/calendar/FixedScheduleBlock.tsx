import { durationToPercent, minutesToPercent } from "@/lib/timeline/geometry";
import type { FixedSchedule } from "@/types/domain";

const fixedScheduleVisual = "border-[#cdd2d8] bg-[#eef0f2] text-[#5c6670]";

export function FixedScheduleBlock({ schedule }: { schedule: FixedSchedule }) {
  const height = durationToPercent(schedule.startMinutes, schedule.endMinutes);
  const compact = height < 10;

  return (
    <div
      aria-label={`${schedule.title}, fixed time`}
      className="absolute inset-x-1.5 z-10 py-[1px]"
      style={{ top: `${minutesToPercent(schedule.startMinutes)}%`, height: `${height}%` }}
    >
      <div className={`flex h-full items-center justify-center overflow-hidden rounded-[16px] border px-1 text-center text-[10px] font-bold leading-tight ${fixedScheduleVisual}`}>
        <span className={compact ? "truncate" : "flex flex-col items-center gap-1"}>
          <span className="text-xs">◷</span>
          <span className="truncate">{schedule.title}</span>
        </span>
      </div>
    </div>
  );
}
