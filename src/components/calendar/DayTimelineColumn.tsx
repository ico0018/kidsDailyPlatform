import Link from "next/link";
import { FixedScheduleBlock } from "@/components/calendar/FixedScheduleBlock";
import { FreeTimeBlock } from "@/components/calendar/FreeTimeBlock";
import { WeeklyTaskBlock } from "@/components/calendar/WeeklyTaskBlock";
import type { WeeklyCalendarFakeTask } from "@/data/fixtures/weekly-calendar-fake-data";
import { getFreeTimeBlocks } from "@/lib/timeline/free-time";
import { formatLocalDate } from "@/lib/date/local-date";
import type { FixedSchedule } from "@/types/domain";

export function DayTimelineColumn({ date, isToday, schedules, tasks = [] }: { date: Date; isToday: boolean; schedules: FixedSchedule[]; tasks?: WeeklyCalendarFakeTask[] }) {
  const freeBlocks = getFreeTimeBlocks(schedules);
  const href = `/day/${formatLocalDate(date)}`;
  return <Link href={href} aria-label={`Open plan for ${date.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}`} className={`relative block h-[600px] overflow-hidden rounded-[18px] border outline-offset-[-3px] transition hover:border-[#dec9b3] focus-visible:outline-2 focus-visible:outline-amber-500 ${isToday ? "border-amber-300 bg-[#fff6d8] shadow-[0_0_0_3px_rgba(251,191,36,.16)]" : "border-[#f0e5d7] bg-[#fffdf9]"}`}>
    {Array.from({ length: 16 }, (_, index) => <span key={index} className={`absolute inset-x-2 border-t ${index % 3 === 0 ? "border-[#eadfd2]" : "border-[#f5eee6]"}`} style={{ top: `${(index / 15) * 100}%` }} />)}
    {freeBlocks.map((block) => <FreeTimeBlock key={block.startMinutes} block={block} />)}
    {schedules.map((schedule) => <FixedScheduleBlock key={schedule.id} schedule={schedule} />)}
    {tasks.map((task) => <WeeklyTaskBlock key={task.id} task={task} />)}
  </Link>;
}
