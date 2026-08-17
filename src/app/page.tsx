import { WeeklyCalendar } from "@/components/calendar/WeeklyCalendar";
import { weeklyCalendarFakeSchedules, weeklyCalendarFakeTasks } from "@/data/fixtures/weekly-calendar-fake-data";
import { demoChild } from "@/data/seed/demo-data";

export default function Home() {
  return <main className="min-h-screen bg-[#fff7ed] px-3 py-6 text-slate-800 sm:px-8 sm:py-10"><div className="mx-auto max-w-7xl rounded-[32px] border border-[#f0dfcd] bg-[#fffdf9] p-5 shadow-[0_18px_50px_rgba(130,94,65,0.12)] sm:p-8"><WeeklyCalendar schedules={weeklyCalendarFakeSchedules} tasks={weeklyCalendarFakeTasks} points={demoChild.totalPoints} /></div></main>;
}
