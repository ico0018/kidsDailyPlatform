import { durationToPercent, minutesToPercent } from "@/lib/timeline/geometry";
import type { TimeBlock } from "@/lib/timeline/free-time";

export function FreeTimeBlock({ block }: { block: TimeBlock }) {
  const isLong = durationToPercent(block.startMinutes, block.endMinutes) >= 12;
  return <div aria-label="My Time" className="absolute inset-x-1.5 rounded-[16px] border border-dashed border-[#eee4d6] bg-[#fffefa]" style={{ top: `${minutesToPercent(block.startMinutes)}%`, height: `${durationToPercent(block.startMinutes, block.endMinutes)}%` }}>{isLong && <span className="absolute inset-x-1 top-1/2 -translate-y-1/2 text-center text-[10px] font-semibold text-[#b6a899]">+ My Time</span>}</div>;
}
