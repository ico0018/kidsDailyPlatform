"use client";

import { useEffect, useState } from "react";
import { DayHeader } from "@/components/calendar/DayHeader";
import { DayTimelineColumn } from "@/components/calendar/DayTimelineColumn";
import { TimeAxis } from "@/components/calendar/TimeAxis";
import { WeekHeader } from "@/components/calendar/WeekHeader";
import type { WeeklyCalendarFakeTask } from "@/data/fixtures/weekly-calendar-fake-data";
import type { FixedSchedule } from "@/types/domain";

function startOfWeek(date: Date): Date { const result = new Date(date); result.setHours(12, 0, 0, 0); result.setDate(result.getDate() - result.getDay()); return result; }
function sameDate(a: Date, b: Date): boolean { return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate(); }
function rangeLabel(start: Date): string { const end = new Date(start); end.setDate(start.getDate() + 6); const formatter = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" }); return `${formatter.format(start)} – ${formatter.format(end)}`; }

export function WeeklyCalendar({ schedules, tasks = [], points }: { schedules: FixedSchedule[]; tasks?: WeeklyCalendarFakeTask[]; points: number }) {
  const [today, setToday] = useState<Date | null>(null);
  const [weekStart, setWeekStart] = useState<Date | null>(null);
  useEffect(() => {
    queueMicrotask(() => {
      const localToday = new Date();
      setToday(localToday);
      setWeekStart(startOfWeek(localToday));
    });
  }, []);

  if (!today || !weekStart) {
    return <section aria-label="Loading weekly calendar" className="h-[760px] animate-pulse rounded-[28px] bg-[#fffaf3]" />;
  }

  const days = Array.from({ length: 7 }, (_, index) => { const day = new Date(weekStart); day.setDate(weekStart.getDate() + index); return day; });
  const schedulesFor = (date: Date) => schedules.filter((schedule) => schedule.weekdays.includes(date.getDay() as 0 | 1 | 2 | 3 | 4 | 5 | 6));
  const tasksFor = (date: Date) => tasks.filter((task) => task.weekday === date.getDay());
  return <section><WeekHeader points={points} label={rangeLabel(weekStart)} onPrevious={() => setWeekStart((date) => date ? new Date(date.getFullYear(), date.getMonth(), date.getDate() - 7, 12) : weekStart)} onToday={() => setWeekStart(startOfWeek(new Date()))} onNext={() => setWeekStart((date) => date ? new Date(date.getFullYear(), date.getMonth(), date.getDate() + 7, 12) : weekStart)} /><div className="overflow-x-auto pb-3"><div className="min-w-[780px]"><div className="grid grid-cols-[64px_repeat(7,minmax(0,1fr))] gap-2"><div aria-hidden="true" /><div className="col-span-7 grid grid-cols-7 gap-2">{days.map((day) => <DayHeader key={day.toISOString()} date={day} isToday={sameDate(day, today)} />)}</div><TimeAxis />{days.map((day) => <DayTimelineColumn key={day.toISOString()} date={day} isToday={sameDate(day, today)} schedules={schedulesFor(day)} tasks={tasksFor(day)} />)}</div></div></div></section>;
}
