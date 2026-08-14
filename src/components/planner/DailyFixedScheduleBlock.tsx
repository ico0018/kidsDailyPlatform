import type { FixedSchedule, FixedScheduleCategory } from "@/types/domain";
import { durationToHeight, minutesToY } from "@/lib/timeline/geometry";

const visuals: Record<FixedScheduleCategory, { emoji: string; className: string }> = {
  SCHOOL: { emoji: "🎒", className: "border-[#b6c4dc] bg-[#dfe8f6] text-[#405477]" }, MEAL: { emoji: "🍎", className: "border-[#e5c9b3] bg-[#faeadc] text-[#855d43]" }, CLASS: { emoji: "🎹", className: "border-[#d5c4e5] bg-[#eee5f6] text-[#6d5683]" }, ACTIVITY: { emoji: "🏊", className: "border-[#b9d8d0] bg-[#def0eb] text-[#3f7068]" }, OTHER: { emoji: "⭐", className: "border-[#ead8a5] bg-[#fff2c9] text-[#80672d]" },
};
function displayTime(minutes: number): string { return `${String(Math.floor(minutes / 60)).padStart(2, "0")}:${String(minutes % 60).padStart(2, "0")}`; }

export function DailyFixedScheduleBlock({ schedule, pixelsPerMinute }: { schedule: FixedSchedule; pixelsPerMinute: number }) {
  const visual = visuals[schedule.category];
  const height = durationToHeight(schedule.endMinutes - schedule.startMinutes, pixelsPerMinute);
  const compact = height < 90;
  return <div aria-label={`${schedule.title}, fixed and locked, ${displayTime(schedule.startMinutes)} to ${displayTime(schedule.endMinutes)}`} className="absolute inset-x-3 z-10 py-1" style={{ top: minutesToY(schedule.startMinutes, pixelsPerMinute), height }}><div className={`flex h-full items-center justify-center rounded-[20px] border px-3 text-center ${visual.className}`}><div className={compact ? "flex items-center gap-2 text-sm font-bold" : "flex flex-col items-center gap-2"}><span className="text-xl">{visual.emoji}</span><span className="font-bold">{schedule.title}</span>{!compact && <span className="text-xs font-medium opacity-75">{displayTime(schedule.startMinutes)} – {displayTime(schedule.endMinutes)}</span>}</div></div></div>;
}
