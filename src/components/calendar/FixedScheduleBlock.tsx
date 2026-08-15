import { durationToPercent, minutesToPercent } from "@/lib/timeline/geometry";
import type { FixedSchedule, FixedScheduleCategory } from "@/types/domain";

const categoryVisuals: Record<FixedScheduleCategory, { emoji: string; className: string }> = {
  SCHOOL: { emoji: "🎒", className: "border-[#b6c4dc] bg-[#dfe8f6] text-[#405477]" },
  MEAL: { emoji: "🍎", className: "border-[#e5c9b3] bg-[#faeadc] text-[#855d43]" },
  CLASS: { emoji: "🎹", className: "border-[#d5c4e5] bg-[#eee5f6] text-[#6d5683]" },
  ACTIVITY: { emoji: "🏊", className: "border-[#b9d8d0] bg-[#def0eb] text-[#3f7068]" },
  OTHER: { emoji: "⭐", className: "border-[#ead8a5] bg-[#fff2c9] text-[#80672d]" },
};

export function FixedScheduleBlock({ schedule }: { schedule: FixedSchedule }) {
  const height = durationToPercent(schedule.startMinutes, schedule.endMinutes);
  const compact = height < 10;
  const visual = categoryVisuals[schedule.category];
  return <div aria-label={`${schedule.title}, fixed time`} className="absolute inset-x-1.5 z-10 py-[1px]" style={{ top: `${minutesToPercent(schedule.startMinutes)}%`, height: `${height}%` }}><div className={`flex h-full items-center justify-center overflow-hidden rounded-[16px] border px-1 text-center text-[10px] font-bold leading-tight ${visual.className}`}><span className={compact ? "truncate" : "flex flex-col items-center gap-1"}><span>{visual.emoji}</span><span className="truncate">{schedule.title}</span></span></div></div>;
}
