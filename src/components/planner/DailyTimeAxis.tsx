import { DAY_DURATION_MINUTES, DAY_START_MINUTES } from "@/lib/timeline/geometry";

const hours = Array.from({ length: 16 }, (_, index) => 360 + index * 60);

export function DailyTimeAxis({ height }: { height: number }) {
  return <aside aria-label="Daily time axis" className="relative text-right text-sm font-medium text-[#938578]" style={{ height }}>
    {hours.map((minutes) => <span key={minutes} className="absolute right-4 -translate-y-1/2" style={{ top: `${((minutes - DAY_START_MINUTES) / DAY_DURATION_MINUTES) * 100}%` }}>{String(Math.floor(minutes / 60)).padStart(2, "0")}:00</span>)}
  </aside>;
}
