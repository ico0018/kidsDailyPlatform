import { DAY_DURATION_MINUTES, DAY_START_MINUTES } from "@/lib/timeline/geometry";

const labels = [360, 540, 720, 900, 1080, 1260];

function formatTime(minutes: number): string {
  return `${String(Math.floor(minutes / 60)).padStart(2, "0")}:00`;
}

export function TimeAxis() {
  return <aside aria-label="Time axis" className="relative h-[600px] text-right text-xs font-medium text-[#9c9287]">
    {labels.map((minutes) => <span key={minutes} className="absolute right-3 -translate-y-1/2 whitespace-nowrap" style={{ top: `${((minutes - DAY_START_MINUTES) / DAY_DURATION_MINUTES) * 100}%` }}>{formatTime(minutes)}</span>)}
  </aside>;
}
