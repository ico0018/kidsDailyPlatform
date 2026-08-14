import Link from "next/link";
import { formatLocalDate } from "@/lib/date/local-date";

const weekdayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export function DayHeader({ date, isToday }: { date: Date; isToday: boolean }) {
  return <Link href={`/day/${formatLocalDate(date)}`} aria-label={`Open plan for ${date.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}`} className={`flex h-[84px] flex-col items-center justify-center rounded-[22px] border px-1 text-center outline-offset-2 transition hover:-translate-y-0.5 hover:shadow-sm focus-visible:outline-2 focus-visible:outline-amber-500 ${isToday ? "border-amber-300 bg-amber-100 text-amber-950 shadow-sm" : "border-[#f0e5d7] bg-[#fffdf9] text-slate-700"}`}>
    {isToday && <span className="mb-0.5 text-[9px] font-extrabold tracking-[0.12em] text-amber-700">TODAY</span>}
    <span className="text-[13px] font-bold uppercase tracking-[0.12em]">{weekdayNames[date.getDay()]}</span>
    <span className="mt-0.5 text-[27px] font-extrabold leading-none">{date.getDate()}</span>
  </Link>;
}
