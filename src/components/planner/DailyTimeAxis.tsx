import {
  DAILY_PIXELS_PER_MINUTE,
  DAY_END_MINUTES,
  DAY_START_MINUTES,
  formatMinutes,
  minutesToY,
  SNAP_MINUTES,
} from "@/lib/timeline/geometry";

const timeLabels = Array.from(
  { length: ((DAY_END_MINUTES - DAY_START_MINUTES) / SNAP_MINUTES) + 1 },
  (_, index) => DAY_START_MINUTES + index * SNAP_MINUTES,
);

function labelClass(minutes: number): string {
  if (minutes % 60 === 0) return "text-xs font-extrabold text-[#6f6257]";
  if (minutes % 30 === 0) return "text-[11px] font-bold text-[#806f61]";
  if (minutes % 15 === 0) return "text-[11px] font-semibold text-[#927f70]";
  return "text-[10px] font-medium text-[#aa9b8f]";
}

export function DailyTimeAxis({ height }: { height: number }) {
  return (
    <aside
      aria-label="Daily time axis"
      className="relative pr-2 text-right leading-none"
      style={{ height }}
    >
      {timeLabels.map((minutes) => (
        <span
          key={minutes}
          className={`absolute right-2 -translate-y-1/2 whitespace-nowrap ${labelClass(minutes)}`}
          style={{ top: minutesToY(minutes, DAILY_PIXELS_PER_MINUTE) }}
        >
          {formatMinutes(minutes)}
        </span>
      ))}
    </aside>
  );
}
