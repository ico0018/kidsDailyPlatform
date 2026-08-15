import type { TimeBlock } from "@/lib/timeline/free-time";
import { durationToHeight, minutesToY } from "@/lib/timeline/geometry";

export function FreeTimeRegion({ block, pixelsPerMinute }: { block: TimeBlock; pixelsPerMinute: number }) {
  const height = durationToHeight(block.endMinutes - block.startMinutes, pixelsPerMinute);
  return <div aria-hidden="true" className="pointer-events-none absolute inset-x-3 rounded-[20px] border border-dashed border-[#eee0ce] bg-[#fffefa]" style={{ top: minutesToY(block.startMinutes, pixelsPerMinute) + 4, height: Math.max(0, height - 8) }}>{height >= 70 && <span className="absolute inset-x-0 top-1/2 -translate-y-1/2 text-center text-sm font-semibold text-[#ae9d8c]">✨ + My Time</span>}</div>;
}
