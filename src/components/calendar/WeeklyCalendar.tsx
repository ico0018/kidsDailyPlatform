"use client";

import { useState } from "react";
import { DayHeader } from "@/components/calendar/DayHeader";
import { DayTimelineColumn } from "@/components/calendar/DayTimelineColumn";
import { TimeAxis } from "@/components/calendar/TimeAxis";
import { WeekHeader } from "@/components/calendar/WeekHeader";
import type { FixedSchedule } from "@/types/domain";

function startOfWeek(date: Date): Date { const result = new Date(date); result.setHours(12, 0, 0, 0); result.setDate(result.getDate() - result.getDay()); return result; }
function sameDate(a: Date, b: Date): boolean { return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate(); }
function rangeLabel(start: Date): string { const end = new Date(start); end.setDate(start.getDate() + 6); const formatter = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" }); return `${formatter.format(start)} – ${formatter.format(end)}`; }

export function WeeklyCalendar({ schedules, points }: { schedules: FixedSchedule[]; points: number }) {
  const today = new Date();
  const [weekStart, setWeekStart] = useState(() => startOfWeek(today));
  const days = Array.from({ length: 7 }, (_, index) => { const day = new Date(weekStart); day.setDate(weekStart.getDate() + index); return day; });
  const schedulesFor = (date: Date) => schedules.filter((schedule) => schedule.weekdays.includes(date.getDay() as 0 | 1 | 2 | 3 | 4 | 5 | 6));
  return <section><WeekHeader points={points} label={rangeLabel(weekStart)} onPrevious={() => setWeekStart((date) => new Date(date.getFullYear(), date.getMonth(), date.getDate() - 7, 12))} onToday={() => setWeekStart(startOfWeek(new Date()))} onNext={() => setWeekStart((date) => new Date(date.getFullYear(), date.getMonth(), date.getDate() + 7, 12))} /><div className="overflow-x-auto pb-3"><div className="min-w-[780px]"><div className="grid grid-cols-[64px_repeat(7,minmax(0,1fr))] gap-2"><div aria-hidden="true" /><div className="col-span-7 grid grid-cols-7 gap-2">{days.map((day) => <DayHeader key={day.toISOString()} date={day} isToday={sameDate(day, today)} />)}</div><TimeAxis />{days.map((day) => <DayTimelineColumn key={day.toISOString()} date={day} schedules={schedulesFor(day)} />)}</div></div></div></section>;
}
